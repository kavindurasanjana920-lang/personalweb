"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock3, Package, Search, Truck } from "lucide-react";

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

function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return { date: dateString, time: "" };
  }
  return {
    date: date.toLocaleDateString("en-CA"),
    time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
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

function splitBracketStatus(status: string) {
  const formattedStatus = formatStatusText(status);
  const openIndex = formattedStatus.indexOf("(");
  const closeIndex = formattedStatus.lastIndexOf(")");

  if (openIndex === -1 || closeIndex === -1 || closeIndex < openIndex) {
    return { main: formattedStatus, bracket: "" };
  }

  const main = formattedStatus.slice(0, openIndex).trim();
  const bracket = formattedStatus.slice(openIndex, closeIndex + 1).trim();
  return { main, bracket };
}

export default function SearchDetailPage() {
  const params = useParams<{ waybillId: string }>();
  const waybillId = useMemo(() => decodeURIComponent(params.waybillId || "").toUpperCase(), [params.waybillId]);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const runSearch = async () => {
      if (!waybillId) {
        setError("Invalid waybill id");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setResult(null);

      try {
        const response = await fetch(`/api/tracking?waybill_id=${encodeURIComponent(waybillId)}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const data: ApiResponse = await response.json();

        if (!response.ok || !data.success || !data.data) {
          throw new Error(data.error || "No orders found");
        }

        setResult(data.data);
      } catch {
        setError("No orders found for this waybill");
      } finally {
        setLoading(false);
      }
    };

    void runSearch();
  }, [waybillId]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-4">
        <div className="h-28 animate-pulse rounded-3xl border bg-card" />
        <div className="h-64 animate-pulse rounded-3xl border bg-card" />
        <div className="h-32 animate-pulse rounded-3xl border bg-card" />
      </main>
    );
  }

  if (!result) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/search?q=${encodeURIComponent(waybillId)}`} className="rounded-lg p-2 text-orange-500 hover:bg-orange-500/10">
            <ArrowLeft className="size-7" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Order Details</h1>
          <Link href="/search" className="grid size-11 place-items-center rounded-full bg-orange-500 text-white hover:bg-orange-500/90">
            <Search className="size-5" />
          </Link>
        </div>

        <div className="rounded-3xl border bg-card p-8 text-center">
          <h2 className="text-2xl font-semibold">No Orders Found</h2>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <Link href="/search" className="mt-6 inline-flex rounded-xl border px-5 py-2.5 font-medium hover:bg-muted">
            Try Another Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/search?q=${encodeURIComponent(result.waybill_id)}`} className="rounded-lg p-2 text-orange-500 hover:bg-orange-500/10">
          <ArrowLeft className="size-7" />
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Order Details</h1>
          <p className="text-base text-muted-foreground sm:text-xl">{result.waybill_id}</p>
        </div>
        <Link href="/search" className="grid size-11 place-items-center rounded-full bg-orange-500 text-white hover:bg-orange-500/90">
          <Search className="size-5" />
        </Link>
      </div>

      <section className="rounded-3xl border bg-card p-6 sm:p-8">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-orange-300/80 bg-orange-50 px-4 py-2 text-orange-700 dark:border-orange-700/60 dark:bg-orange-900/20 dark:text-orange-300">
          <Package className="size-5" />
          <span className="text-2xl font-semibold sm:text-4xl">{formatStatusText(result.current_status)}</span>
        </div>
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">Order Placed on</p>
        <p className="text-4xl font-semibold sm:text-5xl">{formatDate(result.order_date)}</p>
      </section>

      <section className="rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold sm:text-2xl">
          <Clock3 className="size-6 text-orange-500" />
          Tracking Timeline
        </h2>

        <div className="space-y-6">
          {result.tracking_history.map((item, index) => {
            const time = formatDateAndTime(item.status_created_at);
            const isLast = index === result.tracking_history.length - 1;
            const statusParts = splitBracketStatus(item.status_name);
            return (
              <div key={`${item.status_name}-${item.status_created_at}-${index}`} className="grid grid-cols-[32px_1fr_auto] gap-4">
                <div className="flex flex-col items-center">
                  <span className="size-5 rounded-full bg-green-500" />
                  {!isLast ? <span className="mt-1 h-10 w-1 rounded bg-green-500" /> : null}
                </div>

                <div>
                  <p className="text-2xl font-medium leading-tight sm:text-3xl">{statusParts.main}</p>
                  {statusParts.bracket ? (
                    <p className="mt-1 text-base font-medium leading-tight text-muted-foreground sm:text-lg">{statusParts.bracket}</p>
                  ) : null}
                  {item.remarks ? <p className="mt-1 text-base text-muted-foreground sm:text-lg">{item.remarks}</p> : null}
                </div>

                <div className="text-right text-base text-muted-foreground sm:text-xl">
                  <p>{time.date}</p>
                  <p>{time.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold sm:text-2xl">
          <Package className="size-6 text-orange-500" />
          Package Details
        </h2>

        <div className="flex items-center justify-between border-t pt-5">
          <span className="text-2xl sm:text-4xl">Total Amount</span>
          <span className="text-2xl font-medium sm:text-4xl">Rs. {Number(result.total).toLocaleString()}</span>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold sm:text-2xl">
          <Truck className="size-6 text-orange-500" />
          Delivery Partner
        </h2>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold sm:text-4xl">{formatPartnerName(result.delivery_partner.name)}</p>
              <p className="text-base text-muted-foreground sm:text-lg">{result.delivery_partner.tag_line || "Fast & Reliable Delivery"}</p>
            </div>
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300 sm:text-base">
              {result.delivery_partner.status === "active" ? "Active" : result.delivery_partner.status}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4 text-lg sm:text-2xl">
            <span>Service Type:</span>
            <span className="text-muted-foreground">{result.delivery_partner.service_type}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
