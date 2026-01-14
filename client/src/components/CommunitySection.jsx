import React, { useState, useEffect } from "react";
import { Users, CheckCircle2, ArrowRight, Building2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import userAvatar from "../assets/User.png";
import { API_BASE_URL } from "../utils/axiosInstance";

const CommunitySection = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/user/sellers`);
                if (res.data.success) {
                    setSellers(res.data.sellers.slice(0, 3)); // Only show top 3 on home page
                }
            } catch (error) {
                console.error("Error fetching sellers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);

    if (!loading && sellers.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-left">
                        <span className="text-blue-600 font-black text-sm uppercase tracking-[0.25em] mb-4 block">Trust & Professionalism</span>
                        <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                            Meet Our <span className="text-blue-600">Verified Sellers</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-lg">
                            Connect with the industry's most trusted professionals, vetted for excellence.
                        </p>
                    </div>
                    <Link
                        to="/community"
                        className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all text-lg"
                    >
                        View All Community
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-gray-50 rounded-[2rem] animate-pulse"></div>
                        ))
                    ) : (
                        sellers.map((seller) => (
                            <div
                                key={seller._id}
                                className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col items-center text-center relative"
                            >
                                <div className="absolute top-6 right-6 text-blue-600">
                                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                                </div>

                                <Link to="/community" className="w-24 h-24 rounded-full border-4 border-gray-50 shadow-md mb-6 overflow-hidden hover:scale-105 transition-transform duration-300 block">
                                    <img
                                        src={seller.profileImageUrl?.startsWith('http') ? seller.profileImageUrl : `${API_BASE_URL}${seller.profileImageUrl || ""}` || userAvatar}
                                        alt={seller.fullName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = userAvatar; }}
                                    />
                                </Link>

                                <Link to="/community">
                                    <h3 className="text-xl font-black text-gray-900 mb-2 truncate w-full hover:text-blue-600 transition-colors">{seller.fullName}</h3>
                                </Link>

                                <div className="flex items-center gap-4 w-full justify-center mb-6">
                                    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-bold text-xs">
                                        <Building2 size={12} />
                                        <span>{seller.listingCount || 0} Listings</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-bold text-xs">
                                        <TrendingUp size={12} />
                                        <span>Elite Seller</span>
                                    </div>
                                </div>

                                <Link
                                    to="/community"
                                    className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm"
                                >
                                    View Profile
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
