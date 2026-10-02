import type { ReactNode } from "react";
import type { Project } from "../data";

/* ------------------------------------------------------------------ */
/*  Project-specific diagrams.                                         */
/*  Every graphic below depicts what that repository actually does.    */
/* ------------------------------------------------------------------ */

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const IRIS = "#aa9bef";
const IRIS_SOFT = "#c9bef8";
const ROSE = "#eb6f92";
const FOAM = "#9ccfd8";
const GOLD = "#f6c177";
const MIST = "#a8a4c6";
const FAINT = "#6d698c";
const VOID = "#07080d";
const LINE = "rgba(170,155,239,0.18)";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      {children}
    </svg>
  );
}

function T({
  x,
  y,
  children,
  size = 8,
  fill = FAINT,
  anchor = "start",
  weight = 400,
  spacing = 0.08,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  spacing?: number;
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
      fontFamily={MONO}
      letterSpacing={`${spacing}em`}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = FAINT,
  opacity = 1,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  opacity?: number;
  dash?: string;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 4.5;
  const p1 = [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)];
  const p2 = [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)];
  return (
    <g opacity={opacity}>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 2 * Math.cos(a)}
        y2={y2 - 2 * Math.sin(a)}
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray={dash}
      />
      <path d={`M${x2},${y2} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]} Z`} fill={color} />
    </g>
  );
}

function Flow({ dur = "1s", to = -18 }: { dur?: string; to?: number }) {
  return (
    <animate
      attributeName="stroke-dashoffset"
      values={`0;${to}`}
      dur={dur}
      repeatCount="indefinite"
    />
  );
}

/* ================================================================== */
/* 1 · DIALOGUE SUMMARIZER — dialogue → T5 encoder/decoder → beam search → summary */
/* ================================================================== */
function Summarizer() {
  const bubbles = [
    { x: 12, y: 40, w: 84, c: IRIS, l: [60, 40] },
    { x: 40, y: 70, w: 84, c: FOAM, l: [64, 30] },
    { x: 12, y: 100, w: 72, c: IRIS, l: [50, 36] },
    { x: 40, y: 130, w: 84, c: FOAM, l: [62, 44] },
    { x: 12, y: 160, w: 76, c: IRIS, l: [54, 26] },
  ];
  const lx = [244, 290, 336, 382];
  const ys = [74, 110, 146];
  const e1 = [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]];
  const e2 = [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]];
  const bestEdge = (a: number, b: number, level: 1 | 2) =>
    level === 1 ? a === 0 && b === 1 : a === 1 && b === 0;

  return (
    <Svg>
      {/* dialogue */}
      {bubbles.map((b, i) => (
        <g key={i} opacity="0.3">
          <animate
            attributeName="opacity"
            values="0.3;1;1;0.3"
            keyTimes="0;0.15;0.8;1"
            dur="6s"
            begin={`${i * 0.35}s`}
            repeatCount="indefinite"
          />
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height="22"
            rx="9"
            fill={b.c}
            fillOpacity="0.14"
            stroke={b.c}
            strokeOpacity="0.5"
          />
          <rect x={b.x + 8} y={b.y + 6} width={b.l[0]} height="3" rx="1.5" fill={b.c} fillOpacity="0.7" />
          <rect x={b.x + 8} y={b.y + 13} width={b.l[1]} height="3" rx="1.5" fill={b.c} fillOpacity="0.45" />
        </g>
      ))}
      <Arrow x1={128} y1={110} x2={143} y2={110} color={IRIS} opacity={0.7} />

      {/* T5 encoder / decoder */}
      <T x={182} y={46} anchor="middle" size={11} weight={600} fill={IRIS_SOFT}>
        T5
      </T>
      {[
        { x: 144, c: IRIS, label: "ENC", off: 0 },
        { x: 192, c: ROSE, label: "DEC", off: 1.1 },
      ].map((blk) => (
        <g key={blk.label}>
          <rect
            x={blk.x}
            y={56}
            width="28"
            height="108"
            rx="7"
            fill={blk.c}
            fillOpacity="0.05"
            stroke={blk.c}
            strokeOpacity="0.45"
          />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={blk.x + 4}
              y={64 + i * 24}
              width="20"
              height="16"
              rx="3"
              fill={blk.c}
              fillOpacity="0.2"
              stroke={blk.c}
              strokeOpacity="0.6"
            >
              <animate
                attributeName="fill-opacity"
                values="0.1;0.7;0.1"
                dur="3s"
                begin={`${blk.off + (3 - i) * 0.22}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          <T x={blk.x + 14} y={178} anchor="middle" size={7.5}>
            {blk.label}
          </T>
        </g>
      ))}
      {[74, 104, 134].map((y, i) => (
        <line key={y} x1={172} y1={y} x2={192} y2={y + (i - 1) * 4} stroke={IRIS} strokeOpacity="0.5" strokeDasharray="2 3">
          <Flow dur="1.2s" to={-10} />
        </line>
      ))}
      <T x={182} y={190} anchor="middle" size={7}>
        x-attention
      </T>
      <Arrow x1={222} y1={110} x2={238} y2={110} color={ROSE} opacity={0.8} />

      {/* beam search tree */}
      <T x={313} y={46} anchor="middle" size={8} fill={MIST}>
        beam search
      </T>
      {ys.map((y, i) => (
        <line
          key={`r${i}`}
          x1={lx[0]}
          y1={110}
          x2={lx[1]}
          y2={y}
          stroke={i === 0 ? IRIS_SOFT : IRIS}
          strokeOpacity={i === 0 ? 0.95 : 0.22}
          strokeWidth={i === 0 ? 1.8 : 1}
        />
      ))}
      {e1.map(([a, b], i) => {
        const best = bestEdge(a, b, 1);
        return (
          <line
            key={`a${i}`}
            x1={lx[1]}
            y1={ys[a]}
            x2={lx[2]}
            y2={ys[b]}
            stroke={best ? IRIS_SOFT : IRIS}
            strokeOpacity={best ? 0.95 : 0.22}
            strokeWidth={best ? 1.8 : 1}
          />
        );
      })}
      {e2.map(([a, b], i) => {
        const best = bestEdge(a, b, 2);
        return (
          <line
            key={`b${i}`}
            x1={lx[2]}
            y1={ys[a]}
            x2={lx[3]}
            y2={ys[b]}
            stroke={best ? IRIS_SOFT : IRIS}
            strokeOpacity={best ? 0.95 : 0.22}
            strokeWidth={best ? 1.8 : 1}
          />
        );
      })}
      {/* animated signal along best path */}
      <path
        d={`M${lx[0]},110 L${lx[1]},${ys[0]} L${lx[2]},${ys[1]} L${lx[3]},${ys[0]}`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.85"
        strokeWidth="1.4"
        strokeDasharray="3 12"
      >
        <Flow dur="1.1s" to={-15} />
      </path>
      <circle cx={lx[0]} cy={110} r="4.5" fill={ROSE} />
      {[1, 2, 3].map((lv) =>
        ys.map((y, i) => {
          const best = (lv === 1 && i === 0) || (lv === 2 && i === 1) || (lv === 3 && i === 0);
          return (
            <circle
              key={`${lv}-${i}`}
              cx={lx[lv]}
              cy={y}
              r={best ? 5.5 : 4}
              fill={best ? IRIS : VOID}
              stroke={IRIS}
              strokeOpacity={best ? 1 : 0.5}
            />
          );
        })
      )}
      <circle cx={lx[3]} cy={ys[0]} r="5.5" fill="none" stroke={IRIS_SOFT}>
        <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <path
        d={`M${lx[3] + 5},${ys[0] + 2} C398,112 398,150 386,171`}
        fill="none"
        stroke={IRIS_SOFT}
        strokeOpacity="0.6"
        strokeDasharray="3 3"
      >
        <Flow dur="1.2s" to={-12} />
      </path>

      {/* summary card */}
      <rect x="244" y="172" width="148" height="38" rx="8" fill={FOAM} fillOpacity="0.08" stroke={FOAM} strokeOpacity="0.45" />
      <T x={252} y={184} size={7} fill={FOAM} spacing={0.2}>
        SUMMARY
      </T>
      <rect x="252" y="190" height="3" rx="1.5" fill={FOAM} fillOpacity="0.8">
        <animate attributeName="width" values="0;124;124;0" keyTimes="0;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="252" y="198" height="3" rx="1.5" fill={FOAM} fillOpacity="0.55">
        <animate attributeName="width" values="0;0;84;84;0" keyTimes="0;0.2;0.6;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>

      {/* captions */}
      <T x={68} y={226} anchor="middle" spacing={0.15}>DIALOGUE</T>
      <T x={182} y={226} anchor="middle" spacing={0.15}>FINE-TUNED T5</T>
      <T x={318} y={226} anchor="middle" spacing={0.15}>BEAMS → SUMMARY</T>
    </Svg>
  );
}

/* ================================================================== */
/* 2 · FLAPPY BIRD DQN — the real game + the Q-network that plays it   */
/* ================================================================== */
function Flappy() {
  const GAP = 64;
  const pipes = [
    { x: 25, g: 150 },
    { x: 150, g: 100 },
    { x: 275, g: 150 },
    { x: 400, g: 100 },
    { x: 525, g: 150 },
  ];
  const inY = [66, 98, 130, 162];
  const outY = [98, 130];

  return (
    <Svg>
      <defs>
        <clipPath id="flappyClip">
          <rect x="12" y="20" width="234" height="188" rx="8" />
        </clipPath>
      </defs>

      {/* game scene */}
      <rect x="12" y="20" width="234" height="188" rx="8" fill={FOAM} fillOpacity="0.04" stroke={LINE} />
      <g clipPath="url(#flappyClip)">
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-250 0" dur="5s" repeatCount="indefinite" />
          {pipes.map((p, i) => {
            const top = p.g - GAP / 2;
            const bot = p.g + GAP / 2;
            return (
              <g key={i} fill={FOAM} fillOpacity="0.2" stroke={FOAM} strokeOpacity="0.65">
                <rect x={p.x} y={20} width="30" height={top - 20 - 10} />
                <rect x={p.x - 3} y={top - 10} width="36" height="10" rx="2" />
                <rect x={p.x} y={bot + 10} width="30" height={Math.max(0, 196 - bot - 10)} />
                <rect x={p.x - 3} y={bot} width="36" height="10" rx="2" />
              </g>
            );
          })}
        </g>

        {/* ground */}
        <rect x="12" y="196" width="234" height="12" fill={GOLD} fillOpacity="0.12" />
        <line x1="12" y1="196" x2="246" y2="196" stroke={GOLD} strokeOpacity="0.55" />
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-20 0" dur="0.4s" repeatCount="indefinite" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={12 + i * 20} y1="208" x2={22 + i * 20} y2="196" stroke={GOLD} strokeOpacity="0.3" />
          ))}
        </g>

        {/* bird: flies through the gaps */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 150;0 150;0 100;0 100;0 150;0 150"
            keyTimes="0;0.04;0.3;0.54;0.8;1"
            dur="5s"
            repeatCount="indefinite"
          />
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 -3;0 3;0 -3" dur="0.5s" repeatCount="indefinite" />
            <circle cx="60" cy="0" r="8.5" fill={GOLD} />
            <ellipse cx="57" cy="2" rx="4.5" ry="3" fill={VOID} fillOpacity="0.25" />
            <circle cx="63.5" cy="-2.5" r="2.4" fill="#fff" />
            <circle cx="64.3" cy="-2.5" r="1.1" fill={VOID} />
            <polygon points="67,0 75,2 67,4.5" fill={ROSE} />
          </g>
        </g>
      </g>

      {/* observation → network */}
      <Arrow x1={248} y1={114} x2={266} y2={114} color={IRIS} opacity={0.75} />

      {/* Q-network */}
      <rect x="256" y="20" width="140" height="188" rx="8" fill={IRIS} fillOpacity="0.03" stroke={LINE} />
      <T x={326} y={38} anchor="middle" size={8.5} fill={MIST} spacing={0.15}>
        Q-NETWORK
      </T>
      {inY.map((a) =>
        inY.map((b) => (
          <line key={`${a}-${b}`} x1={274} y1={a} x2={318} y2={b} stroke={IRIS} strokeOpacity="0.14" />
        ))
      )}
      {inY.map((a) =>
        outY.map((b) => (
          <line key={`o${a}-${b}`} x1={318} y1={a} x2={362} y2={b} stroke={IRIS} strokeOpacity="0.14" />
        ))
      )}
      {/* chosen action path */}
      <path d="M274,98 L318,130 L362,98" fill="none" stroke={ROSE} strokeOpacity="0.9" strokeWidth="1.4" strokeDasharray="3 5">
        <Flow dur="0.9s" to={-16} />
      </path>
      {inY.map((y) => (
        <circle key={`i${y}`} cx={274} cy={y} r="5" fill={VOID} stroke={IRIS} strokeOpacity="0.7" />
      ))}
      {inY.map((y) => (
        <circle key={`h${y}`} cx={318} cy={y} r="5" fill={VOID} stroke={IRIS} strokeOpacity="0.7" />
      ))}
      <circle cx={362} cy={98} r="6" fill={ROSE}>
        <animate attributeName="fill-opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx={362} cy={130} r="6" fill={VOID} stroke={MIST} strokeOpacity="0.6" />
      <T x={371} y={101} size={8} fill={ROSE} weight={600}>flap</T>
      <T x={371} y={133} size={8} fill={MIST}>noop</T>
      <T x={274} y={188} anchor="middle" size={7.5}>state</T>
      <T x={318} y={188} anchor="middle" size={7.5}>hidden</T>
      <T x={362} y={188} anchor="middle" size={7.5}>Q(s,a)</T>
      <T x={326} y={202} anchor="middle" size={7.5} fill={ROSE}>argmax → action</T>

      <T x={129} y={226} anchor="middle" spacing={0.15}>FLAPPY BIRD ENV</T>
      <T x={326} y={226} anchor="middle" spacing={0.15}>DQN AGENT</T>
    </Svg>
  );
}

/* ================================================================== */
/* 3 · RESEARCH PAPER RAG — chunk → embed → retrieve → generate        */
/* ================================================================== */
function Rag() {
  const chunks = [
    { y: 60, c: IRIS },
    { y: 90, c: FOAM },
    { y: 120, c: GOLD },
  ];
  const clusters: { c: string; pts: [number, number][] }[] = [
    { c: IRIS, pts: [[140, 64], [154, 78], [164, 62], [148, 90], [170, 80]] },
    { c: FOAM, pts: [[222, 62], [238, 76], [248, 60], [226, 88], [246, 88]] },
    { c: GOLD, pts: [[176, 134], [192, 148], [208, 136], [200, 152], [182, 150]] },
  ];
  const q: [number, number] = [196, 106];
  const top: { p: [number, number]; c: string }[] = [
    { p: [208, 136], c: GOLD },
    { p: [176, 134], c: GOLD },
    { p: [226, 88], c: FOAM },
  ];
  const isTop = (x: number, y: number) => top.some((t) => t.p[0] === x && t.p[1] === y);

  return (
    <Svg>
      {/* PDF page */}
      <T x={54} y={32} anchor="middle" size={7.5} fill={MIST}>paper.pdf</T>
      <rect x="12" y="38" width="84" height="130" rx="4" fill="#ffffff" fillOpacity="0.035" stroke={MIST} strokeOpacity="0.45" />
      <polygon points="84,38 96,50 84,50" fill={MIST} fillOpacity="0.25" />
      <rect x="22" y="46" width="48" height="4" rx="2" fill={MIST} fillOpacity="0.65" />
      {chunks.map((ch, j) => (
        <g key={j}>
          <rect x="17" y={ch.y} width="74" height="26" rx="3" fill={ch.c} fillOpacity="0.12" stroke={ch.c} strokeOpacity="0.5">
            <animate attributeName="fill-opacity" values="0.08;0.32;0.08" dur="3.6s" begin={`${j * 0.8}s`} repeatCount="indefinite" />
          </rect>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="22" y={ch.y + 5 + i * 7} width={i === 2 ? 40 : 64} height="2.5" rx="1.2" fill={MIST} fillOpacity="0.55" />
          ))}
          <Arrow x1={93} y1={ch.y + 13} x2={116} y2={ch.y + 13} color={ch.c} opacity={0.85} />
        </g>
      ))}

      {/* vector store */}
      <T x={190} y={32} anchor="middle" size={8.5} fill={MIST} spacing={0.12}>ChromaDB · embeddings</T>
      <rect x="118" y="38" width="144" height="130" rx="8" fill={IRIS} fillOpacity="0.03" stroke={LINE} />
      {top.map((t, i) => (
        <line key={i} x1={q[0]} y1={q[1]} x2={t.p[0]} y2={t.p[1]} stroke={ROSE} strokeOpacity="0.85" strokeDasharray="3 3">
          <Flow dur="1s" to={-12} />
        </line>
      ))}
      <circle cx={q[0]} cy={q[1]} r="36" fill="none" stroke={ROSE} strokeOpacity="0.35" strokeDasharray="3 4" />
      <circle cx={q[0]} cy={q[1]} r="6" fill="none" stroke={ROSE}>
        <animate attributeName="r" values="6;36" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {clusters.map((cl) =>
        cl.pts.map(([x, y], i) => {
          const hot = isTop(x, y);
          return (
            <circle
              key={`${cl.c}${i}`}
              cx={x}
              cy={y}
              r={hot ? 4.5 : 3}
              fill={cl.c}
              fillOpacity={hot ? 1 : 0.5}
              stroke={hot ? "#fff" : "none"}
              strokeOpacity="0.7"
            />
          );
        })
      )}
      <polygon points={`${q[0]},${q[1] - 6} ${q[0] + 6},${q[1]} ${q[0]},${q[1] + 6} ${q[0] - 6},${q[1]}`} fill={ROSE} />
      <T x={q[0] + 9} y={q[1] - 6} size={7.5} fill={ROSE}>query</T>
      <T x={190} y={184} anchor="middle" size={7.5}>sentence-transformers → top-k</T>

      {/* retrieval → context */}
      <path d="M262,92 L272,92 L272,50 L281,50" fill="none" stroke={IRIS} strokeOpacity="0.75" strokeWidth="1.2" />
      <polygon points="284,50 278,47 278,53" fill={IRIS} fillOpacity="0.9" />

      {/* LLM column */}
      <T x={284} y={38} size={7.5} fill={MIST}>retrieved context</T>
      {top.map((t, i) => (
        <rect key={i} x={284 + i * 37} y="44" width="33" height="10" rx="3" fill={t.c} fillOpacity="0.45" stroke={t.c} />
      ))}
      <Arrow x1={338} y1={58} x2={338} y2={76} color={IRIS} opacity={0.8} />
      <rect x="296" y="78" width="84" height="38" rx="8" fill={IRIS} fillOpacity="0.1" stroke={IRIS} strokeOpacity="0.7" />
      <T x={338} y={95} anchor="middle" size={12} weight={600} fill={IRIS_SOFT}>LLM</T>
      <T x={338} y={108} anchor="middle" size={7.5}>question + context</T>
      <Arrow x1={338} y1={118} x2={338} y2={134} color={FOAM} opacity={0.8} />
      <rect x="284" y="136" width="108" height="46" rx="8" fill={FOAM} fillOpacity="0.08" stroke={FOAM} strokeOpacity="0.45" />
      <T x={292} y={148} size={7} fill={FOAM} spacing={0.2}>ANSWER</T>
      <rect x="292" y="154" height="3" rx="1.5" fill={FOAM} fillOpacity="0.8">
        <animate attributeName="width" values="0;92;92;0" keyTimes="0;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="292" y="161" height="3" rx="1.5" fill={FOAM} fillOpacity="0.55">
        <animate attributeName="width" values="0;0;72;72;0" keyTimes="0;0.2;0.6;0.9;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <T x={292} y={176} size={7.5} fill={FOAM}>[1] [2] [3] sources</T>

      <T x={54} y={226} anchor="middle" spacing={0.15}>CHUNK</T>
      <T x={190} y={226} anchor="middle" spacing={0.15}>EMBED + RETRIEVE</T>
      <T x={338} y={226} anchor="middle" spacing={0.15}>GENERATE</T>
    </Svg>
  );
}

/* ================================================================== */
/* 4 · NEURAL NETS FROM SCRATCH — regression + classification vs PCA/LogReg */
/* ================================================================== */
function Mlp() {
  const reg = Array.from({ length: 28 }).map((_, i) => {
    const t = ((i * 37) % 28) / 27;
    const noise = Math.sin(i * 2.7) * 7;
    return { x: 32 + t * 150, y: 144 - t * 96 + noise };
  });
  const centers: [number, number, string][] = [
    [250, 68, IRIS],
    [350, 64, ROSE],
    [252, 128, FOAM],
    [348, 130, GOLD],
  ];

  return (
    <Svg>
      {/* regression panel */}
      <T x={14} y={22} size={8.5} fill={MIST} spacing={0.15}>REGRESSION</T>
      <rect x="10" y="30" width="188" height="152" rx="8" fill={FOAM} fillOpacity="0.03" stroke={LINE} />
      <line x1="28" y1="42" x2="28" y2="146" stroke={FAINT} strokeOpacity="0.7" />
      <line x1="28" y1="146" x2="188" y2="146" stroke={FAINT} strokeOpacity="0.7" />
      <line x1="30" y1="144" x2="184" y2="48" stroke={GOLD} strokeOpacity="0.7" strokeDasharray="4 4">
        <Flow dur="1.6s" to={-16} />
      </line>
      {reg.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.6" fill={FOAM} fillOpacity="0.85">
          <animate attributeName="fill-opacity" values="0.4;1;0.4" dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <T x={107} y={159} anchor="middle" size={7.5}>actual PE (MW)</T>
      <T x={19} y={100} anchor="middle" size={7.5} rotate={-90}>predicted</T>
      <T x={150} y={60} size={7.5} fill={GOLD} anchor="middle">y = x</T>
      <T x={104} y={175} anchor="middle" size={7.5} fill={MIST}>AT · V · AP · RH → PE</T>

      {/* classification panel */}
      <T x={214} y={22} size={8.5} fill={MIST} spacing={0.15}>CLASSIFICATION</T>
      <rect x="210" y="30" width="182" height="152" rx="8" fill={IRIS} fillOpacity="0.03" stroke={LINE} />
      {centers.map(([cx, cy, c], ci) =>
        Array.from({ length: 10 }).map((_, i) => {
          const ang = i * 2.4 + ci;
          const r = 5 + ((i * 5 + ci * 3) % 17);
          return (
            <circle
              key={`${ci}-${i}`}
              cx={cx + Math.cos(ang) * r * 1.25}
              cy={cy + Math.sin(ang) * r * 0.9}
              r="2.8"
              fill={c}
              fillOpacity="0.85"
            />
          );
        })
      )}
      {/* linear baseline */}
      <path d="M306,38 L294,174" stroke={MIST} strokeOpacity="0.55" strokeDasharray="3 3" fill="none" />
      <path d="M214,88 L388,106" stroke={MIST} strokeOpacity="0.55" strokeDasharray="3 3" fill="none" />
      {/* neural decision boundary */}
      <path d="M302,38 C292,70 312,96 298,100 S306,150 298,174" stroke={IRIS_SOFT} strokeWidth="1.6" fill="none">
        <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M214,98 C246,90 270,106 300,99 S352,90 388,99" stroke={IRIS_SOFT} strokeWidth="1.6" fill="none">
        <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" />
      </path>
      <T x={301} y={175} anchor="middle" size={7.5} fill={MIST}>PCA space · date fruit</T>

      {/* legend */}
      <line x1="118" y1="206" x2="140" y2="206" stroke={IRIS_SOFT} strokeWidth="1.6" />
      <T x={146} y={209} size={7.5} fill={MIST}>PyTorch MLP</T>
      <line x1="236" y1="206" x2="258" y2="206" stroke={MIST} strokeDasharray="3 3" />
      <T x={264} y={209} size={7.5} fill={MIST}>PCA + LogReg baseline</T>
    </Svg>
  );
}

/* ================================================================== */
/* 5 · CNN vs RNN on MNIST — two ways of reading the same digit        */
/* ================================================================== */
function CnnRnn() {
  const DIGIT = [
    "............",
    ".##########.",
    ".##########.",
    "........##..",
    ".......##...",
    ".......##...",
    "......##....",
    "......##....",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    "............",
  ];
  const gx = 14;
  const gy = 76;
  const rowYs = Array.from({ length: 12 }).map((_, i) => gy + i * 8).join(";");
  const rnnX = [156, 186, 216];

  return (
    <Svg>
      {/* digit grid */}
      <T x={62} y={66} anchor="middle" size={8} fill={MIST}>MNIST digit</T>
      {DIGIT.map((row, r) =>
        row.split("").map((ch, c) => (
          <rect
            key={`${r}-${c}`}
            x={gx + c * 8}
            y={gy + r * 8}
            width="7"
            height="7"
            rx="1.2"
            fill={ch === "#" ? IRIS_SOFT : IRIS}
            fillOpacity={ch === "#" ? 0.9 : 0.07}
          />
        ))
      )}
      {/* CNN: sliding 3×3 kernel */}
      <rect x={gx} y={gy} width="24" height="24" rx="2" fill={IRIS} fillOpacity="0.18" stroke={IRIS} strokeWidth="1.4">
        <animate attributeName="x" values={`${gx};${gx + 72}`} dur="2s" repeatCount="indefinite" />
        <animate attributeName="y" values={`${gy};${gy + 24};${gy + 48};${gy + 72}`} calcMode="discrete" dur="8s" repeatCount="indefinite" />
      </rect>
      {/* RNN: row-by-row scan */}
      <rect x={gx - 2} y={gy} width="100" height="7" rx="1.5" fill={ROSE} fillOpacity="0.28" stroke={ROSE} strokeOpacity="0.8">
        <animate attributeName="y" values={rowYs} calcMode="discrete" dur="6s" repeatCount="indefinite" />
      </rect>
      <T x={62} y={190} anchor="middle" size={7.5}>28 × 28 pixels</T>

      {/* CNN lane */}
      <T x={146} y={34} size={9} weight={600} fill={IRIS_SOFT} spacing={0.15}>CNN</T>
      <Arrow x1={116} y1={104} x2={142} y2={74} color={IRIS} opacity={0.7} />
      {[0, 1, 2].map((i) => (
        <rect key={`c${i}`} x={146 + i * 6} y={44 + i * 6} width="34" height="34" rx="3" fill={IRIS} fillOpacity={0.06 + i * 0.07} stroke={IRIS} strokeOpacity="0.6" />
      ))}
      <T x={170} y={104} anchor="middle" size={7.5}>conv</T>
      <Arrow x1={196} y1={68} x2={210} y2={68} color={IRIS} opacity={0.7} />
      {[0, 1, 2].map((i) => (
        <rect key={`p${i}`} x={214 + i * 5} y={52 + i * 5} width="22" height="22" rx="3" fill={IRIS} fillOpacity={0.06 + i * 0.07} stroke={IRIS} strokeOpacity="0.6" />
      ))}
      <T x={230} y={104} anchor="middle" size={7.5}>pool</T>
      <Arrow x1={250} y1={70} x2={262} y2={70} color={IRIS} opacity={0.7} />
      {[52, 64, 76, 88].map((y, i) => (
        <circle key={y} cx={270} cy={y} r="3.6" fill={IRIS}>
          <animate attributeName="fill-opacity" values="0.2;0.9;0.2" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <T x={270} y={104} anchor="middle" size={7.5}>fc</T>

      {/* RNN lane */}
      <T x={146} y={146} size={9} weight={600} fill={ROSE} spacing={0.15}>RNN</T>
      <Arrow x1={116} y1={150} x2={142} y2={166} color={ROSE} opacity={0.7} />
      {rnnX.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={172} r="9" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeOpacity="0.8">
            <animate attributeName="fill-opacity" values="0.08;0.55;0.08" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
          <T x={x} y={194} anchor="middle" size={7.5}>h{i + 1}</T>
          <Arrow x1={x + 10} y1={172} x2={x + 20} y2={172} color={ROSE} opacity={0.75} />
        </g>
      ))}
      <T x={240} y={175} anchor="middle" size={10} fill={ROSE}>…</T>
      <Arrow x1={248} y1={172} x2={255} y2={172} color={ROSE} opacity={0.75} />
      <circle cx={266} cy={172} r="9" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeOpacity="0.8">
        <animate attributeName="fill-opacity" values="0.08;0.55;0.08" dur="3s" begin="2.4s" repeatCount="indefinite" />
      </circle>
      <T x={266} y={194} anchor="middle" size={7.5}>h28</T>
      <T x={146} y={214} size={7.5}>28 rows → 28 time-steps</T>

      {/* output */}
      <Arrow x1={278} y1={72} x2={336} y2={112} color={IRIS} opacity={0.6} dash="3 3" />
      <Arrow x1={278} y1={170} x2={336} y2={134} color={ROSE} opacity={0.6} dash="3 3" />
      <rect x="338" y="100" width="50" height="44" rx="8" fill={IRIS} fillOpacity="0.08" stroke={IRIS} strokeOpacity="0.6" />
      <T x={363} y={131} anchor="middle" size={26} weight={600} fill={IRIS_SOFT}>7</T>
      <T x={363} y={156} anchor="middle" size={7.5}>softmax</T>
      <T x={363} y={168} anchor="middle" size={7.5} fill={GOLD}>compare</T>
    </Svg>
  );
}

/* ================================================================== */
/* 6 · SMARTCART — K-Means customer segments + elbow + silhouette      */
/* ================================================================== */
function KMeans() {
  const clusters: [number, number, string][] = [
    [74, 82, IRIS],
    [170, 74, FOAM],
    [84, 148, ROSE],
    [178, 144, GOLD],
  ];
  const inertia = [1.0, 0.62, 0.4, 0.27, 0.22, 0.19, 0.17, 0.155];
  const ex = (k: number) => 272 + (k - 1) * 15;
  const ey = (v: number) => 112 - v * 64;
  const elbowPath = inertia.map((v, i) => `${i === 0 ? "M" : "L"}${ex(i + 1)},${ey(v)}`).join(" ");
  const sil = [0.5, 0.62, 0.74, 0.58, 0.5, 0.44, 0.4];

  return (
    <Svg>
      {/* PCA scatter */}
      <T x={14} y={22} size={8.5} fill={MIST} spacing={0.15}>CUSTOMER SEGMENTS</T>
      <rect x="10" y="30" width="228" height="170" rx="8" fill={IRIS} fillOpacity="0.03" stroke={LINE} />
      {clusters.map(([cx, cy, c], ci) => (
        <g key={ci}>
          <ellipse cx={cx} cy={cy} rx="44" ry="32" fill={c} fillOpacity="0.04" stroke={c} strokeOpacity="0.4" strokeDasharray="3 4">
            <Flow dur="3s" to={-28} />
          </ellipse>
          {Array.from({ length: 12 }).map((_, i) => {
            const ang = i * 2.399 + ci * 1.3;
            const r = 5 + ((i * 7 + ci * 5) % 24) * 0.95;
            return (
              <circle
                key={i}
                cx={cx + Math.cos(ang) * r * 1.35}
                cy={cy + Math.sin(ang) * r * 0.95}
                r="2.7"
                fill={c}
                fillOpacity="0.8"
              />
            );
          })}
          <circle cx={cx} cy={cy} r="6" fill="none" stroke={c}>
            <animate attributeName="r" values="6;14" dur="2.4s" begin={`${ci * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.9;0" dur="2.4s" begin={`${ci * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <path d={`M${cx - 4.5},${cy - 4.5} L${cx + 4.5},${cy + 4.5} M${cx + 4.5},${cy - 4.5} L${cx - 4.5},${cy + 4.5}`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <path d={`M${cx - 4.5},${cy - 4.5} L${cx + 4.5},${cy + 4.5} M${cx + 4.5},${cy - 4.5} L${cx - 4.5},${cy + 4.5}`} stroke={c} strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}
      <T x={232} y={193} anchor="end" size={7.5}>PC1</T>
      <T x={19} y={50} size={7.5}>PC2</T>
      <T x={22} y={193} size={7.5} fill={MIST}>✕ centroid</T>

      {/* elbow */}
      <T x={262} y={22} size={8.5} fill={MIST} spacing={0.15}>ELBOW · INERTIA</T>
      <line x1="266" y1="42" x2="266" y2="112" stroke={FAINT} strokeOpacity="0.7" />
      <line x1="266" y1="112" x2="388" y2="112" stroke={FAINT} strokeOpacity="0.7" />
      <path d={elbowPath} pathLength="1" fill="none" stroke={FOAM} strokeWidth="1.8" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.5;1" dur="4s" repeatCount="indefinite" />
      </path>
      {inertia.map((v, i) => (
        <circle key={i} cx={ex(i + 1)} cy={ey(v)} r="2.4" fill={FOAM} fillOpacity={i === 3 ? 0 : 0.8} />
      ))}
      <line x1={ex(4)} y1={ey(0.27)} x2={ex(4)} y2="112" stroke={FOAM} strokeOpacity="0.6" strokeDasharray="2 3" />
      <circle cx={ex(4)} cy={ey(0.27)} r="5" fill={FOAM}>
        <animate attributeName="r" values="4;6.5;4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <T x={ex(4) + 9} y={ey(0.27) - 8} size={9} weight={700} fill={FOAM}>k*</T>
      <T x={386} y={123} anchor="end" size={7.5}>k →</T>

      {/* silhouette */}
      <T x={262} y={144} size={8.5} fill={MIST} spacing={0.15}>SILHOUETTE</T>
      <line x1="266" y1="192" x2="388" y2="192" stroke={FAINT} strokeOpacity="0.7" />
      {sil.map((v, i) => {
        const k = i + 2;
        const best = k === 4;
        const h = v * 38;
        return (
          <rect key={k} x={ex(k) - 5.5} y={192 - h} width="11" height={h} rx="2" fill={best ? GOLD : IRIS} fillOpacity={best ? 0.95 : 0.35} />
        );
      })}
      <T x={386} y={203} anchor="end" size={7.5}>score vs k →</T>
    </Svg>
  );
}

/* ================================================================== */
/* 7 · CLIFF WALKING — SARSA on the real 4×12 grid                     */
/* ================================================================== */
function Cliff() {
  const S = 30;
  const X0 = 20;
  const Y0 = 44;
  const cx = (c: number) => X0 + c * S + S / 2;
  const cy = (r: number) => Y0 + r * S + S / 2;

  const dirOf = (r: number, c: number): number | null => {
    if (r === 3) return c === 0 ? -90 : null;
    if (c === 11) return 90;
    if (r === 2) return -90;
    return 0;
  };

  const safe = `M${cx(0)},${cy(3)} L${cx(0)},${cy(1)} L${cx(11)},${cy(1)} L${cx(11)},${cy(3)}`;
  const risky = `M${cx(0)},${cy(3)} L${cx(0)},${cy(2)} L${cx(11)},${cy(2)} L${cx(11)},${cy(3)}`;

  return (
    <Svg>
      <defs>
        <pattern id="cliffHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={ROSE} strokeOpacity="0.45" strokeWidth="2" />
        </pattern>
      </defs>

      <T x={20} y={28} size={8.5} fill={MIST} spacing={0.15}>CLIFFWALKING · 4×12</T>
      <T x={380} y={28} size={8.5} fill={IRIS_SOFT} anchor="end" spacing={0.1}>SARSA · on-policy TD</T>

      {/* cells */}
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => {
          const cliff = r === 3 && c >= 1 && c <= 10;
          const start = r === 3 && c === 0;
          const goal = r === 3 && c === 11;
          const d = dirOf(r, c);
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={X0 + c * S + 0.5}
                y={Y0 + r * S + 0.5}
                width={S - 1}
                height={S - 1}
                rx="3"
                fill={cliff ? "url(#cliffHatch)" : start ? FOAM : goal ? GOLD : IRIS}
                fillOpacity={cliff ? 1 : start ? 0.22 : goal ? 0.28 : 0.03 + (c / 11) * 0.12}
                stroke={cliff ? ROSE : start ? FOAM : goal ? GOLD : IRIS}
                strokeOpacity={cliff ? 0.55 : start || goal ? 0.7 : 0.15}
              />
              {d !== null && !start && (
                <path
                  d="M-5,0 L5,0 M2,-3 L5,0 L2,3"
                  transform={`translate(${cx(c)} ${cy(r)}) rotate(${d})`}
                  stroke={MIST}
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              )}
            </g>
          );
        })
      )}
      <T x={cx(0)} y={cy(3) + 4} anchor="middle" size={11} weight={700} fill={FOAM}>S</T>
      <T x={cx(11)} y={cy(3) + 4} anchor="middle" size={11} weight={700} fill={GOLD}>G</T>
      <T x={200} y={cy(3) + 3} anchor="middle" size={9} weight={600} fill={ROSE} spacing={0.5}>THE CLIFF</T>

      {/* risky greedy-edge path */}
      <path d={risky} fill="none" stroke={ROSE} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="3 3" strokeLinejoin="round">
        <Flow dur="1.4s" to={-12} />
      </path>
      {/* safe SARSA path */}
      <path d={safe} fill="none" stroke={IRIS_SOFT} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.95" />
      {/* agent */}
      <circle r="5.5" fill="#fff">
        <animateMotion dur="6s" repeatCount="indefinite" path={safe} />
      </circle>
      <circle r="9" fill="none" stroke={IRIS_SOFT}>
        <animateMotion dur="6s" repeatCount="indefinite" path={safe} />
        <animate attributeName="stroke-opacity" values="0.8;0.1;0.8" dur="1.2s" repeatCount="indefinite" />
      </circle>

      {/* legend */}
      <line x1="20" y1="186" x2="42" y2="186" stroke={IRIS_SOFT} strokeWidth="2.2" />
      <T x={48} y={189} size={7.5} fill={MIST}>safe path learned by SARSA</T>
      <line x1="20" y1="202" x2="42" y2="202" stroke={ROSE} strokeDasharray="3 3" />
      <T x={48} y={205} size={7.5} fill={MIST}>risky edge path</T>
      <T x={380} y={189} anchor="end" size={7.5} fill={GOLD}>r = −1 / step · −100 cliff</T>

      <T x={200} y={228} anchor="middle" size={8.5} fill={FOAM} spacing={0.04}>
        Q(s,a) ← Q(s,a) + α [ r + γ Q(s′,a′) − Q(s,a) ]
      </T>
    </Svg>
  );
}

/* ------------------------------------------------------------------ */

export default function ProjectVisual({ project }: { project: Project }) {
  const views: Record<Project["visual"], ReactNode> = {
    summarizer: <Summarizer />,
    flappy: <Flappy />,
    rag: <Rag />,
    mlp: <Mlp />,
    cnnrnn: <CnnRnn />,
    kmeans: <KMeans />,
    cliff: <Cliff />,
  };

  return (
    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
      {views[project.visual]}
    </div>
  );
}
