"use client";
import { ArrowLeft, Download } from "lucide-react";

export default function QuizPage() {
  return (
    <div style={{background:"#1a0533",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.4),rgba(26,5,51,0.9))",padding:"20px 16px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(167,139,250,0.1) 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>
        <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(196,181,253,0.7)",fontSize:12,textDecoration:"none",marginBottom:12,position:"relative",zIndex:1}}>
          <ArrowLeft size={16}/> Back
        </a>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:"#d4af37",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Competition & Awards</div>
          <div style={{fontSize:22,fontWeight:800,color:"white"}}>Quiz & Certificate</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",marginTop:2}}>IACTA Shield Quiz Competition</div>
        </div>
      </div>

      <div style={{padding:16}}>

        {/* QUIZ CARD */}
        <div style={{background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:16,padding:20,marginBottom:16}}>
          <div style={{fontSize:32,marginBottom:10}}>🏆</div>
          <div style={{fontWeight:700,fontSize:16,color:"#d4af37",marginBottom:6}}>IACTA Shield Quiz</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.7)",lineHeight:1.6,marginBottom:14}}>
            Annual quiz competition open to all registered delegates. Test your knowledge in cardiac anaesthesia and win the prestigious IACTA Shield.
          </div>
          {[
            {label:"Date", value:"20 Feb 2027"},
            {label:"Time", value:"15:30 onwards"},
            {label:"Venue", value:"Knight Hall"},
            {label:"Format", value:"MCQ based, team event"},
            {label:"Prize", value:"IACTA Shield + Certificates"},
          ].map((r,i) => (
            <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<4?"1px solid rgba(167,139,250,0.1)":"none"}}>
              <span style={{fontSize:11,color:"rgba(167,139,250,0.5)",minWidth:60}}>{r.label}</span>
              <span style={{fontSize:11,color:"#ede9fe",fontWeight:500}}>{r.value}</span>
            </div>
          ))}
          <div style={{marginTop:14,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"rgba(196,181,253,0.7)",textAlign:"center"}}>
            Registration opens at the conference desk
          </div>
        </div>

        {/* CERTIFICATE */}
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:16,padding:20}}>
          <div style={{fontSize:32,marginBottom:10}}>📜</div>
          <div style={{fontWeight:700,fontSize:16,color:"#ede9fe",marginBottom:6}}>Certificate of Participation</div>
          <div style={{fontSize:12,color:"rgba(196,181,253,0.6)",lineHeight:1.6,marginBottom:14}}>
            Certificates will be issued digitally to all registered delegates after the conference concludes.
          </div>
          <div style={{background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:24}}>⏳</div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"rgba(196,181,253,0.7)"}}>Available Post Conference</div>
              <div style={{fontSize:11,color:"rgba(167,139,250,0.4)",marginTop:2}}>Will be emailed to your registered email address</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}