const products = [
    // Leather Jackets
    {
        title: 'Classic Brown Leather Jacket',
        slug: 'classic-brown-leather-jacket',
        description:
            'Premium full-grain leather jacket with classic design. Features a comfortable fit, multiple pockets, and a timeless brown finish. Perfect for casual and semi-formal occasions. Made from high-quality genuine leather that ages beautifully.',
        price: 299.99,
        compareAt: 399.99,
        stock: 15,
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Black Biker Leather Jacket',
        slug: 'black-biker-leather-jacket',
        description:
            'Stylish black biker-style leather jacket with zipper details and quilted shoulders. Made from premium cowhide leather. Features adjustable cuffs, multiple pockets, and a comfortable lining. Ideal for motorcycle enthusiasts and fashion-forward individuals.',
        price: 349.99,
        compareAt: 449.99,
        stock: 12,
        images: [
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Vintage Distressed Leather Jacket',
        slug: 'vintage-distressed-leather-jacket',
        description:
            'Authentic vintage-style distressed leather jacket with a worn-in look. Features a relaxed fit, snap buttons, and a classic design. Perfect for those who love retro fashion. Made from genuine leather with attention to detail.',
        price: 279.99,
        compareAt: 359.99,
        stock: 8,
        images: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    
    // Leather Bags
    {
        title: 'Premium Leather Messenger Bag',
        slug: 'premium-leather-messenger-bag',
        description:
            'Handcrafted leather messenger bag perfect for work and travel. Features multiple compartments, adjustable shoulder strap, and premium hardware. Made from full-grain Italian leather with a professional finish. Spacious enough for laptop, documents, and daily essentials.',
        price: 189.99,
        compareAt: 249.99,
        stock: 20,
        images: [
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Classic Leather Briefcase',
        slug: 'classic-leather-briefcase',
        description:
            'Professional leather briefcase with top handle and detachable shoulder strap. Features a combination lock, multiple interior pockets, and a padded laptop compartment. Made from premium cowhide leather with brass hardware. Perfect for business professionals.',
        price: 249.99,
        compareAt: 329.99,
        stock: 14,
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Leather Backpack - Urban Style',
        slug: 'leather-backpack-urban-style',
        description:
            'Modern leather backpack with contemporary design. Features padded straps, multiple compartments, and a sleek silhouette. Made from genuine leather with water-resistant lining. Perfect for students and professionals who value style and functionality.',
        price: 159.99,
        compareAt: 219.99,
        stock: 18,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    {
        title: 'Luxury Leather Tote Bag',
        slug: 'luxury-leather-tote-bag',
        description:
            'Elegant leather tote bag with spacious interior and sturdy handles. Features a minimalist design, interior pockets, and premium construction. Made from soft Italian leather. Perfect for everyday use, shopping, or work.',
        price: 179.99,
        compareAt: 239.99,
        stock: 16,
        images: [
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    
    // Leather Wallets
    {
        title: 'Classic Leather Bifold Wallet',
        slug: 'classic-leather-bifold-wallet',
        description:
            'Traditional bifold wallet made from premium leather. Features multiple card slots, ID window, and cash compartments. Handcrafted with precision and attention to detail. Slim design that fits comfortably in your pocket.',
        price: 49.99,
        compareAt: 69.99,
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Minimalist Leather Card Holder',
        slug: 'minimalist-leather-card-holder',
        description:
            'Sleek and modern card holder made from premium leather. Features 4-6 card slots and a slim profile. Perfect for those who prefer minimalism. Handcrafted with precision and finished with natural oils for durability.',
        price: 39.99,
        compareAt: 54.99,
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    {
        title: 'Leather Money Clip Wallet',
        slug: 'leather-money-clip-wallet',
        description:
            'Combination wallet and money clip in one elegant design. Features card slots and a secure money clip. Made from genuine leather with a modern aesthetic. Perfect for those who carry cash and cards.',
        price: 44.99,
        compareAt: 59.99,
        stock: 22,
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    
    // Leather Belts
    {
        title: 'Classic Leather Dress Belt',
        slug: 'classic-leather-dress-belt',
        description:
            'Professional dress belt made from premium full-grain leather. Features a classic buckle design and multiple size options. Perfect for business attire and formal occasions. Available in black and brown.',
        price: 54.99,
        compareAt: 74.99,
        stock: 35,
        images: [
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop'
        ],
        featured: true,
    },
    {
        title: 'Reversible Leather Belt',
        slug: 'reversible-leather-belt',
        description:
            'Versatile reversible belt with black on one side and brown on the other. Made from genuine leather with a rotating buckle. Perfect for matching different outfits. One belt, two looks!',
        price: 64.99,
        compareAt: 84.99,
        stock: 28,
        images: [
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    
    // Leather Accessories
    {
        title: 'Leather Watch Strap',
        slug: 'leather-watch-strap',
        description:
            'Premium leather watch strap with quick-release pins. Made from genuine leather with a comfortable fit. Compatible with most standard watch lugs. Available in multiple colors and sizes.',
        price: 34.99,
        compareAt: 49.99,
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    {
        title: 'Leather Key Holder',
        slug: 'leather-key-holder',
        description:
            'Compact leather key holder with key ring and lanyard. Features a durable design and easy access to keys. Made from premium leather with metal hardware. Perfect for keeping keys organized.',
        price: 24.99,
        compareAt: 34.99,
        stock: 50,
        images: [
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
    {
        title: 'Leather Phone Case',
        slug: 'leather-phone-case',
        description:
            'Premium leather phone case with card slots. Features a slim design, magnetic closure, and protection for your device. Made from genuine leather with precise cutouts for ports and buttons. Compatible with most smartphone models.',
        price: 39.99,
        compareAt: 54.99,
        stock: 45,
        images: [
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1601972602237-8c79241f8d2a?w=800&h=800&fit=crop'
        ],
        featured: false,
    },
];

module.exports = products;
