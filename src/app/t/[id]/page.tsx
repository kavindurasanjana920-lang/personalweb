import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import TrackingDetailsClient from "@/components/search/tracking-details-client";

export const dynamic = "force-dynamic";

type LinkData = { courier: string; waybill: string; phone?: string };

function resolveLink(id: string): LinkData | null {
  try {
    const file = join(process.cwd(), "data", "links.json");
    if (!existsSync(file)) return null;
    const links = JSON.parse(readFileSync(file, "utf8")) as Record<string, LinkData>;
    return links[id] ?? null;
  } catch {
    return null;
  }
}

function TrackingFallback() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted/40" />
      <div className="h-32 w-full animate-pulse rounded-3xl bg-muted/40" />
      <div className="h-64 w-full animate-pulse rounded-3xl bg-muted/40" />
    </main>
  );
}

export default async function ShortLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = resolveLink(id);

  if (!link) redirect("/");

  return (
    <Suspense fallback={<TrackingFallback />}>
      <TrackingDetailsClient
        initialWaybill={link.waybill}
        initialCourier={link.courier}
        initialPhone={link.phone}
      />
    </Suspense>
  );
}
