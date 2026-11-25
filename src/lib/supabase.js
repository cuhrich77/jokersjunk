import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfrwtxznrtohdlblhfbc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcnd0eHpucnRvaGRsYmxoZmJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzY2MTAsImV4cCI6MjA5MjIxMjYxMH0.wfPK2tIrS4o1R17VFNEnRrfEAcX_pdd81xgpO8aDpZc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Columns added by supabase-migrations/2026-11-25_estimate_invoice_fields.sql
function estimateColumns(est) {
  if (!est) return {};
  return {
    estimate_low:      est.low ?? null,
    estimate_high:     est.high ?? null,
    estimate_fraction: typeof est.fraction === 'number' ? Number(est.fraction.toFixed(4)) : null,
    estimate_yards:    typeof est.yards === 'number' ? Number(est.yards.toFixed(2)) : null,
    load_size:         est.sizeLabel || null,
    estimate_mode:     est.mode || null,
    estimate_items:    Array.isArray(est.items) ? est.items : [],
    estimate_summary:  est.summary || null,
  };
}

export async function saveLead(leadData) {
  const base = {
    first_name: leadData.firstName,
    last_name: leadData.lastName || '',
    phone: leadData.phone,
    email: leadData.email || '',
    address: leadData.address || '',
    service_type: leadData.serviceType,
    scheduled_for: leadData.scheduledFor || 'Flexible',
    status: 'new',
    source: 'website',
  };

  const full = {
    ...base,
    message: leadData.message || '',
    zip: leadData.zip || '',
    customer_type: leadData.customerType || '',
    photo_urls: leadData.photoUrls || [],
    ...estimateColumns(leadData.estimate),
  };

  // No .select() after insert: anon users can't read leads back (RLS).
  let { error } = await supabase.from('leads').insert([full]);

  // If the migration hasn't been run yet, the new columns don't exist.
  // Fall back to the old shape so bookings never break; the estimate and photos
  // still ride along in the message text.
  if (error && (error.code === 'PGRST204' || error.code === '42703')) {
    console.warn('leads: new columns missing, run the 2026-11-25 migration. Saving legacy row.');
    ({ error } = await supabase.from('leads').insert([{ ...base, message: leadData.legacyMessage || leadData.message || '' }]));
  }

  if (error) console.error('Supabase error:', error);
  return { error };
}

// Admin only (RLS): update a lead after the job, e.g.
//   updateLead(id, { status: 'completed', final_price: 325 })
//   updateLead(id, { status: 'invoiced', invoice_id: 'INV-1042', invoice_url: 'https://...', invoice_sent_at: new Date().toISOString() })
//   updateLead(id, { status: 'paid', payment_method: 'card' })
export async function updateLead(id, fields) {
  const { error } = await supabase.from('leads').update(fields).eq('id', id);
  if (error) console.error('Supabase update error:', error);
  return { error };
}

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}
