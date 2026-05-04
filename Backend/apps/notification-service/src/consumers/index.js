import {
    consumeUserCreated,
    consumeOrderPlaced, consumeOrderCancelled, consumeOrderReturned,
    consumePaymentSuccess, consumePaymentFailed, consumePaymentRefunded,
} from '../mq/consumers.js';

import { handleUserCreated }      from './handlers/handleUserCreated_N.js';
import { handleOrderPlaced }      from './handlers/handleOrderPlaced_N.js';
import { handleOrderCancelled }   from './handlers/handleOrderCancelled_N.js';
import { handleOrderReturned }    from './handlers/handlerOrderReturned_N.js';
import { handlePaymentSuccess }   from './handlers/handlePaymentSuccess_N.js';
import { handlePaymentFailed }    from './handlers/handlePaymentFailed_N.js';
import { handlePaymentRefunded }  from './handlers/handlePaymentRefunded_N.js';

export const startConsumers = async () => {
    await consumeUserCreated(handleUserCreated);
    await consumeOrderPlaced(handleOrderPlaced);
    await consumeOrderCancelled(handleOrderCancelled);
    await consumeOrderReturned(handleOrderReturned);
    await consumePaymentSuccess(handlePaymentSuccess);
    await consumePaymentFailed(handlePaymentFailed);
    await consumePaymentRefunded(handlePaymentRefunded);

    console.log('👂 All NotificationService consumers started');
};

