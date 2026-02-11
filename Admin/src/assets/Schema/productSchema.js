// schemas/productSchema.js
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  discount: z
    .number()
    .nonnegative("Discount cannot be negative")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  stock: z.number().int().nonnegative("Stock cannot be negative"),

  variants: z
    .array(
      z.object({
        size: z.string().min(1),
        color: z.string().min(1),
        quantity: z.number().int().nonnegative(),
        price: z.number().positive(),
      })
    )
    .min(1, "At least one variant is required"),

  mainImage: z.instanceof(File, { message: "Main image is required" }),
  galleryImages: z
    .array(z.instanceof(File))
    .min(1, "At least one gallery image required"),
});
