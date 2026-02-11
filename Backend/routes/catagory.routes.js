import express from 'express'
import { getAllCategories, getCategoryById, updateCategory, deleteCategory, createCategory } from '../controllers/category.controller.js';
import { upload }  from '../utilities/multer.js';
const app = express();
const router = express.Router()



router.route("/categories").get(getAllCategories);
router.route('/category/:id').get(getCategoryById);
router.route("/category/add").post(upload.single("image"), createCategory);
router.route('/category/update/:id').put(updateCategory);
router.route('/category/delete/:id').delete(deleteCategory);


export default router;
