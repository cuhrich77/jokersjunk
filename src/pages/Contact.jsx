import React from 'react';
import QuoteForm from '../components/QuoteForm';

export default function Contact() {
  return (
    <>
      <div className="inner-hero">
        <div className="tag">Get In Touch</div>
        <h1>Get Your <span>Free Quote</span></h1>
        <p>Fill out the form or give us a call. We respond within 15 minutes during business hours.</p>
      </div>
      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:64,alignItems:'start'}}>
            <div>
              <h2 style={{fontSize:'2.2rem',marginBottom:14}}>We're Here to Help</h2>
              <p style={{color:'#555',lineHeight:1.7,marginBottom:36}}>Whether you have a single item or a whole property, our team is standing by for a fast, free quote.</p>
              <div style={{display:'flex',flexDirection:'column',gap:20,marginBottom:36}}>
                {[
                  {icon:'📞',label:'Call or Text',val:'(904) 334-1521',href:'tel:9043341521'},
                  {icon:'📧',label:'Email Us',val:'hello@jokersjunk.com',href:'mailto:hello@jokersjunk.com'},
                  {icon:'📍',label:'Service Area',val:'NE Florida',href:null},
                ].map(m=>(
                  <div key={m.label} style={{display:'flex',gap:16,alignItems:'center'}}>
                    <div style={{width:52,height:52,minWidth:52,background:'#ff6a00',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>{m.icon}</div>
                    <div>
                      <div style={{fontSize:'.78rem',color:'#999',fontWeight:500,textTransform:'uppercase',letterSpacing:'.5px'}}>{m.label}</div>
                      {m.href
                        ? <a href={m.href} style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.25rem',fontWeight:700}}>{m.val}</a>
                        : <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.25rem',fontWeight:700}}>{m.val}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{fontSize:'1.2rem',marginBottom:14}}>Hours of Operation</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:28}}>
                {[{day:'Mon – Fri',time:'6am – 7pm'},{day:'Saturday',time:'7am – 6pm'},{day:'Sunday',time:'Closed'},{day:'Holidays',time:'Call Ahead'}].map(h=>(
                  <div key={h.day} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',background:'#f8f8f8',borderRadius:10,fontSize:'.88rem'}}>
                    <span style={{fontWeight:600}}>{h.day}</span>
                    <span style={{color:'#ff6a00',fontWeight:500}}>{h.time}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'#fff4ed',borderRadius:16,padding:24,border:'1.5px solid rgba(255,106,0,.2)'}}>
                <div style={{fontSize:'1.6rem',marginBottom:8}}>🚛</div>
                <strong style={{display:'block',marginBottom:6}}>Same-Day Service Available</strong>
                <p style={{color:'#555',fontSize:'.9rem',margin:0}}>Book before noon and we'll be there today.</p>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
