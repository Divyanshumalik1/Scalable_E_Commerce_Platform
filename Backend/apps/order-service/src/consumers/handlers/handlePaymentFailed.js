import { updateOrders } from "../../services/admin.order.service.js";

export const handlePaymentFailed = async (paymentData) => {

    const {orderId, paymentId} = paymentData;

    await updateOrders(orderId, 'failed');

    console.log(`✅ Order updated to 'failed' | orderId: ${orderId}, paymentId: ${paymentId}`);

}
