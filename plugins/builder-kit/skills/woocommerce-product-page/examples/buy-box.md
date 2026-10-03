# Buy box examples

The add-to-cart marker renders WooCommerce's form; these are complete CSS sets for it, scoped under `.pdp-cta`, for different designs and product types, plus the trust rows that sit under it. The quantity stepper is the part agents most often break: the builder positions its buttons absolutely over the input, so the base below resets them into flow before styling them (the "Quantity 1" design); the other seven designs are in the **patterns** skill, `quantity-steppers.md`. Preview the cart button against a product of each type before finalising (`preview-element` with `context_post_id`).

## Base (every product type)

```css
.pdp-cta form.cart { display: flex; flex-wrap: wrap; align-items: stretch; gap: 12px; margin: 0; }
.pdp-cta form.variations_form, .pdp-cta form.grouped_form { display: block; }
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
.pdp-cta button.single_add_to_cart_button { flex: 1 1 200px; min-height: 52px; padding: 0 28px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 16px/1 var(--font-body); cursor: pointer; transition: background .15s; }
.pdp-cta button.single_add_to_cart_button:hover { background: var(--brand-hover); }
.pdp-cta button.single_add_to_cart_button.disabled, .pdp-cta button.single_add_to_cart_button.wc-variation-selection-needed { opacity: .5; cursor: not-allowed; }
.pdp-cta p.stock { margin: 8px 0 0; font: 500 14px/1.4 var(--font-body); width: 100%; }
.pdp-cta p.stock.in-stock { color: var(--success); }
.pdp-cta p.stock.out-of-stock { color: var(--error); }
.pdp-cta p.stock.available-on-backorder { color: var(--info); }
```

## Grouped products

The grouped form renders a table of child products, each with its own quantity input. Nothing above styles it, so without these rules it shows browser table defaults inside `.pdp-cta`.

```css
.pdp-cta table.woocommerce-grouped-product-list { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
.pdp-cta .woocommerce-grouped-product-list-item__label a { color: var(--ink); text-decoration: none; font-weight: 500; }
.pdp-cta .woocommerce-grouped-product-list-item__price { font-weight: 600; }
```

## Variable products: styled selects

```css
.pdp-cta table.variations { width: 100%; border-collapse: collapse; margin: 0 0 16px; }
.pdp-cta table.variations th.label { text-align: left; padding: 0 0 6px; font: 500 14px/1.2 var(--font-body); vertical-align: top; }
.pdp-cta table.variations td.value { padding: 0 0 14px; }
.pdp-cta .bde-woo-select { position: relative; display: block; }
.pdp-cta .bde-woo-select select { width: 100%; min-height: 48px; padding: 10px 40px 10px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); font: 15px/1.4 var(--font-body); color: var(--ink); appearance: none; }
.pdp-cta .bde-woo-select select:focus { outline: 2px solid var(--brand); outline-offset: 1px; }
.pdp-cta .bde-woo-select__arrow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }
/* the builder styles this link as a destructive secondary button: pink fill, red text, full button
   padding, capitalised. Undo all of it, including the hover rule, which is styled separately */
.pdp-cta a.reset_variations { display: inline-block; width: auto; margin-top: 8px; padding: 0; border: 0; border-radius: 0; background: none; color: var(--ink-muted); font: 13px/1.2 var(--font-body); text-transform: none; text-decoration: underline; text-underline-offset: 3px; }
.pdp-cta a.reset_variations:hover { background: none; color: var(--ink); text-decoration: none; }
.pdp-cta .single_variation_wrap { width: 100%; }
.pdp-cta .woocommerce-variation-price { font: 600 22px/1.2 var(--font-body); margin-bottom: 12px; }
.pdp-cta .woocommerce-variation-price del { color: var(--ink-muted); font-weight: 400; font-size: 18px; margin-right: 8px; }
.pdp-cta .woocommerce-variation-price ins { text-decoration: none; }
.pdp-cta .woocommerce-variation-availability { font: 14px/1.4 var(--font-body); margin-bottom: 12px; }
.pdp-cta .woocommerce-variation-description { font: 14px/1.5 var(--font-body); color: var(--ink-muted); margin-bottom: 12px; }
.pdp-cta .woocommerce-variation-add-to-cart { display: flex; flex-wrap: wrap; gap: 12px; }
.pdp-cta .woocommerce-variation-add-to-cart-disabled { opacity: .6; }
```

When the variation price duplicates the price marker above, hide one: `.pdp-cta .woocommerce-variation-price { display: none }` and keep the `price` marker (which shows the range), or the reverse when the design wants the price to follow the selection.

## The "Clear" link on variable products

WooCommerce prints `<a class="reset_variations" href="#" aria-label="Clear options">Clear</a>` inside the **last attribute row's** `td.value`, and its own script toggles it with an inline `visibility` style: hidden until a variation is chosen, visible after. The builder hides the invisible state outright (`.reset_variations[style="visibility: hidden;"] { display: none !important }`), so it reserves no space when there is nothing to clear.

The problem is what it looks like when it does show. The builder styles it as a **destructive secondary button**, the same treatment as "Cancel order": a pink `--red-50` fill, `--red-500` text, full button padding, a border, a border radius and `text-transform: capitalize`, plus `display: flex; width: max-content` and a `--bde-woo-base-big-gaps` top margin (all of it from the builder's stylesheet, so on an unstyled store the link arrives plain and none of the resets below are needed). On a product page that is a pink block sitting under the swatches, louder than the Add to cart button and reading like a warning. It is a link that undoes a choice, so it should be the quietest thing in the buy box.

Three facts decide how you fix it:

- The builder's rules are `.breakdance-woocommerce .reset_variations`, two classes. Qualify yours with the tag, `.pdp-cta a.reset_variations`, and you win on specificity rather than on stylesheet order.
- **The hover state is a separate rule** (`.breakdance-woocommerce .reset_variations:hover`, a full red fill with white text). A reset that forgets `:hover` looks right until the pointer lands on it and a red block appears. Always write both.
- Do not hide it, and do not remove its text without keeping a label. It is the only way to deselect an attribute, and on a filtered variation set it is the only way back to the full range. WooCommerce already gives it `aria-label="Clear options"`, which is what makes the icon-only treatment below legitimate.

### Clear 1 · A quiet text link (the default)

Use when: anything. This is what the link should have looked like, and it is the one to reach for unless the design asks for something else.

```css
.pdp-cta a.reset_variations { display: inline-block; width: auto; margin-top: 8px; padding: 0; border: 0; border-radius: 0; background: none; color: var(--ink-muted); font: 13px/1.2 var(--font-body); text-transform: none; text-decoration: underline; text-underline-offset: 3px; }
.pdp-cta a.reset_variations:hover { background: none; color: var(--ink); text-decoration: none; }
```

### Clear 2 · Beside the attribute label

Use when: the buy box shows the chosen value next to the attribute name ("Color — Midnight Blue"), which is where a shopper looks to change it. The link moves up onto the last row's label line instead of hanging below the swatches.

```css
/* the link lives in the last row's value cell, so the row is the positioning context */
.pdp-cta table.variations tbody tr:last-child { position: relative; }
.pdp-cta table.variations tbody tr:last-child a.reset_variations { position: absolute; top: 0; right: 0; margin: 0; padding: 0; border: 0; background: none; color: var(--ink-muted); font: 500 12px/1.2 var(--font-body); text-transform: none; text-decoration: none; }
.pdp-cta table.variations tbody tr:last-child a.reset_variations:hover { background: none; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
```

This assumes the styled-selects block above, where `th.label` sits on its own line over `td.value`. Check the top offset against your own label line height, and drop back to Clear 1 if the store has one attribute and a tall swatch row.

### Clear 3 · A small chip with a cross

Use when: the store uses chips elsewhere (active filters, applied coupons) and the buy box should match. Bigger tap target than a text link without becoming a button.

```css
.pdp-cta a.reset_variations { display: inline-flex; align-items: center; gap: 6px; width: auto; margin-top: 10px; padding: 5px 10px 5px 8px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: none; color: var(--ink-muted); font: 500 12px/1 var(--font-body); text-transform: none; text-decoration: none; }
.pdp-cta a.reset_variations::before { content: ""; width: 12px; height: 12px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'><path d='M6 6l12 12M18 6L6 18'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'><path d='M6 6l12 12M18 6L6 18'/></svg>") center / contain no-repeat; }
.pdp-cta a.reset_variations:hover { background: var(--surface-alt); border-color: var(--ink-muted); color: var(--ink); }
```

### Clear 4 · Icon only, beside the label

Use when: space is tight (a narrow sticky buy box, a quick-view drawer) and the label row already says what is selected. Safe only because WooCommerce ships `aria-label="Clear options"` on the link, so the accessible name survives losing the text.

```css
.pdp-cta table.variations tbody tr:last-child { position: relative; }
.pdp-cta table.variations tbody tr:last-child a.reset_variations { position: absolute; top: -6px; right: -6px; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 50%; background: none; color: var(--ink-muted); font-size: 0; text-transform: none; text-decoration: none; }
.pdp-cta table.variations tbody tr:last-child a.reset_variations::before { content: ""; width: 13px; height: 13px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'><path d='M6 6l12 12M18 6L6 18'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'><path d='M6 6l12 12M18 6L6 18'/></svg>") center / contain no-repeat; }
.pdp-cta table.variations tbody tr:last-child a.reset_variations:hover { background: var(--surface-alt); color: var(--ink); }
.pdp-cta table.variations tbody tr:last-child a.reset_variations:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
```

`font-size: 0` hides the word without removing it from the accessibility tree, and the explicit focus ring matters more here than anywhere else in the buy box: there is no visible text to show focus on. A 28px box is under the 44px comfortable target, so keep this one for desktop-width contexts or bump the size on touch.

## Variable products: swatches (with a swatch plugin installed)

The builder restyles the two supported plugins itself; these rules refine the result. Preview after installing the plugin to confirm the class names it emits.

```css
/* Variation Swatches for WooCommerce (woo-variation-swatches) */
.pdp-cta ul.variable-items-wrapper { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.pdp-cta li.variable-item { border: 1px solid var(--line); border-radius: var(--radius); box-shadow: none; }
.pdp-cta li.variable-item.selected { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink); }
.pdp-cta li.variable-item.disabled { opacity: .35; }
.pdp-cta li.button-variable-item { min-width: 48px; height: 44px; padding: 0 14px; font: 500 14px/1 var(--font-body); }
.pdp-cta li.color-variable-item { width: 36px; height: 36px; border-radius: 50%; }
.pdp-cta li.color-variable-item.selected { box-shadow: 0 0 0 2px #fff, 0 0 0 3px var(--ink); }
.pdp-cta li.image-variable-item { width: 56px; height: 56px; }
```

Selected-option label ("Size: M") comes from the plugin when enabled in its settings; do not script it.

## External / affiliate product

```css
.pdp-cta a.single_add_to_cart_button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; padding: 0 28px; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 16px/1 var(--font-body); text-decoration: none; }
.pdp-cta a.single_add_to_cart_button::after { content: "↗"; }
```

Tell the shopper where the button goes: a small line under it, "Sold by Partner Store", in static copy if the whole catalog is affiliate, or bound to a custom field when it varies.

## Pill button, full-width, quantity below (mobile-first stores)

```css
.pdp-cta form.cart { flex-direction: column; }
.pdp-cta .quantity { order: -1; width: fit-content; border-radius: var(--radius-pill); } /* or the full-width labelled row: Quantity 6 in patterns/quantity-steppers.md */
.pdp-cta button.single_add_to_cart_button { width: 100%; border-radius: var(--radius-pill); font-size: 17px; min-height: 56px; }
```

## Split "Add to cart" + "Buy now"

WooCommerce has no buy-now button by default; do not fake one. If a plugin adds one (it appears inside `form.cart` as a second button), style it as the primary and the add-to-cart as secondary:

```css
.pdp-cta button.single_add_to_cart_button { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
.pdp-cta .buy-now-button { flex: 1 1 200px; min-height: 52px; border: 0; border-radius: var(--radius); background: var(--brand); color: #fff; font: 600 16px/1 var(--font-body); }
```

## Trust rows

Under the button, inside `.pdp-summary`. Only claims the owner confirmed.

```html
<!-- three-line list -->
<ul class="pdp-trust">
  <li class="pdp-trust-item"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v10H3zM16 10h4l1 3v4h-5z"/><circle cx="7" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></svg><span><strong>Free shipping</strong> on orders over $75</span></li>
  <li class="pdp-trust-item"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/></svg><span><strong>30-day returns</strong>, free of charge</span></li>
  <li class="pdp-trust-item"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span><strong>Secure checkout</strong> · Visa, Mastercard, PayPal, Apple Pay</span></li>
</ul>

<!-- compact one-line -->
<p class="pdp-trust-line">Ships in 1-2 business days · 30-day returns · Secure checkout</p>

<!-- delivery estimate box (static copy; only if the owner confirms lead times) -->
<div class="pdp-delivery">
  <p class="pdp-delivery-row"><strong>Standard delivery</strong><span>3-5 days · Free over $75</span></p>
  <p class="pdp-delivery-row"><strong>Express</strong><span>1-2 days · $12</span></p>
</div>
```

```css
.pdp-trust { list-style: none; margin: 0; padding: 16px 0 0; border-top: 1px solid var(--line); display: grid; gap: 10px; }
.pdp-trust-item { display: flex; align-items: center; gap: 10px; font: 14px/1.4 var(--font-body); }
.pdp-trust-item svg { color: var(--brand); flex: none; }
.pdp-trust-line { margin: 0; font: 13px/1.5 var(--font-body); color: var(--ink-muted); }
.pdp-delivery { border: 1px solid var(--line); border-radius: var(--radius); padding: 12px 16px; display: grid; gap: 8px; }
.pdp-delivery-row { display: flex; justify-content: space-between; gap: 16px; margin: 0; font: 14px/1.4 var(--font-body); }
.pdp-delivery-row span { color: var(--ink-muted); }
```

## Notices (required on every marker page)

"Added to your cart", checkout errors and info states render inside the product wrapper as bare markup (the builder's WooCommerce stylesheet does not reach into the marker-built product) and never in previews. Use the reset plus one design from the **patterns** skill, `notices.md` (inline banner, toast, full-width bar, in the details column, checkout field list), scoped to `.pdp`. The reset with the inline banner:

```css
.pdp .woocommerce-notices-wrapper { display: grid; gap: 10px; margin: 0 0 24px; }
.pdp > .woocommerce-notices-wrapper { width: min(100% - var(--gutter) * 2, var(--container)); margin-left: auto; margin-right: auto; }  /* printed before the .container, so align it to the container width */
.pdp .woocommerce-notices-wrapper:empty { display: none; margin: 0; }
.pdp .woocommerce-message, .pdp .woocommerce-info { position: relative; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 0; width: auto; margin: 0; padding: 14px 16px 14px 44px; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); }
.pdp .woocommerce-error { position: relative; display: grid; gap: 8px; width: auto; margin: 0; padding: 14px 16px 14px 44px; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); list-style: none; }
.pdp .woocommerce-message, .pdp .woocommerce-info { border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
.pdp .woocommerce-message { background: var(--success-bg); color: var(--success); }
.pdp .woocommerce-info { background: var(--surface-alt); color: var(--ink); }
.pdp .woocommerce-error { background: var(--error-bg); color: var(--error); }
.pdp .woocommerce-message::before, .pdp .woocommerce-info::before, .pdp .woocommerce-error li::before { content: ""; position: absolute; left: 16px; top: 50%; width: 18px; height: 18px; margin-top: -9px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; }
.pdp .woocommerce-info::before { -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); }
.pdp .woocommerce-error li { position: relative; display: block; margin: 0; padding: 0; font-weight: 400; }
.pdp .woocommerce-error li::before { left: -28px; -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); }
.pdp .woocommerce-message a:not(.button), .pdp .woocommerce-info a:not(.button) { margin-left: .3em; }
.pdp .woocommerce-message a.button { order: 1; margin: 0 0 0 auto; display: inline-flex; align-items: center; min-height: 36px; padding: 0 14px; border: 1px solid currentColor; border-radius: var(--radius); background: transparent; color: inherit !important; font: 600 13px/1 var(--font-body); text-decoration: none; float: none; }
.pdp .woocommerce-message a.button:hover { background: var(--success); border-color: var(--success); color: #fff !important; }
@media (max-width: 767px) { .pdp .woocommerce-message a.button { margin: 4px 0 0; width: 100%; justify-content: center; } }
```

## Sale flash and price emphasis

```css
.pdp span.onsale { display: none; }                         /* the price already says it */
.pdp-price { font: 600 26px/1.2 var(--font-body); display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.pdp-price del { color: var(--ink-muted); font-weight: 400; font-size: 20px; order: 2; }
.pdp-price ins { text-decoration: none; color: var(--accent); order: 1; }
```

Or keep the flash as a badge in the summary: `.pdp span.onsale { position: static; display: inline-block; … }` with the `.badge` look.
