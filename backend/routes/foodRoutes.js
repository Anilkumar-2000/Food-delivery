import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import upload from '../config/multer.js';

const foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove/:id', removeFood);

export default foodRouter;
