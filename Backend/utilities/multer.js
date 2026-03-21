import multer from "multer";
import pkg from "multer-storage-cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

console.log(cloudinaryStorage);


const storage = new cloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
