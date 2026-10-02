import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.76, 0, 0.24, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  right,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="relative">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-iris/70 uppercase">
            {index}
          </span>
          <span className="h-px w-12 bg-iris/30" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-mist uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={1}>
          <h2 className="max-w-4xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-medium tracking-tight text-ink">
            {title}
          </h2>
        </Reveal>
        {right && (
          <Reveal delay={2} className="mb-2">
            {right}
          </Reveal>
        )}
      </div>
    </div>
  );
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0z" />
    </svg>
  );
}

export function MonoTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] tracking-wide text-mist transition-colors duration-300 hover:border-iris/40 hover:text-iris-soft">
      {children}
    </span>
  );
}
