# ExperianShop Feature Flag Evaluator

npm workspaces monorepo with two Next.js apps demonstrating feature flag-driven A/B testing via Module Federation.

## Apps

| App | Port | Description |
|-----|------|-------------|
| **Shop** | 3000 | Next.js product page with 3 variant sets; hosts `/api/countries`, `/api/plans`, `/api/customers/:id` |
| **FlagManager** | 3001 | Next.js flag dashboard with evaluation engine, MockCustomer sidebar, and FlagConfig editor |

## Quick Start

```bash
npm install
npm run dev
```

Or run individually:

```bash
npm run dev:shop
npm run dev:flag-manager
```

## Architecture

- **Module Federation**: Shop exposes `ProductPage`, FlagManager exposes `TestDecider` and `FlagContext` -- bidirectional consumption
- **FlagContext dual mode**: `ApiFlagProvider` (POSTs to Flag Manager’s API, used in Shop) and `LocalFlagProvider` (in-memory evaluation, used in FlagManager)
- **TestDecider**: Reads variant from FlagContext and renders the matching component with a jazzy swap animation

## Tech Stack

- Next.js 14 (Pages Router)
- TypeScript
- StyleX
- Module Federation (`@module-federation/nextjs-mf`)
