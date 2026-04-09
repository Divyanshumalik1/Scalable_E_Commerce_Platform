import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/product.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});


