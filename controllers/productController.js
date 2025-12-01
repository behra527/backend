const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .populate('categories', 'name slug')
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('categories');

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const {
        title,
        slug,
        price,
        description,
        stock,
        images,
        categories,
        featured,
        compareAt,
    } = req.body;

    const product = new Product({
        title: title || 'Sample name',
        slug: slug || `sample-name-${Date.now()}`,
        price: price || 0,
        description: description || 'Sample description',
        stock: stock || 0,
        images: images || ['/images/sample.jpg'],
        categories: categories || [],
        featured: featured || false,
        compareAt: compareAt || undefined,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const {
        title,
        slug,
        price,
        description,
        stock,
        images,
        categories,
        featured,
        attributes,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.title = title || product.title;
        product.slug = slug || product.slug;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.stock;
        product.images = images || product.images;
        product.categories = categories || product.categories;
        product.featured = featured !== undefined ? featured : product.featured;
        product.attributes = attributes || product.attributes;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
