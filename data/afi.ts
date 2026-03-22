import type {
  AuditRef,
  ComparisonHighlight,
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
    "Understand vault structure, reserve logic, and protocol risks based on public documentation.",
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
    "Public materials describe an institutional framing: off-chain backed assets are custodied, represented on-chain (for example as rwaUSDi), and deposited into an AFI vault that issues an ERC-4626-style receipt token. This page maps that structure at a high level only; it is not investment advice.",
  vaultNote:
    "Narrative emphasis shifts by vault: afiUSD highlights exchange-rate mechanics and cross-chain distribution, while afi-rwaUSDi stresses 1:1 reserve alignment and institutional guardrails.",
};

export const PROTOCOL_OVERVIEW_BY_VAULT: Record<VaultType, ProtocolOverviewCopy> = {
  "afiUSD": {
    ...overviewBase,
    vaultNote:
      "For afiUSD, documentation commonly references a global exchange rate, yield vesting semantics, and cross-chain availability. Treat these as design claims to verify against deployed contracts and latest disclosures.",
  },
  "afi-rwaUSDi": {
    ...overviewBase,
    vaultNote:
      "For afi-rwaUSDi, materials emphasize 1:1 backing against reserves and an explicit invariant posture: circulating receipt supply should not exceed verified reserves. Always reconcile wording with on-chain supply and published attestations.",
  },
};

export const COMPARISON: Record<VaultType, ComparisonHighlight> = {
  "afiUSD": {
    title: "afiUSD",
    bullets: [
      "Yield vesting: accrual and distribution mechanics tied to vault design (verify schedule parameters in docs and contracts).",
      "Global exchange rate: user-facing conversion can differ from simple 1:1 mental models—trace share price / exchange-rate oracles.",
      "Cross-chain: bridging and liquidity venues introduce operational and bridge-risk surfaces beyond the core vault.",
    ],
    footnote:
      "Use this card as a reading guide: confirm each bullet against the specific network deployment you care about.",
  },
  "afi-rwaUSDi": {
    title: "afi-rwaUSDi",
    bullets: [
      "1:1 backing narrative: marketing language often implies tight pegging to reserve units—validate with attestation cadence and token decimals.",
      "Institutional focus: custody, onboarding, and eligibility constraints may apply; not all flows are permissionless in practice.",
      "Invariant (documented intent): circulating supply ≤ verified reserves—treat as a design goal enforced by operational + on-chain controls.",
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
        "Users must manually reconcile PDFs, emails, or dashboards with chain state—latency and interpretation risk remain.",
    },
    "with-por": {
      title: "With AFI PoR",
      summary:
        "Proof-of-reserve style workflows aim to bind published reserve figures to on-chain inventory—here, rwaUSDi is portrayed as the asset leg that must be locked before vault operations expand liability to users.",
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
        "On-chain enforcement is only as strong as oracle parameters, upgrade paths, and governance—read the actual contracts.",
    },
    "invariants": {
      title: "Core invariants (reading model)",
      summary:
        "These are logic gates useful when reading afiUSD documentation—not guaranteed properties unless the deployment proves them.",
      nodes: [],
      edges: [],
      invariants: [
        {
          id: "inv1",
          expression: "Vault assets ≥ Redeemable claims",
          description:
            "In a well-behaved ERC-4626 design, assets under management should cover outstanding shares at the stated exchange rate, modulo fees and timing.",
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
        "A 1:1 narrative without verifiable locking is a marketing claim until backed by attestations you can audit.",
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
        "The critical question is who can change mint permissions and how quickly—governance and upgrade risk still apply.",
    },
    "invariants": {
      title: "Core invariants (reading model)",
      summary:
        "afi-rwaUSDi materials often highlight a hard inequality between supply and reserves; treat the following as interpretive gates when reading docs.",
      nodes: [],
      edges: [],
      invariants: [
        {
          id: "inv1",
          expression: "Circulating afi-rwaUSDi ≤ Verified reserves",
          description:
            "The headline invariant: new supply should not appear without a matching reserve line item and on-chain lock.",
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
            "Stale attestations mean users are trusting outdated snapshots—frequency and scope matter.",
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
      "Independent reviews (for example Quantstamp and Cantina engagements referenced in public materials) reduce—but do not remove—implementation risk.",
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
    status: "Addressed & Verified",
  },
  {
    firm: "Cantina",
    scope: "Referenced in AFI public documentation",
    status: "Addressed & Verified",
  },
];

export const RISK_SCORE_DISCLAIMER =
  "Independent interface interpretation based on public docs.";

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
      "On-chain representation of real-world asset exposure within AFI’s documented stack; treat specifics as deployment-dependent.",
  },
  {
    term: "Receipt token",
    definition:
      "The vault share or liability token users hold; its economics depend on vault rules, fees, and bridging.",
  },
];

export const SOURCES: SourceRef[] = [
  {
    title: "AFI official documentation",
    url: "https://afi.xyz",
    note: "Replace with the exact doc URLs you rely on for research.",
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
