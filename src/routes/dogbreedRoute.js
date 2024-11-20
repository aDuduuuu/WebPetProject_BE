import express from 'express';
import dotenv from 'dotenv';
import {
  createDogBreed,
  deleteDogBreed,
  updateDogBreed,
  getDogBreed,
  searchDogBreeds,
} from "../controllers/dogbreedController.js";

dotenv.config();

const router = express.Router();

const initDogBreedRoute = (app) => {
  router.post("/", createDogBreed); // Create a new Dog Breed
  router.get("/:id?", getDogBreed); // Get Dog Breed by ID
  router.patch("/:id", updateDogBreed); // Update Dog Breed by ID
  router.delete("/:id", deleteDogBreed); // Delete Dog Breed by ID

  // Route to get all breeds or with filters (search)
  router.get("", searchDogBreeds); // GET with filters and pagination

  return app.use("/api/dogbreeds", router);
};

export { initDogBreedRoute as dogBreedRoute };
