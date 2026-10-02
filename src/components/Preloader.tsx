import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "> initializing shivansh_mishra.sys",
  "> mounting transformer weights … ok",
  "> loading curiosity.module … ok",
  "> compiling portfolio_v2 …",
];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const timers = LINES.map((_, i) =>
      window.setTimeout(() => setLineCount(i + 1), 320 * (i + 1))
    );
    const end = window.setTimeout(() => setDone(true), 320 * LINES.length + 500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-void"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(90vw,480px)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-foam/70" />
              <span className="ml-3 font-mono text-[11px] text-faint">
                shivansh@void:~
              </span>
            </div>
            <div className="rounded-lg border border-line bg-surface/80 p-5 font-mono text-[12px] leading-7 text-mist backdrop-blur">
              {LINES.slice(0, lineCount).map((l, i) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={i === LINES.length - 1 ? "text-iris" : ""}
                >
                  {l}
                </motion.p>
              ))}
              <p className="text-ink">
                <span className="text-iris">&gt;</span>{" "}
                <span className="caret-blink inline-block h-3.5 w-2 translate-y-0.5 bg-iris" />
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-faint uppercase">
              <span>SM / PORTFOLIO</span>
              <span>{Math.min(100, lineCount * 25)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
