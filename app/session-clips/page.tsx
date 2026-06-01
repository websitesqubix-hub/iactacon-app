"use client";
import { ArrowLeft, Play } from "lucide-react";

const clips = [
  { title:"Keynote: Advances in Cardiac Anaesthesia", speaker:"Dr. P. Krishnan", day:"Day 1", duration:"45 min", hall:"Mangrove Hall" },
  { title:"Symposium: ECMO & Advanced Support", speaker:"Panel Discussion", day:"Day 2", duration:"60 min", hall:"Monarch Hall" },
  { title:"Workshop: Perioperative TEE Basics", speaker:"Dr. A. Sharma", day:"Workshop", duration:"120 min", hall:"Mangrove Hall" },
  { title:"State of the Art Lecture", speaker:"Dr. S. Bose", day:"Day 1", duration:"30 min", hall:"Mangrove Hall" },
  { title:"Paediatric Cardiac Anaesthesia", speaker:"Dr. M. Verma", day:"Day 2", duration:"45 min", hall:"Mangrove Hall" },
];

export default function SessionClipsPage() {
  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Post Conference</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Session Clips</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>Recorded sessions from IACTACON 2027</div>
        </div>
      </div>

      <div style={{padding:16}}>
        <div style={{background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:12,padding:14,marginBottom:20,fontSize:12,color:"rgba(196,181,253,0.7)",lineHeight:1.6}}>
          🎬 Session recordings will be available after the conference concludes. You will be notified via email when videos are ready.
        </div>

        {clips.map((clip,i) => (
          <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:14,padding:14,marginBottom:10,display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:10,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Play size={18} color="rgba(167,139,250,0.5)"/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:12,color:"rgba(196,181,253,0.7)",marginBottom:2}}>{clip.title}</div>
              <div style={{fontSize:11,color:"rgba(167,139,250,0.5)"}}>🎤 {clip.speaker}</div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <span style={{fontSize:10,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:20,padding:"1px 8px",color:"rgba(167,139,250,0.6)"}}>{clip.day}</span>
                <span style={{fontSize:10,color:"rgba(167,139,250,0.4)"}}>{clip.duration}</span>
              </div>
            </div>
            <div style={{background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:8,padding:"5px 10px",color:"rgba(167,139,250,0.4)",fontSize:10,fontWeight:600,flexShrink:0}}>
              Soon
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}