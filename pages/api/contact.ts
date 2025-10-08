import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type ApiResponse = { ok: true } | { ok: false; error: string };

function getContactsJsonPath(): string {
  return path.join(process.cwd(), 'data', 'contacts.json');
}

function ensureDataFile(): void {
  const filePath = getContactsJsonPath();
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
  }
}

function clearContacts(): void {
  ensureDataFile();
  const filePath = getContactsJsonPath();
  fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
}

async function appendToContacts(payload: ContactPayload & { timestamp: string }) {
  ensureDataFile();
  const filePath = getContactsJsonPath();
  const raw = fs.readFileSync(filePath, 'utf-8');
  const list = JSON.parse(raw) as Array<any>;
  list.push(payload);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
}

async function sendEmail(payload: ContactPayload) {
  const { EMAIL_ENABLED, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;

  // Hard switch to disable emails entirely unless explicitly enabled
  if (EMAIL_ENABLED !== 'true') {
    console.info('EMAIL_ENABLED is not true - skipping email send.');
    return;
  }

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.warn('SMTP configuration missing - skipping email send.');
    return; // No-op in dev if not configured
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO,
    subject: `New contact form message from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method === 'DELETE') {
    try {
      clearContacts();
      return res.status(200).json({ ok: true });
    } catch (err: any) {
      console.error('Contact API delete error:', err);
      return res.status(500).json({ ok: false, error: err?.message || 'Internal Server Error' });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, DELETE');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body as Partial<ContactPayload>;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  try {
    const record = { name, email, message, timestamp: new Date().toISOString() };
    try {
      await appendToContacts(record);
    } catch (writeErr) {
      console.warn('contacts.json write failed (continuing):', writeErr);
      // continue to email even if file write fails (e.g., Vercel read-only FS)
    }
    await sendEmail({ name, email, message });
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return res.status(500).json({ ok: false, error: err?.message || 'Internal Server Error' });
  }
}


