"use client";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
export default function PresentationPage() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [docs, setDocs] = useState([]);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { window.location.href = "/login"; return; }
    const parsed = JSON.parse(u); setUser(parsed);
    fetch("/api/documents?id=" + parsed.id).then(r => r.json()).then(d => setDocs(d.documents || [])).catch(() => {});
  }, []);
  const handleUpload = async () => {
    if (!file || !user) return; setError(""); setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file); fd.append("guestId", user.id); fd.append("uploadType", "presentation");
      const res = await fetch("/api/upload", {method:"POST",body:fd}); const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || "Upload failed."); }
      else { setSuccess(true); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }
    } catch { setError("Something went wrong."); }
    setUploading(false);
  };
  const getIcon = (f) => { const e = f.split(".").pop()?.toLowerCase(); return ["ppt","pptx"].includes(e) ? "📊" : e === "pdf" ? "📄" : "📁"; };
  if (!user) return null;
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Submit Presentation</h2></div>
      <div style={{padding:16,paddingBottom:80}}>
        <div style={{background:"#eef2ff",borderLeft:"4px solid #0a2a6e",borderRadius:10,padding:14,marginBottom:20,fontSize:13,lineHeight:1.6}}>
          <strong style={{color:"#0a2a6e",display:"block",marginBottom:4}}>Guidelines</strong>
          Accepted: PPT, PPTX, PDF. Max 50MB. Submit 24hrs before your session.
        </div>
        <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" accept=".ppt,.pptx,.pdf" onChange={e => { setFile(e.target.files?.[0] || null); setSuccess(false); setError(""); }} style={{display:"none"}}/>
          <div className="upload-box-icon">📊</div>
          <div className="upload-box-text">{file ? "Change File" : "Tap to Select Presentation"}</div>
          <div className="upload-box-sub">PPT, PPTX, PDF supported</div>
        </div>
        {file && <div className="file-selected"><span style={{fontSize:22}}>{getIcon(file.name)}</span><span className="file-selected-name">{file.name}</span><span style={{fontSize:12,color:"#888"}}>{(file.size/1024/1024).toFixed(1)} MB</span></div>}
        {error && <p style={{color:"#dc2626",fontSize:13,background:"#fef2f2",padding:"10px 14px",borderRadius:10,marginBottom:12}}>⚠️ {error}</p>}
        {file && <button className="upload-btn" onClick={handleUpload} disabled={uploading}>{uploading ? "Uploading..." : "Submit Presentation"}</button>}
        {success && <div className="upload-success" style={{marginTop:16}}><div className="upload-success-icon">✅</div><h3>Submitted!</h3><p>Your file has been saved.</p></div>}
        {docs.length > 0 && <div style={{marginTop:24}}>
          <div style={{fontWeight:700,fontSize:13,color:"#0a2a6e",marginBottom:12}}>Your Submissions</div>
          {docs.map((doc, i) => (
            <div key={i} className="document-item">
              <div className="document-icon">{getIcon(doc.filename)}</div>
              <div className="document-info"><div className="document-name">{doc.original_filename || doc.filename}</div><div className="document-date">{new Date(doc.upload_datetime).toLocaleDateString("en-IN")}</div></div>
              <span style={{fontSize:11,color:"#059669",background:"#ecfdf5",padding:"3px 8px",borderRadius:20,fontWeight:600}}>✓</span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}