
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-6">Admin</h2>
        {user && (
          <div className="mb-4 flex flex-col gap-2">
            <span className="text-gray-200 font-medium">{user.email || user.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        )}
        <nav className="flex flex-col gap-3">
          <Link to="/admin/books">📚 Books</Link>
          <Link to="/admin/orders">📦 Orders</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
