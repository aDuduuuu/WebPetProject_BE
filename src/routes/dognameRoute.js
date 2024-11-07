import { createDogName, deleteDogName, updateDogName, getDogName, getDogNamesByCategory } from "../controllers/dognameController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initDogNameRoute = (app) => {
  router.post("/dognames", createDogName); // Create a new Dog Name
  //router.get("/dognames/:id?", getDogName); // Get Dog Name (by ID or all if no ID is provided)
  router.get("/dognames/:category", getDogNamesByCategory); // Get Dog Names by Category
  router.patch("/dognames/:id", updateDogName); // Update Dog Name by ID
  router.delete("/dognames/:id", deleteDogName); // Delete Dog Name by ID

  // Use router with the prefix /api
  return app.use("/api", router);
}

export { initDogNameRoute as dognameRoute };
