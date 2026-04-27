// handleOrderReturned.js
import stripe from "../../config/stripe.js";
import { findPaymentByOrderId, processRefund } from "../../services/payment.services.js";
import { publishRefundProcessed } from "../../mq/producer.js";

export const handleOrderReturned = async (orderData) => {
    const { orderId } = orderData;

    const payment = await findPaymentByOrderId(orderId);

    if (!payment) {
        console.log(`⚠️ No payment found for orderId: ${orderId}`);
        return;
    }

    if (payment.stripePaymentIntentId) {
        await stripe.refunds.create({
            payment_intent: payment.stripePaymentIntentId,
        });
        console.log(`💰 Stripe refund created | orderId: ${orderId}`);
    }

    const refundedPayment = await processRefund(payment.id);
    await publishRefundProcessed(refundedPayment);
    console.log(`✅ Return refund processed | orderId: ${orderId}`);
};