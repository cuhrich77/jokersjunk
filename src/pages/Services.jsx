import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {icon:'🛋️',title:'Furniture Removal',desc:'We remove all types of furniture from anywhere in your home, office, or storage unit.',items:['Sofas, sectionals & loveseats','Beds, mattresses & frames','Dressers, tables & chairs','Desks & office furniture','Hot tubs & outdoor furniture']},
  {icon:'🏠',title:'Home & Estate Cleanouts',desc:'Whether downsizing, moving, or clearing an estate, we handle heavy lifting with care.',items:['Full home cleanouts','Estate & foreclosure cleanouts','Garage & attic cleanouts','Storage unit cleanouts','Hoarder cleanouts']},
  {icon:'🔌',title:'Appliance Removal',desc:'We safely disconnect, remove, and recycle heavy appliances.',items:['Refrigerators & freezers','Washers & dryers','Stoves & ovens','Dishwashers & microwaves','Water heaters & AC units']},
  {icon:'🌿',title:'Yard Waste Removal',desc:'Florida yards grow fast — we haul away all green waste and outdoor clutter.',items:['Tree branches & limbs','Brush & shrub trimmings','Old sheds & swing sets','Lawn bags & debris','Fencing & lumber']},
  {icon:'🏗️',title:'Construction Debris',desc:'Post-renovation? We clean up after contractors and keep the site safe.',items:['Drywall & plaster','Lumber & wood scraps','Tile, flooring & carpet','Concrete & brick','Roofing materials']},
  {icon:'🏢',title:'Commercial Junk',desc:'Office moves, retail shutdowns, warehouse cleanouts on your schedule.',items:['Office furniture & equipment','Retail fixtures & shelving','Electronics & e-waste','Warehouse inventory','Restaurant equipment']},
  {icon:'📺',title:'Electronics & E-Waste',desc:'Old electronics need responsible disposal at certified facilities.',items:['TVs & monitors','Computers & laptops','Printers & copiers','Phones & tablets','Gaming systems']},
  {icon:'🚗',title:'Scrap Metal',desc:'Scrap metal and old parts hauled and responsibly recycled.',items:['Scrap metal & iron','Old car parts','Bicycles & lawn equipment','Metal shelving & racking','Farm equipment']},
];

export default function Services() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <>
      <div className="inner-hero">
        <div className="tag">Everything We Haul</div>
        <h1>Our <span>Services</span></h1>
        <p>From a single item to a full property cleanout — if you don't want it, we'll take it.</p>
        <Link to="/contact" className="btn btn-primary">Get a Free Quote →</Link>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:28}}>
            {SERVICES.map(s => {
              const isActive = activeCard === s.title;
              return (
                <div
                  key={s.title}
                  onMouseEnter={() => setActiveCard(s.title)}
                  onMouseLeave={() => setActiveCard(null)}
                  onTouchStart={() => setActiveCard(s.title)}
                  onTouchEnd={() => setTimeout(() => setActiveCard(null), 400)}
                  style={{
                    background: '#fff',
                    border: `2px solid ${isActive ? '#7B2D8B' : '#e8e8e8'}`,
                    borderRadius: 20,
                    padding: 36,
                    display: 'flex',
                    gap: 22,
                    alignItems: 'flex-start',
                    transition: 'all .3s',
                    transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isActive ? '0 4px 24px rgba(123,45,139,.18)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{fontSize:'2.6rem',minWidth:56}}>{s.icon}</div>
                  <div>
                    <h3 style={{fontSize:'1.35rem',marginBottom:10,color: isActive ? '#7B2D8B' : '#1a1a1a'}}>{s.title}</h3>
                    <p style={{color:'#555',lineHeight:1.7,fontSize:'.92rem',marginBottom:14}}>{s.desc}</p>
                    <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:5}}>
                      {s.items.map(i => (
                        <li key={i} style={{fontSize:'.86rem',color:'#555',display:'flex',gap:8,alignItems:'center'}}>
                          <span style={{color:'#7B2D8B',fontWeight:700}}>✓</span>{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Don't See Your Item? <span>Just Ask!</span></h2>
        <p>If you can point at it, we can haul it.</p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">📦 Get Free Quote</Link>
          <a href="tel:9043341521" className="btn btn-white">📞 Call Now</a>
        </div>
      </div>
    </>
  );
}
