import { createDogName, deleteDogName, updateDogName, getDogName } from "../controllers/dognameController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initDogNameRoute = (app) => {
  // Define routes related to Dog Names
  router.post("/dogname", createDogName); // Create a new Dog Name
  router.get("/dogname/:id?", getDogName); // Get Dog Name (by ID or all if no ID is provided)
  router.patch("/dogname/:id", updateDogName); // Update Dog Name by ID
  router.delete("/dogname/:id", deleteDogName); // Delete Dog Name by ID

  // Use router with the prefix /api
  return app.use("/api", router);
}

export { initDogNameRoute as dognameRoute };
