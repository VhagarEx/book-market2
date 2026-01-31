import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;
  
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
