import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, MapPin, DollarSign, Bed, Bath, Loader2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { getUserListings, deleteListing } from "../services/listingService";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../utils/axiosInstance";
import { getImageUrl } from "../utils/imageUrl";

const Properties = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserListings();
    }, []);

    const fetchUserListings = async () => {
        try {
            setLoading(true);
            const data = await getUserListings(currentUser.id);
            setListings(data.listings);
        } catch (error) {
            console.error("Fetch listings error:", error);
            toast.error("Failed to load your listings");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteListing = async (listingId) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                await deleteListing(listingId);
                setListings((prev) => prev.filter((listing) => listing._id !== listingId));
                toast.success("Listing deleted successfully!");
            } catch (error) {
                console.error("Delete listing error:", error);
                toast.error("Failed to delete listing");
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                    <p className="text-gray-600 mt-1">Manage all your property listings</p>
                </div>
                <Link
                    to="/create-listing"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    Add New Property
                </Link>
            </div>

            {/* Listings Section */}
            {loading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex items-center justify-center">
                    <Loader2 size={32} className="animate-spin text-blue-600" />
                </div>
            ) : listings.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Start showcasing your properties to thousands of potential buyers.
                    </p>
                    <Link
                        to="/create-listing"
                        className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-black px-8 py-3 rounded-lg transition-colors font-medium"
                    >
                        <Plus size={20} />
                        Create Your First Listing
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                        >
                            {/* Image - Clickable and leads to details */}
                            <Link to={`/listing/${listing._id}`} className="relative h-48 block overflow-hidden">
                                <img
                                    src={getImageUrl(listing.imageUrls[0])}
                                    alt={listing.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
                                        <Eye size={20} className="text-gray-900" />
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                                </div>
                                {listing.offer && (
                                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Special Offer
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                                    {listing.name}
                                </h3>

                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                                    <span className="truncate">{listing.address}</span>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                    {listing.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <Bed size={18} />
                                        <span className="font-semibold">{listing.bedrooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bath size={18} />
                                        <span className="font-semibold">{listing.bathrooms}</span>
                                    </div>
                                    {listing.parking && (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Parking</span>
                                    )}
                                    {listing.furnished && (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Furnished</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={20} className="text-blue-600" />
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold text-blue-600">
                                                {listing.offer
                                                    ? listing.discountPrice.toLocaleString()
                                                    : listing.regularPrice.toLocaleString()}
                                            </span>
                                            {listing.offer && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    ${listing.regularPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        {listing.type === "rent" && (
                                            <span className="text-sm text-gray-500">/mo</span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Link to={`/listing/${listing._id}`} title="View Listing" className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <Eye size={18} />
                                        </Link>
                                        <Link to={`/update-listing/${listing._id}`} title="Edit Listing" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteListing(listing._id)}
                                            title="Delete Listing"
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Properties;
