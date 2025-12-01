const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    compareAt: {
        type: Number,
    },
    SKU: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    images: [{
        type: String,
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    featured: {
        type: Boolean,
        default: false,
    },
    attributes: {
        type: Map,
        of: String,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
