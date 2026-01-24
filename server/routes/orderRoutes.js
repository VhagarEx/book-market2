import express from 'express';
import { createNewOrder } from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createNewOrder);

export default router;
