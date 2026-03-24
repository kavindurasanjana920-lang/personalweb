"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, MapPin, Package, Search, Truck } from "lucide-react";

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
  const endpoints = [`https://api.consumer.oms.parallaxtec.dev/api/tracking?waybill_id=${encodedWaybill}`];

  let lastError = "Request failed";

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
    error: lastError,
  };
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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

function formatPartnerName(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "transexpress") {
    return "Trans Express";
  }

  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function splitRemarks(remarks?: string | null) {
  if (!remarks) {
    return { main: "", bracket: "" };
  }

  const match = remarks.match(/^(.*?)(\s*\((.*?)\))?$/);
  if (!match) {
    return { main: remarks, bracket: "" };
  }

  return {
    main: match[1]?.trim() ?? "",
    bracket: match[3]?.trim() ?? "",
  };
}

export default function TrackingDetailsClient() {
  const searchParams = useSearchParams();
  const waybill = useMemo(() => (searchParams.get("q") ?? "").trim().toUpperCase(), [searchParams]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TrackingData | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!waybill) {
        setResult(null);
        setError("Missing tracking number");
        return;
      }

      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetchTrackingData(waybill);

      if (!active) {
        return;
      }

      if (response.success && response.data) {
        setResult(response.data);
        setError("");
      } else {
        setResult(null);
        setError(response.error || "No orders found");
      }

      setLoading(false);
    };

    void run();

    return () => {
      active = false;
    };
  }, [waybill]);

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-3 text-slate-800 dark:text-zinc-100 sm:px-0">
      <div className="flex items-center justify-between">
        <Link
          href={waybill ? `/search/?q=${encodeURIComponent(waybill)}` : "/search/"}
          aria-label="Back to search"
          className="rounded-lg p-2 text-[#f08a00] transition hover:bg-[#fff4e8] dark:hover:bg-[#2a1b09]"
        >
          <ArrowLeft className="size-7" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-3xl">Tracking Details</h1>
        <button
          type="button"
          aria-label="Search"
          className="grid size-11 place-items-center rounded-full bg-[#ff7a00] text-white shadow-sm"
        >
          <Search className="size-5" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-32 animate-pulse rounded-3xl bg-muted/40" />
          <div className="h-64 animate-pulse rounded-3xl bg-muted/40" />
        </div>
      ) : null}

      {!loading && error ? (
        <div className="rounded-3xl border border-[#dfe3e8] bg-white px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:px-10">
          <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-zinc-100 sm:text-4xl">No Orders Found</h2>
          <p className="mx-auto max-w-md text-base text-slate-500 dark:text-zinc-400 sm:text-lg">{error}</p>
        </div>
      ) : null}

      {!loading && result ? (
        <div className="space-y-5">
          <section className="rounded-3xl border border-[#dfe3e8] bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase text-slate-900 dark:text-zinc-100 sm:text-3xl">{result.waybill_id}</h2>
                <p className="mt-1 text-base text-slate-500 dark:text-zinc-400 sm:text-lg">
                  {formatPartnerName(result.delivery_partner?.name || "Delivery Partner")}
                </p>
                <p className="mt-2 text-base text-slate-500 dark:text-zinc-400">Order Placed on {formatDateTime(result.order_date)}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-[#ffd8a8] bg-[#fff4e8] px-4 py-2 text-[#de7b00] dark:border-[#5c3b16] dark:bg-[#2a1b09] dark:text-[#ffb25c]">
                  <Package className="size-4" />
                  <span className="text-sm font-semibold">{formatStatusText(result.current_status)}</span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 sm:text-3xl">LKR {Number(result.total).toLocaleString()}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400 sm:text-base">{formatDateTime(result.order_date)}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#dfe3e8] bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-zinc-100 sm:text-xl">
              <Clock3 className="size-5 text-[#de7b00]" />
              Tracking History
            </h3>
            <div className="space-y-5">
              {result.tracking_history?.map((item, index) => {
                const { main, bracket } = splitRemarks(item.remarks);

                return (
                  <div key={`${item.status_created_at}-${item.status_name}-${index}`} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <span className="block size-6 rounded-full bg-[#22c55e]" />
                      {index !== (result.tracking_history?.length ?? 0) - 1 ? <span className="mt-2 h-full w-1 rounded-full bg-[#22c55e]" /> : null}
                    </div>

                    <div className="pb-1">
                      <p className="text-sm text-slate-500 dark:text-zinc-400">{formatDateTime(item.status_created_at)}</p>
                      <p className="mt-1 text-base font-semibold text-slate-900 dark:text-zinc-100 sm:text-lg">{formatStatusText(item.status_name)}</p>
                      {main ? <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400 sm:text-base">{main}</p> : null}
                      {bracket ? <p className="text-xs text-slate-400 dark:text-zinc-500 sm:text-sm">({bracket})</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#dfe3e8] bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-zinc-100 sm:text-xl">
              <Package className="size-5 text-[#de7b00]" />
              Package Details
            </h3>
            <div className="space-y-3 divide-y">
              <div className="flex items-center justify-between gap-4 pb-3">
                <p className="text-base text-slate-500 dark:text-zinc-400 sm:text-lg">Total Amount</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-zinc-100 sm:text-2xl">Rs. {Number(result.total).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3 pb-3">
                <p className="text-base text-slate-500 dark:text-zinc-400 sm:text-lg">Estimated Delivery</p>
                <p className="text-sm font-medium text-slate-800 dark:text-zinc-200 sm:text-base">{formatDateTime(result.estimated_time_arrival)}</p>
              </div>
              <div className="flex items-start justify-between gap-4 pt-3 pb-3">
                <p className="text-base text-slate-500 dark:text-zinc-400 sm:text-lg">Address</p>
                <p className="max-w-[65%] text-right text-sm text-slate-800 dark:text-zinc-200 sm:text-base">{result.address || "N/A"}</p>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3">
                <p className="text-base text-slate-500 dark:text-zinc-400 sm:text-lg">Payment</p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                    result.is_payed
                      ? "bg-[#dcfce7] text-[#15803d]"
                      : "bg-[#fef3c7] text-[#b45309]"
                  }`}
                >
                  <CheckCircle2 className="size-4" />
                  {result.is_payed ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#dfe3e8] bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-zinc-100 sm:text-xl">
              <Truck className="size-5 text-[#de7b00]" />
              Delivery Partner
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] p-4 dark:border-zinc-700">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100">{formatPartnerName(result.delivery_partner?.name || "Unknown")}</p>
                  <p className="text-base text-slate-500 dark:text-zinc-400">{result.delivery_partner?.tag_line || "Fast & Reliable Delivery"}</p>
                </div>
                <span className="rounded-full bg-[#dcfce7] px-4 py-1 text-base font-semibold text-[#15803d]">
                  {formatStatusText(result.delivery_partner?.status || "Active")}
                </span>
              </div>

              <div className="space-y-3 divide-y">
                <div className="flex items-center justify-between gap-4 pb-3">
                  <p className="text-base text-slate-500 dark:text-zinc-400 sm:text-lg">Service Type</p>
                  <p className="text-base text-slate-800 dark:text-zinc-200 sm:text-lg">{formatStatusText(result.delivery_partner?.service_type || "N/A")}</p>
                </div>
                <div className="flex items-center justify-between gap-4 pt-3">
                  <p className="inline-flex items-center gap-2 text-base text-slate-500 dark:text-zinc-400 sm:text-lg">
                    <MapPin className="size-4 text-[#de7b00]" />
                    Delivery Hub
                  </p>
                  <p className="text-right text-base text-slate-800 dark:text-zinc-200 sm:text-lg">{result.delivery_partner?.delivery_hub || "N/A"}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
