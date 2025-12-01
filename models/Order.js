const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        title: String,
        qty: Number,
        price: Number,
        image: String,
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid', 'failed', 'refunded'],
        default: 'unpaid',
    },
    paymentIntentId: {
        type: String,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
    },
    taxes: {
        type: Number,
        default: 0,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    orderItems: [{
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    }],
    totalPrice: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
