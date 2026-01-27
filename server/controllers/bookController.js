import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../models/bookModel.js';

export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    console.error('Get books error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await getBookById(parseInt(id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error('Get book error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, price, image } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Title, author, and price are required' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const book = await createBook(title, author, price, image);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    console.error('Add book error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, image } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Title, author, and price are required' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const book = await updateBook(parseInt(id), title, author, price, image);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    console.error('Edit book error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const result = await deleteBook(parseInt(id));
    if (!result) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Remove book error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
