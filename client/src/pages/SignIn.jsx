import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import assets from "../assets/cover3.jpg";
import logo from "../assets/logo.png";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      navigate(data.user.role === "seller" ? "/seller/dashboard" : "/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 shadow-sm"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
    </div>
  );
};

export default SignIn;