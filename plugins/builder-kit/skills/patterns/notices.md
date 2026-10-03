# WooCommerce notices

WooCommerce speaks to the shopper through notices: "X has been added to your cart" with a "View cart" link after an add on the product page, "Coupon applied" and "Cart updated" on the cart, validation errors on checkout, "Your cart is currently empty", "No payment methods available", "Address saved" in the account. They render at the top of the product wrapper (the `bd-woo="product"` element), at the top of the cart, checkout and account pages, and never in the preview tools, which is why they ship unstyled so often: a full-width pale band with the message on the left and a bare "View cart" hanging on the right edge. Five CSS-only designs below; all start from one reset.

## The markup

```html
<div class="woocommerce-notices-wrapper">
  <!-- success: the link comes FIRST in the DOM -->
  <div class="woocommerce-message" role="alert"><a href="/cart/" tabindex="1" class="button wc-forward">View cart</a> “Linen Weekender Bag” has been added to your cart.</div>
  <!-- error: a list, one item per problem, links to the field on checkout -->
  <ul class="woocommerce-error" role="alert"><li><strong>Billing Email address</strong> is a required field.</li><li>Please enter a valid postcode / ZIP.</li></ul>
  <!-- info: quiet states -->
  <div class="woocommerce-info">Your cart is currently empty.</div>
</div>
```

On the cart page the wrapper also carries `.woocommerce-message` for "Coupon code applied successfully" (with `a.restore-item` after an undo-able removal), and on checkout `.woocommerce-NoticeGroup-checkout` wraps the error list. The builder's defaults (for reference): success and info are flex rows with a masked icon absolutely positioned at the left padding, the link pushed to the right with `order: 1; margin-left: auto`, an arrow `::after` on links, `color: … !important` on the success link, and errors as a column of items each with its own icon. The colours, radius, padding and icon size are variables: `--bde-woo-notices__{success,error,info}-{background,text,link-text,link-text-hover}`, `--bde-woo-notices__border-radius`, `--bde-woo-notices__padding`, `--bde-woo-notices__padding-left`, `--bde-woo-notices__icon-size`.

## Reset (paste once)

`.nt` stands for the page or product wrapper class (`.pdp`, `.cart-page`, `.checkout-page`, `.account`) that contains the wrapper. It is self-contained on purpose: inside the marker-built product wrapper the builder's WooCommerce stylesheet does not apply at all (the notices there are bare markup), while on the cart, checkout and account pages it does; the reset styles every part explicitly so both cases come out the same, and sets the notice variables so the stylesheet agrees where it is present. The icon is an absolutely positioned pseudo-element centred on the notice's height (`top: 50%` with a negative half-height margin), so it lines up with the text whether the row is one line or made taller by the "View cart" button; the notice itself stays a wrapping flex row, because a grid would split the message text and any inline link ("Coupon removed. Undo?") into separate cells.

```css
.nt { --bde-woo-notices__border-radius: var(--radius); --bde-woo-notices__padding: 14px 16px; --bde-woo-notices__padding-left: 44px; --bde-woo-notices__icon-size: 18px; --bde-woo-notices__success-background: var(--success-bg); --bde-woo-notices__success-text: var(--success); --bde-woo-notices__success-link-text: var(--success); --bde-woo-notices__success-link-text-hover: var(--ink); --bde-woo-notices__error-background: var(--error-bg); --bde-woo-notices__error-text: var(--error); --bde-woo-notices__error-link-text: var(--error); --bde-woo-notices__error-link-text-hover: var(--ink); --bde-woo-notices__info-background: var(--surface-alt); --bde-woo-notices__info-text: var(--ink); --bde-woo-notices__info-link-text: var(--ink); --bde-woo-notices__info-link-text-hover: var(--brand); }
.nt .woocommerce-notices-wrapper, .nt .woocommerce-NoticeGroup { display: grid; gap: 10px; margin: 0 0 24px; }
/* the product wrapper is full-bleed and prints the notices BEFORE its .container, so align a direct-child wrapper to the container width */
.nt > .woocommerce-notices-wrapper { width: min(100% - var(--gutter) * 2, var(--container)); margin-left: auto; margin-right: auto; }
.nt .woocommerce-notices-wrapper:empty { display: none; margin: 0; }
/* border: 0 clears WooCommerce's own 3px coloured top border, which is under the notice whenever our stylesheet is not (the marker-built product page, and the whole site in the unstyled mode) */
.nt .woocommerce-message, .nt .woocommerce-info { position: relative; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 0; width: auto; margin: 0; padding: 14px 16px 14px 44px; border: 0; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); }
.nt .woocommerce-error { position: relative; display: grid; gap: 8px; width: auto; margin: 0; padding: 14px 16px 14px 44px; border: 0; border-radius: var(--radius); font: 500 14px/1.45 var(--font-body); list-style: none; }
.nt .woocommerce-message { background: var(--success-bg); color: var(--success); }
.nt .woocommerce-info { background: var(--surface-alt); color: var(--ink); }
.nt .woocommerce-error { background: var(--error-bg); color: var(--error); }
.nt .woocommerce-message::before, .nt .woocommerce-info::before, .nt .woocommerce-error li::before { content: ""; position: absolute; left: 16px; top: 50%; width: 18px; height: 18px; margin-top: -9px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / contain no-repeat; }
.nt .woocommerce-info::before { -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8h.01'/><path d='M11 12h1v4h1'/></svg>"); }
.nt .woocommerce-error li { position: relative; display: block; margin: 0; padding: 0; font-weight: 400; }
.nt .woocommerce-error li::before { left: -28px; -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 7v6'/><path d='M12 16h.01'/></svg>"); }
.nt .woocommerce-message a:not(.button), .nt .woocommerce-info a:not(.button) { margin-left: .3em; }
.nt .woocommerce-message a, .nt .woocommerce-info a, .nt .woocommerce-error a { color: inherit !important; text-transform: none; }
.nt .woocommerce-message a::after, .nt .woocommerce-info a::after, .nt .woocommerce-error a::after { content: none; }
.nt .woocommerce-message a.button, .nt .woocommerce-info a.button { order: 1; margin: 0 0 0 auto; font: 600 13px/1 var(--font-body); text-decoration: none; float: none; }
```

Rules of thumb:

- One voice: success is green, error red, info neutral, all with the same radius, padding and 14px medium type as the rest of the store.
- The "View cart" link is the only action in a success notice; make it a small outline button or an underlined link, never a second primary.
- Errors on checkout list every failed field; keep them a list, near the top of the form, with the field names bold (WooCommerce wraps them in `strong`).
- Notices never show in `preview-post`; test with a real add to cart and a checkout submitted empty.
- On the product page the wrapper is printed inside the full-bleed product wrapper, before your `.container`, so it spans the section unless it is aligned to the container width: the reset does that for a direct child (`.pdp > .woocommerce-notices-wrapper`), which is why the wrapper class in the selectors must be the marker's own class. Design 4 goes further and puts it over the details column.

## What is under your notice, and where the icon is anchored

Three different stylesheets can be under a notice, and which one it is decides what your CSS has to undo. `site-info` reports the site's `woocommerce_styles_mode`.

| Where the notice renders | What styles it | The icon |
| --- | --- | --- |
| Inside a marker-built product wrapper (Fundamental Product Builder) | nothing of ours; WooCommerce's own stylesheet only | WooCommerce's `::before`, its icon font, at `left: 1.5em` |
| Inside a classic woo element, `woocommerce_styles_mode: enabled` (the default) | `breakdance-woocommerce.css` plus the `--bde-woo-notices__*` tokens | our `::before`, a mask, at `left: var(--bde-woo-notices__padding)` |
| Anywhere, `woocommerce_styles_mode: unstyled` | WooCommerce's own stylesheet only; the tokens and `settings.woocommerce` do nothing | WooCommerce's `::before`, its icon font, at `left: 1.5em` |

Two things follow, and they are the most common notice defects in built stores.

**The icon is always absolutely positioned, so padding and icon move together.** In the default mode the builder lays the notice out with `position: relative`, `padding: var(--bde-woo-notices__padding)` then `padding-left: var(--bde-woo-notices__padding-left)` (24px and 48px by default, the left inset derived as padding + 1.5 icons), and the icon at `left: var(--bde-woo-notices__padding)`. Error icons sit on `li::before` with the `li` left unpositioned, so every item's icon anchors to the `ul` and they stack at the list's centre. Move the padding without moving the icon and it lands on the first word:

- `padding: 16px 20px` on a notice: the text starts at 20px, the icon is still at 24px. Write the left side too, `padding: 16px 20px 16px 52px`, with a matching `::before { left: 20px }`.
- `--bde-woo-notices__padding: 14px 16px`: the token also feeds the icon's `left`, and a two-value `left` is invalid, so the icon drops to the start of the text. Tokens are single lengths: `__padding` for the box, `__padding-left` for the text inset.
- `padding: 12px 16px` on an error `li` (per-item cards): its icon is still anchored to the `ul`. Add `li { position: relative; padding-left: 44px }` and `li::before { left: 16px }`, or hide it (`li::before { display: none }`) as design 5 does.

In the default mode the cleanest override is the tokens alone (`--bde-woo-notices__padding: 16px; --bde-woo-notices__padding-left: 48px; --bde-woo-notices__icon-size: 18px` on the page wrapper), because the builder derives the icon's position from them. Otherwise: a rule that sets `padding` on a notice sets `padding-left` and the `::before` `left` in the same block.

**WooCommerce's own notice CSS is the floor in the other two rows**, and it is not neutral: `padding: 1em 2em 1em 3.5em`, `margin: 0 0 2em`, a 3px coloured `border-top` and a font-icon `::before` at `top: 1em; left: 1.5em`. The reset above overrides the padding, margin and the pseudo (its `content: ""` replaces the glyph), and carries `border: 0` for the top border, which is otherwise left behind as a stray green, red or blue line above every notice.

## Making the icon real markup instead of a pseudo-element

The icon problem above is structural: an absolutely positioned pseudo has no idea where the text is. On a store built to a specific design, override the three notice templates instead and the icon becomes a flex child that cannot collide with anything. `set-woocommerce-template` writes them (`get-woocommerce-template` first, to start from the site's copy and keep its `@version` header); they survive plugin updates and outrank the theme's.

`notices/success.php`, keeping WooCommerce's escaping (`wc_kses_notice`) and its per-notice data attributes (`wc_get_notice_data_attr`, which is what puts `data-id="billing_email"` on a checkout field error):

```php
<?php
/**
 * Show messages
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! $notices ) {
	return;
}

$icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
?>
<?php foreach ( $notices as $notice ) : ?>
	<div class="woocommerce-message"<?php echo wc_get_notice_data_attr( $notice ); ?> role="alert">
		<span class="wc-notice__icon" aria-hidden="true"><?php echo $icon; ?></span>
		<span class="wc-notice__content"><?php echo wc_kses_notice( $notice['notice'] ); ?></span>
	</div>
<?php endforeach; ?>
```

`notices/error.php` is the same shape around WooCommerce's list, with the circle-exclamation icon:

```php
<ul class="woocommerce-error" role="alert">
	<?php foreach ( $notices as $notice ) : ?>
		<li<?php echo wc_get_notice_data_attr( $notice ); ?>>
			<span class="wc-notice__icon" aria-hidden="true"><?php echo $icon; ?></span>
			<span class="wc-notice__content"><?php echo wc_kses_notice( $notice['notice'] ); ?></span>
		</li>
	<?php endforeach; ?>
</ul>
```

`notices/notice.php` is `<div class="woocommerce-info" … role="status">` with the same two spans and an info icon. Keep the class on each wrapper exactly as it is: WooCommerce's own scripts, the cart's AJAX refresh and other plugins find notices by those class names.

The CSS that has to come with it. Without the first rule the old pseudo is still painted and every notice shows **two** icons, one of them on the text:

```css
.nt .woocommerce-message::before, .nt .woocommerce-info::before, .nt .woocommerce-error::before, .nt .woocommerce-error li::before { content: none; }
.nt .woocommerce-message, .nt .woocommerce-info, .nt .woocommerce-error li { display: flex; align-items: flex-start; gap: 10px; margin: 0; padding: 14px 16px; border: 0; border-radius: var(--radius); }
.nt .woocommerce-error { display: grid; gap: 8px; margin: 0; padding: 0; border: 0; background: transparent; list-style: none; }
.nt .woocommerce-message { background: var(--success-bg); color: var(--success); }
.nt .woocommerce-info { background: var(--surface-alt); color: var(--ink); }
.nt .woocommerce-error li { background: var(--error-bg); color: var(--error); }
.nt .wc-notice__icon { flex: none; width: 18px; height: 18px; margin-top: 1px; }
.nt .wc-notice__icon svg { display: block; width: 100%; height: 100%; }
/* flow content, NOT a flex row: the message is inline markup plus text ("<strong>Billing Email address</strong> is a required field"), and flex would drop the space between them. flow-root contains the floated button */
.nt .wc-notice__content { flex: 1; min-width: 0; display: flow-root; font: 500 14px/1.45 var(--font-body); }
.nt .wc-notice__content a.button { float: right; margin: -2px 0 6px 14px; display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border: 1px solid currentColor; border-radius: var(--radius); background: transparent; color: inherit !important; font: 600 13px/1 var(--font-body); text-decoration: none; }
.nt .wc-notice__content a.button::after { content: none; }
```

Worth it when the design wants the icon aligned to the first line of a wrapping message, a different icon per notice type, or an icon that scales with the text. Not worth it for a notice that only needs colours and spacing: the tokens do that in one rule, and a template override is a PHP file to maintain. Either way the notice only renders when WooCommerce has one queued, so verify with a real add to cart and a checkout submitted empty, never in `preview-post`.

## Notice 1: inline banner (the default)

Use when: everywhere. A rounded banner inside the content width, icon left, message, the action as an outline button on the right; stacks on phones.

```css
.nt-1 .woocommerce-message, .nt-1 .woocommerce-info { border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
.nt-1 .woocommerce-message a.button, .nt-1 .woocommerce-info a.button { min-height: 36px; padding: 0 14px; border: 1px solid currentColor; border-radius: var(--radius); background: transparent; color: inherit !important; text-decoration: none; display: inline-flex; align-items: center; }
.nt-1 .woocommerce-message a.button:hover, .nt-1 .woocommerce-info a.button:hover { background: var(--success); border-color: var(--success); color: #fff !important; }
.nt-1 .woocommerce-info a.button:hover { background: var(--ink); border-color: var(--ink); }
.nt-1 .woocommerce-error { border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
@media (max-width: 767px) { .nt-1 .woocommerce-message a.button, .nt-1 .woocommerce-info a.button { margin: 4px 0 0; width: 100%; justify-content: center; } }
```

## Notice 2: toast, top right

Use when: the product page should not shift when the notice appears (the banner pushes the gallery down). The notice floats over the page, slides in, and fades out after six seconds without JavaScript; the wrapper keeps no space in the flow.

```css
.nt-2 .woocommerce-notices-wrapper { position: fixed; top: calc(var(--wp-admin--admin-bar--height, 0px) + 20px); right: 20px; z-index: 90; width: min(400px, calc(100vw - 40px)); margin: 0; pointer-events: none; }
.nt-2 .woocommerce-message, .nt-2 .woocommerce-info, .nt-2 .woocommerce-error { pointer-events: auto; background: var(--ink); color: #fff; border-radius: var(--radius); box-shadow: 0 12px 40px rgba(0, 0, 0, .22); --bde-woo-notices__padding-left: 44px; animation: nt-in .3s ease both, nt-out .4s ease 6s forwards; }
.nt-2 .woocommerce-message::before, .nt-2 .woocommerce-info::before, .nt-2 .woocommerce-error li::before { background-color: var(--success); }
.nt-2 .woocommerce-error { background: var(--error); }
.nt-2 .woocommerce-error li::before { background-color: #fff; }
.nt-2 .woocommerce-message a.button, .nt-2 .woocommerce-info a.button { min-height: 32px; padding: 0 12px; border: 0; border-radius: 6px; background: rgba(255, 255, 255, .14); color: #fff !important; text-decoration: none; display: inline-flex; align-items: center; }
.nt-2 .woocommerce-message a.button:hover { background: #fff; color: var(--ink) !important; }
@keyframes nt-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@keyframes nt-out { to { opacity: 0; transform: translateY(-8px); visibility: hidden; } }
@media (max-width: 767px) { .nt-2 .woocommerce-notices-wrapper { top: auto; bottom: 20px; right: 20px; left: 20px; width: auto; } }
```

Errors on checkout must not disappear, so on the checkout page use design 1 or 5 for `.woocommerce-error` and keep the toast for success only: scope `.nt-2` rules to `.woocommerce-message` there, or give checkout `.nt-5`.

## Notice 3: slim full-width bar under the header

Use when: the store's header already has a promo bar and the notice should read as a second one: a full-bleed tinted band, centred text, the link underlined. Works when the wrapper's parent is full width (the product wrapper on a full-bleed template).

```css
.nt-3 .woocommerce-notices-wrapper { margin: 0 calc(50% - 50vw) 32px; }
.nt-3 .woocommerce-message, .nt-3 .woocommerce-info { justify-content: center; gap: 8px 12px; border-radius: 0; padding: 12px var(--gutter); text-align: center; }
.nt-3 .woocommerce-message::before, .nt-3 .woocommerce-info::before { position: static; margin: 0; }
.nt-3 .woocommerce-error { padding-left: calc(var(--gutter) + 28px); }
.nt-3 .woocommerce-message a.button, .nt-3 .woocommerce-info a.button { margin: 0; padding: 0; min-height: 0; border: 0; background: transparent; color: inherit !important; text-decoration: underline; text-underline-offset: 3px; }
.nt-3 .woocommerce-error { border-radius: 0; padding-right: var(--gutter); }
```

The negative margin needs `overflow-x: hidden` on the page or section, which the design system base sets.

## Notice 4: in the details column of the product page

Use when: the product header is a two-column grid and the confirmation should sit above the buy box, next to the button the shopper just pressed, not across the whole page above the gallery. The notices wrapper is a sibling of your `.container` grid, not a child of it, so the design gives the wrapper the same column split as the header and places the notice in the second column; nothing about the header changes.

```css
.nt-4 > .woocommerce-notices-wrapper { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); column-gap: 64px; row-gap: 10px; margin-bottom: 0; }
.nt-4 > .woocommerce-notices-wrapper > * { grid-column: 2; }
.nt-4 .woocommerce-message a.button { min-height: 34px; padding: 0 12px; border: 1px solid currentColor; border-radius: var(--radius); background: transparent; color: inherit !important; text-decoration: none; display: inline-flex; align-items: center; }
@media (max-width: 1023px) { .nt-4 > .woocommerce-notices-wrapper { grid-template-columns: minmax(0, 1fr); margin-bottom: 20px; } .nt-4 > .woocommerce-notices-wrapper > * { grid-column: 1; } }
```

Copy the header's own `grid-template-columns` and gap (`.ph-1-grid` in `product-headers.md` uses `minmax(0, 7fr) minmax(0, 5fr)` with a 64px gap; Header 5 and 6 are single-column, so use design 1 there). The details column then starts with the notice and continues with the breadcrumbs and title below it.

## Notice 5: checkout and cart errors as a field list

Use when: the checkout error list should read as a checklist of what to fix, each line linking to its field (WooCommerce links them when the field ids match), and the cart's "Coupon applied" / "Cart updated" as quiet confirmations.

```css
.nt-5 .woocommerce-NoticeGroup-checkout, .nt-5 .woocommerce-notices-wrapper { margin: 0 0 24px; }
.nt-5 ul.woocommerce-error { gap: 0; padding: 16px 20px; border: 1px solid color-mix(in srgb, var(--error) 25%, transparent); }
.nt-5 ul.woocommerce-error::before { content: "Please fix the following"; display: block; margin: 0 0 8px; font: 600 14px/1.3 var(--font-body); }
.nt-5 ul.woocommerce-error li { padding: 6px 0; border-top: 1px solid color-mix(in srgb, var(--error) 15%, transparent); font-weight: 400; }
.nt-5 ul.woocommerce-error li::before { display: none; }
.nt-5 ul.woocommerce-error li strong { font-weight: 600; }
.nt-5 ul.woocommerce-error li a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.nt-5 .woocommerce-message { padding: 10px 14px 10px 40px; font-size: 13px; }
.nt-5 .woocommerce-message::before { left: 14px; width: 16px; height: 16px; margin-top: -8px; }
.nt-5 .woocommerce-message a.button { padding: 0; min-height: 0; border: 0; background: transparent; color: inherit !important; text-decoration: underline; text-underline-offset: 3px; }
```

The "Please fix the following" heading is CSS text; translate it per site or drop the rule to keep WooCommerce's list alone.

## Where the class goes

On the wrapper that already scopes the page or product CSS: `.pdp` (product template, the `bd-woo="product"` marker), `.cart-page`, `.checkout-page`, `.account`. The reset and one design per page; the product page usually takes 1, 2 or 4, the cart 1, the checkout 5, the account 1.
