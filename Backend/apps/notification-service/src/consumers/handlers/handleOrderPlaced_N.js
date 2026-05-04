import { sendEmail } from '../../services/email.service.js';

export const handleOrderPlaced = async (data) => {
    const { orderId, userId, email, totalPrice, createdAt } = data;

    if (!email) {
        console.warn(`⚠️ No email in order.placed event for userId: ${userId}. Add email to order-service producer.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Order Confirmed — #${orderId}`,
        html: `
            <h2>Your order has been placed!</h2>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Total:</strong> $${totalPrice}</p>
            <p><strong>Date:</strong> ${new Date(createdAt).toDateString()}</p>
            <p>We'll notify you once your order ships.</p>
        `,
    });
};