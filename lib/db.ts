import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'crypto';

export type ContactRecord = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

let sqlSingleton: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (sqlSingleton) return sqlSingleton;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. Configure your Neon connection string.');
  }
  sqlSingleton = neon(url);
  return sqlSingleton;
}

export async function ensureContactsTableExists() {
  const sql = getSql();
  await sql(
    `create table if not exists contacts (
      id uuid primary key,
      name text not null,
      email text not null,
      message text not null,
      created_at timestamptz not null default now()
    )`
  );
}

export async function insertContact(name: string, email: string, message: string): Promise<ContactRecord> {
  const sql = getSql();
  // Ensure table exists (safe to call; no-op after first time)
  await ensureContactsTableExists();
  const id = randomUUID();
  const rows = (await sql(
    `insert into contacts (id, name, email, message)
     values ($1::uuid, $2, $3, $4)
     returning id, name, email, message, created_at`,
    [id, name, email, message]
  )) as unknown as ContactRecord[];
  return rows[0];
}

export async function listContacts(): Promise<ContactRecord[]> {
  const sql = getSql();
  await ensureContactsTableExists();
  const rows = (await sql(
    `select id, name, email, message, created_at
     from contacts
     order by created_at desc`
  )) as unknown as ContactRecord[];
  return rows;
}


