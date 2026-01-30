import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, addOrderItem } from '../models/orderModel.js';
import { getCart, clearCart } from '../models/cartModel.js';

export const createNewOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get cart items
    const cartData = await getCart(userId);
    const cartItems = cartData.items || [];
    if (!cartItems.length) {
      return res.status(400).json({ error: 'Корзина пуста' });
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

    res.status(201).json({ message: 'Заказ успешно создан', orderId: order.id, total });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error('Get admin orders error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Статус обязателен' });
    }

    const order = await updateOrderStatus(parseInt(id), status);
    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    res.json({ message: 'Статус заказа обновлен', order });
  } catch (err) {
    console.error('Change order status error:', err);
    if (err.message === 'Invalid status') {
      return res.status(400).json({ error: 'Неверный статус' });
    }
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
