import foodModel from '../models/foodModel.js';
import fs from 'fs';

export const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  try {
    const food = new foodModel({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.json({ success: true, message: 'Food Added Successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods, message: 'Food fetched Successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
