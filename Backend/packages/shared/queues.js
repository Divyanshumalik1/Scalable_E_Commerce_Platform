export const QUEUES = {

  // ── User Events ──────────────────────────────────
  USER_CREATED:           'user.created',          // signup
  USER_UPDATED:           'user.updated',          // profile update
  USER_DELETED:           'user.deleted',          // account deleted

  // ── Product Events ────────────────────────────────
  PRODUCT_CREATED:        'product.created',       // admin creates product
  PRODUCT_UPDATED:        'product.updated',       // admin updates product
  PRODUCT_DELETED:        'product.deleted',       // admin deletes product

  // ── Order Events ──────────────────────────────────
  ORDER_PLACED:           'order.placed',          // user places order
  ORDER_CANCELLED:        'order.cancelled',       // user cancels order
  ORDER_RETURNED:         'order.returned',        // user returns order
  ORDER_STATUS_UPDATED:   'order.status.updated',  // admin updates status

  // ── Payment Events ────────────────────────────────
  PAYMENT_SUCCESS:        'payment.success',       // payment succeeded
  PAYMENT_FAILED:         'payment.failed',        // payment failed
  PAYMENT_REFUNDED:       'payment.refunded',      // refund processed

};