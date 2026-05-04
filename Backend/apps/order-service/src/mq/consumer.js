import { getChannel } from "@ecommerce/shared/mq";
import { QUEUES } from "@ecommerce/shared/queues";

export const consumePaymentSuccess = async (callback) => {

    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(QUEUES.PAYMENT_SUCCESS, { durable: true });

    channel.consume(QUEUES.PAYMENT_SUCCESS, async (msg) => {
        if (msg !== null) {
            try {
                const paymentData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.PAYMENT_SUCCESS} - Payment ID: ${paymentData.paymentId}`);
                await callback(paymentData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.PAYMENT_SUCCESS}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.PAYMENT_SUCCESS}`);

};


export const consumePaymentFailed = async (callback) => {

    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(QUEUES.PAYMENT_FAILED, { durable: true });

    channel.consume(QUEUES.PAYMENT_FAILED, async (msg) => {
        if (msg !== null) {
            try {
                const paymentData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.PAYMENT_FAILED} - Payment ID: ${paymentData.paymentId}`);
                await callback(paymentData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.PAYMENT_FAILED}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.PAYMENT_FAILED}`);
}


export const consumePaymentRefunded = async (callback) => {


    const channel = getChannel();
    channel.prefetch(1);


    await channel.assertQueue(QUEUES.PAYMENT_REFUNDED, { durable: true });

    channel.consume(QUEUES.PAYMENT_REFUNDED, async (msg) => {
        if (msg !== null) {
            try {
                const paymentData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.PAYMENT_REFUNDED} - Payment ID: ${paymentData.paymentId}`);
                await callback(paymentData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.PAYMENT_REFUNDED}:`, err.message);
                channel.nack(msg, false, false);
            }
        }


    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.PAYMENT_REFUNDED}`);
}