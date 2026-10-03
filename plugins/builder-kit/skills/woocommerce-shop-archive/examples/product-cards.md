# Product card examples

Cards for the loop-builder path: each goes inside a `bd-loop="products"` container and the loop repeats it per product. Each example is complete: the card markup and its CSS. Swap the Component name (`bd-loop-name`) when two loops need different cards. All values are bound; nothing is typed in. These cards fire no shop loop hooks, so a plugin's wishlist button or badge never shows in them; the native card (`bd-woo="shop"` / `bd-woo="products"`, styled or restructured through `content-product.php`) is the default and is covered in the skill itself.

## 1. Minimal fashion card (image, name, price; whole card is the link)

```html
<div bd-loop="products" bd-loop-name="Product Card" class="grid grid--3">
  <article class="fcard">
    <a class="fcard-link" bd-href="post_permalink">
      <img class="fcard-img" bd-src="product_image" bd-alt="product_title">
      <img class="fcard-img fcard-img--alt" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
      <span class="badge fcard-badge" bd-bind="product_sale"></span>
    </a>
    <h3 class="fcard-title" bd-bind="product_title"></h3>
    <p class="fcard-price" bd-bind="product_price"></p>
  </article>
</div>
<style>
  .grid--3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 24px; }
  .fcard { min-width: 0; }
  .fcard-link { position: relative; display: block; background: var(--surface-alt); overflow: hidden; }
  .fcard-img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: cover; }
  .fcard-img--alt { position: absolute; inset: 0; opacity: 0; transition: opacity .3s; }
  .fcard-link:hover .fcard-img--alt { opacity: 1; }
  .fcard-badge { position: absolute; top: 12px; left: 12px; }
  .fcard-title { margin: 14px 0 4px; font: 400 15px/1.4 var(--font-body); color: var(--ink); }
  .fcard-price { margin: 0; font: 400 15px/1.4 var(--font-body); color: var(--ink); }
  .fcard-price del { color: var(--ink-muted); margin-right: 6px; }
  .fcard-price ins { text-decoration: none; color: var(--accent); }
  @media (max-width: 767px) { .grid--3 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 12px; } }
</style>
```

## 2. Standard store card with add-to-cart, rating and category

```html
<div bd-loop="products" bd-loop-name="Product Card" class="grid grid--4">
  <article class="card">
    <a class="card-media" bd-href="post_permalink">
      <img class="card-img" bd-src="product_image" bd-alt="product_title">
      <span class="badge card-badge" bd-bind="product_sale"></span>
    </a>
    <div class="card-body">
      <span class="card-cat" bd-bind="product_terms" bd-params='{"taxonomy":"product_cat"}'></span>
      <h3 class="card-title" bd-bind="product_title"></h3>
      <div class="card-rating" bd-bind="product_rating"></div>
      <p class="card-price" bd-bind="product_price"></p>
      <div bd-woo="add-to-cart" class="card-cta"></div>
    </div>
  </article>
</div>
<style>
  .grid--4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; }
  .card { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .card-media { position: relative; display: block; border-radius: var(--radius); overflow: hidden; background: var(--surface-alt); }
  .card-img { display: block; width: 100%; aspect-ratio: var(--card-ratio); object-fit: cover; transition: transform .4s; }
  .card:hover .card-img { transform: scale(1.03); }
  .card-badge { position: absolute; top: 12px; left: 12px; }
  .card-body { display: flex; flex-direction: column; gap: 6px; }
  .card-cat { font: 500 12px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
  .card-cat a { color: inherit; text-decoration: none; }
  .card-cat:empty { display: none; }
  .card-title { margin: 0; font: 500 16px/1.3 var(--font-body); color: var(--ink); }
  .card-rating:empty { display: none; }
  .card-rating .star-rating { font-size: 12px; }
  .card-price { margin: 0; font: 600 16px/1.2 var(--font-body); }
  .card-price del { color: var(--ink-muted); font-weight: 400; margin-right: 6px; }
  .card-price ins { text-decoration: none; }
  .card-cta { margin-top: 4px; }
  .card-cta.breakdance-woocommerce a.button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--brand); border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; text-indent: 0; white-space: nowrap; }
  .card-cta.breakdance-woocommerce a.button:hover { background: var(--brand-hover); border-color: var(--brand-hover); }
  .card-cta.breakdance-woocommerce a.button::before { content: none; }                                   /* the builder's 40px loading spinner */
  .card-cta.breakdance-woocommerce a.button.loading { text-indent: 0; opacity: .85; pointer-events: none; }
  .card-cta.breakdance-woocommerce a.button.loading::after { content: ""; width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: card-spin .7s linear infinite; }
  @keyframes card-spin { to { transform: rotate(360deg); } }
  .card-cta.breakdance-woocommerce:has(a.added_to_cart) a.button.added { display: none; }                /* "View cart" takes the button's place */
  .card-cta a.added_to_cart { display: inline-flex; align-items: center; justify-content: center; width: auto; max-width: none; min-height: 44px; margin: 0; padding: 0 16px; border: 1px solid var(--success); border-radius: var(--radius); background: var(--success-bg); color: var(--success); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; }
  .card-cta a.added_to_cart:hover { background: var(--success); color: #fff; }
  @media (max-width: 1119px) { .grid--4 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 767px) { .grid--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; } }
</style>
```

## 3. Grocery card (bordered, compact, quantity-friendly, stock line)

```html
<div bd-loop="products" bd-loop-name="Grocery Card" class="grid grid--5">
  <article class="gcard">
    <a class="gcard-media" bd-href="post_permalink"><img class="gcard-img" bd-src="product_image" bd-alt="product_title"></a>
    <span class="badge gcard-badge" bd-bind="product_sale"></span>
    <h3 class="gcard-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
    <p class="gcard-stock" bd-bind="product_stock"></p>
    <div class="gcard-foot">
      <p class="gcard-price" bd-bind="product_price"></p>
      <div bd-woo="add-to-cart" class="gcard-cta"></div>
    </div>
  </article>
</div>
<style>
  .grid--5 { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
  .gcard { position: relative; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); min-width: 0; }
  .gcard:hover { box-shadow: 0 8px 24px rgba(0,0,0,.06); }
  .gcard-media { display: block; border-radius: 8px; overflow: hidden; }
  .gcard-img { display: block; width: 100%; aspect-ratio: 1 / 1; object-fit: contain; background: #fff; }
  .gcard-badge { position: absolute; top: 20px; left: 20px; }
  .gcard-title { margin: 0; font: 600 14px/1.35 var(--font-body); }
  .gcard-title a { color: var(--ink); text-decoration: none; }
  .gcard-stock { margin: 0; font: 12px/1.3 var(--font-body); color: var(--success); }
  .gcard-stock:empty { display: none; }
  .gcard-stock .out-of-stock { color: var(--error); }
  .gcard-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; }
  .gcard-price { margin: 0; font: 800 16px/1 var(--font-body); }
  .gcard-cta.breakdance-woocommerce a.button { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; min-height: 0; padding: 0; border: 0; border-radius: 50%; background: var(--brand); color: #fff; font-size: 0; text-indent: 0; }
  .gcard-cta.breakdance-woocommerce a.button::before { content: "+"; position: static; width: auto; height: auto; opacity: 1; font: 700 22px/1 var(--font-body); }
  .gcard-cta.breakdance-woocommerce a.button.loading::before { content: ""; width: 16px; height: 16px; border: 2px solid #fff; border-right-color: transparent; border-radius: 50%; animation: card-spin .7s linear infinite; }
  .gcard-cta.breakdance-woocommerce a.button.added { background: var(--success); }
  .gcard-cta.breakdance-woocommerce a.button.added::before { content: "✓"; font-size: 16px; }
  .gcard-cta a.added_to_cart { display: none; }
  @media (max-width: 1119px) { .grid--5 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  @media (max-width: 767px) { .grid--5 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } }
</style>
```

The `font-size: 0` plus `::before` turns the button label into a "+" icon; the text still exists for screen readers.

## 4. Horizontal list card (search results, comparison lists)

```html
<div bd-loop="products" bd-loop-name="Product Row" class="rows">
  <article class="rcard">
    <a class="rcard-media" bd-href="post_permalink"><img class="rcard-img" bd-src="product_image" bd-alt="product_title"></a>
    <div class="rcard-body">
      <h3 class="rcard-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
      <div class="rcard-rating" bd-bind="product_rating"></div>
      <p class="rcard-sku" bd-bind="product_sku" bd-params='{"beforecontent":"SKU "}'></p>
      <p class="rcard-stock" bd-bind="product_stock"></p>
    </div>
    <div class="rcard-side">
      <p class="rcard-price" bd-bind="product_price"></p>
      <div bd-woo="add-to-cart" class="rcard-cta"></div>
    </div>
  </article>
</div>
<style>
  .rows { display: grid; gap: 16px; }
  .rcard { display: grid; grid-template-columns: 120px minmax(0, 1fr) auto; gap: 24px; align-items: center; padding: 16px; border: 1px solid var(--line); border-radius: var(--radius); }
  .rcard-img { display: block; width: 120px; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 8px; }
  .rcard-title { margin: 0 0 6px; font: 600 17px/1.3 var(--font-body); }
  .rcard-title a { color: var(--ink); text-decoration: none; }
  .rcard-rating:empty, .rcard-sku:empty, .rcard-stock:empty { display: none; }
  .rcard-sku, .rcard-stock { margin: 4px 0 0; font: 13px/1.3 var(--font-body); color: var(--ink-muted); }
  .rcard-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .rcard-price { margin: 0; font: 700 18px/1 var(--font-body); }
  .rcard-cta a.button { display: inline-flex; min-height: 40px; padding: 0 18px; align-items: center; border-radius: var(--radius); background: var(--brand); color: #fff; font: 600 14px/1 var(--font-body); text-decoration: none; }
  @media (max-width: 767px) { .rcard { grid-template-columns: 88px minmax(0, 1fr); } .rcard-img { width: 88px; } .rcard-side { grid-column: 1 / -1; flex-direction: row; justify-content: space-between; } }
</style>
```

## 5. Card with regular and sale price shown separately, plus a "Save" line

Use `product_regular_price` / `product_sale_price` when the design wants full control over the two numbers (the combined `product_price` already renders `del`/`ins`).

```html
<article class="pcard">
  <a class="pcard-media" bd-href="post_permalink"><img class="pcard-img" bd-src="product_image" bd-alt="product_title"></a>
  <h3 class="pcard-title" bd-bind="product_title"></h3>
  <div class="pcard-prices">
    <span class="pcard-sale" bd-bind="product_sale_price"></span>
    <span class="pcard-reg" bd-bind="product_regular_price"></span>
  </div>
  <span class="pcard-flag" bd-bind="product_sale" bd-params='{"beforecontent":"On sale · "}'></span>
</article>
<style>
  .pcard-prices { display: flex; gap: 8px; align-items: baseline; }
  .pcard-sale { font: 700 17px/1 var(--font-body); color: var(--accent); }
  .pcard-sale:empty { display: none; }
  .pcard-reg { font: 500 15px/1 var(--font-body); color: var(--ink); }
  .pcard-sale:not(:empty) + .pcard-reg { text-decoration: line-through; color: var(--ink-muted); font-weight: 400; }
  .pcard-flag { font: 600 12px/1.2 var(--font-body); color: var(--accent); }
  .pcard-flag:empty { display: none; }
</style>
```

Check `preview-post` against a non-sale product: `product_sale_price` is empty there and the regular price shows plain.

## 6. Card for a stock-sensitive store (low stock urgency, sold-out overlay)

```html
<article class="scard">
  <a class="scard-media" bd-href="post_permalink">
    <img class="scard-img" bd-src="product_image" bd-alt="product_title">
    <span class="scard-stock" bd-bind="product_stock"></span>
  </a>
  <h3 class="scard-title" bd-bind="product_title"></h3>
  <p class="scard-price" bd-bind="product_price"></p>
  <div bd-woo="add-to-cart" class="scard-cta"></div>
</article>
<style>
  .scard-media { position: relative; display: block; }
  .scard-stock { position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 12px; font: 600 12px/1.2 var(--font-body); text-align: center; }
  .scard-stock:empty { display: none; }
  .scard-stock .in-stock { display: none; }
  .scard-stock .out-of-stock { display: block; background: rgba(22,24,29,.85); color: #fff; }
  .scard-stock .available-on-backorder { display: block; background: var(--info-bg); color: var(--info); }
</style>
```

WooCommerce writes "Only 3 left in stock" inside `.in-stock` when low-stock display is on (WooCommerce > Settings > Products > Inventory > Stock display format), so show `.in-stock` for that store type instead of hiding it.

## 7. Card with a quick "view" link and a wishlist slot (plugin-driven)

```html
<article class="wcard">
  <a class="wcard-media" bd-href="post_permalink"><img class="wcard-img" bd-src="product_image" bd-alt="product_title"></a>
  <div class="wcard-actions">
    <a class="wcard-view" bd-href="post_permalink">View</a>
    <div class="wcard-wish"><!-- wishlist plugin shortcode/element goes here via edit-post, if installed --></div>
  </div>
  <h3 class="wcard-title" bd-bind="product_title"></h3>
  <p class="wcard-price" bd-bind="product_price"></p>
</article>
```

Do not fake a wishlist heart with no plugin behind it. If the store has one (YITH, TI WishList), insert its shortcode with a Shortcode element in `.wcard-wish`; otherwise delete the slot.

## Card checklist

- Image ratio fixed, `object-fit: cover` (or `contain` on white-background catalogs).
- Title, price bound; badge, rating, stock, category bound with `:empty` handling.
- One link covers the image; the title is either bound text or its own bound link, never a link nested inside a heading.
- Add-to-cart is the `bd-woo="add-to-cart"` marker or absent.
- 2 columns on mobile; tap targets 44px.
- Component named (`bd-loop-name`).
