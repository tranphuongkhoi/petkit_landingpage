# Architecture

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment

Supporting libraries:

- Zod for content validation
- Vercel Analytics for page-view tracking

## App Structure

Current structure:

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

Possible next structure:

```txt
app/
├─ [locale]/
│  ├─ page.tsx
│  └─ products/
│     ├─ page.tsx
│     └─ [slug]/
│        └─ page.tsx
├─ api/
│  └─ leads/
│     └─ route.ts
├─ layout.tsx
└─ globals.css
components/
├─ layout/
├─ sections/
├─ product/
├─ cart/
└─ ui/
content/
├─ landing-content.json
└─ product-foundation.json
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

Product data is centralized in JSON content files and reused by:

- landing page sections
- product listing
- product detail pages
- SEO metadata

The signup form can later submit to a server-side lead endpoint. The API route should validate input server-side before forwarding any payload.

## Security And Privacy

- API keys stay in environment variables.
- `.env.local` is ignored.
- Product health data is presented as daily behavior insight, not diagnosis.
