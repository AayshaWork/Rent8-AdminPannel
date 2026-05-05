import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, List, MessageSquare, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Pending Approvels', icon: <CheckSquare size={20} />, path: '/payments' },
    { name: 'Ad Active Properties', icon: <List size={20} />, path: '/inventory' },
    { name: 'User Management', icon: <Users size={20} />, path: '/users' },
    { name: 'Report', icon: <MessageSquare size={20} />, path: '/chats' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
  <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
      
      {/* Yahan Rent8 text hatake Logo laga diya hai */}
      <div style={{ 
        padding: '24px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', /* Logo aur Admin word ke beech ka gap */
        fontSize: '22px', 
        fontWeight: 'bold', 
        color: '#0f172a' 
      }}>
        <img src="/r8.png" alt="R8 Logo" style={{ height: '40px', objectFit: 'contain' }} />
        <span>Admin</span>
      </div>

      {/* Iske niche tera baaki ka sidebar ka code aayega... */}
      
      <div style={{ flex: 1, padding: '10px' }}>
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', padding: '12px 16px', margin: '4px 0',
              borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? '#eff6ff' : 'transparent',
              color: isActive ? '#6366f1' : '#64748b',
              fontWeight: isActive ? '500' : '300'
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