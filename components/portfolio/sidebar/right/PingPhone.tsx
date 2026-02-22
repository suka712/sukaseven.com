"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelHeader } from "../../layout/PanelHeader";

export function PingPhone() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "cooldown">("idle");
  const [collapsed, setCollapsed] = useState(false);

  const handlePing = () => {
    setStatus("sent");
    setTimeout(() => {
      setStatus("cooldown");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <PanelHeader
        title="Ping My Phone"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <div className="mt-2 flex-1">
          {status === "sent" ? (
            <div className="text-sm text-emerald-500">pinged.</div>
          ) : status === "cooldown" ? (
            <div className="text-xs text-muted-foreground">
              cooldown — try again in a bit
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                placeholder="optional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-7 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30"
              />
              <Button
                onClick={handlePing}
                size="sm"
                variant="outline"
                className="h-7 text-xs"
              >
                ping
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
