import React, { useState } from 'react';
import { AlertTriangle, X, Send } from 'lucide-react';

const RejectModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const paymentIssues = [
    'Blurry Screenshot',
    'Missing UTR/Transaction ID',
    'Plan Mismatch'
  ];

  const adDetailIssues = [
    'Fake Photos',
    'Incomplete Address',
    'Irrelevant Content',
    'Inappropriate Language'
  ];

  const handleSend = () => {
    if (!selectedIssue) {
      alert("Please select at least one issue.");
      return;
    }
    onSubmit({ issue: selectedIssue, remarks });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} color="#f59e0b" />
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Request Correction from User</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          
          {/* Payment Issues Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '4px', height: '4px', backgroundColor: '#0ea5e9', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>PAYMENT ISSUES</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {paymentIssues.map((issue) => (
                <div 
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: '8px', cursor: 'pointer', border: selectedIssue === issue ? '1px solid #0ea5e9' : '1px solid transparent', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedIssue === issue ? '4px solid #0ea5e9' : '1px solid #cbd5e1', backgroundColor: '#fff' }}></div>
                  <span style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Detail Issues Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '4px', height: '4px', backgroundColor: '#0ea5e9', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>AD DETAIL ISSUES</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {adDetailIssues.map((issue) => (
                <div 
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: '8px', cursor: 'pointer', border: selectedIssue === issue ? '1px solid #0ea5e9' : '1px solid transparent', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedIssue === issue ? '4px solid #0ea5e9' : '1px solid #cbd5e1', backgroundColor: '#fff', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Remarks Section */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>ADDITIONAL REMARKS (OPTIONAL)</span>
            <textarea 
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Provide specific instructions for the user..."
              style={{ width: '100%', height: '100px', backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px', padding: '16px', fontSize: '14px', color: '#334155', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSend} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '24px', padding: '10px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={16} /> Send Notification
          </button>
        </div>

      </div>
    </div>
  );
};

export default RejectModal;