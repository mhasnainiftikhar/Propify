import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearLoading,
} from "../redux/user/userSlice";
import {
  signupUser,
  verifySellerOtp,
  resendSellerOtp,
} from "../services/authService";
import assets from "../assets/cover2.jpg";
import logo from "../assets/Logo.png";
import OAuth from "../components/OAuth";
import OtpModal from "../components/OtpModal";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImageUrl: "",
    role: "customer",
  });

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState({});

  /* -------------------- VALIDATION -------------------- */
  const validateForm = () => {
    const e = {};
    if (!form.fullName || form.fullName.length < 5)
      e.fullName = "Full name must be at least 5 characters";
    if (!form.email) e.email = "Email is required";
    if (!form.password || form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------- SIGNUP -------------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(signInStart());
    setErrors({});

    try {
      const data = await signupUser(form);

      // SELLER → OTP FLOW
      if (form.role === "seller") {
        // Stop loading state to allow OTP verification
        dispatch(clearLoading());
        setShowOtp(true);
        toast.success("OTP sent to your email");
        return;
      }

      // CUSTOMER → DIRECT LOGIN
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      dispatch(signInSuccess(data.user));
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed";
      dispatch(signInFailure(msg));
      setErrors({ submit: msg });
      toast.error(msg);
    }
  };

  /* -------------------- OTP VERIFY -------------------- */
  const handleVerifyOtp = async () => {
    dispatch(signInStart());

    try {
      const data = await verifySellerOtp({
        email: form.email,
        otp,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      dispatch(signInSuccess(data.user));
      toast.success("Seller verified successfully!");
      navigate("/seller/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Invalid or expired OTP";
      dispatch(signInFailure(msg));
      setErrors({ otp: msg });
      toast.error(msg);
    }
  };

  /* -------------------- RESEND OTP -------------------- */
  const handleResendOtp = async () => {
    try {
      await resendSellerOtp({ email: form.email });
      toast.success("OTP resent");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  /* -------------------- GOOGLE OTP HANDLER -------------------- */
  const handleGoogleOtpRequired = (email) => {
    setForm((prev) => ({ ...prev, email }));
    setShowOtp(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* LEFT VISUAL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-300">
        <img
          src={assets}
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <img src={logo} alt="Propify" className="h-16 mb-10" />
          <h2 className="text-4xl font-bold mb-4">
            Start your journey <br /> with Propify.
          </h2>
          <p className="text-lg text-blue-50 max-w-md">
            Join the trusted marketplace for buyers and sellers today.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-500 mb-6">
            Enter your details to get started.
          </p>

          <div className="flex justify-center mb-6">
            <ProfilePictureUpload
              onUploadSuccess={(url) =>
                setForm({ ...form, profileImageUrl: url })
              }
            />
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4 pt-2">
              {["customer", "seller"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-3 rounded-lg border font-semibold ${form.role === r
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* GOOGLE */}
          <div className="mt-8 pt-8 border-t">
            <OAuth
              role={form.role}
              onOtpRequired={handleGoogleOtpRequired}
            />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-blue-600 font-bold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <OtpModal
          otp={otp}
          setOtp={setOtp}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          isLoading={loading}
          error={errors.otp}
          onClose={() => setShowOtp(false)}
        />
      )}
    </div>
  );
};

export default SignUp;
