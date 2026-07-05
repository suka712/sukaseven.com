"use client";

import { useEffect, useState } from "react";
import { Droplet, Droplets } from "lucide-react";

type Surface = "glass" | "solid";

export function SurfaceToggle() {
  const [surface, setSurface] = useState<Surface>("glass");

  // Sync with whatever the no-flash script (or SSR default) already set.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-surface");
    if (current === "glass" || current === "solid") setSurface(current);
  }, []);

  const toggle = () => {
    const next: Surface = surface === "glass" ? "solid" : "glass";
    setSurface(next);
    document.documentElement.setAttribute("data-surface", next);
    try {
      localStorage.setItem("surface", next);
    } catch {
      // ignore — private mode etc.
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle panel tint"
      title={surface === "glass" ? "Translucent" : "Less translucent"}
      className="glow-border panel-surface shrink-0 flex items-center justify-center size-11 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
    >
      {surface === "glass" ? (
        <Droplet className="size-[18px]" />
      ) : (
        <Droplets className="size-[18px]" />
      )}
    </button>
  );
}
