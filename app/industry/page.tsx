"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
const stalls = [
  {company:"Medtronic India",stall:"A-01",hall:"Exhibition Hall",category:"Devices",desc:"Cardiac monitoring and intervention devices"},
  {company:"Edwards Lifesciences",stall:"A-02",hall:"Exhibition Hall",category:"Valves",desc:"Heart valves and haemodynamic monitoring"},
  {company:"Philips Healthcare",stall:"B-01",hall:"Exhibition Hall",category:"Imaging",desc:"Ultrasound and cardiac imaging solutions"},
  {company:"GE Healthcare",stall:"B-02",hall:"Exhibition Hall",category:"Monitoring",desc:"Patient monitoring systems"},
  {company:"Fresenius Kabi",stall:"C-01",hall:"Exhibition Hall",category:"Pharma",desc:"IV medications and infusion solutions"},
  {company:"Abbott India",stall:"C-02",hall:"Exhibition Hall",category:"Devices",desc:"Structural heart devices"},
];
const subMenus = ["All","Exhibition","Stall Layout","Company Wise"];
export default function IndustryPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = stalls.filter(s=>s.company.toLowerCase().includes(search.toLowerCase())||s.stall.includes(search));
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1,marginBottom:14}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Partners & Sponsors</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Industry Zone</div>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12,position:"relative",zIndex:1}}>
          {subMenus.map(m=>(
            <button key={m} onClick={()=>setActive(m)} style={{padding:"6px 14px",borderRadius:20,border:"none",background:active===m?"rgba(201,168,76,0.3)":"rgba(255,255,255,0.1)",color:active===m?"#f0d060":"rgba(255,255,255,0.7)",fontWeight:600,fontSize:11,whiteSpace:"nowrap",cursor:"pointer",borderBottom:active===m?"2px solid #c9a84c":"2px solid transparent"}}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        {active==="Stall Layout"?(
          <div style={{background:"white",borderRadius:16,padding:24,textAlign:"center",border:"1px solid rgba(201,168,76,0.2)"}}>
            <div style={{fontSize:40,marginBottom:12}}>🗺️</div>
            <div style={{fontWeight:700,color:"#1a3a5c",fontSize:15,marginBottom:6}}>Stall Layout Map</div>
            <div style={{color:"#7a8a99",fontSize:12,lineHeight:1.6}}>The interactive stall map will be available closer to the conference.</div>
            <div style={{marginTop:14,background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:10,padding:"8px 16px",display:"inline-block",color:"#8a6914",fontSize:11}}>Available from 15 Feb 2027</div>
          </div>
        ):(
          <>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company or stall..." style={{width:"100%",padding:"10px 14px",background:"white",border:"1.5px solid rgba(91,143,168,0.2)",borderRadius:10,color:"#1a3a5c",fontSize:13,outline:"none",fontFamily:"system-ui",marginBottom:14}}/>
            {filtered.map((s,i)=>(
              <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid rgba(201,168,76,0.15)",boxShadow:"0 2px 8px rgba(91,143,168,0.06)",display:"flex",gap:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:800,fontSize:12,color:"#8a6914"}}>{s.stall}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#1a3a5c"}}>{s.company}</div>
                  <div style={{fontSize:11,color:"#5b8fa8",marginTop:2}}>📍 {s.hall}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:4}}>{s.desc}</div>
                  <span style={{fontSize:9,background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:20,padding:"2px 8px",color:"#8a6914",fontWeight:700,marginTop:5,display:"inline-block"}}>{s.category}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}