import express from "express";
import { createListing } from "../controllers/listingController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createListing);

export default router;
