import { pool } from '../config/db.js';
//book
export const getAllBooks = async () => {
  try {
    const res = await pool.query(
      'SELECT id, title, author, price, image FROM books WHERE is_active = true ORDER BY id DESC'
    );
    return res.rows;
  } catch (err) {
    throw err;
  }
};

export const getBookById = async (id) => {
  try {
    const res = await pool.query(
      'SELECT id, title, author, price, image FROM books WHERE id = $1 AND is_active = true',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const createBook = async (title, author, price, image) => {
  try {
    if (!title || !author || !price || price <= 0) {
      throw new Error('Invalid book data');
    }

    const res = await pool.query(
      'INSERT INTO books (title, author, price, image, is_active) VALUES ($1,$2,$3,$4,true) RETURNING *',
      [title, author, parseFloat(price), image || null]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const updateBook = async (id, title, author, price, image) => {
  try {
    if (!title || !author || !price || price <= 0) {
      throw new Error('Invalid book data');
    }

    const res = await pool.query(
      'UPDATE books SET title=$1, author=$2, price=$3, image=$4 WHERE id=$5 RETURNING *',
      [title, author, parseFloat(price), image || null, id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await pool.query(
      'UPDATE books SET is_active=false WHERE id=$1 RETURNING id',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
