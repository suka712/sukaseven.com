"use client";

import { formatTimeAgo } from "@/utils/format";
import { getLatestGithubEvent, GithubEvent } from "@/utils/getData";
import { useEffect, useState } from "react";

export const LastActive = () => {
  const [event, setEvent] = useState<GithubEvent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const load = async () => {
      try {
        setEvent(await getLatestGithubEvent())
      } catch {
        setError('This panel bugged out')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="glow-border flex text-sm justify-center items-center rounded-xl bg-card gap-2 px-4 py-3 overflow-hidden">
      <span className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_6px_theme(--color-accent)] animate-pulse-quick" />
      {error ? error : <>
        <span className="text-foreground whitespace-nowrap">
          {isLoading || !event ? 'Hold on...' : `[${formatTimeAgo(event.time)}]`}
        </span>
        <span className="text-muted-foreground whitespace-nowrap">
          {isLoading || !event ? null :
            <>{event?.action} to <a href={event?.repoUrl} className="hover:underline text-foreground">{event?.repoName}</a></>
          }
        </span></>
      }
    </div>
  );
}
