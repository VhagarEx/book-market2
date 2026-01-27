import { pool } from '../config/db.js';

export const createOrder = async (userId, total) => {
  try {
    const res = await pool.query(
      'INSERT INTO orders (user_id, total_price, status) VALUES ($1,$2,$3) RETURNING *',
      [userId, parseFloat(total), 'pending']
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const res = await pool.query(`
      SELECT o.id, o.total_price, o.status, o.created_at,
      json_agg(json_build_object(
        'bookId', b.id,
        'title', b.title,
        'price', oi.price,
        'quantity', oi.quantity
      )) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN books b ON b.id = oi.book_id
      WHERE o.user_id = $1
      GROUP BY o.id, o.total_price, o.status, o.created_at
      ORDER BY o.created_at DESC
    `, [userId]);
    return res.rows;
  } catch (err) {
    throw err;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await pool.query(`
      SELECT 
        o.id,
        o.total_price,
        o.status,
        o.created_at,
        u.id AS user_id,
        u.email,
        json_agg(
          json_build_object(
            'bookId', b.id,
            'title', b.title,
            'price', oi.price,
            'quantity', oi.quantity
          )
        ) AS items
      FROM orders o
      JOIN users u ON u.id = o.user_id
      JOIN order_items oi ON oi.order_id = o.id
      JOIN books b ON b.id = oi.book_id
      GROUP BY o.id, u.id, u.email
      ORDER BY o.created_at DESC
    `);
    return res.rows;
  } catch (err) {
    throw err;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const allowed = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      throw new Error('Invalid status');
    }

    const res = await pool.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [status, orderId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const addOrderItem = async (orderId, bookId, quantity, price) => {
  try {
    if (quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    const res = await pool.query(
      'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ($1,$2,$3,$4) RETURNING *',
      [orderId, bookId, quantity, parseFloat(price)]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};