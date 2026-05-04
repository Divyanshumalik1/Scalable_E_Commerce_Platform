import { getChannel } from "@ecommerce/shared/mq";
import { QUEUES } from "@ecommerce/shared/queues";

const createConsumer = (queueName, getLogId) => async (callback) => {
    const channel = getChannel();
    channel.prefetch(1);

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            try {
                const data = JSON.parse(msg.content.toString());
                console.log(`📥 Received: ${queueName} - ${getLogId(data)}`);
                await callback(data);
                channel.ack(msg);
            } catch (err) {
                console.error(`❌ Error processing ${queueName}:`, err.message);
                channel.nack(msg, false, false);
            }
        }
    }, { noAck: false });

    console.log(`✅ Consumer set up for queue: ${queueName}`);
};

// ── Order Events ──────────────────────────────────
export const consumeOrderPlaced    = createConsumer(QUEUES.ORDER_PLACED,    d => `Order ID: ${d.orderId}`);
export const consumeOrderCancelled = createConsumer(QUEUES.ORDER_CANCELLED, d => `Order ID: ${d.orderId}`);
export const consumeOrderReturned  = createConsumer(QUEUES.ORDER_RETURNED,  d => `Order ID: ${d.orderId}`);

// ── Payment Events ────────────────────────────────
export const consumePaymentSuccess  = createConsumer(QUEUES.PAYMENT_SUCCESS,  d => `Payment ID: ${d.paymentId}`);
export const consumePaymentFailed   = createConsumer(QUEUES.PAYMENT_FAILED,   d => `Payment ID: ${d.paymentId}`);
export const consumePaymentRefunded = createConsumer(QUEUES.PAYMENT_REFUNDED, d => `Payment ID: ${d.paymentId}`);

// ── User Events ───────────────────────────────────
export const consumeUserCreated = createConsumer(QUEUES.USER_CREATED, d => `User ID: ${d.userId}`);


// `d` is the parsed message data object passed to the `getLogId` function inside `createConsumer`:

// ```js
// const data = JSON.parse(msg.content.toString());
// console.log(`📥 Received: ${queueName} - ${getLogId(data)}`);  // ← data is passed here
// ```

// So when you write:
// ```js
// createConsumer(QUEUES.ORDER_PLACED, d => `Order ID: ${d.orderId}`)
// ```

// `d` = `data` = the parsed RabbitMQ message payload, e.g.:
// ```json
// { "orderId": 42, "userId": 7, "totalPrice": 99.99, ... }
// ```

// It's just a short parameter name for the callback that extracts the log-worthy field. You could name it anything — `data`, `payload`, `msg` — `d` is just concise.