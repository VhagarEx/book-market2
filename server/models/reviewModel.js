// Модель для отзывов к книгам
const db = require('../config/db');

const Review = {
  async create({ book_id, user_id, rating, text }) {
    const result = await db.query(
      'INSERT INTO reviews (book_id, user_id, rating, text, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [book_id, user_id, rating, text]
    );
    return result.rows[0];
  },

  async getByBook(book_id) {
    const result = await db.query(
      `SELECT r.*, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.book_id = $1 ORDER BY r.created_at DESC`,
      [book_id]
    );
    return result.rows;
  },

  async getByUser(user_id) {
    const result = await db.query(
      'SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    return result.rows;
  }
};

module.exports = Review;
