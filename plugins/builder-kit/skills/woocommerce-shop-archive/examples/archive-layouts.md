# Archive layout examples

Full-page layouts for the `all-product-archives` template and for per-category templates. Each is one `html-to-page` call plus the noted `edit-post` follow-ups. The grid is the native `bd-woo="shop"` element, styled as in the skill's recipe; example 7 is the loop-builder grid, where the card markup is abbreviated as `…card…` (take one from `product-cards.md`).

## 1. Shop with a filter sidebar (desktop) and WooCommerce's own drawer (mobile)

```html
<section class="shop store">
  <div class="container">
    <nav bd-woo="breadcrumbs" class="shop-crumbs"></nav>
    <header class="shop-head">
      <h1 class="shop-title" bd-bind="archive_title"></h1>
      <p class="shop-desc" bd-bind="archive_description"></p>
    </header>
    <div class="shop-toolbar">
      <nav class="shop-sort" aria-label="Sort">
        <a class="sort-link" href="?orderby=menu_order">Featured</a>
        <a class="sort-link" href="?orderby=date">Newest</a>
        <a class="sort-link" href="?orderby=price">Price ↑</a>
        <a class="sort-link" href="?orderby=price-desc">Price ↓</a>
        <a class="sort-link" href="?orderby=popularity">Best sellers</a>
      </nav>
    </div>
    <div class="shop-body">
      <aside class="shop-filters">
        <div class="shop-filters-slot"></div>
      </aside>
      <div bd-woo="shop" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid"></div>
    </div>
  </div>
</section>
<style>
  .shop { padding-block: 24px 80px; }
  .shop-crumbs { font: 13px/1.4 var(--font-body); color: var(--ink-muted); margin-bottom: 16px; }
  .shop-title { margin: 0 0 8px; font: 600 clamp(32px, 4vw, 48px)/1.05 var(--font-display); }
  .shop-desc { margin: 0; color: var(--ink-muted); max-width: 60ch; }
  .shop-desc:empty { display: none; }
  .shop-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-block: 16px; border-block: 1px solid var(--line); margin: 24px 0 32px; }
  .shop-sort { display: flex; gap: 20px; flex-wrap: wrap; }
  .sort-link { font: 500 14px/1 var(--font-body); color: var(--ink-muted); text-decoration: none; }
  .sort-link:hover { color: var(--ink); }
  .shop-body { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 48px; align-items: start; }
  .shop-filters { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); }
  .shop-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; }
  .shop-grid .bde-posts-pagination { grid-column: 1 / -1; display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
  .shop-grid .page-numbers { min-width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: var(--radius); text-decoration: none; color: var(--ink); font: 500 14px/1 var(--font-body); }
  .shop-grid .page-numbers.current { background: var(--ink); color: #fff; border-color: var(--ink); }
  /* WooCommerce turns the filters into its own drawer below 782px, so the column stops being a
     column at the same width; do not build a second drawer on top of it */
  @media (max-width: 1023px) { .shop-body { grid-template-columns: 220px minmax(0, 1fr); gap: 32px; } }
  @media (max-width: 782px) { .shop-body { grid-template-columns: minmax(0, 1fr); gap: 16px; } .shop-filters { position: static; } }
  @media (max-width: 767px) { .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; } .shop-toolbar { margin-bottom: 20px; } }
</style>
```

Follow-ups (ids from `get-post-tree`):

```jsonc
// insert the faceted filters into the slot
{ "post_id": 230, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woofacetedfilters", "parent_id": 12,
  "properties": { "content": { "filters": { "active": true, "price": true, "status": true, "category": true, "rating": false, "tag": false, "instant": true, "attributes": [ { "attribute": "1" } ] } } } } } ] }

// the attribute row takes the WooCommerce attribute id as a string, from get-dropdown-options; a pa_ slug renders nothing
```

Filter block styling: use the shared block and a placement from the **woocommerce-filters** skill rather than writing it here. The minimum that makes the sidebar look deliberate:

```css
.shop-filters .wc-block-product-filters { display: block; width: 100%; --wc-product-filter-block-spacing: 28px; --wp--preset--spacing--30: 20px; }
.shop-filters h3.wp-block-heading { font: 600 14px/1.2 var(--font-body); text-transform: uppercase; letter-spacing: .06em; margin: 0 0 10px; }
.shop-filters .wc-block-product-filter-checkbox-list__items { display: grid; gap: 10px; }
.shop-filters .wc-block-product-filter-checkbox-list__label { font: 14px/1.5 var(--font-body); color: var(--ink); }
.shop-filters .wc-block-product-filter-removable-chips__item { border-radius: var(--radius-pill); background: var(--surface-alt); font: 500 13px/1 var(--font-body); }
.shop-filters .wp-block-woocommerce-product-filter-clear-button .wp-block-button__link { padding: 0; border: 0; background: transparent; font: 500 13px/1 var(--font-body); color: var(--ink-muted); }
```

## 2. Category page with a hero band (per-category or all archives)

The hero uses the archive title, description and the category image; on the shop page itself the image field is empty and the band falls back to a solid colour.

```html
<section class="cat-hero">
  <img class="cat-hero-img" bd-src="woocommerce_category_image" bd-alt="archive_title">
  <div class="container cat-hero-inner">
    <nav bd-woo="breadcrumbs" class="cat-hero-crumbs"></nav>
    <h1 class="cat-hero-title" bd-bind="archive_title"></h1>
    <p class="cat-hero-desc" bd-bind="archive_description"></p>
  </div>
</section>
<section class="shop store">
  <div class="container">
    <div class="shop-toolbar">…sort links…</div>
    <div bd-woo="shop" class="shop-grid"></div>
  </div>
</section>
<style>
  .cat-hero { position: relative; background: var(--ink); color: #fff; min-height: 320px; display: flex; align-items: flex-end; overflow: hidden; }
  .cat-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .7; }
  /* a term with no image renders the builder's placeholder, not an empty src: give this image a
     dynamic-data / is not empty display condition instead (see patterns/product-grids.md) */
  .cat-hero-inner { position: relative; padding-block: 48px; }
  .cat-hero-crumbs { font: 13px/1.4 var(--font-body); opacity: .8; margin-bottom: 12px; }
  .cat-hero-crumbs a { color: inherit; }
  .cat-hero-title { margin: 0 0 8px; font: 600 clamp(36px, 5vw, 64px)/1 var(--font-display); }
  .cat-hero-desc { margin: 0; max-width: 60ch; font: 16px/1.6 var(--font-body); opacity: .9; }
  .cat-hero-desc:empty { display: none; }
</style>
```

## 3. Subcategory chips above the grid

A row of the child categories of the current one is not available as a loop filter, but a row of *all* top-level categories is, and it doubles as navigation:

```html
<nav class="chips" aria-label="Categories">
  <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Category Chip" bd-limit="12" bd-orderby="count" bd-order="desc" class="chips-list">
    <li class="chip"><a class="chip-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
  </ul>
</nav>
<style>
  .chips { margin-bottom: 24px; overflow-x: auto; }
  .chips-list { list-style: none; margin: 0; padding: 0; display: flex; gap: 8px; }
  .chip-link { display: inline-flex; align-items: center; white-space: nowrap; padding: 8px 14px; border: 1px solid var(--line); border-radius: var(--radius-pill); font: 500 13px/1 var(--font-body); color: var(--ink); text-decoration: none; }
  .chip-link:hover, .chip-link.is-active { background: var(--ink); color: #fff; border-color: var(--ink); }
</style>
```

The active chip is styled automatically: links whose URL matches the current page get `is-active`.

## 4. Load-more instead of page numbers

WooCommerce's loop paginates with page numbers only, so a load-more or infinite-scroll grid is the loop-builder grid (example 7). After its conversion:

```jsonc
{ "post_id": 230, "operations": [ { "op": "update", "payload": { "element_id": 9, "properties": { "content": { "pagination": { "pagination": "load_more" } } } } } ] }
```

```css
.shop-grid .bde-posts-pagination { grid-column: 1 / -1; display: flex; justify-content: center; margin-top: 32px; }
.shop-grid .bde-posts-pagination a, .shop-grid .bde-posts-pagination button { display: inline-flex; min-height: 48px; padding: 0 28px; align-items: center; border: 1px solid var(--ink); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 14px/1 var(--font-body); text-decoration: none; cursor: pointer; }
```

Preview the loop element after switching to see the exact tag the load-more control renders, then adjust the selector.

## 5. Sort as a dropdown

A `<select>` cannot navigate without JavaScript, so a dropdown-looking control is a toggled list of links:

```html
<div class="sortdd">
  <button class="sortdd-btn">Sort by ▾</button>
  <ul class="sortdd-menu">
    <li><a href="?orderby=menu_order">Featured</a></li>
    <li><a href="?orderby=date">Newest</a></li>
    <li><a href="?orderby=price">Price: low to high</a></li>
    <li><a href="?orderby=price-desc">Price: high to low</a></li>
    <li><a href="?orderby=popularity">Best sellers</a></li>
    <li><a href="?orderby=rating">Top rated</a></li>
  </ul>
</div>
<style>
  .sortdd { position: relative; }
  .sortdd-btn { min-height: 40px; padding: 0 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); font: 500 14px/1 var(--font-body); cursor: pointer; }
  .sortdd-menu { display: none; position: absolute; right: 0; top: calc(100% + 6px); min-width: 220px; list-style: none; margin: 0; padding: 6px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: 0 12px 32px rgba(0,0,0,.08); z-index: 20; }
  .sortdd.is-open .sortdd-menu { display: block; }
  .sortdd-menu a { display: block; padding: 10px 12px; border-radius: 6px; font: 14px/1.2 var(--font-body); color: var(--ink); text-decoration: none; }
  .sortdd-menu a:hover { background: var(--surface-alt); }
</style>
```

Interaction on the button: `click` → `toggle_class` on `.sortdd` with `is-open`. The native grid already renders WooCommerce's sorting `<select>` and result count; hide the select with `.shop-grid .woocommerce-ordering { display: none; }` when this dropdown replaces it, and keep the count.

## 6. Search results variant

The same template renders `?s=term&post_type=product`. `archive_title` prints "Search results: “term”". Style the no-results notice (`.shop-grid .woocommerce-info`) or override `loop/no-products-found.php` (see the skill) and, in the header, keep the search field visible on this page so the shopper can retry.

## 7. Custom card grid with the loop builder

For a card that must be a builder-editable Component or needs a DOM the native loop cannot give, the grid is a `bd-loop="products"` container holding ONE card in place of the `bd-woo="shop"` element. No shop loop hook fires in it (plugin badges, wishlists and quick view never show in these cards), so prefer a `content-product.php` override when the store relies on them.

```html
<section class="shop store">
  <div class="container">
    <div bd-loop="products" bd-loop-name="Product Card" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid">
      …card…
    </div>
  </div>
</section>
<style>
  /* raw mode: the container is the grid and the cards are its direct children */
  .shop-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; }
  .shop-grid .bde-posts-pagination { grid-column: 1 / -1; display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
  @media (max-width: 767px) { .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; } }
</style>
```

The query stays unset (the archive's URL decides the products; knobs are ignored with a warning) and pagination is on. Cards: `product-cards.md`; the grid sections with every loop cart button state: the **patterns** skill, `product-grids.md`.
