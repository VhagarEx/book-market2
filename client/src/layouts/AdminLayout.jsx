import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-6">Admin</h2>

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
