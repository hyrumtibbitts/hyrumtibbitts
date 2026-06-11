import { AlertTriangle } from "lucide-react";

/** Shown when Supabase env vars are missing so the app fails loud, not silent. */
export function ConfigNotice({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-2xl border border-flag/40 bg-flag-soft p-5 text-ink">
        <div className="mb-2 flex items-center gap-2 font-semibold text-flag">
          <AlertTriangle className="h-5 w-5" />
          Setup needed
        </div>
        <p className="text-sm text-ink-soft">{message}</p>
        <p className="mt-3 text-sm text-ink-soft">
          Copy <code className="rounded bg-cream-deep px-1">.env.example</code> to{" "}
          <code className="rounded bg-cream-deep px-1">.env.local</code>, fill in the
          values, then restart the dev server.
        </p>
      </div>
    </div>
  );
}
