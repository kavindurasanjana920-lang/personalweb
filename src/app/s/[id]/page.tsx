import { redirect } from "next/navigation";
import { Suspense } from "react";

import { resolveLink } from "@/lib/links-server";
import SearchPageClient from "@/components/search/search-page-client";

export const dynamic = "force-dynamic";

export default async function ShortSearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = resolveLink(id);

  if (!link) redirect("/");

  return (
    <Suspense fallback={null}>
      <SearchPageClient
        initialQuery={link.waybill}
        initialCourier={link.courier}
        initialPhone={link.phone}
        shortId={id}
      />
    </Suspense>
  );
}
