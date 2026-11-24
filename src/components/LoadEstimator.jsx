import React, { Suspense, lazy, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ITEMS, CATEGORIES, SECTION_COLORS, SECTION_NAMES, PRICING, TRAILER_YARDS,
  buildEstimate, saveEstimate, money,
} from '../lib/estimate';

const TrailerScene = lazy(() => import('./TrailerScene'));

const G = '#2d7a3a', P = '#7b2d8b', GL = '#f0f9f2';
const QUICK = [[0, 'Empty'], [0.25, '¼'], [0.5, '½'], [0.75, '¾'], [1, 'Full']];
const cond = 'Barlow Condensed,sans-serif';

// Customer price estimator.
// compact: no 3D (used inside the booking form). onBook(estimate): custom handler; default sends the
// estimate to the booking form on /contact.
export default function LoadEstimator({ compact = false, onBook, bookLabel = 'Book This Load →' }) {
  const [mode, setMode] = useState('items');
  const [qty, setQty] = useState({});
  const [fills, setFills] = useState([0, 0, 0, 0]);
  const [cat, setCat] = useState(CATEGORIES[0].id);
  const navigate = useNavigate();

  const est = useMemo(() => buildEstimate({ mode, qty, fills }), [mode, qty, fills]);
  const empty = est.fraction <= 0;
  const itemCount = Object.values(qty).reduce((a, b) => a + b, 0);

  const bump = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + d) }));
  const setFill = (i, v) => setFills((f) => f.map((x, k) => (k === i ? v : x)));
  const switchMode = (m) => {
    if (m === 'sections' && mode === 'items') setFills(est.fills.map((f) => Math.round(f * 4) / 4));
    setMode(m);
  };
  const clear = () => { setQty({}); setFills([0, 0, 0, 0]); };
  const book = () => {
    if (empty) return;
    if (onBook) return onBook(est);
    saveEstimate(est);
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  const tabBtn = (m, label) => (
    <button type="button" onClick={() => switchMode(m)} style={{
      flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none', cursor: 'pointer',
      background: mode === m ? '#fff' : 'transparent', boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
      fontFamily: cond, fontSize: '1.05rem', fontWeight: 700, color: mode === m ? G : '#888',
    }}>{label}</button>
  );

  const inputs = (
    <div>
      <div style={{ display: 'flex', gap: 4, background: '#f1f3f1', padding: 4, borderRadius: 12, marginBottom: 16 }}>
        {tabBtn('items', '🛋️ Pick items')}
        {tabBtn('sections', '🚛 Eyeball it')}
      </div>

      {mode === 'items' ? (
        <>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {CATEGORIES.map((c) => (
              <button type="button" key={c.id} onClick={() => setCat(c.id)} style={{
                padding: '6px 14px', borderRadius: 50, cursor: 'pointer', fontSize: '.85rem', fontWeight: 600,
                border: '2px solid ' + (cat === c.id ? G : '#e8e8e8'), background: cat === c.id ? GL : '#fff', color: cat === c.id ? G : '#555',
              }}>{c.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fill,minmax(210px,1fr))', gap: 8 }}>
            {ITEMS.filter((i) => i.cat === cat).map((i) => {
              const n = qty[i.id] || 0;
              return (
                <div key={i.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 12,
                  border: '2px solid ' + (n ? G : '#eee'), background: n ? GL : '#fff', transition: 'all .15s',
                }}>
                  <span style={{ fontSize: '1.4rem' }}>{i.emoji}</span>
                  <span style={{ flex: 1, fontSize: '.9rem', fontWeight: n ? 700 : 500, color: '#1a1a1a' }}>{i.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #ddd', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                    <button type="button" aria-label={'Remove ' + i.name} onClick={() => bump(i.id, -1)} style={stepBtn}>−</button>
                    <span style={{ minWidth: 22, textAlign: 'center', fontWeight: 700, fontSize: '.9rem' }}>{n}</span>
                    <button type="button" aria-label={'Add ' + i.name} onClick={() => bump(i.id, 1)} style={stepBtn}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: '.85rem', color: '#777' }}>
            <span>{itemCount} item{itemCount === 1 ? '' : 's'} added</span>
            {itemCount > 0 && <button type="button" onClick={clear} style={linkBtn}>Clear all</button>}
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: '.88rem', color: '#666', lineHeight: 1.6, marginBottom: 8 }}>
            Picture our 7×14 dump trailer split into 4 equal sections. How full would your stuff make each one?
          </p>
          {SECTION_NAMES.map((name, i) => (
            <div key={name} style={{ padding: '10px 0', borderBottom: i < 3 ? '1px solid #eee' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: SECTION_COLORS[i], color: '#fff', fontSize: '.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <span style={{ fontWeight: 600, fontSize: '.92rem', flex: 1 }}>{name}</span>
                <span style={{ fontFamily: cond, fontWeight: 800, fontSize: '1.05rem' }}>{Math.round(fills[i] * 100)}%</span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {QUICK.map(([v, l]) => (
                  <button type="button" key={l} onClick={() => setFill(i, v)} style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '.88rem',
                    border: '2px solid ' + (fills[i] === v ? SECTION_COLORS[i] : '#e8e8e8'),
                    background: fills[i] === v ? SECTION_COLORS[i] : '#fff', color: fills[i] === v ? '#fff' : '#555',
                  }}>{l}</button>
                ))}
              </div>
            </div>
          ))}
          {!empty && <button type="button" onClick={clear} style={{ ...linkBtn, marginTop: 8 }}>Reset</button>}
        </>
      )}
    </div>
  );

  const miniBar = (
    <div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
        {est.fills.map((f, i) => (
          <div key={i} style={{ flex: 1, height: 40, borderRadius: 6, background: '#eceeec', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: f * 100 + '%', background: SECTION_COLORS[i], transition: 'height .25s' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.68rem', color: '#999', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.05em' }}>
        <span>◂ Front</span><span>Tailgate ▸</span>
      </div>
    </div>
  );

  const result = (
    <div style={{ background: '#fff', borderRadius: 18, border: '2px solid ' + (empty ? '#eee' : G), padding: compact ? 16 : 20 }}>
      <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '.08em' }}>Your estimate</div>
      {empty ? (
        <>
          <div style={{ fontFamily: cond, fontSize: compact ? '1.8rem' : '2.4rem', fontWeight: 900, color: '#bbb', lineHeight: 1.1, margin: '4px 0' }}>Add your stuff</div>
          <div style={{ fontSize: '.88rem', color: '#777' }}>Pickups start at {money(PRICING.minimum)}. Full trailer {money(PRICING.fullLoad)}.</div>
        </>
      ) : (
        <>
          <div style={{ fontFamily: cond, fontSize: compact ? '2.2rem' : '3rem', fontWeight: 900, color: G, lineHeight: 1.05, margin: '4px 0' }}>
            {money(est.low)} – {money(est.high)}
          </div>
          <div style={{ fontSize: '.9rem', color: '#555' }}>
            About <strong>{est.sizeLabel}</strong> · {est.yards.toFixed(1)} of {TRAILER_YARDS.toFixed(1)} cu yd
          </div>
          {est.overflow && (
            <div style={{ marginTop: 8, fontSize: '.85rem', color: P, fontWeight: 600 }}>🚛🚛 That's more than one trailer. We'll make extra trips, and it's priced in.</div>
          )}
        </>
      )}
      {!compact && (
        <div style={{ margin: '14px 0 10px' }}>
          <Suspense fallback={<div style={{ height: 300, borderRadius: 16, background: '#f1f4f1' }} />}>
            <TrailerScene fills={est.fills} height={300} />
          </Suspense>
          <div style={{ fontSize: '.75rem', color: '#999', textAlign: 'center', marginTop: 6 }}>Drag to spin the trailer</div>
        </div>
      )}
      <div style={{ margin: compact ? '12px 0' : '0 0 14px' }}>{miniBar}</div>
      <button type="button" onClick={book} disabled={empty} style={{
        width: '100%', padding: 14, border: 'none', borderRadius: 50, cursor: empty ? 'not-allowed' : 'pointer',
        background: empty ? '#e8e8e8' : G, color: empty ? '#999' : '#fff', fontFamily: cond, fontSize: '1.2rem', fontWeight: 700,
      }}>{bookLabel}</button>
      <p style={{ fontSize: '.78rem', color: '#888', lineHeight: 1.5, marginTop: 10, textAlign: 'center' }}>
        Estimates are based on how much space your items take in our 7×14 trailer. We confirm your final price on site before we lift a thing.
        Heavy materials (concrete, dirt, roofing) are priced by weight.
      </p>
    </div>
  );

  if (compact) return <div>{inputs}<div style={{ marginTop: 14 }}>{result}</div></div>;

  return (
    <div className="load-estimator" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 32, alignItems: 'start' }}>
      {inputs}
      <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 40px)' }}>{result}</div>
      <style>{`@media (max-width: 900px){ .load-estimator{ grid-template-columns: 1fr !important; } .load-estimator > div:last-child{ position: static !important; } }`}</style>
    </div>
  );
}

const stepBtn = { border: 'none', background: '#fff', width: 30, height: 30, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', color: '#2d7a3a' };
const linkBtn = { background: 'none', border: 'none', color: '#7b2d8b', fontWeight: 600, cursor: 'pointer', fontSize: '.85rem', padding: 0, textDecoration: 'underline' };
