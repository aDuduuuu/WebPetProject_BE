import { createPost, deletePost, updatePost, getPost, searchPostByTitle, } from "../controllers/postController.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initPostRoute = (app) => {    
    router.post("/posts", createPost);
    router.get("/posts/:id?", getPost);
    router.patch("/posts/:id", updatePost);
    router.delete("/posts/:id", deletePost);
    router.get("/posts/search/by-title", searchPostByTitle);

    return app.use("/api/", router);
};

export { initPostRoute as postRoute };
