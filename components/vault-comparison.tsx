"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COMPARISON, VAULTS } from "@/data/afi";
import { cn } from "@/lib/utils";
import type { VaultType } from "@/types/afi";

import { useVault } from "./vault-context";

export function VaultComparison() {
  const { vaultType } = useVault();

  return (
    <section id="vaults" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Vault comparison
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Side-by-side reading notes
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Cards are static summaries derived from how each vault is typically
            described. They highlight what to verify in code and disclosures—not
            performance claims.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {VAULTS.map((v) => {
            const active = vaultType === v.id;
            const data = COMPARISON[v.id as VaultType];
            return (
              <Card
                key={v.id}
                className={cn(
                  "border-border/80 bg-card/90 shadow-sm ring-1 transition-shadow",
                  active
                    ? "ring-2 ring-foreground/20 shadow-md"
                    : "ring-foreground/5"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg">{data.title}</CardTitle>
                    {active ? (
                      <Badge variant="default" className="font-normal">
                        Selected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="font-normal">
                        Context
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    Highlights for due-diligence readers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground marker:text-foreground/40">
                    {data.bullets.map((b) => (
                      <li key={b} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                  {data.footnote ? (
                    <p className="border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                      {data.footnote}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
