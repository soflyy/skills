# Product grids

These eight are loop-builder sections: your own card markup, so no shop loop hook fires in them and a plugin's wishlist button, badge or quick view never appears in these cards. The default grid is the native one, `bd-woo="shop"` on the archive and `bd-woo="products"` on a page, styled as the **woocommerce-shop-archive** skill shows; reach for these when the card's DOM must be yours or builder-editable.

Eight product grid sections, every value dynamic and every card carrying the interactive add-to-cart. The container is `bd-loop="products"` in raw mode: the grid rule goes on the container, the card is the single item, and the converter mints the card component (`bd-loop-name`). On the shop and category archive template leave the query unset (the loop inherits the URL); on a page add knobs (`bd-limit`, `bd-orderby`, `bd-featured`, `bd-category`, `bd-query`).

**The add-to-cart**: `<div bd-woo="add-to-cart">` inside the card becomes the Loop Cart Button. It renders WooCommerce's `a.button.add_to_cart_button.ajax_add_to_cart` for simple products (AJAX, no reload; the mini cart updates, and opens when `open_cart_on_add` is on), "Select options" for variable and grouped products, and "Buy" for external ones. WooCommerce adds `.loading` while the request runs, then `.added` on success and appends `a.added_to_cart` ("View cart") after the button. Style those four states; never mock the button.

**The second image on hover**: a second `<img>` bound to `product_gallery_image` with `image_index` 0, stacked on the main image and faded in on hover. A product with no gallery has nothing to swap to, and the image does **not** come out empty: a bound image whose field resolves to nothing renders the builder's placeholder SVG, so the card fades from the real photo to a grey tile. Give that image a display condition so it never renders on those products (see "Products with one image" below).

Shared CSS (include once per template):

```css
.pg-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; }
.pg-grid .bde-posts-pagination { grid-column: 1 / -1; display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
.pg-grid .page-numbers { min-width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: var(--radius); text-decoration: none; color: var(--ink); font: 500 14px/1 var(--font-body); }
.pg-grid .page-numbers.current { background: var(--ink); color: #fff; border-color: var(--ink); }
.pg-media { position: relative; display: block; overflow: hidden; border-radius: var(--radius); background: var(--surface-alt); }
.pg-img { display: block; width: 100%; aspect-ratio: var(--card-ratio); object-fit: cover; transition: transform .5s ease, opacity .35s ease; }
.pg-img--alt { position: absolute; inset: 0; opacity: 0; }
.pg-card:hover .pg-img--alt, .pg-card:focus-within .pg-img--alt { opacity: 1; }
.pg-card:hover .pg-img--main:not(:only-of-type), .pg-card:focus-within .pg-img--main:not(:only-of-type) { opacity: 0; }
.pg-badge { position: absolute; top: 12px; left: 12px; z-index: 1; }
.pg-title { margin: 0; font: 500 15px/1.35 var(--font-body); color: var(--ink); }
.pg-title a { color: inherit; text-decoration: none; }
.pg-price { margin: 0; font: 600 15px/1.2 var(--font-body); color: var(--ink); }
.pg-price del { color: var(--ink-muted); font-weight: 400; margin-right: 6px; }
.pg-price ins { text-decoration: none; }
.pg-rating:empty, .pg-cat:empty, .pg-stock:empty { display: none; }
.pg-rating .star-rating { font-size: 12px; }
/* the loop cart button, all states (reset + "Add to cart 1" from patterns/loop-cart-button.md: the button becomes "View cart").
   .pg-cta.breakdance-woocommerce doubles the class the element root carries: the woo stylesheet's a.button.add_to_cart_button rule is (0,3,1) and a plain .pg-cta.breakdance-woocommerce a.button would lose to it */
.pg-cta { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; align-items: stretch; }
.pg-cta.breakdance-woocommerce a.button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; max-width: none; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--brand); border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; text-indent: 0; white-space: nowrap; cursor: pointer; transition: background .15s, color .15s, border-color .15s, opacity .15s; }
.pg-cta.breakdance-woocommerce a.button:hover { background: var(--brand-hover); border-color: var(--brand-hover); color: var(--on-brand); }
.pg-cta.breakdance-woocommerce a.button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
/* loading: the builder hides the label (text-indent) and drops a 40px spinner ::before; keep the label, use a 14px spinner after it */
.pg-cta.breakdance-woocommerce a.button::before { content: none; }
.pg-cta.breakdance-woocommerce a.button.loading { text-indent: 0; opacity: .85; pointer-events: none; }
.pg-cta.breakdance-woocommerce a.button.loading::after { content: ""; display: inline-block; width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: pg-spin .7s linear infinite; }
@keyframes pg-spin { to { transform: rotate(360deg); } }
/* added: the inserted "View cart" link replaces the button at the same size instead of wrapping under it as a second button (the woo stylesheet gives .added_to_cart width: max-content, so reset the width too) */
.pg-cta.breakdance-woocommerce:has(a.added_to_cart) a.button.added { display: none; }
.pg-cta a.added_to_cart { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; max-width: none; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--success); border-radius: var(--radius); background: var(--success-bg); color: var(--success); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; white-space: nowrap; }
.pg-cta a.added_to_cart::before { content: ""; width: 14px; height: 14px; background: var(--success); -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / 10px no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / 10px no-repeat; }
.pg-cta a.added_to_cart:hover { background: var(--success); color: #fff; }
.pg-cta a.added_to_cart:hover::before { background: #fff; }
```

The `@keyframes` block is preserved verbatim by the importer. Copy the `@media` queries in each variant from `get-breakpoints`.

## Product Grid 1: quick-add on hover (standard store)

Use when: the default shop grid. The button slides up over the image on hover and focus, stays visible on touch screens, and the second image swaps in.

```
[ image (hover: alt + ▶ Add) ] ×4
  Title
  ★★★★☆ (12)
  $48
```

```html
<section class="section pg1">
  <div class="container">
    <div class="section-head"><h2 class="section-title">New arrivals</h2><a class="btn btn--secondary" href="/shop/?orderby=date">View all</a></div>
    <div bd-loop="products" bd-loop-name="Product Card" bd-limit="8" bd-orderby="date" bd-order="desc" class="pg-grid">
      <article class="pg-card pg1-card">
        <div class="pg1-media-wrap">
          <a class="pg-media" bd-href="post_permalink">
            <img class="pg-img pg-img--main" bd-src="product_image" bd-alt="product_title">
            <img class="pg-img pg-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
            <span class="badge pg-badge" bd-bind="product_sale"></span>
          </a>
          <div bd-woo="add-to-cart" class="pg-cta pg1-cta"></div>
        </div>
        <div class="pg1-body">
          <h3 class="pg-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
          <div class="pg-rating" bd-bind="product_rating"></div>
          <p class="pg-price" bd-bind="product_price"></p>
        </div>
      </article>
    </div>
  </div>
</section>
<style>
  .pg1-card { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .pg1-media-wrap { position: relative; }
  .pg1-cta { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 2; opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .2s ease; }
  .pg1-card:hover .pg1-cta, .pg1-card:focus-within .pg1-cta { opacity: 1; transform: none; }
  .pg1-body { display: flex; flex-direction: column; gap: 4px; }
  @media (max-width: 1119px) { .pg-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 767px) {
    .pg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
    .pg1-cta { position: static; opacity: 1; transform: none; margin-top: 8px; }
  }
</style>
```

The button sits in a positioned wrapper with the media, anchored to the photo's bottom edge, so it never depends on the image height. On touch screens the hover state cannot be relied on: under the phone breakpoint the button is static and always visible.

## Product Grid 2: bar slides up from the image bottom (fashion)

Use when: a quieter card where the add action is a full-width bar that rises from the bottom edge of the photo; 3 columns, portrait photos, no rating.

```html
<div bd-loop="products" bd-loop-name="Product Card" class="pg-grid pg-grid--3">
  <article class="pg-card pg2-card">
    <div class="pg2-media-wrap">
      <a class="pg-media" bd-href="post_permalink">
        <img class="pg-img pg-img--main" bd-src="product_image" bd-alt="product_title">
        <img class="pg-img pg-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
        <span class="badge pg-badge" bd-bind="product_sale"></span>
      </a>
      <div bd-woo="add-to-cart" class="pg-cta pg2-cta"></div>
    </div>
    <div class="pg2-body">
      <h3 class="pg-title pg2-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <p class="pg-price pg2-price" bd-bind="product_price"></p>
    </div>
  </article>
</div>
<style>
  .pg-grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 24px; }
  .pg2-card { min-width: 0; }
  .pg2-media-wrap { position: relative; overflow: hidden; border-radius: 0; }
  .pg2-media-wrap .pg-media { border-radius: 0; }
  .pg2-cta { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; transform: translateY(100%); transition: transform .25s ease; }
  .pg2-cta a.button { border-radius: 0; background: rgba(22,24,29,.92); backdrop-filter: blur(4px); min-height: 48px; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; }
  .pg2-cta a.button.added { background: var(--success); }
  .pg2-card:hover .pg2-cta, .pg2-card:focus-within .pg2-cta { transform: none; }
  .pg2-body { display: flex; justify-content: space-between; gap: 12px; margin-top: 12px; }
  .pg2-title { font-weight: 400; }
  .pg2-price { font-weight: 400; }
  @media (max-width: 1023px) { .pg-grid--3 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 12px; } .pg2-cta { position: static; transform: none; margin-top: 8px; } }
</style>
```

## Product Grid 3: always-visible button, bordered cards (grocery, supplies)

Use when: repeat-purchase catalogs where shoppers add many items quickly; 5 columns, square photos on white, stock line, round "+" button.

```html
<div bd-loop="products" bd-loop-name="Grocery Card" class="pg-grid pg-grid--5">
  <article class="pg-card pg3-card">
    <a class="pg-media pg3-media" bd-href="post_permalink">
      <img class="pg-img pg-img--main pg3-img" bd-src="product_image" bd-alt="product_title">
      <img class="pg-img pg-img--alt pg3-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
    </a>
    <span class="badge pg3-badge" bd-bind="product_sale"></span>
    <h3 class="pg-title pg3-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
    <p class="pg-stock pg3-stock" bd-bind="product_stock"></p>
    <div class="pg3-foot">
      <p class="pg-price pg3-price" bd-bind="product_price"></p>
      <div bd-woo="add-to-cart" class="pg-cta pg3-cta"></div>
    </div>
  </article>
</div>
<style>
  .pg-grid--5 { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
  .pg3-card { position: relative; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); min-width: 0; transition: box-shadow .15s; }
  .pg3-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,.06); }
  .pg3-media { border-radius: 8px; background: #fff; }
  .pg3-img { aspect-ratio: 1 / 1; object-fit: contain; }
  .pg3-badge { position: absolute; top: 20px; left: 20px; }
  .pg3-title { font: 600 14px/1.35 var(--font-body); }
  .pg3-stock { margin: 0; font: 12px/1.3 var(--font-body); color: var(--success); }
  .pg3-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; }
  .pg3-price { font: 800 16px/1 var(--font-body); }
  .pg3-cta { width: auto; }
  .pg3-cta.breakdance-woocommerce a.button { width: 40px; height: 40px; min-height: 0; padding: 0; border-radius: 50%; font-size: 0; }
  .pg3-cta.breakdance-woocommerce a.button::before { content: "+"; font: 700 22px/1 var(--font-body); }
  .pg3-cta.breakdance-woocommerce a.button.loading::before { content: none; }
  .pg3-cta.breakdance-woocommerce a.button.added { background: var(--success); border-color: var(--success); }
  .pg3-cta.breakdance-woocommerce a.button.added::before { content: "✓"; font-size: 16px; }
  .pg3-cta.breakdance-woocommerce:has(a.added_to_cart) a.button.added { display: inline-flex; }
  .pg3-cta a.added_to_cart { display: none; }
  @media (max-width: 1119px) { .pg-grid--5 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  @media (max-width: 767px) { .pg-grid--5 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } }
</style>
```

"Select options" on a variable product also renders as the round button; it links to the product page, which is the right behaviour for variations.

## Product Grid 4: editorial 3-up with category label and text "Add"

Use when: lifestyle brands where the button must not compete with photography; the add action is a text link under the price and the image swap is the main hover cue.

```html
<div bd-loop="products" bd-loop-name="Product Card" class="pg-grid pg-grid--3 pg4-grid">
  <article class="pg-card pg4-card">
    <a class="pg-media" bd-href="post_permalink">
      <img class="pg-img pg-img--main" bd-src="product_image" bd-alt="product_title">
      <img class="pg-img pg-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
    </a>
    <div class="pg4-body">
      <span class="pg-cat pg4-cat" bd-bind="product_terms" bd-params='{"taxonomy":"product_cat"}'></span>
      <h3 class="pg-title pg4-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <div class="pg4-row">
        <p class="pg-price" bd-bind="product_price"></p>
        <div bd-woo="add-to-cart" class="pg-cta pg4-cta"></div>
      </div>
    </div>
  </article>
</div>
<style>
  .pg4-grid { gap: 56px 32px; }
  .pg4-card { min-width: 0; }
  .pg4-card .pg-media { border-radius: 2px; }
  .pg4-body { display: grid; gap: 6px; margin-top: 16px; }
  .pg4-cat { font: 500 11px/1.2 var(--font-body); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
  .pg4-cat a { color: inherit; text-decoration: none; }
  .pg4-title { font: 400 17px/1.3 var(--font-display); }
  .pg4-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
  .pg4-cta { width: auto; }
  .pg4-cta.breakdance-woocommerce a.button { width: auto; min-height: 0; padding: 0; background: transparent; color: var(--ink); font: 500 13px/1 var(--font-body); letter-spacing: .08em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 4px; border-radius: 0; }
  .pg4-cta.breakdance-woocommerce a.button:hover { background: transparent; color: var(--ink-muted); }
  .pg4-cta.breakdance-woocommerce a.button.added { background: transparent; border-color: transparent; color: var(--success); }
  .pg4-cta.breakdance-woocommerce a.button.added::after { content: "✓"; }
  .pg4-cta.breakdance-woocommerce:has(a.added_to_cart) a.button.added { display: inline-flex; }
  .pg4-cta a.added_to_cart { display: none; }
  @media (max-width: 767px) { .pg4-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 12px; } }
</style>
```

## Product Grid 5: horizontal scroll row (homepage bands)

Use when: a "Best sellers" or "Recently added" band that should not take a full grid's height; scroll-snap on every device, no slider script.

```html
<section class="section pg5">
  <div class="container"><div class="section-head"><h2 class="section-title">Best sellers</h2><a class="btn btn--secondary" href="/shop/?orderby=popularity">See all</a></div></div>
  <div bd-loop="products" bd-loop-name="Product Card" bd-limit="10" bd-orderby="comment_count" bd-order="desc" class="pg5-row">
    <article class="pg-card pg5-card">
      <div class="pg1-media-wrap">
        <a class="pg-media" bd-href="post_permalink">
          <img class="pg-img pg-img--main" bd-src="product_image" bd-alt="product_title">
          <img class="pg-img pg-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
          <span class="badge pg-badge" bd-bind="product_sale"></span>
        </a>
        <div bd-woo="add-to-cart" class="pg-cta pg1-cta"></div>
      </div>
      <h3 class="pg-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <p class="pg-price" bd-bind="product_price"></p>
    </article>
  </div>
</section>
<style>
  .pg5-row { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 4px max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter))) 16px; scrollbar-width: none; }
  .pg5-row::-webkit-scrollbar { display: none; }
  .pg5-card { flex: 0 0 260px; scroll-snap-align: start; display: grid; gap: 8px; }
  .pg1-media-wrap { position: relative; }
  .pg1-cta { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 2; opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .2s ease; }
  .pg5-card:hover .pg1-cta, .pg5-card:focus-within .pg1-cta { opacity: 1; transform: none; }
  @media (max-width: 767px) { .pg5-card { flex-basis: 68vw; } .pg1-cta { opacity: 1; transform: none; } }
</style>
```

The row is a loop with a query, so it works on any page; on an archive it would inherit the main query, which is not what a band wants, so keep bands off archive templates.

## Product Grid 6: featured product plus grid

Use when: a homepage or category intro that leads with one hero product (a 2×2 cell) and fills the rest of the grid with the standard card.

Two loops: a one-item loop for the hero and the standard loop for the rest. They are separate Components with separate queries, so the hero can be the featured product and the grid the newest.

```html
<div class="pg6-layout">
  <div bd-loop="products" bd-loop-name="Hero Product Card" bd-featured="true" bd-limit="1" class="pg6-hero-loop">
    <article class="pg-card pg6-hero">
      <div class="pg1-media-wrap">
        <a class="pg-media" bd-href="post_permalink">
          <img class="pg-img pg-img--main pg6-hero-img" bd-src="product_image" bd-alt="product_title">
          <img class="pg-img pg-img--alt pg6-hero-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
          <span class="badge pg-badge" bd-bind="product_sale"></span>
        </a>
        <div bd-woo="add-to-cart" class="pg-cta pg1-cta"></div>
      </div>
      <div class="pg6-hero-body">
        <span class="eyebrow">Featured</span>
        <h3 class="pg-title pg6-hero-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
        <p class="pg6-hero-excerpt" bd-bind="post_excerpt" bd-params='{"truncate":"140"}'></p>
        <p class="pg-price pg6-hero-price" bd-bind="product_price"></p>
      </div>
    </article>
  </div>
  <div bd-loop="products" bd-loop-name="Product Card" bd-limit="4" bd-orderby="date" bd-order="desc" class="pg-grid pg6-grid">
    <article class="pg-card pg1-card">…Product Grid 1 card…</article>
  </div>
</div>
<style>
  .pg6-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 32px; align-items: start; }
  .pg6-hero { display: grid; gap: 16px; }
  .pg6-hero-img { aspect-ratio: 1 / 1; }
  .pg6-hero-body { display: grid; gap: 8px; }
  .pg6-hero-title { font: 600 24px/1.2 var(--font-display); }
  .pg6-hero-excerpt { margin: 0; color: var(--ink-muted); font: 15px/1.6 var(--font-body); }
  .pg6-hero-price { font-size: 18px; }
  .pg6-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
  .pg1-media-wrap { position: relative; }
  .pg1-cta { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 2; opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .2s ease; }
  .pg-card:hover .pg1-cta, .pg-card:focus-within .pg1-cta { opacity: 1; transform: none; }
  @media (max-width: 1023px) { .pg6-layout { grid-template-columns: minmax(0, 1fr); } }
  @media (max-width: 767px) { .pg1-cta { opacity: 1; transform: none; position: static; margin-top: 8px; } }
</style>
```

A `bd-limit="1"` loop with `bd-featured` shows the first featured product. The filter is live: starring or un-starring a product in WooCommerce changes what the loop shows, and while none is starred the loop is empty (the converter warns).

## Product Grid 7: list rows with add-to-cart at the right (B2B, parts, compare)

Use when: shoppers scan by name, SKU and price rather than by photo; each row has a thumbnail, details, stock, price and the button.

```html
<div bd-loop="products" bd-loop-name="Product Row" class="pg7-list">
  <article class="pg-card pg7-row">
    <a class="pg-media pg7-media" bd-href="post_permalink">
      <img class="pg-img pg-img--main pg7-img" bd-src="product_image" bd-alt="product_title">
      <img class="pg-img pg-img--alt pg7-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
    </a>
    <div class="pg7-body">
      <h3 class="pg-title pg7-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <p class="pg7-meta"><span bd-bind="product_sku" bd-params='{"beforecontent":"SKU "}'></span> · <span bd-bind="product_terms" bd-params='{"taxonomy":"product_cat"}'></span></p>
      <div class="pg-rating" bd-bind="product_rating"></div>
      <p class="pg-stock pg7-stock" bd-bind="product_stock"></p>
    </div>
    <div class="pg7-side">
      <p class="pg-price pg7-price" bd-bind="product_price"></p>
      <div bd-woo="add-to-cart" class="pg-cta pg7-cta"></div>
    </div>
  </article>
</div>
<style>
  .pg7-list { display: grid; gap: 12px; }
  .pg7-row { display: grid; grid-template-columns: 112px minmax(0, 1fr) 200px; gap: 24px; align-items: center; padding: 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); transition: border-color .15s; }
  .pg7-row:hover { border-color: var(--ink); }
  .pg7-media { width: 112px; border-radius: 8px; }
  .pg7-img { aspect-ratio: 1 / 1; }
  .pg7-title { font: 600 16px/1.3 var(--font-body); }
  .pg7-meta { margin: 4px 0 6px; font: 13px/1.3 var(--font-body); color: var(--ink-muted); }
  .pg7-meta a { color: inherit; text-decoration: none; }
  .pg7-stock { margin: 4px 0 0; font: 13px/1.3 var(--font-body); color: var(--success); }
  .pg7-side { display: grid; gap: 10px; justify-items: end; }
  .pg7-price { font: 700 18px/1 var(--font-body); }
  .pg7-cta { width: 100%; }
  @media (max-width: 767px) { .pg7-row { grid-template-columns: 80px minmax(0, 1fr); } .pg7-media { width: 80px; } .pg7-side { grid-column: 1 / -1; grid-template-columns: auto 1fr; align-items: center; justify-items: stretch; } }
</style>
```

## Product Grid 8: deals grid with savings emphasised

Use when: a sale category or "Deals" page; regular and sale price shown separately, a bold savings badge, and a bordered card that reads as an offer. Use it on a `specific-product-archive` template for the sale category, or on a page with a php-mode "on sale" query (see the shop skill).

```html
<div bd-loop="products" bd-loop-name="Deal Card" class="pg-grid pg8-grid">
  <article class="pg-card pg8-card">
    <div class="pg1-media-wrap">
      <a class="pg-media" bd-href="post_permalink">
        <img class="pg-img pg-img--main" bd-src="product_image" bd-alt="product_title">
        <img class="pg-img pg-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
        <span class="badge pg8-flag" bd-bind="product_sale"></span>
      </a>
      <div bd-woo="add-to-cart" class="pg-cta pg1-cta"></div>
    </div>
    <div class="pg8-body">
      <h3 class="pg-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <div class="pg8-prices">
        <span class="pg8-sale" bd-bind="product_sale_price"></span>
        <span class="pg8-reg" bd-bind="product_regular_price"></span>
      </div>
      <p class="pg8-ship">Free shipping over $75</p>
    </div>
  </article>
</div>
<style>
  .pg8-grid { gap: 24px 20px; }
  .pg8-card { border: 1px solid var(--line); border-radius: var(--radius); padding: 12px; background: var(--surface); }
  .pg8-card .pg-media { border-radius: 8px; }
  .pg8-flag { position: absolute; top: 10px; left: 10px; z-index: 1; background: var(--error); }
  .pg8-body { display: grid; gap: 6px; padding: 12px 4px 4px; }
  .pg8-prices { display: flex; align-items: baseline; gap: 8px; }
  .pg8-sale { font: 800 20px/1 var(--font-body); color: var(--error); }
  .pg8-sale:empty { display: none; }
  .pg8-reg { font: 500 15px/1 var(--font-body); color: var(--ink); }
  .pg8-sale:not(:empty) + .pg8-reg { text-decoration: line-through; color: var(--ink-muted); font-weight: 400; }
  .pg8-ship { margin: 0; font: 12px/1.3 var(--font-body); color: var(--success); }
  .pg1-media-wrap { position: relative; }
  .pg1-cta { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 2; opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .2s ease; }
  .pg8-card:hover .pg1-cta, .pg8-card:focus-within .pg1-cta { opacity: 1; transform: none; }
  @media (max-width: 767px) { .pg8-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } .pg1-cta { opacity: 1; transform: none; } }
</style>
```

The flag renders WooCommerce's sale text only on sale products (`product_sale` is empty otherwise). A percentage saved is not a dynamic field; a plugin or a custom field can provide it, in which case bind it into the flag with `bd-bind`. Preview against a non-sale product too: the sale price is empty there, the regular price shows plain and the flag disappears.

## Products with one image: switching the hover image off

A bound image whose field resolves to nothing does not render an empty `src`. The Fundamental Image element falls back to a 540x540 placeholder SVG, so on a product with no gallery the card fades from the real photo to a grey tile on hover. `[src=""]` never matches it, and matching the placeholder data URI is not something to build on.

The fix is a display condition on the hover image itself, so the element does not render at all when there is no gallery image at that index. Take the id from `get-post-tree` after the page is built (it is the image inside the loop's Component, so one call sets it for every card), then:

```jsonc
{ "post_id": 230, "element_id": 27, "rule_groups": [[
  { "ruleSlug": "dynamic-data",
    "operand": "is not empty",
    "ruleDynamic": "[breakdance_dynamic field='product_gallery_image' params='{\"image_index\":0}']",
    "ruleDynamicMeta": { "field": "product_gallery_image", "shortcode": "[breakdance_dynamic field='product_gallery_image' params='{\"image_index\":0}']", "attributes": { "image_index": 0 } } } ]] }
```

Three things about that call:

- `dynamic-data` is the general-purpose condition: it evaluates any dynamic field and its operands include `is empty` and `is not empty`. Confirm the operand strings with `get-element-conditions` rather than typing them from memory.
- The field goes in `ruleDynamic` as a **shortcode**, and binding parameters travel as one `params` attribute holding JSON, not as separate shortcode attributes. `params='{"image_index":0}'` is the shape the converter itself emits, so it matches what the `bd-params` on the image produced.
- Display conditions are evaluated per rendered node, so inside a loop the condition is tested against each product in turn. One condition on the Component's image covers the whole grid.

The same applies to every optional bound image, not just this one: a category tile bound to a term image, a gallery cell beyond the third photo, a brand logo from a custom field. Where the image is optional, condition it; the placeholder is what you get otherwise.

## Checklist for every grid

- Container is the loop and the grid; the card is its only child; `bd-loop-name` set.
- Archive template: no query knobs; page: knobs set.
- Main image, alt image, title, price, badge and any rating, stock, category and SKU are bound; nothing typed.
- The hover image carries the `dynamic-data` / `is not empty` display condition, so products without a gallery never fade to the placeholder.
- Button states styled: rest, hover, `.loading`, `.added`, and the `.added_to_cart` link shown or hidden on purpose (the shared `.pg-cta` rules are the reset plus "Add to cart 1" from `loop-cart-button.md`; pick another design there when the card wants it).
- Mobile: 2 columns (or the row/list variant), the button visible without hover.
- Mini cart `open_cart_on_add` on, so an AJAX add gives feedback beyond the button.
