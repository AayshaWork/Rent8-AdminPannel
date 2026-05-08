import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Settings as SettingsIcon, Upload, Calendar, ChevronDown, IndianRupee } from 'lucide-react';
import API from '../services/api'; // ✅ API import kiya

const Settings = () => {
  // 🚀 STATES (Inhe backend se fill karenge)
  const [standardDays, setStandardDays] = useState(0);
  const [standardPrice, setStandardPrice] = useState(0);
  const [premiumDays, setPremiumDays] = useState(0);
  const [premiumPrice, setPremiumPrice] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);

  // 🚀 1. FETCH SETTINGS FROM BACKEND
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/api/admin/settings');
        if (res.data.success) {
          const d = res.data.data;
          setStandardDays(d.standardDays);
          setStandardPrice(d.standardPrice);
          setPremiumDays(d.premiumDays);
          setPremiumPrice(d.premiumPrice);
          setQrImage(d.qrImage);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 🚀 2. IMAGE UPLOAD LOGIC (Cloudinary ya Base64 ke liye taiyar)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrImage(reader.result); // Base64 string for now
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚀 3. UPDATE SETTINGS API CALL
  const handleUpdateConfig = async () => {
    try {
      const res = await API.put('/api/admin/settings', {
        standardDays,
        standardPrice,
        premiumDays,
        premiumPrice,
        qrImage
      });
      if (res.data.success) {
        alert("Settings Updated in Database! 🚀");
      }
    } catch (err) {
      alert("Failed to update settings");
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 font-bold text-slate-500">Loading system parameters...</div>;

  return (
    <div className="min-h-screen p-8 font-sans bg-slate-50">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900">App Settings & Control</h1>
        <p className="m-0 text-[15px] text-slate-500">Manage critical application assets and global system parameters.</p>
      </div>

      {/* MAIN CARDS CONTAINER */}
      <div className="flex flex-wrap items-start gap-6">
        
        {/* 1. PAYMENT QR CODE CARD */}
        <div className="flex-1 min-w-[350px] bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
          <div className="flex items-center w-full gap-2 mb-8">
            <QrCode size={20} className="text-sky-500" />
            <h2 className="m-0 text-base font-bold text-slate-900">Payment QR Code</h2>
          </div>

          <div className="flex items-center justify-center p-4 mb-6 border border-dashed w-52 h-52 bg-slate-50 border-slate-300 rounded-xl">
            <img src={qrImage} alt="QR Code" className="object-contain w-full h-full rounded-lg" />
          </div>

          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

          <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center w-full gap-2 p-3 mb-3 text-sm font-semibold transition-all border rounded-lg bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800">
            <Upload size={16} /> Replace QR Image
          </button>
          
          <button onClick={handleUpdateConfig} className="w-full p-3 text-sm font-bold text-white transition-colors rounded-lg shadow-sm bg-sky-500 hover:bg-sky-600">
            Save New QR
          </button>
        </div>

        {/* 2. SYSTEM CONFIGURATION CARD */}
        <div className="flex-[1.5] min-w-[400px] bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <SettingsIcon size={20} className="text-sky-500" />
            <h2 className="m-0 text-base font-bold text-slate-900">System Configuration</h2>
          </div>

          {/* STANDARD PLAN */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-4 border rounded-xl bg-slate-50 border-slate-200">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-500" />
              <span className="text-sm font-bold text-slate-700">Standard Plan</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="number" value={standardDays} onChange={(e) => setStandardDays(e.target.value)} className="w-16 p-2 text-sm font-bold text-center transition-colors bg-white border rounded-lg outline-none border-slate-300 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                <span className="text-[13px] font-semibold text-slate-500">Days</span>
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <IndianRupee size={14} className="text-slate-500" />
                <input type="number" value={standardPrice} onChange={(e) => setStandardPrice(e.target.value)} className="w-20 p-2 text-sm font-bold text-center transition-colors bg-white border rounded-lg outline-none border-slate-300 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
              </div>
            </div>
          </div>

          {/* DOUBLE PLAN */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8 border rounded-xl bg-slate-50 border-slate-200">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-500" />
              <span className="text-sm font-bold text-slate-700">Double Plan</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="number" value={premiumDays} onChange={(e) => setPremiumDays(e.target.value)} className="w-16 p-2 text-sm font-bold text-center transition-colors bg-white border rounded-lg outline-none border-slate-300 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                <span className="text-[13px] font-semibold text-slate-500">Days</span>
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <IndianRupee size={14} className="text-slate-500" />
                <input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} className="w-20 p-2 text-sm font-bold text-center transition-colors bg-white border rounded-lg outline-none border-slate-300 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
              </div>
            </div>
          </div>

          <button onClick={handleUpdateConfig} className="w-full p-3.5 text-sm font-bold text-white transition-colors rounded-xl shadow-sm bg-sky-500 hover:bg-sky-600">
            Update Parameters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;