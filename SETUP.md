# 🗑️ Junk B Gone — Full Setup Guide

## Tech Stack
- **Frontend**: React 18
- **Database**: Supabase (Postgres)
- **CRM**: HubSpot
- **Hosting**: Vercel (free)

---

## STEP 1 — Install Node.js

Download from: https://nodejs.org (choose LTS version)

Verify install:
```bash
node --version   # should show v18+
npm --version    # should show 9+
```

---

## STEP 2 — Set Up Supabase (Free Database)

1. Go to **https://supabase.com** → Sign up free
2. Click **"New Project"**
   - Name: `junkbgone`
   - Database Password: (save this somewhere safe)
   - Region: US East (N. Virginia)
3. Wait ~2 minutes for project to spin up
4. Go to **SQL Editor** → **New Query**
5. Copy the contents of `supabase-schema.sql` → Paste → **Run**
6. Go to **Settings → API** and copy:
   - `Project URL` → this is your `REACT_APP_SUPABASE_URL`
   - `anon public` key → this is your `REACT_APP_SUPABASE_ANON_KEY`

---

## STEP 3 — Set Up HubSpot (Free CRM)

1. Go to **https://hubspot.com** → Sign up free
2. Once inside, go to:
   **Settings (⚙️) → Integrations → Private Apps**
3. Click **"Create a private app"**
   - Name: `Junk B Gone Website`
   - Under **Scopes**, enable:
     - `crm.objects.contacts.write`
     - `crm.objects.contacts.read`
     - `crm.objects.deals.write`
     - `crm.objects.notes.write`
4. Click **Create App** → copy the **Access Token**
   - This is your `REACT_APP_HUBSPOT_ACCESS_TOKEN`

### Create Custom HubSpot Property (optional but recommended)
1. Settings → Properties → Contact Properties → Create Property
   - Label: `Service Type`
   - Internal name: `service_type`
   - Type: Single-line text

---

## STEP 4 — Configure Your Environment

1. In the project folder, copy the example env file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your keys:
```
REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...your-key-here
REACT_APP_HUBSPOT_ACCESS_TOKEN=pat-na1-...your-token-here
REACT_APP_BUSINESS_PHONE=(786) 555-0199
REACT_APP_BUSINESS_EMAIL=hello@junkbgone.com
```

> ⚠️ NEVER commit `.env.local` to git. It's already in `.gitignore`.

---

## STEP 5 — Run Locally

```bash
# Install dependencies (do this once)
npm install

# Start development server
npm start
```

Your site will open at **http://localhost:3000** 🚀

---

## STEP 6 — Deploy to Vercel (Free Hosting)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/junkbgone.git
git push -u origin main
```

2. Go to **https://vercel.com** → Sign up with GitHub
3. Click **"New Project"** → Import your `junkbgone` repo
4. Under **Environment Variables**, add all 5 variables from your `.env.local`
5. Click **Deploy**

Your site will be live at `https://junkbgone.vercel.app` in ~2 minutes! 🎉

---

## STEP 7 — Connect Your Custom Domain

1. Buy a domain (e.g., GoDaddy, Namecheap) — `junkbgone.com`
2. In Vercel → Your Project → **Domains** → Add domain
3. Follow Vercel's DNS instructions to point your domain

---

## How Leads Flow

```
Customer submits form
        ↓
React (QuoteForm.jsx)
        ↓
   ┌────┴────┐
   ↓         ↓
Supabase   HubSpot
Database    CRM
   ↓         ↓
Stored     Contact
as lead    + Deal
           created
             ↓
        You get
        notified
        in HubSpot
```

---

## Viewing Your Leads

### In HubSpot:
- Go to **CRM → Contacts** to see all leads
- Go to **CRM → Deals** to see the sales pipeline
- Set up email notifications: **Settings → Notifications**

### In Supabase:
- Go to **Table Editor → leads** to see raw data
- Use filters to sort by status, date, service type

---

## Updating Lead Status

In Supabase Table Editor, you can manually update the `status` field:
- `new` → Fresh lead, not yet contacted
- `contacted` → You've reached out
- `booked` → Job is scheduled
- `completed` → Job done, paid
- `lost` → Didn't convert

---

## Project File Structure

```
junkbgone/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with logo
│   │   ├── Navbar.css
│   │   ├── QuoteForm.jsx       # ★ Core form (Supabase + HubSpot)
│   │   ├── QuoteForm.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   ├── Home.css
│   │   ├── Services.jsx        # Services page
│   │   ├── Services.css
│   │   ├── About.jsx           # About page
│   │   ├── About.css
│   │   ├── Contact.jsx         # Contact page
│   │   └── Contact.css
│   ├── lib/
│   │   ├── supabase.js         # ★ Database connection + helpers
│   │   └── hubspot.js          # ★ CRM integration
│   ├── styles/
│   │   └── global.css          # Global styles + CSS variables
│   ├── App.jsx                 # Router + layout
│   └── index.js                # React entry point
├── supabase-schema.sql         # ★ Run this in Supabase SQL Editor
├── .env.example                # Environment variable template
├── .gitignore
└── package.json
```

---

## Common Issues

**"Missing Supabase env variables"**
→ Make sure `.env.local` exists and has correct values. Restart dev server after changes.

**HubSpot contacts not appearing**
→ Check your access token has the correct scopes. Check browser console for errors.

**Form submits but no data in Supabase**
→ Check your RLS policies in Supabase. The "Public can insert leads" policy must be active.

**White screen on load**
→ Run `npm install` first. Check terminal for errors.

---

## Need Help?

- Supabase Docs: https://supabase.com/docs
- HubSpot Docs: https://developers.hubspot.com
- React Docs: https://react.dev
- Vercel Docs: https://vercel.com/docs
