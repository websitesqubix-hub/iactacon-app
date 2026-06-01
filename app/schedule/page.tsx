"use client";
import { useState } from "react";
import { ArrowLeft, MapPin, Star } from "lucide-react";

const days = [
  {
    date:"18 Feb 2027", label:"Workshop",
    sessions:[
      {time:"08:00",title:"Registration & Welcome Kit",location:"Lobby",type:"admin"},
      {time:"09:00",title:"Workshop: Perioperative TEE Basics",location:"Mangrove Hall",type:"workshop",speaker:"Dr. A. Sharma"},
      {time:"11:00",title:"Coffee Break",location:"Terrace",type:"break"},
      {time:"11:30",title:"Workshop: Haemodynamic Monitoring",location:"Monarch Hall",type:"workshop",speaker:"Dr. R. Mehta"},
      {time:"13:00",title:"Lunch Break",location:"Dining Hall",type:"break"},
      {time:"14:00",title:"Hands-on: Simulation Lab",location:"Knight Hall",type:"workshop",speaker:"Faculty Team"},
      {time:"17:00",title:"Workshop Concludes",location:"",type:"admin"},
    ]
  },
  {
    date:"19 Feb 2027", label:"Day 1",
    sessions:[
      {time:"08:30",title:"Inauguration Ceremony",location:"Mangrove Hall",type:"special"},
      {time:"10:00",title:"Keynote: Advances in Cardiac Anaesthesia",location:"Mangrove Hall",type:"keynote",speaker:"Dr. P. Krishnan"},
      {time:"11:30",title:"Coffee Break",location:"Terrace",type:"break"},
      {time:"12:00",title:"Panel: Safety Protocols in Cardiac OT",location:"Monarch Hall",type:"session",speaker:"Multiple Speakers"},
      {time:"13:30",title:"Lunch & Networking",location:"Dining Hall",type:"break"},
      {time:"14:30",title:"Abstract Presentations – Group A",location:"Empress Hall",type:"abstract"},
      {time:"16:00",title:"State of the Art Lecture",location:"Mangrove Hall",type:"keynote",speaker:"Dr. S. Bose"},
      {time:"17:30",title:"Cultural Evening & Welcome Dinner",location:"Terrace",type:"special"},
    ]
  },
  {
    date:"20 Feb 2027", label:"Day 2",
    sessions:[
      {time:"09:00",title:"Keynote: Paediatric Cardiac Anaesthesia",location:"Mangrove Hall",type:"keynote",speaker:"Dr. M. Verma"},
      {time:"10:30",title:"Coffee Break",location:"Terrace",type:"break"},
      {time:"11:00",title:"Symposium: ECMO & Advanced Support",location:"Monarch Hall",type:"session",speaker:"Panel"},
      {time:"13:00",title:"Lunch Break",location:"Dining Hall",type:"break"},
      {time:"14:00",title:"Abstract Presentations – Group B",location:"Empress Hall",type:"abstract"},
      {time:"15:30",title:"Quiz Competition – IACTA Shield",location:"Knight Hall",type:"special"},
      {time:"17:00",title:"AGM – WBACTVA",location:"Mangrove Hall",type:"admin"},
      {time:"19:30",title:"Conference Gala Dinner",location:"Banquet Hall",type:"special"},
    ]
  },
  {
    date:"21 Feb 2027", label:"Day 3",
    sessions:[
      {time:"09:00",title:"Symposium: Post-op ICU Care",location:"Mangrove Hall",type:"session",speaker:"Dr. K. Das"},
      {time:"09:00",title:"Inhalational vs TIVA in Cardiac Surgery",location:"Monarch Hall",type:"session",speaker:"Dr. N. Gupta"},
      {time:"10:30",title:"Coffee Break",location:"Terrace",type:"break"},
      {time:"11:00",title:"TEE Workshop: Advanced Cases",location:"Mangrove Hall",type:"workshop",speaker:"Faculty"},
      {time:"11:00",title:"Goal Directed Fluid Therapy",location:"Monarch Hall",type:"session",speaker:"Dr. T. Iyer"},
      {time:"12:00",title:"Award Presentations – Best Abstract",location:"Mangrove Hall",type:"special"},
      {time:"12:30",title:"Valedictory & Closing Ceremony",location:"Mangrove Hall",type:"special"},
      {time:"13:30",title:"Farewell Lunch",location:"Dining Hall",type:"break"},
    ]
  },
];

const typeConfig: Record<string,{color:string;bg:string;label:string}> = {
  keynote:{color:"#a78bfa",bg:"rgba(167,139,250,0.15)",label:"Keynote"},
  workshop:{color:"#60a5fa",bg:"rgba(96,165,250,0.15)",label:"Workshop"},
  session:{color:"#818cf8",bg:"rgba(129,140,248,0.15)",label:"Session"},
  abstract:{color:"#d4af37",bg:"rgba(212,175,55,0.15)",label:"Abstract"},
  special:{color:"#f472b6",bg:"rgba(244,114,182,0.15)",label:"Special"},
  break:{color:"#34d399",bg:"rgba(52,211,153,0.15)",label:"Break"},
  admin:{color:"rgba(167,139,250,0.5)",bg:"rgba(167,139,250,0.08)",label:"Info"},
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);
  const [wishlist, setWishlist] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("schedule_wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const isWishlisted = (session: any) =>
    wishlist.some(w => w.title === session.title && w.time === session.time);

  const toggleWishlist = (session: any) => {
    const day = days[activeDay];
    const item = { ...session, day: day.label, date: day.date };
    let updated;
    if (isWishlisted(session)) {
      updated = wishlist.filter(w => !(w.title === session.title && w.time === session.time));
    } else {
      updated = [...wishlist, item];
    }
    setWishlist(updated);
    localStorage.setItem("schedule_wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 16px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1,marginBottom:12}}>
          <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none"}}>
            <ArrowLeft size={16}/> Back
          </a>
          <a href="/my-activities" style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:20,padding:"4px 12px",color:"#d4af37",fontSize:11,fontWeight:600,textDecoration:"none"}}>
            <Star size={12}/> My List ({wishlist.length})
          </a>
        </div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Programme</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Schedule</div>
        </div>
      </div>

      {/* DAY TABS */}
      <div style={{background:"rgba(26,5,51,0.9)",display:"flex",overflowX:"auto",borderBottom:"1px solid rgba(167,139,250,0.15)",position:"sticky",top:0,zIndex:10}}>
        {days.map((d,i) => (
          <button key={i} onClick={() => setActiveDay(i)} style={{
            padding:"12px 16px",border:"none",background:"none",cursor:"pointer",whiteSpace:"nowrap",fontWeight:700,fontSize:11,
            color:activeDay===i?"#d4af37":"rgba(167,139,250,0.5)",
            borderBottom:activeDay===i?"2px solid #d4af37":"2px solid transparent",
          }}>
            <div>{d.label}</div>
            <div style={{fontSize:9,fontWeight:400,marginTop:1,opacity:0.7}}>{d.date}</div>
          </button>
        ))}
      </div>

      <div style={{padding:16}}>
        {days[activeDay].sessions.map((s,i) => {
          const cfg = typeConfig[s.type];
          const wishlisted = isWishlisted(s);
          return (
            <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
              <div style={{minWidth:40,textAlign:"center",paddingTop:4}}>
                <div style={{fontSize:11,fontWeight:700,color:"#d4af37"}}>{s.time}</div>
                {i < days[activeDay].sessions.length-1 && (
                  <div style={{width:1,height:"calc(100% + 10px)",background:"rgba(212,175,55,0.15)",margin:"4px auto 0"}}/>
                )}
              </div>
              <div style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 12px",borderLeft:`3px solid ${cfg.color}`,position:"relative"}}>
                <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,background:cfg.bg,color:cfg.color,display:"inline-block",marginBottom:6}}>{cfg.label}</span>
                <div style={{fontWeight:700,fontSize:12,color:"#ede9fe",marginBottom:3}}>{s.title}</div>
                {s.speaker && <div style={{fontSize:11,color:"#a78bfa",marginBottom:2}}>🎤 {s.speaker}</div>}
                {s.location && <div style={{fontSize:10,color:"rgba(167,139,250,0.4)",display:"flex",alignItems:"center",gap:3}}><MapPin size={9}/>{s.location}</div>}
                {s.type !== "break" && s.type !== "admin" && (
                  <button onClick={() => toggleWishlist(s)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",cursor:"pointer",fontSize:16,opacity:wishlisted?1:0.3}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#d4af37" : "none"} stroke={wishlisted ? "#d4af37" : "rgba(167,139,250,0.5)"} strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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