"use client";

import { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, [role="button"], input, label, [tabindex]');
      ringRef.current?.classList.toggle("cursor-ring-hover", isInteractive);
    };

    const onClick = (e: MouseEvent) => {
      const id = rippleId.current++;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 700);
    };

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — tracks exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-99999 size-2 rounded-full bg-accent"
        style={{
          boxShadow: "0 0 6px oklch(0.65 0.19 255 / 1), 0 0 4px oklch(0.65 0.19 255 / 0.5)",
          willChange: "transform",
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[99998] size-5 rounded-full border border-accent/40"
        style={{
          boxShadow: "0 0 8px oklch(0.65 0.19 255 / 0.2)",
          willChange: "transform",
        }}
      />
      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple fixed pointer-events-none z-[99997] rounded-full border border-accent/60"
          style={{
            left: r.x - 16,
            top: r.y - 16,
            width: 32,
            height: 32,
          }}
        />
      ))}
    </>
  );
}
