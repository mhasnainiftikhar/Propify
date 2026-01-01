import User from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/nodemailer.js";
import { errorHandler } from "../middleware/errorHandler.js";


//HELPER: CREATE TOKEN

const createToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


//SIGNUP (EMAIL)

export const signUpUser = async (req, res, next) => {
  try {
    const { fullName, email, password, role = "customer" } = req.body;

    if (!fullName || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exists"));
    }

    let verifyOtp = null;
    let verifyOtpExpireAt = null;
    let isAccountVerified = true;

    if (role === "seller") {
      verifyOtp = crypto.randomInt(100000, 999999).toString();
      verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
      isAccountVerified = false;
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      verifyOtp,
      verifyOtpExpireAt,
      isAccountVerified,
    });

    if (role === "seller") {
      await sendEmail(
        email,
        "Verify Seller Account",
        `Your OTP is ${verifyOtp}. It expires in 10 minutes.`
      );
    } else {
      createToken(res, user);
    }

    res.status(201).json({
      success: true,
      message:
        role === "seller"
          ? "Seller registered. OTP sent to email."
          : "Signup successful",
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


//VERIFY SELLER OTP

export const verifySellerOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) return next(errorHandler(404, "Seller not found"));

    if (
      !user.verifyOtp ||
      user.verifyOtp !== otp ||
      user.verifyOtpExpireAt < Date.now()
    ) {
      return next(errorHandler(400, "Invalid or expired OTP"));
    }

    user.isAccountVerified = true;
    user.verifyOtp = null;
    user.verifyOtpExpireAt = null;
    await user.save();

    createToken(res, user);

    res.status(200).json({
      success: true,
      message: "Seller verified successfully",
    });
  } catch (err) {
    next(err);
  }
};


//RESEND SELLER OTP

export const resendSellerOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, role: "seller" });
    if (!user) return next(errorHandler(404, "Seller not found"));

    if (user.isAccountVerified) {
      return next(errorHandler(400, "Seller already verified"));
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Resend Seller OTP",
      `Your new OTP is ${otp}. It expires in 10 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    next(err);
  }
};


//LOGIN (EMAIL)

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(errorHandler(401, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Invalid credentials"));

    if (user.role === "seller" && !user.isAccountVerified) {
      return next(errorHandler(403, "Verify seller account first"));
    }

    createToken(res, user);

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


//FORGOT PASSWORD

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Password Reset",
      `Click the link to reset your password:\n${resetLink}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent",
    });
  } catch (err) {
    next(err);
  }
};


//RESET PASSWORD

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired token"));

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};


//LOGOUT

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


//GOOGLE OAUTH

export const googleAuth = async (req, res, next) => {
  try {
    const { email, fullName, photoURL, role = "customer" } = req.body;

    if (!email || !fullName) {
      return next(errorHandler(400, "Email and name are required"));
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Existing user - sign them in
      if (user.role === "seller" && !user.isAccountVerified) {
        return next(errorHandler(403, "Verify seller account first"));
      }

      createToken(res, user);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL,
        },
      });
    }

    // New user - create account
    let verifyOtp = null;
    let verifyOtpExpireAt = null;
    let isAccountVerified = true;

    if (role === "seller") {
      verifyOtp = crypto.randomInt(100000, 999999).toString();
      verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
      isAccountVerified = false;
    }

    user = await User.create({
      fullName,
      email,
      photoURL,
      role,
      password: crypto.randomBytes(32).toString("hex"), // Random password for OAuth users
      verifyOtp,
      verifyOtpExpireAt,
      isAccountVerified,
    });

    if (role === "seller") {
      await sendEmail(
        email,
        "Verify Seller Account",
        `Your OTP is ${verifyOtp}. It expires in 10 minutes.`
      );

      return res.status(201).json({
        success: true,
        message: "Seller registered. OTP sent to email.",
        requiresOtp: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL,
        },
      });
    } else {
      createToken(res, user);

      return res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

