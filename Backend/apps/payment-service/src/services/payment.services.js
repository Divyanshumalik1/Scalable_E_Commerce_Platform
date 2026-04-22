import prisma from "../../../product-service/src/config/db"

export const getAllPayments = async () => {
    try{
        const payments = await prisma.payment.findMany({
            orderBy: { createdAt: 'desc' }
        })

        if(!payments || payments.length === 0){
            throw new Error('No payments found');
        }

        return payments;

    }catch(err){

        console.error("Error fetching payments:", err);
        throw err;

    }
}

export const UpdatePaymentStatus = async (paymentId, status) => {

    const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
    
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status value');
    }   

    try {
        const updatedPayment = await prisma.payment.update({
            where: { id: parseInt(paymentId) },
            data: { status: status, updatedAt: new Date() }
        });

        if(!updatedPayment){
            throw new Error('Failed to update payment status');
        }

        return updatedPayment;

    }catch(err){
        console.error("Error updating payment status:", err);
        throw err;
    }
}

export const createPayment = async (paymentData) => {

    try{

        const payment = await prisma.payment.create({
            data: {
                userId: parseInt(paymentData.userId),
                orderId: parseInt(paymentData.orderId),
                amount: parseFloat(paymentData.amount),
                method: paymentData.method,
                currency: paymentData.currency || 'USD',
            }
        })

        if(!payment){
            throw new Error('Failed to create payment');
        }

        return payment;

    }catch(err){
        console.error("Error creating payment:", err);
        throw err;
    }
}

export const fetchUserPayments = async (userId) => {

    try{

        const userPayments = await prisma.payment.findMany({
            where: {userId: parseInt(userId)},
            orderBy: { createdAt: 'desc' }
        })

        if(!userPayments || userPayments.length === 0){
            throw new Error('No payments found for this user');
        }   

        return userPayments;

    }catch(err){
        console.error("Error fetching user payments:", err);
        throw err;
    }
}

export const fetchPaymentDetails = async (paymentId) => {

    try{

        const paymentDetails = await prisma.payment.findUnique({
            where: {id: parseInt(paymentId)}
        })

        if(!paymentDetails){
            throw new Error('Payment not found');
        }

        return paymentDetails;

    }catch(err){
        console.error("Error fetching payment details:", err);
        throw err;
    }
}

export const processRefund = async (paymentId) => {

    try{

        const payment = await prisma.payment.findUnique({
            where: {id: parseInt(paymentId)}
        })

        if(!payment){
            throw new Error('Payment not found');
        }

        const refundResult = await prisma.payment.update({
            where: {id: parseInt(paymentId)},
            data: {
                status: 'refunded',
                updatedAt: new Date(),
                failureReason: 'Refund processed successfully'
            }
        })
        return refundResult;


    }catch(err){
        console.error("Error processing refund:", err);
        throw err;
    }

}