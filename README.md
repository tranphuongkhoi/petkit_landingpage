# PETKIT Smart Cat Care

Responsive PETKIT product experience built for the HeLiCorp IT Website Internship round 2 assessment.

## Links

- Repository: https://github.com/tranphuongkhoi/petkit_landingpage
- Production: https://helicorp-petkit.vercel.app
- PageSpeed: https://pagespeed.web.dev/analysis/https-helicorp-petkit-vercel-app/lc40ve4jxo

## Preview

![Production desktop preview](docs/assets/production-desktop.jpg)

<p>
  <img src="docs/assets/production-mobile.jpg" alt="Production mobile preview" width="260">
</p>

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
- OpenRouter backup model support with Qwen and NVIDIA models when the primary Groq model is rate-limited.
- Vercel Web Analytics integration.
- SEO baseline with metadata, canonical URLs, `robots.txt`, and `sitemap.xml`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel Analytics
- n8n webhook integration
- Groq chat completion API
- OpenRouter chat completion fallback

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
OPENROUTER_API_KEY=
OPENROUTER_MODEL_PRIMARY=qwen/qwen3-next-80b-a3b-instruct:free
OPENROUTER_MODEL_FALLBACK=nvidia/nemotron-3-nano-30b-a3b:free
```

`GROQ_MODEL`, `OPENROUTER_MODEL_PRIMARY`, and `OPENROUTER_MODEL_FALLBACK` are optional overrides. Local secrets and private notes are ignored by Git.

For Vercel, keep Groq as the primary provider and add only the OpenRouter fallback variables when needed:

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL_PRIMARY=qwen/qwen3-next-80b-a3b-instruct:free
OPENROUTER_MODEL_FALLBACK=nvidia/nemotron-3-nano-30b-a3b:free
```

`ASSISTANT_PROVIDER=openrouter` is available for local fallback testing only. It should be left unset in Preview and Production so the assistant uses Groq first and falls back to OpenRouter only if needed.

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
- `/robots.txt`
- `/sitemap.xml`

## Evidence

### Demo Video

Place the final demo video at:

```txt
docs/assets/demo/petkit-demo.mp4
```

After adding the file, the video can be previewed directly from the README:

<video src="docs/assets/demo/petkit-demo.mp4" controls width="720">
  Your browser does not support the video tag.
</video>

If GitHub does not render the video in a specific context, open the file directly from `docs/assets/demo/`.

### Screenshots

![PageSpeed desktop result](docs/assets/pagespeed-desktop.png)

![PageSpeed mobile result](docs/assets/pagespeed-mobile.png)

Additional final submission evidence can include the deployed UI, responsive screenshots, lead form webhook proof, and analytics proof if required.

## Notes

Pricing is presented as reference display data. Final availability, pricing, warranty, and distributor details can vary by market.
