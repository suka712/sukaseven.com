"use client";

import { useEffect, useState } from "react";
import { MONITORED_SERVICES } from "@/config/services";

type ServiceState = {
  name: string;
  status: "pending" | "up" | "down";
  latency?: number;
};

const initial: ServiceState[] = MONITORED_SERVICES.map(({ name }) => ({
  name,
  status: "pending",
}));

export const LeftHealthPanel = () => {
  const [services, setServices] = useState<ServiceState[]>(initial);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  useEffect(() => {
    setServices(initial.map((s) => ({ ...s })));

    const es = new EventSource("/api/ping/stream");

    es.onmessage = (e) => {
      const { name, isUp, latency } = JSON.parse(e.data) as {
        name: string;
        isUp: boolean;
        latency: number;
      };
      setServices((prev) =>
        prev.map((s) =>
          s.name === name
            ? { name, status: isUp ? "up" : "down", latency }
            : s
        )
      );
      setCheckedAt(new Date());
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between pb-2">
        <div className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
          Health
        </div>
        {checkedAt && (
          <span className="text-xs font-mono text-muted-foreground/50 truncate">
            Checked: <span className="text-accent">{checkedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
          </span>
        )}
      </div>
      <div className="flex-1 font-mono text-xs tracking-wider leading-loose px-3 overflow-y-auto scrollbar-panel">
        {services.map((svc) => (
          <div key={svc.name} className="flex items-center gap-2 pt-2 truncate rounded hover:bg-accent/5 transition-colors px-1 -mx-1">
            {svc.status === "pending" ? (
              <span className="size-2 rounded-full bg-muted-foreground/30 animate-pulse shrink-0" />
            ) : svc.status === "up" && (svc.latency ?? 0) > 500 ? (
              <span className="size-2 rounded-full bg-yellow-400 live-dot shrink-0" style={{ ["--ring" as string]: "oklch(0.85 0.15 95)" }} />
            ) : svc.status === "up" ? (
              <span className="size-2 rounded-full bg-accent live-dot shrink-0" />
            ) : (
              <span className="size-2 rounded-full bg-destructive animate-pulse shrink-0" style={{ boxShadow: "0 0 6px oklch(0.65 0.2 25 / 0.6)" }} />
            )}
            <span
              className={
                svc.status === "pending"
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground"
              }
            >
              {svc.name}
            </span>
            {svc.status === "up" && svc.latency !== undefined && svc.latency > 0 && (
              <span className="text-foreground/60 ml-auto">{svc.latency}ms</span>
            )}
            {svc.status === "down" && (
              <span className="text-destructive/70 ml-auto text-[10px]">down</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
