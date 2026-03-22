"use client";

import { BadgeCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CORE_PROTOCOL_INVARIANTS_BY_VAULT } from "@/data/afi";

import { useVault } from "./vault-context";

export function CoreProtocolInvariants() {
  const { vaultType } = useVault();
  const items = CORE_PROTOCOL_INVARIANTS_BY_VAULT[vaultType];

  return (
    <section
      id="core-invariants"
      className="scroll-mt-28 border-b border-border/60 bg-gradient-to-b from-slate-50/60 to-background py-16"
    >
      <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Design constraints
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Core Protocol Invariants
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Documented structural expectations for{" "}
            <span className="font-medium text-foreground">{vaultType}</span>,
            framed as interpretive constraints—not runtime assertions from this
            interface.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col border-border bg-card/95 shadow-sm ring-1 ring-foreground/5"
            >
              <CardHeader className="space-y-3 pb-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                  <CardTitle className="text-sm font-semibold leading-snug text-foreground">
                    {item.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="w-fit shrink-0 gap-1 border border-emerald-700/20 bg-emerald-50/90 pl-1.5 pr-2 font-normal text-emerald-900 dark:border-emerald-500/25 dark:bg-emerald-950/40 dark:text-emerald-100"
                  >
                    <BadgeCheck
                      className="size-3.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                      aria-hidden
                    />
                    Verified by Design
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-0">
                <p className="font-mono text-xs font-semibold leading-relaxed text-foreground">
                  {item.expression}
                </p>
                {item.note ? (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
