import cloudinaryLib from "cloudinary";

cloudinaryLib.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 IMPORTANT: wrap it
const cloudinary = {
  v2: cloudinaryLib.v2,
};

export default cloudinary;
