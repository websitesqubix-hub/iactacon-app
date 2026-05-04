"use client";
import { useEffect, useState } from "react";
import {
  Calendar, Users, FileText, MapPin,
  Home, User, Book, Building
} from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(u));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) return null;

  const statusClass =
    user.registration_status === "approved" ? "status-approved" :
    user.registration_status === "rejected" ? "status-rejected" :
    "status-pending";

  return (
    <div className="app-bg">

      {/* HEADER */}
      <div className="header">
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>
        <div>
          <div className="title">IACTACON 2027 KOLKATA</div>
          <div className="subtitle">Welcome, {user.name}</div>
        </div>
      </div>

      <div className="strip">SAFETY · SCIENCE · SKILL</div>

      <div className="container" style={{ paddingBottom: "80px" }}>

        {/* PROFILE CARD */}
        <div className="profile-card" style={{ marginTop: 16 }}>

          {/* PHOTO */}
          <div className="profile-photo">
            {user.photo_download_url ? (
              <img src={`/api/photo?id=${user.id}`} alt="Profile"/>
            ) : (
              <div className="profile-photo-placeholder">👤</div>
            )}
          </div>

          <div className="profile-name">{user.name}</div>
          <div className="profile-id">ID: {user.id}</div>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className={`status-badge ${statusClass}`}>
              {user.registration_status?.toUpperCase()}
            </span>
          </div>

          {/* PERSONAL INFO */}
          <div className="info-section">
            <div className="info-section-title">Personal Info</div>
            <div className="info-row">
              <span className="info-icon">📧</span>
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">📱</span>
              <span className="info-label">Phone</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">🏥</span>
              <span className="info-label">Institution</span>
              <span className="info-value">{user.institution}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">💼</span>
              <span className="info-label">Designation</span>
              <span className="info-value">{user.designation}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">📍</span>
              <span className="info-label">Location</span>
              <span className="info-value">{user.city}, {user.state}</span>
            </div>
          </div>

          {/* REGISTRATION INFO */}
          <div className="info-section" style={{ marginTop: 10 }}>
            <div className="info-section-title">Registration</div>
            <div className="info-row">
              <span className="info-icon">🎟</span>
              <span className="info-label">Type</span>
              <span className="info-value">{user.registration_type}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">👥</span>
              <span className="info-label">Category</span>
              <span className="info-value">{user.registration_category}</span>
            </div>
            {user.workshop && (
              <div className="info-row">
                <span className="info-icon">🔬</span>
                <span className="info-label">Workshop</span>
                <span className="info-value">{user.workshop}</span>
              </div>
            )}
            {user.registration_amount && (
              <div className="info-row">
                <span className="info-icon">💰</span>
                <span className="info-label">Amount</span>
                <span className="info-value">₹{user.registration_amount}</span>
              </div>
            )}
          </div>

        </div>

        {/* QUICK ACCESS */}
        <div className="section-header">
          <h2>Quick Access</h2>
          <div className="section-line"></div>
        </div>

        <div className="grid">
          <Tile icon={Calendar} label="Schedule" href="/schedule"/>
          <Tile icon={Users} label="Speakers" href="/speakers"/>
          <Tile icon={FileText} label="Abstract" href="/abstract"/>
          <Tile icon={MapPin} label="Venue" href="#"/>
          <Tile icon={Book} label="Scientific" href="#"/>
          <Tile icon={Building} label="Accommodation" href="#"/>
        </div>

        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <Nav icon={Home} label="Home" href="/" active />
        <Nav icon={Calendar} label="Schedule" href="/schedule"/>
        <Nav icon={FileText} label="Abstract" href="/abstract"/>
        <Nav icon={User} label="Profile" href="#"/>
      </div>

    </div>
  );
}

function Tile({ icon: Icon, label, href }: any) {
  return (
    <a href={href} className="tile">
      <div className="icon"><Icon size={22} /></div>
      <div className="label">{label}</div>
    </a>
  );
}

function Nav({ icon: Icon, label, href, active }: any) {
  return (
    <a href={href} className={`nav-item ${active ? "active" : ""}`}>
      <Icon size={18} />
      <div>{label}</div>
    </a>
  );
}