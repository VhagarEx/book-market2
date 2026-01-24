import { createOrder } from '../models/orderModel.js';

export const createNewOrder = async (req, res) => {
  const { total } = req.body;
  const userId = req.user.id;

  const order = await createOrder(userId, total);
  res.json(order);
};
