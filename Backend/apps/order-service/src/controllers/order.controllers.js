import prisma from "../config/db.js";
import { createOrder, getOrderDetails, fetchUserOrders, cancelOrder, returnOrder } from "../services/user.order.service.js";


// // Admin routes for managing orders
// orderRouter.get('/orders', fetchAllOrdersController); // get all orders (admin)
// orderRouter.put('/order/:id/status', updateOrderStatusController); // update order status (admin)

// Admin controllers
const fetchAllOrdersController = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const allOrders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            skip: skip,
            take: pageSize
        });

        const totalOrders = await prisma.order.count();
        const totalPages = Math.ceil(totalOrders / pageSize);

        if (!allOrders || allOrders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }

        res.status(200).json({
            data: allOrders,
            page: pageNumber,
            limit: pageSize,
            total: totalOrders,
            totalPages: totalPages
        });

    } catch (err) {
        res.status(500).json({ error: 'Error fetching orders: ' + err.message });
    }
};

const updateOrderStatusController = async(req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid order status' });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status: status }
        });

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    }catch(err) {
        res.status(500).json({ error: 'Error updating order status: ' + err.message });
    }
};


// // protected routes for authenticated users to place orders, view order details, and manage their orders
// orderRouter.post('/order', placeOrderController);
// orderRouter.get('/order/:id', fetchOrderDetailsController); // status, details, tracking info
// orderRouter.get('/order/user/:userId', fetchUserOrdersController); // order history for a user
// orderRouter.post('/order/:id/cancel', cancelOrderController); // cancel an order
// orderRouter.post('/order/:id/return', returnOrderController); // return/exchange items in an order


// Normal User controllers
const placeOrderController = async(req, res) => {
    try{
        const  {userId, productId, quantity, totalPrice}  = req.body;

        if(!userId || !productId || !quantity || !totalPrice) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newOrder = await createOrder(req.body);        

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }catch(err) {
        res.status(500).json({ error: 'Error placing order: ' + err.message });
    }
}


const fetchOrderDetailsController = async(req, res) => {
    try{

        const { id } = req.params;

        if(!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const orderDetails = await getOrderDetails(id);

        if(!orderDetails) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ data: orderDetails });

    }catch(err) {
        res.status(500).json({ error: 'Error fetching order details: ' + err.message });
    }
}

const fetchUserOrdersController = async(req, res) => {
    try{

        


    }catch(err) {

    }
}

const cancelOrderController = async(req, res) => {
    try{

    }catch(err) {

    }
}

const returnOrderController = async(req, res) => {
    try{

    }catch(err) {

    }
}

