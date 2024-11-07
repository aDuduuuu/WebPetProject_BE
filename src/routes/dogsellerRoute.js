import { createDogSeller, deleteDogSeller, updateDogSeller, getDogSeller } from "../controllers/dogsellerController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initDogSellerRoute = (app) => {    
    router.post("/dogsellers", createDogSeller); // Create a new Dog Seller
    router.get("/dogsellers/:id?", getDogSeller); // Get Dog Seller by ID
    router.patch("/dogsellers/:id", updateDogSeller); // Update Dog Seller by ID
    router.delete("/dogsellers/:id", deleteDogSeller); // Delete Dog Seller by ID

    return app.use("/api/", router);
};

export { initDogSellerRoute as dogSellerRoute };
