import { createSpa, deleteSpa, updateSpa, getSpa } from "../controllers/spaController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initSpaRoute = (app) => {
  // Định nghĩa các route liên quan đến Spa
  router.post("/spas", createSpa); // Tạo mới Spa
  router.get("/spas/:id?", getSpa); // Lấy thông tin Spa (theo ID hoặc tất cả nếu không có ID)
  router.put("/spas/:id", updateSpa); // Cập nhật Spa theo ID
  router.delete("/spas/:id", deleteSpa); // Xóa Spa theo ID

  // Sử dụng router với tiền tố /api
  return app.use("/api", router);
}

export { initSpaRoute as spaRoute };
