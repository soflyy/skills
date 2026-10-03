# Store header and footer examples

All headers are `oxygen_header` / `breakdance_header` templates with `template_type: "everywhere"`, built with one `html-to-page` call, then `edit-post` on the mini cart and search elements, then `set-element-interactions` for the burger. Category navigation is always a term loop.

## Header A: classic three-zone store header

Logo left, category nav centre, search + account + cart right. Sticky. Announcement bar above.

```html
<div class="announce">
  <div class="container announce-inner">
    <p class="announce-text">Free shipping on orders over $75 · 30-day returns</p>
    <button class="announce-close" aria-label="Dismiss">×</button>
  </div>
</div>
<header class="hdr">
  <div class="container hdr-inner">
    <a class="hdr-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Acme Goods" width="132" height="32"></a>

    <nav class="hdr-nav" aria-label="Shop">
      <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Nav Category" bd-limit="6" bd-orderby="count" bd-order="desc" class="hdr-menu">
        <li class="hdr-item"><a class="hdr-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
      </ul>
      <a class="hdr-link hdr-link--sale" href="/shop/?on_sale=1">Sale</a>
    </nav>

    <div class="hdr-tools">
      <div bd-woo="search" class="hdr-search"></div>
      <a class="hdr-icon" href="/my-account/" aria-label="Account"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></a>
      <div bd-woo="mini-cart" class="hdr-cart"></div>
      <button class="hdr-burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<style>
  .announce { background: var(--ink); color: #fff; font: 500 13px/1.4 var(--font-body); }
  .announce.is-hidden { display: none; }
  .announce-inner { display: flex; align-items: center; justify-content: center; gap: 16px; min-height: 36px; position: relative; }
  .announce-text { margin: 0; }
  .announce-close { position: absolute; right: var(--gutter); background: none; border: 0; color: inherit; font-size: 20px; cursor: pointer; }
  .hdr { position: sticky; top: var(--wp-admin--admin-bar--height, 0px); z-index: 50; background: var(--surface); border-bottom: 1px solid var(--line); }
  .hdr-inner { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 32px; min-height: 72px; }
  .hdr-logo img { display: block; height: 32px; width: auto; }
  .hdr-nav { display: flex; align-items: center; justify-content: center; gap: 28px; }
  .hdr-menu { list-style: none; margin: 0; padding: 0; display: flex; gap: 28px; }
  .hdr-link { font: 500 15px/1 var(--font-body); color: var(--ink); text-decoration: none; padding: 8px 0; border-bottom: 2px solid transparent; }
  .hdr-link:hover, .hdr-link.is-active { border-bottom-color: var(--ink); }
  .hdr-link--sale { color: var(--accent); }
  .hdr-tools { display: flex; align-items: center; gap: 18px; }
  .hdr-icon { color: var(--ink); display: inline-flex; padding: 6px; }
  .hdr-burger { display: none; background: none; border: 0; padding: 8px; cursor: pointer; flex-direction: column; gap: 5px; }
  .hdr-burger span { display: block; width: 22px; height: 2px; background: var(--ink); }
  @media (max-width: 1023px) {
    .hdr-inner { grid-template-columns: auto 1fr auto; }
    .hdr-nav { display: none; position: absolute; left: 0; right: 0; top: 100%; background: var(--surface); border-bottom: 1px solid var(--line); padding: 16px var(--gutter) 24px; flex-direction: column; align-items: flex-start; gap: 8px; }
    .hdr.is-open .hdr-nav { display: flex; }
    .hdr-menu { flex-direction: column; gap: 8px; }
    .hdr-burger { display: flex; }
  }
</style>
```

After conversion:

```jsonc
// edit-post: search in modal mode with autocomplete (element id from get-post-tree)
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 9, "properties": {
  "design": { "form": { "mode": "modal", "toggle_style": "icon", "modal_position": "top" } },
  "content": { "content": { "placeholder": "Search products", "autocomplete": { "enabled": true, "min_characters": 2, "results": 6 } } } } } } ] }

// edit-post: mini cart as a right-hand drawer
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 12, "properties": {
  "content": { "content": { "cart": { "primary_button": "checkout", "open_cart_on_add": true, "continue_shopping_link": "shop" }, "link": { "hide_subtotal": true, "hide_count_when_empty": true } } },
  "design": { "cart": { "style": "sidebar", "sidebar_position": "right", "full_screen_at": "breakpoint_phone_landscape" }, "link": { "quantity": { "overlap": true } } } } } } ] }

// set-element-interactions: burger toggles the header's open state
{ "post_id": 220, "element_id": 14, "interactions": [ { "trigger": "click", "actions": [ { "name": "toggle_class", "target": "custom", "css_selector": ".hdr", "css_class": "is-open" } ] } ] }

// set-element-interactions: announcement dismiss
{ "post_id": 220, "element_id": 3, "interactions": [ { "trigger": "click", "actions": [ { "name": "add_class", "target": "custom", "css_selector": ".announce", "css_class": "is-hidden" } ] } ] }
```

The "Sale" link uses WooCommerce's own `on_sale` handling only if a plugin adds it; without one, link "Sale" to a "sale" category or tag archive instead (`term_permalink` from a term loop filtered by `bd-taxonomy="product_tag"`), never to a search URL.

## Header B: centred logo, two-row

Utility row (account, search, cart) above a centred logo, category row below. Common for fashion and home goods.

```html
<header class="hdr2">
  <div class="container hdr2-top">
    <div class="hdr2-left"><a class="hdr2-text" href="/my-account/">Account</a><a class="hdr2-text" href="/track-order/">Track order</a></div>
    <a class="hdr2-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Maison" width="160" height="40"></a>
    <div class="hdr2-right"><div bd-woo="search" class="hdr2-search"></div><div bd-woo="mini-cart" class="hdr2-cart"></div></div>
  </div>
  <nav class="hdr2-navbar" aria-label="Shop">
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Nav Category" bd-limit="8" bd-orderby="name" bd-order="asc" class="hdr2-menu">
      <li class="hdr2-item"><a class="hdr2-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
    </ul>
  </nav>
</header>
<style>
  .hdr2 { background: var(--surface); border-bottom: 1px solid var(--line); }
  .hdr2-top { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 84px; }
  .hdr2-left, .hdr2-right { display: flex; gap: 20px; align-items: center; }
  .hdr2-right { justify-content: flex-end; }
  .hdr2-text { font: 500 13px/1 var(--font-body); color: var(--ink-muted); text-decoration: none; letter-spacing: .04em; text-transform: uppercase; }
  .hdr2-logo img { display: block; height: 40px; width: auto; }
  .hdr2-navbar { border-top: 1px solid var(--line); }
  .hdr2-menu { list-style: none; margin: 0 auto; padding: 0; display: flex; justify-content: center; gap: 36px; min-height: 48px; align-items: center; }
  .hdr2-link { font: 500 14px/1 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink); text-decoration: none; }
  .hdr2-link:hover, .hdr2-link.is-active { text-decoration: underline; text-underline-offset: 6px; }
  @media (max-width: 767px) { .hdr2-top { grid-template-columns: auto 1fr auto; } .hdr2-left { display: none; } .hdr2-menu { justify-content: flex-start; overflow-x: auto; padding-inline: var(--gutter); gap: 24px; } }
</style>
```

The mobile version keeps the category row as a horizontally scrolling strip rather than hiding it; no burger needed.

## Header C: slim checkout header

A separate header template with a condition targeting the Checkout page and a higher priority than the main header. No navigation, no search, no mini cart: only the logo, a secure-checkout note and a way back.

```html
<header class="chk-hdr">
  <div class="container chk-hdr-inner">
    <a class="chk-hdr-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Acme Goods" width="120" height="30"></a>
    <p class="chk-hdr-secure"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Secure checkout</p>
    <a class="chk-hdr-back" href="/cart/">Back to cart</a>
  </div>
</header>
<style>
  .chk-hdr { background: var(--surface); border-bottom: 1px solid var(--line); }
  .chk-hdr-inner { display: flex; align-items: center; justify-content: space-between; min-height: 64px; gap: 16px; }
  .chk-hdr-logo img { display: block; height: 30px; width: auto; }
  .chk-hdr-secure { display: inline-flex; align-items: center; gap: 8px; margin: 0; font: 500 13px/1 var(--font-body); color: var(--ink-muted); }
  .chk-hdr-back { font: 500 14px/1 var(--font-body); color: var(--ink); text-decoration: none; }
</style>
```

```jsonc
// create-template (rule shape from get-template-conditions for the header post type)
{ "title": "Checkout Header", "post_type": "oxygen_header", "template_type": "everywhere",
  "rule_groups": [[ { "ruleSlug": "post-dropdown-page", "operand": "is", "value": ["15"] } ]], "priority": 30 }
```

## Header D: grocery / high-SKU header with a prominent search

Search dominates the centre; categories live in an "All departments" dropdown built as a term loop inside a toggled panel.

```html
<header class="ghdr">
  <div class="container ghdr-inner">
    <a class="ghdr-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="FreshMart" width="120" height="36"></a>
    <button class="ghdr-depts">All departments ▾</button>
    <div bd-woo="search" class="ghdr-search"></div>
    <a class="ghdr-account" href="/my-account/">Account</a>
    <div bd-woo="mini-cart" class="ghdr-cart"></div>
  </div>
  <div class="ghdr-panel">
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Department Link" bd-limit="30" bd-orderby="name" bd-order="asc" class="ghdr-list">
      <li class="ghdr-dept"><a class="ghdr-dept-link" bd-href="term_permalink"><img class="ghdr-dept-img" bd-src="woocommerce_category_image" bd-alt="term_name"><span bd-bind="term_name"></span></a></li>
    </ul>
  </div>
</header>
<style>
  .ghdr { background: var(--brand); color: var(--on-brand); position: relative; }
  .ghdr-inner { display: grid; grid-template-columns: auto auto minmax(0, 1fr) auto auto; gap: 20px; align-items: center; min-height: 76px; }
  .ghdr-logo img { display: block; height: 36px; width: auto; }
  .ghdr-depts { background: rgba(255,255,255,.12); color: inherit; border: 0; border-radius: var(--radius); padding: 12px 16px; font: 600 14px/1 var(--font-body); cursor: pointer; }
  .ghdr-search { min-width: 0; }
  .ghdr-account { color: inherit; text-decoration: none; font: 500 14px/1 var(--font-body); }
  .ghdr-panel { display: none; position: absolute; left: 0; right: 0; top: 100%; background: var(--surface); color: var(--ink); border-bottom: 1px solid var(--line); box-shadow: 0 16px 40px rgba(0,0,0,.08); z-index: 40; }
  .ghdr.is-open .ghdr-panel { display: block; }
  .ghdr-list { list-style: none; margin: 0 auto; padding: 24px var(--gutter); max-width: var(--container); display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px 24px; }
  .ghdr-dept-link { display: flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none; font: 500 14px/1.3 var(--font-body); padding: 8px; border-radius: 8px; }
  .ghdr-dept-link:hover { background: var(--surface-alt); }
  .ghdr-dept-img { width: 36px; height: 36px; object-fit: cover; border-radius: 50%; }
  @media (max-width: 767px) { .ghdr-inner { grid-template-columns: auto minmax(0,1fr) auto; } .ghdr-depts, .ghdr-account { display: none; } .ghdr-list { grid-template-columns: 1fr 1fr; } }
</style>
```

Search element: keep `design.form.mode: "inline"` here (the field is the point). Interaction on the departments button: `click` → `toggle_class` `.ghdr` `is-open`.

## Footer A: store footer with policies, payments, newsletter

```html
<footer class="ftr">
  <div class="container ftr-grid">
    <div class="ftr-brand">
      <img src="/wp-content/uploads/logo-white.svg" alt="Acme Goods" width="132" height="32">
      <p class="ftr-blurb">Small-batch goods, made to last. Shipping across the US since 2016.</p>
      <ul class="ftr-pay" aria-label="We accept">
        <li><img src="/wp-content/uploads/pay-visa.svg" alt="Visa" width="38" height="24"></li>
        <li><img src="/wp-content/uploads/pay-mc.svg" alt="Mastercard" width="38" height="24"></li>
        <li><img src="/wp-content/uploads/pay-amex.svg" alt="American Express" width="38" height="24"></li>
        <li><img src="/wp-content/uploads/pay-paypal.svg" alt="PayPal" width="38" height="24"></li>
        <li><img src="/wp-content/uploads/pay-applepay.svg" alt="Apple Pay" width="38" height="24"></li>
      </ul>
    </div>
    <nav class="ftr-col" aria-label="Shop">
      <h3 class="ftr-title">Shop</h3>
      <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Footer Category" bd-limit="6" bd-orderby="count" bd-order="desc" class="ftr-list">
        <li><a class="ftr-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
      </ul>
    </nav>
    <nav class="ftr-col" aria-label="Help">
      <h3 class="ftr-title">Help</h3>
      <ul class="ftr-list">
        <li><a class="ftr-link" href="/shipping-returns/">Shipping &amp; returns</a></li>
        <li><a class="ftr-link" href="/track-order/">Track your order</a></li>
        <li><a class="ftr-link" href="/faq/">FAQ</a></li>
        <li><a class="ftr-link" href="/contact/">Contact us</a></li>
        <li><a class="ftr-link" href="/my-account/">My account</a></li>
      </ul>
    </nav>
    <div class="ftr-col ftr-news">
      <h3 class="ftr-title">Get 10% off your first order</h3>
      <p class="ftr-blurb">New arrivals and members-only offers, twice a month.</p>
      <div class="ftr-form-slot"></div>
    </div>
  </div>
  <div class="container ftr-bottom">
    <p>© 2026 Acme Goods. All rights reserved.</p>
    <ul class="ftr-legal"><li><a href="/privacy-policy/">Privacy</a></li><li><a href="/terms/">Terms</a></li><li><a href="/refund-policy/">Refunds</a></li></ul>
  </div>
</footer>
<style>
  .ftr { background: var(--ink); color: #cfd3da; padding-block: 64px 24px; margin-top: 96px; }
  .ftr-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.4fr; gap: 48px; }
  .ftr-blurb { font: 14px/1.6 var(--font-body); margin: 12px 0 20px; }
  .ftr-pay { list-style: none; margin: 0; padding: 0; display: flex; gap: 8px; }
  .ftr-pay img { display: block; border-radius: 4px; background: #fff; }
  .ftr-title { font: 600 14px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: #fff; margin: 0 0 16px; }
  .ftr-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
  .ftr-link { color: #cfd3da; text-decoration: none; font: 14px/1.4 var(--font-body); }
  .ftr-link:hover { color: #fff; }
  .ftr-bottom { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.12); font: 13px/1.4 var(--font-body); }
  .ftr-legal { list-style: none; margin: 0; padding: 0; display: flex; gap: 20px; }
  .ftr-legal a { color: inherit; text-decoration: none; }
  @media (max-width: 1023px) { .ftr-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 767px) { .ftr-grid { grid-template-columns: 1fr; gap: 32px; } .ftr-bottom { flex-direction: column; align-items: flex-start; } }
</style>
```

Then insert a Form Builder element into `.ftr-form-slot` with `edit-post` and configure it with `set-element-form` (one email field, submit "Subscribe", success message). Payment icons are static images and that is fine; they are not product data.

## Footer B: compact single-row footer for small catalogs

```html
<footer class="ftr-mini">
  <div class="container ftr-mini-inner">
    <p class="ftr-mini-copy">© 2026 Studio Ceramics</p>
    <ul class="ftr-mini-links">
      <li><a href="/shop/">Shop</a></li><li><a href="/shipping-returns/">Shipping &amp; returns</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy-policy/">Privacy</a></li>
    </ul>
    <ul class="ftr-mini-social"><li><a href="https://instagram.com/studioceramics" aria-label="Instagram">IG</a></li></ul>
  </div>
</footer>
<style>
  .ftr-mini { border-top: 1px solid var(--line); padding-block: 32px; margin-top: 96px; }
  .ftr-mini-inner { display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between; font: 14px/1.4 var(--font-body); color: var(--ink-muted); }
  .ftr-mini-links, .ftr-mini-social { list-style: none; margin: 0; padding: 0; display: flex; gap: 20px; }
  .ftr-mini a { color: var(--ink); text-decoration: none; }
</style>
```
