import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      first_name: leadData.firstName,
      last_name: leadData.lastName || '',
      phone: leadData.phone,
      email: leadData.email || '',
      address: leadData.address || '',
      service_type: leadData.serviceType,
      scheduled_for: leadData.scheduledFor || 'Flexible',
      message: leadData.message || '',
      status: 'new',
      source: 'website',
      hubspot_contact_id: leadData.hubspotId || null,
    }])
    .select()
    .single();

  if (error) console.error('Supabase error:', error);
  return { data, error };
}

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}
