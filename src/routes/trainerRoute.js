import { createTrainer, deleteTrainer, updateTrainer, getTrainer, searchTrainerByName } from "../controllers/trainerController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Sửa lại: thêm tiền tố /trainers trước các route
const initTrainerRoute = (app) => {
  router.post("/", createTrainer);
  router.get("/:id?", getTrainer);
  router.patch("/:id", updateTrainer);
  router.delete("/:id", deleteTrainer);
  router.get("/search/by-name", searchTrainerByName); // vẫn giữ nguyên

  return app.use("/api/trainers", router); // ✅ Thay đổi ở đây
};


export { initTrainerRoute as trainerRoute };
