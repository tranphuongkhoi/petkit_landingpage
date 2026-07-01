# Technical Decisions

## Next.js App Router

Next.js is a good fit for this assessment because it supports static product pages, metadata configuration, API routes, and direct deployment through Vercel.

## TypeScript

TypeScript keeps product data, page props, and API payloads explicit as the project grows from a landing page into product pages and form handling.

## Tailwind CSS

Tailwind enables fast responsive implementation while keeping the visual system readable in code. The current prototype intentionally uses a restrained neutral palette so the first deploy stays clean and easy to review.

## Vercel Deployment

Vercel is used because it integrates directly with GitHub branches:

- production deployment from the production branch
- preview deployments from feature branches
- clear deployment history for review

## Branch Workflow

Public branch names use conventional workflow prefixes:

```txt
master       -> production deploy
preview      -> integrated preview branch
feat/*       -> user-facing features
fix/*        -> bug fixes and UI corrections
docs/*       -> public documentation
chore/*      -> setup, tooling, deployment config
perf/*       -> performance work
```

Internal ticket IDs are used only for planning and do not need to appear in public branch names.

## Analytics

Vercel Web Analytics can be enabled by adding the `@vercel/analytics` package and rendering the `<Analytics />` component from the root layout. This keeps page-view tracking simple and avoids adding a third-party tag manager before the core site is stable.

## Product Claim Policy

The site avoids unsupported claims such as medical diagnosis, local warranty duration, free shipping, or exact market-share statistics unless verified by a trusted source.
