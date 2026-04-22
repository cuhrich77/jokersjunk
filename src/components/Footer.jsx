import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{background:'#1a1a1a',color:'#ccc',padding:'64px 0 32px'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:48,marginBottom:48}}>
          <div>
            <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.9rem',fontWeight:900,color:'#fff',marginBottom:14}}>
              JUNK <span style={{color:'#ff6a00'}}>B</span> GONE 🗑️
            </div>
            <p style={{fontSize:'.9rem',lineHeight:1.7,color:'#999',marginBottom:24}}>Florida's most trusted junk removal company. Family-owned, eco-friendly, committed to making your life easier.</p>
          </div>
          <div>
            <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.05rem',fontWeight:700,color:'#fff',marginBottom:18,textTransform:'uppercase',letterSpacing:'.5px'}}>Services</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {['Furniture Removal','Home Cleanouts','Appliance Removal','Yard Waste','Construction Debris','Commercial Junk'].map(s=>(
                <Link key={s} to="/services" style={{color:'#999',fontSize:'.88rem',transition:'color .2s'}}
                  onMouseEnter={e=>e.target.style.color='#ff6a00'}
                  onMouseLeave={e=>e.target.style.color='#999'}>{s}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.05rem',fontWeight:700,color:'#fff',marginBottom:18,textTransform:'uppercase',letterSpacing:'.5px'}}>Company</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <Link to="/about" style={{color:'#999',fontSize:'.88rem'}}>About Us</Link>
              <Link to="/contact" style={{color:'#999',fontSize:'.88rem'}}>Contact</Link>
              <Link to="/" style={{color:'#999',fontSize:'.88rem'}}>Service Areas</Link>
            </div>
          </div>
          <div>
            <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.05rem',fontWeight:700,color:'#fff',marginBottom:18,textTransform:'uppercase',letterSpacing:'.5px'}}>Contact</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <a href="tel:9043341521" style={{color:'#999',fontSize:'.88rem'}}>📞 (904) 334-1521</a>
              <a href="mailto:hello@junkbgone.com" style={{color:'#999',fontSize:'.88rem'}}>📧 hello@junkbgone.com</a>
              <Link to="/contact" style={{color:'#999',fontSize:'.88rem'}}>🚛 Book Online</Link>
            </div>
            <div style={{marginTop:20,background:'#2a2a2a',borderRadius:12,padding:16,fontSize:'.88rem',lineHeight:1.8}}>
              <div style={{fontSize:'.72rem',color:'#666',fontWeight:600,letterSpacing:'.5px',marginBottom:4}}>HOURS</div>
              <div>Mon–Fri: 7am–7pm</div>
              <div>Sat: 8am–6pm</div>
              <div style={{color:'#ff6a00',fontWeight:600}}>Same-Day Available!</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid #2a2a2a',paddingTop:28,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:'.82rem',color:'#555'}}>© 2025 Junk B Gone LLC · All Rights Reserved · Florida</div>
          <div style={{display:'flex',gap:20}}>
            <a href="#" style={{fontSize:'.82rem',color:'#555'}}>Privacy Policy</a>
            <a href="#" style={{fontSize:'.82rem',color:'#555'}}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
