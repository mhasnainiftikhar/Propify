import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, Home, BarChart2, MessageSquare, Settings } from "lucide-react";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {currentUser.fullName}</p>
          </div>
          <Link
            to="/create-listing"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Create New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Listings", value: "0", icon: <Home className="text-blue-600" />, color: "bg-blue-50" },
            { label: "Total Views", value: "0", icon: <BarChart2 className="text-green-600" />, color: "bg-green-50" },
            { label: "Inquiries", value: "0", icon: <MessageSquare className="text-purple-600" />, color: "bg-purple-50" },
            { label: "Conversion", value: "0%", icon: <Settings className="text-orange-600" />, color: "bg-orange-50" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Recent Listings</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Home size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No listings yet</h3>
            <p className="text-gray-500 max-w-xs mt-2 mb-6">
              Start showcasing your properties to thousands of potential buyers.
            </p>
            <Link
              to="/create-listing"
              className="text-white bg-gray-900 hover:bg-black px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
