import React, { useState } from 'react';

const Dashboard = () => {
  // State for toggling timeframe
  const [timeframe, setTimeframe] = useState('Yearly');
  
  // State for chart tooltip (hover effect)
  const [tooltip, setTooltip] = useState(null);

  // Dynamic Growth Data
  const growthData = {
    Weekly: 14,
    Monthly: 42,
    Yearly: 78
  };
  
  const currentGrowth = growthData[timeframe];

  const stats = [
    { title: 'Total Revenue', value: '₹1,45,000', iconBg: '#fef2f2', badge: '+12.5%', badgeBg: '#dcfce7', badgeColor: '#16a34a' },
    { title: 'Active Ads', value: '1,240', iconBg: '#e0f2fe' },
    { title: 'Pending Approvals', value: '14', iconBg: '#d1fae5', badge: 'Urgent', badgeBg: '#fee2e2', badgeColor: '#dc2626' },
    { title: 'Reported Users', value: '3', iconBg: '#ffe4e6' },
  ];

  // New Data for Payment Verifications Table
  const recentPayments = [
    { initials: 'AR', bg: '#eff6ff', color: '#1d4ed8', name: 'Rahul Sharma', ad: 'Luxury 3BHK in Koregaon Park', amount: '₹45,000' },
    { initials: 'PD', bg: '#e0f2fe', color: '#0369a1', name: 'Priya Desai', ad: 'Modern Studio Apartment Baner', amount: '₹18,500' },
    { initials: 'KV', bg: '#dcfce7', color: '#15803d', name: 'Karan Verma', ad: 'Premium Villa Wakad Phase 2', amount: '₹85,000' },
    { initials: 'SN', bg: '#f1f5f9', color: '#334155', name: 'Sneha Nair', ad: 'Cozy 1BHK near IT Park Hinjewadi', amount: '₹22,000' },
  ];

  // Data for the Vertical Bar Chart (Heights re-calibrated for smaller box so bars look BIG)
  const chartData = [
    { month: 'JAN', value: 35000, height: 45 },
    { month: 'FEB', value: 38000, height: 50 },
    { month: 'MAR', value: 42000, height: 55 },
    { month: 'APR', value: 50000, height: 65 },
    { month: 'MAY', value: 45000, height: 60 }, 
    { month: 'JUN', value: 60000, height: 80 },
    { month: 'JUL', value: 75000, height: 100 },
    { month: 'AUG', value: 70000, height: 95 },
    { month: 'SEP', value: 85000, height: 115 },
    { month: 'OCT', value: 90000, height: 120 },
    { month: 'NOV', value: 110000, height: 145 },
    { month: 'DEC', value: 125000, height: 160 },
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '16px 32px 32px 32px', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            style={{ 
              backgroundColor: stat.title === 'Total Revenue' ? '#eef2ff' : stat.title === 'Active Ads' ? '#f0f9ff' : stat.title === 'Pending Approvals' ? '#ecfdf5' : stat.title === 'Reported Users' ? '#fef2f2' : '#fff', 
              padding: '24px', 
              borderRadius: '20px', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              border: stat.title === 'Total Revenue' ? '0.5px solid #6366f1' : stat.title === 'Active Ads' ? '0.5px solid #0ea5e9' : stat.title === 'Pending Approvals' ? '0.5px solid #10b981' : stat.title === 'Reported Users' ? '0.5px solid #ef4444' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: stat.title === 'Total Revenue' ? '#6366f1' : stat.title === 'Active Ads' ? '#0ea5e9' : stat.title === 'Pending Approvals' ? '#10b981' : stat.title === 'Reported Users' ? '#ef4444' : stat.iconBg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {stat.title === 'Total Revenue' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
                ) : stat.title === 'Active Ads' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                ) : stat.title === 'Pending Approvals' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ) : stat.title === 'Reported Users' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
                ) : null}
              </div>
              {stat.badge && (
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', backgroundColor: stat.badgeBg, color: stat.badgeColor }}>
                  {stat.badge}
                </span>
              )}
            </div>
            <div>
              <p style={{ color: '#000000', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>{stat.title}</p>
              <h2 style={{ fontSize: '32px', color: '#000000', margin: 0, fontWeight: '700' }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '24px' }}>
        
        {/* Left: Yearly Revenue Chart */}
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 8px 0' }}>Yearly Revenue Chart</h3>
              <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Performance metrics for fiscal year 2026</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#6366f1' }}></span>
              <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>Primary Income</span>
            </div>
          </div>

          <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            {/* ViewBox adjusted to tightly fit 200px height so bars don't scale down */}
            <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              
              {/* Background Grid Lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="110" x2="600" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="170" x2="600" y2="170" stroke="#e2e8f0" strokeWidth="1" />

              {/* Rendering Vertical Bars */}
              {chartData.map((data, index) => {
                const barWidth = 32; // INCREASED WIDTH: Pehle 28 tha, ab 32 kiya taki bars mote lagein
                const spacing = (600 - (12 * barWidth)) / 13;
                const x = spacing + index * (barWidth + spacing);
                const y = 170 - data.height;

                return (
                  <g key={data.month}>
                    {/* The Bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={data.height}
                      fill={tooltip?.month === data.month ? '#4338ca' : '#6366f1'} 
                      rx="4" 
                      onMouseEnter={() => setTooltip({ ...data, x, y })}
                      onMouseLeave={() => setTooltip(null)}
                      style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
                    />
                    
                    {/* X-axis Labels */}
                    <text 
                      x={x + barWidth / 2} 
                      y={190} 
                      fill={data.month === 'MAY' ? '#6366f1' : '#94a3b8'} 
                      fontSize="12" 
                      fontWeight="600" 
                      textAnchor="middle"
                    >
                      {data.month}
                    </text>
                  </g>
                );
              })}

              {/* DYNAMIC HOVER TOOLTIP */}
              {tooltip && (
                <foreignObject x={tooltip.x - 45} y={tooltip.y - 45} width="120" height="40" style={{ pointerEvents: 'none', zIndex: 100 }}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <div style={{ 
                      backgroundColor: '#fff', 
                      color: '#1e293b', 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      border: '1px solid #cbd5e1', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      position: 'relative'
                    }}>
                      {tooltip.month}: ₹{tooltip.value.toLocaleString('en-IN')}
                      
                      {/* Tooltip pointer arrow */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-5px', 
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#fff', 
                        borderBottom: '1px solid #cbd5e1', 
                        borderRight: '1px solid #cbd5e1'
                      }} />
                    </div>
                  </div>
                </foreignObject>
              )}
            </svg>
          </div>
        </div>

        {/* Right: Growth Analytics (Box padding 24px kiya to match left side) */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>Growth Analytics</h3>
            
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '24px', padding: '6px' }}>
              {['Weekly', 'Monthly', 'Yearly'].map((tab) => (
                <span 
                  key={tab}
                  onClick={() => setTimeframe(tab)}
                  style={{ 
                    padding: '8px 20px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: timeframe === tab ? '#0f172a' : '#64748b', 
                    backgroundColor: timeframe === tab ? '#fff' : 'transparent', 
                    borderRadius: '20px', 
                    boxShadow: timeframe === tab ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '180px', height: '180px', borderRadius: '50%', 
              background: `conic-gradient(#6366f1 0% ${currentGrowth}%, #f1f5f9 ${currentGrowth}% 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.4s ease-in-out' 
            }}>
              <div style={{ width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '36px', color: '#0f172a', margin: 0, fontWeight: '700' }}>
                  {currentGrowth}%
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: '600', letterSpacing: '1px' }}>GROWTH</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Payment Verifications & Quick Broadcast */}
      <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
        
        {/* Left: Recent Payment Verifications (Box padding 24px kiya) */}
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>Recent Payment Verifications</h3>
            <div style={{ color: '#6366f1', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              View All 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ width: '100%' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px' }}>
              <span>USER NAME</span>
              <span>AD TITLE</span>
              <span>AMOUNT</span>
              <span style={{ textAlign: 'right' }}>ACTION</span>
            </div>

            {/* Table Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {recentPayments.map((payment, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr', alignItems: 'center', padding: '16px 0', borderBottom: idx !== recentPayments.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  
                  {/* User Name & Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: payment.bg, color: payment.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                      {payment.initials}
                    </div>
                    <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '600' }}>{payment.name}</span>
                  </div>

                  {/* Ad Title */}
                  <span style={{ color: '#64748b', fontSize: '14px' }}>{payment.ad}</span>

                  {/* Amount */}
                  <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>{payment.amount}</span>

                  {/* Action Button */}
                  <div style={{ textAlign: 'right' }}>
                    <button style={{ backgroundColor: 'transparent', border: '1px solid #e2e8f0', color: '#6366f1', padding: '8px 16px', borderRadius: '14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                      View Proof
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Broadcast (Box padding 24px kiya) */}
        <div style={{ flex: 1, backgroundColor: '#f4f8fc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
            <h3 style={{ fontSize: '22px', color: '#0f172a', margin: 0 }}>Quick Broadcast</h3>
          </div>

          <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
            Send a push notification to all active users in the Pune region.
          </p>

          {/* Text Area */}
          <textarea 
            placeholder="Type your message here... e.g. 'New premium listings available in Viman Nagar!'"
            style={{ 
              width: '100%', 
              height: '140px', 
              padding: '16px', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#fff', 
              resize: 'none', 
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '14px',
              color: '#334155',
              boxSizing: 'border-box'
            }} 
          />
          
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#94a3b8', marginTop: '8px', marginBottom: 'auto' }}>
            0/150
          </div>

          {/* Send Button */}
          <button style={{ 
            width: '100%', 
            backgroundColor: '#6366f1', 
            color: '#fff', 
            padding: '14px', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: '16px', 
            fontWeight: '600', 
            cursor: 'pointer', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '8px',
            marginTop: '24px'
          }}>
            Send Notification 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;