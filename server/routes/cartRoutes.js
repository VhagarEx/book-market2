import express from 'express';
import { addItemToCart, getMyCart, removeItemFromCart } from '../controllers/cartController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

import { updateCartQuantity } from '../controllers/cartController.js';

router.post('/', auth, addItemToCart);
router.get('/', auth, getMyCart);
router.put('/:bookId', auth, updateCartQuantity);
router.delete('/:bookId', auth, removeItemFromCart);

export default router;
