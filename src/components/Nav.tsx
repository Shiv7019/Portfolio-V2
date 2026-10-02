import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LINKS } from "../data";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Focus", href: "#focus" },
  { label: "Arsenal", href: "#stack" },
  { label: "Signal", href: "#signal" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.2 }}
        className={`fixed inset-x-0 top-0 z-[110] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-void/75 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center rounded-md border border-iris/40 bg-surface transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif-it text-lg leading-none text-iris select-none">S</span>
              <span className="pulse-dot absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-void bg-iris" />
            </div>
            <div className="hidden sm:block">
              <p className="font-mono text-[11px] leading-tight tracking-[0.18em] text-ink uppercase">
                Shivansh Mishra
              </p>
              <p className="font-mono text-[10px] leading-tight tracking-[0.18em] text-faint">
                AI / ML · AUTONOMOUS RESEARCH
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                className="group flex items-baseline gap-1.5 font-mono text-[12px] tracking-[0.14em] text-mist uppercase transition-colors hover:text-ink"
              >
                <span className="text-[9px] text-iris/60">0{i + 1}</span>
                <span className="underline-grow">{n.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={LINKS.email}
              className="group hidden items-center gap-2 rounded-full border border-iris/30 bg-iris/10 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-iris-soft uppercase transition-all duration-300 hover:bg-iris hover:text-void md:inline-flex"
            >
              Let's talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-mist transition-colors hover:text-ink lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center bg-void/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="group flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="font-mono text-xs text-iris/60">0{i + 1}</span>
                <span className="font-display text-4xl font-medium tracking-tight text-ink group-active:text-iris">
                  {n.label}
                </span>
              </motion.a>
            ))}
            <a
              href={LINKS.email}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-iris px-6 py-3 font-mono text-xs tracking-[0.15em] text-void uppercase"
            >
              Let's talk <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
