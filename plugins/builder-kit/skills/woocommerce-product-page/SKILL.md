---
name: woocommerce-product-page
description: Design and build the WooCommerce single product template (product detail page) with the Oxygen 6 or Breakdance builder - gallery with thumbnails and zoom, buy box with price, variations, quantity and add to cart, trust lines, description and specs, reviews, related products - and handle simple, variable, grouped, external, sale and out-of-stock products. Use when the user says "design my product page", "product template", "product detail page", "PDP", "add to cart button", "product gallery", "variation swatches", "product reviews", or wants any change to how a product is presented.
---

# The single product page

One `product` template renders every product. The layout, spacing and styling are yours; the functional parts (price, variations form, cart button, gallery, tabs, reviews) are emitted through `bd-woo` markers so they stay live for every product type. This page converts or loses the sale, so it gets the most design attention in the store.

Before building: `get-instructions`, `get-ecommerce-instructions` (the marker table and gallery rules there are the contract), and the `woocommerce-store` design system reference. Build the header with the mini cart first if it does not exist; a product page without a cart in the header is a dead end.

Layout variants to choose from (nine product headers with a catalog-to-header table) are in the **patterns** skill, `product-headers.md`. Examples in `examples/`: `layouts.md` (standard, editorial sticky summary, vertical thumb rail, single-product store, grouped bundle, mobile order), `buy-box.md` (complete add-to-cart CSS per product type, swatches, external, pill, buy-now, trust rows, delivery box, notices, sale flash) and `content-and-refinements.md` (accordion and tab bar configs, plain sections, reviews grid, gallery settings, related row, size-guide popup, breadcrumbs, meta, conditional parts). Start from the closest example.

## Workflow

1. **Discover**: `search-posts` for an existing `product` template (reuse or replace on purpose), `get-template-conditions` to confirm `product` is in `templateTypes`, `get-element-slugs` to confirm the woo elements and `EssentialElements\FProductBuilder` exist. Find one product of each type (simple, variable, grouped, external), one on sale, one out of stock; keep their IDs for previews. Look at the product photos to set the gallery ratio.
2. **Pick the layout, then decide the rest with the user**: read `product-headers.md` in the **patterns** skill (or `examples/layouts.md` for the default) and pick the header whose "Use when" line fits this catalog, offering two or three in the owner's words. Then one `AskUserQuestion`: gallery ratio (or you choose from the photos), thumbnails beside or below, accordion or tabs for the long content, which trust lines are true (shipping time, returns, warranty, secure payment), whether they want swatches for variations (requires a swatch plugin, below), and whether the buy box should stay on screen while scrolling.
3. **Create the template**:
   ```jsonc
   // create-template
   { "title": "Single Product", "template_type": "product", "rule_groups": [], "priority": 20 }
   ```
4. **Author the page** in one `html-to-page` call, from the header variant picked in step 2 and the markers below. Read `warnings`: an unknown alias, placeholder content inside a marker, or a dropped selector all show there.
5. **Refine with `edit-post`** only where a part needs configuration: tabs layout, review form button text, thumbnail count, related products count.
6. **Verify** with `preview-post` and `context_post_id` for each product you noted; `preview-element` on the cart button node against the variable product to see the exact markup before styling it. Check mobile.
7. **Then in a real browser**, because the preview has no JS: `browser_navigate` to the variable product's `url` (from `search-posts`), `browser_take_screenshot`, then `browser_click` through the variation selects and watch `.single_variation_wrap` fill (price, availability, the enabled button) with `browser_snapshot`; click add-to-cart on the simple product and read the notice; `browser_resize` to the phone breakpoint and screenshot once more. Without the `browser_*` tools, ask the owner to do the same clicks. A draft template only renders for a logged-in browser, so publish it or have the owner log in first.

## Anatomy of a product page that sells

Above the fold on desktop (in this order, in the right column beside the gallery):

1. Breadcrumbs (small, muted).
2. Category or brand eyebrow (optional).
3. Title (display font, 32 to 40px).
4. Rating with count (only shows when reviews exist).
5. Price (24 to 28px; sale price emphasised, regular price struck and muted).
6. Short description, 1 to 3 lines.
7. Variation selectors (swatches or styled selects), quantity, add to cart: the button full-width or at least 200px, the only `--brand` element in the column.
8. Stock and delivery line ("In stock, ships in 1 to 2 days").
9. Trust row under the button: shipping, returns, secure payment, in one line or three small icon items. Real policies only.
10. Meta (SKU, categories) small and last.

Below the fold: description and specs in an accordion (default) or tabs; reviews; related products as a full-width row using the shop card design; optional upsells above related when the store configures them.

Mobile: gallery first (full width, thumbnails as a horizontal strip or dots), then the buy box, then everything else. Add-to-cart must be reachable within one screen after the gallery.

## The marker contract

Which markers exist, how they nest, and which are leaves. This is what every header variant keeps; what they change is the layout and CSS around it, which is why this block carries none. Pick a finished design before you build: nine headers with a catalog-to-header table in the **patterns** skill, `product-headers.md`, or the default in `examples/layouts.md`, layout 1, which is this structure with its stylesheet. Building straight from the skeleton below renders unstyled blocks. Whichever layout you take, also include the shared add-to-cart internals and WooCommerce notices CSS from `examples/buy-box.md`: the marker-built product wrapper gets no builder styling for notices, so an unstyled `.woocommerce-notices-wrapper` is a broken "added to cart" message on every add.

```css
/* What the gallery markers need: a ratio, a max height, a thumb ratio and an
   active-thumb state. Shown with the default layout's values; every header
   in product-headers.md and layouts.md carries its own (ratios 1/1, 4/5,
   16/9 ...), so use the chosen layout's rules and keep these only as the
   floor when nothing else styles the gallery. */
.pdp-media { display: grid; gap: 12px; }
.pdp-gallery { aspect-ratio: var(--card-ratio); max-height: min(80vh, 720px); border-radius: var(--radius); overflow: hidden; background: var(--surface-alt); }
.pdp-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; background: var(--surface-alt); opacity: .55; transition: opacity .2s; cursor: pointer; }
.pdp-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
.pdp-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
.pdp-thumbs .swiper-slide-thumb-active { opacity: 1; outline: 2px solid var(--ink); outline-offset: -2px; border-radius: 8px; }
@media (max-width: 1023px) { .pdp-gallery { max-height: none; } }
```

```html
<div bd-woo="product" class="pdp store">
  <div class="container">
    <nav bd-woo="breadcrumbs" class="pdp-crumbs"></nav>

    <div class="pdp-top">
      <div class="pdp-media">
        <div bd-woo="gallery" class="pdp-gallery"></div>
        <div bd-woo="gallery-thumbs" class="pdp-thumbs"></div>
      </div>

      <div class="pdp-summary">
        <h1 bd-woo="title" class="pdp-title"></h1>
        <div bd-woo="rating" class="pdp-rating"></div>
        <div bd-woo="price" class="pdp-price"></div>
        <div bd-woo="excerpt" class="pdp-excerpt"></div>
        <div bd-woo="add-to-cart" class="pdp-cta"></div>
        <div bd-woo="stock" class="pdp-stock"></div>
        <ul class="pdp-trust">
          <li class="pdp-trust-item"><svg viewBox="0 0 24 24" …></svg><span>Free shipping over $75</span></li>
          <li class="pdp-trust-item"><svg viewBox="0 0 24 24" …></svg><span>30-day returns</span></li>
          <li class="pdp-trust-item"><svg viewBox="0 0 24 24" …></svg><span>Secure checkout</span></li>
        </ul>
        <div bd-woo="meta" class="pdp-meta"></div>
      </div>
    </div>

    <div class="pdp-details">
      <div bd-woo="tabs" class="pdp-tabs"></div>
    </div>
  </div>

  <section class="pdp-related">
    <div class="container">
      <div bd-woo="upsells" class="pdp-upsells"></div>
      <div bd-woo="related-products" class="pdp-related-grid"></div>
    </div>
  </section>
</div>
```

Copy the chosen layout's `@media` queries from `get-breakpoints` verbatim (a query that does not match a registered breakpoint is dropped). Replace the trust copy with what the user confirmed. The `.store` class on the wrapper picks up the store-wide woo layer from the design system reference, if you built one.

What the markers give you and what you own:

- **`product` → Fundamental Product Builder**: unstyled wrapper: the whole design is the layout you chose plus `examples/buy-box.md`, nothing comes from the element. Every part marker except `breadcrumbs`, `gallery`, `gallery-thumbs`, `related-products`, `upsells`, `mini-cart`, `search` must be inside it. Never use `<main>` for it (the page already has one).
- **Leaf markers are empty.** Anything inside them is discarded with a warning.
- **`gallery` + `gallery-thumbs`** in the same call: a Swiper bound to the product gallery with zoom and lightbox, and a synced thumb strip. Never `EssentialElements\Wooproductimages`. The gallery ratio and max height are required; a vertical thumb rail needs a definite height (make `.pdp-media` a two-column grid where the gallery row defines the height). Thumb count via `edit-post` on the thumbs Swiper: `content.general.slidesPerView` (default 4) and `spaceBetween`; `content.general.direction: "vertical"` for a rail.
- **`tabs`** defaults to the accordion layout with the review form in a modal. Rename tabs through `content.tabs.description.title` etc.; `design.accordion.first_item_opened: true` is usually right so the description is visible; `design.layout.layout: "tabs"` only for a deliberate tab bar you then style. Use `reviews` separately when the design wants reviews as their own section (grid layout, avatars): `design.reviews.layout.layout: "grid"`, `items_per_row`, `content.form.button_text: "Write a review"`.
- **`related-products` / `upsells`** render WooCommerce's native loop with square thumbnails; design those tiles square or change WooCommerce's thumbnail crop. `content.content.product_count` and `design.title.disable` via `edit-post`. Their internal markup is `ul.products > li.product` with `.woocommerce-loop-product__title`, `.price`, `a.button`; style one level under `.pdp-related-grid`. Upsells render nothing when none are configured.

## Product types and states

Preview the cart button against each type (`preview-element`, `context_post_id`) before styling; the markup differs.

- **Simple**: `form.cart` with `.quantity` and `button.single_add_to_cart_button`.
- **Variable**: `form.variations_form` with `table.variations` (selects wrapped in `.bde-woo-select`), `.reset_variations`, `.single_variation_wrap` (price, availability and the button block filled in by the browser). The preview is server-rendered without JS, so the variation price and the disabled/enabled state classes are absent there; style them blind from `examples/buy-box.md`.
- **Grouped**: `form.cart.grouped_form` with `table.woocommerce-grouped-product-list` rows (label, quantity, price) and one button.
- **External**: a single `a.button` to the external URL, no quantity.
- **On sale**: price shows `del` + `ins`; the sale flash is WooCommerce's `span.onsale` inside the wrapper (style or hide it: `.pdp span.onsale { display: none }` when the price already says it).
- **Out of stock**: no cart button; `.pdp-stock .out-of-stock` shows. Consider a "Notify me" note in copy; do not fake a form.
- **Backorder**: `.available-on-backorder` text; style like info.
- **Thumbnail spilling past its corner, or floating inside the tile with dead space**: the inner `.bde-swiper__slide` is not following the slide's size. Shape and clip go on `.swiper-slide`; pin the inner box with `position: absolute; inset: 0`, not `height: 100%`.
- **No gallery**: the Swiper shows only the main image; the thumbs strip shows one tile. Hide a one-slide strip with CSS if it looks odd (`.pdp-thumbs:has(.swiper-slide:only-child) { display: none }`).
- **No short description / no reviews / no stock text**: the part renders an empty box that still eats the column gap. See the collapse rules in the next section, and check a product that is actually missing the data.

## Every part can be empty: collapse it, do not let it hold a gap

Assume nothing in the summary column has content. A product with no reviews renders no rating, one with no short description renders no excerpt, one with stock display off renders no stock line, one that is not on sale renders no badge, one with no SKU, categories or tags renders almost no meta. The part still renders its own box, so in a flex or grid column every silent part keeps eating its share of the `gap` and the summary ends up with holes that look like a layout bug on exactly the products the owner cares about least.

So every optional part gets a collapse rule, written next to the rest of the summary CSS rather than bolted on when someone notices:

```css
.pdp-rating:empty, .pdp-excerpt:empty, .pdp-stock:empty, .pdp-sale:empty, .pdp-brand:empty { display: none; }
```

Three things about that rule decide whether it works.

**Put the marker on the box you style.** `<div bd-woo="rating" class="pdp-rating"></div>` gives your class to the element itself, so `.pdp-rating:empty` is testing the thing that holds the gap. Wrap it instead, `<div class="pdp-rating-row"><div bd-woo="rating"></div></div>`, and `.pdp-rating-row:empty` never matches: the row has an element child, so it is not empty, and the rule quietly does nothing while the hole stays. This is the single most common way the collapse gets written and fails.

**`:empty` is literal.** It means no child nodes at all, and a browser counts a single newline as a text node. Most parts render nothing at all when they have nothing to say, so `:empty` is right for them. At least one does not: the Product Meta element emits whitespace even when it is silent, so `.pdp-meta:empty` never matches it. The whitespace-proof form is `:not(:has(*))`, which asks for no element children and ignores text:

```css
.pdp-meta:not(:has(*)) { display: none; }
```

Use `:empty` by default, since it says what you mean, and reach for `:not(:has(*))` for a part you have watched fail. Confirm with `preview-post` on a product that is actually missing the data, not on your best-filled one.

**A wrapper you cannot avoid needs `:has()` on the wrapper, not `:empty`.** When the row carries a divider, a label or two parts side by side, test its contents instead:

```css
/* a row whose only part rendered nothing */
.pdp-rating-row:has(> .pdp-rating:empty) { display: none; }
/* same, whitespace-proof: no element inside the part */
.pdp-rating-row:not(:has(.pdp-rating > *)) { display: none; }
/* a row of two optional parts, hidden only when both are silent */
.pdp-meta-row:not(:has(.pdp-sku > *)):not(:has(.pdp-cats > *)) { display: none; }
```

Note the shape of the second one. `:has()` cannot be nested inside `:has()`, so `.pdp-rating-row:has(> .pdp-rating:not(:has(*)))` is an invalid selector and the browser throws the whole rule away, including anything else in the same declaration block. Write the negation on the outside, as above.

The same applies to any repeated card, not just the summary: a product grid card, an account row, a cart line. Anywhere you place an optional bound value or woo part inside a flex or grid container, the collapse rule is part of the design, not a fix.

## Variation swatches

WooCommerce renders variation attributes as `<select>`s. Colour and size swatches need a swatch plugin; the builder integrates with "Variation Swatches for WooCommerce" (Emran) and CartFlows' "Variation Swatches Woo" by dropping their CSS and styling them itself (via `settings.woocommerce.variation_swatches` on Breakdance). That swap only happens on an `enabled` store; in the unstyled mode the plugin's own swatch design is left in place, so style it with class CSS or leave it. If the store sells apparel, recommend installing one, then style the swatches under `.pdp-cta` (preview the element after installation to see the plugin's markup). Until then, style the selects well; they are acceptable.

## Thumbnails: one rule set for both Swiper modes

The gallery and its thumbs strip are Swiper elements, and each slide is three nested boxes:

```
div.bde-swiper-slide.swiper-slide     <- Swiper measures and sizes THIS one
  a|div.bde-swiper__slide             <- an inner box, auto height by default
    img.bde-swiper__image             <- width/height 100%, object-fit: cover
```

Swiper sizes that outer slide differently per direction: it writes an inline `width` in a horizontal strip and an inline `height` in a vertical rail. When the inner box does not follow, the thumbnail goes wrong in one of two opposite ways, and fixing one naively causes the other.

Use this, and it is right either way:

```css
.pdp-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; }
.pdp-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
.pdp-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
.pdp-thumbs .swiper-slide-thumb-active { outline: 2px solid var(--ink); outline-offset: -2px; }
```

Every line is load-bearing:

- **Shape, radius, clip and outline on `.swiper-slide`.** That is the box Swiper sizes, so it is the one the image must be clipped to. Put the `aspect-ratio` on the inner box instead and, on a rail where Swiper has set a height, the inner box computes a different height and nothing clips it: the image spills past the rounded corner and the active outline and laps the next thumbnail.
- **`position: absolute; inset: 0` on the inner box, never `height: 100%`.** A percentage height only resolves against a parent with a definite height, and a slide sized by `aspect-ratio` still has `height: auto` specified. Size the inner box with `height: 100%` and it collapses to auto, the image falls back to its natural ratio, and the tile shows dead space around the photo. Pinning the inner box to the slide's padding box sidesteps the question: it is the slide's size, however the slide got it.
- **`width: 100%` beside the `aspect-ratio`.** In a horizontal strip Swiper's inline width wins and the ratio supplies the height. In a vertical rail Swiper's inline height plus this width make both dimensions definite, so the ratio is ignored and the tile fills the rail. Without it the ratio derives the width from Swiper's height and the tile shrinks to a square narrower than the rail.

A rail tile is therefore as wide as the rail and as tall as Swiper's slot, which is usually not square. If you want square tiles there, set the rail's width to match the slot height rather than fighting it with a ratio.

One more thing the same three boxes explain: with zoom enabled the element replaces the image rule with `max-width/max-height: 100%; object-fit: contain` on the inner box's direct children. That resolves against an auto-height ancestor, so a zoomable gallery needs a definite height on the gallery itself, which is what the `aspect-ratio` on `.pdp-gallery` is for. Do not remove it and expect zoom to behave.

## Sticky buy box vs sticky gallery

The default layout makes the summary sticky so the buy button stays visible while a tall gallery scrolls. If the gallery is shorter than the summary (many variations, long trust block), drop `position: sticky` from `.pdp-summary` and instead make `.pdp-media` sticky. Never make both sticky. On a wide screen a 4/5 gallery in a 7/12 column can outgrow the viewport; the `max-height` guard handles it, but prefer to fix the column ratio (e.g. `6fr 6fr`) over relying on the cap, because the cap letterboxes zoomed slides.

## Below the buy area

The header sells; the sections under it answer what is left. Eight finished ones are in the **patterns** skill, `product-sections.md`: a benefit strip, an alternating story split, a spec sheet rendered from the product's own attributes, reviews with a summary panel, a curated upsell row, a three-step how-it-works, a size comparison table, and a CSS-only sticky buy bar. Pick two or three by what the shopper still has to decide, not all eight; the details accordion and the FAQ come from `accordions.md` instead.

## Reviews as a conversion tool

When the store has reviews, place the rating directly under the title and link it to the reviews section (`<a href="#reviews">` around the rating marker is fine; wrap the reviews marker in `<section id="reviews">`). Use the standalone `reviews` marker with a grid layout for stores where reviews matter (cosmetics, supplements, electronics); keep the review form in the modal so the page does not end in a bare comment form.

**Product Tabs and Product Reviews are mutually exclusive on one page.** Both render WooCommerce's review template through `comments_template()`, and WordPress only serves the comment loop once per request, so the second one on the page comes out empty or duplicated and the page carries two `#reviews` ids. The tabs element always includes a reviews tab, because its tab set comes from WooCommerce's own `woocommerce_product_tabs` filter and nothing in the element removes it. So pick one:

- **Tabs (or the accordion layout)**: reviews live inside the reviews tab. Do not add the `reviews` marker or the Product Reviews element anywhere on the page.
- **Standalone reviews**: use the `reviews` marker and build description and specs as plain sections with the `description` and `additional-info` markers, as in the examples. Do not add the tabs element.

If the user asks for both, say why, and offer the second shape instead: description and details as sections, reviews as their own section below. Whichever you build, check the rendered page for a single `#reviews` and a review list that actually has reviews in it, because the builder preview will not show you the clash.

## Building node by node (only when HTML cannot express the layout)

Root the tree in `EssentialElements\FProductBuilder`, add Containers/Columns, then the part elements from the catalog in the `woocommerce-store` skill. The gallery is a `EssentialElements\Swiper` with `content.slides.source: "images"`, `content.slides.images` bound to `[breakdance_dynamic field='product_gallery']` and its `images_dynamic_meta` companion, `content.zoom.enabled: true`, `content.slides.link: "lightbox"`, and a second Swiper synced through `content.sync` for thumbs. Never add `Swiperslide` children.

## Common failures

- "Added to cart" appears as unstyled text: notice CSS missing on the marker page. Add it (it never shows in previews).
- Gallery jumps in height between slides or the thumb strip is ragged: no `aspect-ratio` on the gallery and tiles.
- Gallery taller than the screen with the buy button below the fold: no max height and no sticky summary; pick one of the two patterns.
- Button looks like the theme's: the woo stylesheet's element-qualified selector beat your bare class; qualify as `button.single_add_to_cart_button`.
- A design control seems dead: the same property is set in class CSS; one mechanism per property.
- Variation price never updates: the preview has no JS; test in a browser (the `browser_*` tools, step 7) before assuming a bug.
- The "Clear" link is a pink block: the builder styles `.reset_variations` as a destructive secondary button. Reset it as a quiet link, and include the `:hover` rule or it turns into a red block under the pointer.
- The template renders on the wrong pages or not at all: `template_type` typo, or a second product template with higher priority; check `search-posts`.
- Tabs render as a plain stack: the tab bar layout was chosen but never styled; use `design.tabs.*` on the element.
- Tab bar CSS does nothing: the rules target WooCommerce's `ul.wc-tabs` / `.woocommerce-Tabs-panel`, which the element removes. The markup is `.bde-tabs__tabslist` / `.bde-tabs__tab` / `.bde-tabs__panel-content`, and the active tab is `[aria-selected="true"]`, not a class.
- A reviews block is empty, or the page has two: the tabs element and the reviews element are both on the page. Only one can render WooCommerce's reviews.
