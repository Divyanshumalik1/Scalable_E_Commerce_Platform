import { sendEmail } from '../../services/email.service.js';

export const handlePaymentRefunded = async (data) => {
    const { paymentId, orderId, userId, email, amount } = data;

    if (!email) {
        console.warn(`⚠️ No email in payment.refunded event for userId: ${userId}.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Refund Processed — $${amount}`,
        html: `
            <h2>Your refund has been processed.</h2>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Refund amount:</strong> $${amount}</p>
            <p>Funds will appear in 5–7 business days depending on your bank.</p>
        `,
    });
};