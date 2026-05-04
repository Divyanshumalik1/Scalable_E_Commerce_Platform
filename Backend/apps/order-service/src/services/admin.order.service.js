import prisma from "../config/db.js";
// // Admin routes for managing orders
// orderRouter.get('/orders', fetchAllOrdersController); // get all orders (admin)

export const fetchOrders = async (query) => {

    const { page, limit } = query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const allOrders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: pageSize
    });

    if (!allOrders || allOrders.length === 0) {
        throw new Error('No orders found');
    }

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / pageSize);


    return { allOrders, pageNumber, pageSize, totalOrders, totalPages };

}


// orderRouter.put('/order/:id/status', updateOrderStatusController); // update order status (admin)
export const updateOrders = async (orderId, status) => {
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'failed']; // ✅ added failed

    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status value');
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: status, updatedAt: new Date() }
        });

        return updatedOrder;
    } catch (err) {
        throw new Error('Error updating order status: ' + err.message);
    }
}


// ✅ add this for handlePaymentRefunded
export const getOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });
}