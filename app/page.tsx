"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  FileText,
  MapPin,
  Download,
  Bell,
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState({ d: "--", h: "--", m: "--" });
  const [user, setUser] = useState<any>(null);

  // LOGIN CHECK
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(u));
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

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-box" style={{ textAlign: "center" }}>
          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"
            style={{ width: 50, margin: "auto" }}
          />
          <p style={{ marginTop: 10 }}>Loading...</p>
        </div>
      </div>
    );
  }

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

      <div className="container">

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

          <Tile icon={<Calendar size={18}/>} label="Today's Program" onClick={comingSoon}/>
          <Tile icon={<Users size={18}/>} label="Our Speakers" onClick={comingSoon}/>
          <Tile icon={<FileText size={18}/>} label="Scientific Program" onClick={comingSoon}/>
          <Tile icon={<Users size={18}/>} label="Attendees" onClick={comingSoon}/>

          <Tile icon={<Users size={18}/>} label="Invite Friend" onClick={comingSoon}/>
          <Tile icon={<MapPin size={18}/>} label="Venue Map" onClick={comingSoon}/>
          <Tile icon={<Download size={18}/>} label="Certificate" onClick={comingSoon}/>
          <Tile icon={<Bell size={18}/>} label="Quiz" onClick={comingSoon}/>

          <Tile icon={<Bell size={18}/>} label="Feedback" onClick={comingSoon}/>
          <Tile icon={<FileText size={18}/>} label="My Registration" onClick={comingSoon}/>
          <Tile icon={<MapPin size={18}/>} label="Route Map" onClick={comingSoon}/>
          <Tile icon={<FileText size={18}/>} label="Workshops" onClick={comingSoon}/>

        </div>

      </div>

      {/* POPUP */}
      {popup && (
        <div className="popup">
          <div className="popup-box">Coming Soon 🚀</div>
        </div>
      )}

    </div>
  );
}

function Tile({ icon, label, onClick }: any) {
  return (
    <div className="tile" onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
    </div>
  );
}