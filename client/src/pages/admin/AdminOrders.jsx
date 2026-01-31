import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        revenue: 0,
        pending: 0
    });

    const fetchStats = async () => {
        try {
            // Получить все заказы
            const allOrdersRes = await api.get(
                "/orders/admin/all",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Калькулируем статистику из заказов
            const allOrders = allOrdersRes.data;
            const uniqueUsers = new Set();
            let totalRevenue = 0;
            let pendingCount = 0;
            
            allOrders.forEach(order => {
                uniqueUsers.add(order.user_id);
                totalRevenue += parseFloat(order.total_price);
                if (order.status === 'pending') {
                    pendingCount++;
                }
            });
            
            setStats({
                users: uniqueUsers.size,
                orders: allOrders.length,
                revenue: totalRevenue,
                pending: pendingCount
            });
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders/admin/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, [token]);

    const updateStatus = async (id, status) => {
        try {
            await api.patch(
                `/orders/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOrders();
            fetchStats();
            alert("Статус обновлен успешно!");
        } catch (err) {
            console.error("Failed to update status:", err);
            alert(err.response?.data?.error || "Ошибка обновления статуса");
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 fade-in">📦 Управление заказами</h1>
                    <p className="text-gray-600">Отслеживайте и управляйте всеми заказами</p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 fade-in hover-scale">
                        <p className="text-blue-600 font-medium text-sm">Пользователи</p>
                        <p className="text-3xl font-bold text-blue-900 mt-2">{stats.users}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 fade-in hover-scale" style={{animationDelay: '0.1s'}}>
                        <p className="text-purple-600 font-medium text-sm">Заказы</p>
                        <p className="text-3xl font-bold text-purple-900 mt-2">{stats.orders}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 fade-in hover-scale" style={{animationDelay: '0.2s'}}>
                        <p className="text-green-600 font-medium text-sm">Доход</p>
                        <p className="text-3xl font-bold text-green-900 mt-2">{Math.round(stats.revenue).toLocaleString()} ₽</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6 fade-in hover-scale" style={{animationDelay: '0.3s'}}>
                        <p className="text-yellow-600 font-medium text-sm">В ожидании</p>
                        <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
                    </div>
                </div>

                {/* ORDERS LIST */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Заказы</h2>
                    
                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-500 text-lg">Нет заказов</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order, idx) => (
                                <div 
                                    key={order.id} 
                                    className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all p-6 fade-in"
                                    style={{animationDelay: `${idx * 0.05}s`}}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">ID Заказа</p>
                                            <p className="text-lg font-bold text-gray-900">#{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Пользователь</p>
                                            <p className="text-sm text-gray-900">{order.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Сумма</p>
                                            <p className="text-lg font-bold text-gray-900">{order.total_price.toLocaleString()} ₽</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Дата</p>
                                            <p className="text-sm text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Статус</p>
                                            <select
                                                value={order.status}
                                                onChange={e => updateStatus(order.id, e.target.value)}
                                                className={`w-full px-3 py-1 rounded-lg font-semibold text-sm border-0 cursor-pointer transition-colors
                                                    ${order.status === "pending" && "bg-yellow-100 text-yellow-800"}
                                                    ${order.status === "paid" && "bg-blue-100 text-blue-800"}
                                                    ${order.status === "shipped" && "bg-green-100 text-green-800"}
                                                    ${order.status === "completed" && "bg-green-200 text-green-900"}
                                                    ${order.status === "cancelled" && "bg-red-100 text-red-800"}
                                                `}
                                            >
                                                <option value="pending">В ожидании</option>
                                                <option value="paid">Оплачено</option>
                                                <option value="shipped">Отправлено</option>
                                                <option value="completed">Завершено</option>
                                                <option value="cancelled">Отменено</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    {order.items && order.items.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="font-semibold text-gray-900 mb-3">📚 Товары в заказе:</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {order.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="bg-gray-50 rounded-lg p-3">
                                                        <p className="font-medium text-gray-900">{item.title}</p>
                                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                                            <span>×{item.quantity}</span>
                                                            <span>{item.price} ₽ = <strong className="text-gray-900">{(item.price * item.quantity).toLocaleString()} ₽</strong></span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminOrders;
