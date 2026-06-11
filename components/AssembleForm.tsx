"use client";

import { useState } from "react";
import { AlertTriangle, Plus, Trash2, CheckCircle2, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type {
  CorrectiveAction,
  HoursRow,
  Report,
  ReportHeader,
} from "@/lib/types";

export function AssembleForm({
  report,
  onChange,
}: {
  report: Report;
  onChange: (r: Report) => void;
}) {
  const [header, setHeader] = useState<ReportHeader>(
    report.header ?? ({} as ReportHeader),
  );
  const [actions, setActions] = useState<CorrectiveAction[]>(
    report.corrective_actions ?? [],
  );
  const [hours, setHours] = useState<HoursRow[]>(report.hours_table ?? []);
  const [signedBy, setSignedBy] = useState(report.verified_by ?? "");
  const [busy, setBusy] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const flags = report.flags ?? [];
  const verified = report.verified;

  function patchAction(i: number, patch: Partial<CorrectiveAction>) {
    setActions((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));
  }
  function patchHours(i: number, patch: Partial<HoursRow>) {
    setHours((prev) => prev.map((h, idx) => (idx === i ? { ...h, ...patch } : h)));
  }

  async function persist(verify: boolean) {
    setBusy(true);
    try {
      const supabase = getSupabaseBrowser();
      const update: Record<string, unknown> = {
        header,
        corrective_actions: actions,
        hours_table: hours,
        updated_at: new Date().toISOString(),
      };
      if (verify) {
        update.verified = true;
        update.verified_at = new Date().toISOString();
        update.verified_by = signedBy || "Field Engineer";
      }
      const { data, error } = await supabase
        .from("reports")
        .update(update)
        .eq("id", report.id)
        .select()
        .single();
      if (error) throw error;
      if (verify) {
        await supabase
          .from("jobs")
          .update({ status: "submitted" })
          .eq("id", report.job_id);
      }
      onChange(data as Report);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const headerFields: [keyof ReportHeader, string][] = [
    ["customer_name", "Customer"],
    ["system_description", "System"],
    ["city", "City"],
    ["state", "State"],
    ["control_number", "Control #"],
    ["call_number", "Call #"],
    ["service_arrival_date", "Arrival"],
    ["service_complete_date", "Complete"],
  ];

  return (
    <div className="space-y-6">
      {/* Global review banner */}
      {flags.length > 0 && !verified && (
        <Card className="border-flag/40 bg-flag-soft">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center gap-2 font-semibold text-flag">
              <AlertTriangle className="h-5 w-5" />
              Verify these before submitting
            </div>
            <p className="mb-2 text-sm text-ink-soft">
              Low-confidence items the transcription may have mis-heard. Confirm
              each against your notes.
            </p>
            <div className="flex flex-wrap gap-2">
              {flags.map((f, i) => (
                <Badge key={i} tone="flag">
                  {f}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header (stable site/job fields, pre-filled — editable) */}
      <Card>
        <CardContent>
          <h2 className="mb-3 font-semibold">Report header</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {headerFields.map(([key, label]) => (
              <div key={key}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={(header[key] as string | number | null) ?? ""}
                  onChange={(e) =>
                    setHeader((h) => ({ ...h, [key]: e.target.value || null }))
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Corrective Action entries */}
      <Card>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Corrective Action</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setActions((p) => [
                  ...p,
                  { date: "", narrative: "", flagged_terms: [] },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add day
            </Button>
          </div>
          {actions.length === 0 ? (
            <p className="text-sm text-ink-soft">No entries.</p>
          ) : (
            <div className="space-y-4">
              {actions.map((a, i) => (
                <div key={i} className="rounded-xl border border-line p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Input
                      value={a.date}
                      onChange={(e) => patchAction(i, { date: e.target.value })}
                      placeholder="M-D-YYYY"
                      className="h-9 w-36"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setActions((p) => p.filter((_, idx) => idx !== i))
                      }
                      className="ml-auto text-ink-soft hover:text-peach-dark"
                      aria-label="Remove entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Textarea
                    rows={4}
                    value={a.narrative}
                    onChange={(e) => patchAction(i, { narrative: e.target.value })}
                  />
                  {a.flagged_terms?.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      <span className="text-xs text-ink-soft">Verify:</span>
                      {a.flagged_terms.map((t, ti) => (
                        <Badge key={ti} tone="flag">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hours table */}
      <Card>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Hours</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setHours((p) => [
                  ...p,
                  { date: "", labor_hours: null, travel_hours: null, needs_review: true },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add row
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-cream-deep text-left text-ink-soft">
                <tr>
                  <th className="p-2 font-medium">Date</th>
                  <th className="p-2 font-medium">Labor hrs</th>
                  <th className="p-2 font-medium">Travel hrs</th>
                  <th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {hours.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-3 text-ink-soft">
                      No rows.
                    </td>
                  </tr>
                ) : (
                  hours.map((h, i) => (
                    <tr
                      key={i}
                      className={
                        h.needs_review ? "bg-flag-soft/60" : "odd:bg-cream/40"
                      }
                    >
                      <td className="p-1.5">
                        <Input
                          value={h.date}
                          onChange={(e) => patchHours(i, { date: e.target.value })}
                          placeholder="M-D-YYYY"
                          className="h-9"
                        />
                      </td>
                      <td className="p-1.5">
                        <Input
                          type="number"
                          step="0.5"
                          value={h.labor_hours ?? ""}
                          onChange={(e) =>
                            patchHours(i, {
                              labor_hours:
                                e.target.value === "" ? null : Number(e.target.value),
                              needs_review:
                                e.target.value === "" ? h.needs_review : false,
                            })
                          }
                          placeholder={h.needs_review ? "missing" : ""}
                          className="h-9"
                        />
                      </td>
                      <td className="p-1.5">
                        <Input
                          type="number"
                          step="0.5"
                          value={h.travel_hours ?? ""}
                          onChange={(e) =>
                            patchHours(i, {
                              travel_hours:
                                e.target.value === "" ? null : Number(e.target.value),
                            })
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="p-1.5 text-center">
                        {h.needs_review && (
                          <span title="Hours not stated — confirm">
                            <AlertTriangle className="mx-auto h-4 w-4 text-flag" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="sticky bottom-0 -mx-4 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
          {verified ? (
            <div className="flex items-center gap-2 font-medium text-good">
              <CheckCircle2 className="h-5 w-5" /> Verified &amp; submitted
            </div>
          ) : (
            <>
              <Input
                value={signedBy}
                onChange={(e) => setSignedBy(e.target.value)}
                placeholder="Signed off by"
                className="sm:max-w-xs"
              />
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => persist(false)}
                >
                  <Save className="h-4 w-4" /> Save draft
                </Button>
                <Button disabled={busy} onClick={() => persist(true)}>
                  <CheckCircle2 className="h-4 w-4" /> Verify &amp; submit
                </Button>
              </div>
            </>
          )}
          {savedAt && !verified && (
            <span className="text-xs text-ink-soft sm:ml-3">Saved {savedAt}</span>
          )}
        </div>
      </div>
    </div>
  );
}
