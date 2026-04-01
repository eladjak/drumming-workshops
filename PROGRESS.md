# drumming-workshops - Progress

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

## Remaining (DNS only)
- [ ] Add A record `drumming` -> `76.76.21.21` in Cloudflare
