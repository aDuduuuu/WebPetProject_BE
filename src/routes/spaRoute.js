import {
  createSpa,
  deleteSpa,
  updateSpa,
  getSpa,
  searchSpaByName,
  getServices,
} from "../controllers/spaController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const initSpaRoute = (app) => {
  // Định nghĩa các route liên quan đến Spa
  router.post("/spas", createSpa);                     // Tạo mới Spa
  router.get("/spas/:id?", getSpa);                    // Lấy Spa theo ID hoặc tất cả
  router.patch("/spas/:id", updateSpa);                // Cập nhật Spa theo ID
  router.delete("/spas/:id", deleteSpa);               // Xoá Spa theo ID

  router.get("/spas-search/by-name", searchSpaByName); // 🔍 Tìm theo tên Spa
  router.get("/spas-services", getServices);           // 🛎️ Lấy danh sách dịch vụ

  return app.use("/api", router); // Gắn tất cả route với tiền tố /api
};

export { initSpaRoute as spaRoute };
