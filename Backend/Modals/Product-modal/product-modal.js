import mongoose from "mongoose";

// Sub-schema for image
const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
}, { _id:false });

// Sub-schema for size/color
const optionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
},{_id:false});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: String,
      min: 0,
      max: 90,
      default: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: {
      type: [optionSchema], // array of { label, value }
      default: [],
    },
    colors: {
      type: [optionSchema], // array of { label, value }
      default: [],
    },
    videoLink: {
      type: String,
      default: "",
    },
    mainImage: {
      type: imageSchema,
      required: true,
    },
    galleryImages: {
      type: [imageSchema], // array of images
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index:true,
    },
  },
  {
    timestamps: true ,// adds createdAt and updatedAt automatically
  }
);

export default mongoose.model("Product", productSchema);
