"use client";
import { useEffect, useState } from "react";
import { Calendar, Users, FileText, MapPin, Home, User, Book, Building } from "lucide-react";

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

        {/* FULL PROFILE CARD */}
        <div className="info-card">
          <h3>Registration Details</h3>
          {user.photo_download_url && (
            <img src={`/api/photo?id=${user.id}`} 
              style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 8 }}/>
          )}
          <div className="info-row">📧 {user.email}</div>
          <div className="info-row">📱 {user.phone}</div>
          <div className="info-row">🏥 {user.institution}</div>
          <div className="info-row">📍 {user.city}, {user.state}</div>
          <div className="info-row">🎟 {user.registration_type}</div>
          <div className="info-row">👥 {user.registration_category}</div>
          <div className="info-row">📌 Status: <strong>{user.registration_status}</strong></div>
        </div>

        <div className="grid">
          <Tile icon={Calendar} label="Schedule"/>
          <Tile icon={Users} label="Speakers"/>
          <Tile icon={FileText} label="Abstract"/>
          <Tile icon={MapPin} label="Venue"/>
          <Tile icon={Book} label="Scientific"/>
          <Tile icon={Building} label="Accommodation"/>
        </div>

        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="bottom-nav">
        <Nav icon={Home} label="Home" active />
        <Nav icon={Calendar} label="Schedule" />
        <Nav icon={Users} label="Speakers" />
        <Nav icon={User} label="Profile" />
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label }: any) {
  return (
    <div className="tile">
      <div className="icon"><Icon size={18} /></div>
      <div className="label">{label}</div>
    </div>
  );
}

function Nav({ icon: Icon, label, active }: any) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`}>
      <Icon size={16} />
      <div>{label}</div>
    </div>
  );
}