import React, { useEffect, useMemo, useState } from 'react';

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADMIN_ENABLE_IN_PROD !== 'true') {
    if (typeof window !== 'undefined') {
      // Redirect away if someone navigates directly in production
      window.location.replace('/');
    }
    return null;
  }
  const [token, setToken] = useState('');
  const [data, setData] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contacts`, {
        headers: { 'x-admin-token': token },
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'Request failed');
      setData(j.data as Contact[]);
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token') || '';
    if (t) setToken(t);
  }, []);

  function saveToken(v: string) {
    setToken(v);
    sessionStorage.setItem('admin_token', v);
  }

  const csv = useMemo(() => {
    if (!data) return '';
    const header = ['id', 'name', 'email', 'message', 'created_at'];
    const rows = data.map((r) => header.map((h) => JSON.stringify((r as any)[h] ?? '')).join(','));
    return [header.join(','), ...rows].join('\n');
  }, [data]);

  function downloadCsv() {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Admin: Contacts</h1>

      <div className="flex items-center gap-2">
        <input
          type="password"
          value={token}
          onChange={(e) => saveToken(e.target.value)}
          placeholder="ADMIN_TOKEN"
          className="border rounded px-3 py-2 w-80"
        />
        <button onClick={load} className="rounded bg-black text-white px-3 py-2 disabled:opacity-50" disabled={!token || loading}>
          {loading ? 'Loading…' : 'Load'}
        </button>
        <button onClick={downloadCsv} className="rounded bg-gray-200 px-3 py-2" disabled={!data || !data.length}>
          Export CSV
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-1 text-left">Created</th>
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Email</th>
              <th className="border px-2 py-1 text-left">Message</th>
              <th className="border px-2 py-1 text-left">ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((c) => (
              <tr key={c.id}>
                <td className="border px-2 py-1 whitespace-nowrap">{new Date(c.created_at).toLocaleString()}</td>
                <td className="border px-2 py-1">{c.name}</td>
                <td className="border px-2 py-1">{c.email}</td>
                <td className="border px-2 py-1 max-w-xl break-words">{c.message}</td>
                <td className="border px-2 py-1 text-[11px] text-gray-500">{c.id}</td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td className="border px-2 py-3 text-center" colSpan={5}>
                  {loading ? 'Loading…' : 'No data'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


