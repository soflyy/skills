---
name: woocommerce-shop-archive
description: Design and build the WooCommerce shop page, product category and tag archives, product search results, product filters and sorting, and product card grids for the Oxygen 6 or Breakdance builder, plus category tile grids and product rows on other pages. Use when the user says "design my shop page", "product listing", "category page", "product grid", "product cards", "add filters to the shop", "sort products", "featured products on the homepage", or anything about how products are listed.
---

# Shop, archives and product grids

One `all-product-archives` template renders the shop page, every category and tag archive, and product search results. The grid inside it is WooCommerce's own shop loop, placed as one empty `bd-woo="shop"` element: it reads the URL's main query, so category pages, search, sorting, filtering and pagination work without wiring, and every shop loop hook fires per card, which is where WooCommerce plugins (wishlists, badges, swatches, quick view, compare) put their output. Your job is the design: the page frame, the card's parts and styling, the filters, and the empty and paginated states.

Before building: `get-instructions`, `get-ecommerce-instructions`, the `woocommerce-store` skill's design system reference (the card reuses `.btn--*`, `.badge`, `.price-*`, `--card-ratio`). If the store has no design system yet, build that first.

Three ways to get a card, in this order of preference:

1. **The native card, styled** (the recipe below): WooCommerce's markup with the builder's wrappers, restyled with CSS on its classes plus the element's part toggles. Every hook intact.
2. **The native card, restructured**: override `content-product.php` with the template tools (`get-woocommerce-template` returns the builder's copy, `set-woocommerce-template` saves yours). Keep every `do_action()` in it, in order, and write your markup around them. Every hook intact, and the same card renders in the shop, product rows, related products, upsells and cart cross-sells. `loop/no-products-found.php` gives a designed empty state the same way.
3. **Your own card in the loop builder**: a `bd-loop="products"` container holding ONE card (`examples/product-cards.md`, and the **patterns** skill's `product-grids.md`). Builder-editable, any DOM, no shared markup. No shop loop hook fires in it, so plugin output never appears in these cards. Pick it only when the design needs it and the store does not depend on such plugins.

Examples in `examples/`: `archive-layouts.md` (filter sidebar with mobile drawer, category hero, chips, sort links, search results, a loop-builder grid), `product-cards.md` (seven loop-builder cards) and `product-rows-and-categories.md` (homepage rows for new/featured/sale/category/random/best sellers, feature bands, category tiles, circles, pills, lists, curated sets). Start from the closest example.

## Workflow

1. **Discover.** `site-info` (WooCommerce active, `shop_page_id`), `search-posts` for existing product-archive templates (never create a second one blindly), `get-template-conditions` for the template post type (`oxygen_template` / `breakdance_template`) and confirm `all-product-archives` and `specific-product-archive` are in `templateTypes`. `get-dynamic-fields` for the product and term slugs. Look at 3 or 4 product images to pick the card ratio.
2. **Decide with the user**: card density (3 or 4 columns), which parts the card shows (image, title, price, rating, category label, sale badge, excerpt, quantity input, add-to-cart), second image on hover, and whether they want filters and which kind (see Filters). One `AskUserQuestion` call.
3. **Create the template**:
   ```jsonc
   // create-template
   { "title": "Shop & Product Archives", "template_type": "all-product-archives", "rule_groups": [], "priority": 10 }
   ```
4. **Author the whole archive as HTML** in one `html-to-page` call on the returned `post_id` (recipe below). Read the `warnings`.
5. **Refine** with `edit-post` on the Shop Page element (`get-element-schemas` first): part toggles and order, columns, pagination styling. Restructure the card with the template tools only when CSS and the toggles cannot get there.
6. **Verify**: `preview-post` on the template (shop), then with `context_post_id` of a product in a specific category and with a product on sale; check page 2 exists when the store has more products than one page. Check mobile.

## The archive recipe

```html
<section class="shop">
  <div class="container">
    <nav bd-woo="breadcrumbs" class="shop-crumbs"></nav>
    <header class="shop-head">
      <h1 class="shop-title" bd-bind="archive_title"></h1>
      <p class="shop-desc" bd-bind="archive_description"></p>
    </header>

    <div class="shop-body">
      <!-- optional filters column; see Filters -->
      <div bd-woo="shop" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid"></div>
    </div>
  </div>
</section>
<style>
  .shop { padding-block: 32px 80px; }
  .shop-crumbs { font: 13px/1.4 var(--font-body); color: var(--ink-muted); margin-bottom: 16px; }
  .shop-head { margin-bottom: 24px; }
  .shop-title { font: 600 clamp(32px, 4vw, 48px)/1.05 var(--font-display); margin: 0 0 8px; }
  .shop-desc { color: var(--ink-muted); max-width: 60ch; margin: 0; }
  .shop-desc:empty { display: none; }
  .shop-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; }

  /* the element: notices, result count and sorting select first, then ul.products, then pagination.
     flex makes the count and the select one toolbar row (floats are ignored on flex items) */
  .shop-grid { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
  .shop-grid .woocommerce-notices-wrapper, .shop-grid ul.products, .shop-grid .woocommerce-pagination, .shop-grid .woocommerce-info { flex-basis: 100%; }
  .shop-grid .woocommerce-result-count { flex: 1; margin: 0; font: 14px/1.4 var(--font-body); color: var(--ink-muted); }
  .shop-grid .woocommerce-ordering { margin: 0; }
  .shop-grid .woocommerce-ordering select { font: 500 14px/1 var(--font-body); color: var(--ink); border: 1px solid var(--line); border-radius: var(--radius); padding: 10px 36px 10px 12px; background: var(--surface); }

  /* the grid: written out rather than set through --bde-woo-products-list-*, because those
     two variables are read by the builder's stylesheet and do nothing on an unstyled store.
     The float and width resets neutralise WooCommerce's own loop layout, which is what
     ul.products falls back to there. */
  .shop-grid.breakdance-woocommerce ul.products { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; margin: 8px 0 0; padding: 0; list-style: none; }

  /* the card: prefix with the builder's own scope so your rule wins by order, not by luck */
  .shop-grid.breakdance-woocommerce ul.products li.product { display: flex; flex-direction: column; gap: 12px; min-width: 0; float: none; width: auto; margin: 0; }
  .shop-grid.breakdance-woocommerce ul.products li.product a.woocommerce-LoopProduct-link { display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; }
  .shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-product-image { position: relative; margin: 0; border-radius: var(--radius); overflow: hidden; background: var(--surface-alt); }
  .shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-product-image img { width: 100%; aspect-ratio: var(--card-ratio); object-fit: cover; display: block; transition: transform .4s ease; }
  .shop-grid.breakdance-woocommerce ul.products li.product:hover .bde-woo-product-image img { transform: scale(1.03); }
  .shop-grid.breakdance-woocommerce ul.products li.product span.onsale { position: absolute; top: 12px; left: 12px; }
  .shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-categories-list { margin: 0; font: 500 12px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
  .shop-grid.breakdance-woocommerce ul.products li.product .woocommerce-loop-product__title { margin: 0; font: 500 16px/1.3 var(--font-body); color: var(--ink); }
  .shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-ratings { margin: 0; }
  .shop-grid.breakdance-woocommerce ul.products li.product .price { margin: 0; font: 600 16px/1.2 var(--font-body); color: var(--ink); }
  .shop-grid.breakdance-woocommerce ul.products li.product .price del { color: var(--ink-muted); font-weight: 400; margin-right: 6px; }
  .shop-grid.breakdance-woocommerce ul.products li.product .price ins { text-decoration: none; }
  .shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-product-footer { margin-top: 4px; }

  /* pagination: WooCommerce's page-numbers list */
  .shop-grid .woocommerce-pagination { margin-top: 24px; }
  .shop-grid .woocommerce-pagination ul.page-numbers { display: flex; justify-content: center; gap: 8px; margin: 0; padding: 0; list-style: none; border: 0; }
  .shop-grid .woocommerce-pagination ul.page-numbers li { border: 0; }
  .shop-grid .woocommerce-pagination .page-numbers li a, .shop-grid .woocommerce-pagination .page-numbers li span { min-width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: var(--radius); text-decoration: none; color: var(--ink); font: 500 14px/1 var(--font-body); }
  .shop-grid .woocommerce-pagination .page-numbers li span.current { background: var(--ink); color: #fff; border-color: var(--ink); }

  /* empty state: WooCommerce's notice */
  .shop-grid .woocommerce-info { padding: 40px 24px; text-align: center; color: var(--ink-muted); }

  @media (max-width: 1119px) { .shop-grid.breakdance-woocommerce ul.products { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 767px) {
    .shop-grid.breakdance-woocommerce ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
    .shop-title { font-size: 28px; }
  }
</style>
```

Copy the `@media` queries from `get-breakpoints`; the ones above are placeholders.

Why the recipe is shaped like this:

- **The element is the grid, the toolbar and the pagination.** `bd-woo="shop"` becomes the Shop Page element (`EssentialElements\Wooshoppage`); it renders WooCommerce's notices, result count, sorting `<select>`, `ul.products`, pagination and no-products notice, over the archive's main query. Nothing to configure for category pages, search or sorting.
- **The card's parts are toggles, not markup.** `design.products_list.elements.{image,title,price,rating,sale_badge,excerpt,categories,quantity_input,button}` each take `include` (enable/disable), `order` and `space_after`; `image.show_second_image_on_hover` swaps in the first gallery image on hover (nothing to bind, nothing to condition), `rating.review_count` adds the count, `sale_badge.position` places the badge. Your own block inside every card is `design.products_list.elements.custom_areas.areas[]` (a Component id in `global_block`, `position` `inside` for after the image and before the title, `outside` for after the footer). Set them with `edit-post`.
- **Columns and gaps are written out** rather than set through `--bde-woo-products-list-products-per-row` / `-gap`. Those two variables, and the `design.products_list.layout.products_per_row` / `between_products` controls that feed them, only reach the builder's stylesheet, so on an unstyled store all of them do nothing and `ul.products` falls back to WooCommerce's float layout. Products per page is WooCommerce's catalog setting (`settings.woocommerce.other.products_list.products_per_page` on Breakdance); make it a multiple of the columns.
- **Card rules carry the long prefix** because the builder's own rules are written as `.breakdance-woocommerce ul.products li.product .part`; a shorter selector of yours loses on specificity, not on order. The toolbar, grid and pagination rules only need `.shop-grid` because the builder styles those with fewer classes.
- **`archive_title` / `archive_description`** render "Shop", the category name and description, or "Search results" as appropriate. Bind them; do not type "Shop".
- **Sorting is WooCommerce's select.** It changes `?orderby=` and keeps the current path (a category stays a category). A designed sort as links is in `archive-layouts.md`, example 5; if you build it, hide the native select with `design.result_count` untouched and `.shop-grid .woocommerce-ordering { display: none; }`.
- **The add-to-cart** is WooCommerce's `a.button.add_to_cart_button` inside `.bde-woo-product-footer` (AJAX for simple products, "Select options" for variable, "Buy" for external), styled by the store globals and `design.products_list.elements.button`. The loading spinner and the "View cart" link the builder adds after a click are the same as on the loop cart button; the reset below applies.
- **The `data-wp-*` attributes** are only needed if you add Faceted Filters with instant updates (below); they pass through as the element's custom attributes and are harmless otherwise. Drop them if the store will not have filters.

Add-to-cart button reset. The builder's defaults hide the label behind a 40px spinner while loading and insert a second, button-styled "View cart" link after adding, which wraps under the button; every design resets both. The **patterns** skill's `loop-cart-button.md` has six designs written for the loop cart button's `.card-cta.breakdance-woocommerce a.button`; the native card uses the same rules with this prefix:

```css
.shop-grid.breakdance-woocommerce ul.products li.product a.button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--brand); border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; text-indent: 0; white-space: nowrap; }
.shop-grid.breakdance-woocommerce ul.products li.product a.button:hover { background: var(--brand-hover); border-color: var(--brand-hover); }
.shop-grid.breakdance-woocommerce ul.products li.product a.button::before { content: none; }                                   /* the builder's 40px loading spinner */
.shop-grid.breakdance-woocommerce ul.products li.product a.button.loading { text-indent: 0; opacity: .85; pointer-events: none; }
.shop-grid.breakdance-woocommerce ul.products li.product a.button.loading::after { content: ""; width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: card-spin .7s linear infinite; }
@keyframes card-spin { to { transform: rotate(360deg); } }
.shop-grid.breakdance-woocommerce ul.products li.product .bde-woo-product-footer:has(a.added_to_cart) a.button.added { display: none; }   /* "View cart" takes the button's place */
.shop-grid.breakdance-woocommerce ul.products li.product a.added_to_cart { display: inline-flex; align-items: center; justify-content: center; width: auto; max-width: none; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--success); border-radius: var(--radius); background: var(--success-bg); color: var(--success); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; }
.shop-grid.breakdance-woocommerce ul.products li.product a.added_to_cart:hover { background: var(--success); color: #fff; }
```

## Restructuring the card: `content-product.php`

When the card needs a DOM the toggles cannot produce (the price beside the title, a wrapper around the meta, a second CTA), override the loop's card template instead of leaving the native loop:

1. `get-woocommerce-template` with `template: "content-product.php"` returns the builder's copy: a `<li>` with five `do_action()` calls (`woocommerce_before_shop_loop_item`, `..._item_title`, `woocommerce_shop_loop_item_title`, `woocommerce_after_shop_loop_item_title`, `woocommerce_after_shop_loop_item`). The parts (link open, image, categories, title, rating, price, link close, footer with the button) and every plugin's output hang on those hooks.
2. Write your wrappers around and between the hooks, keep all five in order with their names, keep the `wc_product_class()` call and the `$attrs` echo on the `<li>`, and save with `set-woocommerce-template`. A part you do not want is a toggle off, never a deleted hook.
3. `preview-element` on the Shop Page element to check; `delete-woocommerce-template` rolls back.

The override renders in every native loop (shop, `bd-woo="products"` rows, related products, upsells, cart cross-sells), which is usually what a store wants: one card everywhere. `loop/loop-start.php` (the `ul.products` tag), `loop/no-products-found.php` (a designed empty state), `loop/sale-flash.php`, `loop/rating.php`, `loop/price.php`, `loop/orderby.php`, `loop/result-count.php` and `loop/pagination.php` are overridable the same way. The template tools' rules are in `get-ecommerce-instructions` ("Template parts").

## Your own card: the loop builder

For a card that must be editable in the builder as a Component, must not share markup with the other loops, or needs a DOM no hook order allows, replace the `bd-woo="shop"` element with a `bd-loop="products"` container holding ONE card (a full example is `archive-layouts.md`, example 7, and every card in `product-cards.md`):

```html
<div bd-loop="products" bd-loop-name="Product Card" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid">
  <article class="card">…bound card…</article>
</div>
```

- **The cost**: the loop repeats your markup, so no shop loop hook fires in it. Wishlist buttons, badges, swatches, quick view, compare buttons and anything else a WooCommerce plugin adds to loop items never appear in these cards, and neither does the builder's quick look. On a store that depends on them, use the override above.
- The converter emits the loop in raw mode: the container carries your classes and holds one `<article class="card">` per product, no wrappers, so grid rules go on `.shop-grid` itself; never turn raw mode off afterwards.
- Bind every per-product value (`bd-bind`, `bd-href`, `bd-src`); a bound element is empty in the HTML. `bd-woo="add-to-cart"` inside the card becomes the Loop Cart Button.
- The query stays unset on an archive template (knobs are ignored with a warning; a custom query breaks category pages and pagination). Pagination is on (`numbers`); `edit-post` switches it to `load_more` or `infinite`, and sets an empty-state Component.
- The second image on hover is a second `<img>` bound to `product_gallery_image` with a `dynamic-data` / `is not empty` display condition (recipe in the **patterns** skill, `product-grids.md`), because a bound image with nothing to show renders the builder's placeholder, not an empty `src`.

## Per-category templates

Only when a category needs a different design (a hero band, a different card, a curated intro). Create a second template and give it a higher priority:

```jsonc
// create-template
{
  "title": "Accessories Archive",
  "template_type": "specific-product-archive",
  "rule_groups": [[ { "ruleSlug": "product-is-taxonomy", "operand": "is", "value": [ { "text": "Accessories", "value": "{\"taxonomySlug\":\"product_cat\",\"termId\":19}" } ] } ]],
  "priority": 20
}
```

Copy the `value` object verbatim from `get-template-conditions`; its category list stops at 10, so on a real catalogue fetch the one you need with `search-condition-values` (`condition_slug: "product-is-taxonomy"`, `search: "Accessories"`) rather than guessing a `termId`. The template content is the same recipe with a category hero on top; still bind `archive_title` so a rename in WooCommerce shows through. For a category intro image, the `woocommerce_category_image` field resolves on the archive too.

## Filters

Ask the user which approach; the MCP guide lists four and the choice is theirs. The common, no-plugin answer:

**Faceted Filters** (`EssentialElements\Woofacetedfilters`) in a sidebar column beside the grid. Build the layout in the HTML (`<aside class="shop-filters"></aside>` as the first child of `.shop-body`, with `.shop-body { grid-template-columns: 260px minmax(0, 1fr) }` on desktop), then insert the element into that aside with `edit-post` and set:

```jsonc
{ "content": { "filters": { "active": true, "price": true, "status": true, "rating": false, "category": true, "tag": false, "instant": true,
  "attributes": [ { "attribute": "1" }, { "attribute": "2" } ] } } }
```

The `attributes` rows take the WooCommerce attribute **id as a string**, not the `pa_` slug; read the real values with `get-dropdown-options`. With `instant: true`, the grid element must be a router region: keep `data-wp-interactive="store/shop-loop"` and `data-wp-router-region="shop-grid"` on the `bd-woo="shop"` element (or on the `bd-loop` container, on the loop-builder path; any unique namespace and id) so filter clicks swap the grid in place. Without them, filters still work with a page reload. Both grids inherit the main query, which is what makes the filters' URL parameters apply.

Do not hand-build a mobile "Filter" button and drawer. WooCommerce ships one and the element leaves it on: below 782px (or the theme's `settings.viewport` value) the filters collapse to a `.wc-block-product-filters__open-overlay` button that opens a dialog. Collapse your sidebar column at the same width so it does not become a narrow box holding one button.

Styling, theming variables, the four placements (sidebar, boxed, top bar, drawer everywhere), attribute swatches and the traps that come with WooCommerce's block markup are a skill of their own: **woocommerce-filters**. Read it before writing filter CSS. The short version: the filter stylesheet is `:where()`-wrapped so one class of yours is enough, the theming hooks are `--wc-product-filter*` custom properties, and an unconditional `display` on the active-filters block ships an empty chip bar on every unfiltered page.

**Shop Filters** (`EssentialElements\WooShopFilters`) is the classic widget set with a full reload; **FacetWP / WP Grid Builder** need the user to install and license them; **custom** is bespoke and the most work. Never build fake filter checkboxes that do nothing.

## Empty state

A category with no products, or a search with no hits, renders WooCommerce's "No products were found matching your selection." notice (`.woocommerce-info`) inside the element. Style it, or override `loop/no-products-found.php` for a designed one (a short message plus a "Browse all products" button linking to the shop). On the loop-builder path, give the loop an empty-state Component instead (create one with the reusable-block tool and set it on the loop element's empty-state property; `get-element-schemas` has the exact path). The search results page benefits most; test it with a nonsense search.

## Product rows on other pages

A featured, new, on-sale or hand-picked row on the homepage or a landing page is an empty `bd-woo="products"` element: the Products List (`EssentialElements\Wooproductslist`), the same card over a query of its own, with no pagination. Never on the archive template (it ignores the URL; the converter warns).

```html
<section class="section"><div class="container">
  <h2 class="section-title">New arrivals</h2>
  <div bd-woo="products" class="shop-grid home-grid"></div>
</div></section>
```

It emits with the element's defaults (9 newest, grid). Then `edit-post`: `content.content.show_products` (`all` / `featured` / `sale` / `manually` with `products` ids / `query` with the same structured query the loop elements take, php mode included), `product_count`, `order_by` (`date` / `price` / `rand`), `order`, `content.content.advanced.when_empty` (Component id); `design.layout.layout` (`grid` / `slider` / `masonry`), `design.layout.products_per_row`, `between_products`; part toggles under `design.elements.*` (the same sections as the Shop Page's, one level up). Reusing `.shop-grid` shares the card CSS with the shop. A `bd-loop="products"` container with query knobs (`bd-limit`, `bd-featured`, `bd-category`, `bd-query`) is the custom-card alternative, with the same hook cost; `product-rows-and-categories.md` has both.

## Sizing the grid

- Desktop 4 columns for catalogs above ~40 products or small items (accessories, food); 3 columns for apparel, furniture, anything the shopper needs to see. 2 on mobile, always.
- `--card-ratio` from the photos; `object-fit: cover`; a light `--surface-alt` background behind images so mixed white-background photos do not look ragged.
- Card gap 24 to 32px; title 15 to 16px; price the same size and bolder.
- The whole image-and-title block is one link in the native card (`a.woocommerce-LoopProduct-link`), which is the large tap target you want; the button sits outside it in the footer.
- Cap the products per page (WooCommerce > Settings, or `settings.woocommerce.other.products_list.products_per_page` on a Breakdance store left on `enabled`) to a multiple of the column count so the last row is full.

## Common failures

- The element shows a notice instead of products: `bd-woo="shop"` was placed on a page or a single template. It only renders on product archive templates; a row on a page is `bd-woo="products"`.
- Every category shows the same products, and there is no page 2: a Products List (`bd-woo="products"`) was used as the archive grid. It runs its own query; the archive grid is `bd-woo="shop"`.
- A card rule does nothing: the selector is shorter than the builder's `.breakdance-woocommerce ul.products li.product .part`. Use the long prefix.
- A plugin's wishlist or badge shows on the shop but not in a custom grid: that grid is a loop-builder loop, which fires no shop loop hooks. Use the native loop or a `content-product.php` override.
- Sale badge missing or misplaced: it is `span.onsale` inside `.bde-woo-product-image`; position it there.
- "Select options" on a simple product: the product has no price; WooCommerce hides the button. Tell the user.
- Loop-builder grid collapsed into one column or one cell: raw mode was turned off, or the grid rule targeted a wrapper. Keep raw mode on and the rule on the container class.
- Loop-builder category page shows every product, or has no page 2: a custom query was set on the archive loop. Remove it; the loop must inherit the main query, with pagination on.
