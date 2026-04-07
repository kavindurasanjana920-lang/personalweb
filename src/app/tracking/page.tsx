import { Suspense } from "react";
import type { Metadata } from "next";

import TrackingDetailsClient from "@/components/search/tracking-details-client";

export const metadata: Metadata = {
  title: "Track Delivery Status | Courier Tracking Updates",
  description:
    "Check live delivery milestones and parcel status with fast courier tracking updates for domex, transexpress, koombiyo, fadar, royal express, and more.",
  keywords: [
    "domex tracking",
    "transexpress tracking",
    "koombiyo tracking",
    "fadar tracking",
    "royal express tracking",
    "pracle tracking",
    "courier tracking",
  ],
};

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
