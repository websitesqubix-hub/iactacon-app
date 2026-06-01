"use client";
import { ArrowLeft, Download } from "lucide-react";

const items = [
  { icon:"📜", title:"Certificate of Participation", sub:"Download your attendance certificate", available:false },
  { icon:"📋", title:"Conference Brochure", sub:"Official IACTACON 2027 brochure", available:true, url:"https://iactacon2027.com/brochure" },
  { icon:"📅", title:"Conference Agenda", sub:"Full programme schedule", available:true, url:"https://iactacon2027.com/agenda" },
  { icon:"🎬", title:"Session Videos", sub:"Recorded sessions from all halls", available:false },
  { icon:"📊", title:"Presentation Files", sub:"Speaker presentation downloads", available:false },
  { icon:"📸", title:"Photo Gallery", sub:"Conference photo album", available:false },
];

export default function DownloadsPage() {
  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Resource Centre</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Downloads</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>Conference materials & certificates</div>
        </div>
      </div>

      <div style={{padding:16}}>
        {items.map((item, i) => (
          <div key={i} style={{background:item.available?"rgba(212,175,55,0.06)":"rgba(255,255,255,0.03)",border:`1px solid ${item.available?"rgba(212,175,55,0.3)":"rgba(167,139,250,0.15)"}`,borderRadius:16,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:32,flexShrink:0}}>{item.icon}</div>
            <div style={{flex:1}}>
              <div style={{color:item.available?"#ede9fe":"rgba(196,181,253,0.5)",fontWeight:700,fontSize:14}}>{item.title}</div>
              <div style={{color:"rgba(167,139,250,0.5)",fontSize:11,marginTop:3}}>{item.sub}</div>
              {!item.available && (
                <div style={{marginTop:6,display:"inline-block",background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:20,padding:"2px 10px",color:"rgba(167,139,250,0.6)",fontSize:10,fontWeight:600}}>
                  Available Post Conference
                </div>
              )}
            </div>
            {item.available && item.url ? (
              <a href={item.url} target="_blank" style={{background:"linear-gradient(135deg,#7c3aed,#6366f1)",border:"none",borderRadius:10,padding:"8px 12px",color:"white",fontSize:12,fontWeight:600,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <Download size={14}/> Get
              </a>
            ) : !item.available ? (
              <div style={{background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:10,padding:"8px 12px",color:"rgba(167,139,250,0.4)",fontSize:12,fontWeight:600,flexShrink:0}}>
                Soon
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}