# PETKIT Smart Cat Care Landing Page

Responsive product landing page project for PETKIT smart cat care products, prepared for the HeLiCorp IT Website Internship round 2 test.

## Current Status

V0 scaffold is in progress. The first milestone is a small deployable Next.js page so GitHub and Vercel can be validated early before the full landing page is built.

## Planned V1 Scope

- Responsive landing page with hero, features, specs, ecosystem, and signup form.
- Product ecosystem around PETKIT Pura Max 2, YumShare Solo, and Eversweet 7.
- Product listing and static product detail pages.
- SEO metadata and PageSpeed-focused implementation.
- Optional enhancements: n8n webhook, GTM/GA4 tracking, dark mode, cart/wishlist, and chatbot.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local secrets. Do not commit `.env.local`.

## Private Workflow Safety

Internal planning files live in `private/` and are ignored by Git. Raw prompts, local notes, webhook URLs, API keys, and private screenshots must not be committed.
