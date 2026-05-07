// routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Agar token nahi hai, ya role admin/owner nahi hai, toh wapas login par bhej do
  if (!token || (role !== "admin" && role !== "owner")) {
    return <Navigate to="/login" replace />;
  }

  // Agar sab theek hai, toh andar ke components (Dashboard etc.) render kar do
  return <Outlet />;
};

export default ProtectedRoute;