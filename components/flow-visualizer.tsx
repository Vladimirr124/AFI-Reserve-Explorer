"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GitBranch, Link2, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POR_FLOW_BY_VAULT } from "@/data/afi";
import { cn } from "@/lib/utils";
import type { PorFlowStep } from "@/types/afi";

import { useVault } from "./vault-context";

const STEPS: { id: PorFlowStep; label: string; hint: string }[] = [
  {
    id: "without-por",
    label: "Without AFI PoR",
    hint: "Disconnected off-chain reports",
  },
  {
    id: "with-por",
    label: "With AFI PoR",
    hint: "On-chain lock on rwaUSDi",
  },
  {
    id: "invariants",
    label: "Core invariants",
    hint: "Logic gates",
  },
];

function FlowNode({
  node,
  muted,
}: {
  node: { id: string; label: string; sublabel?: string };
  muted?: boolean;
}) {
  return (
    <motion.div
      layout
      className={cn(
        "flex min-w-[7.5rem] max-w-[9.5rem] flex-col rounded-lg border bg-card px-3 py-2 text-center shadow-sm ring-1 ring-foreground/5",
        muted && "border-dashed opacity-80"
      )}
    >
      <span className="text-xs font-semibold leading-snug text-foreground">
        {node.label}
      </span>
      {node.sublabel ? (
        <span className="mt-0.5 text-[0.65rem] text-muted-foreground">
          {node.sublabel}
        </span>
      ) : null}
    </motion.div>
  );
}

export function FlowVisualizer() {
  const { vaultType } = useVault();
  const [step, setStep] = useState<PorFlowStep>("without-por");

  const content = POR_FLOW_BY_VAULT[vaultType][step];

  const orderedNodes = useMemo(() => {
    return content.nodes;
  }, [content.nodes]);

  const edgeBetween = (a: string, b: string) =>
    content.edges.find((e) => e.from === a && e.to === b);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-b border-border/60 bg-slate-50/40 py-16"
    >
      <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Reserve logic visualizer
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How attestation, locking, and invariants relate
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Toggle the three reading modes. Animations illustrate how public
            documentation frames off-chain evidence, on-chain rwaUSDi locks, and
            the inequalities analysts watch—without implying live verification
            from this static page.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {STEPS.map((s) => {
            const active = step === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={cn(
                  "flex flex-1 flex-col rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  active
                    ? "border-foreground/30 bg-card shadow-sm ring-1 ring-foreground/10"
                    : "border-border/80 bg-background hover:bg-muted/40"
                )}
              >
                <span className="flex items-center gap-2 font-medium text-foreground">
                  {s.id === "without-por" ? (
                    <ShieldAlert className="size-4 text-amber-700/80" />
                  ) : s.id === "with-por" ? (
                    <Link2 className="size-4 text-slate-700" />
                  ) : (
                    <GitBranch className="size-4 text-slate-700" />
                  )}
                  {s.label}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {s.hint}
                </span>
              </button>
            );
          })}
        </div>

        <Card className="overflow-hidden border-border/80 bg-card/90 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-muted/20">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base">{content.title}</CardTitle>
              <Badge variant="secondary" className="font-normal">
                {vaultType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${vaultType}-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {content.summary}
                </p>

                {step !== "invariants" ? (
                  <div className="overflow-x-auto pb-2">
                    <div className="flex min-w-min items-stretch gap-2 py-2">
                      {orderedNodes.map((node, index) => {
                        const next = orderedNodes[index + 1];
                        const e = next ? edgeBetween(node.id, next.id) : null;
                        const dashed = e?.dashed;
                        return (
                          <div
                            key={node.id}
                            className="flex items-center gap-2"
                          >
                            <FlowNode node={node} muted={dashed} />
                            {next ? (
                              <div className="flex flex-col items-center gap-1 px-1">
                                <ArrowRight
                                  className={cn(
                                    "size-4 shrink-0",
                                    dashed
                                      ? "text-amber-700/70"
                                      : "text-slate-500"
                                  )}
                                />
                                {e?.label ? (
                                  <span className="max-w-[4.5rem] text-center text-[0.65rem] text-muted-foreground">
                                    {e.label}
                                  </span>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    {content.invariants?.map((inv, i) => (
                      <motion.div
                        key={inv.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="rounded-xl border border-border/80 bg-muted/10 p-4 ring-1 ring-foreground/5"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <Badge variant="outline" className="font-mono text-[0.65rem]">
                            GATE {i + 1}
                          </Badge>
                          <span className="text-[0.65rem] text-muted-foreground">
                            read as constraint
                          </span>
                        </div>
                        <p className="font-mono text-xs font-semibold text-foreground">
                          {inv.expression}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {inv.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {content.callout ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 }}
                    className="rounded-lg border border-dashed border-amber-700/30 bg-amber-50/60 px-4 py-3 text-xs leading-relaxed text-amber-950/90 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-50"
                  >
                    {content.callout}
                  </motion.div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
