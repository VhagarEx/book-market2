import { pool } from '../config/db.js';

export const getAllBooks = async () => {
  const res = await pool.query('SELECT * FROM books');
  return res.rows;
};
