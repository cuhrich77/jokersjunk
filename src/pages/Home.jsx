import React from 'react';
import { Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';

const STATS = [{val:'10,000+',lbl:'Loads Hauled'},{val:'4.9★',lbl:'Average Rating'},{val:'Same Day',lbl:'Service Available'},{val:'100%',lbl:'Satisfaction Guaranteed'}];
const STEPS = [{n:'1',icon:'📞',title:'Book Online or Call',desc:'Schedule in 60 seconds. Confirm same-day or next-day instantly.'},{n:'2',icon:'🚛',title:'We Show Up & Quote',desc:'Uniformed crew arrives on time with an upfront price — no hidden fees.'},{n:'3',icon:'✨',title:'Junk B Gone!',desc:'We haul it, sweep up, and you pay only when satisfied.'}];
const SERVICES = [{icon:'🛋️',title:'Furniture Removal',desc:'Sofas, beds, dressers — from anywhere in your home.'},{icon:'🏠',title:'Home Cleanouts',desc:'Garage, attic, estate — top to bottom.'},{icon:'🌿',title:'Yard Waste',desc:'Branches, brush, old sheds — fast.'},{icon:'🔌',title:'Appliance Removal',desc:'Fridges, washers, dryers — safely recycled.'},{icon:'🏗️',title:'Construction Debris',desc:'Drywall, lumber, tile — post-reno cleanup.'},{icon:'🏢',title:'Commercial Junk',desc:'Office furniture, retail fixtures, equipment.'}];
const REVIEWS = [{text:'"Booked at 8am, at my door by 11. Cleared my entire garage in under an hour!"',name:'James R.',loc:'Tampa, FL',av:'JR',color:'#ff6a00'},{text:'"Fair price, professional crew, swept up afterwards. Used them twice!"',name:'Sandra M.',loc:'Orlando, FL',av:'SM',color:'#0077b6'},{text:'"Estate cleanout after my mom passed. Kind, efficient, removed everything."',name:'David L.',loc:'Fort Lauderdale, FL',av:'DL',color:'#2d6a1a'}];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{paddingTop:72,minHeight:'100vh',background:'linear-gradient(135deg,#fff 0%,#f0f9f2 50%,#fff 100%)',display:'flex',alignItems:'center'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center',padding:'80px 24px',width:'100%'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8, background:'#f0f9f2',border:'1.5px solid rgba(45,122,58,.2)',borderRadius:50,padding:'8px 18px',marginBottom:24,fontSize:'.88rem',fontWeight:600,color:'#2d7a3a'}}>
              <span style={{width:8,height:8,background:'#ff6a00',borderRadius:'50%',display:'inline-block'}}/>
              Florida's #1 Junk Removal
            </div>
            <h1 style={{fontSize:'clamp(2.8rem,5.5vw,4.8rem)',marginBottom:20}}>
              Your Junk.<br/>
              <span style={{color:'#2d7a3a'}}>Gone Today.</span>
            </h1>
            <p style={{fontSize:'1.1rem',color:'#555',lineHeight:1.7,marginBottom:32,maxWidth:480}}>
              Same-day pickup across Florida. We haul furniture, appliances, yard waste, construction debris and more.
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:32}}>
              <Link to="/contact" className="btn btn-primary">📦 Get Free Quote</Link>
              <a href="#how" className="btn btn-outline">See How It Works</a>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:16}}>
              {['⭐ 4.9/5 Rating','✅ Licensed & Insured','♻️ Eco-Friendly','🚛 Same-Day'].map(t=>(
                <span key={t} style={{fontSize:'.9rem',color:'#555',fontWeight:500}}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
            <QuoteForm compact />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:'#2d7a3a',padding:'32px 24px'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {STATS.map(s=>(
            <div key={s.lbl} style={{textAlign:'center',color:'#fff'}}>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'2.8rem',fontWeight:900,lineHeight:1}}>{s.val}</div>
              <div style={{fontSize:'.88rem',opacity:.85,marginTop:4}}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:56}}>
            <div className="tag">Simple Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub" style={{margin:'0 auto'}}>Three simple steps and your junk is gone for good.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>
            {STEPS.map(s=>(
              <div key={s.n} style={{textAlign:'center',padding:'48px 32px 36px',borderRadius:20,border:'2px solid #e8e8e8',position:'relative',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#2d7a3a';e.currentTarget.style.transform='translateY(-6px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#e8e8e8';e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{position:'absolute',top:-20,left:'50%',transform:'translateX(-50%)',width:40,height:40,background:'#2d7a3a',color:'#fff',borderRadius:'50%',fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.2rem',fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center'}}>{s.n}</div>
                <div style={{fontSize:'3rem',marginBottom:20}}>{s.icon}</div>
                <h3 style={{fontSize:'1.4rem',marginBottom:12}}>{s.title}</h3>
                <p style={{color:'#555',lineHeight:1.7,fontSize:'.95rem'}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-light">
        <div className="container">
          <div className="tag">What We Haul</div>
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub" style={{marginBottom:40}}>From a single couch to a full estate cleanout.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {SERVICES.map(s=>(
              <div key={s.title} style={{background:'#fff',borderRadius:20,overflow:'hidden',border:'1.5px solid #e8e8e8',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.borderColor='#ff6a00';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='#e8e8e8';}}>
                <div style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem',background:'linear-gradient(135deg,#fff4ed,#ffe4cc)'}}>{s.icon}</div>
                <div style={{padding:24}}>
                  <h3 style={{fontSize:'1.25rem',marginBottom:8}}>{s.title}</h3>
                  <p style={{color:'#555',fontSize:'.9rem',lineHeight:1.6,marginBottom:14}}>{s.desc}</p>
                  <Link to="/services" style={{color:'#2d7a3a',fontWeight:600,fontSize:'.9rem'}}>Learn more →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="tag">Customer Love</div>
            <h2 className="section-title">What Florida Is Saying</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {REVIEWS.map(r=>(
              <div key={r.name} style={{background:'#fff',borderRadius:20,padding:28,border:'1.5px solid #e8e8e8'}}>
                <div style={{color:'#f59e0b',fontSize:'1.1rem',marginBottom:14}}>★★★★★</div>
                <p style={{color:'#555',lineHeight:1.7,fontSize:'.92rem',marginBottom:18,fontStyle:'italic'}}>{r.text}</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.1rem',fontWeight:900,color:'#fff'}}>{r.av}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:'.9rem'}}>{r.name}</div>
                    <div style={{fontSize:'.8rem',color:'#999'}}>{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2>Ready to Get That <span>Jokers Junk Removal?</span></h2>
        <p>Same-day service available. Free quote in 60 seconds.</p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">📦 Book Now — It's Free</Link>
          <a href="tel:9043341521" className="btn btn-white">📞 (904) 334-1521</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
