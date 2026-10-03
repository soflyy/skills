---
name: woocommerce-my-account
description: Design and build the WooCommerce My Account area with the Oxygen 6 or Breakdance builder to a current standard - a welcome band, a sidebar navigation with icons, order history as cards with colour-coded status pills, receipt-style order details, address and payment cards, a clean account form - plus the login and registration pages (centred card, split screen, or a dedicated login page with the Login Form element), lost password, the header account link, and logged-in/logged-out content with display conditions. Use when the user says "my account page", "customer account", "login page", "register page", "order history", "account dashboard", "customer portal", or wants the account area to match the store.
---

# My Account, login and registration

WooCommerce renders the whole account area on one page (the My Account page assigned under WooCommerce > Settings > Advanced) and switches content by endpoint: `/my-account/` is the dashboard, then `/orders/`, `/view-order/123/`, `/downloads/`, `/edit-address/` (and `/edit-address/billing/`), `/payment-methods/`, `/edit-account/`, `/lost-password/`, `/customer-logout/`. Logged-out visitors see the login form (and the registration form when registration is enabled) on the same URL. One element, `EssentialElements\Woopageaccount`, renders all of it; you design the frame around it, the navigation, and the internals through the WooCommerce CSS variables and class CSS. Nothing here is mocked: every form is WooCommerce's.

Before building: `get-instructions`, `get-ecommerce-instructions`, the store design system reference in the **woocommerce-store** skill, and `get-element-slugs` to confirm the Account Page element exists (Oxygen 6: from the WooCommerce add-on; Breakdance: Pro).

Finished designs are in the **patterns** skill, `account-pages.md`: two account frames with full internals CSS (sidebar with icons and a welcome band; top tabs for small stores), order history as cards with status pills, the order detail receipt, address and payment cards, three login designs (centred card, split screen with benefits, a dedicated login page built with the Login Form and Register Form elements), the header account states, and the order tracking page. Every example was rendered against the builder's real stylesheet.

## What a good account area looks like now

- **A welcome, not a wall of links.** "Hi Ana" with the avatar, one line about what is here, and the navigation as a proper sidebar with icons. WooCommerce's default greeting paragraph ("From your account dashboard you can view…") is hidden under a designed band.
- **Orders as cards**, not a table: order number and date, a colour-coded status pill (processing, completed, on hold, cancelled), the total, and a "View" button. The status colour comes from WooCommerce's own row class (`tr.woocommerce-orders-table__row--status-<status>`), so it is styled per status without JavaScript.
- **An order detail that reads as a receipt**: the summary line, the items with quantities and totals, the addresses as two cards, the "Order again" or "Download" actions where WooCommerce provides them.
- **Addresses and payment methods as cards** with a clear edit action; the account form in a bounded panel with the password change in its own group.
- **Login as a focused moment**: a centred card or a split screen with an image and three benefits; email and password with visible labels; "Remember me" and "Lost your password?" as quiet lines; a clear "New here? Create an account" path. Social login and passkeys are plugin territory; do not draw fake buttons.
- **Phones**: the navigation becomes a horizontal scroller of pills under the welcome band; cards stack; every tap target 44px.

## Workflow

1. **Find the page**: `search-posts` (`post_type: page`) for the page WooCommerce assigned as My Account (`site-info` may list it). If it is missing, tell the user to assign one under WooCommerce > Settings > Advanced.
2. **Ask the owner** (one question): can customers register (WooCommerce > Settings > Accounts & Privacy)? Downloads or subscriptions (extra tabs)? Should the header show "Sign in", "Account", or an icon? A dedicated login page, or login on the account page?
3. **Author the frame** with `html-to-page` on the page: the welcome band (bound to the user fields), a slot for the element, and the CSS (recipes in the examples).
4. **Insert the Account Page element** into the slot with `edit-post` and set its tab layout (`design.tabs.layout` vertical or horizontal).
5. **Style the internals** one level under your wrapper class from the class map below. `preview-post` runs as the connected user, so it shows the logged-in dashboard; the login state is styled blind from the class map and checked in a private window.
6. **Header**: the account link goes to the My Account page; with `user-logged-in-status` conditions, "Sign in" for guests and "Account" for customers (or one neutral link on cached sites).
7. **Verify** on phones: the navigation scrolls horizontally, the order cards stack, forms stay full width.

## How the styling works

1. **Class CSS on WooCommerce's markup** at WooCommerce's own selector depth (`.account .woocommerce-MyAccount-navigation ul li a`, `.account table.woocommerce-orders-table tbody tr td`). The store is unstyled, so the navigation, tables, wrappers, form fields and notices have no design but the one you write. Never set the same property through the element's tab controls and through CSS.
2. **Layering a variant on a frame**: a design that modifies a frame (a dark theme, a boxed shell, a progress track on the order rows) must repeat the frame's own class in the chain, `.account.acct-dark`, not `.acct-dark`. A one-class modifier only ties with the frame's `.account …` rules, so which one wins depends on the order the builder prints the stylesheets, and the variant usually looks like it did nothing at all.

## Layout choices

- **Vertical tabs left** (`design.tabs.layout: "vertical"`, `vertical_tabs_position: "left"`): the standard. The element lays nav and content out side by side; your CSS turns the nav into a sidebar with icons and, on phones, a horizontal scroller.
- **Horizontal tabs on top** (`design.tabs.layout: "horizontal"`, `horizontal_tabs_position`, `vertical_at: <breakpoint>`): 4 to 6 endpoints and a narrow content column.
- **Sticky tabs** (`design.tabs.sticky_tabs: true` + `sticky_offset`): long order histories, vertical layout only.
- Leave `design.tabs.tab.*` colours unset when the CSS styles the tabs.
- **The dashboard endpoint** is WooCommerce's weakest screen (two paragraphs of links) and the one worth replacing: tiles above the element, or a bento that takes the screen over entirely. WooCommerce gives the dashboard no body class, so scope dashboard-only CSS on the active navigation item (`:has(li.woocommerce-MyAccount-navigation-link--dashboard.is-active)`), not on a body class that does not exist.

## What you can and cannot change

- **You can**: the frame, the navigation look and order (`order` on the `li`s), icons per endpoint, the dashboard's surroundings (welcome band, quick-link cards, a support box), every table and form, the login and registration layout, what the header shows to guests vs customers, a separate login page.
- **You cannot (with the builder tools)**: rename or add endpoints, change WooCommerce's default texts, add fields to registration, add "reorder" or social login. Those are hooks or plugins; say so and offer the frame-level alternatives. Hiding the dashboard's first paragraph (`.woocommerce-MyAccount-content > p:first-child`) also hides its logout and edit links, so keep a logout link in your navigation styling (it is already a nav item) and confirm with the owner.
- Endpoints from plugins (Subscriptions, Memberships, Wishlist) appear as extra nav items and pick up your styling; give them an icon or they fall back to a generic one.

## Class map

| Area | Classes |
|---|---|
| Wrapper | `.bde-woopageaccount.breakdance-woocommerce` (the element root) > `.woocommerce` > `nav.woocommerce-MyAccount-navigation` + `.woocommerce-MyAccount-content` |
| Nav items | `ul > li.woocommerce-MyAccount-navigation-link` with a modifier per endpoint: `--dashboard`, `--orders`, `--downloads`, `--edit-address`, `--payment-methods`, `--edit-account`, `--customer-logout`, plus plugin endpoints; `.is-active` on the current one; the link is a bare `a` |
| Dashboard | the first `p` (greeting, with `a` for logout and "edit your account"), the second `p` (links to orders, addresses, account details); plugins may add more |
| Orders | `table.woocommerce-orders-table.woocommerce-MyAccount-orders.shop_table.my_account_orders.account-orders-table` > `tr.woocommerce-orders-table__row.woocommerce-orders-table__row--status-{pending,processing,on-hold,completed,cancelled,refunded,failed,draft}.order` > `td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-{number,date,status,total,actions}` (each with `data-title`); the number cell holds `a`, the date a `time`, the actions `a.woocommerce-button.button.view` / `.pay` / `.cancel` (and plugin buttons); pagination `.woocommerce-pagination` with `a.woocommerce-button--previous` / `--next`; empty state `.woocommerce-info` with `a.button.wc-forward` |
| Order detail | `p` summary ("Order #123 was placed on … and is currently Processing"), `.woocommerce-order-details` > `h2.woocommerce-order-details__title` + `table.woocommerce-table--order-details.shop_table.order_details` (`td.woocommerce-table__product-name a` + `strong.product-quantity`, `td.woocommerce-table__product-total`, `tfoot`), `.woocommerce-customer-details` > `h2.woocommerce-column__title` + `.woocommerce-columns--addresses` > `.woocommerce-column--billing-address` / `--shipping-address` (`h2` + `address`) |
| Downloads | `table.woocommerce-table--order-downloads`, `a.woocommerce-MyAccount-downloads-file.button` |
| Addresses | `.woocommerce-Addresses.col2-set.addresses` > `.woocommerce-Address` (`.woocommerce-Address-title` with `h2` + `a.edit`, then `address`); edit form `form` > `.woocommerce-address-fields` > `.woocommerce-address-fields__field-wrapper` (`p.form-row`) + `button.button` |
| Payment methods | `table.woocommerce-MyAccount-paymentMethods.shop_table.account-payment-methods-table` (`td.payment-method-method`, `-expires`, `-actions` with `a.button.delete`), `a.button.add-payment-method`, `.woocommerce-MyAccount-paymentMethods` empty notice |
| Account details | `form.woocommerce-EditAccountForm.edit-account` > `p.woocommerce-form-row` fields, `fieldset` (password change with `legend`), `button.woocommerce-Button.button` ("Save changes"), `.woocommerce-password-strength`, `small.woocommerce-password-hint` |
| Login / register (logged out) | `#customer_login.u-columns.col2-set` > `.u-column1.col-1` (`h2` + `form.woocommerce-form.woocommerce-form-login.login`) and `.u-column2.col-2` (`h2` + `form.woocommerce-form.woocommerce-form-register.register`); inside: `p.woocommerce-form-row` (`label`, `input.woocommerce-Input`), `.woocommerce-form-login__rememberme` (label with checkbox), `button.woocommerce-button.button.woocommerce-form-login__submit`, `p.woocommerce-LostPassword.lost_password a`, `.woocommerce-privacy-policy-text`, `button.woocommerce-form-register__submit`; without registration the page shows the login form alone (no `.u-columns`). The builder ships a layout for this state, keyed to the page's body classes: `#customer_login` is a 768px flex row, each form a bordered card capped at 360px and centred, the column headings capped the same way, and "Remember me" carries a large bottom margin. Its chain (`.woocommerce-page.woocommerce-account .breakdance-woocommerce #customer_login`) counts an id and three classes, so a rule that changes any of it needs one more class or element than that, not a short `.login .u-column1` |
| Lost password | `form.woocommerce-ResetPassword.lost_reset_password` > `p` intro + `p.woocommerce-form-row` + `button.woocommerce-Button.button` |
| Notices | `.woocommerce-message` (saved), `.woocommerce-error` (a `ul`), `.woocommerce-info` (empty states) |

On an unstyled store the nav is a bare list and the tables are browser defaults, so the examples' class rules are the design outright. On a store left on `enabled`, the builder's stylesheet gets there first with its own nav and table styling and stacks the nav above the content under its responsive width; the same rules then read as corrections to that, which is what they were written against.

## A dedicated login page

For a store that wants `/login/` separate from the account area (a split-screen login the header links to, guests redirected after login), use the builder's own elements on any page: `EssentialElements\LoginForm` (username or email, password, remember me, lost password link, `content.form.redirect` + `redirect_url` to the My Account page, `success_message`) and `EssentialElements\RegisterForm` (username, email, password, `auto_login_user`, redirect). They render the builder's form markup (`.bde-login-form` / `.bde-register-form` > `form.breakdance-form` > `.breakdance-form-field` with `__label` and `__input`, `.breakdance-form-checkbox` inside a `fieldset`, `.breakdance-form-button__submit`, the lost-password `a.breakdance-form-link--password`), styled by the Form design controls or by class CSS like any form. Two details decide whether that CSS lands: the form is a 12-column grid and every part of it, the footer included, is a `.breakdance-form-field` spanning all 12 (replace `grid-template-columns` and the footer drops to one column, taking the submit button with it), and the lost-password link is appended to the form's *last* field, so with remember me on it sits inside the checkbox field, not under the password input. WooCommerce's My Account page keeps its own login for logged-out visitors; point the header and the checkout "log in" prompt at whichever the store treats as primary. Example 6 in the layouts file builds one.

## Logged-in vs logged-out content

Element display conditions from `get-element-conditions`:

```jsonc
// header "Sign in" link, guests only
{ "post_id": 220, "element_id": 15, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged out" } ]] }
// header "Account" link, customers only
{ "post_id": 220, "element_id": 16, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged in" } ]] }
// the welcome band only for customers (guests see the login forms without it)
{ "post_id": 252, "element_id": 4, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged in" } ]] }
// a "Welcome back" variant for repeat customers
{ "post_id": 252, "element_id": 5, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-orders", "operand": "is greater than", "value": "0" } ]] }
```

Copy the value strings from the live conditions list. On page-cached sites conditions evaluate at render, so cached visitors see whatever was cached; use one neutral "Account" link in the header there.

## Verify

- `preview-post` on the My Account page: the logged-in dashboard with your band and navigation; check the nav icons resolved (one per endpoint) and the phone width scroller.
- Open `/my-account/orders/` and `/my-account/view-order/<id>/` in the browser as a customer with orders of different statuses; the pills must differ per status. With the `browser_*` tools: `browser_navigate` to `/my-account/`, log in as a test customer the owner provides (`browser_type` into the login form, `browser_click` the button; never ask for the owner's own password), then walk the orders, view-order and edit-address endpoints with `browser_take_screenshot` at desktop and after `browser_resize` to the phone breakpoint. Without the tools, ask the owner to click through.
- A private window for the logged-out state: login and registration forms, the lost-password flow. With the browser tools, a fresh `browser_navigate` after logging out (or the server's `--isolated` mode) shows the same.
- The header link states in both windows.

## Common failures

- "This element only works on the My Account page": the element sits on a page WooCommerce has not assigned. Assign it, or build on the right page.
- Registration form missing: registration is off in WooCommerce > Settings > Accounts & Privacy.
- Password fields missing on register: WooCommerce generates passwords when "send the new user a link to set their password" is on; a setting, not a bug.
- Nav icons missing on a plugin endpoint: add a rule for its modifier class or accept the fallback icon.
- Status pills all the same colour: the rule targets `td.…-order-status` alone; the colour comes from the row modifier `tr.woocommerce-orders-table__row--status-<status>`.
- Tabs look unstyled after CSS: the property is also set by a design control; pick one mechanism.
- A variant design does nothing: its selectors tie with the frame's on specificity. Add the frame's class to the front of every rule.
- Nav stacks under the content on desktop: the element's responsive width variable kicked in below your breakpoint; give the nav an explicit width in your grid.
- Logout goes to a confirmation page: WooCommerce's nonce-less logout asks for confirmation; normal.
