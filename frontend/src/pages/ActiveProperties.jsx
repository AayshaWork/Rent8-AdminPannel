import React, { useState, useEffect } from 'react';
import { MapPin, Edit2, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import API from '../services/api';

const ActiveProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPlan, setFilterPlan] = useState(''); 
  const [filterStatus, setFilterStatus] = useState(''); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  useEffect(() => {
    fetchLiveProperties();
  }, []);

  const fetchLiveProperties = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/admin/properties?status=live');
      
      if (res.data.success && res.data.data) {
        const formattedData = res.data.data.map(prop => ({
          id: prop._id || 'N/A',
          title: prop.title || 'Untitled Property',
          location: prop.full_address || 'Address not provided',
          planType: 'Standard', 
          planAmount: '₹200.00',
          owner: prop.owner_id?.name || 'Unknown User',
          contact: prop.owner_id?.phone || 'N/A',
          daysLeft: Math.floor(Math.random() * 30), 
          totalDays: 30,
          status: 'LIVE', 
          img: prop.images && prop.images.length > 0 ? prop.images[0] : 'https://placehold.co/100x100?text=No+Image'
        }));

        setProperties(formattedData);
      }
    } catch (error) {
      console.error("Error fetching live properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => {
    const matchesPlan = filterPlan === '' || p.planType === filterPlan;
    
    let computedStatus = 'LIVE';
    if (p.daysLeft === 0) computedStatus = 'EXPIRED';
    else if (p.daysLeft <= 5) computedStatus = 'NEAR EXPIRY';
    
    const matchesStatus = filterStatus === '' || computedStatus === filterStatus;
    
    return matchesPlan && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const currentItems = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isFilterActive = filterPlan !== '' || filterStatus !== '';

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Active Properties</h1>
          <p className="m-0 text-[15px] text-slate-500">Real-time management for live property listings on Rent8.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all shadow-sm ${
              isFilterOpen || isFilterActive ? 'border-indigo-500 bg-indigo-50 text-indigo-500' : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            <Filter size={16} /> More Filters
            {isFilterActive && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 z-10 w-48 p-4 mt-2 bg-white border shadow-lg top-full rounded-xl border-slate-200">
              <div className="mb-4">
                <div className="mb-2 text-[11px] font-bold tracking-wide text-slate-500">STATUS</div>
                <div className="flex flex-col gap-2">
                  {['LIVE', 'NEAR EXPIRY', 'EXPIRED'].map(status => (
                    <label key={status} className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer">
                      <input 
                        type="radio" name="status" checked={filterStatus === status}
                        onChange={() => { setFilterStatus(status); setCurrentPage(1); }}
                        className="cursor-pointer accent-indigo-500"
                      />
                      {status === 'LIVE' ? 'Live' : status === 'NEAR EXPIRY' ? 'Near Expiry' : 'Expired'}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-[11px] font-bold tracking-wide text-slate-500">PLAN</div>
                <div className="flex flex-col gap-2">
                  {['Standard', 'Double Plan'].map(plan => (
                    <label key={plan} className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer">
                      <input 
                        type="radio" name="plan" checked={filterPlan === plan}
                        onChange={() => { setFilterPlan(plan); setCurrentPage(1); }}
                        className="cursor-pointer accent-indigo-500"
                      />
                      {plan}
                    </label>
                  ))}
                </div>
              </div>

              {isFilterActive && (
                <div 
                  onClick={() => { setFilterPlan(''); setFilterStatus(''); setCurrentPage(1); setIsFilterOpen(false); }}
                  className="pt-3 mt-4 text-xs font-semibold text-center text-red-500 border-t cursor-pointer border-slate-200"
                >
                  Clear Filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead className="border-b bg-slate-50 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">PROPERTY</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">LOCATION</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">PLAN & AMOUNT</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">OWNER CONTACT</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">VALIDITY</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">STATUS</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-center text-slate-500">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-10 text-center text-slate-500">Loading active properties...</td></tr>
            ) : currentItems.length > 0 ? currentItems.map((prop) => {
              
              let computedStatus = 'LIVE';
              if (prop.daysLeft === 0) computedStatus = 'EXPIRED';
              else if (prop.daysLeft <= 5) computedStatus = 'NEAR EXPIRY';

              return (
                <tr key={prop.id} className="transition-colors border-b border-slate-100 hover:bg-slate-50">
                  <td className="flex items-center gap-4 px-6 py-4">
                    <img src={prop.img} alt="Property" className="object-cover w-12 h-12 rounded-lg bg-slate-200" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{prop.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">ID: {String(prop.id).substring(0, 8)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                     <div className="flex items-center gap-1">
                       <MapPin size={14} className="text-slate-400 shrink-0" /> 
                       <span className="truncate w-36">{prop.location}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-1.5 ${prop.planType === 'Standard' ? 'bg-sky-100 text-sky-600' : 'bg-purple-100 text-purple-600'}`}>
                      {prop.planType}
                    </span>
                    <div className="text-sm font-bold text-slate-900">{prop.planAmount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[13px] font-semibold text-slate-900">{prop.owner}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{prop.contact}</div>
                  </td>
                  <td className="px-6 py-4">
                    {computedStatus === 'EXPIRED' ? (
                      <span className="text-[13px] font-medium text-slate-400">Expired</span>
                    ) : (
                      <div className="w-28">
                        <div className={`flex justify-between text-[11px] font-bold mb-1.5 ${prop.daysLeft <= 5 ? 'text-orange-600' : 'text-emerald-600'}`}>
                           <span>{prop.daysLeft} days left</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${prop.daysLeft <= 5 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${(prop.daysLeft / prop.totalDays) * 100}%` }}></div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${computedStatus === 'LIVE' ? 'bg-emerald-100 text-emerald-700' : computedStatus === 'EXPIRED' ? 'bg-slate-100 text-slate-500' : 'bg-orange-100 text-orange-600'}`}>
                       {computedStatus}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 mx-auto text-[13px] font-semibold text-indigo-600 transition-colors bg-transparent border border-slate-200 rounded-md hover:bg-indigo-50">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="7" className="p-10 text-sm text-center text-slate-500">No properties found.</td></tr>
            )}
          </tbody>
        </table>

        {/* ✅ FIX: Yahan totalItems ko filteredProperties.length se replace kiya hai */}
        {filteredProperties.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
            <div className="text-sm font-medium text-slate-500">
              Showing {currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredProperties.length)} of {filteredProperties.length} listings
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"><ChevronLeft size={18} /></button>
              {[...Array(totalPages)].map((_, idx) => (
                <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-colors cursor-pointer ${currentPage === idx + 1 ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{idx + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"><ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProperties;