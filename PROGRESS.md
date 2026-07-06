# drumming-workshops - Progress

## 2026-07-06 — Real Gemini knowledge chat LIVE in production ✅ (prod-push run)

Merged `fix/chat-live-recipe` → master (FF) and deployed to prod (https://drumming.eladjak.com). recipe+key fix (route existed). Proven Gemini recipe (gemini-3.5-flash + thinkingBudget:0), server-side GEMINI_API_KEY (confirmed present in Vercel Production), site-grounded system prompt.
- **Verified live:** `POST https://drumming.eladjak.com/api/chat-faq` → HTTP 200 with a real, site-specific Hebrew answer. Backup branch `backup/master-pre-prod-push-20260706`.


## 2026-06-10 — Hero + global polish, GEO 78→100 (commits 46eb7f7, f2e80df)
- HERO: replaced bg with cinematic FLUX-generated bucket-drumming image (public/images/drumming/hero-drum.jpg, 164KB) — far more flattering/high-impact than old indoor hero-wide.jpg. Added rhythm ripple rings + prefers-reduced-motion guards, responsive sizing.
- IDENTITY: new Suez_One display font for headings + logo (distinct from Heebo-only sibling sites); Heebo stays for body.
- COLOR: fuchsia/teal accents (Audience, About icons, FAQ), gradient scrollbar, tabular-nums.
- FAQ CHAT: chat header w/ avatar + online status, AnimatePresence entrance, always-visible suggested questions, aria-live + labeled input, gradient RTL-correct send button. send() logic unchanged; tested E2E.
- ANIMATION: transform/opacity-only keyframes, ≤200ms, global prefers-reduced-motion media query.
- ILLUSTRATION: original on-theme flat drum illustration (FLUX) in About.
- CONTACT: visible error-state banner; Hebrew typo נדפק→נדפוק.
- SEO: 5-schema JSON-LD bundle (WebSite+LocalBusiness/ProfessionalService+Person+WebPage+FAQPage) + 5 external citation links in <main>. GEO score 78→100/100.
- safe-live-refactor: branch → tsc clean → next build green → Vercel preview Ready → 2-lens review cleared → prod. drumming.eladjak.com 200 from VPS.

## 2026-06-09 — Real drumming photos shipped (commit 4a4e8b7)
- Replaced 33 mismatched images (קידושישי events, ערבי שירה, AI/stock drum-circle) with 12 REAL bucket-drumming workshop photos (15.10.2024), web-optimized via sharp (q80 mozjpeg, ~1.6MB total).
- Gallery (9), Hero (wide), About (detail), OG + JSON-LD all use real photos. Descriptive Hebrew alt on every image. Single H1.
- Vercel env fixed: RESEND_FROM `onboarding@resend.dev` → `סדנאות קצב <drumming@eladjak.com>`; CONTACT_EMAIL `eladjak.agents@gmail.com` → `eladjak@gmail.com`.
- safe-live-refactor: branch fix/real-drumming-images → preview (Ready) → prod. tsc clean, build green. Prod 200, old images 404.

## 2026-05-28 — DORMANT — passive status entry

**Last git commit:** fb5cecb 2026-05-11 — fix(chat): block:nearest + skip-empty scrollIntoView (date: 2026-05-11)
**Status:** dormant — no recent work. PROGRESS.md not updated since the last commit. Reactivate by running a session and updating this file.

---


## Status: Deployed
## Last Updated: 2026-04-01

## Live URLs
- **Vercel**: https://drumming-workshops.vercel.app
- **Custom Domain** (pending DNS): https://drumming.eladjak.com
- **GitHub**: https://github.com/eladjak/drumming-workshops

## DNS Setup Required
Add this record in Cloudflare for eladjak.com:
```
Type: A
Name: drumming
Content: 76.76.21.21
Proxy: OFF (DNS only)
```

## Architecture
- Next.js 15 + TypeScript + Tailwind CSS 4 + Framer Motion
- Single page: Navbar > Hero > About > Audience > Gallery > Testimonials > Contact > Footer
- Hebrew RTL, Heebo font, earthy warm colors (orange, brown, dark red)
- 9 components (8 UI + Analytics)
- API route: /api/contact (Resend email integration)
- Images: 19 images in public/images/ (real + Gemini-generated)

## Session 2026-04-01 - Complete

### Commit 1: Fix animations, SEO, accessibility, 404
- [x] Fixed all Framer Motion animations across all components
- [x] Lightbox + mobile menu animations
- [x] SEO: sitemap, robots, JSON-LD, OG/Twitter metadata
- [x] Accessibility: skip-to-content link
- [x] Custom Hebrew 404 page
- [x] API route for contact form

### Commit 2: Gallery, Resend, Analytics
- [x] Gallery: 5 -> 12 images, 4-column desktop grid
- [x] Resend email integration with Hebrew email template
- [x] Google Analytics component (env var driven)
- [x] .env.example

### Commit 3: Real contact details
- [x] Phone: 052-542-7474 (all components + JSON-LD)
- [x] Email: eladjak@gmail.com
- [x] WhatsApp: wa.me/972525427474

### Deploy
- [x] GitHub repo created: eladjak/drumming-workshops
- [x] Vercel production deploy
- [x] Custom domain drumming.eladjak.com added (DNS pending)

## Env Vars (set in Vercel dashboard when ready)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM="סדנאות תיפוף <noreply@drumming.eladjak.com>"
CONTACT_EMAIL=eladjak@gmail.com
```

## Remaining
- [x] DNS configured in Cloudflare (A drumming -> 76.76.21.21, DNS only)
- [ ] Set RESEND_API_KEY in Vercel env vars (once Resend account created)
- [ ] Set NEXT_PUBLIC_GA_ID in Vercel env vars (once GA property created)

## Closeout (2026-06-09)
- Added public/llms.txt (was 404) — site description + services + contact. Redeployed + verified 200.
