import { MONITORED_SERVICES } from "@/config/services";
import type { HealthPing } from "@/types/portfolio";
import { NextResponse } from "next/server";

export const GET = async () => {
  const pings = await getHealthPings();
  return NextResponse.json(pings);
};

export const getHealthPings = async (): Promise<HealthPing[]> => {
  return Promise.all(
    MONITORED_SERVICES.map(async ({ name, url }) => {
      const { isUp, latency } = await ping(url);
      return { name, isUp, latency };
    })
  );
};

export const ping = async (url: string) => {
  let start: number, end: number;
  try {
    start = performance.now();
    await fetch(url, { cache: "no-store" });
    end = performance.now();
    return { isUp: true, latency: Math.round(end - start) };
  } catch {
    return { isUp: false, latency: 0 };
  }
};
