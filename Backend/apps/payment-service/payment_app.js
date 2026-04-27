import express from 'express';
import paymentRouter from "./src/routes/payment.routes.js";
import { connect } from "@ecommerce/shared/mq";
import dotenv from 'dotenv';

dotenv.config();

import { startConsumers } from './src/consumers/index.js';

const paymentApp = express();

paymentApp.use(express.json());
paymentApp.use('/api', paymentRouter);

await connect();
await startConsumers();

const PORT = process.env.PORT || 3004;

paymentApp.listen(PORT, () => {
    console.log(`Payment service running on port ${PORT}`);
});

export default paymentApp;

// "prisma:migrate": "prisma migrate dev --name init",
//     "prisma:generate": "prisma generate"
