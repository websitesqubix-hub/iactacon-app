"use client";

import { useState } from "react";

export default function Login() {
  const [regId, setRegId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://iactacon2027.com/data/registrations.json");
    const data = await res.json();

    const user = data.find(
      (u: any) => u.reg_id === regId && u.phone === phone
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } else {
      setError("Invalid ID or Phone");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="w-full max-w-sm">

        {/* LOGOS (FIXED SIZE) */}
        <div className="flex items-center justify-center gap-3 mb-6">

          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"
            className="w-12 h-12 object-contain"
          />

          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"
            className="h-8 object-contain"
          />

        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">

          <h2 className="text-center text-lg font-semibold text-blue-900 mb-4">
            Delegate Login
          </h2>

          <input
            placeholder="Registration ID"
            value={regId}
            onChange={(e) => setRegId(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            type="password"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
          )}

        </div>

      </div>
    </div>
  );
}