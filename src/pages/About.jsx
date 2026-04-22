import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  {icon:'🤝',title:'Honest & Transparent',desc:'No bait-and-switch. You see the price before we start.'},
  {icon:'♻️',title:'Eco-Responsible',desc:'We donate to Florida charities and recycle everything possible.'},
  {icon:'⚡',title:'Fast & Reliable',desc:'We show up on time, work fast, never leave a mess.'},
  {icon:'🛡️',title:'Safe & Insured',desc:'Every crew member is background-checked and fully insured.'},
  {icon:'🌴',title:'Florida Proud',desc:'Not a franchise. Your Florida neighbors serving the community.'},
  {icon:'💛',title:'Customer First',desc:'100% satisfaction guaranteed on every single job.'},
];

export default function About() {
  return (
    <>
      <div className="inner-hero">
        <div className="tag">Our Story</div>
        <h1>About <span>Junk B Gone</span></h1>
        <p>Florida-born, family-run, on a mission to make decluttering easy, affordable, and eco-friendly.</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:72,alignItems:'center',marginBottom:80}}>
            <div style={{background:'linear-gradient(135deg,#fff4ed,#fff)',borderRadius:24,padding:'60px 40px',textAlign:'center',border:'2px solid rgba(255,106,0,.15)'}}>
              <div style={{fontSize:'5rem',marginBottom:20}}>🗑️</div>
              <h3 style={{fontSize:'1.6rem',marginBottom:8}}>Est. 2018 · Florida</h3>
              <p style={{color:'#555'}}>Family-owned & operated</p>
              <p style={{color:'#ff6a00',fontWeight:600,marginTop:8}}>10,000+ loads hauled 🚛</p>
            </div>
            <div>
              <h2 style={{fontSize:'2.4rem',marginBottom:20}}>
                We Started With <span style={{color:'#ff6a00'}}>One Truck</span> and a Big Idea
              </h2>
              <p style={{color:'#555',lineHeight:1.8,marginBottom:14}}>Junk B Gone was started by Florida native Carlos Rivera in 2018 after noticing how hard it was for homeowners to get reliable, affordable junk removal.</p>
              <p style={{color:'#555',lineHeight:1.8,marginBottom:14}}>With a single pickup truck and a passion for helping his community, Carlos built Junk B Gone from the ground up. Today we operate a fleet of trucks across Florida and have helped over 10,000 customers.</p>
              <p style={{color:'#555',lineHeight:1.8,marginBottom:14}}>We believe junk removal should be simple, transparent, and done right — upfront pricing, background-checked crews, and a commitment to donating and recycling.</p>
              <p style={{fontWeight:600,color:'#1a1a1a',lineHeight:1.8}}>Because when your junk is gone, your life gets a little lighter. That's the Junk B Gone promise.</p>
              <div style={{display:'flex',gap:16,flexWrap:'wrap',marginTop:28}}>
                <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                <Link to="/services" className="btn btn-outline">See Our Services</Link>
              </div>
            </div>
          </div>

          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="tag">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {VALUES.map(v=>(
              <div key={v.title} style={{textAlign:'center',padding:'36px 24px',background:'#fff',border:'1.5px solid #e8e8e8',borderRadius:20,transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#ff6a00';e.currentTarget.style.transform='translateY(-4px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#e8e8e8';e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{fontSize:'2.4rem',marginBottom:14}}>{v.icon}</div>
                <h3 style={{fontSize:'1.15rem',marginBottom:10}}>{v.title}</h3>
                <p style={{color:'#555',fontSize:'.88rem',lineHeight:1.6}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Ready to Work With <span>Florida's Best?</span></h2>
        <p>Join 10,000+ happy customers across the Sunshine State.</p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">📦 Book Now</Link>
          <a href="tel:9043341521" className="btn btn-white">📞 (904) 334-1521</a>
        </div>
      </div>
    </>
  );
}
