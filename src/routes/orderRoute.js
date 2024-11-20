import { createOrder, deleteOrder, updateOrder, getOrder } from "../controllers/orderController.js";
import express from 'express';
import dotenv from 'dotenv';

import { authenticateToken } from '../middlewares/authMiddleware.js';
dotenv.config();

let router = express.Router();

let initOrderRoute = (app) => {
    router.post("/", authenticateToken, createOrder);
    router.get("/:id?", getOrder);
    router.patch("/:id", updateOrder);
    router.delete("/:id", deleteOrder);

    return app.use("/api/order/", router);
};

export { initOrderRoute as orderRoute };
