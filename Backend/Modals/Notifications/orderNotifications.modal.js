import mongoose from "mongoose";

const { Schema } = mongoose;

const orderNotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
        },
    
   orderStatus: {
  type: String,
  ref: "Order"   // optional by default
},

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Optional but recommended for performance
orderNotificationSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("OrderNotification", orderNotificationSchema);
