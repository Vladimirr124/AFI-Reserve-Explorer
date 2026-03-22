# AFI Reserve Explorer

A reading-first interface for public materials on AFI vault structure, reserve logic, and common risks. It is **not** investment, legal, or security advice, and it does **not** stream live on-chain data.

**Live site:** [afi-reserve-explorer.vercel.app](https://afi-reserve-explorer.vercel.app/)

---

## What’s on the site

1. **Protocol overview** — the path from real-world assets to a receipt token (RWA → custodian → rwaUSDi → vault → share token), framed like ERC-4626-style descriptions in public docs.
2. **Two vaults** — switch between **afiUSD** and **afi-rwaUSDi**; copy and risk sections follow the selected vault.
3. **Comparison** — side-by-side cards focused on what to verify in code and disclosures, without performance claims.
4. **Reserve logic visualizer** — modes for “without AFI PoR,” off-chain reporting, on-chain rwaUSDi lock, and invariants: animations illustrate **how documentation frames** these ideas, not live verification.
5. **Risks** — protocol / market / counterparty grid, internal criteria, and audit references as pointers to public sources.

TVL and supply figures on the page are **static** and **not** streamed from the chain by design, so the site stays a honest “reading map” rather than a live dashboard.

---

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

---

## Editing copy and content structure

All narrative content lives in:

- **`data/afi.ts`** — copy, risk lists, vault comparison notes, glossary, audit links, and related constants.
- **`types/afi.ts`** — TypeScript types for that data.

After edits, a dev server restart is usually unnecessary; hot reload picks up changes. For production, deploy as you normally would (e.g. push to a Vercel-connected repo).

---

## Tech stack (short)

Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion for the “How it works” animations. Rationale and details: [`memory-bank/tech.md`](memory-bank/tech.md).

---

## Deployment

The app is deployed on **Vercel** (see link above). Any host that supports Next.js works: follow your platform’s guide after `npm run build`.

---

## Disclaimer

This interface is an **educational layout** based on public wording. For any decisions, rely on official AFI documentation, contracts on the networks you care about, and up-to-date disclosures.
