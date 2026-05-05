import React from 'react';

const Topbar = () => {
  return (
    <div style={{ 
      padding: '16px 24px', 
      backgroundColor: '#fff', 
      borderBottom: '1px solid #e2e8f0', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
    <div style={{ flex: 1, margin: '0 40px', maxWidth: '600px', position: 'relative' }}>
          <svg 
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search users, properties, or active ads..." 
            style={{ 
              width: '100%', 
              padding: '12px 16px 12px 44px', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#fff',
              fontSize: '15px',
              color: '#0f172a',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease-in-out'
            }} 
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>
      {/* Profile & Notification */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>🔔</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Admin Profile</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Super Admin</div>
          </div>
          {/* Profile Picture Placeholder */}
          <div style={{ width: '40px', height: '40px', backgroundColor: '#1e293b', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
            A
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;