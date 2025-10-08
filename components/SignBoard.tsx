import React from 'react';
import { useI18n } from '@/contexts/I18nProvider';
import AnimatedText from './AnimatedText';

type SignBoardProps = {
  className?: string;
};

export default function SignBoard({ className = '' }: SignBoardProps) {
  const { t } = useI18n();
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Nail */}
      <div className="w-3 h-3 bg-beige rounded-full shadow-soft" />

      {/* Strings */}
      <div className="relative w-48 h-14">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2" width="300" height="80">
          <line x1="150" y1="0" x2="60" y2="70" stroke="#a3a3a3" stroke-width="2"></line>
          <line x1="150" y1="0" x2="240" y2="70" stroke="#a3a3a3" stroke-width="2"></line>
        </svg>
      </div>

      {/* Board */}
      <div className="origin-top-center animate-swing-slow">
        <div className="bg-steel-500/60 backdrop-blur text-beige rounded-lg shadow-elevated border border-white/10 px-6 py-5 w-[340px] sm:w-[420px]">
          <p className="text-center font-semibold">
            <AnimatedText text={t('signLine1')} font="600 16px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </p>
          <p className="mt-2 text-center text-beige/80">
            <AnimatedText text={t('signLine2')} font="400 14px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </p>
        </div>
      </div>
    </div>
  );
}


