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
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState({ d: "--", h: "--", m: "--" });

  // ✅ SERVICE WORKER (CORRECT PLACE)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  // ✅ COUNTDOWN
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);

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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-800 to-blue-950 text-white">
        <div className="text-center animate-pulse">
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg" className="h-16 mx-auto mb-3" />
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg" className="h-10 mx-auto mb-4" />
          <p className="text-lg font-semibold">IACTACON 2027</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">

      <div className="header">
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"/>
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"/>
        <div>
          <div className="title">IACTACON 2027</div>
          <div className="subtitle">30th National Conference · Kolkata</div>
        </div>
      </div>

      <div className="strip">SAFETY · SCIENCE · SKILL</div>

      <div className="container pb-24">

        <div className="countdown">
          <div>
            <div className="cd-label">CONFERENCE COUNTDOWN</div>
            <div className="cd-time">
              {time.d} : {time.h} : {time.m}
            </div>
          </div>

          <a href="https://iactacon2027.com/registration" target="_blank" className="btn">
            REGISTER
          </a>
        </div>

        <div className="grid">
          <Tile icon={Calendar} label="Today's Program" onClick={comingSoon}/>
          <Tile icon={Users} label="Our Speakers" onClick={comingSoon}/>
          <Tile icon={FileText} label="Scientific Program" onClick={comingSoon}/>
          <Tile icon={Users} label="Attendees" onClick={comingSoon}/>
        </div>

      </div>

      {popup && (
        <div className="popup">
          <div className="popup-box">Coming Soon 🚀</div>
        </div>
      )}

    </div>
  );
}

function Tile({ icon: Icon, label, onClick }) {
  return (
    <motion.div whileTap={{ scale: 0.92 }} onClick={onClick} className="tile">
      <Icon size={18} />
      <div>{label}</div>
    </motion.div>
  );
}