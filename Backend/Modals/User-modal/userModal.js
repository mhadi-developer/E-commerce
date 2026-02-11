import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Address Subdocument
const addressSchema = new Schema({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
});

// Payment Info Subdocument
const paymentSchema = new Schema({
  cardNumber: { type: String, required: true, trim: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
});

// User Schema
const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    username: { type: String, trim: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },
    avatar: { type: String, default: "" },
    phone: { type: String, required: true },
    dob: { type: Date },
    address: { type: addressSchema },
    paymentInfo: { type: paymentSchema },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("User", userSchema);
