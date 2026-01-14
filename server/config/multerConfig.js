import multer from "multer";
import { listingStorage, profileStorage } from "./cloudinaryConfig.js";

// Multer upload configuration for listings
export const upload = multer({
    storage: listingStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Multer upload configuration for profiles
export const uploadProfile = multer({
    storage: profileStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
    },
});

