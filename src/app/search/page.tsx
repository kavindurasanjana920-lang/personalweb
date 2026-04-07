import { Suspense } from "react";
import type { Metadata } from "next";
import SearchPageClient from "@/components/search/search-page-client";

export const metadata: Metadata = {
  title: "Search Courier Tracking | Domex, TransExpress, Koombiyo",
  description:
    "Search your waybill and track deliveries across multiple courier services including domex tracking, transexpress tracking, koombiyo tracking, and royal express tracking.",
  keywords: [
    "domex tracking",
    "transexpress tracking",
    "koombiyo tracking",
    "royal express tracking",
    "courier tracking",
  ],
};

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
