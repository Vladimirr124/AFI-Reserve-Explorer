"use client";

import { buttonVariants } from "@/components/ui/button";
import { HERO, PROTOCOL_DIAGRAM_LABELS } from "@/data/afi";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <header className="border-b border-border/80 bg-gradient-to-b from-slate-50/80 to-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Research interface
          </p>
          <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {HERO.title}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {HERO.subtitle}
          </p>
          <nav
            className="flex flex-wrap gap-3 pt-2"
            aria-label="Section shortcuts"
          >
            {HERO.ctas.map((cta) => (
              <a
                key={cta.targetId}
                href={`#${cta.targetId}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "shadow-sm"
                )}
              >
                {cta.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="rounded-xl border border-dashed border-border/80 bg-card/60 p-6 ring-1 ring-foreground/5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            High-level custody rail
          </p>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/90">
            {PROTOCOL_DIAGRAM_LABELS.map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">
                  {label}
                </span>
                {i < PROTOCOL_DIAGRAM_LABELS.length - 1 ? (
                  <span className="text-muted-foreground" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}
