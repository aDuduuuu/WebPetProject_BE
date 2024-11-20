import  {getBreedsController}  from '../controllers/dogsellerController.js';
import  {getServices}  from '../controllers/spaController.js';
import  {getCServices}  from '../controllers/trainerController.js';
import  {getAllPostCategories}  from '../controllers/postController.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let router = express.Router();

let initFilterRoute = (app) => {    
    router.get("/filters/spas", getServices);
    router.get("/filters/trainers", getCServices);
    router.get("/filters/posts", getAllPostCategories);
    router.get("/filters/dogsellers", getBreedsController);

    return app.use("/api/", router);
};

export { initFilterRoute as filterRoute };
