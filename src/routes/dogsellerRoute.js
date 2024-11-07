import { createDogSeller, deleteDogSeller, updateDogSeller, getDogSeller } from "../controllers/dogsellerController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initDogSellerRoute = (app) => {    
    router.post("/dogseller", createDogSeller); // Create a new Dog Seller
    router.get("/dogseller/:id?", getDogSeller); // Get Dog Seller by ID
    router.patch("/dogseller/:id", updateDogSeller); // Update Dog Seller by ID
    router.delete("/dogseller/:id", deleteDogSeller); // Delete Dog Seller by ID

    return app.use("/api/", router);
};

export { initDogSellerRoute as dogSellerRoute };
