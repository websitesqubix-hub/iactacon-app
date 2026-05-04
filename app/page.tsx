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

        {/* PROFILE PHOTO */}
        {user.photo_download_url && (
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <img
              src={`/api/photo?id=${user.id}`}
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #4f46e5"
              }}
            />
          </div>
        )}

        {/* REGISTRATION DETAILS */}
        <div className="info-card">
          <h3>Registration Details</h3>
          <div className="info-row">🪪 ID: {user.id}</div>
          <div className="info-row">👤 {user.name}</div>
          <div className="info-row">📧 {user.email}</div>
          <div className="info-row">📱 {user.phone}</div>
          <div className="info-row">🏥 {user.institution}</div>
          <div className="info-row">💼 {user.designation}</div>
          <div className="info-row">📍 {user.city}, {user.state}, {user.country}</div>
          <div className="info-row">🎟 {user.registration_type}</div>
          <div className="info-row">👥 {user.registration_category}</div>
          <div className="info-row">
            📌 Status:{" "}
            <strong style={{
              color:
                user.registration_status === "approved" ? "green" :
                user.registration_status === "rejected" ? "red" : "orange"
            }}>
              {user.registration_status?.toUpperCase()}
            </strong>
          </div>
          {user.workshop && (
            <div className="info-row">🔬 Workshop: {user.workshop}</div>
          )}
          {user.registration_amount && (
            <div className="info-row">💰 Amount: ₹{user.registration_amount}</div>
          )}
        </div>

        {/* NAVIGATION GRID */}
        <div className="grid">
          <Tile icon={Calendar} label="Schedule" href="/schedule"/>
          <Tile icon={Users} label="Speakers" href="/speakers"/>
          <Tile icon={FileText} label="Abstract" href="#"/>
          <Tile icon={MapPin} label="Venue" href="#"/>
          <Tile icon={Book} label="Scientific" href="#"/>
          <Tile icon={Building} label="Accommodation" href="#"/>
        </div>

        {/* LOGOUT */}
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <Nav icon={Home} label="Home" href="/" active />
        <Nav icon={Calendar} label="Schedule" href="/schedule"/>
        <Nav icon={Users} label="Speakers" href="/speakers"/>
        <Nav icon={User} label="Profile" href="#"/>
      </div>

    </div>
  );
}

function Tile({ icon: Icon, label, href }: any) {
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div className="tile">
        <div className="icon"><Icon size={18} /></div>
        <div className="label">{label}</div>
      </div>
    </a>
  );
}

function Nav({ icon: Icon, label, href, active }: any) {
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div className={`nav-item ${active ? "active" : ""}`}>
        <Icon size={16} />
        <div>{label}</div>
      </div>
    </a>
  );
}