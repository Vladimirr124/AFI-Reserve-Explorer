"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  INTERNAL_CRITERIA,
  RISK_ITEMS_BY_VAULT,
  RISK_SCORE_DISCLAIMER,
  TRUST_AUDITS,
} from "@/data/afi";

import { useVault } from "./vault-context";

export function RiskGrid() {
  const { vaultType } = useVault();
  const risks = RISK_ITEMS_BY_VAULT[vaultType];

  return (
    <section id="risks" className="scroll-mt-28 space-y-12 py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Risk & security
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Protocol, market, and counterparty surfaces
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The grid below tracks the selected vault. It summarizes risk classes
            commonly discussed in public DeFi research and documentation—not a
            formal rating.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {risks.map((r) => (
            <Card
              key={r.id}
              className="border-border/80 bg-card/90 shadow-sm ring-1 ring-foreground/5"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0 font-normal">
                    {r.severityLabel}
                  </Badge>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  Vault: {vaultType}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {r.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/80 bg-slate-50/80 shadow-sm ring-1 ring-foreground/5">
            <CardHeader>
              <CardTitle className="text-base">AFI internal risk criteria</CardTitle>
              <CardDescription>
                Operational patterns often cited alongside institutional vaults.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion multiple={false} className="w-full">
                {INTERNAL_CRITERIA.map((c) => (
                  <AccordionItem key={c.id} value={c.id}>
                    <AccordionTrigger>{c.title}</AccordionTrigger>
                    <AccordionContent>{c.detail}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/90 shadow-sm ring-1 ring-foreground/5">
            <CardHeader>
              <CardTitle className="text-base">Risk stance panel</CardTitle>
              <CardDescription>
                Neutral framing for this explorer interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-amber-700/25 bg-amber-50/50 px-4 py-3 dark:border-amber-500/30 dark:bg-amber-500/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-950/90 dark:text-amber-100">
                  Independent interpretation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-amber-950/85 dark:text-amber-50/90">
                  {RISK_SCORE_DISCLAIMER}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Trust & audits
                </p>
                <ul className="space-y-3">
                  {TRUST_AUDITS.map((a) => (
                    <li
                      key={a.firm}
                      className="rounded-lg border border-border/70 bg-muted/20 px-3 py-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {a.firm}
                        </span>
                        <Badge variant="outline" className="font-normal">
                          {a.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.scope}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
