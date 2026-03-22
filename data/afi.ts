import type {
  AuditRef,
  ComparisonHighlight,
  CoreProtocolInvariantCard,
  GlossaryEntry,
  HeroCopy,
  InternalCriterion,
  PorFlowStateContent,
  ProtocolOverviewCopy,
  RiskItem,
  SourceRef,
  VaultMeta,
  VaultType,
} from "@/types/afi";

/** Primary public documentation (GitBook). */
export const AFI_SOURCE_DOCS_URL = "https://docs.afiprotocol.ai/";

export const VAULTS: VaultMeta[] = [
  {
    id: "afiUSD",
    label: "afiUSD vault",
    shortLabel: "afiUSD",
    symbol: "afiUSD",
  },
  {
    id: "afi-rwaUSDi",
    label: "afi-rwaUSDi vault",
    shortLabel: "afi-rwaUSDi",
    symbol: "afi-rwaUSDi",
  },
];

export const HERO: HeroCopy = {
  title: "AFI Reserve Explorer",
  subtitle:
    "Map vault structure, reserve accounting, and documented risk surfaces using public materials as the sole input.",
  ctas: [
    { label: "Vaults", targetId: "vaults" },
    { label: "Risks", targetId: "risks" },
    { label: "How it works", targetId: "how-it-works" },
  ],
};

export const PROTOCOL_DIAGRAM_LABELS = [
  "Real World Assets",
  "Custodian",
  "rwaUSDi",
  "AFI Vault",
  "Receipt token",
] as const;

const overviewBase: ProtocolOverviewCopy = {
  institutionalTitle: "Institutional vault narrative (ERC-4626)",
  institutionalBody:
    "Public materials describe an institutional framing: off-chain backed assets are custodied, represented on-chain (for example as rwaUSDi), and allocated to an AFI vault that issues an ERC-4626-style receipt token. This page maps that structure at a high level only; it is not investment advice.",
  vaultNote:
    "Documentation emphasis differs by vault: afiUSD foregrounds exchange-rate mechanics and cross-chain distribution, whereas afi-rwaUSDi foregrounds reserve alignment and institutional guardrails.",
};

export const PROTOCOL_OVERVIEW_BY_VAULT: Record<VaultType, ProtocolOverviewCopy> = {
  "afiUSD": {
    ...overviewBase,
    vaultNote:
      "For afiUSD, documentation commonly references a global exchange rate, yield vesting semantics, and cross-chain availability. These should be treated as design claims and reconciled with deployed contracts and the latest disclosures.",
  },
  "afi-rwaUSDi": {
    ...overviewBase,
    vaultNote:
      "For afi-rwaUSDi, materials emphasize reserve alignment and an explicit inequality: circulating receipt supply is not to exceed verified reserves. Wording should be reconciled with on-chain supply and published attestations.",
  },
};

export const CORE_PROTOCOL_INVARIANTS_BY_VAULT: Record<
  VaultType,
  CoreProtocolInvariantCard[]
> = {
  "afi-rwaUSDi": [
    {
      id: "supply-cap",
      title: "Supply Cap",
      expression: "afi-rwaUSDi supply ≤ rwaUSDi locked in vault",
      note: "Maps receipt-token liability to the on-chain rwaUSDi position described as locked collateral.",
    },
    {
      id: "reserve-parity",
      title: "Reserve Parity",
      expression: "Circulating supply ≤ Verified reserves",
      note: "Parity is stated relative to attested reserve figures, not implied market prices.",
    },
    {
      id: "no-recursion",
      title: "No Recursion",
      expression: "Strictly no recursive minting or looping",
      note: "The documented model disallows mint paths that re-hypothecate receipt tokens into further mint pressure.",
    },
    {
      id: "asset-integrity",
      title: "Asset Integrity",
      expression: "No silent reserve redeployment or movement",
      note: "Reserve reallocations are expected to remain observable through custody and disclosure channels.",
    },
  ],
  "afiUSD": [
    {
      id: "supply-cap",
      title: "Supply Cap",
      expression: "afiUSD receipt supply ≤ rwaUSDi locked in vault",
      note: "Under the documented rail, rwaUSDi locked in the vault is the quantity tied to expanded receipt issuance.",
    },
    {
      id: "reserve-parity",
      title: "Reserve Parity",
      expression: "Outstanding claims ≤ Verified reserves",
      note: "ERC-4626 share price, fees, and vesting can modulate claim values; parity is assessed against published reserve methodology.",
    },
    {
      id: "no-recursion",
      title: "No Recursion",
      expression: "Strictly no recursive minting or looping",
      note: "Same structural expectation as rwaUSDi vault reading: no documented loop where receipts recursively back new mint.",
    },
    {
      id: "asset-integrity",
      title: "Asset Integrity",
      expression: "No silent reserve redeployment or movement",
      note: "Operational and attestation layers are the reference for whether reserve composition changes are disclosed.",
    },
  ],
};

export const COMPARISON: Record<VaultType, ComparisonHighlight> = {
  "afiUSD": {
    title: "afiUSD",
    bullets: [
      "Yield vesting: accrual and distribution follow vault parameters; schedule and eligibility should be verified in documentation and contracts.",
      "Global exchange rate: conversion semantics can depart from a simple 1:1 mental model—share price and oracle dependencies warrant explicit tracing.",
      "Cross-chain: bridging and secondary venues introduce operational and bridge-risk surfaces beyond the core vault.",
    ],
    footnote:
      "Use this card as a reading guide: confirm each bullet against the specific network deployment you care about.",
  },
  "afi-rwaUSDi": {
    title: "afi-rwaUSDi",
    bullets: [
      "Reserve peg framing: public copy often stresses tight alignment to reserve units—attestation cadence, decimals, and scope should be validated empirically.",
      "Institutional focus: custody, onboarding, and eligibility constraints may apply; not all flows are permissionless in practice.",
      "Documented inequality: circulating supply ≤ verified reserves—treated here as a design objective contingent on operational and on-chain controls.",
    ],
    footnote:
      "Supply and reserve figures move; this explorer does not stream live chain data.",
  },
};

export const POR_FLOW_BY_VAULT: Record<
  VaultType,
  Record<"without-por" | "with-por" | "invariants", PorFlowStateContent>
> = {
  "afiUSD": {
    "without-por": {
      title: "Without AFI PoR",
      summary:
        "Off-chain portfolio statements and custodian reporting can exist without a continuous, user-verifiable link to what the afiUSD vault actually holds on-chain.",
      nodes: [
        { id: "rwa", label: "Off-chain book", sublabel: "Statements" },
        { id: "cust", label: "Custodian", sublabel: "Reports" },
        { id: "por", label: "Disclosure gap", sublabel: "Not machine-verified" },
        { id: "vault", label: "afiUSD vault", sublabel: "On-chain" },
        { id: "rcpt", label: "Receipt", sublabel: "afiUSD" },
      ],
      edges: [
        { from: "rwa", to: "cust" },
        { from: "cust", to: "por", dashed: true },
        { from: "por", to: "vault", dashed: true },
        { from: "vault", to: "rcpt" },
      ],
      callout:
        "Reconciliation typically requires manual alignment of PDFs, emails, or dashboards with chain state—latency and interpretation risk remain.",
    },
    "with-por": {
      title: "With AFI PoR",
      summary:
        "Proof-of-reserve style workflows are described as binding published reserve figures to on-chain inventory; rwaUSDi is portrayed as the asset leg expected to be locked before the vault expands liability.",
      nodes: [
        { id: "rwa", label: "RWA stack", sublabel: "Custodied" },
        { id: "cust", label: "Attestation", sublabel: "Verifier / oracle" },
        { id: "lock", label: "rwaUSDi", sublabel: "Locked in vault" },
        { id: "vault", label: "afiUSD vault", sublabel: "ERC-4626" },
        { id: "rcpt", label: "Receipt", sublabel: "afiUSD" },
      ],
      edges: [
        { from: "rwa", to: "cust", label: "Evidence" },
        { from: "cust", to: "lock", label: "Mint / lock" },
        { from: "lock", to: "vault", label: "Collateral" },
        { from: "vault", to: "rcpt", label: "Issue" },
      ],
      callout:
        "On-chain enforcement strength is bounded by oracle parameters, upgrade paths, and governance; primary evidence remains the deployed contracts.",
    },
    "invariants": {
      title: "Core invariants (reading model)",
      summary:
        "Logic gates useful when reading afiUSD documentation; they are interpretive unless substantiated by deployment-specific evidence.",
      nodes: [],
      edges: [],
      invariants: [
        {
          id: "inv1",
          expression: "Vault assets ≥ Redeemable claims",
          description:
            "In a standard ERC-4626 reading, assets under management are expected to cover outstanding shares at the stated exchange rate, modulo fees and timing.",
        },
        {
          id: "inv2",
          expression: "Reported reserves ↔ Locked rwaUSDi",
          description:
            "If PoR ties off-chain reserves to rwaUSDi, breaks in this link imply the attestation or custody story diverged from chain reality.",
        },
        {
          id: "inv3",
          expression: "Bridge supply ≤ Source of truth",
          description:
            "Cross-chain deployments add the requirement that bridged representation does not exceed what the canonical vault authorizes.",
        },
      ],
    },
  },
  "afi-rwaUSDi": {
    "without-por": {
      title: "Without AFI PoR",
      summary:
        "Without a disciplined PoR loop, afi-rwaUSDi can trade as if fully reserved while off-chain books and on-chain locks drift apart.",
      nodes: [
        { id: "rwa", label: "RWA collateral", sublabel: "Off-chain" },
        { id: "cust", label: "Custodian", sublabel: "Manual attestation" },
        { id: "gap", label: "Unverified lock", sublabel: "Opaque" },
        { id: "vault", label: "afi-rwaUSDi vault", sublabel: "On-chain" },
        { id: "rcpt", label: "Receipt", sublabel: "afi-rwaUSDi" },
      ],
      edges: [
        { from: "rwa", to: "cust" },
        { from: "cust", to: "gap", dashed: true },
        { from: "gap", to: "vault", dashed: true },
        { from: "vault", to: "rcpt" },
      ],
      callout:
        "A tight peg narrative without verifiable locking remains an unsubstantiated claim until supported by attestations that admit independent audit.",
    },
    "with-por": {
      title: "With AFI PoR",
      summary:
        "PoR, in this reading, means rwaUSDi inventory is demonstrably locked on-chain before new liability (receipt supply) is justified.",
      nodes: [
        { id: "rwa", label: "RWA book", sublabel: "Verified" },
        { id: "cust", label: "Custodian + attestor", sublabel: "Signed data" },
        { id: "lock", label: "rwaUSDi", sublabel: "Locked" },
        { id: "vault", label: "afi-rwaUSDi vault", sublabel: "Mint control" },
        { id: "rcpt", label: "Receipt", sublabel: "afi-rwaUSDi" },
      ],
      edges: [
        { from: "rwa", to: "cust", label: "Marks" },
        { from: "cust", to: "lock", label: "Prove" },
        { from: "lock", to: "vault", label: "Backstop" },
        { from: "vault", to: "rcpt", label: "Mint cap" },
      ],
      callout:
        "Mint permission mutability and latency are central: governance and upgrade risk persist even when PoR is present.",
    },
    "invariants": {
      title: "Core invariants (reading model)",
      summary:
        "afi-rwaUSDi materials often foreground a supply–reserve inequality; the following items are interpretive gates when reading documentation.",
      nodes: [],
      edges: [],
      invariants: [
        {
          id: "inv1",
          expression: "Circulating afi-rwaUSDi ≤ Verified reserves",
          description:
            "Headline inequality: new supply is not expected without a matching reserve line item and on-chain lock.",
        },
        {
          id: "inv2",
          expression: "rwaUSDi (locked) ≥ Vault liability",
          description:
            "If rwaUSDi is the reserve rail, compare locked balances to vault obligations across chains.",
        },
        {
          id: "inv3",
          expression: "Attestation freshness ≥ Risk tolerance",
          description:
            "Stale attestations imply reliance on outdated snapshots; attestation frequency and scope are material to risk assessment.",
        },
      ],
    },
  },
};

export const RISK_ITEMS_BY_VAULT: Record<VaultType, RiskItem[]> = {
  "afiUSD": [
    {
      id: "protocol",
      title: "Protocol risk",
      summary:
        "Smart contract bugs, misconfigured ERC-4626 accounting, oracle errors, and emergency pause behavior can all affect redeemability.",
      severityLabel: "Structural",
    },
    {
      id: "market",
      title: "Market risk",
      summary:
        "Even with reserves, secondary-market pricing of afiUSD can diverge from model-implied value during stress or bridge fragmentation.",
      severityLabel: "Market",
    },
    {
      id: "counterparty",
      title: "Counterparty risk",
      summary:
        "Custodians, attestors, bridge operators, and governance multisigs are trust assumptions—not eliminated by PoR alone.",
      severityLabel: "Operational",
    },
  ],
  "afi-rwaUSDi": [
    {
      id: "protocol",
      title: "Protocol risk",
      summary:
        "Mint/burn permissions, upgradeable proxies, and incorrect reserve pegging logic can break the documented supply ≤ reserves story.",
      severityLabel: "Structural",
    },
    {
      id: "market",
      title: "Market risk",
      summary:
        "Liquidity for rwaUSDi or receipt tokens may thin during crises, forcing long unwinds independent of reserve quality.",
      severityLabel: "Market",
    },
    {
      id: "counterparty",
      title: "Counterparty risk",
      summary:
        "Institutional workflows concentrate reliance on regulated custodians and their reporting accuracy.",
      severityLabel: "Operational",
    },
  ],
};

export const INTERNAL_CRITERIA: InternalCriterion[] = [
  {
    id: "audits",
    title: "Audit coverage",
    detail:
      "Independent reviews (for example Quantstamp and Cantina engagements cited in public materials) are associated with lower residual implementation risk but do not eliminate it.",
  },
  {
    id: "tvl",
    title: "TVL thresholds",
    detail:
      "Higher TVL increases attacker incentives and operational complexity; many teams stage governance and risk parameters by size.",
  },
  {
    id: "depeg",
    title: "Depeg monitoring",
    detail:
      "Automated filters on oracle vs. market prices can trigger circuit breakers; understand who controls those levers.",
  },
];

export const TRUST_AUDITS: AuditRef[] = [
  {
    firm: "Quantstamp",
    scope: "Referenced in AFI public documentation",
    status: "Cited in public materials",
  },
  {
    firm: "Cantina",
    scope: "Referenced in AFI public documentation",
    status: "Cited in public materials",
  },
];

export const RISK_SCORE_DISCLAIMER =
  "Independent interpretation: this panel summarizes qualitative risk classes from public documentation. It is not a formal rating, audit finding, or live risk score.";

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "ERC-4626",
    definition:
      "Tokenized vault standard: shares represent claims on an underlying asset pool; convert using the vault’s exchange-rate logic.",
  },
  {
    term: "Proof of Reserve (PoR)",
    definition:
      "A family of processes that attempt to show custodied assets match liabilities, sometimes combining attestations with on-chain proofs.",
  },
  {
    term: "Attestation",
    definition:
      "A signed statement (often from a custodian or auditor) about asset balances or controls at a point in time.",
  },
  {
    term: "rwaUSDi",
    definition:
      "On-chain representation of real-world asset exposure within the documented AFI stack; specifics are deployment-dependent.",
  },
  {
    term: "Receipt token",
    definition:
      "The vault share or liability token users hold; its economics depend on vault rules, fees, and bridging.",
  },
];

export const SOURCES: SourceRef[] = [
  {
    title: "AFI documentation (GitBook)",
    url: AFI_SOURCE_DOCS_URL,
    note: "Primary public documentation used as the reference layer for this explorer.",
  },
  {
    title: "AFI project site",
    url: "https://afi.xyz",
  },
  {
    title: "ERC-4626 specification",
    url: "https://eips.ethereum.org/EIPS/eip-4626",
  },
  {
    title: "Base UI Tabs (component primitives)",
    url: "https://base-ui.com/react/components/tabs",
  },
];
