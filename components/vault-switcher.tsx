"use client";

import { VAULTS } from "@/data/afi";
import { cn } from "@/lib/utils";
import type { VaultType } from "@/types/afi";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useVault } from "./vault-context";

export function VaultSwitcher({ className }: { className?: string }) {
  const { vaultType, setVaultType } = useVault();

  return (
    <div
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Active vault context
          </p>
          <p className="text-sm text-foreground">
            Filtering overview, comparison, flow, and risk copy.
          </p>
        </div>
        <Tabs
          value={vaultType}
          onValueChange={(v) => setVaultType(v as VaultType)}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto">
            {VAULTS.map((v) => (
              <TabsTrigger
                key={v.id}
                value={v.id}
                className="min-w-[8rem] flex-1 sm:flex-none"
              >
                {v.shortLabel}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
