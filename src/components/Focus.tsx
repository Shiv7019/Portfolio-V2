import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Telescope, Flag } from "lucide-react";
import { FOCUS, ROADMAP } from "../data";
import { SectionHeading, Reveal, EASE } from "./ui";

function FocusRow({
  f,
  open,
  onToggle,
  i,
}: {
  f: (typeof FOCUS)[number];
  open: boolean;
  onToggle: () => void;
  i: number;
}) {
  return (
    <Reveal delay={i}>
      <div
        data-cursor
        onClick={onToggle}
        className={`group cursor-pointer border-b border-line transition-colors duration-500 ${
          open ? "bg-surface/40" : "hover:bg-surface/30"
        }`}
      >
        <div className="flex items-center gap-5 px-4 py-6 sm:gap-8 sm:px-8">
          <span
            className={`w-16 shrink-0 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 sm:text-xs ${
              open ? "text-iris" : "text-faint group-hover:text-mist"
            }`}
          >
            {f.key}
          </span>
          <h3
            className={`flex-1 font-display text-xl font-medium tracking-tight transition-all duration-300 sm:text-2xl ${
              open ? "text-ink" : "text-mist group-hover:translate-x-1.5 group-hover:text-ink"
            }`}
          >
            {f.title}
          </h3>
          <span className="hidden font-serif-it text-lg text-faint italic lg:block">
            {f.note}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              open
                ? "border-iris bg-iris text-void"
                : "border-line text-mist group-hover:border-iris/50"
            }`}
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-7 pl-[6.5rem] sm:px-8 sm:pl-[7.5rem]">
                <p className="max-w-2xl text-[15px] leading-relaxed text-mist">{f.body}</p>
                <p className="mt-3 font-serif-it text-base text-faint italic lg:hidden">
                  — {f.note}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Focus() {
  const [open, setOpen] = useState(4);

  return (
    <section id="focus" className="relative border-t border-line bg-base/40">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="03"
          eyebrow="Research Direction"
          title={
            <>
              Fundamentals first.
              <br />
              <span className="font-serif-it tracking-normal text-iris-soft normal-case">
                Then the frontier.
              </span>
            </>
          }
          right={
            <p className="max-w-xs text-sm leading-relaxed text-faint">
              Classical machine learning → deep architectures → agents that
              reason. Every layer rebuilt from scratch, because borrowed
              intuition always bills you later.
            </p>
          }
        />

        {/* accordion */}
        <div className="mt-16 overflow-hidden rounded-xl border-t border-line">
          {FOCUS.map((f, i) => (
            <FocusRow
              key={f.key}
              f={f}
              i={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        {/* roadmap */}
        <div className="mt-28 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <Telescope className="h-5 w-5 text-iris" />
                <span className="font-mono text-[11px] tracking-[0.3em] text-mist uppercase">
                  The road to 2029
                </span>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h3 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-tight text-ink sm:text-5xl">
                A five-year plan,
                <br />
                executed{" "}
                <span className="font-serif-it text-iris-soft">in the open.</span>
              </h3>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
                Integrated B.Tech–M.Tech in Computer Science &amp; Engineering at
                CSMU. Not a countdown — a compounding curve. Every year is
                scoped work, shipped publicly, so the receipts speak for
                themselves.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2">
                <Flag className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-mist uppercase">
                  Destination — autonomous research agents
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-iris/60 via-line to-transparent md:left-[9px]" />
            {ROADMAP.map((r, i) => (
              <Reveal key={r.year} delay={i}>
                <div className="group relative flex gap-6 pb-10 pl-10 md:gap-8">
                  <span
                    className={`absolute top-1.5 left-0 grid h-[15px] w-[15px] place-items-center rounded-full border md:h-[19px] md:w-[19px] ${
                      i === 0 || i === ROADMAP.length - 1
                        ? "border-iris bg-iris/20"
                        : "border-faint bg-void"
                    }`}
                  >
                    <span
                      className={`h-[5px] w-[5px] rounded-full ${
                        i === 0 ? "pulse-dot bg-foam" : i === ROADMAP.length - 1 ? "bg-gold" : "bg-faint"
                      }`}
                    />
                  </span>
                  <div className="w-16 shrink-0 pt-0.5 font-mono text-xs tracking-wider text-iris/80 sm:w-20">
                    {r.year}
                  </div>
                  <div className="transition-transform duration-500 group-hover:translate-x-1.5">
                    <h4 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                      {r.title}
                    </h4>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist sm:text-[15px]">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
