import { useEffect, useState } from "react";
import api from "../../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    if (token) {
      api.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // Map backend fields to frontend expectations
          const mapped = res.data.map(order => ({
            ...order,
            total: order.total_price,
            items: order.items.map(item => ({
              ...item,
              book_id: item.bookId
            }))
          }));
          setOrders(mapped);
        })
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500 text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-xl w-full text-center bg-white rounded-xl shadow p-10">
          <div className="text-6xl mb-6">👤</div>
          <h1 className="text-3xl font-bold mb-4">Пожалуйста, войдите, чтобы просмотреть профиль</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 lg:px-24 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-5xl font-bold text-gray-400">
            {user.name ? user.name[0].toUpperCase() : "👤"}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{user.name || user.email}</h2>
            <div className="text-gray-600 mb-1">Email: {user.email}</div>
            <div className="text-gray-600 mb-1">Роль: {user.role === "admin" ? "Администратор" : "Пользователь"}</div>
            <div className="text-gray-600 mb-1">ID: {user.id}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-xl font-bold mb-6">Мои заказы</h3>
          {orders.length === 0 ? (
            <div className="text-gray-500">Заказов еще нет.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border shadow-sm p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-bold text-lg">Заказ #{order.id}</span>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${order.status === "pending" && "bg-yellow-100 text-yellow-800"}
                      ${order.status === "paid" && "bg-blue-100 text-blue-800"}
                      ${order.status === "shipped" && "bg-green-100 text-green-800"}
                      ${order.status === "completed" && "bg-green-200 text-green-900"}
                      ${order.status === "cancelled" && "bg-red-100 text-red-800"}
                    `}>
                      {order.status === "pending" && "В ожидании"}
                      {order.status === "paid" && "Оплачено"}
                      {order.status === "shipped" && "Отправлено"}
                      {order.status === "completed" && "Завершено"}
                      {order.status === "cancelled" && "Отменено"}
                    </span>
                  </div>
                  <div className="mb-2 text-gray-600 text-sm">Итого: <span className="font-bold text-black text-base">{order.total} ₽</span></div>
                  <div className="mt-4">
                    <div className="text-gray-500 mb-2 font-medium">Книги в заказе:</div>
                    <ul className="divide-y divide-gray-100">
                      {order.items.map((item, idx) => (
                        <li key={item.book_id || idx} className="py-2 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-800">{item.title}</span>
                            <span className="ml-2 text-gray-500">× {item.quantity}</span>
                          </div>
                          <span className="text-gray-700 font-medium">{item.price * item.quantity} ₽</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
