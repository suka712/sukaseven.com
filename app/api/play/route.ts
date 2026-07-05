import { NextResponse } from "next/server";

interface SpotifyTrack {
  name: string;
  duration_ms: number;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
}

interface PlayResponse {
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

// In-memory token cache (per instance). `inFlight` dedupes concurrent refreshes,
// standing in for the mutex used in the original Go service.
let cachedToken = "";
let tokenExpiry = 0;
let inFlight: Promise<string> | null = null;

async function refreshToken(): Promise<string> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(
      `spotify token refresh failed (status ${res.status}): ${data.error} - ${data.error_description}`
    );
  }

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;
  return cachedToken;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  if (!inFlight) {
    inFlight = refreshToken().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

async function spotifyGet(url: string): Promise<Response> {
  const token = await getAccessToken();
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
}

function trackToResponse(
  track: SpotifyTrack,
  isPlaying: boolean,
  timestamp: number,
  progressMs: number
): PlayResponse {
  return {
    is_playing: isPlaying,
    timestamp,
    progress_ms: progressMs,
    duration_ms: track.duration_ms,
    track: track.name,
    artist: track.artists[0]?.name ?? "",
    album: track.album.name,
    album_art: track.album.images[0]?.url ?? "",
    url: track.external_urls.spotify,
  };
}

const EMPTY_PLAY: PlayResponse = {
  is_playing: false,
  timestamp: 0,
  progress_ms: 0,
  duration_ms: 0,
  track: "",
  artist: "",
  album: "",
  album_art: "",
  url: "",
};

export async function GET() {
  try {
    const res = await spotifyGet(
      "https://api.spotify.com/v1/me/player/currently-playing"
    );

    if (res.status === 200) {
      const current = await res.json();
      if (current.currently_playing_type === "track") {
        return NextResponse.json(
          trackToResponse(
            current.item,
            current.is_playing,
            current.timestamp,
            current.progress_ms
          )
        );
      }
    } else if (res.status === 429) {
      console.warn(
        `Spotify currently-playing rate limited, Retry-After: ${res.headers.get("Retry-After")}`
      );
    } else if (res.status !== 204) {
      console.warn(`Spotify currently-playing returned status ${res.status}`);
    }

    const recentRes = await spotifyGet(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1"
    );

    if (recentRes.status !== 200) {
      if (recentRes.status === 429) {
        console.warn(
          `Spotify recently-played rate limited, Retry-After: ${recentRes.headers.get("Retry-After")}`
        );
      } else {
        console.warn(`Spotify recently-played returned status ${recentRes.status}`);
      }
      return NextResponse.json(EMPTY_PLAY);
    }

    const recent = await recentRes.json();
    if (!recent.items?.length) {
      return NextResponse.json(EMPTY_PLAY);
    }

    return NextResponse.json(trackToResponse(recent.items[0].track, false, 0, 0));
  } catch (err) {
    console.error("Error in /play:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
