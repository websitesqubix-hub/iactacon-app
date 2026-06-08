"use client";
import { useState, useEffect } from "react";

export default function InstallPage() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [step, setStep] = useState<"ready"|"installing"|"done">("ready");

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true); return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const android = /android/i.test(navigator.userAgent);
    setIsIOS(ios);
    setIsAndroid(android);

    const handler = (e: any) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    setStep("installing");
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") { setStep("done"); setIsInstalled(true); }
    else setStep("ready");
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(150deg,#1a3a5c 0%,#3d6b82 50%,#5b8fa8 100%)", fontFamily:"system-ui,-apple-system,sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>

      {/* BG ornaments */}
      <div style={{ position:"absolute", top:-60, right:-60, width:250, height:250, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.2)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:-30, right:-30, width:160, height:160, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.12)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-80, left:-60, width:220, height:220, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>

      <div style={{ width:"100%", maxWidth:380, position:"relative", zIndex:2 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ position:"relative", width:90, height:90, margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1.5px solid rgba(201,168,76,0.4)", animation:"spin 20s linear infinite" }}/>
            <div style={{ position:"absolute", inset:6, borderRadius:"50%", border:"1px dashed rgba(201,168,76,0.25)", animation:"spin-rev 12s linear infinite" }}/>
            <div style={{ position:"absolute", inset:8, borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(201,168,76,0.5)" }}>
              <img src="https://iactacon2027.com/wp-content/uploads/2026/05/iacta-site-logo.jpeg" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </div>
          </div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:3, textTransform:"uppercase" as const, marginBottom:4 }}>Official Conference App</div>
          <div style={{ fontSize:28, fontWeight:800, color:"white", lineHeight:1 }}>IACTACON</div>
          <div style={{ fontSize:28, fontWeight:800, background:"linear-gradient(135deg,#c9a84c,#f0d060)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:8 }}>2027</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>Indian Association of Cardiovascular<br/>Thoracic Anaesthesiologists</div>
          <div style={{ marginTop:10, fontSize:11, color:"rgba(255,255,255,0.5)" }}>📍 Kolkata · 19–21 February 2027</div>
        </div>

        {/* Features */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
          {[
            { icon:"📅", text:"Schedule & Wishlist" },
            { icon:"🎤", text:"Speakers & Sessions" },
            { icon:"📄", text:"Abstract Submission" },
            { icon:"🏆", text:"Quiz & Certificate" },
            { icon:"🗺️", text:"Venue & Places" },
            { icon:"⭐", text:"My Activities" },
          ].map((f,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:8, border:"1px solid rgba(201,168,76,0.15)" }}>
              <span style={{ fontSize:18 }}>{f.icon}</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.85)", fontWeight:500 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* INSTALL SECTION */}
        {isInstalled ? (
          <div style={{ background:"rgba(46,125,50,0.2)", border:"1px solid rgba(46,125,50,0.4)", borderRadius:16, padding:20, textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:8 }}>✅</div>
            <div style={{ fontWeight:800, color:"white", fontSize:16, marginBottom:4 }}>App Already Installed!</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", marginBottom:14 }}>IACTACON 2027 is on your home screen</div>
            <a href="/" style={{ display:"block", background:"linear-gradient(135deg,#c9a84c,#f0d060)", borderRadius:12, padding:12, color:"#1a3a5c", fontWeight:700, fontSize:14, textDecoration:"none" }}>
              Open App →
            </a>
          </div>

        ) : isIOS ? (
          /* iOS Instructions */
          <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:18, padding:20 }}>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <div style={{ fontSize:10, color:"#c9a84c", fontWeight:700, letterSpacing:2, textTransform:"uppercase" as const, marginBottom:4 }}>iPhone / iPad</div>
              <div style={{ fontSize:15, fontWeight:800, color:"white" }}>Add to Home Screen</div>
            </div>
            {[
              { n:"1", icon:"🌐", text:"Open this page in Safari (not Chrome)" },
              { n:"2", icon:"⬆️", text:'Tap the Share icon at the bottom of Safari' },
              { n:"3", icon:"➕", text:'"Add to Home Screen" → tap Add' },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:i<2?"1px solid rgba(255,255,255,0.08)":"none", alignItems:"center" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#c9a84c,#f0d060)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:12, color:"#1a3a5c", flexShrink:0 }}>{s.n}</div>
                <div style={{ fontSize:22, flexShrink:0 }}>{s.icon}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", flex:1, lineHeight:1.4 }}>{s.text}</div>
              </div>
            ))}
            <div style={{ marginTop:14, background:"rgba(201,168,76,0.15)", borderRadius:10, padding:"8px 12px", fontSize:11, color:"rgba(255,255,255,0.6)", textAlign:"center" }}>
              The app icon will appear on your home screen like a native app
            </div>
          </div>

        ) : installPrompt ? (
          /* Android Install */
          <div>
            {step === "done" ? (
              <div style={{ background:"rgba(46,125,50,0.2)", border:"1px solid rgba(46,125,50,0.4)", borderRadius:16, padding:20, textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
                <div style={{ fontWeight:800, color:"white", fontSize:16 }}>App Installed!</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:4 }}>Check your home screen</div>
              </div>
            ) : (
              <button onClick={handleInstall} disabled={step==="installing"} style={{ width:"100%", padding:16, background:"linear-gradient(135deg,#c9a84c,#f0d060)", border:"none", borderRadius:16, color:"#1a3a5c", fontSize:15, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, boxShadow:"0 8px 24px rgba(201,168,76,0.35)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v13M7 10l5 5 5-5"/><rect x="2" y="19" width="20" height="2" rx="1"/></svg>
                {step==="installing" ? "Installing..." : "📲 Install IACTACON 2027 App"}
              </button>
            )}
            <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:10 }}>
              Free · No app store required · Works offline
            </div>
          </div>

        ) : (
          /* Fallback — open in browser */
          <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:16, padding:20, textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🌐</div>
            <div style={{ fontWeight:700, color:"white", fontSize:14, marginBottom:6 }}>Open in Chrome to Install</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginBottom:14, lineHeight:1.5 }}>
              For the best experience, open this link in <strong style={{ color:"white" }}>Google Chrome</strong> on Android, or <strong style={{ color:"white" }}>Safari</strong> on iPhone.
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <a href="/" style={{ flex:1, display:"block", background:"rgba(255,255,255,0.1)", borderRadius:10, padding:11, color:"white", fontWeight:600, fontSize:13, textDecoration:"none", border:"1px solid rgba(255,255,255,0.15)" }}>
                Open App →
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:20, fontSize:10, color:"rgba(255,255,255,0.3)" }}>
          Developed by <span style={{ color:"rgba(201,168,76,0.6)", fontWeight:600 }}>Qubix Infosystems</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      `}</style>
    </div>
  );
}