---
name: patterns
description: A Relume-style library of numbered, copy-ready layout patterns for the Oxygen 6 or Breakdance builder - navbars and mega menus, product page headers, the sections that come after them, product grids, the cart, checkout and My Account pages, faceted filters, accordion / FAQ sections, and CSS-only designs for the WooCommerce quantity stepper, the loop add-to-cart button states and the WooCommerce notices - each with a when-to-use line, the layout, and complete HTML plus CSS for html-to-page. Use when the user asks for "a few options", "variants", "patterns", "like Relume", "give me layouts for X", or when you need a proven starting layout for a product page, a navigation bar, a product grid, an FAQ or the quantity input instead of inventing one.
---

# Pattern library

Numbered variants per component family, the way Relume catalogs them: pick by the situation, paste, restyle with the site's tokens. Every pattern is built for `html-to-page` (semantic HTML plus a `<style>` block), uses the store design system tokens (`--ink`, `--ink-muted`, `--line`, `--surface`, `--surface-alt`, `--brand`, `--on-brand`, `--accent`, `--font-display`, `--font-body`, `--radius`, `--container`, `--gutter`, `--card-ratio`), and respects the builder's rules: WooCommerce parts are `bd-woo` markers, categories are term loops, forms are the Form Builder element, behaviour is interactions or native HTML (`<details>`), never inline scripts.

Families:

| File | Family | Variants |
|---|---|---|
| `navbars.md` | Navbar 1 to 8 | simple links, links plus CTA, centred logo, utility bar plus main bar, transparent over hero, full-width mega panel, mega panel with featured tile, department flyout |
| `product-headers.md` | Product Header 1 to 9 | gallery left with sticky buy box, thumbnails rail, tall editorial slider, 2×2 gallery grid, full-bleed hero with overlaid buy box, centred single SKU, spec-first, split with sticky gallery, stacked image gallery with sticky details |
| `product-sections.md` | Product Section 1 to 8 | the page below the buy area: benefit strip, alternating story split, spec sheet from the product's own attributes, reviews with a summary panel, curated upsell row, three-step how-it-works, size comparison table, CSS-only sticky buy bar |
| `cart-pages.md` | Cart 1 to 4 | list rows with a sticky summary, editorial big type, total-first centred, two owned columns with a trust column; plus the stepped free-shipping bar, a merchandised empty state, cross-sells as shop cards and the cart drawer, all on WooCommerce's own cart markup with the internals CSS included |
| `checkout-pages.md` | Checkout 1 to 3 | numbered sections with a sticky summary, single column summary-first, split tone on a tinted panel; plus four coupon forms, the slim checkout header, express payments, two order received designs and the one-element classic checkout, with the field, payment and notice CSS included |
| `account-pages.md` | Account 1 to 21 | six navigation frames (left sidebar, top tabs, segmented control, full-bleed sticky bar, right rail, boxed shell), a phone dock, a dark theme, orders as status cards, a delivery track, a receipt, address cards, three login designs, a tiered membership band, quick tiles, empty states and a bento dashboard, with the element's internals CSS included |
| `filters.md` | Filters 1 to 4 | the Faceted Filters element as a hairline sidebar, boxed sidebar, top bar or drawer on every width, plus attribute swatches and star rows, on WooCommerce's block markup with the variables and internals CSS included |
| `product-grids.md` | Product Grid 1 to 8 | quick-add on hover, slide-up bar, bordered always-visible button, editorial text add, horizontal scroll band, featured plus grid, list rows, deals grid; all with second image on hover and the AJAX loop cart button |
| `accordions.md` | FAQ 1 to 8 | divider list, boxed cards, two-column with intro, plus/minus icons, numbered, category-tabbed, sidebar contact card, product-page details accordion |
| `loop-cart-button.md` | Add to cart 1 to 6 | the Loop Cart Button's rest, loading and added states on WooCommerce's fixed markup: the button becomes "View cart", confirmation only, split, floating chip over the image, icon circle, text line; all start from a reset that undoes the builder's 40px spinner and second-button "View cart" |
| `notices.md` | Notice 1 to 5 | WooCommerce's "added to cart", error and info notices on their fixed markup: inline banner, toast that fades out, slim full-width bar, in the product details column, checkout errors as a field list; a self-contained reset because the marker-built product wrapper gets no builder styling for them |
| `quantity-steppers.md` | Quantity 1 to 8 | CSS-only designs for the builder's fixed quantity markup: boxed with dividers, pill, filled brand ends, separate circles, compact for cart rows, full-width labelled row, dark, hairline; all start from one reset that undoes the builder's absolutely positioned buttons |

## How to use a pattern

1. Read the family file and pick by the "Use when" line, not by looks alone; offer the user two or three variants in their own terms ("photos on the left with the price staying on screen", "a big full-width photo with the price on top of it").
2. Paste the pattern's HTML and CSS into one `html-to-page` call, replacing the placeholder copy and the `@media` queries (copy the breakpoint queries from `get-breakpoints` verbatim). Keep the class names or rename them consistently; the CSS is scoped by them.
3. Where a pattern contains a marker (`bd-woo`, `bd-loop`, `bd-bind`), keep it: it is what makes the section live. Where it contains a slot (`*-slot` class), insert the named element with `edit-post` afterwards.
4. Finish per the family's notes (nested loops for menus, buy box CSS for product headers, interactions for drawers), then `preview-post` and read the `warnings`.

## Combining patterns

- A page is a stack of sections with alternating background bands; do not put two full-bleed image sections back to back.
- One primary CTA style per viewport; the navbar CTA and the product buy button share `.btn--primary`.
- Keep the same card, badge and price classes across every pattern on the site; patterns supply layout, the design system supplies the look.
- Motion, focus rings and hover states are part of every pattern; leave them in.

In the **design-first-build** workflow the patterns are the starting files of the prototype: copy the variant into the page file, restyle it on the site tokens, and keep its markers as `data-mock` notes until the conversion pass.

Related skills: **mega-menus** (behaviour and nested category loops behind Navbar 6 to 8), **woocommerce-product-page** (the buy box and gallery rules behind every product header), **building-sites** (the build rules every pattern assumes).
