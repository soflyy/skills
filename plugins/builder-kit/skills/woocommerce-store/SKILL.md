---
name: woocommerce-store
description: Build a complete, conversion-ready WooCommerce store with the Oxygen 6 or Breakdance builder MCP tools - store design system, header with mini cart and search, shop and category archives, single product template, cart, checkout, account, and a merchandised homepage - in the right order and to a professional standard. Use when the user wants to "build my store", "set up my shop", "design my WooCommerce site", "make my store look professional", or asks for any store-wide ecommerce work. For one piece only, see the woocommerce-shop-archive, woocommerce-product-page, woocommerce-cart-checkout and woocommerce-my-account skills, which this skill sequences.
---

# Building a WooCommerce store

A store is a system of templates that share one design language, not a set of pages. Shoppers move header → shop → product → cart → checkout, and every step must look like the same brand, load real product data, and never dead-end. This skill is the plan for building that system; the three sibling skills are the deep recipes for the individual steps.

Read this whole file before starting. Read `references/element-catalog.md` when you need an element slug or property path, `references/store-design-system.md` before the design pass, `references/homepage-and-merchandising.md` when building the homepage, and `references/qa-checklist.md` before telling the user anything is finished.

Worked examples live in `examples/`: `tool-calls.md` (every MCP call of a store build with real payloads), `headers-and-footers.md` (four store headers, a checkout header, two footers), `design-systems.md` (three complete token sets, the Oxygen 6 class layer, the Breakdance global-settings payload), `conversations.md` (how to talk to the owner) and `bad-vs-good.md` (sixteen anti-patterns with the fix). Copy from them rather than improvising.

## Non-negotiable rules

1. **Call `get-instructions` and then `get-ecommerce-instructions` before any build tool.** They are the live contract for markers, loops and element behavior on this exact site and version; this skill adds the process, the design judgement and the recipes on top of them, it does not replace them. Where this skill and the live instructions disagree, the live instructions win.
2. **Build the store unstyled.** This skill builds stores to a bespoke design, which is the case the unstyled mode exists for: the builder's WooCommerce stylesheet otherwise fights every rule you write, and its design controls mostly feed that stylesheet rather than the markup. Read `woocommerce_styles_mode` from `site-info`. On `enabled`, set `woocommerce.styles_mode` to `unstyled` with `set-settings` BEFORE writing any CSS and tell the user you have done it. Stop and ask first only when the store already has WooCommerce styling the user wants kept, because the switch restyles every WooCommerce page at once. On `disabled`, stop: the woo elements do not render at all.
3. **Every product value is dynamic.** A price, title, image, rating, stock line or add-to-cart that is typed in as static HTML shows the same thing on every product. Bind it (`bd-bind` / `bd-href` / `bd-src`) or emit it through a `bd-woo` marker. No exceptions, including "just a placeholder for now".
4. **Templates, not pages.** The shop, category pages, product pages, cart, checkout and account are templates that render against WooCommerce's own URLs. Never create a normal page called "Shop" with a static grid on it.
5. **WooCommerce owns the transaction.** Payment gateways, shipping rates, taxes, coupons, emails, order statuses and stock are WooCommerce settings, not builder work. Design the surfaces; tell the user which WooCommerce screens they must configure; never fake a payment or shipping UI in HTML.
6. **One design language.** Buttons, prices, badges, notices, form fields and cards must look identical on the product page, in the shop grid, in the mini cart and at checkout. Set the store design system first, then build against it.
7. **Preview against real products before declaring anything done.** `preview-post` / `preview-element` with `context_post_id` set to a simple product, then a variable product, then a product on sale or out of stock. Fix what you see.

## Discovery: understand the store before touching it

Do this in one pass at the start, and keep the answers in mind for every later decision.

- **`site-info`**: confirm WooCommerce is in `active_plugins` and note `shop_page_id`, `css_prefix`, `modern_normalize_enabled`, and whether global settings exist. If WooCommerce is missing, stop and tell the user to install and activate it; nothing below exists without it.
- **`search-posts` with `post_type: product`**: how many products, and which *types* exist. Then pick one representative product of each type you find (simple, variable, grouped, external/affiliate) and note their IDs; you will preview against them repeatedly. Note whether any are on sale, out of stock, or have galleries. A store with 8 products wants a different shop density than one with 800.
- **Product categories**: `get-dynamic-fields` confirms the term fields; a `bd-loop="terms"` later needs to know whether categories have images (`woocommerce_category_image`) and how many there are. Ask the user if unsure which categories matter most.
- **Existing templates**: `search-posts` for the template post type (`oxygen_template` / `breakdance_template`) and headers/footers. Never silently create a second shop or product template; a duplicate with lower priority does nothing and confuses the user. Reuse or replace deliberately.
- **Design foundation**: `get-css-selectors`, `get-css-variables`, `get-breakpoints`, and `get-global-settings` when it exists. A store built on someone else's variables must reuse them.
- **The business**: what do they sell, who buys it, price point, how many SKUs, do products vary (size/colour), do they ship physical goods, is there a brand kit (logo, colours, fonts). Ask once, in plain language, in a single `AskUserQuestion` call with focused choices, not a questionnaire. Product photography style (white background vs lifestyle, square vs portrait) decides the gallery and card ratios, so ask or look at a few product images.

## Build order (and why)

For a new store, follow the **design-first-build** workflow: prototype every template below as HTML and CSS files, render and iterate until the screenshots look finished, then convert mocks to markers and push in this order. The order still matters because each step depends on the one before it.

1. **Store design system** (variables, base classes, buttons, notices, badges, form fields, and the WooCommerce globals where the builder has them). Everything else reuses this. See `references/store-design-system.md`.
2. **Header and footer templates** with the mini cart and store search, applied everywhere. Build these before the shop so every preview from now on shows the real frame.
3. **Shop and product archives** (one `all-product-archives` template), then any per-category templates. See the `woocommerce-shop-archive` skill.
4. **Single product template** (`product`). See the `woocommerce-product-page` skill.
5. **Cart and checkout.** See the `woocommerce-cart-checkout` skill, and read the cart and checkout designs in the **patterns** skill (`cart-pages.md`, `checkout-pages.md`) first: start from one or design your own, but style every WooCommerce part those pages render, as the patterns do. Then **My Account, login/registration and order tracking**: the `woocommerce-my-account` skill.
6. **Homepage merchandising**: hero, category tiles, featured/new/sale product rows, trust, newsletter. See `references/homepage-and-merchandising.md`.
7. **Supporting pages** the store needs to be trusted: shipping and returns, contact, about, FAQ. Ordinary pages, built with `html-to-page`; link them from the footer.
8. **QA pass** on every template against every product type, on desktop and mobile widths. See `references/qa-checklist.md`.

Tell the user this plan up front in their terms ("I'll set up your brand styling, then your header with the cart, then the shop, product pages, and checkout") and report progress at each step. If they only want one piece, skip to it but still do step 1 first if the site has no design system, and still check step 2 exists (a product page without a header cart is a dead end).

## Breakdance vs Oxygen 6: what differs

The MCP tools are the same in both builders; a few names and the styling path differ.

| Concern | Oxygen 6 | Breakdance |
|---|---|---|
| Template post types | `oxygen_template`, `oxygen_header`, `oxygen_footer` | `breakdance_template`, `breakdance_header`, `breakdance_footer` |
| Reusable block name | Component | Global Block |
| WooCommerce elements | Shipped by the "Breakdance WooCommerce for Oxygen" add-on (same `EssentialElements\*` slugs); confirm with `get-element-slugs` | Built in (Pro) |
| Store-wide woo styling | Build a CSS design system with `insert-stylesheet` and style the woo internals through their classes. No global settings by default, so `settings.woocommerce` exists only if an add-on enables them | Same, because rule 2 puts the store in the unstyled mode where `settings.woocommerce` is gone. On a store you leave on `enabled`, `set-global-settings` with `settings.woocommerce` themes every woo part in one call (buttons, notices, sale badge, ratings, tables, swatches, quicklook) |
| Term loop element | `OxygenElements\TermLoopBuilder` | `EssentialElements\TermLoopBuilder` |
| Dynamic data shortcode | `[breakdance_dynamic ...]` in both | same |

Everything else in this skill and its siblings applies to both. When a sibling skill says "Component" read "Global Block" on Breakdance.

## What a great store looks like

Use these as the standard you are building to, not as optional polish. They are the difference between "it works" and "it sells".

**Product cards** (shop, category, homepage rows, related products)
- The native card by default: `bd-woo="shop"` on the archive, `bd-woo="products"` for rows on pages, styled through CSS and the part toggles, restructured through a `content-product.php` override when needed. Every shop loop hook fires in it, so plugin badges, wishlists, swatches and quick view appear; a hand-rolled `bd-loop="products"` card skips them all.
- Image first, consistent aspect ratio across every card (never let the browser pick), cover-cropped, with the second image on hover when the catalog has one.
- Title, price (sale price with the regular price struck through), rating only when the store actually has reviews, and an add-to-cart or "Choose options" action that does not dominate the image.
- A sale badge that is small, consistent, and only present on sale (the `product_sale` field renders empty otherwise, so bind it and style the empty state to disappear).
- 3 to 4 columns on desktop, 2 on mobile. Card gap 24 to 32px. Tap targets 44px minimum on mobile.

**Product page**
- Buy box above the fold on desktop: title, price, rating, short description, variation selectors, quantity, add-to-cart, stock and delivery reassurance. Gallery beside it with a fixed aspect ratio and thumbnails.
- Trust directly under the button: shipping time, returns policy, secure payment, in one quiet line or icon row. Never fake a guarantee the store does not offer; ask.
- Long content (description, specs, reviews) below the fold in an accordion by default; tabs only when the design explicitly wants a tab bar and you style it.
- Related products at the bottom as a full-width row using the same card design as the shop.

**Cart and checkout**
- Cart: items with thumbnails, editable quantity, remove, coupon, totals with a prominent "Proceed to checkout" and a "Continue shopping" path. Empty cart is designed, not a bare sentence.
- Checkout: fewest visual distractions of any page in the store. Two columns on desktop (form left, sticky order summary right), single column on mobile, payment box clearly bounded, trust signals near "Place order". No header navigation clutter is acceptable but not mandatory; at minimum, no promotional sections.
- Everything shoppers type into is a real WooCommerce form element. Never mock a form field.

**Header**
- Logo, primary navigation (categories as real term links, not hand-typed), search, account link, mini cart with a live count. Sticky on scroll for stores with long pages. Mobile: burger, search icon, cart icon, in that order or cart last.
- Optional announcement bar for shipping thresholds or promotions; make it dismissible only via interactions, never inline JS.
- Department dropdowns, "All" flyouts and mega panels: use the **mega-menus** skill (Menu Builder plus nested term loops).

**Store-wide**
- One primary button style (add-to-cart, checkout, place order all identical). One secondary style (view cart, continue shopping).
- Notices styled (added-to-cart success, errors) on every template; on marker-built product pages they are unstyled until you style them.
- Prices legible: price larger than body text, sale price emphasized, struck-through regular price muted.
- Real photography sizing: define the card and gallery ratios from the catalog's photos and stick to them everywhere.
- Mobile checked on every template. Most store traffic is mobile.

## Working with the user

Talk like a partner to a shop owner, not like an engineer. "I'm building your product page so the photos sit on the left and the price and Add to cart are on the right" beats anything mentioning templates, markers, elements or JSON. Report what they will see, where it applies, and what they still need to do in WooCommerce (payments, shipping zones, tax, emails, product photos, short descriptions). When you need a decision (filters approach, tabs versus accordion, which categories to feature, whether to enable Modern Normalize on a site with existing pages), ask once with concrete options.

Things to ask, because guessing them wrong is expensive:
- Which product photos ratio do they use, or may you choose one and crop.
- Whether variable products exist and whether they want swatches (see the product page skill).
- Shipping and returns policy wording for trust lines.
- Whether they want filtering on the shop and which kind (the MCP guide lists four; the user picks).
- Whether the homepage should be a store landing page or the shop itself.

## When the MCP guide and reality disagree

`get-ecommerce-instructions` describes the converter's contract; the site may still surprise you (a theme injecting WooCommerce CSS, a swatch plugin, a missing add-on element, a global settings add-on). Handle it in this order: read `warnings` from every `html-to-page` and `insert-stylesheet` response, preview, then adjust. If an element the guide names is missing from `get-element-slugs`, say so plainly to the user and use the closest element that exists rather than hand-building the feature. Report genuine tool defects with `report-bug`.
