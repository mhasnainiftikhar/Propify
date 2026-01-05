import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
  verifySellerOtp,
  resendSellerOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  googleAuth,
} from "../controllers/authController.js";
import { upload } from "../config/multerConfig.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Auth
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", googleAuth);

// Seller OTP
router.post("/verify-otp", verifySellerOtp);
router.post("/resend-otp", resendSellerOtp);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;
