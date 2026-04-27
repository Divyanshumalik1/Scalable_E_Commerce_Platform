// src/consumers/index.js
import { consumeOrderPlaced, consumeOrderCancelled, consumeOrderReturned } from '../mq/consumer.js';
import { handleOrderPlaced }    from './handlers/handleOrderPlaced.js';
import { handleOrderCancelled } from './handlers/handleOrderCancelled.js';
import { handleOrderReturned }  from './handlers/handleOrderReturned.js';

export const startConsumers = async () => {
    await consumeOrderPlaced(handleOrderPlaced);
    await consumeOrderCancelled(handleOrderCancelled);
    await consumeOrderReturned(handleOrderReturned);

    console.log('👂 All PaymentService consumers started');
};