/**
 * User Controller
 * ---------------
 * This file handles authentication and user profile operations.
 * CRUD and auth-related logic 
 */

import UserModal from "../Modals/User-modal/userModal.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";

/* =========================================================
   SIGN UP USER
   Create a new user and hash password before saving
========================================================= */
export const signUpUser = async (req, res) => {
  const data = req.body;

  console.log("************************ user data", data);

  // Extract plain password
  const password = data.password; // password without hashing

  // Hash password with salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);

  // Replace plain password with hashed password
  data.password = hashedPassword;

  console.log("***** hashed password", data.password);

  // Save user data to database
  const signUpdata = await UserModal.create(data);

  res.status(201).json({
    message: "user data submited",
    success: true,
    data: signUpdata,
  });
};

/* =========================================================
   SIGN IN USER
   Authenticate user and issue JWT token
========================================================= */
export const SignInUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = req.body;

    console.log(data);

    // Check if user exists
    const registerUser = await UserModal.findOne({ email });

    if (!registerUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    console.log("********** user found", registerUser);
    // Compare entered password with stored hashed password
    const isMatched = await bcrypt.compare(password, registerUser?.password);


    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "password incorrect",
      });
    }

    console.log("********** registered user", registerUser);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: registerUser._id,
        email: registerUser.email,
        name: registerUser.fullName,
        role: registerUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2hr" },
    );

    // Set JWT token in HTTP-only cookie
    res.cookie("jwt-Token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000, // 1 hour in milliseconds
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   GET LOGGED IN USER
   Fetch authenticated user without password field
========================================================= */
export const getLoggedInUser = async (req, res) => {
  // req.user comes from authentication middleware
  const loggedInUser = await UserModal.findById(req.user.id).select(
    "-password",
  );

  res.status(200).json(loggedInUser);
};

/* =========================================================
   LOGOUT USER
   Clear authentication cookie
========================================================= */
export const LogoutUser = (req, res, next) => {
  res
    .clearCookie("jwt-Token", " ", {
      httpOnly: true,
      secure: false, // must match login
      sameSite: "lax", // must match login
      maxAge: 0,
    })
    .sendStatus(204);
};

/* =========================================================
   UPDATE USER
   Update authenticated user's profile data
========================================================= */
export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id; // from isAuthenticated middleware

    // Prepare updated data compatible with UserModal schema
    const updatedUserData = {
      phone: data.mobile,
      address: {
        street: data.address1,
        city: data.city,
        state: data.province,
        country: data.country,
        postalCode: data.zip,
      },
    };

    await UserModal.findByIdAndUpdate(userId, updatedUserData);

    console.log("*********** user", userId);
    console.log("********* data to update", data);

    res.status(200).json({
      message: "user updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.state(404).json({ message: error });
  }
};

/**
 * ---------------------------------------------------------
 * NOTE:
 * - Password hashing handled using bcrypt
 * - Authentication managed via JWT + HTTP-only cookies
 * - req.user populated via authentication middleware
 * ---------------------------------------------------------
 */
