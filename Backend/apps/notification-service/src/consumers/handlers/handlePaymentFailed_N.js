import { sendEmail } from '../../services/email.service.js';

export const handlePaymentFailed = async (data) => {
    const { paymentId, orderId, userId, email, amount } = data;

    if (!email) {
        console.warn(`⚠️ No email in payment.failed event for userId: ${userId}.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Payment Failed — Action Required`,
        html: `
            <h2>Your payment could not be processed.</h2>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Amount:</strong> $${amount}</p>
            <p>Please update your payment method and try again.</p>
        `,
    });
};