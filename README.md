# ShopNext — Multi-language E-commerce Mini Site

A small multi-page Next.js + TypeScript e-commerce demo featuring App Router, full English/Arabic i18n with RTL support, cart/wishlist/checkout flows, and SEO best practices.

## 🚀 Setup & Run

### Prerequisites
- Node.js 18.17+
- npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Environment Variables

Create a `.env.local` file in the root:

\`\`\`
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### Run in development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` by default.

### Build for production

\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 🛠 Tech Choices & Tradeoffs

| Choice | Why |
|---|---|
| **next-intl** over next-i18next | Built for App Router from the ground up, integrates cleanly with Server Components and the Metadata API for localized SEO. |
| **Zustand** over Redux Toolkit | Minimal boilerplate for a small app — cart/wishlist/auth state with `persist` middleware (localStorage) needed almost no setup compared to RTK slices + store config. |
| **React Hook Form + Zod** | Type-safe schema validation with localized error messages generated per-locale (`getXSchema(locale)` pattern), instead of hardcoding messages in form components. |
| **Route Handlers (`/api/*`) over a real backend** | Task scope calls for mock data; Route Handlers simulate a real REST API surface (`GET /api/products`, `/api/products/[id]`, `/api/categories`) without external dependencies. |
| **Server Components for pages, Client Components for interactivity** | Each route is split into a `page.tsx` (Server Component — handles `generateMetadata`, JSON-LD, data fetching) and a `*Client.tsx` (Client Component — handles state, forms, cart/wishlist actions). This keeps SEO metadata server-rendered while keeping interactivity isolated. |
| **Tailwind CSS** | Built-in RTL support via logical properties (`ps-`, `pe-`, `start-`, `end-`) made bidirectional layouts straightforward without a separate SCSS RTL setup. |
| **Picsum placeholder images** | No real product photography available within the timebox; placeholder images keep `next/image` optimization paths realistic without bloating the repo with binary assets. |

### Known tradeoffs (given the 4–6 hour timebox)
- Auth is fully mocked (no real backend/session) — login/signup just populate a Zustand store.
- No real payment integration on checkout — "Place Order" simply clears the cart and shows a confirmation screen.
- Search bar in the header is currently UI-only (not wired to live filtering).
- No automated tests included.

---

## ✅ SEO Checklist

- [x] Metadata API (`generateMetadata`) on every page — localized titles & descriptions
- [x] `<html lang="en">` / `<html lang="ar">` set dynamically per locale
- [x] `dir="rtl"` applied automatically for Arabic
- [x] Canonical URLs on every page
- [x] `hreflang` alternates (`alternates.languages`) on every localized page
- [x] OpenGraph + Twitter Card meta tags, localized
- [x] JSON-LD `Product` schema with `Offer` on product pages
- [x] JSON-LD `BreadcrumbList` schema on category/product pages
- [x] `sitemap.ts` — includes all EN + AR routes with `hreflang` alternates
- [x] `robots.ts` — disallows `/cart`, `/checkout`, `/wishlist`, `/api/*`
- [x] `robots: { index: false }` on user-specific pages (cart, checkout, wishlist)
- [x] Semantic HTML (`<nav>`, `<header>`, `<main>` structure via layout)
- [x] Descriptive `alt` text on all product/category images

---

## 📦 Project Structure

\`\`\`
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-aware root layout (html lang/dir)
│   │   ├── page.tsx            # Home
│   │   ├── category/[slug]/    # Category listing + sorting
│   │   ├── category/all/       # All products
│   │   ├── product/[id]/       # Product detail + JSON-LD
│   │   ├── cart/
│   │   ├── checkout/           # Multi-step: shipping → review → success
│   │   ├── wishlist/
│   │   ├── login/ signup/
│   │   ├── about/ contact/
│   │   └── not-found.tsx
│   ├── api/
│   │   ├── products/route.ts
│   │   ├── products/[id]/route.ts
│   │   └── categories/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/                 # ProductCard, Breadcrumb, Header, Footer
├── store/                      # Zustand: cart, wishlist, auth
├── lib/                        # Zod validation schemas
├── types/
└── i18n.ts                     # next-intl config

data/
├── products.json
└── categories.json
\`\`\`

---

## 🌍 Multi-language Support

- Languages: English (default, `/en`) and Arabic (`/ar`)
- Language switcher in the header — persists locale via URL routing (next-intl middleware)
- Full RTL layout switch for Arabic (`dir="rtl"`)
- All UI strings, validation error messages, and metadata are localized

---

## 📊 Lighthouse Scores

Screenshots in `/lighthouse-screenshots/`.

| Page | Locale | Device | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|---|
| Home | EN | Desktop | — | — | — | — |
| Home | AR | Desktop | — | — | — | — |
| Home | EN | Mobile | — | — | — | — |
| Home | AR | Mobile | — | — | — | — |

