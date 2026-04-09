import express from 'express';

const orderRouter = express.Router();

/*

process orders -> place order, tracking order status, managing order history -> 

users use this service to place an ORDER from PRODUCT by USER , check status, view order history, cancel order, return/exchange items, 

order is put for product, then we 

*/


// Admin routes for managing orders
orderRouter.get('/orders', fetchAllOrdersController); // get all orders (admin)
orderRouter.put('/order/:id/status', updateOrderStatusController); // update order status (admin)

// protected routes for authenticated users to place orders, view order details, and manage their orders
orderRouter.post('/order', placeOrderController);
orderRouter.get('/order/:id', fetchOrderDetailsController); // status, details, tracking info
orderRouter.get('/order/user/:userId', fetchUserOrdersController); // order history for a user
orderRouter.post('/order/:id/cancel', cancelOrderController); // cancel an order
orderRouter.post('/order/:id/return', returnOrderController); // return/exchange items in an order