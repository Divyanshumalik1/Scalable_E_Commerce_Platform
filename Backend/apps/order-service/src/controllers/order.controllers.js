import prisma from "../config/db.js";
import { fetchOrders, updateOrders } from "../services/admin.order.service.js";
import { createOrder, getOrderDetails, fetchUserOrders, cancelOrder, returnOrder } from "../services/user.order.service.js";


// Admin controllers

// orderRouter.get('/orders', fetchAllOrdersController);
const fetchAllOrdersController = async (req, res) => {
    try {
        const query = req.query;

        if (!query.page || !query.limit) {
            return res.status(400).json({ error: 'Page and limit query parameters are required' });
        }

        const Data = await fetchOrders(query);

        res.status(200).json({
            data: Data.allOrders,
            page: Data.pageNumber,
            limit: Data.pageSize,
            total: Data.totalOrders,
            totalPages: Data.totalPages
        });

    } catch (err) {
        if (err.message === 'No orders found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error fetching orders: ' + err.message });
    }
};


// orderRouter.put('/order/:id/status', updateOrderStatusController);
const updateOrderStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ error: 'Order ID and status are required' });
        }

        const updatedOrder = await updateOrders(id, status);

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (err) {
        if (err.message === 'Order not found') {
            return res.status(404).json({ error: err.message });
        }
        if (err.message === 'Invalid status value') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error updating order status: ' + err.message });
    }
};


// User controllers

// orderRouter.post('/order', placeOrderController);
const placeOrderController = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'userId, productId and quantity are required' });
        }

        const newOrder = await createOrder({ userId, productId, quantity });

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        if (err.message === 'Product not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error placing order: ' + err.message });
    }
}


// orderRouter.get('/order/:id', fetchOrderDetailsController);
const fetchOrderDetailsController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const orderDetails = await getOrderDetails(id);

        res.status(200).json({ data: orderDetails });
    } catch (err) {
        if (err.message === 'Order not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error fetching order details: ' + err.message });
    }
}


// orderRouter.get('/order/user/:userId', fetchUserOrdersController);
const fetchUserOrdersController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const userOrders = await fetchUserOrders(userId);

        res.status(200).json({ data: userOrders });
    } catch (err) {
        if (err.message === 'No orders found for this user') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error fetching user orders: ' + err.message });
    }
}


// orderRouter.post('/order/:id/cancel', cancelOrderController);
const cancelOrderController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const cancelledOrder = await cancelOrder(id);

        res.status(200).json({ message: 'Order cancelled successfully', order: cancelledOrder });
    } catch (err) {
        if (err.message === 'Order not found') {
            return res.status(404).json({ error: err.message });
        }
        if (err.message === 'Only pending or confirmed orders can be cancelled') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error cancelling order: ' + err.message });
    }
}


// orderRouter.post('/order/:id/return', returnOrderController);
const returnOrderController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const returnedOrder = await returnOrder(id);

        res.status(200).json({ message: 'Order returned successfully', order: returnedOrder });
    } catch (err) {
        if (err.message === 'Order not found') {
            return res.status(404).json({ error: err.message });
        }
        if (err.message === 'Only delivered orders can be returned') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error returning order: ' + err.message });
    }
}


export {
    fetchAllOrdersController,
    updateOrderStatusController,
    placeOrderController,
    fetchOrderDetailsController,
    fetchUserOrdersController,
    cancelOrderController,
    returnOrderController
};