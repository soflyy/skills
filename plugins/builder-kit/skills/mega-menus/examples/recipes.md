# Mega menu recipes (Menu Builder)

Complete builds for the common patterns on top of the Menu Builder, which supplies hover intent, keyboard handling, `Escape`, `aria-expanded` and the mobile menu. For menus built from HTML, CSS and interactions alone, with the same categories and a higher design finish, see `vanilla-menus.md`. Element ids are illustrative; take them from `get-post-tree`. Every category link is a term loop binding.

## 1. Walmart-style department bar with full-width panels (Menu Builder)

Header frame (`html-to-page` on the header template):

```html
<header class="hdr store">
  <div class="container hdr-top">
    <a class="hdr-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Store" width="140" height="36"></a>
    <div bd-woo="search" class="hdr-search"></div>
    <a class="hdr-account" href="/my-account/">Account</a>
    <div bd-woo="mini-cart" class="hdr-cart"></div>
  </div>
  <div class="container hdr-bar">
    <div class="hdr-menu-slot"></div>
  </div>
</header>
<style>
  .hdr { position: sticky; top: var(--wp-admin--admin-bar--height, 0px); z-index: 60; background: var(--surface); border-bottom: 1px solid var(--line); }
  .hdr-top { display: grid; grid-template-columns: auto minmax(0, 1fr) auto auto; gap: 24px; align-items: center; min-height: 72px; }
  .hdr-bar { min-height: 48px; display: flex; align-items: center; }
  .hdr-menu-slot .breakdance-menu-link { font: 500 15px/1 var(--font-body); color: var(--ink); padding: 14px 16px; border-radius: 6px; transition: background .15s; }
  .hdr-menu-slot .breakdance-menu-link:hover { background: var(--surface-alt); }
  .hdr-menu-slot .breakdance-menu-link:focus-visible { outline: 2px solid var(--ink); outline-offset: -4px; }
  .hdr-menu-slot .breakdance-dropdown-floater { border-top: 1px solid var(--line); box-shadow: 0 32px 64px -24px rgba(0,0,0,.25); }
</style>
```

Insert the menu and its items (`edit-post`):

```jsonc
{ "post_id": 220, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\MenuBuilder", "parent_id": 9, "properties": {
      "design": { "desktop_menu": { "dropdowns": { "open_dropdowns_on_click": false, "wrapper": { "width": "full-width" } }, "transition_duration": { "number": 150, "unit": "ms", "style": "150ms" } },
                  "mobile_menu": { "show_at": "breakpoint_tablet", "mode": "offcanvas", "offcanvas_position": "left" } } } } }
] }
// → menu element id 30; then, in a second call, the items as direct children of 30:
{ "post_id": 220, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\MenuCustomDropdown", "parent_id": 30, "properties": { "content": { "content": { "text": "Departments" } } } } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\MenuCustomDropdown", "parent_id": 30, "properties": { "content": { "content": { "text": "Deals", "link": { "type": "url", "url": "/product-category/deals/" } } } } } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\TextLink", "parent_id": 30, "properties": { "content": { "content": { "text": "New arrivals", "link": { "type": "url", "url": "/shop/?orderby=date" } } } } } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\TextLink", "parent_id": 30, "properties": { "content": { "content": { "text": "Help", "link": { "type": "url", "url": "/faq/" } } } } } }
] }
```

Read `get-element-schemas` for `EssentialElements\MenuBuilder` (`paths: ["design.desktop_menu.dropdowns", "design.mobile_menu"]`) and for `TextLink`'s link shape before sending; the values above show intent, not verified shapes.

Panel content for "Departments" (`html-to-page` with `parent_id` = the dropdown's id, 31):

```html
<div class="mega">
  <div class="container mega-inner">
    <div bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Department" bd-limit="8" bd-orderby="name" bd-order="asc" class="mega-cols">
      <div class="mega-col">
        <a class="mega-head" bd-href="term_permalink" bd-bind="term_name"></a>
        <div class="mega-sub-slot"></div>
        <a class="mega-all" bd-href="term_permalink">Shop all</a>
      </div>
    </div>
    <a class="mega-promo" href="/product-category/deals/">
      <img src="/wp-content/uploads/mega-promo.jpg" alt="" width="600" height="400">
      <span class="mega-promo-title">Weekly deals</span>
      <span class="mega-promo-cta">Shop now</span>
    </a>
  </div>
</div>
<style>
  .mega { padding: 32px 0 40px; }
  .mega-inner { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 40px; }
  .mega-cols { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; }
  .mega-col { min-width: 0; }
  .mega-head { display: block; font: 600 15px/1.2 var(--font-body); color: var(--ink); text-decoration: none; margin-bottom: 12px; }
  .mega-head:hover { text-decoration: underline; }
  .mega-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  .mega-link { font: 14px/1.4 var(--font-body); color: var(--ink-muted); text-decoration: none; }
  .mega-link { transition: color .15s; }
  .mega-link:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
  .mega-link:focus-visible, .mega-head:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; border-radius: 2px; }
  .mega-all { display: inline-block; margin-top: 12px; font: 500 13px/1 var(--font-body); color: var(--brand); text-decoration: none; }
  .mega-promo { position: relative; display: block; border-radius: var(--radius); overflow: hidden; color: #fff; text-decoration: none; }
  .mega-promo img { display: block; width: 100%; aspect-ratio: 3 / 2; object-fit: cover; }
  .mega-promo-title { position: absolute; left: 20px; bottom: 48px; font: 600 22px/1.1 var(--font-display); text-shadow: 0 1px 10px rgba(0,0,0,.4); }
  .mega-promo-cta { position: absolute; left: 20px; bottom: 18px; font: 600 13px/1 var(--font-body); text-decoration: underline; }
</style>
```

Then the outer loop's query (top-level categories only) and the inner subcategory loop:

```jsonc
// outer loop element (id 40): parents only
{ "post_id": 220, "operations": [ { "op": "update", "payload": { "element_id": 40, "properties": { "content": { "query": { "load_terms_by_query": true,
  "term_query": "return [ 'taxonomy' => 'product_cat', 'parent' => 0, 'hide_empty' => true, 'number' => 8, 'orderby' => 'name' ];" } } } } } ] }

// inner loop: html-to-page on the created component (post 241), parent_id = the .mega-sub-slot element inside it
{ "post_id": 241, "parent_id": 4, "html": "<ul bd-loop=\"terms\" bd-taxonomy=\"product_cat\" bd-loop-name=\"Mega Subcategory\" bd-limit=\"8\" class=\"mega-list\"><li><a class=\"mega-link\" bd-href=\"term_permalink\" bd-bind=\"term_name\"></a></li></ul>" }

// inner loop element (id 6 in post 241): children of the current department
{ "post_id": 241, "operations": [ { "op": "update", "payload": { "element_id": 6, "properties": { "content": { "query": { "load_terms_by_query": true,
  "term_query": "$term = \\Breakdance\\LoopBuilder\\getCurrentTerm(true);\nreturn [ 'taxonomy' => 'product_cat', 'parent' => $term ? $term->term_id : 0, 'hide_empty' => true, 'number' => 8, 'orderby' => 'name' ];" } } } } } ] }
```

The mobile drawer gets the same items automatically; the panel content renders inside the accordion, so keep the promo tile hidden on mobile with a media query on `.mega-promo`.

## 2. Target-style "Categories" panel with image tiles

Same Menu Builder; the panel is a tile grid instead of link columns:

```html
<div class="mega mega--tiles">
  <div class="container">
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Tile" bd-limit="12" bd-orderby="count" bd-order="desc" class="mega-tiles">
      <li class="mega-tile"><a class="mega-tile-link" bd-href="term_permalink"><img class="mega-tile-img" bd-src="woocommerce_category_image" bd-alt="term_name"><span class="mega-tile-name" bd-bind="term_name"></span></a></li>
    </ul>
  </div>
</div>
<style>
  .mega--tiles { padding: 28px 0 36px; }
  .mega-tiles { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 20px; }
  .mega-tile-link { display: grid; gap: 10px; justify-items: center; text-decoration: none; color: var(--ink); }
  .mega-tile-img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; background: var(--surface-alt); }
  .mega-tile-name { font: 500 14px/1.2 var(--font-body); text-align: center; }
</style>
```

## 3. Fashion-style tabbed panel (Women / Men / Kids as items, columns inside)

One `MenuCustomDropdown` per top item, each panel a fixed set of columns built from the category's children. Since each panel belongs to one known category, skip the outer loop and use a single inner-style loop per panel with `parent` set to that category's id:

```php
return [ 'taxonomy' => 'product_cat', 'parent' => 23, 'hide_empty' => true, 'orderby' => 'name' ];
```

Add a static "Featured" column with editorial links and an image tile; those are curated, not category data.

## 4. Amazon-style "All" flyout (hand-built)

Header button and panel (`html-to-page` on the header template):

```html
<button class="all-btn" aria-expanded="false" aria-controls="all-panel"><span class="all-btn-lines"></span> All</button>
<div class="all-backdrop"></div>
<aside class="all-panel" id="all-panel">
  <div class="all-head"><span class="all-hello">Hello, sign in</span><button class="all-close" aria-label="Close">×</button></div>
  <h2 class="all-title">Shop by department</h2>
  <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="All Department" bd-limit="20" bd-orderby="name" bd-order="asc" class="all-list">
    <li class="all-dept">
      <a class="all-dept-link" bd-href="term_permalink" bd-bind="term_name"></a>
      <div class="all-sub">
        <div class="all-sub-slot"></div>
      </div>
    </li>
  </ul>
  <h2 class="all-title">Help &amp; settings</h2>
  <ul class="all-list all-list--static">
    <li><a class="all-dept-link" href="/my-account/">Your account</a></li>
    <li><a class="all-dept-link" href="/track-order/">Track an order</a></li>
    <li><a class="all-dept-link" href="/contact/">Customer service</a></li>
  </ul>
</aside>
<style>
  .all-btn { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 12px; border: 1px solid transparent; border-radius: 4px; background: transparent; color: inherit; font: 700 15px/1 var(--font-body); cursor: pointer; }
  .all-btn:hover { border-color: currentColor; }
  .all-btn-lines { width: 18px; height: 2px; background: currentColor; box-shadow: 0 -6px 0 currentColor, 0 6px 0 currentColor; }
  .all-backdrop { position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0; background: rgba(0,0,0,.6); opacity: 0; pointer-events: none; transition: opacity .2s; z-index: 90; }
  .all-backdrop.is-open { opacity: 1; pointer-events: auto; }
  .all-panel { position: fixed; top: var(--wp-admin--admin-bar--height, 0px); bottom: 0; left: 0; width: 365px; max-width: 90vw; background: var(--surface); color: var(--ink); overflow-y: auto; transform: translateX(-100%); transition: transform .25s; z-index: 100; }
  .all-panel.is-open { transform: none; }
  .all-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: var(--ink); color: #fff; font: 700 17px/1.2 var(--font-body); }
  .all-close { background: none; border: 0; color: inherit; font-size: 24px; cursor: pointer; }
  .all-title { margin: 0; padding: 20px 20px 8px; font: 700 18px/1.2 var(--font-body); border-top: 1px solid var(--line); }
  .all-list { list-style: none; margin: 0; padding: 0 0 12px; }
  .all-dept { position: relative; }
  .all-dept-link { display: flex; justify-content: space-between; padding: 11px 20px; color: var(--ink); text-decoration: none; font: 14px/1.4 var(--font-body); }
  .all-dept-link:hover, .all-dept:hover > .all-dept-link { background: var(--surface-alt); }
  .all-dept > .all-dept-link::after { content: "›"; color: var(--ink-muted); }
  .all-sub { display: none; position: absolute; left: 100%; top: 0; width: 365px; min-height: 100%; background: var(--surface); box-shadow: 8px 0 24px rgba(0,0,0,.08); padding: 12px 0; }
  .all-dept:hover .all-sub, .all-dept:focus-within .all-sub { display: block; }
  @media (max-width: 767px) {
    .all-sub { position: static; width: auto; box-shadow: none; padding: 0 0 8px 16px; }
  }
</style>
```

Interactions (ids from `get-post-tree`):

```jsonc
{ "post_id": 220, "element_id": 5, "interactions": [ { "trigger": "click", "actions": [
  { "name": "toggle_class", "target": "custom", "css_selector": ".all-panel", "css_class": "is-open" },
  { "name": "toggle_class", "target": "custom", "css_selector": ".all-backdrop", "css_class": "is-open" } ] } ] }
{ "post_id": 220, "element_id": 6, "interactions": [ { "trigger": "click", "actions": [
  { "name": "remove_class", "target": "custom", "css_selector": ".all-panel", "css_class": "is-open" },
  { "name": "remove_class", "target": "custom", "css_selector": ".all-backdrop", "css_class": "is-open" } ] } ] }
{ "post_id": 220, "element_id": 12, "interactions": [ { "trigger": "click", "actions": [
  { "name": "remove_class", "target": "custom", "css_selector": ".all-panel", "css_class": "is-open" },
  { "name": "remove_class", "target": "custom", "css_selector": ".all-backdrop", "css_class": "is-open" } ] } ] }
```

Then the subcategory loop into each department's `.all-sub-slot` (second `html-to-page` on the created component) with the `getCurrentTerm` query from recipe 1. The refined version of this flyout (hover-intent second pane, blurred backdrop, greeting header, mobile accordion) is example C in `vanilla-menus.md`.

On desktop the subcategory pane opens beside the department on hover or keyboard focus; on mobile it stacks under it. The trade-off versus the Menu Builder: no `Escape` handling and no focus trap unless the `key_down` trigger is available in `set-element-interactions` (check the schema); mention this to the user.

## 5. Mobile drawer for a hand-built menu

If the header's desktop navigation is hand-built, give mobile its own drawer rather than hiding the categories:

```html
<button class="mnav-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
<nav class="mnav" aria-label="Mobile">
  <div class="mnav-head"><div bd-woo="search"></div><button class="mnav-close" aria-label="Close">×</button></div>
  <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mobile Department" bd-limit="20" bd-orderby="name" bd-order="asc" class="mnav-list">
    <li class="mnav-item">
      <details class="mnav-details">
        <summary class="mnav-summary" bd-bind="term_name"></summary>
        <div class="mnav-sub-slot"></div>
      </details>
    </li>
  </ul>
  <div class="mnav-foot"><a href="/my-account/">Account</a><a href="/cart/">Cart</a></div>
</nav>
```

`<details>`/`<summary>` gives a native accordion with no interactions; the department link itself goes as the first item inside the sub slot ("All Bags"). Open the drawer with a `click` → `toggle_class` interaction on `.mnav`, and the subcategory loop is the same nested build as recipe 1. Check the `warnings` to confirm `<summary>` accepted the `bd-bind`; if not, put the binding on a `<span>` inside it.

## 6. Menu Dropdown with static columns (company menus)

For non-category dropdowns, the repeater is enough:

```jsonc
{ "op": "insert", "payload": { "element_type": "EssentialElements\\MenuDropdown", "parent_id": 30, "properties": { "content": { "content": {
  "text": "Company",
  "columns": [
    { "title": "About", "links": [ { "text": "Our story", "link": { "type": "url", "url": "/about/" } }, { "text": "Sustainability", "link": { "type": "url", "url": "/sustainability/" } } ] },
    { "title": "Support", "links": [ { "text": "Shipping & returns", "link": { "type": "url", "url": "/shipping-returns/" } }, { "text": "Contact", "link": { "type": "url", "url": "/contact/" } } ] }
  ] } } } } }
```

Verify the repeater item shape with `get-element-schemas` (`paths: ["content.content.columns"]`) first.
