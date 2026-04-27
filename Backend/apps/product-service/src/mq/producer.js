import { getChannel } from "@ecommerce/shared/mq"
import { QUEUES } from "@ecommerce/shared/queues"

//  name        String  @unique
//     description String
//     price       Float
//     category    String?
//     stock       Int     @default(0)

//  // ── Product Events ────────────────────────────────
//   PRODUCT_CREATED:        'product.created',       // admin creates product
//   PRODUCT_UPDATED:        'product.updated',       // admin updates product
//   PRODUCT_DELETED:        'product.deleted',       // admin deletes product


export const publishProductCreated = async (product) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.PRODUCT_CREATED, { durable: true });

    channel.sendToQueue(QUEUES.PRODUCT_CREATED, Buffer.from(JSON.stringify({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock
    }))
    , { persistent: true });

    console.log(`📤 Published: ${QUEUES.PRODUCT_CREATED}`);
}


export const publishProductUpdated = async (product) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.PRODUCT_UPDATED, { durable: true });

    channel.sendToQueue(QUEUES.PRODUCT_UPDATED, Buffer.from(JSON.stringify({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock
    }))
    , { persistent: true });

    console.log(`📤 Published: ${QUEUES.PRODUCT_UPDATED}`);
}


export const publishProductDeleted = async (product) => {

    const channel = getChannel();

    await channel.assertQueue(QUEUES.PRODUCT_DELETED, { durable: true });

    channel.sendToQueue(QUEUES.PRODUCT_DELETED, Buffer.from(JSON.stringify({
        productId: product.id
    }))
    , { persistent: true });

    console.log(`📤 Published: ${QUEUES.PRODUCT_DELETED}`);
}