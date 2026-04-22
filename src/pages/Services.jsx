import React from 'react';
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
            {SERVICES.map(s=>(
              <div key={s.title} style={{background:'#fff',border:'1.5px solid #e8e8e8',borderRadius:20,padding:36,display:'flex',gap:22,alignItems:'flex-start',transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#ff6a00';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 4px 24px rgba(255,106,0,.10)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#e8e8e8';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
                <div style={{fontSize:'2.6rem',minWidth:56}}>{s.icon}</div>
                <div>
                  <h3 style={{fontSize:'1.35rem',marginBottom:10}}>{s.title}</h3>
                  <p style={{color:'#555',lineHeight:1.7,fontSize:'.92rem',marginBottom:14}}>{s.desc}</p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:5}}>
                    {s.items.map(i=>(
                      <li key={i} style={{fontSize:'.86rem',color:'#555',display:'flex',gap:8,alignItems:'center'}}>
                        <span style={{color:'#ff6a00',fontWeight:700}}>✓</span>{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
