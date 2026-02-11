import express from "express"
import { isAuthenticated } from "../Middleware/auth.middleware.js";
import {
  stripePayment,
  confirmOrder,
  getOrderById,
} from "../controllers/payment.controller.js";

const app = express();
const router = express.Router();

router.route("/payment/checkout/sessions").post( stripePayment);
router.route("/order/confirm").post(confirmOrder);
router.route("/order/find").post(getOrderById);





export default router;