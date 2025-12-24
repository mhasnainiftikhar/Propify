import User from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/nodemailer.js";
import { errorHandler } from "../middleware/errorHandler.js";

/* SIGN UP USER*/
export const signUpUser = async (req, res, next) => {
  try {
    const { fullName, email, password, role = "customer" } = req.body;

    if (!fullName || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(errorHandler(409, "User already exists"));
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

    res.status(201).json({
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
  } catch (err) {
    next(err);
  }
};

/*VERIFY SELLER OTP */
export const verifySellerOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) {
      return next(errorHandler(404, "Seller not found"));
    }

    if (user.isAccountVerified) {
      return next(errorHandler(400, "Seller already verified"));
    }

    if (user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now()) {
      return next(errorHandler(400, "Invalid or expired OTP"));
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Seller verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* RESEND SELLER OTP */
export const resendSellerOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) {
      return next(errorHandler(404, "Seller not found"));
    }

    if (user.isAccountVerified) {
      return next(errorHandler(400, "Seller already verified"));
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

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* LOGIN USER */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    if (user.role === "seller" && !user.isAccountVerified) {
      return next(errorHandler(403, "Verify your seller account first"));
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
  } catch (err) {
    next(err);
  }
};

/*LOGOUT USER */
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/* FORGOT PASSWORD*/
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
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

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    next(err);
  }
};

/*RESET PASSWORD*/
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetOtp !== otp ||
      user.resetOtpExpireAt < Date.now()
    ) {
      return next(errorHandler(400, "Invalid or expired OTP"));
    }

    user.password = newPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};
