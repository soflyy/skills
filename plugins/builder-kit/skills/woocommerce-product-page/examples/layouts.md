# Product page layout examples

Each is the full HTML for the `product` template, one `html-to-page` call. The shared CSS for the add-to-cart internals and notices is in `buy-box.md`; include it in every layout's `<style>`.

## 1. Standard: gallery left, sticky summary right, accordion below

The default. Ratio 7/5, thumbnails under the gallery. Best for most stores, and the layout the skill's marker contract is drawn from.

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

<style>
  .pdp { padding-block: 24px 80px; }
  .pdp-crumbs { font: 13px/1.4 var(--font-body); color: var(--ink-muted); margin-bottom: 20px; }
  .pdp-crumbs a { color: inherit; text-decoration: none; }
  .pdp-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }

  /* gallery: fixed geometry, fits the viewport */
  .pdp-media { display: grid; gap: 12px; }
  .pdp-gallery { aspect-ratio: var(--card-ratio); max-height: min(80vh, 720px); border-radius: var(--radius); overflow: hidden; background: var(--surface-alt); }
  .pdp-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; background: var(--surface-alt); opacity: .55; transition: opacity .2s; cursor: pointer; }
  .pdp-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .pdp-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .pdp-thumbs .swiper-slide-thumb-active { opacity: 1; outline: 2px solid var(--ink); outline-offset: -2px; border-radius: 8px; }

  /* summary column */
  .pdp-summary { display: flex; flex-direction: column; gap: 16px; position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 24px); }
  .pdp-title { font: 600 clamp(28px, 3vw, 40px)/1.1 var(--font-display); margin: 0; }
  .pdp-rating:empty, .pdp-excerpt:empty, .pdp-stock:empty { display: none; }
  .pdp-price { font: 600 26px/1.2 var(--font-body); color: var(--ink); }
  .pdp-price del { color: var(--ink-muted); font-weight: 400; font-size: 20px; margin-right: 8px; }
  .pdp-price ins { text-decoration: none; }
  .pdp-excerpt { color: var(--ink-muted); font: 16px/1.6 var(--font-body); }
  .pdp-excerpt p { margin: 0; }
  .pdp-stock { font: 500 14px/1.4 var(--font-body); }
  .pdp-stock .in-stock { color: var(--success); }
  .pdp-stock .out-of-stock { color: var(--error); }
  .pdp-trust { list-style: none; margin: 0; padding: 16px 0 0; border-top: 1px solid var(--line); display: grid; gap: 10px; }
  .pdp-trust-item { display: flex; align-items: center; gap: 10px; font: 14px/1.4 var(--font-body); color: var(--ink); }
  .pdp-trust-item svg { width: 20px; height: 20px; color: var(--brand); flex: none; }
  .pdp-meta { font: 13px/1.6 var(--font-body); color: var(--ink-muted); }

  /* add to cart block (WooCommerce markup inside) */
  .pdp-cta form.cart { display: flex; flex-wrap: wrap; align-items: stretch; gap: 12px; margin: 0; }
  .pdp-cta form.variations_form { display: block; }
  .pdp-cta .quantity { position: relative; display: inline-flex; align-items: stretch; width: auto; max-width: none; margin: 0; height: 52px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); overflow: hidden; }
  .pdp-cta .quantity--hidden { display: none; }
  .pdp-cta .quantity:focus-within { border-color: var(--ink); }
  .pdp-cta .quantity input.qty { width: 52px; min-width: 0; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: inherit; text-align: center; font: 500 16px/1 var(--font-body); -moz-appearance: textfield; appearance: textfield; }
  .pdp-cta .quantity input.qty:focus { outline: none; }
  /* the builder positions these absolutely over the input (top/bottom/left/right + translateY(-50%)); put them back in flow first */
  .pdp-cta .bde-quantity-button { position: static; top: auto; right: auto; bottom: auto; left: auto; transform: none; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 44px; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--ink); font-size: 12px; cursor: pointer; transition: background .15s; }
  .pdp-cta .bde-quantity-button--dec { border-right: 1px solid var(--line); }
  .pdp-cta .bde-quantity-button--inc { border-left: 1px solid var(--line); }
  .pdp-cta .bde-quantity-button:hover { background: var(--surface-alt); color: var(--ink); }
  .pdp-cta .bde-quantity-button:focus-visible { outline: 2px solid var(--ink); outline-offset: -2px; }
  .pdp-cta button.single_add_to_cart_button { flex: 1 1 200px; min-height: 52px; padding: 0 28px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 16px/1 var(--font-body); cursor: pointer; }
  .pdp-cta button.single_add_to_cart_button:hover { background: var(--brand-hover); }
  .pdp-cta button.single_add_to_cart_button.disabled, .pdp-cta button.single_add_to_cart_button.wc-variation-selection-needed { opacity: .5; cursor: not-allowed; }
  /* variable products */
  .pdp-cta table.variations { width: 100%; border-collapse: collapse; margin: 0 0 16px; }
  .pdp-cta table.variations th.label { text-align: left; padding: 0 0 6px; font: 500 14px/1.2 var(--font-body); vertical-align: top; }
  .pdp-cta table.variations td.value { padding: 0 0 14px; }
  .pdp-cta .bde-woo-select { position: relative; display: block; }
  .pdp-cta .bde-woo-select select { width: 100%; min-height: 48px; padding: 10px 40px 10px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); font: 15px/1.4 var(--font-body); appearance: none; }
  .pdp-cta .bde-woo-select__arrow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .pdp-cta a.reset_variations { padding: 0; border: 0; background: none; font: 13px/1.2 var(--font-body); color: var(--ink-muted); text-transform: none; }
  .pdp-cta a.reset_variations:hover { background: none; color: var(--ink); }
  .pdp-cta .single_variation_wrap { width: 100%; }
  .pdp-cta .woocommerce-variation-price { font: 600 22px/1.2 var(--font-body); margin-bottom: 12px; }
  .pdp-cta .woocommerce-variation-availability { font: 14px/1.4 var(--font-body); margin-bottom: 12px; }
  .pdp-cta .woocommerce-variation-add-to-cart { display: flex; flex-wrap: wrap; gap: 12px; }
  .pdp-cta .woocommerce-variation-add-to-cart-disabled { opacity: .6; }
  /* grouped products */
  .pdp-cta table.woocommerce-grouped-product-list { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  .pdp-cta .woocommerce-grouped-product-list-item__label a { color: var(--ink); text-decoration: none; font-weight: 500; }
  .pdp-cta .woocommerce-grouped-product-list-item__price { font-weight: 600; }
  /* notices: REQUIRED on a marker page, they never show in previews; full reset and five designs in patterns/notices.md */
  .pdp .woocommerce-notices-wrapper { display: grid; gap: 10px; margin: 0 0 24px; }
  .pdp > .woocommerce-notices-wrapper { width: min(100% - var(--gutter) * 2, var(--container)); margin-left: auto; margin-right: auto; }  /* printed before the .container, so align it to the container width */
  .pdp .woocommerce-notices-wrapper:empty { display: none; margin: 0; }
  .pdp .woocommerce-message, .pdp .woocommerce-info { position: relative; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 0; width: auto; margin: 0; padding: 14px 16px 14px 44px; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); }
  .pdp .woocommerce-error { position: relative; display: grid; gap: 8px; width: auto; margin: 0; padding: 14px 16px 14px 44px; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); list-style: none; }
  .pdp .woocommerce-message { background: var(--success-bg); color: var(--success); }
  .pdp .woocommerce-info { background: var(--surface-alt); color: var(--ink); }
  .pdp .woocommerce-error { background: var(--error-bg); color: var(--error); }
  .pdp .woocommerce-message::before, .pdp .woocommerce-info::before, .pdp .woocommerce-error li::before { content: ""; position: absolute; left: 16px; top: 50%; width: 18px; height: 18px; margin-top: -9px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; }
  .pdp .woocommerce-info::before { -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); }
  .pdp .woocommerce-error li { position: relative; display: block; margin: 0; padding: 0; font-weight: 400; }
  .pdp .woocommerce-error li::before { left: -28px; -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); }
  .pdp .woocommerce-message a.button { order: 1; margin: 0 0 0 auto; display: inline-flex; align-items: center; min-height: 36px; padding: 0 14px; border: 1px solid currentColor; border-radius: var(--radius); background: transparent; color: inherit !important; font: 600 13px/1 var(--font-body); text-decoration: none; float: none; }

  /* details */
  .pdp-details { margin-top: 64px; max-width: 880px; }
  .pdp-related { margin-top: 80px; padding-top: 48px; border-top: 1px solid var(--line); }
  .pdp-upsells:empty { display: none; }

  @media (max-width: 1023px) {
    .pdp-top { grid-template-columns: minmax(0, 1fr); gap: 32px; }
    .pdp-summary { position: static; }
    .pdp-gallery { max-height: none; }
  }
</style>
```

## 2. Editorial: stacked images, sticky summary (fashion, furniture)

Large product photos scroll; the summary stays. This version keeps the gallery as a tall slider. For a true image stack (every photo visible one under the other, no slider) use Product Header 9 in the **patterns** skill, which binds the main image and the gallery images by index instead of using the gallery marker.

```html
<div bd-woo="product" class="pdp pdp--editorial store">
  <div class="container">
    <div class="pdp-top">
      <div class="pdp-media">
        <div bd-woo="gallery" class="pdp-gallery"></div>
        <div bd-woo="gallery-thumbs" class="pdp-thumbs"></div>
      </div>
      <div class="pdp-summary">
        <nav bd-woo="breadcrumbs" class="pdp-crumbs"></nav>
        <h1 bd-woo="title" class="pdp-title"></h1>
        <div bd-woo="price" class="pdp-price"></div>
        <div bd-woo="rating" class="pdp-rating"></div>
        <div bd-woo="excerpt" class="pdp-excerpt"></div>
        <div bd-woo="add-to-cart" class="pdp-cta"></div>
        <div bd-woo="stock" class="pdp-stock"></div>
        <ul class="pdp-trust">…</ul>
        <div bd-woo="tabs" class="pdp-tabs pdp-tabs--inline"></div>
        <div bd-woo="meta" class="pdp-meta"></div>
      </div>
    </div>
  </div>
  <section class="pdp-related"><div class="container"><div bd-woo="related-products"></div></div></section>
</div>
<style>
  .pdp--editorial .pdp-top { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); gap: 64px; align-items: start; }
  .pdp--editorial .pdp-media { display: grid; gap: 12px; }
  .pdp--editorial .pdp-gallery { aspect-ratio: 4 / 5; }               /* tall on purpose; no max-height */
  .pdp--editorial .pdp-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; }
  .pdp--editorial .pdp-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .pdp--editorial .pdp-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .pdp--editorial .pdp-summary { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 32px); display: flex; flex-direction: column; gap: 18px; }
  .pdp--editorial .pdp-title { font: 400 clamp(28px, 3vw, 40px)/1.1 var(--font-display); margin: 0; }
  .pdp--editorial .pdp-price { font: 400 20px/1.2 var(--font-body); }
  .pdp-tabs--inline { border-top: 1px solid var(--line); padding-top: 8px; }
  @media (max-width: 1023px) { .pdp--editorial .pdp-top { grid-template-columns: minmax(0, 1fr); gap: 32px; } .pdp--editorial .pdp-summary { position: static; } }
</style>
```

Here the description and details accordion lives inside the sticky summary, so the tall gallery is the only thing that scrolls. Keep the accordion collapsed by default (`design.accordion.first_item_opened: false`) so the summary fits.

## 3. Vertical thumbnail rail (electronics, tools)

Thumbs beside the gallery, gallery square, specs prominent.

```html
<div bd-woo="product" class="pdp pdp--rail store">
  <div class="container">
    <nav bd-woo="breadcrumbs" class="pdp-crumbs"></nav>
    <div class="pdp-top">
      <div class="pdp-media">
        <div bd-woo="gallery-thumbs" class="pdp-rail"></div>
        <div bd-woo="gallery" class="pdp-gallery"></div>
      </div>
      <div class="pdp-summary">
        <span class="pdp-brand" bd-bind="product_terms" bd-params='{"taxonomy":"product_brand"}'></span>
        <h1 bd-woo="title" class="pdp-title"></h1>
        <div class="pdp-rating-row"><div bd-woo="rating" class="pdp-rating"></div><span class="pdp-sku" bd-bind="product_sku" bd-params='{"beforecontent":"SKU "}'></span></div>
        <div bd-woo="price" class="pdp-price"></div>
        <div bd-woo="excerpt" class="pdp-excerpt"></div>
        <div bd-woo="add-to-cart" class="pdp-cta"></div>
        <div bd-woo="stock" class="pdp-stock"></div>
        <ul class="pdp-trust">…warranty, support, returns…</ul>
      </div>
    </div>
    <div class="pdp-details pdp-details--2col">
      <section class="pdp-block"><h2 class="pdp-h2">Overview</h2><div bd-woo="description"></div></section>
      <section class="pdp-block"><h2 class="pdp-h2">Specifications</h2><div bd-woo="additional-info" class="pdp-specs"></div></section>
    </div>
    <section class="pdp-block" id="reviews"><div bd-woo="reviews" class="pdp-reviews"></div></section>
  </div>
  <section class="pdp-related"><div class="container"><div bd-woo="related-products"></div></div></section>
</div>
<style>
  .pdp--rail .pdp-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 48px; align-items: start; }
  .pdp--rail .pdp-media { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 12px; }
  .pdp--rail .pdp-gallery { aspect-ratio: 1 / 1; background: var(--surface-alt); border-radius: var(--radius); }   /* defines the row height */
  .pdp--rail .pdp-rail { height: 100%; }                                                                           /* rail stretches to the grid row */
  /* the rail has a height, so Swiper sets each slide's height: clip on the slide, fill inside it */
  .pdp--rail .pdp-rail .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; background: var(--surface-alt); border-radius: 8px; overflow: hidden; opacity: .55; }
  .pdp--rail .pdp-rail .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .pdp--rail .pdp-rail .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .pdp--rail .pdp-rail .swiper-slide-thumb-active { opacity: 1; outline: 2px solid var(--brand); outline-offset: -2px; border-radius: 8px; }
  .pdp-brand { font: 600 13px/1.2 var(--font-body); text-transform: uppercase; letter-spacing: .06em; color: var(--brand); }
  .pdp-brand:empty { display: none; }
  .pdp-rating-row { display: flex; align-items: center; gap: 16px; font: 13px/1.2 var(--font-body); color: var(--ink-muted); }
  .pdp-details--2col { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; margin-top: 64px; }
  .pdp-h2 { font: 700 22px/1.2 var(--font-display); margin: 0 0 16px; }
  .pdp-specs table { width: 100%; border-collapse: collapse; font: 14px/1.5 var(--font-body); }
  .pdp-specs th { text-align: left; color: var(--ink-muted); font-weight: 500; padding: 10px 0; border-bottom: 1px solid var(--line); width: 40%; }
  .pdp-specs td { padding: 10px 0; border-bottom: 1px solid var(--line); }
  @media (max-width: 1023px) { .pdp--rail .pdp-top, .pdp-details--2col { grid-template-columns: minmax(0, 1fr); } .pdp--rail .pdp-media { grid-template-columns: minmax(0, 1fr); } .pdp--rail .pdp-rail { height: auto; } }
</style>
```

After conversion set the rail's direction:

```jsonc
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 8, "properties": { "content": { "general": { "direction": "vertical", "slidesPerView": 5, "spaceBetween": 12 } } } } } ] }
```

and, on the Product Info element, `design.style.hide_heading: true` and `design.style.hide_separators: true` if the `.pdp-specs` rules draw the lines. On mobile the rail becomes a horizontal strip again; add a mobile `direction` override only if the schema exposes it per breakpoint (check with `get-element-schemas`), otherwise keep vertical and give it a fixed height on mobile.

## 4. Minimal single-product store (one SKU, long-form)

The product is the homepage. Big hero, then the buy box, then a story.

```html
<div bd-woo="product" class="pdp pdp--single store">
  <section class="single-hero">
    <div class="container single-hero-inner">
      <div class="single-copy">
        <span class="eyebrow">The original</span>
        <h1 bd-woo="title" class="single-title"></h1>
        <div bd-woo="excerpt" class="single-excerpt"></div>
        <div bd-woo="price" class="single-price"></div>
        <div bd-woo="add-to-cart" class="pdp-cta single-cta"></div>
        <div bd-woo="stock" class="pdp-stock"></div>
        <ul class="pdp-trust pdp-trust--row">…</ul>
      </div>
      <div class="single-media"><div bd-woo="gallery" class="single-gallery"></div></div>
    </div>
  </section>
  <section class="section"><div class="container container--narrow"><div bd-woo="description" class="single-story"></div></div></section>
  <section class="section section--alt"><div class="container container--narrow"><h2 class="section-title">Details</h2><div bd-woo="additional-info" class="pdp-specs"></div></div></section>
  <section class="section" id="reviews"><div class="container container--narrow"><div bd-woo="reviews" class="pdp-reviews"></div></div></section>
</div>
<style>
  .single-hero { padding-block: 64px; background: var(--surface-alt); }
  .single-hero-inner { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: center; }
  .single-title { font: 600 clamp(40px, 6vw, 72px)/1 var(--font-display); margin: 8px 0 16px; }
  .single-excerpt { font: 18px/1.6 var(--font-body); color: var(--ink-muted); margin-bottom: 24px; }
  .single-price { font: 600 28px/1 var(--font-body); margin-bottom: 20px; }
  .single-gallery { aspect-ratio: 1 / 1; border-radius: var(--radius); overflow: hidden; max-height: min(80vh, 720px); }
  .pdp-trust--row { display: flex; flex-wrap: wrap; gap: 20px; border: 0; padding: 0; }
  .container--narrow { max-width: 840px; }
  .single-story { font: 18px/1.7 var(--font-body); }
  .single-story p { margin: 0 0 1.2em; }
  .section--alt { background: var(--surface-alt); }
  @media (max-width: 1023px) { .single-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 32px; } .single-media { order: -1; } }
</style>
```

No thumbnails, no related products, description as the story. Preview against the product; `description` renders the long description with its images.

## 5. Grouped product / bundle page

Same as layout 1; the add-to-cart marker renders the grouped table. Give the table room and make each row scannable:

```css
.pdp-cta table.woocommerce-grouped-product-list { width: 100%; border-collapse: collapse; margin: 0 0 20px; }
.pdp-cta .woocommerce-grouped-product-list-item__quantity { width: 140px; }
.pdp-cta .woocommerce-grouped-product-list-item__label { padding: 12px 8px; }
.pdp-cta .woocommerce-grouped-product-list-item__label a { color: var(--ink); text-decoration: none; font-weight: 500; }
.pdp-cta .woocommerce-grouped-product-list-item__price { text-align: right; font-weight: 600; white-space: nowrap; }
.pdp-cta tr.woocommerce-grouped-product-list-item { border-bottom: 1px solid var(--line); }
```

Preview the cart button against the grouped product (`preview-element` with its id) to confirm the row markup before styling.

## 6. Mobile order for every layout

Under the tablet breakpoint: breadcrumbs, gallery, title, price, rating, variations + add-to-cart, stock, trust, excerpt, details, reviews, related. Use `order` on the summary's flex children if the desktop order differs; keep add-to-cart within one screen of the gallery's bottom.
