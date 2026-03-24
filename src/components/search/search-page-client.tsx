"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Package, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface TrackingHistory {
  status_name: string;
  status_created_at: string;
  remarks?: string | null;
}

interface DeliveryPartner {
  name: string;
  tag_line: string;
  service_type: string;
  delivery_hub: string;
  status: string;
}

interface TrackingData {
  waybill_id: string;
  current_status: string;
  total: string;
  estimated_time_arrival: string;
  address: string;
  is_payed: boolean;
  order_date: string;
  tracking_history: TrackingHistory[];
  delivery_partner: DeliveryPartner;
}

interface ApiResponse {
  success: boolean;
  data?: TrackingData;
  error?: string;
}

async function fetchTrackingData(waybillId: string): Promise<ApiResponse> {
  const encodedWaybill = encodeURIComponent(waybillId);
  const endpoints = [
    `/api/tracking?waybill_id=${encodedWaybill}`,
    `https://api.consumer.oms.parallaxtec.dev/api/tracking?waybill_id=${encodedWaybill}`,
  ];

  let lastError: string | null = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const rawText = await response.text();
      const parsed = JSON.parse(rawText) as ApiResponse;

      if (response.ok && parsed.success && parsed.data) {
        return parsed;
      }

      lastError = parsed.error || `Request failed (${response.status})`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Request failed";
    }
  }

  return {
    success: false,
    error: lastError || "No orders found",
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatPartnerName(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "transexpress") {
    return "Trans Express";
  }
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatStatusText(value: string) {
  const trimmed = value.trim();
  const lettersOnly = trimmed.replace(/[^A-Za-z]/g, "");

  if (!lettersOnly || lettersOnly !== lettersOnly.toUpperCase()) {
    return trimmed;
  }

  return trimmed
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = useMemo(() => searchParams.get("q")?.toUpperCase() ?? "", [searchParams]);

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");

  const runSearch = async (waybillId: string) => {
    if (!waybillId) {
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await fetchTrackingData(waybillId);
      if (!data.success || !data.data) {
        throw new Error(data.error || "No orders found");
      }

      setResult(data.data);
      setSearched(true);
      setError("");
    } catch {
      setResult(null);
      setSearched(true);
      setError("No orders found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setSearchInput(initialQuery);
      void runSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const waybillId = searchInput.trim().toUpperCase();
    if (!waybillId) {
      return;
    }

    router.replace(`/search?q=${encodeURIComponent(waybillId)}`);
    await runSearch(waybillId);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearched(false);
    setResult(null);
    setError("");
    router.replace("/search");
  };

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Back to home"
          className="rounded-lg p-2 text-orange-500 transition hover:bg-orange-500/10"
        >
          <ArrowLeft className="size-7" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Search Results</h1>
        <div className="size-11" aria-hidden />
      </div>

      <form onSubmit={handleSearch} className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border bg-background px-4">
            <Search className="size-5 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder="Enter tracking number"
              className="h-12 w-full bg-transparent text-base outline-none sm:text-lg"
            />
          </div>
          <Button
            type="submit"
            className="h-12 rounded-2xl bg-orange-500 px-6 text-base font-semibold text-white hover:bg-orange-500/90 sm:h-14 sm:px-7 sm:text-lg"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {searched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold sm:text-xl">{result ? "Found 1 results" : "Found 0 results"}</p>
              <button
                type="button"
                onClick={clearSearch}
                className="text-base font-semibold text-orange-500 hover:text-orange-600 sm:text-lg"
              >
                Clear
              </button>
            </div>

            {result ? (
              <Link
                href={`/search/${encodeURIComponent(result.waybill_id)}`}
                className="block overflow-hidden rounded-3xl border bg-card transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid size-14 place-items-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300">
                      <Package className="size-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold uppercase sm:text-3xl">{result.waybill_id}</h2>
                      <p className="text-base text-muted-foreground sm:text-lg">
                        {formatPartnerName(result.delivery_partner?.name || "")}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold sm:text-3xl">LKR {Number(result.total).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground sm:text-base">{formatDate(result.order_date)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t p-5 sm:p-6">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-orange-300/80 bg-orange-50 px-4 py-2 text-orange-600 dark:border-orange-700/60 dark:bg-orange-900/20 dark:text-orange-300">
                    <Package className="size-4" />
                    <span className="text-sm font-semibold">{formatStatusText(result.current_status)}</span>
                  </div>
                  <p className="text-base font-semibold tracking-wide text-muted-foreground sm:text-lg">#{result.waybill_id}</p>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl border bg-card px-6 py-12 text-center sm:px-10">
                <div className="mx-auto mb-5 grid size-24 place-items-center rounded-full bg-muted/50">
                  <Search className="size-11 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-3xl font-bold sm:text-4xl">No Orders Found</h2>
                <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg">
                  We couldn&apos;t find any orders matching "{searchInput}". Please check your tracking number and try again.
                </p>
                <Button type="button" variant="outline" className="mt-8 h-12 rounded-xl px-8 text-base sm:text-lg" onClick={clearSearch}>
                  Try Another Search
                </Button>
                {error ? <p className="mt-3 text-sm text-muted-foreground">{error}</p> : null}
              </div>
            )}
          </div>
        )}
      </form>
    </main>
  );
}
