import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../models/bookModel.js';

export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    console.error('Get books error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Неверный ID книги' });
    }

    const book = await getBookById(parseInt(id));
    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json(book);
  } catch (err) {
    console.error('Get book error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, price, image } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Название, автор и цена обязательны' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Цена должна быть положительным числом' });
    }

    const book = await createBook(title, author, price, image);
    res.status(201).json({ message: 'Книга успешно добавлена', book });
  } catch (err) {
    console.error('Add book error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, image } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Неверный ID книги' });
    }

    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Название, автор и цена обязательны' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Цена должна быть положительным числом' });
    }

    const book = await updateBook(parseInt(id), title, author, price, image);
    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json({ message: 'Книга успешно обновлена', book });
  } catch (err) {
    console.error('Edit book error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const removeBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Неверный ID книги' });
    }

    const result = await deleteBook(parseInt(id));
    if (!result) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json({ message: 'Книга успешно удалена' });
  } catch (err) {
    console.error('Remove book error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
