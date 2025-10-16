# Nedantheom – Landing Page

Minimal one-page site built with Next.js (Pages Router), React, Tailwind CSS, and a contact form.

## Tech
- Next.js 14 + React 18 (TypeScript)
- Tailwind CSS 3
- API route for contact form (Node.js, Nodemailer)

## Features
- Centered hero with a swinging sign board component
- Contact form (name, email, message) with client-side validation and alerts
- API writes to `data/contacts.json` (best-effort) and sends email via SMTP

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Environment
Create `.env.local` (or `.env`) with:
```dotenv
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
MAIL_FROM="Nedantheom <no-reply@example.com>"
MAIL_TO=owner@example.com
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/db?sslmode=require"
```

## Deploying to Vercel
- Deploy directly to Vercel.
- Set `DATABASE_URL` in Project Settings → Environment Variables to your Neon connection string.
- Note: Vercel’s serverless file system is read-only/ephemeral. Durable storage is handled by Neon Postgres.

### One-time migration (create table)
Option A (automatic on first write): The API lazily creates `contacts` table.

Option B (explicit): Call the protected migration route once after setting `MIGRATE_TOKEN`:
```bash
curl -X POST https://<your-domain>/api/migrate -H "x-migrate-token: $MIGRATE_TOKEN"
```

## Admin (view/export contacts)
- Page: `/admin` (client UI). Enter `ADMIN_TOKEN` to fetch data.
- API: `GET /api/admin/contacts` with `x-admin-token: ADMIN_TOKEN` header.
- Env:
  - `ADMIN_TOKEN` – secret for admin access.

## Scripts
- `dev` – start dev server
- `build` – build for production
- `start` – start production server
- `lint` – run ESLint
- `type-check` – run TypeScript

## Structure
- `pages/index.tsx` – landing page
- `components/SignBoard.tsx` – swinging sign board
- `components/ContactForm.tsx` – contact form with alerts
- `pages/api/contact.ts` – API route to store in Neon Postgres and send email
- `data/contacts.json` – local JSON storage (dev only; not used in prod)
- `styles/globals.css` – Tailwind setup

## Styling
Tailwind mobile-first with custom colors: beige, brown, mint.

## Notes
Path alias `@/` is configured in `tsconfig.json`.
