import React, { useState, useEffect } from "react";

import StatsCard from "../dashboard/StatsCard";
import RevenueChart from "../dashboard/RevenueChart";
import GrowthChart from "../dashboard/GrowthChart";
import PaymentsTable from "../dashboard/PaymentsTable";
import BroadcastBox from "../dashboard/BroadcastBox";
import API from "../services/api";

const Dashboard = () => {
  // 1. State for Dynamic Stats (Initial Fallback Data)
  const [stats, setStats] = useState([
    { title: "Total Users", value: "0", badge: "0 Today" },
    { title: "Active Ads", value: "0" },
    { title: "Pending Approvals", value: "0" },
    { title: "Revenue", value: "₹0", badge: "0%" },
  ]);

  // 2. Fetch Data from Backend
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ Exact wahi API hit kar rahe hain jo backend me banayi thi
      const res = await API.get("/dashboard-stats"); 
      
      if (res.data.success) {
        const { users, properties } = res.data.data;
        
        // Backend se aaye asali data ko map kar rahe hain
        setStats([
          { 
            title: "Total Users", 
            value: users.total.toLocaleString('en-IN'), 
            badge: `+${users.joinedToday} Today` // Aaj kitne users join hue
          },
          { 
            title: "Active Ads", 
            value: properties.live.toLocaleString('en-IN') 
          },
          { 
            title: "Pending Approvals", 
            value: properties.pending.toLocaleString('en-IN') 
          },
          { 
            title: "Revenue", 
            value: "₹0", // TODO: Jab Payments module banayenge tab isko real karenge
            badge: "0%" 
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-6 font-sans bg-slate-50">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Overview</h1>
        <p className="m-0 text-[15px] text-slate-500">Monitor real-time platform growth, revenue, and pending tasks.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-2">
          <RevenueChart />
        </div>

        {/* Growth Chart */}
        <div>
          <GrowthChart />
        </div>
      </div>

      {/* Tables & Broadcast */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <PaymentsTable />
        </div>

        <div>
          <BroadcastBox />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;