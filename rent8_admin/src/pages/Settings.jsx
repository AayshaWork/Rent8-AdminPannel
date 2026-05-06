import React, { useState, useRef } from 'react';
import { QrCode, Settings as SettingsIcon, Upload, Calendar, ChevronDown } from 'lucide-react';

const Settings = () => {
  // 🚀 STATES FOR PRICING & DURATIONS
  const [standardDays, setStandardDays] = useState(8);
  const [standardPrice, setStandardPrice] = useState(200);
  
  const [premiumDays, setPremiumDays] = useState(16);
  const [premiumPrice, setPremiumPrice] = useState(289);

  // 🚀 IMAGE UPLOAD LOGIC
  const fileInputRef = useRef(null);
  const [qrImage, setQrImage] = useState("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rent8@upi&pn=Rent8");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Local file ko URL mein convert kar rahe hain preview dikhane ke liye
      const imageUrl = URL.createObjectURL(file);
      setQrImage(imageUrl);
    }
  };

  const handleReplaceClick = () => {
    // Button click hone par hidden input ko trigger karenge
    fileInputRef.current.click();
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>App Settings & Control</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Manage critical application assets and global system parameters.</p>
      </div>

      {/* MAIN CARDS CONTAINER */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* ========================================= */}
        {/* 1. PAYMENT QR CODE CARD (LEFT SIDE) */}
        {/* ========================================= */}
        <div style={{ flex: '1', minWidth: '350px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <QrCode size={20} color="#0ea5e9" />
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Payment QR Code</h2>
          </div>

          {/* QR Code Image Box */}
          <div style={{ width: '220px', height: '220px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', padding: '16px' }}>
            <img src={qrImage} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Current active QR for PhonePe/GPay</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Last updated: May 05, 2026</div>
          </div>

          {/* 🚀 HIDDEN FILE INPUT */}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
          />

          {/* Action Buttons */}
          <button 
            onClick={handleReplaceClick} 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '14px', marginBottom: '12px', transition: 'all 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
          >
            <Upload size={16} /> Replace Image
          </button>
          
          <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#0ea5e9', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)' }}>
            Save New QR
          </button>

        </div>

        {/* ========================================= */}
        {/* 2. SYSTEM CONFIGURATION CARD (RIGHT SIDE) */}
        {/* ========================================= */}
        <div style={{ flex: '1.5', minWidth: '400px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <SettingsIcon size={20} color="#0ea5e9" />
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>System Configuration</h2>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>Default Plans & Pricing</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Configure the rental cycle duration and price available to customers.</div>
          </div>

          {/* STANDARD PLAN EDIT ROW */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} color="#64748b" />
              <span style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>Standard Plan</span>
            </div>
            
            {/* Days & Price Inputs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" value={standardDays} onChange={(e) => setStandardDays(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', outline: 'none', fontSize: '14px', fontWeight: '600', color: '#0f172a' }} />
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Days</span>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>₹</span>
                <input type="number" value={standardPrice} onChange={(e) => setStandardPrice(e.target.value)} style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', outline: 'none', fontSize: '14px', fontWeight: '600', color: '#0f172a' }} />
              </div>
            </div>
          </div>

          {/* DOUBLE PLAN EDIT ROW */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} color="#64748b" />
              <span style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>Double Plan</span>
            </div>
            
            {/* Days & Price Inputs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" value={premiumDays} onChange={(e) => setPremiumDays(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', outline: 'none', fontSize: '14px', fontWeight: '600', color: '#0f172a' }} />
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Days</span>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>₹</span>
                <input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', outline: 'none', fontSize: '14px', fontWeight: '600', color: '#0f172a' }} />
              </div>
            </div>
          </div>

          {/* CURRENCY SETTINGS */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Currency Settings</div>
            <div style={{ position: 'relative' }}>
              <select style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '14px', color: '#0f172a', fontWeight: '500', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                <option value="INR">INR (₹) - Indian Rupee</option>
              </select>
              <ChevronDown size={18} color="#64748b" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#0ea5e9', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)' }}>
            Update Parameters
          </button>

        </div>

      </div>
    </div>
  );
};

export default Settings;