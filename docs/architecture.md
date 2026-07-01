# Architecture

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment

Planned supporting libraries:

- next-intl for English/Vietnamese routing
- next-themes for dark mode
- Zustand for persisted cart, wishlist, and recently viewed state
- Zod for form validation
- Vercel Analytics or GTM/GA4 for tracking

## App Structure

Current V0 structure:

```txt
app/
├─ layout.tsx
├─ page.tsx
└─ globals.css
docs/
├─ brief.md
├─ architecture.md
├─ decisions.md
├─ qa-checklist.md
└─ diagrams/
   └─ codebase-map.mmd
```

Target V1 structure:

```txt
app/
├─ [locale]/
│  ├─ page.tsx
│  └─ products/
│     ├─ page.tsx
│     └─ [slug]/
│        └─ page.tsx
├─ api/
│  ├─ webhook/
│  │  └─ route.ts
│  └─ chat/
│     └─ route.ts
├─ layout.tsx
└─ globals.css
components/
├─ layout/
├─ sections/
├─ product/
├─ cart/
├─ chatbot/
└─ ui/
data/
└─ products.ts
lib/
├─ analytics.ts
├─ products.ts
├─ validators.ts
└─ utils.ts
stores/
├─ use-cart-store.ts
├─ use-wishlist-store.ts
└─ use-recently-viewed-store.ts
```

## Data Flow

Product data will be centralized in `data/products.ts` and reused by:

- landing page sections
- product listing
- product detail pages
- chatbot context
- SEO metadata

The signup form will submit to `/api/webhook`. The API route validates input server-side and can forward safe payloads to n8n through a server-side environment variable.

The chatbot enhancement will submit to `/api/chat`, which can call an AI provider using a server-side API key.

## Security And Privacy

- API keys stay in environment variables.
- Webhook URLs are server-side only.
- `.env.local` is ignored.
- Internal planning files are not tracked in the public repository.
- Product health data is presented as daily behavior insight, not diagnosis.
