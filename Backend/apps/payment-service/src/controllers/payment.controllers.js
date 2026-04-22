

// // Admin routes 
// paymentRouter.get('/payment', GetallPaymentsController); // get all payments (admin)
// paymentRouter.post('/payment/:id/status', updatePaymentStatusController); // update payment status (admin)



export const updatePaymentStatusController = async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ message: 'Payment ID and status are required' });
        }

        const updatedPayment = await updatePaymentStatus(id, status);

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        return res.status(200).json({ message: 'Payment status updated successfully', payment: updatedPayment });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

};


export const GetallPaymentsController = async (req, res) => {
    try {
        const payments = await getAllPayments();
        return res.status(200).json({ data: payments });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}


// // protected routes for authenticated users to create payments, view payment details, and manage their payments
// paymentRouter.post('/payment/create', createPaymentController); // create a new payment
// paymentRouter.get('/payment/user/:userId', fetchUserPaymentsController); // get payment history for a user
// paymentRouter.get('/payment/:id', fetchPaymentDetailsController); // get payment details for an order
// paymentRouter.post('/payment/:id/refund', processRefundController); // process a refund for a payment



export const createPaymentController = async (req, res) => {

    try {

        const newPayment = await createPayment(req.body);

        if (!newPayment) {
            return res.status(400).json({ message: 'amount, method, orderId and userId are required' });
        }

        return res.status(201).json({ message: 'Payment created successfully', payment: newPayment });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}


export const fetchUserPaymentsController = async (req, res) => {

    try {
        const { userId } = req.params;
        const paymentHistory = await fetchUserPayments(userId);

        if (!paymentHistory) {
            return res.status(404).json({ message: 'No payments found for this user' });
        }

        return res.status(200).json({ data: paymentHistory });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}


export const fetchPaymentDetailsController = async (req, res) => {

    try {
        const { id } = req.params;

        const paymentDetails = await fetchPaymentDetails(id);

        if (!paymentDetails) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        return res.status(200).json({ data: paymentDetails });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}


export const processRefundController = async (req, res) => {

    try {
        const { id } = req.params;
        const refundResult = await processRefund(id);

        if (!refundResult) {
            return res.status(404).json({ message: 'Payment not found or refund failed' });
        }

        return res.status(200).json({ message: 'Refund processed successfully', refund: refundResult });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}