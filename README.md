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
```

## Deploying to Vercel
- Deploy directly to Vercel.
- Note: Vercel’s serverless file system is read-only/ephemeral. The API route will still send email; writing to `data/contacts.json` is best-effort and may fail (logged). For durable storage, use a DB or Vercel KV.

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
- `pages/api/contact.ts` – API route to write JSON and send email
- `data/contacts.json` – local JSON storage (dev)
- `styles/globals.css` – Tailwind setup

## Styling
Tailwind mobile-first with custom colors: beige, brown, mint.

## Notes
Path alias `@/` is configured in `tsconfig.json`.
