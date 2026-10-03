---
name: dynamic-data
description: Bind Oxygen 6 or Breakdance elements to live WordPress content - post titles, images, links, custom fields, product and term data - with bd-bind / bd-href / bd-src markers in html-to-page HTML or with [breakdance_dynamic ...] shortcodes in edit-post, including the companion _dynamic_meta object the builder needs. Use when building templates, loops, author boxes, or any element whose text, link or image should come from the database instead of being typed in.
---

# Dynamic data

Dynamic data binds an element's value to live WordPress content at render time. It is what makes a template reusable: one blog-post template renders every post because its title, content, image and meta are bound, not typed in. Bind everything that differs per object; hardcode only genuinely static copy (a hero tagline on a fixed landing page).

## Step 1: discover the fields

Always call `get-dynamic-fields` first; never guess a slug. Each field has a `slug`, a `label`, a `category`, `returnTypes` (`string`, `url`, `image_url`, `gallery`, `video`, ...) and any `controls` it requires as params (a custom field needs `key`, product terms need `taxonomy`). The list depends on the site's plugins (ACF, Meta Box, WooCommerce), so the live output is the source of truth. `get-dynamic-data-categories` groups them.

## Step 2a (default): bind in HTML with markers

In `html-to-page` HTML, bindings are attributes; the converter writes the shortcode and its companion object for you:

```html
<article class="card">
  <a class="card-media" bd-href="post_permalink">
    <img bd-src="post_featured_image" bd-alt="post_title">
  </a>
  <span class="card-cat" bd-bind="post_terms" bd-params='{"taxonomy":"category"}'></span>
  <h3 class="card-title" bd-bind="post_title"></h3>
  <p class="card-excerpt" bd-bind="post_excerpt" bd-params='{"truncate":"140","fallback":"Read more"}'></p>
  <p class="card-meta" bd-bind="author_name" bd-params='{"beforecontent":"By "}'></p>
</article>
```

- `bd-bind` on any tag that renders text (`p`, `h1`-`h6`, `span`, `div`, `td`, `li`) or on an `<a>` for its label; `bd-href` on an `<a>`; `bd-src` and `bd-alt` on an `<img>`; `bd-params` for the shortcode params.
- A bound element must be empty: no placeholder text, no `href`, no `src`. Placeholders are discarded with a warning, and they hide a missing binding when someone forgets one.
- A marker on a tag with no slot for it (`bd-src` on a `<div>`, `bd-bind` on a `<tr>`) is dropped with a warning. Read the `warnings`.
- Inside a `bd-loop` container the bindings resolve per item; on a single template they resolve against the current object; on a component previewed alone they resolve against the component post unless you pass `context_post_id`.

## Step 2b (escape hatch): the shortcode with edit-post

When you set a property through `edit-post` (an existing element, a control HTML cannot express), the value is the shortcode string:

```
[breakdance_dynamic field='post_title']
[breakdance_dynamic field='post_custom_field' params='{"key":"subtitle"}']
[breakdance_dynamic field='post_excerpt' params='{"truncate":"160","fallback":"Read more"}']
```

Two hard rules: single quotes only (double quotes silently fail), and only `field` is a bare attribute; everything else goes inside `params='{...}'` as JSON.

**Always write the companion object next to the shortcode.** A binding is two keys: the property holding the shortcode and a sibling `<property>_dynamic_meta` holding `{ "field", "shortcode", "attributes" }`, where `attributes` is the params object (`{}` when there are none). The front end renders without it, so a preview hides the mistake, but the builder reads the companion to show the binding: without it the user sees raw shortcode text, or an empty image control they cannot fix.

```jsonc
{ "content": { "content": {
  "title": "[breakdance_dynamic field='post_title']",
  "title_dynamic_meta": { "field": "post_title", "shortcode": "[breakdance_dynamic field='post_title']", "attributes": {} },
  "image": "[breakdance_dynamic field='post_featured_image']",
  "image_dynamic_meta": { "field": "post_featured_image", "shortcode": "[breakdance_dynamic field='post_featured_image']", "attributes": {} },
  "link": { "type": "url", "url": "[breakdance_dynamic field='post_permalink']",
            "dynamicMeta": { "field": "post_permalink", "shortcode": "[breakdance_dynamic field='post_permalink']", "attributes": {} } }
} } }
```

A link control keeps its companion inside the link value as `dynamicMeta`. A responsive property keeps it under the breakpoint key plus the suffix (`breakpoint_base_dynamic_meta`). `attributes` must agree with the shortcode's params.

## Step 3: match the return type to the slot

`get-element-schemas` marks bindable properties ("Bindable to dynamic data") with the exact return type they take; a property without that note cannot be bound.

| Return type | Goes in |
|---|---|
| `string` | heading, text, rich text content (`post_title`, `post_excerpt`, `product_price`, `term_name`) |
| `url` | a link URL (`post_permalink`, `term_permalink`, `author_website`) |
| `image_url` | an image or media control (`post_featured_image`, `product_image`, `woocommerce_category_image`). The `*_url` variants return `url` and do not fit an image control |
| `gallery`, `video` | their matching gallery and video controls (`product_gallery` on a Swiper in images mode) |

The Image element's media control (`content.image.media`) takes `image_url`; its sibling `content.image.url` is a plain text field and is not bindable. `edit-post` rejects an unknown field or a return-type mismatch, so the failure is loud.

## Params

`fallback` (value when empty; always set one on optional fields), `truncate` (N characters plus an ellipsis), `beforecontent` / `aftercontent` (prefix and suffix), plus any field-specific control (`key`, `taxonomy`, `image_index`, `format`).

## Loops

Any collection is a loop, never duplicated static cards: `bd-loop="posts|products|terms"` on the container with one bound item inside. See the "Loops" section of `get-instructions` and, for products, the **woocommerce-shop-archive** skill.

## Checklist

- `get-dynamic-fields` called; only real slugs and controls used.
- Every binding sits in a slot matching its return type.
- Bound elements are empty in HTML; optional fields have fallbacks.
- Shortcodes written with `edit-post` carry their `_dynamic_meta` companion (or `dynamicMeta` inside a link).
- Templates and loops have every per-object value dynamic; verified with `preview-post` and a real `context_post_id`.
