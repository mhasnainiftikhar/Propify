import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, Home, DollarSign, TrendingUp, BarChart2, Loader2 } from "lucide-react";
import { getUserListings } from "../services/listingService";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    forRent: 0,
    forSale: 0,
    withOffer: 0,
  });

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      const data = await getUserListings(currentUser.id);
      setListings(data.listings);

      // Calculate stats
      const statsData = data.listings.reduce((acc, listing) => {
        acc.total++;
        if (listing.type === "rent") acc.forRent++;
        if (listing.type === "sale") acc.forSale++;
        if (listing.offer) acc.withOffer++;
        return acc;
      }, { total: 0, forRent: 0, forSale: 0, withOffer: 0 });

      setStats(statsData);
    } catch (error) {
      console.error("Fetch listings error:", error);
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header with CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
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
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <Home className="text-blue-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Listings</h3>
            <p className="text-xs text-gray-400 mt-1">All active properties</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-50">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.forSale}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">For Sale</h3>
            <p className="text-xs text-gray-400 mt-1">Properties for purchase</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-50">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.forRent}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">For Rent</h3>
            <p className="text-xs text-gray-400 mt-1">Rental properties</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-50">
                <BarChart2 className="text-orange-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.withOffer}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Special Offers</h3>
            <p className="text-xs text-gray-400 mt-1">Discounted listings</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Need to add a property?</h3>
          <p className="text-blue-50 mb-6">Create a new listing and reach thousands of potential buyers</p>
          <Link
            to="/create-listing"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
          >
            <Plus size={20} />
            Create Listing
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Manage Your Properties</h3>
          <p className="text-purple-50 mb-6">View, edit, and manage all your active listings</p>
          <Link
            to="/seller/properties"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
          >
            <Home size={20} />
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
