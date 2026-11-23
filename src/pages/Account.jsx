import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import AuthCard, { Field, btnStyle, G } from '../components/AuthCard';
import QuoteForm, { AddressAutocomplete } from '../components/QuoteForm';

const tabStyle = active => ({
  flex: 1, padding: '12px 0', border: 'none', cursor: 'pointer', fontSize: '.95rem', fontWeight: 700,
  background: active ? G : '#f0f0f0', color: active ? '#fff' : '#666', borderRadius: 10,
});

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState('book');
  const [f, setF] = useState({ first_name: '', last_name: '', phone: '', address: '', zip: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      const m = user.user_metadata || {};
      setF({ first_name: m.first_name || '', last_name: m.last_name || '', phone: m.phone || '', address: m.address || '', zip: m.zip || '' });
    }
  }, [user]);

  // What the booking form already knows about this customer
  const prefill = useMemo(() => {
    if (!user) return null;
    const m = user.user_metadata || {};
    return { firstName: m.first_name, lastName: m.last_name, phone: m.phone, email: user.email, address: m.address, zip: m.zip };
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
    <AuthCard title={'Hey ' + (f.first_name || 'there') + ' 👋'} subtitle={user.email} maxWidth={620}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button onClick={() => setTab('book')} style={tabStyle(tab === 'book')}>📦 Book a Pickup</button>
        <button onClick={() => setTab('info')} style={tabStyle(tab === 'info')}>👤 My Info</button>
      </div>

      {tab === 'book' && (
        <div style={{ margin: '0 -28px' }}>
          <QuoteForm compact prefill={prefill} />
        </div>
      )}

      {tab === 'info' && (
        <>
          <form onSubmit={save}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}><Field label="First name" value={f.first_name} onChange={set('first_name')} /></div>
              <div style={{ flex: 1 }}><Field label="Last name" value={f.last_name} onChange={set('last_name')} /></div>
            </div>
            <Field label="Phone" type="tel" value={f.phone} onChange={set('phone')} />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, marginBottom: 6, color: '#333' }}>Service address</label>
              <AddressAutocomplete value={f.address} onChange={v => setF(prev => ({ ...prev, address: v }))} />
            </div>
            <Field label="ZIP code" inputMode="numeric" maxLength={5} value={f.zip} onChange={set('zip')} placeholder="32084" />
            <button type="submit" disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
              {busy ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
          <button onClick={signOut} style={{ ...btnStyle, background: '#fff', color: '#666', border: '2px solid #e8e8e8', marginTop: 12 }}>
            Sign Out
          </button>
        </>
      )}
    </AuthCard>
  );
}
