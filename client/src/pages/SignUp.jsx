import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, verifySellerOtp } from "../services/authService";

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
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- SIGNUP -------------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signupUser(form);

      if (form.role === "seller") {
        setShowOtp(true);
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrors({ submit: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- VERIFY OTP -------------------- */
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      await verifySellerOtp({
        email: form.email,
        otp,
      });
      navigate("/seller/dashboard");
    } catch (err) {
      setErrors({ otp: "Invalid or expired OTP" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up to continue
        </p>

        {/* ERROR */}
        {errors.submit && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {errors.submit}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-md px-4 py-2"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-4 py-2"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-4 py-2"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}

          {/* ROLE */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "customer" })}
              className={`flex-1 border rounded-md py-2 ${
                form.role === "customer"
                  ? "border-blue-600 bg-blue-50"
                  : ""
              }`}
            >
              Customer
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, role: "seller" })}
              className={`flex-1 border rounded-md py-2 ${
                form.role === "seller"
                  ? "border-blue-600 bg-blue-50"
                  : ""
              }`}
            >
              Seller
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-center mb-4">
              Verify Seller Account
            </h2>

            {errors.otp && (
              <p className="text-sm text-red-600 text-center mb-2">
                {errors.otp}
              </p>
            )}

            <input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full border rounded-md px-4 py-2 text-center"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowOtp(false)}
                className="flex-1 border py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md"
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
