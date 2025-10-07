import React from 'react';

type SignBoardProps = {
  className?: string;
};

export default function SignBoard({ className = '' }: SignBoardProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Nail */}
      <div className="w-2 h-2 bg-brown rounded-full shadow-soft" />

      {/* Strings */}
      <div className="relative w-48 h-10">
        <div className="absolute left-1/2 top-0 h-10 w-px bg-brown/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[1px] border-l-brown/60 border-r-[1px] border-r-brown/60 border-t-[40px] border-t-transparent" />
      </div>

      {/* Board */}
      <div className="origin-top-center animate-swing-slow">
        <div className="bg-mint text-brown rounded-lg shadow-soft border border-brown/20 px-6 py-4 w-[320px] sm:w-[380px]">
          <p className="text-center font-semibold">Сайтът ни е в процес на разработка</p>
          <p className="mt-2 text-center text-brown/80">
            Но това не ни пречи да работим усилено за нашите клиенти.
          </p>
        </div>
      </div>
    </div>
  );
}


