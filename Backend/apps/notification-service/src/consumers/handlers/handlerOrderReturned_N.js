import { sendEmail } from '../../services/email.service.js';

export const handleOrderReturned = async (data) => {
    const { orderId, userId, email, totalPrice, returnReason } = data;

    if (!email) {
        console.warn(`⚠️ No email in order.returned event for userId: ${userId}.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Return Initiated — #${orderId}`,
        html: `
            <h2>Your return request has been received.</h2>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Reason:</strong> ${returnReason}</p>
            <p><strong>Refund amount:</strong> $${totalPrice}</p>
            <p>Your refund will be processed within 5–7 business days.</p>
        `,
    });
};