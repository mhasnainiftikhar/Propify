import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { signupUser, verifySellerOtp, resendSellerOtp } from "../services/authService";
import assets from "../assets/cover2.jpg";
import logo from "../assets/logo.png";
import OAuth from "../components/OAuth";
import OtpModal from "../components/OtpModal";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.user);

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

  const validateForm = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(signInStart());
    setErrors({});
    try {
      const data = await signupUser(form);
      if (form.role === "seller") {
        setShowOtp(true);
      } else {
        localStorage.setItem("token", data.token);
        dispatch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err?.response?.data?.message || "Signup failed"));
      setErrors({ submit: err?.response?.data?.message || "Signup failed" });
    }
  };

  const handleVerifyOtp = async () => {
    dispatch(signInStart());
    try {
      const data = await verifySellerOtp({ email: form.email, otp });
      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data.user));
      navigate("/seller/dashboard");
    } catch (err) {
      dispatch(signInFailure(err?.response?.data?.message || "Invalid or expired OTP"));
      setErrors({ otp: "Invalid or expired OTP" });
    }
  };

  const handleResendOtp = async () => {
    await resendSellerOtp({ email: form.email });
  };

  const handleGoogleOtpRequired = (email) => {
    setForm({ ...form, email: email });
    setShowOtp(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-white ">
      {/* LEFT SIDE: VISUAL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-300">
        <img
          src={assets}
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-10">
            <img src={logo} alt="Propify" className="h-19 w-auto" />
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Start your journey <br /> with Propify.
          </h2>
          <p className="text-lg text-blue-50 max-w-md opacity-90 leading-relaxed">
            Join the trusted marketplace for buyers and sellers today.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Enter your details to get started.</p>
          </div>

          <div className="flex justify-center mb-6">
            <ProfilePictureUpload
              onUploadSuccess={(url) => setForm({ ...form, profileImageUrl: url })}
            />
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full border px-4 py-3 rounded-lg outline-none transition ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full border px-4 py-3 rounded-lg outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full border px-4 py-3 rounded-lg outline-none transition ${errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* ROLE TOGGLE */}
            <div className="flex gap-4 pt-2">
              {["customer", "seller"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-3 rounded-lg border font-semibold capitalize transition-all ${form.role === r
                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* OAUTH SECTION */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="relative mb-6 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or Register with</span>
            </div>
            <div className="flex justify-center">
              <OAuth role={form.role} onOtpRequired={handleGoogleOtpRequired} />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

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