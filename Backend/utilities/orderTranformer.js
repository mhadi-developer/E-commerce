// order builder

export const transformCheckoutSessionToOrder = (session , userID) => {
  if (!session || session.object !== "checkout.session") {
    throw new Error("Invalid Stripe Checkout Session object");
  }

 return {
    /* ---------------- User ---------------- */
     user: userID,

    /* ---------------- Stripe identifiers ---------------- */
    stripeSessionId: session.id,
    stripePaymentIntentId: session.payment_intent,

    /* ---------------- Payment state (Stripe) ---------------- */
    paymentStatus: session.payment_status,
    currency: session.currency,

    /* ---------------- Order lifecycle (Business) ---------------- */
    orderStatus: "pending",      // default on creation
    isDelivered: false,
    deliveredAt: null,

    /* ---------------- Amounts ---------------- */
    subtotalAmount: session.amount_subtotal,
    discountAmount: session.total_details?.amount_discount ?? 0,
    taxAmount: session.total_details?.amount_tax ?? 0,
    shippingAmount: session.total_details?.amount_shipping ?? 0,
    totalAmount: session.amount_total,

    /* ---------------- Line Items ---------------- */
    lineItems: (session.line_items?.data || []).map(item => {
      const unitAmount = item.price?.unit_amount ?? 0;
      const quantity = item.quantity ?? 1;

      return {
        name: item.description || "Unknown Product",
        priceId: item.price?.id || null,
        quantity,
        unitAmount,
        lineTotal: unitAmount * quantity,
        currency: item.price?.currency || session.currency,
        image: item.price?.product?.images?.[0] || null,
      };
    }),

    /* ---------------- Customer snapshot ---------------- */
    customer: {
      name: session.customer_details?.name || null,
      email: session.customer_details?.email || null,
      country: session.customer_details?.address?.country || null,
    },

  };
};
