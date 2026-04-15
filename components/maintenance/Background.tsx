import React, { useEffect, useMemo, useRef } from "react";

type BackgroundProps = {
  enhanced?: boolean;
};

export function Background({ enhanced = true }: BackgroundProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (!enhanced || reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let lastX = 0.5;
    let lastY = 0.35;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--spot-x", `${(lastX * 100).toFixed(2)}%`);
      el.style.setProperty("--spot-y", `${(lastY * 100).toFixed(2)}%`);
    };

    const onMove = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      lastX = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      lastY = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    apply();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [enhanced, reduceMotion]);

  return (
    <div ref={rootRef} className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-zinc-950" />

      <div className="absolute inset-0 opacity-100 bg-[radial-gradient(1200px_800px_at_15%_10%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(900px_700px_at_85%_25%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(700px_600px_at_70%_85%,rgba(59,130,246,0.12),transparent_60%),radial-gradient(900px_700px_at_20%_85%,rgba(236,72,153,0.10),transparent_60%)]" />

      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: enhanced && !reduceMotion ? 1 : 0 }}
      >
        <div
          className={
            reduceMotion
              ? "absolute inset-0"
              : "absolute inset-0 animate-[satin-shift_16s_ease-in-out_infinite]"
          }
          style={{
            background: [
              "radial-gradient(1200px 900px at 18% 20%, rgba(99,102,241,0.22), rgba(0,0,0,0) 60%)",
              "radial-gradient(900px 700px at 82% 28%, rgba(168,85,247,0.18), rgba(0,0,0,0) 58%)",
              "radial-gradient(900px 800px at 60% 85%, rgba(236,72,153,0.14), rgba(0,0,0,0) 60%)",
              "repeating-linear-gradient(110deg, rgba(255,255,255,0.018) 0 1px, rgba(255,255,255,0.0) 1px 10px)",
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.0) 42%, rgba(0,0,0,0.20))",
            ].join(", "),
            backgroundSize:
              "140% 140%, 150% 150%, 160% 160%, 240% 240%, 100% 100%",
            filter: "blur(20px) saturate(1.18) contrast(1.04)",
            opacity: 0.95,
            mixBlendMode: "screen",
            transform: "translate3d(0,0,0)",
            willChange: reduceMotion
              ? undefined
              : "transform, background-position, filter, opacity",
          }}
        />

        <div
          className={[
            "absolute inset-[-25%] opacity-80",
            reduceMotion ? "" : "animate-[satin-shimmer_9.5s_ease-in-out_infinite]",
          ].join(" ")}
          style={{
            background:
              "radial-gradient(720px 260px at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.0) 72%), radial-gradient(640px 220px at 70% 55%, rgba(255,255,255,0.12), rgba(255,255,255,0.0) 74%), radial-gradient(540px 200px at 55% 78%, rgba(255,255,255,0.10), rgba(255,255,255,0.0) 78%)",
            filter: "blur(24px)",
            mixBlendMode: "overlay",
            transform: "translate3d(0,0,0)",
            willChange: reduceMotion ? undefined : "transform, opacity",
          }}
        />

        <div
          className={[
            "absolute inset-[-10%]",
            reduceMotion ? "opacity-15" : "animate-[satin-bloom_7.5s_ease-in-out_infinite]",
          ].join(" ")}
          style={{
            background:
              "radial-gradient(820px 520px at 22% 28%, rgba(255,255,255,0.16), rgba(255,255,255,0.0) 68%), radial-gradient(760px 520px at 78% 36%, rgba(255,255,255,0.12), rgba(255,255,255,0.0) 70%), radial-gradient(620px 520px at 56% 82%, rgba(255,255,255,0.10), rgba(255,255,255,0.0) 72%)",
            mixBlendMode: "soft-light",
            transform: "translate3d(0,0,0)",
            willChange: reduceMotion ? undefined : "transform, opacity, filter",
          }}
        />

        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(980px 720px at var(--spot-x, 50%) var(--spot-y, 35%), rgba(255,255,255,0.10), rgba(99,102,241,0.10) 30%, rgba(168,85,247,0.07) 52%, rgba(0,0,0,0.0) 72%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:120px_120px]" />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] bg-repeat" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.72)_100%)]" />
    </div>
  );
}

