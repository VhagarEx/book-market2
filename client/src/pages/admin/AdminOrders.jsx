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
            alert("Status updated successfully!");
        } catch (err) {
            console.error("Failed to update status:", err);
            alert(err.response?.data?.error || "Failed to update status");
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

            {/* ======= STATS ======= */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Users</p>
                    <p className="text-2xl font-bold">{stats.users}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Orders</p>
                    <p className="text-2xl font-bold">{stats.orders}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                        <p className="text-gray-500">Revenue</p>
                        <p className="text-2xl font-bold">{Math.round(stats.revenue)} ₽</p>
                    </div>

                    <div className="p-4 bg-white shadow rounded">
                        <p className="text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{stats.pending}</p>
                    </div>
                </div>

            {/* ======= ORDERS ======= */}
            {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No orders yet</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="border p-4 mb-4 rounded">
                        <p><b>ID:</b> {order.id}</p>
                        <p><b>User:</b> {order.email}</p>
                        <p><b>Total:</b> {order.total_price} ₽</p>
                        <p><b>Created:</b> {new Date(order.created_at).toLocaleString()}</p>
                        <p>
                            <b>Status:</b>{" "}
                            <span className={
                                order.status === "pending" ? "text-yellow-500" :
                                    order.status === "paid" ? "text-blue-500" :
                                        order.status === "shipped" ? "text-green-600" :
                                            order.status === "completed" ? "text-green-700" :
                                                "text-gray-500"
                            }>
                                {order.status}
                            </span>
                        </p>

                        {/* Items */}
                        <div className="mt-2 bg-gray-50 p-2 rounded">
                            <p className="font-semibold text-sm">Items:</p>
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
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                            <option value="shipped">shipped</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminOrders;
