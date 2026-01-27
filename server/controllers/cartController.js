import { addToCart, getCart, removeFromCart, updateQuantity } from '../models/cartModel.js';
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { quantity } = req.body;
    if (!quantity || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    const item = await updateQuantity(userId, parseInt(bookId), quantity);
    res.json({ message: 'Quantity updated', item });
  } catch (err) {
    console.error('Update quantity error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity = 1 } = req.body;

    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const item = await addToCart(userId, parseInt(bookId), quantity);
    res.status(201).json({ message: 'Item added to cart', item });
  } catch (err) {
    console.error('Add to cart error:', err);
    if (err.message === 'Book not found') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCart(userId);
    res.json(cart);
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    await removeFromCart(userId, parseInt(bookId));
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    if (err.message === 'Item not found in cart') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
