import prisma from "../config/db.js";
import * as adminorderService from "../services/admin.order.service.js";

export const createOrder = async (orderData) => {

    const { userId, productId, quantity = 1, totalPrice } = orderData;

    if (!userId || !productId || !quantity || !totalPrice) {
        throw new Error('All fields are required');
    }

    const newOrder = await prisma.order.create({
        data: {
            userId: parseInt(userId),
            productId: parseInt(productId),
            quantity: parseInt(quantity),
            totalPrice: parseFloat(totalPrice),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'Pending'
        }
    });

    if (!newOrder) {
        throw new Error('Failed to create order');
    }

    return newOrder;

}


const getOrderDetails = async (orderId) => {

    const { userId, productId, quantity, totalPrice, status, createdAt } = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
    });


    if (!userId || !productId || !quantity || !totalPrice || !status || !createdAt) {
        throw new Error('Order not found');
    }

    return { userId, productId, quantity, totalPrice, status, createdAt };

}

