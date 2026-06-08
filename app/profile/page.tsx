"use client";
import { ArrowLeft, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const u = localStorage.getItem("user"); if(!u){window.location.href="/login";return;}
    const parsed=JSON.parse(u); setUser(parsed);
    const saved=localStorage.getItem(`profile_photo_${parsed.id}`); if(saved) setPhotoUrl(saved);
  }, []);
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file=e.target.files?.[0]; if(!file||!user) return;
    const reader=new FileReader();
    reader.onload=(ev)=>{const d=ev.target?.result as string; setPhotoUrl(d); localStorage.setItem(`profile_photo_${user.id}`,d);};
    reader.readAsDataURL(file);
  };
  const logout=()=>{localStorage.removeItem("user");localStorage.removeItem("remembered_user");window.location.href="/login";};
  if(!user) return null;
  const statusColor=user.registration_status==="approved"?"#2e7d32":user.registration_status==="rejected"?"#c62828":"#8a6914";
  const statusBg=user.registration_status==="approved"?"#e8f5e9":user.registration_status==="rejected"?"#ffebee":"#fff8e1";
  const fields=[
    {icon:"🪪",label:"Registration ID",value:user.id||user.registration_id},
    {icon:"📧",label:"Email",value:user.email},
    {icon:"📱",label:"Phone",value:user.phone},
    {icon:"🏥",label:"Institution",value:user.institution},
    {icon:"💼",label:"Designation",value:user.designation},
    {icon:"📍",label:"City",value:user.city?`${user.city}, ${user.state}`:null},
    {icon:"🎟",label:"Reg. Type",value:user.registration_type},
    {icon:"👥",label:"Category",value:user.registration_category},
    {icon:"💰",label:"Amount",value:user.registration_amount?`Rs. ${user.registration_amount}`:null},
    {icon:"🍽️",label:"Food Pref.",value:user.food_preference},
  ].filter(f=>f.value);
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 50px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <div style={{position:"absolute",bottom:-40,left:"50%",transform:"translateX(-50%)",width:200,height:200,background:"radial-gradient(circle,rgba(201,168,76,0.1),transparent)",borderRadius:"50%"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:20,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
          <div style={{position:"relative",marginBottom:12}}>
            <div style={{width:90,height:90,borderRadius:"50%",border:"3px solid #c9a84c",overflow:"hidden",background:"#d4e8f0",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {photoUrl?<img src={photoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:36}}>👤</span>}
            </div>
            <button onClick={()=>fileRef.current?.click()} style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",border:"2px solid #fdf6ec",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <Camera size={14} color="white"/>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
          </div>
          <div style={{color:"white",fontWeight:800,fontSize:18,textAlign:"center"}}>{user.name}</div>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:11,fontFamily:"monospace",marginTop:2}}>{user.id||user.registration_id}</div>
          <div style={{marginTop:8,background:statusBg,border:`1px solid ${statusColor}`,borderRadius:20,padding:"3px 14px",color:statusColor,fontSize:11,fontWeight:700}}>
            {user.registration_status?.toUpperCase()||"PENDING"}
          </div>
        </div>
      </div>
      <div style={{margin:"0 14px",marginTop:-20,position:"relative",zIndex:2,background:"white",borderRadius:18,padding:"0 16px 16px",boxShadow:"0 4px 24px rgba(91,143,168,0.12)",border:"1px solid rgba(201,168,76,0.2)",overflow:"hidden"}}>
        <div style={{height:3,background:"linear-gradient(90deg,#5b8fa8,#c9a84c,#5b8fa8)",marginBottom:14,marginLeft:-16,marginRight:-16}}/>
        <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Registration Details</div>
        {fields.map((f,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<fields.length-1?"1px solid rgba(91,143,168,0.08)":"none",alignItems:"flex-start"}}>
            <span style={{fontSize:14,minWidth:22}}>{f.icon}</span>
            <span style={{fontSize:11,color:"#5b8fa8",minWidth:80,fontWeight:600}}>{f.label}</span>
            <span style={{fontSize:12,color:"#1a3a5c",flex:1,fontWeight:500}}>{f.value}</span>
          </div>
        ))}
      </div>
      <div style={{margin:"14px 14px 0"}}>
        <button onClick={logout} style={{width:"100%",padding:14,background:"#ffebee",border:"1px solid #ffcdd2",borderRadius:12,color:"#c62828",fontSize:14,fontWeight:700,cursor:"pointer"}}>Logout</button>
      </div>
    </div>
  );
}