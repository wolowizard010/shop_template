const router = require('express').Router();
const Order  = require('../models/Order');
const { sendOrderConfirmation } = require('../services/email');

// Mock order
router.post('/create-order', async (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;

        const order = await Order.create({
            customer,
            items,
            totalAmount,
            payment: {
                razorpayOrderId:   `mock_order_${Date.now()}`,
                razorpayPaymentId: `mock_pay_${Date.now()}`,
                status:            'paid'
            },
            shipment: {
                status:            'processing',
                estimatedDelivery: '5-7 business days'
            }
        });

        // Send confirmation email
        sendOrderConfirmation(order).catch(err =>
            console.error('Email error:', err.message)
        );

        res.json({ success: true, orderId: order._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;