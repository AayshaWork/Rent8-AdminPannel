import React, { useState } from 'react';
import { Search, MessageSquare, Clock } from 'lucide-react';

const Reports = () => {
  // 🚀 STATE FOR CHAT SELECTION
  const [selectedChat, setSelectedChat] = useState(null);

  // 🚀 DUMMY DATA: FLAGGED ADS
  const flaggedAds = [
    { id: '#AD-9821', title: 'Luxury Penthouse in Downtown', reason: 'Fake Images', reportedBy: 'John Doe (USR-221)', reasonType: 'danger' },
    { id: '#AD-4412', title: 'Cozy Suburban Villa', reason: 'Incorrect Price', reportedBy: 'Sarah Smith (USR-890)', reasonType: 'warning' },
    { id: '#AD-1055', title: 'Commercial Plot - Sector 5', reason: 'Offensive Content', reportedBy: 'Mike Ross (USR-432)', reasonType: 'purple' },
  ];

  // 🚀 DUMMY DATA: CHAT LOGS
  const chatLogs = [
    { id: 1, initials1: 'JD', initials2: 'SM', name: 'John Doe vs. Steve ...', adId: '#AD-9821', time: '2m ago', snippet: '"The images don\'t match the actual unit..."', isHighPriority: true },
    { id: 2, initials1: 'AK', initials2: 'PT', name: 'Anna K. vs. Propert...', adId: '#AD-4412', time: '45m ago', snippet: '"Is the voice note playing for you?"', isHighPriority: false },
  ];

  // 🚀 HELPER FUNCTION: BADGE COLORS
  const getBadgeStyle = (type) => {
    switch(type) {
      case 'danger': return { bg: '#fee2e2', text: '#ef4444' }; // Light Red
      case 'warning': return { bg: '#fef3c7', text: '#f59e0b' }; // Light Yellow/Orange
      case 'purple': return { bg: '#f3e8ff', text: '#a855f7' }; // Light Purple
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Reports & Support (Safety)</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Manage properties reported by community members and review disputes.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
          <Clock size={14} /> Last update: 5 mins ago
        </div>
      </div>

      {/* ========================================= */}
      {/* 1. FLAGGED ADVERTISEMENTS SECTION */}
      {/* ========================================= */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Flagged Advertisements</h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Manage properties reported by community members.</p>
        
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>AD ID</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>PROPERTY TITLE</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>REASON</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>REPORTED BY</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {flaggedAds.map((ad, index) => {
                const badgeStyle = getBadgeStyle(ad.reasonType);
                return (
                  <tr key={index} style={{ borderBottom: index === flaggedAds.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{ad.id}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>{ad.title}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text, padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                        {ad.reason}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{ad.reportedBy}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: '600' }}>
                        <button style={{ background: 'none', border: 'none', color: '#0ea5e9', cursor: 'pointer', padding: 0 }}>View Ad</button>
                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Ignore</button>
                        <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Showing 3 of 24 flagged ads</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Previous</button>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. CHAT & VOICE LOGS SECTION */}
      {/* ========================================= */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Chat & Voice Logs</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Review recent communications for dispute resolution.</p>
          </div>
          
          {/* Search Conversations */}
          <div style={{ position: 'relative', width: '250px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* TWO-PANE LAYOUT */}
        <div style={{ display: 'flex', gap: '24px', height: '350px' }}>
          
          {/* LEFT: Conversation List */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            {chatLogs.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                style={{ 
                  backgroundColor: '#fff', padding: '16px', borderRadius: '12px', 
                  border: selectedChat === chat.id ? '1px solid #0ea5e9' : '1px solid #e2e8f0', 
                  boxShadow: selectedChat === chat.id ? '0 0 0 1px #0ea5e9' : '0 2px 4px rgba(0,0,0,0.02)',
                  cursor: 'pointer', transition: 'all 0.2s' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', marginRight: '4px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#475569', zIndex: 2 }}>{chat.initials1}</div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#475569', marginLeft: '-8px', zIndex: 1 }}>{chat.initials2}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{chat.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Ad: {chat.adId}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{chat.time}</div>
                </div>
                
                <p style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic', margin: '0 0 12px 0' }}>{chat.snippet}</p>
                
                {chat.isHighPriority && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span> High Priority
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Empty State / Detail View */}
          <div style={{ flex: '2', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            {selectedChat ? (
              <div style={{ textAlign: 'center' }}>
                <MessageSquare size={32} color="#0ea5e9" style={{ marginBottom: '12px', opacity: 0.8 }} />
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>Chat logic will load here</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Loading conversation history for Review...</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <MessageSquare size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <div style={{ fontSize: '14px', fontWeight: '500' }}>Select a conversation to review details</div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Reports;