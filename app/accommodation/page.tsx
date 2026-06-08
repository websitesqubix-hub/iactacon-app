"use client";
import { ArrowLeft, ExternalLink } from "lucide-react";
const hotels = [
  {name:"Fairfield by Marriott Kolkata",distance:"0 km",badge:"Official Hotel",desc:"The official conference hotel. Best rates for delegates.",url:"https://www.marriott.com/en-us/hotels/ccufi-fairfield-kolkata/overview/",emoji:"⭐"},
  {name:"Holiday Inn Express New Town",distance:"2.5 km",badge:null,desc:"Modern rooms with complimentary breakfast included.",url:"https://www.ihg.com/holidayinnexpress/hotels/us/en/kolkata/ccukt/hoteldetail",emoji:"🏨"},
  {name:"Pride Plaza Hotel Kolkata",distance:"1.8 km",badge:null,desc:"Luxury rooms with conference-friendly amenities.",url:"https://www.pridehotel.com/pride-plaza-hotel-kolkata/",emoji:"🏩"},
  {name:"Lemon Tree Premier New Town",distance:"2.2 km",badge:null,desc:"Contemporary hotel with excellent dining options.",url:"https://www.lemontreehotels.com/lemon-tree-premier/kolkata/new-town-kolkata",emoji:"🍋"},
  {name:"Novotel Kolkata Hotel & Residences",distance:"3.1 km",badge:null,desc:"Premium hotel with spa and wellness facilities.",url:"https://www.novotelkolkata.com/",emoji:"🌟"},
];
export default function AccommodationPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Where to Stay</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Accommodation</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Hotels near Ozone Convention Centre</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:14,marginBottom:20,fontSize:12,color:"#8a6914",lineHeight:1.6}}>
          💡 Book early for best rates. Mention IACTACON 2027 at the official hotel for delegate discounts.
        </div>
        {hotels.map((hotel,i) => (
          <div key={i} style={{background:"white",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 3px 12px rgba(91,143,168,0.08)",border:hotel.badge?"2px solid rgba(201,168,76,0.4)":"1px solid rgba(91,143,168,0.12)",overflow:"hidden",position:"relative"}}>
            {hotel.badge&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#c9a84c,#f0d060)"}}/>}
            <div style={{display:"flex",alignItems:"flex-start",gap:12,marginTop:hotel.badge?4:0}}>
              <div style={{fontSize:28,width:48,height:48,background:"#f8f4ee",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{hotel.emoji}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#1a3a5c"}}>{hotel.name}</div>
                  {hotel.badge&&<span style={{background:"#fff8e1",color:"#8a6914",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,border:"1px solid rgba(201,168,76,0.3)"}}>{hotel.badge}</span>}
                </div>
                <div style={{fontSize:11,color:"#5b8fa8",fontWeight:600,marginTop:2,marginBottom:6}}>📍 {hotel.distance} from venue</div>
                <div style={{fontSize:12,color:"#555",marginBottom:10}}>{hotel.desc}</div>
                <a href={hotel.url} target="_blank" style={{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>
                  Book Now <ExternalLink size={12}/>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}