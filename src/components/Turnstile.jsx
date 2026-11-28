import React, { useEffect, useRef } from 'react';

const SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export const captchaEnabled = !!SITE_KEY;

function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!window.__tsLoading) {
    window.__tsLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SRC; s.async = true; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return window.__tsLoading;
}

// Renders the Cloudflare Turnstile widget. Pass a ref to reset() after a failed attempt.
export default function Turnstile({ onToken, resetRef }) {
  const box = useRef(null);
  const id = useRef(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !box.current || !window.turnstile) return;
      id.current = window.turnstile.render(box.current, {
        sitekey: SITE_KEY,
        callback: t => onToken(t),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    }).catch(() => {});
    if (resetRef) resetRef.current = () => { onToken(''); if (id.current != null && window.turnstile) window.turnstile.reset(id.current); };
    return () => {
      cancelled = true;
      if (id.current != null && window.turnstile) { try { window.turnstile.remove(id.current); } catch (e) {} }
    };
    // eslint-disable-next-line
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={box} style={{ margin: '4px 0 8px', minHeight: 65 }} />;
}
