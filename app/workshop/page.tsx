"use client";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";

const workshops = [
  { title:"Perioperative TEE Basics", date:"18 Feb 2027", time:"09:00 - 11:00", venue:"Mangrove Hall", faculty:"Dr. A. Sharma", seats:30, desc:"Hands-on training in transoesophageal echocardiography fundamentals for cardiac anaesthesiologists.", fee:"Included in Workshop Registration" },
  { title:"Haemodynamic Monitoring", date:"18 Feb 2027", time:"11:30 - 13:00", venue:"Monarch Hall", faculty:"Dr. R. Mehta", seats:25, desc:"Advanced haemodynamic monitoring techniques including arterial lines, CVP and PAC.", fee:"Included in Workshop Registration" },
  { title:"Simulation Lab — Crisis Management", date:"18 Feb 2027", time:"14:00 - 17:00", venue:"Knight Hall", faculty:"Faculty Team", seats:20, desc:"Simulation-based training for high-stakes scenarios in cardiac OT.", fee:"Included in Workshop Registration" },
];

export default function WorkshopPage() {
  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>18 February 2027</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Workshop Day</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>Pre-conference hands-on training sessions</div>
        </div>
      </div>

      <div style={{padding:16}}>
        <div style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:12,padding:14,marginBottom:20,fontSize:12,color:"rgba(212,175,55,0.8)",lineHeight:1.6}}>
          🎓 Workshop registration is separate from conference registration. Seats are limited — book early to avoid disappointment.
        </div>

        {workshops.map((w, i) => (
          <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{display:"inline-block",background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:20,padding:"2px 10px",color:"#d4af37",fontSize:10,fontWeight:600,marginBottom:8}}>
              Workshop {i+1}
            </div>
            <div style={{fontWeight:700,fontSize:15,color:"#ede9fe",marginBottom:8}}>{w.title}</div>
            <div style={{fontSize:12,color:"rgba(196,181,253,0.6)",lineHeight:1.6,marginBottom:12}}>{w.desc}</div>
            {[
              { icon:<Clock size={12}/>, text:`${w.date} · ${w.time}` },
              { icon:<MapPin size={12}/>, text:w.venue },
              { icon:<Users size={12}/>, text:`Faculty: ${w.faculty} · ${w.seats} seats` },
            ].map((r,j) => (
              <div key={j} style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,color:"rgba(167,139,250,0.7)",fontSize:11}}>
                <span style={{color:"#a78bfa"}}>{r.icon}</span>{r.text}
              </div>
            ))}
            <div style={{marginTop:10,background:"rgba(167,139,250,0.08)",borderRadius:8,padding:"6px 12px",fontSize:11,color:"rgba(196,181,253,0.7)"}}>
              💰 {w.fee}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}