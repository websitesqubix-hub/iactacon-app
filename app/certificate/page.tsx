"use client";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function CertificatePage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>My Documents</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Certificate</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Certificate of Participation — IACTACON 2027</div>
        </div>
      </div>

      <div style={{padding:16}}>
        {/* Certificate Preview */}
        <div style={{background:"white",borderRadius:16,padding:24,marginBottom:16,border:"2px solid rgba(201,168,76,0.3)",boxShadow:"0 4px 20px rgba(91,143,168,0.1)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#5b8fa8,#c9a84c,#5b8fa8)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#c9a84c,#5b8fa8,#c9a84c)"}}/>
          <div style={{fontSize:32,marginBottom:8}}>📜</div>
          <div style={{fontSize:11,color:"#5b8fa8",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Certificate of Participation</div>
          <div style={{fontSize:15,fontWeight:800,color:"#1a3a5c",marginBottom:4}}>IACTACON 2027</div>
          <div style={{fontSize:12,color:"#7a8a99",marginBottom:12}}>30th National Conference of IACTA</div>
          {user && <div style={{fontSize:14,fontWeight:700,color:"#3d6b82",marginBottom:4}}>{user.name}</div>}
          <div style={{fontSize:11,color:"#7a8a99"}}>19–21 February 2027 · Kolkata</div>
          <div style={{marginTop:16,padding:"10px 16px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",borderRadius:10,display:"inline-block"}}>
            <div style={{fontSize:10,color:"#8a6914",fontWeight:700}}>⏳ Available Post Conference</div>
            <div style={{fontSize:10,color:"#7a8a99",marginTop:2}}>Will be emailed after the conference concludes</div>
          </div>
        </div>

        <div style={{background:"white",borderRadius:14,padding:16,border:"1px solid rgba(91,143,168,0.15)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:12}}>About Your Certificate</div>
          {[
            "Digital certificate will be issued to all registered delegates",
            "Sent to your registered email address post conference",
            "Valid for CME/CPD credit purposes",
            "Can be downloaded and printed",
          ].map((t,i) => (
            <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<3?"1px solid rgba(91,143,168,0.08)":"none",fontSize:12,color:"#555"}}>
              <span style={{color:"#c9a84c",fontWeight:700,flexShrink:0}}>◆</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}