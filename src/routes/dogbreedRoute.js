import { createDogBreed, deleteDogBreed, updateDogBreed, getDogBreed } from "../controllers/dogbreedController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initDogBreedRoute = (app) => {
  // Định nghĩa các route liên quan đến Dog Breed
  router.post("/dogbreeds", createDogBreed); // Tạo mới Dog Breed
  router.get("/dogbreeds/:id?", getDogBreed); // Lấy thông tin Dog Breed (theo ID hoặc tất cả nếu không có ID)
  router.patch("/dogbreeds/:id", updateDogBreed); // Cập nhật Dog Breed theo ID
  router.delete("/dogbreeds/:id", deleteDogBreed); // Xóa Dog Breed theo ID

  // Sử dụng router với tiền tố /api
  return app.use("/api", router);
}

export { initDogBreedRoute as dogBreedRoute };
