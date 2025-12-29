import React from 'react';
import  assets  from '../assets/Logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: BRAND & BIO */}
          <div className="col-span-1">
            <img src={assets} alt="Propify" className="h-19 w-auto mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Simplifying the way you buy, sell, and rent properties. 
              The most trusted marketplace for modern real estate solutions.
            </p>
            <div className="flex space-x-4">
              {/* Placeholder Social Icons */}
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition shadow-sm">
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition shadow-sm">
                <i className="fa-brands fa-twitter text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-pink-600 hover:border-pink-600 transition shadow-sm">
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Buy Properties</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Sell Your Home</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Rentals</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Commercial</a></li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Contact Support</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6">Subscribe</h4>
            <p className="text-gray-500 text-sm mb-4">Get the latest property alerts directly in your inbox.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button className="bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition active:scale-[0.98]">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Propify Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Server Status: Online
            </span>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3 opacity-50 grayscale" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-5 opacity-50 grayscale" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;