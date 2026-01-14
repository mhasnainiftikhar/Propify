import React, { useState, useEffect } from "react";
import {
    Users,
    MapPin,
    Calendar,
    CheckCircle2,
    ExternalLink,
    LayoutGrid,
    Mail,
    Building2,
    TrendingUp,
    MessageSquare,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import userAvatar from "../assets/User.png";
import { API_BASE_URL } from "../utils/axiosInstance";
import { getImageUrl } from "../utils/imageUrl";

const Community = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/user/sellers`);
                if (res.data.success) {
                    setSellers(res.data.sellers);
                }
            } catch (error) {
                console.error("Error fetching sellers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);

    return (
        <main className="min-h-screen bg-[#dcdde1] pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 transform translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div>
                        <span className="text-blue-600 font-black text-sm uppercase tracking-[0.25em] mb-4 block">Our Professional Network</span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            Meet Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Verified Sellers</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Connect with the industry's most trusted professionals. Every seller on Propify is vetted to ensure excellence in property management and client satisfaction.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-bold border border-blue-100">
                                <Users size={18} />
                                <span>{loading ? "..." : sellers.length}+ Pros</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 font-bold border border-emerald-100">
                                <CheckCircle2 size={18} />
                                <span>100% Verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block relative">
                        <div className="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-sm mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                    <TrendingUp size={32} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Growth</p>
                                    <p className="text-2xl font-black text-gray-900">+45% Yearly</p>
                                </div>
                            </div>
                            <p className="text-gray-500 italic mb-6">"Propify has completely transformed how I connect with serious buyers. The verification badge adds immediate trust."</p>
                            <div className="flex px-4 py-3 bg-gray-50 rounded-xl items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm">
                                    <img src={userAvatar} alt="Testimonial" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-gray-900">Sarah Jenkins, Premier Estate</span>
                            </div>
                        </div>
                        {/* Static Decoration */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-60"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-60"></div>
                    </div>
                </div>
            </section>

            {/* Sellers Grid Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Discover Top Professionals</h2>
                        <p className="text-gray-500">The most active and experienced sellers in our community.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                            <button className="p-2 bg-gray-100 text-gray-900 rounded-lg shadow-inner">
                                <LayoutGrid size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <ExternalLink size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white h-[440px] rounded-[2rem] animate-pulse shadow-sm border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sellers.map((seller) => (
                            <div
                                key={seller._id}
                                className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                {/* Verification Badge */}
                                <div className="absolute top-6 right-6 bg-blue-50 text-blue-600 p-2 rounded-full" title="Verified Seller">
                                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                </div>

                                {/* Seller Avatar */}
                                <div className="relative mb-8">
                                    <div className="w-28 h-28 rounded-full border-4 border-gray-50 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={getImageUrl(seller.profileImageUrl)}
                                            alt={seller.fullName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = userAvatar; }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                        <Building2 size={16} />
                                    </div>
                                </div>

                                {/* Seller Info */}
                                <h3 className="text-2xl font-black text-gray-900 mb-2 truncate w-full">{seller.fullName}</h3>
                                <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm font-medium">
                                    <MapPin size={14} />
                                    <span>Premium Office, LA</span>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                        <p className="text-xl font-black text-blue-600">{seller.listingCount || 0}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Listings</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                        <div className="flex justify-center text-amber-400 mb-1">
                                            {[1, 2, 3, 4, 5].map(s => <TrendingUp key={s} size={12} className="opacity-40" />)}
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seller Rating</p>
                                        <p className="text-lg font-black text-gray-900">Elite</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto w-full space-y-3">
                                    <Link
                                        to={`/search?searchTerm=${seller._id}`} // Could be refined to filter by seller
                                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all mb-3"
                                    >
                                        View Portfolio
                                        <ArrowRight size={18} />
                                    </Link>
                                    <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all text-sm">
                                        <Mail size={16} />
                                        Contact Seller
                                    </button>
                                </div>

                                {/* Joining Date */}
                                <div className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        <span>Member Since {new Date(seller.createdAt).getFullYear()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={12} />
                                        <span>{Math.floor(Math.random() * 50) + 10} Reviews</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && sellers.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                        <Users size={64} className="mx-auto text-gray-300 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No professionals found yet</h3>
                        <p className="text-gray-500">Our professional network is growing every day. Stay tuned!</p>
                    </div>
                )}
            </section>

            {/* Become a Seller Banner */}
            <section className="pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] p-12 relative overflow-hidden text-center text-white shadow-2xl shadow-blue-200">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Want to join our professional network?</h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                            Showcase your properties to millions of users and build your reputation as a top-tier verified seller on Propify.
                        </p>
                        <Link
                            to="/sign-up"
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Become a Verified Seller
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    {/* Decoration Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
            </section>
        </main>
    );
};

export default Community;
