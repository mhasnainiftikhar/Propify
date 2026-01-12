import Listing from "../models/listingModel.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const createListing = async (req, res, next) => {
    try {
        // Check if images were uploaded
        if (!req.files || req.files.length === 0) {
            return next(errorHandler(400, "At least one image is required"));
        }

        const imageUrls = req.files.map((file) => `/uploads/listings/${file.filename}`);

        // Get userRef from authenticated user (not from request body)
        const listingData = {
            ...req.body,
            imageUrls,
            userRef: req.user.id // From JWT token via authenticate middleware
        };

        // Convert boolean strings if they come as strings from FormData
        if (typeof listingData.offer === 'string') listingData.offer = listingData.offer === 'true';
        if (typeof listingData.parking === 'string') listingData.parking = listingData.parking === 'true';
        if (typeof listingData.furnished === 'string') listingData.furnished = listingData.furnished === 'true';

        const listing = await Listing.create(listingData);
        return res.status(201).json({
            success: true,
            message: "Listing created successfully",
            listing
        });
    } catch (error) {
        console.error("Create Listing Error:", error);
        return next(errorHandler(500, error.message || "Failed to create listing"));
    }
};
