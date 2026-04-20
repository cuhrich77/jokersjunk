-- ═══════════════════════════════════════════════════════════
-- JUNK B GONE — Supabase Database Schema
-- Run this entire file in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ═══════════════════════════════════════════════════════════

-- ── LEADS TABLE ──────────────────────────────────────────────
create table if not exists leads (
  id                uuid        default gen_random_uuid() primary key,
  created_at        timestamptz default now() not null,
  first_name        text        not null,
  last_name         text        default '',
  phone             text        not null,
  email             text        default '',
  address           text        default '',
  service_type      text        default '',
  scheduled_for     text        default 'Flexible',
  message           text        default '',
  status            text        default 'new'
                                check (status in ('new','contacted','booked','completed','lost')),
  hubspot_contact_id text       default null,
  source            text        default 'website'
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
alter table leads enable row level security;

-- Anyone (website visitors) can INSERT a new lead
create policy "Public can insert leads"
  on leads for insert
  with check (true);

-- Only authenticated users (your admin) can SELECT leads
create policy "Auth users can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE lead status
create policy "Auth users can update leads"
  on leads for update
  using (auth.role() = 'authenticated');

-- ── INDEXES ──────────────────────────────────────────────────
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx     on leads (status);
create index if not exists leads_phone_idx      on leads (phone);

-- ── VERIFY ───────────────────────────────────────────────────
select 'Schema created successfully! ✅' as result;
