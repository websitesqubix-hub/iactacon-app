"use client";
import { useEffect, useState } from "react";
import { Home, Calendar, Star, FileText, User } from "lucide-react";

const menuSections = [
  {
    title: "Conference",
    items: [
      { icon: "📅", label: "Schedule", href: "/schedule" },
      { icon: "🎤", label: "Speakers", href: "/speakers" },
      { icon: "📄", label: "Abstract", href: "/abstract" },
      { icon: "🎓", label: "Workshop", href: "/workshop" },
      { icon: "🖼️", label: "E-Poster", href: "/eposter" },
      { icon: "⬇️", label: "Downloads", href: "/downloads" },
    ]
  },
  {
    title: "My Space",
    items: [
      { icon: "⭐", label: "My Activities", href: "/my-activities", gold: true },
      { icon: "🏆", label: "Quiz & Certificate", href: "/quiz", gold: true },
      { icon: "📊", label: "Presentation", href: "/presentation", gold: true },
      { icon: "🎬", label: "Session Clips", href: "/session-clips" },
      { icon: "🔍", label: "Lost & Found", href: "/lost-found" },
      { icon: "👤", label: "My Profile", href: "/profile" },
    ]
  },
  {
    title: "Venue & More",
    items: [
      { icon: "🏛️", label: "Venue", href: "/venue" },
      { icon: "🏨", label: "Accommodation", href: "/accommodation" },
      { icon: "🏭", label: "Industry", href: "/industry", gold: true },
      { icon: "🗺️", label: "Places to Go", href: "/places" },
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
                    <div style={{ fontSize:24, marginBottom:6 }}>{item.icon}</div>
                    <div style={{ color:"rgba(220,210,255,0.9)", fontSize:10, fontWeight:600, lineHeight:1.3 }}>{item.label}</div>
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