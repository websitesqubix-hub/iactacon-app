"use client";
import { ArrowLeft, Navigation } from "lucide-react";
import { useState } from "react";
const halls = [
  {name:"Mangrove",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Mangrove-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Mangrove-2.png","https://iactacon2027.com/wp-content/uploads/2026/03/Mangrove-3.png"]},
  {name:"Monarch",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Monarch-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Monarch-2.png","https://iactacon2027.com/wp-content/uploads/2026/03/Monarch-3.png"]},
  {name:"Empress",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Empress-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Empress-2.png","https://iactacon2027.com/wp-content/uploads/2026/03/Empress-3.png"]},
  {name:"Knight",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Knight-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Knight-2.png","https://iactacon2027.com/wp-content/uploads/2026/03/Knight-3.png"]},
  {name:"Terrace",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Terrace-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Terrace-2.png"]},
];
export default function VenuePage() {
  const [activeHall, setActiveHall] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Venue</h2></div>
      <div style={{paddingBottom:80}}>
        <div style={{position:"relative"}}>
          <img src="https://iactacon2027.com/wp-content/uploads/2026/02/new-iacta-venue-pic.jpeg" style={{width:"100%",height:200,objectFit:"cover"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(10,42,110,0.95))",padding:"40px 16px 16px"}}>
            <div style={{color:"white",fontWeight:700,fontSize:15}}>Ozone Convention Centre</div>
            <div style={{color:"#a7c7ff",fontSize:12,marginTop:2}}>By Fairfield Marriott, Kolkata</div>
          </div>
        </div>
        <div style={{background:"#c8102e",color:"white",padding:"12px 16px",display:"flex",justifyContent:"space-around",fontSize:12}}>
          <div style={{textAlign:"center"}}><div style={{fontWeight:700}}>Workshop</div><div>18 Feb 2027</div></div>
          <div style={{width:1,background:"rgba(255,255,255,0.3)"}}/>
          <div style={{textAlign:"center"}}><div style={{fontWeight:700}}>Conference</div><div>19-21 Feb 2027</div></div>
        </div>
        <div style={{padding:16}}>
          <div style={{background:"white",borderRadius:14,padding:16,marginBottom:16,boxShadow:"0 4px 12px rgba(0,0,0,0.06)"}}>
            <div style={{fontWeight:700,fontSize:13,color:"#0a2a6e",marginBottom:12}}>Distance from Key Spots</div>
            {[{label:"Airport",info:"12.0 km - Netaji Subhash Chandra Bose International"},{label:"City Centre",info:"12.5 km - Hatibagan"},{label:"Railway",info:"13.6 km - Dum Dum | 17 km - Howrah"},{label:"Metro",info:"0.7 km - Rabindra Tirtha"}].map((d,i) => (
              <div key={i} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:i<3?"1px solid #eef2ff":"none"}}>
                <div><div style={{fontWeight:600,fontSize:12,color:"#0a2a6e"}}>{d.label}</div><div style={{fontSize:12,color:"#555",marginTop:2}}>{d.info}</div></div>
              </div>
            ))}
          </div>
          <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e",marginBottom:12}}>Conference Halls</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:12}}>
            {halls.map((h,i) => <button key={i} onClick={() => {setActiveHall(i);setActiveImg(0);}} style={{padding:"6px 14px",borderRadius:20,border:"none",background:activeHall===i?"#0a2a6e":"#eef2ff",color:activeHall===i?"white":"#0a2a6e",fontWeight:600,fontSize:12,whiteSpace:"nowrap",cursor:"pointer"}}>{h.name}</button>)}
          </div>
          <div style={{borderRadius:14,overflow:"hidden",marginBottom:8}}><img src={halls[activeHall].images[activeImg]} style={{width:"100%",height:200,objectFit:"cover"}}/></div>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {halls[activeHall].images.map((img,i) => <img key={i} src={img} onClick={() => setActiveImg(i)} style={{width:60,height:50,objectFit:"cover",borderRadius:8,cursor:"pointer",border:activeImg===i?"2px solid #0a2a6e":"2px solid transparent"}}/>)}
          </div>
          <a href="https://www.google.com/maps?q=Ozone+Convention+Centre+Newtown+Kolkata" target="_blank" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#0a2a6e",color:"white",padding:14,borderRadius:12,textDecoration:"none",fontWeight:700,fontSize:14,marginBottom:16}}>
            <Navigation size={18}/> Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}