"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 px-4">

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
      >
        {/* Logos */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"
            className="h-12 mb-2"
          />
          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"
            className="h-6"
          />
        </div>

        <h2 className="text-center text-lg font-semibold text-blue-900 mb-4">
          Delegate Login
        </h2>

        {/* Inputs */}
        <input
          placeholder="Registration ID"
          value={regId}
          onChange={(e) => setRegId(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          type="password"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {error && (
          <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          Use Registration ID & Phone Number
        </p>
      </motion.div>
    </div>
  );
}