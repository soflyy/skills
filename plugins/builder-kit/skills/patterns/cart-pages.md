# Cart page patterns

Build on the Cart page's `post_id` (`search-posts`, `post_type: page`, "cart"). Both states, items and empty, must be designed; `preview-post` shows the empty state because the preview has no cart session. Every design below is scoped under `.cart-page`, sets the WooCommerce variables the builder's stylesheet reads, then adds class rules at the same selector depth the stylesheet uses. Paste the shared block once, then one design. The shared block styles every WooCommerce part on the page and works under any layout, so keep it even when you adapt a design or build your own frame; a part no rule reaches renders raw.

## Shared: the row anatomy

WooCommerce renders the rows as a table, and where the builder's stylesheet is loaded it also chromes that table (header band, inset borders, radius) and restacks it on phones. The shared block strips the chrome, which is a no-op when there is none, and lays the rows out as a grid at every width, so a design only decides the look.

Paste the notice reset from `notices.md` alongside this block: notices arrive unstyled and nothing here colours them.

```css
.cart-page { padding-block: 40px 96px; }
/* fields (the coupon input, shipping calculator) arrive bare, so this is their appearance */
.cart-page .input-text, .cart-page input[type="text"], .cart-page input[type="email"], .cart-page select, .cart-page textarea { width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: 15px/1.4 var(--font-body); }
.cart-page .input-text:focus, .cart-page select:focus, .cart-page textarea:focus { outline: none; border-color: var(--ink); }
.cart-page .cart-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 28px; }
.cart-page .cart-title { margin: 0; font: 600 clamp(28px, 3vw, 40px)/1.1 var(--font-display); }
.cart-page .cart-title small { font: 500 15px/1 var(--font-body); color: var(--ink-muted); margin-left: 10px; }
.cart-page .cart-continue { font: 500 14px/1 var(--font-body); color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--line); padding-bottom: 2px; }
.cart-page .cart-continue:hover { border-bottom-color: var(--ink); }
/* rows: drop the table chrome, lay each row out as a grid */
.cart-page table.woocommerce-cart-form__contents { display: block; border-radius: 0; overflow: visible; }
.cart-page table.woocommerce-cart-form__contents thead { display: none; }
.cart-page table.woocommerce-cart-form__contents tbody { display: grid; gap: 0; padding: 0; box-shadow: none; background: transparent; border-radius: 0; }
.cart-page .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { display: grid; grid-template-columns: 112px minmax(0, 1fr) 132px 96px 32px; grid-template-areas: "thumb name qty total remove" "thumb price qty total remove"; column-gap: 20px; row-gap: 4px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--line); }
.cart-page .woocommerce-cart-form__contents tbody tr.woocommerce-cart-form__cart-item td { padding: 0; border: 0; background: transparent; }
.cart-page .woocommerce-cart-form__contents td.product-thumbnail { grid-area: thumb; width: auto; }
.cart-page .woocommerce-cart-form__contents td.product-thumbnail a { display: block; width: 100%; }
.cart-page .woocommerce-cart-form__contents td.product-thumbnail img { width: 112px; height: 112px; object-fit: cover; border-radius: var(--radius); display: block; background: var(--surface-alt); }
.cart-page .woocommerce-cart-form__contents td.product-name { grid-area: name; align-self: end; padding: 0; }
.cart-page .woocommerce-cart-form__contents td.product-name a { color: var(--ink); text-decoration: none; font: 500 16px/1.3 var(--font-body); }
.cart-page .woocommerce-cart-form__contents td.product-name a:hover { text-decoration: underline; text-underline-offset: 3px; }
.cart-page .woocommerce-cart-form__contents dl.variation { margin: 4px 0 0; font: 13px/1.5 var(--font-body); color: var(--ink-muted); display: flex; flex-wrap: wrap; gap: 0 10px; }
.cart-page .woocommerce-cart-form__contents dl.variation dt, .cart-page .woocommerce-cart-form__contents dl.variation dd { display: inline; margin: 0; font-weight: 400; }
.cart-page .woocommerce-cart-form__contents dl.variation dd p { display: inline; margin: 0; }
.cart-page .woocommerce-cart-form__contents p.backorder_notification { margin: 4px 0 0; font: 13px/1.4 var(--font-body); color: var(--info); }
.cart-page .woocommerce-cart-form__contents td.product-price { grid-area: price; align-self: start; display: block; font: 14px/1.4 var(--font-body); color: var(--ink-muted); }
.cart-page .woocommerce-cart-form__contents td.product-quantity { grid-area: qty; margin: 0; }
.cart-page .woocommerce-cart-form__contents td.product-subtotal { grid-area: total; text-align: right; font: 600 16px/1 var(--font-body); white-space: nowrap; }
.cart-page .woocommerce-cart-form__contents td.product-remove { grid-area: remove; justify-self: end; }
.cart-page .woocommerce-cart-form__contents .product-remove a.remove { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: 50%; color: var(--ink-muted); background: transparent; text-decoration: none; font: 400 20px/1 var(--font-body); }
.cart-page .woocommerce-cart-form__contents .product-remove a.remove:hover { background: var(--error-bg); color: var(--error); }
/* quantity stepper: reset from patterns/quantity-steppers.md, compact design */
.cart-page .quantity { position: relative; display: inline-flex; align-items: stretch; width: auto; max-width: none; margin: 0; height: 40px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); overflow: hidden; }
.cart-page .quantity input.qty { width: 44px; min-width: 0; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: inherit; text-align: center; font: 500 14px/1 var(--font-body); -moz-appearance: textfield; appearance: textfield; }
.cart-page .quantity input.qty:focus { outline: none; }
.cart-page .bde-quantity-button { position: static; inset: auto; transform: none; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 34px; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--ink-muted); font-size: 10px; cursor: pointer; }
.cart-page .bde-quantity-button:hover { color: var(--ink); background: var(--surface-alt); }
/* coupon row (the table's last row) */
.cart-page .woocommerce-cart-form__contents tr:last-child { display: block; border: 0; }
.cart-page .woocommerce-cart-form__contents td.actions { display: flex; align-items: center; gap: 12px; padding: 20px 0 0; border: 0; background: transparent; }
.cart-page .actions .coupon { display: grid; grid-template-columns: minmax(0, 200px) auto; gap: 8px; align-items: center; width: auto; }  /* more designs in checkout.md, "Coupon form designs" */
.cart-page .actions .coupon label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); }
.cart-page .actions .coupon input#coupon_code { width: auto; min-height: 44px; padding: 0 14px; font: 14px/1 var(--font-body); }
.cart-page .actions .coupon button[name="apply_coupon"] { min-height: 44px; padding: 0 16px; border: 1px solid var(--ink); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 13px/1 var(--font-body); text-transform: none; width: auto; cursor: pointer; }
.cart-page .actions .coupon button[name="apply_coupon"]:hover { background: var(--ink); color: #fff; }
.cart-page button[name="update_cart"] { display: none; }
/* totals panel */
.cart-page .cart_totals { background: var(--surface-alt); border-radius: var(--radius); padding: 24px; }
.cart-page .cart_totals h2 { margin: 0 0 12px; font: 600 18px/1.2 var(--font-body); }
.cart-page .cart_totals table.shop_table { width: 100%; border: 0; background: transparent; border-radius: 0; box-shadow: none; }
.cart-page .cart_totals table.shop_table tbody { box-shadow: none; background: transparent; }
.cart-page .cart_totals table.shop_table th, .cart-page .cart_totals table.shop_table td { padding: 12px 0; border: 0; border-bottom: 1px solid var(--line); background: transparent; font: 15px/1.3 var(--font-body); text-align: left; vertical-align: top; }
.cart-page .cart_totals table.shop_table th { font-weight: 500; color: var(--ink-muted); }
.cart-page .cart_totals table.shop_table td { text-align: right; font-weight: 500; }
.cart-page .cart_totals tr.order-total th, .cart-page .cart_totals tr.order-total td { font: 700 20px/1.2 var(--font-body); color: var(--ink); border-bottom: 0; padding-top: 16px; }
.cart-page .cart_totals ul#shipping_method { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; text-align: left; }
.cart-page .cart_totals ul#shipping_method li { display: flex; align-items: center; gap: 8px; font: 14px/1.3 var(--font-body); }
.cart-page .cart_totals ul#shipping_method label { margin: 0; font-weight: 400; }
.cart-page .cart_totals .shipping-calculator-button { font: 500 13px/1.2 var(--font-body); color: var(--ink); }
.cart-page .cart_totals .woocommerce-shipping-destination { font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
.cart-page .cart_totals tr.cart-discount td { color: var(--success); }
.cart-page .cart_totals tr.cart-discount a.woocommerce-remove-coupon { margin-left: 6px; font-size: 12px; color: var(--ink-muted); }
.cart-page .wc-proceed-to-checkout { display: grid; gap: 10px; margin-top: 16px; padding: 0; }
.cart-page .wc-proceed-to-checkout a.checkout-button { display: inline-flex; align-items: center; justify-content: center; width: 100%; min-height: 54px; margin: 0; padding: 0 24px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 16px/1 var(--font-body); text-transform: none; text-decoration: none; }
.cart-page .wc-proceed-to-checkout a.checkout-button:hover { background: var(--brand-hover); color: var(--on-brand); }
.cart-page .wc-proceed-to-checkout a.checkout-button::after { content: none; }
.cart-page .wc-proceed-to-checkout > *:not(.checkout-button) { width: 100%; margin: 0; }   /* the gateway's express button */
.cart-page .cart-pay { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.cart-page .cart-pay li { height: 24px; padding: 0 6px; border: 1px solid var(--line); border-radius: 4px; background: #fff; display: inline-flex; align-items: center; font: 600 10px/1 var(--font-body); letter-spacing: .04em; color: var(--ink-muted); }
.cart-page .cart-note { margin: 12px 0 0; font: 13px/1.5 var(--font-body); color: var(--ink-muted); }
/* notices at the top of the cart ("Coupon applied", errors) */
.cart-page .woocommerce-notices-wrapper .woocommerce-message, .cart-page .woocommerce-notices-wrapper .woocommerce-error, .cart-page .woocommerce-notices-wrapper .woocommerce-info { margin: 0 0 20px; }
@media (max-width: 767px) {
  .cart-page .cart-head { flex-direction: column; align-items: flex-start; gap: 8px; }
  .cart-page .woocommerce-cart-form__contents tbody { padding: 0; gap: 0; }
  .cart-page .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { grid-template-columns: 88px minmax(0, 1fr) 32px; grid-template-areas: "thumb name remove" "thumb price price" "thumb qty total"; column-gap: 14px; row-gap: 6px; padding: 16px 0; }
  .cart-page .woocommerce-cart-form__contents td.product-thumbnail img { width: 88px; height: 88px; }
  .cart-page .woocommerce-cart-form__contents td.product-name { align-self: start; }
  .cart-page .woocommerce-cart-form__contents td.product-price { display: block !important; }
  .cart-page .woocommerce-cart-form__contents td.product-quantity { order: 0; grid-column: auto; margin: 0; }
  .cart-page .woocommerce-cart-form__contents td.product-subtotal { align-self: center; }
  .cart-page .woocommerce-cart-form__contents td.product-remove { grid-column: auto; grid-row: auto; align-self: start; }
  .cart-page .woocommerce-cart-form__contents td.actions { flex-direction: column; align-items: stretch; }
  .cart-page .actions .coupon { width: 100%; grid-template-columns: minmax(0, 1fr) auto; }
  .cart-page .cart_totals { padding: 20px; }
}
```

The one-element cart lays out rows and totals through its controls; the CSS above only styles what is inside them. Insert it with `edit-post` into the design's slot:

```jsonc
{ "post_id": 250, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageshoppingcart", "parent_id": 6,
  "properties": { "design": { "layout": { "totals_position": "top-right", "sticky_totals": true, "sticky_offset": { "number": 96, "unit": "px", "style": "96px" }, "stack_vertically_at": "breakpoint_tablet" },
                              "spacing": { "between_columns": { "number": 56, "unit": "px", "style": "56px" }, "before_cross_sells": { "number": 72, "unit": "px", "style": "72px" } } } } } } ] }
```

## Cart 1: list rows, sticky summary panel (the default)

Use when: most stores. Rows on hairlines, a tinted summary that stays in view, express button and payment marks under the checkout button, cross-sells after.

```html
<section class="cart-page store">
  <div class="container">
    <div class="cart-head">
      <h1 class="cart-title">Your bag</h1>
      <a class="cart-continue" href="/shop/">Continue shopping</a>
    </div>
    <div class="cart-slot"></div>
  </div>
</section>
<style>
  .cart-page .cart_totals .cart-pay { margin-top: 16px; }
  .cart-page .cart-reassure { list-style: none; margin: 28px 0 0; padding: 20px 0 0; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 8px 28px; font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
  .cart-page .cart-reassure li { display: flex; align-items: center; gap: 8px; }
  .cart-page .cart-reassure li::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
</style>
```

After the element is in, add the payment marks and the reassurance line as a Component in `content.content` if the element exposes an after-totals block, or, simpler, as static HTML in the frame under the slot (it renders under both columns on desktop, which reads fine as a page footer line):

```html
<ul class="cart-reassure">
  <li>Free shipping over $75</li>
  <li>30-day returns</li>
  <li>Secure checkout</li>
</ul>
```

Only claims the owner confirmed.

## Cart 2: editorial, big type, totals under the rows

Use when: fashion, furniture, one to three items per order, a design that wants air. Display serif for names and totals, 120px images, the summary as a right-aligned block under the rows instead of a panel (`totals_position: "bottom-right"`, `sticky_totals` off).

```html
<section class="cart-page cart-page--editorial store">
  <div class="container container--narrow">
    <div class="cart-head">
      <h1 class="cart-title">Bag</h1>
      <a class="cart-continue" href="/shop/">Keep browsing</a>
    </div>
    <div class="cart-slot"></div>
  </div>
</section>
<style>
  .cart-page--editorial .container--narrow { max-width: 920px; }
  .cart-page--editorial .cart-title { font-size: clamp(36px, 5vw, 56px); font-weight: 500; }
  .cart-page--editorial .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { grid-template-columns: 120px minmax(0, 1fr) 132px 120px 32px; padding: 28px 0; }
  .cart-page--editorial .woocommerce-cart-form__contents td.product-thumbnail img { width: 120px; height: 150px; border-radius: 4px; }
  .cart-page--editorial .woocommerce-cart-form__contents td.product-name a { font: 500 20px/1.25 var(--font-display); }
  .cart-page--editorial .woocommerce-cart-form__contents td.product-subtotal { font: 500 20px/1 var(--font-display); }
  .cart-page--editorial .quantity { border-color: transparent; border-bottom-color: var(--ink); border-radius: 0; background: transparent; }
  .cart-page--editorial .cart_totals { background: transparent; border-radius: 0; padding: 8px 0 0; max-width: 420px; margin-left: auto; }
  .cart-page--editorial .cart_totals h2 { display: none; }
  .cart-page--editorial .cart_totals tr.order-total th, .cart-page--editorial .cart_totals tr.order-total td { font: 500 26px/1.2 var(--font-display); }
  .cart-page--editorial .wc-proceed-to-checkout a.checkout-button { border-radius: 0; background: var(--ink); min-height: 60px; letter-spacing: .04em; }
  .cart-page--editorial .wc-proceed-to-checkout a.checkout-button:hover { background: var(--brand); }
  @media (max-width: 767px) {
    .cart-page--editorial .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { grid-template-columns: 96px minmax(0, 1fr) 32px; }
    .cart-page--editorial .woocommerce-cart-form__contents td.product-thumbnail img { width: 96px; height: 120px; }
    .cart-page--editorial .woocommerce-cart-form__contents td.product-name a { font-size: 17px; }
    .cart-page--editorial .cart_totals { max-width: none; }
  }
</style>
```

```jsonc
{ "post_id": 250, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageshoppingcart", "parent_id": 6,
  "properties": { "design": { "layout": { "totals_position": "bottom-right", "sticky_totals": false, "stack_vertically_at": "breakpoint_tablet" } } } } } ] }
```

## Cart 3: total-first, centred (single-product and premium stores)

Use when: one hero product or a small catalog, the Apple pattern: the total is the headline, the checkout and express buttons sit right under it, the rows come after. Built with the granular elements so the totals can go above the rows.

```html
<section class="cart-page cart-page--total-first store">
  <div class="container container--narrow">
    <header class="cart3-head">
      <p class="cart3-eyebrow">Your bag</p>
      <div class="cart3-totals-slot"></div>
      <p class="cart3-ship">Free delivery on every order. Taxes calculated at checkout.</p>
    </header>
    <div class="cart3-items-slot"></div>
    <div class="cart3-empty-slot"></div>
    <div class="cart3-cross-slot"></div>
  </div>
</section>
<style>
  .cart-page--total-first .container--narrow { max-width: 880px; }
  .cart3-head { text-align: center; padding: 8px 0 40px; border-bottom: 1px solid var(--line); margin-bottom: 8px; }
  .cart3-eyebrow { margin: 0 0 8px; font: 600 13px/1.2 var(--font-body); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-muted); }
  .cart3-ship { margin: 16px 0 0; font: 14px/1.5 var(--font-body); color: var(--ink-muted); }
  /* the totals element becomes the headline: only the total row and the buttons show up top */
  .cart-page--total-first .cart_totals { background: transparent; padding: 0; max-width: 560px; margin-inline: auto; }
  .cart-page--total-first .cart_totals h2 { display: none; }
  .cart-page--total-first .cart_totals table.shop_table tr { display: none; }
  .cart-page--total-first .cart_totals table.shop_table tr.order-total { display: flex; justify-content: center; gap: 12px; }
  .cart-page--total-first .cart_totals tr.order-total th, .cart-page--total-first .cart_totals tr.order-total td { font: 600 clamp(28px, 4vw, 40px)/1.1 var(--font-display); border: 0; padding: 0; }
  .cart-page--total-first .cart_totals tr.order-total th::after { content: ":"; }
  .cart-page--total-first .wc-proceed-to-checkout { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 24px; }
  .cart-page--total-first .wc-proceed-to-checkout a.checkout-button { border-radius: var(--radius-pill); }
  .cart-page--total-first .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { grid-template-columns: 140px minmax(0, 1fr) 132px 120px 32px; padding: 32px 0; }
  .cart-page--total-first .woocommerce-cart-form__contents td.product-thumbnail img { width: 140px; height: 140px; object-fit: contain; background: transparent; }
  .cart-page--total-first .woocommerce-cart-form__contents td.product-name a { font: 500 20px/1.3 var(--font-body); }
  .cart-page--total-first .woocommerce-cart-form__contents td.product-subtotal { font-size: 20px; }
  @media (max-width: 767px) {
    .cart-page--total-first .woocommerce-cart-form__contents tr.woocommerce-cart-form__cart-item { grid-template-columns: 96px minmax(0, 1fr) 32px; }
    .cart-page--total-first .woocommerce-cart-form__contents td.product-thumbnail img { width: 96px; height: 96px; }
  }
</style>
```

```jsonc
{ "post_id": 250, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartTotals",       "parent_id": 8 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartContents",     "parent_id": 10 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartEmptyMessage", "parent_id": 11 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartCrossSells",   "parent_id": 12 } }
] }
```

The full totals breakdown is hidden here on purpose; the checkout shows it. If the owner sells with shipping options in the cart, use Cart 1 instead.

## Cart 4: two columns you own, with a trust column

Use when: the summary column needs more than the totals: a free-shipping progress bar, payment marks, a support line, a gift note. Granular elements in your own grid.

```html
<section class="cart-page cart-page--split store">
  <div class="container">
    <div class="cart-head">
      <h1 class="cart-title">Your cart</h1>
      <a class="cart-continue" href="/shop/">Continue shopping</a>
    </div>
    <div class="cart4-grid">
      <div class="cart4-main">
        <div class="cart4-items-slot"></div>
        <div class="cart4-empty-slot"></div>
      </div>
      <aside class="cart4-aside">
        <div class="cart4-ship-slot"></div>
        <div class="cart4-totals-slot"></div>
        <ul class="cart-pay" aria-label="We accept"><li>VISA</li><li>MASTERCARD</li><li>AMEX</li><li>PAYPAL</li><li>APPLE PAY</li></ul>
        <p class="cart-note">Taxes and shipping are calculated at checkout.</p>
        <div class="cart4-help">
          <p class="cart4-help-title">Questions about your order?</p>
          <p class="cart4-help-line">Email <a href="mailto:hello@example.com">hello@example.com</a> or chat with us weekdays 9 to 5.</p>
        </div>
      </aside>
    </div>
    <div class="cart4-cross-slot"></div>
  </div>
</section>
<style>
  .cart4-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }
  .cart4-aside { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); display: grid; gap: 16px; }
  .cart-page--split .cart_totals { padding: 24px; }
  .cart4-help { padding: 16px 0 0; border-top: 1px solid var(--line); }
  .cart4-help-title { margin: 0 0 4px; font: 600 14px/1.3 var(--font-body); }
  .cart4-help-line { margin: 0; font: 13px/1.5 var(--font-body); color: var(--ink-muted); }
  .cart4-help-line a { color: var(--ink); }
  .cart4-cross-slot { margin-top: 72px; }
  @media (max-width: 1023px) { .cart4-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; } .cart4-aside { position: static; } }
</style>
```

```jsonc
{ "post_id": 250, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartContents",     "parent_id": 9 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartEmptyMessage", "parent_id": 10 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartTotals",       "parent_id": 13 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCartCrossSells",   "parent_id": 19 } }
] }
```

Hide the aside when the cart is empty so the empty state stands alone: `set-element-conditions` on the `.cart4-aside` container with `woocommerce-cart-quantity` "is greater than" `0`.

## Free-shipping progress bar (stepped, no plugin)

Five Text elements in the `.cart4-ship-slot` (or above the totals in any design), each carrying one band of `woocommerce-cart-value` conditions, so exactly one renders. The bar is CSS on a static width per band. Values are for a $75 threshold; adjust per store. Conditions evaluate on render: after an AJAX quantity change the bar updates on the next load, and the owner should know that.

```html
<div class="ship ship--0"><p class="ship-text">Add <strong>$75</strong> more for free shipping.</p><div class="ship-bar"><span></span></div></div>
<div class="ship ship--25"><p class="ship-text">You're on your way to free shipping.</p><div class="ship-bar"><span></span></div></div>
<div class="ship ship--50"><p class="ship-text">Halfway to free shipping.</p><div class="ship-bar"><span></span></div></div>
<div class="ship ship--75"><p class="ship-text">Almost there: free shipping is close.</p><div class="ship-bar"><span></span></div></div>
<div class="ship ship--100 is-unlocked"><p class="ship-text">You've unlocked <strong>free shipping</strong>.</p><div class="ship-bar"><span></span></div></div>
<style>
  .ship { padding: 14px 16px; border-radius: var(--radius); background: var(--surface-alt); }
  .ship-text { margin: 0 0 10px; font: 14px/1.4 var(--font-body); color: var(--ink); }
  .ship-bar { height: 6px; border-radius: 999px; background: var(--line); overflow: hidden; }
  .ship-bar span { display: block; height: 100%; border-radius: inherit; background: var(--brand); transition: width .4s ease; }
  .ship--0 .ship-bar span { width: 6%; }
  .ship--25 .ship-bar span { width: 30%; }
  .ship--50 .ship-bar span { width: 55%; }
  .ship--75 .ship-bar span { width: 82%; }
  .ship--100 .ship-bar span { width: 100%; background: var(--success); }
  .ship.is-unlocked { background: var(--success-bg); }
  .ship.is-unlocked .ship-text { color: var(--success); }
</style>
```

```jsonc
// set-element-conditions, one call per element (ids from get-post-tree); two rules in one group are ANDed
{ "post_id": 250, "element_id": 31, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "18.75" } ]] }
{ "post_id": 250, "element_id": 32, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is greater than", "value": "18.74" }, { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "37.5" } ]] }
{ "post_id": 250, "element_id": 33, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is greater than", "value": "37.49" }, { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "56.25" } ]] }
{ "post_id": 250, "element_id": 34, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is greater than", "value": "56.24" }, { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "75" } ]] }
{ "post_id": 250, "element_id": 35, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is greater than", "value": "74.99" } ]] }
```

Copy the operand strings from `get-element-conditions`. The remaining amount cannot be computed without a plugin; the copy stays qualitative except at zero.

## Designed empty state with merchandising

The empty message element renders WooCommerce's notice and "Return to shop" button; wrap it and add a product row that only shows when the cart is empty.

```html
<div class="cart-empty-wrap">
  <div class="cart-empty-slot"></div>
  <section class="cart-empty-picks">
    <h2 class="section-title">Popular right now</h2>
    <div bd-loop="products" bd-loop-name="Product Card" bd-featured="true" bd-limit="4" class="pg-grid pg-grid--4">…a card from patterns/product-grids.md…</div>
  </section>
</div>
<style>
  .cart-empty-wrap { text-align: center; }
  .cart-empty-wrap .cart-empty { display: grid; justify-items: center; gap: 8px; margin: 0 0 20px; padding: 48px 24px 0; background: transparent; color: var(--ink); font: 500 22px/1.3 var(--font-display); }
  .cart-empty-wrap .cart-empty::before { content: ""; width: 64px; height: 64px; margin-bottom: 8px; border-radius: 50%; background: var(--surface-alt); -webkit-mask: none; mask: none; position: static; }
  .cart-empty-wrap p.return-to-shop { margin: 0 0 64px; }
  .cart-empty-wrap p.return-to-shop a.button { display: inline-flex; min-height: 52px; padding: 0 28px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 15px/1 var(--font-body); text-transform: none; text-decoration: none; align-items: center; }
  .cart-empty-picks { text-align: left; }
  .cart-empty-picks .section-title { margin: 0 0 32px; }
</style>
```

```jsonc
// the picks only when the cart is empty
{ "post_id": 250, "element_id": 18, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-quantity", "operand": "is", "value": "0" } ]] }
```

Bring the card's own `<style>` along with its markup (Product Grid 1's `.pg1-*` rules plus the shared `.pg-*` CSS): without it the cart button, badge and body lose their layout.

The builder's info-notice icon on `.cart-empty` is a mask on `::before`; the rule above turns it into a neutral disc. Replace the disc with a bag icon by giving the `::before` a `mask` of your own SVG data URI in the ink colour.

## Cross-sells styled like the shop cards

WooCommerce's cross-sells markup is its loop (`ul.products > li.product`), not your bound card, so style it to match the grid:

```css
.cart-page .cross-sells { margin-top: 0; }
.cart-page .cross-sells h2 { font: 600 24px/1.2 var(--font-display); margin: 0 0 24px; }
.cart-page .cross-sells ul.products { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
.cart-page .cross-sells li.product { display: grid; gap: 8px; margin: 0; }
.cart-page .cross-sells li.product a img { width: 100%; aspect-ratio: var(--card-ratio); object-fit: cover; border-radius: var(--radius); }
.cart-page .cross-sells .woocommerce-loop-product__title { font: 500 15px/1.3 var(--font-body); color: var(--ink); margin: 0; }
.cart-page .cross-sells .price { font: 600 15px/1.2 var(--font-body); }
.cart-page .cross-sells a.button { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 13px/1 var(--font-body); text-transform: none; text-decoration: none; }
.cart-page .cross-sells a.button:hover { border-color: var(--ink); }
@media (max-width: 767px) { .cart-page .cross-sells ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } }
```

Give the cross-sells section a heading of your own in the frame if the design wants "You might also like" instead of WooCommerce's "You may be interested in…", and hide the built-in one (`.cart-page .cross-sells > h2 { display: none }`).

## Cart drawer instead of a cart page

Some stores route the header cart icon straight to checkout and keep the mini cart drawer as the only cart UI. Configure the mini cart with `primary_button: "checkout"` and `hide_quantity_input: false`, keep the Cart page built anyway (WooCommerce links to it from notices and emails), and set the mini cart's `continue_shopping_link` to `shop`.
