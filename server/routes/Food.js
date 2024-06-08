import express from 'express';
import { addFood, listFoodItems, removeFood } from '../controller/Food.js';
import multer from 'multer';
import isAdminAuthenticated from '../middlewares/adminAuth.js';
import isAuthenticated from '../middlewares/auth.js';

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
router.post('/add', isAuthenticated, isAdminAuthenticated, upload.single('image'), addFood);
router.post('/remove', isAuthenticated, isAdminAuthenticated, removeFood);
router.get('/list', listFoodItems);

export default router;