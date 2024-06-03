import express from 'express';
import { addToCart, getCartData, removeFromCart } from '../controller/Cart.js';
import isAuthenticated from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', isAuthenticated, addToCart);
router.post('/remove', isAuthenticated, removeFromCart);
router.get('/get', isAuthenticated, getCartData);

export default router;