"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LogIn, LogOut, Pencil, RefreshCcw } from "lucide-react";

type Step = "email" | "otp" | "authed";

export function Login() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/auth/session`, { credentials: "include" })
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
      .catch(() => setStep("email"));
  }, [API_URL]);

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/email`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setStep("otp");
    } catch {
      setError("couldn't send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      const data = await res.json();
      if (data.email) setEmail(data.email);
      setStep("authed");
    } catch {
      setError("invalid OTP");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (step === "email") sendOtp();
    else if (step === "otp") verifyOtp();
  };

  if (step === "authed") {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {email}
        </div>
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
          className="h-7 text-xs gap-1.5 w-full mt-2"
        >
          <LogOut className="size-3" />
          logout
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs font-semibold tracking-wider text-muted-foreground mb-3">
        Login {error && (
          <span className="text-[10px] text-destructive shrink-0">{error}</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
        {step === "email" ? (
          <>
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                {loading ? "..." : "send OTP"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center w-full gap-1">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type="button" size="sm"
                variant="outline" onClick={sendOtp}
                disabled={loading} className="h-7 w-7 p-0 shrink-0"
              >
                <RefreshCcw className="size-3" />
              </Button>
              <Button type="button" size="sm" variant="outline"
                onClick={() => { setStep("email"); setOtp(""); setError(""); }}
                className="h-7 w-7 p-0 shrink-0">
                <Pencil className="size-3" />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button type="submit" size="sm" variant="outline"
                disabled={loading} className="h-7 text-xs gap-1.5 flex-1"
              >
                <LogIn className="size-3" />
                {loading ? "..." : "verify"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
