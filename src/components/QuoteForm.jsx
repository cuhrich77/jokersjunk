import React, { useState } from 'react';
import { saveLead } from '../lib/supabase';
import { createHubSpotContact } from '../lib/hubspot';

const SERVICES = [
  'Furniture Removal','Home / Estate Cleanout','Appliance Removal',
  'Yard Waste Removal','Construction Debris','Commercial Junk Removal',
  'Electronics / E-Waste','Scrap Metal','Multiple / Other'
];

const TIME_SLOTS = [
  { id:'morning',   label:'Morning',   time:'8am – 12pm', icon:'🌅' },
  { id:'afternoon', label:'Afternoon', time:'12pm – 4pm',  icon:'☀️' },
  { id:'evening',   label:'Evening',   time:'4pm – 7pm',   icon:'🌆' },
];

const green    = '#2d7a3a';
const purple   = '#7b2d8b';
const greenLt  = '#f0f9f2';
const purpleLt = '#f9f0fb';
const today    = new Date();
today.setHours(0,0,0,0);

// ── ADDRESS AUTOCOMPLETE ──────────────────────────────────────
function AddressAutocomplete({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="1055 Three Forks CT, Saint Augustine, FL 32084"
      style={{
        width:'100%', padding:'12px 14px',
        border:`2px solid ${value ? '#2d7a3a' : '#e8e8e8'}`,
        borderRadius:10, fontSize:'.95rem', outline:'none',
        transition:'border .2s'
      }}
    />
  );
}
  

// ── CALENDAR PICKER ───────────────────────────────────────────
function CalendarPicker({ selected, onSelect }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year        = viewDate.getFullYear();
  const month       = viewDate.getMonth();
  const monthName   = viewDate.toLocaleDateString('en-US', { month:'long', year:'numeric' });
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  return (
    <div style={{border:'2px solid #e8e8e8', borderRadius:16, overflow:'hidden'}}>
      {/* Month nav */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',background:'#f8f8f8',borderBottom:'1px solid #e8e8e8'}}>
        <button onClick={prevMonth} style={{background:'none',border:'none',fontSize:'1.4rem',cursor:'pointer',color:'#555',padding:'4px 10px'}}>‹</button>
        <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.2rem',fontWeight:700}}>{monthName}</div>
        <button onClick={nextMonth} style={{background:'none',border:'none',fontSize:'1.4rem',cursor:'pointer',color:'#555',padding:'4px 10px'}}>›</button>
      </div>

      {/* Weekday headers */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:'#f8f8f8',borderBottom:'1px solid #e8e8e8'}}>
        {WEEKDAYS.map(d => (
          <div key={d} style={{textAlign:'center',padding:'8px 0',fontSize:'.75rem',fontWeight:700,color:'#999'}}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,padding:8,background:'#fff'}}>
        {days.map((day, i) => {
          if (!day) return <div key={`e${i}`}/>;

          const thisDate = new Date(year, month, day);
          thisDate.setHours(0,0,0,0);
          const isPast     = thisDate < today;
          const isToday    = thisDate.getTime() === today.getTime();
          const isTomorrow = thisDate.getTime() === today.getTime() + 86400000;
          const fullStr    = thisDate.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
          const isSelected = selected?.full === fullStr;

          return (
            <button
              key={day}
              onClick={() => !isPast && onSelect({
                label: isToday ? 'Today' : isTomorrow ? 'Tomorrow' : thisDate.toLocaleDateString('en-US',{weekday:'short'}),
                date:  thisDate.toLocaleDateString('en-US',{month:'short',day:'numeric'}),
                full:  fullStr,
                sameDay: isToday,
              })}
              disabled={isPast}
              style={{
                padding:'10px 4px', borderRadius:10,
                border:    isSelected ? `2.5px solid ${green}` : '2px solid transparent',
                background: isSelected ? greenLt : isToday ? '#f0f9f2' : 'transparent',
                color:      isPast ? '#ddd' : isSelected ? green : isToday ? green : '#1a1a1a',
                fontFamily:'Barlow Condensed,sans-serif',
                fontSize:'1rem',
                fontWeight: isSelected || isToday ? 700 : 400,
                cursor: isPast ? 'not-allowed' : 'pointer',
                position:'relative', transition:'all .15s',
              }}
            >
              {day}
              {isToday && (
                <div style={{position:'absolute',bottom:3,left:'50%',transform:'translateX(-50%)',width:5,height:5,borderRadius:'50%',background:green}}/>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {selected && (
        <div style={{padding:'10px 16px',background:greenLt,borderTop:'1px solid rgba(45,122,58,.15)',fontSize:'.88rem',fontWeight:600,color:green,textAlign:'center'}}>
          📅 {selected.full}
        </div>
      )}
    </div>
  );
}

// ── MAIN FORM ─────────────────────────────────────────────────
export default function QuoteForm({ compact = false }) {
  const [step,       setStep]       = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [form,       setForm]       = useState({
    type:'Home', zip:'', service:'', day:null, timeSlot:null,
    firstName:'', lastName:'', phone:'', email:'', address:'', message:'',
  });

  const set      = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const canNext1 = form.zip.length >= 5 && form.service;
  const canNext2 = form.day !== null && form.timeSlot !== null;
  const canSubmit = form.firstName && form.phone && form.address;

  const resetForm = () => {
    setSubmitted(false); setStep(1);
    setForm({ type:'Home', zip:'', service:'', day:null, timeSlot:null, firstName:'', lastName:'', phone:'', email:'', address:'', message:'' });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createHubSpotContact(form);
      const { error } = await saveLead({
        firstName:    form.firstName,
        lastName:     form.lastName,
        phone:        form.phone,
        email:        form.email,
        address:      form.address,
        serviceType:  form.service,
        scheduledFor: `${form.day?.full} – ${form.timeSlot}`,
        message:      `${form.type} customer. ZIP: ${form.zip}. ${form.message}`,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please call us at (904) 334-1521');
    } finally {
      setSubmitting(false);
    }
  };

  // ── SUCCESS ──
  if (submitted) return (
    <div style={{background:'#fff',borderRadius:24,padding:40,textAlign:'center',boxShadow:'0 12px 48px rgba(0,0,0,0.12)',maxWidth:520,margin:'0 auto'}}>
      <div style={{fontSize:'4rem',marginBottom:16}}>🎉</div>
      <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'2rem',marginBottom:12,color:green}}>You're Booked!</h3>
      <p style={{color:'#555',marginBottom:8,lineHeight:1.7}}>
        We'll call you <strong>30 minutes before arrival</strong> on <strong>{form.day?.full}</strong> during the <strong>{TIME_SLOTS.find(t=>t.id===form.timeSlot)?.label}</strong> window.
      </p>
      <div style={{background:greenLt,borderRadius:16,padding:20,margin:'20px 0',border:`1.5px solid rgba(45,122,58,.2)`}}>
        <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.1rem',fontWeight:700,color:green,marginBottom:4}}>Your Appointment</d

</div>
  );

  const btnStyle = (active) => ({
    width:'100%', padding:16,
    background: active ? green : '#e8e8e8',
    color: active ? '#fff' : '#999',
    border:'none', borderRadius:50,
    fontFamily:'Barlow Condensed,sans-serif',
    fontSize:'1.2rem', fontWeight:700,
    cursor: active ? 'pointer' : 'not-allowed',
    transition:'all .2s',
  });

  const backBtn = {
    flex:1, padding:16, background:'#fff', color:'#555',
    border:'2px solid #e8e8e8', borderRadius:50,
    fontFamily:'Barlow Condensed,sans-serif',
    fontSize:'1.1rem', fontWeight:700, cursor:'pointer',
  };

  return (
    <div style={{background:'#fff',borderRadius:24,padding:compact?24:40,boxShadow:compact?'none':'0 12px 48px rgba(0,0,0,0.12)',border:compact?'none':'1px solid #e8e8e8',maxWidth:560,width:'100%'}}>

      {/* PROGRESS BAR */}
      <div style={{marginBottom:28}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          {['Check Availability','Choose Time','Your Info'].map((s,i) => (
            <div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
              <div style={{
                width:36,height:36,borderRadius:'50%',
                background: step > i+1 ? green : step === i+1 ? green : '#e8e8e8',
                color: step >= i+1 ? '#fff' : '#999',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'Barlow Condensed,sans-serif',fontWeight:900,fontSize:'1.1rem',
                marginBottom:6,transition:'all .3s',
                boxShadow: step === i+1 ? `0 4px 12px rgba(45,122,58,.4)` : 'none',
              }}>{step > i+1 ? '✓' : i+1}</div>
              <div style={{fontSize:'.72rem',fontWeight:600,color:step===i+1?green:'#999',textAlign:'center',lineHeight:1.2}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{height:4,background:'#e8e8e8',borderRadius:4,margin:'0 18px',position:'relative',top:-28}}>
          <div style={{height:'100%',background:green,borderRadius:4,width:`${((step-1)/2)*100}%`,transition:'width .4s ease'}}/>
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',marginBottom:4}}>Check Availability</h3>
          <p style={{color:'#999',fontSize:'.88rem',marginBottom:24}}>Enter your ZIP code to get started</p>
          <div style={{display:'flex',gap:12,marginBottom:24}}>
            {['Home','Business'].map(t => (
              <button key={t} onClick={() => set('type',t)} style={{
                flex:1,padding:14,borderRadius:12,cursor:'pointer',
                border:`2.5px solid ${form.type===t?(t==='Home'?green:purple):'#e8e8e8'}`,
                background:form.type===t?(t==='Home'?greenLt:purpleLt):'#fff',
                fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.2rem',fontWeight:700,
                color:form.type===t?(t==='Home'?green:purple):'#999',transition:'all .2s',
              }}>{t==='Home'?'🏠':'🏢'} {t}</button>
            ))}
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:'.85rem',fontWeight:600,marginBottom:6}}>ZIP Code <span style={{color:green}}>*</span></label>
            <input type="number" placeholder="32084" value={form.zip} onChange={e=>set('zip',e.target.value)}
              style={{width:'100%',padding:'14px 16px',border:`2px solid ${form.zip.length>=5?green:'#e8e8e8'}`,borderRadius:12,fontSize:'1.1rem',fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,letterSpacing:4,outline:'none',transition:'border .2s'}}/>
            {form.zip.length>=5 && <div style={{color:green,fontSize:'.85rem',fontWeight:600,marginTop:6}}>✅ We serve your area!</div>}
          </div>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:'.85rem',fontWeight:600,marginBottom:10}}>What do you need hauled? <span style={{color:green}}>*</span></label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {SERVICES.map(s => (
                <button key={s} onClick={()=>set('service',s)} style={{
                  padding:'10px 12px',borderRadius:10,cursor:'pointer',textAlign:'left',
                  border:`2px solid ${form.service===s?green:'#e8e8e8'}`,
                  background:form.service===s?greenLt:'#fff',
                  fontSize:'.82rem',fontWeight:form.service===s?700:400,
                  color:form.service===s?green:'#555',transition:'all .2s',
                }}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>setStep(2)} disabled={!canNext1} style={btnStyle(canNext1)}>
            Next: Choose Your Time →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',marginBottom:4}}>Choose Appointment</h3>
          <p style={{color:'#999',fontSize:'.88rem',marginBottom:24}}>Select a date and arrival window</p>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:'.85rem',fontWeight:600,marginBottom:10}}>Select a Date</label>
            <CalendarPicker selected={form.day} onSelect={d=>set('day',d)}/>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:'.85rem',fontWeight:600,marginBottom:10}}>Select Arrival Window</label>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {TIME_SLOTS.map(t => (
                <button key={t.id} onClick={()=>set('timeSlot',t.id)} style={{
                  padding:'16px 20px',borderRadius:14,cursor:'pointer',
                  border:`2.5px solid ${form.timeSlot===t.id?green:'#e8e8e8'}`,
                  background:form.timeSlot===t.id?greenLt:'#fff',
                  display:'flex',alignItems:'center',gap:16,transition:'all .2s',
                }}>
                  <span style={{fontSize:'1.8rem'}}>{t.icon}</span>
                  <div style={{textAlign:'left'}}>
                    <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.15rem',fontWeight:700,color:form.timeSlot===t.id?green:'#1a1a1a'}}>{t.label}</div>
                    <div style={{fontSize:'.85rem',color:'#999'}}>{t.time}</div>
                  </div>
                  {form.timeSlot===t.id && <span style={{marginLeft:'auto',color:green,fontSize:'1.4rem'}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:12}}>
            <button onClick={()=>setStep(1)} style={backBtn}>← Back</button>
            <button onClick={()=>setStep(3)} disabled={!canNext2} style={{...btnStyle(canNext2),flex:2}}>Next: Your Info →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',marginBottom:4}}>Your Information</h3>
          <p style={{color:'#999',fontSize:'.88rem',marginBottom:20}}>Almost done! We'll confirm your estimate appointment.</p>
          <div style={{background:greenLt,borderRadius:14,padding:'14px 18px',marginBottom:20,border:`1.5px solid rgba(45,122,58,.2)`,display:'flex',gap:12,alignItems:'center'}}>
            <span style={{fontSize:'1.6rem'}}>📅</span>
            <div>
              <div style={{fontWeight:700,fontSize:'.9rem',color:green}}>{form.day?.full}</div>
              <div style={{fontSize:'.85rem',color:'#555'}}>{TIME_SLOTS.find(t=>t.id===form.timeSlot)?.icon} {TIME_SLOTS.find(t=>t.id===form.timeSlot)?.label} · {TIME_SLOTS.find(t=>t.id===form.timeSlot)?.time}</div>
              <div style={{fontSize:'.82rem',color:'#999'}}>{form.service} · {form.type}</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div>
              <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>First Name <span style={{color:green}}>*</span></label>
              <input value={form.firstName} onChange={e=>set('firstName',e.target.value)} placeholder="John"
                style={{width:'100%',padding:'12px 14px',border:`2px solid ${form.firstName?green:'#e8e8e8'}`,borderRadius:10,fontSize:'.95rem',outline:'none',transition:'border .2s'}}/>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>Last Name</label>
              <input value={form.lastName} onChange={e=>set('lastName',e.target.value)} placeholder="Smith"
                style={{width:'100%',padding:'12px 14px',border:'2px solid #e8e8e8',borderRadius:10,fontSize:'.95rem',outline:'none'}}/>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div>
              <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>Phone <span style={{color:green}}>*</span></label>
              <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="(904) 555-0100" type="tel"
                style={{width:'100%',padding:'12px 14px',border:`2px solid ${form.phone?green:'#e8e8e8'}`,borderRadius:10,fontSize:'.95rem',outline:'none',transition:'border .2s'}}/>
            </div>
            <div>
              <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>Email</label>
              <input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="john@email.com" type="email"
                style={{width:'100%',padding:'12px 14px',border:'2px solid #e8e8e8',borderRadius:10,fontSize:'.95rem',outline:'none'}}/>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>Service Address <span style={{color:green}}>*</span></label>
            <AddressAutocomplete value={form.address} onChange={v=>set('address',v)}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:'.82rem',fontWeight:600,marginBottom:5}}>Additional Notes (Optional)</label>
            <textarea value={form.message} onChange={e=>set('message',e.target.value)}
              placeholder="Describe what needs hauling, access notes, etc."
              style={{width:'100%',padding:'12px 14px',border:'2px solid #e8e8e8',borderRadius:10,fontSize:'.95rem',outline:'none',height:80,resize:'none'}}/>
          </div>
          <div style={{display:'flex',gap:12}}>
            <button onClick={()=>setStep(2)} style={backBtn}>← Back</button>
            <button onClick={handleSubmit} disabled={!canSubmit||submitting} style={{...btnStyle(canSubmit&&!submitting),flex:2}}>
              {submitting?'Booking...':'🚛 Book My Estimate →'}
            </button>
          </div>
          <p style={{textAlign:'center',fontSize:'.78rem',color:'#aaa',marginTop:10}}>No credit card needed · Free estimate · Cancel anytime</p>
        </div>
      )}
    </div>
  );
}
