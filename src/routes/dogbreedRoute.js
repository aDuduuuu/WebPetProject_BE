import { createDogBreed, deleteDogBreed, updateDogBreed, getDogBreed, searchDogBreeds, getDogBreedDetailsByName } from "../controllers/dogbreedController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initDogBreedRoute = (app) => {
  // Định nghĩa các route liên quan đến Dog Breed
  router.post("/", createDogBreed); // Tạo mới Dog Breed
  //router.get("/dogbreeds/:id?", getDogBreed); // Lấy thông tin Dog Breed (theo ID hoặc tất cả nếu không có ID)
  router.patch("/:id", updateDogBreed); // Cập nhật Dog Breed theo ID
  router.delete("/:id", deleteDogBreed); // Xóa Dog Breed theo ID  
  router.get("/:name", getDogBreedDetailsByName); // Lấy thông tin chi tiết của Dog Breed theo tên
  router.get("", searchDogBreeds); // Tìm kiếm Dog Breeds với bộ lọc

  // Sử dụng router với tiền tố /api
  return app.use("/api/dogbreeds/", router);
}

export { initDogBreedRoute as dogBreedRoute };
