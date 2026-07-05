"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { PanelHeader, CollapsibleContent } from "../../layout/PanelHeader";

type Step = "login" | "authed";

export function Login() {
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.email) {
          setEmail(data.email);
          setStep("authed");
        }
      })
      .catch(() => setStep("login"));
  }, []);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passcode }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      if (data.email) setEmail(data.email);
      setPasscode("");
      setStep("authed");
    } catch {
      setError("invalid credentials");
      setPasscode("");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setEmail("");
      setPasscode("");
      setStep("login");
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    login();
  };

  const headerTitle = step === "authed" ? email : (
    <>
      Login {error && (
        <span className="text-[10px] text-destructive shrink-0">{error}</span>
      )}
    </>
  );

  if (step === "authed") {
    return (
      <div className="p-4 h-full flex flex-col">
        <PanelHeader
          title={headerTitle}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
        <CollapsibleContent collapsed={collapsed}>
          <div className="flex-1 flex flex-col mt-3">
            <div className="flex-1 flex items-center gap-2">
              <Button
                size="sm" variant="outline" className="h-7 text-xs flex-1" asChild
              >
                <a href="https://anyu.sukaseven.com">anyu</a>
              </Button>
              <Button
                size="sm" variant="outline" className="h-7 text-xs flex-1" asChild
              >
                <a href="https://tldraw.sukaseven.com">tldraw</a>
              </Button>
            </div>
            <Button
              size="sm" variant="outline"
              onClick={logout}
              disabled={loading}
              className="h-7 text-xs gap-1.5 w-full mt-2"
            >
              <LogOut className="size-3" />
              logout
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <PanelHeader
        title={headerTitle}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <CollapsibleContent collapsed={collapsed}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1 mt-3">
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 text-xs w-full"
          />
          <Input
            placeholder="passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
            className="flex-1 text-xs w-full"
          />
          <div className="flex items-center gap-1">
            <Button
              type="submit"
              size="sm"
              variant="outline"
              disabled={loading}
              className="h-7 text-xs gap-1.5 flex-1"
            >
              <LogIn className="size-3" />
              {loading ? "..." : "login"}
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </div>
  );
}
