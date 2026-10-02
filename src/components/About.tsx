import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  BrainCircuit,
  Compass,
  HeartHandshake,
  Radio,
  Mic,
  Sparkles,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { Reveal, MonoTag } from "./ui";

const SENTENCE =
  "I study intelligence by building it — from perceptrons to transformers to agents that learn from consequence — and I share everything along the way.";
const HIGHLIGHT = ["transformers", "agents", "consequence", "share"];

function WordReveal() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = SENTENCE.split(" ");
  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.22] font-medium tracking-tight text-ink"
    >
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[^a-z-]/gi, "").toLowerCase();
        const hot = HIGHLIGHT.includes(clean);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} hot={hot}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  hot,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  hot: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = hot ? "text-iris-soft" : "text-ink";
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${hot ? "font-serif-it text-iris-soft font-normal" : color}`}
    >
      {children}
    </motion.span>
  );
}

function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt effect
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      {/* Background ambient glow that reacts to hover */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          opacity: isHovered ? 0.35 : 0.18,
        }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-iris via-purple-600 to-rose blur-2xl"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl backdrop-blur-md"
      >
        {/* Top HUD bar */}
        <div className="flex items-center justify-between border-b border-line bg-void/70 px-4 py-2.5 font-mono text-[10px] text-faint">
          <div className="flex items-center gap-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-rose" />
            <span className="tracking-[0.2em] text-mist uppercase">SPEAKER_HUD // LIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-iris font-semibold">85mm · f/1.8</span>
            <span className="text-[9px] text-faint">REC [●]</span>
          </div>
        </div>

        {/* Image Container with Viewfinder Accents */}
        <div className="relative aspect-[4/4.7] overflow-hidden bg-void">
          <img
            src="/images/shivansh-portrait.jpg"
            alt="Shivansh Mishra speaking on stage at tech conference"
            className="h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle gradient vignette to blend with dark theme */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/20 via-transparent to-void/20" />

          {/* Futuristic Viewfinder Reticles (Corners) */}
          <div className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-iris/70 transition-all duration-300 group-hover:scale-110" />
          <div className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-iris/70 transition-all duration-300 group-hover:scale-110" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-iris/70 transition-all duration-300 group-hover:scale-110" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-iris/70 transition-all duration-300 group-hover:scale-110" />

          {/* Holographic Scanline sweep animation */}
          <motion.div
            animate={{
              y: ["-100%", "300%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-iris/15 to-transparent"
          />

          {/* Floating speaker audio indicator badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-line bg-void/80 px-3 py-1.5 backdrop-blur-md">
            <Mic className="h-3.5 w-3.5 text-iris" />
            <div className="flex items-center gap-0.5">
              {[4, 9, 14, 8, 12, 6, 11, 5].map((h, idx) => (
                <motion.span
                  key={idx}
                  animate={{ height: [4, h, 3] }}
                  transition={{
                    duration: 0.8 + (idx % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  }}
                  className="w-[2px] rounded-full bg-iris"
                  style={{ height: h }}
                />
              ))}
            </div>
            <span className="font-mono text-[9px] tracking-widest text-mist uppercase">TALKS</span>
          </div>

          {/* Floating name tag pill over image */}
          <div className="absolute right-4 bottom-4 left-4">
            <div className="rounded-xl border border-line/80 bg-surface/90 p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-iris/40">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg font-medium tracking-tight text-ink">
                    Shivansh Mishra
                  </h4>
                  <p className="font-mono text-[10px] tracking-wider text-iris">
                    AI / ML ENGINEER · CSMU '29
                  </p>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full border border-iris/30 bg-iris/10 text-iris">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 font-mono text-[9px] text-faint">
                <span className="flex items-center gap-1 text-mist">
                  <MapPin className="h-2.5 w-2.5 text-rose" /> India
                </span>
                <span className="flex items-center gap-1 text-mist">
                  <GraduationCap className="h-2.5 w-2.5 text-foam" /> Integrated B.Tech–M.Tech
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta stats */}
        <div className="grid grid-cols-3 border-t border-line bg-void/60 text-center font-mono text-[10px]">
          <div className="border-r border-line py-2.5">
            <p className="text-iris font-semibold">2024–29</p>
            <p className="text-[8px] text-faint uppercase">TIMELINE</p>
          </div>
          <div className="border-r border-line py-2.5">
            <p className="text-foam font-semibold">PUBLIC</p>
            <p className="text-[8px] text-faint uppercase">RESEARCH</p>
          </div>
          <div className="py-2.5">
            <p className="text-gold font-semibold">AUTONOMOUS</p>
            <p className="text-[8px] text-faint uppercase">AGENTS</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const PILLS = [
  {
    icon: BrainCircuit,
    title: "The focus",
    body: "ANN · CNN · RNN · Transformers · RL — studied ground-up, then applied.",
  },
  {
    icon: Compass,
    title: "The direction",
    body: "Autonomous research agents — systems that read, reason and discover.",
  },
  {
    icon: Radio,
    title: "The method",
    body: "Learn in public: write it, teach it, ship it. Receipts over adjectives.",
  },
  {
    icon: HeartHandshake,
    title: "The mission",
    body: "Help people — through research, teaching, and things that matter.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-iris/70 uppercase">01</span>
          <span className="h-px w-12 bg-iris/30" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-mist uppercase">
            The Human Behind The Models
          </span>
        </div>
      </Reveal>

      {/* Main 2-column layout: Animated Portrait on left, Statement & Story on right */}
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(380px,0.8fr)_minmax(0,1.2fr)] xl:gap-16">
        <div className="lg:col-start-2 lg:row-start-1">
          <WordReveal />

          <Reveal delay={1}>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-mist">
              <p>
                I'm an AI developer and researcher currently pursuing an{" "}
                <span className="text-ink font-medium">Integrated B.Tech–M.Tech in CS&E at CSMU</span> (Class of 2029).
                I believe intelligent systems are best mastered by writing every architecture from scratch before touching higher-level abstractions.
              </p>
              <p>
                Beyond research repos, I share what I learn openly — documenting deep learning notes on{" "}
                <span className="text-iris font-mono text-xs">Smile of Icarus (Substack)</span>, walkthroughs on{" "}
                <span className="text-rose font-mono text-xs">YouTube</span>, and speaking about the trajectory toward autonomous research agents.
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <MonoTag>Deep Learning Architectures</MonoTag>
              <MonoTag>PyTorch & CUDA</MonoTag>
              <MonoTag>Autonomous Agents</MonoTag>
              <MonoTag>Public Teaching</MonoTag>
            </div>
          </Reveal>
        </div>

        {/* Left column: Interactive Animated Portrait Card */}
        <Reveal delay={1} className="w-full lg:col-start-1 lg:row-start-1">
          <PortraitCard />
        </Reveal>
      </div>

      {/* Bottom 4 Focus Pillars */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {PILLS.map((p, i) => (
          <Reveal key={p.title} delay={i} className="h-full">
            <div className="group h-full bg-base p-7 transition-colors duration-500 hover:bg-surface/60">
              <p.icon className="h-5 w-5 text-iris transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              <h3 className="mt-5 font-mono text-[11px] tracking-[0.28em] text-mist uppercase">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-faint transition-colors duration-500 group-hover:text-mist">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
