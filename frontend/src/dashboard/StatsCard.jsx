const StatsCard = ({ title, value, badge }) => {
  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        {badge && (
          <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;