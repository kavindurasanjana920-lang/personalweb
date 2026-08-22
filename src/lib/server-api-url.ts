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

  // Only an absolute URL is usable from Node. The browser-facing value is
  // deliberately relative ("/api") so it survives a domain change, but during the
  // CI build that would leave fetch with nothing to connect to and stall the
  // prerender until it times out. Returning "" makes callers degrade to their
  // static output; on the server LARAVEL_API_URL supplies the loopback address,
  // and the hourly revalidate fills the live data back in.
  if (!/^https?:\/\//i.test(value)) return "";

  return value.replace(/\/+$/, "");
}
