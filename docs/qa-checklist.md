# QA Checklist

## Local Checks

- [ ] `npm install` completes successfully.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] No TypeScript errors.
- [ ] No private files are tracked.

## Responsive UI

- [ ] Header works on desktop.
- [ ] Header works on mobile.
- [ ] Hero content is readable on desktop.
- [ ] Hero content is readable on mobile.
- [ ] Feature cards do not overflow.
- [ ] Specs layout does not break.
- [ ] Product ecosystem cards stack correctly on mobile.
- [ ] Signup form inputs and button fit on mobile.

## Navigation

- [ ] Header controls scroll to the correct sections without changing the URL.
- [ ] Primary CTA scrolls to signup.
- [ ] Secondary CTA scrolls to features.
- [ ] No broken internal links.

## SEO And Metadata

- [ ] Page title is product-facing.
- [ ] Meta description is product-facing.
- [ ] Open Graph title and description are configured.
- [ ] Final production URL is used in README before submission.

## Deployment

- [ ] Vercel Preview Deployment is created for the branch.
- [ ] Preview URL loads successfully.
- [ ] Production URL loads successfully after merge.
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

- [ ] No unverified warranty claim.
- [ ] No unverified shipping claim.
- [ ] No medical diagnosis claim.
- [ ] No unsupported market-share claim.
- [ ] Health-related copy uses behavior-insight wording.
