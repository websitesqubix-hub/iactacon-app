"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  FileText,
  MapPin,
  Download,
  Bell,
  Book,
  Building,
  User
} from "lucide-react"; // ❌ Home REMOVED

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState({ d: "--", h: "--", m: "--" });
  const [activeTab, setActiveTab] = useState("home");

  // LOGIN CHECK
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      window.location.href = "/login";
    }
  }, []);

  // COUNTDOWN
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const target = new Date("2027-02-19T09:00:00");

    const update = () => {
      const diff = target.getTime() - new Date().getTime();

      if (diff > 0) {
        setTime({
          d: Math.floor(diff / 86400000),
          h: Math.floor((diff % 86400000) / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
        });
      }
    };

    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  const comingSoon = () => {
    setPopup(true);
    setTimeout(() => setPopup(false), 1200);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) return null;

  return (
    <div className="app-bg">

      {/* HEADER */}
      <div className="header">
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>
        <div>
          <div className="title">IACTACON 2027</div>
          <div className="subtitle">30th National Conference · Kolkata</div>
        </div>
      </div>

      <div className="strip">SAFETY · SCIENCE · SKILL</div>

      <div className="container" style={{ paddingBottom: "80px" }}>

        {/* COUNTDOWN */}
        <div className="countdown">
          <div>
            <div className="cd-label">CONFERENCE COUNTDOWN</div>
            <div className="cd-time">
              {time.d} : {time.h} : {time.m}
            </div>
          </div>

          <a
            href="https://iactacon2027.com/registration"
            target="_blank"
            className="btn"
          >
            REGISTER
          </a>
        </div>

        {/* GRID */}
        <div className="grid">

          <Tile label="Today's Program" onClick={comingSoon}/>
          <Tile label="Our Speakers" onClick={comingSoon}/>
          <Tile label="Scientific Program" onClick={comingSoon}/>
          <Tile label="Attendees" onClick={comingSoon}/>

          <Tile label="Invite Friend" onClick={comingSoon}/>
          <Tile label="Venue Map" onClick={comingSoon}/>
          <Tile label="Certificate" onClick={comingSoon}/>
          <Tile label="Quiz" onClick={comingSoon}/>

          <Tile label="Abstract" onClick={comingSoon}/>
          <Tile label="Accommodation" onClick={comingSoon}/>
          <Tile label="Feedback" onClick={comingSoon}/>
          <Tile label="My Registration" onClick={comingSoon}/>

        </div>

        {/* LOGOUT */}
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>

      </div>

      {/* POPUP */}
      {popup && (
        <div className="popup">
          <div className="popup-box">Coming Soon 🚀</div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <Nav label="Home" active={activeTab==="home"} onClick={()=>setActiveTab("home")}/>
        <Nav label="Schedule" onClick={comingSoon}/>
        <Nav label="Speakers" onClick={comingSoon}/>
        <Nav label="Profile" onClick={comingSoon}/>
      </div>

    </div>
  );
}

/* TILE */
function Tile({ label, onClick }: any) {
  return (
    <div className="tile" onClick={onClick}>
      <div className="label">{label}</div>
    </div>
  );
}

/* NAV */
function Nav({ label, active, onClick }: any) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <div>{label}</div>
    </div>
  );
}