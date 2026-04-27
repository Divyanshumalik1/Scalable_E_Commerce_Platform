 import { getChannel } from "@ecommerce/shared/mq";
import { QUEUES } from "@ecommerce/shared/queues";

export const publishPaymentProcessed = async (payment) => {

    const channel = await getChannel();

    await channel.assertQueue(QUEUES.PAYMENT_SUCCESS, { durable: true });

    channel.sendToQueue(QUEUES.PAYMENT_SUCCESS, Buffer.from(JSON.stringify({
        paymentId: payment.id,
        orderId: payment.orderId,
        userId: payment.userId,
        amount: payment.amount,
        status: payment.status,
        paymentMethodId: payment.paymentMethodId,
        createdAt: payment.createdAt
    }))
        , { persistent: true });    

    console.log(`📤 Published: ${QUEUES.PAYMENT_SUCCESS}`);
};


export const publishPaymentFailed = async (payment) => {

    const channel = await getChannel();     

    await channel.assertQueue(QUEUES.PAYMENT_FAILED, { durable: true });

    channel.sendToQueue(QUEUES.PAYMENT_FAILED, Buffer.from(JSON.stringify({
        paymentId: payment.id,
        orderId: payment.orderId,
        userId: payment.userId, 
        amount: payment.amount,
        status: payment.status,
        paymentMethodId: payment.paymentMethodId,
        createdAt: payment.createdAt
    }))
        , { persistent: true });    
    console.log(`📤 Published: ${QUEUES.PAYMENT_FAILED}`);
};

export const publishRefundProcessed = async (refund) => {

    const channel = await getChannel();

    await channel.assertQueue(QUEUES.PAYMENT_REFUNDED, { durable: true });

    channel.sendToQueue(QUEUES.PAYMENT_REFUNDED, Buffer.from(JSON.stringify({
        paymentId: refund.id,
        orderId: refund.orderId,
        userId: refund.userId,
        amount: refund.amount,
        status: refund.status,
        paymentMethodId: refund.paymentMethodId,
        createdAt: refund.createdAt
    }))
        , { persistent: true });    
    console.log(`📤 Published: ${QUEUES.PAYMENT_REFUNDED}`);
};

