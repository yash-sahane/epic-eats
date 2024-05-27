import express from 'express';
import { addFood, listFoodItems, removeFood } from '../controller/Food.js';
import multer from 'multer';

const router = express.Router();

// upload images locally using multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({ storage });

// middleware of multer to upload single file
router.post('/add', upload.single('image'), addFood);
router.post('/remove', removeFood);
router.get('/list', listFoodItems);

export default router;