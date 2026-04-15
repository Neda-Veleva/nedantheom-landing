import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Background } from "./Background";
import { SwingingSign } from "./SwingingSign";

const ContactForm = lazy(() =>
  import("./ContactForm").then((m) => ({ default: m.ContactForm })),
);

const FloatingElements = lazy(() =>
  import("./FloatingElements").then((m) => ({ default: m.FloatingElements })),
);

export function MaintenanceApp() {
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const [showEnhancements, setShowEnhancements] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShowEnhancements(true), {
        timeout: 1500,
      });
      return () => w.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(() => setShowEnhancements(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="size-full min-h-[100dvh] relative text-foreground overscroll-none flex flex-col">
      <Background enhanced={showEnhancements && !reduceMotion} />

      <div className="fixed inset-0 -z-10">
        {!reduceMotion && showEnhancements ? (
          <Suspense fallback={null}>
            <FloatingElements />
          </Suspense>
        ) : null}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 gap-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SwingingSign />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-2xl text-center text-white/70 text-base md:text-lg leading-relaxed -mt-8"
        >
          Ние създаваме дигитални решения, които помагат на брандовете да изграждат
          силно онлайн присъствие – от уеб сайтове и дигитален дизайн до ефективни
          маркетинг стратегии.
        </motion.p>

        {showEnhancements ? (
          <Suspense fallback={<div className="w-full max-w-md mx-auto h-[420px]" />}>
            <ContactForm />
          </Suspense>
        ) : (
          <div className="w-full max-w-md mx-auto h-[420px]" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 text-white/40 text-sm text-center font-light pb-8"
      >
        &copy; {new Date().getFullYear()} Nedantheom. Всички права запазени
      </motion.div>
    </div>
  );
}

