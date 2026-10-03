# Store design system examples

Three complete token sets and base layers for different kinds of stores, ready to send with `insert-stylesheet`, plus the matching `set-global-settings` payload for Breakdance. Swap the values for the brand kit when there is one.

## 1. Fashion / apparel (editorial, lots of whitespace, portrait photos)

```css
:root {
  --brand: #111111; --brand-hover: #000000; --on-brand: #ffffff;
  --accent: #b3261e;
  --ink: #111111; --ink-muted: #6b6b6b; --line: #e6e6e6;
  --surface: #ffffff; --surface-alt: #f5f4f2;
  --success: #1f6f43; --success-bg: #eaf5ee; --error: #b3261e; --error-bg: #fbeeed; --info: #2b4c7e; --info-bg: #eef2f8;
  --font-display: 'Cormorant Garamond'; --font-body: 'Inter';
  --radius: 0px; --radius-pill: 999px;
  --container: 1440px; --gutter: 32px;
  --card-ratio: 3 / 4;
}
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: 96px; }
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 14px 32px; border-radius: var(--radius); font: 500 13px/1 var(--font-body); letter-spacing: .12em; text-transform: uppercase; text-decoration: none; border: 1px solid var(--ink); cursor: pointer; transition: background .15s, color .15s; }
.btn--primary { background: var(--brand); color: var(--on-brand); }
.btn--primary:hover { background: var(--surface); color: var(--ink); }
.btn--secondary { background: transparent; color: var(--ink); }
.btn--secondary:hover { background: var(--ink); color: #fff; }
.badge { display: inline-block; padding: 4px 8px; background: var(--ink); color: #fff; font: 500 11px/1.3 var(--font-body); letter-spacing: .1em; text-transform: uppercase; }
.badge:empty { display: none; }
.section-title { font: 500 clamp(32px, 4vw, 52px)/1.05 var(--font-display); letter-spacing: -.01em; margin: 0; }
.eyebrow { font: 500 12px/1.2 var(--font-body); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-muted); }
```

Design notes: square corners, uppercase tracking on buttons and nav, price in the body font at regular weight, cards with no border and no shadow, 3 columns on desktop.

## 2. Food / grocery / consumables (warm, dense, fast repeat purchases)

```css
:root {
  --brand: #2f7d32; --brand-hover: #256628; --on-brand: #ffffff;
  --accent: #e65100;
  --ink: #1f2a1f; --ink-muted: #5f6b5f; --line: #e3e8e3;
  --surface: #ffffff; --surface-alt: #f4f7f2;
  --success: #2f7d32; --success-bg: #eaf4ea; --error: #c62828; --error-bg: #fdecec; --info: #1565c0; --info-bg: #e9f1fb;
  --font-display: 'Nunito'; --font-body: 'Nunito';
  --radius: 14px; --radius-pill: 999px;
  --container: 1320px; --gutter: 20px;
  --card-ratio: 1 / 1;
}
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: 48px; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 10px 20px; border-radius: var(--radius-pill); font: 700 15px/1 var(--font-body); text-decoration: none; border: 2px solid transparent; cursor: pointer; }
.btn--primary { background: var(--brand); color: var(--on-brand); }
.btn--primary:hover { background: var(--brand-hover); }
.btn--secondary { background: var(--surface); color: var(--brand); border-color: var(--brand); }
.badge { display: inline-block; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--accent); color: #fff; font: 800 12px/1.3 var(--font-body); }
.badge:empty { display: none; }
.card-shell { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px; }
.section-title { font: 800 clamp(24px, 3vw, 34px)/1.15 var(--font-display); margin: 0; }
```

Design notes: cards with a border and padding, 4 to 5 columns, add-to-cart button on every card (quantity matters here), pill buttons, unit/weight shown under the title via a bound custom field where the store has one.

## 3. Electronics / tools (spec-driven, trust-heavy, cool neutrals)

```css
:root {
  --brand: #0b57d0; --brand-hover: #0842a0; --on-brand: #ffffff;
  --accent: #d93025;
  --ink: #1a1c1e; --ink-muted: #5c6370; --line: #dfe3e8;
  --surface: #ffffff; --surface-alt: #f3f5f7;
  --success: #188038; --success-bg: #e6f4ea; --error: #d93025; --error-bg: #fce8e6; --info: #0b57d0; --info-bg: #e8f0fe;
  --font-display: 'Manrope'; --font-body: 'Inter';
  --radius: 8px; --radius-pill: 999px;
  --container: 1280px; --gutter: 24px;
  --card-ratio: 1 / 1;
}
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: 64px; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 12px 24px; border-radius: var(--radius); font: 600 15px/1 var(--font-body); text-decoration: none; border: 1px solid transparent; cursor: pointer; }
.btn--primary { background: var(--brand); color: var(--on-brand); }
.btn--primary:hover { background: var(--brand-hover); }
.btn--secondary { background: var(--surface); color: var(--ink); border-color: var(--line); }
.badge { display: inline-block; padding: 3px 8px; border-radius: 4px; background: var(--accent); color: #fff; font: 700 11px/1.4 var(--font-body); text-transform: uppercase; }
.badge:empty { display: none; }
.spec-table { width: 100%; border-collapse: collapse; font: 14px/1.5 var(--font-body); }
.spec-table th { text-align: left; color: var(--ink-muted); font-weight: 500; padding: 10px 0; border-bottom: 1px solid var(--line); width: 40%; }
.spec-table td { padding: 10px 0; border-bottom: 1px solid var(--line); }
.section-title { font: 700 clamp(26px, 3vw, 36px)/1.15 var(--font-display); letter-spacing: -.01em; margin: 0; }
```

Design notes: white-background product shots on `--surface-alt` tiles, a visible rating with count on cards, "In stock" line on cards, specs prominent on the PDP (`additional-info` marker styled with `.spec-table`-like rules), trust row with warranty and support.

## The store-wide WooCommerce layer (Oxygen 6 without global settings)

Send this once, after the tokens, and put `class="store"` on the wrapper of every store template (product wrapper, cart, checkout, account pages). Every selector starts with `.store`.

```css
.store a.button, .store button.button, .store input.button, .store button.single_add_to_cart_button, .store a.checkout-button, .store #place_order, .store button.woocommerce-Button, .store .woocommerce-form-login button, .store .woocommerce-form-register button { background: var(--brand); color: var(--on-brand); border: 0; border-radius: var(--radius); min-height: 48px; padding: 12px 24px; font: 600 15px/1 var(--font-body); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
.store a.button:hover, .store button.button:hover, .store button.single_add_to_cart_button:hover, .store a.checkout-button:hover, .store #place_order:hover { background: var(--brand-hover); color: var(--on-brand); }
.store button[name="apply_coupon"], .store a.button.wc-forward, .store .return-to-shop a.button { background: transparent; color: var(--ink); border: 1px solid var(--line); }
.store input.input-text, .store textarea, .store select, .store input.qty { border: 1px solid var(--line); border-radius: var(--radius); min-height: 48px; padding: 10px 14px; font: 15px/1.4 var(--font-body); background: var(--surface); color: var(--ink); }
.store input.input-text:focus, .store textarea:focus, .store select:focus { outline: 2px solid var(--brand); outline-offset: 1px; border-color: var(--brand); }
.store .select2-container .select2-selection--single { border: 1px solid var(--line); border-radius: var(--radius); height: 48px; }
.store .select2-container .select2-selection__rendered { line-height: 46px; padding-left: 14px; }
.store .select2-container .select2-selection__arrow { height: 46px; }
.store label { font: 500 14px/1.4 var(--font-body); color: var(--ink); display: block; margin-bottom: 6px; }
.store label .required { color: var(--error); text-decoration: none; }
.store .form-row { margin-bottom: 16px; }
.store .woocommerce-invalid input.input-text { border-color: var(--error); }
.store .price, .store .woocommerce-Price-amount { font-weight: 600; color: var(--ink); }
.store .price del { color: var(--ink-muted); font-weight: 400; }
.store .price ins { text-decoration: none; }
.store .woocommerce-notices-wrapper { margin-bottom: 24px; }
.store .woocommerce-message, .store .woocommerce-error li, .store .woocommerce-info { padding: 14px 20px; border-radius: var(--radius); font: 15px/1.5 var(--font-body); margin-bottom: 8px; }
.store .woocommerce-message { background: var(--success-bg); color: var(--success); }
.store .woocommerce-message a.button { float: right; margin-left: 16px; min-height: 36px; padding: 8px 14px; }
.store .woocommerce-error li { background: var(--error-bg); color: var(--error); list-style: none; }
.store .woocommerce-info { background: var(--info-bg); color: var(--info); }
.store table.shop_table { border: 1px solid var(--line); border-radius: var(--radius); border-collapse: separate; border-spacing: 0; width: 100%; }
.store table.shop_table th, .store table.shop_table td { padding: 14px 16px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: middle; }
.store table.shop_table thead th { background: var(--surface-alt); font: 600 12px/1.2 var(--font-body); text-transform: uppercase; letter-spacing: .04em; color: var(--ink-muted); }
.store table.shop_table tr:last-child td { border-bottom: 0; }
/* quantity stepper: the builder's buttons are absolutely positioned over the input, so reset them into flow (full reset and eight designs in patterns/quantity-steppers.md) */
.store .quantity { position: relative; display: inline-flex; align-items: stretch; width: auto; max-width: none; height: 44px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); overflow: hidden; }
.store .quantity--hidden { display: none; }
.store .quantity input.qty { width: 48px; min-width: 0; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; text-align: center; font: 500 15px/1 var(--font-body); -moz-appearance: textfield; appearance: textfield; }
.store .bde-quantity-button { position: static; inset: auto; transform: none; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 40px; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--ink); font-size: 11px; cursor: pointer; }
.store .bde-quantity-button:hover { background: var(--surface-alt); color: var(--ink); }
.store span.onsale { display: none; }
```

## Breakdance: the same system through global settings

```jsonc
// set-global-settings (read get-global-settings first; unit values are { number, unit, style })
{ "settings": {
  "colors": { "background": "#ffffff", "text": "#16181d", "headings": "#16181d", "links": "#1f4d3a" },
  "typography": { "heading_font": "Fraunces", "body_font": "Inter" },
  "buttons": { "primary": { "background": "#1f4d3a", "text": "#ffffff", "border_radius": { "number": 10, "unit": "px", "style": "10px" } } },
  "woocommerce": {
    "colors": { "brand": "#1f4d3a", "text": "#16181d", "headings": "#16181d", "borders": "#e4e6ea", "text_on_brand": "#ffffff" },
    "typography": { "weights": { "normal": "400", "medium": "500", "heavy": "600" } },
    "buttons_links": { "text_links": { "color": "#1f4d3a" }, "disabled": { "background": "#e4e6ea", "text": "#8a909b" } },
    "other": {
      "notices": { "border_radius": { "number": 10, "unit": "px", "style": "10px" }, "padding": { "number": 14, "unit": "px", "style": "14px" } },
      "sale_badge": { "background": "#d98c2b", "text": "#ffffff", "radius": { "number": 999, "unit": "px", "style": "999px" }, "font_weight": "600" },
      "ratings": { "star_color": "#f5a524", "star_size": { "number": 14, "unit": "px", "style": "14px" } },
      "product_images": { "border_radius": { "number": 10, "unit": "px", "style": "10px" } },
      "wrappers": { "background": "#f6f7f8", "border": "#e4e6ea", "border_radius": { "number": 10, "unit": "px", "style": "10px" } },
      "tables": { "header": "#f6f7f8", "border": "#e4e6ea", "border_radius": { "number": 10, "unit": "px", "style": "10px" } },
      "payment_box": { "background": "#f6f7f8", "border_color": "#e4e6ea" },
      "quicklook": { "enable": false }
    },
    "variation_swatches": { "alignment": "left", "image_and_color_swatches": { "width": { "number": 36, "unit": "px", "style": "36px" }, "height": { "number": 36, "unit": "px", "style": "36px" } } }
  }
} }
```

The exact key names under `buttons` and `typography` vary by version; take them from `get-global-settings` and keep the `woocommerce` block shaped like the WooGlobalStyler sections in the element catalog.
