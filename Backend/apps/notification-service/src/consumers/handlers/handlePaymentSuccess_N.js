import { sendEmail } from '../../services/email.service.js';

export const handlePaymentSuccess = async (data) => {
    const { paymentId, orderId, userId, email, amount } = data;

    if (!email) {
        console.warn(`⚠️ No email in payment.success event for userId: ${userId}.`);
        return;
    }

    await sendEmail({
        to: email,
        subject: `Payment Received — $${amount}`,
        html: `
            <h2>Payment successful!</h2>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Amount charged:</strong> $${amount}</p>
            <p>Thank you for your purchase.</p>
        `,
    });
};