import React from 'react';
import { Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';

const STATS = [{val:'Locally Owned',lbl:'St. Augustine, FL'},{val:'Same Day',lbl:'Service Available'},{val:'100%',lbl:'Satisfaction Guaranteed'},{val:'Eco-Friendly',lbl:'We Donate & Recycle'}];
const STEPS = [{n:'1',icon:'📞',title:'Book Online or Call',desc:'Schedule in 60 seconds. Confirm same-day or next-day instantly.'},{n:'2',icon:'🚛',title:'We Show Up & Quote',desc:'Friendly local crew arrives on time with an upfront price — no hidden fees.'},{n:'3',icon:'🃏',title:'Poof — It\'s Gone!',desc:'We haul it, sweep up, and you pay only when you\'re smiling.'}];
const SERVICES = [{icon:'🛋️',title:'Furniture Removal',desc:'Sofas, beds, dressers — from anywhere in your home.'},{icon:'🏠',title:'Hoarder & Estate Cleanouts',desc:'Compassionate, judgment-free full-property cleanouts. Our specialty.'},{icon:'🌿',title:'Yard Waste',desc:'Branches, brush, old sheds — fast.'},{icon:'🔌',title:'Appliance Removal',desc:'Fridges, washers, dryers — safely recycled.'},{icon:'🏗️',title:'Construction Debris',desc:'Drywall, lumber, tile — post-reno cleanup.'},{icon:'🏢',title:'Commercial Junk',desc:'Office furniture, retail fixtures, equipment.'}];
const REVIEWS = [{text:'"Booked in the morning, truck was in my driveway by lunch. Cleared the whole garage in under an hour!"',name:'James R.',loc:'St. Augustine, FL',av:'JR',color:'#2d7a3a'},{text:'"Fair price, professional crew, swept up afterwards. Already used them twice!"',name:'Sandra M.',loc:'Jacksonville, FL',av:'SM',color:'#7b2d8b'},{text:'"Estate cleanout after my mom passed. Kind, efficient, and they donated what they could."',name:'David L.',loc:'Palatka, FL',av:'DL',color:'#2d7a3a'}];

export default function Home() {
  return (
    <>
      {/* HERO — photo background with dark overlay */}
      <section style={{
        paddingTop:120,
        minHeight:'100vh',
        backgroundImage:"linear-gradient(135deg, rgba(12,32,17,.85) 0%, rgba(30,14,36,.75) 100%), url('/hero-bg.jpg')",
        backgroundSize:'cover',
        backgroundPosition:'center',
        display:'flex',
        alignItems:'center'
      }}>
        <div className="container hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center',padding:'60px 24px',width:'100%'}}>
          <div>
            <img
              src="/Jokersjunklogo1.png"
              alt="Jokers Junk Removal"
              style={{ height: '220px', width: 'auto', marginBottom: 16, display: 'block', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,.4))' }}
            />
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,.12)',border:'1.5px solid rgba(255,255,255,.35)',borderRadius:50,padding:'8px 18px',marginBottom:24,fontSize:'.88rem',fontWeight:600,color:'#fff',backdropFilter:'blur(4px)'}}>
              <span style={{width:8,height:8,background:'#f2c744',borderRadius:'50%',display:'inline-block'}}/>
              Proudly Serving Northeast Florida
            </div>
            <h1 style={{fontSize:'clamp(2.8rem,5.5vw,4.8rem)',marginBottom:20,color:'#fff'}}>
              Your Junk.<br/>
              <span style={{color:'#f2c744'}}>Gone Today.</span>
            </h1>
            <p style={{fontSize:'1.1rem',color:'#e5e5e5',lineHeight:1.7,marginBottom:32,maxWidth:480}}>
              Same-day pickup across St. Augustine, Jacksonville, Palatka and all of Northeast Florida. Furniture, appliances, yard waste, full cleanouts and more.
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:32}}>
              <Link to="/contact" className="btn btn-primary">📦 Get Free Quote</Link>
              <a href="#how" className="btn btn-outline" style={{color:'#fff',borderColor:'#fff'}}>See How It Works</a>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:16}}>
              {['✅ Licensed & Insured','♻️ We Donate & Recycle','🚛 Same-Day Service','🃏 Locally Owned'].map(t=>(
                <span key={t} style={{fontSize:'.9rem',color:'#ddd',fontWeight:500}}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
            <QuoteForm compact />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:'linear-gradient(135deg,#2d7a3a,#7b2d8b)', padding:'32px 24px'}}>
        <div className="container stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {STATS.map(s=>(
            <div key={s.lbl} style={{textAlign:'center',color:'#fff'}}>
              <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'2.2rem',fontWeight:900,lineHeight:1.1}}>{s.val}</div>
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
          <div className="steps-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>
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
          <p className="section-sub" style={{marginBottom:40}}>From a single couch to a full estate cleanout — anywhere in Northeast Florida.</p>
          <div className="services-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {SERVICES.map(s=>(
              <div key={s.title} style={{background:'#fff',borderRadius:20,overflow:'hidden',border:'1.5px solid #e8e8e8',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.borderColor='#7b2d8b';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='#e8e8e8';}}>
                <div style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem',background:'linear-gradient(135deg,#f0f9f2,#f3e8f7)'}}>{s.icon}</div>
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
            <h2 className="section-title">What Northeast Florida Is Saying</h2>
          </div>
          <div className="reviews-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
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
        <h2>Ready to Make Your Junk <span>Disappear?</span></h2>
        <p>Same-day service across Northeast Florida. Free quote in 60 seconds.</p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">📦 Book Now — It's Free</Link>
          <a href="tel:9043341521" className="btn btn-white">📞 (904) 334-1521</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid, .services-grid, .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
