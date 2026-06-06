"use client";
import { useEffect, useState } from "react";

const icons: Record<string, string> = {
  calendar: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  mic: "M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8",
  filetext: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  graduationcap: "M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5",
  image: "M21 15l-5-5L5 21M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  certificate: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4",
  monitor: "M2 3h20v14H2zM8 21h8M12 17v4",
  video: "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  building: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  bed: "M3 7v13M21 7v13M3 12h18M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  mappin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  filedoc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
};

function Icon({ name, size=22, color="currentColor", filled=false }: { name:string; size?:number; color?:string; filled?:boolean }) {
  const d = icons[name] || icons.star;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?color:"none"} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d}/>
    </svg>
  );
}

const menuSections = [
  { title:"Conference", items:[
    {icon:"calendar",label:"Schedule",href:"/schedule"},
    {icon:"mic",label:"Speakers",href:"/speakers"},
    {icon:"filetext",label:"Abstract",href:"/abstract"},
    {icon:"graduationcap",label:"Workshop",href:"/workshop"},
    {icon:"image",label:"E-Poster",href:"/eposter"},
    {icon:"download",label:"Downloads",href:"/downloads"},
  ]},
  { title:"My Space", items:[
    {icon:"star",label:"My Activities",href:"/my-activities",gold:true},
    {icon:"award",label:"Quiz",href:"/quiz",gold:true},
    {icon:"certificate",label:"Certificate",href:"/certificate",gold:true},
    {icon:"monitor",label:"Presentation",href:"/presentation",gold:true},
    {icon:"video",label:"Session Clips",href:"/session-clips"},
    {icon:"search",label:"Lost & Found",href:"/lost-found"},
    {icon:"user",label:"My Profile",href:"/profile"},
  ]},
  { title:"Venue & More", items:[
    {icon:"building",label:"Venue",href:"/venue"},
    {icon:"bed",label:"Accommodation",href:"/accommodation"},
    {icon:"briefcase",label:"Industry",href:"/industry",gold:true},
    {icon:"mappin",label:"Places to Visit",href:"/places"},
  ]},
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("remembered_user");
    window.location.href = "/login";
  };

  if (!user) return null;

  const statusColor = user.registration_status==="approved"?"#2e7d32":user.registration_status==="rejected"?"#c62828":"#8a6914";
  const statusBg = user.registration_status==="approved"?"#e8f5e9":user.registration_status==="rejected"?"#ffebee":"#fff8e1";

  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:70}}>

      {/* HERO VIDEO */}
      <div style={{position:"relative",width:"100%",height:240,overflow:"hidden"}}>
        <video autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
          src="https://iactacon2027.com/wp-content/uploads/2026/06/Turn_this_image_into_a_video-1.mp4"/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(26,58,92,0.3) 0%,rgba(26,58,92,0.65) 65%,#1a3a5c 100%)"}}/>
        <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.3)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:-10,right:-10,width:86,height:86,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.15)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px 16px"}}>
          <div style={{display:"inline-block",background:"rgba(201,168,76,0.25)",border:"1px solid rgba(201,168,76,0.5)",borderRadius:20,padding:"3px 12px",color:"#f0d060",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase" as const,marginBottom:6}}>
            30th National Conference
          </div>
          <div style={{color:"white",fontSize:22,fontWeight:800,lineHeight:1.1}}>IACTACON 2027</div>
          <div style={{color:"rgba(255,255,255,0.72)",fontSize:11,marginTop:3}}>19–21 Feb · Ozone Convention Centre, Kolkata</div>
          <div style={{display:"flex",gap:6,marginTop:8}}>
            {["Safety","Science","Skill"].map(t=>(
              <div key={t} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(201,168,76,0.3)",borderRadius:20,padding:"3px 10px",color:"rgba(255,255,255,0.88)",fontSize:9,fontWeight:600}}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div style={{margin:"0 14px",marginTop:-20,position:"relative",zIndex:2,background:"white",borderRadius:16,padding:"0 14px 12px",boxShadow:"0 4px 24px rgba(91,143,168,0.15)",border:"1px solid rgba(201,168,76,0.2)",overflow:"hidden"}}>
        <div style={{height:3,background:"linear-gradient(90deg,#5b8fa8,#c9a84c,#5b8fa8)",marginBottom:12,marginLeft:-14,marginRight:-14}}/>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setShowDetails(!showDetails)}>
          <div style={{width:44,height:44,borderRadius:"50%",border:"2px solid #c9a84c",background:"#d4e8f0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
            {user.photo_download_url
              ? <img src={`/api/photo?id=${user.id}`} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              : <Icon name="user" size={22} color="#5b8fa8"/>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:14,color:"#1a3a5c"}}>{user.name}</div>
            <div style={{fontSize:10,color:"#7a8a99",fontFamily:"monospace"}}>{user.id||user.registration_id}</div>
          </div>
          <div style={{background:statusBg,border:`1px solid ${statusColor}40`,borderRadius:20,padding:"3px 10px",color:statusColor,fontSize:9,fontWeight:700}}>
            {user.registration_status?.toUpperCase()||"PENDING"}
          </div>
        </div>
        <div style={{display:"flex",marginTop:10,background:"#fdf6ec",borderRadius:8,overflow:"hidden"}}>
          {[
            {label:"Type",value:user.registration_type?.split(" ")[0]||"Conference"},
            {label:"Category",value:user.registration_category?.split(" ")[0]||"Delegate"},
            {label:"Amount",value:user.registration_amount?`Rs.${user.registration_amount}`:"—",gold:true},
          ].map((r,i)=>(
            <div key={i} style={{flex:1,textAlign:"center",padding:"6px 0",borderRight:i<2?"1px solid rgba(91,143,168,0.15)":"none"}}>
              <div style={{fontSize:8,color:r.gold?"#c9a84c":"#5b8fa8",fontWeight:700,textTransform:"uppercase" as const,letterSpacing:0.5}}>{r.label}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#1a3a5c",marginTop:1}}>{r.value}</div>
            </div>
          ))}
        </div>
        {showDetails && (
          <div style={{marginTop:10}}>
            {[
              {label:"Email",value:user.email},
              {label:"Phone",value:user.phone},
              {label:"Institution",value:user.institution},
              {label:"City",value:user.city?`${user.city}, ${user.state}`:null},
            ].filter(r=>r.value).map((row,i,arr)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<arr.length-1?"1px solid rgba(91,143,168,0.1)":"none"}}>
                <span style={{fontSize:10,color:"#5b8fa8",minWidth:70,fontWeight:600}}>{row.label}</span>
                <span style={{fontSize:11,color:"#1a3a5c",flex:1}}>{row.value}</span>
              </div>
            ))}
            <button onClick={logout} style={{marginTop:10,width:"100%",padding:"8px 0",background:"#ffebee",border:"1px solid #ffcdd2",borderRadius:8,color:"#c62828",fontSize:12,fontWeight:600,cursor:"pointer"}}>Logout</button>
          </div>
        )}
      </div>

      {/* MENU */}
      <div style={{padding:"0 12px",position:"relative",zIndex:1}}>
        {menuSections.map((section,si)=>(
          <div key={si}>
            <div style={{padding:"16px 2px 8px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:6,height:6,background:"#c9a84c",transform:"rotate(45deg)",flexShrink:0}}/>
              <span style={{color:"#3d6b82",fontSize:10,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase" as const}}>{section.title}</span>
              <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(91,143,168,0.25),transparent)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {section.items.map((item,ii)=>(
                <a key={ii} href={item.href} style={{textDecoration:"none"}}>
                  <div style={{background:item.gold?"linear-gradient(135deg,#fffdf5,#fff8e8)":"white",border:`1px solid ${item.gold?"rgba(201,168,76,0.3)":"rgba(91,143,168,0.15)"}`,borderRadius:14,padding:"14px 6px",textAlign:"center",boxShadow:"0 2px 8px rgba(91,143,168,0.07)",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:item.gold?"linear-gradient(90deg,#c9a84c,#f0d060)":"rgba(91,143,168,0.3)"}}/>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:7}}>
                      <Icon name={item.icon} size={22} color={item.gold?"#c9a84c":"#5b8fa8"}/>
                    </div>
                    <div style={{color:item.gold?"#8a6914":"#1a3a5c",fontSize:10,fontWeight:700,lineHeight:1.3}}>{item.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"white",borderTop:"1px solid rgba(91,143,168,0.15)",display:"flex",justifyContent:"space-around",padding:"8px 0 12px",zIndex:20,boxShadow:"0 -4px 16px rgba(91,143,168,0.1)"}}>
        {[
          {icon:"home",label:"Home",href:"/",active:true},
          {icon:"calendar",label:"Schedule",href:"/schedule"},
          {icon:"star",label:"Wishlist",href:"/my-activities",gold:true},
          {icon:"filedoc",label:"Abstract",href:"/abstract"},
          {icon:"user",label:"Profile",href:"/profile"},
        ].map((n,i)=>(
          <a key={i} href={n.href} style={{textDecoration:"none",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <Icon name={n.icon} size={20} color={n.active?"#3d6b82":n.gold?"#c9a84c":"#aaa"} filled={n.gold}/>
            <span style={{fontSize:9,fontWeight:600,color:n.active?"#3d6b82":n.gold?"#c9a84c":"#aaa"}}>{n.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}