# Product headers

The top of the single product template: gallery plus buy box. Nine variants. Each is the `bd-woo="product"` wrapper's first section; the details, reviews and related rows below are shared (see **woocommerce-product-page**). Every variant needs the buy-box internals CSS from `woocommerce-product-page/examples/buy-box.md` (add-to-cart markup, variations, notices) in the same `<style>`; it is omitted here to keep the patterns readable. Gallery geometry is mandatory in each: a fixed `aspect-ratio` and a height decision.

Markers used: `product`, `breadcrumbs`, `gallery`, `gallery-thumbs`, `title`, `rating`, `price`, `excerpt`, `add-to-cart`, `stock`, `meta`, `additional-info`, `description`.

Header 1's `.ph-*` rules (crumbs, title, meta row, price, excerpt, stock, trust list, SKU, gallery, thumbnails) are the shared base: headers 2, 4, 7, 8 and 9 reuse them, so include Header 1's `<style>` block on the template alongside the variant's own.

## Product Header 1: gallery left, sticky buy box right

Use when: the default for most stores; 2 to 8 product photos, a buy box that must stay visible.

```
[ gallery 7/12          ] [ crumbs             ]
[                       ] [ Title              ]
[                       ] [ ★★★★☆ (12)  $48    ]
[ thumbs ▫ ▫ ▫ ▫        ] [ excerpt            ]
                          [ size ▾   [ − 1 + ] ]
                          [ ▶ Add to cart      ]
                          [ ✓ ships in 1-2 days]
```

```html
<div bd-woo="product" class="pdp store ph-1">
  <div class="container ph-1-grid">
    <div class="ph-media">
      <div bd-woo="gallery" class="ph-gallery"></div>
      <div bd-woo="gallery-thumbs" class="ph-thumbs"></div>
    </div>
    <div class="ph-buy">
      <nav bd-woo="breadcrumbs" class="ph-crumbs"></nav>
      <h1 bd-woo="title" class="ph-title"></h1>
      <div class="ph-meta-row"><div bd-woo="rating" class="ph-rating"></div><div bd-woo="price" class="ph-price"></div></div>
      <div bd-woo="excerpt" class="ph-excerpt"></div>
      <div bd-woo="add-to-cart" class="pdp-cta"></div>
      <div bd-woo="stock" class="ph-stock"></div>
      <ul class="ph-trust"><li>Free shipping over $75</li><li>30-day returns</li><li>Secure checkout</li></ul>
      <div bd-woo="meta" class="ph-sku"></div>
    </div>
  </div>
</div>
<style>
  .ph-1-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; padding-block: 24px 64px; }
  .ph-media { display: grid; gap: 12px; }
  .ph-gallery { aspect-ratio: var(--card-ratio); max-height: min(80vh, 720px); border-radius: var(--radius); overflow: hidden; background: var(--surface-alt); }
  /* shape, radius, clip and the active outline all go on .swiper-slide, the box Swiper sizes;
     the inner .bde-swiper__slide only fills it. See "Thumbnails that overflow their slide" below. */
  .ph-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; background: var(--surface-alt); opacity: .55; transition: opacity .2s; }
  .ph-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .ph-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .ph-thumbs .swiper-slide-thumb-active { opacity: 1; outline: 2px solid var(--ink); outline-offset: -2px; }
  .ph-buy { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 24px); display: flex; flex-direction: column; gap: 16px; }
  .ph-crumbs { font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
  .ph-crumbs a { color: inherit; text-decoration: none; }
  .ph-title { margin: 0; font: 600 clamp(28px, 3vw, 40px)/1.1 var(--font-display); }
  .ph-meta-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .ph-rating:empty, .ph-excerpt:empty, .ph-stock:empty { display: none; }
  .ph-price { font: 600 26px/1.2 var(--font-body); }
  .ph-price del { color: var(--ink-muted); font-weight: 400; font-size: 20px; margin-right: 8px; }
  .ph-price ins { text-decoration: none; }
  .ph-excerpt { color: var(--ink-muted); font: 16px/1.6 var(--font-body); }
  .ph-excerpt p { margin: 0; }
  .ph-stock { font: 500 14px/1.4 var(--font-body); }
  .ph-trust { list-style: none; margin: 0; padding: 16px 0 0; border-top: 1px solid var(--line); display: grid; gap: 8px; font: 14px/1.4 var(--font-body); }
  .ph-trust li::before { content: "✓ "; color: var(--brand); }
  .ph-sku { font: 13px/1.6 var(--font-body); color: var(--ink-muted); }
  @media (max-width: 1023px) { .ph-1-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; } .ph-buy { position: static; } .ph-gallery { max-height: none; } }
</style>
```

## Product Header 2: vertical thumbnail rail

Use when: electronics, tools, anything with 6+ photos where the thumbnails deserve equal weight; square photos.

```
[▫] [ gallery 1/1      ] [ brand · SKU        ]
[▫] [                  ] [ Title              ]
[▫] [                  ] [ ★★★★★ 214 reviews  ]
[▫] [                  ] [ $249  $199         ]
[▫] [                  ] [ [ − 1 + ] Add ▶    ]
                         [ ✓ 2-year warranty  ]
```

Same as Header 1 with the media block changed:

```html
<div class="ph-media ph-media--rail">
  <div bd-woo="gallery-thumbs" class="ph-rail"></div>
  <div bd-woo="gallery" class="ph-gallery"></div>
</div>
<style>
  .ph-media--rail { grid-template-columns: 88px minmax(0, 1fr); gap: 12px; }
  .ph-media--rail .ph-gallery { aspect-ratio: 1 / 1; }
  .ph-rail { height: 100%; }
  /* a vertical rail: Swiper sets the slide height itself, so the clip belongs on the slide */
  .ph-rail .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; background: var(--surface-alt); opacity: .55; }
  .ph-rail .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .ph-rail .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .ph-rail .swiper-slide-thumb-active { opacity: 1; outline: 2px solid var(--brand); outline-offset: -2px; }
  @media (max-width: 1023px) { .ph-media--rail { grid-template-columns: minmax(0, 1fr); } .ph-rail { height: auto; } }
</style>
```

Set the rail's `content.general.direction` to `vertical` and `slidesPerView` to 5 with `edit-post`. The grid row defined by the square gallery gives the rail its height.

## Product Header 3: stacked editorial gallery, sticky buy box

Use when: fashion, furniture, art; tall portrait photos the shopper scrolls through while the price stays.

```
[ photo 4/5            ] [ Title      (sticky)]
[                      ] [ $180               ]
[                      ] [ colour ● ● ●       ]
[ photo                ] [ size S M L XL      ]
[                      ] [ ▶ Add to bag       ]
[ photo                ] [ Details ▾          ]
```

```html
<div bd-woo="product" class="pdp store ph-3">
  <div class="container ph-3-grid">
    <div class="ph-media">
      <div bd-woo="gallery" class="ph-3-gallery"></div>
      <div bd-woo="gallery-thumbs" class="ph-3-thumbs"></div>
    </div>
    <div class="ph-buy ph-3-buy">
      <span class="eyebrow" bd-bind="product_terms" bd-params='{"taxonomy":"product_cat"}'></span>
      <h1 bd-woo="title" class="ph-3-title"></h1>
      <div bd-woo="price" class="ph-3-price"></div>
      <div bd-woo="add-to-cart" class="pdp-cta"></div>
      <div bd-woo="stock" class="ph-stock"></div>
      <div bd-woo="tabs" class="ph-3-details"></div>
    </div>
  </div>
</div>
<style>
  .ph-3-grid { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); gap: 64px; align-items: start; padding-block: 0 64px; }
  .ph-3-gallery { aspect-ratio: 4 / 5; background: var(--surface-alt); }             /* tall on purpose: the summary is sticky */
  .ph-3-thumbs { margin-top: 12px; }
  .ph-3-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; opacity: .5; }
  .ph-3-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
  .ph-3-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
  .ph-3-thumbs .swiper-slide-thumb-active { opacity: 1; }
  .ph-3-buy { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 40px); gap: 18px; padding-top: 40px; }
  .ph-3-title { margin: 0; font: 400 clamp(26px, 2.6vw, 36px)/1.15 var(--font-display); }
  .ph-3-price { font: 400 18px/1.2 var(--font-body); }
  .ph-3-details { border-top: 1px solid var(--line); padding-top: 8px; }
  @media (max-width: 1023px) { .ph-3-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; } .ph-3-buy { position: static; padding-top: 0; } }
</style>
```

Set the tabs element to accordion with nothing opened (`design.accordion.first_item_opened: false`) so the sticky column fits the viewport. Buttons here read as uppercase text with square corners (see the fashion design system).

## Product Header 4: 2×2 gallery grid, buy box right

Use when: 4 strong photos that should all be visible at once (footwear, bags, jewellery); no slider until the shopper clicks.

```
[ photo ][ photo ] [ Title        ]
[ photo ][ photo ] [ $  · Add     ]
```

The `gallery` marker is one slider; a static 2×2 grid uses the gallery image fields instead, with the lightbox from a slider kept underneath for zoom. Bind four images with `product_gallery_image` and `image_index`; the main image is `product_image`.

```html
<div bd-woo="product" class="pdp store ph-4">
  <div class="container ph-4-grid">
    <div class="ph-4-photos">
      <img class="ph-4-img" bd-src="product_image" bd-alt="product_title">
      <img class="ph-4-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
      <img class="ph-4-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":1}'>
      <img class="ph-4-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":2}'>
      <div bd-woo="gallery" class="ph-4-slider"></div>
    </div>
    <div class="ph-buy">…as Header 1…</div>
  </div>
</div>
<style>
  .ph-4-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; padding-block: 24px 64px; }
  .ph-4-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ph-4-img { display: block; width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: var(--radius); background: var(--surface-alt); }
  .ph-4-slider { grid-column: 1 / -1; aspect-ratio: 16 / 9; }      /* the live slider with zoom and lightbox, shown below the grid */
  @media (max-width: 1023px) { .ph-4-grid { grid-template-columns: minmax(0, 1fr); } .ph-4-photos { grid-template-columns: 1fr 1fr; } }
</style>
```

Products with fewer than three gallery images render the builder's placeholder in the spare cells, not an empty `src`, so give each cell beyond the first a `dynamic-data` / `is not empty` display condition on its own `product_gallery_image` index (recipe in `product-grids.md`). The grid then shows one or two photos, which still reads fine. If the store wants the slider to be the only zoom path, hide `.ph-4-slider` and give the static images a `click` interaction that opens the lightbox is not possible; keep the slider visible or use Header 1.

## Product Header 5: full-bleed hero image, buy box overlaid

Use when: a single hero product or a luxury item where one photograph carries the page.

```
┌────────────────────────────────────────────────────────┐
│ [ full-bleed photo                    ┌──────────────┐ │
│                                       │ Title        │ │
│                                       │ $1,200       │ │
│                                       │ ▶ Add to cart│ │
│                                       └──────────────┘ │
└────────────────────────────────────────────────────────┘
```

```html
<div bd-woo="product" class="pdp store ph-5">
  <section class="ph-5-hero">
    <img class="ph-5-img" bd-src="product_image" bd-alt="product_title">
    <div class="container ph-5-inner">
      <div class="ph-5-card">
        <nav bd-woo="breadcrumbs" class="ph-crumbs"></nav>
        <h1 bd-woo="title" class="ph-5-title"></h1>
        <div bd-woo="price" class="ph-5-price"></div>
        <div bd-woo="excerpt" class="ph-excerpt"></div>
        <div bd-woo="add-to-cart" class="pdp-cta"></div>
        <div bd-woo="stock" class="ph-stock"></div>
      </div>
    </div>
  </section>
  <section class="container ph-5-gallery-wrap">
    <div bd-woo="gallery" class="ph-5-gallery"></div>
    <div bd-woo="gallery-thumbs" class="ph-thumbs"></div>
  </section>
</div>
<style>
  .ph-5-hero { position: relative; min-height: min(88vh, 900px); display: flex; align-items: center; background: var(--ink); }
  .ph-5-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .ph-5-inner { position: relative; display: flex; justify-content: flex-end; width: 100%; }
  .ph-5-card { width: min(440px, 100%); background: rgba(255,255,255,.94); backdrop-filter: blur(6px); border-radius: var(--radius); padding: 32px; display: grid; gap: 14px; box-shadow: 0 32px 64px -24px rgba(0,0,0,.4); }
  .ph-5-title { margin: 0; font: 600 clamp(28px, 3vw, 40px)/1.1 var(--font-display); }
  .ph-5-price { font: 600 24px/1.2 var(--font-body); }
  .ph-5-gallery-wrap { padding-block: 48px; display: grid; gap: 12px; }
  .ph-5-gallery { aspect-ratio: 16 / 9; max-height: 640px; border-radius: var(--radius); overflow: hidden; }
  @media (max-width: 767px) { .ph-5-hero { min-height: 0; padding-block: 64vw 24px; } .ph-5-img { height: 64vw; } .ph-5-card { width: 100%; padding: 24px; } }
</style>
```

The hero uses the main product image as a background; the full gallery with zoom sits below. On phones the image becomes a top band and the card sits under it.

## Product Header 6: centred single-SKU page

Use when: one product (or one per variant) sold as a long-form page: a device, a course, a subscription box.

```
              [ eyebrow ]
        [ Big title, centred ]
     [ subtitle / short description ]
        [ $  ] [ ▶ Add to cart ]
   [ ─────── gallery 16/9 ─────── ]
```

```html
<div bd-woo="product" class="pdp store ph-6">
  <section class="container ph-6-head">
    <span class="eyebrow">The original</span>
    <h1 bd-woo="title" class="ph-6-title"></h1>
    <div bd-woo="excerpt" class="ph-6-sub"></div>
    <div class="ph-6-buy">
      <div bd-woo="price" class="ph-6-price"></div>
      <div bd-woo="add-to-cart" class="pdp-cta"></div>
    </div>
    <ul class="ph-trust ph-trust--row"><li>Free shipping</li><li>30-day trial</li><li>2-year warranty</li></ul>
  </section>
  <section class="container"><div bd-woo="gallery" class="ph-6-gallery"></div></section>
</div>
<style>
  .ph-6-head { text-align: center; display: grid; justify-items: center; gap: 16px; padding-block: 64px 40px; max-width: 760px; }
  .ph-6-title { margin: 0; font: 600 clamp(40px, 6vw, 72px)/1 var(--font-display); letter-spacing: -.02em; }
  .ph-6-sub { font: 18px/1.6 var(--font-body); color: var(--ink-muted); }
  .ph-6-sub p { margin: 0; }
  .ph-6-buy { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
  .ph-6-price { font: 600 28px/1 var(--font-body); }
  .ph-6-buy .pdp-cta form.cart { justify-content: center; }
  .ph-6-buy .pdp-cta table.variations { width: auto; margin-inline: auto; }
  .ph-6-buy .pdp-cta .woocommerce-variation-add-to-cart { justify-content: center; }
  .ph-trust--row { display: flex; gap: 24px; border: 0; padding: 0; justify-content: center; }
  .ph-6-gallery { aspect-ratio: 16 / 9; max-height: 720px; border-radius: var(--radius); overflow: hidden; }
  @media (max-width: 767px) { .ph-6-head { padding-block: 40px 24px; } }
</style>
```

## Product Header 7: spec-first (compare-and-decide products)

Use when: electronics, appliances, bikes; shoppers want the key specs beside the buy button before scrolling.

```
[ gallery 1/1      ] [ Title                    ]
[ ▫ ▫ ▫ ▫          ] [ ★ 4.6 · 312 reviews      ]
                     [ $899                     ]
                     [ ┌ Key specs ───────────┐ ]
                     [ │ Battery   12 h        │ ]
                     [ │ Weight    1.2 kg      │ ]
                     [ └───────────────────────┘ ]
                     [ ▶ Add to cart  ♡ Save    ]
```

Header 1 with a specs block inserted between price and buy box. The block is the `additional-info` marker (WooCommerce's attribute table) styled as a compact list; when the store fills product attributes it is fully dynamic.

```html
<div class="ph-7-specs">
  <h2 class="ph-7-specs-title">Key specs</h2>
  <div bd-woo="additional-info" class="ph-7-table"></div>
</div>
<style>
  .ph-7-specs { border: 1px solid var(--line); border-radius: var(--radius); padding: 16px 20px; }
  .ph-7-specs-title { margin: 0 0 8px; font: 600 13px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
  .ph-7-table table { width: 100%; border-collapse: collapse; font: 14px/1.5 var(--font-body); }
  .ph-7-table th { text-align: left; color: var(--ink-muted); font-weight: 500; padding: 6px 0; width: 45%; }
  .ph-7-table td { padding: 6px 0; }
  .ph-7-table tr + tr th, .ph-7-table tr + tr td { border-top: 1px solid var(--line); }
</style>
```

Set the Product Info element's `design.style.hide_heading: true` and `hide_separators: true`. Products without attributes render an empty block; hide it with `.ph-7-specs:has(.ph-7-table:empty) { display: none }`.

## Product Header 8: sticky gallery, scrolling details column

Use when: the buy box is short but the product story is long (cosmetics, food, supplements): the photo stays, the copy scrolls.

```
[ gallery (sticky) ] [ Title, price, buy       ]
[                  ] [ Why it works            ]
[                  ] [ Ingredients             ]
[                  ] [ How to use              ]
[                  ] [ Reviews                 ]
```

```html
<div bd-woo="product" class="pdp store ph-8">
  <div class="container ph-8-grid">
    <div class="ph-8-media"><div bd-woo="gallery" class="ph-gallery"></div><div bd-woo="gallery-thumbs" class="ph-thumbs"></div></div>
    <div class="ph-8-col">
      <div class="ph-buy ph-8-buy">
        <h1 bd-woo="title" class="ph-title"></h1>
        <div class="ph-meta-row"><div bd-woo="rating" class="ph-rating"></div><div bd-woo="price" class="ph-price"></div></div>
        <div bd-woo="excerpt" class="ph-excerpt"></div>
        <div bd-woo="add-to-cart" class="pdp-cta"></div>
        <div bd-woo="stock" class="ph-stock"></div>
      </div>
      <section class="ph-8-block"><h2 class="ph-8-h2">Why it works</h2><div bd-woo="description" class="ph-8-text"></div></section>
      <section class="ph-8-block"><h2 class="ph-8-h2">Details</h2><div bd-woo="additional-info" class="ph-7-table"></div></section>
      <section class="ph-8-block" id="reviews"><div bd-woo="reviews" class="ph-8-reviews"></div></section>
    </div>
  </div>
</div>
<style>
  .ph-8-grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 64px; align-items: start; padding-block: 24px 64px; }
  .ph-8-media { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 24px); display: grid; gap: 12px; }
  .ph-8-col { display: grid; gap: 48px; }
  .ph-8-buy { position: static; }
  .ph-8-block { padding-top: 32px; border-top: 1px solid var(--line); }
  .ph-8-h2 { margin: 0 0 12px; font: 600 22px/1.2 var(--font-display); }
  .ph-8-text { font: 16px/1.7 var(--font-body); }
  @media (max-width: 1023px) { .ph-8-grid { grid-template-columns: minmax(0, 1fr); } .ph-8-media { position: static; } }
</style>
```

Never make both the gallery and the buy column sticky; here the gallery is the sticky one because the column beside it is long.

## Product Header 9: stacked image gallery, sticky details

Use when: fashion, furniture, art, jewellery; every photo shown at full width one under the other, no slider, and the buy box pinned while the shopper scrolls the images. The strongest "editorial" layout there is.

```
[ photo 1              ] [ crumbs          ]
[                      ] [ Title   (sticky)]
[                      ] [ ★★★★☆  $180     ]
[ photo 2              ] [ excerpt         ]
[                      ] [ colour · size   ]
[                      ] [ ▶ Add to cart   ]
[ photo 3              ] [ ✓ shipping      ]
[                      ] [ Details ⌄       ]
```

The `gallery` marker is a slider, so the stack is built from the image fields instead: the main image plus the gallery images by index. Bind more indexes than most products have; a product with fewer photos renders empty `src` attributes that the CSS hides. No zoom or lightbox comes with this (both live in the slider); keep the images large enough not to need it, or add the `gallery` marker below the stack for a zoomable view.

```html
<div bd-woo="product" class="pdp store ph-9">
  <div class="container ph-9-grid">
    <div class="ph-9-stack">
      <img class="ph-9-img" bd-src="product_image" bd-alt="product_title">
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":0}'>
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":1}'>
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":2}'>
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":3}'>
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":4}'>
      <img class="ph-9-img" bd-src="product_gallery_image" bd-alt="product_title" bd-params='{"image_index":5}'>
    </div>
    <div class="ph-9-details">
      <nav bd-woo="breadcrumbs" class="ph-crumbs"></nav>
      <h1 bd-woo="title" class="ph-9-title"></h1>
      <div class="ph-meta-row"><div bd-woo="rating" class="ph-rating"></div><div bd-woo="price" class="ph-9-price"></div></div>
      <div bd-woo="excerpt" class="ph-excerpt"></div>
      <div bd-woo="add-to-cart" class="pdp-cta"></div>
      <div bd-woo="stock" class="ph-stock"></div>
      <ul class="ph-trust"><li>Free shipping over $75</li><li>30-day returns</li><li>Secure checkout</li></ul>
      <div class="acc acc--pdp">
        <details class="acc-item"><summary class="acc-summary">Details &amp; care <svg class="acc-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg></summary><div class="acc-body" bd-woo="additional-info"></div></details>
        <details class="acc-item"><summary class="acc-summary">Description <svg class="acc-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg></summary><div class="acc-body" bd-woo="description"></div></details>
      </div>
      <div bd-woo="meta" class="ph-sku"></div>
    </div>
  </div>
</div>
<style>
  .ph-9-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 64px; align-items: start; padding-block: 0 64px; }
  .ph-9-stack { display: grid; gap: 12px; }
  .ph-9-img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; background: var(--surface-alt); border-radius: var(--radius); }
  .ph-9-details { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 32px); display: flex; flex-direction: column; gap: 16px; padding-top: 32px; }
  .ph-9-title { margin: 0; font: 500 clamp(28px, 3vw, 40px)/1.1 var(--font-display); }
  .ph-9-price { font: 500 22px/1.2 var(--font-body); }
  .ph-9-price del { color: var(--ink-muted); font-weight: 400; font-size: 18px; margin-right: 8px; }
  .ph-9-price ins { text-decoration: none; }
  .ph-9-details .acc { margin-top: 8px; }
  .ph-9-details .acc-summary { font-size: 15px; padding: 14px 0; }
  .ph-9-details .acc-body { font-size: 14px; padding-bottom: 16px; }
  @media (max-width: 1023px) {
    .ph-9-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .ph-9-details { position: static; padding-top: 0; }
    /* on small screens the stack becomes a swipeable strip so the buy box is one swipe away */
    .ph-9-stack { grid-auto-flow: column; grid-auto-columns: 82%; overflow-x: auto; scroll-snap-type: x mandatory; gap: 8px; margin-inline: calc(-1 * var(--gutter)); padding-inline: var(--gutter); }
    .ph-9-img { scroll-snap-align: start; border-radius: 8px; }
  }
</style>
```

Rules that make it work:

- The details column is the sticky one and the stack is the tall one; never make both sticky. If the details column is taller than the viewport (many variations, long accordion), reduce it or drop `position: sticky` and use Header 8's arrangement instead.
- `aspect-ratio: 4 / 5` on every image keeps the stack rhythmic even when photos differ; use `1 / 1` for square product shots, or drop the ratio and `object-fit` to show each photo at its natural proportion.
- Seven bindings cover a main image plus six gallery images; add more lines for catalogs with bigger galleries. WooCommerce's gallery order is the order in the product editor.
- The accordion uses the `acc` classes from the accordions family; include that shared CSS on the template.
- Verify with `preview-post` against a product with one image and one with many: the single-image product must show one photo and no gaps.

## Thumbnails: one rule set for both Swiper modes

Every gallery and thumbs strip here is a Swiper, and each slide is three nested boxes: `div.bde-swiper-slide.swiper-slide` (the one Swiper measures and sizes), an inner `a|div.bde-swiper__slide`, and `img.bde-swiper__image`.

Swiper sizes the outer slide differently per direction, an inline `width` in a horizontal strip and an inline `height` in a vertical rail, so when the inner box does not follow it the thumbnail goes wrong in one of two opposite ways: the image spilling past the rounded corner and the active outline, or the image floating inside the tile with dead space around it.

So every pattern above uses the same three rules, which are correct in both directions:

```css
.ph-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; }
.ph-thumbs .bde-swiper__slide { position: absolute; inset: 0; display: block; }
.ph-thumbs .bde-swiper__image { width: 100%; height: 100%; object-fit: cover; }
```

Shape, radius, clip and the active outline belong on `.swiper-slide`. The inner box is pinned with `position: absolute; inset: 0` rather than `height: 100%`, because a percentage height does not resolve against a slide whose height came from `aspect-ratio`, which collapses the inner box and leaves the image at its natural ratio. And `width: 100%` sits beside the ratio so a vertical rail, where Swiper has already set the height, keeps the rail's full width instead of deriving a narrower square from it. A rail tile is then as wide as the rail and as tall as Swiper's slot; match the rail width to that slot height if you want it square.

## Choosing

| Catalog | Header |
|---|---|
| General store, mixed photos | 1 |
| Electronics, tools, many photos | 2 or 7 |
| Fashion, furniture, portrait photos | 3 (slider) or 9 (every photo stacked, sticky details) |
| Footwear, bags, 4 hero shots | 4 |
| Luxury, single hero photo | 5 |
| One product, long-form | 6 |
| Cosmetics, food, supplements | 8 |
