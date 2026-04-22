import { getChannel } from '@ecommerce/shared/mq';
import { QUEUES } from '@ecommerce/shared/queues';

export async function publishUserCreated(user) {
    const channel = getChannel();

    await channel.assertQueue(QUEUES.USER_CREATED, { durable: true });
    channel.sendToQueue(
        QUEUES.USER_CREATED,
        Buffer.from(JSON.stringify({
            userId: user._id,
            email: user.email,
            username: user.username,
            createdAt: new Date(),
        })),
        { persistent: true }
    );

    console.log(`📤 Published: ${QUEUES.USER_CREATED}`);
}