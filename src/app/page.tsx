import type { Metadata } from "next";

import HomeClient from "@/components/home-client";

export const metadata: Metadata = {
  title: "Trackmate - Courier Tracking Sri Lanka | Domex, TransExpress, Koombiyo, Royal Express",
  description:
    "Track parcels online with real-time courier updates. Find domex tracking, transexpress tracking, koombiyo tracking, fadar tracking, royal express tracking, pracle tracking, and courier tracking in one place.",
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

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <HomeClient />
    </main>
  );
}
