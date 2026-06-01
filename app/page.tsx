"use client";
const icons: Record<string, string> = {
  "calendar": "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  "microphone": "M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8",
  "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  "school": "M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5",
  "layout": "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  "download": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  "star": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "award": "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  "presentation": "M2 3h20v14H2zM8 21h8M12 17v4",
  "video": "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  "search": "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  "user": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "building": "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  "bed": "M3 7v13M21 7v13M3 12h18M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4",
  "briefcase": "M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v4M10 14h4",
  "map-pin": "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
};

function IconSVG({ name, gold }: { name: string; gold?: boolean }) {
  const d = icons[name] || icons["star"];
  const color = gold ? "#d4af37" : "rgba(196,181,253,0.85)";
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d}/>
    </svg>
  );
}


import { useEffect, useState } from "react";
import { Home, Calendar, Star, FileText, User } from "lucide-react";

const menuSections = [
  {
    title: "Conference",
    items: [
      { icon: "calendar", label: "Schedule", href: "/schedule" },
      { icon: "microphone", label: "Speakers", href: "/speakers" },
      { icon: "file-text", label: "Abstract", href: "/abstract" },
      { icon: "school", label: "Workshop", href: "/workshop" },
      { icon: "layout", label: "E-Poster", href: "/eposter" },
      { icon: "download", label: "Downloads", href: "/downloads" },
    ]
  },
  {
    title: "My Space",
    items: [
      { icon: "star", label: "My Activities", href: "/my-activities", gold: true },
      { icon: "award", label: "Quiz & Cert.", href: "/quiz", gold: true },
      { icon: "presentation", label: "Presentation", href: "/presentation", gold: true },
      { icon: "video", label: "Session Clips", href: "/session-clips" },
      { icon: "search", label: "Lost & Found", href: "/lost-found" },
      { icon: "user", label: "My Profile", href: "/profile" },
    ]
  },
  {
    title: "Venue & More",
    items: [
      { icon: "building", label: "Venue", href: "/venue" },
      { icon: "bed", label: "Accommodation", href: "/accommodation" },
      { icon: "briefcase", label: "Industry", href: "/industry", gold: true },
      { icon: "map-pin", label: "Places to Go", href: "/places" },
    ]
  }
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("remembered_user");
    window.location.href = "/login";
  };

  if (!user) return null;

  const statusColor = user.registration_status === "approved" ? "#d4af37" :
    user.registration_status === "rejected" ? "#ef4444" : "#d4af37";

  return (
    <div style={{ background:"#1a0533", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif", paddingBottom:70, position:"relative" }}>

      {/* DOT GRID */}
      <div style={{ position:"fixed", inset:0, backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.08) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:0 }} />

      {/* HERO VIDEO */}
      <div style={{ position:"relative", width:"100%", height:220, overflow:"hidden" }}>
        <video autoPlay loop muted playsInline
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          src="https://iactacon2027.com/wp-content/uploads/2026/06/mp4.mp4"
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(26,5,51,0.25) 0%, rgba(26,5,51,0.55) 60%, #1a0533 100%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 16px 16px" }}>
          <div style={{ display:"inline-block", background:"rgba(212,175,55,0.2)", border:"1px solid rgba(212,175,55,0.5)", borderRadius:20, padding:"3px 12px", color:"#d4af37", fontSize:10, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" as const, marginBottom:6 }}>
            IACTACON 2027 · Kolkata
          </div>
          <div style={{ color:"white", fontSize:22, fontWeight:800, lineHeight:1.1 }}>
            30th National
          </div>
          <div style={{ fontSize:22, fontWeight:800, background:"linear-gradient(135deg,#d4af37,#f0d060)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.1, marginBottom:4 }}>
            Conference
          </div>
          <div style={{ color:"rgba(196,181,253,0.8)", fontSize:11 }}>
            19–21 Feb 2027 · Ozone Convention Centre, Newtown
          </div>
        </div>
      </div>

      {/* PROFILE STRIP */}
      <div style={{ margin:"0 12px", marginTop:-20, position:"relative", zIndex:2, background:"linear-gradient(135deg,rgba(124,58,237,0.35),rgba(99,102,241,0.2))", border:"1px solid rgba(212,175,55,0.35)", borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}
        onClick={() => setShowDetails(!showDetails)}>
        <div style={{ width:46, height:46, borderRadius:"50%", border:"2px solid #d4af37", background:"rgba(212,175,55,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
          {user.photo_download_url ? <img src={`/api/photo?id=${user.id}`} style={{ width:46, height:46, borderRadius:"50%", objectFit:"cover" }}/> : "👤"}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ color:"white", fontWeight:700, fontSize:14 }}>{user.name}</div>
          <div style={{ color:"rgba(196,181,253,0.6)", fontSize:10, fontFamily:"monospace" }}>
            {user.id || user.registration_id}
          </div>
        </div>
        <div style={{ background:"rgba(212,175,55,0.15)", border:"1px solid rgba(212,175,55,0.4)", borderRadius:20, padding:"3px 10px", color:"#d4af37", fontSize:10, fontWeight:600 }}>
          {user.registration_status?.toUpperCase() || "PENDING"}
        </div>
      </div>

      {/* PROFILE DETAILS DROPDOWN */}
      {showDetails && (
        <div style={{ margin:"8px 12px 0", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(212,175,55,0.2)", borderRadius:12, padding:14, position:"relative", zIndex:2 }}>
          {[
            { icon:"📧", label:"Email", value: user.email },
            { icon:"📱", label:"Phone", value: user.phone },
            { icon:"🏥", label:"Institution", value: user.institution },
            { icon:"🎟", label:"Type", value: user.registration_type },
            { icon:"👥", label:"Category", value: user.registration_category },
          ].filter(r => r.value).map((row, i) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"6px 0", borderBottom: i < 4 ? "1px solid rgba(167,139,250,0.1)" : "none", alignItems:"flex-start" }}>
              <span style={{ fontSize:14, minWidth:22 }}>{row.icon}</span>
              <span style={{ fontSize:11, color:"rgba(167,139,250,0.6)", minWidth:70 }}>{row.label}</span>
              <span style={{ fontSize:11, color:"#ede9fe", flex:1 }}>{row.value}</span>
            </div>
          ))}
          <button onClick={logout} style={{ marginTop:12, width:"100%", padding:"8px 0", background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, color:"#fca5a5", fontSize:12, fontWeight:600, cursor:"pointer" }}>
            Logout
          </button>
        </div>
      )}

      {/* MENU SECTIONS */}
      <div style={{ padding:"0 12px", position:"relative", zIndex:2 }}>
        {menuSections.map((section, si) => (
          <div key={si}>
            <div style={{ padding:"14px 2px 8px", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:"#d4af37", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase" as const }}>{section.title}</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(212,175,55,0.3),transparent)" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {section.items.map((item, ii) => (
                <a key={ii} href={item.href} style={{ textDecoration:"none" }}>
                  <div style={{
                    background: item.gold ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${item.gold ? "rgba(212,175,55,0.35)" : "rgba(167,139,250,0.2)"}`,
                    borderRadius:14, padding:"14px 8px", textAlign:"center", cursor:"pointer",
                  }}>
                    <IconSVG name={item.icon} gold={item.gold} />
                    <div style={{ color:"rgba(220,210,255,0.9)", fontSize:10, fontWeight:600, lineHeight:1.3, marginTop:6 }}>{item.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(26,5,51,0.97)", borderTop:"1px solid rgba(212,175,55,0.2)", display:"flex", justifyContent:"space-around", padding:"8px 0 12px", zIndex:20 }}>
        {[
          { icon: <Home size={18}/>, label:"Home", href:"/" },
          { icon: <Calendar size={18}/>, label:"Schedule", href:"/schedule" },
          { icon: <Star size={18}/>, label:"Wishlist", href:"/my-activities" },
          { icon: <FileText size={18}/>, label:"Abstract", href:"/abstract" },
          { icon: <User size={18}/>, label:"Profile", href:"/profile" },
        ].map((n, i) => (
          <a key={i} href={n.href} style={{ textDecoration:"none", textAlign:"center", color: i===0 ? "#d4af37" : "rgba(167,139,250,0.6)", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            {n.icon}
            <span style={{ fontSize:9, fontWeight:600 }}>{n.label}</span>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}