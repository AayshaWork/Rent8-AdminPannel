import React, { useState, useEffect } from 'react';
import { Filter, MapPin, Eye, Trash2, Home } from 'lucide-react';
import API from '../services/api';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 FETCH ALL PROPERTIES (Bina kisi status filter ke)
  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      // Dhyan de: Yahan '?status=pending' HATA diya hai, toh backend sab kuch dega!
      const res = await API.get('/admin/properties');
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching all properties:", error);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  // Status Badge ke liye colors (UI ko sundar banane ke liye)
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return <span className="px-3 py-1 text-xs font-bold rounded-full text-emerald-700 bg-emerald-100">🟢 LIVE</span>;
      case 'pending':
        return <span className="px-3 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-full">⏳ PENDING</span>;
      case 'expired':
        return <span className="px-3 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">🔴 EXPIRED</span>;
      case 'rejected':
        return <span className="px-3 py-1 text-xs font-bold rounded-full text-slate-700 bg-slate-200">🚫 REJECTED</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">All Properties</h1>
          <p className="max-w-2xl m-0 leading-relaxed text-slate-500 text-[15px]">
            Master list of all properties uploaded on Rent8 (Live, Pending, Expired, and Rejected).
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold shadow-sm text-sm">
           <Home size={18} className="text-indigo-500"/> Total: {properties.length}
        </div>
      </div>

      {/* MAIN TABLE CARD */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50 border-slate-200">
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">PROPERTY DETAILS</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">OWNER</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">RENT & DEPOSIT</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">STATUS</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-center text-slate-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500">Loading all properties...</td>
              </tr>
            ) : properties.length > 0 ? properties.map((row) => (
              <tr key={row._id} className="transition-colors border-b border-slate-200 hover:bg-slate-50">
                
                {/* Property Details */}
                <td className="flex items-center gap-4 px-6 py-5">
                  <div className="flex items-center justify-center w-16 h-12 rounded-lg bg-slate-200">
                    {row.images && row.images[0] ? (
                       <img src={row.images[0]} alt="Prop" className="block object-cover w-full h-full rounded-lg" />
                    ) : (
                       <div className="w-8 h-5 border-2 rounded border-white/50"></div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-bold text-slate-900">{row.title}</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <MapPin size={12} /> {row.full_address?.substring(0, 30)}...
                    </div>
                  </div>
                </td>

                {/* Owner */}
                <td className="px-6 py-5">
                  <div className="mb-1 text-sm font-bold text-slate-900">{row.owner_id?.name || 'Unknown User'}</div>
                  <div className="text-xs font-medium text-slate-500">{row.owner_id?.phone || 'N/A'}</div>
                </td>

                {/* Rent & Deposit */}
                <td className="px-6 py-5">
                  <div className="text-sm font-bold text-slate-900">₹{row.rent} / month</div>
                  <div className="text-xs font-medium text-slate-500">Dep: ₹{row.deposit}</div>
                </td>

                {/* STATUS BADGE */}
                <td className="px-6 py-5">
                  {getStatusBadge(row.status)}
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-center">
                  <button className="p-2 text-indigo-600 transition-colors rounded-md hover:bg-indigo-50" title="View Property">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-red-500 transition-colors rounded-md hover:bg-red-50" title="Delete Property">
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-10 text-sm text-center text-slate-500">
                  No properties found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProperties;