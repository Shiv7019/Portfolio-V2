import { Cpu } from "lucide-react";
import { STACK } from "../data";
import { SectionHeading, Reveal } from "./ui";

const DEPTH = ["language", "pytorch", "scikit-learn", "python", "git", "jupyter"];

function Depth({ name }: { name: string }) {
  const deep = DEPTH.includes(name.toLowerCase());
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className={`h-1 w-1 rounded-full ${
            d <= (deep ? 2 : 1) ? "bg-iris" : "bg-line"
          }`}
        />
      ))}
    </span>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="04"
          eyebrow="The Arsenal"
          title={
            <>
              Tools are rented.
              <br />
              <span className="font-serif-it tracking-normal text-iris-soft normal-case">
                Understanding is owned.
              </span>
            </>
          }
          right={
            <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  {[0, 1].map((d) => (
                    <span key={d} className="h-1 w-1 rounded-full bg-iris" />
                  ))}
                </span>
                practiced
              </span>
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1 w-1 rounded-full bg-iris" />
                  ))}
                </span>
                shipped with
              </span>
            </div>
          }
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {STACK.map((group, gi) => (
            <Reveal key={group.group} delay={gi} className="h-full">
              <div className="group/panel flex h-full flex-col bg-base p-7 transition-colors duration-500 hover:bg-surface/60">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-iris/25 bg-iris/10 text-iris transition-transform duration-500 group-hover/panel:rotate-6">
                    <Cpu className="h-4.5 w-4.5" />
                  </span>
                  <span className="font-mono text-[10px] text-faint">
                    0{gi + 1} / 0{STACK.length}
                  </span>
                </div>
                <h3 className="mt-6 font-mono text-[11px] tracking-[0.28em] text-mist uppercase">
                  {group.group}
                </h3>
                <ul className="mt-6 flex-1 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="group/item flex cursor-default items-center justify-between gap-3 rounded-md px-3 py-2.5 transition-colors duration-300 hover:bg-iris/8">
                        <span className="font-display text-lg font-medium tracking-tight text-mist transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-ink">
                          {item}
                        </span>
                        <Depth name={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl font-serif-it text-xl leading-relaxed text-faint">
            "Every repo above is written line-by-line, broken, debugged, and
            understood —{" "}
            <span className="text-mist">no framework magic left unexplained.</span>"
          </p>
        </Reveal>
      </div>
    </section>
  );
}
