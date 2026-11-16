import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import AuthCard, { Field, btnStyle, G } from '../components/AuthCard';

export default function SignUp() {
  const navigate = useNavigate();
  const [f, setF] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    if (f.password.length < 8) return toast.error('Password needs at least 8 characters');
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: f.email.trim(),
      password: f.password,
      options: {
        data: { first_name: f.firstName, last_name: f.lastName, phone: f.phone },
        emailRedirectTo: window.location.origin + '/account',
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (data.session) {
      toast.success('Welcome to Jokers Junk Removal!');
      navigate('/account');
    } else {
      setCheckEmail(true);
    }
  };

  if (checkEmail) {
    return (
      <AuthCard title="Check your email 📬" subtitle={'We sent a confirmation link to ' + f.email + '. Click it to finish setting up your account.'}>
        <Link to="/signin" style={{ color: G, fontWeight: 700 }}>Back to sign in</Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create Account" subtitle="Book faster and track your pickups.">
      <form onSubmit={submit}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}><Field label="First name" value={f.firstName} onChange={set('firstName')} required autoComplete="given-name" /></div>
          <div style={{ flex: 1 }}><Field label="Last name" value={f.lastName} onChange={set('lastName')} autoComplete="family-name" /></div>
        </div>
        <Field label="Phone" type="tel" value={f.phone} onChange={set('phone')} required autoComplete="tel" placeholder="(904) 555-1234" />
        <Field label="Email" type="email" value={f.email} onChange={set('email')} required autoComplete="email" />
        <Field label="Password" type="password" value={f.password} onChange={set('password')} required autoComplete="new-password" placeholder="At least 8 characters" />
        <button type="submit" disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9rem', color: '#666' }}>
        Already have an account? <Link to="/signin" style={{ color: G, fontWeight: 700 }}>Sign in</Link>
      </p>
    </AuthCard>
  );
}
