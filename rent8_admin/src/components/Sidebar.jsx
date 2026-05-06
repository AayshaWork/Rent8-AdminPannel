import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, List, Settings, AlertTriangle, Headset } from 'lucide-react'; // 🚀 Headset import kiya

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Pending Approvals', icon: <CheckSquare size={20} />, path: '/pending-approvals' },
    { name: 'Ad Active Properties', icon: <List size={20} />, path: '/inventory' },
    { name: 'User Management', icon: <Users size={20} />, path: '/users' },
    
    // 👇 DONO KO ALAG KAR DIYA
    { name: 'Reports (Safety)', icon: <AlertTriangle size={20} />, path: '/reports' },
    { name: 'Support Tickets', icon: <Headset size={20} />, path: '/support' }, 
    
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
  <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>
        <img src="/r8.png" alt="R8 Logo" style={{ height: '40px', objectFit: 'contain' }} />
        <span>Admin</span>
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', padding: '12px 16px', margin: '4px 0',
              borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? '#eff6ff' : 'transparent',
              color: isActive ? '#0ea5e9' : '#64748b',
              fontWeight: isActive ? '600' : '500',
              transition: 'all 0.2s'
            })}
          >
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;