# Homepage and merchandising sections

The homepage of a store is a merchandising surface: it routes shoppers to categories and products, and it earns trust. Build it as a normal page (`create-post`, then `html-to-page`), reusing the store design system, and make every product or category it shows come from a loop so it never goes stale. Set it as the front page with `set-home-page` when the user wants the store landing page there (some stores want the shop itself as the homepage; ask).

## Section blueprint (drop what does not serve the store)

1. **Announcement bar** (optional): free shipping threshold, current promotion. Lives in the header template, not the page, so it shows store-wide.
2. **Hero**: one message, one image or short loop, one primary CTA to the shop or the key category, an optional secondary CTA. Static copy is right here; a product image in the hero may be static too.
3. **Category tiles**: a `bd-loop="terms"` of `product_cat`, image plus name plus count, 3 to 6 tiles. This is the most-clicked section on most store homepages, so put it high.
4. **Featured / new / on sale product rows**: `bd-woo="products"`, the native Products List, with its query set by `edit-post` (below). Same card as the shop, every loop hook intact. 4 per row, 8 max.
5. **Value props / trust**: 3 or 4 short items (shipping, returns, secure checkout, support). Real policies only; ask.
6. **Editorial or story**: about the brand, a lookbook image band, or a single featured product (`EssentialElements\Product` for one complete classic product, or a designed static section linking to it).
7. **Reviews / social proof**: store reviews (static testimonials are fine), press logos, or Instagram-style grid.
8. **Newsletter**: Form Builder element configured via `set-element-form`.

## Product rows on a page

The default row is an empty `bd-woo="products"` element: the Products List, WooCommerce's hooked card over a query of its own, reusing the shop's `.shop-grid` CSS. It emits with the element's defaults (9 newest, grid); set the query with `edit-post` right after, using the element id from the `html-to-page` response:

```html
<section class="section"><div class="container">
  <div class="section-head"><h2 class="section-title">New this week</h2><a class="btn btn--secondary" href="/shop/?orderby=date">See all</a></div>
  <div bd-woo="products" class="shop-grid home-grid"></div>
</div></section>
```

```jsonc
{ "post_id": 12, "operations": [ { "op": "update", "payload": { "element_id": 9, "properties": { "content": { "content": { "show_products": "featured", "product_count": 4 } } } } } ] }
```

`show_products` is `all`, `featured` (the star in WooCommerce > Products), `sale`, `manually` (plus `products`, an array of ids) or `query` (the loop elements' structured query, php mode included); `product_count`, `order_by` (`date` / `price` / `rand`), `order`; `design.layout.layout` `grid` / `slider` / `masonry`. Never on an archive template.

### Custom-card rows: the loop builder

For a row whose card markup must be yours (no shop loop hooks fire in it), use a `bd-loop="products"` container. On a normal page (not an archive template) its query is yours to set; without it the loop is not meaningful. The converter reads these attributes:

```html
<!-- newest 8 products -->
<div bd-loop="products" bd-loop-name="Home Product Card" bd-limit="8" bd-orderby="date" bd-order="desc" class="home-grid">…one card…</div>

<!-- featured products (the star in WooCommerce > Products) -->
<div bd-loop="products" bd-loop-name="Home Product Card" bd-featured="true" bd-limit="4" class="home-grid">…</div>

<!-- one category -->
<div bd-loop="products" bd-loop-name="Home Product Card" bd-category="accessories" bd-limit="4" class="home-grid">…</div>

<!-- anything else: a structured query as JSON -->
<div bd-loop="products" bd-loop-name="Home Product Card" bd-query='{"postsPerPage":4,"orderBy":"rand"}' class="home-grid">…</div>
```

`bd-orderby` accepts date, modified, title, rand, menu_order, comment_count. "On sale" and "best sellers" are not knobs: on the native row they are `show_products: "sale"` and a php-mode `query`; on a loop-builder row switch the loop's query to php mode with `edit-post` (the shop skill's `product-rows-and-categories.md` has the arrays).

Each row's card is a Component named by `bd-loop-name`; give all homepage rows the same name so they share one card, and give the shop grid its own name if its card differs.

## Category tiles

```html
<section class="section">
  <div class="container">
    <div class="section-head"><h2 class="section-title">Shop by category</h2><a class="btn btn--secondary" href="/shop/">All products</a></div>
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Category Tile" bd-limit="6" bd-orderby="count" bd-order="desc" class="cat-grid">
      <li class="cat-tile">
        <a class="cat-link" bd-href="term_permalink">
          <img class="cat-img" bd-src="woocommerce_category_image" bd-alt="term_name">
          <span class="cat-name" bd-bind="term_name"></span>
          <span class="cat-count" bd-bind="woocommerce_category_count" bd-params='{"aftercontent":" products"}'></span>
        </a>
      </li>
    </ul>
  </div>
</section>
<style>
  .cat-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .cat-link { position: relative; display: block; aspect-ratio: 1 / 1; border-radius: var(--radius); overflow: hidden; text-decoration: none; color: #fff; }
  .cat-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
  .cat-link:hover .cat-img { transform: scale(1.04); }
  .cat-name { position: absolute; left: 20px; bottom: 40px; font: 600 22px/1.1 var(--font-display); text-shadow: 0 1px 12px rgba(0,0,0,.4); }
  .cat-count { position: absolute; left: 20px; bottom: 18px; font: 500 13px/1.2 var(--font-body); opacity: .85; }
</style>
```

Categories without an image render a broken tile: either upload images (tell the user which categories lack one) or design the tile with a solid background and only text. Never fake a category link with a search URL; the term permalink is the archive URL that your product-archive template renders.

## Hero image and copy

Static, on purpose. Lead with the outcome ("Sleep cooler, every night"), one sentence of proof, one primary button to the best-selling category. Avoid hero sliders; one strong image outperforms a carousel. Keep the hero under 80vh so category tiles are visible without scrolling on desktop.

## Trust row

```html
<ul class="trust">
  <li class="trust-item"><svg …></svg><span><strong>Free shipping</strong> over $75</span></li>
  <li class="trust-item"><svg …></svg><span><strong>30-day returns</strong>, no questions</span></li>
  <li class="trust-item"><svg …></svg><span><strong>Secure checkout</strong></span></li>
</ul>
```

Only claim what the user confirmed. If they have not told you the policy, ask; a wrong shipping promise on a live store costs money.
