import { NextRequest, NextResponse } from "next/server";

const SERVICE_MAP: Record<string, string> = {
  "royal-express": "royalexpress",
  "citypak":       "citypak",
  "fardar":        "fardarexpress",
  "trans-express": "transexpress",
  "domex":         "domex",
};

// ── Koombiyo direct integration ──────────────────────────────────────────────
// koombiyodelivery.lk returns raw HTML; we parse it with regex (no cheerio).

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

interface KoombiyoParsed {
  waybillNo: string;
  collectedDate: string;
  receiverName: string;
  destinationBranch: string;
  status: string;
  trackingHistory: Array<{ status: string; isActive: boolean }>;
}

function parseKoombiyoHtml(html: string): KoombiyoParsed {
  if (!html.includes('id="track-det"') && !html.includes("id='track-det'")) {
    throw new Error("waybill number not found or invalid details");
  }

  const h6Match = html.match(/<h6[^>]*class="[^"]*fs-3[^"]*"[^>]*>([\s\S]*?)<\/h6>/);
  if (!h6Match) {
    throw new Error("waybill number not found or invalid details");
  }

  const waybillNo = stripTags(h6Match[1]).replace("Tracking ID:", "").trim();
  if (!waybillNo) {
    throw new Error("waybill number not found or invalid details");
  }

  let collectedDate = "";
  let receiverName = "";
  let destinationBranch = "";
  let status = "";

  const timelineDivs = html.match(/<div[^>]+class="col-md-4 my-1"[^>]*>[\s\S]*?<\/div>/g) ?? [];
  for (const div of timelineDivs) {
    const text = stripTags(div);
    if (text.includes("Collected Date:"))     collectedDate    = text.replace(/.*Collected Date:/, "").trim();
    else if (text.includes("Destination Branch:")) destinationBranch = text.replace(/.*Destination Branch:/, "").trim();
    else if (text.includes("Status:"))        status           = text.replace(/.*Status:/, "").trim();
    else if (text.includes("Name:"))          receiverName     = text.replace(/.*Name:/, "").trim();
  }

  const trackingHistory: Array<{ status: string; isActive: boolean }> = [];
  const stepRe = /<div[^>]+class="([^"]*\bstep\b[^"]*)"[^>]*>([\s\S]*?)<\/div>/g;
  let m: RegExpExecArray | null;
  while ((m = stepRe.exec(html)) !== null) {
    const spanMatch = m[2].match(/<span[^>]+class="[^"]*\btext\b[^"]*"[^>]*>([\s\S]*?)<\/span>/);
    if (spanMatch) {
      const statusText = stripTags(spanMatch[1]);
      if (statusText) {
        trackingHistory.push({ status: statusText, isActive: m[1].includes("active") });
      }
    }
  }

  return { waybillNo, collectedDate, receiverName, destinationBranch, status, trackingHistory };
}

function resolveCurrentStatus(
  trackingHistory: Array<{ status: string; isActive: boolean }>,
  fallback: string,
): string {
  if (fallback) return fallback;
  const active = trackingHistory.filter((s) => s.isActive);
  if (active.length > 0) return active[active.length - 1].status;
  if (trackingHistory.length > 0) return trackingHistory[trackingHistory.length - 1].status;
  return "Unknown";
}

async function trackKoombiyo(waybillId: string, phone: string): Promise<NextResponse> {
  if (!phone) {
    return NextResponse.json(
      { success: false, error: "Phone number is required for Koombiyo tracking" },
      { status: 400 },
    );
  }

  const url = `https://koombiyodelivery.lk/Track/track_id?id=${encodeURIComponent(waybillId)}&phone=${encodeURIComponent(phone)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Koombiyo service unavailable" }, { status: 502 });
    }

    const html = await res.text();

    let parsed: KoombiyoParsed;
    try {
      parsed = parseKoombiyoHtml(html);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: e instanceof Error ? e.message : "Failed to parse response" },
        { status: 404 },
      );
    }

    const data = {
      waybill_id: parsed.waybillNo,
      current_status: resolveCurrentStatus(parsed.trackingHistory, parsed.status),
      total: "0",
      estimated_time_arrival: "",
      address: [parsed.receiverName, parsed.destinationBranch].filter(Boolean).join(", "),
      is_payed: false,
      order_date: parsed.collectedDate,
      tracking_history: parsed.trackingHistory.map((h) => ({
        status_name: h.status,
        status_created_at: "",
        remarks: h.isActive ? "Active" : "",
      })),
      delivery_partner: {
        name: "koombiyodelivery",
        tag_line: "",
        service_type: "",
        delivery_hub: parsed.destinationBranch,
        status: "active",
      },
    };

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to reach Koombiyo service" }, { status: 502 });
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const waybillId = request.nextUrl.searchParams.get("waybill_id");
  const phone     = request.nextUrl.searchParams.get("phone");
  const courier   = request.nextUrl.searchParams.get("courier");

  if (!waybillId) {
    return NextResponse.json({ success: false, error: "Missing waybill_id" }, { status: 400 });
  }

  // Koombiyo: direct call to koombiyodelivery.lk — no backend involved
  if (courier === "koombiyo") {
    return trackKoombiyo(waybillId, phone ?? "");
  }

  // All other couriers go through the backend
  const base = process.env.BACKEND_API_URL ?? "https://api.consumer.oms.parallaxtec.dev";
  const upstream = new URL(`${base}/api/tracking`);
  upstream.searchParams.set("waybill_id", waybillId);

  const service = courier ? SERVICE_MAP[courier] : undefined;
  if (service) {
    upstream.searchParams.set("service", service);
  }

  try {
    const response = await fetch(upstream.toString(), {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();

    // Normalize: backend returns data as array, frontend expects single object
    if (Array.isArray(data.data)) {
      data.data = data.data[0] ?? null;
    }

    // Normalize: backend uses "message", frontend expects "error"
    if (!data.success && data.message && !data.error) {
      data.error = data.message;
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to reach tracking service" }, { status: 502 });
  }
}
