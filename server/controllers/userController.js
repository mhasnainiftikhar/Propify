import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import { errorHandler } from "../middleware/errorHandler.js";

// UPLOAD PROFILE PICTURE
export const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(errorHandler(401, "Please login to upload profile picture"));
        }

        if (!req.file) {
            return next(errorHandler(400, "Please upload an image file"));
        }

        const profileImageUrl = req.file.path;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImageUrl },
            { new: true }
        );

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully",
            profileImageUrl: user.profileImageUrl,
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const { fullName, profileImageUrl, password } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return next(errorHandler(404, "User not found"));

        if (fullName) user.fullName = fullName;
        if (profileImageUrl) user.profileImageUrl = profileImageUrl;
        if (password) {
            if (password.length < 8) {
                return next(errorHandler(400, "Password must be at least 8 characters"));
            }
            user.password = password;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
            },
        });
    } catch (err) {
        next(err);
    }
};

// GET VERIFIED SELLERS
export const getVerifiedSellers = async (req, res, next) => {
    try {
        const sellers = await User.find({ role: 'seller' }).select('-password');

        const sellersWithCounts = await Promise.all(sellers.map(async (seller) => {
            const count = await Listing.countDocuments({ userRef: seller._id });
            return {
                ...seller._doc,
                listingCount: count
            };
        }));

        res.status(200).json({
            success: true,
            sellers: sellersWithCounts
        });
    } catch (err) {
        next(err);
    }
};
