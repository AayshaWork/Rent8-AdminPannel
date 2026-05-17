// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages import karein
import Login from "../pages/Login";
// import AdminRegister from "../pages/AdminRegister"; // Agar aapne register page banaya hai
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import PendingApprovals from "../pages/PendingApprovals";
import ActiveProperties from "../pages/ActiveProperties";
import Reports from "../pages/Reports";
import Support from "../pages/Support";
import AllProperties from "../pages/AllProperties";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC ROUTES (No Sidebar/Navbar) */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<AdminRegister />} /> */}

      {/* 🔒 PROTECTED ROUTES (Dashboard Layout ke sath) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/inventory" element={<ActiveProperties />} />
          <Route path="/pending-approvals" element={<PendingApprovals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/support" element={<Support />} />
          <Route path="/allproperty" element={<AllProperties/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;