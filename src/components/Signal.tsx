import { ArrowUpRight, PenLine, GraduationCap } from "lucide-react";
import { LINKS } from "../data";
import { SectionHeading, Reveal } from "./ui";
import { SubstackIcon, YouTubeIcon, InstagramIcon } from "./BrandIcons";

const CARDS = [
  {
    icon: SubstackIcon,
    accent: "#f6c177",
    bg: "rgba(246,193,119,0.08)",
    border: "group-hover:border-gold/50",
    kicker: "WRITING · SUBSTACK",
    handle: "@smileoficarus",
    title: "Smile of Icarus",
    body: "Notes on what I'm learning — explained plainly. Flying close to hard ideas, documenting every burn on the way down. Want to understand transformers without the hype? That's the whole thesis.",
    cta: "Read the notes",
    href: LINKS.substack,
  },
  {
    icon: YouTubeIcon,
    accent: "#eb6f92",
    bg: "rgba(235,111,146,0.08)",
    border: "group-hover:border-rose/50",
    kicker: "TEACHING · YOUTUBE",
    handle: "@Letscodeshivansh",
    title: "Let's Code Shivansh",
    body: "Coding walkthroughs for people who actually want to build — not watch. The stuff I wish someone had recorded: from environment setup to training loops, mistakes included.",
    cta: "Watch the builds",
    href: LINKS.youtube,
  },
];

export default function Signal() {
  return (
    <section id="signal" className="relative border-t border-line bg-base/40">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="05"
          eyebrow="Signal — Learning in Public"
          title={
            <>
              Knowledge compounds
              <br />
              when it's{" "}
              <span className="font-serif-it tracking-normal text-iris-soft normal-case">
                shared.
              </span>
            </>
          }
          right={
            <p className="max-w-xs text-sm leading-relaxed text-faint">
              Half research log, half classroom. Everything learned gets
              written down or taught — because explaining is the final test of
              understanding.
            </p>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i} className="h-full">
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 p-8 transition-all duration-500 hover:-translate-y-1.5 ${c.border} sm:p-10`}
              >
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                  style={{ background: c.bg }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl border border-line"
                    style={{ background: c.bg, color: c.accent }}
                  >
                    <c.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
                </div>
                <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-faint uppercase">
                  {c.kicker}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {c.title}
                </h3>
                <p className="font-serif-it mt-1 text-lg" style={{ color: c.accent }}>
                  {c.handle}
                </p>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
                  {c.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: c.accent }}>
                  <PenLine className="h-3.5 w-3.5" />
                  {c.cta}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* behind the scenes */}
        <Reveal>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/30 px-8 py-6 transition-all duration-500 hover:border-iris/40 hover:bg-surface/60"
          >
            <div className="flex items-center gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-iris/10 text-iris">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-medium tracking-tight text-ink">
                  Behind the scenes — <span className="font-serif-it text-iris-soft">@figureitoutshiv</span>
                </p>
                <p className="mt-0.5 text-sm text-faint">
                  The unpolished middle of the process: late builds, whiteboard math, small wins.
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mist uppercase transition-colors group-hover:text-iris">
              <GraduationCap className="h-4 w-4" />
              follow the journey
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
