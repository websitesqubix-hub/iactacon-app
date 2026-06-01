"use client";
import { useState, useEffect } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("remembered_user");
    if (saved) { localStorage.setItem("user", saved); window.location.href = "/"; }
    const savedId = localStorage.getItem("remembered_id");
    const savedPhone = localStorage.getItem("remembered_phone");
    if (savedId) setId(savedId);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!id || !phone) { setError("Please enter both fields."); return; }
    setLoading(true);
    try {
      const res = await fetch(`https://iactacon2027.com/wp-json/iacta/v1/lookup?reg_id=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`);
      const lookup = await res.json();
      if (!res.ok || lookup.error) {
        setError(lookup.error === "Phone does not match" ? "Phone number does not match." : "Registration ID not found.");
        setLoading(false); return;
      }
      let userData = null;
      if (lookup.guest_id) {
        const gr = await fetch(`/api/guest?id=${lookup.guest_id}`);
        const gd = await gr.json();
        if (gr.ok && gd.id) userData = gd;
      }
      if (!userData) userData = { id: lookup.registration_id, name: lookup.name, phone: lookup.phone, email: lookup.email, registration_status: lookup.status === "verified" ? "approved" : lookup.status, registration_id: lookup.registration_id };
      localStorage.setItem("user", JSON.stringify(userData));
      if (remember) { localStorage.setItem("remembered_user", JSON.stringify(userData)); localStorage.setItem("remembered_id", id); localStorage.setItem("remembered_phone", phone); }
      window.location.href = "/";
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"#1a0533", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"system-ui, -apple-system, sans-serif", position:"relative", overflow:"hidden" }}>

      {/* DOT GRID */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.12) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:400, height:400, background:"radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      {/* CORNER ACCENTS */}
      {[
        { top:16, left:16, borderTop:"1.5px solid rgba(167,139,250,0.4)", borderLeft:"1.5px solid rgba(167,139,250,0.4)", borderRadius:"6px 0 0 0" },
        { top:16, right:16, borderTop:"1.5px solid rgba(167,139,250,0.4)", borderRight:"1.5px solid rgba(167,139,250,0.4)", borderRadius:"0 6px 0 0" },
      ].map((s,i) => <div key={i} style={{ position:"absolute", width:60, height:60, pointerEvents:"none", zIndex:1, ...s }} />)}

      {/* TOP SECTION */}
      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 20px 0", width:"100%", maxWidth:400 }}>

        {/* BADGE */}
        <div style={{ background:"rgba(147,51,234,0.25)", border:"1px solid rgba(167,139,250,0.4)", borderRadius:20, padding:"4px 14px", color:"#c4b5fd", fontSize:10, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>
          30th National Conference
        </div>

        {/* LOGO */}
        <div style={{ position:"relative", width:90, height:90, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
          <div style={{ position:"absolute", width:90, height:90, borderRadius:"50%", border:"1px solid rgba(167,139,250,0.25)", animation:"spin 20s linear infinite" }} />
          <div style={{ position:"absolute", width:74, height:74, borderRadius:"50%", border:"1px dashed rgba(167,139,250,0.2)", animation:"spin-rev 15s linear infinite" }} />
          <svg style={{ position:"absolute", width:90, height:90 }} viewBox="0 0 90 90">
            <circle cx="45" cy="2" r="2" fill="#a78bfa" opacity="0.8"/>
            <circle cx="88" cy="45" r="2" fill="#a78bfa" opacity="0.8"/>
            <circle cx="45" cy="88" r="2" fill="#a78bfa" opacity="0.8"/>
            <circle cx="2" cy="45" r="2" fill="#a78bfa" opacity="0.8"/>
          </svg>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"2px solid rgba(167,139,250,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2, overflow:"hidden" }}>
            <img src="https://iactacon2027.com/wp-content/uploads/2026/05/iacta-site-logo.jpeg" alt="IACTA" style={{ width:52, height:52, objectFit:"cover", borderRadius:"50%" }} />
          </div>
        </div>

        {/* TITLE */}
        <div style={{ fontSize:9, color:"#a78bfa", letterSpacing:3, textTransform:"uppercase", fontWeight:600, marginBottom:4 }}>Official Conference App</div>
        <div style={{ fontSize:30, fontWeight:800, color:"#ffffff", letterSpacing:1, lineHeight:1 }}>IACTACON</div>
        <div style={{ fontSize:30, fontWeight:800, background:"linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:6 }}>2027 · Kolkata</div>
        <div style={{ width:40, height:1.5, background:"linear-gradient(90deg, transparent, #a78bfa, transparent)", marginBottom:8 }} />

        {/* DATES ROW */}
        <div style={{ display:"flex", gap:0, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:12, overflow:"hidden", marginBottom:16, width:"100%" }}>
          <div style={{ flex:1, textAlign:"center", padding:"8px 0" }}>
            <div style={{ fontSize:9, color:"#a78bfa", textTransform:"uppercase", letterSpacing:1, fontWeight:600, marginBottom:2 }}>Workshop</div>
            <div style={{ fontSize:12, color:"#ede9fe", fontWeight:700 }}>18 Feb 2027</div>
          </div>
          <div style={{ width:1, background:"rgba(167,139,250,0.25)" }} />
          <div style={{ flex:1, textAlign:"center", padding:"8px 0" }}>
            <div style={{ fontSize:9, color:"#a78bfa", textTransform:"uppercase", letterSpacing:1, fontWeight:600, marginBottom:2 }}>Conference</div>
            <div style={{ fontSize:12, color:"#ede9fe", fontWeight:700 }}>19–21 Feb 2027</div>
          </div>
          <div style={{ width:1, background:"rgba(167,139,250,0.25)" }} />
          <div style={{ flex:1, textAlign:"center", padding:"8px 0" }}>
            <div style={{ fontSize:9, color:"#a78bfa", textTransform:"uppercase", letterSpacing:1, fontWeight:600, marginBottom:2 }}>Venue</div>
            <div style={{ fontSize:12, color:"#ede9fe", fontWeight:700 }}>Ozone, Newtown</div>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(167,139,250,0.25)", borderRadius:18, padding:"18px 16px 14px", marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#ede9fe", marginBottom:2, textAlign:"center" }}>Welcome</div>
          <div style={{ fontSize:11, color:"#a78bfa", textAlign:"center", marginBottom:14 }}>Sign in with your registration credentials</div>

          <div style={{ marginBottom:10 }}>
            <label style={{ display:"block", fontSize:10, fontWeight:600, color:"#c4b5fd", marginBottom:4, letterSpacing:0.5 }}>REGISTRATION ID</label>
            <input value={id} onChange={e => setId(e.target.value.toUpperCase())} placeholder="e.g. IACTACON-0162"
              style={{ width:"100%", padding:"10px 12px", background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.3)", borderRadius:8, color:"#ede9fe", fontSize:13, outline:"none", fontFamily:"system-ui" }} />
          </div>

          <div style={{ marginBottom:10 }}>
            <label style={{ display:"block", fontSize:10, fontWeight:600, color:"#c4b5fd", marginBottom:4, letterSpacing:0.5 }}>PHONE NUMBER</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile number" type="tel"
              style={{ width:"100%", padding:"10px 12px", background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.3)", borderRadius:8, color:"#ede9fe", fontSize:13, outline:"none", fontFamily:"system-ui" }} />
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div onClick={() => setRemember(!remember)} style={{ width:16, height:16, borderRadius:4, border:`1.5px solid ${remember?"#a78bfa":"rgba(167,139,250,0.4)"}`, background:remember?"rgba(167,139,250,0.3)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
              {remember && <span style={{ color:"#a78bfa", fontSize:11, lineHeight:1 }}>✓</span>}
            </div>
            <span style={{ fontSize:11, color:"#c4b5fd", cursor:"pointer" }} onClick={() => setRemember(!remember)}>Keep me signed in</span>
          </div>

          {error && <div style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:"7px 12px", color:"#fca5a5", fontSize:11, marginBottom:10 }}>⚠️ {error}</div>}

          <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:12, background:loading?"rgba(124,58,237,0.5)":"linear-gradient(135deg, #7c3aed, #6366f1)", border:"none", borderRadius:10, color:"white", fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", letterSpacing:0.5 }}>
            {loading ? "Signing in..." : "Login →"}
          </button>
        </div>
      </div>

      {/* VIDEO FOOTER */}
      <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:400, borderRadius:"16px 16px 0 0", overflow:"hidden", flexShrink:0 }}>
        <video autoPlay loop muted playsInline
          style={{ width:"100%", height:200, objectFit:"cover", display:"block" }}
          src="https://iactacon2027.com/wp-content/uploads/2026/06/Watercolour-sketch-art-scene-with-iconic-bridge-historic-buildings-yellow-taxi-cab-and-tram-by-the-waterfront-soft-painted-textures-artistic-brushstrokes-dreamy-atmospheric-quality.mp4"
        />
        {/* Overlay gradient top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:60, background:"linear-gradient(to bottom, #1a0533, transparent)" }} />
        {/* Caption */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent, rgba(26,5,51,0.85))", padding:"20px 16px 12px" }}>
          <div style={{ color:"white", fontSize:11, fontWeight:600 }}>📍 Kolkata — City of Joy</div>
          <div style={{ color:"rgba(196,181,253,0.7)", fontSize:10, marginTop:2 }}>Venue of IACTACON 2027</div>
        </div>
        {/* Credit */}
        <div style={{ position:"absolute", bottom:8, right:12, fontSize:9, color:"rgba(167,139,250,0.5)", textAlign:"right" }}>
          Designed with <span style={{ color:"#f472b6" }}>♥</span> by <span style={{ color:"rgba(196,181,253,0.6)", fontWeight:600 }}>Qubix Infosystems</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        input::placeholder { color: rgba(167,139,250,0.35) !important; }
        input:focus { border-color: rgba(167,139,250,0.6) !important; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}