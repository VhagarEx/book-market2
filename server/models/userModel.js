import { pool } from '../config/db.js';

export const createUser = async (name, email, password) => {
  try {
    const res = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, email, role',
      [name, email, password]
    );
    return res.rows[0];
  } catch (err) {
    if (err.code === '23505') {
      throw new Error('User with this email already exists');
    }
    throw err;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const res = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const findUserById = async (id) => {
  try {
    const res = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
