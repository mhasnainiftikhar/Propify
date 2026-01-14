import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Search as SearchIcon, MapPin, DollarSign, Bed, Bath, ArrowRight, Loader2, Filter, X } from "lucide-react";
import { getAllListings } from "../services/listingService";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../utils/axiosInstance";
import { getImageUrl } from "../utils/imageUrl";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc",
        minPrice: 0,
        maxPrice: 10000000,
        bedrooms: 0,
        bathrooms: 0,
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Debounce state for searchTerm
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(sidebardata.searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [sidebardata.searchTerm]);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm") || "";
        const typeFromUrl = urlParams.get("type") || "all";
        const parkingFromUrl = urlParams.get("parking") === "true";
        const furnishedFromUrl = urlParams.get("furnished") === "true";
        const offerFromUrl = urlParams.get("offer") === "true";
        const sortFromUrl = urlParams.get("sort") || "createdAt";
        const orderFromUrl = urlParams.get("order") || "desc";
        const minPriceFromUrl = parseInt(urlParams.get("minPrice")) || 0;
        const maxPriceFromUrl = parseInt(urlParams.get("maxPrice")) || 10000000;
        const bedroomsFromUrl = parseInt(urlParams.get("bedrooms")) || 0;
        const bathroomsFromUrl = parseInt(urlParams.get("bathrooms")) || 0;

        setSidebardata({
            searchTerm: searchTermFromUrl,
            type: typeFromUrl,
            parking: parkingFromUrl,
            furnished: furnishedFromUrl,
            offer: offerFromUrl,
            sort: sortFromUrl,
            order: orderFromUrl,
            minPrice: minPriceFromUrl,
            maxPrice: maxPriceFromUrl,
            bedrooms: bedroomsFromUrl,
            bathrooms: bathroomsFromUrl,
        });

        const fetchListings = async () => {
            setLoading(true);
            try {
                const data = await getAllListings({
                    ...Object.fromEntries(urlParams.entries()),
                    limit: 9
                });

                setShowMore(data.listings.length >= 9);
                setListings(data.listings);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching listings");
                setLoading(false);
            }
        };

        fetchListings();
    }, [location.search]);

    // Handle automatic updates when sidebardata changes
    useEffect(() => {
        // Skip the very first render update to prevent double fetch or clashing with URL init
        // But since we use location.search as source of truth, we only update URL here
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", debouncedSearchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        urlParams.set("minPrice", sidebardata.minPrice);
        urlParams.set("maxPrice", sidebardata.maxPrice);
        urlParams.set("bedrooms", sidebardata.bedrooms);
        urlParams.set("bathrooms", sidebardata.bathrooms);

        const searchQuery = urlParams.toString();
        // Only navigate if the query actually changed to avoid infinite loops
        if (searchQuery !== location.search.substring(1)) {
            navigate(`/search?${searchQuery}`, { replace: true });
        }
    }, [debouncedSearchTerm, sidebardata.type, sidebardata.parking, sidebardata.furnished, sidebardata.offer, sidebardata.sort, sidebardata.order, sidebardata.minPrice, sidebardata.maxPrice, sidebardata.bedrooms, sidebardata.bathrooms]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (id === "all" || id === "rent" || id === "sale") {
            setSidebardata({ ...sidebardata, type: id });
        }

        if (id === "searchTerm") {
            setSidebardata({ ...sidebardata, searchTerm: value });
        }

        if (type === "checkbox") {
            setSidebardata({ ...sidebardata, [id]: checked });
        }

        if (id === "sort_order") {
            const sort = value.split("_")[0] || "createdAt";
            const order = value.split("_")[1] || "desc";
            setSidebardata({ ...sidebardata, sort, order });
        }

        if (id === "minPrice" || id === "maxPrice" || id === "bedrooms" || id === "bathrooms") {
            setSidebardata({ ...sidebardata, [id]: parseInt(value) || 0 });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        setIsMobileFilterOpen(false);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        urlParams.set("limit", 9);

        try {
            const data = await getAllListings({
                searchTerm: sidebardata.searchTerm,
                type: sidebardata.type,
                parking: sidebardata.parking,
                furnished: sidebardata.furnished,
                offer: sidebardata.offer,
                sort: sidebardata.sort,
                order: sidebardata.order,
                startIndex,
                limit: 9
            });

            if (data.listings.length < 9) {
                setShowMore(false);
            }
            setListings([...listings, ...data.listings]);
        } catch (error) {
            toast.error("Error fetching more listings");
        }
    };

    return (
        <div className="flex flex-col md:flex-row pt-24 min-h-screen bg-[#f8faff]">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden p-4 bg-white border-b flex justify-between items-center sticky top-[72px] z-20 shadow-sm">
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-blue-600" />
                    <span className="font-semibold text-gray-700">Filters</span>
                </div>
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    {isMobileFilterOpen ? "Close" : "Open Filters"}
                </button>
            </div>

            {/* Sidebar Filters */}
            <div className={`
        fixed inset-0 z-50 bg-white transition-transform duration-300 md:relative md:translate-x-0 md:inset-auto md:z-0 md:w-80 lg:w-96
        ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:block'}
        border-r border-gray-100 overflow-y-auto
      `}>
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8 md:mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)} className="md:hidden p-2 text-gray-500">
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Keywords</label>
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    id="searchTerm"
                                    placeholder="Search properties..."
                                    className="w-full bg-gray-50 border border-gray-200 p-4 pl-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    value={sidebardata.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Type</label>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    type="button"
                                    id="all"
                                    onClick={() => setSidebardata({ ...sidebardata, type: "all" })}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${sidebardata.type === "all" ? "bg-blue-600 text-white shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    All Types
                                </button>
                                <button
                                    type="button"
                                    id="rent"
                                    onClick={() => setSidebardata({ ...sidebardata, type: "rent" })}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${sidebardata.type === "rent" ? "bg-blue-600 text-white shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    For Rent
                                </button>
                                <button
                                    type="button"
                                    id="sale"
                                    onClick={() => setSidebardata({ ...sidebardata, type: "sale" })}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${sidebardata.type === "sale" ? "bg-blue-600 text-white shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    For Sale
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Amenities</label>
                            <div className="grid grid-cols-1 gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        id="offer"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        onChange={handleChange}
                                        checked={sidebardata.offer}
                                    />
                                    <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Has Special Offer</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        id="parking"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        onChange={handleChange}
                                        checked={sidebardata.parking}
                                    />
                                    <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Parking Available</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        id="furnished"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        onChange={handleChange}
                                        checked={sidebardata.furnished}
                                    />
                                    <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Fully Furnished</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Min Price</label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
                                    value={sidebardata.minPrice}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Max Price</label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
                                    value={sidebardata.maxPrice}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Bedrooms</label>
                                <select
                                    id="bedrooms"
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer"
                                    value={sidebardata.bedrooms}
                                    onChange={handleChange}
                                >
                                    {[0, 1, 2, 3, 4, 5].map(n => (
                                        <option key={n} value={n}>{n === 0 ? "Any" : `${n}+`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Bathrooms</label>
                                <select
                                    id="bathrooms"
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer"
                                    value={sidebardata.bathrooms}
                                    onChange={handleChange}
                                >
                                    {[0, 1, 2, 3, 4, 5].map(n => (
                                        <option key={n} value={n}>{n === 0 ? "Any" : `${n}+`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Sort Results</label>
                            <select
                                id="sort_order"
                                className="bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 appearance-none cursor-pointer"
                                onChange={handleChange}
                                value={`${sidebardata.sort}_${sidebardata.order}`}
                            >
                                <option value="regularPrice_desc">Price: High to Low</option>
                                <option value="regularPrice_asc">Price: Low to High</option>
                                <option value="createdAt_desc">Latest Listings</option>
                                <option value="createdAt_asc">Oldest Listings</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/search')}
                            className="text-gray-400 hover:text-blue-600 font-bold text-sm transition-colors text-center py-4"
                        >
                            Reset All Filters
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8 border-b border-gray-100">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Properties</h1>
                            <p className="text-gray-500 font-medium">Found {listings.length} premium properties for you</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 size={48} className="animate-spin text-blue-600" />
                            <p className="text-gray-500 font-medium">Sourcing the best properties...</p>
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h2>
                            <p className="text-gray-500 max-w-sm mb-8">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
                            <button
                                onClick={() => navigate('/search')}
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {listings.map((listing) => (
                                <Link
                                    to={`/listing/${listing._id}`}
                                    key={listing._id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={getImageUrl(listing.imageUrls[0])}
                                            alt={listing.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-xs font-bold shadow-sm text-gray-900">
                                            {listing.type === "rent" ? "Monthly Rent" : "Full Price"}
                                        </div>
                                        {listing.offer && (
                                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md">
                                                Flash Offer
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
                                            <span className="p-1 bg-blue-50 rounded-md">
                                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                            </span>
                                            {listing.offer && <span className="p-1 bg-green-50 text-green-600 rounded-md">Offered</span>}
                                        </div>

                                        <h3 className="font-bold text-xl text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                                            {listing.name}
                                        </h3>

                                        <div className="flex items-center text-gray-500 text-sm mb-4 bg-gray-50 p-2 rounded-xl">
                                            <MapPin size={16} className="mr-2 flex-shrink-0 text-blue-500" />
                                            <span className="truncate">{listing.address}</span>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-blue-600">
                                                    ${listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
                                                </span>
                                                {listing.offer && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        ${listing.regularPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="flex items-center gap-1 font-bold">
                                                    <Bed size={16} className="text-blue-500" />
                                                    <span>{listing.bedrooms}</span>
                                                </div>
                                                <div className="flex items-center gap-1 font-bold">
                                                    <Bath size={16} className="text-blue-500" />
                                                    <span>{listing.bathrooms}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {showMore && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={onShowMoreClick}
                                className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-1"
                            >
                                Load More Properties
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
