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
  const [suggestions, setSuggestions]       = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading]               = useState(false);
  const debounceRef                         = React.useRef(null);

  const fetchSuggestions = async (input) => {
    if (input.length < 3) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res  = await fetch(`/api/places?input=${encodeURIComponent(input)}`);
      const data = await res.json();
      setSuggestions(data.predictions || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (desc) => {
    onChange(desc);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div style={{position:'relative'}}>
      <input
        value={value}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Start typing your address..."
        style={{
          width:'100%', padding:'12px 14px',
          border:`2px solid ${value ? green : '#e8e8e8'}`,
          borderRadius:10, fontSize:'.95rem', outline:'none', transition:'border .2s'
        }}
      />
      {loading && (
        <div style={{position:'absolute',right:12,top:14,fontSize:'.85rem',color:'#999'}}>🔍</div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position:'absolute', top:'100%', left:0, right:0,
          background:'#fff', border:'2px solid #e8e8e8',
          borderRadius:10, boxShadow:'0 8px 24px rgba(0,0,0,.12)',
          zIndex:100, marginTop:4, overflow:'hidden'
        }}>
          {suggestions.map((s,i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(s.description)}
              style={{
                padding:'12px 16px', cursor:'pointer',
                borderBottom: i < suggestions.length-1 ? '1px solid #f0f0f0' : 'none',
                fontSize:'.9rem', display:'flex', alignItems:'center', gap:8,
                background:'#fff', transition:'background .15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = greenLt}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              📍 {s.description}
            </div>
          ))}
        </div>
      )}
    </div>
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
