import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState({
    users: 0,
    properties: 0,
    pending: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-6">Application Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold">{data.users}</p>
        </div>

        {/* Properties */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg text-gray-500">Total Properties</h2>
          <p className="text-2xl font-bold">{data.properties}</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg text-gray-500">Pending Approval</h2>
          <p className="text-2xl font-bold text-red-500">{data.pending}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;