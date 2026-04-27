import { getChannel } from '@ecommerce/shared/mq';
import { QUEUES } from '@ecommerce/shared/queues';


// // ── Order Events ──────────────────────────────────
//   ORDER_PLACED:           'order.placed',          // user places order
//   ORDER_CANCELLED:        'order.cancelled',       // user cancels order
//   ORDER_RETURNED:         'order.returned',        // user returns order
//   ORDER_STATUS_UPDATED:   'order.status.updated',  // admin updates status

// model Order {
//   id          Int      @id @default(autoincrement())
//   userId      Int
//   productId   Int
//   quantity    Int
//   totalPrice  Float
//   status      OrderStatus @default(pending)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// enum OrderStatus {
//   pending
//   confirmed
//   cancelled
//   shipped
//   delivered
//   returned
// }


export const publishOrderPlaced = async (order) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.ORDER_PLACED, { durable: true });

    channel.sendToQueue(QUEUES.ORDER_PLACED, Buffer.from(JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        paymentMethodId: order.paymentMethodId,
        createdAt: order.createdAt
    }))
        , { persistent: true });

    console.log(`📤 Published: ${QUEUES.ORDER_PLACED}`);

}

export const publishOrderCancelled = async (order) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.ORDER_CANCELLED, { durable: true });

    channel.sendToQueue(QUEUES.ORDER_CANCELLED, Buffer.from(JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        cancelReason: order.cancelReason ?? 'Cancelled by user',
        createdAt: order.createdAt
    }))
        , { persistent: true });

    console.log(`📤 Published: ${QUEUES.ORDER_CANCELLED}`);

}

export const publishOrderReturned = async (order) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.ORDER_RETURNED, { durable: true });

    channel.sendToQueue(QUEUES.ORDER_RETURNED, Buffer.from(JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        returnReason: order.returnReason ?? 'Returned by user',
        createdAt: order.createdAt
    }))
        , { persistent: true });

    console.log(`📤 Published: ${QUEUES.ORDER_RETURNED}`);

}

export const publishOrderStatusUpdated = async (order) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.ORDER_STATUS_UPDATED, { durable: true });

    channel.sendToQueue(QUEUES.ORDER_STATUS_UPDATED, Buffer.from(JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        prevStatus: order.prevStatus,  // ← was
        newStatus: order.status,       // ← now
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt
    }))
        , { persistent: true });

    console.log(`📤 Published: ${QUEUES.ORDER_STATUS_UPDATED}`);
}