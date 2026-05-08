import React, { useState, useEffect } from "react";
import { ArrowRight, FileText } from "lucide-react";
// import API from "../services/api"; // Jab Payment API ban jaye tab isko uncomment karna

const PaymentsTable = () => {
  // 🚀 1. STATE FOR DATA & API
  const [payments, setPayments] = useState([
    {
      id: "TXN001",
      name: "Rahul Sharma",
      ad: "3BHK Koregaon Park",
      plan: "Double Plan",
      amount: 289,
      date: "05 May 2026",
      time: "10:30 AM",
    },
    {
      id: "TXN002",
      name: "Priya Desai",
      ad: "Studio Apartment Baner",
      plan: "Standard",
      amount: 200,
      date: "05 May 2026",
      time: "11:15 AM",
    },
    {
      id: "TXN003",
      name: "Karan Verma",
      ad: "Luxury Villa Wakad",
      plan: "Double Plan",
      amount: 289,
      date: "04 May 2026",
      time: "12:05 PM",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // 🚀 2. API CALL LOGIC (Abhi comment rakha hai)
  /*
  useEffect(() => {
    fetchRecentPayments();
  }, []);

  const fetchRecentPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/admin/recent-payments');
      if(res.data.success) {
        setPayments(res.data.data);
      }
    } catch(error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent Payments</h2>
          <p className="text-[13px] text-slate-500 font-medium">Latest transactions from property listers</p>
        </div>

        <button className="flex items-center gap-1 text-[13px] font-bold transition-colors text-indigo-600 hover:text-indigo-800">
          View All <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32 text-sm font-medium text-slate-400">
          Loading transactions...
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            
            {/* Table Header */}
            <div className="grid grid-cols-5 pb-3 text-[11px] font-bold tracking-wide text-slate-400 uppercase border-b border-slate-100">
              <span className="pl-2">User Details</span>
              <span>Property Ad</span>
              <span>Plan & Amount</span>
              <span>Date & Time</span>
              <span className="pr-2 text-right">Action</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {payments.map((item) => (
                <div 
                  key={item.id} 
                  className="grid items-center grid-cols-5 py-3.5 text-sm transition-colors rounded-lg hover:bg-slate-50"
                >
                  
                  {/* User Column */}
                  <div className="flex flex-col pl-2">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-xs font-medium text-slate-400">{item.id}</span>
                  </div>

                  {/* Ad Column */}
                  <div className="pr-4 font-medium truncate text-slate-600">
                    {item.ad}
                  </div>

                  {/* Plan & Amount Column */}
                  <div className="flex flex-col items-start gap-1">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-md ${
                      item.plan === "Double Plan" 
                        ? "bg-indigo-100 text-indigo-700" 
                        : "bg-sky-100 text-sky-700"
                    }`}>
                      {item.plan}
                    </span>
                    <div className="text-[13px] font-extrabold text-slate-900">
                      ₹{item.amount}
                    </div>
                  </div>

                  {/* Date & Time Column */}
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-600">{item.date}</span>
                    <span className="text-xs font-medium text-slate-400">{item.time}</span>
                  </div>

                  {/* Action Column */}
                  <div className="pr-2 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors border rounded-lg text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                      <FileText size={14} /> View
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentsTable;