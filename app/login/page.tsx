"use client";
import { useState } from "react";

export default function Login() {
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!dob || !phone) {
      setError("Please enter both Date of Birth and Phone Number.");
      return;
    }

    setLoading(true);

    try {
      // Search by phone number
      const cleanPhone = phone.replace(/\s+/g, "").replace(/^(\+91|91)/, "");

      const res = await fetch(`/api/guest?phone=${cleanPhone}`);
      const data = await res.json();

      if (!res.ok || data.error || data.detail) {
        setError("No registration found for this phone number.");
        setLoading(false);
        return;
      }

      // Match Date of Birth
      const storedDob = data.date_of_birth || "";
      if (storedDob !== dob) {
        setError("Date of Birth does not match.");
        setLoading(false);
        return;
      }

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

          <label className="login-label">Phone Number</label>
          <input
            className="login-input"
            placeholder="10-digit mobile number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="login-label">Date of Birth</label>
          <input
            className="login-input"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {error && (
            <p style={{ color: "red", fontSize: "13px", margin: "4px 0" }}>
              {error}
            </p>
          )}

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
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