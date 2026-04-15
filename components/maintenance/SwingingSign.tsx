import React, { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

export function SwingingSign() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      {
        rotateZ: [20, -20, 16, -16, 12, -12, 8, -8, 4, -4, 2, -2, 0],
      },
      { duration: 5, ease: "easeOut" },
    ).then(() => {
      animate(
        scope.current,
        { rotateZ: [0, 1.5, 0, -1.5, 0] },
        { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
      );
    });
  }, [animate, scope]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative z-20 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 shadow-lg border-2 border-gray-700 relative">
          <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-white/40" />
        </div>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-gray-600 to-gray-700 shadow-md" />
      </div>

      <motion.div
        ref={scope}
        className="relative"
        style={{ transformOrigin: "top center" }}
      >
        <svg
          className="absolute -top-2 left-0 w-full h-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <line
            x1="50%"
            y1="0"
            x2="15%"
            y2="100%"
            stroke="rgb(146 64 14)"
            strokeWidth="1.5"
            className="drop-shadow-sm"
          />
        </svg>

        <svg
          className="absolute -top-2 left-0 w-full h-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <line
            x1="50%"
            y1="0"
            x2="85%"
            y2="100%"
            stroke="rgb(146 64 14)"
            strokeWidth="1.5"
            className="drop-shadow-sm"
          />
        </svg>

        <div className="relative bg-white/10 backdrop-blur-xl px-12 py-10 rounded-3xl shadow-2xl border border-white/20 mt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />

          <div className="relative z-10 max-w-lg">
            <h2 className="text-white font-bold text-3xl md:text-4xl text-center mb-4 leading-tight tracking-tight">
              Сайтът ни е в процес на разработка
            </h2>
            <p className="text-white/80 text-xl md:text-2xl text-center font-normal">
              Но това не ни пречи да работим усилено за нашите клиенти
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

