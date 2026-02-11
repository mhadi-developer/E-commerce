import express from 'express'
import { getAllOrders,getOrderById,updateOrderById,deleteOrderById, } from '../controllers/order.controller.js';

import { isAuthenticated } from '../Middleware/auth.middleware.js';
const app = express();
const router = express.Router()


router.route("/orders").get(getAllOrders);
router.route("/order/:id").get( getOrderById);
router.route("/order/update/:id").put(updateOrderById);
router.route("/product/delete/:id").delete(deleteOrderById);


export default router;
