const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Добавить отзыв
router.post('/', protect, reviewController.addReview);
// Получить отзывы по книге
router.get('/book/:bookId', reviewController.getBookReviews);
// Получить отзывы пользователя
router.get('/user', protect, reviewController.getUserReviews);

module.exports = router;
