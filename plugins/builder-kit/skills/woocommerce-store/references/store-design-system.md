# The store design system

Do this before any store template. A store is 80% repeated components (buttons, prices, cards, badges, notices, form fields), so a tight design system built once makes every template consistent and fast to build; a store styled template by template drifts within an hour.

## 1. Read what exists

- `get-css-variables` and `get-css-selectors`: reuse the site's tokens and classes if a design system is already there; extend rather than fork. Prefix new classes with the site's `css_prefix` only if the site already prefixes.
- `get-global-settings` (where it exists) and `preview-global-settings-css`: body, headings and links have colors and fonts set directly on the tags, so your wrapper colors will not cascade into them unless you target them.
- `site-info` → `modern_normalize_enabled`. Enable Modern Normalize with `set-settings` (`advanced.modern_normalize_enabled`) unless the site has existing hand-built pages relying on browser default margins (ask first in that case). WooCommerce's own markup (tables, forms, notices, lists) carries browser defaults too, so the reset matters more on a store than on a brochure site.

## 2. Tokens

Define once in `:root` via `insert-stylesheet` (or the first `html-to-page` `<style>`), and use nothing else afterwards. Suggested roles; rename to the brand kit if there is one:

```css
:root {
  /* colour roles */
  --brand: #1f4d3a;            /* primary action colour: add to cart, checkout, place order */
  --brand-hover: #173d2e;
  --on-brand: #ffffff;
  --accent: #d98c2b;           /* sale badges, highlights; use sparingly */
  --ink: #16181d;              /* body text */
  --ink-muted: #5b6270;        /* meta, struck-through prices, helper text */
  --line: #e4e6ea;             /* borders, dividers, input borders */
  --surface: #ffffff;
  --surface-alt: #f6f7f8;      /* section bands, order summary box, cart totals */
  --success: #1c7c4a; --success-bg: #ecfdf3;
  --error: #b42318;   --error-bg: #fef3f2;
  --info: #175cd3;    --info-bg: #eff8ff;
  /* type roles */
  --font-display: 'Fraunces';  /* headings, product titles on the PDP */
  --font-body: 'Inter';        /* everything else, including prices */
  /* geometry */
  --radius: 10px; --radius-pill: 999px;
  --container: 1280px; --gutter: 24px;
  --card-ratio: 4 / 5;         /* product card and gallery image ratio; set from the catalog's photos */
}
```

Naming the Google Fonts is enough; the builder loads them. Put the real family name first.

Pick `--card-ratio` deliberately: look at the product photos. Square (1 / 1) for white-background product shots, 4 / 5 or 3 / 4 for fashion and lifestyle. Use the same ratio for shop cards, homepage rows, the product gallery and the thumbnail tiles, and design related-product tiles square (WooCommerce crops those to a square thumbnail).

## 3. Base classes every template reuses

Write these once. Every store template then composes them.

```css
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: 64px; }
.section--tight { padding-block: 40px; }

/* buttons: ONE primary, ONE secondary, reused by every template */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 12px 24px; border-radius: var(--radius); font: 600 15px/1 var(--font-body); text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: background .15s, color .15s, border-color .15s; }
.btn--primary { background: var(--brand); color: var(--on-brand); }
.btn--primary:hover { background: var(--brand-hover); }
.btn--secondary { background: transparent; color: var(--ink); border-color: var(--line); }
.btn--secondary:hover { border-color: var(--ink); }

/* prices */
.price-current { font-weight: 600; color: var(--ink); }
.price-was { color: var(--ink-muted); text-decoration: line-through; font-weight: 400; }

/* sale badge */
.badge { display: inline-block; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--accent); color: #fff; font: 600 12px/1.4 var(--font-body); letter-spacing: .02em; text-transform: uppercase; }
.badge:empty { display: none; }

/* eyebrow / section header */
.eyebrow { font: 600 13px/1.2 var(--font-body); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-muted); }
.section-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
.section-title { font: 600 clamp(28px, 3vw, 40px)/1.1 var(--font-display); margin: 0; }
```

The `:empty` rule on the badge is what makes a bound `product_sale` disappear on non-sale products.

## 4. Make WooCommerce's own markup match

WooCommerce renders buttons, prices, notices, form fields and tables inside the woo elements with its own classes, and none of them match your tokens by default.

**Assume the store is unstyled** (rule 2 in SKILL.md), so there is no builder WooCommerce CSS and the class layer below IS the store's WooCommerce design rather than a set of overrides on top of one. Scope every rule under a wrapper class you put on every woo template (e.g. `.store`): the class first, then WooCommerce's own selector chain. WooCommerce's own stylesheets are still the base and its selectors are element-qualified, so qualify yours the same way (`button.single_add_to_cart_button`, `a.button`, `input.qty`). Budget for the parts the builder's stylesheet used to cover: `ul.products` has no grid rule and falls back to WooCommerce's float layout (`products_per_row` and `between_products` do nothing, write your own `display: grid`), there is no plus/minus quantity stepper, selects show the browser's arrow, and notices are unstyled. The class maps are in the product page and cart/checkout skills.

**Only if the store is staying on `enabled`** because the user wants the builder's WooCommerce design kept: `settings.woocommerce` themes every woo part in one `set-global-settings` call and is the fast path, so use it rather than fighting it with CSS. Your class rules are emitted after the builder's woo stylesheet so ties win by load order, but never drive the same property from both sides: a class rule that sets a property outright masks the design control that emits a CSS variable for it, and the control then looks dead. Read `get-global-settings` first, then set at least:

- `colors.brand`, `colors.text`, `colors.headings`, `colors.borders`, `colors.text_on_brand`
- `buttons_links`: the primary and secondary button looks (used by add-to-cart, checkout, place order, apply coupon, account actions), `text_links.color`, `disabled` colours
- `typography.sizes` / `weights` to match the body font scale
- `other.notices` (info / success / error colours, radius, padding, icon size), `other.sale_badge`, `other.ratings.star_color`, `other.product_images.border_radius`, `other.tables`, `other.wrappers`, `other.payment_box`
- `variation_swatches` when a swatch plugin is installed
- `other.products_list` (columns, products per page, part toggles): the shop grid and the product rows are the native Shop Page and Products List elements by default, so set it

The compact store-wide layer every unstyled store needs, on that wrapper class:

```css
/* buttons WooCommerce renders itself (cart, checkout, account, notices) */
.store a.button, .store button.button, .store input.button, .store .wc-block-components-button,
.store button.single_add_to_cart_button, .store .checkout-button, .store #place_order {
  background: var(--brand); color: var(--on-brand); border-radius: var(--radius); border: 0; min-height: 48px; padding: 12px 24px; font: 600 15px/1 var(--font-body);
}
.store a.button:hover, .store button.button:hover, .store #place_order:hover, .store button.single_add_to_cart_button:hover { background: var(--brand-hover); color: var(--on-brand); }
/* form fields */
.store input.input-text, .store textarea, .store select, .store .select2-container .select2-selection--single {
  border: 1px solid var(--line); border-radius: var(--radius); min-height: 48px; padding: 10px 14px; font: 15px/1.4 var(--font-body); background: var(--surface); color: var(--ink);
}
.store input.input-text:focus, .store textarea:focus, .store select:focus { outline: 2px solid var(--brand); outline-offset: 1px; border-color: var(--brand); }
.store label { font: 500 14px/1.4 var(--font-body); color: var(--ink); }
.store label .required { color: var(--error); text-decoration: none; }
/* prices */
.store .price, .store .woocommerce-Price-amount { font-weight: 600; color: var(--ink); }
.store .price del, .store del .woocommerce-Price-amount { color: var(--ink-muted); font-weight: 400; }
.store .price ins { text-decoration: none; }
/* notices */
.store .woocommerce-notices-wrapper { margin-bottom: 24px; }
.store .woocommerce-message, .store .woocommerce-error li, .store .woocommerce-info { padding: 14px 20px; border-radius: var(--radius); font: 15px/1.5 var(--font-body); }
.store .woocommerce-message { background: var(--success-bg); color: var(--success); }
.store .woocommerce-message a.button { float: right; margin-left: 16px; }
.store .woocommerce-error li { background: var(--error-bg); color: var(--error); }
.store .woocommerce-info { background: var(--info-bg); color: var(--info); }
/* tables (cart, order review, account) */
.store table.shop_table { border: 1px solid var(--line); border-radius: var(--radius); border-collapse: separate; border-spacing: 0; width: 100%; }
.store table.shop_table th, .store table.shop_table td { padding: 14px 16px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: middle; }
.store table.shop_table thead th { background: var(--surface-alt); font: 600 13px/1.2 var(--font-body); text-transform: uppercase; letter-spacing: .04em; color: var(--ink-muted); }
```

Write each chain as it appears in the markup: the importer stores every rule that starts with your class as one nested child under it (`.store table.shop_table thead th` becomes the child `& table.shop_table thead th`). Where you must out-specify WooCommerce's or the builder's stylesheet, write their full chain (`.store.breakdance-woocommerce ul.products li.product .price`); everywhere else keep chains as short as the specificity fight allows, since each one is a single opaque selector in the builder.

Notices never appear in previews (they render only when WooCommerce has queued one), so style them blind from the class map and never skip them: on a marker-built product page "added to cart" is otherwise a bare paragraph.

## 5. Header and footer as part of the system

Build the header template before any store template so every preview shows the real frame. The store header carries: logo, primary navigation, `bd-woo="search"`, an account link to the My Account page, and `bd-woo="mini-cart"`. Set the mini cart's `content.content.cart.open_cart_on_add: true` so an AJAX add-to-cart from the shop grid gives feedback, and `primary_button: "checkout"` for stores where most carts have one item. Category navigation is a `bd-loop="terms"` of product categories, not typed links.

A footer for a store needs: the policy links (shipping, returns, privacy, terms), contact, payment method icons (static images are fine, they are not product data), and the newsletter form if the store has one (a Form Builder element, configured with `set-element-form`).

## 6. Order of operations

1. `set-settings` with `woocommerce.styles_mode: "unstyled"`, before any CSS exists to be invalidated.
2. `insert-stylesheet` with the tokens, base classes and the `.store` woo layer.
3. `set-global-settings` for `settings.woocommerce`, only on a store staying on `enabled`.
4. `set-settings` (`advanced.modern_normalize_enabled`). An unstyled store needs it: with neither our resets nor our woo CSS, WooCommerce's markup renders with browser defaults, bullets down the product grid and borders on every table. Still ask first on a site with existing hand-built pages.
5. Header and footer templates.
6. Only then the store templates, each reusing `.btn--primary`, `.badge`, `.price-*`, `.container`, `.section` and the tokens rather than inventing new ones.

When restyling a class later, re-import its complete rule (read it back with `get-css-selectors` `include_properties: true`); an import replaces the rule, it does not patch it.
