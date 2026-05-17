import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

// Login.jsx ke andar handleLogin function ko update karein:
const handleLogin = async () => {
    try {
      setLoading(true);

      // ✅ Exact wahi URL path jo aapne mujhe diya hai
      const res = await API.post("/admin/login", form); 

      // Backend response se token aur role nikalna
      const { accessToken, role } = res.data.data;

      // LocalStorage mein save karna
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);

      navigate("/"); // Login ke baad Dashboard pe bhej do
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="w-full max-w-md p-10 bg-white shadow-md rounded-xl">
        
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-3xl font-bold text-slate-800">
            <span className="text-orange-600">Rent</span>8
          </div>
          <h2 className="text-lg font-semibold text-slate-600">
            Sign in to your account
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-5">
          
          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="admin@rent8.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-medium text-slate-700">Password</label>
              <span className="text-sm text-orange-600 cursor-pointer">
                Forgot?
              </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition bg-orange-600 rounded-md hover:bg-orange-700"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </div>

        <div className="mt-6 text-sm text-center text-slate-500">
          Admin access only
        </div>
      </div>
    </div>
  );
}