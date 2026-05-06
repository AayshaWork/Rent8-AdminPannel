import React, { useState } from 'react';
import { Search, Send, CheckCircle, Clock } from 'lucide-react';

const Support = () => {
  // 🚀 TICKET DATA KO STATE MEIN DAAL DIYA TAAKI UPDATE HO SAKE
  const [tickets, setTickets] = useState([
    { id: 1, ticketNo: '#TKT-1024', user: 'Rahul Sharma', issueType: 'Payment Issue', date: '2 hours ago', status: 'OPEN', details: 'Hello, my payment of ₹200 was deducted via UPI, but my ad is not live.' },
    { id: 2, ticketNo: '#TKT-1025', user: 'Snehal Patil', issueType: 'App Bug', date: '5 hours ago', status: 'OPEN', details: 'The map location picker is not working properly.' },
    { id: 3, ticketNo: '#TKT-1020', user: 'Amit Verma', issueType: 'Profile Update', date: '1 day ago', status: 'CLOSED', details: 'I want to change my registered mobile number.' },
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [replyText, setReplyText] = useState('');

  // 🚀 STATUS CLOSE KARNE KI LOGIC
  const handleResolve = () => {
    if (!replyText.trim()) {
      alert("Bhai, pehle reply toh likh do!");
      return;
    }

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicketId) {
        return { ...t, status: 'CLOSED' }; // Status change ho gaya
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyText(''); // Text box clear kar diya
    alert("Ticket Resolved! User ko notification bhej diya gaya hai.");
  };

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Support Tickets</h1>
        <p style={{ color: '#64748b' }}>Resolve user queries and manage app support requests.</p>
      </div>

      <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 220px)' }}>
        
        {/* LEFT: TICKET LIST */}
        <div style={{ flex: '1', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
              <input type="text" placeholder="Search ticket..." style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
          </div>
          <div style={{ overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tickets.map(ticket => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicketId(ticket.id)}
                style={{ 
                  padding: '16px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s',
                  backgroundColor: selectedTicketId === ticket.id ? '#eff6ff' : '#fff',
                  border: selectedTicketId === ticket.id ? '1px solid #3b82f6' : '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6' }}>{ticket.ticketNo}</span>
                  <span style={{ 
                    fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '20px', 
                    backgroundColor: ticket.status === 'OPEN' ? '#fef3c7' : '#dcfce7', 
                    color: ticket.status === 'OPEN' ? '#b45309' : '#15803d' 
                  }}>
                    {ticket.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{ticket.issueType}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{ticket.user} • {ticket.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: TICKET DETAILS & ACTIONS */}
        <div style={{ flex: '2', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          {activeTicket ? (
            <>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>{activeTicket.issueType}</h2>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>User: {activeTicket.user} | ID: {activeTicket.ticketNo}</p>
              </div>

              <div style={{ padding: '24px', flex: 1, backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Issue Description</div>
                <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', lineHeight: '1.6', color: '#334155' }}>
                  "{activeTicket.details}"
                </div>
              </div>

              {activeTicket.status === 'OPEN' ? (
                <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0' }}>
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Bhai, yahan solution likho..." 
                    style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', outline: 'none', resize: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handleResolve}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', 
                        borderRadius: '8px', backgroundColor: '#0ea5e9', color: '#fff', 
                        border: 'none', fontWeight: 'bold', cursor: 'pointer' 
                      }}
                    >
                      <Send size={16} /> Resolve & Close Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '32px', textAlign: 'center', color: '#16a34a', fontWeight: '700', backgroundColor: '#f0fdf4', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <CheckCircle size={24} style={{ marginBottom: '8px' }} />
                  <div>This ticket has been resolved.</div>
                </div>
              )}
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Select a ticket to respond</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;