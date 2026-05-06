import React, { useState } from 'react';
import { Filter, Download, MoreVertical, AlertTriangle, Shield, Ban, Eye } from 'lucide-react';

const Users = () => {
  // 🚀 STATES
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const itemsPerPage = 5;

  // 🚀 DUMMY USERS DATA
  const [users, setUsers] = useState([
    { id: 'R8-94021', name: 'Rahul Sharma', mobile: '+91 98765 43210', status: 'ACTIVE', joinDate: '12 Oct 2025', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    { id: 'R8-94119', name: 'Snehal Patil', mobile: '+91 91234 56789', status: 'ACTIVE', joinDate: '14 Oct 2025', avatar: 'https://i.pravatar.cc/150?u=snehal' },
    { id: 'R8-94200', name: 'Amit Verma', mobile: '+91 88888 77777', status: 'BLOCKED', joinDate: '20 Oct 2025', avatar: 'https://i.pravatar.cc/150?u=amit' },
    { id: 'R8-94255', name: 'Pooja Desai', mobile: '+91 90000 11223', status: 'ACTIVE', joinDate: '01 Nov 2025', avatar: 'https://i.pravatar.cc/150?u=pooja' },
    { id: 'R8-94310', name: 'Karan Singh', mobile: '+91 95522 33445', status: 'ACTIVE', joinDate: '15 Nov 2025', avatar: 'https://i.pravatar.cc/150?u=karan' },
    { id: 'R8-94402', name: 'Neha Gupta', mobile: '+91 77777 88888', status: 'ACTIVE', joinDate: '10 Dec 2025', avatar: 'https://i.pravatar.cc/150?u=neha' },
    { id: 'R8-94512', name: 'Aditya Kulkarni', mobile: '+91 99999 00000', status: 'BLOCKED', joinDate: '05 Jan 2026', avatar: 'https://i.pravatar.cc/150?u=aditya' },
  ]);

  // 🚀 BLOCK / UNBLOCK LOGIC
  const toggleBlockStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' };
      }
      return user;
    }));
    setActiveDropdown(null); 
  };

  // 🚀 DUMMY URGENT REPORTS
  const urgentReports = [
    { id: 1, reporter: 'Rohan Joshi (#3312)', issueTitle: 'Suspected rental scam for Baner apartment', issueDesc: 'User requested advance deposit via UPI before showing the property. Photos seem fake.', reportedUser: 'Vikram Singh', reportedUserSince: 'Member since 2 days ago' },
    { id: 2, reporter: 'Auto-Moderator', issueTitle: 'Inappropriate Language in Profile', issueDesc: 'Bio contains prohibited terms detected by automated filter.', reportedUser: 'Ajay Kumar', reportedUserSince: 'Member since May 2025' },
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
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>User Management</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Monitor user registrations, account status, and manage platform safety.</p>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ paddingBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#0ea5e9', borderBottom: '3px solid #0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} /> All Registered Users
        </div>
      </div>

      {/* TABLE CONTROLS (Search Bar Hata Diya Hai) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* FILTER BUTTON & DROPDOWN */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: isFilterActive ? '1px solid #0ea5e9' : '1px solid #e2e8f0', backgroundColor: isFilterActive ? '#e0f2fe' : '#fff', color: isFilterActive ? '#0ea5e9' : '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
            >
              <Filter size={16} /> Filter {isFilterActive && <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>}
            </button>

            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '110%', left: '0', width: '180px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10, padding: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>ACCOUNT STATUS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['All', 'ACTIVE', 'BLOCKED'].map(status => (
                    <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="radio" name="status" checked={filterStatus === status}
                        onChange={() => { setFilterStatus(status); setCurrentPage(1); setIsFilterOpen(false); }}
                        style={{ accentColor: '#0ea5e9' }}
                      />
                      {status === 'All' ? 'All Users' : status === 'ACTIVE' ? 'Active Users' : 'Blocked Users'}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* EXPORT BUTTON */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export
          </button>
        </div>

        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
          Showing {filteredUsers.length} total users
        </div>
      </div>

      {/* USERS TABLE CARD */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>USER DETAILS</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>MOBILE NUMBER</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>ACCOUNT STATUS</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>JOIN DATE</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((user, idx) => (
              <tr key={user.id} style={{ borderBottom: idx === currentItems.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>ID: {user.id}</div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
                  {user.mobile}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px',
                    backgroundColor: user.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                    color: user.status === 'ACTIVE' ? '#16a34a' : '#ef4444'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>
                  {user.joinDate}
                </td>
                
                <td style={{ padding: '16px 24px', textAlign: 'center', position: 'relative' }}>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s', padding: '4px' }} 
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeDropdown === user.id && (
                    <div style={{ 
                      position: 'absolute', right: '40px', top: '40px', backgroundColor: '#fff', 
                      borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                      zIndex: 20, width: '160px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#475569' }}>
                        <Eye size={16} /> View Profile
                      </button>
                      
                      <button 
                        onClick={() => toggleBlockStatus(user.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: user.status === 'ACTIVE' ? '#ef4444' : '#10b981' }} 
                      >
                        <Ban size={16} /> {user.status === 'ACTIVE' ? 'Block User' : 'Unblock User'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {[...Array(totalPages)].map((_, i) => (
             <button key={i} onClick={() => setCurrentPage(i+1)} style={{ padding: '4px 12px', borderRadius: '6px', border: currentPage === i+1 ? 'none' : '1px solid #e2e8f0', backgroundColor: currentPage === i+1 ? '#0ea5e9' : '#fff', color: currentPage === i+1 ? '#fff' : '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
               {i + 1}
             </button>
          ))}
        </div>
      </div>

      {/* URGENT REPORTS SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <AlertTriangle size={20} color="#ef4444" /> Urgent Reports
        </h2>
        <a href="#" style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>View All Reports</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {urgentReports.map(report => (
          <div key={report.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            
            <div style={{ flex: 2 }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>
                REPORTER: <span style={{ color: '#0f172a' }}>{report.reporter}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>"{report.issueTitle}"</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>"{report.issueDesc}"</p>
            </div>

            <div style={{ flex: 1, borderLeft: '1px solid #e2e8f0', paddingLeft: '24px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '8px' }}>REPORTED USER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#cbd5e1' }}></div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{report.reportedUser}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{report.reportedUserSince}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                Warn User
              </button>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                Block Account
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Users;