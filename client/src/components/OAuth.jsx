import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";

const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google User:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      // 🔴 Later: send this data to backend
      // await axios.post("/api/auth/google", { ... });

    } catch (error) {
      console.error("Google Sign-In Error:", error);
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
