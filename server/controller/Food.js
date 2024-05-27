import Food from "../model/Food.js";
import fs from 'fs';

const addFood = async (req, res) => {
  const image_filename = req.file.filename;

  const { name, description, price, category } = req.body;

  try {
    const food = await Food.create({
      name,
      description,
      price,
      category,
      image: image_filename
    });

    return res.json({ success: true, message: 'Food Item Added', food });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e })
  }
}

const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    await food.deleteOne();
    fs.unlink(`uploads/${food.image}`, () => { });
    return res.json({ success: true, message: 'Food Item Deleted' });
  } catch (e) {
    return res.json({ success: false, message: e });
  }
}

const listFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find({});
    return res.json({ success: true, message: "Food items fetched", data: foodItems });
  } catch (e) {
    return res.json({ success: false, message: e });
  }
}

export { addFood, listFoodItems, removeFood };