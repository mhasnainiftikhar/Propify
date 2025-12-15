import User from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/nodemailer.js";


 //SIGN UP USER
export const signUpUser = async (req, res) => {
  try {
    const { fullName, email, password, role = "customer" } = req.body;
     //Check all fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check Existing of user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    let otp = "";
    let otpExpireAt = 0;
    let isVerified = true;

    //Otp for seller
    if (role === "seller") {
      otp = crypto.randomInt(100000, 999999).toString();
      otpExpireAt = Date.now() + 10 * 60 * 1000;
      isVerified = false;
    }
   //create new user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpireAt,
      isAccountVerified: isVerified,
    });

    // Send OTP email only to seller
    if (role === "seller") {
      await sendEmail(
        email,
        "Verify Your Seller Account",
        `Hello ${fullName},

Your OTP for seller account verification is: ${otp}

This OTP will expire in 10 minutes.

Propify Team`
      );
    }
  //generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
   //response
    return res.status(201).json({
      success: true,
      message:
        role === "seller"
          ? "Seller registered. OTP sent to email."
          : "Customer registered successfully.",
      token,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};

 //VERIFY OTP (SELLER ONLY) 
export const verifySellerOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.role !== "seller") {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Seller already verified",
      });
    }

    if (
      user.verifyOtp !== otp ||
      user.verifyOtpExpireAt < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Seller account verified successfully",
    });
  } catch (error) {
    console.error("OTP Verify Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
    });
  }
};

//LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // BLOCK UNVERIFIED SELLERS
    if (user.role === "seller" && !user.isAccountVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your seller account first",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
