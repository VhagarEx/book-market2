import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/admin/stats",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, []);


    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setOrders(res.data);
    };

    const updateStatus = async (id, status) => {
        await axios.patch(
            `http://localhost:5000/api/orders/${id}/status`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

            {/* ======= STATS ======= */}
            {stats && (
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
                        <p className="text-2xl font-bold">{stats.revenue} ₽</p>
                    </div>

                    <div className="p-4 bg-white shadow rounded">
                        <p className="text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{stats.pending}</p>
                    </div>
                </div>
            )}

            {/* ======= ORDERS ======= */}
            {orders.map(order => (
                <div key={order.id} className="border p-4 mb-4 rounded">
                    <p><b>ID:</b> {order.id}</p>
                    <p><b>User:</b> {order.email}</p>
                    <p><b>Total:</b> {order.total_price} ₽</p>
                    <p>
                        <b>Status:</b>{" "}
                        <span className={
                            order.status === "pending" ? "text-yellow-500" :
                                order.status === "paid" ? "text-blue-500" :
                                    order.status === "shipped" ? "text-green-600" :
                                        "text-gray-500"
                        }>
                            {order.status}
                        </span>
                    </p>

                    <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="mt-2 border p-1"
                    >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="shipped">shipped</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
            ))}
        </div>
    );

}

export default AdminOrders;
