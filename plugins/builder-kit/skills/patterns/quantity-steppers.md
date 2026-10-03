# Quantity steppers

Eight CSS-only designs for the WooCommerce quantity input as the builder renders it. The markup cannot be changed; every variant is a class rule set targeting it, scoped under a wrapper class of yours (`.qs` below stands for the class you put on the `add-to-cart` marker, on the cart page wrapper, or on the mini cart).

## The markup you are styling

The builder replaces WooCommerce's bare number field with a stepper. This exact HTML appears on the product page (`form.cart`), in each cart row (`td.product-quantity`), in the mini cart panel and in the grouped product table:

```html
<div class="quantity quantity--number">
  <label class="screen-reader-text" for="quantity_6aa9d98508dcd">Knot Ring quantity</label>
  <button class="bde-quantity-button bde-quantity-button--dec" type="button" aria-label="Decrement"></button>
  <input type="number" id="quantity_6aa9d98508dcd" class="input-text qty text" name="quantity" value="1" aria-label="Product quantity" min="1" step="1" placeholder="" inputmode="numeric" autocomplete="off" max="">
  <button class="bde-quantity-button bde-quantity-button--inc" type="button" aria-label="Increment"></button>
</div>
```

The buttons are empty: the `−` and `+` are `::before` pseudo-elements drawn as a `1em` mask in `currentColor`, so `font-size` on the button is the icon size and `color` is the icon colour. The builder's script handles the clicks and, in the cart, the AJAX update; nothing here needs JavaScript.

## Why agents get it wrong

The builder's default stylesheet lays the stepper out as **absolutely positioned buttons over the input**:

```css
/* builder defaults, for reference: this is what you are overriding */
.breakdance-woocommerce .quantity { position: relative; max-width: 85px; width: 100%; align-self: stretch; }   /* 75px under 768px */
.breakdance-woocommerce .quantity input { appearance: textfield; text-align: center; height: 100%; }
.bde-quantity-button { position: absolute; top: 50%; bottom: 5px; transform: translateY(-50%); font-size: 10px; color: #6b7280; padding: 2px 6px; border-radius: 4px; background: transparent; border: none; }
.bde-quantity-button--dec { left: 5px; }
.bde-quantity-button--inc { right: 5px; }
.bde-quantity-button:hover { background: #f5f5f5; }
```

Styling the buttons as flex children (a width, a background, a border) without undoing `position: absolute`, `top`, `bottom`, `left`, `right` and `transform: translateY(-50%)` produces the classic broken stepper: two floating boxes hanging above the field, the number overlapping them, the whole thing clamped to 85px. So **every variant starts with the reset below**, which puts the three parts back in normal flex flow. Then the variant only has to say what the design looks like.

## Reset (paste once, before any variant)

```css
.qs .quantity { position: relative; display: inline-flex; align-items: stretch; width: auto; max-width: none; margin: 0; }
.qs .quantity--hidden { display: none; }
.qs .quantity input.qty { width: 3.25em; min-width: 0; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: inherit; text-align: center; font: inherit; -moz-appearance: textfield; appearance: textfield; }
.qs .quantity input.qty::-webkit-outer-spin-button, .qs .quantity input.qty::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.qs .quantity input.qty:focus { outline: none; }
.qs .bde-quantity-button { position: static; top: auto; right: auto; bottom: auto; left: auto; transform: none; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 44px; height: auto; margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; color: inherit; font-size: 12px; line-height: 1; cursor: pointer; transition: background .15s, color .15s, border-color .15s; }
.qs .bde-quantity-button:hover { background: transparent; color: inherit; }
.qs .bde-quantity-button:focus-visible { outline: 2px solid var(--ink); outline-offset: -2px; }
.qs .bde-quantity-button:active::before { transform: scale(.85); }
.qs .bde-quantity-button::before { width: 1em; height: 1em; transition: transform .1s; }
```

Rules of thumb that apply to all eight:

- Height matches the add-to-cart button beside it (48px desktop, 56px on a mobile-first store) and the input is 44 to 56px wide: a two-digit quantity must never clip.
- The tap targets are the buttons, so keep them at least 40px in both directions on touch layouts even when the visual glyph is 12px.
- Icon size is `font-size` on `.bde-quantity-button`; icon colour is `color`. Do not add `content` text: the glyph is already there.
- Keep `.quantity--hidden { display: none }`: products sold singly render that modifier and the field must vanish.
- Never set the same property through the cart button element's Quantity design controls and through these classes; pick the class route for a designed stepper.

## Quantity 1: boxed group with dividers

Use when: the default for most stores; matches bordered inputs and square-cornered buttons.

```css
.qs-1 .quantity { height: 48px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); overflow: hidden; }
.qs-1 .quantity:focus-within { border-color: var(--ink); }
.qs-1 .quantity input.qty { width: 52px; font: 500 16px/1 var(--font-body); }
.qs-1 .bde-quantity-button { width: 44px; color: var(--ink); }
.qs-1 .bde-quantity-button--dec { border-right: 1px solid var(--line); }
.qs-1 .bde-quantity-button--inc { border-left: 1px solid var(--line); }
.qs-1 .bde-quantity-button:hover { background: var(--surface-alt); }
```

## Quantity 2: pill

Use when: the buy button is a pill; the round hover discs read as tappable on phones.

```css
.qs-2 .quantity { height: 48px; padding: 0 4px; align-items: center; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface); }
.qs-2 .quantity:focus-within { border-color: var(--ink); }
.qs-2 .quantity input.qty { width: 44px; font: 500 16px/1 var(--font-body); }
.qs-2 .bde-quantity-button { width: 38px; height: 38px; border-radius: 50%; color: var(--ink); }
.qs-2 .bde-quantity-button:hover { background: var(--surface-alt); }
```

## Quantity 3: filled brand ends

Use when: the stepper should carry the same weight as the CTA (single-product stores, bundles) or sit on a tinted panel.

```css
.qs-3 .quantity { height: 48px; border-radius: var(--radius); overflow: hidden; }
.qs-3 .quantity input.qty { width: 56px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--surface); font: 600 16px/1 var(--font-body); }
.qs-3 .bde-quantity-button { width: 48px; background: var(--brand); color: var(--on-brand); font-size: 13px; }
.qs-3 .bde-quantity-button:hover { background: var(--brand-hover); color: var(--on-brand); }
.qs-3 .bde-quantity-button:focus-visible { outline-color: var(--on-brand); }
```

## Quantity 4: separate circles, underlined number

Use when: an editorial or minimalist buy box with lots of white space; the three parts float as separate controls.

```css
.qs-4 .quantity { gap: 10px; align-items: center; }
.qs-4 .quantity input.qty { width: 40px; padding: 6px 0; border-bottom: 1px solid var(--line); font: 500 18px/1 var(--font-body); }
.qs-4 .quantity input.qty:focus { border-bottom-color: var(--ink); }
.qs-4 .bde-quantity-button { width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); font-size: 11px; }
.qs-4 .bde-quantity-button:hover { border-color: var(--ink); }
```

## Quantity 5: compact, for cart rows and the mini cart

Use when: the stepper sits in a table cell or a drawer line item and must stay quiet next to prices. Scope it on the cart wrapper (`.cart-page`, the mini cart class) so the product page keeps its larger one.

```css
.qs-5 .quantity { height: 36px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); overflow: hidden; }
.qs-5 .quantity input.qty { width: 40px; font: 500 14px/1 var(--font-body); }
.qs-5 .bde-quantity-button { width: 32px; color: var(--ink-muted); font-size: 10px; }
.qs-5 .bde-quantity-button:hover { color: var(--ink); background: var(--surface-alt); }
```

In the cart table WooCommerce's mobile restack puts `td.product-quantity` on its own row; the compact size still fits beside the line total. The mini cart's own rules add vertical padding to the input (`.bde-mini-cart-quantity .quantity input`); the reset's `padding: 0` on `.qs .quantity input.qty` is more specific and wins.

## Quantity 6: full-width row with a label (mobile-first)

Use when: the buy box stacks (Buy-box example "Pill button, full-width, quantity below"); the stepper becomes a labelled row above the button, 56px tall, buttons big enough for thumbs. The label is a pseudo-element on `.quantity`, so it needs no markup.

```css
.qs-6 .quantity { flex: 1 1 100%; width: 100%; height: 56px; align-items: center; padding: 0 6px 0 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.qs-6 .quantity::before { content: "Qty"; margin-right: auto; font: 500 13px/1 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
.qs-6 .quantity input.qty { width: 56px; font: 600 18px/1 var(--font-body); }
.qs-6 .bde-quantity-button { width: 44px; height: 44px; border-radius: 8px; background: var(--surface-alt); color: var(--ink); font-size: 13px; }
.qs-6 .bde-quantity-button:hover { background: var(--line); }
```

Translate "Qty" when the store is not in English: it is CSS text, so set it per site, not per product.

## Quantity 7: dark

Use when: the buy box or the cart drawer sits on a dark band; the stepper inverts and the buttons glow on hover.

```css
.qs-7 .quantity { height: 48px; border-radius: var(--radius); background: var(--ink); color: #fff; overflow: hidden; }
.qs-7 .quantity input.qty { width: 52px; color: #fff; font: 500 16px/1 var(--font-body); }
.qs-7 .bde-quantity-button { width: 44px; color: rgba(255, 255, 255, .78); }
.qs-7 .bde-quantity-button:hover { color: #fff; background: rgba(255, 255, 255, .12); }
.qs-7 .bde-quantity-button:focus-visible { outline-color: #fff; }
```

## Quantity 8: hairline, borderless

Use when: a fashion or design store where the buy box is typographic; the number sits on a single underline and the icons are 1.5px lines drawn in CSS instead of the builder's bold mask.

```css
.qs-8 .quantity { height: 44px; align-items: center; border-bottom: 1px solid var(--ink); }
.qs-8 .quantity input.qty { width: 44px; font: 400 18px/1 var(--font-display); }
.qs-8 .bde-quantity-button { width: 36px; height: 36px; color: var(--ink); }
.qs-8 .bde-quantity-button:hover { color: var(--ink-muted); }
.qs-8 .bde-quantity-button::before { -webkit-mask-image: none; mask-image: none; width: 12px; height: 12px; background: linear-gradient(currentColor, currentColor) center / 12px 1.5px no-repeat; }
.qs-8 .bde-quantity-button--inc::before { background: linear-gradient(currentColor, currentColor) center / 12px 1.5px no-repeat, linear-gradient(currentColor, currentColor) center / 1.5px 12px no-repeat; }
```

The same two `::before` rules swap the icons on any other variant.

## Where the wrapper class goes

- **Product page**: on the `bd-woo="add-to-cart"` marker (`<div bd-woo="add-to-cart" class="pdp-cta qs qs-1"></div>`), so the rules read `.pdp-cta .quantity …` in your stylesheet. The Buy-box examples in **woocommerce-product-page** already use `.pdp-cta`.
- **Cart page**: on the cart element or the container around it; the rules then apply to every `td.product-quantity .quantity`.
- **Mini cart**: on the `bd-woo="mini-cart"` marker; its panel line items carry the same markup.
- **Grouped products**: the table cells use it too; the grouped table's own `max-width: 135px` on `.quantity` is overridden by the reset.

Verify with `preview-element` on the cart button (product page) or `preview-post` (cart), then check the three states in a browser: initial, after a click, and a two-digit value typed in.
