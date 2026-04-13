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
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
        <p className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-4 text-sm text-destructive">
          Missing NEXT_PUBLIC_LARAVEL_API_URL. Set it in your Next.js environment
          before using admin pages.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-lg py-8">
      <Card className="border border-border/80 p-1">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl tracking-tight">Admin Login</CardTitle>
          <CardDescription>
            Sign in to create, edit, and publish blog posts from Next.js.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCheckingSession ? (
            <p className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
              Checking existing session...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
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
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
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
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Your password"
                />
              </div>

              {error ? (
                <p className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
