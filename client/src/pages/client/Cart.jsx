import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const add = async (id) => {
    await axios.post(
      "http://localhost:5000/api/cart/plus",
      { bookId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchCart();
  };

  const minus = async (id) => {
    await axios.post(
      "http://localhost:5000/api/cart/minus",
      { bookId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchCart();
  };

  const removeFromCart = async (bookId) => {
    await axios.delete(
      `http://localhost:5000/api/cart/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchCart();
  };
  const clearCart = async () => {
    if (!window.confirm("Clear the cart?")) return;

    try {
      await axios.delete("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart([]); // мгновенно очищаем UI
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };


  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CHECKOUT RESPONSE:", res.data);

      alert("Order created! ID: " + res.data.orderId);

      // обновляем корзину
      setCart([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Checkout failed");
    }
  };


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Please login to view your cart</p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some books to get started!</p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.book_id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Заглушка для обложки */}
                    <div className="w-20 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                      {item.title.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-black mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">Per item: {item.price} ₽</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Кнопки управления количеством */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => minus(item.book_id)}
                              className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-center min-w-[3rem]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => add(item.book_id)}
                              className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.book_id)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {item.price * item.quantity} ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Панель итогов */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{total} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Included</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total} ₽</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 border border-red-500 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>


              <Link
                to="/catalog"
                className="block w-full py-3 text-center border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">Need help?</h3>
                <p className="text-sm text-gray-600">
                  Contact us at <a href="mailto:support@opentome.com" className="text-black hover:underline">support@opentome.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительные рекомендации */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Пример рекомендуемых книг */}
            {[
              { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 450 },
              { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 500 },
              { id: 3, title: "1984", author: "George Orwell", price: 400 },
              { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 380 },
            ].map((book) => (
              <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-2xl">
                  {book.title.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="font-semibold text-black mb-1 truncate">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                <p className="font-semibold">{book.price} ₽</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;