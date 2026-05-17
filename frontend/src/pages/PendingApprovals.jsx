import React, { useState, useEffect } from 'react';
import RejectModal from "./RejectModel"; // Ensure the spelling matches your actual file
import { Filter, Download, MapPin, FileText, X, ChevronLeft, ChevronRight, Phone, CheckCircle2, Ban, Check, Maximize } from 'lucide-react';
import API from '../services/api';


const PendingApprovals = () => {
  // 🚀 API & DATA STATES
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Single Tab
  const [activeTab, setActiveTab] = useState('All Pending Approvals');

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mainImage, setMainImage] = useState('');

  // Reject & Payment Modal States
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('All Time');

  // 🚀 FETCH PENDING PROPERTIES
  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      // Backend route hit kar rahe hain jisme sirf 'pending' status wali properties aayengi
      const res = await API.get('/admin/properties?status=pending_approval');
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to load pending properties");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 APPROVE PROPERTY API
  const handleApprove = async (id) => {
    try {
      const res = await API.put(`/admin/properties/${id}/approve`);
      if (res.data.success) {
        // UI se us property ko turant hata do kyunki ab wo 'live' ho gayi hai
        setProperties(properties.filter(p => p._id !== id));
        closeModal();
      }
    } catch (error) {
      console.error("Error approving property:", error);
      alert("Failed to approve property");
    }
  };

  // 🚀 REJECT PROPERTY API
  const handleReject = async (reasonObj) => {
    try {
      const res = await API.put(`/admin/properties/${selectedProperty._id}/reject`, {
        reason: reasonObj.reason || "Policy Violation"
      });
      if (res.data.success) {
        // UI se us property ko hata do kyunki wo reject ho gayi
        setProperties(properties.filter(p => p._id !== selectedProperty._id));
        setIsRejectModalOpen(false);
        closeModal();
      }
    } catch (error) {
      console.error("Error rejecting property:", error);
      alert("Failed to reject property");
    }
  };

  // 🚀 FILTER LOGIC
  const filteredData = properties.filter((row) => {
    if (filterDate === 'All Time') return true;
    
    const rowDate = new Date(row.createdAt).toLocaleDateString('en-IN');
    const today = new Date().toLocaleDateString('en-IN');
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-IN');
    
    if (filterDate === 'Today' && rowDate !== today) return false;
    if (filterDate === 'Yesterday' && rowDate !== yesterday) return false;
    // Last 7 Days logic can be expanded here
    
    return true;
  });

  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  // Modal Functions
  const openModal = (property) => {
    setSelectedProperty(property);
    // Agar DB me images hain toh pehli dikhao, warna placeholder
    setMainImage(property.images?.length > 0 ? property.images[0] : 'https://placehold.co/600x400?text=No+Image'); 
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsPaymentModalOpen(false); 
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Pending Approvals</h1>
          <p className="max-w-2xl m-0 leading-relaxed text-slate-500 text-[15px]">
            Verify details and images before approving the listing live on the Rent8 platform.
          </p>
        </div>
        
        {/* FILTER UI */}
        <div className="relative flex gap-3">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all shadow-sm ${
              isFilterOpen ? 'border-indigo-500 bg-indigo-50 text-indigo-500' : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            <Filter size={16} /> Filter 
            {filterDate !== 'All Time' && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 z-10 w-56 p-4 mt-2 bg-white border shadow-lg top-[110%] rounded-xl border-slate-200">
              <div className="mb-4">
                <div className="mb-2 text-[11px] font-bold tracking-wide text-slate-500">TIME / DATE</div>
                <div className="flex flex-col gap-2">
                  {['All Time', 'Today', 'Yesterday', 'Last 7 Days'].map(option => (
                    <label key={option} className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer">
                      <input 
                        type="radio" name="date" 
                        checked={filterDate === option}
                        onChange={() => { setFilterDate(option); setCurrentPage(1); }}
                        className="cursor-pointer accent-indigo-500"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              {filterDate !== 'All Time' && (
                <div 
                  onClick={() => { setFilterDate('All Time'); setCurrentPage(1); setIsFilterOpen(false); }}
                  className="pt-3 mt-4 text-xs font-semibold text-center text-red-500 border-t cursor-pointer border-slate-200"
                >
                  Clear Filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-8 mb-6 border-b border-slate-200">
        {['All Pending Approvals'].map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold cursor-pointer transition-all border-b-[3px] ${
              activeTab === tab ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-slate-500'
            }`}
          >
            {tab} ({totalItems})
          </div>
        ))}
      </div>

      {/* MAIN TABLE CARD */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50 border-slate-200">
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">PROPERTY DETAILS</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">CONTACT</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">RENT & DEPOSIT</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">SUBMITTED ON</th>
              <th className="px-6 py-4 text-xs font-bold tracking-wide text-slate-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500">Loading pending properties...</td>
              </tr>
            ) : currentItems.length > 0 ? currentItems.map((row) => (
              <tr 
                key={row._id} 
                onClick={() => openModal(row)}
                className="transition-colors border-b cursor-pointer border-slate-200 hover:bg-slate-50"
              >
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
                {/* Contact */}
                <td className="px-6 py-5">
                  <div className="mb-1 text-sm font-bold text-slate-900">{row.owner_id?.phone || 'N/A'}</div>
                  <div className="text-xs font-medium text-slate-500">{row.owner_id?.name || 'User'}</div>
                </td>
                {/* Rent & Deposit */}
                <td className="px-6 py-5">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-bold rounded-full text-sky-600 bg-sky-100">
                    Rent: ₹{row.rent}
                  </span>
                  <div className="text-sm font-bold text-slate-900">Dep: ₹{row.deposit}</div>
                </td>
                {/* Time */}
                <td className="px-6 py-5">
                  <div className="mb-1 text-[13px] font-medium text-slate-500">
                    {new Date(row.createdAt).toLocaleDateString('en-IN')}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {new Date(row.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProperty(row); setIsRejectModalOpen(true); }}
                      className="p-1 text-red-500 transition rounded hover:bg-red-50"
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleApprove(row._id); }}
                      className="px-4 py-2 text-xs font-bold text-white transition rounded-md shadow-sm bg-emerald-500 hover:bg-emerald-600"
                    >
                      APPROVE
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-10 text-sm text-center text-slate-500">
                  No pending approvals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div className="text-[13px] font-medium text-slate-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} requests
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-1.5 rounded-md border border-slate-200 text-slate-500 disabled:opacity-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-1.5 rounded-md border border-slate-200 text-slate-500 disabled:opacity-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 🚀 REVIEW PROPERTY LISTING MODAL */}
      {/* ========================================= */}
      {selectedProperty && !isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <div className="w-[95%] max-w-[1200px] max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200">
              <h2 className="m-0 text-xl font-bold text-slate-900">Review Property Listing</h2>
              <button onClick={closeModal} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-10 p-8 lg:flex-row">
              
              {/* Left Column (Images & Info) */}
              <div className="flex flex-col flex-[2] gap-5 min-w-0">
                {/* Images Section */}
                <div>
                  <div 
                    className="relative w-full h-[400px] rounded-xl overflow-hidden bg-center bg-cover transition-all"
                    style={{ backgroundImage: `url(${mainImage})` }}
                  >
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white rounded-full text-xs font-bold text-sky-700 shadow-sm">
                      PROPERTY IMAGES
                    </div>
                  </div>
                  <div className="flex gap-3 pb-2 mt-4 overflow-x-auto custom-scrollbar">
                    {selectedProperty.images && selectedProperty.images.map((imgUrl, index) => (
                      <div 
                        key={index} onClick={() => setMainImage(imgUrl)} 
                        className={`shrink-0 w-32 h-20 rounded-lg bg-cover bg-center cursor-pointer transition-all ${mainImage === imgUrl ? 'border-2 border-indigo-500 opacity-100' : 'border border-slate-200 opacity-70 hover:opacity-100'}`}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="mt-2">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="m-0 text-2xl font-semibold text-slate-900">{selectedProperty.title}</h3>
                    <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full whitespace-nowrap">
                      NEW LISTING
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px] text-slate-500">
                    <MapPin size={18} /> {selectedProperty.full_address}
                  </div>
                </div>

                {/* Rent & Deposit Boxes */}
                <div className="flex gap-4 p-5 mt-2 rounded-xl bg-slate-50">
                  <div className="flex-1">
                    <div className="mb-1 text-sm text-slate-500">Monthly Rent</div>
                    <div className="text-xl font-bold text-slate-900">₹{selectedProperty.rent}</div>
                  </div>
                  <div className="w-[1px] bg-slate-200"></div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm text-slate-500">Security Deposit</div>
                    <div className="text-xl font-bold text-slate-900">₹{selectedProperty.deposit}</div>
                  </div>
                </div>
              </div>

              {/* Right Column (Cards) */}
              <div className="flex flex-col flex-1 gap-5">
                {/* Lister Details Card */}
                <div className="p-6 bg-white border border-t-4 shadow-sm border-slate-200 border-t-indigo-700 rounded-xl">
                  <h4 className="mb-5 text-base font-bold text-slate-900">Lister Details</h4>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="overflow-hidden rounded-full w-14 h-14 bg-slate-200">
                      <img src={`https://ui-avatars.com/api/?name=${selectedProperty.owner_id?.name || 'User'}&background=e2e8f0`} alt="Avatar" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900">{selectedProperty.owner_id?.name || 'Unknown User'}</div>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                        <Phone size={14} /> {selectedProperty.owner_id?.phone || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (Buttons) */}
            <div className="flex justify-end gap-4 px-8 py-6 border-t bg-slate-50 border-slate-200 rounded-b-2xl">
              <button onClick={closeModal} className="px-6 py-3 text-sm font-semibold bg-white border rounded-full text-slate-600 border-slate-200 hover:bg-slate-50">
                Cancel
              </button>
              
              <button onClick={() => setIsRejectModalOpen(true)} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-red-500 bg-white border border-red-300 rounded-full hover:bg-red-50">
                <Ban size={18} /> Reject Request 
              </button>

              <button onClick={() => handleApprove(selectedProperty._id)} className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white border-none rounded-full shadow-md bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 size={18} /> Approve Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 🚀 REJECT REASON MODAL COMPONENT */}
      {/* ========================================= */}
      <RejectModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        onSubmit={(data) => handleReject(data)} 
      />

    </div>
  );
};

export default PendingApprovals;