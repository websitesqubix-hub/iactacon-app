"use client";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function MyActivitiesPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("schedule_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const remove = (id: number) => {
    const updated = wishlist.filter((_,i) => i !== id);
    setWishlist(updated);
    localStorage.setItem("schedule_wishlist", JSON.stringify(updated));
  };

  const typeColor: any = {
    keynote:"#7c3aed", workshop:"#0369a1", session:"#1a3a8e",
    abstract:"#b45309", special:"#c8102e", break:"#059669", admin:"#6b7280"
  };

  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Personal Schedule</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>My Activities</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>{wishlist.length} session{wishlist.length !== 1 ? "s" : ""} saved</div>
        </div>
      </div>

      <div style={{padding:16}}>
        {wishlist.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px 20px",color:"rgba(167,139,250,0.5)"}}>
            <div style={{fontSize:48,marginBottom:12}}>⭐</div>
            <div style={{fontSize:14,fontWeight:600,color:"rgba(196,181,253,0.6)"}}>No saved sessions yet</div>
            <div style={{fontSize:12,marginTop:6,color:"rgba(167,139,250,0.4)"}}>Go to Schedule and tap ⭐ to save sessions</div>
            <a href="/schedule" style={{display:"inline-block",marginTop:16,background:"linear-gradient(135deg,#7c3aed,#6366f1)",color:"white",padding:"10px 24px",borderRadius:10,fontSize:13,fontWeight:600,textDecoration:"none"}}>
              View Schedule
            </a>
          </div>
        ) : (
          wishlist.map((session, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:14,padding:14,marginBottom:10,borderLeft:`4px solid ${typeColor[session.type]||"#a78bfa"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#d4af37",fontWeight:600,marginBottom:4}}>{session.day} · {session.time}</div>
                  <div style={{fontWeight:700,fontSize:13,color:"#ede9fe",marginBottom:4}}>{session.title}</div>
                  {session.speaker && <div style={{fontSize:11,color:"#a78bfa"}}>🎤 {session.speaker}</div>}
                  {session.location && <div style={{fontSize:11,color:"rgba(167,139,250,0.5)",marginTop:2}}>📍 {session.location}</div>}
                </div>
                <button onClick={() => remove(i)} style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"6px 8px",cursor:"pointer",color:"#fca5a5",flexShrink:0}}>
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}