# Dream Chat Starter

A production-ready Next.js chat + pricing template with:

- App Router (Next.js 15)
- TypeScript
- Tailwind CSS
- shadcn-style UI (`/components/ui`)
- Dark/light theming via `next-themes`
- Integrated pricing section (using `lucide-react`, `framer-motion`)
- Ready for 1-click deploy on Vercel

After purchasing via Polar.sh, you get immediate access to this GitHub repo and can deploy in minutes.

---

## 1. Prerequisites

- Node.js 18+ (or Bun, recommended)
- pnpm / npm / yarn or Bun
- A Vercel account (for deployment)

If you use Bun (recommended, this repo is configured + lockfile included):

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## 2. Install dependencies

From the project root:

```bash
bun install
```

(If you prefer npm:)

```bash
npm install
```

Dependencies included:

- `next`, `react`, `react-dom`
- `tailwindcss`, `@tailwindcss/postcss`
- `class-variance-authority`, `@radix-ui/react-slot`
- `lucide-react`
- `framer-motion`
- `next-themes`

---

## 3. Configure Polar Integration

This template includes Polar.sh integration for payment processing. Follow these steps to set it up:

1. Copy `.env.example` to `.env.local` and fill in your actual values.

2. Obtain Polar credentials:
   1. Create a Polar account at [polar.sh](https://polar.sh)
   2. Create an organization in your Polar dashboard
   3. Create two products: one for Monthly subscription and one for One-time purchase
   4. Copy the Product IDs from the Polar dashboard for each product
   5. Generate an access token from Organization Settings > Access Tokens
   6. Generate a webhook secret from Organization Settings > Webhooks
   7. Configure the webhook URL in Polar dashboard: `https://yourdomain.com/api/polar/webhook`

3. Required environment variables:
   - `POLAR_ACCESS_TOKEN`: Organization access token from Polar dashboard
   - `POLAR_WEBHOOK_SECRET`: Webhook signing secret from Polar dashboard
   - `POLAR_ENVIRONMENT`: Set to 'sandbox' for testing, 'production' for live payments (defaults to 'production')
   - `POLAR_PRODUCT_ID_MONTHLY`: Product ID for the monthly subscription tier
   - `POLAR_PRODUCT_ID_ONETIME`: Product ID for the one-time purchase tier
   - `NEXT_PUBLIC_APP_URL`: Base URL for success/error redirects (e.g., http://localhost:3000 for dev, production URL for prod)

4. For testing, set `POLAR_ENVIRONMENT=sandbox` to use Polar's sandbox mode without real charges.

For detailed setup instructions, see [Polar Documentation](https://docs.polar.sh/).

---

## 4. Run locally

```bash
bun dev
```

Then open:

- `http://localhost:3000` — main Dream chat + pricing landing page

Key routes:

- `/`:
  - Dark, sleek landing layout
  - Dream chat interface
  - Integrated pricing section at the bottom
- `/api/chat`:
  - API route used by the chat UI (you plug in your own OpenAI/Vapi/etc. keys in code or via env vars as needed)

---

## 5. Theming and UI structure

- Global layout:
  - [`app/layout.tsx`](app/layout.tsx)
  - Wraps app with `ThemeProvider` from `next-themes`
  - Sticky navbar with:
    - Brand
    - Theme toggle (`light/dark`)

- Theme toggle:
  - [`components/ui/theme-toggle.tsx`](components/ui/theme-toggle.tsx)
  - Uses `next-themes` to switch class-based themes
  - Works out-of-the-box on Vercel (no extra config)

- Chat page:
  - [`app/page.tsx`](app/page.tsx)
  - Production-grade chat UI:
    - Left: product context
    - Center: conversation UI
    - Right: credential/config panel
    - Uses shadcn-style components from `/components/ui`

- Pricing:
  - [`components/ui/single-pricing-card-1.tsx`](components/ui/single-pricing-card-1.tsx)
  - Integrated into landing page:
    - Rendered at bottom of `/` with matching dark aesthetic

- Shared UI:
  - `/components/ui/*` — shadcn-style primitives:
    - `button`, `badge`, `card`, `input`, `label`, `textarea`, etc.
  - `/lib/utils.ts` — `cn` helper

This structure lets you:

- Plug in your own branding quickly
- Extend with additional shadcn/ui components
- Keep a consistent design system under `/components/ui`

---

## 6. Configuration (where to customize)

Minimal places you typically touch:

1. App metadata:
   - [`app/layout.tsx`](app/layout.tsx)
   - Update `metadata.title` and `metadata.description` to your brand.

2. Branding:
   - Navbar logo/label in `RootLayout`.
   - Text/content in:
     - [`app/page.tsx`](app/page.tsx)
     - [`components/ui/single-pricing-card-1.tsx`](components/ui/single-pricing-card-1.tsx)

3. Chat backend:
   - [`app/api/chat/route.ts`](app/api/chat/route.ts)
   - Wire this to your provider (OpenAI, Vapi, custom backend, etc.).
   - Use environment variables via `.env` for keys.

4. Theme defaults:
   - `ThemeProvider` in `app/layout.tsx`:
     - Change `defaultTheme` from `"dark"` if needed.

---

## 7. Deploy to Vercel

1. Push this repo to your own GitHub (or import directly if provided).
2. In Vercel:
   - "Add New Project" → Import the repo.
   - Framework: detected as Next.js.
3. Build settings:
   - If using Bun:
     - Build Command: `bun run build`
   - Otherwise:
     - Build Command: `next build`
   - Output Directory: `.next` (default)
4. Add any required environment variables in Vercel (for `/api/chat`).
5. Deploy.

No extra Vercel config is required — `next build` already passes typecheck + ESLint and generates static assets.

---

## 8. Quick customization checklist

- [ ] Update metadata (title, description).
- [ ] Swap logos/images (e.g. `/public/dream.png`) to your brand.
- [ ] Adjust pricing numbers and copy in `single-pricing-card-1`.
- [ ] Point `/api/chat` to your preferred model/provider.
- [ ] Confirm theme toggle + dark/light palettes match your brand.
- [ ] Configure Polar products and environment variables for checkout integration.

After these, you have a polished, ready-to-sell SaaS-style landing page with integrated chat and pricing, deployable in one click from your Polar.sh-purchased repo.