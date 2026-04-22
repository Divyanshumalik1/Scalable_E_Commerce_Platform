import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.routes.js';
import connectDB from './src/config/db.js';
import {connect} from '@ecommerce/shared/mq';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

await connectDB();

// Connect to RabbitMQ
await connect();

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;