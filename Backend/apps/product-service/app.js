import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/product.routes.js';
import {connect} from '@ecommerce/shared/mq';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

// Connect to RabbitMQ before starting the server
await connect();

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});


