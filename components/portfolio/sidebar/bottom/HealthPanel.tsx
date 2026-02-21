"use client";

import { useEffect, useState } from "react";
import { HealthPing } from "@/types/portfolio";

export const LeftHealthPanel = () => {
  const [healthPings, setHealthPings] = useState<HealthPing[]>([])

  useEffect(() => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(setHealthPings)
      .catch(() => console.log("Shit errored out"))
  }, [])

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        HEALTH
      </div>
      <div className="font-mono text-xs tracking-wider leading-loose">
        {healthPings.map((svc) => (
          <div key={svc.name} className="flex items-center gap-2 pt-2">
            <span
              className={`size-1.5 rounded-full ${svc.isUp ? "bg-emerald-500" : "bg-red-500"
                }`}
            />
            <span className="text-muted-foreground">{svc.name}</span>
            {svc.latency && (
              <span className="text-foreground">{svc.latency}ms</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
