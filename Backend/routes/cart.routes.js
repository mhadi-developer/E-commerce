import express from 'express'
const app = express();
import {
  addProductToCart,
  getAllCartItemsByUser,
  incrementCartProductQuntity,
decrementCartProductQuntity,
  removeItemFromCart,
  getSingleItemFromCart,
  clearCart
} from "../controllers/cart.controller.js";
const router = express.Router()



router.route("/cart/add/:userId").post(addProductToCart);
router.route("/cart/items/:userId").get(getAllCartItemsByUser);
router.route("/cart/item/:id").get(getSingleItemFromCart);
router.route("/cart/item/increment/:userId").post(incrementCartProductQuntity);
router.route("/cart/item/decrement/:userId").post(decrementCartProductQuntity);
router.route("/cart/items/clear/:userId").delete(clearCart);
router.route("/cart/delete/:userId").delete(removeItemFromCart);





export default router;
