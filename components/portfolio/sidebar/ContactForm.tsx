"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock success
    setStatus("sent");
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("idle");
    }, 3000);
  };

  return (
    <div className="border-b border-border p-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Contact
      </div>
      {status === "sent" ? (
        <div className="text-sm text-emerald-500">sent. i&apos;ll get back to you.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-7 text-xs"
          />
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-7 text-xs"
          />
          <textarea
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="h-16 w-full resize-none rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30"
          />
          <Button type="submit" size="sm" className="h-7 text-xs">
            send
          </Button>
        </form>
      )}
    </div>
  );
}
