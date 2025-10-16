import type { NextApiRequest, NextApiResponse } from 'next';
import { listContacts } from '@/lib/db';

type ApiResponse = { ok: true; data: any } | { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ ok: false, error: 'Not Found' });
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const token = req.headers['x-admin-token'] || req.query.token;
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  try {
    const contacts = await listContacts();
    return res.status(200).json({ ok: true, data: contacts });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message || 'Internal Server Error' });
  }
}


