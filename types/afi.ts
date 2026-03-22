export type VaultType = "afiUSD" | "afi-rwaUSDi";

export type PorFlowStep = "without-por" | "with-por" | "invariants";

export interface VaultMeta {
  id: VaultType;
  label: string;
  shortLabel: string;
  symbol: string;
}

export interface ComparisonHighlight {
  title: string;
  bullets: string[];
  footnote?: string;
}

export interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface FlowInvariant {
  id: string;
  expression: string;
  description: string;
}

export interface PorFlowStateContent {
  title: string;
  summary: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  callout?: string;
  invariants?: FlowInvariant[];
}

export interface RiskItem {
  id: string;
  title: string;
  summary: string;
  severityLabel: "Structural" | "Market" | "Operational";
}

export interface InternalCriterion {
  id: string;
  title: string;
  detail: string;
}

export interface AuditRef {
  firm: string;
  scope: string;
  status: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface SourceRef {
  title: string;
  url: string;
  note?: string;
}

export interface ProtocolOverviewCopy {
  institutionalTitle: string;
  institutionalBody: string;
  vaultNote: string;
}

export interface CoreProtocolInvariantCard {
  id: string;
  title: string;
  expression: string;
  note?: string;
}

export interface HeroCopy {
  title: string;
  subtitle: string;
  ctas: { label: string; targetId: string }[];
}
