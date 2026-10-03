# WooCommerce element catalog

Every WooCommerce element the builder ships, what it is for, where it may sit, and the properties you will actually reach for with `edit-post`. Slugs are identical in Breakdance and Oxygen 6 (Oxygen 6 gets them from the Breakdance WooCommerce for Oxygen add-on); the only per-builder slug is the Term Loop Builder. Always confirm with `get-element-slugs` and read `get-element-schemas` (with `paths` to keep it small) before writing a property: the paths below are the stable ones, but `edit-post` rejects anything that does not match the live schema.

Marker aliases (`bd-woo="..."`) are listed where one exists; prefer the marker in `html-to-page` and use the slug only for `edit-post` refinements or node-by-node builds.

## Single product parts

All of these MUST be descendants of a product wrapper; they resolve the product through it. Plain Containers/Columns in between are fine.

| Element | Slug | Marker | Notes and key properties |
|---|---|---|---|
| Fundamental Product Builder | `EssentialElements\FProductBuilder` | `product` | The only product wrapper these tools expose (the classic `EssentialElements\Productbuilder` is hidden). The unstyled wrapper the marker emits. No default CSS, does not apply the global woo styles; keeps WooCommerce's `.product` wrapper and hooks. `content.content.product` (post chooser) pins a product for canvas preview only; leave it unset on templates so it follows the queried product. |
| Product Title | `EssentialElements\WooProductTitle` | `title` | Renders the product name; set the tag through the marker element (`<h1 bd-woo="title">`). |
| Product Price | `EssentialElements\Wooproductprice` | `price` | `design.layout.stack_vertically` (column/row per breakpoint), `design.layout.space_between`, `design.typography`. Sale markup is `del` + `ins` inside `.price`. |
| Product Rating | `EssentialElements\Wooproductrating` | `rating` | `design.stars.color`, `design.stars.size`, `design.layout.stacking` (horizontal/vertical). Empty wrapper when the product has no reviews. |
| Product Excerpt | `EssentialElements\ProductExcerpt` | `excerpt` | Short description. Empty when the product has none. |
| Product Description | `EssentialElements\ProductDescription` | `description` | Full description, usually inside tabs/accordion instead. |
| Product Cart Button | `EssentialElements\Wooproductcartbutton` | `add-to-cart` | The whole add-to-cart area: quantity stepper, variations form and swatches, grouped product table, button. `design.size.width`, `design.size.button_fills_container`, `design.typography.variable`. Internals are styled by class (see the product page skill). |
| Product Stock | `EssentialElements\Wooproductstock` | `stock` | Stock status line. Empty when WooCommerce has nothing to say (stock display off). |
| Product Meta | `EssentialElements\Wooproductmeta` | `meta` | SKU, categories, tags. `design.container.layout` (stacked/inline), `design.container.divider` (+ color/width/style). |
| Product Info | `EssentialElements\Wooproductinfo` | `additional-info` | Additional information table (weight, dimensions, attributes). `design.style.hide_heading`, `design.style.hide_separators`, `design.style.width`. |
| Product Tabs | `EssentialElements\Wooproducttabs` | `tabs` | Description, additional info, reviews. `design.layout.layout` (`tabs` or `accordion`; marker default `accordion`), `design.accordion.accordion` (one at a time), `design.accordion.first_item_opened`, and the whole tab bar under `design.tabs.*` (`style` tabs/pills/bar, `position`, `vertical`, `space_between`, `space_after`, `text`, `background`, `underline`, `padding`, `icon`, `responsive.show_as_dropdown`). `content.tabs.{description,additional_information,reviews}.title` / `.icon` to rename or icon each tab, `content.form.open_in_modal` + `content.form.button_text` for the review form. It replaces WooCommerce's own tabs, so the markup is `.bde-tabs__tabslist` / `.bde-tabs__tab[aria-selected]` / `.bde-tabs__panel-content`, never `ul.wc-tabs`. **Cannot share a page with Product Reviews.** |
| Product Reviews | `EssentialElements\ProductReviews` | `reviews` | Standalone reviews list + form. **Cannot share a page with Product Tabs**: both render WooCommerce's review template and only the first one on the page gets the comment loop. Standalone reviews means description and specs go in as plain `description` / `additional-info` sections. `design.reviews.layout.layout` (list/grid, `items_per_row`, `gap`; `items_per_row` is responsive and the grid drops to one review per row from phone landscape down unless you set it there), `design.reviews.stars`, `design.reviews.avatar`, `design.reviews.separator`, `design.review_item.background`, `design.typography.hide_heading`, `content.form.open_in_modal`, `content.form.button_text`. |
| Product Gallery (Swiper) | `EssentialElements\Swiper` | `gallery`, `gallery-thumbs` | Not a woo element: a Swiper in dynamic image mode bound to `product_gallery`, with zoom and lightbox on. Never use `EssentialElements\Wooproductimages`. Thumbs strip: `content.general.slidesPerView`, `spaceBetween`, `direction` (vertical rails need a definite height). |

## Product-page neighbours (work outside the wrapper)

| Element | Slug | Marker | Notes |
|---|---|---|---|
| Woo Breadcrumb | `EssentialElements\WooBreadcrumb` | `breadcrumbs` | `design.typography.delimiter` sets the separator string. Works on archives too. |
| Related Products | `EssentialElements\RelatedProducts` | `related-products` | Native woo loop of related items. `content.content.product_count`, `order_by` (date/price/rand), `order`, `design.title.disable`, `design.container.size`. Images come out as WooCommerce's square thumbnail crop: design the tiles square or change the crop in WooCommerce > Settings > Products > Product Images and regenerate thumbnails. |
| Upsell Products | `EssentialElements\UpsellProducts` | `upsells` | Same controls as Related Products; renders the product's configured upsells and nothing when there are none. |
| Product | `EssentialElements\Product` | none | Drops one complete, classic WooCommerce single product (image left/right, `content.content.product`, `disable_upsells`, `disable_related`) on any page. Useful for a "featured product" block on a landing page; not for the product template. |

## Shop and listings

| Element | Slug | Marker | Notes |
|---|---|---|---|
| Shop Page | `EssentialElements\Wooshoppage` | `shop` | The default shop grid: WooCommerce's own loop over the archive's main query (notices, result count, sorting select, `ul.products`, pagination, no-products notice), every shop loop hook firing per card. Archive templates only (a notice elsewhere). Parts: `design.products_list.elements.{image,title,price,rating,sale_badge,excerpt,categories,quantity_input,button}.include` / `order` / `space_after`, `image.show_second_image_on_hover`, `sale_badge.position`, `custom_areas.areas[]` (a Component inside every card); columns `design.products_list.layout.products_per_row`, `between_products`; `design.result_count.typography`, `design.pagination`, `design.spacing.above_products` / `above_pagination`. Card structure: override `content-product.php` with the template tools. |
| Loop Cart Button | `EssentialElements\Wooloopcartbutton` | `add-to-cart` inside a loop item | AJAX add-to-cart for simple products, "Select options" link for variable/grouped, "Buy" link for external. `design.size.width`, `design.size.button_fills_container`. |
| Products List | `EssentialElements\Wooproductslist` | `products` | The default product row on pages: the same hooked card over a query of its own, no pagination. `content.content.show_products` (all/featured/sale/manually/query), `products` (manual picks), `query` (the loop elements' structured query, php mode included), `product_count`, `order_by` (date/price/rand), `order`, `content.content.advanced.when_empty` (Component). Layout `design.layout.layout` (grid/slider/masonry), `products_per_row`, `between_products`. Part toggles under `design.elements.*` (the Shop Page's sections, one level up). Never on an archive template: it ignores the URL. |
| Post Loop Builder | see `get-element-slugs` | `bd-loop="products"` | The custom-card grid: your card markup as a Component, repeated per product, in raw mode. No shop loop hook fires in it, so plugin output (wishlists, badges, swatches, quick view) and the builder's quick look never show in these cards. Query knobs, pagination (numbers, load more, infinite) and raw mode are covered in the shop skill. |
| Faceted Filters | `EssentialElements\Woofacetedfilters` | none | Block-based filters. `content.filters.{active,price,status,rating,category,tag}` toggles, `content.filters.attributes` repeater (`attribute` dropdown per row), `content.filters.instant` for no-reload updates (pair with the router-region attributes on the grid element, see the shop skill). |
| Shop Filters | `EssentialElements\WooShopFilters` | none | Classic widget filters with a full page reload. Styling: `design.chips`, `design.price_filter.bar`, `design.rating_filter`, `design.attribute_filter`. |
| Woo Sidebar | `EssentialElements\Woosidebar` | none | Renders a registered widget sidebar (`content.sidebar.sidebar_slug`) with typography/inputs/buttons styling. Legacy; prefer Faceted Filters. |
| Term Loop Builder | `OxygenElements\TermLoopBuilder` (Oxygen 6) / `EssentialElements\TermLoopBuilder` (Breakdance) | `bd-loop="terms"` | Category tiles, pills and menus. |
| Search Form V2 | `EssentialElements\SearchFormV2` | `search` | Composite store search with autocomplete; the marker limits it to products. Never build a search form from an input plus a button. |

## Cart

| Element | Slug | Notes |
|---|---|---|
| Cart Page | `EssentialElements\Woopageshoppingcart` | The complete cart in one element: notices, contents, coupon, totals, cross-sells. `design.layout.totals_position` (top-left/top-right/bottom-left/bottom-right), `design.layout.stack_vertically_at` (breakpoint), `design.layout.sticky_totals` + `sticky_offset`, `design.spacing.{after_notification,after_cart,before_cross_sells,between_columns}`. |
| Cart Contents | `EssentialElements\WooCartContents` | The items table with quantities, remove links and the coupon form. Use with the granular set below when you want your own two-column layout. |
| Cart Totals | `EssentialElements\WooCartTotals` | Subtotal, shipping calculator, totals, "Proceed to checkout" button. |
| Cart Cross Sells | `EssentialElements\WooCartCrossSells` | Cross-sell products configured on the cart items. Renders nothing when there are none. |
| Cart Empty Message | `EssentialElements\WooCartEmptyMessage` | The empty-cart notice plus "Return to shop" button; renders only when the cart is empty. Wrap your own designed empty state around it, or replace it with a Container that carries an element display condition on cart quantity. |
| Mini Cart | `EssentialElements\MiniCart` | Header cart toggle + dropdown/sidebar panel. `content.content.cart.{primary_button (cart/checkout), continue_shopping_link (disabled/homepage/shop/custom), url, open_cart_on_add, hide_quantity_input, top_bar}`, `content.content.link.{hide_count, hide_count_when_empty, hide_subtotal, hide_subtotal_when_empty}`, `content.content.after_title_bar` / `after_footer` (blocks, e.g. a free-shipping bar or payment icons), `design.cart.style` (dropdown/sidebar), `dropdown_position`, `sidebar_position`, `full_screen_at`, `design.cart.container.width`, `design.link.icon.{icon,color,size}`, `design.link.quantity.{overlap,top_nudge,right_nudge,background}`. |

## Checkout

| Element | Slug | Nesting | Notes |
|---|---|---|---|
| Checkout Page | `EssentialElements\Woopagecheckout` | cannot coexist with Checkout Builder in one tree | The whole classic checkout as one element. `design.layout.single_column`, `design.layout.stack_vertically_at`, `design.typography.your_order`. |
| Checkout Builder | `EssentialElements\CheckoutBuilder` | container; cannot coexist with Checkout Page | The custom checkout wrapper. Its default children are a two-column layout (about 61/39) with headings, billing, shipping, payment on the left and order review plus a reassurance icon list on the right; you may keep, restyle or replace them. |
| Checkout Billing Form | `EssentialElements\WooCheckoutBillingForm` | must be inside Checkout Builder | Billing fields as configured in WooCommerce. |
| Checkout Shipping Form | `EssentialElements\WooCheckoutShippingForm` | must be inside Checkout Builder | "Ship to a different address" toggle + fields, plus order notes. |
| Checkout Order Review | `EssentialElements\WooCheckoutOrderReview` | must be inside Checkout Builder | The "Your order" table (items, subtotal, shipping choice, total). |
| Checkout Payment | `EssentialElements\WooCheckoutPayment` | must be inside Checkout Builder | Payment methods, terms checkbox and the "Place order" button. `design.layout.sticky` keeps it on screen; `design.layout.payment_info.background`, `design.layout.borders`, `design.layout.padding` frame it. |
| Checkout Coupon Form | `EssentialElements\WooCheckoutCouponForm` | free-standing | "Have a coupon?" toggle + form. |
| Checkout Login Form | `EssentialElements\WooCheckoutLoginForm` | free-standing | "Returning customer?" toggle + login form. |

## Account and orders

| Element | Slug | Notes |
|---|---|---|
| Account Page | `EssentialElements\Woopageaccount` | My Account (dashboard, orders, downloads, addresses, payment methods, account details, logout; logged-out visitors see login/register). `design.tabs.layout` (vertical/horizontal), `vertical_tabs_position` (left/right), `horizontal_tabs_position`, `vertical_at` (breakpoint where horizontal tabs go vertical), `space_between`, `sticky_tabs` + `sticky_offset`, `design.tabs.tab.{background,hover,active,shadow}`, `design.content.background`, `design.typography.tables`. |
| Order Tracking Page | `EssentialElements\Woopageordertracking` | The order tracking form (order ID + email). `design.container.width`, `design.form`. |

## Store-wide styling

| Surface | Where | Notes |
|---|---|---|
| WooCommerce global styles (`enabled` stores only; gone in the unstyled mode) | `set-global-settings` → `settings.woocommerce` (Breakdance, or Oxygen 6 with a global settings add-on) | Same sections as the WooGlobalStyler: `colors` (brand, text, headings, borders, text_on_brand), `typography` (weights, sizes), `buttons_links` (primary/secondary buttons, text links, disabled), `other.notices`, `other.sale_badge`, `other.ratings`, `other.product_images`, `other.wrappers`, `other.tables`, `other.products_list` (per-row count, per-page count, part toggles for the native loop), `other.payment_box`, `other.quicklook` (enable the quick-view modal on native loop items, arrows, redirect on add, label, backdrop, modal), `other.misc`, `other.stack_vertically_at`, `variation_swatches` (alignment, all swatches base/hover/selected/disabled, image and color swatch size, tooltip, spacing). Read `get-global-settings` first; the call deep-merges. |
| Class-level CSS | `insert-stylesheet` / `<style>` in `html-to-page` | The Oxygen 6 default and the way to make one design take over a part. Rules on the woo internals (class map in the product page skill) are emitted after `breakdance-woocommerce.css`, so equal specificity wins by order; in the unstyled mode there is no such stylesheet and these rules are the entire design. |
| Element display conditions | `get-element-conditions` + `set-element-conditions` | WooCommerce adds: cart quantity, cart value, cart weight, customer order count, total spend, purchased product; product attributes, categories, tags, in-cart, downloadable, virtual, on sale, price, tax status/class, shipping class, stock status, stock quantity, measurements. Use them for "free shipping unlocked" bars, "you bought this before", category-specific badges, and hiding blocks that would be empty. |

## What is not an element

- **Variation swatches**: WooCommerce renders dropdowns; swatches come from a swatch plugin. The builder recognises and restyles two ("Variation Swatches for WooCommerce" by Emran, and CartFlows' "Variation Swatches Woo"), dequeuing their CSS and applying the global `variation_swatches` styles. Recommend one when the store has colour/size variations; do not promise swatches otherwise.
- **Quantity stepper**: the builder replaces the bare quantity input with a `−` / `+` stepper on the product page and in the cart; style its classes, do not rebuild it. Its buttons are absolutely positioned over the input by default (`top: 50%; transform: translateY(-50%)`, 85px max width), so any design starts from the reset in the **patterns** skill, `quantity-steppers.md`, which also has eight finished designs.
- **Quick look**: a quick-view modal injected into native WooCommerce loop items (Products List, Shop Page, related/upsells) when enabled in the woo globals. It does not appear inside a raw-mode custom card loop.
- **AJAX add-to-cart on the product page** is WooCommerce's own behavior (off by default for single products; the loop button is AJAX). Do not attempt to script it.
