import express from 'express';
import { createProductController, updateProductController, deleteProductController, fetchProductDetailsController, listProductsController } from '../controllers/product.controllers.js';

const productRouter = express.Router();

// create product listing, update product listing, delete product listing, fetch product details, list products with pagination and filtering, 

//Protected routes for admin users - add auth middleware to protect these routes *********************
productRouter.post('/create', createProductController);

productRouter.put('/product/:id', updateProductController);

productRouter.delete('/product/:id', deleteProductController);


// Unprotected routes for all users to view products and details
productRouter.get('/product/list', listProductsController);

productRouter.get('/product/:id', fetchProductDetailsController);


export default productRouter;