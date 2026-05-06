import React, { useState } from 'react';
import { MapPin, Edit2, Filter, ChevronLeft, ChevronRight } from 'lucide-react'; // 🚀 Arrows import kiye

const ActiveProperties = () => {
  // 🚀 FILTER STATES
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPlan, setFilterPlan] = useState(''); // Empty means all
  const [filterStatus, setFilterStatus] = useState(''); // Empty means all
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // 🚀 7 Items per page set kar diya

  // 🚀 7 Dummy Data Records (owner name wapas add kiya hai)
  const propertiesData = [
    { id: 'RT-88219', title: 'Luxury 2BHK Heights', location: 'Baner, Pune', planType: 'Double Plan', planAmount: '₹289.00', owner: 'Aditya Kulkarni', contact: '+91 98765 43210', daysLeft: 22, totalDays: 30, status: 'LIVE', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100' },
    { id: 'RT-91044', title: 'Cozy Studio Baner', location: 'Balewadi, Pune', planType: 'Standard', planAmount: '₹200.00', owner: 'Snehal Patil', contact: '+91 91234 56789', daysLeft: 3, totalDays: 30, status: 'NEAR EXPIRY', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100' },
    { id: 'RT-77312', title: 'Penthouse Viman Nagar', location: 'Viman Nagar, Pune', planType: 'Double Plan', planAmount: '₹289.00', owner: 'Rahul Sharma', contact: '+91 88888 77777', daysLeft: 0, totalDays: 30, status: 'EXPIRED', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09c15468?w=100' },
    { id: 'RT-82255', title: 'Spacious 3BHK Flat', location: 'Kharadi, Pune', planType: 'Standard', planAmount: '₹200.00', owner: 'Manish Gupta', contact: '+91 90000 11223', daysLeft: 14, totalDays: 30, status: 'LIVE', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100' },
    { id: 'RT-55210', title: '1BHK Near Magarpatta', location: 'Hadapsar, Pune', planType: 'Standard', planAmount: '₹200.00', owner: 'Amol Shinde', contact: '+91 95522 33445', daysLeft: 28, totalDays: 30, status: 'LIVE', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100' },
    { id: 'RT-33411', title: '2BHK Family Flat', location: 'Kothrud, Pune', planType: 'Standard', planAmount: '₹200.00', owner: 'Anil Desai', contact: '+91 55555 66666', daysLeft: 18, totalDays: 30, status: 'LIVE', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100' },
    { id: 'RT-11209', title: '1BHK with Terrace', location: 'Wakad, Pune', planType: 'Double Plan', planAmount: '₹289.00', owner: 'Pooja Patil', contact: '+91 44444 77777', daysLeft: 5, totalDays: 30, status: 'NEAR EXPIRY', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09c15468?w=100' },
  ];

  // Filtering Logic
  const filteredProperties = propertiesData.filter(p => {
    const matchesPlan = filterPlan === '' || p.planType === filterPlan;
    const matchesStatus = filterStatus === '' || p.status === filterStatus;
    return matchesPlan && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const currentItems = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Check if any filter is active
  const isFilterActive = filterPlan !== '' || filterStatus !== '';

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui' }}>
      
      {/* Header Area (New Listing removed, More Filters added here) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Active Properties</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Real-time management for property listings in Pune city.</p>
        </div>
        
        {/* 🚀 MORE FILTERS DROPDOWN */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', 
              border: isFilterOpen || isFilterActive ? '1px solid #6366f1' : '1px solid #e2e8f0', 
              backgroundColor: isFilterOpen || isFilterActive ? '#eef2ff' : '#fff', 
              color: isFilterOpen || isFilterActive ? '#6366f1' : '#475569', 
              fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' 
            }}
          >
            <Filter size={16} /> More Filters
            {isFilterActive && <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>}
          </button>

          {isFilterOpen && (
            <div style={{ position: 'absolute', top: '110%', right: '0', width: '200px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10, padding: '16px' }}>
              
              {/* STATUS FILTER */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>STATUS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['LIVE', 'NEAR EXPIRY', 'EXPIRED'].map(status => (
                    <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="radio" name="status" 
                        checked={filterStatus === status}
                        onClick={() => { if(filterStatus === status) { setFilterStatus(''); setCurrentPage(1); } }}
                        onChange={() => { setFilterStatus(status); setCurrentPage(1); }}
                        style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                      />
                      {status === 'LIVE' ? 'Live' : status === 'NEAR EXPIRY' ? 'Near Expiry' : 'Expired'}
                    </label>
                  ))}
                </div>
              </div>

              {/* PLAN FILTER */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>PLAN</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Standard', 'Double Plan'].map(plan => (
                    <label key={plan} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="radio" name="plan" 
                        checked={filterPlan === plan}
                        onClick={() => { if(filterPlan === plan) { setFilterPlan(''); setCurrentPage(1); } }}
                        onChange={() => { setFilterPlan(plan); setCurrentPage(1); }}
                        style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                      />
                      {plan}
                    </label>
                  ))}
                </div>
              </div>

              {isFilterActive && (
                <div 
                  onClick={() => { setFilterPlan(''); setFilterStatus(''); setCurrentPage(1); setIsFilterOpen(false); }}
                  style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', color: '#ef4444', fontSize: '12px', fontWeight: '600', textAlign: 'center', cursor: 'pointer' }}
                >
                  Clear Filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table Card */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>PROPERTY</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>LOCATION</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>PLAN & AMOUNT</th>
              {/* 🚀 OWNER CONTACT wapas Theek kiya */}
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>OWNER CONTACT</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>VALIDITY</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>STATUS</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px', textAlign: 'center' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((prop) => (
              <tr key={prop.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={prop.img} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{prop.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>ID: {prop.id}</div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#475569' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} color="#64748b" /> {prop.location}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', backgroundColor: prop.planType === 'Standard' ? '#e0f2fe' : '#f3e8ff', color: prop.planType === 'Standard' ? '#0ea5e9' : '#a855f7', marginBottom: '6px' }}>
                    {prop.planType}
                  </span>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{prop.planAmount}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{prop.owner}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{prop.contact}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  {prop.status === 'EXPIRED' ? (
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Expired</span>
                  ) : (
                    <div style={{ width: '120px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: prop.daysLeft <= 5 ? '#ea580c' : '#16a34a' }}>
                         <span>{prop.daysLeft} days left</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${(prop.daysLeft / prop.totalDays) * 100}%`, height: '100%', backgroundColor: prop.daysLeft <= 5 ? '#f97316' : '#22c55e', borderRadius: '10px' }}></div>
                      </div>
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px 24px' }}>
                   <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', backgroundColor: prop.status === 'LIVE' ? '#dcfce7' : (prop.status === 'EXPIRED' ? '#f1f5f9' : '#ffedd5'), color: prop.status === 'LIVE' ? '#16a34a' : (prop.status === 'EXPIRED' ? '#94a3b8' : '#ea580c') }}>
                     {prop.status}
                   </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: '1px solid #e2e8f0', color: '#6366f1', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px', margin: '0 auto', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e7ff'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <Edit2 size={14} /> Edit
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  No properties found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🚀 NAYA PAGINATION FOOTER */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
            Showing 1 to {currentItems.length} of {isFilterActive ? filteredProperties.length : '124'} listings
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              <ChevronLeft size={18} />
            </button>
            
            {[1, 2, 3, 4].map((pageNumber) => (
              <button 
                key={pageNumber} 
                style={{ 
                  padding: '6px 14px', borderRadius: '6px', 
                  border: pageNumber === 1 ? 'none' : '1px solid #e2e8f0', 
                  backgroundColor: pageNumber === 1 ? '#3b82f6' : '#fff', 
                  color: pageNumber === 1 ? '#fff' : '#475569', 
                  fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { if(pageNumber !== 1) e.currentTarget.style.backgroundColor = '#f1f5f9'; }} 
                onMouseOut={(e) => { if(pageNumber !== 1) e.currentTarget.style.backgroundColor = '#fff'; }}
              >
                {pageNumber}
              </button>
            ))}

            <button style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActiveProperties;