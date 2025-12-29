import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, verifySellerOtp } from "../services/authService";
import assets from '../assets/cover2.jpg'
import logo from '../assets/logo.png'


const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
  });

  /* -------------------- VALIDATION -------------------- */
  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- HANDLERS -------------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await signupUser(form);
      if (form.role === "seller") setShowOtp(true);
      else navigate("/");
    } catch (err) {
      setErrors({ submit: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      await verifySellerOtp({ email: form.email, otp });
      navigate("/seller/dashboard");
    } catch (err) {
      setErrors({ otp: "Invalid or expired OTP" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* LEFT SIDE: THE IMAGE/VISUAL */}
<div className="hidden lg:flex lg:w-1/2 relative bg-blue-400">
  <img
    src={assets} 
    alt="Signup Visual"
    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
  />
  <div className="relative z-10 flex flex-col justify-center px-20 text-white">
    <div className="mb-10">
      <img 
        src={logo} 
        alt="Propify Logo" 
        className="h-19 w-auto" 
      />
    </div>
    <h2 className="text-4xl font-bold mb-4 leading-tight">
      Start your journey <br /> with our community.
    </h2> 
    <p className="text-lg text-blue-50 max-w-md opacity-90">
      Discover the best marketplace experience for both buyers and sellers. 
      Join thousands of users today.
    </p>
  </div>
  <div className="absolute bottom-10 left-10 text-blue-100 text-sm font-medium">
    © 2025 Propify.
  </div>
</div>

      {/* RIGHT SIDE: THE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Enter your details to get started.</p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full border rounded-lg px-4 py-3 transition focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.fullName ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className={`w-full border rounded-lg px-4 py-3 transition focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full border rounded-lg px-4 py-3 transition focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="pt-2">
              <span className="block text-sm font-medium text-gray-700 mb-3">I am a:</span>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "customer" })}
                  className={`flex-1 py-3 rounded-lg border font-medium transition ${
                    form.role === "customer"
                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "seller" })}
                  className={`flex-1 py-3 rounded-lg border font-medium transition ${
                    form.role === "seller"
                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Seller
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate("/sign-in")} className="text-blue-600 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Verify Identity</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Enter the 6-digit code sent to your email.</p>

            {errors.otp && (
              <p className="text-sm text-red-600 text-center mb-4">{errors.otp}</p>
            )}

            <input
              type="text"
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-2xl tracking-[0.5em] font-mono text-center focus:border-blue-500 outline-none transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowOtp(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;