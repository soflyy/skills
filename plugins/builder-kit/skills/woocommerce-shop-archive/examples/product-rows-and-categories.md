# Product rows and category collections

Product rows with a query of their own, for the homepage, landing pages, category intros and "you may also like" bands.

## Product rows

The default row is the native Products List, an empty `bd-woo="products"` element that reuses the shop's card CSS (`.shop-grid` from the skill) and every loop hook. It emits with the element's defaults (9 newest, grid); set the query with `edit-post` right after (the element id is in the `html-to-page` response):

```html
<section class="section"><div class="container">
  <div class="section-head"><h2 class="section-title">New arrivals</h2><a class="btn btn--secondary" href="/shop/?orderby=date">See all</a></div>
  <div bd-woo="products" class="shop-grid home-grid"></div>
</div></section>
```

```jsonc
{ "post_id": 300, "operations": [ { "op": "update", "payload": { "element_id": 14, "properties": { "content": { "content": { "show_products": "all", "product_count": 8, "order_by": "date", "order": "DESC" } } } } } ] }
```

`show_products`: `all`, `featured` (the star in WooCommerce > Products), `sale`, `manually` (with `products`, an array of product ids: a curated set) or `query` (the same structured query object the loop elements take, php mode included, for a category, best sellers or anything else). Layout: `design.layout.layout` `grid` / `slider` / `masonry`, `design.layout.products_per_row`, `between_products`; parts under `design.elements.*`; `content.content.advanced.when_empty` for an empty-state Component. Never place it on an archive template.

### Custom-card rows with the loop builder

The same rows with your own card markup (no shop loop hooks fire in it; see the skill). On a page the loop's query is yours to set; without knobs the loop has no meaningful query.

```html
<!-- Newest -->
<section class="section"><div class="container">
  <div class="section-head"><h2 class="section-title">New arrivals</h2><a class="btn btn--secondary" href="/shop/?orderby=date">See all</a></div>
  <div bd-loop="products" bd-loop-name="Product Card" bd-limit="4" bd-orderby="date" bd-order="desc" class="grid grid--4">…card…</div>
</div></section>

<!-- Featured (starred in WooCommerce) -->
<div bd-loop="products" bd-loop-name="Product Card" bd-featured="true" bd-limit="4" class="grid grid--4">…card…</div>

<!-- One category, by slug -->
<div bd-loop="products" bd-loop-name="Product Card" bd-category="gift-sets" bd-limit="4" bd-orderby="menu_order" bd-order="asc" class="grid grid--4">…card…</div>

<!-- Random picks (a "Discover" band) -->
<div bd-loop="products" bd-loop-name="Product Card" bd-limit="4" bd-orderby="rand" class="grid grid--4">…card…</div>

<!-- Most reviewed -->
<div bd-loop="products" bd-loop-name="Product Card" bd-limit="4" bd-orderby="comment_count" bd-order="desc" class="grid grid--4">…card…</div>

<!-- Structured query JSON (shape from the loop element's query schema) -->
<div bd-loop="products" bd-loop-name="Product Card" bd-query='{"postsPerPage":8,"orderBy":"date","order":"DESC"}' class="grid grid--4">…card…</div>
```

## Rows the knobs cannot express

**On sale**, **best sellers** and **recently viewed** are not loop knobs. The native row takes sale directly and the others through `query`:

```jsonc
{ "post_id": 300, "operations": [ { "op": "update", "payload": { "element_id": 14,
  "properties": { "content": { "content": { "show_products": "sale", "product_count": 8, "order_by": "date", "order": "DESC" } },
                  "design": { "layout": { "layout": "slider", "products_per_row": 4, "between_products": { "number": 24, "unit": "px", "style": "24px" } },
                              "elements": { "rating": { "include": "disable" }, "excerpt": { "include": "disable" }, "categories": { "include": "disable" }, "image": { "show_second_image_on_hover": true } } } } } } ] }
```

Custom card with a php query: build the row with `bd-loop` as above (any knobs), then switch the loop's query to php mode with `edit-post` (read the loop schema for the query control path) returning:

```php
// on sale
return [ 'post_type' => 'product', 'posts_per_page' => 8, 'post__in' => array_merge([0], wc_get_product_ids_on_sale()), 'orderby' => 'date' ];
// best sellers
return [ 'post_type' => 'product', 'posts_per_page' => 8, 'meta_key' => 'total_sales', 'orderby' => 'meta_value_num', 'order' => 'DESC' ];
// in stock only, one category, cheapest first
return [ 'post_type' => 'product', 'posts_per_page' => 8, 'tax_query' => [ [ 'taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => 'mugs' ] ], 'meta_query' => [ [ 'key' => '_stock_status', 'value' => 'instock' ] ], 'meta_key' => '_price', 'orderby' => 'meta_value_num', 'order' => 'ASC' ];
```

`array_merge([0], …)` guards against an empty `post__in`, which would otherwise return every product.

## Related items on a page other than the product template

`bd-query` with a related source works on single templates; on a landing page name the category instead:

```html
<div bd-loop="products" bd-loop-name="Product Card" bd-category="accessories" bd-limit="4" bd-orderby="rand" class="grid grid--4">…card…</div>
```

## Two-up feature: one big card plus a row

```html
<section class="section"><div class="container feature">
  <a class="feature-big" href="/product-category/gift-sets/">
    <img src="/wp-content/uploads/gift-sets-hero.jpg" alt="Gift sets" width="800" height="1000">
    <span class="feature-big-label">Gift sets</span>
  </a>
  <div class="feature-side">
    <div class="section-head"><h2 class="section-title">Ready to gift</h2></div>
    <div bd-loop="products" bd-loop-name="Product Card" bd-category="gift-sets" bd-limit="4" class="grid grid--2">…card…</div>
  </div>
</div></section>
<style>
  .feature { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 48px; align-items: start; }
  .feature-big { position: relative; display: block; border-radius: var(--radius); overflow: hidden; }
  .feature-big img { display: block; width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4 / 5; }
  .feature-big-label { position: absolute; left: 24px; bottom: 24px; padding: 10px 16px; background: #fff; border-radius: var(--radius-pill); font: 600 14px/1 var(--font-body); color: var(--ink); }
  .grid--2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
  @media (max-width: 1023px) { .feature { grid-template-columns: minmax(0, 1fr); } }
</style>
```

The big tile links to a category archive with a static image on purpose (a merchandising choice, not product data). If it should always show the category's own image, make it a term loop with `bd-limit="1"` and `include` via `edit-post`.

## Category collections

### Tile grid with image, name, count

```html
<ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Category Tile" bd-limit="6" bd-orderby="count" bd-order="desc" class="cat-grid">
  <li class="cat-tile">
    <a class="cat-link" bd-href="term_permalink">
      <img class="cat-img" bd-src="woocommerce_category_image" bd-alt="term_name">
      <span class="cat-name" bd-bind="term_name"></span>
      <span class="cat-count" bd-bind="woocommerce_category_count" bd-params='{"aftercontent":" products"}'></span>
    </a>
  </li>
</ul>
<style>
  .cat-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .cat-link { position: relative; display: block; aspect-ratio: 4 / 3; border-radius: var(--radius); overflow: hidden; background: var(--brand); color: #fff; text-decoration: none; }
  .cat-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
  /* a term with no image renders the builder's placeholder, not an empty src: give this image a
     dynamic-data / is not empty display condition instead (see patterns/product-grids.md) */
  .cat-link:hover .cat-img { transform: scale(1.04); }
  .cat-name { position: absolute; left: 20px; bottom: 40px; font: 600 24px/1.1 var(--font-display); text-shadow: 0 1px 12px rgba(0,0,0,.4); }
  .cat-count { position: absolute; left: 20px; bottom: 18px; font: 500 13px/1.2 var(--font-body); opacity: .85; }
  @media (max-width: 767px) { .cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } .cat-name { font-size: 18px; bottom: 34px; } }
</style>
```

### Circular category row (beauty, food)

```html
<ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Category Circle" bd-limit="8" bd-orderby="name" bd-order="asc" class="circ-row">
  <li class="circ"><a class="circ-link" bd-href="term_permalink"><img class="circ-img" bd-src="woocommerce_category_image" bd-alt="term_name"><span class="circ-name" bd-bind="term_name"></span></a></li>
</ul>
<style>
  .circ-row { list-style: none; margin: 0; padding: 0; display: flex; gap: 32px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; }
  .circ { flex: 0 0 auto; scroll-snap-align: start; }
  .circ-link { display: flex; flex-direction: column; align-items: center; gap: 10px; text-decoration: none; color: var(--ink); width: 112px; }
  .circ-img { width: 112px; height: 112px; border-radius: 50%; object-fit: cover; border: 1px solid var(--line); }
  .circ-name { font: 500 14px/1.2 var(--font-body); text-align: center; }
</style>
```

### Pill row ("Popular right now") under a search hero

```html
<ul bd-loop="terms" bd-taxonomy="product_tag" bd-loop-name="Popular Tag" bd-limit="8" bd-orderby="count" bd-order="desc" class="pills">
  <li class="pill"><a class="pill-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
</ul>
<style>
  .pills { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .pill-link { display: inline-block; padding: 8px 14px; border-radius: var(--radius-pill); background: var(--surface-alt); color: var(--ink); font: 500 13px/1 var(--font-body); text-decoration: none; }
  .pill-link:hover { background: var(--ink); color: #fff; }
</style>
```

### Two-column category list for a footer or a mega menu

```html
<ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Category Link" bd-limit="20" bd-orderby="name" bd-order="asc" bd-hide-empty="false" class="cat-list">
  <li><a class="cat-list-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
</ul>
<style>
  .cat-list { list-style: none; margin: 0; padding: 0; columns: 2; column-gap: 32px; }
  .cat-list-link { display: block; padding: 6px 0; color: var(--ink); text-decoration: none; font: 14px/1.4 var(--font-body); }
</style>
```

`bd-hide-empty="false"` shows categories with no products (usually leave it on the default, hidden).

### Curated set: only these categories, in this order

Build the loop with `bd-loop="terms"` as above, then with `edit-post` enable the loop's query mode (`load_terms_by_query`) and return term query args (read the schema for the path):

```php
return [ 'taxonomy' => 'product_cat', 'include' => [19, 23, 31], 'orderby' => 'include', 'hide_empty' => false ];
```

Still a loop: names and URLs stay live when a category is renamed.
