import { createReview, deleteReview, updateReview, getReview } from "../controllers/reviewController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initReviewRoute = (app) => {
    router.post("/review", createReview); // Create a new Review
    router.get("/review/:id?", getReview); // Get Review by ID
    router.put("/review/:id", updateReview); // Update Review by ID
    router.delete("/review/:id", deleteReview); // Delete Review by ID

    return app.use("/api/", router);
};

export { initReviewRoute as reviewRoute };
