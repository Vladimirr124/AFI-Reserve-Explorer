"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { VaultType } from "@/types/afi";

type VaultContextValue = {
  vaultType: VaultType;
  setVaultType: (v: VaultType) => void;
};

const VaultContext = createContext<VaultContextValue | null>(null);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [vaultType, setVaultTypeState] = useState<VaultType>("afiUSD");

  const setVaultType = useCallback((v: VaultType) => {
    setVaultTypeState(v);
  }, []);

  const value = useMemo(
    () => ({ vaultType, setVaultType }),
    [vaultType, setVaultType]
  );

  return (
    <VaultContext.Provider value={value}>{children}</VaultContext.Provider>
  );
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    throw new Error("useVault must be used within VaultProvider");
  }
  return ctx;
}
