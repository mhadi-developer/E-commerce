import express from "express";

import {
  signUpUser,
  SignInUser,
  getLoggedInUser,
  LogoutUser,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../Middleware/auth.middleware.js";

const app = express();
const router = express.Router();

router.route("/users/signup").post(signUpUser);
router.route("/users/signin").post(SignInUser);
router.route("/users/update").put(isAuthenticated, updateUser); // updating user.....
router.route("/users/loggedIn-user").get(isAuthenticated, getLoggedInUser);
 // protected by isAuthenticated middleware
router.route("/users/logout").post(LogoutUser); // logout for logged in user 



export default router;
