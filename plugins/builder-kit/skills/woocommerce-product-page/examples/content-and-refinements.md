# Below-the-fold content and edit-post refinements

## Accordion (default for the tabs marker)

```jsonc
// tabs element: first item open, one at a time, renamed, review form modal with a custom label
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 22, "properties": {
  "design": { "layout": { "layout": "accordion" }, "accordion": { "accordion": true, "first_item_opened": true, "spacing": { "between_items": { "number": 0, "unit": "px", "style": "0px" }, "below_item": { "number": 20, "unit": "px", "style": "20px" } } } },
  "content": { "tabs": { "description": { "title": "Description" }, "additional_information": { "title": "Details & care" }, "reviews": { "title": "Reviews" } }, "form": { "open_in_modal": true, "button_text": "Write a review" } } } } } ] }
```

```css
.pdp-tabs { border-top: 1px solid var(--line); }
```

The accordion markup is the builder's own: `.bde-accordion__content-wrapper` per item (carrying `data-tab-id="description|additional_information|reviews"`), `h3.bde-accordion__title-tag > button.bde-accordion__button` with `aria-expanded`, `.bde-accordion__title`, the two state icons `.bde-accordion__icon--default` / `--active`, and `.bde-accordion__panel > .bde-accordion__panel-content`. Style those, not WooCommerce's classes.

## Horizontal tab bar

The tab bar has a full design surface on the element. Use it: almost everything a tab bar needs is a control, and a class rule that sets the same property makes the control look dead.

```jsonc
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 22, "properties": { "design": {
  "layout": { "layout": "tabs" },
  "tabs": {
    "style": "tabs",
    "position": "flex-start",
    "space_between": { "number": 32, "unit": "px", "style": "32px" },
    "space_after": { "number": 24, "unit": "px", "style": "24px" },
    "text": { "hover": { "color": "#16181d" }, "active": { "color": "#16181d" } },
    "underline": { "active": { "color": "#16181d" }, "width": { "number": 2, "unit": "px", "style": "2px" } },
    "padding": { "vertical": { "number": 12, "unit": "px", "style": "12px" }, "horizontal": { "number": 0, "unit": "px", "style": "0px" } },
    "responsive": { "show_as_dropdown": true, "visible_at": "breakpoint_phone_portrait" }
  } } } } } ] }
```

`design.tabs` is where the bar lives, and it is easy to miss because the element's own file only names a preset section. What it holds:

| Path under `design.tabs` | What it does |
| --- | --- |
| `style` | `tabs` (underlined), `pills`, `bar`. Decides which of the sub-sections below apply: `underline` is ignored for pills, `bar` for anything but `bar`. |
| `position` | `flex-start`, `center`, `flex-end`, `inherit` (full width). Horizontal bars only. |
| `vertical` + `tabs_width` + `position_vertical` + `horizontal_at` | Turns the bar into a rail on the `left` or `right` and picks the breakpoint where it goes back to horizontal. |
| `space_between`, `space_after` | Gap between tabs, gap under the bar. `space_between` is ignored at `position: inherit` and for the `bar` style. |
| `text.typography`, `text.hover`, `text.active` | The label font, and the two state colours. |
| `background.inactive`, `.hover`, `.active` | Tab backgrounds. |
| `underline.hover`, `.active`, `.width`, `.radius` | The indicator, for the `tabs` and `bar` styles. |
| `bar.separator`, `.radius`, `.shadow`, `pill_radius`, `separator.color`, `separator.width` | The container chrome per style. |
| `padding.vertical`, `.horizontal` | Inside each tab. |
| `icon.size`, `icon.nudge.nudge_x`, `.nudge_y`, `icon.after_icon` | The optional per-tab icon set through `content.tabs.<key>.icon`. |
| `responsive.show_as_dropdown`, `.visible_at`, `.dropdown_styles.*`, `.show_affordance`, `.affordance_color` | Below `visible_at` the bar becomes a `<select>`; without it the bar scrolls sideways. |
| `transition_effect` | Panel transition. |

Unit controls take `{ "number": 32, "unit": "px", "style": "32px" }` and colour controls take `{ "color": "#16181d" }`; read the exact shapes with `get-element-schemas` before sending them.

For anything the controls do not cover, the rendered markup is the builder's, not WooCommerce's. The element removes WooCommerce's own tabs entirely, so `ul.wc-tabs`, `li.active` and `.woocommerce-Tabs-panel` do not exist on the page:

```css
/* the real class map, from .bde-tabs down */
.pdp-tabs .bde-tabs__tabslist { /* the tab bar; modifier --tabs / --pills / --bar follows design.tabs.style */ }
.pdp-tabs .bde-tabs__tab { /* each tab, a <button role="tab"> */ }
.pdp-tabs .bde-tabs__tab[aria-selected="true"] { /* the active tab: aria-selected, not a class */ }
.pdp-tabs .bde-tabs__tab-title, .pdp-tabs .bde-tabs__tab-icon { }
.pdp-tabs .bde-tabs-content-container .bde-tabs__panel { }
.pdp-tabs .bde-tabs__panel-content { font: 16px/1.7 var(--font-body); }
```

The active tab is marked with `aria-selected="true"` by the element's script, so there is no `.is-active` class to hang CSS on. The tab bar container also carries `.is-horizontal` or `.is-vertical` and `--scrollable` or `--dropdown` from the responsive setting.

## Description + specs as plain sections (no tabs)

```html
<div class="pdp-details">
  <section class="pdp-block"><h2 class="pdp-h2">About this piece</h2><div bd-woo="description" class="pdp-desc"></div></section>
  <section class="pdp-block"><h2 class="pdp-h2">Details</h2><div bd-woo="additional-info" class="pdp-specs"></div></section>
</div>
<style>
  .pdp-details { display: grid; gap: 48px; margin-top: 64px; max-width: 880px; }
  .pdp-h2 { font: 600 24px/1.2 var(--font-display); margin: 0 0 16px; }
  .pdp-desc { font: 16px/1.7 var(--font-body); }
  .pdp-desc p { margin: 0 0 1em; }
  .pdp-desc img { max-width: 100%; height: auto; border-radius: var(--radius); }
  .pdp-specs table { width: 100%; border-collapse: collapse; font: 14px/1.5 var(--font-body); }
  .pdp-specs th { text-align: left; color: var(--ink-muted); font-weight: 500; padding: 10px 0; border-bottom: 1px solid var(--line); width: 40%; }
  .pdp-specs td { padding: 10px 0; border-bottom: 1px solid var(--line); }
</style>
```

```jsonc
// Product Info: no heading, no extra separators (ours draw the lines)
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 26, "properties": { "design": { "style": { "hide_heading": true, "hide_separators": true } } } } } ] }
```

## Reviews as a section with a grid

```html
<section class="pdp-reviews-wrap" id="reviews">
  <div class="container">
    <div class="section-head"><h2 class="section-title">What customers say</h2></div>
    <div bd-woo="reviews" class="pdp-reviews"></div>
  </div>
</section>
```

```jsonc
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 28, "properties": {
  "design": { "reviews": { "layout": { "layout": "grid", "items_per_row": 3, "gap": { "number": 24, "unit": "px", "style": "24px" } }, "stars": { "color": "#f5a524" }, "avatar": { "size": { "number": 40, "unit": "px", "style": "40px" }, "radius": { "number": 999, "unit": "px", "style": "999px" } }, "separator": { "disable": true } }, "review_item": { "background": "#f6f7f8" }, "typography": { "hide_heading": true } },
  "content": { "form": { "open_in_modal": true, "button_text": "Write a review" } } } } } ] }
```

```css
.pdp-reviews-wrap { margin-top: 80px; padding-block: 64px; background: var(--surface-alt); }
.pdp-reviews .comment_container { padding: 20px; border-radius: var(--radius); }
.pdp-reviews .woocommerce-review__author { font: 600 15px/1.2 var(--font-body); }
.pdp-reviews .woocommerce-review__published-date { font: 13px/1.2 var(--font-body); color: var(--ink-muted); }
.pdp-reviews .description { font: 15px/1.6 var(--font-body); }
```

Link the rating under the title to it: wrap the rating marker in `<a class="pdp-rating-link" href="#reviews">`.

## Gallery thumbnails: count, gap, size

```jsonc
// thumbs Swiper: 5 per view, 10px gap, medium images
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 8, "properties": { "content": { "general": { "slidesPerView": 5, "spaceBetween": 10 }, "slides": { "image_size": "medium" } } } } } ] }

// main gallery: zoom ratio, hide arrows, show dots
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 7, "properties": { "content": { "zoom": { "enabled": true, "maxRatio": 2.5, "toggle": true, "panOnMouseMove": true }, "navigation": { "enabled": false }, "pagination": { "enabled": true } } } } } ] }
```

Verify each path with `get-element-schemas` on `EssentialElements\Swiper` (`paths: ["content.general", "content.zoom", "content.navigation", "content.pagination"]`).

## Related and upsell rows

```jsonc
// related: 4 products, newest first, no default heading (we render our own)
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 30, "properties": { "content": { "content": { "product_count": 4, "order_by": "date", "order": "DESC" } }, "design": { "title": { "disable": true } } } } } ] }
```

```html
<section class="pdp-related"><div class="container">
  <div class="section-head"><h2 class="section-title">You may also like</h2><a class="btn btn--secondary" href="/shop/">Shop all</a></div>
  <div bd-woo="related-products" class="pdp-related-grid"></div>
</div></section>
<style>
  .pdp-related-grid ul.products { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
  .pdp-related-grid li.product { display: flex; flex-direction: column; gap: 10px; }
  .pdp-related-grid li.product img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: var(--radius); }   /* square: WooCommerce's thumbnail crop */
  .pdp-related-grid .woocommerce-loop-product__title { font: 500 15px/1.3 var(--font-body); color: var(--ink); margin: 0; }
  .pdp-related-grid .price { font: 600 15px/1.2 var(--font-body); }
  .pdp-related-grid a.button { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; border-radius: var(--radius); background: transparent; color: var(--ink); border: 1px solid var(--line); font: 600 13px/1 var(--font-body); text-decoration: none; }
  .pdp-related-grid span.onsale { position: absolute; top: 12px; left: 12px; }
  @media (max-width: 767px) { .pdp-related-grid ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } }
</style>
```

If the store wants the related row to use the exact same card as the shop, replace the marker with a `bd-loop="products"` and `bd-query='{"source":"related","includeByTaxonomies":["product_cat"],"postsPerPage":4}'` (a single template is not an archive, so knobs apply).

## Size guide and shipping popups

Use the builder's popups (see `get-instructions`, "Popups"): create the popup, build its content with `html-to-page`, then add a `<button class="pdp-sizeguide">Size guide</button>` next to the variations and bind it with `set-element-interactions` (`click` → `control_popup` with the popup's id and `open`). No inline JS, no `<a href="#">` hacks.

## Breadcrumb delimiter and meta layout

```jsonc
{ "post_id": 231, "operations": [
  { "op": "update", "payload": { "element_id": 5, "properties": { "design": { "typography": { "delimiter": "  /  " } } } } },
  { "op": "update", "payload": { "element_id": 21, "properties": { "design": { "container": { "layout": "inline", "divider": true, "divider_color": "#e4e6ea" } } } } }
] }
```

## Hiding a part on some products with a display condition

Hide the "Details" specs section on products in a category that has no attributes:

```jsonc
{ "post_id": 231, "element_id": 26, "rule_groups": [[ { "ruleSlug": "woocommerce-product-categories", "operand": "is none of", "value": ["{\"taxonomySlug\":\"product_cat\",\"termId\":42}"] } ]] }
```

Copy the exact value string from `get-element-conditions`.
