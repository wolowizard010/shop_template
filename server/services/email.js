const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOrderConfirmation(order) {
    const itemRows = order.items.map(item => `
        <tr>
            <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
            <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
            <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price}</td>
            <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    await transporter.sendMail({
        from:    process.env.EMAIL_USER,
        to:      order.customer.email,
        subject: `Order Confirmed — #${order._id}`,
        html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;">
                <h2 style="color:#1a1a2e;">Thank you, ${order.customer.name}!</h2>
                <p>Your order has been confirmed and is being processed.</p>

                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                    <thead>
                        <tr style="background:#f4f4f4;">
                            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>
                            <th style="padding:8px;border:1px solid #ddd;">Qty</th>
                            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
                            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>${itemRows}</tbody>
                </table>

                <p style="font-size:18px;font-weight:bold;">Total: ₹${order.totalAmount}</p>

                <h3>Shipping Details</h3>
                <p>${order.customer.address}</p>
                <p><strong>Estimated Delivery:</strong> ${order.shipment.estimatedDelivery}</p>

                <hr style="margin:24px 0;" />
                <p style="color:#888;font-size:12px;">
                    Questions? Contact us at support@shopco.com
                </p>
            </div>
        `
    });
}

module.exports = { sendOrderConfirmation };