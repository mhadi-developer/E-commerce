import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary"; // ✅ correct import
import cloudinary from "./cloudinary.js";

const storage =  new CloudinaryStorage({
  cloudinary, // pass full cloudinary object
  params: async (req, file) => ({
    folder: "products",
    public_id:  `${Date.now()}-${file.originalname.split(".")[0]}`,
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image",
  }),
});

export const upload = multer({ storage });
