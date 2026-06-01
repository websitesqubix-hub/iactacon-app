"use client";
import { ArrowLeft, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    const savedPhoto = localStorage.getItem(`profile_photo_${parsed.id}`);
    if (savedPhoto) setPhotoUrl(savedPhoto);
  }, []);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setPhotoUrl(dataUrl);
        localStorage.setItem(`profile_photo_${user.id}`, dataUrl);
      };
      reader.readAsDataURL(file);
    } catch {}
    setUploading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("remembered_user");
    window.location.href = "/login";
  };

  if (!user) return null;

  const statusColor = user.registration_status === "approved" ? "#22c55e" :
    user.registration_status === "rejected" ? "#ef4444" : "#d4af37";

  const fields = [
    { icon:"🪪", label:"Registration ID", value: user.id || user.registration_id },
    { icon:"📧", label:"Email", value: user.email },
    { icon:"📱", label:"Phone", value: user.phone },
    { icon:"🏥", label:"Institution", value: user.institution },
    { icon:"💼", label:"Designation", value: user.designation },
    { icon:"📍", label:"City", value: user.city ? `${user.city}, ${user.state}` : null },
    { icon:"🎟", label:"Reg. Type", value: user.registration_type },
    { icon:"👥", label:"Category", value: user.registration_category },
    { icon:"🔬", label:"Workshop", value: user.workshop || null },
    { icon:"💰", label:"Amount", value: user.registration_amount ? `Rs. ${user.registration_amount}` : null },
    { icon:"🍽️", label:"Food Pref.", value: user.food_preference },
    { icon:"⚕️", label:"Medical Council", value: user.medical_council_name },
  ].filter(f => f.value);

  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.5),rgba(26,5,51,0.9))",padding:"20px 16px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <div style={{position:"absolute",bottom:-40,left:"50%",transform:"translateX(-50%)",width:200,height:200,background:"radial-gradient(circle,rgba(212,175,55,0.15),transparent)",borderRadius:"50%"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:20,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
          {/* PHOTO */}
          <div style={{position:"relative",marginBottom:12}}>
            <div style={{width:90,height:90,borderRadius:"50%",border:"3px solid #d4af37",overflow:"hidden",background:"rgba(212,175,55,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {photoUrl ? (
                <img src={photoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              ) : user.photo_download_url ? (
                <img src={`/api/photo?id=${user.id}`} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              ) : (
                <span style={{fontSize:36}}>👤</span>
              )}
            </div>
            <button onClick={() => fileRef.current?.click()} style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#6366f1)",border:"2px solid #1a0533",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <Camera size={14} color="white"/>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{display:"none"}}/>
          </div>
          <div style={{color:"white",fontWeight:800,fontSize:18,textAlign:"center"}}>{user.name}</div>
          <div style={{color:"rgba(196,181,253,0.6)",fontSize:11,fontFamily:"monospace",marginTop:2}}>{user.id || user.registration_id}</div>
          <div style={{marginTop:8,background:`rgba(${statusColor==='#22c55e'?'34,197,94':'212,175,55'},0.15)`,border:`1px solid ${statusColor}`,borderRadius:20,padding:"3px 14px",color:statusColor,fontSize:11,fontWeight:700}}>
            {user.registration_status?.toUpperCase() || "PENDING"}
          </div>
        </div>
      </div>

      {/* DETAILS CARD */}
      <div style={{margin:"0 14px",marginTop:-20,position:"relative",zIndex:2,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.25)",borderRadius:18,padding:16,boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:11,color:"#d4af37",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Registration Details</div>
        {fields.map((f,i) => (
          <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<fields.length-1?"1px solid rgba(167,139,250,0.1)":"none",alignItems:"flex-start"}}>
            <span style={{fontSize:14,minWidth:22}}>{f.icon}</span>
            <span style={{fontSize:11,color:"rgba(167,139,250,0.5)",minWidth:80}}>{f.label}</span>
            <span style={{fontSize:12,color:"#ede9fe",flex:1,fontWeight:500}}>{f.value}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div style={{margin:"16px 14px 0"}}>
        <button onClick={logout} style={{width:"100%",padding:14,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:12,color:"#fca5a5",fontSize:14,fontWeight:700,cursor:"pointer"}}>
          Logout
        </button>
      </div>
    </div>
  );
}