import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      minlength: 8,
      required: function () {
        return !this.isGoogleAuth;
      },
      select: false,
    },

    role: {
      type: String,
      enum: ["seller", "customer"],
      default: "customer",
    },

    profileImageUrl: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },

    //Google Authentication
    isGoogleAuth: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    //OTP Verification
    verifyOtp: {
      type: String,
      default: null,
    },

    verifyOtpExpireAt: {
      type: Date,
      default: null,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    //Password Reset
    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpireAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
