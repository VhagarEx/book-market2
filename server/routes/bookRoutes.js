import express from 'express';
import { getBooks, getBook, addBook, editBook, removeBook } from '../controllers/bookController.js';
import { auth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Admin routes
router.post('/', auth, adminOnly, addBook);
router.put('/:id', auth, adminOnly, editBook);
router.delete('/:id', auth, adminOnly, removeBook);

export default router;
