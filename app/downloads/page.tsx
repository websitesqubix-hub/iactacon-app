"use client";
import { ArrowLeft, Download } from "lucide-react";
const items = [
  {icon:"📋",title:"Conference Brochure",sub:"Official IACTACON 2027 brochure",available:true,url:"https://iactacon2027.com/brochure"},
  {icon:"📅",title:"Conference Agenda",sub:"Full programme schedule",available:true,url:"https://iactacon2027.com/agenda"},
  {icon:"📜",title:"Certificate of Participation",sub:"Download your attendance certificate",available:false},
  {icon:"🎬",title:"Session Videos",sub:"Recorded sessions from all halls",available:false},
  {icon:"📊",title:"Presentation Files",sub:"Speaker presentation downloads",available:false},
  {icon:"📸",title:"Photo Gallery",sub:"Conference photo album",available:false},
];
export default function DownloadsPage() {
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Resource Centre</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Downloads</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Conference materials & certificates</div>
        </div>
      </div>
      <div style={{padding:16}}>
        {items.map((item,i)=>(
          <div key={i} style={{background:"white",borderRadius:16,padding:16,marginBottom:12,border:item.available?"1px solid rgba(201,168,76,0.25)":"1px solid rgba(91,143,168,0.12)",boxShadow:"0 2px 8px rgba(91,143,168,0.06)",display:"flex",alignItems:"center",gap:14,position:"relative",overflow:"hidden"}}>
            {item.available&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#c9a84c,#f0d060)"}}/>}
            <div style={{fontSize:28,flexShrink:0}}>{item.icon}</div>
            <div style={{flex:1}}>
              <div style={{color:item.available?"#1a3a5c":"#7a8a99",fontWeight:700,fontSize:14}}>{item.title}</div>
              <div style={{color:"#7a8a99",fontSize:11,marginTop:3}}>{item.sub}</div>
              {!item.available&&<div style={{marginTop:5,display:"inline-block",background:"rgba(91,143,168,0.08)",border:"1px solid rgba(91,143,168,0.15)",borderRadius:20,padding:"2px 10px",color:"#5b8fa8",fontSize:9,fontWeight:600}}>Available Post Conference</div>}
            </div>
            {item.available&&item.url?(
              <a href={item.url} target="_blank" style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",border:"none",borderRadius:10,padding:"8px 12px",color:"white",fontSize:12,fontWeight:600,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <Download size={14}/> Get
              </a>
            ):(
              <div style={{background:"rgba(91,143,168,0.08)",border:"1px solid rgba(91,143,168,0.15)",borderRadius:10,padding:"8px 12px",color:"#7a8a99",fontSize:11,fontWeight:600,flexShrink:0}}>Soon</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}