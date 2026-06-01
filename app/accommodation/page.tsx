"use client";
import { ArrowLeft, ExternalLink } from "lucide-react";
const hotels = [
  {name:"Fairfield by Marriott Kolkata",distance:"0 km",badge:"Official Hotel",badgeColor:"#059669",desc:"The official conference hotel. Best rates for delegates.",url:"https://www.marriott.com/en-us/hotels/ccufi-fairfield-kolkata/overview/",emoji:"⭐"},
  {name:"Holiday Inn Express New Town",distance:"2.5 km",badge:null,badgeColor:null,desc:"Modern rooms with complimentary breakfast included.",url:"https://www.ihg.com/holidayinnexpress/hotels/us/en/kolkata/ccukt/hoteldetail",emoji:"🏨"},
  {name:"Pride Plaza Hotel Kolkata",distance:"1.8 km",badge:null,badgeColor:null,desc:"Luxury rooms with conference-friendly amenities.",url:"https://www.pridehotel.com/pride-plaza-hotel-kolkata/",emoji:"🏩"},
  {name:"Lemon Tree Premier New Town",distance:"2.2 km",badge:null,badgeColor:null,desc:"Contemporary hotel with excellent dining options.",url:"https://www.lemontreehotels.com/lemon-tree-premier/kolkata/new-town-kolkata",emoji:"🍋"},
  {name:"Novotel Kolkata Hotel & Residences",distance:"3.1 km",badge:null,badgeColor:null,desc:"Premium hotel with spa and wellness facilities.",url:"https://www.novotelkolkata.com/",emoji:"🌟"},
];
export default function AccommodationPage() {
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Accommodation</h2></div>
      <div style={{padding:16,paddingBottom:80}}>
        <div style={{background:"#eef2ff",borderLeft:"4px solid #0a2a6e",borderRadius:10,padding:14,marginBottom:20,fontSize:13,color:"#333",lineHeight:1.6}}>
          <strong style={{color:"#0a2a6e",display:"block",marginBottom:4}}>Booking Tips</strong>
          Book early for best rates. Mention IACTACON 2027 at the official hotel for delegate discounts.
        </div>
        {hotels.map((hotel,i)=>(
          <div key={i} style={{background:"white",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 4px 12px rgba(0,0,0,0.06)",border:hotel.badge?"2px solid #059669":"1px solid #eef2ff"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <div style={{fontSize:28,width:48,height:48,background:"#f0f4ff",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>{hotel.emoji}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e"}}>{hotel.name}</div>
                  {hotel.badge&&hotel.badgeColor&&(<span style={{background:"#ecfdf5",color:hotel.badgeColor,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,border:"1px solid #059669"}}>{hotel.badge}</span>)}
                </div>
                <div style={{fontSize:11,color:"#c8102e",fontWeight:600,marginTop:2,marginBottom:6}}>📍 {hotel.distance} from venue</div>
                <div style={{fontSize:12,color:"#555",marginBottom:10}}>{hotel.desc}</div>
                <a href={hotel.url} target="_blank" style={{display:"inline-flex",alignItems:"center",gap:6,background:"#0a2a6e",color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>Book Now <ExternalLink size={12}/></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}