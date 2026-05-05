import React, { useState } from 'react';

const Settings = () => {
  // Ye states aage chalkar Node.js API se connect hongi
  const [basicPrice, setBasicPrice] = useState('200');
  const [premiumPrice, setPremiumPrice] = useState('289');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '8px' }}>Admin Settings</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Global app configuration & management dashboard</p>

      {/* 1. Scanner Management (QR Code) */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#0f172a' }}>
          <span>📷</span> Scanner Management
        </h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {/* Fake QR Image Box */}
          <div style={{ width: '150px', height: '150px', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
             <span style={{ fontSize: '40px' }}>🔳</span>
             <span style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>CURRENT ACTIVE QR</span>
          </div>
          <div>
            <h4 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '8px' }}>Active QR Scanner</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
              The current QR code is used for all active check-ins across the platform. Updating this will invalidate the previous code immediately.
            </p>
            <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↑ Upload New QR
            </button>
          </div>
        </div>
      </div>

      {/* 2. Subscription Prices */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#0f172a' }}>
          <span>💸</span> Subscription Prices
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Updating these values will change the pricing shown to users in the app store real-time.</p>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Basic Plan Price (Plan 1)</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              <span style={{ padding: '10px 16px', backgroundColor: '#f8fafc', color: '#64748b', borderRight: '1px solid #e2e8f0' }}>₹</span>
              <input 
                type="number" 
                value={basicPrice} 
                onChange={(e) => setBasicPrice(e.target.value)}
                style={{ width: '100%', padding: '10px', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600' }} 
              />
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Visible to: All free tier users</span>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Premium Plan Price (Plan 2)</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              <span style={{ padding: '10px 16px', backgroundColor: '#f8fafc', color: '#64748b', borderRight: '1px solid #e2e8f0' }}>₹</span>
              <input 
                type="number" 
                value={premiumPrice} 
                onChange={(e) => setPremiumPrice(e.target.value)}
                style={{ width: '100%', padding: '10px', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600' }} 
              />
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Visible to: All users</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <button style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            Update Pricing
          </button>
        </div>
      </div>

      {/* 3. Broadcast Center */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#0f172a' }}>
          <span>📢</span> Broadcast Center
        </h3>
        
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Global Push Notification Message</label>
        <textarea 
          placeholder="Enter your message here to reach all users instantly..."
          value={broadcastMsg}
          onChange={(e) => setBroadcastMsg(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', resize: 'none', outline: 'none', fontSize: '14px', marginBottom: '16px' }}
        ></textarea>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#d97706', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚠️</span> This will send to 12,480 active users
          </div>
          <button style={{ backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            ➤ Send Push Notification to All Users
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;