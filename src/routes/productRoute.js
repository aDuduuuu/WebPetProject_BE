import { createProduct, deleteProduct, updateProduct, getProduct} from "../controllers/productController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initProductRoute = (app) => {    
    router.post("/product", createProduct); // Create a new product
    router.get("/product/:id?", getProduct); // Get a product by ID, productCode, or all products
    router.put("/product/:id", updateProduct); // Update a product by ID or productCode
    router.delete("/product/:id", deleteProduct); // Delete a product by ID or productCode

    return app.use("/api/", router);
};

export { initProductRoute as productRoute };
