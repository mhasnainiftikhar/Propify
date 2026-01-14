import express from "express";
import {
    uploadProfilePicture,
    updateUser,
    getVerifiedSellers,
} from "../controllers/userController.js";
import { upload, uploadProfile } from "../config/multerConfig.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Profile picture upload (protected route)
router.post("/upload-profile-picture", authenticate, uploadProfile.single("profilePicture"), uploadProfilePicture);

// Update user (protected route)
router.put("/update-user", authenticate, updateUser);

// Get verified sellers (public route)
router.get("/sellers", getVerifiedSellers);

export default router;
