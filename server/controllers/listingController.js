import Listing from "../models/listingModel.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const createListing = async (req, res, next) => {
    try {
        // Check if images were uploaded
        if (!req.files || req.files.length === 0) {
            return next(errorHandler(400, "At least one image is required"));
        }

        const imageUrls = req.files.map((file) => file.path);

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

// GET USER LISTINGS (for seller dashboard)
export const getUserListings = async (req, res, next) => {
    try {
        // Verify the authenticated user is requesting their own listings
        if (req.user.id !== req.params.userId) {
            return next(errorHandler(403, "You can only view your own listings"));
        }

        const listings = await Listing.find({ userRef: req.params.userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: listings.length,
            listings
        });
    } catch (error) {
        console.error("Get User Listings Error:", error);
        return next(errorHandler(500, "Failed to fetch listings"));
    }
};

// GET ALL LISTINGS with search and filters
export const getAllListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        } else {
            offer = offer === 'true';
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        } else {
            furnished = furnished === 'true';
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        } else {
            parking = parking === 'true';
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || 1000000000;
        const bedrooms = parseInt(req.query.bedrooms) || 0;
        const bathrooms = parseInt(req.query.bathrooms) || 0;

        const query = {
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
            regularPrice: { $gte: minPrice, $lte: maxPrice },
        };

        if (bedrooms > 0) {
            query.bedrooms = { $gte: bedrooms };
        }
        if (bathrooms > 0) {
            query.bathrooms = { $gte: bathrooms };
        }

        const listings = await Listing.find(query)
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        const total = await Listing.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: listings.length,
            total,
            listings
        });
    } catch (error) {
        console.error("Get All Listings Error:", error);
        return next(errorHandler(500, "Failed to fetch listings"));
    }
};

// DELETE LISTING
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, "You can only delete your own listings!"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!");
    } catch (error) {
        next(error);
    }
};

// UPDATE LISTING
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, "You can only update your own listings!"));
    }

    try {
        let imageUrls = listing.imageUrls;
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map((file) => file.path);
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                imageUrls
            },
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

// GET SINGLE LISTING
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found!"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
