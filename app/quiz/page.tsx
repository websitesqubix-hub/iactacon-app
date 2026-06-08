"use client";
import { ArrowLeft } from "lucide-react";
export default function QuizPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Competition</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Quiz</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>IACTA Shield Quiz Competition</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"white",borderRadius:16,padding:20,marginBottom:16,border:"1px solid rgba(201,168,76,0.2)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#c9a84c,#f0d060)"}}/>
          <div style={{fontSize:32,marginBottom:10}}>🏆</div>
          <div style={{fontWeight:800,fontSize:16,color:"#1a3a5c",marginBottom:6}}>IACTA Shield Quiz</div>
          <div style={{fontSize:12,color:"#555",lineHeight:1.6,marginBottom:14}}>Annual quiz competition open to all registered delegates. Test your knowledge in cardiac anaesthesia.</div>
          {[{l:"Date",v:"20 Feb 2027"},{l:"Time",v:"15:30 onwards"},{l:"Venue",v:"Knight Hall"},{l:"Format",v:"MCQ based, team event"},{l:"Prize",v:"IACTA Shield + Certificates"}].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:i<4?"1px solid rgba(91,143,168,0.08)":"none"}}>
              <span style={{fontSize:11,color:"#5b8fa8",minWidth:60,fontWeight:600}}>{r.l}</span>
              <span style={{fontSize:11,color:"#1a3a5c",fontWeight:500}}>{r.v}</span>
            </div>
          ))}
          <div style={{marginTop:14,background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#8a6914",textAlign:"center"}}>
            Register at the conference desk
          </div>
        </div>
        <a href="/certificate" style={{textDecoration:"none",display:"block",background:"white",borderRadius:14,padding:16,border:"1px solid rgba(91,143,168,0.15)",display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:28}}>📜</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:"#1a3a5c"}}>Certificate of Participation</div>
            <div style={{fontSize:11,color:"#5b8fa8",marginTop:2}}>View & download your certificate →</div>
          </div>
        </a>
      </div>
    </div>
  );
}