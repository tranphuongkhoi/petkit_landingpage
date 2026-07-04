# QA Checklist

## Local Checks

- [ ] `npm install` completes successfully.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] No TypeScript errors.
- [ ] No private files are tracked.

## Responsive UI

- [x] Header works on desktop.
- [x] Header works on mobile.
- [x] Landing, product listing, and product detail use the same shared sticky header.
- [x] Product routes do not show the landing-only Get updates CTA in the header.
- [x] Hero content is readable on desktop.
- [x] Hero content is readable on mobile.
- [ ] Feature cards do not overflow.
- [ ] Specs layout does not break.
- [ ] Product ecosystem cards stack correctly on mobile.
- [ ] Signup form inputs and button fit on mobile.

## Navigation

- [ ] Header controls scroll to the correct sections without changing the URL.
- [ ] Primary CTA scrolls to signup.
- [ ] Secondary CTA scrolls to features.
- [ ] No broken internal links.
- [ ] Product card detail links open the correct product detail route.
- [x] Product listing route builds successfully.
- [x] Product detail routes build for every product slug.
- [x] Product listing route returns 200 locally.
- [x] Primary product detail route returns 200 locally.
- [x] Eversweet Max 2 detail route returns 200 locally.
- [x] Product listing includes header and footer.
- [x] Product detail pages include header and footer.
- [x] Product listing and detail footer match the landing footer.
- [x] Product listing/detail header links use route-safe navigation instead of landing hash links.
- [x] Product listing/detail header no longer includes a Landing link inside the product flow.
- [x] Header and footer live under `components/layout/`.
- [x] Product UI components live under `components/product/`.
- [x] Product detail content, floating action copy, and cart storage helpers live outside component files.
- [x] Site tab icon uses `public/logo.png`.

## Product Experience

- [x] Product listing cards use the shared product images and specs.
- [x] Product listing groups products by category.
- [x] Product detail pages show model, category, fit, and key specs.
- [x] Pura Max 2 detail page shows expanded product stats.
- [x] Product listing badges and card specs are mapped from the verified product foundation.
- [x] Product detail pages separate public specs from caveats and setup notes.
- [x] Product detail specifications use an editorial table layout instead of isolated stat cards.
- [x] Product detail specifications heading changes by product role.
- [x] Product detail pages include a visible Product FAQ section.
- [x] Pura Max 2 detail page includes product-specific FAQ and safe medical-disclaimer wording.
- [x] Product FAQ behaves as a single-open accordion with smooth transitions.
- [x] Product listing, landing cards, product detail, suite cards, and comparison table display USD reference prices.
- [x] Product detail page includes a role-based comparison table.
- [x] Pura Max 2 compares against Purobot Max Pro 2.
- [x] Purobot Crystal Duo, YumShare Solo, and Eversweet Max 2 compare together.
- [x] Comparison table highlights the current product column.
- [x] Pura Max 2 detail page includes a clickable carousel and lightbox gallery sourced from local public assets.
- [x] Product UI displays USD reference pricing while keeping warranty-duration, UVC, and medical diagnosis claims out of product UI.
- [x] Product listing sidebar does not render inline in the mobile content flow.
- [x] Add-to-cart writes product, image, quantity, and USD price from landing product cards.
- [x] Add-to-cart writes product, image, quantity, and USD price from product detail pages.
- [x] Header cart opens a cart drawer on product listing and product detail routes.
- [x] Cart drawer shows item subtotal and total USD price.
- [x] Cart drawer falls back to catalog pricing for older stored cart items.
- [x] Cart count badge updates from stored quantities and bounces after cart updates.
- [x] Cart item quantities can increase and decrease.
- [x] Cart selections persist after page reload.
- [x] Wishlist state persists after page reload.
- [x] Recently viewed products update after opening detail pages.
- [x] Floating assistant appears on landing, product listing, and product detail routes.
- [x] Floating assistant opens and closes correctly.
- [x] Floating assistant quick prompts fit on mobile.
- [x] Back-to-top appears across landing, product listing, and product detail routes after scroll progress.

## SEO And Metadata

- [ ] Page title is product-facing.
- [ ] Meta description is product-facing.
- [ ] Open Graph title and description are configured.
- [ ] Final production URL is used in README before submission.

## Deployment

- [x] Vercel Preview Deployment is created for the branch.
- [x] Preview URL loads successfully.
- [x] Production URL loads successfully after merge.
- [ ] Google PageSpeed Insights Mobile score is at least 85 on the deployed URL.
- [ ] PageSpeed screenshot is captured for submission.

## Public Repo Safety

- [ ] `.env.local` is not tracked.
- [ ] `private/` is not tracked.
- [ ] `node_modules/` is not tracked.
- [ ] `.next/` is not tracked.
- [ ] No API keys are committed.
- [ ] No private endpoint URLs are committed.
- [ ] No private planning notes are committed.

## Product Claims

- [x] No unverified warranty claim.
- [x] No unverified shipping claim.
- [x] No medical diagnosis claim.
- [x] No unsupported market-share claim.
- [x] Health-related copy uses behavior-insight wording.
- [x] Eversweet Max 2 does not show UVC unless exact variant is confirmed.
- [x] Pura Max 2 does not claim camera or medical detection features.
