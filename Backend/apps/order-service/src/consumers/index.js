import { consumePaymentSuccess, consumePaymentFailed, consumePaymentRefunded } from '../mq/consumer.js';
import { handlePaymentSuccess }  from './handlers/handlePaymentSuccess.js';
import { handlePaymentFailed }   from './handlers/handlePaymentFailed.js';
import { handlePaymentRefunded } from './handlers/handlePaymentRefunded.js';

export const startConsumers = async () => {
    await consumePaymentSuccess(handlePaymentSuccess);
    await consumePaymentFailed(handlePaymentFailed);
    await consumePaymentRefunded(handlePaymentRefunded);

    console.log('👂 All OrderService consumers started');
};