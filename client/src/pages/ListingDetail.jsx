import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    MapPin,
    Bed,
    Bath,
    ParkingCircle,
    Armchair,
    Share2,
    Loader2,
    DollarSign,
    Info
} from "lucide-react";
import { getListing } from "../services/listingService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const ListingDetail = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const data = await getListing(params.listingId);
                setListing(data);
                setLoading(false);
            } catch (error) {
                toast.error("Could not load listing details");
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 size={48} className="animate-spin text-blue-600" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-gray-500">
                <Info size={64} className="mb-4 text-gray-300" />
                <h2 className="text-2xl font-bold">Listing not found</h2>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section: Breadcrumbs & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Home</span>
                        <span>/</span>
                        <span>Listings</span>
                        <span>/</span>
                        <span className="text-blue-600 font-medium truncate max-w-[200px]">{listing.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Share2 size={18} />
                            Share
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images & Features */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img
                                    src={`https://propify-backend-ten.vercel.app${listing.imageUrls[activeImage]}`}
                                    alt={listing.name}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                {listing.offer && (
                                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                        Special Offer
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-md">
                                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                                </div>
                            </div>

                            {listing.imageUrls.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-2">
                                    {listing.imageUrls.map((url, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? "border-blue-600 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <img src={`http://localhost:5000${url}`} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description & Details */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.name}</h1>
                            <div className="flex items-center gap-2 text-gray-500 mb-8">
                                <MapPin size={20} className="text-blue-600" />
                                <span className="text-lg">{listing.address}</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Bed size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                        <p className="text-xl font-bold text-gray-900">{listing.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Bath size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                        <p className="text-xl font-bold text-gray-900">{listing.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <ParkingCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Parking</p>
                                        <p className="text-xl font-bold text-gray-900">{listing.parking ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Armchair size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Furnished</p>
                                        <p className="text-xl font-bold text-gray-900">{listing.furnished ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-600">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                                <p className="leading-relaxed whitespace-pre-line text-lg">
                                    {listing.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Contact */}
                    <div className="space-y-8">
                        {/* Price Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 font-medium mb-1">Pricing Overview</p>
                                <div className="flex items-baseline gap-2">
                                    <DollarSign size={32} className="text-blue-600 mb-2" />
                                    <span className="text-4xl font-black text-blue-600">
                                        {listing.offer
                                            ? listing.discountPrice.toLocaleString()
                                            : listing.regularPrice.toLocaleString()}
                                    </span>
                                    {listing.type === "rent" && (
                                        <span className="text-xl text-gray-500 font-medium">/month</span>
                                    )}
                                </div>
                                {listing.offer && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-lg text-gray-400 line-through decoration-red-400">
                                            ${listing.regularPrice.toLocaleString()}
                                        </span>
                                        <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-sm font-bold">
                                            Save ${(listing.regularPrice - listing.discountPrice).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 mb-4">
                                Contact Seller
                            </button>

                            <p className="text-center text-xs text-gray-400 px-4">
                                By clicking contact, you agree to our terms of service and privacy policy.
                            </p>

                            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                        <img src="https://via.placeholder.com/100" alt="Agent" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Verified Listing</p>
                                        <p className="text-sm text-gray-500">ID: {listing._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ListingDetail;
