-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run

create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  first_name text not null,
  last_name text default '',
  phone text not null,
  email text default '',
  address text default '',
  service_type text default '',
  scheduled_for text default 'Flexible',
  message text default '',
  status text default 'new'
    check (status in ('new','contacted','booked','completed','lost')),
  hubspot_contact_id text default null,
  source text default 'website'
);

alter table leads enable row level security;

create policy "Public can insert leads"
  on leads for insert with check (true);

create policy "Auth users can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);
