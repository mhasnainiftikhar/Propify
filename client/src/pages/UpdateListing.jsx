import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getListing, updateListing } from "../services/listingService";
import { API_BASE_URL } from "../utils/axiosInstance";
import { getImageUrl } from "../utils/imageUrl";

const UpdateListing = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            try {
                const res = await getListing(listingId);
                if (res.success === false) {
                    toast.error(res.message);
                    return;
                }
                setFormData(res);
            } catch (error) {
                toast.error("Failed to fetch listing data");
            }
        };

        fetchListing();
    }, [params.listingId]);

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (+formData.regularPrice < +formData.discountPrice)
                return toast.error("Discount price must be lower than regular price");

            setLoading(true);

            const data = new FormData();
            // Append all text fields
            Object.keys(formData).forEach((key) => {
                if (key !== 'imageUrls' && key !== '__v' && key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
                    data.append(key, formData[key]);
                }
            });
            // Append all files if any
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    data.append('images', files[i]);
                }
            }

            await updateListing(params.listingId, data);
            setLoading(false);
            toast.success("Listing updated successfully!");
            navigate(`/seller/properties`);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    return (
        <main className="p-3 max-w-6xl mx-auto pt-24">
            <h1 className="text-3xl font-semibold text-center my-7 text-gray-800">
                Update Listing
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-6 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-4 rounded-lg focus:outline-blue-500 shadow-sm transition-all"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        placeholder="Description"
                        className="border p-4 rounded-lg focus:outline-blue-500 shadow-sm transition-all h-32"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-4 rounded-lg focus:outline-blue-500 shadow-sm transition-all"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />

                    <div className="flex gap-6 flex-wrap bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm text-gray-700">
                        <div className="flex gap-2 items-center hover:text-blue-600 transition-colors">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5 h-5 accent-blue-600"
                                onChange={handleChange}
                                checked={formData.type === "sale"}
                            />
                            <span className="font-medium">Sell</span>
                        </div>
                        <div className="flex gap-2 items-center hover:text-blue-600 transition-colors">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5 h-5 accent-blue-600"
                                onChange={handleChange}
                                checked={formData.type === "rent"}
                            />
                            <span className="font-medium">Rent</span>
                        </div>
                        <div className="flex gap-2 items-center hover:text-blue-600 transition-colors">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5 h-5 accent-blue-600"
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span className="font-medium">Parking spot</span>
                        </div>
                        <div className="flex gap-2 items-center hover:text-blue-600 transition-colors">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5 h-5 accent-blue-600"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span className="font-medium">Furnished</span>
                        </div>
                        <div className="flex gap-2 items-center hover:text-blue-600 transition-colors">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5 h-5 accent-blue-600"
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span className="font-medium">Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-gray-700">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm flex-1 min-w-[150px]">
                            <input
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                                className="p-2 border border-gray-300 rounded-lg w-16 focus:outline-blue-500"
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <p className="font-medium">Beds</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm flex-1 min-w-[150px]">
                            <input
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                                className="p-2 border border-gray-300 rounded-lg w-16 focus:outline-blue-500"
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p className="font-medium">Baths</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm flex-1 min-w-[200px]">
                            <input
                                type="number"
                                id="regularPrice"
                                min="50"
                                max="10000000"
                                required
                                className="p-2 border border-gray-300 rounded-lg w-32 focus:outline-blue-500"
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p className="font-medium font-semibold text-gray-800">Regular price</p>
                                {formData.type === 'rent' && (
                                    <span className="text-xs text-gray-500">($ / month)</span>
                                )}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100 shadow-sm flex-1 min-w-[200px]">
                                <input
                                    type="number"
                                    id="discountPrice"
                                    min="0"
                                    max="10000000"
                                    required
                                    className="p-2 border border-gray-300 rounded-lg w-32 focus:outline-blue-500"
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p className="font-medium font-semibold text-green-700">Discounted price</p>
                                    {formData.type === 'rent' && (
                                        <span className="text-xs text-green-600">($ / month)</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                        <p className="font-semibold text-gray-800 mb-2">
                            Images:
                            <span className="font-normal text-gray-600 ml-2 italic">
                                The first image will be the cover (max 6). Leave empty to keep existing.
                            </span>
                        </p>
                        <div className="flex flex-col gap-4">
                            <input
                                onChange={(e) => setFiles(e.target.files)}
                                className="p-3 border border-gray-300 rounded w-full bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                            />

                            {files.length > 0 && (
                                <div className="flex flex-col gap-2 mt-2">
                                    <p className="text-sm font-medium text-gray-700">Selected Files ({files.length}):</p>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(files).map((file, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg border text-xs text-gray-600 shadow-sm">
                                                <span className="truncate max-w-[100px]">{file.name}</span>
                                                <span className="text-gray-400">({(file.size / 1024).toFixed(0)} KB)</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {formData.imageUrls && formData.imageUrls.length > 0 && files.length === 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Existing Images:</p>
                                <div className="flex flex-wrap gap-2">
                                    {formData.imageUrls.map((url, index) => (
                                        <img key={index} src={getImageUrl(url)} alt="listing" className="w-20 h-20 object-cover rounded-lg border shadow-sm" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80 font-bold text-lg shadow-lg hover:shadow-xl transition-all tracking-wider"
                    >
                        {loading ? "Updating..." : "Update Listing"}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default UpdateListing;
