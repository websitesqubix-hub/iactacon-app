"use client";
import { useState, useEffect } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotDob, setForgotDob] = useState("");
  const [forgotResult, setForgotResult] = useState<any>(null);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

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
      let userData: any = null;
      if (lookup.guest_id) {
        const gr = await fetch(`/api/guest?id=${lookup.guest_id}`);
        const gd = await gr.json();
        if (gr.ok && gd.id) userData = gd;
      }
      if (!userData) userData = { id: lookup.registration_id, name: lookup.name, phone: lookup.phone, email: lookup.email, registration_status: lookup.status === "verified" ? "approved" : lookup.status, registration_id: lookup.registration_id };
      localStorage.setItem("user", JSON.stringify(userData));
      if (remember) { localStorage.setItem("remembered_user", JSON.stringify(userData)); localStorage.setItem("remembered_id", id); localStorage.setItem("remembered_phone", phone); }
      window.location.href = "/";
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  const handleForgot = async () => {
    setForgotError(""); setForgotResult(null);
    if (!forgotPhone || !forgotDob) { setForgotError("Please enter both phone and date of birth."); return; }
    setForgotLoading(true);
    try {
      const res = await fetch(`https://iactacon2027.com/wp-json/iacta/v1/find?phone=${encodeURIComponent(forgotPhone)}&dob=${encodeURIComponent(forgotDob)}`);
      const data = await res.json();
      if (data.registration_id) setForgotResult(data);
      else setForgotError("No registration found for this phone and date of birth.");
    } catch { setForgotError("Something went wrong."); }
    setForgotLoading(false);
  };

  const inputBox = { display:"flex", alignItems:"center", gap:8, background:"#f8f4ee", border:"1.5px solid rgba(91,143,168,0.25)", borderRadius:10, padding:"10px 12px" } as any;
  const labelStyle = { display:"block", fontSize:10, fontWeight:700, color:"#3d6b82", marginBottom:5, letterSpacing:"0.5px", textTransform:"uppercase" } as any;
  const inputStyle = { flex:1, border:"none", background:"transparent", fontSize:13, color:"#1a3a5c", outline:"none", fontFamily:"system-ui" } as any;

  return (
    <div style={{ background:"#fdf6ec", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif", display:"flex", flexDirection:"column" }}>

      {/* HERO */}
      <div style={{ position:"relative", background:"linear-gradient(150deg,#1a3a5c 0%,#3d6b82 60%,#5b8fa8 100%)", padding:"28px 20px 44px", overflow:"hidden", flexShrink:0 }}>
        <video autoPlay loop muted playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.18, pointerEvents:"none", zIndex:0 }} src="https://iactacon2027.com/wp-content/uploads/2026/06/Watercolour-sketch-art-scene-with-iconic-bridge-historic-buildings-yellow-taxi-cab-and-tram-by-the-waterfront-soft-painted-textures-artistic-brushstrokes-dreamy-atmospheric-quality.mp4"/>
        <div style={{ position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.3)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:-10, right:-10, width:86, height:86, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.15)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:30, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%) rotate(45deg)", width:12, height:12, background:"#c9a84c", pointerEvents:"none" }}/>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", position:"relative", zIndex:1 }}>
          <div style={{ position:"relative", width:90, height:90, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
            <div style={{ position:"absolute", width:90, height:90, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.3)", animation:"spin 20s linear infinite" }}/>
            <div style={{ position:"absolute", width:74, height:74, borderRadius:"50%", border:"1px dashed rgba(201,168,76,0.2)", animation:"spin-rev 15s linear infinite" }}/>
            <svg style={{ position:"absolute", width:90, height:90 }} viewBox="0 0 90 90">
              <circle cx="45" cy="2" r="2.5" fill="#c9a84c" opacity="0.8"/>
              <circle cx="88" cy="45" r="2.5" fill="#c9a84c" opacity="0.8"/>
              <circle cx="45" cy="88" r="2.5" fill="#c9a84c" opacity="0.8"/>
              <circle cx="2" cy="45" r="2.5" fill="#c9a84c" opacity="0.8"/>
            </svg>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"2px solid rgba(201,168,76,0.5)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", zIndex:2 }}>
              <img src="https://iactacon2027.com/wp-content/uploads/2026/05/iacta-site-logo.jpeg" alt="IACTA" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }}/>
            </div>
          </div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", letterSpacing:3, textTransform:"uppercase" as const, marginBottom:4 }}>Official Conference App</div>
          <div style={{ fontSize:24, fontWeight:800, color:"white", letterSpacing:1, lineHeight:1 }}>IACTACON</div>
          <div style={{ fontSize:24, fontWeight:800, background:"linear-gradient(135deg,#c9a84c,#f0d060)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:6 }}>2027</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", textAlign:"center", maxWidth:220, lineHeight:1.5 }}>Indian Association of Cardiovascular Thoracic Anaesthesiologists</div>
        </div>
      </div>

      {/* DATES BAR */}
      <div style={{ display:"flex", background:"#1a3a5c", flexShrink:0 }}>
        {[{l:"Workshop",v:"18 Feb 2027"},{l:"Conference",v:"19-21 Feb"},{l:"Venue",v:"Ozone, Kolkata"}].map((d,i) => (
          <div key={i} style={{ flex:1, textAlign:"center", padding:"8px 0", borderRight:i<2?"1px solid rgba(255,255,255,0.1)":"none" }}>
            <div style={{ fontSize:8, color:"#c9a84c", fontWeight:700, textTransform:"uppercase" as const, letterSpacing:1 }}>{d.l}</div>
            <div style={{ fontSize:11, color:"white", fontWeight:700, marginTop:1 }}>{d.v}</div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex:1, padding:16, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>

        {/* LOGIN CARD */}
        <div style={{ background:"white", borderRadius:18, padding:"0 16px 16px", border:"1px solid rgba(201,168,76,0.2)", boxShadow:"0 4px 20px rgba(91,143,168,0.1)", overflow:"hidden" }}>
          <div style={{ height:3, background:"linear-gradient(90deg,#5b8fa8,#c9a84c,#5b8fa8)", marginBottom:14, marginLeft:-16, marginRight:-16 }}/>
          <div style={{ textAlign:"center", marginBottom:14 }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#1a3a5c" }}>Welcome Back</div>
            <div style={{ fontSize:11, color:"#7a8a99", marginTop:2 }}>Sign in with your registration credentials</div>
          </div>
          <div style={{ marginBottom:10 }}>
            <label style={labelStyle}>Registration ID</label>
            <div style={inputBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b8fa8" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              <input value={id} onChange={e => setId(e.target.value.toUpperCase())} placeholder="e.g. IACTACON-0162" style={inputStyle}/>
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={labelStyle}>Phone Number</label>
            <div style={inputBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b8fa8" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile number" type="tel" style={inputStyle}/>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <div onClick={() => setRemember(!remember)} style={{ width:16, height:16, borderRadius:4, border:`1.5px solid ${remember?"#5b8fa8":"rgba(91,143,168,0.4)"}`, background:remember?"rgba(91,143,168,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
              {remember && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b8fa8" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
            </div>
            <span style={{ fontSize:11, color:"#5b8fa8", fontWeight:500, cursor:"pointer" }} onClick={() => setRemember(!remember)}>Keep me signed in</span>
          </div>
          {error && <div style={{ background:"#ffebee", border:"1px solid #ffcdd2", borderRadius:8, padding:"8px 12px", color:"#c62828", fontSize:11, marginBottom:12 }}>⚠️ {error}</div>}
          <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:13, background:"linear-gradient(135deg,#1a3a5c,#3d6b82)", border:"none", borderRadius:12, color:"white", fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", position:"relative", overflow:"hidden" as const }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)" }}/>
            {loading ? "Signing in..." : "Login →"}
          </button>
        </div>

        {/* FORGOT REG ID */}
        <div style={{ background:"white", borderRadius:14, border:"1px solid rgba(201,168,76,0.2)", boxShadow:"0 2px 12px rgba(91,143,168,0.08)", overflow:"hidden" }}>
          <div style={{ height:2, background:"linear-gradient(90deg,#c9a84c,#f0d060,#c9a84c)" }}/>
          <div style={{ padding:"12px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }} onClick={() => setShowForgot(!showForgot)}>
            <div style={{ width:36, height:36, borderRadius:10, background:"#fff8e1", border:"1px solid rgba(201,168,76,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#1a3a5c" }}>Forgot Registration ID?</div>
              <div style={{ fontSize:10, color:"#7a8a99", marginTop:1 }}>Find your ID using phone and date of birth</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" style={{ transform:showForgot?"rotate(90deg)":"rotate(0deg)", transition:"0.2s" }}><polyline points="9,18 15,12 9,6"/></svg>
          </div>
          {showForgot && (
            <div style={{ padding:"0 16px 16px", borderTop:"1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ marginTop:12, marginBottom:10 }}>
                <label style={labelStyle}>Phone Number</label>
                <input value={forgotPhone} onChange={e => setForgotPhone(e.target.value)} placeholder="Registered phone number" type="tel" style={{ width:"100%", padding:"10px 12px", background:"#f8f4ee", border:"1.5px solid rgba(91,143,168,0.25)", borderRadius:10, color:"#1a3a5c", fontSize:13, outline:"none", fontFamily:"system-ui" }}/>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={labelStyle}>Date of Birth</label>
                <input value={forgotDob} onChange={e => setForgotDob(e.target.value)} type="date" style={{ width:"100%", padding:"10px 12px", background:"#f8f4ee", border:"1.5px solid rgba(91,143,168,0.25)", borderRadius:10, color:"#1a3a5c", fontSize:13, outline:"none", fontFamily:"system-ui" }}/>
              </div>
              {forgotError && <div style={{ background:"#ffebee", border:"1px solid #ffcdd2", borderRadius:8, padding:"7px 12px", color:"#c62828", fontSize:11, marginBottom:10 }}>⚠️ {forgotError}</div>}
              {forgotResult && (
                <div style={{ background:"#e8f5e9", border:"1px solid #a5d6a7", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
                  <div style={{ fontSize:11, color:"#2e7d32", fontWeight:700 }}>Registration Found!</div>
                  <div style={{ fontSize:14, color:"#1a3a5c", fontWeight:800, marginTop:4 }}>{forgotResult.registration_id}</div>
                  <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{forgotResult.name}</div>
                  <button onClick={() => { setId(forgotResult.registration_id); setShowForgot(false); }} style={{ marginTop:8, background:"linear-gradient(135deg,#1a3a5c,#3d6b82)", color:"white", border:"none", borderRadius:8, padding:"6px 14px", fontSize:11, fontWeight:600, cursor:"pointer" }}>
                    Use this ID
                  </button>
                </div>
              )}
              <button onClick={handleForgot} disabled={forgotLoading} style={{ width:"100%", padding:10, background:"linear-gradient(135deg,#c9a84c,#f0d060)", border:"none", borderRadius:10, color:"#1a3a5c", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                {forgotLoading ? "Searching..." : "Find My Registration ID"}
              </button>
            </div>
          )}
        </div>

        {/* NOT REGISTERED */}
        <a href="https://iactacon2027.com/registration/" target="_blank" style={{ textDecoration:"none" }}>
          <div style={{ background:"linear-gradient(135deg,#f0f8ff,#e8f4f8)", borderRadius:14, padding:"14px 16px", border:"1px solid rgba(91,143,168,0.2)", boxShadow:"0 2px 12px rgba(91,143,168,0.08)", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"rgba(91,143,168,0.12)", border:"1px solid rgba(91,143,168,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b8fa8" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#1a3a5c" }}>Not yet Registered?</div>
              <div style={{ fontSize:10, color:"#5b8fa8", marginTop:1, fontWeight:600 }}>Register Now →</div>
            </div>
          </div>
        </a>

        <div style={{ textAlign:"center", fontSize:10, color:"#a0b0bc", lineHeight:1.6, paddingBottom:8 }}>
          Designed with <span style={{ color:"#e57373" }}>♥</span> by{" "}
          <span style={{ color:"#5b8fa8", fontWeight:600 }}>Qubix Infosystems</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        input::placeholder { color:#a0b0bc !important; }
        input:focus { border-color:rgba(91,143,168,0.5) !important; }
      `}</style>
    </div>
  );
}