import { createReview, deleteReview, updateReview, getReview } from "../controllers/reviewController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { authenticateToken } from '../middlewares/authMiddleware.js';
let router = express.Router();

let initReviewRoute = (app) => {
    router.post("/reviews", authenticateToken, createReview); // Create a new Review
    router.get("/reviews/:id?", authenticateToken, getReview); // Get Review by ID
    router.patch("/reviews/:id", updateReview); // Update Review by ID
    router.delete("/reviews/:id", deleteReview); // Delete Review by ID

    return app.use("/api/", router);
};

export { initReviewRoute as reviewRoute };
