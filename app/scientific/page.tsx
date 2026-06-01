"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
const topics = [
  {category:"Anaesthesia Techniques",icon:"💉",items:["Inhalational vs TIVA in cardiac surgery","High thoracic epidural in cardiac anaesthesia","Dexmedetomidine in cardiac ICU","Goal directed fluid therapy"]},
  {category:"Monitoring & Technology",icon:"📡",items:["Perioperative Transoesophageal Echocardiography","Near-infrared spectroscopy","Advanced haemodynamic monitoring","Point-of-care coagulation testing"]},
  {category:"Paediatric Cardiac",icon:"👶",items:["Anaesthesia for complex congenital heart disease","Hybrid procedures in paediatric patients","ECMO in neonates and infants","Fontan circulation management"]},
  {category:"Critical Care",icon:"🏥",items:["Post-cardiac surgery ICU protocols","Vasopressor and inotrope use","Ventilator strategies post CPB","Renal protection in cardiac surgery"]},
  {category:"Safety & Quality",icon:"🛡️",items:["Checklists and protocols in cardiac OT","Simulation-based training","Crisis resource management","Patient blood management"]},
];
const awards = [
  {title:"Best Paper Award",desc:"Best original research presented",prize:"25,000 + Trophy"},
  {title:"Best Poster Award",desc:"Most impactful poster presentation",prize:"15,000 + Trophy"},
  {title:"IACTA Shield",desc:"Winners of the annual quiz competition",prize:"Shield + Certificates"},
  {title:"Young Anaesthetist Award",desc:"Best presentation by trainee under 35",prize:"10,000 + Certificate"},
];
export default function ScientificPage() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Scientific Programme</h2></div>
      <div style={{padding:16,paddingBottom:80}}>
        <div style={{background:"linear-gradient(135deg, #0a2a6e, #1a3a8e)",borderRadius:16,padding:20,marginBottom:20,color:"white"}}>
          <div style={{fontSize:11,color:"#a7c7ff",marginBottom:6,fontWeight:600}}>CONFERENCE THEME</div>
          <div style={{fontSize:16,fontWeight:700,lineHeight:1.4}}>The Triple Helix of Quality Cardiac Anaesthesia</div>
          <div style={{display:"flex",gap:8,marginTop:12}}>
            {["Safety","Science","Skill"].map(t => <div key={t} style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:600}}>{t}</div>)}
          </div>
        </div>
        <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e",marginBottom:12}}>Scientific Topics</div>
        {topics.map((t,i) => (
          <div key={i} style={{background:"white",borderRadius:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",overflow:"hidden"}}>
            <button onClick={() => setExpanded(expanded === i ? null : i)} style={{width:"100%",padding:"14px 16px",border:"none",background:"none",display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left"}}>
              <span style={{fontSize:22}}>{t.icon}</span>
              <span style={{flex:1,fontWeight:700,fontSize:13,color:"#0a2a6e"}}>{t.category}</span>
              <span style={{fontSize:18,color:"#888"}}>{expanded === i ? "▲" : "▼"}</span>
            </button>
            {expanded === i && <div style={{padding:"0 16px 14px"}}>{t.items.map((item,j) => <div key={j} style={{display:"flex",gap:8,padding:"7px 0",borderTop:"1px solid #eef2ff",fontSize:13,color:"#333"}}><span style={{color:"#0a2a6e",fontWeight:700}}>•</span>{item}</div>)}</div>}
          </div>
        ))}
        <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e",margin:"20px 0 12px"}}>Awards</div>
        {awards.map((a,i) => (
          <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",borderLeft:"4px solid #c8102e"}}>
            <div style={{fontWeight:700,fontSize:13,color:"#0a2a6e"}}>{a.title}</div>
            <div style={{fontSize:12,color:"#555",marginTop:4}}>{a.desc}</div>
            <div style={{marginTop:8,fontSize:12,fontWeight:700,color:"#059669",background:"#ecfdf5",display:"inline-block",padding:"3px 10px",borderRadius:20}}>Rs. {a.prize}</div>
          </div>
        ))}
      </div>
    </div>
  );
}