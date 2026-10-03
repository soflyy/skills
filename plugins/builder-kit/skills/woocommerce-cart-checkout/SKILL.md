---
name: woocommerce-cart-checkout
description: Design and build the WooCommerce cart page, checkout page and order received (thank you) page with the Oxygen 6 or Breakdance builder to a current ecommerce standard - card-style cart rows with a sticky summary, free-shipping progress, designed empty cart, numbered checkout sections with a sticky order summary and a slim secure-checkout header, payment methods as rows, a receipt-style confirmation - plus the header mini cart and promo bars. Use when the user says "design my cart", "checkout page", "make checkout look better", "one-page checkout", "thank you page", "mini cart", "cart drawer", "cart icon in the header", or anything about the purchase flow. For the account area (My Account, login, registration, order tracking) use the woocommerce-my-account skill.
---

# Cart, checkout and the order received page

WooCommerce renders the cart, checkout and confirmation on its own pages. The builder replaces their look with content you design around real WooCommerce elements: the forms, totals, payment and order logic stay WooCommerce's, and you design every surface through your frame HTML, the builder's WooCommerce CSS variables, and class CSS on WooCommerce's markup. Never re-implement the flow, never mock a field, a total or a payment box, never hand-write a price.

Before building: `get-instructions`, `get-ecommerce-instructions`, the store design system reference in the **woocommerce-store** skill (buttons, fields, tables and notices are the whole look of these pages), and `get-element-slugs` to confirm the cart and checkout elements exist (Oxygen 6: from the WooCommerce add-on; Breakdance: Pro).

## Designs to start from, and the parts every design must style

The **patterns** skill has finished designs you can start from or borrow from: `patterns/cart-pages.md` (Cart 1 to 4, the empty state, the free-shipping bar, cross-sells) and `patterns/checkout-pages.md` (Checkout 1 to 3, coupon forms, the slim checkout header, express payments, order received). In the plugin they are in `../patterns/` next to this skill's folder; over MCP, `get-skill` with that `path`. Read them before designing either page, even when you will not use one: they show how every WooCommerce part is styled against the builder's real stylesheet.

| The store | A close cart | A close checkout |
|---|---|---|
| Most stores, physical goods | Cart 1, list rows with a sticky summary | Checkout 1, numbered sections with a sticky summary card |
| Fashion, furniture, few items per order | Cart 2, editorial big type | Checkout 1, or Checkout 3 for the split-tone look |
| One hero product, premium, small catalog | Cart 3, total first, centred | Checkout 2, single column, summary first |
| Mostly phone traffic or digital goods | Cart 1 | Checkout 2 |
| The summary needs a free-shipping bar, payment marks or a support line | Cart 4, two columns you own | Checkout 1 |

Using a pattern as is, adapting one, or designing your own layout are all fine; match the owner's brand and what they asked for. What is not optional is covering every part WooCommerce renders on these pages. The store is unstyled, so any part your CSS does not reach renders raw, and one raw part (a default table header, a bare coupon box, stacked quantity buttons, unstyled radios) is what makes a whole page look broken. The patterns' shared blocks (`Shared: the row anatomy` in the cart file, `Shared: fields, payment rows, notices` in the checkout file) cover the rows, stepper, coupon, totals and shipping of the cart and the fields, payment rows and notices of the checkout, and work under any layout (the cart file styles the empty state and cross-sells in their own sections), so the simplest route is to keep a shared block and design the rest yourself. Whichever route you take, check your CSS reaches:

- **Cart**: the table chrome and header row, each row's thumbnail, name link, variation line, unit price, quantity stepper (the builder's buttons need the reset in `quantity-steppers.md`), line total and remove link; the coupon field and button; the hidden update button; the totals table, shipping options (`ul#shipping_method` radios, calculator link), discount row, order total and checkout button with the gateway's express buttons under it; notices; the empty state; cross-sells; the phone restack.
- **Checkout**: the login and coupon toggles and their forms; every field (label, input, select and select2, textarea, focus and invalid states, checkboxes); the section headings; the order review table and its totals; the payment method rows, their payment boxes, the terms line and the place-order button; the error notices.

This skill's own `examples/mini-cart-and-promos.md` covers the mini cart, the announcement bar and customer-aware bars.

## What a good cart, checkout and confirmation look like now

These are the conventions the best stores share (Apple, adidas, lululemon, Walmart, Faire, Hims), reduced to what this stack can do:

**Cart**

- Rows read as cards or clean list rows: a 96 to 120px image, the name as a link, variation and a delivery or stock line in muted text under it, the stepper and the line total on the same row, remove as a quiet × that turns red on hover. Never a spreadsheet with six header columns.
- A summary panel that stays in view (sticky on desktop): subtotal, shipping ("Calculated at checkout" or the chosen rate), total in the largest type on the page, one full-width primary "Checkout", then the express button the gateway injects, then accepted-payment icons and a "Taxes and shipping calculated at checkout" line.
- A free-shipping line or bar that tells the shopper how close they are, and a green "You've unlocked free shipping" when they are there.
- A promo code field that is present but quiet: a text-link toggle or a small inline field under the rows, never a modal, never a giant box.
- A designed empty state: an icon or illustration, one line, a primary "Continue shopping", and a row of products so the page still sells.
- Cross-sells or "You might also like" as the same cards the shop uses, after the cart, not beside it.
- One honest urgency or reassurance line at most ("Items in your bag are not reserved", "Free returns within 30 days"), only when true.
- Phones: rows restack to image left, details right, stepper and total on a second line; the summary sits under the rows and the checkout button is reachable without hunting.

**Checkout**

- Less of everything: a slim header (logo, a lock with "Secure checkout", a "Back to cart" link), no site navigation, no promotions, no footer links except legal.
- One column of numbered sections on the left (Contact and delivery, Shipping, Payment), the order summary on the right as a sticky card with the items, totals and trust lines; on phones the summary comes first as a collapsible.
- Express pay first when the gateway offers it (Apple Pay, Google Pay, PayPal), then an "or" divider, then the form.
- Fields: labels above, 48 to 52px tall, full width, names side by side, obvious focus ring, errors in red beside the field. No placeholder-only fields.
- Payment methods as a list of rows: radio, method name, logos on the right, the method's own fields unfolding below the selected row.
- The place-order button full width, the largest button on the page, with a lock icon and a trust line under it. Terms in readable 13 to 14px type.
- The returning-customer login and the coupon as one-line toggles at the top, not open forms.

**Order received**

- A confirmation that feels like a receipt: a check mark, "Thank you, your order is confirmed", the order number as the hero fact, then a strip of facts (date, email, total, payment method), the items, the addresses, and "what happens next" (email confirmation, delivery estimate, track in your account).
- Two paths out: continue shopping and view the account.

## Which pages, which templates

The Cart, Checkout and My Account pages are ordinary WordPress pages that WooCommerce assigns under WooCommerce > Settings > Advanced (`search-posts` for them; `site-info` may list them). Two ways to design them:

- **Edit the page itself** (`html-to-page` on that page id): the page's own content becomes your layout. This is the default.
- **A template with a page condition** (`create-template`, `template_type` for singular pages, a rule from `get-template-conditions` targeting the page) when the store wants these pages themed differently, and always for the **checkout header**: a second header template with a condition targeting the checkout page and a higher priority than the main header (see `checkout-pages.md`).

Do not remove the WooCommerce block or shortcode from those pages by hand; building the page with the builder replaces the content rendering entirely. If a page is missing, tell the user to assign one.

## How the styling works

Class CSS on WooCommerce's markup, scoped under your page wrapper, is the whole design: the store is unstyled, so WooCommerce's own stylesheets are all that stands under you.

Match WooCommerce's selector shape rather than the shortest thing that matches: `.cart-page .woocommerce-cart-form__contents td.product-thumbnail img`, not `.cart-page img`. Its rules are element-qualified, and on a store left on `enabled` the builder's stylesheet uses long selectors of its own (`.breakdance-woocommerce .woocommerce-cart-form__contents td.product-thumbnail img`), so the same shape wins either way. Your stylesheet loads last, so a specificity tie is yours. Never set the same property through an element's design control and through CSS.

The examples use exactly these selectors; copy them as written.

## Cart page

Two element choices, both correct:

- **One element** (`EssentialElements\Woopageshoppingcart`): notices, rows, coupon, totals and cross-sells in one, with `design.layout.totals_position` (`top-right`: rows left, totals right), `stack_vertically_at` (a breakpoint id), `sticky_totals` plus `sticky_offset`, and `design.spacing.*`. Insert it into a slot with `edit-post`. Cart 1 to 3 in `cart-pages.md` use it.
- **Granular** (`WooCartContents`, `WooCartTotals`, `WooCartCrossSells`, `WooCartEmptyMessage`, each a final element) when the design needs your own grid, a trust column, or content between the parts (Cart 4). Contents and totals render only with items, the empty message only without, so all can live in one tree.

Anatomy and class map (one level under your wrapper class):

| Part | Markup |
|---|---|
| Rows | `form.woocommerce-cart-form` > `table.shop_table.cart.woocommerce-cart-form__contents` > `tr.woocommerce-cart-form__cart-item` with `td.product-remove a.remove`, `td.product-thumbnail img`, `td.product-name a` + `dl.variation` (+ `p.backorder_notification`), `td.product-price`, `td.product-quantity .quantity` (the builder's stepper: reset and designs in the **patterns** skill, `quantity-steppers.md`), `td.product-subtotal` |
| Coupon and update | the last row `td.actions` > `.coupon` (`label`, `input#coupon_code.input-text`, `button[name="apply_coupon"]`) and `button[name="update_cart"]` (hide it; the builder updates quantities on change). The cart's coupon markup differs from the checkout's; design 4 in `checkout-pages.md` covers it |
| Totals | `.cart_totals` > `h2`, `table.shop_table` with `tr.cart-subtotal`, `tr.cart-discount`, `tr.woocommerce-shipping-totals.shipping` (`ul#shipping_method` radios, `.shipping-calculator-button`), `tr.tax-total`, `tr.order-total`; then `.wc-proceed-to-checkout` > `a.checkout-button.button` plus whatever the gateway injects (PayPal smart button, Apple Pay) |
| Empty | `.cart-empty.woocommerce-info` and `p.return-to-shop a.button.wc-backward` |
| Cross-sells | `.cross-sells` > `h2` + `ul.products` of `li.product` (the same markup as WooCommerce's shop loop) |

The builder already restacks rows on phones (`tr` becomes a grid: image column, details, remove; the unit price is hidden and only the subtotal shows). Style with that, do not fight it: the examples' phone rules extend the builder's grid.

Cart rules:
- Thumbnail 96 to 120px, radius from the design system, `object-fit: cover`.
- The row name is a link in the ink colour; the variation `dl` reads as one muted line (`dt`/`dd` inline).
- The stepper uses the reset from `quantity-steppers.md` (Quantity 5, compact) and the remove link is a 32px round hit area.
- Summary: `--surface-alt` panel with radius, rows separated by hairlines, `tr.order-total` in 18 to 20px semibold, `a.checkout-button` full width and 52 to 56px, the injected express button under it at full width too (`.wc-proceed-to-checkout > *:not(.checkout-button) { width: 100% }`).
- Shipping options inside the totals render as radios in `ul#shipping_method`; style them as rows, not bare radios.
- Free-shipping progress: two Text elements with `woocommerce-cart-value` conditions for the two messages, or the stepped bar in `cart-pages.md` (five elements, five value bands). Conditions evaluate on render, so the bar updates on reload, not on AJAX quantity changes; say so to the owner.
- "Continue shopping" near the heading, to the shop.
- The cross-sells element renders nothing without configured cross-sells; give it no margin of its own.

## Checkout page

**Checkout Builder** (`EssentialElements\CheckoutBuilder`) renders `form.checkout.woocommerce-checkout` around its children, so you own the layout. Its children must include `WooCheckoutBillingForm`, `WooCheckoutShippingForm`, `WooCheckoutOrderReview` and `WooCheckoutPayment` (each restricted to being a descendant of the builder); `WooCheckoutCouponForm` and `WooCheckoutLoginForm` are optional. `CheckoutBuilder` and `Woopagecheckout` (the classic one-element checkout) cannot both exist in one tree. Inserting the builder with `edit-post` gives it default children (a two-column arrangement); keep and restyle them, or delete them and build your own grid inside the builder with `html-to-page` (`parent_id` = the builder's id) with empty slot divs, then insert the parts into the slots with `edit-post`. Finish with `get-post-tree` to confirm the four required parts are inside the builder.

Anatomy and class map:

| Part | Markup |
|---|---|
| Login toggle | `.woocommerce-form-login-toggle .woocommerce-info` ("Returning customer? Click here to login") + `form.woocommerce-form-login` (only when guests are allowed to log in at checkout) |
| Coupon toggle | `.woocommerce-form-coupon-toggle .woocommerce-info` + `form.checkout_coupon.woocommerce-form-coupon`, whose children are an unclassed intro `p`, `p.form-row-first` (`input#coupon_code`), `p.form-row-last` (`button[name="apply_coupon"]`) and a float-clearing `.clear`; WooCommerce injects its "Please enter a coupon code." error into the same form, so select the parts by role and never by child order. Four designs in `checkout-pages.md` |
| Billing | `.woocommerce-billing-fields` > `h3` ("Billing details" or "Billing & Shipping") + `.woocommerce-billing-fields__field-wrapper` > `p.form-row#billing_*_field` (`label` with `abbr.required` or `span.optional`, `span.woocommerce-input-wrapper` > `input.input-text` / `select` wrapped by select2 `.select2-container`); then `.woocommerce-account-fields` (`p.create-account` checkbox, `.create-account` password field) for guests when registration at checkout is on |
| Shipping | `.woocommerce-shipping-fields` > `h3#ship-to-different-address` (a checkbox label) + `.shipping_address` (hidden until checked) with `.woocommerce-shipping-fields__field-wrapper`; then `.woocommerce-additional-fields` > `h3` + `p.form-row.notes` textarea |
| Order review | `#order_review.woocommerce-checkout-review-order` > `table.shop_table.woocommerce-checkout-review-order-table` (`thead` Product/Subtotal, `tr.cart_item` > `td.product-name` with `strong.product-quantity` + `td.product-total`, `tfoot` rows `cart-subtotal`, `woocommerce-shipping-totals.shipping` with `ul#shipping_method`, `tax-total`, `order-total`) |
| Payment | `#payment.woocommerce-checkout-payment` > `ul.wc_payment_methods` > `li.wc_payment_method.payment_method_<id>` (`input[type=radio]`, `label` often containing gateway `img` logos, `.payment_box.payment_method_<id>`), then `.form-row.place-order` > `.woocommerce-terms-and-conditions-wrapper`, `button#place_order` |
| Errors | `.woocommerce-NoticeGroup-checkout .woocommerce-error` (a `ul` of `li`), `p.form-row.woocommerce-invalid` on failed fields (`.woocommerce-validated` on passing ones) |

The builder's stylesheet already lays out the field wrappers as a wrapping flex row with first/last name at half width and country/state/postcode at a third; the examples keep that and change the look.

Checkout rules:
- Single column under the tablet breakpoint; the order summary above the form on phones as a `<details>` that opens on tap ("Order summary" with a chevron; the total cannot be repeated in the summary line because it lives inside the woo element).
- Number the sections in the frame (a small circled 1, 2, 3 before the headings) and hide the woo `h3`s that would duplicate them, or keep the woo headings and style them as the section titles; never both.
- Fields 48 to 52px, labels 13px medium above, 8px gap, focus ring in the ink colour, invalid rows in `--error`. The select2 dropdowns take the same border and radius.
- Payment rows: 1px border, radius, 14 to 16px padding, the label as the row, logos pushed right (`label img { margin-left: auto }`), the selected row tinted, `.payment_box` inside the row.
- `button#place_order` full width, 56px, lock icon via `::before`, trust line below (`.checkout-trust` in the frame), accepted-payment icons in the summary.
- Express payment buttons come from the gateway plugin, never drawn. In the Checkout Builder only the hooks outside the form fire (`woocommerce_before_checkout_form`, `woocommerce_after_checkout_form`) and the hooks inside the review and payment parts; a gateway that injects its express row via `woocommerce_checkout_before_customer_details` will not show inside a custom builder tree. Test with the store's gateway; the classic `Woopagecheckout` element runs WooCommerce's stock template and shows every gateway hook.
- Notices render on validation failure, never in previews; style them blind from the class map.

**Checkout Page** (`EssentialElements\Woopagecheckout`) is the classic one-element alternative: `design.layout.single_column`, `stack_vertically_at`, `typography.your_order`, `advanced.force_full_width_form_fields`. Use it when the owner wants WooCommerce's arrangement restyled, or when their gateway's express buttons only appear with the stock template.

## Order received (thank you) page

WooCommerce renders it on the checkout page URL with the `order-received` endpoint. **On that URL the Checkout Builder renders WooCommerce's `thankyou.php` instead of its children**: your grid, headings and trust list inside the builder are gone, the frame around the builder stays. So design the confirmation as CSS on WooCommerce's markup, and put anything extra (what happens next, continue shopping, view account) in the frame, shown only on this state with `:has()`:

```css
.checkout-page .chk-next { display: none; }
.checkout-page:has(.woocommerce-order) .chk-next { display: grid; }
```

Class map: `.woocommerce-order` > `p.woocommerce-notice.woocommerce-thankyou-order-received` ("Thank you. Your order has been received."), `ul.woocommerce-order-overview.woocommerce-thankyou-order-details.order_details` > `li.woocommerce-order-overview__order` / `__date` / `__email` / `__total` / `__payment-method` (each label text + `strong`), `section.woocommerce-order-details` > `h2.woocommerce-order-details__title` + `table.woocommerce-table--order-details.shop_table.order_details` (`td.woocommerce-table__product-name a`, `strong.product-quantity`, `tfoot` rows, `tfoot th`), `section.woocommerce-customer-details` > `h2.woocommerce-column__title` + `section.woocommerce-columns--addresses.col2-set` > `.woocommerce-column--billing-address` / `--shipping-address` > `h2` + `address` (with `p.woocommerce-customer-details--phone` / `--email`). Pay-for-order pages render `form#order_review` with the same payment box.

The wording of the notice is WooCommerce's; a personalised "Thank you, Ana" needs the `woocommerce_thankyou_order_received_text` filter (a snippet, not a builder change), so tell the owner rather than faking it. Two finished designs are in `checkout-pages.md`.

## Mini cart in the header

Every store header carries `<div bd-woo="mini-cart"></div>`, working outside any product wrapper. After conversion, configure with `edit-post` (verify paths with `get-element-schemas`):

```jsonc
{
  "content": { "content": {
    "cart": { "primary_button": "checkout", "continue_shopping_link": "shop", "open_cart_on_add": true, "top_bar": "enable" },
    "link": { "hide_subtotal": true, "hide_count_when_empty": true }
  } },
  "design": {
    "cart": { "style": "sidebar", "sidebar_position": "right", "full_screen_at": "<mobile breakpoint id>", "container": { "width": { "number": 440, "unit": "px", "style": "440px" } } },
    "link": { "icon": { "size": { "number": 22, "unit": "px", "style": "22px" } }, "quantity": { "overlap": true } }
  }
}
```

- **Sidebar drawer** for stores where shoppers add several items; **dropdown** for simple catalogs; full screen on phones always. `open_cart_on_add: true` is the feedback for AJAX adds from the grid, paired with the loop button designs in the **patterns** skill (`loop-cart-button.md`).
- `content.content.after_title_bar` / `after_footer` accept a Component: a free-shipping line or payment icons.
- Class map beyond the controls: `a.bde-mini-cart-toggle` (`__icon`, `__counter`, `__subtotal`), the panel `.bde-mini-cart-offcanvas` (`-topbar`, `-title`, `__close-button`), and inside `ul.woocommerce-mini-cart > li.bde-mini-cart-item.mini_cart_item` (`a.remove`, the image, the name link, `.quantity` or the builder's stepper), `p.woocommerce-mini-cart__total`, `p.woocommerce-mini-cart__buttons a.button` (`.wc-forward`, `.checkout`).
- Count and subtotal update through cart fragments; `preview-element` shows the panel closed and hides the badge at zero, which is correct.

## Promo and free-shipping bars

An announcement bar in the header (static text, dismiss via `set-element-interactions` toggling a class). For cart-aware messaging, Text elements with `woocommerce-cart-value` conditions (`get-element-conditions`); see `cart-pages.md` for the stepped progress bar. Conditions evaluate on page render.

## Verify

`preview-post` has no session and no JS here, so check these pages in a real browser: `browser_navigate` to a product's `url` and `browser_click` add-to-cart, then navigate to the cart and checkout pages, `browser_take_screenshot` at desktop and after `browser_resize` to the phone breakpoint, use `browser_snapshot` to find the quantity, coupon and checkout fields and `browser_type` and `browser_click` to fill them, and place the test order through to the order received page. Without the `browser_*` tools, ask the owner to do the same in their browser.

- Cart: the preview shows the empty state (no session); add a product in the browser and view the cart, or build both states and check the empty one in `preview-post`. Check a variable product row (the `dl.variation` line), a two-digit quantity, a coupon applied (`tr.cart-discount`), and phone width.
- Checkout: `get-post-tree` confirms billing, shipping, order review and payment are inside the Checkout Builder; then a real test order with "Cash on delivery" or the gateway's test mode, through to the order received page, at desktop and phone width.
- Order received: only reachable by placing an order; style it blind from the class map, then confirm after the test order.
- Every button 44px or taller, every field 48px or taller, the checkout page with no navigation to wander off to.

## Common failures

- Checkout parts render nothing: a billing/shipping/review/payment element outside the Checkout Builder. Move it inside.
- Two checkouts on one page: `CheckoutBuilder` and `Woopagecheckout` in one tree; keep one.
- The custom checkout layout vanishes on the thank-you page: expected, the builder renders `thankyou.php` there; design that state from the class map and keep extras in the frame behind `:has(.woocommerce-order)`.
- Express buttons missing in the Checkout Builder: the gateway hooks inside the stock template; test, and offer the classic element if the owner needs them.
- "Update cart" button showing: hide `button[name="update_cart"]`.
- The stepper breaks into floating boxes: the reset from `quantity-steppers.md` was not applied.
- Cart table overflows on phones: your rules removed the builder's grid restack; extend it instead (the examples show how).
- Totals not sticky: `sticky_totals` on but the offset ignores the admin bar; include `var(--wp-admin--admin-bar--height, 0px)` in your frame's sticky top, or set `sticky_offset` accordingly.
- Checkout fields look like the theme's: the page is missing the store-wide field CSS or the woo variables; add the `.store` layer or the variables block.
- Mini cart badge missing in preview: hidden at zero; correct.
