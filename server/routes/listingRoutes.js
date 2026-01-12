import express from "express";
import { createListing } from "../controllers/listingController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isSeller } from "../middleware/isSeller.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/create", authenticate, isSeller, upload.array("images", 6), createListing);

export default router;
