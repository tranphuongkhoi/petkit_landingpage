# PETKIT Smart Cat Care

Responsive PETKIT product experience built for the HeLiCorp IT Website Internship round 2 assessment.

## Links

- Repository: https://github.com/tranphuongkhoi/petkit_landingpage
- Production: https://helicorp-petkit.vercel.app
- Preview: generated from the `preview` branch on Vercel

## Overview

This project presents a PETKIT smart cat care storefront centered on Pura Max 2. It includes a landing page, product listing, product detail pages, comparison content, cart and saved-product interactions, bilingual UI, dark/light mode, and a floating product assistant.

## Features

- Responsive landing page with hero, features, technical specs, product family, ecosystem add-ons, and update form.
- Product listing and static product detail pages for PETKIT products.
- Product comparison tables grouped by product role.
- Cart drawer with saved quantity, price totals, and update request form.
- Saved products and recently viewed product context.
- English/Vietnamese toggle with component-scoped locale files.
- Dark/light mode with persisted preference.
- Server-side lead event route for n8n webhook delivery.
- Groq-powered PETKIT assistant grounded in project product data, cart items, and saved products.
- Vercel Web Analytics integration.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel Analytics
- n8n webhook integration
- Groq chat completion API

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Create `.env.local` from `.env.example`.

```bash
N8N_WEBHOOK_URL=
INTERNAL_TRACKING_SECRET=
GROQ_API_KEY=
GROQ_MODEL=
```

`GROQ_MODEL` is optional. Local secrets and private notes are ignored by Git.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Routes

- `/`
- `/products`
- `/products/puramax-2`
- `/products/purobot-max-pro-2`
- `/products/purobot-crystal-duo`
- `/products/yumshare-solo`
- `/products/eversweet-max-2`

## Evidence

Submission evidence will be added after final preview review.

Planned evidence:

- Production screenshot
- Responsive preview screenshots
- PageSpeed or Lighthouse result
- Lead form webhook proof
- Optional analytics proof

## Notes

Pricing is presented as reference display data. Final availability, pricing, warranty, and distributor details can vary by market.
