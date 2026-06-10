import { redirect } from "next/navigation";
import { Suspense } from "react";

import { resolveLink } from "@/lib/links-server";
import TrackingDetailsClient from "@/components/search/tracking-details-client";

export const dynamic = "force-dynamic";

function TrackingFallback() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted/40" />
      <div className="h-32 w-full animate-pulse rounded-3xl bg-muted/40" />
      <div className="h-64 w-full animate-pulse rounded-3xl bg-muted/40" />
    </main>
  );
}

export default async function ShortTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = resolveLink(id);

  if (!link) redirect("/");

  return (
    <Suspense fallback={<TrackingFallback />}>
      <TrackingDetailsClient
        initialWaybill={link.waybill}
        initialCourier={link.courier}
        initialPhone={link.phone}
        searchShortId={id}
      />
    </Suspense>
  );
}
