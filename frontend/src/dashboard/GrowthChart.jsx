import React, { useState, useEffect } from "react";
// import API from "../services/api"; // Jab API banegi tab uncomment karein

const GrowthChart = () => {
  const [timeframe, setTimeframe] = useState("Yearly");

  // 🚀 1. STATE FOR DATA & API
  const [data, setData] = useState({
    Weekly: 14,
    Monthly: 42,
    Yearly: 78,
  });

  // 🚀 2. API CALL LOGIC (Abhi comment rakha hai)
  /*
  useEffect(() => {
    fetchGrowthData();
  }, []);

  const fetchGrowthData = async () => {
    try {
      const res = await API.get('/api/admin/growth-stats');
      if(res.data.success) {
        setData(res.data.data); // API ko is format me data return karna hoga
      }
    } catch(error) {
      console.error("Failed to fetch growth", error);
    }
  };
  */

  const value = data[timeframe] || 0;

  // 🎨 SVG Circle Math (For Smooth Animation & Rounded Edges)
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-base font-bold text-slate-900">User Growth</h2>
          <p className="text-[13px] text-slate-500 font-medium">Conversion rate</p>
        </div>

        {/* Custom Toggle Switch */}
        <div className="flex p-1 rounded-lg bg-slate-100">
          {["Weekly", "Monthly", "Yearly"].map((item) => (
            <button
              key={item}
              onClick={() => setTimeframe(item)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-md transition-all duration-200
                ${
                  timeframe === item
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 🟢 Circular SVG Chart */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-40 h-40">
          
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Circle (Light Gray) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle (Indigo) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" // Ise kinare gol hote hain
              className="text-indigo-500 transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <h2 className="text-3xl font-extrabold text-slate-900">{value}%</h2>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">Growth</p>
          </div>
          
        </div>

        {/* Footer Info */}
        <p className="mt-6 text-[13px] text-center text-slate-500 font-medium px-4">
          Based on new user registrations vs the previous {timeframe.toLowerCase()} period.
        </p>
      </div>

    </div>
  );
};

export default GrowthChart;