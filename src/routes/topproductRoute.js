import { getTopProduct } from "../controllers/orderController.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

let router = express.Router();

let initTProductRoute = (app) => {
    
    router.get("/",  getTopProduct);
    
    return app.use("/api/top/", router);
};

export { initTProductRoute as TProRoute };
