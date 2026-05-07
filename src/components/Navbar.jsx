import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const navStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
background: '#f5f5f5', backdropFilter: 'blur(12px)', 
  borderBottom: '1px solid #e8e8e8', transition: 'box-shadow .3s',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
   <nav style={{...navStyle, boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,.08)' : 'none', position:'relative'}}> 
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',height:96,maxWidth:1160,margin:'0 auto',width:'100%'}}> 
{/* Replace your current logo text with this */}
<Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img src="/Jokersjunklogo1.png" alt="logo" style={{ height: '52px', width: 'auto' }} />
  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
    <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      {'Jokers'.split('').map((letter, i) => {
        const rotations = [-4, 3, -2, 5, -3, 2];
        const rises = [2, -3, 1, -4, 2, -1];
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontFamily: "'Pacifico', cursive",
              fontSize: '2rem',
              color: '#7B2D8B',
              transform: `rotate(${rotations[i]}deg) translateY(${rises[i]}px)`,
              transformOrigin: 'bottom center',
              fontWeight: 'normal',
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '1.4rem',
      color: '#1a1a1a',
      letterSpacing: '3px',
      marginTop: '2px',
    }}>
      JUNK REMOVAL
    </span>
  </div>
</Link>
      
        <div style={{display:'flex',alignItems:'center',gap:28}} className="nav-links-desktop">
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              fontWeight: location.pathname === l.path ? 600 : 500,
              fontSize: '.95rem',
              color: location.pathname === l.path ? '#2d7a3a' : '#555',
              transition: 'color .2s'
            }}>{l.label}</Link>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:14}} className="nav-cta-desktop">
          <a href="tel:9043341521" style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.1rem',fontWeight:700,color:'#2d7a3a',display:'flex',alignItems:'center',gap:6}}>
            📞 (904) 334-1521
          </a>
          <Link to="/contact" className="btn btn-primary" style={{padding:'12px 24px',fontSize:'1rem',background:'#2d7a3a'}}>
            Free Quote
          </Link>
        </div>

        <button onClick={() => setMenuOpen(o => !o)} style={{display:'none',background:'none',border:'none',fontSize:'1.6rem',cursor:'pointer'}} className="hamburger">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{background:'#fff',borderTop:'1px solid #e8e8e8',padding:'16px 24px 20px',display:'flex',flexDirection:'column',gap:4}}>
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{padding:'12px 0',fontSize:'1.1rem',fontWeight:500,color:location.pathname===l.path?'#2d7a3a':'#555',borderBottom:'1px solid #e8e8e8'}}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary" style={{marginTop:8,justifyContent:'center',background:'#2d7a3a'}}>📦 Get Free Quote</Link>
          <a href="tel:9043341521" style={{textAlign:'center',fontWeight:600,color:'#2d7a3a',padding:'8px 0'}}>📞 (904) 334-1521</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
