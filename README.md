Below is the documentation of what I built.
Timings are Friday night:
* 20 mins scribbling an architecture design out in a note book.
* 20 mins converting this to /docs/implementation.md
* 30 mins for Opus to implement (about 5 mins to write all the code then 25 mins googling npm package version issues....)
* another 10 mins reviewing and design tweaks
* 20 mins modifying the code to work in production (hosted in vercel see /docks/vercel-cli.md)

All AI commands are audited in Audit.md and CommandsAudit.md

To run `npm i`  I built this on MacOS node v24, but tested on a windows machine node v22 and it worked also.
`npm run dev` Will spawn two apps, `http://localhost:3000/product` my ecom shop, and `http://localhost:3001/product` my independent flag manager.

These are deployed on `https://flag-manager-fawn.vercel.app/product` and `https://shop-three-beta-95.vercel.app/product` though I suspect your firewall might block them as they are new urls.

My reasoning around why using AI for it all, and not doing something more focussed and closer to the task. Party its some entitlement, I hope over 2 years I have demonstrated ability to program classically. Party because I know that AI can 'instantly' build out everything I designed, and I wanted to see how Module Federation has evolved since I last used it.

Architecturally I thought it would be interesting to see if I could implement something that meets the ask, with 0 performance and runtime impact on a production codebase.  While creating packages that allow for very minimal code changes to roll out A/B testing.




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
