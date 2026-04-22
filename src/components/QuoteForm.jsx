import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { saveLead } from '../lib/supabase';
import { createHubSpotContact } from '../lib/hubspot';

const SERVICES = ['Furniture Removal','Home / Estate Cleanout','Appliance Removal','Yard Waste Removal','Construction Debris','Commercial Junk Removal','Electronics / E-Waste','Scrap Metal','Multiple / Other'];
const TIMING = ['Today (Same-Day)','Tomorrow','This Week','Next Week','Flexible'];

export default function QuoteForm({ compact = false }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  
const onSubmit = async (formData) => {
  setSubmitting(true);
  try {
    const { error } = await saveLead({
      firstName: formData.firstName,
      lastName: formData.lastName || '',
      phone: formData.phone,
      email: formData.email || '',
      address: formData.address,
      serviceType: formData.serviceType,
      scheduledFor: formData.scheduledFor || 'Flexible',
      message: formData.message || '',
      hubspotId: null,
    });
    if (error) throw error;
    toast.success('🚛 Quote request sent! We\'ll call you within minutes.');
    setSubmitted(true);
    reset();
  } catch (err) {
    console.error('Form error:', err);
    toast.error('Something went wrong. Please call us directly!');
  } finally {
    setSubmitting(false);
  }
};
  if (submitted) return (
    <div style={{background:'#fff',borderRadius:24,padding:40,textAlign:'center',boxShadow:'0 12px 48px rgba(0,0,0,0.12)'}}>
      <div style={{fontSize:'3rem',marginBottom:16}}>✅</div>
      <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.8rem',marginBottom:12}}>You're All Set!</h3>
      <p style={{color:'#555',marginBottom:12}}>We'll call you within <strong>15 minutes</strong> during business hours.</p>
      <a href="tel:7865550199" style={{display:'block',fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.5rem',fontWeight:700,color:'#ff6a00',margin:'16px 0'}}>(786) 555-0199</a>
      <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Submit Another</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{background:'#fff',borderRadius:24,padding:compact?28:40,boxShadow:compact?'none':'0 12px 48px rgba(0,0,0,0.12)',border:compact?'none':'1px solid #e8e8e8'}}>
      {!compact && <h3 style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:'1.6rem',marginBottom:6}}>Get Your Free Quote</h3>}
      {!compact && <p style={{color:'#555',fontSize:'.9rem',marginBottom:24}}>Response in under 15 minutes!</p>}

      <div className="form-row">
        <div className="form-group">
          <label>First Name <span className="required">*</span></label>
          <input className={`form-control${errors.firstName?' error':''}`} placeholder="John" {...register('firstName',{required:'Required'})}/>
          {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input className="form-control" placeholder="Smith" {...register('lastName')}/>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone <span className="required">*</span></label>
          <input className={`form-control${errors.phone?' error':''}`} placeholder="(305) 555-0100" type="tel" {...register('phone',{required:'Required'})}/>
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" placeholder="john@email.com" type="email" {...register('email')}/>
        </div>
      </div>

      <div className="form-group">
        <label>Address / City <span className="required">*</span></label>
        <input className={`form-control${errors.address?' error':''}`} placeholder="Miami, FL 33101" {...register('address',{required:'Required'})}/>
        {errors.address && <p className="form-error">{errors.address.message}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Service <span className="required">*</span></label>
          <select className={`form-control${errors.serviceType?' error':''}`} {...register('serviceType',{required:'Required'})}>
            <option value="">-- Select --</option>
            {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          {errors.serviceType && <p className="form-error">{errors.serviceType.message}</p>}
        </div>
        <div className="form-group">
          <label>When?</label>
          <select className="form-control" {...register('scheduledFor')}>
            {TIMING.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {!compact && (
        <div className="form-group">
          <label>Tell Us More (Optional)</label>
          <textarea className="form-control" placeholder="Describe what needs hauling..." {...register('message')}/>
        </div>
      )}

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Sending...' : '🚛 Get My Free Quote →'}
      </button>
      <p style={{textAlign:'center',fontSize:'.8rem',color:'#aaa',marginTop:10}}>No obligation · 100% free · Fast response</p>
    </form>
  );
}
