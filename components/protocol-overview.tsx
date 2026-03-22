"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROTOCOL_OVERVIEW_BY_VAULT, PROTOCOL_DIAGRAM_LABELS } from "@/data/afi";

import { useVault } from "./vault-context";

export function ProtocolOverview() {
  const { vaultType } = useVault();
  const copy = PROTOCOL_OVERVIEW_BY_VAULT[vaultType];

  return (
    <section id="protocol" className="scroll-mt-28 border-b border-border/60 py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Protocol overview
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            From real-world collateral to receipt tokens
          </h2>
        </div>

        <Card className="overflow-hidden border-border/80 bg-card/90 shadow-sm ring-1 ring-foreground/5">
          <CardHeader className="border-b border-border/60 bg-muted/15">
            <CardTitle className="text-base">End-to-end diagram</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="overflow-x-auto rounded-lg border border-dashed border-border/80 bg-slate-50/50 p-6">
              <div className="flex min-w-min flex-wrap items-center gap-3">
                {PROTOCOL_DIAGRAM_LABELS.map((label, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="rounded-lg border border-border bg-background px-4 py-3 text-center shadow-sm">
                      <span className="text-sm font-medium text-foreground">
                        {label}
                      </span>
                    </div>
                    {i < PROTOCOL_DIAGRAM_LABELS.length - 1 ? (
                      <span
                        className="text-lg text-muted-foreground"
                        aria-hidden
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {copy.institutionalTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy.institutionalBody}
              </p>
              <p className="rounded-md border border-border/70 bg-muted/20 px-3 py-2 text-sm leading-relaxed text-foreground/90">
                <span className="font-medium text-foreground">Vault lens: </span>
                {copy.vaultNote}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
