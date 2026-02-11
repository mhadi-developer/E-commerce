import express from 'express'
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  getProductsByCategory,
  getProductBySlug,
} from "../controllers/product.controller.js";
import { upload } from '../utilities/multer.js';
import { isAuthenticated } from '../Middleware/auth.middleware.js';
const app = express();
const router = express.Router()


router.route("/products/add").post(
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 6 },
  ]),
  createProduct
);
router.route("/products").get(getAllProducts);
router.route("/product/detail/:slug").get(getProductBySlug);


router.route("/product/update/:id").put(isAuthenticated, updateProduct);
router.route("/product/delete/:id").delete(isAuthenticated, deleteProduct);


export default router;
