"use client";
import { ArrowLeft, Navigation } from "lucide-react";
import { useState } from "react";
const halls = [
  {name:"Mangrove",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Mangrove-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Mangrove-2.png"]},
  {name:"Monarch",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Monarch-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Monarch-2.png"]},
  {name:"Empress",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Empress-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Empress-2.png"]},
  {name:"Knight",images:["https://iactacon2027.com/wp-content/uploads/2026/03/Knight-1.png","https://iactacon2027.com/wp-content/uploads/2026/03/Knight-2.png"]},
];
export default function VenuePage() {
  const [activeHall,setActiveHall]=useState(0);
  const [activeImg,setActiveImg]=useState(0);
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{position:"relative"}}>
        <img src="https://iactacon2027.com/wp-content/uploads/2026/02/new-iacta-venue-pic.jpeg" style={{width:"100%",height:200,objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent,rgba(26,58,92,0.9))"}}/>
        <a href="/" style={{position:"absolute",top:20,left:16,display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.8)",fontSize:12,textDecoration:"none",background:"rgba(0,0,0,0.2)",borderRadius:20,padding:"4px 10px"}}>
          <ArrowLeft size={14}/> Back
        </a>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px 16px"}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Conference Venue</div>
          <div style={{color:"white",fontWeight:800,fontSize:18}}>Ozone Convention Centre</div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,marginTop:2}}>By Fairfield Marriott, Newtown, Kolkata</div>
        </div>
      </div>
      <div style={{background:"#1a3a5c",display:"flex",padding:"10px 0"}}>
        <div style={{flex:1,textAlign:"center",borderRight:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{fontSize:9,color:"#c9a84c",fontWeight:700,textTransform:"uppercase"}}>Workshop</div>
          <div style={{fontSize:12,color:"white",fontWeight:700}}>18 Feb 2027</div>
        </div>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:9,color:"#c9a84c",fontWeight:700,textTransform:"uppercase"}}>Conference</div>
          <div style={{fontSize:12,color:"white",fontWeight:700}}>19-21 Feb 2027</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"white",borderRadius:14,padding:16,marginBottom:16,border:"1px solid rgba(91,143,168,0.12)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:10}}>Distance from Key Spots</div>
          {[{icon:"✈️",label:"Airport",info:"12.0 km — Netaji Subhash Chandra Bose International"},{icon:"🚇",label:"Metro",info:"0.7 km — Rabindra Tirtha Station"},{icon:"🚆",label:"Railway",info:"13.6 km — Dum Dum | 17 km — Howrah"},{icon:"🏙️",label:"City Centre",info:"12.5 km — Hatibagan"}].map((d,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<3?"1px solid rgba(91,143,168,0.08)":"none",alignItems:"flex-start"}}>
              <span style={{fontSize:16,minWidth:24}}>{d.icon}</span>
              <div><div style={{fontWeight:600,fontSize:12,color:"#1a3a5c"}}>{d.label}</div><div style={{fontSize:11,color:"#555",marginTop:1}}>{d.info}</div></div>
            </div>
          ))}
        </div>
        <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:10}}>Conference Halls</div>
        <div style={{display:"flex",gap:8,marginBottom:12,overflowX:"auto"}}>
          {halls.map((h,i)=><button key={i} onClick={()=>{setActiveHall(i);setActiveImg(0);}} style={{padding:"6px 14px",borderRadius:20,border:"none",background:activeHall===i?"linear-gradient(135deg,#1a3a5c,#3d6b82)":"rgba(91,143,168,0.08)",color:activeHall===i?"white":"#3d6b82",fontWeight:600,fontSize:12,whiteSpace:"nowrap",cursor:"pointer"}}>{h.name}</button>)}
        </div>
        <div style={{borderRadius:14,overflow:"hidden",marginBottom:8}}><img src={halls[activeHall].images[activeImg]} style={{width:"100%",height:180,objectFit:"cover"}}/></div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {halls[activeHall].images.map((img,i)=><img key={i} src={img} onClick={()=>setActiveImg(i)} style={{width:56,height:44,objectFit:"cover",borderRadius:8,cursor:"pointer",border:activeImg===i?"2px solid #c9a84c":"2px solid transparent"}}/>)}
        </div>
        <a href="https://www.google.com/maps?q=Ozone+Convention+Centre+Newtown+Kolkata" target="_blank" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",padding:14,borderRadius:12,textDecoration:"none",fontWeight:700,fontSize:14}}>
          <Navigation size={18}/> Open in Google Maps
        </a>
      </div>
    </div>
  );
}