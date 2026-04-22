import express from 'express';

const paymentRouter = express.Router();

// Process payment for order/create, get payment details, get payment history
// Refunds
// Admin -> get all payments, manage refunds, update payment status, 


// Admin routes 
paymentRouter.get('/payment', GetallPaymentsController); // get all payments (admin)
paymentRouter.post('/payment/:id/status', updatePaymentStatusController); // update payment status (admin)

// protected routes for authenticated users to create payments, view payment details, and manage their payments
paymentRouter.post('/payment/create', createPaymentController); // create a new payment
paymentRouter.get('/payment/user/:userId', fetchUserPaymentsController); // get payment history for a user
paymentRouter.get('/payment/:id', fetchPaymentDetailsController); // get payment details for an order
paymentRouter.post('/payment/:id/refund', processRefundController); // process a refund for a payment


export default paymentRouter;