import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets  from '../assets/cover3.jpg'; 
import logo  from '../assets/logo.png'; 

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white ">
      
      {/* LEFT SIDE: VISUAL SECTION (Matches SignUp) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600">
        <img
          src={assets} 
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-10">
            <img src={logo} alt="Propify Logo" className="h-19 w-auto" />
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back to <br /> Propify.
          </h2>
          <p className="text-lg text-blue-100 max-w-md">
            Log in to manage your properties, track your leads, and continue your journey in our marketplace.
          </p>
        </div>
        <div className="absolute bottom-10 left-10 text-blue-200 text-sm">
          © 2025 Propify.
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Please enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@propify.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/sign-up")} 
              className="text-blue-600 font-semibold hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;