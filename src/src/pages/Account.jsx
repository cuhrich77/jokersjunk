import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import AuthCard, { Field, btnStyle, P } from '../components/AuthCard';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const [f, setF] = useState({ first_name: '', last_name: '', phone: '', address: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      const m = user.user_metadata || {};
      setF({ first_name: m.first_name || '', last_name: m.last_name || '', phone: m.phone || '', address: m.address || '' });
    }
  }, [user]);

  if (loading) return <AuthCard title="Loading..." />;
  if (!user) return <Navigate to="/signin" replace state={{ from: '/account' }} />;

  const set = k => e => setF({ ...f, [k]: e.target.value });

  const save = async e => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ data: f });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Profile saved');
  };

  return (
    <AuthCard title={'Hey ' + (f.first_name || 'there') + ' 👋'} subtitle={user.email}>
      <Link to="/contact" style={{ ...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none', background: P, marginTop: 0, marginBottom: 24 }}>
        📦 Book a Pickup
      </Link>

      <h3 style={{ fontSize: '1rem', margin: '0 0 12px', color: '#333' }}>Your info</h3>
      <form onSubmit={save}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}><Field label="First name" value={f.first_name} onChange={set('first_name')} /></div>
          <div style={{ flex: 1 }}><Field label="Last name" value={f.last_name} onChange={set('last_name')} /></div>
        </div>
        <Field label="Phone" type="tel" value={f.phone} onChange={set('phone')} />
        <Field label="Service address" value={f.address} onChange={set('address')} placeholder="Where we usually pick up" />
        <button type="submit" disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <button onClick={signOut} style={{ ...btnStyle, background: '#fff', color: '#666', border: '2px solid #e8e8e8', marginTop: 12 }}>
        Sign Out
      </button>
    </AuthCard>
  );
}
