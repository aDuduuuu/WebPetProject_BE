import { createPost, deletePost, updatePost, getPost } from "../controllers/postController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initPostRoute = (app) => {    
    router.post("/post", createPost);
    router.get("/post/:id", getPost);
    router.put("/post/:id", updatePost);
    router.delete("/post/:id", deletePost);

    return app.use("/api/", router);
};

export { initPostRoute as postRoute };
