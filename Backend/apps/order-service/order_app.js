import express from 'express';
import orderRouter from "./src/routes/order.routes.js";
import { connect } from "@ecommerce/shared/mq";
import { startConsumers } from './src/consumers/index.js';
import cors from 'cors';

const orderApp = express();

orderApp.use(cors());
orderApp.use(express.json());
orderApp.use('/api/order', orderRouter);

await connect();
await startConsumers();

const PORT = process.env.PORT || 5000;

orderApp.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});

export default orderApp;


// "prisma:migrate": "prisma migrate dev --name init",
//     "prisma:generate": "prisma generate"