"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Copy, Link2, Package, Search } from "lucide-react";
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

const KOOMBIYO_WORKER_URL = "https://koombiyo-proxy.kavindurs8.workers.dev";

async function fetchTrackingData(waybillId: string, phone?: string, courier?: string): Promise<ApiResponse> {
  try {
    let response: Response;

    if (courier === "koombiyo") {
      const params = new URLSearchParams({ id: waybillId, phone: phone ?? "" });
      response = await fetch(`${KOOMBIYO_WORKER_URL}?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
    } else {
      const params = new URLSearchParams({ waybill_id: waybillId });
      if (courier) params.set("courier", courier);
      response = await fetch(`/api/tracking?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
    }

    const parsed = await response.json() as ApiResponse;

    if (response.ok && parsed.success && parsed.data) {
      return parsed;
    }

    return { success: false, error: parsed.error || `Request failed (${response.status})` };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Request failed" };
  }
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

function isSuccessStatus(value: string) {
  const normalized = value.trim().toLowerCase();
  return ["delivered", "success", "successful", "completed", "complete"].some((term) => normalized.includes(term));
}

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const initialPhone = useMemo(() => searchParams.get("phone") ?? "", [searchParams]);
  const initialCourier = useMemo(() => searchParams.get("courier") ?? "", [searchParams]);

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const runSearch = async (waybillId: string, phone?: string, courier?: string) => {
    if (!waybillId) {
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setShortUrl("");
    setCopied(false);

    try {
      const data = await fetchTrackingData(waybillId, phone, courier);
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
      const normalized = initialQuery.toUpperCase();
      setSearchInput(normalized);
      void runSearch(normalized, initialPhone || undefined, initialCourier || undefined);
    }
  }, [initialQuery, initialPhone, initialCourier]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const waybillId = searchInput.trim().toUpperCase();
    if (!waybillId) return;

    const params = new URLSearchParams({ q: waybillId });
    if (initialCourier) params.set("courier", initialCourier);
    if (initialCourier === "koombiyo" && initialPhone) params.set("phone", initialPhone);
    router.replace(`/search?${params.toString()}`);

    await runSearch(waybillId, initialPhone || undefined, initialCourier || undefined);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearched(false);
    setResult(null);
    setError("");
    router.replace("/search");
  };

  const handleCopyShortLink = async () => {
    if (copied) return;

    let url = shortUrl;
    if (!url && result) {
      try {
        const res = await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courier: initialCourier,
            waybill: result.waybill_id,
            phone: initialPhone || undefined,
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { id: string };
          url = `${window.location.origin}/t/${data.id}/`;
          setShortUrl(url);
        }
      } catch {
        return;
      }
    }

    if (url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const trackingHref = (waybillId: string) => {
    const params = new URLSearchParams({ q: waybillId });
    if (initialCourier) params.set("courier", initialCourier);
    if (initialCourier === "koombiyo" && initialPhone) params.set("phone", initialPhone);
    return `/tracking/?${params.toString()}`;
  };

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-0 sm:px-0">
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
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter tracking number"
              autoComplete="off"
              spellCheck={false}
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
              <>
              <Link
                href={trackingHref(result.waybill_id)}
                className="block overflow-hidden rounded-3xl border bg-card transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 p-4 sm:p-6">
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

                <div className="flex items-center justify-between gap-3 border-t p-4 sm:p-6">
                  <div
                    className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 ${
                      isSuccessStatus(result.current_status)
                        ? "border-emerald-300/80 bg-emerald-50 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300"
                        : "border-orange-300/80 bg-orange-50 text-orange-600 dark:border-orange-700/60 dark:bg-orange-900/20 dark:text-orange-300"
                    }`}
                  >
                    <Package className="size-4" />
                    <span className="text-sm font-semibold">{formatStatusText(result.current_status)}</span>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-orange-500 sm:text-base">
                    <span>Tracking history</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-end gap-2 pt-1">
                {shortUrl ? (
                  <>
                    <span className="truncate font-mono text-xs text-muted-foreground">{shortUrl}</span>
                    <button
                      type="button"
                      onClick={handleCopyShortLink}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                    >
                      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleCopyShortLink}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-orange-300 hover:text-orange-500 dark:hover:bg-orange-900/20"
                  >
                    <Link2 className="size-3.5" />
                    Short link for SMS
                  </button>
                )}
              </div>
              </>
            ) : (
              <div className="rounded-3xl border bg-card px-5 py-12 text-center sm:px-10">
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
