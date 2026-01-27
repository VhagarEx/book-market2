export const updateQuantity = async (userId, bookId, quantity) => {
  try {
    if (quantity < 1) throw new Error('Invalid quantity');
    // Проверяем наличие товара
    const bookCheck = await pool.query('SELECT id FROM books WHERE id=$1 AND is_active=true', [bookId]);
    if (!bookCheck.rows.length) throw new Error('Book not found');
    // Обновляем количество
    const res = await pool.query(
      'UPDATE cart SET quantity=$1 WHERE user_id=$2 AND book_id=$3 RETURNING *',
      [quantity, userId, bookId]
    );
    if (!res.rows.length) throw new Error('Item not found in cart');
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
import { pool } from '../config/db.js';

export const addToCart = async (userId, bookId, quantity = 1) => {
  try {
    if (quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    // Check if book exists
    const bookCheck = await pool.query('SELECT id FROM books WHERE id=$1 AND is_active=true', [bookId]);
    if (!bookCheck.rows.length) {
      throw new Error('Book not found');
    }

    // Try to update, if not found insert
    const existing = await pool.query(
      'SELECT id FROM cart WHERE user_id=$1 AND book_id=$2',
      [userId, bookId]
    );

    if (existing.rows.length) {
      const res = await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id=$2 AND book_id=$3 RETURNING *',
        [quantity, userId, bookId]
      );
      return res.rows[0];
    } else {
      const res = await pool.query(
        'INSERT INTO cart (user_id, book_id, quantity) VALUES ($1,$2,$3) RETURNING *',
        [userId, bookId, quantity]
      );
      return res.rows[0];
    }
  } catch (err) {
    throw err;
  }
};

export const getCart = async (userId) => {
  try {
    const res = await pool.query(`
      SELECT c.id, c.book_id, b.title, b.author, b.price, c.quantity,
        (b.price * c.quantity) AS total_item
      FROM cart c
      JOIN books b ON b.id = c.book_id
      WHERE c.user_id = $1
    `, [userId]);
    // Пересчет общей суммы
    const total = res.rows.reduce((sum, item) => sum + Number(item.total_item), 0);
    return { items: res.rows, total };
  } catch (err) {
    throw err;
  }
};

export const removeFromCart = async (userId, bookId) => {
  try {
    const res = await pool.query(
      'DELETE FROM cart WHERE user_id=$1 AND book_id=$2 RETURNING id',
      [userId, bookId]
    );
    if (!res.rows.length) {
      throw new Error('Item not found in cart');
    }
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const clearCart = async (userId) => {
  try {
    await pool.query('DELETE FROM cart WHERE user_id=$1', [userId]);
  } catch (err) {
    throw err;
  }
};
