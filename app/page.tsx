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
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState({ d: "--", h: "--", m: "--" });
  const [user, setUser] = useState<any>(null);

  // ✅ LOGIN CHECK
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(u));
    }
  }, []);

  // ✅ SERVICE WORKER
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  // ✅ SPLASH + COUNTDOWN
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);

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

  // ✅ SPLASH SCREEN (FIXED SIZE)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-3 animate-fadeIn">

          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg"
            className="w-14 h-14 object-contain"
          />

          <img
            src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg"
            className="h-6 object-contain"
          />

          <p className="text-blue-900 text-sm font-semibold">
            IACTACON 2027
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-28 overflow-y-auto">

      {/* HEADER */}
      <div className="bg-blue-900 text-white p-4 rounded-b-3xl shadow-md relative">

        <div className="flex items-center gap-3">
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg" className="h-10"/>
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/logo-2.jpeg" className="h-6"/>
        </div>

        <div className="mt-3">
          <p className="text-sm opacity-80">Welcome</p>
          <p className="text-lg font-semibold">{user?.name || "Delegate"}</p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="absolute top-4 right-4 bg-white text-blue-900 text-xs px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* COUNTDOWN */}
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">

          <div>
            <p className="text-xs text-gray-500">CONFERENCE COUNTDOWN</p>
            <p className="text-lg font-bold text-blue-900">
              {time.d} : {time.h} : {time.m}
            </p>
          </div>

          <a
            href="https://iactacon2027.com/registration"
            target="_blank"
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Register
          </a>

        </div>
      </div>

      {/* FULL GRID */}
      <div className="grid grid-cols-2 gap-4 p-4 mt-2">

        <Tile icon={Calendar} label="Today's Program" onClick={comingSoon}/>
        <Tile icon={Users} label="Our Speakers" onClick={comingSoon}/>
        <Tile icon={FileText} label="Scientific Program" onClick={comingSoon}/>
        <Tile icon={Users} label="Attendees" onClick={comingSoon}/>

        <Tile icon={Users} label="Invite Friend" onClick={comingSoon}/>
        <Tile icon={MapPin} label="Venue Map" onClick={comingSoon}/>
        <Tile icon={Download} label="Certificate" onClick={comingSoon}/>
        <Tile icon={Bell} label="Quiz" onClick={comingSoon}/>

        <Tile icon={Bell} label="Feedback" onClick={comingSoon}/>
        <Tile icon={FileText} label="My Registration" onClick={comingSoon}/>
        <Tile icon={MapPin} label="Route Map" onClick={comingSoon}/>
        <Tile icon={FileText} label="Workshops" onClick={comingSoon}/>

        <Tile icon={FileText} label="Downloads" onClick={comingSoon}/>
        <Tile icon={MapPin} label="Attractions" onClick={comingSoon}/>
        <Tile icon={FileText} label="Venue Layout" onClick={comingSoon}/>
        <Tile icon={Users} label="Exhibitors" onClick={comingSoon}/>

        <Tile icon={MapPin} label="Accommodation" onClick={comingSoon}/>
        <Tile icon={FileText} label="Lost & Found" onClick={comingSoon}/>

      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white px-6 py-3 rounded-lg shadow-lg font-semibold">
            Coming Soon 🚀
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <BottomNav />

    </div>
  );
}

function Tile({ icon: Icon, label, onClick }: any) {
  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-4 text-center transition hover:shadow-lg"
    >
      <Icon size={20} className="mx-auto mb-2 text-blue-900"/>
      <div className="text-xs font-medium text-gray-700">{label}</div>
    </motion.div>
  );
}