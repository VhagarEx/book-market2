import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

// client pages
import Home from "./pages/client/Home";
import Catalog from "./pages/client/Catalog";
import Book from "./pages/client/Book";
import Cart from "./pages/client/Cart";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import MyOrders from "./pages/client/MyOrders";
import Profile from "./pages/client/Profile";

// admin pages
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";

// guards
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= CLIENT ================= */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<Book />} />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="books" element={<AdminBooks />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
