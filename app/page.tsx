"use client";

import { FlowVisualizer } from "@/components/flow-visualizer";
import { Hero } from "@/components/hero";
import { ProtocolOverview } from "@/components/protocol-overview";
import { RiskGrid } from "@/components/risk-grid";
import { SourceDrawer } from "@/components/source-drawer";
import { VaultComparison } from "@/components/vault-comparison";
import { VaultProvider } from "@/components/vault-context";
import { VaultSwitcher } from "@/components/vault-switcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <VaultProvider>
        <VaultSwitcher />
        <ProtocolOverview />
        <VaultComparison />
        <FlowVisualizer />
        <RiskGrid />
        <SourceDrawer />
      </VaultProvider>
      <footer className="border-t border-border/80 py-10 text-center text-xs text-muted-foreground">
        <p>
          AFI Reserve Explorer — educational layout only. Not financial, legal,
          or security advice.
        </p>
        <p className="mt-2">
          <a href="#protocol" className="underline-offset-4 hover:underline">
            Protocol overview
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
