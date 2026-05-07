import React, { useState, useEffect } from "react";

import StatsCard from "../dashboard/StatsCard";
import RevenueChart from "../dashboard/RevenueChart";
import GrowthChart from "../dashboard/GrowthChart";
import PaymentsTable from "../dashboard/PaymentsTable";
import BroadcastBox from "../dashboard/BroadcastBox";
import API from "../services/api";

const Dashboard = () => {
  // 1. State for Dynamic Stats (Shuru mein 0 ya loading dikhayenge)
  const [stats, setStats] = useState([
    { title: "Revenue", value: "₹0", badge: "0%" },
    { title: "Active Ads", value: "0" },
    { title: "Pending", value: "0" },
    { title: "Reports", value: "0" },
  ]);

  // 2. Fetch Data from Backend
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ⚠️ Note: Yeh route apne backend ke hisaab se change karein
      const res = await API.get("/admin/dashboard-stats"); 
      
      if (res.data.success) {
        const { revenue, activeAds, pending, reports } = res.data.data;
        
        // State update karke naya data set karein
        setStats([
          { title: "Revenue", value: `₹${revenue.toLocaleString('en-IN')}`, badge: "+12%" }, // Badge logic baad me dynamic kar sakte hain
          { title: "Active Ads", value: activeAds.toString() },
          { title: "Pending", value: pending.toString() },
          { title: "Reports", value: reports.toString() },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <div className="space-y-6">
      
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