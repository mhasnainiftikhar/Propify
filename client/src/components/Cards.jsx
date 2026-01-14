import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Bed, Bath, Loader2, ArrowRight } from "lucide-react";
import { getAllListings } from "../services/listingService";
import { toast } from "react-hot-toast";

const Cards = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getAllListings({ limit: 6 });
      setListings(data.listings);
    } catch (error) {
      console.error("Fetch listings error:", error);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Listings Yet</h2>
          <p className="text-gray-600">Check back soon for available properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect home from our curated selection of premium properties
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {listings.map((listing, index) => (
            <Link
              to={`/listing/${listing._id}`}
              key={listing._id}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={
                    listing.imageUrls[0]
                      ? `http://localhost:5000${listing.imageUrls[0]}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={listing.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Tag */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm border border-black/5">
                    {listing.type === "rent" ? "Rent" : "Sale"}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Now</span>
                </div>

                <h3 className="font-black text-2xl text-gray-900 mb-3 truncate group-hover:text-blue-600 transition-colors">
                  {listing.name}
                </h3>

                <div className="flex items-center text-gray-500 text-sm mb-6 bg-gray-50 p-3 rounded-2xl">
                  <MapPin size={16} className="mr-2 flex-shrink-0 text-blue-600" />
                  <span className="truncate font-medium">{listing.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Bed size={18} />
                    </div>
                    <span className="font-bold text-sm">{listing.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <Bath size={18} />
                    </div>
                    <span className="font-bold text-sm">{listing.bathrooms} Baths</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price starting from</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                        ${listing.offer
                          ? listing.discountPrice.toLocaleString()
                          : listing.regularPrice.toLocaleString()}
                      </span>
                      {listing.type === "rent" && (
                        <span className="text-xs font-bold text-gray-400">/mo</span>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all group-hover:rotate-12">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        {listings.length >= 6 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;