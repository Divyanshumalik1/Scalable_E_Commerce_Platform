import prisma from "../config/db.js";

// orderRouter.post('/order', placeOrderController);
export const createOrder = async (orderData) => {

    const { userId, productId, quantity = 1 } = orderData;

    if (!userId || !productId || !quantity) {
        throw new Error('All fields are required');
    }

    // const product = await prisma.product.findUnique({
    //     where: { id: parseInt(productId) }
    // });

    // if (!product) {
    //     throw new Error('Product not found');
    // }


    // HTTP call to product-service
    const response = await fetch(`http://product-service:3002/api/products/product/${productId}`);

    if (!response.ok) {
        throw new Error('Product not found');
    }

    const data = await response.json();
    const product = data.product;

    if (!product) {
        throw new Error('Product not found');
    }

    const newOrder = await prisma.order.create({
        data: {
            userId: parseInt(userId),
            productId: parseInt(productId),
            quantity: parseInt(quantity),
            totalPrice: parseFloat(product.price) * parseInt(quantity),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'pending',
            paymentMethodId: orderData.paymentMethodId,
            paymentIntentId: orderData.paymentIntentId,
            cancelReason: orderData.cancelReason,
            returnReason: orderData.returnReason
        }
    });

    if (!newOrder) {
        throw new Error('Failed to create order');
    }

    return newOrder;

}

// orderRouter.get('/order/:id', fetchOrderDetailsController); // status, details, tracking info
export const getOrderDetails = async (orderId) => {

    const orderData = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });


    if (!orderData) {
        throw new Error('Order not found');
    }

    const { userId, productId, quantity, totalPrice, status, createdAt, updatedAt, paymentMethodId, paymentIntentId, cancelReason, returnReason } = orderData;

    if (!userId || !productId || !quantity || !totalPrice || !status || !createdAt || !updatedAt || !paymentMethodId) {
        throw new Error('Incomplete order data');
    }

    return { userId, productId, quantity, totalPrice, status, createdAt, updatedAt, paymentMethodId, paymentIntentId, cancelReason, returnReason };

}


// orderRouter.get('/order/user/:userId', fetchUserOrdersController); // order history for a user
export const fetchUserOrders = async (userId) => {

    const userOrders = await prisma.order.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: 'desc' }
    })

    if (!userOrders || userOrders.length === 0) {
        throw new Error('No orders found for this user');
    }

    return userOrders;
}


// orderRouter.post('/order/:id/cancel', cancelOrderController); // cancel an order
export const cancelOrder = async (orderId, cancelReason) => {

    const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });

    if (!order) {
        throw new Error('Order not found');
    }

    if (order.status !== 'confirmed' && order.status !== 'pending') {
        throw new Error('Only pending or confirmed orders can be cancelled');
    }

    try {
        const cancelledOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: 'cancelled', updatedAt: new Date(), cancelReason: order.cancelReason ?? 'Cancelled by user' }
        });

        return cancelledOrder;

    } catch (err) {
        throw new Error('Error cancelling order: ' + err.message);
    }
}


// orderRouter.post('/order/:id/return', returnOrderController); // return/exchange items in an order 
// ************************** add exchange functionality later **************************
export const returnOrder = async (orderId, returnReason) => {

    const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });

    if (!order) {
        throw new Error('Order not found');
    }

    if (order.status !== 'delivered') {
        throw new Error('Only delivered orders can be returned');
    }

    try {
        const returnedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: 'returned', updatedAt: new Date(), returnReason: returnReason ?? 'Returned by user' }
        });

        return returnedOrder;

    } catch (err) {
        throw new Error('Error returning order: ' + err.message);
    }
}
