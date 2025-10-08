import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'bg' | 'en';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  bg: {
    title: '',
    subtitle: '',
    contactUs: 'Свържете се с нас',
    signLine1: 'Сайтът ни е в процес на разработка',
    signLine2: 'Но това не ни пречи да работим усилено за нашите клиенти.',
    pitch: 'Ние създаваме дигитални решения, които помагат на брандовете да изграждат силно онлайн присъствие – от уеб сайтове и дигитален дизайн до ефективни маркетинг стратегии.',
    name: 'Име',
    email: 'Имейл',
    message: 'Съобщение',
    placeholderName: 'Вашето име',
    placeholderEmail: 'you@example.com',
    placeholderMessage: 'Как можем да помогнем?',
    send: 'Изпрати',
    sending: 'Изпращане…',
    sentOk: 'Благодарим за вашето съобщение. Изпратено е успешно. Ще се свържем с вас възможно най-скоро.',
    sentErr: 'Възникна грешка при изпращане.'
  },
  en: {
    title: '',
    subtitle: '',
    contactUs: 'Contact us',
    signLine1: 'Our site is under construction',
    signLine2: "But that doesn’t stop us from giving our best for our clients.",
    pitch: 'We craft digital solutions that help brands build a strong online presence – from websites and digital design to effective marketing strategies.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    placeholderName: 'Your name',
    placeholderEmail: 'you@example.com',
    placeholderMessage: 'How can we help?',
    send: 'Send',
    sending: 'Sending…',
    sentOk: 'Thank you for your message. It has been sent successfully. We will get in touch with you as soon as possible.',
    sentErr: 'An error occurred while sending.'
  }
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bg');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null;
    if (saved === 'bg' || saved === 'en') {
      setLangState(saved);
    } else if (typeof window !== 'undefined') {
      const nav = window.navigator?.language?.toLowerCase().startsWith('bg') ? 'bg' : 'en';
      setLangState(nav as Lang);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => TRANSLATIONS[lang][key] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


