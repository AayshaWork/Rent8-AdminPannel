const RevenueChart = () => {
  const data = [
    { month: "Jan", value: 35000 },
    { month: "Feb", value: 38000 },
    { month: "Mar", value: 42000 },
    { month: "Apr", value: 50000 },
    { month: "May", value: 45000 },
    { month: "Jun", value: 60000 },
  ];

  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      
      <h2 className="mb-4 text-lg font-semibold">Revenue Overview</h2>

     <div className="flex items-end h-48 gap-4 p-4 border">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center w-full gap-2">
            
         <div
  className="w-full transition-all duration-300 bg-indigo-500 rounded-md"
  style={{
    height: `${(item.value / max) * 140}px`,
  }}
></div>

            <span className="text-xs text-gray-500">
              {item.month}
            </span>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RevenueChart;