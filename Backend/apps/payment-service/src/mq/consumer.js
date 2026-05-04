import { getChannel } from "@ecommerce/shared/mq";
import { QUEUES } from "@ecommerce/shared/queues";

export const consumeOrderPlaced = async (callback) => {

    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(QUEUES.ORDER_PLACED, { durable: true });

    channel.consume(QUEUES.ORDER_PLACED, async (msg) => {
        if (msg !== null) {
            try {
                const orderData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.ORDER_PLACED} - Order ID: ${orderData.orderId}`);
                await callback(orderData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.ORDER_PLACED}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.ORDER_PLACED}`);
};

export const consumeOrderCancelled = async (callback) => {

    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(QUEUES.ORDER_CANCELLED, { durable: true });

    channel.consume(QUEUES.ORDER_CANCELLED, async (msg) => {
        if (msg !== null) {
            try {
                const orderData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.ORDER_CANCELLED} - Order ID: ${orderData.orderId}`);
                await callback(orderData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.ORDER_CANCELLED}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.ORDER_CANCELLED}`);
};

export const consumeOrderReturned = async (callback) => {

    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(QUEUES.ORDER_RETURNED, { durable: true });

    channel.consume(QUEUES.ORDER_RETURNED, async (msg) => {
        if (msg !== null) {
            try {
                const orderData = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${QUEUES.ORDER_RETURNED} - Order ID: ${orderData.orderId}`);
                await callback(orderData);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${QUEUES.ORDER_RETURNED}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${QUEUES.ORDER_RETURNED}`);
};

