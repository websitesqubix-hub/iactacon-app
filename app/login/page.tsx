"use client";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/guest?id=${id}`);
      const data = await res.json();

      if (!res.ok || data.error || data.detail) {
        setError("Registration ID not found.");
        setLoading(false);
        return;
      }

      // Match phone number
      const inputPhone = phone.replace(/\s+/g, "");
      const storedPhone = data.phone_national_number || "";

      if (storedPhone !== inputPhone) {
        setError("Phone number does not match.");
        setLoading(false);
        return;
      }

      // Save full user profile to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
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
            placeholder="Phone Number (10 digits)"
            type="password"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <div className="login-bottom">
        <img src="/login-page-bottom.png" />
      </div>
    </div>
  );
}