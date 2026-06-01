"use client";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
export default function LostFoundPage() {
  const [tab, setTab] = useState("browse");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({type:"lost",item:"",location:"",contact:"",description:""});
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("user"); if(u) setUser(JSON.parse(u));
    const s = localStorage.getItem("lostfound_items"); if(s) setItems(JSON.parse(s));
  }, []);
  const handleSubmit = () => {
    if(!form.item||!form.location||!form.contact) return;
    const n = {...form,id:Date.now(),name:user?.name||"Anonymous",date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})};
    const u = [n,...items]; setItems(u); localStorage.setItem("lostfound_items",JSON.stringify(u)); setSubmitted(true);
    setForm({type:"lost",item:"",location:"",contact:"",description:""});
  };
  return (
    <div className="app-bg">
      <div className="page-header"><a href="/" className="page-header-back"><ArrowLeft size={20}/></a><h2>Lost & Found</h2></div>
      <div style={{display:"flex",background:"white",borderBottom:"1px solid #eef2ff"}}>
        {[["browse","Browse"],["report","Report"]].map(([k,l])=>(
          <button key={k} onClick={()=>{setTab(k);setSubmitted(false);}} style={{flex:1,padding:"12px",border:"none",background:"none",fontWeight:700,fontSize:13,cursor:"pointer",color:tab===k?"#c8102e":"#888",borderBottom:tab===k?"3px solid #c8102e":"3px solid transparent"}}>{l}</button>
        ))}
      </div>
      <div style={{padding:16,paddingBottom:80}}>
        {tab==="browse" && (<>
          {items.length===0 ? <div style={{textAlign:"center",padding:"40px 20px",color:"#888"}}><div style={{fontSize:48,marginBottom:12}}>🔍</div><div>No items reported yet.</div></div>
          : items.map((item,i)=>(
            <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",borderLeft:"4px solid "+(item.type==="lost"?"#c8102e":"#059669")}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:item.type==="lost"?"#fef2f2":"#ecfdf5",color:item.type==="lost"?"#c8102e":"#059669"}}>{item.type==="lost"?"LOST":"FOUND"}</span><span style={{fontSize:11,color:"#888"}}>{item.date}</span></div>
              <div style={{fontWeight:700,fontSize:14,color:"#0a2a6e",marginTop:8}}>{item.item}</div>
              <div style={{fontSize:12,color:"#555",marginTop:4}}>📍 {item.location}</div>
              {item.description&&<div style={{fontSize:12,color:"#777",marginTop:4}}>{item.description}</div>}
              <div style={{marginTop:10,padding:"8px 12px",background:"#f8faff",borderRadius:8,fontSize:12}}><span style={{color:"#888"}}>By: </span><strong>{item.name}</strong><span style={{color:"#888"}}> · </span><strong>{item.contact}</strong></div>
            </div>
          ))}
        </>)}
        {tab==="report" && (<>
          {submitted ? (
            <div style={{textAlign:"center",background:"#ecfdf5",border:"1px solid #6ee7b7",borderRadius:16,padding:32,marginTop:20}}>
              <div style={{fontSize:48,marginBottom:12}}>✅</div>
              <div style={{fontWeight:700,color:"#059669",fontSize:16}}>Reported!</div>
              <button onClick={()=>{setSubmitted(false);setTab("browse");}} style={{marginTop:16,background:"#0a2a6e",color:"white",border:"none",borderRadius:10,padding:"10px 24px",fontWeight:700,cursor:"pointer"}}>View Reports</button>
            </div>
          ) : (
            <div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {["lost","found"].map(t=>(
                  <button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:"10px",borderRadius:10,border:"none",fontWeight:700,fontSize:13,cursor:"pointer",background:form.type===t?(t==="lost"?"#c8102e":"#059669"):"#eef2ff",color:form.type===t?"white":"#555"}}>{t==="lost"?"I Lost Something":"I Found Something"}</button>
                ))}
              </div>
              {[{key:"item",label:"Item Name*",ph:"e.g. Black wallet..."},{key:"location",label:"Location*",ph:"e.g. Mangrove Hall..."},{key:"contact",label:"Contact Number*",ph:"Your phone number"},{key:"description",label:"Description (optional)",ph:"Any details..."}].map(f=>(
                <div key={f.key} style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:12,fontWeight:600,color:"#444",marginBottom:6}}>{f.label}</label>
                  <input value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph} style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:13,outline:"none"}}/>
                </div>
              ))}
              <button onClick={handleSubmit} disabled={!form.item||!form.location||!form.contact} style={{width:"100%",padding:14,background:"#0a2a6e",color:"white",border:"none",borderRadius:12,fontWeight:700,fontSize:14,cursor:"pointer",opacity:(!form.item||!form.location||!form.contact)?0.6:1}}>Submit Report</button>
            </div>
          )}
        </>)}
      </div>
    </div>
  );
}