import React, { useState, useEffect } from 'react';
import { Filter, Download, MoreVertical, AlertTriangle, Shield, Ban, Eye } from 'lucide-react';
import API from '../services/api';


const Users = () => {
  // 🚀 STATES
  const [users, setUsers] = useState([]); // ✅ Dummy data hata kar empty array rakha
  const [loading, setLoading] = useState(true); // ✅ Loading state add ki
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const itemsPerPage = 5;

  // 🚀 FETCH USERS FROM BACKEND
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // ✅ Backend ki exact API hit kar rahe hain
      const res = await API.get('/api/admin/users');
      
      if (res.data.success) {
        // Backend se aane wale data ko map karke apne UI ke hisaab se format kar rahe hain
        const formattedUsers = res.data.data.map((user) => ({
          id: user._id, 
          name: user.name || "Unknown User",
          mobile: user.mobile || user.phone || "N/A", // Agar aapke DB me phone hai toh phone likhein
          status: user.status ? user.status.toUpperCase() : "ACTIVE", // Agar status nahi hai toh default ACTIVE
          joinDate: new Date(user.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          }),
          // Naam ke hisaab se automatic avatar generate karna
          avatar: `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=random`
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

  // 🚀 BLOCK / UNBLOCK LOGIC (Abhi ke liye sirf UI me change karega, next hum iski API banayenge)
  const toggleBlockStatus = async (userId) => {
    // UI update kar rahe hain
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' };
      }
      return user;
    }));
    setActiveDropdown(null); 

    // TODO: Next step me yahan API hit karenge: await API.put(`/api/admin/users/${userId}/block`)
  };

  // 🚀 DUMMY URGENT REPORTS (Inko baad me real karenge)
  const urgentReports = [
    { id: 1, reporter: 'Rohan Joshi (#3312)', issueTitle: 'Suspected rental scam for Baner apartment', issueDesc: 'User requested advance deposit via UPI before showing the property. Photos seem fake.', reportedUser: 'Vikram Singh', reportedUserSince: 'Member since 2 days ago' },
  ];

  // 🚀 FILTER LOGIC
  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isFilterActive = filterStatus !== 'All';

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
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
          {/* FILTER BUTTON & DROPDOWN */}
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
                      <button className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 py-2.5 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-50">
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

    </div>
  );
};

export default Users;