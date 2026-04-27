
// model Payment {
//   id                      Int @id @default(autoincrement())
//   orderId                 Int @unique
//   userId                  Int
//   amount                  Float
//   method                  String
//   currency                String @default("USD")
//   status                  PaymentStatus @default(pending)
//   stripePaymentIntentId   String? @unique
//   failureReason           String?
//   createdAt               DateTime @default(now())
//   updatedAt               DateTime @updatedAt

// }

// enum PaymentStatus {
//   pending
//   completed
//   failed
//   refunded
// }

// src/consumers/handlers/handleOrderPlaced.js
import stripe from '../../config/stripe.js';
import { createPayment } from '../../services/payment.services.js';
import { publishPaymentProcessed, publishPaymentFailed } from '../../mq/producer.js';

export const handleOrderPlaced = async (orderData) => {
    const { orderId, userId, totalPrice, paymentMethodId } = orderData;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:         Math.round(totalPrice * 100),
            currency:       'usd',
            payment_method: paymentMethodId,
            confirm:        true,
            return_url:     'http://localhost:3000/payment/complete'
        });

        const payment = await createPayment({
            orderId,
            userId,
            amount:                totalPrice,
            method:                'card',
            currency:              'USD',
            status:                'completed',
            stripePaymentIntentId: paymentIntent.id,
        });

        await publishPaymentProcessed(payment);
        console.log(`✅ Payment success | orderId: ${orderId}`);

    } catch (err) {
        console.error(`❌ Stripe charge failed | orderId: ${orderId}:`, err.message);

        const payment = await createPayment({
            orderId,
            userId,
            amount:        totalPrice,
            method:        'card',
            currency:      'USD',
            status:        'failed',
            failureReason: err.message,
        });

        await publishPaymentFailed(payment);
        throw err; // ← rethrow so consumer nacks
    }
};