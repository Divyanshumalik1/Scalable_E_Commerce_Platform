import { sendEmail } from '../../services/email.service.js';

export const handleOrderCancelled = async (data) => {
    const { orderId, userId, email, totalPrice, cancelReason } = data;

    if (!email) {
        console.warn(`⚠️ No email in order.cancelled event for userId: ${userId}.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Order Cancelled — #${orderId}`,
        html: `
            <h2>Your order has been cancelled.</h2>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Reason:</strong> ${cancelReason}</p>
            <p><strong>Refund amount:</strong> $${totalPrice}</p>
            <p>If you did not request this, please contact support.</p>
        `,
    });
};