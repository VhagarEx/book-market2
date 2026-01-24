import { pool } from '../config/db.js';

export const createOrder = async (userId, total) => {
  const res = await pool.query(
    'INSERT INTO orders (user_id, total_price) VALUES ($1,$2) RETURNING *',
    [userId, total]
  );
  return res.rows[0];
};