# My Account patterns

Every account frame is scoped under `.account`; paste the shared block once, then a frame (1, 2, 14, 17, 18 or 19), then the content designs (3 to 5, 11 to 13, 16) as needed. Login designs (6 to 8) are separate frames, 15 is a theme swap, and 9 and 10 are the header link and the tracking page. All were rendered against the builder's real stylesheet.

What lifts an account area above WooCommerce's default: something earned at the top (11), orders that answer "where is it" at a glance (12), a dashboard that is targets rather than sentences (13) or a bento that replaces it outright (21), a shell that reads as a product (14), and empty states that sell instead of apologising (16).

The navigation does not have to sit on the left. A left sidebar (1, 14) is the default, but the element also puts the tabs across the top (2, 17, 18) or on the right (19), and design 20 docks them to the bottom of the screen on phones. Design 21 goes further on the dashboard endpoint alone: the bento tiles become the navigation and the element steps aside. Pick the position from the number of endpoints and where the customer is coming from, not out of habit: six or more endpoints want a scrollable bar (18) rather than a pill group (17), and a store whose traffic is mostly mobile wants 20 over any of them.

## Shared: internals

Paste the notice reset from `notices.md` alongside this block: notices arrive unstyled and nothing here colours them.

```css
.account { padding-block: 40px 96px; }
/* the WooCommerce internals: fields, labels, tables and boxes arrive bare, so this is
   their whole appearance. Each frame below restyles the navigation on top of it. */
.account input.input-text, .account .woocommerce-Input, .account select, .account textarea { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); }
.account input.input-text:focus, .account .woocommerce-Input:focus, .account select:focus, .account textarea:focus { outline: none; border-color: var(--ink); }
.account p.woocommerce-form-row label, .account p.form-row label { color: var(--ink); }
.account table.shop_table { width: 100%; border-collapse: collapse; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.account table.shop_table th { background: var(--surface-alt); text-align: left; font: 600 13px/1.3 var(--font-body); }
.account table.shop_table th, .account table.shop_table td { padding: 12px 16px; border-bottom: 1px solid var(--line); }
.account table.shop_table tr:last-child td { border-bottom: 0; }
.account .woocommerce-Address, .account .woocommerce-order-details, .account .woocommerce-customer-details { border: 1px solid var(--line); border-radius: var(--radius); box-shadow: none; }
.account .woocommerce-MyAccount-navigation ul { margin: 0; padding: 0; list-style: none; }
.account .woocommerce-MyAccount-navigation a { color: var(--ink); text-decoration: none; }
.account .woocommerce-MyAccount-navigation li.is-active a { background: var(--ink); color: var(--on-brand); border-radius: var(--radius); }
/* a notice is a child of the element's own flex/grid container, so it takes the navigation's cell
   unless it is told to span the row. Without this the whole frame shuffles the first time
   WooCommerce prints "Address changed successfully" */
.account .bde-woopageaccount .woocommerce > .woocommerce-notices-wrapper { grid-column: 1 / -1; }
/* content typography */
.account .woocommerce-MyAccount-content { font: 15px/1.6 var(--font-body); color: var(--ink); gap: 24px; }
.account .woocommerce-MyAccount-content > p { margin: 0; }
.account .woocommerce-MyAccount-content h2, .account .woocommerce-MyAccount-content h3, .account .woocommerce-order-details__title, .account .woocommerce-column__title, .account .woocommerce-Address-title h2 { margin: 0; font: 600 20px/1.2 var(--font-body); }
.account .woocommerce-MyAccount-content a:not(.button) { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.account .woocommerce-MyAccount-content a:not(.button):hover { color: var(--brand); }
/* buttons inside the content: view, edit, save, add payment method */
.account .woocommerce-MyAccount-content .button, .account .woocommerce-MyAccount-content button.button, .account .woocommerce-MyAccount-content a.button, .account .woocommerce-Address a.edit { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border: 1px solid var(--ink); border-radius: var(--radius); background: transparent; color: var(--ink); font: 600 13px/1 var(--font-body); text-transform: none; text-decoration: none; width: auto; cursor: pointer; transition: background .15s, color .15s; }
.account .woocommerce-MyAccount-content .button:hover, .account .woocommerce-MyAccount-content a.button:hover, .account .woocommerce-Address a.edit:hover { background: var(--ink); color: #fff; }
.account .woocommerce-MyAccount-content button.woocommerce-Button.button, .account .woocommerce-MyAccount-content form button.button { min-height: 48px; padding: 0 24px; background: var(--brand); border-color: var(--brand); color: var(--on-brand); font-size: 15px; }
.account .woocommerce-MyAccount-content form button.button:hover { background: var(--brand-hover); border-color: var(--brand-hover); color: var(--on-brand); }
/* forms: fields 50px, labels above */
.account p.woocommerce-form-row, .account p.form-row { margin: 0; }
.account p.woocommerce-form-row label, .account p.form-row label { display: block; margin: 0 0 6px; font: 500 13px/1.3 var(--font-body); }
.account .woocommerce-Input, .account input.input-text, .account select, .account textarea { width: 100%; min-height: 50px; padding: 12px 14px; font: 15px/1.4 var(--font-body); }
.account .select2-container .select2-selection--single { height: 50px; border: 1px solid var(--line); border-radius: var(--radius); }
.account .select2-container .select2-selection--single .select2-selection__rendered { line-height: 48px; padding-left: 14px; }
.account .select2-container .select2-selection--single .select2-selection__arrow { height: 48px; }
.account form .woocommerce-address-fields__field-wrapper { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.account form .woocommerce-address-fields__field-wrapper p.form-row { grid-column: span 2; width: auto; }
.account form .woocommerce-address-fields__field-wrapper p.form-row-first, .account form .woocommerce-address-fields__field-wrapper p.form-row-last { grid-column: span 1; }
/* account details */
.account form.woocommerce-EditAccountForm { display: grid; gap: 14px; padding: 24px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.account form.woocommerce-EditAccountForm .woocommerce-form-row--first, .account form.woocommerce-EditAccountForm .woocommerce-form-row--last { width: calc(50% - 7px); display: inline-block; vertical-align: top; }
.account form.woocommerce-EditAccountForm .woocommerce-form-row--first { margin-right: 14px; }
.account form.woocommerce-EditAccountForm fieldset { display: grid; gap: 14px; margin: 8px 0 0; padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-alt); }
.account form.woocommerce-EditAccountForm legend { padding: 0 8px; font: 600 15px/1.2 var(--font-body); }
.account form.woocommerce-EditAccountForm span em { display: block; margin-top: 6px; font: 13px/1.4 var(--font-body); color: var(--ink-muted); font-style: normal; }
/* notices */
.account .woocommerce-MyAccount-content .woocommerce-message, .account .woocommerce-MyAccount-content .woocommerce-info, .account .woocommerce-MyAccount-content .woocommerce-error { margin: 0; }
/* the builder anchors the type icon at left: var(--bde-woo-notices__padding), so a padding shorthand must come with a padding-left that clears it and a matching ::before left */
.account .woocommerce-MyAccount-content .woocommerce-info { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 20px 24px 20px 56px; }
.account .woocommerce-MyAccount-content .woocommerce-info::before { left: 24px; }
.account .woocommerce-MyAccount-content .woocommerce-info a.button { margin-left: auto; }
```

## 1. Sidebar with icons and a welcome band (the default frame)

Use when: most stores. The welcome band is bound to the logged-in user; the element's vertical navigation becomes a sidebar with an icon per endpoint and the current item filled. On phones the nav is a horizontal pill scroller under the band.

```html
<section class="account store">
  <div class="container">
    <header class="acct-hello">
      <img class="acct-avatar" bd-src="user_avatar_url" alt="">
      <div class="acct-hello-text">
        <h1 class="acct-title"><span class="acct-title-hi">Hi,</span> <span bd-bind="user_name"></span></h1>
        <p class="acct-intro">Your orders, addresses and details, all in one place.</p>
      </div>
      <a class="acct-shop btn btn--secondary" href="/shop/">Continue shopping</a>
    </header>
    <div class="account-slot"></div>
  </div>
</section>
<style>
  .acct-hello { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 20px; padding: 0 0 32px; margin-bottom: 32px; border-bottom: 1px solid var(--line); }
  .acct-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; background: var(--surface-alt); }
  .acct-title { margin: 0 0 4px; font: 600 clamp(26px, 3vw, 36px)/1.1 var(--font-display); }
  .acct-title-hi { color: var(--ink-muted); font-weight: 400; }
  .acct-intro { margin: 0; color: var(--ink-muted); font: 15px/1.5 var(--font-body); }
  /* the element's two blocks as a sidebar grid */
  .account .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 56px; align-items: start; }
  /* WooCommerce clearfixes this wrapper with ::before/::after { content: " "; display: table }; in a grid they are cells and push the nav into the second column */
  .account .bde-woopageaccount .woocommerce::before, .account .bde-woopageaccount .woocommerce::after { content: none; }
  .account nav.woocommerce-MyAccount-navigation { width: auto; min-width: 0; position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); }
  .account .woocommerce-MyAccount-content { width: auto; flex: none; }
  .account nav.woocommerce-MyAccount-navigation ul { display: grid; gap: 4px; list-style: none; margin: 0; padding: 0; }
  .account .woocommerce-MyAccount-navigation ul li { display: block; }
  .account .woocommerce-MyAccount-navigation ul li a { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; border-radius: var(--radius); color: var(--ink); background: transparent; text-decoration: none; font: 500 15px/1.2 var(--font-body); transition: background .15s, color .15s; }
  .account .woocommerce-MyAccount-navigation ul li a:hover { background: var(--surface-alt); color: var(--ink); }
  .account .woocommerce-MyAccount-navigation ul li.is-active a { background: var(--ink); color: #fff; }
  .account .woocommerce-MyAccount-navigation ul li a::before { content: ""; flex: none; width: 18px; height: 18px; background: currentColor; -webkit-mask: var(--acct-icon, url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/></svg>")) center / contain no-repeat; mask: var(--acct-icon, url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/></svg>")) center / contain no-repeat; }
  .account li.woocommerce-MyAccount-navigation-link--dashboard a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--orders a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 8 12 3 3 8v8l9 5 9-5z'/><path d='M3 8l9 5 9-5'/><path d='M12 13v8'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--downloads a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v12'/><path d='m7 10 5 5 5-5'/><path d='M4 21h16'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--edit-address a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z'/><circle cx='12' cy='10' r='2.5'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--payment-methods a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--edit-account a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 4-6 8-6s8 2 8 6'/></svg>"); }
  .account li.woocommerce-MyAccount-navigation-link--customer-logout { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line); }
  .account li.woocommerce-MyAccount-navigation-link--customer-logout a { --acct-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/><path d='m16 17 5-5-5-5'/><path d='M21 12H9'/></svg>"); color: var(--ink-muted); }
  /* the dashboard's boilerplate paragraph under a designed band */
  .account .woocommerce-MyAccount-content > p:first-child { display: none; }
  @media (max-width: 1023px) {
    .account .bde-woopageaccount .woocommerce { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .account nav.woocommerce-MyAccount-navigation { position: static; margin: 0 calc(var(--gutter) * -1); padding: 0 var(--gutter); overflow-x: auto; scrollbar-width: none; }
    .account nav.woocommerce-MyAccount-navigation ul { display: flex; flex-direction: row; gap: 8px; width: max-content; padding-bottom: 4px; }
    .account .woocommerce-MyAccount-navigation ul li a { padding: 10px 14px; border: 1px solid var(--line); border-radius: var(--radius-pill); white-space: nowrap; font-size: 14px; }
    .account li.woocommerce-MyAccount-navigation-link--customer-logout { margin: 0; padding: 0; border: 0; }
  }
  @media (max-width: 767px) {
    .acct-hello { grid-template-columns: auto minmax(0, 1fr); }
    .acct-shop { grid-column: 1 / -1; justify-self: start; }
  }
</style>
```

```jsonc
// edit-post: the element into the slot, vertical tabs; the CSS above owns the columns
{ "post_id": 252, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageaccount", "parent_id": 6,
  "properties": { "design": { "tabs": { "layout": "vertical", "vertical_tabs_position": "left" } } } } } ] }
```

The user fields are `user_name`, `user_email` and `user_avatar_url` (confirm in `get-dynamic-fields`); they resolve to the logged-in user. Give the welcome band a `user-logged-in-status` "logged in" condition so guests see the login forms without an empty greeting. The icons are inline SVG data URIs masked in `currentColor`; swap the paths for the site's icon set, keeping one per endpoint modifier.

## 2. Top tabs, narrow content (small stores)

Use when: 4 to 6 endpoints and a simple catalog. Underlined tabs in a row, content in an 880px column.

```html
<section class="account account--tabs store">
  <div class="container container--narrow">
    <h1 class="acct-title">Account</h1>
    <div class="account-slot"></div>
  </div>
</section>
<style>
  .account.account--tabs .container--narrow { max-width: 880px; }
  .account.account--tabs .acct-title { margin: 0 0 24px; font: 600 32px/1.1 var(--font-display); }
  .account.account--tabs .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .account.account--tabs .bde-woopageaccount .woocommerce::before, .account.account--tabs .bde-woopageaccount .woocommerce::after { content: none; }
  .account.account--tabs nav.woocommerce-MyAccount-navigation { width: auto; min-width: 0; border-bottom: 1px solid var(--line); overflow-x: auto; scrollbar-width: none; }
  .account.account--tabs nav.woocommerce-MyAccount-navigation ul { display: flex; flex-direction: row; gap: 28px; list-style: none; margin: 0; padding: 0; width: max-content; min-width: 100%; }
  .account.account--tabs .woocommerce-MyAccount-navigation ul li { display: block; }
  .account.account--tabs .woocommerce-MyAccount-navigation ul li a { display: block; width: auto; padding: 14px 0; border-radius: 0; background: transparent; color: var(--ink-muted); font: 600 14px/1 var(--font-body); text-decoration: none; border-bottom: 2px solid transparent; margin-bottom: -1px; white-space: nowrap; }
  .account.account--tabs .woocommerce-MyAccount-navigation ul li a:hover { color: var(--ink); background: transparent; }
  .account.account--tabs .woocommerce-MyAccount-navigation ul li.is-active a { color: var(--ink); background: transparent; border-bottom-color: var(--ink); }
  /* frame 1's sidebar rules give this item a top border and margin; a row of tabs has to clear them */
  .account.account--tabs li.woocommerce-MyAccount-navigation-link--customer-logout { margin: 0 0 0 auto; padding: 0; border: 0; }
  .account.account--tabs .woocommerce-MyAccount-content { width: auto; flex: none; }
</style>
```

```jsonc
{ "post_id": 252, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageaccount", "parent_id": 5,
  "properties": { "design": { "tabs": { "layout": "horizontal", "horizontal_tabs_position": "left", "vertical_at": "breakpoint_phone_portrait" } } } } } ] }
```

## 3. Order history as cards with status pills

Use with either frame. The table becomes a stack of cards; each cell keeps its `data-title` as a small label above the value; the status takes its colour from WooCommerce's row modifier (`tr.woocommerce-orders-table__row--status-<status>`), so nothing depends on the status text. WooCommerce prints the status as bare text inside the cell, so the pill is a coloured dot plus coloured text rather than a filled chip; the label and the dot are the cell's pseudo-elements laid out on a small grid. Note the selector length on the status cell: the rule that turns every cell into a block (`.account table.woocommerce-orders-table tbody tr td`) counts four elements, so a shorter `.account td.<status class>` loses to it on specificity and the cell silently stays `display: block`. Match the long form whenever you restyle one cell.

```css
.account table.woocommerce-orders-table { display: block; border: 0; border-radius: 0; overflow: visible; background: transparent; }
.account table.woocommerce-orders-table thead { display: none; }
.account table.woocommerce-orders-table tbody { display: grid; gap: 12px; box-shadow: none; background: transparent; border-radius: 0; }
.account table.woocommerce-orders-table tbody tr { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.3fr) auto; gap: 12px 20px; align-items: center; padding: 18px 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); transition: border-color .15s; }
.account table.woocommerce-orders-table tbody tr:hover { border-color: var(--ink); }
.account table.woocommerce-orders-table tbody tr td { display: block; padding: 0; border: 0; background: transparent; font: 15px/1.3 var(--font-body); color: var(--ink); }
.account table.woocommerce-orders-table tbody tr td::before { content: attr(data-title); display: block; margin: 0 0 4px; font: 500 11px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
.account td.woocommerce-orders-table__cell-order-number a { font-weight: 600; text-decoration: none; }
.account td.woocommerce-orders-table__cell-order-total { font-weight: 600; }
.account td.woocommerce-orders-table__cell-order-total span::after { content: none; }
.account td.woocommerce-orders-table__cell-order-actions { display: flex; gap: 8px; justify-self: end; }
.account td.woocommerce-orders-table__cell-order-actions::before { display: none; }
/* status: label on top, dot + coloured text under it; colour from the row's status class */
.account table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status { display: grid; grid-template-columns: auto minmax(0, 1fr); grid-template-areas: "label label" "dot text"; align-items: center; column-gap: 6px; font-weight: 600; color: var(--status-ink, var(--ink-muted)); }
.account table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status::before { grid-area: label; margin: 0 0 4px; }
.account table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status::after { content: ""; grid-area: dot; width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-processing td.woocommerce-orders-table__cell-order-status { --status-ink: var(--info); }
.account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-completed td.woocommerce-orders-table__cell-order-status { --status-ink: var(--success); }
.account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-on-hold td.woocommerce-orders-table__cell-order-status, .account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-pending td.woocommerce-orders-table__cell-order-status { --status-ink: #9a5b00; }
.account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-cancelled td.woocommerce-orders-table__cell-order-status, .account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-failed td.woocommerce-orders-table__cell-order-status, .account table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-refunded td.woocommerce-orders-table__cell-order-status { --status-ink: var(--error); }
/* pagination and the empty state */
.account .woocommerce-pagination { display: flex; gap: 8px; justify-content: center; margin-top: 8px; }
/* Below 1024px the builder's own stylesheet re-flows every WooCommerce table into a flex column with
   data-title labels, from a selector no plain .account chain can reach. Without this block the cards
   collapse into centred label-value pairs on every tablet and phone. The extra classes are what wins,
   not the media query: a media query adds no specificity at all. */
@media (max-width: 1024px) {
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; padding: 16px; }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell { display: block; padding: 0; }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell::before { display: block; margin: 0 0 4px; font: 500 11px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status { display: grid; }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-total span::after { content: none; margin: 0; }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-actions { display: flex; flex-direction: row; align-items: stretch; gap: 8px; grid-column: 1 / -1; justify-self: stretch; }
  .account .bde-woopageaccount.breakdance-woocommerce table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-actions::before { display: none; }
  .account td.woocommerce-orders-table__cell-order-actions a.button { flex: 1; }
}
```

Two of those rules exist only to undo the reset above them: the generic cell rule would otherwise flatten the status cell's own grid and take its dot with it, and the builder adds a 5px spacer before the order total below 1024px.

For a filled chip, wrap the status text with a small snippet (`woocommerce_my_account_my_orders_column_order-status` filter printing a `span`) and style that span; without the snippet the dot design is the honest one.

## 4. Order detail as a receipt

```css
.account .woocommerce-MyAccount-content > p.woocommerce-notice, .account .woocommerce-MyAccount-content > p:has(mark) { padding: 16px 20px; border-radius: var(--radius); background: var(--surface-alt); font: 15px/1.5 var(--font-body); }
.account .woocommerce-MyAccount-content mark { background: transparent; color: var(--ink); font-weight: 600; }
.account .woocommerce-order-details, .account .woocommerce-customer-details { display: grid; gap: 12px; }
.account table.woocommerce-table--order-details { width: 100%; border: 1px solid var(--line); border-radius: var(--radius); border-collapse: separate; border-spacing: 0; overflow: hidden; background: var(--surface); }
.account table.woocommerce-table--order-details thead { display: none; }
.account table.woocommerce-table--order-details tbody, .account table.woocommerce-table--order-details tfoot { box-shadow: none; background: transparent; }
.account table.woocommerce-table--order-details th, .account table.woocommerce-table--order-details td { padding: 12px 16px; border: 0; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font: 15px/1.4 var(--font-body); background: transparent; }
.account table.woocommerce-table--order-details td.woocommerce-table__product-total, .account table.woocommerce-table--order-details tfoot td { text-align: right; white-space: nowrap; font-weight: 500; }
.account table.woocommerce-table--order-details td.woocommerce-table__product-name a { text-decoration: none; font-weight: 500; }
.account table.woocommerce-table--order-details .product-quantity { color: var(--ink-muted); font-weight: 400; }
.account table.woocommerce-table--order-details tfoot th { font-weight: 500; color: var(--ink-muted); }
.account table.woocommerce-table--order-details tfoot tr:last-child th, .account table.woocommerce-table--order-details tfoot tr:last-child td { border-bottom: 0; font: 700 18px/1.2 var(--font-body); color: var(--ink); }
.account .woocommerce-columns--addresses { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; width: 100%; }
.account .woocommerce-column { padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.account .woocommerce-column .woocommerce-column__title { margin: 0 0 10px; font: 600 12px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
.account .woocommerce-column address { margin: 0; padding: 0; border: 0; font: 15px/1.6 var(--font-body); font-style: normal; background: transparent; }
.account .woocommerce-customer-details--phone, .account .woocommerce-customer-details--email { margin: 6px 0 0; color: var(--ink-muted); }
@media (max-width: 767px) { .account .woocommerce-columns--addresses { grid-template-columns: minmax(0, 1fr); } }
```

## 5. Addresses and payment methods as cards

```css
.account .woocommerce-Addresses { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.account .woocommerce-Address { display: grid; gap: 12px; padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.account .woocommerce-Address-title { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.account .woocommerce-Address-title h2, .account .woocommerce-Address-title h3 { margin: 0; font: 600 16px/1.2 var(--font-body); }
.account .woocommerce-Address address { margin: 0; font: 15px/1.6 var(--font-body); font-style: normal; color: var(--ink); }
.account .woocommerce-Address address:empty::before, .account .woocommerce-Address address:has(> :only-child:empty)::before { content: "No address saved yet."; color: var(--ink-muted); }
.account table.woocommerce-MyAccount-paymentMethods { width: 100%; border: 1px solid var(--line); border-radius: var(--radius); border-collapse: separate; border-spacing: 0; overflow: hidden; }
.account table.woocommerce-MyAccount-paymentMethods th, .account table.woocommerce-MyAccount-paymentMethods td { padding: 14px 16px; border: 0; border-bottom: 1px solid var(--line); text-align: left; font: 15px/1.4 var(--font-body); }
.account table.woocommerce-MyAccount-paymentMethods thead th { background: var(--surface-alt); font: 600 11px/1.2 var(--font-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-muted); }
.account table.woocommerce-MyAccount-paymentMethods td.payment-method-actions { text-align: right; }
.account a.button.add-payment-method { margin-top: 16px; }
@media (max-width: 767px) { .account .woocommerce-Addresses { grid-template-columns: minmax(0, 1fr); } }
```

## 6. Login as a centred card (logged-out state of the account page)

Use when: the account page doubles as the login page and the store wants a focused sign-in. One card, login first, registration under a labelled divider.

```html
<section class="login login--card store">
  <div class="container">
    <div class="login-card">
      <div class="login-head">
        <h1 class="login-title">Welcome back</h1>
        <p class="login-intro">Sign in to track orders, save addresses and check out faster.</p>
      </div>
      <div class="login-forms"><div class="login-slot"></div></div>
    </div>
  </div>
</section>
<style>
  .login { padding-block: 64px 96px; background: var(--surface-alt); }
  .login-card { max-width: 480px; margin-inline: auto; padding: 40px; border: 1px solid var(--line); border-radius: calc(var(--radius) * 1.6); background: var(--surface); box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 24px 48px -28px rgba(16, 24, 40, .18); }
  .login-head { text-align: center; margin-bottom: 28px; }
  .login-title { margin: 0 0 8px; font: 600 clamp(24px, 2.6vw, 30px)/1.15 var(--font-display); }
  .login-intro { margin: 0; color: var(--ink-muted); font: 15px/1.5 var(--font-body); text-wrap: balance; }
  /* The internals, and the builder defaults they arrive with. The account page carries WordPress's
     own body classes, and they switch on the builder's login layout: `#customer_login` becomes a
     768px flex row, each form is capped at 360px and centred, the column headings are capped and
     centred too, and "Remember me" takes a 34px bottom margin. Those chains are
     `.woocommerce-page.woocommerce-account .breakdance-woocommerce #customer_login` (1 id and
     3 classes) and 3 classes for the rest, so every rule below that changes one of those runs from
     `.login .login-forms` and carries a class or an element more. A shorter selector only ties, and
     then wins or loses on which stylesheet the site loaded last. */
  /* the element's own wrapper is a flex row (it carries the account layout); here it only ever
     stacks a notice above the forms, so make it a plain block */
  .login .login-forms .bde-woopageaccount .woocommerce { display: block; }
  .login .login-forms .breakdance-woocommerce .woocommerce #customer_login { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; width: 100%; max-width: none; margin: 0; }
  .login .login-forms .woocommerce #customer_login .u-column1, .login .login-forms .woocommerce #customer_login .u-column2 { width: auto; float: none; }
  /* WooCommerce's "Login" heading repeats the card's own title, so it goes (the builder hides it
     the same way when registration is off and there is only one form); "Register" stays as the
     label on the divider */
  .login .login-forms .woocommerce #customer_login .u-column1 h2 { display: none; }
  .login .login-forms .woocommerce #customer_login .u-column2 { padding-top: 28px; border-top: 1px solid var(--line); }
  .login .login-forms .woocommerce #customer_login .u-column2 h2 { max-width: none; margin: 0 0 16px; font: 600 17px/1.2 var(--font-body); text-align: left; }
  /* each form arrives as a bordered 360px card of its own; this is the reset */
  .login .login-forms form.woocommerce-form-login, .login .login-forms form.woocommerce-form-register { display: grid; gap: 16px; width: 100%; max-width: none; margin: 0; padding: 0; border: 0; background: transparent; box-shadow: none; }
  .login .login-forms p.woocommerce-form-row, .login .login-forms p.form-row { margin: 0; }
  .login .login-forms p.woocommerce-form-row label, .login .login-forms p.form-row label { display: block; margin: 0 0 6px; color: var(--ink); font: 500 13px/1.3 var(--font-body); }
  .login .login-forms .woocommerce-Input { width: 100%; min-height: 50px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: 15px/1.4 var(--font-body); }
  .login .login-forms .woocommerce-Input:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px rgba(22, 24, 29, .08); }
  /* "Remember me" and the submit button share one <p>. `display: contents` lifts both into the
     form's own grid, so the checkbox can sit on one row with the lost-password link and the button
     span the row under it; `order: 1` keeps the button last whatever fields a plugin adds */
  .login .login-forms form.woocommerce-form-login { grid-template-columns: minmax(0, 1fr) auto; }
  .login .login-forms form.woocommerce-form-login > p { grid-column: 1 / -1; }
  .login .login-forms form.woocommerce-form-login > p.form-row:has(.woocommerce-form-login__submit) { display: contents; }
  .login .login-forms form.woocommerce-form-login .woocommerce-form-login__rememberme { grid-column: 1; align-self: center; display: inline-flex; align-items: center; gap: 8px; margin: 0; font: 14px/1.4 var(--font-body); }
  .login .login-forms form.woocommerce-form-login .woocommerce-form-login__rememberme input { width: 18px; height: 18px; margin: 0; border-radius: 5px; accent-color: var(--ink); }
  .login .login-forms form.woocommerce-form-login > p.woocommerce-LostPassword { grid-column: 2; align-self: center; margin: 0; text-align: right; font: 13px/1.4 var(--font-body); }
  .login .login-forms form.woocommerce-form-login > p.woocommerce-LostPassword a { color: var(--ink-muted); }
  /* the submit buttons. The account page styles its own with `button[name=login]` (3 classes and an
     attribute), so these name the form and the element to stay ahead of it */
  .login .login-forms form.woocommerce-form-login button.woocommerce-form-login__submit, .login .login-forms form.woocommerce-form-register button.woocommerce-form-register__submit { order: 1; grid-column: 1 / -1; width: 100%; min-height: 52px; padding: 0 20px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 15px/1 var(--font-body); text-transform: none; cursor: pointer; transition: background .15s, color .15s; }
  .login .login-forms form.woocommerce-form-login button.woocommerce-form-login__submit:hover { background: var(--brand-hover); }
  .login .login-forms form.woocommerce-form-register button.woocommerce-form-register__submit { background: transparent; border: 1px solid var(--ink); color: var(--ink); }
  .login .login-forms form.woocommerce-form-register button.woocommerce-form-register__submit:hover { background: var(--ink); color: #fff; }
  /* the builder sizes every paragraph inside these forms, so the privacy note is restyled on the
     <p> itself: an inherited value loses to any rule that sets the property directly */
  .login .login-forms .woocommerce-privacy-policy-text p { margin: 0; color: var(--ink-muted); font: 13px/1.5 var(--font-body); }
  /* the notice WooCommerce prints into the wrapper above the forms after a failed sign-in */
  .login .login-forms .woocommerce-notices-wrapper:not(:empty) { margin-bottom: 24px; }
  .login .login-forms .woocommerce-error { list-style: none; margin: 0; padding: 14px 16px 14px 44px; border-radius: var(--radius); background: var(--error-bg); color: var(--error); font: 14px/1.45 var(--font-body); }
  /* the builder puts the icon on li::before but leaves the li unpositioned, so every icon anchors
     to the ul; position the li and each line carries its own icon */
  .login .login-forms .woocommerce-error li { position: relative; display: block; }
  .login .login-forms .woocommerce-error li::before { left: -28px; }
  .login .login-forms .woocommerce-error a { color: inherit; text-transform: none; }
  /* on a phone the card loses some padding and the remember-me row becomes two lines, otherwise
     "Remember me" wraps against the lost-password link */
  @media (max-width: 479px) {
    .login-card { padding: 28px 22px; }
    .login .login-forms form.woocommerce-form-login { grid-template-columns: minmax(0, 1fr); }
    .login .login-forms form.woocommerce-form-login .woocommerce-form-login__rememberme, .login .login-forms form.woocommerce-form-login > p.woocommerce-LostPassword { grid-column: 1; text-align: left; }
  }
</style>
```

Keep the `.login-forms` wrapper around the Account Page element: it is the class the long selectors hang off, and design 7 reuses every rule under it. With registration disabled WooCommerce prints the login form on its own, without `#customer_login` or the two columns, and the card still holds, since only the layout rules name that id.

The same slot takes the Account Page element; customers see the dashboard inside the same frame, so give the card a wider `max-width` (or no cap) for logged-in users with a second container carrying a `user-logged-in-status` condition, or use frame 1 for customers and this frame only for guests by putting both on the page with opposite conditions.

## 7. Split screen with benefits (guests only)

Use when: the store wants a branded sign-in. Image left, forms right, three benefits under the heading, login and registration side by side on a vertical divider. The image column carries a "logged out" condition so customers get the dashboard full width.

```html
<section class="login login--split store">
  <div class="login-grid">
    <div class="login-media">
      <img src="/wp-content/uploads/login-hero.jpg" alt="" width="1200" height="1600">
    </div>
    <div class="login-panel">
      <h1 class="login-title">Welcome back</h1>
      <p class="login-intro">Sign in to your account.</p>
      <ul class="login-benefits">
        <li>Track every order and return</li>
        <li>Save addresses and check out in one tap</li>
        <li>Early access to drops and members' prices</li>
      </ul>
      <div class="login-forms login-forms--2col"><div class="login-slot"></div></div>
    </div>
  </div>
</section>
<style>
  .login--split { padding-block: 0; background: var(--surface); }
  .login-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); min-height: 82vh; }
  .login-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .login-panel { padding: 72px clamp(24px, 5vw, 80px); display: grid; align-content: center; max-width: 860px; margin-inline: auto; }
  .login--split .login-title { margin: 0 0 6px; }
  .login--split .login-intro { margin: 0 0 20px; }
  .login-benefits { list-style: none; margin: 0 0 36px; padding: 0; display: grid; gap: 8px; font: 14px/1.4 var(--font-body); color: var(--ink); }
  .login-benefits li { display: flex; align-items: center; gap: 10px; }
  .login-benefits li::before { content: ""; width: 18px; height: 18px; border-radius: 50%; background: var(--success-bg); flex: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c7c4a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>"); background-size: 10px; background-repeat: no-repeat; background-position: center; }
  /* the two columns side by side, divided by a rule between them rather than above the second.
     `.login-forms--2col` is written next to `.login-forms` so the chain is one class longer than
     design 6's and wins wherever the two stylesheets end up in the load order */
  .login .login-forms.login-forms--2col .breakdance-woocommerce .woocommerce #customer_login { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }
  .login .login-forms.login-forms--2col .woocommerce #customer_login .u-column1 h2 { display: block; max-width: none; margin: 0 0 16px; font: 600 17px/1.2 var(--font-body); text-align: left; }
  .login .login-forms.login-forms--2col .woocommerce #customer_login .u-column2 { padding: 0 0 0 40px; border-top: 0; border-left: 1px solid var(--line); }
  @media (max-width: 1023px) {
    .login-grid { grid-template-columns: minmax(0, 1fr); min-height: 0; }
    .login-media { display: none; }
    .login-panel { padding: 48px var(--gutter); max-width: none; }
    .login .login-forms.login-forms--2col .breakdance-woocommerce .woocommerce #customer_login { grid-template-columns: minmax(0, 1fr); gap: 28px; }
    .login .login-forms.login-forms--2col .woocommerce #customer_login .u-column2 { padding: 28px 0 0; border-top: 1px solid var(--line); border-left: 0; }
  }
</style>
```

Reuse the form rules from design 6 (they are scoped to `.login .login-forms`, which this design has too) and paste this block after them. Condition `.login-media` and `.login-benefits` on `user-logged-in-status` is `logged out`.

## 8. A dedicated login page with the Login Form and Register Form elements

Use when: `/login/` should be its own page (the header's "Sign in" goes there, guests are redirected to the account after login). Any page, the builder's own elements, no WooCommerce markup.

```html
<section class="login login--page store">
  <div class="container">
    <div class="login-page-grid">
      <div class="login-page-col">
        <h1 class="login-title">Sign in</h1>
        <p class="login-intro">Good to see you again.</p>
        <div class="login-form-slot"></div>
      </div>
      <div class="login-page-col login-page-col--alt">
        <h2 class="login-title login-title--sub">New here?</h2>
        <p class="login-intro">Create an account to track orders and check out faster.</p>
        <div class="register-form-slot"></div>
      </div>
    </div>
  </div>
</section>
<style>
  .login-page-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 900px; margin-inline: auto; align-items: start; }
  .login-page-col { padding: 36px; border: 1px solid var(--line); border-radius: calc(var(--radius) * 1.6); background: var(--surface); box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 24px 48px -28px rgba(16, 24, 40, .18); }
  /* the second column is the same card a step back: it drops to the page's own tint with no
     shadow, so the white card holds the eye, and its button is outlined rather than filled */
  .login-page-col--alt { background: var(--surface-alt); box-shadow: none; }
  .login--page .login-title { margin: 0 0 6px; font-size: 26px; }
  .login--page .login-title--sub { font-size: 20px; }
  .login--page .login-intro { margin: 0 0 24px; }
  /* The builder's form markup. The element lays the form out on a 12-column grid and every part of
     it, the footer included, is a `.breakdance-form-field` spanning all 12 - so leave
     `grid-template-columns` alone here, or the footer drops to one column and the submit button
     shrinks with it. */
  .login--page .breakdance-form { gap: 16px; }
  .login--page .breakdance-form-field__label { margin-bottom: 6px; color: var(--ink); font: 500 13px/1.3 var(--font-body); }
  .login--page .breakdance-form .breakdance-form-field__input { width: 100%; min-height: 50px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: 15px/1.4 var(--font-body); }
  .login--page .breakdance-form .breakdance-form-field__input:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(22, 24, 29, .08); outline: none; }
  /* The element appends the lost-password link to its last field, which with "remember me" on is
     the checkbox field: that field becomes the row that carries both. With remember me off the link
     lands under the password input instead, so the second rule places it there too. */
  .login--page .breakdance-form-field--checkbox { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; width: 100%; }
  .login--page .breakdance-form-field--password .breakdance-form-link--password { align-self: flex-end; margin-top: 6px; }
  .login--page .breakdance-form-checkbox { display: inline-flex; align-items: center; gap: 8px; margin: 0; font: 14px/1.4 var(--font-body); }
  .login--page .breakdance-form-checkbox input[type="checkbox"] { width: 18px; height: 18px; border-radius: 5px; }
  .login--page .breakdance-form-checkbox__text { margin: 0; cursor: pointer; }
  .login--page .breakdance-form-link--password { color: var(--ink-muted); font: 13px/1.4 var(--font-body); }
  .login--page .breakdance-form .breakdance-form-button__submit { align-items: center; justify-content: center; width: 100%; min-height: 52px; padding: 0 20px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 15px/1 var(--font-body); cursor: pointer; transition: background .15s, color .15s; }
  .login--page .breakdance-form .breakdance-form-button__submit:hover { background: var(--brand-hover); }
  .login--page .login-page-col--alt .breakdance-form .breakdance-form-button__submit { background: transparent; border: 1px solid var(--ink); color: var(--ink); }
  .login--page .login-page-col--alt .breakdance-form .breakdance-form-button__submit:hover { background: var(--ink); color: #fff; }
  @media (max-width: 767px) { .login-page-grid { grid-template-columns: minmax(0, 1fr); } .login-page-col { padding: 24px; } }
</style>
```

```jsonc
{ "post_id": 254, "operations": [
  { "op": "insert", "payload": { "element_type": "EssentialElements\\LoginForm", "parent_id": 8,
    "properties": { "content": { "form": { "labels": { "username_label": "Email or username", "password_label": "Password", "remember_me": "Keep me signed in", "lost_password": "Forgot your password?" }, "remember_me": true, "lost_password": true, "submit_text": "Sign in", "redirect": true, "redirect_url": "/my-account/" } } } } },
  { "op": "insert", "payload": { "element_type": "EssentialElements\\RegisterForm", "parent_id": 13,
    "properties": { "content": { "form": { "labels": { "username_label": "Username", "email_label": "Email", "password_label": "Password" }, "submit_text": "Create account", "auto_login_user": true, "redirect": true, "redirect_url": "/my-account/" } } } } }
] }
```

This frame sits on `.login`, so it takes the page background and padding from design 6's first rule; paste that one line with it if you use this design on its own. Verify the property paths with `get-element-schemas` for both elements; the label keys above are the controls' slugs. The Login Form's design controls (`design.form.*`) style the fields too; use either the controls or the class CSS above, not both for the same property. Registration must be allowed in WordPress > Settings > General ("Anyone can register") for the Register Form to accept sign-ups; tell the owner.

## 9. Header account link states

```html
<a class="hdr-link hdr-link--signin" href="/my-account/">Sign in</a>
<a class="hdr-link hdr-link--account" href="/my-account/">Account</a>
```

```jsonc
{ "post_id": 220, "element_id": 15, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged out" } ]] }
{ "post_id": 220, "element_id": 16, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged in" } ]] }
```

With a dedicated login page, point the guest link at it. On page-cached sites use one neutral "Account" link.

## 10. Order tracking page

A separate page, linked from the footer and the order received page (endpoints cannot be added to the account nav, but a plain link in your frame can sit under it):

```html
<section class="track store"><div class="container container--narrow">
  <h1 class="track-title">Track your order</h1>
  <p class="track-intro">Enter your order number and the email address you used at checkout.</p>
  <div class="track-card"><div class="track-slot"></div></div>
</div></section>
<style>
  .track { padding-block: 64px 96px; background: var(--surface-alt); }
  .track .container--narrow { max-width: 800px; }
  .track-title { margin: 0 0 8px; font: 600 32px/1.1 var(--font-display); }
  .track-intro { margin: 0 0 24px; color: var(--ink-muted); font: 15px/1.5 var(--font-body); }
  .track-card { padding: 32px; border: 1px solid var(--line); border-radius: calc(var(--radius) * 1.6); background: var(--surface); box-shadow: 0 1px 2px rgba(16, 24, 40, .04), 0 24px 48px -28px rgba(16, 24, 40, .18); }
  .track .track-card form.track_order { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin: 0; padding: 0; border: 0; background: transparent; box-shadow: none; }
  .track .track-card form.track_order p { margin: 0; grid-column: 1 / -1; }
  /* WooCommerce opens the form with its own instructions, which repeat the intro above, and ends
     the field pair with an empty float clearer that would otherwise take a grid cell. The
     instructions are the only unclassed <p> in there, which is safer to match than :first-child */
  .track .track-card form.track_order > p:not([class]), .track .track-card form.track_order .clear { display: none; }
  .track .track-card form.track_order p.form-row-first { grid-column: 1; }
  .track .track-card form.track_order p.form-row-last { grid-column: 2; }
  .track .track-card form.track_order .form-row label { display: block; margin: 0 0 6px; color: var(--ink); font: 500 13px/1.3 var(--font-body); }
  .track .track-card form.track_order .input-text { width: 100%; min-height: 50px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: 15px/1.4 var(--font-body); }
  .track .track-card form.track_order .input-text:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px rgba(22, 24, 29, .08); }
  .track .track-card form.track_order button.button { justify-self: start; min-height: 48px; padding: 0 28px; border: 0; border-radius: var(--radius); background: var(--brand); color: var(--on-brand); font: 600 15px/1 var(--font-body); text-transform: none; cursor: pointer; transition: background .15s; }
  .track .track-card form.track_order button.button:hover { background: var(--brand-hover); }
  @media (max-width: 599px) { .track .track-card form.track_order { grid-template-columns: minmax(0, 1fr); } .track .track-card form.track_order p.form-row-first, .track .track-card form.track_order p.form-row-last { grid-column: 1; } }
</style>
```

```jsonc
{ "post_id": 253, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageordertracking", "parent_id": 5, "properties": { "design": { "container": { "width": { "number": 100, "unit": "%", "style": "100%" } } } } } } ] }
```

Hiding WooCommerce's opening paragraph assumes your own intro says the same thing ("the order number is on your receipt and in the confirmation email"); keep the paragraph and drop the intro if you would rather not repeat its wording, since it is already translated. The result of a lookup renders the same order details markup as design 4, so scope those rules under `.track` too (`.track .woocommerce-order-details …`).

## 11. Membership band: tiered, from real customer data

Use when: the store rewards repeat customers and the account page should open with something that feels earned rather than a grey greeting. Three bands, one per tier, each carrying a `woocommerce-customer-spend` condition so exactly one renders; a fourth for first-time visitors with no orders. Nothing is invented: the tier is the customer's own lifetime spend, which the builder can test.

```html
<div class="mb mb--new">
  <p class="mb-eyebrow">Welcome</p>
  <p class="mb-title">Your first order unlocks free delivery for a year.</p>
  <a class="mb-cta" href="/shop/">Start shopping</a>
</div>
<div class="mb mb--bronze">
  <p class="mb-eyebrow">Member</p>
  <p class="mb-title">Thanks for shopping with us.</p>
  <ul class="mb-perks"><li>Free delivery over $75</li><li>30-day returns</li><li>Early access to sales</li></ul>
</div>
<div class="mb mb--silver">
  <p class="mb-eyebrow">Silver member</p>
  <p class="mb-title">Free delivery on everything you order.</p>
  <ul class="mb-perks"><li>Free delivery, no minimum</li><li>60-day returns</li><li>Early access to drops</li></ul>
</div>
<div class="mb mb--gold">
  <p class="mb-eyebrow">Gold member</p>
  <p class="mb-title">Everything free, everything first.</p>
  <ul class="mb-perks"><li>Free express delivery</li><li>Free returns, any time</li><li>First access to every drop</li><li>A real person on the phone</li></ul>
</div>
<style>
  .mb { position: relative; overflow: hidden; display: grid; gap: 10px; padding: 28px 32px; margin-bottom: 32px; border-radius: var(--radius); background: var(--ink); color: #fff; }
  .mb::after { content: ""; position: absolute; inset: 0 0 0 auto; width: 40%; background: radial-gradient(120% 100% at 100% 0, rgba(255,255,255,.16), transparent 70%); pointer-events: none; }
  .mb-eyebrow { margin: 0; font: 600 12px/1 var(--font-body); letter-spacing: .1em; text-transform: uppercase; opacity: .8; }
  .mb-title { margin: 0; max-width: 30ch; font: 500 clamp(20px, 2.4vw, 28px)/1.2 var(--font-display); }
  .mb-perks { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 24px; font: 14px/1.4 var(--font-body); opacity: .92; }
  .mb-perks li { display: flex; align-items: center; gap: 8px; }
  .mb-perks li::before { content: ""; width: 14px; height: 14px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; }
  .mb-cta { justify-self: start; margin-top: 4px; display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; border-radius: var(--radius-pill); background: #fff; color: var(--ink); font: 600 14px/1 var(--font-body); text-decoration: none; }
  .mb--new { background: var(--surface-alt); color: var(--ink); }
  .mb--new::after { display: none; }
  .mb--bronze { background: linear-gradient(120deg, #4a3728, #7a5c42); }
  .mb--silver { background: linear-gradient(120deg, #2f3337, #5b6169); }
  .mb--gold { background: linear-gradient(120deg, #3a2f12, #8a6d24); }
  @media (max-width: 767px) { .mb { padding: 22px; } .mb-perks { flex-direction: column; gap: 6px; } }
</style>
```

```jsonc
// set-element-conditions, one per band (ids from get-post-tree). Two rules in one group are ANDed.
{ "post_id": 252, "element_id": 4, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-orders", "operand": "is", "value": "0" } ]] }
{ "post_id": 252, "element_id": 5, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-spend", "operand": "is less than", "value": "500" }, { "ruleSlug": "woocommerce-customer-orders", "operand": "is greater than", "value": "0" } ]] }
{ "post_id": 252, "element_id": 6, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-spend", "operand": "is greater than", "value": "499" }, { "ruleSlug": "woocommerce-customer-spend", "operand": "is less than", "value": "2000" } ]] }
{ "post_id": 252, "element_id": 7, "rule_groups": [[ { "ruleSlug": "woocommerce-customer-spend", "operand": "is greater than", "value": "1999" } ]] }
```

Copy the operand strings from `get-element-conditions`. The perks must be ones the owner actually honours: this band is a promise, and WooCommerce will not enforce it. Free delivery per tier is a coupon or a shipping rule the owner sets up separately; say that when you propose it.

## 12. Order cards with a delivery progress track

Use when: the store ships physical goods and "where is my order" is the reason customers open the account. Each order card gets a three-stage track (ordered, on its way, delivered) filled from WooCommerce's own row status class, so it needs no data you do not have. It layers on design 3 and replaces that design's status cell: the first rules undo the dot design's grid placement, which is the usual reason a second design "does nothing" when stacked on a first.

```css
/* the status cell becomes label + status word + a progress track. Design 3 placed its dot with
   grid-template-areas and gave ::after a fixed size, so both are reset here before the track is drawn.
   Every chain starts .account.acct-track so it outranks design 3's own .account chain rather than tying with it */
.account.acct-track table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: none; gap: 6px; align-content: center; font: 600 13px/1.2 var(--font-body); color: var(--status-ink, var(--ink-muted)); }
.account.acct-track table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status::before { grid-area: auto; }
.account.acct-track table.woocommerce-orders-table tbody tr td.woocommerce-orders-table__cell-order-status::after { content: ""; grid-area: auto; display: block; width: auto; height: 4px; border-radius: 2px; background: linear-gradient(to right, currentColor 0 var(--status-progress, 12%), var(--line) var(--status-progress, 12%) 100%); }
.account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-pending td.woocommerce-orders-table__cell-order-status, .account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-on-hold td.woocommerce-orders-table__cell-order-status { --status-ink: #9a5b00; --status-progress: 12%; }
.account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-processing td.woocommerce-orders-table__cell-order-status { --status-ink: var(--info); --status-progress: 55%; }
.account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-completed td.woocommerce-orders-table__cell-order-status { --status-ink: var(--success); --status-progress: 100%; }
/* a cancelled order has no journey left: show the word alone */
.account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-cancelled td.woocommerce-orders-table__cell-order-status, .account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-failed td.woocommerce-orders-table__cell-order-status, .account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-refunded td.woocommerce-orders-table__cell-order-status { --status-ink: var(--error); }
.account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-cancelled td.woocommerce-orders-table__cell-order-status::after, .account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-failed td.woocommerce-orders-table__cell-order-status::after, .account.acct-track table.woocommerce-orders-table tbody tr.woocommerce-orders-table__row--status-refunded td.woocommerce-orders-table__cell-order-status::after { display: none; }
/* the newest order reads as the live one */
.account.acct-track table.woocommerce-orders-table tbody tr:first-child { border-color: var(--ink); box-shadow: 0 1px 0 var(--ink) inset, 0 -1px 0 var(--ink) inset; }
```

Two honest limits to tell the owner: WooCommerce's own statuses are the only stages available, so "out for delivery" needs the carrier's tracking plugin; and the orders list carries no product images, so a card cannot show what was in the order without a snippet that adds them.

## 13. Dashboard quick tiles

Use when: the dashboard endpoint is the weakest screen WooCommerce ships (two paragraphs of links). Tiles replace it visually: they sit above the element and the boilerplate paragraph is hidden. Give the whole block a `user-logged-in-status` "logged in" condition so guests never see dead links.

```html
<ul class="qt">
  <li><a class="qt-card" href="/my-account/orders/"><span class="qt-icon qt-icon--orders"></span><span class="qt-label">Orders</span><span class="qt-hint">Track, return, buy again</span></a></li>
  <li><a class="qt-card" href="/my-account/edit-address/"><span class="qt-icon qt-icon--address"></span><span class="qt-label">Addresses</span><span class="qt-hint">Delivery and billing</span></a></li>
  <li><a class="qt-card" href="/my-account/payment-methods/"><span class="qt-icon qt-icon--card"></span><span class="qt-label">Payment</span><span class="qt-hint">Saved cards</span></a></li>
  <li><a class="qt-card" href="/my-account/edit-account/"><span class="qt-icon qt-icon--user"></span><span class="qt-label">Details</span><span class="qt-hint">Name, email, password</span></a></li>
</ul>
<style>
  .qt { list-style: none; margin: 0 0 32px; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .qt-card { display: grid; gap: 4px; padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); text-decoration: none; color: var(--ink); transition: border-color .15s, transform .15s; }
  .qt-card:hover { border-color: var(--ink); transform: translateY(-2px); }
  .qt-icon { width: 22px; height: 22px; margin-bottom: 6px; background: var(--ink); -webkit-mask: var(--qt-i) center / contain no-repeat; mask: var(--qt-i) center / contain no-repeat; }
  .qt-icon--orders { --qt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 8 12 3 3 8v8l9 5 9-5z'/><path d='M3 8l9 5 9-5'/><path d='M12 13v8'/></svg>"); }
  .qt-icon--address { --qt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z'/><circle cx='12' cy='10' r='2.5'/></svg>"); }
  .qt-icon--card { --qt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20'/></svg>"); }
  .qt-icon--user { --qt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 4-6 8-6s8 2 8 6'/></svg>"); }
  .qt-label { font: 600 15px/1.2 var(--font-body); }
  .qt-hint { font: 13px/1.4 var(--font-body); color: var(--ink-muted); }
  @media (max-width: 767px) { .qt { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
```

The tiles duplicate the navigation on purpose: the dashboard is where a customer lands, and four large targets beat two sentences of links. Hide WooCommerce's paragraphs with `.account .woocommerce-MyAccount-content > p:first-child { display: none; }` and keep the logout item in the navigation.

## 14. Boxed app shell

Use when: the store wants the account to feel like a product rather than a page. The whole element becomes one white card floating on a tinted page, the navigation is a rail inside it with a hairline between the columns, and the content column scrolls against a sticky rail.

```css
.acct-shell { background: var(--surface-alt); padding-block: 40px 96px; }
.acct-shell .acct-hello { border-bottom: 0; padding-bottom: 20px; margin-bottom: 20px; }
.account.acct-shell .bde-woopageaccount { display: block; border: 1px solid var(--line); border-radius: calc(var(--radius) * 1.6); background: var(--surface); overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06); }
.account.acct-shell .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: 248px minmax(0, 1fr); gap: 0; align-items: stretch; }
.account.acct-shell nav.woocommerce-MyAccount-navigation { width: auto; min-width: 0; position: static; padding: 20px 16px; border-right: 1px solid var(--line); background: linear-gradient(to bottom, var(--surface-alt), transparent 160px); }
.account.acct-shell .woocommerce-MyAccount-content { width: auto; flex: none; padding: 32px; min-height: 520px; }
.account.acct-shell .woocommerce-MyAccount-navigation ul li a { border-radius: 8px; padding: 10px 12px; font-size: 14px; }
@media (max-width: 1023px) {
  .account.acct-shell .bde-woopageaccount .woocommerce { grid-template-columns: minmax(0, 1fr); }
  .account.acct-shell nav.woocommerce-MyAccount-navigation { border-right: 0; border-bottom: 1px solid var(--line); padding: 12px; margin: 0; background: var(--surface-alt); }
  .account.acct-shell .woocommerce-MyAccount-content { padding: 20px; min-height: 0; }
}
```

Pair with frame 1's navigation icons. The card clips its corners, so anything sticky inside the content column needs its offset measured from the card, not the viewport.

Every rule that re-targets something frame 1 already styles is written `.account.acct-shell`, not `.acct-shell`. Frame 1's rules start with `.account`, so a one-class modifier only ties with them and the later stylesheet wins: the card then keeps frame 1's 56px gap and sticky rail and the shell looks like it did nothing. The same applies to any modifier you layer on a frame, not just this one.

## 15. Dark account

Use when: the storefront is dark, or the account should feel like a members' area. Only the tokens and a few surfaces change; every rule in the shared block reads them, so it recolours on its own.

```css
.acct-dark { --ink: #f2f3f5; --ink-muted: #9aa1ab; --line: #2a2e35; --surface: #15181d; --surface-alt: #1c2027; --success-bg: #12261b; --error-bg: #2a1618; --info-bg: #14212f; background: #0f1216; color: var(--ink); }
/* fields read better one step up from the page on dark, and the placeholder needs saying */
.acct-dark input.input-text, .acct-dark .woocommerce-Input, .acct-dark select, .acct-dark textarea { background: var(--surface-alt); }
.acct-dark ::placeholder { color: var(--ink-muted); }
.acct-dark table.shop_table { background: transparent; }
.acct-dark .woocommerce-MyAccount-navigation a { color: var(--ink-muted); }
.account.acct-dark nav.woocommerce-MyAccount-navigation ul li a:hover { background: var(--surface-alt); color: var(--ink); }
.account.acct-dark nav.woocommerce-MyAccount-navigation ul li.is-active a { background: var(--ink); color: #0f1216; }
.account.acct-dark .woocommerce-MyAccount-navigation ul li.is-active a::before { background: #0f1216; }
.account.acct-dark .woocommerce-MyAccount-content .button, .account.acct-dark .woocommerce-MyAccount-content a.button, .account.acct-dark .woocommerce-Address a.edit { border-color: var(--line); color: var(--ink); }
.account.acct-dark .woocommerce-MyAccount-content .button:hover, .account.acct-dark .woocommerce-MyAccount-content a.button:hover, .account.acct-dark .woocommerce-Address a.edit:hover { background: var(--ink); color: #0f1216; }
.account.acct-dark table.woocommerce-orders-table tbody tr, .account.acct-dark .woocommerce-Address, .account.acct-dark form.woocommerce-EditAccountForm { background: var(--surface); }
.account.acct-dark table.woocommerce-orders-table tbody tr:hover { border-color: var(--ink-muted); }
.account.acct-dark .acct-avatar { background: var(--surface-alt); }
```

Every rule that re-targets something designs 1 and 3 already style is written `.account.acct-dark`. A plain `.acct-dark` chain only ties with theirs, so it wins or loses on stylesheet order: the active navigation item then keeps design 1's white text on the light pill and reads as blank. The extra class settles it in the theme's favour.

Check the login state too: the WooCommerce forms inherit the field variables, but a plugin's social buttons will not.

## 16. Empty states that still sell

Use when: always. A new customer's first three screens are empty, and WooCommerce renders each as a grey `.woocommerce-info` line. These rules turn each into a proper empty state; the message text stays WooCommerce's, so nothing needs translating. Two traps are handled below: WooCommerce puts both `woocommerce-message` and `woocommerce-info` on this element, so the builder's `!important` success-link colour lands on the button (beaten by setting the variable it reads, not by another rule), and the builder's own `::before` masks the icon, so the mask has to be cleared before your own icon shows.

```css
.account .woocommerce-MyAccount-content .woocommerce-info { display: grid; justify-items: center; gap: 14px; padding: 48px 24px; border: 1px dashed var(--line); border-radius: var(--radius); background: transparent; color: var(--ink); text-align: center; font: 500 17px/1.4 var(--font-body); }
.account .woocommerce-MyAccount-content .woocommerce-info::before { content: ""; position: static; width: 56px; height: 56px; margin: 0; border-radius: 50%; background: var(--surface-alt) var(--empty-icon) center / 26px no-repeat; -webkit-mask: none; mask: none; }
/* WooCommerce gives this element BOTH woocommerce-message and woocommerce-info; where the
   builder's stylesheet is loaded it colours a message's link with !important, hence the !important */
.account .woocommerce-MyAccount-content .woocommerce-info a.button { margin: 0; min-height: 48px; padding: 0 22px; border: 0; background: var(--brand); color: var(--on-brand) !important; font-size: 15px; text-transform: none; }
.account .woocommerce-MyAccount-content .woocommerce-info a.button::after { content: none; }
.account .woocommerce-MyAccount-content .woocommerce-info a.button:hover { background: var(--brand-hover); color: var(--on-brand); }
/* one icon per endpoint, via the body class WooCommerce sets */
.account { --empty-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b6270' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M21 8 12 3 3 8v8l9 5 9-5z'/><path d='M3 8l9 5 9-5'/><path d='M12 13v8'/></svg>"); }
body.woocommerce-downloads .account { --empty-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b6270' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v12'/><path d='m7 10 5 5 5-5'/><path d='M4 21h16'/></svg>"); }
body.woocommerce-payment-methods .account { --empty-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b6270' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20'/></svg>"); }
```

WooCommerce puts an endpoint class on `<body>` (`woocommerce-orders`, `woocommerce-downloads`, `woocommerce-payment-methods`, `woocommerce-edit-address`, …), which is how the icon changes per screen without touching the element. Confirm the classes on the site with `preview-post`, since a theme can filter them.

Add a product row under the empty orders state the same way the cart does it, if the owner wants the screen to sell: a `bd-loop="products" bd-featured="true" bd-limit="4"` grid in the frame with a `woocommerce-customer-orders` "is" `0` condition.

## 17. Tabs on top as a segmented control

Use when: 4 to 6 endpoints and a centred, narrow account. The nav becomes one pill group over the content, the way a settings screen reads on iOS and in Linear. Set the element to horizontal, centred.

```html
<section class="account account--seg store">
  <div class="container container--narrow">
    <header class="acct-head">
      <h1 class="acct-title">Your account</h1>
      <p class="acct-intro">Orders, addresses and details, all in one place.</p>
    </header>
    <div class="account-slot"></div>
  </div>
</section>
<style>
  .account.account--seg .container--narrow { max-width: 920px; }
  .account.account--seg .acct-head { margin-bottom: 28px; text-align: center; }
  .account.account--seg .acct-title { margin: 0 0 6px; font: 600 clamp(26px, 3vw, 34px)/1.1 var(--font-display); }
  .account.account--seg .acct-intro { margin: 0; color: var(--ink-muted); font: 15px/1.5 var(--font-body); }
  .account.account--seg .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; justify-items: center; }
  /* the element sets the nav to width:100% in horizontal mode, so the pill group has to take its width back */
  .account.account--seg nav.woocommerce-MyAccount-navigation { width: auto; min-width: 0; max-width: 100%; padding: 4px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface-alt); overflow-x: auto; scrollbar-width: none; }
  .account.account--seg nav.woocommerce-MyAccount-navigation::-webkit-scrollbar { display: none; }
  /* the element's own ul rule is three classes deep, so this one carries the element class to outrank it */
  .account.account--seg .bde-woopageaccount nav.woocommerce-MyAccount-navigation ul { display: flex; flex-direction: row; gap: 2px; width: max-content; margin: 0; padding: 0; list-style: none; }
  .account.account--seg .woocommerce-MyAccount-navigation ul li { display: block; }
  .account.account--seg .woocommerce-MyAccount-navigation ul li a { display: block; width: auto; padding: 10px 18px; border: 0; border-radius: var(--radius-pill); background: transparent; color: var(--ink-muted); font: 600 14px/1 var(--font-body); text-decoration: none; white-space: nowrap; transition: background .15s, color .15s; }
  .account.account--seg .woocommerce-MyAccount-navigation ul li a::before { display: none; }
  .account.account--seg .woocommerce-MyAccount-navigation ul li a:hover { background: transparent; color: var(--ink); }
  .account.account--seg .woocommerce-MyAccount-navigation ul li.is-active a { background: var(--surface); color: var(--ink); box-shadow: 0 1px 2px rgba(0,0,0,.1); }
  .account.account--seg li.woocommerce-MyAccount-navigation-link--customer-logout { margin: 0; padding: 0; border: 0; }
  .account.account--seg .woocommerce-MyAccount-content { width: 100%; flex: none; }
  @media (max-width: 767px) { .account.account--seg .bde-woopageaccount .woocommerce { justify-items: stretch; } .account.account--seg nav.woocommerce-MyAccount-navigation { border-radius: var(--radius); } }
</style>
```

```jsonc
{ "post_id": 252, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageaccount", "parent_id": 5,
  "properties": { "design": { "tabs": { "layout": "horizontal", "horizontal_tabs_position": "center", "vertical_at": "breakpoint_phone_portrait" } } } } } ] }
```

Drop the icons here: a pill group reads as one control and the icons make it noisy. Past six endpoints the group scrolls sideways, which hides the last tab on a phone, so use design 18 instead.

## 18. Full-bleed sticky tab bar under the page header

Use when: the account has many endpoints, or plugins add more, and you want the same sub-header a bank or a SaaS dashboard uses. The nav becomes a full-width sticky bar with the tabs on the container grid; the content sits under it in the same column.

```html
<section class="account account--bar store">
  <header class="acct-bar-head">
    <div class="container">
      <div>
        <h1 class="acct-title">Your account</h1>
        <p class="acct-intro">Signed in as <span bd-bind="user_email"></span></p>
      </div>
      <a class="acct-shop btn btn--secondary" href="/shop/">Continue shopping</a>
    </div>
  </header>
  <div class="account-slot"></div>
</section>
<style>
  .account.account--bar { padding-block: 0 96px; }
  .account.account--bar .acct-bar-head { padding-block: 36px 24px; }
  .account.account--bar .acct-bar-head .container { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 16px; }
  .account.account--bar .acct-title { margin: 0 0 4px; font: 600 clamp(26px, 3vw, 34px)/1.1 var(--font-display); }
  .account.account--bar .acct-intro { margin: 0; color: var(--ink-muted); font: 15px/1.5 var(--font-body); }
  .account.account--bar .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; }
  .account.account--bar nav.woocommerce-MyAccount-navigation { width: auto; min-width: 0; position: sticky; top: var(--wp-admin--admin-bar--height, 0px); z-index: 5; border-bottom: 1px solid var(--line); background: var(--surface); overflow-x: auto; scrollbar-width: none; }
  .account.account--bar nav.woocommerce-MyAccount-navigation::-webkit-scrollbar { display: none; }
  .account.account--bar .bde-woopageaccount nav.woocommerce-MyAccount-navigation ul { display: flex; flex-direction: row; gap: 28px; width: min(100% - var(--gutter) * 2, var(--container)); min-width: min(100% - var(--gutter) * 2, var(--container)); margin: 0 auto; padding: 0; list-style: none; }
  .account.account--bar .woocommerce-MyAccount-navigation ul li { display: block; }
  .account.account--bar .woocommerce-MyAccount-navigation ul li a { display: flex; align-items: center; gap: 8px; width: auto; padding: 16px 0; border: 0; border-bottom: 2px solid transparent; margin-bottom: -1px; border-radius: 0; background: transparent; color: var(--ink-muted); font: 600 14px/1 var(--font-body); text-decoration: none; white-space: nowrap; }
  .account.account--bar .woocommerce-MyAccount-navigation ul li a::before { width: 16px; height: 16px; }
  .account.account--bar .woocommerce-MyAccount-navigation ul li a:hover { background: transparent; color: var(--ink); }
  .account.account--bar .woocommerce-MyAccount-navigation ul li.is-active a { background: transparent; color: var(--ink); border-bottom-color: var(--ink); }
  .account.account--bar li.woocommerce-MyAccount-navigation-link--customer-logout { margin: 0 0 0 auto; padding: 0; border: 0; }
  .account.account--bar .woocommerce-MyAccount-content { width: min(100% - var(--gutter) * 2, var(--container)); margin: 0 auto; padding-top: 32px; flex: none; }
</style>
```

```jsonc
{ "post_id": 252, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageaccount", "parent_id": 5,
  "properties": { "design": { "tabs": { "layout": "horizontal", "horizontal_tabs_position": "left", "vertical_at": "breakpoint_phone_landscape" } } } } } ] }
```

The element goes outside your container here, not inside it: the bar needs the full viewport width and the tabs get the container width back from the `min()` rule. Keep frame 1's icon rules for the small icons, and give the bar a sticky offset that clears your own header if that header is sticky too.

## 19. Rail on the right, content first

Use when: the content is the point and the navigation is a place to go afterwards, or the site's own header already sits on the left. The element's "Vertical Tabs Position: Right" control does the reordering; the CSS only sizes the two columns and turns the rail into a card.

```html
<section class="account account--right store">
  <div class="container">
    <header class="acct-hello">
      <img class="acct-avatar" bd-src="user_avatar_url" alt="">
      <div class="acct-hello-text">
        <h1 class="acct-title"><span class="acct-title-hi">Hi,</span> <span bd-bind="user_name"></span></h1>
        <p class="acct-intro">Your orders, addresses and details, all in one place.</p>
      </div>
      <a class="acct-shop btn btn--secondary" href="/shop/">Continue shopping</a>
    </header>
    <div class="account-slot"></div>
  </div>
</section>
<style>
  .account.account--right .bde-woopageaccount .woocommerce { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 48px; align-items: start; }
  /* the order values match what the element's Right control already emits, so the design survives either setting */
  .account.account--right nav.woocommerce-MyAccount-navigation { order: 2; width: auto; min-width: 0; position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); padding: 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
  .account.account--right .woocommerce-MyAccount-content { order: 1; width: auto; flex: none; }
  .account.account--right .woocommerce-MyAccount-navigation ul li a { padding: 11px 12px; border: 0; border-radius: 8px; font-size: 14px; }
  .account.account--right li.woocommerce-MyAccount-navigation-link--customer-logout { margin-top: 8px; padding-top: 8px; }
  @media (max-width: 1023px) {
    .account.account--right .bde-woopageaccount .woocommerce { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .account.account--right nav.woocommerce-MyAccount-navigation { order: 1; position: static; }
    .account.account--right .woocommerce-MyAccount-content { order: 2; }
  }
</style>
```

```jsonc
{ "post_id": 252, "operations": [ { "op": "insert", "payload": { "element_type": "EssentialElements\\Woopageaccount", "parent_id": 5,
  "properties": { "design": { "tabs": { "layout": "vertical", "vertical_tabs_position": "right", "sticky_tabs": true, "sticky_offset": { "style": "96px" } } } } } } ] }
```

Below 1024px the rail goes back on top: a right-hand rail under the content means a customer has to scroll past everything to change screens. This frame reuses frame 1's welcome header markup, so paste frame 1's CSS with it (or drop the header and keep only the element).

## 20. App-style bottom tab bar on phones

Use when: most of the store's traffic is mobile and the account is something customers come back to. Desktop keeps the tabs on top; under 768px the nav docks to the bottom of the viewport with an icon over each label, the way a native app does. Layers on design 17 or 18, and needs frame 1's icon rules.

```css
@media (max-width: 767px) {
  /* every chain carries .bde-woopageaccount as well as the frame class: this design sits on top of
     17 or 18, whose rules are already .account.account--seg deep, so it has to outrank them too */
  .account.account--dock .bde-woopageaccount nav.woocommerce-MyAccount-navigation { position: fixed; inset: auto 0 0 0; z-index: 20; width: auto; max-width: none; margin: 0; padding: 6px 4px calc(6px + env(safe-area-inset-bottom, 0px)); border: 0; border-top: 1px solid var(--line); border-radius: 0; background: var(--surface); box-shadow: 0 -2px 12px rgba(0,0,0,.06); overflow: visible; }
  .account.account--dock .bde-woopageaccount .woocommerce nav.woocommerce-MyAccount-navigation ul { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 0; width: 100%; min-width: 0; margin: 0; padding: 0; }
  .account.account--dock .bde-woopageaccount nav.woocommerce-MyAccount-navigation ul li a { display: grid; justify-items: center; gap: 4px; width: auto; padding: 8px 2px; border: 0; border-radius: 8px; background: transparent; color: var(--ink-muted); font: 600 11px/1.2 var(--font-body); text-align: center; }
  .account.account--dock .bde-woopageaccount nav.woocommerce-MyAccount-navigation ul li a::before { display: block; width: 22px; height: 22px; }
  .account.account--dock .bde-woopageaccount nav.woocommerce-MyAccount-navigation ul li.is-active a { background: transparent; color: var(--ink); box-shadow: none; }
  /* four targets is the limit at phone width: the rest stay reachable from the account details screen */
  .account.account--dock .bde-woopageaccount .woocommerce nav.woocommerce-MyAccount-navigation ul li.woocommerce-MyAccount-navigation-link--downloads,
  .account.account--dock .bde-woopageaccount .woocommerce nav.woocommerce-MyAccount-navigation ul li.woocommerce-MyAccount-navigation-link--payment-methods,
  .account.account--dock .bde-woopageaccount .woocommerce nav.woocommerce-MyAccount-navigation ul li.woocommerce-MyAccount-navigation-link--customer-logout { display: none; }
  .account.account--dock .bde-woopageaccount .woocommerce-MyAccount-content { padding-bottom: 88px; }
}
```

Hiding three endpoints is a real trade-off, so say it out loud when you propose this: downloads, payment methods and log out disappear from the bar and a customer reaches them from account details. If the store sells downloads, swap downloads in and drop addresses. Do not hide log out without leaving a link somewhere the customer can find.

A media query adds no specificity of its own. A rule inside `@media (max-width: 767px)` that only ties with the frame's rule wins or loses on source order alone, which is why these chains are a class longer than the frame's rather than the same length.

## 21. Dashboard as a bento grid

Use when: the dashboard should be the best screen in the account rather than the emptiest. WooCommerce's dashboard is two paragraphs of links, so there is nothing to keep: the bento replaces it with one large greeting tile, a tile per endpoint, a featured-products tile and a sign-out tile. On every other endpoint the bento hides itself and the element behaves normally.

```html
<section class="account account--bento store">
  <div class="container">
    <div class="acct-bento">
      <div class="bt bt--hello">
        <img class="bt-avatar" bd-src="user_avatar_url" alt="">
        <p class="bt-hello-title">Hi, <span bd-bind="user_name"></span></p>
        <p class="bt-hello-sub">Everything about your orders and your details lives here.</p>
        <a class="bt-hello-cta" href="/shop/">Continue shopping</a>
      </div>
      <a class="bt bt--link" href="/my-account/orders/">
        <span class="bt-icon bt-icon--orders"></span>
        <span class="bt-label">Orders</span>
        <span class="bt-hint">Track, return, buy again</span>
      </a>
      <a class="bt bt--link" href="/my-account/downloads/">
        <span class="bt-icon bt-icon--downloads"></span>
        <span class="bt-label">Downloads</span>
        <span class="bt-hint">Files you have bought</span>
      </a>
      <a class="bt bt--link" href="/my-account/edit-address/">
        <span class="bt-icon bt-icon--address"></span>
        <span class="bt-label">Addresses</span>
        <span class="bt-hint">Delivery and billing</span>
      </a>
      <a class="bt bt--link" href="/my-account/payment-methods/">
        <span class="bt-icon bt-icon--card"></span>
        <span class="bt-label">Payment methods</span>
        <span class="bt-hint">Saved cards</span>
      </a>
      <div class="bt bt--shop">
        <p class="bt-label bt-shop-title">Picked for you</p>
        <div bd-loop="products" bd-loop-name="Bento Product" bd-featured="true" bd-limit="2" class="bt-shop-grid">
          <article class="bt-prod">
            <a class="bt-prod-media" bd-href="post_permalink"><img class="bt-prod-img" bd-src="product_image" bd-alt="product_title"></a>
            <h3 class="bt-prod-title"><a bd-href="post_permalink" bd-bind="product_title"></a></h3>
            <p class="bt-prod-price" bd-bind="product_price"></p>
            <div bd-woo="add-to-cart" class="bt-prod-cta"></div>
          </article>
        </div>
      </div>
      <a class="bt bt--link" href="/my-account/edit-account/">
        <span class="bt-icon bt-icon--user"></span>
        <span class="bt-label">Account details</span>
        <span class="bt-hint">Name, email, password</span>
      </a>
      <a class="bt bt--link" href="/contact/">
        <span class="bt-icon bt-icon--help"></span>
        <span class="bt-label">Need a hand?</span>
        <span class="bt-hint">We answer within a day</span>
      </a>
      <div class="bt bt--wide bt--signout">
        <p class="bt-signed">Signed in as <span bd-bind="user_email"></span></p>
        <a class="bt-signout-link" href="/my-account/customer-logout/">Log out</a>
      </div>
    </div>
    <div class="account-slot"></div>
  </div>
</section>
<style>
  /* the bento only belongs on the dashboard, and WooCommerce gives the dashboard no body class of its
     own, so the test is which navigation item the element marked active */
  .account--bento .acct-bento { display: none; }
  .account--bento:has(li.woocommerce-MyAccount-navigation-link--dashboard.is-active) .acct-bento { display: grid; }
  /* on the dashboard the bento IS the navigation, so the element steps aside. display:none keeps it in
     the DOM, which is what the :has() test above reads */
  .account--bento:has(li.woocommerce-MyAccount-navigation-link--dashboard.is-active) .bde-woopageaccount { display: none; }
  .acct-bento { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: minmax(148px, auto); gap: 16px; }
  .bt { position: relative; display: grid; align-content: start; gap: 6px; padding: 22px; border: 1px solid var(--line); border-radius: calc(var(--radius) * 1.4); background: var(--surface); }
  .bt--link { text-decoration: none; color: var(--ink); align-content: end; transition: border-color .15s, transform .15s; }
  .bt--link:hover { border-color: var(--ink); transform: translateY(-2px); }
  .bt--link::after { content: ""; position: absolute; top: 22px; right: 22px; width: 16px; height: 16px; background: var(--ink-muted); -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 17 17 7'/><path d='M8 7h9v9'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 17 17 7'/><path d='M8 7h9v9'/></svg>") center / contain no-repeat; }
  .bt-icon { width: 24px; height: 24px; margin-bottom: 10px; background: var(--ink); -webkit-mask: var(--bt-i) center / contain no-repeat; mask: var(--bt-i) center / contain no-repeat; }
  .bt-icon--orders { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 8 12 3 3 8v8l9 5 9-5z'/><path d='M3 8l9 5 9-5'/><path d='M12 13v8'/></svg>"); }
  .bt-icon--downloads { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v12'/><path d='m7 10 5 5 5-5'/><path d='M4 21h16'/></svg>"); }
  .bt-icon--address { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z'/><circle cx='12' cy='10' r='2.5'/></svg>"); }
  .bt-icon--card { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20'/></svg>"); }
  .bt-icon--user { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 4-6 8-6s8 2 8 6'/></svg>"); }
  .bt-icon--help { --bt-i: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.6.2-1 .8-1 1.5v.4'/><path d='M12 17.2h.01'/></svg>"); }
  .bt-label { font: 600 16px/1.2 var(--font-body); }
  .bt-hint { color: var(--ink-muted); font: 13px/1.4 var(--font-body); }
  /* the greeting tile */
  .bt--hello { grid-column: span 2; grid-row: span 2; align-content: center; gap: 10px; padding: 32px; border-color: transparent; background: var(--ink); color: #fff; overflow: hidden; }
  .bt--hello::after { content: ""; position: absolute; inset: 0 0 0 auto; width: 45%; background: radial-gradient(120% 100% at 100% 0, rgba(255,255,255,.18), transparent 70%); pointer-events: none; }
  .bt-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; background: rgba(255,255,255,.15); }
  .bt-hello-title { margin: 0; font: 500 clamp(24px, 2.6vw, 34px)/1.1 var(--font-display); }
  .bt-hello-sub { margin: 0; max-width: 28ch; color: rgba(255,255,255,.76); font: 15px/1.5 var(--font-body); }
  .bt-hello-cta { justify-self: start; margin-top: 8px; display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; border-radius: var(--radius-pill); background: #fff; color: var(--ink); font: 600 14px/1 var(--font-body); text-decoration: none; }
  /* the products tile */
  .bt--shop { grid-column: span 2; grid-row: span 2; background: var(--surface-alt); }
  .bt-shop-title { margin: 0 0 4px; }
  .bt-shop-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-content: start; }
  .bt-prod { display: grid; gap: 6px; align-content: start; }
  .bt-prod-media { display: block; border-radius: var(--radius); overflow: hidden; background: var(--surface); }
  .bt-prod-img { display: block; width: 100%; aspect-ratio: 1 / 1; object-fit: cover; }
  .bt-prod-title { margin: 0; font: 500 14px/1.3 var(--font-body); }
  .bt-prod-title a { color: var(--ink); text-decoration: none; }
  .bt-prod-price { margin: 0; font: 600 14px/1.3 var(--font-body); }
  .bt-prod-cta { margin-top: 2px; }
  /* the sign-out tile carries the log-out link the hidden element would have shown */
  .bt--wide { grid-column: span 2; }
  .bt--signout { align-content: center; gap: 10px; }
  .bt-signed { margin: 0; color: var(--ink-muted); font: 14px/1.4 var(--font-body); }
  .bt-signout-link { justify-self: start; display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border: 1px solid var(--line); border-radius: var(--radius-pill); color: var(--ink); font: 600 13px/1 var(--font-body); text-decoration: none; }
  .bt-signout-link:hover { border-color: var(--ink); }
  @media (max-width: 1023px) {
    .acct-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .bt--hello, .bt--shop { grid-row: span 1; }
  }
  @media (max-width: 559px) {
    .acct-bento { grid-template-columns: minmax(0, 1fr); grid-auto-rows: auto; }
    .bt--hello, .bt--shop, .bt--wide { grid-column: span 1; }
    .bt--link { align-content: start; }
    .bt--link::after { top: 22px; }
  }
</style>
```

```jsonc
// one condition on the whole bento block (id from get-post-tree): guests never see dead endpoint links
{ "post_id": 252, "element_id": 4, "rule_groups": [[ { "ruleSlug": "user-logged-in-status", "operand": "is", "value": "logged in" } ]] }
```

Two things to decide with the owner before you ship it.

The bento hides the element on the dashboard, so any endpoint a plugin adds (Subscriptions, Memberships, a wishlist) has no tile and no navigation to reach it from that screen. If the store runs those plugins, either add a tile per endpoint or keep the element visible and hide only WooCommerce's own boilerplate instead: swap the `display: none` on `.bde-woopageaccount` for `.account--bento:has(li.woocommerce-MyAccount-navigation-link--dashboard.is-active) .woocommerce-MyAccount-content > p { display: none; }`. That keeps the navigation under the bento at the cost of a taller screen.

The element also prints the account notices, so with it hidden a dashboard notice ("Your password was changed") goes unseen. Keep the element visible on any store that shows them, or put a notices area of your own above the bento.

The featured tile needs products actually starred as featured in WooCommerce; while none is starred the loop is empty and the converter says so. Copy the operand strings from `get-element-conditions`.
