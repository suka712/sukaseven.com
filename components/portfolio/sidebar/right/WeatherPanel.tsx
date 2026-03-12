"use client";

import { useEffect, useState } from "react";
import {
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning,
  CloudDrizzle, Wind, Droplets, Thermometer, CloudFog,
} from "lucide-react";

interface Weather {
  temp: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  description: string;
  windSpeed: number;
  windDeg: number;
  code: number;
}

function windDir(deg: number) {
  const dirs = ["↑↑", "↗↗", "→→", "↘↘", "↓↓", "↙↙", "←←", "↖↖"];
  return dirs[Math.round(deg / 45) % 8];
}

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code >= 200 && code < 300) return <CloudLightning className={className} />;
  if (code >= 300 && code < 400) return <CloudDrizzle className={className} />;
  if (code >= 500 && code < 600) return <CloudRain className={className} />;
  if (code >= 600 && code < 700) return <CloudSnow className={className} />;
  if (code >= 700 && code < 800) return <CloudFog className={className} />;
  if (code === 800) return <Sun className={className} />;
  return <Cloud className={className} />;
}

function dumbStats(w: Weather) {
  const isRaining = w.code >= 500 && w.code < 600;
  const isStormy = w.code >= 200 && w.code < 300;
  const hotAF = w.feelsLike >= 34;
  const windy = w.windSpeed > 30;

  return [
    {
      label: "Bike",
      value: isStormy || windy ? "待在家" : isRaining ? "有风险" : "去吧",
    },
    {
      label: "AC",
      value: hotAF ? "全速" : w.temp >= 28 ? "开" : "关",
    },
    {
      label: "Umbrella",
      value: isRaining || isStormy ? "是" : w.humidity > 80 ? "也许" : "不",
    },
    {
      label: "Boba",
      value: "总是",
    },
  ];
}

export function WeatherPanel() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setWeather)
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Taipei",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-3 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Chiayi, Taiwan
        </span>
        <span className="text-muted-foreground/60 text-xs tabular-nums font-mono">现在: <span className="text-accent">{time}</span></span>      </div>
        
      {error ? (
        <span className="text-destructive/60 text-xs">weather unavailable</span>
      ) : !weather ? (
        <span className="text-muted-foreground/50 animate-pulse-quick">fetching...</span>
      ) : (
        <>
          {/* Main temp + condition */}
          <div className="flex items-center gap-2">
            <WeatherIcon code={weather.code} className="size-5 text-accent shrink-0" />
            <span className="text-2xl font-semibold text-foreground tabular-nums">
              {weather.temp}°
            </span>
            <span className="text-muted-foreground capitalize leading-tight">
              {weather.description}
            </span>
          </div>

          {/* Secondary stats */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Thermometer className="size-3" />
              感觉 {weather.feelsLike}°
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="size-3" />
              {weather.humidity}%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="size-3" />
              {weather.windSpeed} km/h {windDir(weather.windDeg)}
            </span>
          </div>

          <hr className="border-border" />

          {/* Dumb stats */}
          <div className="space-y-1">
            {dumbStats(weather).map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground/60">{label}</span>
                <span className="text-foreground/70">{value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
