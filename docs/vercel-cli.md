# Deploying with the Vercel CLI

This repo has two Next.js apps that use Module Federation (`apps/shop`, `apps/flag-manager`). Create **one Vercel project per app**. Catalog data (`/api/countries`, `/api/plans`, `/api/customers/:id`) lives in **Shop**; Flag Manager’s MockCustomer calls those routes using `NEXT_PUBLIC_SHOP_ORIGIN`.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Node.js and npm (repo root: `npm install`)

Install the CLI globally (or use `npx vercel` instead of `vercel` below):

```bash
npm install -g vercel
```

## 1. Log in

```bash
vercel login
```

Follow the browser or email flow until the CLI reports success.

## 2. Deploy Flag Manager (first pass)

From the repo root, deploy with the app directory as the working directory so Vercel detects Next.js correctly:

```bash
cd apps/flag-manager
vercel
```

- Answer prompts: link to your account/team, set a project name (e.g. `experian-flag-manager`), confirm settings.
- First run is a **preview** deploy. Note the preview URL (e.g. `https://experian-flag-manager-xxx.vercel.app`).

Repeat for production when ready:

```bash
vercel --prod
```

Record the **production** URL; you need it for Shop’s build.

## 3. Deploy Shop (first pass)

```bash
cd ../shop
vercel
```

- Create a separate project (e.g. `experian-shop`).
- Run `vercel --prod` and note the **production** URL.

## 4. Set environment variables (both projects)

Variables must be present at **build** time for `NEXT_PUBLIC_*` (they are inlined into the client bundle).

### Flag Manager project

From `apps/flag-manager` (after `vercel link` if you opened a fresh shell):

```bash
cd apps/flag-manager
vercel env add NEXT_PUBLIC_SHOP_ORIGIN production
# paste: https://<your-shop>.vercel.app   (no trailing slash)

vercel env add NEXT_PUBLIC_FLAG_MANAGER_ORIGIN production
# paste: https://<this-flag-manager-app>.vercel.app
```

`NEXT_PUBLIC_SHOP_ORIGIN` is used for Module Federation (remote entry) and for MockCustomer’s fetches to Shop’s `/api/countries` and `/api/plans`.

Add the same keys for **preview** if you rely on preview deployments:

```bash
vercel env add NEXT_PUBLIC_SHOP_ORIGIN preview
vercel env add NEXT_PUBLIC_FLAG_MANAGER_ORIGIN preview
```

### Shop project

```bash
cd apps/shop
vercel env add NEXT_PUBLIC_FLAG_MANAGER_ORIGIN production
# paste: https://<your-flag-manager>.vercel.app
```

Repeat for **preview** if needed.

**Pull env to local files (optional):**

```bash
vercel env pull .env.local
```

## 5. Redeploy with correct remotes

The first deploys baked in `localhost` fallbacks if env vars were missing. After setting env vars, redeploy **both** apps so Module Federation URLs and `ApiFlagProvider` match production:

```bash
cd apps/flag-manager && vercel --prod
cd ../shop && vercel --prod
```

## 6. Ongoing workflow

- **Preview:** `vercel` (from `apps/shop` or `apps/flag-manager`).
- **Production:** `vercel --prod`.
- **Inspect:** `vercel ls`, `vercel inspect <deployment-url>`.

If you change a remote’s production URL (custom domain), update the other project’s `NEXT_PUBLIC_*` origins and run `vercel --prod` again on both.

## Catalog API (Shop)

Shop exposes Next.js API routes under `/api/*` with permissive CORS so Flag Manager (another origin) can load countries and plans in the browser. No separate API service is required.

## Quick reference — env vars

| Variable | Set on | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_SHOP_ORIGIN` | flag-manager | Module Federation remote; MockCustomer → Shop `/api/*` |
| `NEXT_PUBLIC_FLAG_MANAGER_ORIGIN` | shop, flag-manager | Module Federation remote; `ApiFlagProvider` base URL |

Use full origins with scheme (`https://...`), no trailing slash.

## Troubleshooting

### `TypeError: _resolveContext_stack.delete is not a function`

Next.js 14’s webpack plugin `OptionalPeerDependencyResolverPlugin` calls `.delete()` on `resolveContext.stack`, which must be a real `Set`. **`enhanced-resolve` 5.21+** switched the resolver stack to a `StackEntry` linked list that does not implement `.delete`, so webpack can throw this during `next build` (often on Vercel if the lockfile resolves `enhanced-resolve` to 5.21.x).

This repo pins **enhanced-resolve** to **5.20.1** via root `package.json` `overrides`, a direct dependency on both Next apps, and per-app `overrides` so installs still work if Vercel treats a single app directory as the install root. **Commit `package-lock.json`** and use **`npm ci`** on CI/Vercel so the lockfile is honored. After changing overrides, regenerate the lockfile (`rm package-lock.json && npm install`) if `npm ls enhanced-resolve` still shows 5.21.x.
