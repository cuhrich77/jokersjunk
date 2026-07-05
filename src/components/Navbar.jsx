import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#fff', boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,.08)' : '0 1px 0 #e8e8e8' }}>

      {/* TOP STRIP — service area + account links (1-800-GOT-JUNK style) */}
      <div style={{ background: '#2d7a3a', color: '#fff', fontSize: '.82rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 24px', gap: 12 }}>
          <span className="strip-area" style={{ fontWeight: 500, opacity: .95 }}>
            Serving Northeast Florida — St. Augustine • Jacksonville • Palatka
          </span>
          <span style={{ display: 'flex', gap: 16, alignItems: 'center', whiteSpace: 'nowrap' }}>
            {/* TODO: wire these to Supabase Auth */}
            <a href="#signin" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Sign In</a>
            <a href="#signup" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none', background: 'rgba(255,255,255,.18)', padding: '4px 14px', borderRadius: 20 }}>Create Account</a>
          </span>
        </div>
      </div>

      {/* MAIN BAR — logo left, links center, phone + CTA right */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', gap: 24 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/Jokerlogo2.png"
            alt="Jokers Junk Removal"
            style={{ height: '60px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
              color: location.pathname === l.path ? '#2d7a3a' : '#333',
              borderBottom: location.pathname === l.path ? '3px solid #7b2d8b' : '3px solid transparent',
              paddingBottom: 4, transition: 'color .2s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA cluster */}
        <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <a href="tel:9043341521" style={{ fontWeight: 800, color: '#2d7a3a', textDecoration: 'none', fontSize: '1.05rem' }}>
            📞 (904) 334-1521
          </a>
          <Link to="/contact" style={{
            background: '#7b2d8b', color: '#fff', fontWeight: 700, textDecoration: 'none',
            padding: '12px 22px', borderRadius: 8, fontSize: '.95rem',
          }}>
            Book Now
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', fontSize: '1.8rem',
          cursor: 'pointer', color: '#2d7a3a', padding: 4,
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #e8e8e8', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              padding: '12px 0', fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none',
              color: location.pathname === l.path ? '#2d7a3a' : '#555',
              borderBottom: '1px solid #e8e8e8',
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <a href="#signin" style={{ flex: 1, textAlign: 'center', padding: '10px 0', border: '2px solid #2d7a3a', borderRadius: 8, color: '#2d7a3a', fontWeight: 700, textDecoration: 'none' }}>Sign In</a>
            <a href="#signup" style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: '#2d7a3a', borderRadius: 8, color: '#fff', fontWeight: 700, textDecoration: 'none' }}>Create Account</a>
          </div>
          <Link to="/contact" style={{ marginTop: 10, textAlign: 'center', background: '#7b2d8b', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '12px 0', borderRadius: 8 }}>📦 Book Now</Link>
          <a href="tel:9043341521" style={{ textAlign: 'center', fontWeight: 700, color: '#2d7a3a', padding: '10px 0', textDecoration: 'none' }}>📞 (904) 334-1521</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .strip-area { font-size: .72rem; }
        }
      `}</style>
    </nav>
  );
}
