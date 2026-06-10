"use client";

import { useState } from "react";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await fetch("https://hook.eu1.make.com/kpcy8d66dh4451dslm61jhoa1qn7fm2c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="size-4 text-green-500" />
        <span>You&apos;re subscribed! I&apos;ll keep you posted.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="h-10 w-full rounded-full border border-border bg-background/60 pl-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-opacity disabled:opacity-40 hover:opacity-80"
          aria-label="Subscribe"
        >
          {status === "loading" ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Bell className="size-3.5" />
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
