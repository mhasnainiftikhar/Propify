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
    const { fullName, email, password, profileImageUrl, role = "customer" } = req.body;

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
      profileImageUrl,
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
        profileImageUrl: user.profileImageUrl,
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
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
      },
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
        profileImageUrl: user.profileImageUrl,
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

    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your password reset OTP is ${otp}. It expires in 15 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to email",
    });
  } catch (err) {
    next(err);
  }
};


//VERIFY RESET OTP
export const verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    if (
      !user.resetOtp ||
      user.resetOtp !== otp ||
      user.resetOtpExpireAt < Date.now()
    ) {
      return next(errorHandler(400, "Invalid or expired OTP"));
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    next(err);
  }
};


//RESET PASSWORD
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpireAt: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired OTP"));

    user.password = password;
    user.resetOtp = null;
    user.resetOtpExpireAt = null;
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
          profileImageUrl: user.profileImageUrl,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};


//UPLOAD PROFILE PICTURE

export const uploadProfilePicture = async (req, res, next) => {
  try {
    // Check if user is authenticated (you'll need to add auth middleware)
    if (!req.user) {
      return next(errorHandler(401, "Please login to upload profile picture"));
    }

    // Check if file was uploaded
    if (!req.file) {
      return next(errorHandler(400, "Please upload an image file"));
    }

    // Get the file path
    const profileImageUrl = `/uploads/profiles/${req.file.filename}`;

    // Update user's profile image
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImageUrl },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      profileImageUrl: user.profileImageUrl,
    });
  } catch (err) {
    next(err);
  }
};

