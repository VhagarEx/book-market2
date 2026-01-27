// Контроллер для отзывов
const Review = require('../models/reviewModel');

const reviewController = {
  async addReview(req, res) {
    try {
      const { book_id, rating, text } = req.body;
      const user_id = req.user.id;
      if (!book_id || !rating || !text) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      const review = await Review.create({ book_id, user_id, rating, text });
      res.status(201).json(review);
    } catch (e) {
      res.status(500).json({ message: 'Ошибка при добавлении отзыва' });
    }
  },

  async getBookReviews(req, res) {
    try {
      const { bookId } = req.params;
      const reviews = await Review.getByBook(bookId);
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ message: 'Ошибка при получении отзывов' });
    }
  },

  async getUserReviews(req, res) {
    try {
      const user_id = req.user.id;
      const reviews = await Review.getByUser(user_id);
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ message: 'Ошибка при получении отзывов пользователя' });
    }
  }
};

module.exports = reviewController;
