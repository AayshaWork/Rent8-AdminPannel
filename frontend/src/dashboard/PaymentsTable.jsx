const PaymentsTable = () => {
  const data = [
    {
      name: "Rahul Sharma",
      ad: "3BHK Koregaon Park",
      plan: "Double",
      amount: "₹289",
      date: "05 May",
      time: "10:30 AM",
    },
    {
      name: "Priya Desai",
      ad: "Studio Baner",
      plan: "Standard",
      amount: "₹200",
      date: "05 May",
      time: "11:15 AM",
    },
    {
      name: "Karan Verma",
      ad: "Villa Wakad",
      plan: "Double",
      amount: "₹289",
      date: "04 May",
      time: "12:05 PM",
    },
  ];

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Recent Payments
        </h2>

        <button className="text-sm font-medium text-indigo-600">
          View All →
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 pb-3 text-xs font-semibold text-gray-500 border-b">
        <span>User</span>
        <span>Ad</span>
        <span>Plan</span>
        <span>Time</span>
        <span className="text-right">Action</span>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {data.map((item, i) => (
          <div key={i} className="grid items-center grid-cols-5 py-4 text-sm">
            
            <span className="font-medium">{item.name}</span>

            <span className="text-gray-500">
              {item.ad}
            </span>

            <span>
              <span className="px-2 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full">
                {item.plan}
              </span>
              <div className="font-semibold">
                {item.amount}
              </div>
            </span>

            <span className="text-gray-500">
              {item.date} <br />
              <span className="text-xs">{item.time}</span>
            </span>

            <div className="text-right">
              <button className="px-3 py-1 text-xs text-indigo-600 border rounded-lg hover:bg-indigo-50">
                View
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default PaymentsTable;