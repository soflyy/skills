---
name: building-sites
description: Core guidance for building or editing pages, sections, headers, footers and templates with the Oxygen 6 or Breakdance builder MCP tools - the preferred html-to-page build path, the design-system rules, editing versus building, interactions, animations, forms, reusable components, verification, and how to talk to the site owner. Load this for any work done through the builder's MCP tools.
---

# Building sites

Oxygen 6 and Breakdance (two builders sharing the same tools) are visual website builders for WordPress that replace the theme entirely: pages, headers, footers, templates, archives, WooCommerce layouts and reusable components are all built from low-level HTML primitives and styled with CSS classes, variables and global styles. "Oxygen" here always means Oxygen 6; Oxygen 5 and earlier are a different builder these tools do not work with. There are no prebuilt card, hero or widget components: a "card" is a Container with an Image and Text inside, styled with CSS.

Apply this file on every build, template or edit. Call `get-instructions` before the first build or edit tool in a session; it is the live contract for this site and version, and where it and this file disagree, it wins. For anything WooCommerce, load the **woocommerce-store** skill as well and call `get-ecommerce-instructions`.

## The tools, grouped

- **Discover**: `site-info` (active plugins, `css_prefix`, `modern_normalize_enabled`, shop page), `search-posts`, `get-post-details`, `get-post-tree`, `get-breakpoints`, `get-css-selectors`, `get-css-variables`, `get-dynamic-fields`, `get-dynamic-data-categories`, `get-element-slugs`, `get-element-schemas` (use `paths` to keep it small), `get-dropdown-options`, `get-media-sizes`, `get-template-conditions`, `get-element-conditions`, `get-global-settings` and `preview-global-settings-css` (where global settings exist), `get-settings`.
- **Build**: `create-post`, `create-template`, `create-reusable-component` (Breakdance: `create-reusable-global-block`), `html-to-page`, `insert-stylesheet`, `insert-css-variables`, `set-global-settings` (where available), `set-home-page`.
- **Edit and configure**: `edit-post` (insert, update, move, delete, duplicate), `set-element-interactions`, `set-element-animations`, `set-element-form`, `set-element-conditions`, `set-element-variable-overrides`, `set-template-conditions`, `change-post-status`, `delete-css-selectors`, `delete-css-variables`; Oxygen 6 only: `get/set-component-editable-properties`, `set-component-instance-properties`; Breakdance only: `create-popup`, `set-popup-settings`, `get/set-maintenance-mode`; site-wide: `set-settings`, `run-site-tool`.
- **Verify**: `preview-post` (flags `include_css`, `include_header_footer`), `preview-element`, `get-element-css`, `get-post-css-files`.
- **Forms data**: `get-form-submissions`, `get-form-submission`, `mark-submission-read`.
- **Problems**: `report-bug`.

Site-wide switches are settings, not page markup: `get-settings` returns the whole Settings screen grouped by tab (the theme system, Modern Normalize, which post types the builder can edit, the header and footer code injected into every page, hidden elements, user access, and the performance and privacy toggles) and `set-settings` patches it. Read it when the frontend does not match what you built; several of those switches change how every page renders. Every list-shaped field except `user_access.role_permissions` replaces its whole list, so send the current value back with your change folded in. The API Keys and Agents & MCP tabs are read by neither: third-party credentials and the switch that decides which tools exist are the user's to set in wp-admin.

`run-site-tool` runs the Settings > Tools operations against the whole install: `regenerate-css-cache` when the frontend serves stale CSS, `create-directories` when CSS or fonts stop updating at all, `replace-url` after a domain move, `export-settings` / `import-settings` for the whole option set, and `soft-reset`. `soft-reset`, `import-settings` and `replace-url` overwrite data with no undo, so run them only when the user asked for exactly that, after saying what will be overwritten and taking an `export-settings` backup; never on your own initiative. The tab's Total Reset is not available over MCP: if the user wants it, point them at Settings > Tools in wp-admin rather than approximating it.

Tool names carry the builder prefix on the wire (`oxygen-html-to-page`, `breakdance-html-to-page`); this file writes them without it.

## Preferred build path: html-to-page plus insert-stylesheet

Author new layouts as HTML and CSS, never element by element:

1. `insert-stylesheet`: create or extend the design system as raw CSS, `:root { --name: value }` variables and reusable classes, before building pages with them.
2. `html-to-page`: write each page or section as clean semantic HTML with a `<style>` block (one-off rules plus `@media` overrides copied verbatim from `get-breakpoints`). The converter builds the element tree and the selectors in one call and needs no element schemas.
3. Repeating collections stay in the HTML: mark the container `bd-loop="products|posts|terms"` and bind the item's values with `bd-bind`, `bd-href`, `bd-src`, `bd-alt`; the converter creates the loop element and its repeated component.
4. `edit-post` plus `get-element-schemas` is not a build path. It is the tool for changing what already exists and for the few things HTML cannot express: forms, dynamic widgets, native design properties, moving or deleting elements.

**Building versus editing.** `html-to-page` only adds: it appends under `parent_id`. "Change the headline", "swap that photo", "make the button say Book now" are `edit-post` updates on the existing element (find its id with `get-post-tree`). Re-running `html-to-page` for a change leaves the old section in place and adds a second one; rebuild with it only when you delete the old section in the same pass.

**Markers** are `bd-*` attributes the converter consumes: `bd-loop`, `bd-loop-name`, the loop query knobs (`bd-limit`, `bd-orderby`, `bd-order`, `bd-category`, `bd-featured`, `bd-taxonomy`, `bd-hide-empty`, `bd-query`), the bindings (`bd-bind`, `bd-href`, `bd-src`, `bd-alt`, `bd-params`), `bd-animate` and its tuning attributes, and `bd-woo` for WooCommerce parts. A misspelled or misplaced marker is dropped with a warning; every other attribute (`id`, `role`, `aria-*`, `data-*`, `target`) is preserved as a custom attribute. Every tag survives (`<table>`, `<dl>`, `<details>`, `<address>`, custom elements); only document-level tags fall back to `<div>`. Read the `warnings` in every response.

A typical new page: `insert-stylesheet` for the system CSS, `html-to-page` per section, `edit-post` where a form or dynamic widget needs configuring, `get-post-tree` to verify the tree, `preview-post` to check the rendered HTML. For a new site, store or batch of pages, design everything as HTML and CSS files first and push when it looks finished: the **design-first-build** skill is the default workflow for that. Start sections from the **patterns** skill (numbered navbar, product header and accordion variants) rather than inventing layouts.

## Design foundation first

- **Oxygen 6**: the design system is CSS. Establish `:root` variables (colour roles, font roles) and base classes with `insert-stylesheet` and build everything against them. Global settings only exist when an add-on enables them; prefer the CSS system.
- **Breakdance**: read `get-global-settings`, then set the global colours (`colors.background`, `colors.text`, `colors.headings`, `colors.links`) and `typography.heading_font` / `body_font` with `set-global-settings` (it deep-merges). Unset globals fall back to grey canvases and brand-blue links.
- **Both**: enable Modern Normalize with `set-settings` (`advanced.modern_normalize_enabled`). It is off by default, so browser default margins and padding survive on headings, paragraphs and lists; the elements the tools create carry no margin defaults of their own. Never hand-import a tag-level reset. On a site with existing hand-built pages, ask before enabling it, because their spacing will tighten.
- Where global settings exist, call `preview-global-settings-css` before writing page CSS: it sets `color` and `font-family` directly on `body`, headings and links, so a colour on a wrapper does not cascade into them.

## CSS rules

- **Importing replaces, it does not patch.** A rule sent for a selector replaces that selector's properties at that breakpoint. To change one declaration of an existing class, read it back (`get-css-selectors` with `include_properties: true` and `names`), then re-import the complete rule with the change folded in, `@media` rules included, batched in one call. The response `warnings` name any dropped properties.
- **Class naming**: prefixing is optional; if you prefix, use the site's `css_prefix` from `site-info`, never your own. Name by role (`hero`, `card`), reuse existing classes, and never record a new prefix unless establishing the site's first design system.
- **Fonts**: naming a Google Font in a `font-family` declaration or a `:root` variable loads it automatically. Never add `@font-face`, `@import` or a `<link>`. The real family name comes first in the value.
- **SVG icons**: an `<svg>` becomes an SVG Icon element rendered as a wrapper div carrying your class; size it with `width`/`height` (default `1em`) and colour it with `color`.
- **Default styles**: the builder's defaults set `color` on headings and links directly, and a direct tag rule beats an inherited value, so every heading on a coloured background needs `color` on its own class. `a:hover` outranks a single class; restate `color` in each state rule. Never use resets or `!important` to fight this.
- **Responsive**: desktop-first. Build at the base breakpoint and override downward only what changes. Element design controls are per breakpoint and have `_hover` siblings for hover states.
- **Grid**: never a bare `1fr`; use `minmax(0, 1fr)` for equal columns and `repeat(auto-fit, minmax(280px, 1fr))` for wrapping grids.
- **Sticky**: offset by the admin bar, `top: calc(var(--wp-admin--admin-bar--height, 0px) + 0px)`.
- **Variables**: a variable's value may be keyed by breakpoint; `set-element-variable-overrides` redefines a global variable for one element and its descendants (a dark section).

## Images and semantic tags

- An image property takes an attachment id, `{"id": 1392}` (plus `alt`/`caption`); the server fills in the URL and srcset. An external image is `{"id": -1, "url": "https://..."}`. Pick a rendered size with a slug from `get-media-sizes`.
- `html-to-page` keeps your tags. With `edit-post`, set `settings.advanced.tag` so Containers become `<section>`, `<nav>`, `<ul>`/`<li>` and Text becomes `<p>`, `<h2>`, `<blockquote>`. A landmark appears once per page: templates must not contain `<main>`.

## Behaviour: interactions and animations

- Element behaviour (toggles, menus, class switches) belongs in interactions, never in `on*` attributes or `<script>` blocks, which the converter drops and which bypass the builder. Create the element plain, then `set-element-interactions`: a `trigger` (`click`, `mouse_enter`, `scroll_into_view`, `page_loaded`, ...) plus ordered `actions` (`toggle_class`, `add_class`, `remove_class`, `show_element`, `hide_element`, `scroll_to`, `set_attribute`, `control_popup`, ...), each with `target` `this_element` or `custom` plus a `css_selector`. Example: a burger button with `click` → `toggle_class` `is-open` on `.header`.
- Entrance animations are markers: `bd-animate="fade|slideUp|slideDown|slideLeft|slideRight|flipUp|flipDown|flipLeft|flipRight|zoomIn|zoomOut"` with `bd-animate-duration`, `-delay`, `-distance`, `-offset`, `-ease`, `-once`, `-disable-at`. Stagger siblings with increasing delays; animate a section or a few children, not both. Never hand-roll entrance animations with `@keyframes` (they run on load, not on scroll). Scroll-driven and sticky animations, and edits to existing ones, go through `set-element-animations`.

## Forms

A `<form>` in HTML converts to a plain Container with nothing wired up. Insert `EssentialElements\FormBuilder` with `edit-post`, then configure fields, messages and actions with `set-element-form` (its own schema covers the whole form). Read submissions with `get-form-submissions`.

A search box is not a form. Never author `<form role="search">` or `<input type="search">` (the input folds into a Text element as dead markup); place `<div bd-woo="search"></div>` instead, which emits the Search Form V2 element (`EssentialElements\SearchFormV2`: input, submit button and optional autocomplete) and works without WooCommerce. On a store it is limited to products; elsewhere it searches the whole site. For a header, switch it to a modal toggle with `edit-post` (`design.form.mode: "modal"`).

## Reusable components

A component (Breakdance: global block) is built once and rendered wherever it is referenced. A loop's card is minted for you by `bd-loop`; for anything else, `create-reusable-component` with a `title` (and a `preview` size so the builder canvas shows it at its real width), build into the returned `post_id` with `html-to-page`, and reference it from a component element or a loop's block property (read the schema for the property name). Verify with `preview-post` and `context_post_id`. On Oxygen 6, expose per-instance overrides with `set-component-editable-properties` and set them with `set-component-instance-properties`.

## Breakdance-only features

Popups are their own post type (`create-popup` returns `popup_element_id`; build inside it, style the shell through the popup element's design properties, set `triggers`). Maintenance mode is `get/set-maintenance-mode`; ask before enabling it on a live site. The Design Library tools exist only when enabled in settings and only when the user asks for a pre-made design.

## Verify before you say it is done

`get-post-tree` for structure, `preview-post` for the rendered HTML (`context_post_id` on templates and components so bindings resolve; `include_header_footer` to see the frame; `include_css` for the generated CSS), `preview-element` for one element, and the `warnings` of every `html-to-page` and `insert-stylesheet` call. Check the mobile breakpoint. If a tool misbehaves on valid input, file it with `report-bug` and ask the user before posting anything public.

The installable plugin also bundles the Playwright MCP server (its tools are named `browser_*`). It is not part of the normal build loop: do not open a browser for landing pages, headers, footers, templates, archives or any other page; `preview-post` is the check there. It exists for the four WooCommerce pages whose behaviour a server render cannot show, and only those: the single product page (variation price, add-to-cart), the cart (a real session with items), the checkout (a test order) and My Account (logged in and out). The **woocommerce-product-page**, **woocommerce-cart-checkout** and **woocommerce-my-account** skills say exactly what to do there.

## Talk to the user like a business owner

Never mention schemas, slugs, element trees or JSON. Describe outcomes ("I'm adding a section with your headline and a sign-up button"), ask for decisions with a few concrete options, and say what the user still has to do themselves.
