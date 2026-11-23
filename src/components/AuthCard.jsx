import React from 'react';

export const G = '#2d7a3a';
export const P = '#7b2d8b';

export const inputStyle = {
  width: '100%', padding: '12px 14px', border: '2px solid #e8e8e8',
  borderRadius: 10, fontSize: '16px', outline: 'none', boxSizing: 'border-box',
};

export const btnStyle = {
  width: '100%', padding: '14px 0', background: G, color: '#fff', border: 'none',
  borderRadius: 10, fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginTop: 8,
};

export function Field({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, marginBottom: 6, color: '#333' }}>{label}</label>
      <input
        {...props}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = G)}
        onBlur={e => (e.target.style.borderColor = '#e8e8e8')}
      />
    </div>
  );
}

export default function AuthCard({ title, subtitle, children, maxWidth = 440 }) {
  return (
    <section style={{ minHeight: '80vh', padding: '180px 16px 60px', background: '#f4f8f4', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth, alignSelf: 'flex-start', background: '#fff', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,.08)', padding: '32px 28px', borderTop: '5px solid ' + P }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 6px', color: '#222' }}>{title}</h1>
        {subtitle && <p style={{ color: '#777', margin: '0 0 24px', fontSize: '.95rem' }}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
