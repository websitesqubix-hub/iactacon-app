"use client";

import { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    if (id === "demo" && phone === "1234") {
      localStorage.setItem("user", "demo");
      window.location.href = "/";
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="login-page">

      {/* TOP SECTION */}
      <div className="login-top">
        <h2 className="login-heading">IACTACON 2027 KOLKATA</h2>

        <div className="login-logos">
          <div className="logo-circle">
            <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
          </div>
          <div className="logo-circle">
            <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>
          </div>
        </div>
      </div>

      {/* CENTER CARD */}
      <div className="login-center">
        <div className="login-card">

          <input
            className="login-input"
            placeholder="Registration ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Phone Number"
            type="password"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="demo-text">
            Demo → ID: demo | Pass: 1234
          </p>

        </div>
      </div>

      {/* BOTTOM IMAGE */}
      <div className="login-bottom">
        <img src="/login-page-bottom.png" />
      </div>

    </div>
  );
}