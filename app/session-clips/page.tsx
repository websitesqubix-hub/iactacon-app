"use client";
import { ArrowLeft, Play } from "lucide-react";
const clips = [
  {title:"Keynote: Advances in Cardiac Anaesthesia",speaker:"Dr. P. Krishnan",day:"Day 1",duration:"45 min"},
  {title:"Symposium: ECMO & Advanced Support",speaker:"Panel Discussion",day:"Day 2",duration:"60 min"},
  {title:"Workshop: Perioperative TEE Basics",speaker:"Dr. A. Sharma",day:"Workshop",duration:"120 min"},
  {title:"State of the Art Lecture",speaker:"Dr. S. Bose",day:"Day 1",duration:"30 min"},
  {title:"Paediatric Cardiac Anaesthesia",speaker:"Dr. M. Verma",day:"Day 2",duration:"45 min"},
];
export default function SessionClipsPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Post Conference</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Session Clips</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Recorded sessions from IACTACON 2027</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:14,marginBottom:20,fontSize:12,color:"#8a6914",lineHeight:1.6}}>
          🎬 Session recordings will be available after the conference. You will be notified via email.
        </div>
        {clips.map((clip,i)=>(
          <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid rgba(91,143,168,0.12)",display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:10,background:"rgba(91,143,168,0.08)",border:"1px solid rgba(91,143,168,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Play size={18} color="rgba(91,143,168,0.5)"/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:12,color:"#1a3a5c",marginBottom:2}}>{clip.title}</div>
              <div style={{fontSize:11,color:"#5b8fa8"}}>🎤 {clip.speaker}</div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <span style={{fontSize:9,background:"rgba(91,143,168,0.08)",border:"1px solid rgba(91,143,168,0.15)",borderRadius:20,padding:"1px 8px",color:"#3d6b82",fontWeight:600}}>{clip.day}</span>
                <span style={{fontSize:9,color:"#7a8a99"}}>{clip.duration}</span>
              </div>
            </div>
            <div style={{background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:8,padding:"5px 10px",color:"#8a6914",fontSize:10,fontWeight:600,flexShrink:0}}>Soon</div>
          </div>
        ))}
      </div>
    </div>
  );
}