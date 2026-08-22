/**
 * Resolves the blog API base URL for code running on the server (sitemap, RSS).
 *
 * On the VM the Laravel API sits behind the same nginx as this app, so server-side
 * fetches should go straight to the loopback address (LARAVEL_API_URL) instead of
 * back out through the public hostname. NEXT_PUBLIC_LARAVEL_API_URL stays the
 * browser-facing value and is used as the fallback.
 *
 * Returns "" when neither is configured, so callers can degrade gracefully.
 */
export function serverApiUrl(): string {
  const value =
    process.env.LARAVEL_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_LARAVEL_API_URL?.trim() ||
    "";

  return value.replace(/\/+$/, "");
}
