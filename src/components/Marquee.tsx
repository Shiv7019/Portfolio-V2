import { Spark } from "./ui";

const ITEMS = [
  "DEEP LEARNING",
  "TRANSFORMERS",
  "REINFORCEMENT LEARNING",
  "RETRIEVAL-AUGMENTED GEN",
  "NEURAL NETWORKS",
  "PYTORCH",
  "LEARNING IN PUBLIC",
  "FROM FIRST PRINCIPLES",
];

export default function Marquee({ flip = false }: { flip?: boolean }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {ITEMS.map((it, i) => (
        <span key={it} className="flex items-center">
          <span
            className={`px-6 font-display text-3xl font-medium tracking-tight whitespace-nowrap uppercase sm:text-4xl ${
              i % 3 === 1 ? "font-serif-it normal-case italic" : ""
            } ${i % 2 === 0 ? "text-ink" : "text-stroke-faint"}`}
          >
            {it}
          </span>
          <Spark className="h-4 w-4 shrink-0 text-iris/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-base/60 py-6 backdrop-blur">
      <div
        className={`flex w-max ${flip ? "animate-marquee-fast [animation-direction:reverse]" : "animate-marquee"}`}
      >
        {row("a")}
        {row("b")}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
