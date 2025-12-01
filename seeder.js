const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Simple helpers to generate automatic/random demo data for leather products
const adjectives = ['Premium', 'Classic', 'Urban', 'Vintage', 'Luxury', 'Modern', 'Minimal', 'Handcrafted', 'Elegant', 'Professional'];
const productTypes = [
    { name: 'Leather Jacket', priceRange: [200, 400], stockRange: [5, 20] },
    { name: 'Leather Bag', priceRange: [120, 280], stockRange: [8, 25] },
    { name: 'Leather Backpack', priceRange: [140, 260], stockRange: [10, 22] },
    { name: 'Leather Wallet', priceRange: [35, 80], stockRange: [15, 35] },
    { name: 'Leather Belt', priceRange: [45, 90], stockRange: [20, 40] },
    { name: 'Leather Briefcase', priceRange: [180, 320], stockRange: [6, 18] },
    { name: 'Leather Tote Bag', priceRange: [100, 220], stockRange: [12, 28] },
    { name: 'Leather Messenger Bag', priceRange: [130, 250], stockRange: [10, 24] },
    { name: 'Leather Card Holder', priceRange: [25, 55], stockRange: [25, 50] },
    { name: 'Leather Watch Strap', priceRange: [30, 60], stockRange: [30, 60] },
    { name: 'Leather Phone Case', priceRange: [35, 65], stockRange: [40, 80] },
    { name: 'Leather Key Holder', priceRange: [20, 45], stockRange: [50, 100] },
];
const materials = ['Full-Grain Leather', 'Genuine Leather', 'Italian Leather', 'Nubuck Leather', 'Suede Leather', 'Vegan Leather'];
const colors = ['Brown', 'Black', 'Tan', 'Cognac', 'Burgundy', 'Navy'];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Leather product specific image seeds from Unsplash
const leatherImageSeeds = [
    '1551028719-00167b16eac5', // leather jacket
    '1601925260368-ae2f83cf8b7f', // biker jacket
    '1583394838336-acd977736f90', // vintage jacket
    '1590874103328-eac38a683ce7', // messenger bag
    '1627123424574-724758594e93', // briefcase
    '1553062407-98eeb64c6a62', // backpack
    '1622560480605-d83c853bc5c3', // wallet
    '1584917865442-de89df76afd3', // belt
    '1523275335684-37898b6baf30', // watch strap
    '1556656793-08538906a9f8', // phone case
];

const generateRandomProducts = (count, categoryIds = []) => {
    const items = [];

    for (let i = 0; i < count; i++) {
        const adjective = randomFrom(adjectives);
        const productType = randomFrom(productTypes);
        const material = randomFrom(materials);
        const color = randomFrom(colors);
        
        const baseSlug = `${adjective}-${color}-${productType.name}`.toLowerCase().replace(/\s+/g, '-');

        // Price based on product type range
        const price = Number((productType.priceRange[0] + Math.random() * (productType.priceRange[1] - productType.priceRange[0])).toFixed(2));
        const stock = randomInRange(productType.stockRange[0], productType.stockRange[1]);
        const compareAt = Math.floor(price * 1.3); // 30% higher original price

        // Use leather-specific images
        const imageSeed = leatherImageSeeds[i % leatherImageSeeds.length];
        const productImage = `https://images.unsplash.com/photo-${imageSeed}?w=800&h=800&fit=crop`;

        const doc = {
            title: `${adjective} ${color} ${productType.name}`,
            slug: `${baseSlug}-${i}-${Date.now()}`,
            description: `A ${adjective.toLowerCase()} ${productType.name.toLowerCase()} in ${color.toLowerCase()} color, crafted from ${material.toLowerCase()}. Handcrafted with attention to detail and built to last. Perfect for everyday use and special occasions.`,
            price,
            compareAt,
            stock,
            images: [productImage],
            featured: Math.random() < 0.25, // 25% featured
        };

        if (categoryIds.length) {
            // Assign 1–2 random categories based on product type
            const shuffled = [...categoryIds].sort(() => 0.5 - Math.random());
            doc.categories = shuffled.slice(0, Math.floor(Math.random() * 2) + 1);
        }

        items.push(doc);
    }

    return items;
};

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();

        // Seed base users
        await User.insertMany(users);

        // Seed base categories for leather products
        const baseCategories = [
            {
                name: 'Leather Jackets',
                slug: 'leather-jackets',
                description: 'Premium leather jackets for men and women. Classic, biker, and vintage styles.',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
            },
            {
                name: 'Leather Bags',
                slug: 'leather-bags',
                description: 'Handcrafted leather bags including backpacks, messenger bags, briefcases, and totes.',
                image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
            },
            {
                name: 'Leather Wallets',
                slug: 'leather-wallets',
                description: 'Premium leather wallets, card holders, and money clips. Slim and functional designs.',
                image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop',
            },
            {
                name: 'Leather Belts',
                slug: 'leather-belts',
                description: 'Classic and reversible leather belts. Perfect for formal and casual wear.',
                image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
            },
            {
                name: 'Leather Accessories',
                slug: 'leather-accessories',
                description: 'Leather watch straps, phone cases, key holders, and other premium accessories.',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
            },
            {
                name: 'Men Collection',
                slug: 'men-collection',
                description: 'Premium leather goods for men. Jackets, bags, wallets, and accessories.',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
            },
            {
                name: 'Women Collection',
                slug: 'women-collection',
                description: 'Elegant leather accessories for women. Bags, wallets, and stylish accessories.',
                image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
            },
        ];

        const createdCategories = await Category.insertMany(baseCategories);
        const categoryIds = createdCategories.map((c) => c._id);

        // Static sample products from data file
        const sampleProducts = products.map((product) => {
            return { ...product, categories: [randomFrom(categoryIds)] };
        });

        // Automatically generated random leather products for demo
        const randomProducts = generateRandomProducts(30, categoryIds); // 30 additional leather items

        await Product.insertMany([...sampleProducts, ...randomProducts]);

        console.log('✅ Demo data imported (users, categories, products)');
        process.exit();
    } catch (error) {
        console.error(`❌ Seed error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
