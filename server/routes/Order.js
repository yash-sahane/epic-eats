import express from 'express';
import { fetchOrders, fetchOrdersAdmin, placeOrder, updateOrderStatus, verifyOrder } from '../controller/Order.js';
import isAuthenticated from '../middlewares/auth.js';
import isAdminAuthenticated from '../middlewares/adminAuth.js';

const router = express.Router();

router.post('/place', isAuthenticated, placeOrder);
router.post('/verify', isAuthenticated, verifyOrder);
router.post('/orders', isAuthenticated, fetchOrders);
router.get('/list', fetchOrdersAdmin);
router.post('/status', isAuthenticated, isAdminAuthenticated, updateOrderStatus);

export default router;