import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  List,
  Settings,
  AlertTriangle,
  Headset,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Pending Approvals", icon: CheckSquare, path: "/pending-approvals" },
    { name: "Active Properties", icon: List, path: "/inventory" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Reports", icon: AlertTriangle, path: "/reports" },
    { name: "Support", icon: Headset, path: "/support" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r">
      
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 text-xl font-bold text-gray-900">
        <img src="/r8.png" alt="logo" className="h-10" />
        <span>Admin</span>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm transition-all
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;