import { getAllBooks } from '../models/bookModel.js';

export const getBooks = async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
};
