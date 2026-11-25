import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import AuthCard, { Field, PasswordField, btnStyle, G, P } from '../components/AuthCard';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return toast.error(error.message);
    navigate(location.state?.from || '/account');
  };

  const forgot = async () => {
    if (!email) return toast.error('Type your email above first');
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + '/reset-password',
    });
    if (error) return toast.error(error.message);
    toast.success('Password reset link sent. Check your email.');
  };

  return (
    <AuthCard title="Sign In" subtitle="Welcome back!">
      <form onSubmit={submit}>
        <Field label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <PasswordField label="Password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        <div style={{ textAlign: 'right', marginTop: -6, marginBottom: 8 }}>
          <button type="button" onClick={forgot} style={{ background: 'none', border: 'none', color: P, fontSize: '.85rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
            Forgot password?
          </button>
        </div>
        <button type="submit" disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9rem', color: '#666' }}>
        New here? <Link to="/signup" style={{ color: G, fontWeight: 700 }}>Create an account</Link>
      </p>
    </AuthCard>
  );
}
