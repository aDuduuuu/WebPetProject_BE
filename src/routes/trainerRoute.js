import { createTrainer, deleteTrainer, updateTrainer, getTrainer } from "../controllers/trainerController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initTrainerRoute = (app) => {
  // Định nghĩa các route liên quan đến Trainer
  router.post("/trainers", createTrainer); // Tạo mới Trainer
  router.get("/trainers/:id?", getTrainer); // Lấy thông tin Trainer (theo ID hoặc tất cả nếu không có ID)
  router.patch("/trainers/:id", updateTrainer); // Cập nhật Trainer theo ID
  router.delete("/trainers/:id", deleteTrainer); // Xóa Trainer theo ID

  // Sử dụng router với tiền tố /api
  return app.use("/api", router);
};

export { initTrainerRoute as trainerRoute };
