"use client";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
export default function LostFoundPage() {
  const [tab, setTab] = useState("browse");
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({type:"lost",item:"",location:"",contact:"",description:""});
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
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
  const inputStyle = {width:"100%",padding:"10px 12px",background:"#f8f4ee",border:"1.5px solid rgba(91,143,168,0.2)",borderRadius:10,fontSize:13,color:"#1a3a5c",outline:"none",fontFamily:"system-ui"} as any;
  return (
    <div style={{background:"#fdf6ec",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",padding:"20px 16px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}><ArrowLeft size={16}/> Back</a>
        <div style={{position:"relative",zIndex:1,marginBottom:16}}>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Help Desk</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Lost & Found</div>
        </div>
        <div style={{display:"flex",position:"relative",zIndex:1}}>
          {[["browse","Browse"],["report","Report"]].map(([k,l])=>(
            <button key={k} onClick={()=>{setTab(k);setSubmitted(false);}} style={{flex:1,padding:"10px",border:"none",background:"none",fontWeight:700,fontSize:13,cursor:"pointer",color:tab===k?"white":"rgba(255,255,255,0.5)",borderBottom:tab===k?"3px solid #c9a84c":"3px solid transparent"}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="browse"&&(items.length===0
          ?<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:48,marginBottom:12}}>🔍</div><div style={{fontSize:14,color:"#5b8fa8",fontWeight:600}}>No items reported yet</div></div>
          :items.map((item,i)=>(
            <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid rgba(91,143,168,0.12)",borderLeft:`4px solid ${item.type==="lost"?"#c62828":"#2e7d32"}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:item.type==="lost"?"#ffebee":"#e8f5e9",color:item.type==="lost"?"#c62828":"#2e7d32"}}>{item.type==="lost"?"LOST":"FOUND"}</span>
                <span style={{fontSize:11,color:"#7a8a99"}}>{item.date}</span>
              </div>
              <div style={{fontWeight:700,fontSize:14,color:"#1a3a5c",marginTop:8}}>{item.item}</div>
              <div style={{fontSize:12,color:"#555",marginTop:4}}>📍 {item.location}</div>
              {item.description&&<div style={{fontSize:12,color:"#7a8a99",marginTop:4}}>{item.description}</div>}
              <div style={{marginTop:8,padding:"6px 10px",background:"#f8f4ee",borderRadius:8,fontSize:11}}>By: <strong>{item.name}</strong> · <strong>{item.contact}</strong></div>
            </div>
          ))
        )}
        {tab==="report"&&(submitted
          ?<div style={{textAlign:"center",background:"#e8f5e9",border:"1px solid #a5d6a7",borderRadius:16,padding:32,marginTop:20}}>
            <div style={{fontSize:48,marginBottom:12}}>✅</div>
            <div style={{fontWeight:700,color:"#2e7d32",fontSize:16}}>Reported!</div>
            <button onClick={()=>{setSubmitted(false);setTab("browse");}} style={{marginTop:16,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",border:"none",borderRadius:10,padding:"10px 24px",fontWeight:700,cursor:"pointer",fontSize:13}}>View Reports</button>
          </div>
          :<div style={{background:"white",borderRadius:16,padding:20,border:"1px solid rgba(91,143,168,0.12)"}}>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["lost","found"].map(t=>(
                <button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:"10px",borderRadius:10,border:"none",fontWeight:700,fontSize:12,cursor:"pointer",background:form.type===t?(t==="lost"?"#c62828":"#2e7d32"):"#f8f4ee",color:form.type===t?"white":"#555"}}>{t==="lost"?"I Lost Something":"I Found Something"}</button>
              ))}
            </div>
            {[{key:"item",label:"Item Name *",ph:"e.g. Black wallet..."},{key:"location",label:"Location *",ph:"e.g. Mangrove Hall..."},{key:"contact",label:"Contact Number *",ph:"Your phone number"},{key:"description",label:"Description",ph:"Any additional details..."}].map(f=>(
              <div key={f.key} style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:10,fontWeight:700,color:"#3d6b82",marginBottom:5,textTransform:"uppercase",letterSpacing:0.5}}>{f.label}</label>
                <input value={(form as any)[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph} style={inputStyle}/>
              </div>
            ))}
            <button onClick={handleSubmit} disabled={!form.item||!form.location||!form.contact} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1a3a5c,#3d6b82)",color:"white",border:"none",borderRadius:12,fontWeight:700,fontSize:14,cursor:"pointer",opacity:(!form.item||!form.location||!form.contact)?0.5:1}}>Submit Report</button>
          </div>
        )}
      </div>
    </div>
  );
}