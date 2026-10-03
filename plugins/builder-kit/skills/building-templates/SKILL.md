---
name: building-templates
description: Build reusable Oxygen 6 or Breakdance templates - single post, page and product layouts, archives and loops, site headers and footers - that render against live WordPress content and apply to the right places via template conditions, plus element display conditions and reusable components. Use when the user wants a layout reused across many posts ("design my blog post template", "build an archive for my Events", "create a site header/footer") rather than a one-off page.
---

# Building templates

A **template** is a layout reused across many URLs: one blog-post template renders every post, one product template every product, one header sits on the whole site. Two things make it work, and you need both:

1. **Dynamic data**: every per-object value (title, image, price, meta) is bound to the queried object with `bd-bind` / `bd-href` / `bd-src`, so each render fills in different values. See the **dynamic-data** skill.
2. **Template conditions**: the rules that decide where the template applies.

Building and styling are otherwise identical to a normal page (see **building-sites**): author the layout as HTML with a `<style>` block and one `html-to-page` call. Do not build templates node by node with `edit-post`.

For WooCommerce templates (shop, product, cart, checkout, account) use the **woocommerce-store** skill and its siblings; they carry the marker recipes. This file covers the generic mechanics.

## Template post types

| The user wants | `post_type` (Oxygen 6 / Breakdance) |
|---|---|
| A layout for single posts, pages, products, CPTs, or an archive/loop | `oxygen_template` / `breakdance_template` |
| A site header | `oxygen_header` / `breakdance_header` |
| A site footer | `oxygen_footer` / `breakdance_footer` |

One template post type covers both singular and archive layouts; the `template_type` decides which, and whether you build a single object or a repeating loop.

## Workflow

1. **Clarify the target** with the user: all posts, one category, one CPT, the shop, site-wide? It decides both the conditions and which object the dynamic fields resolve against. Check `search-posts` for an existing template covering the same target; never add a duplicate silently.
2. **`get-template-conditions`** for the post type. It returns `templateTypes` (valid `template_type` slugs such as `post`, `page`, `all-singles`, `all-archives`, `taxonomy-archive`, `everywhere`, each with a `defaultPriority`) and `conditions` (rules with `slug`, `operands`, `values`, `valueInputType`, `availableForType`, `supports`, `proOnly`).
3. **`create-template`**: `title` (required), `post_type`, `template_type` (required, from `templateTypes`; it is not validated, so a typo silently matches nothing), `rule_groups` (omit or `[]` to apply to every item of that type), `disabled` (`true` to build before it goes live; this toggle, not post status, decides whether it applies), `priority` (higher wins when two templates match; omit for the type's default). It returns `post_id`, `edit_url`, `url`.
4. **`get-dynamic-fields`** for the real slugs of the object this template targets.
5. **Read the design system**: `get-css-selectors`, `get-css-variables`, `get-breakpoints`, `get-global-settings` where it exists. Reuse the site's tokens and classes.
6. **Build with `html-to-page`** on the new `post_id`, exactly like a page. Bind every per-object value with a marker whose field return type fits the slot (`bd-bind` on text tags, `bd-href` on `<a>`, `bd-src` / `bd-alt` on `<img>`, `bd-params` for fallback/truncate). For an archive, wrap ONE card in a `bd-loop` container and leave its query unset so it inherits the URL's main query (pagination turns on automatically). No `<main>` in template HTML; the page output already has one.
7. **Verify**: `get-post-tree`, then `preview-post` with `context_post_id` set to a real post the template applies to, so every binding resolves. Check `warnings`.
8. **Later changes**: `set-template-conditions` replaces the target type and conditions without touching the layout; its optional `disabled` and `priority` behave as in `create-template`.

## Conditions: `rule_groups`

An OR-list of AND-groups: the template applies if any group matches, and a group matches only if all its rules match.

```jsonc
"rule_groups": [
  [ { "ruleSlug": "post-dropdown-page", "operand": "is", "value": ["11"] } ],
  [ { "ruleSlug": "has-taxonomy", "operand": "is one of", "value": ["{\"name\":\"category\",\"slug\":\"news\"}"] } ]
]
```

- `ruleSlug` is a condition's `slug`; `operand` one of its `operands`; `value` the exact string(s) from `values[].items[].value`, passed through verbatim (often JSON). Omit `value` for operands that take none (`is empty`).
- `valueInputType` decides the shape: `multiselect` takes an array even for one option; `datepicker` takes an array for `is` / `is not` / `is one of` / `is none of`; everything else takes one string.
- Only use conditions whose `availableForType` includes your `template_type`; `supports` tells you whether a condition works for templating, element display, or both.
- Value lists are capped at the first 10 options (terms, posts, products, users), the builder's own dropdown cap. A missing option is still a valid target: `search-condition-values` with the condition's `slug` and a name to match returns every match, uncapped. Copy its `value` verbatim; never hand-build one or settle for a broader rule. Same for `get-element-conditions`.

## Singular versus archive

- **Singular**: build the layout once; every element binds to the current object (`post_title`, `post_content`, `post_featured_image`, author and date fields, taxonomy terms, custom fields).
- **Archive**: build one repeating card inside `bd-loop="posts"` (or `products`, `terms`), bound to the item's fields. Never hardcode anything sampled from one post. Pagination renders as the container's last child; span it across a grid with `.grid .bde-posts-pagination { grid-column: 1 / -1 }`. Query knobs are ignored on archive templates by design. Archive title and description come from `archive_title` / `archive_description`.

## Headers and footers

Usually `template_type: "everywhere"`: a container with the logo (site logo field or a static image), navigation, and a CTA. Navigation links are `<a>` elements; the converter's TextLink adds `is-active` automatically when the URL matches the current page, so style `.nav-link.is-active`. A burger menu is a plain `<button>` plus `set-element-interactions` (`click` → `toggle_class`), never an inline handler. A search box is `<div bd-woo="search"></div>` (see **building-sites** for the rule); on a store the header also carries `<div bd-woo="mini-cart"></div>`. Category navigation, department dropdowns and mega menus have their own skill, **mega-menus**. Sticky headers offset the admin bar variable. A second header with a page condition and a higher priority overrides the main one on specific pages (a slim checkout header).

## Element display conditions

Separate from template conditions: they show or hide one element wherever it sits. `get-element-conditions` returns the `element_display` list (user login status, roles, dates, WooCommerce cart and customer rules, custom PHP), and `set-element-conditions` writes `rule_groups` (same shape) plus an independent `visible` toggle onto an element by `post_id` and `element_id`.

## Reusable components

A component (Breakdance: global block) has no conditions of its own and renders where referenced. `bd-loop` mints the loop card for you; for a shared section, a loop's empty state or a search autocomplete row, `create-reusable-component` with a `title` and a `preview` size, build into its `post_id` with `html-to-page`, and point a component element or a loop's block property at that id. Preview with `context_post_id`.

## Checklist

- Target confirmed with the user; `template_type` taken from the live `templateTypes`; no duplicate template for the same target.
- Every `rule_groups` entry uses live slugs, operands and values in the shape `valueInputType` demands.
- Every per-object value bound with a marker; optional fields have `bd-params` fallbacks; nothing hardcoded from a sample post.
- Archive: one card in a `bd-loop`, query unset, pagination spanning the grid.
- Design uses the site's variables and classes; responsive checked; no `<main>`.
- Template enabled (or intentionally disabled) and previewed against a real object with `context_post_id`.
