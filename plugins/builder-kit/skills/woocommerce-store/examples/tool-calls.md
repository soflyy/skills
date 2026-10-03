# Tool call examples for a store build

Every call below is the exact shape the MCP tools accept, in the order a store build uses them. Tool names are shown without the `oxygen-` / `breakdance-` prefix. Always read the live schema (`get-element-schemas`, `get-template-conditions`, `get-element-conditions`) before sending property paths or condition values; the values here are illustrative.

## 1. Discovery

```jsonc
// site-info
{}
// → { "active_plugins": ["woocommerce/woocommerce.php", …], "shop_page_id": 12, "css_prefix": "", "modern_normalize_enabled": false, "woocommerce_styles_mode": "enabled", … }

// search-posts: products, to learn the catalog and pick preview products
{ "post_type": "product", "per_page": 20 }
// → note one simple, one variable, one on sale, one out of stock

// search-posts: existing templates
{ "post_type": "oxygen_template", "per_page": 50 }
{ "post_type": "oxygen_header", "per_page": 10 }

// get-template-conditions for the template post type
{ "post_type": "oxygen_template" }
// → templateTypes includes { "slug": "all-product-archives" }, { "slug": "specific-product-archive" }, { "slug": "product" }
//   conditions includes { "slug": "product-is-taxonomy", "operands": ["is", …], "values": [ { "items": [ { "text": "Accessories", "value": "{\"taxonomySlug\":\"product_cat\",\"termId\":19}" } ] } ] }
//   each values list shows at most 10 options

// search-condition-values: the category you need is not in that list
{ "condition_slug": "product-is-taxonomy", "search": "Outerwear" }
// → { "slug": "product-is-taxonomy", "values": [ { "label": "Product categories", "items": [ { "text": "Outerwear", "value": "{\"taxonomySlug\":\"product_cat\",\"termId\":42}" } ] }, … ] }

// get-dynamic-fields
{}
// → product_title, product_price, product_regular_price, product_sale_price, product_sale, product_rating, product_stock, product_sku,
//   product_image, product_image_url, product_gallery, product_gallery_image (param image_index), product_terms (param taxonomy),
//   product_description, post_permalink, archive_title, archive_description, term_name, term_permalink, term_count,
//   woocommerce_category_image, woocommerce_category_count

// get-breakpoints
{}
// → e.g. [ { "id": "breakpoint_base" }, { "id": "breakpoint_tablet_landscape", "maxWidth": 1119 }, { "id": "breakpoint_tablet", "maxWidth": 1023 }, { "id": "breakpoint_phone_landscape", "maxWidth": 767 }, { "id": "breakpoint_phone_portrait", "maxWidth": 479 } ]
```

## 2. Design system

```jsonc
// set-settings: hand the WooCommerce design to this build (rule 2) and turn on
// the margin/padding reset. One call, because it patches only what it names.
// site-info said "enabled", and nothing is styled yet, so switch before any CSS.
{
  "woocommerce": { "styles_mode": "unstyled" },
  "advanced": { "modern_normalize_enabled": true }
}

// insert-stylesheet: tokens + base classes (the whole stylesheet in one call)
{
  "stylesheet": ":root { --brand: #1f4d3a; --brand-hover: #173d2e; --on-brand: #fff; --accent: #d98c2b; --ink: #16181d; --ink-muted: #5b6270; --line: #e4e6ea; --surface: #fff; --surface-alt: #f6f7f8; --success: #1c7c4a; --success-bg: #ecfdf3; --error: #b42318; --error-bg: #fef3f2; --info: #175cd3; --info-bg: #eff8ff; --font-display: 'Fraunces'; --font-body: 'Inter'; --radius: 10px; --radius-pill: 999px; --container: 1280px; --gutter: 24px; --card-ratio: 4 / 5; }\n.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }\n.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 12px 24px; border-radius: var(--radius); font: 600 15px/1 var(--font-body); text-decoration: none; border: 1px solid transparent; }\n.btn--primary { background: var(--brand); color: var(--on-brand); }\n.btn--primary:hover { background: var(--brand-hover); }\n.btn--secondary { background: transparent; color: var(--ink); border-color: var(--line); }\n.badge { display: inline-block; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--accent); color: #fff; font: 600 12px/1.4 var(--font-body); text-transform: uppercase; }\n.badge:empty { display: none; }"
}

// set-global-settings (Breakdance, or Oxygen 6 with a global-settings add-on). Deep-merges; send only what changes.
// These still apply in the unstyled mode, including to WooCommerce buttons, so they are worth setting either way.
{
  "settings": {
    "colors": { "text": "#16181d", "headings": "#16181d", "links": "#1f4d3a" },
    "typography": { "heading_font": "Fraunces", "body_font": "Inter" }
  }
}
// Read get-global-settings first; unit values are { number, unit, style } objects, colors are strings.

// settings.woocommerce ONLY on a store staying on "enabled". It is gone in the unstyled
// mode, where the .store class layer covers all of this instead.
{
  "settings": {
    "woocommerce": {
      "colors": { "brand": "#1f4d3a", "text": "#16181d", "headings": "#16181d", "borders": "#e4e6ea", "text_on_brand": "#ffffff" },
      "other": {
        "sale_badge": { "background": "#d98c2b", "text": "#ffffff" },
        "ratings": { "star_color": "#f5a524" },
        "product_images": { "border_radius": { "number": 10, "unit": "px", "style": "10px" } },
        "notices": { "border_radius": { "number": 10, "unit": "px", "style": "10px" } }
      }
    }
  }
}
```

## 3. Templates

```jsonc
// create-template: header, applies everywhere
{ "title": "Store Header", "post_type": "oxygen_header", "template_type": "everywhere", "rule_groups": [] }

// create-template: footer
{ "title": "Store Footer", "post_type": "oxygen_footer", "template_type": "everywhere", "rule_groups": [] }

// create-template: shop + every product archive + product search results
{ "title": "Shop & Product Archives", "post_type": "oxygen_template", "template_type": "all-product-archives", "rule_groups": [], "priority": 10 }

// create-template: one category gets its own design, wins over the one above
{
  "title": "Accessories Archive",
  "post_type": "oxygen_template",
  "template_type": "specific-product-archive",
  "rule_groups": [[ { "ruleSlug": "product-is-taxonomy", "operand": "is", "value": [ { "text": "Accessories", "value": "{\"taxonomySlug\":\"product_cat\",\"termId\":19}" } ] } ]],
  "priority": 20
}

// create-template: single product, built before going live
{ "title": "Single Product", "post_type": "oxygen_template", "template_type": "product", "rule_groups": [], "priority": 20, "disabled": true }

// set-template-conditions: switch it on later without touching the layout
{ "post_id": 231, "template_type": "product", "rule_groups": [], "disabled": false }

// create-template: a slim header only on the checkout page (rule copied from get-template-conditions; slug/value shape varies by site)
{
  "title": "Checkout Header",
  "post_type": "oxygen_header",
  "template_type": "everywhere",
  "rule_groups": [[ { "ruleSlug": "post-dropdown-page", "operand": "is", "value": ["15"] } ]],
  "priority": 30
}
```

## 4. Building with html-to-page

```jsonc
// whole template in one call; the <style> block becomes global selectors
{ "post_id": 230, "html": "<section class=\"shop\">…</section>\n<style>…</style>" }
// → { "success": true, "created_blocks": [ { "post_id": 240, "title": "Product Card" } ], "warnings": [] }

// append a section to an existing page under a specific parent, at a position
{ "post_id": 12, "parent_id": 1, "position": 2, "html": "<section class=\"section\">…</section>" }

// add a section to the loop's card component afterwards
{ "post_id": 240, "html": "<span class=\"card-stock\" bd-bind=\"product_stock\"></span>" }
```

## 5. Refining with edit-post

```jsonc
// insert a WooCommerce element into a slot container (ids from get-post-tree)
{
  "post_id": 250,
  "operations": [
    { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageshoppingcart", "parent_id": 7,
      "properties": { "design": { "layout": { "totals_position": "top-right", "sticky_totals": true, "stack_vertically_at": "breakpoint_tablet" } } } } }
  ]
}

// update the loop: pagination style
{ "post_id": 230, "operations": [ { "op": "update", "payload": { "element_id": 9, "properties": { "content": { "pagination": { "pagination": "load_more" } } } } } ] }

// update the tabs: open the first accordion item, rename a tab
{ "post_id": 231, "operations": [ { "op": "update", "payload": { "element_id": 22, "properties": {
  "design": { "accordion": { "first_item_opened": true, "accordion": true } },
  "content": { "tabs": { "additional_information": { "title": "Specifications" } }, "form": { "button_text": "Write a review" } } } } } ] }

// move an element (e.g. breadcrumbs above the gallery) and delete another
{ "post_id": 231, "operations": [
  { "op": "move", "payload": { "element_id": 14, "parent_id": 3, "position": 0 } },
  { "op": "delete", "payload": { "element_id": 31 } }
] }

// mini cart in the header
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 11, "properties": {
  "content": { "content": { "cart": { "primary_button": "checkout", "continue_shopping_link": "shop", "open_cart_on_add": true }, "link": { "hide_subtotal": true, "hide_count_when_empty": true } } },
  "design": { "cart": { "style": "sidebar", "sidebar_position": "right", "full_screen_at": "breakpoint_phone_landscape" } } } } } ] }

// faceted filters
{ "post_id": 230, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woofacetedfilters", "parent_id": 6,
  "properties": { "content": { "filters": { "active": true, "price": true, "status": true, "category": true, "instant": true, "attributes": [ { "attribute": "pa_color" }, { "attribute": "pa_size" } ] } } } } } ] }
```

## 6. Conditions and interactions

```jsonc
// set-element-conditions: show a "free shipping unlocked" line when the cart is over 75
{ "post_id": 250, "element_id": 18, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is greater than", "value": "75" } ]] }

// set-element-conditions: the sibling "add X more" line
{ "post_id": 250, "element_id": 19, "rule_groups": [[ { "ruleSlug": "woocommerce-cart-value", "operand": "is less than", "value": "75" } ]] }

// set-element-conditions: a "Sale" ribbon container only on sale products (value from get-element-conditions)
{ "post_id": 231, "element_id": 27, "rule_groups": [[ { "ruleSlug": "woocommerce-product-sale", "operand": "is", "value": "on_sale" } ]] }

// set-element-conditions: hide an element unconditionally (keeps its rules)
{ "post_id": 231, "element_id": 27, "rule_groups": [], "visible": false }

// set-element-interactions: mobile filter drawer toggle
{ "post_id": 230, "element_id": 5, "interactions": [
  { "trigger": "click", "actions": [ { "name": "toggle_class", "target": "custom", "css_selector": ".shop-filters", "css_class": "is-open" } ] }
] }

// set-element-interactions: dismiss the announcement bar
{ "post_id": 220, "element_id": 3, "interactions": [
  { "trigger": "click", "actions": [ { "name": "add_class", "target": "custom", "css_selector": ".announce", "css_class": "is-hidden" } ] }
] }
```

Available triggers include `click`, `mouse_enter`, `mouse_leave`, `page_loaded`, `page_scrolled`, `scroll_into_view`, `form_submit`; actions include `add_class`, `remove_class`, `toggle_class`, `show_element`, `hide_element`, `toggle_element`, `scroll_to`, `set_attribute`, `control_popup`. Read the tool schema for the exact per-action fields.

## 7. Reusable pieces

```jsonc
// create-reusable-component (Oxygen 6) / create-reusable-global-block (Breakdance): an empty-state for the shop loop
{ "title": "No Products Found" }
// → { "post_id": 241 }
// then html-to-page on 241, then edit-post on the loop pointing its empty-state property at 241 (read the loop schema for the path)
```

## 8. Verify

```jsonc
// preview-post: the product template against a variable product
{ "post_id": 231, "context_post_id": 88 }

// preview-element: the add-to-cart node against a grouped product, to see the markup you are styling
{ "post_id": 231, "element_id": 19, "context_post_id": 102 }

// preview-post: the archive template as a category page
{ "post_id": 230, "context_post_id": 88 }

// get-post-tree: confirm the checkout children sit inside the builder
{ "post_id": 251 }

// set-home-page: the store landing page as the front page
{ "post_id": 300 }
```
