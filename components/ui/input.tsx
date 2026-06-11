import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl border border-line bg-card px-3 text-base text-ink",
      "placeholder:text-ink-soft/60",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
