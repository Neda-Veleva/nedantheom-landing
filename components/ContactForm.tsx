import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import { useI18n } from '@/contexts/I18nProvider';
import AnimatedText from './AnimatedText';

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useI18n();
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

      setAlert({ type: 'success', message: t('sentOk') });
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setAlert({ type: 'error', message: err?.message || t('sentErr') });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled = isSubmitting || !form.name || !form.email || !form.message;

  return (
    <div className="container-narrow">
      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl shadow-elevated p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-beige">
            <AnimatedText text={t('name')} font="500 14px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-white/10 bg-navy-800/60 text-beige placeholder:text-beige/40 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-steel-400/60"
            placeholder={t('placeholderName')}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-beige">
            <AnimatedText text={t('email')} font="500 14px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-white/10 bg-navy-800/60 text-beige placeholder:text-beige/40 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-steel-400/60"
            placeholder={t('placeholderEmail')}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-beige">
            <AnimatedText text={t('message')} font="500 14px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-white/10 bg-navy-800/60 text-beige placeholder:text-beige/40 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-steel-400/60"
            placeholder={t('placeholderMessage')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex items-center justify-center rounded-md bg-steel-500 text-beige px-4 py-2 font-medium shadow hover:bg-steel-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('sending') : t('send')}
        </button>

        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}
      </form>
    </div>
  );
}


