"use client";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function MyActivitiesPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [editingRemark, setEditingRemark] = useState<number|null>(null);
  const [remarkText, setRemarkText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("schedule_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const save = (updated: any[]) => {
    setWishlist(updated);
    localStorage.setItem("schedule_wishlist", JSON.stringify(updated));
  };

  const remove = (idx: number) => save(wishlist.filter((_,i) => i !== idx));

  const saveRemark = (idx: number) => {
    const updated = wishlist.map((w,i) => i===idx ? {...w, remark:remarkText} : w);
    save(updated); setEditingRemark(null); setRemarkText("");
  };

  const typeColor: Record<string,string> = {
    keynote:"#7c3aed",workshop:"#0369a1",session:"#1a3a5c",
    abstract:"#b45309",special:"#c8102e",break:"#059669",admin:"#6b7280"
  };

  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Personal Schedule</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>My Activities</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>{wishlist.length} session{wishlist.length!==1?"s":""} saved</div>
        </div>
      </div>

      <div style={{padding:16}}>
        {wishlist.length===0 ? (
          <div style={{textAlign:"center",padding:"60px 20px"}}>
            <div style={{fontSize:48,marginBottom:12}}>⭐</div>
            <div style={{fontSize:14,fontWeight:700,color:"#3d6b82"}}>No saved sessions yet</div>
            <div style={{fontSize:12,marginTop:6,color:"#7a8a99"}}>Go to Schedule and tap ☆ to save sessions</div>
            <a href="/schedule" style={{display:"inline-block",marginTop:16,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",padding:"10px 24px",borderRadius:10,fontSize:13,fontWeight:600,textDecoration:"none"}}>
              View Schedule
            </a>
          </div>
        ) : (
          wishlist.map((session,i) => (
            <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid rgba(91,143,168,0.15)",boxShadow:"0 2px 8px rgba(91,143,168,0.06)",borderLeft:`4px solid ${typeColor[session.type]||"#5b8fa8"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,marginBottom:3}}>{session.day} · {session.time}</div>
                  <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:3}}>{session.title}</div>
                  {session.speaker && <div style={{fontSize:11,color:"#5b8fa8"}}>🎤 {session.speaker}</div>}
                  {session.location && <div style={{fontSize:11,color:"#7a8a99",marginTop:2}}>📍 {session.location}</div>}
                </div>
                <button onClick={()=>remove(i)} style={{background:"#ffebee",border:"1px solid #ffcdd2",borderRadius:8,padding:"6px 8px",cursor:"pointer",color:"#c62828",flexShrink:0}}>
                  <Trash2 size={14}/>
                </button>
              </div>
              {/* REMARK */}
              {editingRemark===i ? (
                <div style={{marginTop:10}}>
                  <textarea value={remarkText} onChange={e=>setRemarkText(e.target.value)} placeholder="Add your remark..." rows={2}
                    style={{width:"100%",padding:"8px 10px",background:"#f8f4ee",border:"1.5px solid rgba(91,143,168,0.25)",borderRadius:8,fontSize:12,color:"#1a3a5c",outline:"none",fontFamily:"system-ui",resize:"none"}}/>
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <button onClick={()=>saveRemark(i)} style={{flex:1,padding:"7px 0",background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Save</button>
                    <button onClick={()=>setEditingRemark(null)} style={{flex:1,padding:"7px 0",background:"#f0f4f8",color:"#555",border:"none",borderRadius:8,fontSize:11,cursor:"pointer"}}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{marginTop:8}}>
                  {session.remark && <div style={{fontSize:11,color:"#5b8fa8",background:"rgba(91,143,168,0.08)",borderRadius:6,padding:"5px 8px",marginBottom:6,fontStyle:"italic"}}>"{session.remark}"</div>}
                  <button onClick={()=>{setEditingRemark(i);setRemarkText(session.remark||"");}} style={{fontSize:10,color:"#c9a84c",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontWeight:600}}>
                    {session.remark ? "Edit Remark" : "+ Add Remark"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}