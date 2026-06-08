"use client";
import { ArrowLeft } from "lucide-react";
const speakers = [
  {name:"Dr. P. Krishnan",role:"Keynote Speaker",topic:"Advances in Cardiac Anaesthesia",inst:"AIIMS New Delhi",img:""},
  {name:"Dr. S. Bose",role:"State of the Art",topic:"Perioperative Management",inst:"PGIMER Chandigarh",img:""},
  {name:"Dr. M. Verma",role:"Keynote Speaker",topic:"Paediatric Cardiac Anaesthesia",inst:"Narayana Health",img:""},
  {name:"Dr. R. Mehta",role:"Workshop Faculty",topic:"Haemodynamic Monitoring",inst:"Apollo Hospitals",img:""},
  {name:"Dr. K. Das",role:"Symposium",topic:"Post-op ICU Care",inst:"SSKM Hospital",img:""},
  {name:"Dr. T. Iyer",role:"Session Chair",topic:"Goal Directed Fluid Therapy",inst:"CMC Vellore",img:""},
];
export default function SpeakersPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Faculty</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Speakers</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Distinguished faculty at IACTACON 2027</div>
        </div>
      </div>
      <div style={{padding:16}}>
        {speakers.map((s,i) => (
          <div key={i} style={{background:"white",borderRadius:14,padding:16,marginBottom:10,border:"1px solid rgba(91,143,168,0.12)",boxShadow:"0 2px 8px rgba(91,143,168,0.06)",display:"flex",gap:14,alignItems:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,bottom:0,width:3,background:"linear-gradient(180deg,#5b8fa8,#c9a84c)"}}/>
            <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#d4e8f0,#e8f4f8)",border:"2px solid rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:22}}>👨‍⚕️</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14,color:"#1a3a5c"}}>{s.name}</div>
              <div style={{fontSize:11,color:"#5b8fa8",marginTop:2}}>{s.inst}</div>
              <div style={{fontSize:11,color:"#7a8a99",marginTop:3,fontStyle:"italic"}}>{s.topic}</div>
              <span style={{display:"inline-block",marginTop:5,fontSize:9,background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:20,padding:"2px 8px",color:"#8a6914",fontWeight:700}}>{s.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}