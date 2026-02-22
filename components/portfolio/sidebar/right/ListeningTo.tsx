"use client";

import { formatMsToSecond, truncateText, truncateWords } from "@/lib/format";
import { AudioLines, Music, Pause } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PanelHeader } from "../../layout/PanelHeader";

interface Play {
  is_playing: boolean;
  timestamp: number;
  progress_ms: number;
  duration_ms: number;
  track: string;
  artist: string;
  album: string;
  album_art: string;
  url: string;
}

const usePlayProgress = (data: Play | null) => {
  const [progress, setProgress] = useState(0)
  const fetchedAt = useRef(0)

  useEffect(() => {
    if (!data) return

    fetchedAt.current = Date.now()
    setProgress(data.progress_ms)

    if (!data.is_playing) return

    const trackInterval = setInterval(() => {
      const elapsed = Date.now() - fetchedAt.current
      setProgress(Math.min(data.progress_ms + elapsed, data.duration_ms))
    }, 1000)

    return () => clearInterval(trackInterval)
  }, [data])

  return progress
};

export function ListeningTo() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const UPDATE_INTERVAL = 30_000

  const [data, setData] = useState<Play | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const progress = usePlayProgress(data)

  useEffect(() => {
    const fetchNowPlaying = () => {
      fetch(`${API_URL}/play`)
        .then((res) => (res.ok ? res.json() : null))
        .then(setData)
        .catch(() => setData(null));
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, UPDATE_INTERVAL)
    return () => clearInterval(interval)
  }, []);

  return (
    <div className="p-4">
      <PanelHeader
        title={data?.is_playing ? "Now Playing" : "Last Played"}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <div className="mt-2">
          {data ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="relative size-10 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={data.album_art}
                  alt={data.album}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {!data.is_playing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Pause className="size-3 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                {(data.track + + " — " + data.artist).length > 20 ?
                  <div className="flex items-center text-sm text-foreground truncate gap-1">
                    <span className="hover:underline">{truncateWords(data.track, 3)}</span>
                    <span className="text-muted-foreground/80">{data.album && `${truncateText(data.artist, 8)}`}</span>
                  </div>
                  :
                  <div className="flex items-center text-sm text-foreground truncate gap-1">
                    <span className="hover:underline">{data.track}</span>
                    <span className="text-muted-foreground/80">{data.artist}</span>
                  </div>}

                <div className="mt-1 flex items-center w-11/12 text-[10px] gap-1">
                <div>
                  {formatMsToSecond(progress) + "\u00A0"}<span className="text-muted-foreground">/{"\u00A0" + formatMsToSecond(data.duration_ms)}</span>
                </div>
                  <div className="flex-1 h-0.5 rounded-full bg-accent-foreground/20 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(progress / data.duration_ms) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-accent/30 shrink-0">
                <Music className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-foreground truncate">Hold on...</div>
                <div className="text-xs text-muted-foreground truncate">—</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
