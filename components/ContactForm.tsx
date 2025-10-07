import React, { useEffect, useState } from 'react';
import Alert from './Alert';

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 6000);
    return () => clearTimeout(t);
  }, [alert]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Submission failed');

      setAlert({ type: 'success', message: 'Съобщението е изпратено успешно. Благодарим!' });
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setAlert({ type: 'error', message: err?.message || 'Възникна грешка при изпращане.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled = isSubmitting || !form.name || !form.email || !form.message;

  return (
    <div className="container-narrow">
      <form onSubmit={handleSubmit} className="bg-beige-100 border border-brown/10 rounded-xl shadow-soft p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brown">Име</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-brown/20 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint"
            placeholder="Вашето име"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brown">Имейл</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-brown/20 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-brown">Съобщение</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-brown/20 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint"
            placeholder="Как можем да помогнем?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex items-center justify-center rounded-md bg-brown text-beige px-4 py-2 font-medium shadow hover:bg-brown-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Изпращане…' : 'Изпрати'}
        </button>

        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}
      </form>
    </div>
  );
}


