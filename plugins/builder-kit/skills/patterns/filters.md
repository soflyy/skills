# Faceted filter patterns

Four placements and a set of part restyles. Paste the shared block once, then one placement, then whichever parts you want. Every rule is scoped under `.shop-filters`, the class on the aside or bar you author in HTML; the element goes inside it with `edit-post`.

## Shared: variables and internals

```css
/* the wrapper is the element's own div; the block wrapper inside it needs the width back */
.shop-filters .wc-block-product-filters { display: block; width: 100%;
  --wc-product-filters-background-color: var(--surface);
  --wc-product-filters-text-color: var(--ink);
  --wc-product-filter-block-spacing: 28px;
  --wc-product-filter-checkbox-list-option-element: var(--surface);
  --wc-product-filter-checkbox-list-option-element-border: var(--line);
  --wc-product-filter-checkbox-list-option-element-selected: var(--ink);
  --wc-product-filter-checkbox-list-label-element: var(--ink);
  --wc-product-filter-price-slider: var(--ink);
  --wc-product-filter-price-slider-handle: var(--surface);
  --wc-product-filter-price-slider-handle-border: var(--ink);
  --wc-product-filter-removable-chips-background: var(--surface-alt);
  --wc-product-filter-removable-chips-border: var(--line);
  --wc-product-filter-removable-chips-text: var(--ink);
  /* block-theme preset the drawer's padding depends on; undefined on a classic theme */
  --wp--preset--spacing--30: 20px;
}
.shop-filters .wc-block-product-filters__content { gap: 28px; }
/* group headings */
.shop-filters h3.wp-block-heading { margin: 0 0 12px; font: 600 13px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
/* rows: the fieldset is display:contents, so the gap belongs on __items */
.shop-filters .wc-block-product-filter-checkbox-list__items { display: grid; gap: 10px; }
.shop-filters .wc-block-product-filter-checkbox-list__label { gap: 10px; font: 15px/1.3 var(--font-body); cursor: pointer; }
.shop-filters .wc-block-product-filter-checkbox-list__input { border-radius: 4px; }
.shop-filters .wc-block-product-filter-checkbox-list__count { color: var(--ink-muted); font-size: .85em; }
.shop-filters .wc-block-product-filter-checkbox-list__show-more-button { color: var(--ink); font-weight: 600; }
/* price */
.shop-filters .wc-block-product-filter-price-slider__left input, .shop-filters .wc-block-product-filter-price-slider__right input { width: 100%; min-height: 40px; padding: 0 10px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); font: 14px/1 var(--font-body); }
.shop-filters .wc-block-product-filter-price-slider__range { margin: 18px 0 14px; }
/* active chips: never give this an unconditional display, the hidden rule has to win when nothing is selected */
.shop-filters .wc-block-product-filter-removable-chips__items { gap: 8px; }
.shop-filters .wc-block-product-filter-removable-chips__item { border-radius: var(--radius-pill); padding: .35em .5em .35em .9em; font: 500 13px/1 var(--font-body); }
.shop-filters .wc-block-product-filter-removable-chips__remove-icon { width: 18px; height: 18px; }
.shop-filters .wp-block-woocommerce-product-filter-clear-button .wp-block-button__link { padding: 0; border: 0; background: transparent; color: var(--ink-muted); font: 500 13px/1 var(--font-body); text-decoration: underline; cursor: pointer; }
.shop-filters .wp-block-woocommerce-product-filter-clear-button .wp-block-button__link:hover { color: var(--ink); }
```

## Filters 1: Sidebar, hairline groups (the default)

Use when: the catalog has more than about 40 products and three or more filter groups. The classic shop layout and the one customers expect.

```html
<section class="shop store">
  <div class="container shop-body">
    <aside class="shop-filters"></aside>
    <div bd-woo="shop" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid"></div>
  </div>
</section>
<style>
  .shop-body { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 48px; align-items: start; }
  .shop-filters { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); }
  /* a hairline between groups reads as structure without boxing anything */
  .shop-filters .wc-block-product-filters__content > * + * { padding-top: 28px; border-top: 1px solid var(--line); }
  @media (max-width: 782px) {
    .shop-body { grid-template-columns: minmax(0, 1fr); gap: 20px; }
    .shop-filters { position: static; }
  }
</style>
```

The media query matches WooCommerce's own overlay breakpoint on purpose: at the same width the filters become the drawer button, so the column has to stop being a column at exactly that point or you get a 260px box holding one button.

## Filters 2: Sidebar, boxed groups

Use when: the page is busy (banners, sorting bar, badges) and the filters need to read as one panel.

```css
.shop-filters .wc-block-product-filters__content > * { padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.shop-filters .wc-block-product-filters__content { gap: 12px; }
.shop-filters h3.wp-block-heading { margin-bottom: 14px; font-size: 14px; letter-spacing: 0; text-transform: none; color: var(--ink); }
/* the active block is one of those children: keep it hidden when nothing is selected */
.shop-filters .wc-block-product-filter-active.wc-block-product-filter--hidden { display: none; }
```

## Filters 3: Filter bar above the grid

Use when: two or three filters, a wide grid, or a category page where a sidebar would waste the width. The groups sit in a row and the chips run underneath.

```css
.shop-filters { padding: 16px 0 20px; border-bottom: 1px solid var(--line); margin-bottom: 32px; }
.shop-filters .wc-block-product-filters__content { flex-direction: row; flex-wrap: wrap; align-items: start; gap: 12px 40px; }
.shop-filters .wc-block-product-filters__content > * { flex: 0 1 auto; min-width: 180px; }
/* the active chips take the whole second row */
.shop-filters .wc-block-product-filter-active { flex-basis: 100%; }
.shop-filters .wc-block-product-filter-active.wc-block-product-filter--hidden { display: none; }
.shop-filters .wc-block-product-filter-checkbox-list__items { grid-auto-flow: column; grid-template-columns: none; gap: 16px; }
.shop-filters h3.wp-block-heading { margin-bottom: 8px; }
```

A row of checkbox lists only works for short lists. Past about five options per group the row gets tall and unbalanced; use design 1 or 4 instead.

## Filters 4: Drawer on every width

Use when: the grid should own the full page (editorial shops, small catalogs, phone-first stores). WooCommerce's overlay already exists; this design just stops hiding it on desktop.

```css
/* the responsive CSS WooCommerce prints is :where()-wrapped and matches on .is-mobile-overlay,
   so one class of your own re-hides the inline layout above the breakpoint */
.shop-filters .wc-block-product-filters.is-mobile-overlay .wc-block-product-filters__open-overlay { display: inline-flex; }
.shop-filters .wc-block-product-filters.is-mobile-overlay .wc-block-product-filters__overlay { position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0; z-index: 9999; }
.shop-filters .wc-block-product-filters__open-overlay { min-height: 44px; padding: 0 18px; border: 1px solid var(--line); border-radius: var(--radius-pill); font: 600 14px/1 var(--font-body); }
.shop-filters .wc-block-product-filters__open-overlay:hover { border-color: var(--ink); }
.shop-filters .wc-block-product-filters__overlay-dialog { width: min(100%, 420px); }
.shop-filters .wc-block-product-filters__apply { min-height: 48px; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 15px/1 var(--font-body); }
```

Preview this one before shipping it: you are overriding WooCommerce's own responsive block, and its rules are generated from the theme's viewport settings rather than written into the stylesheet you can read.

## Attribute swatches as colour chips

Use when: the store sells in colours and the attribute is configured with visual swatches in WooCommerce. Without swatch configuration every swatch renders with the `is-empty` diagonal and this design is worse than the plain list, so check the attribute first.

```css
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__items { display: flex; flex-wrap: wrap; gap: 10px; }
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__label { gap: 0; }
/* hide the checkbox itself and let the swatch carry the state */
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__input-wrapper { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__color-swatch { width: 32px; height: 32px; margin: 0; border: 2px solid transparent; box-shadow: 0 0 0 1px var(--line); }
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__label:has(:checked) .wc-block-product-filter-checkbox-list__color-swatch { border-color: var(--surface); box-shadow: 0 0 0 2px var(--ink); }
.shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__text, .shop-filters .wc-block-product-filter-attribute .wc-block-product-filter-checkbox-list__count { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
```

The label text is only visually hidden, never removed: the input keeps its `aria-label` and the swatch stays reachable by keyboard because the input is still in the document.

## Rating rows as stars only

```css
.shop-filters .wc-block-product-filter-rating .wc-block-product-filter-checkbox-list__stars { color: var(--accent); }
.shop-filters .wc-block-product-filter-rating .wc-block-product-filter-checkbox-list__items { gap: 6px; }
.shop-filters .wc-block-product-filter-rating .wc-block-product-filter-checkbox-list__label { padding: 4px 0; }
```

WooCommerce renders the stars as one SVG clipped by a percentage width, so do not try to colour individual stars; `color` on `__stars` is the whole hook.
