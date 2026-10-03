# Bad vs good: store-building anti-patterns

Each pair shows what an agent tends to do and what it should do instead. The "bad" versions all look right in a builder preview and fail on a real store.

## 1. A static product grid

Bad:
```html
<div class="grid">
  <div class="card"><img src="/uploads/mug.jpg"><h3>Stoneware Mug</h3><p>$24</p><a class="btn" href="/product/stoneware-mug/">Add to cart</a></div>
  <div class="card"><img src="/uploads/bowl.jpg"><h3>Serving Bowl</h3><p>$48</p><a class="btn" href="/product/serving-bowl/">Add to cart</a></div>
</div>
```
Good:
```html
<div bd-woo="products" class="grid"></div>
```
then `edit-post` on the element: `content.content.show_products: "all"`, `product_count: 8`. The native row renders WooCommerce's card with every loop hook. When the card markup must be yours, a `bd-loop="products"` container holding one bound card (`bd-href="post_permalink"`, `bd-src="product_image"`, `bd-bind="product_title"`, `bd-woo="add-to-cart"`) is the alternative, at the cost of those hooks. The static version rots the day a price changes and never adds to the cart.

## 2. Placeholder text inside a bound element

Bad: `<h3 class="card-title" bd-bind="product_title">Product name</h3>`
Good: `<h3 class="card-title" bd-bind="product_title"></h3>`
The converter discards the placeholder with a warning; the habit hides the failure when someone forgets the binding.

## 3. A mocked buy box on the product template

Bad:
```html
<div class="buy"><p class="price">$24.00</p><select><option>Small</option><option>Large</option></select><button class="btn">Add to cart</button></div>
```
Good:
```html
<div bd-woo="price" class="pdp-price"></div>
<div bd-woo="add-to-cart" class="pdp-cta"></div>
```
Only the marker renders the real variations form, stock logic and cart action.

## 4. A custom query on the archive loop

Bad: `<div bd-loop="products" bd-limit="12" bd-orderby="date" class="shop-grid">` on the all-product-archives template.
Good: `<div bd-woo="shop" class="shop-grid"></div>`, which has no query to get wrong, or on the loop-builder path `<div bd-loop="products" bd-loop-name="Product Card" class="shop-grid">` and nothing else. The archive's URL already decides the products; the knobs are ignored with a warning here, and a query set later with edit-post breaks category pages and pagination.

## 5. Category links as search URLs

Bad: `<a href="/?s=mugs&post_type=product">Mugs</a>`
Good: `<ul bd-loop="terms" bd-taxonomy="product_cat" …><li><a bd-href="term_permalink" bd-bind="term_name"></a></li></ul>`
A search misses products whose text lacks the word and catches ones that mention it in passing.

## 6. A grid rule on the wrong element

Bad (loop built with edit-post, raw mode off): `.shop-grid { display: grid; grid-template-columns: repeat(4, 1fr); }` on the loop element's class.
Good: with a marker loop (raw mode on) the rule goes on the container class; with an edit-post loop it goes on `.shop-grid .bde-loop`. And `repeat(4, minmax(0, 1fr))`, never bare `1fr`.

## 7. Inline JavaScript for behaviour

Bad: `<button onclick="document.querySelector('.filters').classList.toggle('is-open')">Filter</button>`
Good: a plain `<button class="filter-toggle">Filter</button>`, then `set-element-interactions` with `click` → `toggle_class`.

## 8. Restyling a class with a partial rule

Bad: `insert-stylesheet` with `.card-price { color: var(--accent) }` to change one colour. The import replaces the whole rule; the price loses its font and margin.
Good: read `.card-price` back with `get-css-selectors` (`include_properties: true`), re-import the complete rule with the colour changed.

## 9. Styling the woo button with a bare class

Bad: `.pdp-cta .single_add_to_cart_button { background: var(--brand) }` (loses to WooCommerce's element-qualified rule).
Good: `.pdp-cta button.single_add_to_cart_button { background: var(--brand) }`.

## 10. A gallery with no geometry

Bad: `<div bd-woo="gallery"></div>` with no CSS. The slider changes height per slide; thumbnails are ragged.
Good: `.pdp-gallery { aspect-ratio: 1 / 1; max-height: min(80vh, 640px) }` and `.pdp-thumbs .swiper-slide { position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden }` with the inner `.bde-swiper__slide` pinned by `position: absolute; inset: 0`.

## 11. Trust claims nobody confirmed

Bad: "Free worldwide shipping · Lifetime warranty · 60-day returns" typed in because it looks trustworthy.
Good: ask the owner for the actual policies; show only those. A false claim next to the buy button is a refund and a chargeback later.

## 12. Notices left unstyled because the preview looked fine

Bad: no `.woocommerce-message` rules on the marker-built product page, because the preview never showed a notice.
Good: the notice block is in every product page stylesheet, styled blind; the preview cannot show it.

Bad: `.cart-page .woocommerce-message { padding: 16px 20px; border-radius: 12px }` inside the cart element, so the builder's icon (anchored at `left: var(--bde-woo-notices__padding)`, 24px) sits on the first word.
Good: `padding: 16px 20px 16px 52px` with `::before { left: 20px }` in the same block, or the tokens alone (`--bde-woo-notices__padding: 16px; --bde-woo-notices__padding-left: 52px`), which move the icon and the text together. On a store built to a specific design, override the three `notices/` templates so the icon is an element rather than a pseudo, and the collision cannot happen at all.

## 13. Two checkouts in one tree

Bad: inserting `Woopagecheckout` for the form and `CheckoutBuilder` for the layout.
Good: one or the other. The builder refuses the second, and a half-inserted tree renders nothing.

## 14. A `<main>` in a template

Bad: `<main bd-woo="product" class="pdp">`.
Good: `<div bd-woo="product" class="pdp">`. The page output already wraps the template in `<main>`.

## 15. Building the product page before the header

Bad: a finished product page on a site with no cart in the header; shoppers add to cart and cannot find it.
Good: header with `bd-woo="mini-cart"` first, then the product page.

## 16. Saying it is done after one preview

Bad: previewing the product template once against a simple product.
Good: preview against a variable, a grouped/external, a sale and an out-of-stock product, and the archive as a category and as a search; then check mobile widths.
