import { Suspense } from "react";
import SearchPageClient from "@/components/search/search-page-client";

function SearchPageFallback() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted/40" />
      <div className="h-14 w-full animate-pulse rounded-2xl bg-muted/40" />
      <div className="h-44 w-full animate-pulse rounded-3xl bg-muted/40" />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageClient />
    </Suspense>
  );
}
