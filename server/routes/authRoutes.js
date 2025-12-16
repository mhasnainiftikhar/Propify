import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
  verifySellerOtp,
  resendSellerOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Auth
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Seller OTP
router.post("/verify-otp", verifySellerOtp);
router.post("/resend-otp", resendSellerOtp);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
