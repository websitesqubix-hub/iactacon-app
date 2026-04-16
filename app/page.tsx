"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  FileText,
  MapPin,
  Download,
  Bell,
  User,
  Navigation,
  Book,
  Building,
  Info,
} from "lucide-react";

export default function Home() {
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState({ d: "--", h: "--", m: "--" });

  useEffect(() => {
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

  return (
    <div className="app-bg">

      {/* HEADER */}
      <div className="header">
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>

        <div>
          <div className="title">IACTACON 2027</div>
          <div className="subtitle">
            30th National Conference · Kolkata
          </div>
        </div>
      </div>

      {/* STRIP */}
      <div className="strip">
        SAFETY · SCIENCE · SKILL
      </div>

      <div className="container pb-24">

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

          <Tile icon={Calendar} label="Today's Program" onClick={comingSoon}/>
          <Tile icon={Users} label="Our Speakers" onClick={comingSoon}/>
          <Tile icon={FileText} label="Scientific Program" onClick={comingSoon}/>
          <Tile icon={Users} label="Attendees" onClick={comingSoon}/>

          <Tile icon={User} label="Invite Friend" red onClick={comingSoon}/>
          <Tile icon={Book} label="Workshops" onClick={comingSoon}/>
          <Tile icon={Download} label="Download Certificate" red onClick={comingSoon}/>
          <Tile icon={Bell} label="Quiz" onClick={comingSoon}/>

          <Tile icon={FileText} label="Feedback" onClick={comingSoon}/>
          <Tile icon={User} label="My Registration" red onClick={comingSoon}/>
          <Tile icon={Navigation} label="Route Map to Venue" onClick={comingSoon}/>
          <Tile icon={MapPin} label="Parking Instructions" onClick={comingSoon}/>

          <Tile icon={Book} label="Note" onClick={comingSoon}/>
          <Tile icon={Download} label="Downloads" red onClick={comingSoon}/>
          <Tile icon={MapPin} label="Attractions" onClick={comingSoon}/>
          <Tile icon={Building} label="Venue Layout" onClick={comingSoon}/>

          <Tile icon={Users} label="Exhibitors" onClick={comingSoon}/>
          <Tile icon={MapPin} label="Accommodation & Travel" red onClick={comingSoon}/>
          <Tile icon={Info} label="Lost & Found" onClick={comingSoon}/>

        </div>

        {/* VENUE INFO */}
        <div className="info-card">
          <h3>Conference Details</h3>
          <div className="info-row">
            📍 Ozone Convention Centre, Fairfield Marriott, Kolkata
          </div>
          <div className="info-row">
            📅 19–21 February 2027
          </div>
          <div className="info-row">
            🧪 Theme: Safety · Science · Skill
          </div>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <NavItem icon={Calendar} label="Home" />
        <NavItem icon={Users} label="Speakers" />
        <NavItem icon={Bell} label="Alerts" />
        <NavItem icon={User} label="Profile" />
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

/* TILE */
function Tile({ icon: Icon, label, red, onClick }) {
  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`tile ${red ? "tile-red" : ""}`}
    >
      <div className={`icon ${red ? "icon-red" : ""}`}>
        <Icon size={18} />
      </div>
      <div className="label">{label}</div>
    </motion.div>
  );
}

/* NAV ITEM */
function NavItem({ icon: Icon, label }) {
  return (
    <div className="nav-item">
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}