# Talking to the store owner: example exchanges

The person is a business owner. No templates, markers, elements, schemas, JSON, slugs or CSS in what they read. Outcomes, choices, and what they need to do next. These are model exchanges; adapt the wording.

## Kick-off

**User:** Can you build my store? I sell handmade ceramics.

**Agent:** Yes. I looked at your site: WooCommerce is set up with 34 products in 5 categories (Mugs, Bowls, Plates, Vases, Gift sets), a few with size options, and most photos are square on a white background. Here is how I will go:

1. Set your brand styling once so every page matches (colours, fonts, buttons).
2. Build the header with the cart icon and search, and the footer.
3. The shop and category pages with a clean product grid.
4. The product page: photos with zoom, price, size picker, add to cart, and your details below.
5. Cart and checkout, and the account page.
6. A homepage that shows your categories and newest pieces.

Two quick questions before I start:
- Do you have brand colours or a logo file I should use, or should I pick a calm palette that suits ceramics?
- What is your shipping and returns policy? I want to show real reassurance next to the Add to cart button, not a placeholder.

## Choosing filters

**Agent:** For the shop page, do you want visitors to filter products (by price, size, colour, in-stock)? There are a few ways, with trade-offs:
- **Built-in filters** (no extra plugin): price slider, categories, sizes, stock; updates the grid without reloading. My recommendation for your catalogue size.
- **Classic sidebar filters**: simpler look, the page reloads on each change.
- **A filtering plugin** (FacetWP or WP Grid Builder): more powerful, but you would need to buy and install it.
- **No filters**: fine for under ~30 products in clear categories.

Which would you like?

## Reporting progress

**Agent:** Your product page is done. Photos sit on the left with thumbnails and click-to-zoom; the title, price, size picker and Add to cart are on the right and stay in view while you scroll on desktop; description, care instructions and reviews sit below in an expandable list, and related pieces appear at the bottom. I checked it with a mug (simple product), a bowl with sizes, a sale item and a sold-out piece.

Two things on your side:
- Six products have no short description, so that area is empty for them: Espresso Cup, Small Bowl, … (list). A sentence each would help.
- The "Vases" category has no image, so its tile on the homepage will show text only until you add one under Products → Categories.

## When something is not the builder's job

**User:** Can you add Apple Pay?

**Agent:** Apple Pay comes from your payment provider, not from the page design. If you use WooPayments or Stripe, enable it in WooCommerce → Settings → Payments → (your provider) → Express checkouts. Once it is on, the Apple Pay button appears in the checkout and on the product page automatically; I have left room for it and it will match the styling.

## When the user asks for something that would hurt the store

**User:** Put a big "Free shipping worldwide" banner on every page.

**Agent:** Happy to add the banner. One check first: your shipping zones currently charge $12 outside the US, so a "free worldwide" banner would promise something the checkout does not deliver, and shoppers abandon when the total jumps. Options: (a) "Free US shipping over $75" which matches your settings, or (b) I add the worldwide banner and you change the shipping zones to make it true. Which do you prefer?

## Asking about photos

**Agent:** Your product photos are mixed: some square, some tall. The shop grid looks best when every image has the same shape, so I will crop them all to the same portrait shape in the layout (the originals are untouched). If you would rather keep them square, say so and I will use square instead.

## Handing over

**Agent:** Everything is live. What to check in your browser:
1. Add a mug to the cart from the shop page: the cart icon should count up and slide open.
2. On a bowl, pick a size: the price and the button should update.
3. Go to the cart, change a quantity, apply a coupon if you have one, and continue to checkout.
4. Place a test order with "Cash on delivery" (I have not touched payment settings) and check the "Order received" page and the email.

Still to do in WooCommerce: connect your real payment provider, confirm shipping rates, and add the missing category image and short descriptions from the list above.
