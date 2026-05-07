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
   <nav style={{...navStyle, boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,.08)' : 'none'}}>
      
      {/* TOP ROW — Logo | Name | Phone */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 24px',
        height: 100,
        maxWidth: 1160,
        margin: '0 auto',
        width: '100%',
      }}>

        {/* LEFT — Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/Jokersjunklogo1.png" alt="logo" style={{ height: '100px', width: 'auto' }} />
        </Link>

        {/* CENTER — Brand name */}
<Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
  <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
    {'Jokers'.split('').map((letter, i) => {
      const rotations = [-5, 4, -3, 6, -2, 3];
      const rises = [3, -4, 2, -5, 3, -2];
      return (
        <span key={i} style={{
          display: 'inline-block',
          fontFamily: "'Fredoka One', cursive",
          fontSize: '2.6rem',
          color: '#7B2D8B',
          WebkitTextStroke: '1.5px #1a1a1a',
          paintOrder: 'stroke fill',
          transform: `rotate(${rotations[i]}deg) translateY(${rises[i]}px)`,
          transformOrigin: 'bottom center',
          fontWeight: '400',
        }}>
          {letter}
        </span>
      );
    })}
  </span>
  <span style={{
    fontFamily: "'Fredoka One', sans-serif",
    fontSize: '1.3rem',
    color: '#2d7a3a',
    WebkitTextStroke: '1px #1a1a1a',
    paintOrder: 'stroke fill',
    letterSpacing: '5px',
    marginTop: '2px',
  }}>
    JUNK REMOVAL
  </span>
</Link>

        {/* RIGHT — Phone */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className="nav-cta-desktop">
          <a href="tel:9043341521" style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#2d7a3a',
            letterSpacing: '1px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            📞 (904) 334-1521
          </a>
        </div>

        {/* HAMBURGER — mobile only */}
        <button onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.6rem', cursor: 'pointer', gridColumn: 3, justifySelf: 'end' }}
          className="hamburger">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* SECOND ROW — Nav links desktop */}
      <div className="nav-links-desktop" style={{
        borderTop: '1px solid #e8e8e8',
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        padding: '10px 24px',
        background: '#f5f5f5',
      }}>
        {LINKS.map(l => (
          <Link key={l.path} to={l.path} style={{
            fontWeight: location.pathname === l.path ? 700 : 500,
            fontSize: '1rem',
            color: location.pathname === l.path ? '#2d7a3a' : '#555',
            textDecoration: 'none',
            letterSpacing: '0.5px',
            transition: 'color .2s',
          }}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #e8e8e8', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              padding: '12px 0', fontSize: '1.1rem', fontWeight: 500,
              color: location.pathname === l.path ? '#2d7a3a' : '#555',
              borderBottom: '1px solid #e8e8e8',
              textDecoration: 'none',
            }}>
              {l.label}
            </Link>
          ))}
          <a href="tel:9043341521" style={{ textAlign: 'center', fontWeight: 600, color: '#2d7a3a', padding: '8px 0' }}>📞 (904) 334-1521</a>
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
