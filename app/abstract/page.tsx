"use client";
import { ArrowLeft, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
export default function AbstractPage() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File|null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    setUser(JSON.parse(u));
  }, []);
  const handleUpload = async () => {
    if (!file||!user) return; setError(""); setUploading(true);
    try {
      const fd = new FormData(); fd.append("file",file); fd.append("guestId",user.id); fd.append("uploadType","abstract");
      const res = await fetch("/api/upload",{method:"POST",body:fd}); const data = await res.json();
      if (!res.ok||data.error) setError(data.error||"Upload failed.");
      else { setSuccess(true); setFile(null); }
    } catch { setError("Something went wrong."); }
    setUploading(false);
  };
  if (!user) return null;
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Scientific Submission</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Abstract Submission</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Submit your research abstract</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"white",borderRadius:14,padding:16,marginBottom:16,border:"1px solid rgba(91,143,168,0.12)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#1a3a5c",marginBottom:10}}>📋 Guidelines</div>
          {["Word limit: 250 words maximum","Format: PDF or DOCX only","Include: Title, Authors, Institution, Background, Methods, Results, Conclusion","Deadline: 15 January 2027","Notification: 31 January 2027"].map((g,i)=>(
            <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<4?"1px solid rgba(91,143,168,0.08)":"none",fontSize:12,color:"#555"}}>
              <span style={{color:"#c9a84c",fontWeight:700}}>◆</span>{g}
            </div>
          ))}
        </div>
        <div onClick={()=>fileRef.current?.click()} style={{background:"white",border:"2px dashed rgba(91,143,168,0.3)",borderRadius:16,padding:28,textAlign:"center",cursor:"pointer",marginBottom:12}}>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={e=>{setFile(e.target.files?.[0]||null);setSuccess(false);setError("");}} style={{display:"none"}}/>
          <div style={{fontSize:36,marginBottom:8}}>📄</div>
          <div style={{color:"#5b8fa8",fontWeight:600,fontSize:14}}>{file?"Change File":"Tap to Upload Abstract"}</div>
          <div style={{color:"#7a8a99",fontSize:11,marginTop:4}}>PDF or DOCX — max 10MB</div>
        </div>
        {file&&<div style={{background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.25)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <span style={{fontSize:20}}>📄</span>
          <span style={{flex:1,fontSize:12,color:"#1a3a5c",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{file.name}</span>
          <span style={{fontSize:11,color:"#7a8a99"}}>{(file.size/1024/1024).toFixed(1)}MB</span>
        </div>}
        {error&&<div style={{background:"#ffebee",border:"1px solid #ffcdd2",borderRadius:8,padding:"8px 12px",color:"#c62828",fontSize:12,marginBottom:12}}>⚠️ {error}</div>}
        {file&&<button onClick={handleUpload} disabled={uploading} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",border:"none",borderRadius:12,color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>{uploading?"Uploading...":"Submit Abstract"}</button>}
        {success&&<div style={{background:"#e8f5e9",border:"1px solid #a5d6a7",borderRadius:14,padding:24,textAlign:"center",marginTop:12}}>
          <div style={{fontSize:40,marginBottom:8}}>✅</div>
          <div style={{fontWeight:700,color:"#2e7d32",fontSize:16}}>Abstract Submitted!</div>
          <div style={{color:"#555",fontSize:12,marginTop:6}}>Your abstract has been received by the scientific committee.</div>
        </div>}
      </div>
    </div>
  );
}