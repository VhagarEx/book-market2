import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, addOrderItem } from '../models/orderModel.js';
import { getCart, clearCart } from '../models/cartModel.js';

export const createNewOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get cart items
    const cartData = await getCart(userId);
    const cartItems = cartData.items || [];
    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cartData.total || 0;

    // Create order
    const order = await createOrder(userId, total);

    // Add order items
    for (const item of cartItems) {
      await addOrderItem(order.id, item.book_id, item.quantity, item.price);
    }

    // Clear cart
    await clearCart(userId);

    res.status(201).json({ message: 'Order created successfully', orderId: order.id, total });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error('Get admin orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const order = await updateOrderStatus(parseInt(id), status);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Change order status error:', err);
    if (err.message === 'Invalid status') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
