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
    onSubmit({ reason: selectedIssue, remarks }); // Backend ke liye key 'reason' rakhi hai
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col w-full max-w-[600px] max-h-[90vh] bg-white shadow-2xl rounded-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={20} className="text-amber-500" />
            <h2 className="m-0 text-lg font-semibold text-slate-900">Request Correction from User</h2>
          </div>
          <button 
            onClick={onClose} 
            className="transition-colors text-slate-500 hover:text-slate-800 hover:bg-slate-100 p-1.5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto">
          
          {/* Payment Issues Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-sky-500"></div>
              <span className="text-[11px] font-bold tracking-wide text-slate-500">PAYMENT ISSUES</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {paymentIssues.map((issue) => (
                <div 
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`flex items-center gap-3 px-4 py-3.5 transition-all border rounded-lg cursor-pointer bg-slate-50 hover:bg-sky-50 ${
                    selectedIssue === issue ? 'border-sky-500' : 'border-transparent'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white flex-shrink-0 ${
                    selectedIssue === issue ? 'border-4 border-sky-500' : 'border border-slate-300'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Detail Issues Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-sky-500"></div>
              <span className="text-[11px] font-bold tracking-wide text-slate-500">AD DETAIL ISSUES</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {adDetailIssues.map((issue) => (
                <div 
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`flex items-center gap-3 px-4 py-3.5 transition-all border rounded-lg cursor-pointer bg-slate-50 hover:bg-sky-50 ${
                    selectedIssue === issue ? 'border-sky-500' : 'border-transparent'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white flex-shrink-0 ${
                    selectedIssue === issue ? 'border-4 border-sky-500' : 'border border-slate-300'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Remarks Section */}
          <div>
            <span className="block mb-2 text-[11px] font-bold tracking-wide text-slate-500">
              ADDITIONAL REMARKS (OPTIONAL)
            </span>
            <textarea 
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Provide specific instructions for the user..."
              className="w-full h-[100px] p-4 text-sm resize-none rounded-lg bg-slate-50 text-slate-700 border border-transparent focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-5 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
          <button 
            onClick={onClose} 
            className="text-sm font-semibold transition-colors text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>
          <button 
            onClick={handleSend} 
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors rounded-full bg-sky-600 hover:bg-sky-700 shadow-sm"
          >
            <Send size={16} /> Send Notification
          </button>
        </div>

      </div>
    </div>
  );
};

export default RejectModal;