"use client";

import { Music, Pause } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Play {
  is_playing: boolean;
  track: string;
  artist: string;
  album: string;
  album_art: string;
  url: string;
}

export function ListeningTo() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<Play | null>(null);

  useEffect(() => {
    const fetchNowPlaying = () => {
      fetch(`${API_URL}/play`)
        .then((res) => (res.ok ? res.json() : null))
        .then(setData)
        .catch(() => setData(null));
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 h-full">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {data?.is_playing ? "Now Playing" : "Last Played"}
      </div>
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
          <div className="min-w-0">
            <div className="text-sm text-foreground truncate group-hover:underline">
              {data.track}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {data.artist}
            </div>
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-accent/30 shrink-0">
            <Music className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-sm text-foreground truncate">Not playing</div>
            <div className="text-xs text-muted-foreground truncate">—</div>
          </div>
        </div>
      )}
    </div>
  );
}
