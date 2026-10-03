# Checkout patterns

Build on the Checkout page's `post_id`. The Checkout Builder needs its four required children inside it; verify with `get-post-tree` after every insert. Every design is scoped under `.checkout-page`; paste the shared block once, then the design's frame, then insert the builder and its parts. The shared block styles every WooCommerce part on the page and works under any layout, so keep it even when you adapt a design or build your own frame; a part no rule reaches renders raw.

The order received page renders on the same page: the builder swaps its children for WooCommerce's confirmation markup there, so the two order received designs at the end are CSS on that markup plus frame content revealed with `:has()`.

## Shared: fields, payment rows, notices

Paste the notice reset from `notices.md` alongside this block: it colours the success and info notices, which nothing here does.

```css
.checkout-page { padding-block: 32px 96px; }
/* section headings: the frame's own, numbered; WooCommerce's h3s are hidden */
.checkout-page .chk-h2 { display: flex; align-items: center; gap: 12px; margin: 0 0 16px; font: 600 20px/1.2 var(--font-body); }
.checkout-page .chk-h2 .chk-n { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--ink); color: #fff; font: 600 13px/1 var(--font-body); }
.checkout-page .woocommerce-billing-fields > h3, .checkout-page .woocommerce-additional-fields > h3, .checkout-page #order_review_heading { display: none; }
/* fields */
.checkout-page p.form-row { margin: 0; }
.checkout-page p.form-row label { display: block; margin: 0 0 6px; font: 500 13px/1.3 var(--font-body); color: var(--ink); }
.checkout-page p.form-row label .required { color: var(--error); text-decoration: none; }
.checkout-page p.form-row label .optional { color: var(--ink-muted); font-weight: 400; }
.checkout-page .woocommerce-input-wrapper { display: block; }
.checkout-page input.input-text, .checkout-page textarea.input-text, .checkout-page select { width: 100%; min-height: 50px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); font: 15px/1.4 var(--font-body); color: var(--ink); background: var(--surface); }
.checkout-page input.input-text:focus, .checkout-page textarea.input-text:focus, .checkout-page select:focus { outline: none; border-color: var(--ink); }
.checkout-page textarea.input-text { min-height: 96px; }
.checkout-page .select2-container .select2-selection--single { height: 50px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.checkout-page .select2-container .select2-selection--single .select2-selection__rendered { line-height: 48px; padding-left: 14px; color: var(--ink); font: 15px/48px var(--font-body); }
.checkout-page .select2-container .select2-selection--single .select2-selection__arrow { height: 48px; right: 8px; }
.checkout-page .select2-container--open .select2-selection--single { border-color: var(--ink); }
.checkout-page p.form-row.woocommerce-invalid input.input-text, .checkout-page p.form-row.woocommerce-invalid .select2-selection--single { border-color: var(--error); }
.checkout-page p.form-row.woocommerce-invalid label { color: var(--error); }
.checkout-page .woocommerce-form__label-for-checkbox { display: flex; align-items: center; gap: 10px; font: 14px/1.4 var(--font-body); cursor: pointer; }
.checkout-page .woocommerce-form__input-checkbox { width: 18px; height: 18px; margin: 0; accent-color: var(--ink); }
.checkout-page h3#ship-to-different-address { margin: 0; font: 500 15px/1.4 var(--font-body); }
.checkout-page h3#ship-to-different-address label.woocommerce-form__label-for-checkbox, .checkout-page h3#ship-to-different-address label.woocommerce-form__label-for-checkbox span { font: 500 15px/1.4 var(--font-body); color: var(--ink); }  /* the woo stylesheet sizes that span as a heading with an id-qualified rule */
.checkout-page .shipping_address { margin-top: 14px; }
.checkout-page .woocommerce-account-fields { margin-top: 14px; }
/* login and coupon toggles as one-line prompts */
.checkout-page .woocommerce-form-login-toggle .woocommerce-info, .checkout-page .woocommerce-form-coupon-toggle .woocommerce-info { margin: 0; padding: 0; background: transparent; color: var(--ink-muted); font: 14px/1.5 var(--font-body); border: 0; box-shadow: none; }
.checkout-page .woocommerce-form-login-toggle .woocommerce-info::before, .checkout-page .woocommerce-form-coupon-toggle .woocommerce-info::before { display: none; }
.checkout-page .woocommerce-form-login-toggle a, .checkout-page .woocommerce-form-coupon-toggle a { color: var(--ink); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.checkout-page form.woocommerce-form-login, .checkout-page form.checkout_coupon { margin: 12px 0 0; padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); box-shadow: none; }
/* coupon form: select by role, never by child order. WooCommerce prints an unclassed intro <p>,
   then p.form-row-first (field), then p.form-row-last (button), then a float-clearing div, and a
   notice can be injected before any of them. Full designs in the "Coupon form" section below. */
.checkout-page form.checkout_coupon { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 10px; align-items: end; }
.checkout-page form.checkout_coupon > p:not(.form-row) { grid-column: 1 / -1; margin: 0; font: 14px/1.4 var(--font-body); color: var(--ink-muted); }
.checkout-page form.checkout_coupon p.form-row-first { grid-column: 1; width: auto; margin: 0; }
.checkout-page form.checkout_coupon p.form-row-last { grid-column: 2; width: auto; margin: 0; }
.checkout-page form.checkout_coupon label.screen-reader-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); }
.checkout-page form.checkout_coupon .clear { display: none; }
.checkout-page form.checkout_coupon .woocommerce-error, .checkout-page form.checkout_coupon .woocommerce-info { grid-column: 1 / -1; margin: 0; }
.checkout-page form.checkout_coupon button[name="apply_coupon"] { min-height: 50px; padding: 0 18px; border: 1px solid var(--ink); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 14px/1 var(--font-body); text-transform: none; white-space: nowrap; cursor: pointer; }
.checkout-page form.checkout_coupon button[name="apply_coupon"]:hover { background: var(--ink); color: #fff; }
@media (max-width: 479px) { .checkout-page form.checkout_coupon { grid-template-columns: minmax(0, 1fr); } .checkout-page form.checkout_coupon p.form-row-last { grid-column: 1; } .checkout-page form.checkout_coupon button[name="apply_coupon"] { width: 100%; } }
/* order review table */
.checkout-page .woocommerce-checkout-review-order-table { width: 100%; border: 0; border-radius: 0; background: transparent; overflow: visible; }
.checkout-page .woocommerce-checkout-review-order-table thead { display: none; }
.checkout-page .woocommerce-checkout-review-order-table tbody, .checkout-page .woocommerce-checkout-review-order-table tfoot { box-shadow: none; background: transparent; border-radius: 0; }
.checkout-page .woocommerce-checkout-review-order-table tbody tr td, .checkout-page .woocommerce-checkout-review-order-table tfoot th, .checkout-page .woocommerce-checkout-review-order-table tfoot td { padding: 12px 0; border: 0; border-bottom: 1px solid var(--line); background: transparent; text-align: left; vertical-align: top; font: 15px/1.4 var(--font-body); }
.checkout-page .woocommerce-checkout-review-order-table tr.cart_item td.product-name { padding-right: 12px; color: var(--ink); }
.checkout-page .woocommerce-checkout-review-order-table tr.cart_item td.product-name .product-quantity { color: var(--ink-muted); font-weight: 400; }
.checkout-page .woocommerce-checkout-review-order-table tr.cart_item td.product-name dl.variation { margin: 2px 0 0; font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
.checkout-page .woocommerce-checkout-review-order-table tr.cart_item td.product-name dl.variation dt, .checkout-page .woocommerce-checkout-review-order-table tr.cart_item td.product-name dl.variation dd { display: inline; margin: 0; }
.checkout-page .woocommerce-checkout-review-order-table td.product-total, .checkout-page .woocommerce-checkout-review-order-table tfoot td { text-align: right; white-space: nowrap; font-weight: 500; }
.checkout-page .woocommerce-checkout-review-order-table tfoot th { font-weight: 500; color: var(--ink-muted); }
.checkout-page .woocommerce-checkout-review-order-table tr.order-total th, .checkout-page .woocommerce-checkout-review-order-table tr.order-total td { font: 700 20px/1.2 var(--font-body); color: var(--ink); border-bottom: 0; padding-top: 16px; }
.checkout-page .woocommerce-checkout-review-order-table ul#shipping_method { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.checkout-page .woocommerce-checkout-review-order-table ul#shipping_method li { display: flex; align-items: center; gap: 8px; font: 14px/1.4 var(--font-body); }
.checkout-page .woocommerce-checkout-review-order-table ul#shipping_method label { margin: 0; font-weight: 400; }
.checkout-page .woocommerce-checkout-review-order-table ul#shipping_method input { accent-color: var(--ink); }
/* payment methods as rows */
.checkout-page #payment { background: transparent; border: 0; padding: 0; box-shadow: none; border-radius: 0; }
.checkout-page ul.wc_payment_methods { list-style: none; margin: 0 0 20px; padding: 0; display: grid; gap: 8px; }
.checkout-page li.wc_payment_method { position: relative; margin: 0; padding: 14px 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); transition: border-color .15s, background .15s; }
.checkout-page li.wc_payment_method:has(input:checked) { border-color: var(--ink); background: var(--surface); }
.checkout-page li.wc_payment_method > input[type="radio"] { position: absolute; left: 16px; top: 18px; margin: 0; accent-color: var(--ink); }
.checkout-page li.wc_payment_method > label { display: flex; align-items: center; gap: 10px; margin: 0 0 0 28px; font: 500 15px/1.3 var(--font-body); color: var(--ink); cursor: pointer; }
.checkout-page li.wc_payment_method > label img { margin-left: auto; max-height: 24px; width: auto; }
.checkout-page li.wc_payment_method > label a.about_paypal { margin-left: auto; font: 12px/1 var(--font-body); }
.checkout-page .payment_box { margin: 12px 0 0 28px; padding: 14px; border-radius: 8px; background: var(--surface-alt); font: 13px/1.5 var(--font-body); color: var(--ink-muted); }
.checkout-page .payment_box::before { display: none; }
.checkout-page .payment_box p { margin: 0; }
.checkout-page .payment_box p + p { margin-top: 8px; }
.checkout-page .payment_box .form-row { margin-bottom: 10px; }
/* place order */
.checkout-page .form-row.place-order { display: grid; gap: 14px; margin: 0; }
.checkout-page .woocommerce-terms-and-conditions-wrapper { font: 13px/1.5 var(--font-body); color: var(--ink-muted); }
.checkout-page .woocommerce-terms-and-conditions-wrapper .woocommerce-privacy-policy-text p { margin: 0 0 8px; }
.checkout-page .woocommerce-terms-and-conditions-wrapper a { color: var(--ink); }
.checkout-page .woocommerce-terms-and-conditions-wrapper .validate-required label { align-items: flex-start; }
.checkout-page button#place_order { display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: 56px; margin: 0; padding: 0 24px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 16px/1 var(--font-body); text-transform: none; cursor: pointer; transition: background .15s; }
.checkout-page button#place_order:hover { background: var(--brand-hover); color: var(--on-brand); }
.checkout-page button#place_order::before { content: ""; width: 16px; height: 16px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='11' width='18' height='11' rx='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='11' width='18' height='11' rx='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg>") center / contain no-repeat; }
.checkout-page .chk-trust { list-style: none; margin: 0; padding: 16px 0 0; border-top: 1px solid var(--line); display: grid; gap: 8px; font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
.checkout-page .chk-trust li { display: flex; align-items: center; gap: 8px; }
.checkout-page .chk-trust li::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--success); flex: none; }
.checkout-page .chk-pay { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.checkout-page .chk-pay li { height: 24px; padding: 0 6px; border: 1px solid var(--line); border-radius: 4px; background: #fff; display: inline-flex; align-items: center; font: 600 10px/1 var(--font-body); letter-spacing: .04em; color: var(--ink-muted); }
/* notices */
.checkout-page .woocommerce-NoticeGroup-checkout { margin: 0 0 20px; }
.checkout-page .woocommerce-NoticeGroup-checkout .woocommerce-error { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; background: transparent; box-shadow: none; }
/* iconless by design: the frame zeroes --bde-woo-notices__icon-size, and this makes it explicit. The builder puts the icon on li::before at left: var(--bde-woo-notices__padding) with the li unpositioned (it anchors to the ul), so a card WITH an icon needs li { position: relative; padding-left: 44px } and li::before { left: 16px } */
.checkout-page .woocommerce-NoticeGroup-checkout .woocommerce-error li { margin: 0; padding: 12px 16px; border-radius: var(--radius); background: var(--error-bg); color: var(--error); font: 14px/1.4 var(--font-body); }
.checkout-page .woocommerce-NoticeGroup-checkout .woocommerce-error li::before { display: none; }
.checkout-page .woocommerce-NoticeGroup-checkout .woocommerce-error li a { color: inherit; font-weight: 600; }
/* express payment wrappers the gateways inject (Stripe, WooPayments, PayPal); only their spacing and the "or" line */
.checkout-page .wc-stripe-payment-request-wrapper, .checkout-page #wcpay-express-checkout-element, .checkout-page .ppc-button-wrapper, .checkout-page #wc-stripe-express-checkout-element { margin: 0 0 20px; }
.checkout-page .wc-stripe-payment-request-button-separator, .checkout-page #wcpay-express-checkout-button-separator, .checkout-page #wc-stripe-express-checkout-button-separator { display: flex; align-items: center; gap: 12px; margin: 0 0 20px; color: var(--ink-muted); font: 13px/1 var(--font-body); text-align: center; }
.checkout-page .wc-stripe-payment-request-button-separator::before, .checkout-page .wc-stripe-payment-request-button-separator::after, .checkout-page #wcpay-express-checkout-button-separator::before, .checkout-page #wcpay-express-checkout-button-separator::after { content: ""; flex: 1; height: 1px; background: var(--line); }
```

## Checkout 1: numbered sections, sticky summary card

Use when: the default for stores with physical goods. Form left (7 of 12), summary card right (5 of 12) sticky, payment inside the card under the totals so the place-order button sits next to the total. On phones the summary becomes a collapsible above the form.

Step 1, the frame with the builder slot (`html-to-page` on the checkout page):

```html
<section class="checkout-page store">
  <div class="container">
    <div class="chk-top">
      <h1 class="chk-title">Checkout</h1>
      <a class="chk-back" href="/cart/">Back to cart</a>
    </div>
    <div class="checkout-builder-slot"></div>
    <div class="chk-next">…order received extras, see the end of this file…</div>
  </div>
</section>
<style>
  .chk-top { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 24px; }
  .chk-title { margin: 0; font: 600 clamp(28px, 3vw, 36px)/1.1 var(--font-display); }
  .chk-back { font: 500 14px/1 var(--font-body); color: var(--ink-muted); text-decoration: none; }
  .chk-back:hover { color: var(--ink); }
  .checkout-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }
  .checkout-main { display: grid; gap: 40px; }
  .chk-section { display: grid; gap: 0; }
  .chk-prompts { display: grid; gap: 10px; }
  .checkout-aside { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 24px); display: grid; gap: 20px; padding: 24px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-alt); }
  .checkout-aside .chk-h2 { margin: 0; font-size: 18px; }
  .checkout-aside details.chk-summary > summary { display: none; }
  @media (max-width: 1023px) {
    .checkout-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
    .checkout-aside { position: static; padding: 0 20px; gap: 0; }
    .checkout-aside details.chk-summary > summary { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font: 600 16px/1.2 var(--font-body); list-style: none; cursor: pointer; }
    .checkout-aside details.chk-summary > summary::after { content: "▾"; color: var(--ink-muted); }
    .checkout-aside details.chk-summary[open] > summary::after { content: "▴"; }
    .checkout-aside details.chk-summary > summary::-webkit-details-marker { display: none; }
    .checkout-aside .chk-h2 { display: none; }
    .checkout-aside .chk-payment-wrap { padding: 20px 0; }
  }
</style>
```

Step 2, insert the builder into `.checkout-builder-slot` (`edit-post`), then `get-post-tree` and delete its default children:

```jsonc
{ "post_id": 251, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\CheckoutBuilder", "parent_id": 5 } } ] }
```

Step 3, build the grid inside the builder with `html-to-page` (`parent_id` = the builder's id):

```html
<div class="checkout-grid">
  <div class="checkout-main">
    <div class="chk-prompts">
      <div class="chk-login-slot"></div>
      <div class="chk-coupon-slot"></div>
    </div>
    <section class="chk-section">
      <h2 class="chk-h2"><span class="chk-n">1</span>Contact &amp; delivery</h2>
      <div class="chk-billing-slot"></div>
    </section>
    <section class="chk-section">
      <h2 class="chk-h2"><span class="chk-n">2</span>Shipping</h2>
      <div class="chk-shipping-slot"></div>
    </section>
  </div>
  <aside class="checkout-aside">
    <details class="chk-summary" open>
      <summary>Order summary</summary>
      <h2 class="chk-h2">Order summary</h2>
      <div class="chk-review-slot"></div>
    </details>
    <div class="chk-payment-wrap">
      <h2 class="chk-h2"><span class="chk-n">3</span>Payment</h2>
      <div class="chk-payment-slot"></div>
    </div>
    <ul class="chk-trust">
      <li>Secure, encrypted checkout</li>
      <li>Free returns within 30 days</li>
      <li>Questions? hello@example.com, weekdays 9 to 5</li>
    </ul>
    <ul class="chk-pay" aria-label="We accept"><li>VISA</li><li>MASTERCARD</li><li>AMEX</li><li>PAYPAL</li><li>APPLE PAY</li></ul>
  </aside>
</div>
```

Step 4, insert the parts into their slots:

```jsonc
{ "post_id": 251, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutLoginForm",    "parent_id": 23 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutCouponForm",   "parent_id": 24 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutBillingForm",  "parent_id": 27 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutShippingForm", "parent_id": 30 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutOrderReview",  "parent_id": 34 } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\WooCheckoutPayment",      "parent_id": 37,
    "properties": { "design": { "layout": { "sticky": false } } } } }
] }
```

Step 5, `get-post-tree` again: billing, shipping, order review and payment must all be descendants of the CheckoutBuilder node. Then a test order.

`<details>` is native HTML; the converter keeps it. The summary line cannot show the total (it lives inside the review element), so keep it open by default and let the shopper collapse it.

## Checkout 2: single column, summary first (mobile-first, low-SKU stores)

Use when: one or two products per order, digital goods, or a store whose traffic is mostly phones. One 640px column; the order summary sits on top inside a collapsible, then the form, then payment. Same shared CSS; the grid inside the builder is:

```html
<div class="checkout-stack">
  <details class="chk-summary chk-summary--card" open>
    <summary>Order summary</summary>
    <div class="chk-review-slot"></div>
  </details>
  <div class="chk-prompts">
    <div class="chk-login-slot"></div>
    <div class="chk-coupon-slot"></div>
  </div>
  <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">1</span>Contact &amp; delivery</h2><div class="chk-billing-slot"></div></section>
  <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">2</span>Shipping</h2><div class="chk-shipping-slot"></div></section>
  <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">3</span>Payment</h2><div class="chk-payment-slot"></div></section>
  <ul class="chk-trust"><li>Secure, encrypted checkout</li><li>Free returns within 30 days</li></ul>
</div>
<style>
  .checkout-stack { max-width: 640px; margin-inline: auto; display: grid; gap: 36px; }
  .chk-summary--card { border: 1px solid var(--line); border-radius: var(--radius); padding: 0 20px; background: var(--surface-alt); }
  .chk-summary--card > summary { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font: 600 16px/1.2 var(--font-body); list-style: none; cursor: pointer; }
  .chk-summary--card > summary::-webkit-details-marker { display: none; }
  .chk-summary--card > summary::after { content: "▾"; color: var(--ink-muted); }
  .chk-summary--card[open] > summary::after { content: "▴"; }
  .chk-summary--card .chk-review-slot { padding-bottom: 8px; }
</style>
```

Insert the same six parts into their slots. Set the payment element's `design.layout.sticky` to `false` here too; the button is already at the end of the flow.

## Checkout 3: split tone, summary on a full-height tinted panel

Use when: the store wants the Shopify-style checkout look: white form column, the summary on a tinted panel that runs the full height of the page, no card borders. The page section is full-bleed; the panel is the aside's own background extended with a pseudo-element.

```html
<section class="checkout-page checkout-page--split store">
  <div class="checkout-builder-slot"></div>
  <div class="chk-next">…</div>
</section>
<style>
  .checkout-page--split { padding-block: 0; }
  .checkout-page--split .checkout-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); max-width: var(--container); margin-inline: auto; gap: 0; align-items: stretch; }
  .checkout-page--split .checkout-main { display: grid; gap: 40px; align-content: start; padding: 48px clamp(24px, 5vw, 72px) 96px var(--gutter); }
  .checkout-page--split .chk-title { margin: 0 0 8px; font: 600 28px/1.1 var(--font-display); }
  .checkout-page--split .checkout-aside { position: relative; display: grid; gap: 20px; align-content: start; padding: 48px var(--gutter) 96px clamp(24px, 5vw, 72px); background: var(--surface-alt); border-left: 1px solid var(--line); }
  .checkout-page--split .checkout-aside::after { content: ""; position: absolute; top: 0; bottom: 0; left: 100%; width: 50vw; background: var(--surface-alt); z-index: -1; }
  .checkout-page--split .checkout-aside-inner { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 32px); display: grid; gap: 20px; }
  .checkout-page--split details.chk-summary > summary { display: none; }
  @media (max-width: 1023px) {
    .checkout-page--split .checkout-grid { grid-template-columns: minmax(0, 1fr); }
    .checkout-page--split .checkout-aside { order: -1; border-left: 0; border-bottom: 1px solid var(--line); padding: 0 var(--gutter); }
    .checkout-page--split .checkout-aside::after { display: none; }
    .checkout-page--split .checkout-aside-inner { position: static; gap: 0; }
    .checkout-page--split details.chk-summary > summary { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font: 600 16px/1.2 var(--font-body); list-style: none; cursor: pointer; }
    .checkout-page--split details.chk-summary > summary::after { content: "▾"; color: var(--ink-muted); }
    .checkout-page--split details.chk-summary[open] > summary::after { content: "▴"; }
    .checkout-page--split .checkout-aside .chk-h2 { display: none; }
    .checkout-page--split .checkout-main { padding: 32px var(--gutter) 64px; }
  }
</style>
```

Grid inside the builder (payment stays in the form column here, the summary panel holds only the review, trust and payment marks):

```html
<div class="checkout-grid">
  <div class="checkout-main">
    <h1 class="chk-title">Checkout</h1>
    <div class="chk-prompts"><div class="chk-login-slot"></div><div class="chk-coupon-slot"></div></div>
    <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">1</span>Contact &amp; delivery</h2><div class="chk-billing-slot"></div></section>
    <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">2</span>Shipping</h2><div class="chk-shipping-slot"></div></section>
    <section class="chk-section"><h2 class="chk-h2"><span class="chk-n">3</span>Payment</h2><div class="chk-payment-slot"></div></section>
  </div>
  <aside class="checkout-aside">
    <div class="checkout-aside-inner">
      <details class="chk-summary" open><summary>Order summary</summary><h2 class="chk-h2">Order summary</h2><div class="chk-review-slot"></div></details>
      <ul class="chk-trust"><li>Secure, encrypted checkout</li><li>Free returns within 30 days</li></ul>
      <ul class="chk-pay" aria-label="We accept"><li>VISA</li><li>MASTERCARD</li><li>AMEX</li><li>PAYPAL</li></ul>
    </div>
  </aside>
</div>
```

The `::after` extension needs the section to be full-bleed (no container around the builder) and the page's `overflow-x: hidden` on `body` or the section, which the design system's base usually sets.

## Coupon form designs

The coupon is the smallest form on the checkout and the one that goes wrong most often: it arrives as a toggle link, opens a form whose children are an unclassed intro paragraph, a field row, a button row and a float-clearing `div`, and WooCommerce injects its own error ("Please enter a coupon code.") into that same form after a failed submit. Anything selected by child order breaks the moment the notice appears, which is how the field ends up full width with the button stranded underneath.

The markup, in the order WooCommerce prints it:

```html
<div class="woocommerce-form-coupon-toggle">
  <div class="woocommerce-info">Have a coupon? <a href="#" class="showcoupon">Click here to enter your code</a></div>
</div>
<form class="checkout_coupon woocommerce-form-coupon" method="post" style="display:none">
  <p>If you have a coupon code, please apply it below.</p>
  <p class="form-row form-row-first">
    <label for="coupon_code" class="screen-reader-text">Coupon:</label>
    <input type="text" name="coupon_code" class="input-text" placeholder="Coupon code" id="coupon_code" value="">
  </p>
  <p class="form-row form-row-last">
    <button type="submit" class="button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
  </p>
  <div class="clear"></div>
</form>
```

Rules for all four designs:

- Select by role: `> p:not(.form-row)` for the intro, `p.form-row-first` for the field, `p.form-row-last` for the button. Never `p:first-child` or `p:nth-child(2)`.
- Hide `.clear`; it is a float artefact and adds a stray row to any grid or flex layout.
- Give the error somewhere to go (`grid-column: 1 / -1`), because it appears inside the form only after a failed apply and never in a preview.
- The toggle is a `.woocommerce-info` notice, so it inherits the notice styling; the designs below strip it back to one quiet line.
- An applied coupon does not show here. It appears in the order review as `tr.cart-discount` with a `a.woocommerce-remove-coupon` link, so style that too or the shopper gets no confirmation.
- The button label and the intro are WooCommerce's strings; do not replace them with CSS text unless the store is single-language.
- Keep `form.checkout_coupon` in the chain when a design overrides these shared rules. `checkout_coupon` is a class, so the shared child rule `.checkout-page form.checkout_coupon p.form-row-last` counts three classes; a wrapper design written as `.checkout-page .my-wrapper p.form-row-last` counts three too but one element fewer, and loses. Designs 2 and 3 below repeat the full chain for exactly this reason.

### Coupon 1: one line, field and button side by side

Use when: the default. The toggle reads as a sentence, the form opens into a single row, the error sits under it without moving anything.

```css
.checkout-page .woocommerce-form-coupon-toggle .woocommerce-info { display: block; margin: 0; padding: 0; border: 0; background: transparent; color: var(--ink-muted); font: 14px/1.5 var(--font-body); }
.checkout-page .woocommerce-form-coupon-toggle .woocommerce-info::before { display: none; }
.checkout-page .woocommerce-form-coupon-toggle a.showcoupon { color: var(--ink); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.checkout-page form.checkout_coupon { margin: 12px 0 0; padding: 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.checkout-page form.checkout_coupon > p:not(.form-row) { display: none; }          /* the toggle already said it */
.checkout-page form.checkout_coupon input#coupon_code { min-height: 50px; letter-spacing: .06em; text-transform: uppercase; }
.checkout-page form.checkout_coupon input#coupon_code::placeholder { letter-spacing: 0; text-transform: none; }
```

### Coupon 2: attached button inside the field

Use when: space is tight (the summary column, a single-column checkout). One bordered shell holds both; the button sits inside the right edge and the whole thing lights up on focus. Wrap the coupon slot in `<div class="coupon--attached">` and insert `WooCheckoutCouponForm` inside it: the modifier has to be on a wrapper of yours, because WooCommerce prints the `<form>` and you cannot add a class to it. Every rule repeats the page class so it outranks the shared coupon rules above, which are themselves two classes deep.

```css
.checkout-page .coupon--attached form.checkout_coupon { display: grid; grid-template-columns: minmax(0, 1fr); margin: 12px 0 0; padding: 0; border: 0; background: transparent; }
.checkout-page .coupon--attached form.checkout_coupon > p:not(.form-row) { display: none; }
.checkout-page .coupon--attached form.checkout_coupon p.form-row-first { grid-column: 1; grid-row: 1; }
.checkout-page .coupon--attached form.checkout_coupon p.form-row-last { grid-column: 1; grid-row: 1; justify-self: end; align-self: center; padding-right: 6px; }
.checkout-page .coupon--attached form.checkout_coupon input#coupon_code { min-height: 52px; padding-right: 128px; letter-spacing: .06em; text-transform: uppercase; }
.checkout-page .coupon--attached form.checkout_coupon input#coupon_code::placeholder { letter-spacing: 0; text-transform: none; }
.checkout-page .coupon--attached form.checkout_coupon button[name="apply_coupon"] { min-height: 40px; padding: 0 14px; border: 0; border-radius: 8px; background: var(--ink); color: #fff; font-size: 13px; }
.checkout-page .coupon--attached form.checkout_coupon button[name="apply_coupon"]:hover { background: var(--brand); color: var(--on-brand); }
.checkout-page .coupon--attached form.checkout_coupon:focus-within input#coupon_code { border-color: var(--ink); }
.checkout-page .coupon--attached form.checkout_coupon .woocommerce-error { grid-row: 2; margin-top: 8px; }
```

The overlap needs the field's right padding to reserve the button's footprint; if the store translates "Apply coupon" into a longer word, raise the `padding-right`. On phones under 380px, drop back to Coupon 1 rather than shrinking the field.

### Coupon 3: promo row in the order summary

Use when: the checkout keeps the form column for address and payment only, and the discount belongs next to the total. Put the coupon element in the summary aside instead of the main column; the toggle becomes a row with a chevron, the form opens under it.

```css
.checkout-page .chk-promo { border-top: 1px solid var(--line); padding-top: 16px; margin-top: 4px; }
.checkout-page .chk-promo .woocommerce-form-coupon-toggle .woocommerce-info { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0; padding: 0; background: transparent; color: var(--ink); font: 500 14px/1.4 var(--font-body); }
.checkout-page .chk-promo .woocommerce-form-coupon-toggle .woocommerce-info::before { display: none; }
.checkout-page .chk-promo a.showcoupon { display: inline-flex; align-items: center; gap: 6px; color: var(--ink); font-weight: 600; text-decoration: none; }
.checkout-page .chk-promo a.showcoupon::after { content: ""; width: 14px; height: 14px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>") center / contain no-repeat; }
.checkout-page .chk-promo form.checkout_coupon { margin: 12px 0 0; padding: 0; border: 0; background: transparent; }
.checkout-page .chk-promo form.checkout_coupon > p:not(.form-row) { display: none; }
.checkout-page .chk-promo form.checkout_coupon input#coupon_code { min-height: 46px; }
.checkout-page .chk-promo form.checkout_coupon button[name="apply_coupon"] { min-height: 46px; }
/* the applied discount, in the review table */
.checkout-page .woocommerce-checkout-review-order-table tr.cart-discount th { color: var(--success); }
.checkout-page .woocommerce-checkout-review-order-table tr.cart-discount td { color: var(--success); font-weight: 600; }
.checkout-page .woocommerce-checkout-review-order-table tr.cart-discount a.woocommerce-remove-coupon { margin-left: 8px; font: 400 12px/1 var(--font-body); color: var(--ink-muted); text-decoration: underline; }
```

Wrap the coupon slot in `<div class="chk-promo">` inside the aside and insert `WooCheckoutCouponForm` there. It is a free-standing child of the Checkout Builder, so it can live in either column.

### Coupon 4: the cart page's own coupon

The cart uses different markup: `td.actions > .coupon` with a `label`, `input#coupon_code` and `button[name="apply_coupon"]`, next to the hidden update button. Same idea, one row, on the cart wrapper class.

```css
.cart-page td.actions { display: flex; align-items: center; gap: 12px; padding: 20px 0 0; border: 0; }
.cart-page .actions .coupon { display: grid; grid-template-columns: minmax(0, 200px) auto; gap: 8px; align-items: center; width: auto; }
.cart-page .actions .coupon label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); }
.cart-page .actions .coupon input#coupon_code { width: auto; min-height: 46px; padding: 0 14px; font: 14px/1 var(--font-body); letter-spacing: .06em; text-transform: uppercase; }
.cart-page .actions .coupon input#coupon_code::placeholder { letter-spacing: 0; text-transform: none; }
.cart-page .actions .coupon button[name="apply_coupon"] { min-height: 46px; padding: 0 16px; border: 1px solid var(--ink); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 13px/1 var(--font-body); text-transform: none; white-space: nowrap; width: auto; cursor: pointer; }
.cart-page .actions .coupon button[name="apply_coupon"]:hover { background: var(--ink); color: #fff; }
.cart-page button[name="update_cart"] { display: none; }
.cart-page .cart_totals tr.cart-discount th, .cart-page .cart_totals tr.cart-discount td { color: var(--success); }
.cart-page .cart_totals tr.cart-discount a.woocommerce-remove-coupon { margin-left: 8px; font: 400 12px/1 var(--font-body); color: var(--ink-muted); text-decoration: underline; }
@media (max-width: 767px) { .cart-page td.actions { flex-direction: column; align-items: stretch; } .cart-page .actions .coupon { grid-template-columns: minmax(0, 1fr) auto; } }
```

Verify all four by applying a real coupon and by submitting the form empty: the empty submit is the state that exposes a layout built on child order.

## The slim checkout header

A second header template that replaces the main header on the checkout page: logo, a lock with "Secure checkout", "Back to cart". `create-template` with `template_type` header, a rule from `get-template-conditions` targeting the checkout page, and a priority higher than the main header's.

```html
<header class="chk-hdr">
  <div class="container chk-hdr-inner">
    <a class="chk-hdr-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Brand" width="120" height="28"></a>
    <p class="chk-hdr-secure"><svg class="chk-hdr-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Secure checkout</p>
    <a class="chk-hdr-back" href="/cart/">Back to cart</a>
  </div>
</header>
<style>
  .chk-hdr { background: var(--surface); border-bottom: 1px solid var(--line); }
  .chk-hdr-inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 64px; }
  .chk-hdr-logo img { display: block; height: 28px; width: auto; }
  .chk-hdr-secure { display: inline-flex; align-items: center; gap: 8px; margin: 0; font: 500 13px/1 var(--font-body); color: var(--ink-muted); }
  .chk-hdr-lock { width: 16px; height: 16px; color: var(--success); }
  .chk-hdr-back { justify-self: end; font: 500 14px/1 var(--font-body); color: var(--ink); text-decoration: none; }
  @media (max-width: 767px) { .chk-hdr-inner { grid-template-columns: 1fr auto; } .chk-hdr-secure { display: none; } }
</style>
```

The icon class sits on the `<svg>` itself so it lands on the icon wrapper and sizes it (see the SVG rule in **building-sites**). The same template shows on the order received page, which is what you want: the confirmation stays inside the calm frame.

## Express payments

Gateway plugins inject express buttons (Apple Pay, Google Pay, PayPal). Leave a clean top area in the form column and rely on the shared CSS for their spacing and "or" separator. Two facts to tell the owner:

- The Checkout Builder fires the hooks outside the form and inside the review and payment parts; a gateway that renders its express row through `woocommerce_checkout_before_customer_details` will not appear in a custom builder tree. Place a test order with the store's gateway; if the express buttons are missing and the owner wants them, the classic `Woopagecheckout` element runs the stock template with every hook.
- The buttons' look is the gateway's; only spacing and the separator are yours. Never draw a fake one.

## Guest checkout and registration

If guest checkout is off (WooCommerce > Settings > Accounts & Privacy), the login prompt becomes mandatory and the account fields appear in the billing part; most stores want guest checkout on, with "Create an account?" as the optional checkbox the shared CSS styles. Ask the owner.

## Order received 1: receipt card

On the `order-received` endpoint the builder renders WooCommerce's confirmation in place of your grid. This CSS turns it into a receipt: a check mark and headline, the order number as the hero fact, the facts strip, the items, the addresses.

```css
.checkout-page .woocommerce-order { display: grid; gap: 32px; max-width: 760px; margin-inline: auto; }
.checkout-page .woocommerce-thankyou-order-received { display: grid; justify-items: center; gap: 12px; margin: 0; padding: 40px 24px 8px; background: transparent; color: var(--ink); text-align: center; font: 600 clamp(26px, 3vw, 36px)/1.15 var(--font-display); }
.checkout-page .woocommerce-thankyou-order-received::before { content: ""; position: static; width: 56px; height: 56px; margin-bottom: 8px; border-radius: 50%; background: var(--success); -webkit-mask: none; mask: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>"); background-size: 28px; background-repeat: no-repeat; background-position: center; }
.checkout-page ul.woocommerce-order-overview { list-style: none; margin: 0; padding: 20px 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.checkout-page ul.woocommerce-order-overview li { display: grid; gap: 4px; margin: 0; padding: 0; border: 0; font: 12px/1.3 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
.checkout-page ul.woocommerce-order-overview li strong { font: 600 16px/1.3 var(--font-body); letter-spacing: 0; text-transform: none; color: var(--ink); display: block; }
.checkout-page ul.woocommerce-order-overview li.woocommerce-order-overview__order strong { font-size: 20px; }
.checkout-page .woocommerce-order-details, .checkout-page .woocommerce-customer-details { display: grid; gap: 12px; }
.checkout-page .woocommerce-order-details__title, .checkout-page .woocommerce-column__title { margin: 0; font: 600 18px/1.2 var(--font-body); }
.checkout-page table.woocommerce-table--order-details { width: 100%; border: 1px solid var(--line); border-radius: var(--radius); border-collapse: separate; border-spacing: 0; overflow: hidden; background: var(--surface); }
.checkout-page table.woocommerce-table--order-details thead { display: none; }
.checkout-page table.woocommerce-table--order-details tbody, .checkout-page table.woocommerce-table--order-details tfoot { box-shadow: none; background: transparent; }
.checkout-page table.woocommerce-table--order-details th, .checkout-page table.woocommerce-table--order-details td { padding: 12px 16px; border: 0; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font: 15px/1.4 var(--font-body); background: transparent; }
.checkout-page table.woocommerce-table--order-details td.woocommerce-table__product-total, .checkout-page table.woocommerce-table--order-details tfoot td { text-align: right; white-space: nowrap; font-weight: 500; }
.checkout-page table.woocommerce-table--order-details td.woocommerce-table__product-name a { color: var(--ink); text-decoration: none; font-weight: 500; }
.checkout-page table.woocommerce-table--order-details td.woocommerce-table__product-name .product-quantity { color: var(--ink-muted); font-weight: 400; }
.checkout-page table.woocommerce-table--order-details tfoot th { font-weight: 500; color: var(--ink-muted); }
.checkout-page table.woocommerce-table--order-details tfoot tr:last-child th, .checkout-page table.woocommerce-table--order-details tfoot tr:last-child td { border-bottom: 0; font: 700 18px/1.2 var(--font-body); color: var(--ink); }
.checkout-page .woocommerce-columns--addresses { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; width: 100%; }
.checkout-page .woocommerce-column { padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.checkout-page .woocommerce-column .woocommerce-column__title { margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-muted); }
.checkout-page .woocommerce-column address { margin: 0; padding: 0; border: 0; font: 15px/1.6 var(--font-body); font-style: normal; color: var(--ink); background: transparent; }
.checkout-page .woocommerce-customer-details--phone, .checkout-page .woocommerce-customer-details--email { margin: 6px 0 0; color: var(--ink-muted); }
@media (max-width: 767px) { .checkout-page .woocommerce-columns--addresses { grid-template-columns: minmax(0, 1fr); } .checkout-page ul.woocommerce-order-overview { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
```

## Order received 2: what happens next, and the two ways out

Frame content after the builder slot, revealed only on the confirmation with `:has()`. Three cards (email confirmation, delivery estimate, track in your account) and two buttons.

```html
<div class="chk-next">
  <div class="chk-next-cards">
    <div class="chk-next-card"><p class="chk-next-title">Confirmation on its way</p><p class="chk-next-text">A receipt is in your inbox. Keep it for returns.</p></div>
    <div class="chk-next-card"><p class="chk-next-title">Ships in 1 to 2 business days</p><p class="chk-next-text">You'll get a tracking link the moment it leaves our studio.</p></div>
    <div class="chk-next-card"><p class="chk-next-title">Track it in your account</p><p class="chk-next-text">Every order, address and return in one place.</p></div>
  </div>
  <div class="chk-next-actions">
    <a class="btn btn--primary" href="/shop/">Continue shopping</a>
    <a class="btn btn--secondary" href="/my-account/orders/">View your orders</a>
  </div>
</div>
<style>
  .checkout-page .chk-next { display: none; }
  .checkout-page:has(.woocommerce-order) .chk-next { display: grid; gap: 24px; max-width: 760px; margin: 40px auto 0; }
  .chk-next-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .chk-next-card { padding: 20px; border-radius: var(--radius); background: var(--surface-alt); }
  .chk-next-title { margin: 0 0 6px; font: 600 15px/1.3 var(--font-body); }
  .chk-next-text { margin: 0; font: 14px/1.5 var(--font-body); color: var(--ink-muted); }
  .chk-next-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  @media (max-width: 767px) { .chk-next-cards { grid-template-columns: minmax(0, 1fr); } }
</style>
```

The delivery promise is copy the owner confirms. A personalised headline ("Thank you, Ana") needs the `woocommerce_thankyou_order_received_text` filter; offer the snippet, never a static name.

## Restyled classic checkout with the one-element Checkout Page

```html
<section class="checkout-page store"><div class="container"><h1 class="chk-title">Checkout</h1><div class="chk-classic-slot"></div></div></section>
```

```jsonc
{ "post_id": 251, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopagecheckout", "parent_id": 5,
  "properties": { "design": { "layout": { "single_column": false, "stack_vertically_at": "breakpoint_tablet" } } } } } ] }
```

The shared CSS applies unchanged (WooCommerce's stock `h3` headings show here; remove the rules that hide them if the design has no numbered headings). Faster, less control, every gateway hook fires; never combine it with a Checkout Builder.
