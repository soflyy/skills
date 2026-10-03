# Mini cart and promo bar examples

## Mini cart configurations

All after `<div bd-woo="mini-cart" class="hdr-cart"></div>` in the header template; ids from `get-post-tree`; paths verified with `get-element-schemas` on `EssentialElements\MiniCart`.

### A. Right-hand drawer, checkout-first (fashion, multi-item carts)

```jsonc
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 12, "properties": {
  "content": { "content": {
    "cart": { "primary_button": "checkout", "continue_shopping_link": "shop", "open_cart_on_add": true, "top_bar": "enable", "hide_quantity_input": false },
    "link": { "hide_subtotal": true, "hide_count_when_empty": true }
  } },
  "design": {
    "cart": { "style": "sidebar", "sidebar_position": "right", "full_screen_at": "breakpoint_phone_landscape",
              "container": { "width": { "number": 440, "unit": "px", "style": "440px" }, "background": "#ffffff" },
              "contents": { "max_height": { "number": 60, "unit": "vh", "style": "60vh" } } },
    "link": { "icon": { "size": { "number": 22, "unit": "px", "style": "22px" }, "color": "#16181d" },
              "quantity": { "overlap": true, "background": "#1f4d3a", "top_nudge": { "number": -6, "unit": "px", "style": "-6px" }, "right_nudge": { "number": -8, "unit": "px", "style": "-8px" } } }
  } } } } ] }
```

### B. Dropdown under the icon, cart-first (small catalogs)

```jsonc
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 12, "properties": {
  "content": { "content": { "cart": { "primary_button": "cart", "continue_shopping_link": "disabled", "open_cart_on_add": false }, "link": { "hide_subtotal": false } } },
  "design": { "cart": { "style": "dropdown", "dropdown_position": "right", "full_screen_at": "breakpoint_phone_landscape", "container": { "width": { "number": 380, "unit": "px", "style": "380px" } } } } } } } ] }
```

### C. Icon + subtotal text button (grocery)

```jsonc
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 12, "properties": {
  "content": { "content": { "cart": { "primary_button": "checkout", "open_cart_on_add": true }, "link": { "hide_count": false, "hide_subtotal": false, "hide_subtotal_when_empty": true } } },
  "design": { "link": { "container": { "background": "#ffffff", "shadow": null }, "subtotal": { "space_after": { "number": 6, "unit": "px", "style": "6px" } } }, "cart": { "style": "sidebar", "sidebar_position": "right" } } } } } ] }
```

```css
.ghdr-cart a.bde-mini-cart-toggle { display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-pill); background: #fff; color: var(--ink); text-decoration: none; font: 600 14px/1 var(--font-body); }
```

## Mini cart CSS (one level under the marker's class)

```css
.hdr-cart a.bde-mini-cart-toggle { color: var(--ink); display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 6px; }
.hdr-cart .bde-mini-cart-toggle__counter { font: 700 11px/1 var(--font-body); }
.hdr-cart .bde-mini-cart-offcanvas { font-family: var(--font-body); }
.hdr-cart .bde-mini-cart-offcanvas-title { font: 600 18px/1.2 var(--font-body); }
.hdr-cart .bde-mini-cart-offcanvas__close-button { width: 36px; height: 36px; border-radius: 50%; }
.hdr-cart ul.cart_list { list-style: none; margin: 0; padding: 0; }
.hdr-cart li.mini_cart_item { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 12px; align-items: start; padding: 12px 0; border-bottom: 1px solid var(--line); }
.hdr-cart li.mini_cart_item img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; }
.hdr-cart li.mini_cart_item a { color: var(--ink); text-decoration: none; font: 500 14px/1.3 var(--font-body); }
.hdr-cart li.mini_cart_item dl.variation { margin: 4px 0 0; font: 12px/1.3 var(--font-body); color: var(--ink-muted); }
.hdr-cart li.mini_cart_item .quantity { font: 13px/1.3 var(--font-body); color: var(--ink-muted); }
.hdr-cart li.mini_cart_item a.remove { color: var(--ink-muted); font-size: 18px; }
.hdr-cart p.total { display: flex; justify-content: space-between; margin: 16px 0; font: 600 16px/1.2 var(--font-body); }
.hdr-cart p.buttons { display: grid; gap: 8px; margin: 0; }
.hdr-cart p.buttons a.button { width: 100%; text-align: center; }
.hdr-cart p.buttons a.checkout { background: var(--brand); color: #fff; }
.hdr-cart p.woocommerce-mini-cart__empty-message { padding: 24px; text-align: center; color: var(--ink-muted); font: 15px/1.5 var(--font-body); }
```

Do not set the same property through both a design control and this CSS. The list above targets WooCommerce's own mini-cart widget classes inside the panel; the panel frame is what the design controls handle.

## After-footer block: payment icons and a policy line

```jsonc
// create-reusable-component
{ "title": "Mini Cart Footer" }
// html-to-page on the returned post_id
{ "post_id": 260, "html": "<div class=\"mc-foot\"><ul class=\"mc-pay\"><li><img src=\"/wp-content/uploads/pay-visa.svg\" alt=\"Visa\" width=\"32\" height=\"20\"></li><li><img src=\"/wp-content/uploads/pay-mc.svg\" alt=\"Mastercard\" width=\"32\" height=\"20\"></li><li><img src=\"/wp-content/uploads/pay-paypal.svg\" alt=\"PayPal\" width=\"32\" height=\"20\"></li></ul><p class=\"mc-note\">Free shipping over $75 · 30-day returns</p></div><style>.mc-foot{display:grid;gap:8px;padding-top:12px;border-top:1px solid var(--line)}.mc-pay{list-style:none;margin:0;padding:0;display:flex;gap:6px}.mc-note{margin:0;font:12px/1.4 var(--font-body);color:var(--ink-muted)}</style>" }
// edit-post on the mini cart
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 12, "properties": { "content": { "content": { "after_footer": 260 } } } } } ] }
```

Read the schema for whether `after_footer` takes the id directly or an object; the block-chooser control's shape varies.

## Announcement bars

### Static, dismissible

```html
<div class="announce"><div class="container announce-inner"><p class="announce-text">Free shipping on orders over $75</p><button class="announce-close" aria-label="Dismiss">×</button></div></div>
<style>
  .announce { background: var(--brand); color: var(--on-brand); font: 500 13px/1.4 var(--font-body); }
  .announce.is-hidden { display: none; }
  .announce-inner { display: flex; align-items: center; justify-content: center; min-height: 36px; position: relative; }
  .announce-text { margin: 0; }
  .announce-close { position: absolute; right: var(--gutter); background: none; border: 0; color: inherit; font-size: 20px; cursor: pointer; }
</style>
```

```jsonc
{ "post_id": 220, "element_id": 3, "interactions": [ { "trigger": "click", "actions": [ { "name": "add_class", "target": "custom", "css_selector": ".announce", "css_class": "is-hidden" } ] } ] }
```

The bar returns on the next page load; persistent dismissal needs a plugin or custom JS, which is out of scope for the builder tools. Say so if the owner asks.

### Rotating messages (CSS only)

```html
<div class="announce announce--rotate"><div class="container announce-inner">
  <p class="announce-text announce-text--1">Free shipping over $75</p>
  <p class="announce-text announce-text--2">30-day returns, no questions asked</p>
  <p class="announce-text announce-text--3">New: spring collection is live</p>
</div></div>
<style>
  .announce--rotate .announce-inner { display: grid; }
  .announce--rotate .announce-text { grid-area: 1 / 1; opacity: 0; animation: announce-fade 12s infinite; text-align: center; }
  .announce--rotate .announce-text--2 { animation-delay: 4s; }
  .announce--rotate .announce-text--3 { animation-delay: 8s; }
  @keyframes announce-fade { 0%, 28% { opacity: 1; } 33%, 100% { opacity: 0; } }
</style>
```

Check the `warnings`: if the importer drops `@keyframes`, keep a single static message instead.

### Customer-aware bars (element display conditions)

```jsonc
// "Welcome back" bar only for customers with at least one order
{ "post_id": 220, "element_id": 4, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-orders", "operand": "is greater than", "value": "0" } ]] }

// "You're $X away" style bar only when the cart has something in it
{ "post_id": 220, "element_id": 5, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-quantity", "operand": "is greater than", "value": "0" }, { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "75" } ]] }
```

Rules in one group are ANDed. Copy operands from `get-element-conditions`.
