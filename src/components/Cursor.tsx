import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100, y = -100;
    let rx = -100, ry = -100;
    let scale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const hit = t.closest("a, button, [data-cursor]");
      scale = hit ? 3.2 : 1;
      ring.dataset.hover = hit ? "1" : "0";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${Math.max(0.4, 1.4 - (scale - 1) * 0.4)})`;
      const s = ring.dataset.hover === "1" ? 1.9 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${s})`;
      ring.style.opacity = ring.dataset.hover === "1" ? "0.9" : "0.55";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden [@media(pointer:fine)]:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-iris will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-9 w-9 rounded-full border border-iris/60 will-change-transform"
        style={{ transition: "opacity .3s" }}
      />
    </div>
  );
}
