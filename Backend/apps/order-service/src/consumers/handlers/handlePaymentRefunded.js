import { updateOrders, getOrderById } from "../../services/admin.order.service.js";

export const handlePaymentRefunded = async (paymentData) => {
    const { orderId, paymentId } = paymentData;

    const order = await getOrderById(orderId);

    // if returnReason exists → it's a return, otherwise it's a cancel
    const orderStatus = order.returnReason ? 'returned' : 'cancelled';

    await updateOrders(orderId,  orderStatus);

    console.log(`✅ Order updated to '${orderStatus}' | orderId: ${orderId}, paymentId: ${paymentId}`);
};