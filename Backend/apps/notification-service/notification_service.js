import express from 'express';
import dotenv from 'dotenv';
import { startConsumers } from './src/consumers/index.js';
import { connect } from "@ecommerce/shared/mq";

dotenv.config();

console.log('TWILIO_API_KEY:', process.env.TWILIO_API_KEY);

const notification_app = express();

notification_app.use(express.json());

await connect();
await startConsumers();

const PORT = process.env.PORT || 3006;

notification_app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});

export default notification_app;