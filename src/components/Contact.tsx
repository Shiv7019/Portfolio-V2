import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { LINKS } from "../data";
import { Reveal, Spark } from "./ui";
import {
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
  YouTubeIcon,
  InstagramIcon,
  MailIcon,
} from "./BrandIcons";

const SOCIALS = [
  { icon: GitHubIcon, label: "GitHub", handle: "@Shiv7019", href: LINKS.github, note: "the code" },
  { icon: LinkedInIcon, label: "LinkedIn", handle: "in/shivansh-mishra…", href: LINKS.linkedin, note: "the résumé" },
  { icon: SubstackIcon, label: "Substack", handle: "@smileoficarus", href: LINKS.substack, note: "the notes" },
  { icon: YouTubeIcon, label: "YouTube", handle: "@Letscodeshivansh", href: LINKS.youtube, note: "the lessons" },
  { icon: InstagramIcon, label: "Instagram", handle: "@figureitoutshiv", href: LINKS.instagram, note: "the process" },
  { icon: MailIcon, label: "Email", handle: "shivansh7019.m@gmail.com", href: LINKS.email, note: "the direct line" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shivansh7019.m@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      {/* backdrop glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_110%,rgba(170,155,239,0.12),transparent)]" />
      <div className="hero-grid absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1500px] px-6 pt-28 pb-10 md:px-10 md:pt-36">
        {/* heading */}
        <div className="text-center">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.35em] text-mist uppercase">
              <Spark className="h-3.5 w-3.5 text-iris" />
              06 — Transmission open
              <Spark className="h-3.5 w-3.5 text-iris" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.95] font-semibold tracking-tight text-ink">
              HAVE AN IDEA
              <br />
              <span className="font-serif-it font-normal text-iris-soft normal-case">
                worth training on?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-mist sm:text-base">
              Research questions, student collaborations, or just a good
              argument about attention mechanisms — my inbox is a friendly
              loss function. It only goes{" "}
              <span className="font-serif-it text-iris-soft">down</span>.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={LINKS.email}
                className="group inline-flex items-center gap-3 rounded-full bg-iris px-8 py-4 font-mono text-[12px] font-medium tracking-[0.12em] text-void uppercase transition-all duration-300 hover:bg-iris-soft hover:shadow-[0_0_50px_rgba(170,155,239,0.45)]"
              >
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                Start a conversation
              </a>
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-8 py-4 font-mono text-[12px] tracking-[0.12em] text-mist uppercase backdrop-blur transition-all duration-300 hover:border-iris/50 hover:text-ink"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-foam" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "copied to clipboard" : "shivansh7019.m@gmail.com"}
              </button>
            </div>
          </Reveal>
        </div>

        {/* social grid */}
        <Reveal className="mt-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col bg-base p-6 transition-colors duration-500 hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-mist transition-colors duration-300 group-hover:text-iris" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-iris" />
                </div>
                <p className="mt-8 font-mono text-[9px] tracking-[0.25em] text-faint uppercase">
                  {s.note}
                </p>
                <p className="mt-1.5 font-display text-lg font-medium tracking-tight text-ink">
                  {s.label}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-faint">
                  {s.handle}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* terminal footer */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface/50 px-5 py-3.5 font-mono text-[11px] text-faint backdrop-blur">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose/70" />
              <span className="h-2 w-2 rounded-full bg-gold/70" />
              <span className="h-2 w-2 rounded-full bg-foam/70" />
            </span>
            <span className="text-mist">shivansh@void:~$</span>
            <span>session.save() — gradients persisted, curiosity intact</span>
            <span className="caret-blink ml-auto hidden h-3 w-[6px] bg-iris sm:block" />
          </div>
        </Reveal>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 pb-2 sm:flex-row">
          <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            © 2026 Shivansh Mishra · Machina ex discordia
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            Designed &amp; built from first principles
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mist uppercase transition-colors hover:text-iris"
          >
            resurface
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      {/* giant ghost name */}
      <div className="pointer-events-none relative select-none">
        <Reveal once>
          <p className="text-stroke-faint mask-fade-b mt-4 mb-[-2vw] text-center font-display text-[13.5vw] leading-none font-bold tracking-tight whitespace-nowrap uppercase">
            Shivansh
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
