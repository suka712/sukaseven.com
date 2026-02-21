"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock — would POST to backend for OTP
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 3000);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Login
      </div>
      {status === "sent" ? (
        <div className="text-sm text-emerald-500">check your email for OTP</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-7 text-xs"
          />
          <Button type="submit" size="sm" variant="outline" className="h-7 text-xs gap-1.5">
            <LogIn className="size-3" />
            sign in
          </Button>
        </form>
      )}
    </div>
  );
}
