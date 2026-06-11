import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "peach" | "blue" | "flag" | "good";

const tones: Record<Tone, string> = {
  neutral: "bg-cream-deep text-ink-soft",
  peach: "bg-peach-soft text-peach-dark",
  blue: "bg-blue-soft text-blue-dark",
  flag: "bg-flag-soft text-flag",
  good: "bg-[#e2f0e4] text-good",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
