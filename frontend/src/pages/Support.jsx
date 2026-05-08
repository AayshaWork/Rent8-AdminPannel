import React, { useState } from 'react';
import { Search, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Support = () => {
  // 🚀 TICKET DATA
  const [tickets, setTickets] = useState([
    { id: 1, ticketNo: '#TKT-1024', user: 'Rahul Sharma', issueType: 'Payment Issue', date: '2 hours ago', status: 'OPEN', details: 'Hello, my payment of ₹200 was deducted via UPI, but my ad is not live.' },
    { id: 2, ticketNo: '#TKT-1025', user: 'Snehal Patil', issueType: 'App Bug', date: '5 hours ago', status: 'OPEN', details: 'The map location picker is not working properly when I try to add my property address.' },
    { id: 3, ticketNo: '#TKT-1020', user: 'Amit Verma', issueType: 'Profile Update', date: '1 day ago', status: 'CLOSED', details: 'I want to change my registered mobile number. Please guide me.' },
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [replyText, setReplyText] = useState('');

  // 🚀 STATUS CLOSE LOGIC
  const handleResolve = () => {
    if (!replyText.trim()) {
      alert("Please enter a reply message before resolving the ticket.");
      return;
    }

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicketId) {
        return { ...t, status: 'CLOSED' };
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyText('');
    // TODO: Yahan backend API call aayegi user ko email bhejne ke liye
    // alert("Ticket Resolved! User notified.");
  };

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Support Tickets</h1>
          <p className="m-0 text-[15px] text-slate-500">Resolve user queries and manage app support requests.</p>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-180px)] min-h-[500px]">
        
        {/* LEFT: TICKET LIST */}
        <div className="flex flex-col flex-1 bg-white border shadow-sm rounded-xl border-slate-200">
          
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute -translate-y-1/2 text-slate-400 left-3 top-1/2" size={16} />
              <input 
                type="text" 
                placeholder="Search ticket number or user..." 
                className="w-full py-2.5 pl-9 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-sky-500 focus:bg-white transition-colors" 
              />
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col flex-1 p-3 overflow-y-auto custom-scrollbar gap-1.5">
            {tickets.map(ticket => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedTicketId === ticket.id 
                    ? 'bg-sky-50 border-sky-500 shadow-[0_0_0_1px_#0ea5e9]' 
                    : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-sky-600">{ticket.ticketNo}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                    ticket.status === 'OPEN' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">{ticket.issueType}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <span className="font-medium">{ticket.user}</span>
                  <span>•</span>
                  <span>{ticket.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: TICKET DETAILS & ACTIONS */}
        <div className="flex flex-col flex-[2] bg-white border shadow-sm rounded-xl border-slate-200 overflow-hidden">
          {activeTicket ? (
            <>
              {/* Details Header */}
              <div className="p-6 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="m-0 text-xl font-bold text-slate-900">{activeTicket.issueType}</h2>
                  {activeTicket.status === 'OPEN' && <AlertCircle size={18} className="text-amber-500" />}
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span>User: <span className="text-slate-700">{activeTicket.user}</span></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Ticket ID: {activeTicket.ticketNo}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                <div className="mb-2 text-[11px] font-bold tracking-wide text-slate-400 uppercase">Issue Description</div>
                <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200 text-slate-700 leading-relaxed text-[15px]">
                  "{activeTicket.details}"
                </div>
              </div>

              {/* Reply Box or Success Message */}
              {activeTicket.status === 'OPEN' ? (
                <div className="p-6 bg-white border-t border-slate-200">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your solution or reply here..." 
                    className="w-full h-24 p-4 mb-4 text-sm transition-colors border resize-none rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleResolve}
                      className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-colors rounded-lg shadow-sm bg-sky-600 hover:bg-sky-700"
                    >
                      <Send size={16} /> Resolve & Close Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border-t bg-emerald-50 border-emerald-100">
                  <CheckCircle size={32} className="mb-2 text-emerald-500" />
                  <div className="text-base font-bold text-emerald-800">This ticket has been resolved</div>
                  <div className="mt-1 text-sm font-medium text-emerald-600">Notification sent to user</div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-slate-400">
              Select a ticket to review and respond
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Support;