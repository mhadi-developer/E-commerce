import express from "express";
import { getUserNotificationsByUserId } from "../controllers/orderNotifications.controller.js";
const router = express.Router();

router.route("/orders/notifications/:id").get(getUserNotificationsByUserId);

export default router;
