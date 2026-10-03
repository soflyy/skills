# Hand-built menus: HTML, CSS and interactions only

No Menu Builder. Each menu is one `html-to-page` call on the header template plus `set-element-interactions` where CSS alone cannot do it, and nested term loops for categories. These are designed to a showcase standard: a consistent type scale, hover intent, motion that reads as intent, visible focus, and an overlay that separates the panel from the page.

Importer facts these rely on: any selector the importer cannot model (`:has()`, `:focus-within`, `[aria-expanded="true"]`, `:not()`) is kept verbatim as a custom selector, and any declaration it does not map (`transition`, `transform`, `visibility`, `pointer-events`, `backdrop-filter`) is preserved as custom CSS. Two limits: an `@media` block whose query is not a registered breakpoint is skipped, so `prefers-reduced-motion` and `(hover: hover)` queries cannot be used (keep motion short instead), and each `@media` in the `<style>` must copy a breakpoint's query from `get-breakpoints` verbatim.

Shared tokens assumed (from the store design system): `--ink`, `--ink-muted`, `--line`, `--surface`, `--surface-alt`, `--brand`, `--accent`, `--font-display`, `--font-body`, `--radius`, `--container`, `--gutter`.

## A. Hover mega bar (fashion, lifestyle, home)

Full-bleed panels under a slim bar. Opens on hover with intent (a 120ms delay in, 200ms out so a diagonal move to the panel does not close it), on keyboard focus, and on tap. One nested term loop per column; two editorial tiles on the right.

```html
<header class="hm">
  <div class="container hm-row">
    <a class="hm-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Maison" width="132" height="28"></a>
    <nav class="hm-nav" aria-label="Primary">
      <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Nav Item" bd-limit="6" bd-orderby="name" bd-order="asc" class="hm-list">
        <li class="hm-item">
          <a class="hm-link" bd-href="term_permalink" bd-bind="term_name"></a>
          <div class="hm-panel">
            <div class="container hm-panel-inner">
              <div class="hm-cols-slot"></div>
              <div class="hm-tiles">
                <a class="hm-tile" bd-href="term_permalink">
                  <img class="hm-tile-img" bd-src="woocommerce_category_image" bd-alt="term_name">
                  <span class="hm-tile-label">Shop all <span bd-bind="term_name"></span></span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <div class="hm-tools">
      <div bd-woo="search" class="hm-search"></div>
      <a class="hm-icon" href="/my-account/" aria-label="Account"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></a>
      <div bd-woo="mini-cart" class="hm-cart"></div>
    </div>
  </div>
  <div class="hm-overlay"></div>
</header>
<style>
  .hm { position: sticky; top: var(--wp-admin--admin-bar--height, 0px); z-index: 80; background: var(--surface); border-bottom: 1px solid var(--line); }
  .hm-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 40px; min-height: 68px; }
  .hm-logo img { display: block; height: 28px; width: auto; }
  .hm-list { list-style: none; margin: 0; padding: 0; display: flex; justify-content: center; gap: 4px; }
  .hm-item { position: static; }
  .hm-link { position: relative; display: inline-flex; align-items: center; height: 68px; padding: 0 14px; font: 500 14px/1 var(--font-body); letter-spacing: .04em; text-transform: uppercase; color: var(--ink); text-decoration: none; }
  .hm-link::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 20px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
  .hm-item:hover .hm-link::after, .hm-item:focus-within .hm-link::after, .hm-link.is-active::after { transform: scaleX(1); }
  .hm-link:focus-visible { outline: 2px solid var(--ink); outline-offset: -6px; }

  /* the panel: full-bleed, fades and settles 8px; hover intent through transition delays */
  .hm-panel { position: absolute; left: 0; right: 0; top: 100%; background: var(--surface); border-top: 1px solid var(--line); box-shadow: 0 32px 64px -24px rgba(0,0,0,.25); opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity .2s ease .2s, transform .2s ease .2s, visibility 0s linear .4s; }
  .hm-item:hover .hm-panel, .hm-item:focus-within .hm-panel { opacity: 1; visibility: visible; transform: none; transition: opacity .18s ease .12s, transform .18s ease .12s, visibility 0s linear .12s; }
  .hm-panel-inner { display: grid; grid-template-columns: minmax(0, 1fr) 460px; gap: 48px; padding: 36px 0 44px; }
  .hm-cols { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; }
  .hm-group-title { display: block; margin: 0 0 14px; font: 600 12px/1.2 var(--font-body); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
  .hm-sub { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
  .hm-sub-link { display: inline-block; font: 15px/1.3 var(--font-body); color: var(--ink); text-decoration: none; transition: color .15s; }
  .hm-sub-link:hover { color: var(--ink-muted); text-decoration: underline; text-underline-offset: 4px; }
  .hm-sub-link:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; border-radius: 2px; }
  .hm-viewall { display: inline-block; margin-top: 18px; font: 600 13px/1 var(--font-body); color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
  .hm-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .hm-tile { position: relative; display: block; overflow: hidden; background: var(--surface-alt); text-decoration: none; color: #fff; }
  .hm-tile-img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; transition: transform .6s ease; }
  .hm-tile:hover .hm-tile-img { transform: scale(1.04); }
  .hm-tile-label { position: absolute; left: 16px; right: 16px; bottom: 16px; font: 500 15px/1.3 var(--font-body); text-shadow: 0 1px 14px rgba(0,0,0,.5); }

  /* dark page overlay while any panel is open */
  .hm-panel { z-index: 2; }   /* the item stays static and the row unpositioned, so the panel spans the header, not the container */
  .hm-overlay { position: fixed; inset: 0; top: calc(var(--wp-admin--admin-bar--height, 0px) + 68px); background: rgba(20,22,26,.4); opacity: 0; pointer-events: none; transition: opacity .25s ease .12s; z-index: 1; }
  .hm:has(.hm-item:hover) .hm-overlay, .hm:has(.hm-item:focus-within) .hm-overlay { opacity: 1; }

  .hm-tools { display: flex; align-items: center; gap: 16px; }
  .hm-icon { display: inline-flex; padding: 6px; color: var(--ink); }

  @media (max-width: 1023px) {
    .hm-row { grid-template-columns: auto 1fr; }
    .hm-nav { display: none; }   /* the mobile drawer (example E) carries the categories */
  }
</style>
```

Then, on the created `Mega Nav Item` component, the subcategory columns as a nested loop into `.hm-cols-slot` (second `html-to-page` on the component's `post_id`, `parent_id` = the slot). The loop container is the column grid and holds ONE column item:

```html
<div bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Nav Group" bd-limit="4" class="hm-cols">
  <div class="hm-col">
    <a class="hm-group-title" bd-href="term_permalink" bd-bind="term_name"></a>
    <div class="hm-sub-slot"></div>
  </div>
</div>
```

with `term_query` (children of the current top-level category). For a three-level taxonomy, a third call on the `Mega Nav Group` component puts the link list into `.hm-sub-slot` (`<ul bd-loop="terms" class="hm-sub"><li><a class="hm-sub-link" bd-href="term_permalink" bd-bind="term_name"></a></li></ul>`, with the same current-term query). For a two-level taxonomy, make the group itself the link: drop the sub slot and style `.hm-group-title` as a link list. Both queries:

```php
$term = \Breakdance\LoopBuilder\getCurrentTerm(true);
return [ 'taxonomy' => 'product_cat', 'parent' => $term ? $term->term_id : 0, 'hide_empty' => true, 'number' => 4, 'orderby' => 'name' ];
```

Design notes: the bar is uppercase 14px with letter-spacing, the panel switches to sentence-case 15px links, the group titles are the only muted uppercase text, and the two tiles anchor the right edge so the panel never looks like a spreadsheet. The overlay is what makes the panel read as a layer rather than a page section; it sits at a positive z-index below the panel and the bar row (a negative z-index would paint under the header's own background and never show). `position: static` on the item is what lets the panel be full-bleed relative to the header. Hover works on touch because a tap fires `:hover` on the item; the second tap on the same link navigates.

## B. Click mega bar with interactions (departments, B2B catalogs)

Panels open on click, one at a time, close on backdrop click, on `Escape` where the trigger supports it, and when the pointer leaves. The trigger is a real button so it is keyboard-operable.

```html
<header class="cm">
  <div class="container cm-row">
    <a class="cm-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Supply Co" width="140" height="32"></a>
    <nav class="cm-nav" aria-label="Departments">
      <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Dept Nav Item" bd-limit="7" bd-orderby="count" bd-order="desc" class="cm-list">
        <li class="cm-item">
          <button class="cm-btn" type="button" aria-expanded="false"><span bd-bind="term_name"></span><svg class="cm-chev" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6l4 4 4-4"/></svg></button>
          <div class="cm-panel">
            <div class="cm-panel-head">
              <a class="cm-panel-title" bd-href="term_permalink" bd-bind="term_name"></a>
              <a class="cm-panel-all" bd-href="term_permalink">View all <span bd-bind="woocommerce_category_count"></span> products →</a>
            </div>
            <div class="cm-col-slot"></div>
          </div>
        </li>
      </ul>
    </nav>
    <div class="cm-tools"><div bd-woo="search" class="cm-search"></div><div bd-woo="mini-cart" class="cm-cart"></div></div>
  </div>
  <div class="cm-backdrop"></div>
</header>
<style>
  .cm { position: relative; z-index: 80; background: var(--ink); color: #fff; }
  .cm-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 32px; min-height: 64px; }
  .cm-logo img { display: block; height: 32px; width: auto; }
  .cm-list { list-style: none; margin: 0; padding: 0; display: flex; gap: 2px; }
  .cm-item { position: relative; }
  .cm-btn { display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 14px; border: 0; border-radius: 6px; background: transparent; color: inherit; font: 500 14px/1 var(--font-body); cursor: pointer; transition: background .15s; }
  .cm-btn:hover { background: rgba(255,255,255,.1); }
  .cm-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  .cm-chev { transition: transform .2s; }
  .cm-item.is-open .cm-btn { background: var(--surface); color: var(--ink); border-radius: 6px 6px 0 0; }
  .cm-item.is-open .cm-chev { transform: rotate(180deg); }

  .cm-panel { position: absolute; width: min(880px, calc(100vw - 2 * var(--gutter))); background: var(--surface); color: var(--ink); border-radius: 0 12px 12px 12px; box-shadow: 0 24px 60px -16px rgba(0,0,0,.35); padding: 24px 28px 28px; opacity: 0; visibility: hidden; transform: translateY(6px); transition: opacity .18s ease, transform .18s ease, visibility 0s linear .18s; }
  .cm-item.is-open .cm-panel { opacity: 1; visibility: visible; transform: none; transition: opacity .18s ease, transform .18s ease, visibility 0s; }
  /* anchor positioning flips the panel at the viewport edge by itself; anchor-scope keeps each
     looped item anchoring its own panel instead of all of them anchoring the last item */
  /* Anchor positioning flips the panel at the viewport edge by itself. anchor-scope keeps each looped
     item anchoring its own panel; position: fixed keeps the containing block the viewport, which the
     header's own position: relative would otherwise take away and with it the flip. @position-try
     cannot change border-radius, so the anchored panel uses one symmetric radius. */
  @supports (anchor-name: --a) {
    .cm-item { anchor-name: --cm-item; anchor-scope: --cm-item; }
    .cm-panel { position: fixed; position-anchor: --cm-item; position-area: bottom span-right; position-try-fallbacks: flip-inline; border-radius: 12px; }
  }
  @supports not (anchor-name: --a) {
    .cm-panel { left: 0; top: 100%; }
    .cm-item:nth-last-child(-n+2) .cm-panel { left: auto; right: 0; border-radius: 12px 0 12px 12px; }
  }
  .cm-panel-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--line); }
  .cm-panel-title { font: 600 20px/1.2 var(--font-display); color: var(--ink); text-decoration: none; }
  .cm-panel-all { font: 500 13px/1 var(--font-body); color: var(--brand); text-decoration: none; white-space: nowrap; }
  .cm-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px 28px; }
  .cm-sub { display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 8px; color: var(--ink); text-decoration: none; font: 500 14px/1.3 var(--font-body); transition: background .15s; }
  .cm-sub:hover { background: var(--surface-alt); }
  .cm-sub-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; background: var(--surface-alt); flex: none; }
  /* a term with no image renders the builder's placeholder, not an empty src: give this image a
     dynamic-data / is not empty display condition instead (see patterns/product-grids.md) */
  .cm-sub-count { margin-left: auto; font: 12px/1 var(--font-body); color: var(--ink-muted); }

  .cm-panel { z-index: 2; }
  .cm-backdrop { position: fixed; inset: 0; top: calc(var(--wp-admin--admin-bar--height, 0px) + 64px); background: rgba(20,22,26,.45); opacity: 0; pointer-events: none; transition: opacity .2s; z-index: 1; }
  .cm:has(.cm-item.is-open) .cm-backdrop { opacity: 1; pointer-events: auto; }
  @media (max-width: 1023px) { .cm-nav { display: none; } }
</style>
```

Nested subcategory loop into `.cm-col-slot` (second call on the `Dept Nav Item` component):

```html
<div bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Dept Nav Sub" bd-limit="9" class="cm-cols">
  <a class="cm-sub" bd-href="term_permalink"><img class="cm-sub-img" bd-src="woocommerce_category_image" bd-alt="term_name"><span bd-bind="term_name"></span><span class="cm-sub-count" bd-bind="woocommerce_category_count"></span></a>
</div>
```

with the `getCurrentTerm` query from example A.

Interactions (set on the elements inside the `Dept Nav Item` component, so every instance gets them; ids from `get-post-tree` on the component post):

```jsonc
// the button: close every other item, then toggle this one
{ "post_id": 244, "element_id": 3, "interactions": [ { "trigger": "click", "actions": [
  { "name": "remove_class", "target": "custom", "css_selector": ".cm-item:not(:focus-within)", "css_class": "is-open" },
  { "name": "toggle_class", "target": "custom", "css_selector": ".cm-item", "match": "closest_parent", "css_class": "is-open" }
] } ] }
// the item: close when the pointer leaves it
{ "post_id": 244, "element_id": 2, "interactions": [ { "trigger": "mouse_leave", "actions": [
  { "name": "remove_class", "target": "this_element", "css_class": "is-open" }
] } ] }
// the backdrop (header template): close everything
{ "post_id": 220, "element_id": 18, "interactions": [ { "trigger": "click", "actions": [
  { "name": "remove_class", "target": "custom", "css_selector": ".cm-item", "css_class": "is-open" }
] } ] }
```

`closest_parent` scopes the toggle to the item that contains the clicked button. `.cm-item:not(:focus-within)` closes the siblings while the clicked button still holds focus; check in a browser on iOS Safari, where buttons do not always take focus on tap, and if a stale sibling stays open there, replace that action with `remove_class` on all `.cm-item` followed by `add_class` via `closest_parent` (the item then no longer toggles closed on a second click, the backdrop does that). `aria-expanded` can be kept in sync with a `set_attribute` action if the interaction schema on this site exposes it; otherwise leave it static, the visible state still works.

Design notes: dark bar, light panel with a rounded corner that grows from the open tab, a header row inside the panel with the department name as a display-font title and a "View all N products" link, and tiles with 44px thumbnails and counts. Panels near the right edge flip to right-aligned so nothing overflows. This pattern suits catalogs where each department has 6 to 12 subcategories with images.

## C. Amazon-style "All" flyout, refined

The version in `recipes.md` is the skeleton; this is the finished design. Two panes on desktop (departments, then subcategories on hover with a 140ms intent delay), a stacked accordion on mobile, greeting header, grouped sections, sticky panel header, backdrop blur.

```html
<button class="af-btn" type="button" aria-controls="af-panel" aria-expanded="false"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span>All</span></button>
<div class="af-backdrop"></div>
<aside class="af" id="af-panel" aria-label="All departments">
  <div class="af-head">
    <span class="af-hello">Hello, <span bd-bind="user_name" bd-params='{"fallback":"sign in"}'></span></span>
    <button class="af-close" type="button" aria-label="Close menu">×</button>
  </div>
  <div class="af-scroll">
    <section class="af-section">
      <h2 class="af-title">Shop by department</h2>
      <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="All Menu Department" bd-limit="20" bd-orderby="name" bd-order="asc" class="af-list">
        <li class="af-dept">
          <a class="af-dept-link" bd-href="term_permalink"><span bd-bind="term_name"></span><svg class="af-chev" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4l4 4-4 4"/></svg></a>
          <div class="af-sub">
            <a class="af-sub-title" bd-href="term_permalink" bd-bind="term_name"></a>
            <div class="af-sub-slot"></div>
          </div>
        </li>
      </ul>
    </section>
    <section class="af-section">
      <h2 class="af-title">Programs &amp; features</h2>
      <ul class="af-list af-list--static">
        <li><a class="af-dept-link" href="/gift-cards/">Gift cards</a></li>
        <li><a class="af-dept-link" href="/shop/?orderby=date">New arrivals</a></li>
        <li><a class="af-dept-link" href="/product-category/deals/">Today's deals</a></li>
      </ul>
    </section>
    <section class="af-section">
      <h2 class="af-title">Help &amp; settings</h2>
      <ul class="af-list af-list--static">
        <li><a class="af-dept-link" href="/my-account/">Your account</a></li>
        <li><a class="af-dept-link" href="/track-order/">Track an order</a></li>
        <li><a class="af-dept-link" href="/contact/">Customer service</a></li>
      </ul>
    </section>
  </div>
</aside>
<style>
  .af-btn { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 12px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: inherit; font: 700 15px/1 var(--font-body); cursor: pointer; transition: border-color .15s; }
  .af-btn:hover, .af-btn:focus-visible { border-color: currentColor; outline: 0; }
  .af-backdrop { position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0; background: rgba(15,17,20,.55); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity .25s; z-index: 190; }
  .af-backdrop.is-open { opacity: 1; pointer-events: auto; }
  .af { position: fixed; top: var(--wp-admin--admin-bar--height, 0px); bottom: 0; left: 0; width: 365px; max-width: 92vw; background: var(--surface); color: var(--ink); display: grid; grid-template-rows: auto minmax(0, 1fr); transform: translateX(-100%); transition: transform .28s cubic-bezier(.2,.8,.2,1); z-index: 200; box-shadow: 24px 0 64px -24px rgba(0,0,0,.4); }
  .af.is-open { transform: none; }
  .af-head { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: var(--ink); color: #fff; font: 700 18px/1.2 var(--font-body); }
  .af-close { width: 36px; height: 36px; border: 0; border-radius: 50%; background: rgba(255,255,255,.12); color: inherit; font-size: 22px; cursor: pointer; }
  .af-close:hover { background: rgba(255,255,255,.22); }
  .af-scroll { overflow-y: auto; overscroll-behavior: contain; padding-bottom: 24px; }
  .af-section { padding: 8px 0 12px; border-bottom: 1px solid var(--line); }
  .af-title { margin: 0; padding: 14px 20px 6px; font: 700 17px/1.2 var(--font-body); }
  .af-list { list-style: none; margin: 0; padding: 0; }
  .af-dept { position: relative; }
  .af-dept-link { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px; color: var(--ink); text-decoration: none; font: 14px/1.4 var(--font-body); transition: background .12s; }
  .af-dept-link:hover, .af-dept:hover > .af-dept-link, .af-dept:focus-within > .af-dept-link { background: var(--surface-alt); }
  .af-dept-link:focus-visible { outline: 2px solid var(--brand); outline-offset: -2px; }
  .af-chev { color: var(--ink-muted); flex: none; }

  /* second pane: appears beside the panel after a short intent delay */
  .af-sub { position: fixed; top: var(--wp-admin--admin-bar--height, 0px); bottom: 0; left: min(365px, 92vw); width: 365px; max-width: calc(100vw - min(365px, 92vw)); background: var(--surface); box-shadow: 24px 0 64px -24px rgba(0,0,0,.3); padding: 20px 0; overflow-y: auto; opacity: 0; visibility: hidden; transform: translateX(-8px); transition: opacity .16s ease .14s, transform .16s ease .14s, visibility 0s linear .3s; z-index: 1; }
  .af-dept:hover .af-sub, .af-dept:focus-within .af-sub { opacity: 1; visibility: visible; transform: none; transition-delay: .14s, .14s, .14s; }
  .af-sub-title { display: block; padding: 8px 20px 14px; font: 700 17px/1.2 var(--font-body); color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--line); margin-bottom: 8px; }
  .af-sub-link { display: block; padding: 10px 20px; color: var(--ink); text-decoration: none; font: 14px/1.4 var(--font-body); }
  .af-sub-link:hover { background: var(--surface-alt); }

  @media (max-width: 767px) {
    .af-chev { transform: rotate(90deg); transition: transform .2s; }
    .af-dept:focus-within .af-chev { transform: rotate(-90deg); }
    .af-sub { position: static; width: auto; max-width: none; box-shadow: none; padding: 0 0 8px 12px; transform: none; display: none; opacity: 1; visibility: visible; }
    .af-dept:focus-within .af-sub { display: block; }
    .af-sub-title { display: none; }
  }
</style>
```

Nested subcategory links into `.af-sub-slot` (second call on the `All Menu Department` component):

```html
<ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="All Menu Subcategory" bd-limit="14" class="af-sub-list">
  <li><a class="af-sub-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
</ul>
```

Interactions: `af-btn` `click` → `add_class` `is-open` on `.af` and `.af-backdrop`; `af-close` and `af-backdrop` `click` → `remove_class` on both. On mobile, the department link opens its subcategories on focus (a tap focuses the link) and the chevron flips; the department archive itself is the sub pane's first link.

Design notes: greeting header in the brand's ink colour, 17px section titles, 14px items at 12px vertical padding (a 44px tap target), a chevron only on items that have children, a blurred backdrop, and a second pane that slides in beside the first rather than replacing it. `overscroll-behavior: contain` stops the page scrolling behind the panel.

## D. Vertical "Shop by department" sidebar with flyouts (marketplace homepage hero)

A left column on the homepage hero, department rows with icons, and a wide flyout to the right on hover. Purely CSS.

```html
<section class="hero-grid">
  <nav class="sb" aria-label="Departments">
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Sidebar Department" bd-limit="12" bd-orderby="count" bd-order="desc" class="sb-list">
      <li class="sb-item">
        <a class="sb-link" bd-href="term_permalink"><img class="sb-icon" bd-src="woocommerce_category_image" alt=""><span bd-bind="term_name"></span></a>
        <div class="sb-fly">
          <div class="sb-fly-head"><a class="sb-fly-title" bd-href="term_permalink" bd-bind="term_name"></a><a class="sb-fly-all" bd-href="term_permalink">View all</a></div>
          <div class="sb-fly-slot"></div>
        </div>
      </li>
    </ul>
  </nav>
  <div class="hero-banner"><!-- hero image / slider --></div>
</section>
<style>
  .hero-grid { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 24px; align-items: stretch; position: relative; }
  .sb { position: relative; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 8px 0; z-index: 20; }
  .sb-list { list-style: none; margin: 0; padding: 0; }
  .sb-item { position: static; }
  .sb-link { display: flex; align-items: center; gap: 12px; padding: 10px 16px; color: var(--ink); text-decoration: none; font: 500 14px/1.3 var(--font-body); border-left: 3px solid transparent; transition: background .12s, border-color .12s; }
  .sb-icon { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; background: var(--surface-alt); }
  /* a term with no image renders the builder's placeholder, not an empty src: give this image a
     dynamic-data / is not empty display condition instead (see patterns/product-grids.md) */
  .sb-item:hover .sb-link, .sb-item:focus-within .sb-link { background: var(--surface-alt); border-left-color: var(--brand); }
  .sb-fly { position: absolute; top: 0; left: 100%; bottom: 0; width: min(760px, calc(100vw - 260px - 3 * var(--gutter))); margin-left: 8px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: 0 24px 60px -20px rgba(0,0,0,.25); padding: 24px 28px; opacity: 0; visibility: hidden; transform: translateX(-6px); transition: opacity .16s ease .12s, transform .16s ease .12s, visibility 0s linear .28s; overflow-y: auto; }
  .sb-item:hover .sb-fly, .sb-item:focus-within .sb-fly { opacity: 1; visibility: visible; transform: none; transition-delay: .1s, .1s, .1s; }
  .sb-fly-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 14px; margin-bottom: 18px; border-bottom: 1px solid var(--line); }
  .sb-fly-title { font: 600 20px/1.2 var(--font-display); color: var(--ink); text-decoration: none; }
  .sb-fly-all { font: 500 13px/1 var(--font-body); color: var(--brand); text-decoration: none; }
  .sb-fly-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 28px; }
  .sb-fly-group-title { display: block; margin: 0 0 8px; font: 600 14px/1.2 var(--font-body); color: var(--ink); text-decoration: none; }
  .sb-fly-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
  .sb-fly-link { font: 13px/1.4 var(--font-body); color: var(--ink-muted); text-decoration: none; }
  .sb-fly-link:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
  @media (max-width: 1023px) { .hero-grid { grid-template-columns: minmax(0, 1fr); } .sb { display: none; } }
</style>
```

The flyout holds a nested loop of subcategories (into `.sb-fly-slot`, as in the other examples), laid out as `.sb-fly-grid` groups; for a two-level taxonomy the group title is the subcategory and the list is omitted. On tablet and phone the sidebar hides and the drawer (E) carries the same departments.

## E. Mobile drawer, refined

Full-height drawer with the search pinned, native accordions for departments, account and cart actions at the bottom, safe-area padding.

```html
<button class="md-btn" type="button" aria-controls="md" aria-expanded="false" aria-label="Menu"><span class="md-btn-bar"></span></button>
<div class="md-backdrop"></div>
<nav class="md" id="md" aria-label="Menu">
  <div class="md-head">
    <div bd-woo="search" class="md-search"></div>
    <button class="md-close" type="button" aria-label="Close">×</button>
  </div>
  <div class="md-scroll">
    <ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Drawer Department" bd-limit="20" bd-orderby="name" bd-order="asc" class="md-list">
      <li class="md-item">
        <details class="md-details">
          <summary class="md-summary"><span bd-bind="term_name"></span><svg class="md-chev" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6l4 4 4-4"/></svg></summary>
          <div class="md-sub">
            <a class="md-sub-link md-sub-link--all" bd-href="term_permalink">All <span bd-bind="term_name"></span></a>
            <div class="md-sub-slot"></div>
          </div>
        </details>
      </li>
    </ul>
    <ul class="md-list md-list--static">
      <li><a class="md-plain" href="/product-category/deals/">Deals</a></li>
      <li><a class="md-plain" href="/shop/?orderby=date">New arrivals</a></li>
    </ul>
  </div>
  <div class="md-foot">
    <a class="md-foot-link" href="/my-account/">Account</a>
    <a class="md-foot-link" href="/track-order/">Track order</a>
    <a class="md-foot-link" href="/contact/">Help</a>
  </div>
</nav>
<style>
  .md-btn { display: none; width: 44px; height: 44px; border: 0; background: transparent; color: var(--ink); cursor: pointer; position: relative; }
  .md-btn-bar, .md-btn-bar::before, .md-btn-bar::after { content: ""; position: absolute; left: 11px; width: 22px; height: 2px; background: currentColor; border-radius: 2px; }
  .md-btn-bar { top: 21px; } .md-btn-bar::before { top: -7px; left: 0; } .md-btn-bar::after { top: 7px; left: 0; }
  .md-backdrop { position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0; background: rgba(15,17,20,.5); opacity: 0; pointer-events: none; transition: opacity .25s; z-index: 190; }
  .md-backdrop.is-open { opacity: 1; pointer-events: auto; }
  .md { position: fixed; top: var(--wp-admin--admin-bar--height, 0px); bottom: 0; left: 0; width: min(380px, 90vw); background: var(--surface); display: grid; grid-template-rows: auto minmax(0, 1fr) auto; transform: translateX(-100%); transition: transform .28s cubic-bezier(.2,.8,.2,1); z-index: 200; padding-bottom: env(safe-area-inset-bottom); }
  .md.is-open { transform: none; }
  .md-head { display: flex; align-items: center; gap: 10px; padding: 12px 12px 12px 16px; border-bottom: 1px solid var(--line); }
  .md-search { flex: 1; min-width: 0; }
  .md-close { width: 40px; height: 40px; border: 0; background: transparent; font-size: 26px; color: var(--ink); cursor: pointer; }
  .md-scroll { overflow-y: auto; overscroll-behavior: contain; }
  .md-list { list-style: none; margin: 0; padding: 8px 0; }
  .md-list--static { border-top: 1px solid var(--line); }
  .md-summary { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; font: 500 16px/1.3 var(--font-body); color: var(--ink); cursor: pointer; list-style: none; }
  .md-summary::-webkit-details-marker { display: none; }
  .md-chev { color: var(--ink-muted); transition: transform .2s; }
  .md-details[open] .md-chev { transform: rotate(180deg); }
  .md-details[open] .md-summary { background: var(--surface-alt); }
  .md-sub { padding: 6px 0 10px; background: var(--surface-alt); }
  .md-sub-link { display: block; padding: 10px 16px 10px 28px; color: var(--ink); text-decoration: none; font: 15px/1.4 var(--font-body); }
  .md-sub-link--all { font-weight: 600; }
  .md-plain { display: block; padding: 14px 16px; color: var(--ink); text-decoration: none; font: 500 16px/1.3 var(--font-body); }
  .md-foot { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--line); }
  .md-foot-link { flex: 1; text-align: center; padding: 10px 8px; border: 1px solid var(--line); border-radius: var(--radius); color: var(--ink); text-decoration: none; font: 500 13px/1 var(--font-body); }
  @media (max-width: 1023px) { .md-btn { display: block; } }
</style>
```

Interactions: `md-btn` `click` → `add_class` `is-open` on `.md` and `.md-backdrop`; `md-close` and `md-backdrop` `click` → `remove_class` on both. Subcategories are the nested loop into `.md-sub-slot`. If `warnings` report that `<summary>` did not take the `bd-bind`, keep the `<span>` inside it (as written) so the binding lands on the span.

Design notes: 16px items at 14px padding (48px rows), a tinted open state so the accordion reads as a group, the search pinned at the top and the three utility links pinned at the bottom, and a spring-like easing on the slide. The drawer is the same component set as the desktop nav, so categories never diverge between breakpoints.

## What makes these read as designed

- One type scale per menu: bar 14 to 15px, panel titles 17 to 20px in the display font, links 14 to 15px, group titles 12px uppercase muted. Nothing else.
- Spacing on an 8px rhythm; panel padding 24 to 44px; column gaps 28 to 32px; link rows 36 to 48px tall.
- Motion that means something: 150 to 250ms, opacity plus a 6 to 8px settle, a short delay in and a longer delay out for hover intent, a chevron that rotates.
- A visible open state on the trigger (underline, tab colour, rotated chevron) and a visible focus ring on every link and button.
- An overlay or backdrop whenever a panel covers content.
- Counts and "View all" links so shoppers know what is behind a click; images conditioned on the term having one, since an absent one renders the placeholder.
- Mobile carries the same categories, never fewer.
