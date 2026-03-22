"use client";

import { CoreProtocolInvariants } from "@/components/core-protocol-invariants";
import { FlowVisualizer } from "@/components/flow-visualizer";
import { Hero } from "@/components/hero";
import { ProtocolOverview } from "@/components/protocol-overview";
import { RiskGrid } from "@/components/risk-grid";
import { SourceDrawer } from "@/components/source-drawer";
import { VaultComparison } from "@/components/vault-comparison";
import { VaultProvider } from "@/components/vault-context";
import { VaultSwitcher } from "@/components/vault-switcher";
import { AFI_SOURCE_DOCS_URL } from "@/data/afi";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <VaultProvider>
        <VaultSwitcher />
        <ProtocolOverview />
        <CoreProtocolInvariants />
        <VaultComparison />
        <FlowVisualizer />
        <RiskGrid />
        <SourceDrawer />
      </VaultProvider>
      <footer className="border-t border-border/80 py-10 text-center">
        <p className="mx-auto max-w-2xl text-[0.7rem] leading-relaxed text-muted-foreground/90">
          This interface is an independent research interpretation based on
          public AFI documentation. It is not an official dashboard and does not
          constitute financial advice.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          <a
            href={AFI_SOURCE_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline-offset-4 hover:underline"
          >
            View Source Documentation
          </a>
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          <a href="#protocol" className="underline-offset-4 hover:underline">
            Protocol overview
          </a>
          {" · "}
          <a
            href="#core-invariants"
            className="underline-offset-4 hover:underline"
          >
            Core invariants
          </a>
          {" · "}
          <a href="#vaults" className="underline-offset-4 hover:underline">
            Vaults
          </a>
          {" · "}
          <a
            href="#how-it-works"
            className="underline-offset-4 hover:underline"
          >
            How it works
          </a>
          {" · "}
          <a href="#risks" className="underline-offset-4 hover:underline">
            Risks
          </a>
        </p>
      </footer>
    </main>
  );
}
