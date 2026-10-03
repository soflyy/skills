---
name: woocommerce-filters
description: Design and build WooCommerce product filtering with the Oxygen 6 or Breakdance builder - the Faceted Filters element in a sidebar, as a top bar, or behind a mobile drawer, with price sliders, checkbox lists, attribute swatches, rating stars, stock status, active-filter chips and a clear button, restyled from WooCommerce's block markup and wired for no-reload filtering. Use when the user says "filters", "faceted search", "filter by price", "filter sidebar", "refine", "shop filters", "filter by colour or size", or the shop needs to narrow a catalog.
---

# Faceted filters

`EssentialElements\Woofacetedfilters` ("Faceted Filters", WooCommerce category, Pro, requires WooCommerce) wraps WooCommerce's block-based Product Filters so they work on a Breakdance or Oxygen 6 shop template. It is a final element: no children, and its own design surface is only `design.spacing.container`. Everything else is content toggles plus CSS on WooCommerce's block markup.

How it filters: the filter UI writes its state into URL query parameters (`min_price`, `max_price`, `rating_filter`, `filter_<attribute>` and friends), and `WC_Query` applies those to the archive's main query. So any Breakdance loop that inherits the main query filters correctly, and a loop with its own custom query does not. That is the first thing to check when filters "do nothing".

Before building: `get-instructions`, `get-ecommerce-instructions`, and the shop archive skill for the grid the filters sit beside. Finished designs, four placements plus the swatch and rating restyles with the variables and internals CSS included, are in the **patterns** skill, `filters.md`.

## Turning filters on

```jsonc
// insert into the aside you built in HTML, then set the filters
{ "post_id": 244, "operations": [ { "op": "update", "payload": { "element_id": 18, "properties": { "content": { "filters": {
  "active": true, "price": true, "status": true, "rating": false, "category": true, "tag": false, "instant": true,
  "attributes": [ { "attribute": "1" }, { "attribute": "2" } ] } } } } } ] }
```

Every key under `content.filters` is a toggle except `attributes`, which is a repeater. Defaults: `active`, `price`, `status`, `category` and `instant` on; `rating` and `tag` off.

`attributes` rows take the WooCommerce **attribute id as a string**, not the `pa_` taxonomy slug: the control is a dropdown built from `wc_get_attribute_taxonomies()`, so read the real values with `get-dropdown-options` (or the element schema) for that site and never guess. An empty or unknown id renders nothing.

Heading text is fixed. The element labels the filters Price, Status, Rating, Categories and Tags, and an attribute filter takes the attribute's own name. Change them with a translation, or say so when a user asks for different wording.

## Instant (no-reload) filtering

Leave `instant: true` on, and mark the grid element as an Interactivity Router region. WooCommerce disables client-side navigation on classic-theme product archives on the assumption that a PHP loop has no region to swap; the element turns it back on, so the grid has to be one. On the native `bd-woo="shop"` element (the default) or on a `bd-loop="products"` container alike:

```html
<div bd-woo="shop" class="shop-grid" data-wp-interactive="store/shop-loop" data-wp-router-region="shop-grid"></div>
```

Any unique namespace and id work; the converter keeps both as the element's custom attributes, or set them later through `settings.advanced.attributes` with `edit-post`. Without them filtering still works, with a full page reload each time. The filters block sets its own router region, so you never add one to the element itself.

## The markup you are styling

The element is a plain `div.bde-woo-faceted-filters.breakdance-woocommerce` around WooCommerce's blocks. Under it:

| Selector | What it is |
| --- | --- |
| `.wc-block-product-filters` | The filters wrapper. `display: inline-flex` by default, so in a sidebar give it `display: block` or a column flex with `width: 100%`. |
| `.wc-block-product-filters__content` | The desktop stack of filter groups. Gap comes from `--wc-product-filter-block-spacing`. |
| `h3.wp-block-heading` | The heading above each filter group. |
| `.wc-block-product-filter-checkbox-list` | Category, tag, attribute, status and rating lists. Its `fieldset` is `display: contents`, so the layout parent is `__items`. |
| `.wc-block-product-filter-checkbox-list__items` / `__item` / `__label` | Rows. Set the row gap on `__items`. |
| `__input-wrapper` / `input.…__input` / `svg.…__mark` | The checkbox: a real `appearance: none` input 1em square, a tinted `::before` behind it, and the tick as an SVG shown when the input is `:checked`. |
| `__text-wrapper` / `__text` / `__count` | Label and the `(12)` count. `__text` is `display: contents`, so it cannot take a box of its own. |
| `__color-swatch` (`.is-empty`) | A round swatch, only for attributes with visual swatches configured. |
| `__stars` / `__stars-svg` | The rating rows. |
| `__show-more` / `__show-more-button` | The "show more" control on long lists. |
| `.wc-block-product-filter-price-slider` | Price. `__content` is a grid (`__content--inline` when the inputs sit beside the track), `__left` / `__right` hold `input.min` / `input.max`, `__range` holds `.range-bar` and two `input[type="range"]`. |
| `.wc-block-product-filter-removable-chips__items` / `__item` / `__label` / `__remove` | The active-filter chips. |
| `.wp-block-woocommerce-product-filter-clear-button` and its `.wp-block-button__link` | The clear button, rendered as a `<button>`. |

Everything in the filter UI is sized in `em`, so setting `font-size` on a group scales the whole control proportionally. That is usually a better first move than restyling the parts.

## Theme it with the variables first

WooCommerce reads these custom properties; set them on the element's wrapper and most of a design is done without touching a single part. The element never sets them itself, so they are yours:

```css
.shop-filters .wc-block-product-filters {
  --wc-product-filters-background-color: var(--surface);
  --wc-product-filters-text-color: var(--ink);
  --wc-product-filter-block-spacing: 28px;
  --wc-product-filter-checkbox-list-option-element: var(--surface);          /* checkbox background */
  --wc-product-filter-checkbox-list-option-element-border: var(--line);
  --wc-product-filter-checkbox-list-option-element-selected: var(--ink);     /* the tick */
  --wc-product-filter-checkbox-list-label-element: var(--ink);
  --wc-product-filter-price-slider: var(--ink);                              /* the filled track */
  --wc-product-filter-price-slider-handle: var(--surface);
  --wc-product-filter-price-slider-handle-border: var(--ink);
  --wc-product-filter-removable-chips-background: var(--surface-alt);
  --wc-product-filter-removable-chips-border: var(--line);
  --wc-product-filter-removable-chips-text: var(--ink);
}
```

The overlay has its own pair, `--wc-product-filters-overlay-background-color` and `--wc-product-filters-overlay-text-color`, which win over the two general ones inside the drawer.

## The mobile drawer is already built

Do not hand-build a "Filter" button that toggles a class on your aside. WooCommerce ships the drawer and the element leaves it on: below the overlay breakpoint the filters collapse to a `.wc-block-product-filters__open-overlay` button, and opening it shows `__overlay` > `__overlay-wrapper` > `__overlay-dialog` with a `__overlay-header` (close button), `__overlay-content` (your filters) and an `__overlay-footer` holding the `__apply` button. Above the breakpoint WooCommerce prints a media query that hides the button, header and footer and lays the filters out inline.

Two things to know about it.

**The breakpoint is 782px** unless the theme's `theme.json` sets `settings.viewport.tablet` or `mobile`. You do not control it from the element, so your sidebar column has to collapse at the same width or you get a 260px column holding one button.

**Its padding comes from `--wp--preset--spacing--30`**, a block-theme preset. On a classic theme that variable is usually undefined, the padding declarations become invalid, and the drawer's header, content and footer end up flush against the edges. Fix it in one line rather than restyling three parts:

```css
.shop-filters .wc-block-product-filters { --wp--preset--spacing--30: 20px; }
```

## Specificity here is the opposite of the rest of WooCommerce

The filter stylesheet wraps almost everything in `:where(.wc-block-product-filters)`, which contributes nothing, so its rules are only as specific as the class that follows. A single class of your own is usually enough and deep override chains are wasted effort.

The one deliberate exception is `.wc-block-product-filter--hidden { display: none }`, written at normal specificity precisely so it can hide things. The active-filters block gets that class (and the `hidden` attribute) whenever nothing is selected. So never give the active block an unconditional `display: flex` or `grid`: it will out-rank the hidden rule and you will ship an empty chip bar on every unfiltered page view. Style it with properties that do not resurrect it, or re-assert the hidden rule:

```css
.shop-filters .wc-block-product-filter-active { display: flex; flex-wrap: wrap; gap: 8px; }
.shop-filters .wc-block-product-filter-active.wc-block-product-filter--hidden { display: none; }
```

The clear button has the same shape from the other direction: it renders nothing at all until a filter is active, so a rule that reserves space for it leaves a gap on a clean page.

## What you cannot do with this element

Say so plainly rather than faking it: no search-in-filter box, no "in stock only" single switch (stock status is a checkbox list), no filter counts you can reposition into the label, no custom heading text, no reordering the filter groups (they render in the element's own order: active, price, status, rating, categories, tags, then attributes in repeater order), and no control over the overlay breakpoint or the Apply button label. Attribute swatches show colour only when the attribute is configured with visual swatches in WooCommerce.

For anything beyond that the honest answers are FacetWP or WP Grid Builder, which the user installs and licenses and which have their own elements (`EssentialElements\FacetWP_Facet`, `EssentialElements\GridbuilderWP_Facet`). Never build fake filter checkboxes that do nothing.

## Verify

`preview-post` on the shop template with a real product archive context, then check four things: the loop has no custom query, one filter click changes the product count, the active chips appear and clear, and the page below 782px shows the drawer button rather than a squeezed column.

## Common failures

- Filters change the URL but not the grid: the loop has its own query instead of inheriting the main query.
- Filtering reloads the whole page: `instant` is off, or the loop is missing `data-wp-router-region`.
- An empty chip bar on an unfiltered page: a `display` rule beat `.wc-block-product-filter--hidden`.
- The drawer's contents touch the edges: `--wp--preset--spacing--30` is undefined on a classic theme.
- An attribute filter renders nothing: the repeater row holds a `pa_` slug instead of the attribute id.
- The filter column is narrower than its box: `.wc-block-product-filters` is still `inline-flex`.
- Nothing renders and the builder shows "No filters enabled": every toggle under `content.filters` is off.
