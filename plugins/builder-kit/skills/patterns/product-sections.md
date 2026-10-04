# Product page sections (below the header)

Eight sections for the part of a product page that comes after the buy area. Pick two or three, not all of them: a product page that scrolls past four screens of marketing loses the sale it already had. Order them by what a shopper still needs to decide, which is usually reassurance first (benefits, specs), then proof (reviews), then adjacency (what goes with it).

Every section is one `html-to-page` call with its own `<style>`. Where a section carries a marker it renders live WooCommerce data; where it carries authored copy, that copy is the owner's to supply, so ask for it rather than inventing claims. Nothing here invents a guarantee, a certification or a statistic.

The details accordion and the FAQ are not repeated here: use `accordions.md` (FAQ 8 is the product-page details accordion, FAQ 1 to 7 are the page-level ones) with the `tabs` marker in its accordion layout for the live description, additional information and reviews.

## Section 1: Benefit strip

Use when: almost always, directly under the buy area. Four short reassurances answer the objections that stop a checkout, and the strip costs one screen inch.

```html
<section class="ps-strip">
  <div class="container ps-strip-grid">
    <div class="ps-strip-item">
      <span class="ps-strip-icon ps-i-truck"></span>
      <p class="ps-strip-title">Free delivery over $75</p>
      <p class="ps-strip-note">2 to 4 working days</p>
    </div>
    <div class="ps-strip-item">
      <span class="ps-strip-icon ps-i-return"></span>
      <p class="ps-strip-title">30-day returns</p>
      <p class="ps-strip-note">Unused, in its packaging</p>
    </div>
    <div class="ps-strip-item">
      <span class="ps-strip-icon ps-i-shield"></span>
      <p class="ps-strip-title">2-year warranty</p>
      <p class="ps-strip-note">Covers manufacturing faults</p>
    </div>
    <div class="ps-strip-item">
      <span class="ps-strip-icon ps-i-chat"></span>
      <p class="ps-strip-title">Talk to a human</p>
      <p class="ps-strip-note">Weekdays, 9 to 5</p>
    </div>
  </div>
</section>
<style>
  .ps-strip { padding-block: 28px; border-block: 1px solid var(--line); }
  .ps-strip-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 32px; }
  .ps-strip-item { display: grid; gap: 4px; align-content: start; }
  .ps-strip-icon { width: 22px; height: 22px; margin-bottom: 6px; background: var(--ink); -webkit-mask: var(--ps-i) center / contain no-repeat; mask: var(--ps-i) center / contain no-repeat; }
  .ps-i-truck { --ps-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M3 7h11v9H3z'/><path d='M14 10h4l3 3v3h-7z'/><circle cx='7' cy='18' r='1.8'/><circle cx='17' cy='18' r='1.8'/></svg>"); }
  .ps-i-return { --ps-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M3 12a9 9 0 1 0 3-6.7'/><path d='M3 4v5h5'/></svg>"); }
  .ps-i-shield { --ps-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z'/><path d='m9 12 2 2 4-4'/></svg>"); }
  .ps-i-chat { --ps-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z'/></svg>"); }
  .ps-strip-title { margin: 0; font: 600 15px/1.3 var(--font-body); }
  .ps-strip-note { margin: 0; color: var(--ink-muted); font: 13px/1.4 var(--font-body); }
  @media (max-width: 767px) { .ps-strip-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
```

Each line is a promise the owner has to keep. Ask for the real delivery threshold, return window and warranty before you write them, and drop the item rather than soften it if there is no real answer.

## Section 2: Story split, alternating

Use when: the product has a reason to exist that the gallery cannot show (how it is made, what problem it solves, who makes it). Two or three rows, image and copy swapping sides.

```html
<section class="section ps-story">
  <div class="container ps-story-rows">
    <div class="ps-story-row">
      <img class="ps-story-img" src="/wp-content/uploads/story-1.jpg" alt="" width="900" height="900">
      <div class="ps-story-text">
        <p class="eyebrow">Made in Porto</p>
        <h2 class="ps-story-h">Thrown by hand, one at a time</h2>
        <p class="ps-story-p">Every piece is shaped on the wheel and fired twice, so no two are identical. Small variations in the glaze are the point, not a fault.</p>
      </div>
    </div>
    <div class="ps-story-row ps-story-row--flip">
      <img class="ps-story-img" src="/wp-content/uploads/story-2.jpg" alt="" width="900" height="900">
      <div class="ps-story-text">
        <p class="eyebrow">Built to last</p>
        <h2 class="ps-story-h">Dishwasher safe, genuinely</h2>
        <p class="ps-story-p">The glaze is food-safe stoneware rated to 1,200°C. It goes in the dishwasher, the microwave and the oven without crazing.</p>
      </div>
    </div>
  </div>
</section>
<style>
  .ps-story-rows { display: grid; gap: 64px; }
  .ps-story-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; align-items: center; }
  .ps-story-row--flip .ps-story-img { order: 2; }
  /* height: auto is load-bearing: the width/height attributes are a presentational hint, and with both
     dimensions resolved the browser ignores aspect-ratio and renders the image at its intrinsic height */
  .ps-story-img { width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: cover; border-radius: var(--radius); background: var(--surface-alt); }
  .ps-story-text { display: grid; gap: 12px; align-content: center; }
  .ps-story-h { margin: 0; font: 600 clamp(24px, 2.6vw, 34px)/1.15 var(--font-display); }
  .ps-story-p { margin: 0; color: var(--ink-muted); font: 16px/1.7 var(--font-body); max-width: 46ch; }
  @media (max-width: 899px) {
    .ps-story-rows { gap: 40px; }
    .ps-story-row, .ps-story-row--flip { grid-template-columns: minmax(0, 1fr); gap: 20px; }
    .ps-story-row--flip .ps-story-img { order: 0; }
  }
</style>
```

Two rows is usually the limit. A third only earns its place when it answers a question the first two raised.

## Section 3: Spec sheet from the product's own attributes

Use when: the shopper is comparing on numbers (electronics, tools, furniture). WooCommerce already holds the attributes, so this renders them rather than repeating them by hand.

```html
<section class="section ps-specs">
  <div class="container ps-specs-grid">
    <div class="ps-specs-head">
      <h2 class="ps-specs-h">Specifications</h2>
      <p class="ps-specs-note">Measured on the standard size. Weights are approximate.</p>
    </div>
    <div bd-woo="additional-info" class="ps-specs-table"></div>
  </div>
</section>
<style>
  .ps-specs-grid { display: grid; grid-template-columns: minmax(0, 320px) minmax(0, 1fr); gap: 48px; align-items: start; }
  .ps-specs-head { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); display: grid; gap: 10px; }
  .ps-specs-h { margin: 0; font: 600 clamp(24px, 2.6vw, 32px)/1.15 var(--font-display); }
  .ps-specs-note { margin: 0; color: var(--ink-muted); font: 14px/1.6 var(--font-body); }
  /* the element prints WooCommerce's attributes table; these rules turn it into a spec list */
  .ps-specs-table table { width: 100%; border-collapse: collapse; }
  .ps-specs-table th, .ps-specs-table td { padding: 14px 0; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font: 15px/1.5 var(--font-body); }
  .ps-specs-table th { width: 40%; font-weight: 500; color: var(--ink-muted); }
  .ps-specs-table:not(:has(*)) { display: none; }
  @media (max-width: 899px) {
    .ps-specs-grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
    .ps-specs-head { position: static; }
  }
</style>
```

Set the element's `design.style.hide_heading: true` and `hide_separators: true` with `edit-post` so it does not print its own "Additional information" heading above yours. The `:not(:has(*))` rule is the collapse: a product with no attributes renders an empty box that would otherwise leave a hole.

## Section 4: Reviews with a summary panel

Use when: the product has reviews and they are the strongest thing you have. The panel states the average and the count from WooCommerce's own numbers; the list is the reviews element.

```html
<section class="section ps-reviews" id="reviews">
  <div class="container ps-reviews-grid">
    <aside class="ps-reviews-panel">
      <p class="ps-reviews-avg" bd-bind="product_rating" bd-params='{"rating_type":"rating"}'></p>
      <div class="ps-reviews-stars" bd-bind="product_rating"></div>
      <p class="ps-reviews-count"><span bd-bind="product_rating" bd-params='{"rating_type":"review_count"}'></span> reviews</p>
      <p class="ps-reviews-note">Only customers who bought this product can leave a review.</p>
    </aside>
    <div bd-woo="reviews" class="ps-reviews-list"></div>
  </div>
</section>
<style>
  .ps-reviews-grid { display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 48px; align-items: start; }
  .ps-reviews-panel { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); display: grid; gap: 6px; padding: 24px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
  .ps-reviews-avg { margin: 0; font: 600 44px/1 var(--font-display); }
  .ps-reviews-avg:empty { display: none; }
  .ps-reviews-count { margin: 0; color: var(--ink-muted); font: 14px/1.4 var(--font-body); }
  .ps-reviews-note { margin: 8px 0 0; padding-top: 12px; border-top: 1px solid var(--line); color: var(--ink-muted); font: 13px/1.5 var(--font-body); }
  .ps-reviews-list .woocommerce-Reviews-title { font: 600 20px/1.2 var(--font-display); margin: 0 0 20px; }
  .ps-reviews-list ol.commentlist { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
  .ps-reviews-list ol.commentlist li { padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
  @media (max-width: 899px) {
    .ps-reviews-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .ps-reviews-panel { position: static; }
  }
</style>
```

WooCommerce stores an average and a count, not a per-star breakdown, so a "5 stars: 42, 4 stars: 9" distribution needs a reviews plugin. Do not draw those bars from numbers you do not have. The `product_rating` field with no params prints the star markup; with `rating_type` it prints the raw number, which is why the average and the count are separate bindings.

Link the rating in the buy area to `#reviews` so the header's star row scrolls here. Remember that this section and the `tabs` marker cannot both be on the page: the tabs element carries its own reviews tab and only one of them can render WooCommerce's reviews.

## Section 5: Complete the look

Use when: the product is part of a set, or the store sells accessories for it. This is the upsell the owner curates per product in WooCommerce, not a generic "you may also like".

```html
<section class="section ps-look">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title">Complete the set</h2>
      <a class="ps-look-all" href="/shop/">Shop all</a>
    </div>
    <div bd-woo="upsells" class="ps-look-row"></div>
  </div>
</section>
<style>
  .ps-look-all { font: 500 14px/1 var(--font-body); color: var(--ink-muted); text-decoration: none; white-space: nowrap; }
  .ps-look-all:hover { color: var(--ink); }
  .ps-look-row:not(:has(*)) { display: none; }
  .ps-look-row ul.products { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; list-style: none; margin: 0; padding: 0; }
  .ps-look-row .upsells ul.products::before, .ps-look-row .upsells ul.products::after { content: none; }
  .ps-look-row ul.products li.product img { width: 100%; aspect-ratio: var(--card-ratio); object-fit: cover; border-radius: var(--radius); background: var(--surface-alt); }
  .ps-look-row ul.products li.product h2 { margin: 12px 0 4px; font: 500 15px/1.3 var(--font-body); }
  /* the builder styles the amount on the inner <bdi>, not the .price span, at .breakdance-woocommerce
     .product .price .woocommerce-Price-amount bdi, so a rule on .price alone leaves the display font in place */
  .ps-look-row ul.products li.product .price { font: 600 15px/1.2 var(--font-body); }
  .ps-look-row ul.products li.product .price bdi { font: 600 15px/1.2 var(--font-body); }
  .ps-look-row ul.products li.product .price del bdi { font-weight: 400; color: var(--ink-muted); }
  @media (max-width: 899px) { .ps-look-row ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; } }
</style>
```

That `bdi` rule is not optional. Every product row a WooCommerce element renders (upsells, related products, cross-sells) puts the amount in `<span class="woocommerce-Price-amount"><bdi>` and the builder sizes it from `--bde-woo-typography__size-large` on the `bdi`, so a rule on `.price` alone leaves the price in the display font at 25px. Setting those two variables on the row instead works on an `enabled` store, and also covers the struck-through price; on an unstyled one the variables do nothing, so write the `bdi` rule.

Upsells are set per product under Product data > Linked Products, so the section is empty until the owner fills them in: tell them that, and keep the `:not(:has(*))` collapse so an unfilled product does not show an empty heading. For a row that is never empty, use `related-products` instead, which WooCommerce fills from the category.

## Section 6: How it works, in three steps

Use when: the product needs an action from the buyer (assembly, a subscription, a service, software). Three numbered steps beat a paragraph.

```html
<section class="section ps-steps">
  <div class="container">
    <h2 class="section-title ps-steps-h">Getting started</h2>
    <ol class="ps-steps-list">
      <li class="ps-step"><span class="ps-step-n">1</span><h3 class="ps-step-h">Unbox and rinse</h3><p class="ps-step-p">Warm water and a soft cloth. No detergent on the first wash.</p></li>
      <li class="ps-step"><span class="ps-step-n">2</span><h3 class="ps-step-h">Season the glaze</h3><p class="ps-step-p">One hour in a low oven sets the finish and closes the surface.</p></li>
      <li class="ps-step"><span class="ps-step-n">3</span><h3 class="ps-step-h">Use it daily</h3><p class="ps-step-p">Dishwasher, microwave and oven safe from then on.</p></li>
    </ol>
  </div>
</section>
<style>
  .ps-steps-h { margin: 0 0 32px; }
  .ps-steps-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; counter-reset: none; }
  .ps-step { display: grid; gap: 8px; align-content: start; padding-top: 20px; border-top: 2px solid var(--ink); }
  .ps-step-n { font: 600 13px/1 var(--font-body); letter-spacing: .08em; color: var(--ink-muted); }
  .ps-step-h { margin: 0; font: 600 18px/1.3 var(--font-body); }
  .ps-step-p { margin: 0; color: var(--ink-muted); font: 15px/1.6 var(--font-body); }
  @media (max-width: 767px) { .ps-steps-list { grid-template-columns: minmax(0, 1fr); gap: 24px; } }
</style>
```

## Section 7: Compare the range

Use when: the product comes in tiers or sizes and the shopper is picking between them. Static rows, because the comparison is an editorial judgement the owner makes, not data WooCommerce holds.

```html
<section class="section ps-compare">
  <div class="container">
    <h2 class="section-title ps-compare-h">Which size fits you</h2>
    <div class="ps-compare-scroll">
      <table class="ps-compare-table">
        <thead>
          <tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Small</th><th scope="col" class="is-current">Medium</th><th scope="col">Large</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Capacity</th><td>250 ml</td><td class="is-current">400 ml</td><td>600 ml</td></tr>
          <tr><th scope="row">Best for</th><td>Espresso</td><td class="is-current">Filter and tea</td><td>Sharing</td></tr>
          <tr><th scope="row">Height</th><td>7 cm</td><td class="is-current">9 cm</td><td>11 cm</td></tr>
          <tr><th scope="row">Stacks</th><td>Yes</td><td class="is-current">Yes</td><td>No</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
<style>
  .ps-compare-h { margin: 0 0 24px; }
  .ps-compare-scroll { overflow-x: auto; scrollbar-width: thin; }
  .ps-compare-table { width: 100%; min-width: 560px; border-collapse: collapse; font: 15px/1.5 var(--font-body); }
  .ps-compare-table th, .ps-compare-table td { padding: 14px 16px; border-bottom: 1px solid var(--line); text-align: left; }
  .ps-compare-table thead th { font: 600 15px/1.2 var(--font-body); border-bottom-width: 2px; border-bottom-color: var(--ink); }
  .ps-compare-table tbody th { font-weight: 500; color: var(--ink-muted); }
  .ps-compare-table .is-current { background: var(--surface-alt); }
  .ps-compare-table thead th.is-current { position: relative; }
  .ps-compare-table thead th.is-current::after { content: "This one"; display: block; margin-top: 2px; font: 500 12px/1.2 var(--font-body); color: var(--ink-muted); }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
```

Mark the current product's column with `is-current` per template only if the store has a template per size; otherwise leave the column unmarked rather than lying on three of the four pages.

## Section 8: Sticky buy bar for the rest of the page

Use when: the page is long and the Add to cart button scrolls away. This is CSS only: a bar that sticks to the bottom of the viewport for as long as the sections after the header are on screen, then scrolls away with the footer.

```html
<div class="ps-sticky-zone">
  <!-- every section after the product header goes in here -->
  <div class="ps-sticky-bar">
    <div class="container ps-sticky-inner">
      <img class="ps-sticky-img" bd-src="product_image" alt="">
      <div class="ps-sticky-text">
        <p class="ps-sticky-title" bd-bind="product_title"></p>
        <p class="ps-sticky-price" bd-bind="product_price"></p>
      </div>
      <div bd-woo="add-to-cart" class="ps-sticky-buy"></div>
      <a class="btn btn--primary ps-sticky-link" href="#buy">Choose options</a>
    </div>
  </div>
</div>
<style>
  .ps-sticky-zone { position: relative; }
  .ps-sticky-bar { position: sticky; bottom: 0; z-index: 40; border-top: 1px solid var(--line); background: var(--surface); box-shadow: 0 -8px 24px rgba(0,0,0,.06); }
  .ps-sticky-inner { display: flex; align-items: center; gap: 16px; padding-block: 12px; }
  .ps-sticky-img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: var(--surface-alt); flex: none; }
  .ps-sticky-text { display: grid; gap: 2px; min-width: 0; }
  .ps-sticky-title { margin: 0; font: 600 15px/1.2 var(--font-body); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ps-sticky-price { margin: 0; font: 15px/1.2 var(--font-body); color: var(--ink-muted); }
  /* the real add-to-cart, compacted: the bar sells one at a time, so its quantity input goes */
  .ps-sticky-buy { margin-left: auto; }
  .ps-sticky-buy form.cart { display: flex; align-items: center; gap: 0; margin: 0; }
  .ps-sticky-buy .quantity { display: none; }
  .ps-sticky-buy button.single_add_to_cart_button { min-height: 44px; padding: 10px 28px; white-space: nowrap; }
  .ps-sticky-link { margin-left: auto; min-height: 44px; padding: 10px 24px; white-space: nowrap; }
  /* one of the two, never both: the link takes over when the product needs a variation chosen */
  .ps-sticky-link { display: none; }
  .ps-sticky-inner:has(.ps-sticky-buy form.variations_form) .ps-sticky-buy { display: none; }
  .ps-sticky-inner:has(.ps-sticky-buy form.variations_form) .ps-sticky-link { display: inline-flex; }
  @media (max-width: 767px) {
    .ps-sticky-img, .ps-sticky-text { display: none; }
    .ps-sticky-buy, .ps-sticky-link { margin: 0; width: 100%; }
    .ps-sticky-buy form.cart, .ps-sticky-buy button.single_add_to_cart_button { width: 100%; }
  }
</style>
```

Two things make the sticky part work. The bar is the **last child** of the zone, so it sticks to the bottom edge while the zone is on screen and leaves when the zone ends; put it first and it will not stick. And nothing between the bar and the viewport may have `overflow: hidden`, which silently kills every `position: sticky` inside it.

### The button in the bar

A second real add-to-cart is fine on a **simple product** and it is the better bar: one tap buys. WooCommerce generates the quantity input's id with `uniqid()`, so two forms on one page do not collide, and each posts its own `add-to-cart` value. Hide the bar's quantity input as above; it still submits, at the product's minimum quantity.

On a **variable product** it is not fine, and the reason is worth knowing. `wc_dropdown_variation_attribute_options` gives each attribute select the attribute name as its id (`pa_color`), with nothing to make it unique, so a second variations form puts a second `id="pa_color"` in the document and every `<label for="pa_color">` resolves to the first one. The two forms also hold independent state: choosing a colour in the bar does not update the one the shopper already started above, and the bar's own Add to cart stays disabled until they choose again inside it. So the bar links to the buy area instead, which is where they have to end up anyway.

The `:has()` pair at the end of the CSS picks between them from what WooCommerce rendered: `form.variations_form` present means variable, so the link shows and the form hides. Understand what that does and does not buy you. It gets the right control in front of the shopper on both product types with no conditions and no per-template work. It does **not** remove the duplicate ids: the hidden form is still in the document on variable products. The visible page behaves correctly, because a duplicate id resolves to the first match and the second form is hidden from everyone, but the markup no longer validates.

If the store sells only simple products, drop the link and the `:has()` rules. If it sells only variable products, drop the `bd-woo="add-to-cart"` element and keep the link, relabelled "Choose options". Only reach for the switch when the catalogue is mixed and one template serves both.

## Choosing

| The shopper still needs to | Section |
|---|---|
| be reassured about delivery, returns, warranty | 1 |
| understand why this product, not a cheaper one | 2 |
| compare numbers with something else | 3, 7 |
| trust other buyers | 4 |
| buy the thing that goes with it | 5 |
| know what happens after it arrives | 6 |
| be able to buy without scrolling back | 8 |

Simple products usually need 1, 4 and 5. Considered purchases add 2 and 3. A page with all eight is a landing page wearing a product page's clothes.
