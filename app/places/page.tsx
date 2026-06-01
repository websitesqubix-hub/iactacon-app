"use client";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";
const places = [
  {name:"Victoria Memorial",category:"Heritage",dist:"14 km",desc:"Iconic white marble monument built during British India.",emoji:"🏛️",color:"#7c3aed",maps:"https://maps.google.com/?q=Victoria+Memorial+Kolkata"},
  {name:"Howrah Bridge",category:"Landmark",dist:"17 km",desc:"Cantilever bridge over Hooghly river.",emoji:"🌉",color:"#0369a1",maps:"https://maps.google.com/?q=Howrah+Bridge+Kolkata"},
  {name:"Dakshineswar Kali Temple",category:"Spiritual",dist:"8 km",desc:"Famous riverside temple dedicated to Goddess Kali.",emoji:"🛕",color:"#b45309",maps:"https://maps.google.com/?q=Dakshineswar+Kali+Temple+Kolkata"},
  {name:"Science City Kolkata",category:"Education",dist:"10 km",desc:"Largest science centre in South Asia.",emoji:"🔬",color:"#059669",maps:"https://maps.google.com/?q=Science+City+Kolkata"},
  {name:"New Town Eco Park",category:"Nature",dist:"2 km",desc:"480 acres urban park. Walking distance from venue!",emoji:"🌿",color:"#059669",maps:"https://maps.google.com/?q=Eco+Park+New+Town+Kolkata"},
  {name:"Park Street",category:"Food & Culture",dist:"15 km",desc:"Kolkata restaurant mile - Bengali cuisine, rolls, mishti doi.",emoji:"🍽️",color:"#c8102e",maps:"https://maps.google.com/?q=Park+Street+Kolkata"},
  {name:"Rabindra Sarobar Lake",category:"Nature",dist:"16 km",desc:"Peaceful lakeside park for morning walks.",emoji:"🦢",color:"#0369a1",maps:"https://maps.google.com/?q=Rabindra+Sarobar+Kolkata"},
  {name:"Marble Palace",category:"Heritage",dist:"18 km",desc:"19th century mansion with European artworks.",emoji:"🏰",color:"#7c3aed",maps:"https://maps.google.com/?q=Marble+Palace+Kolkata"},
];
const categories = ["All","Heritage","Nature","Food & Culture","Spiritual","Landmark"];
export default function PlacesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = places.filter(p => filter === "All" || p.category === filter);
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Places to Visit</h2></div>
      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"white",overflowX:"auto",borderBottom:"1px solid #eef2ff"}}>
        {categories.map(c => <button key={c} onClick={() => setFilter(c)} style={{padding:"6px 12px",borderRadius:20,border:"none",background:filter===c?"#0a2a6e":"#eef2ff",color:filter===c?"white":"#0a2a6e",fontWeight:600,fontSize:11,whiteSpace:"nowrap",cursor:"pointer"}}>{c}</button>)}
      </div>
      <div style={{padding:16,paddingBottom:80}}>
        <div style={{background:"#eef2ff",borderRadius:10,padding:12,marginBottom:16,fontSize:12,color:"#0a2a6e"}}>Distances from Ozone Convention Centre, New Town</div>
        {filtered.map((p,i) => (
          <div key={i} style={{background:"white",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 4px 12px rgba(0,0,0,0.06)",borderLeft:"4px solid "+p.color}}>
            <div style={{display:"flex",gap:12}}>
              <div style={{width:52,height:52,borderRadius:14,background:"#f8faff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{p.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e"}}>{p.name}</div>
                <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:"#f0f4ff",color:p.color,fontWeight:700}}>{p.category}</span>
                  <span style={{fontSize:11,color:"#c8102e",fontWeight:600}}>📍 {p.dist}</span>
                </div>
                <div style={{fontSize:12,color:"#555",marginTop:6,lineHeight:1.5}}>{p.desc}</div>
                <a href={p.maps} target="_blank" style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:8,fontSize:12,color:"#0a2a6e",fontWeight:600,textDecoration:"none",background:"#eef2ff",padding:"5px 12px",borderRadius:8}}><MapPin size={12}/> View on Map</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}