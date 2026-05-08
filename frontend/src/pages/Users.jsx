import React, { useState, useEffect } from 'react';
import { Filter, Download, MoreVertical, AlertTriangle, Shield, Ban, Eye, X, Mail, Phone, Calendar, Star } from 'lucide-react'; // ✅ Naye Icons add kiye
import API from '../services/api';

const Users = () => {
  // 🚀 STATES
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null); // ✅ View Profile popup ke liye naya state
  const itemsPerPage = 5;

  // 🚀 FETCH USERS FROM BACKEND
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/users'); // Aapka working route
      
      if (res.data.success) {
        // ✅ Email, Role aur isPremium ko bhi map kar liya hai
        const formattedUsers = res.data.data.map((user) => ({
          id: user._id, 
          name: user.name || "Unknown User",
          mobile: user.mobile || user.phone || "N/A", 
          email: user.email || "N/A", 
          role: user.role || "user", 
          isPremium: user.isPremium || false, 
          status: user.status ? user.status.toUpperCase() : "ACTIVE", 
          joinDate: new Date(user.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          }),
          avatar: `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=e2e8f0&color=475569`
        }));

        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users from database");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 BLOCK / UNBLOCK LOGIC (Real API Call)
  const toggleBlockStatus = async (userId) => {
    try {
      const res = await API.put(`/users/${userId}/block`); // Aapka working route
      
      if (res.data.success) {
        setUsers(users.map(user => {
          if (user.id === userId) {
            return { ...user, status: res.data.data.status }; 
          }
          return user;
        }));
        
        alert(res.data.message); 
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
      alert(error.response?.data?.message || "Failed to change user status");
    } finally {
      setActiveDropdown(null); 
    }
  };

  // 🚀 FILTER LOGIC
  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isFilterActive = filterStatus !== 'All';

  return (
    <div className="relative min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900">User Management</h1>
        <p className="m-0 text-slate-500">Monitor user registrations, account status, and manage platform safety.</p>
      </div>

      {/* TABS */}
      <div className="flex gap-8 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 pb-3 text-sm font-bold border-b-[3px] text-sky-500 border-sky-500">
          <Shield size={18} /> All Registered Users
        </div>
      </div>

      {/* TABLE CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[13px] font-semibold cursor-pointer transition-colors ${
                isFilterActive ? 'border-sky-500 bg-sky-50 text-sky-500' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={16} /> Filter {isFilterActive && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 z-10 p-3 mt-2 bg-white border shadow-lg top-full w-44 rounded-xl border-slate-200">
                <div className="mb-2 text-[11px] font-bold tracking-wide text-slate-500">ACCOUNT STATUS</div>
                <div className="flex flex-col gap-2">
                  {['All', 'ACTIVE', 'BLOCKED'].map(status => (
                    <label key={status} className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded">
                      <input 
                        type="radio" name="status" checked={filterStatus === status}
                        onChange={() => { setFilterStatus(status); setCurrentPage(1); setIsFilterOpen(false); }}
                        className="accent-sky-500"
                      />
                      {status === 'All' ? 'All Users' : status === 'ACTIVE' ? 'Active Users' : 'Blocked Users'}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-[13px] font-medium text-slate-500">
          Showing {filteredUsers.length} total users
        </div>
      </div>

      {/* USERS TABLE CARD */}
      <div className="mb-10 overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead className="border-b bg-slate-50 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-400">USER DETAILS</th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-400">MOBILE NUMBER</th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-400">ACCOUNT STATUS</th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-400">JOIN DATE</th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-center text-slate-400">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-500">Loading users from database...</td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50/50">
                <td className="flex items-center gap-3 px-6 py-4">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-400">ID: {user.id.substring(0, 8)}...</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{user.mobile}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                    user.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{user.joinDate}</td>
                
                <td className="relative px-6 py-4 text-center">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                    className="p-1 transition-colors bg-transparent rounded-md cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeDropdown === user.id && (
                    <div className="absolute z-20 flex flex-col w-40 gap-1 p-2 bg-white border rounded-lg shadow-lg right-10 top-10 border-slate-200">
                      
                      {/* ✅ View Profile Button */}
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveDropdown(null);
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 py-2.5 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} /> View Profile
                      </button>
                      
                      <button 
                        onClick={() => toggleBlockStatus(user.id)}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 py-2.5 text-left text-[13px] font-semibold hover:bg-slate-50 ${
                          user.status === 'ACTIVE' ? 'text-red-500' : 'text-emerald-500'
                        }`}
                      >
                        <Ban size={16} /> {user.status === 'ACTIVE' ? 'Block User' : 'Unblock User'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-500">No users found in database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================= */}
      {/* 🟢 VIEW PROFILE MODAL */}
      {/* ========================================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">User Profile</h3>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-1 transition-colors rounded-full cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              {/* Profile Image & Name */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <img src={selectedUser.avatar} alt="Profile" className="object-cover w-24 h-24 mb-3 border-4 rounded-full border-slate-50" />
                  {selectedUser.isPremium && (
                    <div className="absolute bottom-3 right-0 p-1.5 bg-yellow-400 rounded-full text-white border-2 border-white" title="Premium User">
                      <Star size={12} className="fill-current" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedUser.name}</h2>
                <div className="text-sm font-medium text-slate-500">ID: {selectedUser.id}</div>
                
                <div className="flex gap-2 mt-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                    {selectedUser.role}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    selectedUser.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Phone size={18} className="text-slate-400" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</div>
                    <div className="text-sm font-semibold text-slate-700">{selectedUser.mobile}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Mail size={18} className="text-slate-400" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Email Address</div>
                    <div className="text-sm font-semibold text-slate-700">{selectedUser.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Calendar size={18} className="text-slate-400" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Joined On</div>
                    <div className="text-sm font-semibold text-slate-700">{selectedUser.joinDate}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;