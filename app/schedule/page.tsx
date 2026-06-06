"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star } from "lucide-react";

const days = [
  { date:"18 Feb 2027", label:"Workshop", sessions:[
    {time:"08:00",title:"Registration & Welcome Kit",location:"Lobby",type:"admin"},
    {time:"09:00",title:"Workshop: Perioperative TEE Basics",location:"Mangrove Hall",type:"workshop",speaker:"Dr. A. Sharma"},
    {time:"11:00",title:"Coffee Break",location:"Terrace",type:"break"},
    {time:"11:30",title:"Workshop: Haemodynamic Monitoring",location:"Monarch Hall",type:"workshop",speaker:"Dr. R. Mehta"},
    {time:"13:00",title:"Lunch Break",location:"Dining Hall",type:"break"},
    {time:"14:00",title:"Hands-on: Simulation Lab",location:"Knight Hall",type:"workshop",speaker:"Faculty Team"},
    {time:"17:00",title:"Workshop Concludes",location:"",type:"admin"},
  ]},
  { date:"19 Feb 2027", label:"Day 1", sessions:[
    {time:"08:30",title:"Inauguration Ceremony",location:"Mangrove Hall",type:"special"},
    {time:"10:00",title:"Keynote: Advances in Cardiac Anaesthesia",location:"Mangrove Hall",type:"keynote",speaker:"Dr. P. Krishnan"},
    {time:"11:30",title:"Coffee Break",location:"Terrace",type:"break"},
    {time:"12:00",title:"Panel: Safety Protocols in Cardiac OT",location:"Monarch Hall",type:"session",speaker:"Multiple Speakers"},
    {time:"13:30",title:"Lunch & Networking",location:"Dining Hall",type:"break"},
    {time:"14:30",title:"Abstract Presentations Group A",location:"Empress Hall",type:"abstract"},
    {time:"16:00",title:"State of the Art Lecture",location:"Mangrove Hall",type:"keynote",speaker:"Dr. S. Bose"},
    {time:"17:30",title:"Cultural Evening & Welcome Dinner",location:"Terrace",type:"special"},
  ]},
  { date:"20 Feb 2027", label:"Day 2", sessions:[
    {time:"09:00",title:"Keynote: Paediatric Cardiac Anaesthesia",location:"Mangrove Hall",type:"keynote",speaker:"Dr. M. Verma"},
    {time:"10:30",title:"Coffee Break",location:"Terrace",type:"break"},
    {time:"11:00",title:"Symposium: ECMO & Advanced Support",location:"Monarch Hall",type:"session",speaker:"Panel"},
    {time:"13:00",title:"Lunch Break",location:"Dining Hall",type:"break"},
    {time:"14:00",title:"Abstract Presentations Group B",location:"Empress Hall",type:"abstract"},
    {time:"15:30",title:"Quiz Competition — IACTA Shield",location:"Knight Hall",type:"special"},
    {time:"17:00",title:"AGM — WBACTVA",location:"Mangrove Hall",type:"admin"},
    {time:"19:30",title:"Conference Gala Dinner",location:"Banquet Hall",type:"special"},
  ]},
  { date:"21 Feb 2027", label:"Day 3", sessions:[
    {time:"09:00",title:"Symposium: Post-op ICU Care",location:"Mangrove Hall",type:"session",speaker:"Dr. K. Das"},
    {time:"09:00",title:"Inhalational vs TIVA in Cardiac Surgery",location:"Monarch Hall",type:"session",speaker:"Dr. N. Gupta"},
    {time:"10:30",title:"Coffee Break",location:"Terrace",type:"break"},
    {time:"11:00",title:"Goal Directed Fluid Therapy",location:"Monarch Hall",type:"session",speaker:"Dr. T. Iyer"},
    {time:"12:00",title:"Award Presentations",location:"Mangrove Hall",type:"special"},
    {time:"12:30",title:"Valedictory & Closing Ceremony",location:"Mangrove Hall",type:"special"},
    {time:"13:30",title:"Farewell Lunch",location:"Dining Hall",type:"break"},
  ]},
];

const typeConfig: Record<string,{color:string;bg:string;label:string}> = {
  keynote:{color:"#5b8fa8",bg:"rgba(91,143,168,0.12)",label:"Keynote"},
  workshop:{color:"#3d6b82",bg:"rgba(61,107,130,0.12)",label:"Workshop"},
  session:{color:"#1a3a5c",bg:"rgba(26,58,92,0.1)",label:"Session"},
  abstract:{color:"#c9a84c",bg:"rgba(201,168,76,0.12)",label:"Abstract"},
  special:{color:"#c8102e",bg:"rgba(200,16,46,0.08)",label:"Special"},
  break:{color:"#2e7d32",bg:"rgba(46,125,50,0.1)",label:"Break"},
  admin:{color:"#7a8a99",bg:"rgba(122,138,153,0.1)",label:"Info"},
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("schedule_wishlist");
    if (saved) { try { setWishlist(JSON.parse(saved)); } catch {} }
  }, []);

  const isWishlisted = (session: any) =>
    wishlist.some(w => w.title===session.title && w.time===session.time && w.day===days[activeDay].label);

  const toggleWishlist = (session: any) => {
    const item = {...session, day:days[activeDay].label, date:days[activeDay].date};
    let updated: any[];
    if (isWishlisted(session)) {
      updated = wishlist.filter(w => !(w.title===session.title && w.time===session.time && w.day===days[activeDay].label));
    } else {
      updated = [...wishlist, item];
    }
    setWishlist(updated);
    localStorage.setItem("schedule_wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 16px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1,marginBottom:12}}>
          <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none"}}>
            <ArrowLeft size={16}/> Back
          </a>
          <a href="/my-activities" style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(201,168,76,0.2)",border:"1px solid rgba(201,168,76,0.4)",borderRadius:20,padding:"4px 12px",color:"#c9a84c",fontSize:11,fontWeight:600,textDecoration:"none"}}>
            <Star size={12}/> My List ({wishlist.length})
          </a>
        </div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Programme</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Schedule</div>
        </div>
      </div>

      <div style={{background:"white",display:"flex",overflowX:"auto",borderBottom:"1px solid rgba(91,143,168,0.15)",position:"sticky",top:0,zIndex:10}}>
        {days.map((d,i) => (
          <button key={i} onClick={()=>setActiveDay(i)} style={{padding:"12px 16px",border:"none",background:"none",cursor:"pointer",whiteSpace:"nowrap",fontWeight:700,fontSize:11,color:activeDay===i?"#1a3a5c":"#7a8a99",borderBottom:activeDay===i?"3px solid #c9a84c":"3px solid transparent"}}>
            <div>{d.label}</div>
            <div style={{fontSize:9,fontWeight:400,marginTop:1,opacity:0.7}}>{d.date}</div>
          </button>
        ))}
      </div>

      <div style={{padding:16}}>
        {days[activeDay].sessions.map((s,i) => {
          const cfg = typeConfig[s.type];
          const wishlisted = isWishlisted(s);
          const canWishlist = s.type!=="break" && s.type!=="admin";
          return (
            <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
              <div style={{minWidth:40,textAlign:"center",paddingTop:4}}>
                <div style={{fontSize:11,fontWeight:700,color:"#c9a84c"}}>{s.time}</div>
                {i<days[activeDay].sessions.length-1&&<div style={{width:1,height:"calc(100% + 10px)",background:"rgba(201,168,76,0.2)",margin:"4px auto 0"}}/>}
              </div>
              <div style={{flex:1,background:"white",borderRadius:12,padding:"10px 12px",border:`1px solid rgba(91,143,168,0.12)`,borderLeft:`3px solid ${cfg.color}`,boxShadow:"0 2px 6px rgba(91,143,168,0.06)",position:"relative"}}>
                <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,background:cfg.bg,color:cfg.color,display:"inline-block",marginBottom:5}}>{cfg.label}</span>
                <div style={{fontWeight:700,fontSize:12,color:"#1a3a5c",marginBottom:3,paddingRight:canWishlist?24:0}}>{s.title}</div>
                {(s as any).speaker&&<div style={{fontSize:11,color:"#5b8fa8",marginBottom:2}}>🎤 {(s as any).speaker}</div>}
                {s.location&&<div style={{fontSize:10,color:"#7a8a99",display:"flex",alignItems:"center",gap:3}}><MapPin size={9}/>{s.location}</div>}
                {canWishlist&&(
                  <button onClick={()=>toggleWishlist(s)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",cursor:"pointer",padding:2}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted?"#c9a84c":"none"} stroke={wishlisted?"#c9a84c":"#c9a84c"} strokeWidth="2" strokeLinecap="round">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}