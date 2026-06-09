import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-32",
      bottom: "bottom-0",
      below: "-bottom-32",
      center: "top-1/2",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

function Glow({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof glowVariants>) {
  return (
    <div className={cn(glowVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          "absolute left-1/2 h-[360px] w-[70%] -translate-x-1/2 scale-[2.35] rounded-[50%] opacity-55 blur-3xl dark:opacity-45",
          "bg-[radial-gradient(circle_at_center,rgba(255,145,0,0.68)_0%,rgba(255,145,0,0.24)_38%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,145,0,0.46)_0%,rgba(255,145,0,0.16)_38%,transparent_70%)]",
          variant === "center" && "-translate-y-1/2"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 h-[220px] w-1/2 -translate-x-1/2 scale-[1.9] rounded-[50%] opacity-48 blur-2xl dark:opacity-38",
          "bg-[radial-gradient(circle_at_center,rgba(255,98,0,0.6)_0%,rgba(255,98,0,0.2)_45%,transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,98,0,0.4)_0%,rgba(255,98,0,0.14)_45%,transparent_72%)]",
          variant === "center" && "-translate-y-1/2"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 h-36 w-1/3 -translate-x-1/2 scale-[1.45] rounded-[50%] opacity-42 blur-xl dark:opacity-32",
          "bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.72)_0%,rgba(255,180,80,0.12)_50%,transparent_74%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.45)_0%,rgba(255,180,80,0.08)_50%,transparent_74%)]",
          variant === "center" && "-translate-y-1/2"
        )}
      />
    </div>
  );
}

export default Glow;