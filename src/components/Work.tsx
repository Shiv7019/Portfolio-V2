import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, GitFork, Star } from "lucide-react";
import { PROJECTS, LINKS, type Project } from "../data";
import { SectionHeading, Reveal, Spark, MonoTag } from "./ui";
import ProjectVisual from "./ProjectVisual";
import { GitHubIcon } from "./BrandIcons";

/* ---------- live GitHub telemetry ---------- */
type Stats = { repos: number; stars: number; followers: number; ok: boolean };

function useGitHub(): Stats {
  const [s, setS] = useState<Stats>({ repos: 7, stars: 7, followers: 4, ok: false });
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch("https://api.github.com/users/Shiv7019").then((x) => x.json()),
          fetch("https://api.github.com/users/Shiv7019/repos?per_page=100").then((x) =>
            x.json()
          ),
        ]);
        if (!live || !Array.isArray(r)) return;
        const stars = r.reduce((n: number, repo: { stargazers_count?: number }) => n + (repo.stargazers_count ?? 0), 0);
        setS({ repos: u.public_repos ?? r.length, stars, followers: u.followers ?? 0, ok: true });
      } catch {
        /* keep fallbacks */
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  return s;
}

/* ---------- featured card ---------- */
function FeaturedCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i} className="h-full">
      <a
        href={`${LINKS.github}/${p.repo}`}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-iris/35 hover:shadow-[0_20px_80px_-20px_rgba(170,155,239,0.25)]"
      >
        {/* header strip */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-void/40 px-4 py-2.5">
          <span className="truncate font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
            {p.field}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.langColor }} />
            <span className="font-mono text-[10px] text-mist">{p.lang}</span>
          </span>
        </div>
        {/* visual panel */}
        <div className="relative h-[15rem] overflow-hidden border-b border-line bg-[#0d1019] sm:h-[17rem]">
          <ProjectVisual project={p} />
        </div>

        {/* body */}
        <div className="relative flex flex-1 flex-col p-6 sm:p-7">
          <span className="text-stroke-faint pointer-events-none absolute -top-7 right-5 font-display text-[90px] leading-none font-bold select-none">
            {p.index}
          </span>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-iris-soft sm:text-[1.65rem]">
              {p.title}
            </h3>
            <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-iris" />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.description}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {p.tags.map((t) => (
              <MonoTag key={t}>{t}</MonoTag>
            ))}
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ---------- compact card (with its own diagram) ---------- */
function CompactCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i} className="h-full">
      <a
        href={`${LINKS.github}/${p.repo}`}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-iris/35 hover:shadow-[0_20px_80px_-20px_rgba(170,155,239,0.25)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line bg-void/40 px-4 py-2.5">
          <span className="truncate font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
            {p.field}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.langColor }} />
            <span className="font-mono text-[10px] text-mist">{p.lang}</span>
          </span>
        </div>
        <div className="relative h-[13rem] overflow-hidden border-b border-line bg-[#0d1019] sm:h-[14rem]">
          <ProjectVisual project={p} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-iris-soft">
              {p.title}
            </h4>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-iris" />
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-mist">{p.description}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {p.tags.map((t) => (
              <MonoTag key={t}>{t}</MonoTag>
            ))}
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ---------- section ---------- */
export default function Work() {
  const gh = useGitHub();
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  const telemetry = [
    { icon: GitFork, k: "PUBLIC REPOS", v: gh.repos },
    { icon: Star, k: "STARS EARNED", v: gh.stars },
    { icon: Spark, k: "FOLLOWERS", v: gh.followers, svg: true },
    { icon: GitHubIcon, k: "STATUS", v: "SHIPPING", svg: true },
  ];

  return (
    <section id="work" className="relative mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="02"
        eyebrow="Selected Work"
        title={
          <>
            The lab notebook<span className="text-iris">,</span>{" "}
            <span className="font-serif-it tracking-normal text-iris-soft normal-case">
              open source.
            </span>
          </>
        }
        right={
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.15em] text-mist uppercase transition-colors hover:text-iris"
          >
            <GitHubIcon className="h-4 w-4" />
            all repositories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        }
      />

      {/* telemetry strip */}
      <Reveal delay={1}>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {telemetry.map((t) => (
            <div key={t.k} className="flex items-center gap-4 bg-base px-5 py-5">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-iris/20 bg-iris/10 text-iris">
                <t.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-2xl leading-none font-semibold text-ink">
                  {t.v}
                </p>
                <p className="mt-1.5 font-mono text-[9px] tracking-[0.25em] text-faint">
                  {t.k}
                  {gh.ok && t.k !== "STATUS" && (
                    <span className="ml-1.5 text-foam">● LIVE</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* featured grid */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.repo} p={p} i={i} />
        ))}
      </div>

      {/* more experiments */}
      <Reveal className="mt-20">
        <div className="mb-2 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
            More experiments from the bench
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((p, i) => (
          <CompactCard key={p.repo} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
