import React, { useState } from 'react';
import RejectModal from "./RejectModel";
import { Filter, Download, MapPin, FileText, X, ChevronLeft, ChevronRight, Phone, CheckCircle2, Ban, Check, Maximize } from 'lucide-react';

const PendingApprovals = () => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Single Tab
  const [activeTab, setActiveTab] = useState('All Pending Approvals');
  const tabs = ['All Pending Approvals'];

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mainImage, setMainImage] = useState('');

  // Reject Modal State
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
  // Payment Screenshot Fullscreen Dialog ke liye state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // 🚀 FILTER STATES ADDED HERE
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('All Time');
  const [filterPlan, setFilterPlan] = useState('All Plans');

  // Total 12 Dummy Records (Pune Locations) - Dates adjusted to today (05 May 2026) for testing
  const tableData = [
    { id: 1, property: '1 BHK in Magarpatta City', location: 'Pune, MH', fullAddress: 'Magarpatta City, Hadapsar, Pune 411028', imgBg: '#34d399', contactNo: '+91 98765 43210', contactName: 'Rohit Sharma', planType: 'Standard', planAmount: '₹200.00', date: '05 May 2026', time: '10:30 AM', txId: 'UTR1234567890' },
    { id: 2, property: 'Luxury Villa, Baner Hills', location: 'Pune, MH', fullAddress: 'Baner, Pune • 401, Sapphire Heights, Baner Road, Pune 411045', imgBg: '#94a3b8', contactNo: '+91 88888 22222', contactName: 'Priyanka K.', planType: 'Double Plan', planAmount: '₹289.00', date: '05 May 2026', time: '11:15 AM', txId: 'UTR9876543210' },
    { id: 3, property: 'Studio near IT Park', location: 'Hinjewadi, Pune', fullAddress: 'Phase 1, Hinjewadi Rajiv Gandhi Infotech Park, Pune 411057', imgBg: '#64748b', contactNo: '+91 77777 66666', contactName: 'Amit Verma', planType: 'Standard', planAmount: '₹200.00', date: '04 May 2026', time: '12:05 PM', txId: 'UTR4567891230' },
    { id: 4, property: '2 BHK Fully Furnished', location: 'Kharadi, Pune', fullAddress: 'EON Free Zone Road, Kharadi, Pune 411014', imgBg: '#f87171', contactNo: '+91 99999 11111', contactName: 'Neha Singh', planType: 'Standard', planAmount: '₹200.00', date: '04 May 2026', time: '09:00 AM', txId: 'UTR7418529630' },
    { id: 5, property: '1 RK for Bachelors', location: 'Shivajinagar, Pune', fullAddress: 'JM Road, Shivajinagar, Pune 411005', imgBg: '#60a5fa', contactNo: '+91 88888 33333', contactName: 'Sushant G.', planType: 'Standard', planAmount: '₹200.00', date: '03 May 2026', time: '02:30 PM', txId: 'UTR8529637410' },
    { id: 6, property: '3 BHK Penthouse', location: 'Kalyani Nagar, Pune', fullAddress: 'Central Avenue, Kalyani Nagar, Pune 411006', imgBg: '#a78bfa', contactNo: '+91 77777 44444', contactName: 'Rutuja D.', planType: 'Double Plan', planAmount: '₹289.00', date: '02 May 2026', time: '10:00 AM', txId: 'UTR1593572846' },
    { id: 7, property: 'Commercial Shop', location: 'FC Road, Pune', fullAddress: 'Fergusson College Road, Deccan Gymkhana, Pune 411004', imgBg: '#a78bfa', contactNo: '+91 66666 55555', contactName: 'Rohan Sir', planType: 'Standard', planAmount: '₹200.00', date: '01 May 2026', time: '11:45 AM', txId: 'UTR7531594862' },
    { id: 8, property: '2 BHK Family Flat', location: 'Kothrud, Pune', fullAddress: 'Karve Road, Kothrud, Pune 411038', imgBg: '#34d399', contactNo: '+91 55555 66666', contactName: 'Anil Desai', planType: 'Standard', planAmount: '₹200.00', date: '27 Oct 2026', time: '01:15 PM', txId: 'UTR9517534862' },
    { id: 9, property: '1 BHK with Terrace', location: 'Wakad, Pune', fullAddress: 'Datta Mandir Road, Wakad, Pune 411057', imgBg: '#94a3b8', contactNo: '+91 44444 77777', contactName: 'Pooja Patil', planType: 'Double Plan', planAmount: '₹289.00', date: '27 Oct 2026', time: '04:20 PM', txId: 'UTR3571592846' },
    { id: 10, property: 'Co-working Space', location: 'Viman Nagar, Pune', fullAddress: 'Phoenix Road, Viman Nagar, Pune 411014', imgBg: '#f87171', contactNo: '+91 33333 88888', contactName: 'Asif Khan', planType: 'Double Plan', planAmount: '₹289.00', date: '28 Oct 2026', time: '09:30 AM', txId: 'UTR2584569510' },
    { id: 11, property: 'Weekend Villa', location: 'Lonavala, Pune', fullAddress: 'Bhushi Dam Road, Lonavala, Pune 410401', imgBg: '#60a5fa', contactNo: '+91 22222 99999', contactName: 'Bhosale Sir', planType: 'Double Plan', planAmount: '₹289.00', date: '28 Oct 2026', time: '12:10 PM', txId: 'UTR8527419630' },
    { id: 12, property: 'Studio Apartment', location: 'Pimple Saudagar', fullAddress: 'Rahatani Road, Pimple Saudagar, Pune 411027', imgBg: '#60a5fa', contactNo: '+91 11111 00000', contactName: 'Papa', planType: 'Standard', planAmount: '₹200.00', date: '29 Oct 2026', time: '03:45 PM', txId: 'UTR1472583690' },
  ];

  // Dummy Images array
  const galleryImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09c15468?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28ce8f30d67?auto=format&fit=crop&w=800&q=80'
  ];

  // 🚀 FILTER LOGIC
  const filteredData = tableData.filter((row) => {
    // 1. Plan Filter
    if (filterPlan !== 'All Plans' && row.planType !== filterPlan) return false;

    // 2. Date Filter
    if (filterDate === 'Today' && row.date !== '05 May 2026') return false;
    if (filterDate === 'Yesterday' && row.date !== '04 May 2026') return false;
    if (filterDate === 'Last 7 Days') {
      const last7Days = ['05 May 2026', '04 May 2026', '03 May 2026', '02 May 2026', '01 May 2026', '30 Apr 2026', '29 Apr 2026'];
      if (!last7Days.includes(row.date)) return false;
    }
    
    return true;
  });

  // Pagination Logic (Applied on filteredData)
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Modal Functions
  const openModal = (property) => {
    setSelectedProperty(property);
    setMainImage(galleryImages[0]); 
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsPaymentModalOpen(false); 
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '32px', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            Pending Approvals
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0, maxWidth: '600px', lineHeight: '1.5' }}>
            Verify payment screenshots before approving the listing live on the Rent8 platform.
          </p>
        </div>
        
        {/* 🚀 FILTER BUTTON & DROPDOWN UI */}
        <div style={{ position: 'relative', display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: isFilterOpen ? '1px solid #6366f1' : '1px solid #e2e8f0', backgroundColor: isFilterOpen ? '#eef2ff' : '#fff', color: isFilterOpen ? '#6366f1' : '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
          >
            <Filter size={16} /> Filter 
            {(filterDate !== 'All Time' || filterPlan !== 'All Plans') && (
              <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
            )}
          </button>

          {/* Filter Menu */}
          {isFilterOpen && (
            <div style={{ position: 'absolute', top: '110%', right: '0', width: '220px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10, padding: '16px' }}>
              
              {/* Date Filter */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>TIME / DATE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['All Time', 'Today', 'Yesterday', 'Last 7 Days'].map(option => (
                    <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="date" 
                        checked={filterDate === option}
                        onChange={() => { setFilterDate(option); setCurrentPage(1); }}
                        style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Plan Filter */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>PLAN TYPE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['All Plans', 'Standard', 'Double Plan'].map(option => (
                    <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="plan" 
                        checked={filterPlan === option}
                        onChange={() => { setFilterPlan(option); setCurrentPage(1); }}
                        style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              {(filterDate !== 'All Time' || filterPlan !== 'All Plans') && (
                <div 
                  onClick={() => { setFilterDate('All Time'); setFilterPlan('All Plans'); setCurrentPage(1); setIsFilterOpen(false); }}
                  style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', color: '#ef4444', fontSize: '12px', fontWeight: '600', textAlign: 'center', cursor: 'pointer' }}
                >
                  Clear Filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              paddingBottom: '12px', 
              fontSize: '14px', 
              fontWeight: activeTab === tab ? '700' : '600', 
              color: activeTab === tab ? '#6366f1' : '#64748b', 
              borderBottom: activeTab === tab ? '3px solid #6366f1' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {/* Dynamic Count */}
            All Pending Approvals ({totalItems})
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>PROPERTY DETAILS</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>CONTACT</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>PLAN & AMOUNT</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>VERIFICATION</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>TIME</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((row) => (
              <tr 
                key={row.id} 
                onClick={() => openModal(row)}
                style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                {/* Property Details */}
                <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '60px', height: '45px', borderRadius: '8px', backgroundColor: row.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '30px', height: '20px', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '4px' }}></div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>{row.property}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                      <MapPin size={12} /> {row.location}
                    </div>
                  </div>
                </td>
                {/* Contact */}
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>{row.contactNo}</div>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>{row.contactName}</div>
                </td>
                {/* Plan & Amount */}
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', backgroundColor: row.planType === 'Standard' ? '#e0f2fe' : (row.planType === 'Premium' ? '#fef08a' : '#f3e8ff'), color: row.planType === 'Standard' ? '#0ea5e9' : (row.planType === 'Premium' ? '#ca8a04' : '#a855f7'), marginBottom: '6px' }}>
                    {row.planType}
                  </span>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{row.planAmount}</div>
                </td>
                {/* Verification */}
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                    <FileText size={16} /> VIEW RECEIPT
                  </div>
                </td>
                {/* Time */}
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>{row.date}</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>{row.time}</div>
                </td>
                {/* Actions */}
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)' }}>
                      APPROVE
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  No pending approvals found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer / Dynamic Pagination */}
        {totalItems > 0 && (
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} requests
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={handlePrevPage} disabled={currentPage === 1} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: currentPage === 1 ? '#f1f5f9' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} style={{ padding: '6px 12px', borderRadius: '6px', border: currentPage === pageNumber ? 'none' : '1px solid #e2e8f0', backgroundColor: currentPage === pageNumber ? '#3b82f6' : '#fff', color: currentPage === pageNumber ? '#fff' : '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                    {pageNumber}
                  </button>
                );
              })}
              <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: currentPage === totalPages ? '#f1f5f9' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 🚀 REVIEW PROPERTY LISTING MODAL (DIALOG) */}
      {/* ========================================= */}
      {selectedProperty && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '95%', maxWidth: '1400px', maxHeight: '95vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Review Property Listing</h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', gap: '40px', padding: '32px', flexDirection: 'row' }}>
              
              {/* Left Column (Images & Info) */}
              <div style={{ flex: '2.5', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                {/* Images Section */}
                <div>
                  <div style={{ position: 'relative', width: '100%', height: '460px', borderRadius: '12px', overflow: 'hidden', backgroundImage: `url(${mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.3s ease-in-out' }}>
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0369a1', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      VERIFIED IMAGES
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'thin' }}>
                    {galleryImages.map((imgUrl, index) => (
                      <div key={index} onClick={() => setMainImage(imgUrl)} style={{ flexShrink: 0, width: '160px', height: '100px', borderRadius: '8px', backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', border: mainImage === imgUrl ? '3px solid #3b82f6' : '1px solid #e2e8f0', transition: 'all 0.2s', opacity: mainImage === imgUrl ? '1' : '0.7' }}></div>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                      {selectedProperty.property}
                    </h3>
                    <span style={{ 
                      backgroundColor: selectedProperty.planType === 'Double Plan' ? '#e9e3ff' : '#e8f2ff', 
                      color: selectedProperty.planType === 'Double Plan' ? '#cc64fd' : '#66bdfb', 
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.0px', whiteSpace: 'nowrap' 
                    }}>
                      {selectedProperty.planType === 'Double Plan' ? 'DOUBLE PLAN' : 'STANDARD'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}>
                    <MapPin size={18} /> {selectedProperty.fullAddress}
                  </div>
                </div>

                {/* Rent & Deposit Boxes */}
                <div style={{ display: 'flex', gap: '16px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', marginTop: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>Monthly Rent</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>₹18,500</div>
                  </div>
                  <div style={{ width: '1px', backgroundColor: '#e2e8f0' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>Security Deposit</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>₹40,000</div>
                  </div>
                </div>
              </div>

              {/* Right Column (Cards) */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Lister Details Card */}
                <div style={{ border: '1px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '12px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 20px 0' }}>Lister Details</h4>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '16px' }}>{selectedProperty.contactName}</div>
                      <div style={{ color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <Phone size={14} /> {selectedProperty.contactNo}
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>Platform Tenure</span>
                    <span style={{ fontWeight: '600', color: '#0369a1' }}>Joined: 142 days ago</span>
                  </div>
                </div>

                {/* Payment Verification Card */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={20} color="#0284c7" /> Payment Verification
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Plan Subscribed</span>
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedProperty.planType} ({selectedProperty.planAmount})</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Transaction ID</span>
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedProperty.txId}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Date</span>
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedProperty.date}, {selectedProperty.time}</span>
                    </div>

                    {/* Payment Screenshot Section */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '4px' }}>
                      <span style={{ display: 'block', color: '#64748b', marginBottom: '12px', fontWeight: '500' }}>Attached Screenshot</span>
                      
                      {/* Clickable Image Thumbnail */}
                      <div 
                        onClick={() => setIsPaymentModalOpen(true)}
                        style={{ 
                          width: '100%', 
                          height: '140px', 
                          borderRadius: '8px', 
                          backgroundImage: 'url(/payment.jpeg)', 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'top', 
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => e.currentTarget.children[0].style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.children[0].style.opacity = '0'}
                      >
                        <div style={{ 
                          position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s ease-in-out' 
                        }}>
                          <Maximize size={28} color="#fff" />
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', textAlign: 'center' }}>Click image to view full screen</p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer (Buttons) */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid #e2e8f0', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'flex-end', gap: '16px', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
              
              <button onClick={closeModal} style={{ padding: '12px 24px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                Cancel
              </button>
              
              <button onClick={() => setIsRejectModalOpen(true)} style={{ padding: '12px 24px', borderRadius: '24px', border: '1px solid #fca5a5', backgroundColor: '#fff', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                <Ban size={18} /> Reject Request 
              </button>

              <button style={{ padding: '12px 28px', borderRadius: '24px', border: 'none', backgroundColor: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 6px rgba(22, 163, 74, 0.2)' }}>
                <CheckCircle2 size={18} /> Approve 8 Days (Standard Slot)
              </button>

              <button style={{ padding: '12px 28px', borderRadius: '24px', border: 'none', backgroundColor: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 6px rgba(2, 132, 199, 0.2)' }}>
                <Check size={18} /> Approve 16 Days (Premium Slot)
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 🚀 FULLSCREEN PAYMENT SCREENSHOT LIGHTBOX */}
      {/* ========================================= */}
      {isPaymentModalOpen && (
        <div 
          onClick={() => setIsPaymentModalOpen(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)', cursor: 'zoom-out' }}
        >
          <button 
            onClick={() => setIsPaymentModalOpen(false)} 
            style={{ position: 'absolute', top: '24px', right: '32px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={28} />
          </button>
          
          <img 
            src="/payment.jpeg" 
            alt="Payment Fullscreen" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', cursor: 'default' }} 
          />
        </div>
      )}

      {/* ========================================= */}
      {/* 🚀 REJECT REASON MODAL */}
      {/* ========================================= */}
      <RejectModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        onSubmit={(data) => {
          console.log("Property Reject hone ka reason:", data);
        }} 
      />

    </div>
  );
};

export default PendingApprovals;