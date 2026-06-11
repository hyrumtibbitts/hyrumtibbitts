import Link from "next/link";
import { Radio } from "lucide-react";

export function AppHeader({
  title,
  back,
  right,
}: {
  title?: string;
  back?: { href: string; label?: string };
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
        {back ? (
          <Link
            href={back.href}
            className="text-sm font-medium text-blue-dark hover:underline"
          >
            ← {back.label ?? "Back"}
          </Link>
        ) : (
          <Link href="/jobs" className="flex items-center gap-2 text-peach-dark">
            <Radio className="h-5 w-5" />
            <span className="font-semibold tracking-tight">FieldCapture</span>
          </Link>
        )}
        {title && (
          <h1 className="truncate text-base font-semibold text-ink">{title}</h1>
        )}
        <div className="ml-auto">{right}</div>
      </div>
    </header>
  );
}
