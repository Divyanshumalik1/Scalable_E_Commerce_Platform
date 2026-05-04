import { QUEUES } from "@ecommerce/shared/queues";
import { updateOrders} from "../../services/admin.order.service.js";

// model Order {
//   id                Int      @id @default(autoincrement())
//   userId            Int
//   productId         Int
//   quantity          Int
//   totalPrice        Float
//   status            OrderStatus @default(pending)
//   paymentMethodId   String      // from Stripe.js on frontend
//   paymentIntentId   String?     // set by PaymentService after Stripe charge
//   cancelReason      String?
//   returnReason      String?
//   createdAt         DateTime @default(now())
//   updatedAt         DateTime @updatedAt

// }

// enum OrderStatus {
//   pending
//   confirmed
//   cancelled
//   shipped
//   delivered
//   returned
//   failed
// }

export const handlePaymentSuccess = async (paymentData) => {

    const {orderId, paymentId} = paymentData;

    await updateOrders(orderId, 'confirmed');

    console.log(`✅ Order updated to 'confirmed' | orderId: ${orderId}, paymentId: ${paymentId}`);

}