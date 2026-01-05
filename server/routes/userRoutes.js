import express from "express";
import {
    uploadProfilePicture,
    updateUser,
} from "../controllers/userController.js";
import { upload } from "../config/multerConfig.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Profile picture upload (protected route)
router.post("/upload-profile-picture", authenticate, upload.single("profilePicture"), uploadProfilePicture);

// Update user (protected route)
router.put("/update-user", authenticate, updateUser);

export default router;
