import { createCartItem, deleteCartItem, updateCartItem, getCartItem } from "../controllers/cartItemController.js";
import express from 'express';
import dotenv from 'dotenv';

import { authenticateToken } from '../middlewares/authMiddleware.js';
dotenv.config();

let router = express.Router();

let initCartItemRoute = (app) => {
    router.post("/", authenticateToken, createCartItem);
    router.get("/:id?", authenticateToken, getCartItem);
    router.patch("/:id", updateCartItem);
    router.delete("/:id", authenticateToken, deleteCartItem);

    return app.use("/api/cartItem/", router);
};

export { initCartItemRoute as cartItemRoute };
