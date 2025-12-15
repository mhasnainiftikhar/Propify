import express from "express";
import { signUpUser,loginUser,verifySellerOtp } from "../controllers/authController.js";

const router = express.Router();

// Manual Signup
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifySellerOtp);

export default router;
