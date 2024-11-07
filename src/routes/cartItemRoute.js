import { createCartItem, deleteCartItem, updateCartItem, getCartItem } from "../controllers/cartItemController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initCartItemRoute = (app) => {
    router.post("/", createCartItem);
    router.get("/:id?", getCartItem);
    router.patch("/:id", updateCartItem);
    router.delete("/:id", deleteCartItem);

    return app.use("/api/cartItem/", router);
};

export { initCartItemRoute as cartItemRoute };
