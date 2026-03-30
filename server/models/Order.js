const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        address: { type: String, required: true }
    },
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: { type: Number, required: true },
    payment: {
        razorpayOrderId: String,
        razorpayPaymentId: String,
        status: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        }
    },
    shipment: {
        status: {
            type: String,
            enum: ['processing', 'shipped', 'delivered'],
            default: 'processing'
        },
        estimatedDelivery: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);