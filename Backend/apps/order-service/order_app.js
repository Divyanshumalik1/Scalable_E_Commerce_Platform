import express from 'express';
import orderRouter from "./src/routes/order.routes.js";
import { connect } from "@ecommerce/shared/mq";

const orderApp = express();

orderApp.use(express.json());
orderApp.use('/api', orderRouter);

await connect();

const PORT = process.env.PORT || 5000;

orderApp.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});

export default orderApp;


// "prisma:migrate": "prisma migrate dev --name init",
//     "prisma:generate": "prisma generate"