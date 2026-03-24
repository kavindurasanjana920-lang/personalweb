import { Suspense } from "react";

import TrackingDetailsClient from "@/components/search/tracking-details-client";

function TrackingDetailsFallback() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted/40" />
      <div className="h-32 w-full animate-pulse rounded-3xl bg-muted/40" />
      <div className="h-64 w-full animate-pulse rounded-3xl bg-muted/40" />
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<TrackingDetailsFallback />}>
      <TrackingDetailsClient />
    </Suspense>
  );
}
