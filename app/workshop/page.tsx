"use client";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";
const workshops = [
  {title:"Perioperative TEE Basics",time:"09:00 - 11:00",venue:"Mangrove Hall",faculty:"Dr. A. Sharma",seats:30,desc:"Hands-on training in transoesophageal echocardiography fundamentals."},
  {title:"Haemodynamic Monitoring",time:"11:30 - 13:00",venue:"Monarch Hall",faculty:"Dr. R. Mehta",seats:25,desc:"Advanced haemodynamic monitoring techniques including arterial lines, CVP and PAC."},
  {title:"Simulation Lab — Crisis Management",time:"14:00 - 17:00",venue:"Knight Hall",faculty:"Faculty Team",seats:20,desc:"Simulation-based training for high-stakes scenarios in cardiac OT."},
];
export default function WorkshopPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>18 February 2027</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Workshop Day</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Pre-conference hands-on training sessions</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:14,marginBottom:20,fontSize:12,color:"#8a6914",lineHeight:1.6}}>
          🎓 Workshop registration is separate. Seats are limited — register early to avoid disappointment.
        </div>
        {workshops.map((w,i)=>(
          <div key={i} style={{background:"white",borderRadius:16,padding:16,marginBottom:14,border:"1px solid rgba(91,143,168,0.12)",boxShadow:"0 3px 12px rgba(91,143,168,0.06)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#5b8fa8,#c9a84c)"}}/>
            <div style={{display:"inline-block",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:20,padding:"2px 10px",color:"#8a6914",fontSize:9,fontWeight:700,marginBottom:8}}>Workshop {i+1}</div>
            <div style={{fontWeight:700,fontSize:15,color:"#1a3a5c",marginBottom:8}}>{w.title}</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.6,marginBottom:12}}>{w.desc}</div>
            {[{icon:<Clock size={12}/>,text:`18 Feb 2027 · ${w.time}`},{icon:<MapPin size={12}/>,text:w.venue},{icon:<Users size={12}/>,text:`${w.faculty} · ${w.seats} seats`}].map((r,j)=>(
              <div key={j} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,color:"#5b8fa8",fontSize:11}}>
                {r.icon}{r.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}