import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type LinkData = { courier: string; waybill: string; phone?: string };

const LINKS_FILE = join(process.cwd(), "data", "links.json");

function readLinks(): Record<string, LinkData> {
  try {
    if (!existsSync(LINKS_FILE)) return {};
    return JSON.parse(readFileSync(LINKS_FILE, "utf8")) as Record<string, LinkData>;
  } catch {
    return {};
  }
}

function writeLinks(links: Record<string, LinkData>): void {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(LINKS_FILE, JSON.stringify(links), "utf8");
}

function makeId(courier: string, waybill: string, phone: string): string {
  return createHash("sha256")
    .update(`${courier}:${waybill.toUpperCase()}:${phone}`)
    .digest("base64url")
    .slice(0, 8);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { courier?: string; waybill?: string; phone?: string };
  const { courier, waybill, phone = "" } = body;

  if (!courier || !waybill) {
    return NextResponse.json({ error: "Missing courier or waybill" }, { status: 400 });
  }

  const id = makeId(courier, waybill, phone);
  const links = readLinks();

  if (!links[id]) {
    links[id] = { courier, waybill: waybill.toUpperCase(), ...(phone ? { phone } : {}) };
    writeLinks(links);
  }

  return NextResponse.json({ id });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const link = readLinks()[id];
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(link);
}
