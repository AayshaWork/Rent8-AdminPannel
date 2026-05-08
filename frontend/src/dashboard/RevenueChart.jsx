import React, { useState, useEffect } from 'react';
// import API from '../services/api'; // Jab API backend me ban jaye tab isko uncomment karna

const RevenueChart = () => {
  // 🚀 1. STATE FOR DATA & API (Abhi dummy data set kiya hai)
  const [data, setData] = useState([
    { month: "Jan", value: 35000 },
    { month: "Feb", value: 38000 },
    { month: "Mar", value: 42000 },
    { month: "Apr", value: 50000 },
    { month: "May", value: 45000 },
    { month: "Jun", value: 60000 },
  ]);
  const [loading, setLoading] = useState(false);

  // 🚀 2. API CALL LOGIC (Abhi comment rakha hai)
  /*
  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/admin/revenue-chart');
      if(res.data.success) {
        setData(res.data.data);
      }
    } catch(error) {
      console.error("Failed to fetch revenue", error);
    } finally {
      setLoading(false);
    }
  };
  */

  // 3. Dynamic Max Value (Taaki sabse bada bar hamesha top tak jaye)
  const max = Math.max(...data.map(d => d.value)) || 1; 

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-slate-900">Revenue Overview</h2>
        <span className="px-2 py-1 text-xs font-semibold text-indigo-600 rounded-md bg-indigo-50">Monthly</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-sm text-slate-400">Loading data...</div>
      ) : (
        // Chart Container (Border hata kar thoda clean kiya)
        <div className="flex items-end h-48 gap-4 pt-4 border-b sm:gap-8 border-slate-100">
          {data.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center flex-1 gap-2 group">
              
              {/* 🖱️ TOOLTIP: Hover karne par upar value dikhegi */}
              <div className="absolute px-2 py-1 mb-2 text-[10px] font-bold text-white transition-opacity duration-200 bg-slate-800 rounded opacity-0 bottom-full group-hover:opacity-100 whitespace-nowrap z-10">
                ₹{item.value.toLocaleString('en-IN')}
              </div>

              {/* 📊 BAR CONTAINER (Bars ko patla karne ke liye max-w-[40px] lagaya) */}
              <div className="relative w-full max-w-[40px] h-[140px] flex items-end justify-center rounded-t-md bg-slate-50 overflow-hidden">
                <div
                  className="w-full transition-all duration-500 bg-indigo-500 rounded-t-md group-hover:bg-indigo-600"
                  style={{
                    height: `${(item.value / max) * 100}%`, // Parent div ka percentage
                  }}
                ></div>
              </div>

              {/* 📅 MONTH LABEL */}
              <span className="text-xs font-medium text-slate-500">
                {item.month}
              </span>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RevenueChart;