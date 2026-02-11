import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    priceId: {
      type: String,
        required: true,
       
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitAmount: {
      type: Number,
      required: true,
    },

    lineTotal: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    /* ---------------- User ---------------- */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    /* ---------------- Stripe identifiers ---------------- */

    stripeSessionId: {
      type: String,
      required: true,
      unique : true
       
    },

    stripePaymentIntentId: {
      type: String,
        required: true,
    },

    /* ---------------- Payment state (Stripe) ---------------- */

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "no_payment_required"],
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    /* ---------------- Order lifecycle (Business) ---------------- */

    orderStatus: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    /* ---------------- Amounts ---------------- */

    subtotalAmount: {
      type: Number,
      required: true,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    shippingAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    /* ---------------- Line Items ---------------- */

    lineItems: {
      type: [orderItemSchema],
      required: true,
    },

    /* ---------------- Customer snapshot ---------------- */

    customer: {
      name: String,
      email: String,
      country: String,
    },

 

   
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
