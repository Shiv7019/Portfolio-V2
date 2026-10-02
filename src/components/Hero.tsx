import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./BrandIcons";
import { LINKS, ROLES } from "../data";
import { EASE } from "./ui";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const current = words[word];

      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 55);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 26);
      }
    };

    timer = window.setTimeout(tick, 2400);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

function Word({
  word,
  delay,
  className = "",
}: {
  word: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.06em] align-top">
      {word.split("").map((character, index) => (
        <motion.span
          key={index}
          className={className}
          initial={{ y: "115%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: delay + index * 0.045 }}
        >
          {character}
        </motion.span>
      ))}
    </span>
  );
}

const TERMINAL_BLOCKS = [
  {
    command: "whoami",
    output: (
      <p className="text-mist">
        shivansh_mishra <span className="text-faint">-</span> ai/ml engineer{" "}
        <span className="text-faint">-</span> csmu '29
      </p>
    ),
  },
  {
    command: "cat mission.txt",
    output: (
      <p className="max-w-[42ch] leading-relaxed text-mist">
        "Help people - through research, teaching, and building things that
        matter."
      </p>
    ),
  },
  {
    command: "ls currently-learning/",
    output: (
      <p className="flex flex-wrap gap-x-2 text-mist">
        <span>ann/</span>
        <span className="font-semibold text-iris">cnn/</span>
        <span>rnn/</span>
        <span className="font-semibold text-iris">transformers/</span>
        <span>reinforcement-learning/</span>
      </p>
    ),
  },
];

function ResearchTerminal() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 14 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 2.75, duration: 1, ease: EASE }}
      className="relative w-full max-w-[540px] justify-self-end"
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleLeave}
        style={{ perspective: 1200 }}
        className="relative"
      >
        {/* ambient glow that reacts to hover */}
        <motion.div
          animate={{ scale: isHovered ? 1.06 : 1, opacity: isHovered ? 0.3 : 0.14 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-iris via-purple-600 to-rose blur-2xl"
        />

        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
      <div className="group relative overflow-hidden rounded-2xl border border-line bg-base shadow-[0_28px_90px_rgba(0,0,0,0.4)] transition-colors duration-500 hover:border-iris/40">
        {/* viewfinder reticles */}
        <div className="pointer-events-none absolute top-3 left-3 z-20 h-4 w-4 border-t-2 border-l-2 border-iris/70 transition-transform duration-300 group-hover:scale-125" />
        <div className="pointer-events-none absolute top-3 right-3 z-20 h-4 w-4 border-t-2 border-r-2 border-iris/70 transition-transform duration-300 group-hover:scale-125" />
        <div className="pointer-events-none absolute bottom-3 left-3 z-20 h-4 w-4 border-b-2 border-l-2 border-iris/70 transition-transform duration-300 group-hover:scale-125" />
        <div className="pointer-events-none absolute right-3 bottom-3 z-20 h-4 w-4 border-r-2 border-b-2 border-iris/70 transition-transform duration-300 group-hover:scale-125" />


        <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-rose" />
          <span className="h-3 w-3 rounded-full bg-gold" />
          <span className="h-3 w-3 rounded-full bg-foam" />
          <span className="ml-3 truncate font-mono text-[10px] tracking-[0.22em] text-faint sm:text-[11px]">
            shivansh@lab: ~/research
          </span>
          <span className="ml-auto hidden items-center gap-1.5 sm:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-iris" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-faint uppercase">
              active
            </span>
          </span>
        </div>

        <div className="space-y-5 px-5 py-6 font-mono text-[11px] sm:px-7 sm:py-7 sm:text-[12px]">
          {TERMINAL_BLOCKS.map((block, index) => (
            <motion.div
              key={block.command}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.05 + index * 0.22, duration: 0.55 }}
              className="space-y-2"
            >
              <p className="font-semibold text-ink">
                <span className="mr-2 text-iris">$</span>
                {block.command}
              </p>
              <div>{block.output}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.75, duration: 0.55 }}
            className="space-y-2"
          >
            <p className="font-semibold text-ink">
              <span className="mr-2 text-iris">$</span>
              echo $PROGRESS
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-mist">
              <span>foundations</span>
              <span className="flex h-3 w-24 overflow-hidden border border-iris/40 bg-iris/10 sm:w-28">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 4, duration: 1.6, ease: EASE }}
                  className="relative block h-full bg-iris"
                >
                  <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_6px,var(--color-void)_6px,var(--color-void)_7px)] opacity-20" />
                </motion.span>
              </span>
              <span>compounding daily</span>
              <span className="caret-blink inline-block h-3 w-[6px] bg-iris" />
            </div>
          </motion.div>
        </div>
      </div>

        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-between px-2 font-mono text-[8px] tracking-[0.22em] text-faint uppercase">
        <span>research shell / v1.0</span>
        <span>curiosity: persistent</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,transparent,rgba(7,8,13,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute top-24 left-6 hidden font-mono text-[10px] tracking-[0.3em] text-faint uppercase md:left-10 lg:block"
      >
        26.8467° N - IND
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1 }}
        className="absolute top-24 right-6 hidden font-mono text-[10px] tracking-[0.3em] text-faint uppercase md:right-10 lg:block"
      >
        EST. M-M-XXIX
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 pt-32 pb-24 md:px-10 lg:pt-28">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(400px,0.88fr)] xl:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.05, duration: 0.8, ease: EASE }}
              className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur"
            >
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-foam" />
              <span className="font-mono text-[10px] tracking-wider text-mist sm:text-[11px]">
                <span className="text-foam">~/shivansh</span>{" "}
                <span className="text-faint">$</span> whoami -{" "}
                <span className="text-iris-soft">{typed}</span>
                <span className="caret-blink ml-0.5 inline-block h-3 w-[6px] translate-y-[1px] bg-iris" />
              </span>
            </motion.div>

            <h1 className="font-display leading-[0.86] font-semibold tracking-[-0.04em] uppercase select-none">
              <span className="block text-[clamp(3.6rem,7.8vw,8rem)]">
                <Word word="SHIVANSH" delay={2.15} className="text-iris" />
              </span>
              <span className="mt-[0.08em] flex items-center gap-[0.2em] text-[clamp(3.6rem,7.8vw,8rem)]">
                <Word word="MISHRA" delay={2.5} className="text-stroke" />
                <motion.span
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 3.05, duration: 0.8, ease: EASE }}
                  className="spin-slow inline-block text-iris"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[0.34em] w-[0.34em]">
                    <path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0z" />
                  </svg>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.9, ease: EASE }}
              className="mt-9 max-w-xl"
            >
              <p className="font-serif-it text-xl leading-snug text-mist sm:text-[1.45rem]">
                Teaching machines to learn -{" "}
                <span className="text-iris-soft">deep learning</span>,{" "}
                <span className="text-rose">transformers</span> &amp;{" "}
                <span className="text-foam">reinforcement learning</span> - on the
                long road to autonomous research.
              </p>
              <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-faint sm:text-[11px]">
                INTEGRATED B.TECH-M.TECH · CS&amp;E · CSMU - CLASS OF 2029
                <br />
                LEARNING IN PUBLIC. BUILDING TO HELP PEOPLE.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-iris px-6 py-3 font-mono text-[11px] font-medium tracking-[0.12em] text-void uppercase transition-colors duration-300 hover:bg-iris-soft"
                >
                  Enter the lab
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-6 py-3 font-mono text-[11px] tracking-[0.12em] text-mist uppercase backdrop-blur transition-all duration-300 hover:border-iris/50 hover:text-ink"
                >
                  <GitHubIcon className="h-4 w-4" />
                  github.com/Shiv7019
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </div>

          <ResearchTerminal />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.1, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.4em] text-faint uppercase">descend</span>
          <div className="h-8 w-px overflow-hidden bg-line">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-iris"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}