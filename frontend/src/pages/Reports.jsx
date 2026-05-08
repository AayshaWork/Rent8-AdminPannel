import React, { useState } from 'react';
import { Search, MessageSquare, Clock, AlertCircle, Trash2, Eye, ShieldCheck } from 'lucide-react';
// import API from '../services/api'; // Future API ke liye

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
    { id: 1, initials1: 'JD', initials2: 'SM', name: 'John Doe vs. Steve', adId: '#AD-9821', time: '2m ago', snippet: '"The images don\'t match the actual unit..."', isHighPriority: true },
    { id: 2, initials1: 'AK', initials2: 'PT', name: 'Anna K. vs. Property...', adId: '#AD-4412', time: '45m ago', snippet: '"Is the voice note playing for you?"', isHighPriority: false },
  ];

  // 🚀 HELPER FUNCTION: BADGE COLORS
  const getBadgeStyle = (type) => {
    switch(type) {
      case 'danger': return 'bg-red-100 text-red-600';
      case 'warning': return 'bg-amber-100 text-amber-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Reports & Safety</h1>
          <p className="m-0 text-[15px] text-slate-500">Manage flagged properties and review user disputes.</p>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <Clock size={14} /> Last update: Just now
        </div>
      </div>

      {/* ========================================= */}
      {/* 1. FLAGGED ADVERTISEMENTS SECTION */}
      {/* ========================================= */}
      <div className="mb-10">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Flagged Advertisements</h2>
          <p className="text-[13px] text-slate-500">Action required on these community reports.</p>
        </div>
        
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="border-b bg-slate-50 border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-500 uppercase">AD ID</th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-500 uppercase">PROPERTY TITLE</th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-500 uppercase">REASON</th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-slate-500 uppercase">REPORTED BY</th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-wide text-center text-slate-500 uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flaggedAds.map((ad, index) => (
                <tr key={index} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 text-[13px] font-bold text-slate-500">{ad.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{ad.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getBadgeStyle(ad.reasonType)}`}>
                      {ad.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{ad.reportedBy}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3 text-[13px] font-semibold">
                      <button className="flex items-center gap-1 transition-colors text-sky-600 hover:text-sky-800">
                        <Eye size={14} /> View
                      </button>
                      <span className="text-slate-300">|</span>
                      <button className="flex items-center gap-1 transition-colors text-emerald-600 hover:text-emerald-800">
                        <ShieldCheck size={14} /> Ignore
                      </button>
                      <span className="text-slate-300">|</span>
                      <button className="flex items-center gap-1 text-red-500 transition-colors hover:text-red-700">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
            <span className="text-[13px] font-medium text-slate-500">Showing {flaggedAds.length} flagged ads</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. CHAT & VOICE LOGS SECTION */}
      {/* ========================================= */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Chat & Voice Logs</h2>
            <p className="text-[13px] text-slate-500 m-0">Review recent communications for dispute resolution.</p>
          </div>
          
          {/* Search Conversations */}
          <div className="relative w-64">
            <Search className="absolute -translate-y-1/2 text-slate-400 left-3 top-1/2" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full py-2 pl-9 pr-4 text-[13px] bg-white border border-slate-200 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
          </div>
        </div>

        {/* TWO-PANE LAYOUT */}
        <div className="flex gap-6 h-[400px]">
          
          {/* LEFT: Conversation List */}
          <div className="flex flex-col flex-1 gap-3 pr-2 overflow-y-auto custom-scrollbar">
            {chatLogs.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedChat === chat.id 
                    ? 'bg-sky-50 border-sky-500 border shadow-[0_0_0_1px_#0ea5e9]' 
                    : 'bg-white border-slate-200 border hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Overlapping Avatars */}
                    <div className="flex -space-x-2">
                      <div className="flex items-center justify-center w-7 h-7 text-[10px] font-bold bg-slate-200 text-slate-600 rounded-full border-2 border-white z-10">{chat.initials1}</div>
                      <div className="flex items-center justify-center w-7 h-7 text-[10px] font-bold bg-slate-300 text-slate-700 rounded-full border-2 border-white">{chat.initials2}</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{chat.name}</div>
                      <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Ad: {chat.adId}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">{chat.time}</div>
                </div>
                
                <p className="text-[13px] text-slate-600 italic mb-3 line-clamp-1">{chat.snippet}</p>
                
                {chat.isHighPriority && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> High Priority
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Empty State / Detail View */}
          <div className="flex-[2] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-400">
            {selectedChat ? (
              <div className="text-center duration-200 animate-in fade-in zoom-in-95">
                <MessageSquare size={36} className="mx-auto mb-3 text-sky-500 opacity-80" />
                <div className="text-base font-bold text-slate-900">Chat loaded</div>
                <div className="text-[13px] text-slate-500 mt-1">Reviewing conversation history...</div>
              </div>
            ) : (
              <div className="text-center">
                <MessageSquare size={36} className="mx-auto mb-3 opacity-40" />
                <div className="text-sm font-semibold text-slate-600">Select a conversation</div>
                <div className="mt-1 text-xs text-slate-400">Click on a chat log to review details</div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Reports;