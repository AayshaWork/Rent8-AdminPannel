import { useState } from "react";

const GrowthChart = () => {
  const [timeframe, setTimeframe] = useState("Yearly");

  const data = {
    Weekly: 14,
    Monthly: 42,
    Yearly: 78,
  };

  const value = data[timeframe];

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Growth</h2>

        <div className="flex p-1 bg-gray-100 rounded-full">
          {["Weekly", "Monthly", "Yearly"].map((item) => (
            <button
              key={item}
              onClick={() => setTimeframe(item)}
              className={`px-3 py-1 text-xs rounded-full transition
                ${
                  timeframe === item
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Circle */}
      <div className="flex justify-center">
        <div
          className="flex items-center justify-center w-40 h-40 transition-all duration-500 rounded-full"
          style={{
            background: `conic-gradient(#6366f1 ${value}%, #e5e7eb ${value}%)`,
          }}
        >
          <div className="flex flex-col items-center justify-center bg-white rounded-full w-28 h-28">
            <h2 className="text-2xl font-bold">{value}%</h2>
            <p className="text-xs text-gray-500">Growth</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GrowthChart;