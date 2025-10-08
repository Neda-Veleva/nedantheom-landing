import React from 'react';
import { useI18n } from '@/contexts/I18nProvider';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const router = useRouter();

  function go(next: 'bg' | 'en') {
    setLang(next);
    const segments = router.asPath.split('?')[0].split('/').filter(Boolean);
    const currentLang = segments[0] === 'bg' || segments[0] === 'en' ? segments[0] : null;
    const rest = currentLang ? segments.slice(1) : segments;
    const nextPath = ['/', next, ...rest].join('/').replace(/\/+/, '/');
    router.push(nextPath);
  }

  const isEN = lang === 'en';

  return (
    <div className="select-none flex items-center gap-2 text-beige/60 text-xs font-semibold">
      <span className={!isEN ? 'text-beige' : ''}>BG</span>
      <button
        type="button"
        onClick={() => go(isEN ? 'bg' : 'en')}
        aria-label="Toggle language"
        className="relative w-20 h-10 bg-white/10 backdrop-blur rounded-full border border-white/15 shadow-elevated transition-[background-color,border-color] duration-500 ease-in-out"
      >
        <span
          className={`absolute top-1 left-1 w-7 h-7 bg-white/10 rounded-full shadow-soft border border-white/20 transform-gpu will-change-transform transition-transform duration-500 ease-in-out ${
            isEN ? 'translate-x-[44px]' : 'translate-x-0'
          }`}
          style={{ overflow: 'hidden' }}
        >
          <img
            src={isEN ? '/flags/en.svg' : '/flags/bg.svg'}
            alt={isEN ? 'English' : 'Bulgarian'}
            className="w-full h-full object-cover"
          />
        </span>
      </button>
      <span className={isEN ? 'text-beige' : ''}>EN</span>
    </div>
  );
}


