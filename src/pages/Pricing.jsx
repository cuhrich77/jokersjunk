import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadEstimator from '../components/LoadEstimator';
import { PRICING, TRAILER_YARDS, priceForFraction, money } from '../lib/estimate';

const TIERS = [
  { f: 1 / 8, label: 'Minimum / 1/8 trailer', fits: 'A single item like a mattress, recliner or a few bags' },
  { f: 1 / 4, label: '1/4 trailer', fits: 'A sofa and loveseat, or a small appliance pickup' },
  { f: 1 / 2, label: '1/2 trailer', fits: 'A one-room cleanout or a small garage' },
  { f: 3 / 4, label: '3/4 trailer', fits: 'A big garage or 2–3 rooms of furniture' },
  { f: 1, label: 'Full trailer', fits: `A whole-home cleanout, about ${TRAILER_YARDS.toFixed(1)} cubic yards` },
];

const FAQ = [
  { q: 'How do you price junk removal?', a: `By volume: how much space your items take up in our 7×14 dump trailer (about ${TRAILER_YARDS.toFixed(1)} cubic yards). We price in 1/8-trailer steps, so you only pay for the space you use.` },
  { q: 'Is the online estimate my final price?', a: 'It\'s a close range based on what you tell us. When our crew arrives, we look at the load and confirm your exact price before we start. You approve it first, with no surprises.' },
  { q: 'Is there a minimum charge?', a: `Yes. Our minimum pickup is ${money(PRICING.minimum)}, which covers most single-item jobs.` },
  { q: 'What\'s included?', a: 'Everything: the crew, loading from anywhere on your property, hauling, disposal fees, donating and recycling what we can, and sweeping up when we\'re done.' },
  { q: 'Do you charge by weight?', a: 'Only for heavy materials like concrete, dirt, brick, tile and roofing shingles, since they fill the trailer\'s weight limit before its space. Call us for a quick quote on those.' },
];

export default function Pricing() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Junk Removal Prices in St. Augustine & NE Florida | Jokers Junk Removal';
    return () => { document.title = prev; };
  }, []);

  return (
    <>
      <div className="inner-hero">
        <div className="tag">Upfront Pricing</div>
        <h1>How Much Does <span>Junk Removal</span> Cost?</h1>
        <p>Pick your items or eyeball the trailer and see your price range in seconds, before we ever show up. Serving St. Augustine, Jacksonville and all of Northeast Florida.</p>
      </div>

      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <LoadEstimator />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="tag">Price List</div>
            <h2 className="section-title">Simple Trailer-Load Pricing</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Labor, hauling and disposal included. No hidden fees.</p>
          </div>
          <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
            {TIERS.map((t, i) => (
              <div key={t.label} style={{ background: '#fff', borderRadius: 18, padding: '24px 18px', border: '2px solid ' + (i === 4 ? '#7b2d8b' : '#e8e8e8'), textAlign: 'center' }}>
                <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 14 }}>
                  <div style={{ width: 90, height: 54, border: '3px solid #2d7a3a', borderTop: 'none', borderRadius: '0 0 6px 6px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, bottom: 0, top: 0, width: t.f * 100 + '%', background: 'linear-gradient(180deg,#5aa866,#2d7a3a)' }} />
                  </div>
                </div>
                <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t.label}</div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontSize: '2.4rem', fontWeight: 900, color: '#2d7a3a', lineHeight: 1.1, margin: '6px 0' }}>{money(priceForFraction(t.f))}</div>
                <div style={{ fontSize: '.85rem', color: '#666', lineHeight: 1.5 }}>{t.fits}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="tag">Questions</div>
            <h2 className="section-title">Pricing FAQ</h2>
          </div>
          {FAQ.map((f) => (
            <details key={f.q} style={{ borderBottom: '1.5px solid #e8e8e8', padding: '18px 4px' }}>
              <summary style={{ cursor: 'pointer', fontFamily: 'Barlow Condensed,sans-serif', fontSize: '1.3rem', fontWeight: 700 }}>{f.q}</summary>
              <p style={{ color: '#555', lineHeight: 1.7, marginTop: 10 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="cta-banner">
        <h2>Know Your Price. <span>Book in 60 Seconds.</span></h2>
        <p>Same-day service across Northeast Florida. Pickups from {money(PRICING.minimum)}.</p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">📦 Book Now</Link>
          <a href="tel:9043341521" className="btn btn-white">📞 (904) 334-1521</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .tier-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 520px) { .tier-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
