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
  background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(12px)',
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
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',height:72,maxWidth:1160,margin:'0 auto'}}>
        
       <Link to="/" style={{display:'flex',alignItems:'center'}}>
  <svg viewBox="0 0 640 380" height="54" width="auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nb-junk" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff7a00"/><stop offset="100%" stopColor="#cc3300"/>
      </linearGradient>
      <linearGradient id="nb-gone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#333"/>
      </linearGradient>
      <linearGradient id="nb-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff6a00"/><stop offset="100%" stopColor="#cc3300"/>
      </linearGradient>
      <linearGradient id="nb-skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f5c28a"/><stop offset="100%" stopColor="#e0a060"/>
      </linearGradient>
      <linearGradient id="nb-pants" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#334466"/><stop offset="100%" stopColor="#1a2233"/>
      </linearGradient>
      <linearGradient id="nb-can" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2a2a2a"/><stop offset="50%" stopColor="#3d3d3d"/><stop offset="100%" stopColor="#1e1e1e"/>
      </linearGradient>
      <linearGradient id="nb-lid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#606060"/><stop offset="100%" stopColor="#2a2a2a"/>
      </linearGradient>
      <filter id="nb-glow" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feFlood floodColor="#ff6a00" floodOpacity="0.45" result="color"/>
        <feComposite in="color" in2="blur" operator="in" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
      <clipPath id="nb-canClip">
        <path d="M55 170 C53 172,51 176,51 180 L55 330 C55 336,59 340,65 340 L145 340 C151 340,155 336,155 330 L159 180 C159 176,157 172,155 170 Z"/>
      </clipPath>
    </defs>
    {/* Stink lines */}
    <g opacity="0.7">
      <path d="M90 162 C86 148,94 138,88 124 C82 110,90 100,85 86" stroke="#88cc44" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M105 160 C110 145,100 132,106 118 C112 104,102 92,108 78" stroke="#aadd55" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M120 162 C126 147,116 135,122 120 C128 105,118 94,123 80" stroke="#88cc44" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </g>
    {/* Junk in can */}
    <ellipse cx="90" cy="170" rx="12" ry="8" fill="#777" opacity="0.8"/>
    <path d="M108 172 L122 158 L128 162 L116 175 Z" fill="#8B6914" opacity="0.85"/>
    <rect x="132" y="156" width="6" height="18" rx="3" fill="#4a7a4a" opacity="0.8"/>
    {/* Can body */}
    <path d="M55 170 C53 172,51 176,51 180 L55 330 C55 336,59 340,65 340 L145 340 C151 340,155 336,155 330 L159 180 C159 176,157 172,155 170 Z" fill="url(#nb-can)" stroke="#444" strokeWidth="1.5"/>
    <g clipPath="url(#nb-canClip)">
      <rect x="51" y="235" width="108" height="18" fill="#ff5500" opacity="0.85"/>
    </g>
    <ellipse cx="105" cy="170" rx="54" ry="11" fill="#3a3a3a" stroke="#222" strokeWidth="1.5"/>
    <ellipse cx="105" cy="168" rx="50" ry="9" fill="#444"/>
    <ellipse cx="105" cy="170" rx="44" ry="7" fill="#1a1a1a"/>
    <ellipse cx="105" cy="342" rx="50" ry="8" fill="#1a1a1a"/>
    {/* Lid raised */}
    <g transform="translate(138,62) rotate(28)">
      <ellipse cx="0" cy="10" rx="54" ry="12" fill="url(#nb-lid)"/>
      <ellipse cx="0" cy="8" rx="50" ry="10" fill="#585858"/>
      <ellipse cx="0" cy="10" rx="54" ry="12" fill="none" stroke="#1e1e1e" strokeWidth="2"/>
      <path d="M-16 3 C-16 -12,16 -12,16 3" stroke="#999" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="-12" rx="9" ry="4" fill="#777"/>
    </g>
    {/* Man - legs */}
    <path d="M200 268 C195 290,190 310,186 338" stroke="url(#nb-pants)" strokeWidth="17" fill="none" strokeLinecap="round"/>
    <ellipse cx="183" cy="341" rx="16" ry="7" fill="#111" transform="rotate(-6,183,341)"/>
    <path d="M230 268 C235 290,240 310,244 338" stroke="url(#nb-pants)" strokeWidth="17" fill="none" strokeLinecap="round"/>
    <ellipse cx="246" cy="341" rx="16" ry="7" fill="#111" transform="rotate(6,246,341)"/>
    {/* Belt */}
    <rect x="192" y="264" width="46" height="7" rx="3" fill="#222"/>
    {/* Torso */}
    <path d="M186 194 C181 215,180 242,192 268 L238 268 C248 242,246 215,240 194 Z" fill="url(#nb-shirt)"/>
    <path d="M198 194 L213 212 L228 194" stroke="#cc3300" strokeWidth="2" fill="none"/>
    {/* Right arm */}
    <path d="M240 202 C254 210,265 222,268 238" stroke="url(#nb-shirt)" strokeWidth="14" fill="none" strokeLinecap="round"/>
    <path d="M268 238 C270 252,264 262,255 264" stroke="url(#nb-skin)" strokeWidth="12" fill="none" strokeLinecap="round"/>
    <ellipse cx="251" cy="266" rx="12" ry="9" fill="url(#nb-skin)"/>
    {/* Left arm raised */}
    <path d="M186 202 C176 186,164 168,156 148" stroke="url(#nb-shirt)" strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M156 148 C150 132,146 112,143 88" stroke="url(#nb-skin)" strokeWidth="12" fill="none" strokeLinecap="round"/>
    <ellipse cx="143" cy="76" rx="14" ry="11" fill="url(#nb-skin)"/>
    <path d="M136 70 C133 63,133 56,138 57 C143 58,143 65,140 70" fill="url(#nb-skin)" stroke="#d4904a" strokeWidth="1.2"/>
    <path d="M143 69 C141 61,141 54,146 55 C151 56,151 63,148 69" fill="url(#nb-skin)" stroke="#d4904a" strokeWidth="1.2"/>
    <path d="M149 71 C148 63,149 57,153 58 C157 60,156 66,154 71" fill="url(#nb-skin)" stroke="#d4904a" strokeWidth="1.2"/>
    {/* Neck */}
    <rect x="207" y="178" width="13" height="18" rx="6" fill="url(#nb-skin)"/>
    {/* Head */}
    <circle cx="213" cy="156" r="32" fill="url(#nb-skin)"/>
    <ellipse cx="182" cy="156" r="7.5" fill="#e0a060"/>
    <ellipse cx="244" cy="156" r="7.5" fill="#e0a060"/>
    {/* Hair */}
    <path d="M183 140 C185 122,197 112,213 111 C229 112,241 122,243 140" fill="#1a1a1a"/>
    <path d="M208 111 C205 98,209 90,213 94 C217 90,221 98,218 111" fill="#1a1a1a"/>
    <path d="M218 111 C222 98,228 92,232 96" stroke="#1a1a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M210 111 C209 100,212 93,214 97 C215 93,218 99,216 111" fill="#ff5500" opacity="0.8"/>
    {/* Eyes */}
    <ellipse cx="201" cy="153" rx="11" ry="11" fill="white"/>
    <ellipse cx="225" cy="153" rx="11" ry="11" fill="white"/>
    <circle cx="199" cy="150" r="7.5" fill="#ff6a00"/>
    <circle cx="223" cy="150" r="7.5" fill="#ff6a00"/>
    <circle cx="198" cy="149" r="4.5" fill="#111"/>
    <circle cx="222" cy="149" r="4.5" fill="#111"/>
    <circle cx="195" cy="146" r="2.2" fill="white"/>
    <circle cx="219" cy="146" r="2.2" fill="white"/>
    <path d="M190 138 C196 132,206 131,212 135" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M214 135 C220 131,230 132,236 138" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Nose */}
    <ellipse cx="213" cy="163" rx="6" ry="5.5" fill="#d4904a"/>
    {/* Mouth */}
    <path d="M198 174 Q213 185 228 174" fill="#cc3300"/>
    <path d="M198 174 Q213 185 228 174 L228 181 Q213 188 198 180 Z" fill="white"/>
    {/* Cheeks */}
    <ellipse cx="187" cy="168" rx="9" ry="6" fill="#ff6060" opacity="0.3"/>
    <ellipse cx="239" cy="168" rx="9" ry="6" fill="#ff6060" opacity="0.3"/>
    {/* Sweat */}
    <path d="M244 140 C246 134,250 132,250 136 C250 140,246 142,244 140 Z" fill="#88ccff" opacity="0.7"/>
    {/* Hard hat */}
    <g transform="rotate(-6,213,125)">
      <ellipse cx="213" cy="125" rx="34" ry="9" fill="#ff6a00"/>
      <path d="M181 127 C183 109,196 101,213 100 C230 101,243 109,245 127 Z" fill="#ff5500"/>
      <ellipse cx="213" cy="127" rx="34" ry="8" fill="#ff6a00"/>
      <ellipse cx="213" cy="128" rx="38" ry="6" fill="#cc3300"/>
    </g>
    {/* Text JUNK */}
    <text x="448" y="162" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="110" fontWeight="900" letterSpacing="4" fill="#cc2200">JUNK</text>
    <text x="442" y="155" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="110" fontWeight="900" letterSpacing="4" fill="url(#nb-junk)" filter="url(#nb-glow)">JUNK</text>
    {/* B */}
    <text x="406" y="226" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="68" fontWeight="900" fill="#aa3300">B</text>
    <text x="400" y="218" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="68" fontWeight="900" fill="#ff8c00" filter="url(#nb-glow)">B</text>
    {/* Lightning */}
    <path d="M308 228 L334 210 L323 228 L349 210" stroke="#ff5500" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
    <path d="M452 228 L478 210 L467 228 L493 210" stroke="#ff5500" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
    {/* GONE */}
    <text x="448" y="330" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="110" fontWeight="900" letterSpacing="4" fill="#555">GONE</text>
    <text x="442" y="323" textAnchor="middle" fontFamily="Impact,'Arial Black',sans-serif" fontSize="110" fontWeight="900" letterSpacing="4" fill="url(#nb-gone)">GONE</text>
  </svg>
</Link> 

        <div style={{display:'flex',alignItems:'center',gap:28}} className="nav-links-desktop">
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              fontWeight: location.pathname === l.path ? 600 : 500,
              fontSize: '.95rem',
              color: location.pathname === l.path ? '#ff6a00' : '#555',
              transition: 'color .2s'
            }}>{l.label}</Link>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:14}} className="nav-cta-desktop">
          <a href="tel:9043341521" style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.1rem',fontWeight:700,color:'#ff6a00',display:'flex',alignItems:'center',gap:6}}>
            📞 (904) 334-1521
          </a>
          <Link to="/contact" className="btn btn-primary" style={{padding:'12px 24px',fontSize:'1rem'}}>
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
            <Link key={l.path} to={l.path} style={{padding:'12px 0',fontSize:'1.1rem',fontWeight:500,color: location.pathname===l.path?'#ff6a00':'#555',borderBottom:'1px solid #e8e8e8'}}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary" style={{marginTop:8,justifyContent:'center'}}>📦 Get Free Quote</Link>
          <a href="tel:7865550199" style={{textAlign:'center',fontWeight:600,color:'#ff6a00',padding:'8px 0'}}>📞 (786) 555-0199</a>
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
