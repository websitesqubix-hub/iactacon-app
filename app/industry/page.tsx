"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const stalls = [
  { company:"Medtronic India", stall:"A-01", hall:"Exhibition Hall", category:"Devices", desc:"Cardiac monitoring and intervention devices" },
  { company:"Edwards Lifesciences", stall:"A-02", hall:"Exhibition Hall", category:"Valves", desc:"Heart valves and haemodynamic monitoring" },
  { company:"Philips Healthcare", stall:"B-01", hall:"Exhibition Hall", category:"Imaging", desc:"Ultrasound and cardiac imaging solutions" },
  { company:"GE Healthcare", stall:"B-02", hall:"Exhibition Hall", category:"Monitoring", desc:"Patient monitoring systems" },
  { company:"Fresenius Kabi", stall:"C-01", hall:"Exhibition Hall", category:"Pharma", desc:"IV medications and infusion solutions" },
  { company:"Abbott India", stall:"C-02", hall:"Exhibition Hall", category:"Devices", desc:"Structural heart devices" },
];

const subMenus = ["All", "Exhibition", "Stall Layout", "Company Wise"];

export default function IndustryPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = stalls.filter(s =>
    (active === "All" || active === "Exhibition" || active === "Company Wise") &&
    (s.company.toLowerCase().includes(search.toLowerCase()) || s.stall.includes(search))
  );

  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Partners & Sponsors</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Industry Zone</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>Exhibition · Stall Layout · Allocations</div>
        </div>
      </div>

      {/* SUB MENU */}
      <div style={{display:"flex",gap:8,padding:"12px 16px",overflowX:"auto",borderBottom:"1px solid rgba(167,139,250,0.1)"}}>
        {subMenus.map(m => (
          <button key={m} onClick={() => setActive(m)} style={{padding:"6px 14px",borderRadius:20,border:"none",background:active===m?"linear-gradient(135deg,#7c3aed,#6366f1)":"rgba(167,139,250,0.1)",color:active===m?"white":"rgba(196,181,253,0.7)",fontWeight:600,fontSize:11,whiteSpace:"nowrap",cursor:"pointer"}}>
            {m}
          </button>
        ))}
      </div>

      <div style={{padding:16}}>

        {active === "Stall Layout" ? (
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:16,padding:20,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:12}}>🗺️</div>
            <div style={{fontWeight:700,color:"#d4af37",fontSize:15,marginBottom:6}}>Stall Layout Map</div>
            <div style={{color:"rgba(196,181,253,0.6)",fontSize:12,lineHeight:1.6}}>The interactive stall map will be available closer to the conference date.</div>
            <div style={{marginTop:14,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:10,padding:"8px 16px",display:"inline-block",color:"rgba(167,139,250,0.5)",fontSize:11}}>
              Available from 15 Feb 2027
            </div>
          </div>
        ) : (
          <>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company or stall number..." style={{width:"100%",padding:"10px 14px",background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:10,color:"#ede9fe",fontSize:13,outline:"none",fontFamily:"system-ui",marginBottom:14}}/>

            {filtered.map((s,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:14,padding:14,marginBottom:10,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:44,height:44,borderRadius:10,background:"rgba(212,175,55,0.1)",border:"1px solid rgba(212,175,55,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:700,fontSize:12,color:"#d4af37"}}>
                  {s.stall}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#ede9fe"}}>{s.company}</div>
                  <div style={{fontSize:11,color:"rgba(167,139,250,0.5)",marginTop:2}}>📍 {s.hall}</div>
                  <div style={{fontSize:11,color:"rgba(196,181,253,0.6)",marginTop:4}}>{s.desc}</div>
                  <span style={{fontSize:10,background:"rgba(212,175,55,0.1)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:20,padding:"2px 8px",color:"#d4af37",fontWeight:600,marginTop:6,display:"inline-block"}}>{s.category}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}