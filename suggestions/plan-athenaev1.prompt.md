# DEV NOTE
> This plan is not to be implemented by AI, it's merely a suggestion to better direct the development of this app

## Plan: Athenae v1 Static-First Launch

Build a bilingual nonprofit website in SvelteKit 5 + TypeScript + TailwindCSS with static-first constraints, externalized forms/donations/newsletter, and a future-ready internal architecture. v1 prioritizes trust, clarity, donation readiness, accessibility, and compliance while deliberately deferring custom backend workflows.

**Steps**
1. Phase 1 - Product and architecture baseline (blocking)
1. Confirm v1 scope contract in project docs: included pages, included integrations, and explicit defer list (no custom auth, no moderation dashboard, no custom newsletter engine, no custom DB).
2. Define static-first architecture rules for v1: prerender-first pages, adapter choice for Cloudflare Pages, and integration abstraction so external services can be swapped for internal APIs later.
3. Define domain model contracts now (types only, no DB): OrganizationInfo, Program, NewsPost, SubmissionType, NewsletterInterest, plus forward-looking shapes for submission, subscriber, and newsletter_issue.
4. Define bilingual content strategy: mirrored FR/EN content structure, shared slugs where appropriate, and required translation coverage for all core + legal pages.

2. Phase 2 - Project scaffold and platform foundation (depends on Phase 1)
1. Scaffold SvelteKit 5 project with TypeScript strict mode and TailwindCSS.
2. Configure Cloudflare Pages deployment path and environment-variable strategy for third-party service IDs/links.
3. Add MDsveX/content pipeline or markdown loader strategy for manually managed News/Updates and reusable organization content blocks.
4. Establish feature-oriented folder structure: components, content, config, domain types, and route-level page modules.
5. Implement global layout primitives: navigation, footer, language switcher, CTA patterns, and trust-content surfaces.

3. Phase 3 - Core page implementation (parallelizable after scaffold)
1. Build Home page with mission, beneficiary clarity, credibility indicators, and CTAs for Donate, Contact, Newsletter Interest, and Submission.
2. Build About page with story, values, region served, and optional team/board section.
3. Build Programs page with service descriptions, target audience/eligibility, and action prompts.
4. Build Get Involved page with volunteer and partner/sponsor pathways and newsletter interest path.
5. Build News/Updates page using manual markdown content workflow and predictable post metadata.
6. Build Contact page with general inquiry experience.
7. Build Donate page with CanadaHelps/Zeffy destination and donation transparency/tax-receipt messaging.
8. Build legal/trust pages: privacy policy, accessibility statement, and terms/donation transparency content as applicable.

4. Phase 4 - Third-party workflows (depends on page shells)
1. Implement separate form experiences for:
- General Contact
- Newsletter Interest
- Newsletter Submission with attachments and rights consent
2. Standardize v1 on Fillout for forms, with clear field mapping and destination/routing definitions per form type.
3. Standardize newsletter interest destination on MailerLite and capture explicit consent + preferred language.
4. Integrate anti-spam controls at provider/form level (for example Turnstile where supported), plus upload constraints for type/size.
5. Add user-facing success/error states and fallback contact path if third-party form service is unavailable.

5. Phase 5 - Accessibility, compliance, and trust hardening (can run in parallel with late Phase 4)
1. Verify semantic structure, keyboard navigation, labels, focus order, and alt text across all pages/forms.
2. Validate color contrast and responsive behavior across key breakpoints and common browsers.
3. Validate privacy and consent language for newsletter/forms with clear data-use disclosure.
4. Validate French and English parity for all v1-required pages and key CTA/navigation text.

6. Phase 6 - Verification and launch readiness (depends on Phases 3 to 5)
1. Add tests first for new logic as required by workflow (Red-Green-Refactor), prioritizing utilities, content loaders, and form adapter mapping code.
2. Run automated checks: typecheck, lint, unit tests, and build/prerender validation for Cloudflare Pages output.
3. Run manual QA checklist for donation flow links, form submissions, bilingual navigation, and legal-page discoverability.
4. Run Lighthouse/performance/a11y/SEO checks on representative pages and fix high-impact regressions.
5. Freeze v1 scope and prepare deployment checklist, environment setup, and rollback notes.

**Relevant files**
- c:/Users/aoof/Documents/Coding/Athenae/README.md — update stack and integration choices to match v1 decisions and delivery phases.
- c:/Users/aoof/Documents/Coding/Athenae/LICENSE.md — verify legal/trust references remain consistent with published site/legal pages.
- c:/Users/aoof/Documents/Coding/Athenae/suggestions/ — add planning artifacts and service decision record for v1.
- Planned new workspace areas (to be created during implementation): src/routes, src/lib/components, src/lib/content, src/lib/config, src/lib/types, and test directories aligned to source paths.

**Verification**
1. Architecture review: confirm every form and donation action is abstracted behind internal action contracts even when backed by third-party URLs/services.
2. Content parity review: confirm required FR/EN pages exist with equivalent CTA and legal/compliance messaging.
3. Integration validation: submit one successful and one invalid test entry per form path and verify delivery/routing/consent capture.
4. Build/deploy validation: ensure prerender/static output works on Cloudflare Pages with no runtime-only dependency blocking deploy.
5. Accessibility acceptance: keyboard-only walkthrough and screen-reader spot-check of nav, forms, and legal pages.

**Decisions**
- Hosting: Cloudflare Pages.
- Forms provider: Fillout.
- Newsletter platform: MailerLite.
- Bilingual scope: fully bilingual core pages in v1.
- Donations: third-party provider in v1 (CanadaHelps or Zeffy), no in-house payment processing.

**Scope boundaries**
- Included in v1: static-first bilingual nonprofit site, core pages, external forms, external donation flow, external newsletter interest capture, legal/trust basics, accessibility/compliance baseline.
- Excluded from v1: custom backend form endpoints, auth/accounts, moderation dashboard, database-backed workflows, custom file storage pipeline, automated newsletter publication/sending.

**Further Considerations**
1. Donation provider final lock: pick CanadaHelps or Zeffy before implementation starts so legal/tax wording and CTA copy can be finalized once.
2. Content operating model: identify who maintains FR and EN content and define translation/update cadence before launch.
3. Future migration trigger: predefine thresholds (submission volume, moderation overhead, newsletter frequency) that trigger Phase 2 backend work.