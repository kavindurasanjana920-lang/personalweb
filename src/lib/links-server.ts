import { existsSync, readFileSync } from "fs";
import { join } from "path";

export type LinkData = { courier: string; waybill: string; phone?: string };

export function resolveLink(id: string): LinkData | null {
  try {
    const file = join(process.cwd(), "data", "links.json");
    if (!existsSync(file)) return null;
    const links = JSON.parse(readFileSync(file, "utf8")) as Record<string, LinkData>;
    return links[id] ?? null;
  } catch {
    return null;
  }
}
