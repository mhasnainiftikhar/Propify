import express from "express";
import { createListing, getUserListings, getAllListings, deleteListing, updateListing, getListing } from "../controllers/listingController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isSeller } from "../middleware/isSeller.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

// Create listing (seller only)
router.post("/create", authenticate, isSeller, upload.array("images", 6), createListing);

// Get user's listings (authenticated user only)
router.get("/user/:userId", authenticate, getUserListings);

// Get all listings (public)
router.get("/all", getAllListings);

// Delete listing (owner only)
router.delete("/delete/:id", authenticate, deleteListing);

// Update listing (owner only)
router.post("/update/:id", authenticate, upload.array("images", 6), updateListing);

// Get single listing (public)
router.get("/get/:id", getListing);

export default router;
