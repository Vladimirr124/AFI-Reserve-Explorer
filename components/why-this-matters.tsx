"use client";

import { Goal, Layers, Telescope } from "lucide-react";

import { RISK_SCORE_DISCLAIMER } from "@/data/afi";

const riskDisclaimerBody = RISK_SCORE_DISCLAIMER.replace(
  /^Independent interpretation:\s*/i,
  "",
);

const pillars = [
  {
    icon: Telescope,
    title: "The context",
    body:
      "RWA (real world assets) is growing rapidly, yet on-chain transparency often remains limited. This gap is structured to minimize blind spots for anyone evaluating how reserves are represented on-chain.",
  },
  {
    icon: Layers,
    title: "The solution",
    body:
      "AFI aims to address that gap with a Proof of Reserve posture and an ERC-4626 vault framework—both designed for transparency in how liabilities map to documented reserve rails.",
  },
  {
    icon: Goal,
    title: "The goal",
    body:
      "This explorer is designed to decode those technical layers into a clear narrative for integrators and researchers, without substituting for primary documentation or live contract state.",
  },
] as const;

export function WhyThisMatters() {
  return (
    <section
      id="why-this-matters"
      className="scroll-mt-28 border-b border-border/60 bg-background py-14"
      aria-labelledby="why-this-matters-heading"
    >
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Framing
          </p>
          <h2
            id="why-this-matters-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Why this matters
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-lg border border-border/70 bg-card/40 px-5 py-6 text-center shadow-sm ring-1 ring-foreground/5"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-muted/30 text-foreground/80">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl rounded-lg border border-amber-700/25 bg-amber-50/60 px-4 py-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-amber-950/90 dark:text-amber-100">
            Independent interpretation
          </p>
          <p className="mt-2 text-center text-sm leading-relaxed text-amber-950/90 dark:text-amber-50/90">
            {riskDisclaimerBody} This interface is an independent research
            view based on public materials; it is not an official dashboard and
            does not constitute financial advice. See also the{" "}
            <a
              href="#risks"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              risk dashboard
            </a>{" "}
            for the full stance panel.
          </p>
        </div>
      </div>
    </section>
  );
}
