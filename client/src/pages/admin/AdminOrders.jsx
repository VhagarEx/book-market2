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
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Заказы администратора</h1>

            {/* ======= STATS ======= */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Пользователи</p>
                    <p className="text-2xl font-bold">{stats.users}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Заказы</p>
                    <p className="text-2xl font-bold">{stats.orders}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                        <p className="text-gray-500">Доход</p>
                        <p className="text-2xl font-bold">{Math.round(stats.revenue)} ₽</p>
                    </div>

                    <div className="p-4 bg-white shadow rounded">
                        <p className="text-gray-500">В ожидании</p>
                        <p className="text-2xl font-bold">{stats.pending}</p>
                    </div>
                </div>

            {/* ======= ORDERS ======= */}
            {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Нет заказов</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="border p-4 mb-4 rounded">
                        <p><b>ID:</b> {order.id}</p>
                        <p><b>Пользователь:</b> {order.email}</p>
                        <p><b>Итого:</b> {order.total_price} ₽</p>
                        <p><b>Создано:</b> {new Date(order.created_at).toLocaleString()}</p>
                        <p>
                            <b>Статус:</b>{" "}
                            <span className={
                                order.status === "pending" ? "text-yellow-500" :
                                    order.status === "paid" ? "text-blue-500" :
                                        order.status === "shipped" ? "text-green-600" :
                                            order.status === "completed" ? "text-green-700" :
                                                "text-gray-500"
                            }>
                                {order.status === "pending" && "В ожидании"}
                                {order.status === "paid" && "Оплачено"}
                                {order.status === "shipped" && "Отправлено"}
                                {order.status === "completed" && "Завершено"}
                                {order.status === "cancelled" && "Отменено"}
                            </span>
                        </p>

                        {/* Items */}
                        <div className="mt-2 bg-gray-50 p-2 rounded">
                            <p className="font-semibold text-sm">Товары:</p>
                            {order.items && order.items.map((item, idx) => (
                                <p key={idx} className="text-sm text-gray-600">
                                    {item.title} × {item.quantity} = {item.price * item.quantity} ₽
                                </p>
                            ))}
                        </div>

                        <select
                            value={order.status}
                            onChange={e => updateStatus(order.id, e.target.value)}
                            className="mt-2 border p-1"
                        >
                            <option value="pending">В ожидании</option>
                            <option value="paid">Оплачено</option>
                            <option value="shipped">Отправлено</option>
                            <option value="completed">Завершено</option>
                            <option value="cancelled">Отменено</option>
                        </select>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminOrders;
