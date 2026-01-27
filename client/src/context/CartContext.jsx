import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Загрузить корзину при монтировании
  const fetchCart = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Добавить товар в корзину
  const addToCart = async (bookId, quantity = 1) => {
    try {
      await api.post(
        "/cart",
        { bookId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart(); // Перезагрузить корзину
      return true;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      return false;
    }
  };

  // Удалить товар из корзины
  const removeFromCart = async (bookId) => {
    try {
      await api.delete(`/cart/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart(); // Перезагрузить корзину
      return true;
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      return false;
    }
  };

  // Получить количество товаров в корзине
  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Получить общую стоимость
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        getCartCount,
        getCartTotal,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
