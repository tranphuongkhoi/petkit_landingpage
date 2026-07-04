# QA Checklist

## Local Checks

- [x] `npm install` completes successfully.
- [x] `npm run lint` passes.
- [x] `npm run typecheck` passes.
- [x] `npm run build` passes.
- [x] No private files are tracked.
- [x] `.env.local`, `private/`, `node_modules/`, and `.next/` are ignored.

## Required Assignment Scope

- [x] Product landing page for a smart technology product.
- [x] Hero section.
- [x] Feature highlights.
- [x] Technical specifications.
- [x] Signup / update-interest form.
- [x] Modern clean UI with consistent spacing and typography.
- [x] Responsive desktop layout.
- [x] Responsive mobile layout.
- [x] GitHub repository.
- [x] Vercel deployment.
- [x] PageSpeed evidence captured from the deployed URL.

## Responsive UI

- [x] Header works on desktop.
- [x] Header works on mobile.
- [x] Landing, product listing, and product detail use the same shared sticky header.
- [x] Product routes do not show the landing-only Get updates CTA in the header.
- [x] Hero content is readable on desktop.
- [x] Hero content is readable on mobile.
- [x] Feature cards do not overflow.
- [x] Specs layout does not break.
- [x] Product ecosystem cards stack correctly on mobile.
- [x] Signup form inputs and button fit on mobile.

## Navigation

- [x] Landing header controls scroll to the correct sections without breaking the route.
- [x] Primary CTA routes to the primary product section.
- [x] Secondary CTA routes to ecosystem/product context.
- [x] No broken internal links found in local route review.
- [x] Product card detail links open the correct product detail route.
- [x] Product listing route builds successfully.
- [x] Product detail routes build for every product slug.
- [x] Product listing includes header and footer.
- [x] Product detail pages include header and footer.
- [x] Product listing and detail footer match the landing footer.
- [x] Product listing/detail header links use route-safe navigation instead of landing hash links.
- [x] Header and footer live under `components/layout/`.
- [x] Product UI components live under `components/product/`.
- [x] Product detail content, floating action copy, and cart storage helpers live outside component files.
- [x] Site tab icon uses `public/logo.png`.

## Product Experience

- [x] Product listing cards use shared product images and specs.
- [x] Product listing groups products by category.
- [x] Product detail pages show model, category, fit, and key specs.
- [x] Pura Max 2 detail page shows expanded product stats.
- [x] Product listing badges and card specs are mapped from the verified product foundation.
- [x] Product detail pages separate public specs from caveats and setup notes.
- [x] Product detail specifications use an editorial table layout.
- [x] Product detail specifications heading changes by product role.
- [x] Product detail pages include a visible Product FAQ section.
- [x] Product FAQ behaves as a single-open accordion.
- [x] Product prices render across landing cards, product listing, product detail, suite cards, and comparison table.
- [x] Product detail page includes a role-based comparison table.
- [x] Comparison table highlights the current product column.
- [x] Pura Max 2 detail page includes a clickable carousel and lightbox gallery sourced from local public assets.
- [x] Product UI displays reference pricing while avoiding unverified warranty, UVC, shipping, and medical diagnosis claims.
- [x] Cart drawer shows item subtotal and total price.
- [x] Cart selections persist after page reload.
- [x] Wishlist state persists after page reload.
- [x] Recently viewed products update after opening detail pages.
- [x] Floating assistant appears on landing, product listing, and product detail routes.
- [x] Floating assistant opens and closes correctly.
- [x] Floating assistant quick prompts fit on mobile.
- [x] Back-to-top appears across routes after scroll progress.

## AI Assistant And Lead Capture

- [x] Assistant API is server-side.
- [x] Assistant is grounded in project product data, cart items, saved products, current page, and conversation history.
- [x] Assistant refuses or redirects out-of-scope questions.
- [x] Assistant asks for name/email naturally when the user wants updates.
- [x] Assistant lead capture requires user confirmation before calling `/api/events`.
- [x] Assistant lead capture sends readable page labels.
- [x] Assistant lead capture includes cart and saved product summary.
- [x] Groq is the primary model provider.
- [x] OpenRouter fallback models are configured for rate-limit/provider failure recovery.
- [x] UI shows a backup-model suggestion when provider limits are reached.

## SEO And Metadata

- [x] Page title is product-facing.
- [x] Meta description is product-facing.
- [x] Open Graph title and description are configured.
- [x] Production URL is used in README.
- [x] Canonical URLs are configured.
- [x] `robots.txt` is generated.
- [x] `sitemap.xml` is generated.

## Deployment

- [x] Vercel Preview Deployment is created from `preview`.
- [x] Production URL is available.
- [x] PageSpeed screenshots are stored in `docs/assets/`.
- [ ] Final production deploy after owner approval.
- [ ] Final email submission.

## Public Repo Safety

- [x] `.env.local` is not tracked.
- [x] `private/` is not tracked.
- [x] `node_modules/` is not tracked.
- [x] `.next/` is not tracked.
- [x] No API keys are committed.
- [x] No private endpoint URLs are committed.
- [x] No private planning notes are committed.

## Product Claims

- [x] No unverified warranty claim.
- [x] No unverified shipping claim.
- [x] No medical diagnosis claim.
- [x] No unsupported market-share claim.
- [x] Health-related copy uses behavior-insight wording.
- [x] Eversweet Max 2 does not show UVC unless exact variant is confirmed.
- [x] Pura Max 2 does not claim camera or medical detection features.
