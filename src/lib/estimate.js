// Customer-facing load estimator: pricing, item catalog and math.
// Change prices here; the estimator, the /pricing page and the booking form all read from this file.

export const PRICING = {
  fullLoad: 650,      // full 7x14 trailer
  minimum: 99,        // minimum pickup
  increments: 8,      // bill in 1/8-load steps
};

// 7' x 14' dump trailer with 4' sides
export const TRAILER = { lengthFt: 14, widthFt: 7, heightFt: 4 };
export const TRAILER_CUFT = TRAILER.lengthFt * TRAILER.widthFt * TRAILER.heightFt; // 392
export const TRAILER_YARDS = TRAILER_CUFT / 27;                                     // ~14.5
export const SECTION_CUFT = TRAILER_CUFT / 4;

export const SECTION_COLORS = ['#2d7a3a', '#7b2d8b', '#e8a33d', '#2b8fb3'];
export const SECTION_NAMES = ['Front', 'Front-middle', 'Back-middle', 'Back (tailgate)'];

export const CATEGORIES = [
  { id: 'furniture', label: 'Furniture' },
  { id: 'appliances', label: 'Appliances' },
  { id: 'outdoor', label: 'Outdoor & Garage' },
  { id: 'bulk', label: 'Bags & Piles' },
];

// cuft = rough as-loaded volume of one item
export const ITEMS = [
  { id: 'sofa', name: 'Sofa / couch', emoji: '🛋️', cat: 'furniture', cuft: 50 },
  { id: 'loveseat', name: 'Loveseat', emoji: '🛋️', cat: 'furniture', cuft: 35 },
  { id: 'sectional', name: 'Sectional piece', emoji: '🛋️', cat: 'furniture', cuft: 40 },
  { id: 'recliner', name: 'Recliner / armchair', emoji: '💺', cat: 'furniture', cuft: 25 },
  { id: 'mattress', name: 'Mattress', emoji: '🛏️', cat: 'furniture', cuft: 30 },
  { id: 'boxspring', name: 'Box spring', emoji: '🛏️', cat: 'furniture', cuft: 25 },
  { id: 'bedframe', name: 'Bed frame', emoji: '🛏️', cat: 'furniture', cuft: 15 },
  { id: 'dresser', name: 'Dresser', emoji: '🗄️', cat: 'furniture', cuft: 30 },
  { id: 'nightstand', name: 'Nightstand / end table', emoji: '🗄️', cat: 'furniture', cuft: 6 },
  { id: 'desk', name: 'Desk', emoji: '🖥️', cat: 'furniture', cuft: 30 },
  { id: 'table', name: 'Dining table', emoji: '🍽️', cat: 'furniture', cuft: 25 },
  { id: 'chair', name: 'Chair', emoji: '🪑', cat: 'furniture', cuft: 5 },
  { id: 'bookshelf', name: 'Bookshelf', emoji: '📚', cat: 'furniture', cuft: 15 },
  { id: 'entcenter', name: 'Entertainment center', emoji: '📺', cat: 'furniture', cuft: 35 },
  { id: 'tv', name: 'TV', emoji: '📺', cat: 'furniture', cuft: 6 },
  { id: 'fridge', name: 'Refrigerator', emoji: '🧊', cat: 'appliances', cuft: 40 },
  { id: 'washer', name: 'Washer', emoji: '🫧', cat: 'appliances', cuft: 18 },
  { id: 'dryer', name: 'Dryer', emoji: '🌀', cat: 'appliances', cuft: 18 },
  { id: 'stove', name: 'Stove / range', emoji: '🍳', cat: 'appliances', cuft: 18 },
  { id: 'dishwasher', name: 'Dishwasher', emoji: '🍽️', cat: 'appliances', cuft: 12 },
  { id: 'waterheater', name: 'Water heater', emoji: '🔥', cat: 'appliances', cuft: 12 },
  { id: 'freezer', name: 'Chest freezer', emoji: '🧊', cat: 'appliances', cuft: 25 },
  { id: 'grill', name: 'Grill', emoji: '🍖', cat: 'outdoor', cuft: 18 },
  { id: 'mower', name: 'Lawn mower', emoji: '🌱', cat: 'outdoor', cuft: 12 },
  { id: 'treadmill', name: 'Treadmill / gym machine', emoji: '🏋️', cat: 'outdoor', cuft: 30 },
  { id: 'patioset', name: 'Patio set', emoji: '⛱️', cat: 'outdoor', cuft: 30 },
  { id: 'bike', name: 'Bike', emoji: '🚲', cat: 'outdoor', cuft: 10 },
  { id: 'tire', name: 'Tire', emoji: '🛞', cat: 'outdoor', cuft: 6 },
  { id: 'bag', name: 'Trash bag (large)', emoji: '🗑️', cat: 'bulk', cuft: 5 },
  { id: 'box', name: 'Moving box', emoji: '📦', cat: 'bulk', cuft: 3 },
  { id: 'carpet', name: 'Carpet (per room)', emoji: '🧶', cat: 'bulk', cuft: 25 },
  { id: 'yardpile', name: 'Yard debris (pickup-bed pile)', emoji: '🌿', cat: 'bulk', cuft: 55 },
  { id: 'junkpile', name: 'Misc. junk (pickup-bed pile)', emoji: '🧺', cat: 'bulk', cuft: 55 },
];

export const money = (n) => '$' + Math.round(n).toLocaleString();

export function priceForFraction(f) {
  if (f <= 0) return 0;
  const steps = Math.ceil(f * PRICING.increments - 1e-9);
  return Math.round(Math.max(PRICING.minimum, (steps * PRICING.fullLoad) / PRICING.increments));
}

export function fractionLabel(f) {
  if (f <= 0) return 'Empty';
  const n = Math.ceil(f * 8 - 1e-9);
  const whole = Math.floor(n / 8), rem = n % 8;
  const map = { 1: '1/8', 2: '1/4', 3: '3/8', 4: '1/2', 5: '5/8', 6: '3/4', 7: '7/8' };
  if (whole === 0) return `${map[rem]} trailer`;
  if (rem === 0) return whole === 1 ? 'Full trailer' : `${whole} full trailers`;
  return `${whole} + ${map[rem]} trailers`;
}

// mode 'items': qty = { itemId: count }; mode 'sections': fills = [0..1] x4
export function buildEstimate({ mode, qty = {}, fills = [0, 0, 0, 0] }) {
  let cuft, secFills;
  const chosen = ITEMS.filter((i) => qty[i.id] > 0).map((i) => ({ name: i.name, qty: qty[i.id] }));
  if (mode === 'items') {
    cuft = ITEMS.reduce((a, i) => a + (qty[i.id] || 0) * i.cuft, 0);
    secFills = [0, 1, 2, 3].map((k) => Math.min(1, Math.max(0, (cuft - k * SECTION_CUFT) / SECTION_CUFT)));
  } else {
    secFills = fills.slice();
    cuft = secFills.reduce((a, b) => a + b, 0) * SECTION_CUFT;
  }
  const fraction = cuft / TRAILER_CUFT;
  // Range: priced load up to one 1/8 step higher, since loads tend to run bigger than expected.
  const low = priceForFraction(fraction);
  const high = fraction > 0 ? priceForFraction(fraction + 1 / PRICING.increments) : 0;
  const yards = cuft / 27;
  const est = {
    mode,
    fraction,
    cuft,
    yards,
    fills: secFills,
    overflow: fraction > 1,
    low,
    high,
    sizeLabel: fractionLabel(fraction),
    items: mode === 'items' ? chosen : [],
    createdAt: Date.now(),
  };
  est.summary = estimateSummary(est);
  return est;
}

export function estimateSummary(est) {
  if (!est || est.fraction <= 0) return '';
  const what = est.items.length
    ? est.items.map((i) => `${i.name} x${i.qty}`).join(', ')
    : est.fills.map((f, k) => `${SECTION_NAMES[k]} ${Math.round(f * 100)}%`).join(', ');
  return `${money(est.low)}–${money(est.high)} · ${est.sizeLabel} (~${est.yards.toFixed(1)} cu yd) · ${what}`;
}

// Hand the estimate from the /pricing page to the booking form
const KEY = 'jj_estimate';
export function saveEstimate(est) {
  try { sessionStorage.setItem(KEY, JSON.stringify(est)); } catch (e) { /* storage unavailable */ }
}
export function loadEstimate() {
  try {
    const est = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (est && Date.now() - est.createdAt < 24 * 3600 * 1000 && est.fraction > 0) return est;
  } catch (e) { /* ignore */ }
  return null;
}
export function clearEstimate() {
  try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
}
