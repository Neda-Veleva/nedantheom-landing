import React from "react";
import { motion } from "motion/react";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        aria-hidden
        className="absolute -top-24 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rotate-[-12deg] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 50%, rgba(56,189,248,0.0), rgba(99,102,241,0.22), rgba(168,85,247,0.18), rgba(236,72,153,0.16), rgba(56,189,248,0.20), rgba(56,189,248,0.0))",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0.95), rgba(0,0,0,0.0) 72%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0.95), rgba(0,0,0,0.0) 72%)",
          willChange: "transform",
        }}
        animate={{
          rotate: [-14, -8, -14],
          x: ["-52%", "-48%", "-52%"],
          y: [-10, 18, -10],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute -bottom-36 left-1/2 h-[560px] w-[1200px] -translate-x-1/2 rotate-[18deg] opacity-55 blur-[64px]"
        style={{
          background:
            "conic-gradient(from 20deg at 50% 50%, rgba(34,197,94,0.0), rgba(59,130,246,0.18), rgba(16,185,129,0.16), rgba(99,102,241,0.16), rgba(34,197,94,0.12), rgba(34,197,94,0.0))",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0.9), rgba(0,0,0,0.0) 70%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0.9), rgba(0,0,0,0.0) 70%)",
          willChange: "transform",
        }}
        animate={{
          rotate: [16, 22, 16],
          x: ["-50%", "-54%", "-50%"],
          y: [10, -14, 10],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.55) 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 35% 65%, rgba(255,255,255,0.45) 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,0.50) 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 62% 88%, rgba(255,255,255,0.40) 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 92% 72%, rgba(255,255,255,0.42) 0, rgba(255,255,255,0) 60%)",
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: [0.12, 0.24, 0.14],
          x: [0, 14, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

