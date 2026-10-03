---
name: design-first-build
description: The default workflow for building a new site, store or set of pages with Oxygen 6 or Breakdance - design the whole thing first as plain HTML and CSS files, review and iterate until they read as finished, then convert mocks to builder markers and push each page and template through html-to-page. Use when the user asks to build a new site, a new store, a redesign, or several new pages at once; not for editing an existing page (that is edit-post on the live tree).
---

# Design first, push second

Agents produce far more polished sites when they design the entire site as HTML and CSS files before touching the builder. The reasons are mechanical: one shared stylesheet forces one design system, a whole page is reviewed in one read instead of node by node, and edits to a file are free while builder round trips are not. The files carry the builder's markers from the start, so the finished prototype is the push input itself; a bundled mock script makes it viewable in a browser without touching the markup. This skill is that workflow. It sits on top of **building-sites** (the build rules), **patterns** (the starting layouts) and the WooCommerce skills (what each store template needs).

Use it for: a new site, a new store, a redesign, a batch of new pages or templates. Do not use it for: changing something that already exists on a page (find the element with `get-post-tree` and use `edit-post`), or a single small section on an existing page (write it as HTML and push it directly).

## The loop

```
read the site  →  prototype as files with the real markers  →  review  →  fix  →  (repeat)  →  pre-push check  →  push  →  verify in the builder
```

### 1. Read the site (before writing any CSS)

- `site-info`: builder, `css_prefix`, `modern_normalize_enabled`, WooCommerce and its page ids.
- `get-breakpoints`: the exact `@media` queries the importer accepts. The prototype uses these and only these.
- `get-css-variables`, `get-css-selectors`, `get-global-settings` where it exists: tokens and classes to reuse. On an existing site, the prototype starts from them; on a new site, you define them.
- `get-dynamic-fields` and, for stores, `get-ecommerce-instructions`: the field slugs and `bd-woo` aliases the files will use from the first line.
- Ask the owner the questions the build needs (brand kit, photos and their ratio, policies, categories that matter, the pages the site needs). One `AskUserQuestion`.

### 2. Set up the prototype folder

Use the client's scratch directory when it provides one; otherwise `.oxygen-prototype/` in the working directory (add it to `.gitignore`). Layout:

```
prototype/
  site.css              the design system: :root tokens, base classes, the woo layer, the components every page shares
  mock.js               copied from this skill's scripts/ folder (plugin install only); fills the markers with sample content in the browser
  pages/
    home.html           one file per page or template: a full document whose <body> is the exact html-to-page input
    shop.html
    product.html
    cart.html
    checkout.html
    about.html
```

**The files carry the real builder markers from the first line.** There is no separate conversion pass: a page's `<body>` is what `html-to-page` receives, so write it the way the converter wants it and let `mock.js` make it viewable.

- Every dynamic value is a marker, exactly as it will be pushed: `bd-bind="product_title"` on an empty heading, `bd-href="post_permalink"` on an `<a>` with no `href`, `bd-src="product_image" bd-alt="product_title"` on an `<img>` with no `src`, `bd-loop="products"` with `bd-loop-name` on the grid container holding ONE card, `bd-woo="add-to-cart"` on an empty div, `bd-animate` where an entrance animation belongs. Nothing typed in where a marker belongs; the mock fills it on screen and the converter binds it on push.
- Static copy (hero headline, policies, about text) is real text in the file; it is not mocked and it is what ships.
- The page shell is only for viewing: `<!doctype html><html><head><link rel="stylesheet" href="../site.css"><script src="../mock.js" defer></script><style>…page rules…</style></head><body>…sections…</body></html>`. On push, the `<style>` block travels with the body content; the `<html>`, `<head>`, `<link>` and `<script>` tags never do (the converter drops them with warnings).
- Template pages follow the template rules: no `<main>` anywhere, the product page wrapped in `bd-woo="product"`, the archive loop with no query knobs, nested loops written as the outer loop only with a `-slot` element where the second call goes.
- Forms are an empty slot element (`<div class="lead-form-slot"></div>`) drawn with a comment describing the fields; they become the Form Builder after the push. Interactions are comments next to the element (`<!-- interaction: click → toggle_class .hdr is-open -->`) and are wired with `set-element-interactions` after the push; never inline handlers or `<script>` in the body.
- `site.css` is written exactly as it will be sent to `insert-stylesheet`: `:root` variables, class rules, one level of nesting under a class (`.card:hover .card-img`), `@media` blocks copied from `get-breakpoints`, `@keyframes` allowed. No `@supports`, `@import` or `@font-face` (naming a Google Font loads it), and no `@media` query that is not a registered breakpoint (`prefers-reduced-motion` and `(hover: hover)` are skipped by the importer).

Start each page from the closest **patterns** variant (navbar, product header, product grid, accordion, cart, checkout, account; for those three, keep the pattern's shared CSS for the WooCommerce parts even when the layout is your own) and the store skills' recipes: they are already written with the markers in place, so a page assembled from them is pushable as soon as it looks right.

`mock.js` ships with the installable agent plugin (this skill's `scripts/` folder); it is not served by the MCP `get-skill` tool. Without it, review by reading the source (step 3 works that way anyway) or ask the owner to install the plugin. To view a page with it, open the file in a browser: `mock.js` expands loops with sample products and categories, fills bindings, draws the WooCommerce parts (price, rating, add-to-cart form, mini cart, search) and swaps in placeholder photos. Override its sample data with a `window.MOCK` object in the page head (`depts`, `subs`, `products`, `prices`) when the store's real names read better. It also fills the slot divs the cart, checkout, account and login frames leave for the WooCommerce elements (`.cart-slot`, `…-items-slot`, `…-totals-slot`, `chk-billing-slot`, `chk-review-slot`, `chk-payment-slot`, `.account-slot` with `data-mock="orders|view-order|edit-address"`, `.login-slot`, `.login-form-slot`, `.track-slot`) with WooCommerce's real markup and the builder's default rules for it, so those pages can be prototyped and reviewed like any other; the stylesheet it injects is a subset of the builder's, so review those pages against the real site after the push.

### 3. Review

Keep this step light: the value of the prototype is that reviewing a file is cheap. Do not install browsers or render every page at every width.

- **Self-review by reading**, page by page, against the design standard in **patterns** and **mega-menus** (one type scale, 8px rhythm, motion with meaning, visible focus, an overlay under any panel, mobile carrying everything desktop has) and the store quality bar in **woocommerce-store**. The recurring faults are easy to spot in the source: card image ratios that differ between pages, headings on a dark band with no `color` of their own, buttons defined with three different heights, a hero taller than the viewport with the CTA below it, a phone breakpoint that was never written, a grid with a bare `1fr`.
- **Cross-page consistency** is the whole reason for the prototype: open the header, a card and a button in each file side by side and make them use the same classes from `site.css`, not near-duplicates.
- **Ask the owner to look**: the files open in any browser. Point them at the home page and one product page, ask for changes in their words, and fix the files. This is the cheapest review there is.
- **A screenshot only when it is already cheap**: if a browser is already available in the environment (a Playwright install, or the client can render HTML), take one desktop screenshot of the home page and one of the product page and read them. Never make the workflow wait on installing a browser, and never screenshot every page at every width; the source review covers that. (The plugin's bundled Playwright server is for step 6, not this one — see **building-sites**.)

Iterate until the source would read as a finished site to a designer; that is when the builder gets it.

### 4. Pre-push check

The files are already in the converter's dialect, so this is a checklist, not a rewrite:

- Nothing left to bind: search each page for typed prices, product names, category names and image paths that should be markers.
- No hand-built search form (the search rule in **building-sites**).
- Bound elements are empty; loop containers hold exactly one item; `bd-loop-name` is set; no `href` or `src` beside a binding; `bd-params` is valid JSON; no `<script>`, no inline handlers, no `<main>`; `@media` queries match the breakpoints.
- Product pages: every part marker sits inside the `bd-woo="product"` wrapper (except breadcrumbs, gallery, related, upsells, mini cart, search); the gallery has an `aspect-ratio`; notices are styled.
- Archive pages: the loop has no query knobs. Pages: every loop has a query.
- Every optional bound value and woo part has a collapse rule. A rating with no reviews, an excerpt with no short description, a sale badge on a full-price product and a stock line with stock display off all render an empty box that still takes its share of the `gap`. Put the marker on the box you style and add `:empty { display: none }` for each one. `:empty` never matches a wrapper around the marker, because the wrapper has an element child, so keep your class on the marker itself or test the wrapper with `:has()` instead.
- Nested lists (subcategories under categories, products under a category) are the outer loop plus a slot; the inner loop is its own file or snippet for the second call.

If this plugin's repository tooling is available, its lint (`tools/lint-skills.mjs` in the package) checks the same rules on fenced HTML; otherwise run the checklist by hand.

### 5. Push

1. `set-settings` (`advanced.modern_normalize_enabled`) if the prototype assumed a reset (it should have), asking first on a site with existing pages.
2. `insert-stylesheet` with `site.css` once. Read the `warnings`: dropped selectors or properties here affect every page.
3. For each page or template, in dependency order (header and footer templates, then archive and single templates, then pages): create the post or template (`create-post`, `create-template` with its conditions), then one `html-to-page` call with the file's `<body>` content plus its `<style>` block (not the document shell, the stylesheet link or the mock script). Read the `warnings` after every call and fix the source file, not the builder tree, so the prototype stays the source of truth. A placeholder-content or unknown-marker warning means the file still has something to fix.
4. Nested loops: a second `html-to-page` on each created component with the inner loop snippet, then `edit-post` for the inner query.
5. `edit-post` for the parts markup cannot carry: form configuration, mini cart and search settings, loop pagination style, tabs layout, product info headings. `set-element-interactions` for every interaction comment.
6. `set-home-page` when the home page is ready; `change-post-status` to publish what the owner approved.

### 6. Verify in the builder

`get-post-tree` per post for structure, `preview-post` with `context_post_id` for templates (a simple product, a variable one, a sale one, an out-of-stock one; a category for the archive), `preview-element` on parts whose internal markup you styled (the add-to-cart block, the mini cart). Compare the rendered HTML against the prototype: same classes, same structure, bindings resolved. Then the product, cart, checkout and My Account pages get the browser check described in their own skills; everything else is done at `preview-post`, with the owner clicking through menus and drawers themselves. Keep the prototype folder until the owner signs off; it is the fastest place to make the next change and push again.

## Talking to the owner during this workflow

Show them the prototype before anything is pushed: "Open these two files, that is how the home page and a product page will look; tell me what to change." Changes are cheapest there. Explain the push as "publishing the design into your site", and say what still needs their input in WordPress (photos, categories, policies, payments).

## What this workflow does not replace

- **Edits** to an existing page: `get-post-tree` then `edit-post`. Re-running `html-to-page` for a change duplicates the section.
- **Small additions** to an existing page: write the section as HTML and push it directly; no prototype needed.
- **Builder-only configuration**: forms, popups (Breakdance), component editable properties (Oxygen 6), template conditions, interactions. The prototype marks where they go; the tools set them after the push.
