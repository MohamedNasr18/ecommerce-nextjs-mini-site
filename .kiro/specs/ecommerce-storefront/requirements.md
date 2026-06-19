# Requirements Document

## Introduction

This document defines the requirements for a complete multi-page e-commerce storefront built on the existing Next.js 16 + TypeScript + App Router foundation. The storefront renders product listings, individual product detail, cart management, a multi-step checkout flow, authentication, and static informational pages. All UI is fully internationalized in English (LTR) and Arabic (RTL) via next-intl, and every page exports rich SEO metadata including Open Graph, Twitter Card, hreflang alternates, JSON-LD structured data, a dynamic sitemap, and a robots.txt.

The project already supplies: Next.js 16 App Router under `src/app/[locale]/`, next-intl middleware, `en.json` / `ar.json` translation files, Zustand stores (`useCartStore`, `useWishlistStore`, `useAuthStore`), shared TypeScript types (`Product`, `Category`, `CartItem`, `User`, `ShippingForm`), and API routes that serve mock JSON data for products and categories. This spec covers only the UI layer that still needs to be built.

## Glossary

- **Storefront**: The client-facing Next.js application described by this document.
- **Header**: The persistent top navigation component rendered on every page inside `[locale]/layout.tsx`.
- **Footer**: The persistent bottom navigation component rendered on every page inside `[locale]/layout.tsx`.
- **ProductCard**: A reusable card component that displays a product's image, name, price, add-to-cart, and wishlist-toggle controls.
- **Breadcrumb**: A reusable trail-of-links component that emits both visual UI and a JSON-LD `BreadcrumbList` schema.
- **CartStore**: The Zustand `useCartStore` already present at `src/store/useCartStore.ts`.
- **WishlistStore**: The Zustand `useWishlistStore` already present at `src/store/useWishlistStore.ts`.
- **AuthStore**: The Zustand `useAuthStore` already present at `src/store/useAuthStore.ts`.
- **Locale**: One of the two supported language tags: `en` (English, LTR) or `ar` (Arabic, RTL).
- **Translation_Key**: A dot-separated path into the `en.json` / `ar.json` message files resolved by `next-intl`.
- **ShippingForm**: The TypeScript interface at `src/types/index.ts` with fields `fullName`, `email`, `address`, `city`, `country`, `zip`.
- **Mock_Auth**: Client-side-only authentication that stores a synthesized `User` object in `AuthStore` without any real back-end call.
- **JSON-LD**: Structured data injected as a `<script type="application/ld+json">` tag, sanitized by replacing `<` with `\u003c`.
- **hreflang**: A `<link rel="alternate" hreflang="...">` tag in the `<head>` pointing to the equivalent page in the other locale.
- **Sitemap**: A `sitemap.ts` file under `src/app/` that exports a `MetadataRoute.Sitemap` array covering both locales.
- **Robots**: A `robots.ts` file under `src/app/` that exports a `MetadataRoute.Robots` object.
- **OG_Image**: An Open Graph image referenced in `metadata.openGraph.images`.
- **Zod_Schema**: A `zod` validation schema used with `react-hook-form` via `@hookform/resolvers/zod`.

---

## Requirements

### Requirement 1: Locale Layout — Header and Footer Shell

**User Story:** As a shopper, I want a consistent header and footer on every page, so that I can navigate the site and access cart, wishlist, and authentication from anywhere.

#### Acceptance Criteria

1. THE `[locale]/layout.tsx` SHALL render a `<Header>` component and a `<Footer>` component wrapping all page content.
2. THE `Header` SHALL display the site logo as a `<Link>` pointing to `/{locale}`.
3. THE `Header` SHALL display navigation links for Home, Categories, About, and Contact, each resolved from the `nav.*` Translation_Keys.
4. THE `Header` SHALL display a cart icon with a numeric badge showing `CartStore.totalItems()`, navigating to `/{locale}/cart`.
5. THE `Header` SHALL display a wishlist icon with a numeric badge showing the count of `WishlistStore.items`, navigating to `/{locale}/wishlist` (or a placeholder route).
6. THE `Header` SHALL display a language switcher toggle labelled "EN | AR" that, WHEN clicked, navigates the user to the equivalent page in the other Locale while preserving the current path.
7. WHEN `AuthStore.isAuthenticated()` returns `false`, THE `Header` SHALL display "Login" and "Sign Up" links.
8. WHEN `AuthStore.isAuthenticated()` returns `true`, THE `Header` SHALL display an account dropdown containing the user's name and a "Logout" button that calls `AuthStore.logout()`.
9. THE `Footer` SHALL display copyright text and navigation links for About and Contact.
10. THE `Header` SHALL apply `aria-label` attributes to all icon buttons and interactive controls.
11. WHILE the `<Header>` is rendered, THE `Header` SHALL be keyboard-navigable with visible focus indicators on all interactive elements.

---

### Requirement 2: Home Page

**User Story:** As a visitor, I want to land on an engaging home page that showcases categories and featured products, so that I can quickly discover what the store offers.

#### Acceptance Criteria

1. THE Home_Page (`[locale]/page.tsx`) SHALL export a `generateMetadata` function that returns a localized `Metadata` object containing `title`, `description`, `openGraph`, `twitter`, and `alternates.languages` fields populated from Translation_Keys.
2. THE Home_Page SHALL render a Hero section containing a heading, subtitle, and a "Shop Now" `<Link>` button, all resolved from `home.*` Translation_Keys.
3. THE Home_Page SHALL fetch all categories from `/api/products/categories` and render a Featured Categories grid displaying each `Category` as a named image card linking to `/{locale}/category/[slug]`.
4. THE Home_Page SHALL fetch all products from `/api/products` and render a Featured Products grid of up to eight `ProductCard` components.
5. THE Home_Page SHALL render "View All" links beneath each grid section.
6. WHEN a product image is rendered, THE Home_Page SHALL provide a non-empty `alt` attribute derived from the product name in the current Locale.
7. WHEN a category image is rendered, THE Home_Page SHALL provide a non-empty `alt` attribute derived from the category name in the current Locale.

---

### Requirement 3: Category Page

**User Story:** As a shopper, I want to browse all products within a category and sort them by price, so that I can find the best option quickly.

#### Acceptance Criteria

1. THE Category_Page (`[locale]/category/[slug]/page.tsx`) SHALL export `generateStaticParams` returning an entry for every `{ locale, slug }` combination derived from the categories data and the two supported Locales.
2. THE Category_Page SHALL export a `generateMetadata` function returning a localized `Metadata` object with `title`, `description`, `openGraph`, `twitter`, `alternates.languages`, and `alternates.canonical` fields.
3. THE Category_Page SHALL render a `Breadcrumb` component showing Home → Category Name.
4. THE Category_Page SHALL fetch products filtered to the requested `slug` from `/api/products?category=[slug]` and render them as `ProductCard` components in a responsive grid.
5. WHEN no products exist for the requested category, THE Category_Page SHALL display a localized empty-state message.
6. WHEN the `slug` does not match any known category, THE Category_Page SHALL call `notFound()`.
7. THE Category_Page SHALL render a sort control populated with "Price: Low to High" and "Price: High to Low" options resolved from `common.price_asc` and `common.price_desc` Translation_Keys.
8. WHEN the user selects a sort option, THE Category_Page SHALL re-order the displayed product grid accordingly without a full page reload.
9. THE Breadcrumb component SHALL emit a `<script type="application/ld+json">` containing a valid Schema.org `BreadcrumbList` object, with `<` replaced by `\u003c`.

---

### Requirement 4: Product Detail Page

**User Story:** As a shopper, I want to see a product's full details and add it to my cart or wishlist, so that I can make informed purchase decisions.

#### Acceptance Criteria

1. THE Product_Page (`[locale]/product/[id]/page.tsx`) SHALL export `generateStaticParams` returning an entry for every `{ locale, id }` combination derived from all products and the two supported Locales.
2. THE Product_Page SHALL export a `generateMetadata` function returning a localized `Metadata` object with `title`, `description`, `openGraph` (including `type: 'website'` and a product image URL), `twitter`, and `alternates.languages` fields.
3. THE Product_Page SHALL render the product image with a non-empty `alt` attribute in the current Locale.
4. THE Product_Page SHALL render the product name and price in the current Locale.
5. THE Product_Page SHALL render an "Add to Cart" button that calls `CartStore.addItem(product)` WHEN clicked.
6. WHEN `product.inStock` is `false`, THE Product_Page SHALL render the "Add to Cart" button in a disabled state and display an `common.out_of_stock` label.
7. THE Product_Page SHALL render a Wishlist toggle button: WHEN the product is not in the WishlistStore, THE button SHALL display `product.add_to_wishlist`; WHEN the product is in the WishlistStore, THE button SHALL display `product.remove_from_wishlist`.
8. THE Product_Page SHALL render a Related Products section containing up to four `ProductCard` components from the same category, excluding the current product.
9. THE Product_Page SHALL emit a `<script type="application/ld+json">` containing a valid Schema.org `Product` JSON-LD object, with `<` replaced by `\u003c`.
10. THE Product_Page SHALL render a `Breadcrumb` component showing Home → Category Name → Product Name, also emitting a JSON-LD `BreadcrumbList`.
11. WHEN the `id` does not match any known product, THE Product_Page SHALL call `notFound()`.

---

### Requirement 5: ProductCard Component

**User Story:** As a shopper, I want product cards that consistently display essential information and allow quick cart/wishlist actions, so that I can act without visiting individual product pages.

#### Acceptance Criteria

1. THE `ProductCard` component SHALL display the product image, the localized product name, and the formatted price.
2. THE `ProductCard` SHALL render an "Add to Cart" button that calls `CartStore.addItem(product)` WHEN clicked.
3. WHEN `product.inStock` is `false`, THE `ProductCard` SHALL render the "Add to Cart" button in a disabled state.
4. THE `ProductCard` SHALL render a Wishlist toggle icon button: WHEN the product is not wishlisted, it SHALL call `WishlistStore.addItem(product)` WHEN clicked; WHEN the product is already wishlisted, it SHALL call `WishlistStore.removeItem(product.id)` WHEN clicked.
5. THE `ProductCard` SHALL wrap the product image and name in a `<Link>` navigating to `/{locale}/product/[id]`.
6. THE `ProductCard` SHALL include a non-empty `alt` attribute on the product image in the current Locale.
7. THE `ProductCard` SHALL apply `aria-label` attributes to the "Add to Cart" and Wishlist toggle buttons.

---

### Requirement 6: Cart Page

**User Story:** As a shopper, I want to review my cart, adjust quantities, remove items, and proceed to checkout, so that I can finalise my purchase.

#### Acceptance Criteria

1. THE Cart_Page (`[locale]/cart/page.tsx`) SHALL export a `generateMetadata` function returning a localized `Metadata` object.
2. WHEN `CartStore.items` is empty, THE Cart_Page SHALL display a localized empty-state message from `cart.empty` and a "Continue Shopping" link to `/{locale}`.
3. WHEN `CartStore.items` is non-empty, THE Cart_Page SHALL render each cart item showing the product image, name, unit price, a quantity selector, a line total, and a "Remove" button.
4. WHEN the quantity selector value changes to a positive integer, THE Cart_Page SHALL call `CartStore.updateQuantity(productId, newQuantity)`.
5. WHEN the quantity selector value is set to zero or the "Remove" button is clicked, THE Cart_Page SHALL call `CartStore.removeItem(productId)`.
6. THE Cart_Page SHALL render a subtotal calculated as `CartStore.totalPrice()`, formatted as a currency value.
7. THE Cart_Page SHALL render a "Proceed to Checkout" button as a `<Link>` navigating to `/{locale}/checkout`.
8. ALL interactive elements on the Cart_Page SHALL have `aria-label` attributes.

---

### Requirement 7: Checkout Page — Multi-Step Flow

**User Story:** As a shopper, I want a guided checkout process that collects my shipping information and lets me review the order before placing it, so that I can complete purchases confidently.

#### Acceptance Criteria

1. THE Checkout_Page (`[locale]/checkout/page.tsx`) SHALL export a `generateMetadata` function returning a localized `Metadata` object.
2. THE Checkout_Page SHALL implement a two-step wizard: Step 1 (Shipping Form) and Step 2 (Order Review).
3. THE Checkout_Page Step 1 SHALL render a shipping form with fields `fullName`, `email`, `address`, `city`, `country`, and `zip`, each labelled using `checkout.*` Translation_Keys.
4. THE Checkout_Page Step 1 SHALL validate the form using a Zod_Schema that enforces: `fullName` is a non-empty string, `email` matches a valid email pattern, `address` is a non-empty string, `city` is a non-empty string, `country` is a non-empty string, and `zip` is a non-empty string.
5. IF the form has validation errors WHEN the user clicks "Next", THEN THE Checkout_Page SHALL display inline error messages adjacent to each invalid field without navigating to Step 2.
6. WHEN the user clicks "Next" and all fields are valid, THE Checkout_Page SHALL advance to Step 2.
7. THE Checkout_Page Step 2 SHALL display the submitted shipping details, a line-item order summary sourced from `CartStore.items`, and a subtotal.
8. WHEN the user clicks "Back" on Step 2, THE Checkout_Page SHALL return to Step 1 with the previously entered form values preserved.
9. WHEN the user clicks "Place Order" on Step 2, THE Checkout_Page SHALL call `CartStore.clearCart()` and transition to a Success state.
10. THE Checkout_Page Success state SHALL display a success heading and message resolved from `checkout.success_title` and `checkout.success_message` Translation_Keys, and a "Back to Home" link to `/{locale}`.
11. ALL form inputs SHALL have associated `<label>` elements and `aria-describedby` attributes pointing to their error messages.

---

### Requirement 8: Login Page

**User Story:** As a returning user, I want to log in with my email and password, so that I can access my account.

#### Acceptance Criteria

1. THE Login_Page (`[locale]/login/page.tsx`) SHALL export a `generateMetadata` function returning a localized `Metadata` object.
2. THE Login_Page SHALL render a form with `email` and `password` fields labelled using `auth.*` Translation_Keys.
3. THE Login_Page SHALL validate the form with a Zod_Schema: `email` must match a valid email pattern, `password` must be at least 8 characters.
4. IF validation fails WHEN the submit button is clicked, THEN THE Login_Page SHALL display localized inline error messages using `auth.errors.*` Translation_Keys adjacent to the relevant fields.
5. WHEN all fields are valid and the submit button is clicked, THE Login_Page SHALL call `AuthStore.login()` with a synthesized `User` object (`id`, `name`, `email`) and redirect to `/{locale}`.
6. THE Login_Page SHALL render a link to the Sign Up page using `auth.no_account` Translation_Key.
7. ALL form inputs SHALL have associated `<label>` elements.

---

### Requirement 9: Sign Up Page

**User Story:** As a new visitor, I want to create an account with my name, email, and password, so that I can start shopping.

#### Acceptance Criteria

1. THE Signup_Page (`[locale]/signup/page.tsx`) SHALL export a `generateMetadata` function returning a localized `Metadata` object.
2. THE Signup_Page SHALL render a form with `name`, `email`, `password`, and `confirm_password` fields labelled using `auth.*` Translation_Keys.
3. THE Signup_Page SHALL validate the form with a Zod_Schema: `name` must be a non-empty string, `email` must match a valid email pattern, `password` must be at least 8 characters, and `confirm_password` must equal `password`.
4. IF validation fails WHEN the submit button is clicked, THEN THE Signup_Page SHALL display localized inline error messages using `auth.errors.*` Translation_Keys adjacent to the relevant fields.
5. WHEN all fields are valid and the submit button is clicked, THE Signup_Page SHALL call `AuthStore.login()` with a synthesized `User` object and redirect to `/{locale}`.
6. THE Signup_Page SHALL render a link to the Login page using `auth.have_account` Translation_Key.
7. ALL form inputs SHALL have associated `<label>` elements.

---

### Requirement 10: About Page

**User Story:** As a visitor, I want to read about the company, so that I can understand the brand's mission.

#### Acceptance Criteria

1. THE About_Page (`[locale]/about/page.tsx`) SHALL export a static `metadata` object with a localized title and description derived from `about.*` Translation_Keys.
2. THE About_Page SHALL render a heading and body paragraph resolved from `about.title` and `about.description` Translation_Keys.
3. THE About_Page SHALL set `alternates.languages` hreflang links for both `en` and `ar` Locales in its metadata.

---

### Requirement 11: Contact Page

**User Story:** As a visitor, I want to submit a contact enquiry, so that I can reach the store team.

#### Acceptance Criteria

1. THE Contact_Page (`[locale]/contact/page.tsx`) SHALL export a `generateMetadata` function returning a localized `Metadata` object including hreflang alternates.
2. THE Contact_Page SHALL render a form with `name`, `email`, and `message` fields labelled using `contact.*` Translation_Keys.
3. THE Contact_Page SHALL validate the form with a Zod_Schema: `name` is a non-empty string, `email` matches a valid email pattern, and `message` is a non-empty string of at least 10 characters.
4. IF validation fails WHEN the submit button is clicked, THEN THE Contact_Page SHALL display inline error messages adjacent to the relevant fields.
5. WHEN all fields are valid and the submit button is clicked, THE Contact_Page SHALL display a success message resolved from `contact.success` and reset the form.
6. ALL form inputs SHALL have associated `<label>` elements.

---

### Requirement 12: Custom 404 Page

**User Story:** As a user who navigates to a non-existent URL, I want a clear "not found" page with a link home, so that I am not left on a blank screen.

#### Acceptance Criteria

1. THE Not_Found_Page (`[locale]/not-found.tsx`) SHALL render a heading and body text resolved from `common.not_found` Translation_Key.
2. THE Not_Found_Page SHALL render a "Back to Home" link navigating to `/{locale}`, using the `common.back_home` Translation_Key.
3. THE Not_Found_Page SHALL be accessible via `notFound()` calls in dynamic route segments.

---

### Requirement 13: SEO — Metadata, hreflang, and Canonical

**User Story:** As a site owner, I want every page to have correct SEO metadata in both languages, so that search engines index and present the storefront accurately.

#### Acceptance Criteria

1. EVERY page component SHALL export either a static `metadata` object or a `generateMetadata` function that returns a `Metadata` object.
2. EVERY `Metadata` object SHALL include `title`, `description`, `openGraph` (with `title`, `description`, `type`, and `url`), and `twitter` (with `card: 'summary_large_image'`, `title`, and `description`).
3. EVERY `Metadata` object SHALL include `alternates.languages` with entries for `en` and `ar` pointing to the corresponding locale-prefixed URLs.
4. EVERY `Metadata` object for dynamic pages (product, category) SHALL include `alternates.canonical` pointing to the canonical locale URL.
5. THE `[locale]/layout.tsx` SHALL set `metadataBase` to the site's base URL so all relative URL fields in metadata resolve correctly.

---

### Requirement 14: SEO — JSON-LD Structured Data

**User Story:** As a site owner, I want structured data on product and category/product breadcrumb pages, so that search engines can display rich results.

#### Acceptance Criteria

1. THE Product_Page SHALL emit a Schema.org `Product` JSON-LD object containing `name`, `image`, `description`, and `offers` (with `@type: 'Offer'`, `price`, `priceCurrency: 'USD'`, and `availability` based on `inStock`).
2. THE Product_Page AND Category_Page SHALL each emit a Schema.org `BreadcrumbList` JSON-LD object via the `Breadcrumb` component.
3. ALL JSON-LD script content SHALL sanitize the `<` character by replacing it with `\u003c` before insertion via `dangerouslySetInnerHTML`.

---

### Requirement 15: SEO — Sitemap and Robots

**User Story:** As a site owner, I want a machine-readable sitemap and robots.txt, so that crawlers can efficiently discover all localized pages.

#### Acceptance Criteria

1. THE `src/app/sitemap.ts` file SHALL export a default function returning a `MetadataRoute.Sitemap` array that includes entries for every static route (`/`, `/about`, `/contact`) and every dynamic route (`/category/[slug]`, `/product/[id]`) for both `en` and `ar` Locales.
2. EACH sitemap entry for a static or dynamic page SHALL include `alternates.languages` mapping `en` and `ar` to their respective locale-prefixed URLs.
3. THE `src/app/robots.ts` file SHALL export a default function returning a `MetadataRoute.Robots` object allowing all user agents to crawl all routes and pointing to the sitemap URL.

---

### Requirement 16: Multi-Language Support

**User Story:** As an Arabic-speaking user, I want all UI strings, product names, and page metadata displayed in Arabic with RTL layout, so that I have a native browsing experience.

#### Acceptance Criteria

1. ALL user-visible strings in every page and component SHALL be resolved from the `en.json` or `ar.json` Translation_Keys via `next-intl`'s `useTranslations` hook (for Client Components) or the `getTranslations` server function (for Server Components).
2. WHEN the active Locale is `ar`, THE `<html>` element in `[locale]/layout.tsx` SHALL carry `dir="rtl"` and `lang="ar"`.
3. WHEN the active Locale is `en`, THE `<html>` element SHALL carry `dir="ltr"` and `lang="en"`.
4. THE `Header` language switcher SHALL use `next/navigation`'s `useRouter` and `usePathname` to redirect to the path-equivalent URL in the other Locale without a full page reload.
5. WHERE a product name is displayed, THE component SHALL resolve `product.name_en` WHEN Locale is `en` and `product.name_ar` WHEN Locale is `ar`.
6. WHERE a category name is displayed, THE component SHALL resolve `category.name_en` WHEN Locale is `en` and `category.name_ar` WHEN Locale is `ar`.

---

### Requirement 17: Accessibility

**User Story:** As a user who relies on assistive technology or keyboard navigation, I want all interactive elements to be accessible, so that I can use the storefront without barriers.

#### Acceptance Criteria

1. ALL interactive elements (buttons, links, inputs, selects) SHALL have discernible accessible names either via visible text, `aria-label`, or `aria-labelledby`.
2. ALL images SHALL have non-empty `alt` attributes; purely decorative images SHALL use `alt=""`.
3. ALL form inputs SHALL have programmatically associated `<label>` elements (via `htmlFor` / `id` pairing or wrapping).
4. THE Storefront SHALL support full keyboard navigation: every interactive element SHALL be reachable and operable via Tab and Enter/Space keys.
5. THE Storefront SHALL maintain a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text against their backgrounds, following WCAG 2.1 Level AA guidelines.
6. WHEN a form validation error occurs, THE error message element SHALL be linked to its input via `aria-describedby`.
