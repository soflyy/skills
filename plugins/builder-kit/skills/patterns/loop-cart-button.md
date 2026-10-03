# Loop cart button states

The Loop Cart Button (`<div bd-woo="add-to-cart">` inside a product card, or `EssentialElements\Wooloopcartbutton`) renders WooCommerce's AJAX add-to-cart link. Its four states are decided by WooCommerce's script, not by you, and the builder's defaults make two of them ugly unless you design them: while loading, the label is hidden and a 40px spinner is dropped over the button; after adding, a second link, "View cart", is inserted after the button, styled as a second button, and wraps to the next line. Six CSS-only designs below cover every state; all start from one reset.

## The markup and its states

```html
<!-- rest -->
<a href="?add-to-cart=12" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="12" rel="nofollow">Add to cart</a>

<!-- loading: the script adds .loading to the same link -->
<a class="button product_type_simple add_to_cart_button ajax_add_to_cart loading">Add to cart</a>

<!-- added: .added on the link, and a "View cart" link inserted after it -->
<a class="button product_type_simple add_to_cart_button ajax_add_to_cart added">Add to cart</a>
<a href="/cart/" class="added_to_cart wc-forward" title="View cart">View cart</a>

<!-- other product types render a plain link, no AJAX states -->
<a class="button product_type_variable add_to_cart_button">Select options</a>
<a class="button product_type_external">Buy on partner site</a>
```

The element wraps this in `.bde-woo-loop-cart-button` (`display: flex; flex-wrap: wrap; gap: 12px`), which is where the wrapping comes from. The builder defaults you are overriding:

```css
/* builder defaults, for reference */
.bde-woo-loop-cart-button { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.breakdance-woocommerce a.button.add_to_cart_button, .breakdance-woocommerce .added_to_cart { /* secondary button: border, padding, capitalize, width: max-content */ }
.bde-woo-loop-cart-button .button { position: relative; }
.bde-woo-loop-cart-button .button.loading { text-indent: -999999px; }              /* hides the label */
.bde-woo-loop-cart-button .button::before { content: ""; width: 40px; height: 40px; position: absolute; left: 50%; top: 50%; opacity: 0; /* spinner image */ }
.bde-woo-loop-cart-button .button.loading::before { opacity: 1; }
.bde-woo-loop-cart-button .button.loading::after { display: none; }
```

## Reset (paste once, before any design)

`.lcb` stands for the class you put on the marker (`<div bd-woo="add-to-cart" class="card-cta lcb lcb-1">`); the rules read `.card-cta …` in your stylesheet. The element's root also carries the builder's `.breakdance-woocommerce` class, and the woo stylesheet styles the button as `.breakdance-woocommerce a.button.add_to_cart_button` (specificity 0,3,1), so a plain `.card-cta a.button` (0,2,1) loses every property it sets: that is why agent-written buttons keep the builder's white bordered look. Every button rule below is written `.lcb.breakdance-woocommerce a.button` (0,3,1, and yours loads later) so it wins.

```css
.lcb { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; align-items: stretch; }
.lcb.breakdance-woocommerce a.button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; margin: 0; padding: 0 18px; width: auto; max-width: none; border: 1px solid var(--ink); border-radius: var(--radius); background: var(--ink); color: var(--on-brand, #fff); font: 600 14px/1 var(--font-body); text-transform: none; text-decoration: none; text-indent: 0; white-space: nowrap; cursor: pointer; transition: background .15s, color .15s, border-color .15s, opacity .15s; }
.lcb.breakdance-woocommerce a.button:hover { background: var(--brand); border-color: var(--brand); color: var(--on-brand, #fff); }
.lcb.breakdance-woocommerce a.button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
/* loading: keep the label and the size, replace the builder's 40px spinner with a 14px one after the label */
.lcb.breakdance-woocommerce a.button.loading { text-indent: 0; opacity: .85; pointer-events: none; }
.lcb.breakdance-woocommerce a.button::before { content: none; }
.lcb.breakdance-woocommerce a.button.loading::after { content: ""; display: inline-block; width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: lcb-spin .7s linear infinite; }
@keyframes lcb-spin { to { transform: rotate(360deg); } }
/* the inserted "View cart" link: not a second button by default; each design says where it goes */
.lcb a.added_to_cart { display: none; }
```

Rules of thumb:

- The button never changes width or height between states; that is the whole point of the reset.
- Variable products get "Select options" in the same button style; do not style `product_type_variable` differently unless the design calls for a secondary look.
- The loading state must be visible within 100ms and must not move anything: a spinner inside the button, not a replacement of it.
- After adding, tell the shopper two things: it worked, and where the cart is. Designs 1 to 4 do both without a second row. The mini cart badge also updates, and `open_cart_on_add` on the mini cart can open the drawer; if it does, the "View cart" link is redundant and design 1 or 2 fits.
- `:has()` is used to react to the inserted link; every browser shipping in 2024 or later supports it.

## Add to cart 1: the button becomes "View cart"

Use when: the mini cart does not open on add and the shopper should be led to the cart. The add button hides and the inserted link takes its place with the same size, in the success colour, with a check. No layout shift.

```css
.lcb-1.breakdance-woocommerce:has(a.added_to_cart) a.button.added { display: none; }
.lcb-1 a.added_to_cart { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; max-width: none; min-height: 44px; padding: 0 18px; border: 1px solid var(--success); border-radius: var(--radius); background: var(--success-bg); color: var(--success); font: 600 14px/1 var(--font-body); text-decoration: none; white-space: nowrap; }
.lcb-1 a.added_to_cart::before { content: ""; width: 14px; height: 14px; border-radius: 50%; background: var(--success); -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / 10px no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>") center / 10px no-repeat; background: var(--success); }
.lcb-1 a.added_to_cart:hover { background: var(--success); color: #fff; }
```

The link text is WooCommerce's "View cart" (translated by WooCommerce), so nothing here is hard-coded copy.

## Add to cart 2: "Added" confirmation, no second link

Use when: the mini cart opens on add (`open_cart_on_add: true`) or the store wants the card to stay quiet. The button turns into a success state that reads "Added"; the shopper can add again.

```css
.lcb-2.breakdance-woocommerce a.button.added { background: var(--success); border-color: var(--success); color: #fff; }
.lcb-2.breakdance-woocommerce a.button.added::after { content: "✓"; font-weight: 700; }
.lcb-2 a.added_to_cart { display: none; }
```

The label stays "Add to cart" with the check appended, so no CSS text needs translating. If the owner wants the word "Added", add `.lcb-2.breakdance-woocommerce a.button.added { font-size: 0; } .lcb-2.breakdance-woocommerce a.button.added::after { content: "Added ✓"; font-size: 14px; }` and translate that string per site.

## Add to cart 3: split, button plus "View cart" beside it

Use when: cards are wide (list rows, featured cards, Product Grid 7) and both actions fit on one line. Two equal columns appear only once the link exists.

```css
.lcb-3:has(a.added_to_cart) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.lcb-3.breakdance-woocommerce a.button.added { background: var(--surface); color: var(--ink); }
.lcb-3.breakdance-woocommerce a.button.added::after { content: "✓"; color: var(--success); font-weight: 700; }
.lcb-3 a.added_to_cart { display: inline-flex; align-items: center; justify-content: center; width: auto; max-width: none; min-height: 44px; padding: 0 14px; border: 1px solid var(--ink); border-radius: var(--radius); background: var(--ink); color: #fff; font: 600 14px/1 var(--font-body); text-decoration: none; white-space: nowrap; }
.lcb-3 a.added_to_cart:hover { background: var(--brand); border-color: var(--brand); }
```

## Add to cart 4: floating "View cart" chip over the image

Use when: the button is a quick-add overlay on the image (Product Grids 1 and 2) and the confirmation should not touch the card's text block. The chip slides in at the top of the card. The card must be `position: relative` (every grid pattern's card is).

```css
.lcb-4.breakdance-woocommerce a.button.added::after { content: "✓"; font-weight: 700; }
.lcb-4 a.added_to_cart { display: inline-flex; align-items: center; gap: 6px; position: absolute; top: 12px; left: 12px; z-index: 3; min-height: 32px; padding: 0 12px; border: 0; border-radius: var(--radius-pill); background: var(--ink); color: #fff; font: 600 12px/1 var(--font-body); text-decoration: none; box-shadow: 0 6px 20px rgba(0, 0, 0, .18); animation: lcb-chip .3s ease both; }
.lcb-4 a.added_to_cart::after { content: "→"; }
@keyframes lcb-chip { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
```

Because the chip is positioned against the card, the marker's wrapper (`.lcb-4`) must not create its own containing block: leave `position` unset on it and put the class on the marker inside the card, not on the card.

## Add to cart 5: icon button (circle)

Use when: dense grids where the label is the price and the card title; the button is a 44px circle with a bag icon that becomes a check. The label text is still rendered for screen readers.

```css
.lcb-5 { justify-items: end; }
.lcb-5.breakdance-woocommerce a.button { width: 44px; height: 44px; padding: 0; border-radius: 50%; font-size: 0; }
.lcb-5.breakdance-woocommerce a.button::after { content: ""; width: 18px; height: 18px; background: currentColor; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/><path d='M3 6h18'/><path d='M16 10a4 4 0 0 1-8 0'/></svg>") center / contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/><path d='M3 6h18'/><path d='M16 10a4 4 0 0 1-8 0'/></svg>") center / contain no-repeat; }
.lcb-5.breakdance-woocommerce a.button.loading::after { width: 16px; height: 16px; background: transparent; -webkit-mask: none; mask: none; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: lcb-spin .7s linear infinite; }
.lcb-5.breakdance-woocommerce a.button.added { background: var(--success); border-color: var(--success); }
.lcb-5.breakdance-woocommerce a.button.added::after { -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>"); mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>"); }
.lcb-5.breakdance-woocommerce a.button.product_type_variable { width: auto; border-radius: var(--radius-pill); padding: 0 16px; font-size: 13px; }
.lcb-5.breakdance-woocommerce a.button.product_type_variable::after { content: none; }
.lcb-5 a.added_to_cart { display: none; }
```

Variable products keep a text pill ("Select options") because an icon cannot say that.

## Add to cart 6: full-width bar under the card, "View cart" as a text line

Use when: editorial grids with generous vertical rhythm (Product Grid 4), where a quiet text link under the button reads better than a second button. The line is reserved from the start so nothing moves when it appears.

```css
.lcb-6 { gap: 6px; }
.lcb-6.breakdance-woocommerce a.button { width: 100%; }
.lcb-6::after { content: ""; display: block; height: 16px; }               /* reserved line */
.lcb-6:has(a.added_to_cart)::after { content: none; }
.lcb-6 a.added_to_cart { display: block; width: auto; height: 16px; margin: 0; padding: 0; border: 0; background: transparent; text-align: center; font: 500 13px/16px var(--font-body); color: var(--ink-muted); text-transform: none; text-decoration: underline; text-underline-offset: 3px; }
.lcb-6 a.added_to_cart:hover { color: var(--ink); }
```

## Where the class goes

Put `lcb lcb-N` (renamed to the site's prefix) on the `bd-woo="add-to-cart"` marker inside the card; the card patterns in `product-grids.md` already carry a `.pg-cta` class in that position, so `.pg-cta` is the `.lcb` of that family and its shared CSS is this reset plus design 1. On a card that opens the mini cart on add, switch to design 2.

Verify in a browser with a real click: the preview tools render the rest state only. Check the four states in order (rest, hover, loading, added) at desktop and phone width, and that the loading state never shows the builder's 40px spinner.
