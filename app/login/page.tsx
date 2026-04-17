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
    <div className="login-container">
      <div className="login-box">

        <div className="login-logos">
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>
        </div>

        <div className="login-card">

          <div className="login-title">Delegate Login</div>

          <input
            className="login-input"
            placeholder="Registration ID"
            value={regId}
            onChange={(e) => setRegId(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        </div>
      </div>
    </div>
  );
}