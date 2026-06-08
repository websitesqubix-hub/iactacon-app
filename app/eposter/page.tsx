"use client";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
const guidelines = ["Poster size: A0 portrait (84.1 × 118.9 cm)","Format: PDF or high-resolution JPEG/PNG","File size: Maximum 10 MB","Font size minimum: 24pt for body text","Submission deadline: 31 January 2027"];
export default function EPosterPage() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File|null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const u = localStorage.getItem("user"); if(!u){window.location.href="/login";return;} setUser(JSON.parse(u));
  }, []);
  const handleUpload = async () => {
    if(!file||!user) return; setError(""); setUploading(true);
    try {
      const fd=new FormData(); fd.append("file",file); fd.append("guestId",user.id); fd.append("uploadType","eposter");
      const res=await fetch("/api/upload",{method:"POST",body:fd}); const data=await res.json();
      if(!res.ok||data.error) setError(data.error||"Upload failed."); else {setSuccess(true);setFile(null);}
    } catch {setError("Something went wrong.");}
    setUploading(false);
  };
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Scientific Showcase</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>E-Poster</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Upload your research poster</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"white",borderRadius:14,padding:16,marginBottom:16,border:"1px solid rgba(91,143,168,0.12)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:10}}>📋 Submission Guidelines</div>
          {guidelines.map((g,i)=>(
            <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<guidelines.length-1?"1px solid rgba(91,143,168,0.08)":"none",fontSize:12,color:"#555"}}>
              <span style={{color:"#c9a84c",fontWeight:700}}>◆</span>{g}
            </div>
          ))}
        </div>
        <div onClick={()=>fileRef.current?.click()} style={{background:"white",border:"2px dashed rgba(91,143,168,0.3)",borderRadius:16,padding:28,textAlign:"center",cursor:"pointer",marginBottom:12}}>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>{setFile(e.target.files?.[0]||null);setSuccess(false);setError("");}} style={{display:"none"}}/>
          <div style={{fontSize:36,marginBottom:8}}>🖼️</div>
          <div style={{color:"#5b8fa8",fontWeight:600,fontSize:14}}>{file?"Change File":"Tap to Upload Poster"}</div>
          <div style={{color:"#7a8a99",fontSize:11,marginTop:4}}>PDF, JPG, PNG — max 10MB</div>
        </div>
        {file&&<div style={{background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <span style={{fontSize:20}}>📄</span><span style={{flex:1,fontSize:12,color:"#1a3a5c"}}>{file.name}</span><span style={{fontSize:11,color:"#7a8a99"}}>{(file.size/1024/1024).toFixed(1)}MB</span>
        </div>}
        {error&&<div style={{background:"#ffebee",border:"1px solid #ffcdd2",borderRadius:8,padding:"8px 12px",color:"#c62828",fontSize:12,marginBottom:12}}>⚠️ {error}</div>}
        {file&&<button onClick={handleUpload} disabled={uploading} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",border:"none",borderRadius:12,color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>{uploading?"Uploading...":"Submit E-Poster"}</button>}
        {success&&<div style={{background:"#e8f5e9",border:"1px solid #a5d6a7",borderRadius:14,padding:24,textAlign:"center",marginTop:12}}>
          <div style={{fontSize:40,marginBottom:8}}>✅</div>
          <div style={{fontWeight:700,color:"#2e7d32",fontSize:16}}>Poster Submitted!</div>
        </div>}
      </div>
    </div>
  );
}