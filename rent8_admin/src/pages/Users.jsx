import React from 'react';

const Users = () => {
  // Dummy data jo baad mein Node.js API se aayega
  const userList = [
    { id: 'R8-94021', name: 'Alex Rivera', mobile: '+91 98765 43210', status: 'VERIFIED', date: 'Oct 12, 2023' },
    { id: 'R8-94119', name: 'Jordan Smith', mobile: '+91 88888 22222', status: 'UNVERIFIED', date: 'Oct 14, 2023' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', color: '#0f172a' }}>User Management</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Monitor user registrations, account status, and manage platform safety.</p>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 0' }}>USER DETAILS</th>
              <th>MOBILE NUMBER</th>
              <th>VERIFICATION STATUS</th>
              <th>JOIN DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 0' }}>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>ID: {user.id}</div>
                </td>
                <td style={{ fontWeight: '500' }}>{user.mobile}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                    backgroundColor: user.status === 'VERIFIED' ? '#dcfce7' : '#ffedd5',
                    color: user.status === 'VERIFIED' ? '#166534' : '#9a3412'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ color: '#64748b' }}>{user.date}</td>
                <td><button style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px' }}>⋮</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;