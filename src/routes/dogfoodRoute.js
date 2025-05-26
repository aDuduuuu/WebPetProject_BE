import express from "express";
import dotenv from "dotenv";
import {
  createDogFood,
  deleteDogFood,
  updateDogFood,
  getDogFood,
  searchDogFoods,
  searchDogFoodsByName
} from "../controllers/dogfoodController.js";

dotenv.config();

const router = express.Router();

const initDogFoodRoute = (app) => {
  router.post("/", createDogFood); // Create new Dog Food
  router.get("/:id", getDogFood); // Get Dog Food by ID
  router.patch("/:id", updateDogFood); // Update Dog Food
  router.delete("/:id", deleteDogFood); // Delete Dog Food

  // Search with filters (category, name, isSafe, etc.)
  router.get("/", searchDogFoods);

  // Optional: separate route for name search (or include in filters)
  router.get("/search/by-name", searchDogFoodsByName);

  return app.use("/api/dogfoods", router);
};

export { initDogFoodRoute as dogFoodRoute };
