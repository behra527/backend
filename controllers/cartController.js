const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
        'items.productId',
        'title price images slug'
    );

    if (cart) {
        res.json(cart);
    } else {
        res.json({ items: [] });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, qty, price } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].qty = qty;
        } else {
            cart.items.push({ productId, qty, priceAtAdd: price });
        }
    } else {
        cart = new Cart({
            userId: req.user._id,
            items: [{ productId, qty, priceAtAdd: price }],
        });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== req.params.id
        );

        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
        cart.items = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
