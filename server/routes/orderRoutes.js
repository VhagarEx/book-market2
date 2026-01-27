import express from 'express';
import { createNewOrder, getMyOrders, getAdminOrders, changeOrderStatus } from '../controllers/orderController.js';
import { auth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', auth, createNewOrder);
router.get('/my', auth, getMyOrders);

// Admin routes
router.get('/admin/all', auth, adminOnly, getAdminOrders);
router.patch('/:id/status', auth, adminOnly, changeOrderStatus);

export default router;
