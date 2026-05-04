// handleOrderCancelled.js
import stripe from "../../config/stripe.js";
import { findPaymentByOrderId, processRefund } from "../../services/payment.services.js";
import { publishRefundProcessed } from "../../mq/producer.js";

export const handleOrderCancelled = async (orderData) => {
    const { orderId } = orderData;

    const payment = await findPaymentByOrderId(orderId);

    if (!payment) {
        console.log(`⚠️ No payment found for orderId: ${orderId} — skipping`);
        return;
    }

    if (payment.stripePaymentIntentId) {
        const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Can't cancel a succeeded payment — issue a refund via Stripe instead
            await stripe.refunds.create({ payment_intent: payment.stripePaymentIntentId });
            console.log(`💰 Stripe refund issued | orderId: ${orderId}`);
        } else {
            // Safe to cancel directly
            await stripe.paymentIntents.cancel(payment.stripePaymentIntentId);
            console.log(`🚫 Stripe intent cancelled | orderId: ${orderId}`);
        }
    }

    const refundedPayment = await processRefund(payment.id);
    await publishRefundProcessed(refundedPayment);
    console.log(`✅ Refund processed | orderId: ${orderId}`);
};