---
name: mega-menus
description: Design and build custom mega menus and department navigation with the Oxygen 6 or Breakdance builder - Amazon-style "All" flyouts with a department list and subcategory pane, Walmart-style department dropdowns, full-width multi-column category panels with promo tiles, tabbed mega panels, and the matching mobile drawer - driven by live product categories through nested term loops, with hover, click, keyboard and touch behaviour handled. Use when the user says "mega menu", "department menu", "navigation like Amazon/Walmart/Target", "category dropdown", "flyout menu", "shop by department", or wants a header navigation richer than a row of links.
---

# Mega menus

A mega menu is a header navigation whose items open large panels (columns of category links, subcategory panes, promo tiles) instead of a plain dropdown. The big stores use two patterns: a **department flyout** (Amazon's "All" button opens a full-height list; hovering a department reveals its subcategories in a second pane) and **hover panels** per top-level category (Walmart's "Departments", Target's "Categories": a wide panel with grouped columns). Build both with the builder's Menu Builder for the behaviour and `html-to-page` for the panel content, and feed them from live product categories with term loops so they never go stale.

Before building: `get-instructions`, the **building-sites** skill, and for stores the **woocommerce-store** header rules (mini cart, search). Confirm `EssentialElements\MenuBuilder` and `EssentialElements\MenuCustomDropdown` in `get-element-slugs` (Oxygen 6 ships them through the Breakdance Elements for Oxygen add-on; they are Pro in Breakdance).

Navbar shells (eight numbered variants, Relume-style) live in the **patterns** skill, `navbars.md`; this skill supplies the panels and behaviour behind the mega ones.

## Pick the mechanism

| Need | Use |
|---|---|
| Any mega menu that must work with hover, click on touch, keyboard, `Escape`, `aria-expanded`, and collapse into a mobile menu | **Menu Builder + Menu Custom Dropdown** (the default). The Menu Builder owns open/close, hover intent, focus and the mobile modes; each Menu Custom Dropdown is a container you fill with any elements, including term loops built by `html-to-page`. |
| Simple link columns with headings, no design inside the panel | **Menu Dropdown** (`EssentialElements\MenuDropdown`): a `columns` repeater of titles and links, plus an optional second section. Static links; fine for "Company / Support" menus, wrong for categories. |
| Logo, search field or cart inside the menu bar itself | **Menu Custom Area** (`EssentialElements\MenuCustomArea`), a container child of the Menu Builder that can also carry its own dropdown (`content.content.enable_dropdown`, `menu_source` standard columns or a component). |
| A WordPress-admin-managed menu with nested items | **WP Menu** (`EssentialElements\WpMenu`): dropdowns from the menu structure, same desktop and mobile controls, no custom panel content. |
| A department flyout that is not part of the menu bar (Amazon's "All" button, a "Departments" button beside the search) | **Hand-built with interactions**: a button plus an off-canvas panel authored in HTML, opened with `set-element-interactions`, department hover handled with CSS `:hover`/`:focus-within`. You own accessibility and mobile behaviour; see the recipe below. |

Never use inline `onclick`/`onmouseover` or `<script>`; the converter drops them. Never fake a category link with a search URL; every category link is `bd-href="term_permalink"` from a term loop.

## Workflow (Menu Builder mega menu)

1. **Discover**: `search-posts` for the header template (build one with `create-template` and `template_type: "everywhere"` if none), `get-dynamic-fields` for `term_name`, `term_permalink`, `woocommerce_category_image`, `woocommerce_category_count`, and `get-breakpoints`. Look at the category tree: how many top-level categories, how deep. Decide with the user which categories get panels (5 to 8 top-level items is the ceiling for a horizontal bar; more than that wants an Amazon-style "All" flyout).
2. **Frame**: author the header with `html-to-page` (logo, `<div bd-woo="search"></div>`, account, mini cart) leaving an empty `<div class="hdr-menu-slot"></div>` where the menu goes. Or insert `EssentialElements\HeaderBuilder` for its sticky and overlay controls.
3. **Insert the menu** with `edit-post`: a `MenuBuilder` into the slot, then one `MenuCustomDropdown` per mega item (children must be direct children of the Menu Builder) with `content.content.text` and an optional `content.content.link` (the category archive URL, so the label itself is a link), plus plain `TextLink` children for items without panels.
4. **Fill each panel** with `html-to-page`, passing the dropdown's element id as `parent_id`. The panel is ordinary HTML: a grid of columns, each column a `bd-loop="terms"` or static links, a promo tile, a product row. Loops nest: a department column that lists subcategories is an inner term loop built into the outer loop's component with a second `html-to-page` call and a current-term query (below).
5. **Configure the menu** with `edit-post`: `design.desktop_menu.dropdowns.wrapper` (background, full width), `design.desktop_menu.dropdowns.open_dropdowns_on_click` (`true` when panels hold interactive content, `false` for hover intent), `design.desktop_menu.transition_duration`, `design.mobile_menu.show_at` (breakpoint), `design.mobile_menu.mode` (`offcanvas` for stores, `fullscreen` for small menus), `design.mobile_menu.offcanvas_position`, `design.mobile_menu.top_bar.logo`, `design.mobile_menu.links.*`. Read `get-element-schemas` for the exact shapes.
6. **Style** the panel content through your own classes in the `<style>` block; style the menu bar links through the Menu Builder's design controls or one level under your slot class (class map below). One mechanism per property.
7. **Verify**: `preview-post` on the header with `include_css`; the panel markup renders closed (`aria-hidden="true"`), which is correct. Ask the user to test hover, keyboard tab order, `Escape`, and the mobile drawer in a browser.

## Nested term loops (department → subcategories)

A department column that lists its own subcategories is two loops. First the outer loop in the panel HTML:

```html
<div bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Department" bd-limit="8" bd-orderby="name" bd-order="asc" class="mega-cols">
  <div class="mega-col">
    <a class="mega-head" bd-href="term_permalink" bd-bind="term_name"></a>
    <div class="mega-sub-slot"></div>
  </div>
</div>
```

Restrict it to top-level categories with `edit-post` on the loop element: `content.query.load_terms_by_query: true` and

```php
return [ 'taxonomy' => 'product_cat', 'parent' => 0, 'hide_empty' => true, 'number' => 8, 'orderby' => 'name' ];
```

Then run `html-to-page` on the created component (`created_blocks[].post_id`) with the inner loop, `parent_id` set to the `.mega-sub-slot` element:

```html
<ul bd-loop="terms" bd-taxonomy="product_cat" bd-loop-name="Mega Subcategory" class="mega-list">
  <li><a class="mega-link" bd-href="term_permalink" bd-bind="term_name"></a></li>
</ul>
```

and bind it to the current department with `edit-post` (`content.query.load_terms_by_query: true`, `content.query.term_query`):

```php
$term = \Breakdance\LoopBuilder\getCurrentTerm(true);
return [ 'taxonomy' => 'product_cat', 'parent' => $term ? $term->term_id : 0, 'hide_empty' => true, 'number' => 8, 'orderby' => 'name' ];
```

`getCurrentTerm(true)` returns the outer loop's current term on the front end and a sample term in the builder preview. A products row per department works the same way with a Post Loop in php query mode: `tax_query` on `$term->term_id`. A `bd-loop` written inside another loop's item in the same `html-to-page` call is not converted (the converter warns); the second call on the component is the way.

## What a great mega menu looks like

- **Top bar**: 5 to 8 items, 15 to 16px, generous horizontal padding, the active item underlined or bolded, a subtle chevron on items that open panels. On stores the bar sits under the logo/search row (Walmart) or as a second row (Target); Amazon-style "All" sits at the far left of that row.
- **Panels**: full-width or anchored, 3 to 5 columns of 6 to 10 links each, column headings that are themselves links to the parent category, 24 to 32px column gap, 28 to 40px panel padding, a light top border or shadow separating the panel from the bar, and a dark 30 to 40% overlay behind it (Header Builder `design.overlay`, or the Menu Builder's dropdown wrapper controls). A promo tile (image, headline, CTA) in the last column earns its place only when it is curated, not decorative.
- **Hover intent**: panels open on hover with a short delay and stay open while the pointer moves diagonally into them; the Menu Builder handles this. Hand-built panels need `:hover` on the parent item covering both the trigger and the panel, with no gap between them.
- **Keyboard and touch**: the trigger is a button with `aria-expanded`; `Tab` moves through the panel links; `Escape` closes; on touch devices a tap opens and a second tap on the link navigates. The Menu Builder does all of this; a hand-built panel gets a `click` interaction at minimum and `:focus-within` in CSS.
- **Mobile**: a drawer with the same categories as an accordion (department → subcategories), the search on top, account and cart links at the bottom. Never hide categories on mobile; most store traffic is mobile.
- **Density**: Amazon shows everything because it sells everything; a 40-product store wants three panels at most. Match the menu to the catalog and ask the user which categories matter.
- **Stacking**: the header needs `z-index` above page content and the panel above sticky elements; the WordPress admin bar (32px, 46px on mobile, `z-index: 99999`) sits above all of it for logged-in users. Anything pinned to the top of the viewport starts below it: sticky headers use `top: var(--wp-admin--admin-bar--height, 0px)`, and fixed drawers, flyouts, backdrops and overlays replace `top: 0` / `inset: 0` with `top: var(--wp-admin--admin-bar--height, 0px)` / `inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0`. A drawer written with `top: 0` loses its header and close button under the bar.

## Class map (Menu Builder markup)

Confirm with `preview-element` on the menu; these are the builder's stable classes: `.breakdance-menu` (wrapper), `ul.breakdance-menu-list`, `.breakdance-menu-link` (each top-level link or button), `.breakdance-dropdown` (an item with a panel; `--custom` for Menu Custom Dropdown), `.breakdance-dropdown-toggle`, `.breakdance-menu-link-arrow` (the chevron button), `.breakdance-dropdown-floater` (the positioned panel, `aria-hidden` toggled by the script), `.breakdance-dropdown-body`, `.breakdance-dropdown-custom-content` (where your `html-to-page` content lands). Style one level under your own class on the slot or the menu, and prefer the design controls for the bar itself.

## Hand-built department flyout (Amazon "All")

When the flyout lives outside the menu bar, author it in HTML with an empty department list slot, then loops and interactions:

- A `<button class="all-btn" aria-expanded="false">All</button>` in the header row.
- An `<aside class="all-panel">` fixed to the left edge: a header with the user's name (or "Hello, sign in"), a `bd-loop="terms"` department list, and a second pane for subcategories that shows on hover of a department (the nested loop above, rendered inside each department item and revealed with `.all-dept:hover .all-sub` / `.all-dept:focus-within .all-sub`).
- A `<div class="all-backdrop"></div>`.
- Interactions: `click` on the button → `toggle_class` `is-open` on `.all-panel` and `.all-backdrop`; `click` on the backdrop and on the close button → `remove_class`. Add `key_down` for `Escape` if the trigger schema exposes the key.
- CSS: the panel `position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) auto 0 0; width: 365px; transform: translateX(-100%)` with `.is-open { transform: none }`, the backdrop `position: fixed; inset: var(--wp-admin--admin-bar--height, 0px) 0 0 0; background: rgba(0,0,0,.6)`, and the subcategory pane `position: absolute; left: 100%; top: 0; width: 365px` on desktop, stacked under the department on mobile.

The full recipes are in `examples/`: `recipes.md` for Menu Builder builds and `vanilla-menus.md` for five hand-built menus (hover mega bar, click mega bar with interactions, refined Amazon-style flyout, vertical department sidebar with flyouts, mobile drawer), each finished to a showcase standard with design notes. The trade-off: you own keyboard behaviour (no `Escape`, no focus trap without the Menu Builder) and the mobile layout. Say so to the user and offer the Menu Builder version when accessibility matters.

## Positioning a hand-built panel: use CSS anchor positioning

Any panel you build yourself (a dropdown under a nav item, a flyout beside a department, a submenu) is positioned with CSS anchor positioning, not with `position: relative` on the parent and `top: 100%` on the panel. Anchor positioning is the reason the old edge hacks can go: a panel near the right edge of the viewport flips to the other side by itself, so you never write `:nth-last-child(-n+2) { left: auto; right: 0 }` and guess which items are near the edge.

```css
.cm-panel { width: min(880px, calc(100vw - 2 * var(--gutter))); }

@supports (anchor-name: --a) {
  .cm-item  { anchor-name: --cm-item; anchor-scope: --cm-item; }
  .cm-panel { position: fixed; position-anchor: --cm-item;
              position-area: bottom span-right; position-try-fallbacks: flip-inline; }
}

/* browsers without it keep the old static-position layout */
@supports not (anchor-name: --a) {
  .cm-item  { position: relative; }
  .cm-panel { position: absolute; top: 100%; left: 0; }
  .cm-item:nth-last-child(-n+2) .cm-panel { left: auto; right: 0; }
}
```

Four things decide whether this works.

- **`anchor-scope` is not optional in a loop.** Every item rendered by a `bd-loop` carries the same class and therefore the same `anchor-name`. Without `anchor-scope` limiting that name to the item's own subtree, every panel in the menu resolves to the *last* element carrying the name and they all stack under the final nav item. This is the failure to look for first when panels appear in the wrong place.
- **`position: fixed`, not `absolute`, unless nothing above the panel is positioned.** The flip only fires when the panel's containing block is the viewport. With `position: absolute` the containing block is the nearest positioned ancestor, and a header carrying `position: relative` for its own z-index is enough to stop the flip: the panel then hangs off the side of the screen exactly as it did before. `position: fixed` takes the viewport as its containing block whatever the header does, and it also escapes an `overflow: hidden` bar. The one thing that still traps a fixed panel is an ancestor with a `transform`, `filter` or `contain`, which makes that ancestor the containing block again.
- **Keep physical and logical keywords apart in `position-area`.** `bottom span-right` is valid; `bottom span-inline-end` mixes the two, the whole declaration is dropped, and the panel silently falls back to its static position, which looks close enough to correct that it is easy to miss.
- **A fallback only fires when it actually helps.** If no flip fits either (a panel wider than the space on both sides), the browser keeps the original position and the panel still overflows. Cap the panel width against the viewport, as the rule above does.

Anchor positioning is Baseline across Chrome, Edge, Safari and Firefox as of early 2026, so the `@supports` fallback is there for older installs, not for a missing feature. Write both branches anyway.

For a flyout that opens to the side of a vertical department list, the same pattern with `position-area: right span-bottom` and `position-try-fallbacks: flip-inline` moves it to the left edge when the window is narrow.

**One exception**: the Menu Builder's own dropdown (`.breakdance-dropdown-floater`) is positioned by the element's script through `--dropdown-offset-x` / `--dropdown-offset-y` custom properties. Leave it alone, style its contents, and use the element's own dropdown controls. Anchor positioning is for the menus you build in HTML.

## Design standard for every menu

- One type scale: bar 14 to 15px, panel titles 17 to 20px in the display font, links 14 to 15px, group titles 12px uppercase and muted.
- 8px spacing rhythm; panel padding 24 to 44px; column gaps 28 to 32px; rows 36 to 48px tall (44px minimum on touch).
- Motion with meaning: 150 to 250ms, opacity plus a 6 to 8px settle, a short delay in and a longer delay out for hover intent, a rotating chevron. `prefers-reduced-motion` cannot be expressed (the importer skips `@media` queries that are not registered breakpoints), so keep motion short.
- A visible open state on the trigger and a visible `:focus-visible` ring on every link and button.
- An overlay or backdrop whenever a panel covers page content (`:has()` selectors are kept verbatim by the importer, so `.nav:has(.item:hover) .overlay` works).
- Counts and "View all" links in panels; category images only where they exist. A term with no image renders the builder's placeholder rather than an empty `src`, so condition the image (`dynamic-data` / `is not empty`) instead of trying to hide it with CSS.
- Mobile carries the same categories as desktop, never fewer.

## Common failures

- Panel content built into the page instead of the dropdown: `html-to-page` without `parent_id` appends at the root. Pass the Menu Custom Dropdown's element id.
- A `MenuCustomDropdown` inserted outside the Menu Builder: it is restricted to being a direct child; `edit-post` rejects it elsewhere.
- Subcategory loop shows the same list under every department: the inner loop's query is not bound to the current term; set `term_query` with `getCurrentTerm`.
- Inner `bd-loop` silently became a plain list: it was written in the same call as the outer loop. Run `html-to-page` on the component.
- Panel closes when moving the pointer to it: a gap between trigger and panel in a hand-built menu; remove the gap or pad the panel's top into the trigger's box.
- Panel behind the page: header `z-index` too low, or a sticky section with its own stacking context.
- Categories missing on mobile: `design.mobile_menu.show_at` not set, or the hand-built flyout has no mobile layout.
- Menu opens on click only: `open_dropdowns_on_click` is on; turn it off for hover panels.
