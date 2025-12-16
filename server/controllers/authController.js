import User from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/nodemailer.js";


   //SIGN UP USER

export const signUpUser = async (req, res) => {
  try {
    const { fullName, email, password, role = "customer" } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    let otp = "";
    let otpExpireAt = 0;
    let isVerified = true;

    if (role === "seller") {
      otp = crypto.randomInt(100000, 999999).toString();
      otpExpireAt = Date.now() + 10 * 60 * 1000;
      isVerified = false;
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpireAt,
      isAccountVerified: isVerified,
    });

    if (role === "seller") {
      await sendEmail(
        email,
        "Verify Your Seller Account",
        `Hello ${fullName},

Your OTP is: ${otp}
It will expire in 10 minutes.

Propify Team`
      );
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message:
        role === "seller"
          ? "Seller registered. OTP sent to email."
          : "Customer registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
};


   //VERIFY SELLER OTP

export const verifySellerOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Seller already verified" });
    }

    if (user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ success: true, message: "Seller verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};


   //RESEND OTP (SELLER)

export const resendSellerOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Seller already verified" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Resend OTP - Seller Verification",
      `Your new OTP is: ${otp}\nIt expires in 10 minutes.`
    );

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};


  //LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (user.role === "seller" && !user.isAccountVerified) {
      return res.status(403).json({
        success: false,
        message: "Verify your seller account first",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};


   //LOGOUT USER
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};


  // FORGOT PASSWORD (OTP)

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      `Your password reset OTP is: ${otp}\nExpires in 10 minutes.`
    );

    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send reset OTP" });
  }
};


   //RESET PASSWORD

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetOtp !== otp ||
      user.resetOtpExpireAt < Date.now()
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ success: false, message: "Password reset failed" });
  }
};
