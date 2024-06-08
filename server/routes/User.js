import express from 'express';
import { adminRegister, login, register } from '../controller/User.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/admin_register', adminRegister);

export default router;