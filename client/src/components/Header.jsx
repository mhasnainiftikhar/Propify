import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart, signOutSuccess, signOutFailure } from "../redux/user/userSlice";
import logo from "../assets/Logo.png";
import userAvatar from "../assets/User.png";
import { API_BASE_URL } from "../utils/axiosInstance";
import { getImageUrl } from "../utils/imageUrl";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(signOutStart());
      localStorage.removeItem("token");
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const isHome = location.pathname === "/";

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled || !isHome
      ? 'bg-white shadow-md'
      : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="">
          <Link to="/">
            <img
              src={logo}
              alt="Propify Logo"
              className={`h-20 lg:h-19 w-auto object-contain transition-transform hover:scale-105 ${scrolled || !isHome ? '' : 'filter brightness-0 invert'
                }`}
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-2 lg:gap-8">
            <Link
              to="/"
              className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                }`}
            >
              Home
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                }`}></span>
            </Link>
            <Link
              to="/search"
              className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                }`}
            >
              Properties
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                }`}></span>
            </Link>
            <Link
              to="/about"
              className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                }`}
            >
              About
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                }`}></span>
            </Link>
            <Link
              to="/services"
              className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                }`}
            >
              Services
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                }`}></span>
            </Link>
            <Link
              to="/community"
              className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                }`}
            >
              Community
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                }`}></span>
            </Link>
            {currentUser?.role === 'seller' && (
              <Link
                to="/seller/dashboard"
                className={`px-3 lg:px-4 py-2 transition-colors duration-200 text-sm lg:text-base font-medium relative group ${scrolled || !isHome ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                  }`}
              >
                Dashboard
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 ${scrolled || !isHome ? 'bg-black' : 'bg-white'
                  }`}></span>
              </Link>
            )}
          </div>
        </nav>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4 lg:gap-6">

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className={`w-6 h-6 ${scrolled || !isHome ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-4">
            <form onSubmit={handleSubmit} className="relative w-full group">
              <input
                type="text"
                placeholder="Search properties..."
                className={`w-full border shadow-sm px-4 py-2 pl-10 rounded-xl transition-all outline-none text-sm ${scrolled || !isHome
                  ? 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500'
                  : 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white'
                  }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors w-4 h-4 ${scrolled || !isHome ? 'text-gray-400' : 'text-white/60'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>

          {/* User avatar */}
          <Link to="/profile" className="block">
            <img
              src={getImageUrl(currentUser?.profileImageUrl)}
              alt="User Avatar"
              className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200 ${scrolled || !isHome ? 'border-gray-200' : 'border-white/30'
                }`}
            />
          </Link>

          {/* Login/Logout Button */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap ${scrolled || !isHome
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-white text-red-600 hover:bg-red-50'
                }`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/sign-in"
              className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap ${scrolled || !isHome
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;