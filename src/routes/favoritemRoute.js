import { addFavoriteItemController, removeFavoriteItemController, getFavoriteItemsController } from "../controllers/favoriteitemController.js";
import express from 'express';

const router = express.Router();

const initFavoriteItemRoute = (app) => {
  router.post("/favorites", addFavoriteItemController); // Route để thêm mục yêu thích
  router.delete("/favorites/:id", removeFavoriteItemController); // Route để xóa mục yêu thích
  router.get("/favorites/:userID", getFavoriteItemsController); // Route để lấy danh sách yêu thích của người dùng

  return app.use("/api", router);
};

export { initFavoriteItemRoute as favoriteItemRoute };
