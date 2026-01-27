import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", {
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
  }, [token]);

  const removeFromCart = async (bookId) => {
    try {
      await api.delete(
        `/cart/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
      alert(err.response?.data?.error || "Failed to remove item");
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.put(
        `/cart/${bookId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert(err.response?.data?.error || "Failed to update quantity");
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await api.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CHECKOUT RESPONSE:", res.data);

      alert("Order created! ID: " + res.data.orderId);

      // обновляем корзину с бэка
      fetchCart();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Checkout failed");
    }
  };

  const total = cart.total || 0;

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

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 md:px-12 lg:px-24 py-12 flex items-center justify-center">
        <div className="max-w-xl w-full text-center bg-white rounded-xl shadow p-10">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some books to get started!</p>
          <Link
            to="/catalog"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.items.map((item) => (
              <div key={item.book_id} className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all">
                <div className="w-32 h-44 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                  <img src={item.image || "/imgs/home/main1.png"} alt={item.title} className="object-cover w-full h-full rounded-xl" />
                </div>
                <div className="flex-1 w-full text-left">
                  <div className="font-bold text-lg mb-1">{item.title}</div>
                  <div className="text-gray-600 text-sm mb-1">By {item.author}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-gray-400 text-xs">1,988,288 voters</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">Per item: {item.price} ₽</div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-1 text-lg text-black hover:bg-gray-100"
                        onClick={() => updateQuantity(item.book_id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-center min-w-[3rem]">{item.quantity}</span>
                      <button
                        className="px-3 py-1 text-lg text-black hover:bg-gray-100"
                        onClick={() => updateQuantity(item.book_id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.book_id)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 rounded px-3 py-1 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="font-bold text-lg">{item.price * item.quantity} ₽</div>
                </div>
              </div>
            ))}
          </div>
          {/* Панель итогов */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-8 sticky top-6">
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
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/catalog"
                className="block w-full py-3 text-center border border-gray-300 text-black font-semibold rounded-lg hover:bg-gray-50 transition-colors"
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
      </div>
    </div>
  );
}

export default Cart;