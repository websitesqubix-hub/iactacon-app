"use client";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";

const places = [
  {name:"Victoria Memorial",category:"Heritage",dist:"14 km",desc:"Iconic white marble monument built during British India. A must-visit Kolkata landmark.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Victoria_Memorial_Kolkata_2010.jpg/640px-Victoria_Memorial_Kolkata_2010.jpg",maps:"https://maps.google.com/?q=Victoria+Memorial+Kolkata"},
  {name:"Howrah Bridge",category:"Landmark",dist:"17 km",desc:"Cantilever bridge over the Hooghly river — one of the busiest bridges in the world.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Howrah_bridge_-_kolkata.jpg/640px-Howrah_bridge_-_kolkata.jpg",maps:"https://maps.google.com/?q=Howrah+Bridge+Kolkata"},
  {name:"Dakshineswar Kali Temple",category:"Spiritual",dist:"8 km",desc:"Famous riverside temple dedicated to Goddess Kali, built in 1855 by Rani Rashmoni.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dakshineswar_Kali_Temple_1.jpg/640px-Dakshineswar_Kali_Temple_1.jpg",maps:"https://maps.google.com/?q=Dakshineswar+Kali+Temple+Kolkata"},
  {name:"Science City Kolkata",category:"Education",dist:"10 km",desc:"Largest science centre in South Asia with interactive exhibits and a planetarium.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Science_City_Kolkata_1.jpg/640px-Science_City_Kolkata_1.jpg",maps:"https://maps.google.com/?q=Science+City+Kolkata"},
  {name:"New Town Eco Park",category:"Nature",dist:"2 km",desc:"480 acres urban park with lake and replicas of 7 wonders. Walking distance from venue!",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Eco_Park_Kolkata.jpg/640px-Eco_Park_Kolkata.jpg",maps:"https://maps.google.com/?q=Eco+Park+New+Town+Kolkata"},
  {name:"Park Street",category:"Food & Culture",dist:"15 km",desc:"Kolkata restaurant mile — Bengali cuisine, rolls, mishti doi and more.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Park_Street_Kolkata.jpg/640px-Park_Street_Kolkata.jpg",maps:"https://maps.google.com/?q=Park+Street+Kolkata"},
  {name:"Marble Palace",category:"Heritage",dist:"18 km",desc:"19th century mansion with European artworks and a private zoo.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Marble_Palace_Kolkata.jpg/640px-Marble_Palace_Kolkata.jpg",maps:"https://maps.google.com/?q=Marble+Palace+Kolkata"},
  {name:"Mother's Wax Museum",category:"Heritage",dist:"12 km",desc:"Kolkata's premier wax museum featuring lifelike statues of celebrities and historical figures.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Wax_museum_kolkata.jpg/640px-Wax_museum_kolkata.jpg",maps:"https://maps.google.com/?q=Mothers+Wax+Museum+Kolkata"},
  {name:"Rabindra Sarobar Lake",category:"Nature",dist:"16 km",desc:"Peaceful lakeside park — perfect for an early morning walk and boat rides.",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Rabindra_Sarobar_Lake.jpg/640px-Rabindra_Sarobar_Lake.jpg",maps:"https://maps.google.com/?q=Rabindra+Sarobar+Kolkata"},
];

const categories = ["All","Heritage","Nature","Food & Culture","Spiritual","Landmark","Education"];

export default function PlacesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = places.filter(p => filter==="All" || p.category===filter);

  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Explore Kolkata</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Places to Visit</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Discover the City of Joy</div>
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"white",overflowX:"auto",borderBottom:"1px solid rgba(91,143,168,0.1)"}}>
        {categories.map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:"6px 14px",borderRadius:20,border:"none",background:filter===c?"linear-gradient(135deg,#1a3a5c,#3d6b82)":"rgba(91,143,168,0.08)",color:filter===c?"white":"#3d6b82",fontWeight:600,fontSize:11,whiteSpace:"nowrap",cursor:"pointer"}}>
            {c}
          </button>
        ))}
      </div>

      <div style={{padding:16}}>
        <div style={{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:"8px 12px",marginBottom:16,fontSize:11,color:"#8a6914"}}>
          📍 Distances from Ozone Convention Centre, Newtown
        </div>
        {filtered.map((p,i)=>(
          <div key={i} style={{background:"white",borderRadius:16,marginBottom:14,border:"1px solid rgba(91,143,168,0.12)",boxShadow:"0 3px 12px rgba(91,143,168,0.08)",overflow:"hidden"}}>
            <div style={{position:"relative",height:160}}>
              <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e:any)=>{e.target.style.display="none";}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,rgba(26,58,92,0.85) 100%)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 14px"}}>
                <div style={{color:"white",fontWeight:800,fontSize:14}}>{p.name}</div>
                <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                  <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:"rgba(201,168,76,0.3)",color:"#f0d060",fontWeight:700}}>{p.category}</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,0.8)",fontWeight:600}}>📍 {p.dist}</span>
                </div>
              </div>
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:10}}>{p.desc}</div>
              <a href={p.maps} target="_blank" style={{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",padding:"7px 14px",borderRadius:8,fontSize:11,fontWeight:600,textDecoration:"none"}}>
                <MapPin size={12}/> View on Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}