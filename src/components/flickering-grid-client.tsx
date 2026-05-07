"use client";
import dynamic from "next/dynamic";

const FlickeringGridDynamic = dynamic(
  () => import("@/components/magicui/flickering-grid").then((m) => m.FlickeringGrid),
  { ssr: false }
);

export function FlickeringGridClient(props: React.ComponentProps<typeof FlickeringGridDynamic>) {
  return <FlickeringGridDynamic {...props} />;
}
