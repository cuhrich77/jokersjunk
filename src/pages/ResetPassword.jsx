import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import AuthCard, { PasswordField, btnStyle, G } from '../components/AuthCard';

export default function ResetPassword() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (password.length < 8) return toast.error('Password needs at least 8 characters');
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Password updated!');
    navigate('/account');
  };

  if (loading) return <AuthCard title="One sec..." />;

  if (!user) {
    return (
      <AuthCard title="Link expired" subtitle="That reset link is no longer valid. Request a new one from the sign-in page.">
        <Link to="/signin" style={{ color: G, fontWeight: 700 }}>Back to sign in</Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set a new password">
      <form onSubmit={submit}>
        <PasswordField label="New password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" placeholder="At least 8 characters" />
        <button type="submit" disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Saving...' : 'Update Password'}
        </button>
      </form>
    </AuthCard>
  );
}
