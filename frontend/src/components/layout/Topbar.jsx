import { Bell, Search, LogOut } from "lucide-react"; // ✅ LogOut icon import kiya
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya

const Topbar = () => {
  const navigate = useNavigate(); // ✅ Hook initialize kiya

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-white border-b">
      
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search
          size={18}
          className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2"
        />

        <input
          type="text"
          placeholder="Search users, properties, or ads..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     transition"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600 transition hover:text-black" size={20} />
          
          {/* Dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>

          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-gray-900 rounded-full">
            A
          </div>
        </div>

        {/* Divider (Optional, UI ko clean rakhne ke liye) */}
        <div className="hidden w-px h-6 bg-gray-300 sm:block"></div>

        {/* ✅ Logout Button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-gray-500 transition rounded-full hover:text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
        </button>

      </div>
    </div>
  );
};

export default Topbar;