import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { googleAuth } from "../services/authService";
import { app } from "../firebase.js";

const OAuth = ({ role = "customer", onOtpRequired }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send to backend with role
      const response = await googleAuth({
        email: user.email,
        fullName: user.displayName,
        photoURL: user.photoURL,
        role: role,
      });

      // Store token
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Handle seller OTP requirement
      if (response.requiresOtp && role === "seller") {
        dispatch(signInSuccess(null)); // Clear loading state
        if (onOtpRequired) {
          onOtpRequired(user.email);
        }
        return;
      }

      // Success - dispatch user data
      dispatch(signInSuccess(response.user));

      // Navigate based on role
      if (response.user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      dispatch(signInFailure(error?.response?.data?.message || "Google sign-in failed"));
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
