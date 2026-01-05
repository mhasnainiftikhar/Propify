import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { loginUser } from "../services/authService";
import assets from "../assets/cover3.jpg";
import logo from "../assets/logo.png";
import OAuth from "../components/OAuth";
import OtpModal from "../components/OtpModal";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { forgotPassword, verifyResetOtp, resetPassword } from "../services/authService";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "" });
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [resetPasswordState, setResetPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data.user));
      toast.success("Login successful!");
      navigate(data.user.role === "seller" ? "/seller/dashboard" : "/");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Invalid email or password";
      dispatch(signInFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setAuthError("Please enter your email first");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      await forgotPassword({ email: form.email });
      setIsOtpModalOpen(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      await verifyResetOtp({ email: form.email, otp });
      setIsOtpModalOpen(false);
      setIsResetModalOpen(true);
      toast.success("OTP verified!");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Invalid OTP";
      setAuthError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (resetPasswordState.password !== resetPasswordState.confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      await resetPassword({
        email: form.email,
        otp,
        password: resetPasswordState.password,
      });
      setIsResetModalOpen(false);
      toast.success("Password reset successful. Please sign in.");
      setForm({ ...form, password: "" });
      setOtp("");
      setResetPasswordState({ password: "", confirmPassword: "" });
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white ">
      {/* LEFT SIDE: VISUAL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-400">
        <img
          src={assets}
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-10">
            <img src={logo} alt="Propify" className="h-19 w-auto" />
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back to <br /> Propify.
          </h2>
          <p className="text-lg text-blue-50 max-w-md opacity-90 leading-relaxed">
            Log in to manage your properties and leads seamlessly in our community.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Please enter your details to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {authError && !isOtpModalOpen && !isResetModalOpen && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 shadow-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* OAUTH SECTION */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-4 text-gray-400 font-medium tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <OAuth />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/sign-up")}
              className="text-blue-600 font-bold hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>

      {isOtpModalOpen && (
        <OtpModal
          otp={otp}
          setOtp={setOtp}
          onVerify={handleVerifyOtp}
          onResend={handleForgotPassword}
          isLoading={authLoading}
          error={authError}
          onClose={() => setIsOtpModalOpen(false)}
        />
      )}

      {isResetModalOpen && (
        <ResetPasswordModal
          password={resetPasswordState.password}
          setPassword={(val) =>
            setResetPasswordState({ ...resetPasswordState, password: val })
          }
          confirmPassword={resetPasswordState.confirmPassword}
          setConfirmPassword={(val) =>
            setResetPasswordState({ ...resetPasswordState, confirmPassword: val })
          }
          onReset={handleResetPassword}
          isLoading={authLoading}
          error={authError}
          onClose={() => setIsResetModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SignIn;