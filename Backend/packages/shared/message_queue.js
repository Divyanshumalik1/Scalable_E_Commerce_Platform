// packages/shared/message_queue.js
import amqp from 'amqplib';

let connection = null;
let channel = null;

export async function connect(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();

      connection.on('close', () => {
        console.log('RabbitMQ connection closed, reconnecting...');
        setTimeout(() => connect(), 5000);
      });

      connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err.message);
      });

      console.log('✅ RabbitMQ connected');
      return channel;
    } catch (err) {
      console.log(`⏳ RabbitMQ not ready, retry ${i + 1}/${retries}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error('❌ Could not connect to RabbitMQ');
}

export function getChannel() {
  if (!channel) throw new Error('MQ not initialized. Call connect() first.');
  return channel;
}