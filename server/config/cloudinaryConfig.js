import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const listingStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "propify/listings",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

export const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "propify/profiles",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

export default cloudinary;
