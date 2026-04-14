"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  adminLogin,
  adminMe,
  clearAdminToken,
  getStoredAdminToken,
  isBlogApiConfigured,
  storeAdminToken,
} from "@/lib/blog-api";
import { FormEvent, useEffect, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getStoredAdminToken();

    if (!token) {
      setIsCheckingSession(false);
      return;
    }

    adminMe(token)
      .then(() => {
        window.location.replace("/admin/posts/");
      })
      .catch(() => {
        clearAdminToken();
        setIsCheckingSession(false);
      });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await adminLogin(email.trim(), password);
      storeAdminToken(response.token);
      window.location.replace("/admin/posts/");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isBlogApiConfigured()) {
    return (
      <section id="admin-login" className="flex min-h-0 flex-col gap-y-6">
        <h2 className="text-xl font-bold">Admin Login</h2>
        <p className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-4 text-sm text-destructive">
          Missing NEXT_PUBLIC_LARAVEL_API_URL. Set it in your Next.js environment
          before using admin pages.
        </p>
      </section>
    );
  }

  return (
    <section id="admin-login" className="flex min-h-0 flex-col gap-y-6">
      <div>
        <h2 className="text-xl font-bold">Admin Login</h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Sign in to create, edit, and publish blog posts.
        </p>
      </div>

      <div className="flex min-h-0 flex-col gap-y-4">
        {isCheckingSession ? (
          <p className="rounded-lg border border-border px-4 py-4 text-sm text-muted-foreground">
            Checking existing session...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-col gap-y-4">
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="admin@example.com"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Your password"
              />
            </div>

            {error ? (
              <p className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive font-medium">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="w-fit">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
