"use client";
import { useState, useEffect } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    // Auto-login if remembered
    const saved = localStorage.getItem("remembered_user");
    if (saved) {
      localStorage.setItem("user", saved);
      window.location.href = "/";
    }
    // Pre-fill if remembered credentials exist
    const savedId = localStorage.getItem("remembered_id");
    const savedPhone = localStorage.getItem("remembered_phone");
    if (savedId) setId(savedId);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!id || !phone) {
      setError("Please enter both fields.");
      return;
    }
    setLoading(true);
    try {
      const lookupRes = await fetch(
        `https://iactacon2027.com/wp-json/iacta/v1/lookup?reg_id=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`
      );
      const lookup = await lookupRes.json();
      if (!lookupRes.ok || lookup.error) {
        setError(lookup.error === "Phone does not match" ? "Phone number does not match." : "Registration ID not found.");
        setLoading(false);
        return;
      }
      let userData: any = null;
      if (lookup.guest_id) {
        const guestRes = await fetch(`/api/guest?id=${lookup.guest_id}`);
        const guestData = await guestRes.json();
        if (guestRes.ok && guestData.id) userData = guestData;
      }
      if (!userData) {
        userData = {
          id: lookup.registration_id,
          name: lookup.name,
          phone: lookup.phone,
          email: lookup.email,
          registration_status: lookup.status === "verified" ? "approved" : lookup.status,
          registration_id: lookup.registration_id,
        };
      }
      localStorage.setItem("user", JSON.stringify(userData));
      if (remember) {
        localStorage.setItem("remembered_user", JSON.stringify(userData));
        localStorage.setItem("remembered_id", id);
        localStorage.setItem("remembered_phone", phone);
      }
      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: "100%", height: "100dvh",
      background: "#1a0533",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      position: "relative", overflow: "hidden",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "0 20px 20px",
    }}>

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay loop muted playsInline
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.12,
          pointerEvents: "none", zIndex: 0,
        }}
        src="https://iactacon2027.com/wp-content/uploads/2026/06/Watercolour-sketch-art-scene-with-iconic-bridge-historic-buildings-yellow-taxi-cab-and-tram-by-the-waterfront-soft-painted-textures-artistic-brushstrokes-dreamy-atmospheric-quality.mp4"
      />

      {/* DOT GRID */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      {/* TOP GLOW */}
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* CORNER ACCENTS */}
      {[
        { top: 16, left: 16, borderTop: "1.5px solid rgba(167,139,250,0.4)", borderLeft: "1.5px solid rgba(167,139,250,0.4)", borderRadius: "6px 0 0 0" },
        { top: 16, right: 16, borderTop: "1.5px solid rgba(167,139,250,0.4)", borderRight: "1.5px solid rgba(167,139,250,0.4)", borderRadius: "0 6px 0 0" },
        { bottom: 16, left: 16, borderBottom: "1.5px solid rgba(167,139,250,0.4)", borderLeft: "1.5px solid rgba(167,139,250,0.4)", borderRadius: "0 0 0 6px" },
        { bottom: 16, right: 16, borderBottom: "1.5px solid rgba(167,139,250,0.4)", borderRight: "1.5px solid rgba(167,139,250,0.4)", borderRadius: "0 0 6px 0" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 60, height: 60, pointerEvents: "none", zIndex: 1, ...s }} />
      ))}

      {/* TOP BADGE */}
      <div style={{ position: "relative", zIndex: 2, marginTop: 16 }}>
        <div style={{ background: "rgba(147,51,234,0.25)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: 20, padding: "4px 14px", color: "#c4b5fd", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const }}>
          30th National Conference
        </div>
      </div>

      {/* LOGO + NAME */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* LOGO CIRCLE */}
        <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.25)", animation: "spin 20s linear infinite" }} />
          <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", border: "1px dashed rgba(167,139,250,0.2)", animation: "spin-rev 15s linear infinite" }} />
          <svg style={{ position: "absolute", width: 120, height: 120 }} viewBox="0 0 120 120">
            <circle cx="60" cy="3" r="2.5" fill="#a78bfa" opacity="0.8"/>
            <circle cx="117" cy="60" r="2.5" fill="#a78bfa" opacity="0.8"/>
            <circle cx="60" cy="117" r="2.5" fill="#a78bfa" opacity="0.8"/>
            <circle cx="3" cy="60" r="2.5" fill="#a78bfa" opacity="0.8"/>
            <circle cx="101" cy="19" r="1.5" fill="#818cf8" opacity="0.6"/>
            <circle cx="101" cy="101" r="1.5" fill="#818cf8" opacity="0.6"/>
            <circle cx="19" cy="101" r="1.5" fill="#818cf8" opacity="0.6"/>
            <circle cx="19" cy="19" r="1.5" fill="#818cf8" opacity="0.6"/>
          </svg>
          <div style={{ width: 86, height: 86, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(167,139,250,0.5)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, overflow: "hidden" }}>
            <img
              src="https://iactacon2027.com/wp-content/uploads/2026/05/iacta-site-logo.jpeg"
              alt="IACTA Logo"
              style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        </div>

        <div style={{ fontSize: 10, color: "#a78bfa", letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 4 }}>Official Conference App</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", letterSpacing: 1, lineHeight: 1 }}>IACTACON</div>
        <div style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 6 }}>2027</div>

        <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, transparent, #a78bfa, transparent)", marginBottom: 6 }} />

        <div style={{ fontSize: 11, color: "#c4b5fd", textAlign: "center", lineHeight: 1.4, marginBottom: 6 }}>
          Indian Association of Cardiovascular Thoracic Anaesthesiologists
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(147,51,234,0.2)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 20, padding: "3px 12px", color: "#ddd6fe", fontSize: 11, marginBottom: 8 }}>
          <div style={{ width: 5, height: 5, background: "#a78bfa", borderRadius: "50%" }} />
          Kolkata, West Bengal
        </div>

        {/* THEME PILLS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {[
            { label: "Safety", bg: "rgba(99,102,241,0.2)", border: "rgba(99,102,241,0.4)", color: "#a5b4fc" },
            { label: "Science", bg: "rgba(147,51,234,0.2)", border: "rgba(147,51,234,0.4)", color: "#c4b5fd" },
            { label: "Skill", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.35)", color: "#ddd6fe" },
          ].map(p => (
            <div key={p.label} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: p.bg, border: `1px solid ${p.border}`, color: p.color }}>{p.label}</div>
          ))}
        </div>

        {/* DATES */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 12, padding: "8px 20px", display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#a78bfa", textTransform: "uppercase" as const, letterSpacing: 1, fontWeight: 600, marginBottom: 2 }}>Workshop</div>
            <div style={{ fontSize: 12, color: "#ede9fe", fontWeight: 600 }}>18 Feb 2027</div>
          </div>
          <div style={{ width: 1, height: 28, background: "rgba(167,139,250,0.25)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#a78bfa", textTransform: "uppercase" as const, letterSpacing: 1, fontWeight: 600, marginBottom: 2 }}>Conference</div>
            <div style={{ fontSize: 12, color: "#ede9fe", fontWeight: 600 }}>19–21 Feb 2027</div>
          </div>
        </div>
      </div>

      {/* INLINE VIDEO */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: 360,
        borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(167,139,250,0.3)",
        height: 160,
      }}>
        <video autoPlay loop muted playsInline
          style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
          src="https://iactacon2027.com/wp-content/uploads/2026/06/Watercolour-sketch-art-scene-with-iconic-bridge-historic-buildings-yellow-taxi-cab-and-tram-by-the-waterfront-soft-painted-textures-artistic-brushstrokes-dreamy-atmospheric-quality.mp4"
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(26,5,51,0.2), rgba(26,5,51,0.5))"}}>
          <div style={{position:"absolute",bottom:10,left:12,color:"white",fontSize:11,fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>
            📍 Kolkata — Venue of IACTACON 2027
          </div>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div style={{ width: "100%", maxWidth: 360, position: "relative", zIndex: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 18, padding: "16px 16px 14px" }}>

        <div style={{ fontSize: 13, fontWeight: 700, color: "#ede9fe", marginBottom: 2, textAlign: "center" }}>Welcome Back</div>
        <div style={{ fontSize: 11, color: "#a78bfa", textAlign: "center", marginBottom: 14 }}>Sign in with your registration credentials</div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#c4b5fd", marginBottom: 4, letterSpacing: 0.5 }}>REGISTRATION ID</label>
          <input
            value={id}
            onChange={e => setId(e.target.value.toUpperCase())}
            placeholder="e.g. IACTACON-0162"
            style={{ width: "100%", padding: "10px 12px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, color: "#ede9fe", fontSize: 13, outline: "none", fontFamily: "system-ui" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#c4b5fd", marginBottom: 4, letterSpacing: 0.5 }}>PHONE NUMBER</label>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            type="tel"
            style={{ width: "100%", padding: "10px 12px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, color: "#ede9fe", fontSize: 13, outline: "none", fontFamily: "system-ui" }}
          />
        </div>

        {/* REMEMBER ME */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div
            onClick={() => setRemember(!remember)}
            style={{
              width: 18, height: 18, borderRadius: 4,
              border: `1.5px solid ${remember ? "#a78bfa" : "rgba(167,139,250,0.4)"}`,
              background: remember ? "rgba(167,139,250,0.3)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
            }}
          >
            {remember && <span style={{ color: "#a78bfa", fontSize: 12, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ fontSize: 11, color: "#c4b5fd", cursor: "pointer" }} onClick={() => setRemember(!remember)}>
            Keep me signed in
          </span>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "7px 12px", color: "#fca5a5", fontSize: 11, marginBottom: 10 }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: 12, background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7c3aed, #6366f1)", border: "none", borderRadius: 10, color: "white", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 0.5 }}
        >
          {loading ? "Signing in..." : "Login →"}
        </button>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 2, fontSize: 10, color: "rgba(167,139,250,0.45)", textAlign: "center", lineHeight: 1.5 }}>
        Designed &amp; Developed with <span style={{ color: "#f472b6" }}>♥</span> by{" "}
        <span style={{ color: "rgba(196,181,253,0.65)", fontWeight: 600 }}>Qubix Infosystems</span>
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