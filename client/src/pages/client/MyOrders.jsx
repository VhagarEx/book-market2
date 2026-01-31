import { useEffect, useState } from "react";
import api from "../../api/api";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/my", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to load orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) {
        return <div className="p-10 text-center">Загрузка заказов...</div>;
    }

    if (!orders.length) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Нет заказов</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-6 shadow-sm"
                    >
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="font-semibold">Заказ #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>

                            <span className={`px-3 py-1 rounded text-sm
                                ${order.status === "pending" && "bg-yellow-100 text-yellow-800"}
                                ${order.status === "paid" && "bg-blue-100 text-blue-800"}
                                ${order.status === "shipped" && "bg-green-100 text-green-800"}
                                ${order.status === "completed" && "bg-green-100 text-green-800"}
                            `}>
                                {order.status === "pending" && "В ожидании"}
                                {order.status === "paid" && "Оплачено"}
                                {order.status === "shipped" && "Отправлено"}
                                {order.status === "completed" && "Завершено"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between text-sm"
                                >
                                    <span>
                                        {item.title} × {item.quantity}
                                    </span>
                                    <span>{item.price * item.quantity} ₽</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-right font-bold">
                            Итого: {order.total_price} ₽
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
