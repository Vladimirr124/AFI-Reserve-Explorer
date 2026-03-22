# AFI Reserve Explorer — tech stack

Fixed stack for this project (do not change without explicit agreement):

| Layer | Choice |
|--------|--------|
| Framework | Next.js 14+ (App Router), TypeScript |
| Styling | Tailwind CSS 3.x, shadcn/ui (Base UI + Nova preset), `tailwindcss-animate` |
| Icons | Lucide React |
| Motion | Framer Motion |
| UI primitives | shadcn/ui: Tabs, Card, Accordion, Badge, Drawer (Vaul) |
| Data | Static constants in `@/data/afi.ts` |
| Types | `@/types/afi.ts` |

Rationale: App Router + static data keeps the explorer fast and easy to audit; Framer Motion is scoped to the reserve-flow visualizer for clear state transitions.
