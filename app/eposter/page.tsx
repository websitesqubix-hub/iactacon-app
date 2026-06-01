"use client";
import { ArrowLeft, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const guidelines = [
  "Poster size: A0 portrait (84.1 × 118.9 cm)",
  "Format: PDF or high-resolution JPEG/PNG",
  "File size: Maximum 10 MB",
  "Include: Title, Authors, Institution, Background, Methods, Results, Conclusion",
  "Font size minimum: 24pt for body text",
  "Submission deadline: 31 January 2027",
];

export default function EPosterPage() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File|null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    setUser(JSON.parse(u));
  }, []);

  const handleUpload = async () => {
    if (!file || !user) return;
    setError(""); setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file); fd.append("guestId", user.id); fd.append("uploadType", "eposter");
      const res = await fetch("/api/upload", {method:"POST",body:fd});
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || "Upload failed."); }
      else { setSuccess(true); setFile(null); }
    } catch { setError("Something went wrong."); }
    setUploading(false);
  };

  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Scientific Showcase</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>E-Poster</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>Upload your research poster</div>
        </div>
      </div>

      <div style={{padding:16}}>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:14,padding:16,marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:13,color:"#d4af37",marginBottom:12}}>📋 Submission Guidelines</div>
          {guidelines.map((g,i) => (
            <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<guidelines.length-1?"1px solid rgba(167,139,250,0.1)":"none",fontSize:12,color:"rgba(196,181,253,0.8)"}}>
              <span style={{color:"#d4af37",fontWeight:700}}>•</span>{g}
            </div>
          ))}
        </div>

        <div style={{background:"rgba(255,255,255,0.04)",border:"2px dashed rgba(167,139,250,0.3)",borderRadius:16,padding:28,textAlign:"center",cursor:"pointer",marginBottom:12}} onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {setFile(e.target.files?.[0]||null);setSuccess(false);setError("");}} style={{display:"none"}}/>
          <div style={{fontSize:36,marginBottom:8}}>🖼️</div>
          <div style={{color:"#a78bfa",fontWeight:600,fontSize:14}}>{file ? "Change File" : "Tap to Upload Poster"}</div>
          <div style={{color:"rgba(167,139,250,0.5)",fontSize:11,marginTop:4}}>PDF, JPG, PNG — max 10MB</div>
        </div>

        {file && (
          <div style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <span style={{fontSize:20}}>📄</span>
            <span style={{flex:1,fontSize:12,color:"#ede9fe",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{file.name}</span>
            <span style={{fontSize:11,color:"rgba(167,139,250,0.6)"}}>{(file.size/1024/1024).toFixed(1)}MB</span>
          </div>
        )}

        {error && <div style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"8px 12px",color:"#fca5a5",fontSize:12,marginBottom:12}}>⚠️ {error}</div>}

        {file && (
          <button onClick={handleUpload} disabled={uploading} style={{width:"100%",padding:14,background:uploading?"rgba(124,58,237,0.4)":"linear-gradient(135deg,#7c3aed,#6366f1)",border:"none",borderRadius:12,color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            {uploading ? "Uploading..." : "Submit E-Poster"}
          </button>
        )}

        {success && (
          <div style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:16,padding:24,textAlign:"center",marginTop:12}}>
            <div style={{fontSize:40,marginBottom:8}}>✅</div>
            <div style={{fontWeight:700,color:"#d4af37",fontSize:16}}>Poster Submitted!</div>
            <div style={{color:"rgba(196,181,253,0.7)",fontSize:12,marginTop:6}}>Your e-poster has been received by the scientific committee.</div>
          </div>
        )}
      </div>
    </div>
  );
}