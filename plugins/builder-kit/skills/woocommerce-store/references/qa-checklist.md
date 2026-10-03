# Store QA checklist

Run this before telling the user a template or the store is done. Every line is a real failure seen on stores built without it.

## Preview matrix

Preview each template with `preview-post` (`context_post_id`) against:

- a **simple** product
- a **variable** product (the add-to-cart renders the variations form; state classes only appear in the browser, so style disabled/enabled states blind)
- a **grouped** or **external** product if the store has one (the button becomes a table or an outbound link)
- a product **on sale** (badge shows, regular price struck through)
- a product **out of stock** (button state, stock line)
- a product **without a gallery** and one **without a short description** (empty wrappers must not leave gaps)

Then the shop template with no `context_post_id` plus a category archive (pass a product in that category, and confirm the grid shows only that category), and a product search (`?s=…&post_type=product` renders the archive template with the search results).

## Templates and conditions

- `create-template` used a `template_type` from the live `get-template-conditions` list: `all-product-archives`, `specific-product-archive` (with a `product-is-taxonomy` rule copied verbatim), `product`. A typo silently matches nothing.
- Per-category templates have a higher priority than the all-archives template.
- No duplicate templates for the same target; older ones disabled or deleted on purpose.
- Header and footer templates apply "everywhere" and the mini cart and search are present.
- The template is enabled (`disabled: false`) when the user expects it live.

## Dynamic data

- Every per-product value in a card or the PDP is bound or marker-emitted. Grep your HTML for literal prices, product names or image URLs before submitting it.
- Optional fields have fallbacks or `:empty` handling (`product_sale`, `product_rating`, excerpt).
- The archive grid is the native `bd-woo="shop"` element (or a loop with its query unset and pagination on). Page 2 exists on stores with more than one page of products, and a category page shows only that category.
- Homepage rows (`bd-woo="products"`) have their query set with `edit-post`; a loop-builder row has explicit knobs (`bd-limit` etc.) and a named Component (`bd-loop-name`). Neither sits on an archive template.

## Design

- The same `.btn--primary` look on add-to-cart, loop cart button, checkout button, place order, apply coupon.
- Product images: fixed `aspect-ratio` and `object-fit: cover` on every card and the gallery; thumbnails uniform tiles with an active state.
- Gallery height decided (fits the viewport, or tall with a sticky summary), never auto.
- Notices styled on the product template, cart and checkout (they never show in previews; check the CSS is there).
- No notice rule sets `padding` without `padding-left` and `::before { left }`: the icon is absolutely positioned in every styling mode (ours at `left: var(--bde-woo-notices__padding)`, WooCommerce's at `left: 1.5em`), so it lands on the text otherwise. Notice rules written where our stylesheet is absent (a marker-built page, or the whole site in the `unstyled` mode) also carry `border: 0`, or WooCommerce's 3px coloured top border is left above every notice. See the patterns skill, `notices.md`.
- Sale badge disappears when there is no sale (`:empty` or the element's own behavior).
- Empty woo parts (rating with no reviews, stock with nothing to say, upsells with none configured) do not leave visible gaps in flex/grid layouts. Checked on the thinnest product in the catalogue, not the best-filled one, and the collapse rule is on the marker element itself: `:empty` never matches a wrapper around it.
- Struck-through regular price muted; sale price emphasised.
- Modern Normalize enabled, or margins handled explicitly.
- `warnings` from every `html-to-page` and `insert-stylesheet` response read and resolved (dropped selectors, unknown markers, discarded placeholder content).

## Responsive

- Every template checked at a mobile breakpoint: 2-column product grid, stacked PDP (gallery above buy box), single-column checkout, mini cart full screen on small screens (`design.cart.full_screen_at`).
- Tap targets 44px minimum; quantity stepper usable with a thumb.
- No horizontal scroll from a `1fr` grid without `minmax(0, 1fr)` or from a fixed-width table (cart tables are the usual culprit: allow them to scroll or restack on mobile).
- Sticky elements offset by the admin bar variable.

## Functional (tell the user to test in a browser; previews are server-rendered without JS)

- Add a simple product to the cart from the shop grid: AJAX, mini cart count updates and the panel opens if configured.
- Choose a variation on the PDP: price updates, button enables, add to cart works.
- Cart: change quantity, remove item, apply a coupon, proceed to checkout.
- Checkout: fill the form, choose shipping, place a test order (WooCommerce > Settings > Payments has a "Cash on delivery" or test gateway for this).
- Order received page renders; My Account shows the order.
- Search from the header returns products.
- Filters (if built) narrow the grid and pagination still works after filtering.

## What WooCommerce must still have (tell the user, do not do it in the builder)

- Payment gateway configured and tested; shipping zones and rates; tax settings; store address and currency.
- Cart, Checkout, My Account and Shop pages assigned under WooCommerce > Settings > Advanced (the templates render on those pages).
- Product data complete: featured images, gallery images, short descriptions, prices, stock, categories with images, variations with prices.
- Transactional emails branded (a WooCommerce or plugin setting).
- Product image size and cropping (WooCommerce > Settings > Products > Product images) matched to the ratio you designed for related-product tiles, then thumbnails regenerated.
