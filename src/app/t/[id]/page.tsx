import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { redirect } from "next/navigation";

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

export default async function ShortLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = resolveLink(id);

  if (!link) redirect("/");

  const qs = new URLSearchParams({ q: link.waybill, courier: link.courier });
  if (link.phone) qs.set("phone", link.phone);

  redirect(`/tracking/?${qs.toString()}`);
}
