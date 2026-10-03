// Prototype mock for the design-first-build workflow.
// Include it in the <head> of a prototype page: <script src="mock.js" defer></script>
// When the file is opened in a browser it fills the builder markers (bd-loop, bd-bind,
// bd-href, bd-src, bd-woo) with sample content so the page can be reviewed, and it
// strips the marker attributes it consumed. The file on disk keeps the markers and
// stays the exact html-to-page input: send the <body> content, never this script.
// Override the sample data by defining window.MOCK = { depts: [...], subs: [...],
// products: [...], prices: [...], photos: { product: 'url', category: 'url' } }
// before this script runs.
(function () {
  const M = window.MOCK || {};
  const depts = M.depts || ["Women", "Men", "Kids", "Home", "Beauty", "Sport", "Electronics", "Toys", "Garden", "Pets", "Books", "Grocery", "Office", "Auto", "Baby", "Jewellery", "Outdoor", "Music", "Art", "Gifts"];
  const subs = M.subs || ["New in", "Dresses", "Tops & shirts", "Knitwear", "Trousers", "Denim", "Outerwear", "Shoes", "Bags", "Accessories", "Activewear", "Sale"];
  const products = M.products || ["Linen Weekender Bag", "Stoneware Mug Set", "Merino Crew Sweater", "Oak Side Table", "Ceramic Vase", "Canvas Tote", "Wool Throw", "Leather Belt"];
  const prices = M.prices || ["$96", "$48", "$120", "$240", "$64", "$38", "$150", "$54"];
  const hues = [150, 25, 205, 340, 45, 260, 180, 10, 90, 300];
  function ph(i, w, h, label) {
    const hue = hues[i % hues.length];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue} 30% 88%)'/><stop offset='1' stop-color='hsl(${hue} 25% 72%)'/></linearGradient></defs><rect width='${w}' height='${h}' fill='url(#g)'/><circle cx='${w*0.62}' cy='${h*0.42}' r='${Math.min(w,h)*0.22}' fill='hsl(${hue} 30% 62%)' opacity='.55'/><rect x='${w*0.12}' y='${h*0.55}' width='${w*0.5}' height='${h*0.3}' rx='${Math.min(w,h)*0.04}' fill='hsl(${hue} 28% 58%)' opacity='.5'/></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }
  const stars = '<span class="star-rating">★★★★★</span><span class="rating-count">(128 reviews)</span>';
  const productList = (idx) => `<ul class="products columns-4">${idx.map(k => `<li class="product type-product"><a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">${img(k, 600)}<h2 class="woocommerce-loop-product__title">${products[k % products.length]}</h2><span class="price"><span class="woocommerce-Price-amount amount"><bdi>${prices[k % prices.length]}</bdi></span></span></a><a href="#" class="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to cart</a></li>`).join('')}</ul>`;
  // Mirrors the Fundamental Image element's own fallback when a bound image resolves to nothing.
  const placeholderImg = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='540' height='540' viewBox='0 0 140 140'><path d='M0 0h140v140H0z' fill='%23e4e6ea'/><path d='M46 52h48v36H46z' fill='%23cfd3da'/><circle cx='60' cy='64' r='6' fill='%23e4e6ea'/><path d='M46 88l18-16 12 10 10-8 8 14z' fill='%23e4e6ea'/></svg>");
  const woo = {
    breadcrumbs: () => '<div class="mock-crumbs"><a href="#">Home</a><span>/</span><a href="#">Bags</a><span>/</span><span>Linen Weekender Bag</span></div>',
    title: () => 'Linen Weekender Bag',
    rating: () => stars,
    price: () => '<span class="price"><del>$120</del> <ins>$96</ins></span>',
    excerpt: () => '<p>A soft, structured weekender in washed European linen with vegetable-tanned leather handles. Fits two days of everything.</p>',
    description: () => '<div class="mock-desc"><p>Made in Portugal from 100% European linen, stone-washed for a soft hand and a lived-in drape. The base is reinforced with recycled cotton canvas; the handles are vegetable-tanned leather that darkens with use.</p><p>Fits a 15" laptop, a change of clothes and a wash bag with room to spare. Interior zip pocket and two slip pockets.</p></div>',
    stock: () => '<p class="stock in-stock">In stock, ships in 1 to 2 business days</p>',
    meta: () => '<span>SKU: LW-0412</span> · <span>Category: <a href="#">Bags</a></span>',
    "additional-info": () => '<table class="mock-table"><tr><th>Material</th><td>100% European linen</td></tr><tr><th>Dimensions</th><td>52 × 30 × 22 cm</td></tr><tr><th>Weight</th><td>1.1 kg</td></tr><tr><th>Care</th><td>Spot clean, air dry</td></tr></table>',
    tabs: () => '<div class="mock-accordion"><details open><summary>Description</summary><div class="body">Made in Portugal from stone-washed European linen with vegetable-tanned leather handles.</div></details><details><summary>Details &amp; care</summary></details><details><summary>Reviews (128)</summary></details></div>',
    reviews: () => '<div class="mock-reviews"><div class="mock-review"><div class="star-rating">★★★★★</div><p>Exactly the size I hoped for. The linen softens beautifully.</p><div class="who">Maya R.</div></div><div class="mock-review"><div class="star-rating">★★★★★</div><p>Handles feel expensive. Took it on three trips already.</p><div class="who">Jonas K.</div></div><div class="mock-review"><div class="star-rating">★★★★☆</div><p>Lovely bag, wish it had a shoulder strap.</p><div class="who">Priya S.</div></div></div>',
    "related-products": (el, i) => '<ul class="mock-related">' + [0,1,2,3].map(k => `<li><img src="${ph(k+3, 600, 600)}" alt=""><div class="t">${products[k+1]}</div><div class="p">${prices[k+1]}</div></li>`).join('') + '</ul>',
    // WooCommerce renders nothing until the owner links upsells on the product, which is the common
    // case and the one worth seeing; a demo asks for a filled row with data-mock="filled"
    upsells: (el) => el.getAttribute('data-mock') === 'filled' ? productList([3, 4, 5, 6]) : '',
    'related-products': () => productList([2, 3, 4, 5]),
    "mini-cart": () => '<a class="mock-cart" href="#"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h13l-1.5 8H8z"/><path d="M6 7L5 4H3"/><circle cx="9" cy="19" r="1.4"/><circle cx="16" cy="19" r="1.4"/></svg><span class="count">2</span></a>',
    search: () => '<div class="mock-search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>Search products</div>',
    gallery: (el) => `<div class="mock-gallery"><img src="${ph(0, 800, 1000)}" alt=""></div>`,
    "gallery-thumbs": (el) => {
      const vertical = /rail/.test(el.className);
      // The element's real nesting: Swiper sizes .swiper-slide, .bde-swiper__slide is an inner box,
      // and the image is .bde-swiper__image. Keeping the three boxes separate is what makes a rule
      // written on the wrong one visible. The sizes differ on purpose: a real gallery is not all
      // square, and a vertical rail carries the inline height Swiper writes onto each slide.
      const sizes = [[400, 400], [800, 500], [500, 800], [400, 400]];
      return `<div class="mock-thumbs${vertical ? ' vertical' : ''}">` + sizes.map(([w, h], k) =>
        `<div class="bde-swiper-slide swiper-slide${k === 0 ? ' swiper-slide-thumb-active' : ''}"${vertical ? ' style="height: 64px"' : ''}>` +
        `<div class="bde-swiper__slide"><img class="bde-swiper__image" src="${ph(k, w, h)}" alt=""></div></div>`).join('') + '</div>';
    },
    "add-to-cart": (el, i) => {
      if (el.closest('[data-i]')) { // inside a loop item: the Loop Cart Button, one card per state
        el.classList.add('bde-woo-loop-cart-button', 'breakdance-woocommerce');
        if (i % 4 === 1) return '<a class="button product_type_variable add_to_cart_button" href="#">Select options</a>';
        if (i === 2) return '<a class="button product_type_simple add_to_cart_button ajax_add_to_cart added" href="#">Add to cart</a><a class="added_to_cart wc-forward" href="#" title="View cart">View cart</a>';
        if (i === 3) return '<a class="button product_type_simple add_to_cart_button ajax_add_to_cart loading" href="#">Add to cart</a>';
        return '<a class="button product_type_simple add_to_cart_button ajax_add_to_cart" href="#">Add to cart</a>';
      }
      const simple = /simple/.test(el.className);
      // The builder's exact quantity markup: empty buttons whose glyphs are ::before masks (see builderCss below).
      const qty = '<div class="quantity quantity--number"><label class="screen-reader-text" for="quantity_mock">Quantity</label><button class="bde-quantity-button bde-quantity-button--dec" type="button" aria-label="Decrement"></button><input type="number" id="quantity_mock" class="input-text qty text" name="quantity" value="1" aria-label="Product quantity" min="1" step="1" inputmode="numeric" autocomplete="off"><button class="bde-quantity-button bde-quantity-button--inc" type="button" aria-label="Increment"></button></div>';
      if (simple) return `<form class="cart">${qty}<button class="single_add_to_cart_button button alt" type="button">Add to cart</button></form>`;
      return `<form class="cart variations_form"><table class="variations"><tbody><tr><th class="label">Colour</th><td class="value"><div class="bde-woo-select"><select><option>Natural</option></select><span class="bde-woo-select__arrow">▾</span></div></td></tr><tr><th class="label">Size</th><td class="value"><div class="bde-woo-select"><select><option>Choose an option</option></select><span class="bde-woo-select__arrow">▾</span></div><a class="reset_variations" href="#" aria-label="Clear options">Clear</a></td></tr></tbody></table><div class="single_variation_wrap"><div class="woocommerce-variation-add-to-cart">${qty}<button class="single_add_to_cart_button button alt" type="button">Add to cart</button></div></div></form>`;
    }
  };
  // 1. loops: expand innermost first
  function expandLoops() {
    let loops = Array.from(document.querySelectorAll('[bd-loop]'));
    loops.sort((a, b) => (b.querySelectorAll('[bd-loop]').length) - (a.querySelectorAll('[bd-loop]').length)); // outermost first? we need innermost first:
    loops.reverse();
    for (const loop of loops) {
      if (!loop.isConnected) continue;
      const tpl = loop.firstElementChild; if (!tpl) continue;
      const kind = loop.getAttribute('bd-loop');
      const nested = loop.closest('[bd-loop] [bd-loop]') === loop; // this loop is inside another
      const limit = parseInt(loop.getAttribute('bd-limit') || (kind === 'terms' ? 6 : 4), 10);
      const n = Math.min(limit, kind === 'terms' ? (nested ? 6 : depts.length) : products.length);
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const c = tpl.cloneNode(true);
        c.setAttribute('data-i', i);
        c.setAttribute('data-nested', nested ? 1 : 0);
        frag.appendChild(c);
      }
      loop.innerHTML = ''; loop.appendChild(frag);
      ['bd-loop','bd-loop-name','bd-limit','bd-orderby','bd-order','bd-taxonomy','bd-hide-empty','bd-category','bd-featured','bd-query'].forEach(a => loop.removeAttribute(a));
    }
  }
  function idxOf(el) {
    const item = el.closest('[data-i]');
    return item ? [parseInt(item.getAttribute('data-i'), 10), item.getAttribute('data-nested') === '1'] : [0, false];
  }
  function bind() {
    document.querySelectorAll('[bd-bind]').forEach(el => {
      const f = el.getAttribute('bd-bind'); const [i, nested] = idxOf(el);
      let params = {}; try { params = JSON.parse(el.getAttribute('bd-params') || '{}'); } catch (e) {}
      let v = '';
      switch (f) {
        case 'term_name': v = nested ? subs[i % subs.length] : depts[i % depts.length]; break;
        case 'woocommerce_category_count': case 'term_count': v = String(12 + (i * 7) % 40); break;
        case 'product_title': v = products[i % products.length]; break;
        case 'product_price': el.innerHTML = i % 3 === 0 ? `<del>$120</del> <ins>${prices[i % prices.length]}</ins>` : prices[i % prices.length]; el.removeAttribute('bd-bind'); return;
        case 'product_sale': v = i % 3 === 0 ? 'Sale' : ''; break;
        case 'product_sale_price': v = i % 3 === 0 ? prices[i % prices.length] : ''; break;
        case 'product_regular_price': v = i % 3 === 0 ? '$120' : prices[i % prices.length]; break;
        case 'product_rating':
          if (params.rating_type === 'rating') { v = '4.8'; break; }
          if (params.rating_type === 'rating_count' || params.rating_type === 'review_count') { v = '128'; break; }
          if (i % 2 === 0) { el.innerHTML = stars; el.removeAttribute('bd-bind'); return; } v = ''; break;
        case 'product_stock': v = i % 4 === 3 ? 'Out of stock' : 'In stock'; break;
        case 'product_terms': case 'post_terms': v = 'Bags'; break;
        case 'product_sku': v = 'LW-04' + (10 + i); break;
        case 'archive_title': v = 'Bags'; break;
        case 'archive_description': v = 'Weekenders, totes and everyday carry in linen and leather.'; break;
        case 'user_name': v = 'Ana'; break;
        case 'user_email': v = 'ana@example.com'; break;
        case 'post_title': v = 'How we make our linen'; break;
        case 'post_excerpt': v = 'From flax fields in Normandy to the stone-wash in Guimarães.'; break;
        case 'author_name': v = 'Sofia'; break;
        default: v = f;
      }
      if (params.beforecontent) v = params.beforecontent + v;
      if (params.aftercontent && v) v = v + params.aftercontent;
      if (!v && params.fallback) v = params.fallback;
      el.textContent = v; el.removeAttribute('bd-bind');
    });
    document.querySelectorAll('[bd-src]').forEach(el => { let [i] = idxOf(el); const f = el.getAttribute('bd-src'); let prm = {}; try { prm = JSON.parse(el.getAttribute('bd-params') || '{}'); } catch (e) {}
      // A bound image with nothing behind it does NOT come out empty: the image element falls back to
      // a placeholder SVG, which is why [src=""] guards never fire. data-mock="missing" shows that state.
      if (el.getAttribute('data-mock') === 'missing') { el.src = placeholderImg; el.removeAttribute('bd-src'); el.removeAttribute('bd-alt'); return; }
      if (f === 'product_gallery_image') { const gi = parseInt(prm.image_index || 0, 10); if (gi >= 4) { el.src = placeholderImg; el.removeAttribute('bd-src'); return; } i = gi + 1; } el.src = ph(i + (f.includes('category') ? 2 : 0), 600, /card|product/.test(f) ? 750 : 600); el.removeAttribute('bd-src'); el.removeAttribute('bd-alt'); });
    document.querySelectorAll('[bd-href]').forEach(el => { el.setAttribute('href', '#'); el.removeAttribute('bd-href'); });
    document.querySelectorAll('[bd-woo]').forEach(el => { const a = el.getAttribute('bd-woo'); const [i] = idxOf(el); const fn = woo[a]; if (fn) el.innerHTML = fn(el, i); el.removeAttribute('bd-woo'); });
  }
  document.querySelectorAll('img[src*="logo"]').forEach(img => {
    const text = (img.getAttribute('alt') || 'Brand').toUpperCase();
    let light = /white/.test(img.getAttribute('src') || ''); let anc = light ? null : img.parentElement;
    while (anc && anc !== document.body) { const bg = getComputedStyle(anc).backgroundColor; const m = bg.match(/\d+/g); if (m && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') { const [r,g,b] = m.map(Number); light = (0.299*r+0.587*g+0.114*b) < 128; break; } anc = anc.parentElement; }
    const w = Math.max(120, text.length * 22 + 20), h = 36;
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'><text x='0' y='27' font-family='Fraunces, Georgia, serif' font-size='30' font-weight='600' letter-spacing='2' fill='${light ? '#fff' : '#16181d'}'>${text}</text></svg>`);
    img.style.height = img.style.height || '';
  });
  // The builder's own default CSS for the parts the mock draws, inserted BEFORE the page's
  // stylesheets so the prototype's class rules override it exactly as they will on the site.
  // Today: the quantity stepper (absolutely positioned buttons with mask-image glyphs), which
  // is the part agents most often style without undoing the defaults first.
  const plus = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>');
  const minus = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>');
  const builderCss = `
.breakdance-woocommerce .quantity { position: relative; max-width: 85px; align-self: stretch; width: 100%; }
@media (max-width: 767px) { .breakdance-woocommerce .quantity { max-width: 75px; } }
.breakdance-woocommerce .quantity input { -webkit-appearance: textfield; -moz-appearance: textfield; appearance: textfield; text-align: center; height: 100%; }
.breakdance-woocommerce .quantity input::-webkit-outer-spin-button, .breakdance-woocommerce .quantity input::-webkit-inner-spin-button { -webkit-appearance: none; }
.breakdance-woocommerce .quantity--hidden { display: none; }
.screen-reader-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); }
.bde-quantity-button { -webkit-appearance: none; appearance: none; position: absolute; top: 50%; bottom: 5px; display: flex; align-items: center; justify-content: center; background-color: transparent; border: none; font-size: 10px; color: #6b7280; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; cursor: pointer; transform: translateY(-50%); }
.bde-quantity-button:hover { background-color: #f5f5f5; }
.bde-quantity-button:before { content: ""; display: block; width: 1em; height: 1em; background-color: currentcolor; mask-position: center; mask-size: 100% 100%; mask-repeat: no-repeat; -webkit-mask-position: center; -webkit-mask-size: 100% 100%; -webkit-mask-repeat: no-repeat; }
.bde-quantity-button--inc { right: 5px; }
.bde-quantity-button--inc:before { -webkit-mask-image: url(${plus}); mask-image: url(${plus}); }
.bde-quantity-button--dec { left: 5px; }
.bde-quantity-button--dec:before { -webkit-mask-image: url(${minus}); mask-image: url(${minus}); }
.bde-woo-loop-cart-button { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; max-width: 100%; }
.breakdance-woocommerce a.button.add_to_cart_button, .breakdance-woocommerce .added_to_cart { display: inline-flex; justify-content: center; align-items: center; width: max-content; padding: 14px 24px; border: 1px solid #16181d; border-radius: 3px; background: transparent; color: #16181d; text-transform: capitalize; text-decoration: none; font-size: 16px; line-height: 1.5; font-weight: 500; }
.bde-woo-loop-cart-button .button { position: relative; }
.bde-woo-loop-cart-button .button.loading { text-indent: -999999px; }
.bde-woo-loop-cart-button .button::before { content: ""; width: 40px; height: 40px; position: absolute; left: 50%; top: 50%; margin: -20px 0 0 -20px; border: 3px solid rgba(0,0,0,.15); border-top-color: #16181d; border-radius: 50%; opacity: 0; animation: mock-spin .8s linear infinite; }
.bde-woo-loop-cart-button .button.loading::before { opacity: 1; }
.bde-woo-loop-cart-button .button.loading::after { display: none; }
@keyframes mock-spin { to { transform: rotate(360deg); } }
.mock-cart-layout { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 56px; }
.mock-cart-layout .woocommerce-cart-form { flex: 1 1 520px; }
.mock-cart-layout .cart-collaterals { flex: 0 1 380px; }
.screen-reader-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); }
`;
  function installBuilderCss() {
    if (document.getElementById('mock-builder-css')) return;
    const st = document.createElement('style'); st.id = 'mock-builder-css'; st.textContent = builderCss;
    document.head.insertBefore(st, document.head.firstChild);
    document.body.classList.add('breakdance-woocommerce'); // the woo pages carry this wrapper class; it is what the defaults are scoped to
  }
  // 4. WooCommerce page parts that are inserted with edit-post rather than markers: the cart,
  // checkout, order received, account, login and order tracking elements. The skills' frames
  // leave slot divs for them (`.cart-slot`, `.chk-billing-slot`, `.account-slot`, ...); this fills
  // each slot with WooCommerce's real markup so the page CSS can be reviewed against it.
  // A slot may carry data-mock="orders|view-order|edit-address|dashboard" (account) to pick a view.
  const img = (i, w) => `<img src="${ph(i, w || 300, w || 300)}" alt="">`;
  const qtyHtml = (v) => `<div class="quantity quantity--number"><label class="screen-reader-text" for="q${v}">Quantity</label><button class="bde-quantity-button bde-quantity-button--dec" type="button" aria-label="Decrement"></button><input type="number" id="q${v}" class="input-text qty text" name="quantity" value="${v}" aria-label="Product quantity" min="1" step="1" inputmode="numeric" autocomplete="off"><button class="bde-quantity-button bde-quantity-button--inc" type="button" aria-label="Increment"></button></div>`;
  const cartRow = (i, name, price, qty, variation) => `<tr class="woocommerce-cart-form__cart-item cart_item"><td class="product-remove"><a href="#" class="remove" aria-label="Remove this item">×</a></td><td class="product-thumbnail"><a href="#">${img(i, 300)}</a></td><td class="product-name" data-title="Product"><a href="#">${name}</a>${variation ? `<dl class="variation"><dt class="variation-Colour">Colour:</dt><dd class="variation-Colour"><p>${variation}</p></dd></dl>` : ''}</td><td class="product-price" data-title="Price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>${price}</bdi></span></td><td class="product-quantity" data-title="Quantity">${qtyHtml(qty)}</td><td class="product-subtotal" data-title="Subtotal"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>${price * qty}</bdi></span></td></tr>`;
  const cartTable = () => `<div class="woocommerce-notices-wrapper"></div><form class="woocommerce-cart-form" action="#" method="post"><table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0"><thead><tr><th class="product-remove"><span class="screen-reader-text">Remove item</span></th><th class="product-thumbnail"><span class="screen-reader-text">Thumbnail image</span></th><th class="product-name">Product</th><th class="product-price">Price</th><th class="product-quantity">Quantity</th><th class="product-subtotal">Subtotal</th></tr></thead><tbody>${cartRow(0, 'Linen Weekender Bag', 96, 1, 'Natural')}${cartRow(1, 'Stoneware Mug Set', 48, 2)}${cartRow(2, 'Merino Crew Sweater', 120, 1, 'Oat, M')}<tr><td class="actions" colspan="6"><div class="coupon"><label for="coupon_code" class="screen-reader-text">Coupon:</label> <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="Coupon code"> <button type="submit" class="button" name="apply_coupon" value="Apply coupon">Apply coupon</button></div><button type="submit" class="button" name="update_cart" value="Update cart" disabled>Update cart</button></td></tr></tbody></table></form>`;
  const cartTotals = () => `<div class="cart_totals"><h2>Cart totals</h2><table cellspacing="0" class="shop_table shop_table_responsive"><tbody><tr class="cart-subtotal"><th>Subtotal</th><td data-title="Subtotal"><span class="woocommerce-Price-amount amount"><bdi>$312.00</bdi></span></td></tr><tr class="cart-discount coupon-welcome"><th>Coupon: welcome</th><td data-title="Coupon: welcome">-<span class="woocommerce-Price-amount amount"><bdi>$20.00</bdi></span> <a href="#" class="woocommerce-remove-coupon">[Remove]</a></td></tr><tr class="woocommerce-shipping-totals shipping"><th>Shipping</th><td data-title="Shipping"><ul id="shipping_method" class="woocommerce-shipping-methods"><li><input type="radio" name="shipping_method[0]" id="shipping_method_0_flat" value="flat_rate:1" class="shipping_method" checked><label for="shipping_method_0_flat">Standard: <span class="woocommerce-Price-amount amount"><bdi>$8.00</bdi></span></label></li><li><input type="radio" name="shipping_method[0]" id="shipping_method_0_exp" value="flat_rate:2" class="shipping_method"><label for="shipping_method_0_exp">Express: <span class="woocommerce-Price-amount amount"><bdi>$18.00</bdi></span></label></li></ul></td></tr><tr class="order-total"><th>Total</th><td data-title="Total"><strong><span class="woocommerce-Price-amount amount"><bdi>$300.00</bdi></span></strong></td></tr></tbody></table><div class="wc-proceed-to-checkout"><a href="#" class="checkout-button button alt wc-forward">Proceed to checkout</a></div></div>`;
  const cartEmpty = () => `<div class="woocommerce-notices-wrapper"></div><p class="cart-empty woocommerce-info">Your cart is currently empty.</p><p class="return-to-shop"><a class="button wc-backward" href="#">Return to shop</a></p>`;
  const crossSells = () => `<div class="cross-sells"><h2>You may be interested in…</h2><ul class="products columns-4">${[3,4,5,6].map(k => `<li class="product type-product"><a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">${img(k, 600)}<h2 class="woocommerce-loop-product__title">${products[k]}</h2><span class="price"><span class="woocommerce-Price-amount amount"><bdi>${prices[k]}</bdi></span></span></a><a href="#" class="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to cart</a></li>`).join('')}</ul></div>`;
  const field = (id, label, cls, opts) => { opts = opts || {}; const req = opts.optional ? '<span class="optional">(optional)</span>' : '<abbr class="required" title="required">*</abbr>'; const input = opts.select ? `<select name="${id}" id="${id}" class="country_to_state country_select select2-hidden-accessible"><option>${opts.select}</option></select><span class="select2 select2-container select2-container--default" style="width:100%"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox"><span class="select2-selection__rendered">${opts.select}</span><span class="select2-selection__arrow"><b role="presentation"></b></span></span></span></span>` : opts.textarea ? `<textarea name="${id}" class="input-text" id="${id}" placeholder="${opts.placeholder || ''}" rows="2"></textarea>` : `<input type="${opts.type || 'text'}" class="input-text" name="${id}" id="${id}" placeholder="${opts.placeholder || ''}" value="${opts.value || ''}" autocomplete="${opts.ac || 'off'}">`; return `<p class="form-row ${cls || 'form-row-wide'}${opts.invalid ? ' woocommerce-invalid woocommerce-invalid-required-field' : ''}" id="${id}_field"><label for="${id}">${label}&nbsp;${req}</label><span class="woocommerce-input-wrapper">${input}</span></p>`; };
  const billing = () => `<div class="woocommerce-billing-fields"><h3>Billing details</h3><div class="woocommerce-billing-fields__field-wrapper">${field('billing_first_name', 'First name', 'form-row-first', { value: 'Ana' })}${field('billing_last_name', 'Last name', 'form-row-last', { value: 'Marques' })}${field('billing_company', 'Company name', 'form-row-wide', { optional: true })}${field('billing_country', 'Country / Region', 'form-row-wide address-field', { select: 'Portugal' })}${field('billing_address_1', 'Street address', 'form-row-wide address-field', { placeholder: 'House number and street name' })}${field('billing_address_2', 'Apartment, suite, unit, etc.', 'form-row-wide address-field', { optional: true, placeholder: 'Apartment, suite, unit, etc.' })}${field('billing_postcode', 'Postcode / ZIP', 'form-row-wide address-field')}${field('billing_city', 'Town / City', 'form-row-wide address-field')}${field('billing_phone', 'Phone', 'form-row-wide', { type: 'tel' })}${field('billing_email', 'Email address', 'form-row-wide', { type: 'email', value: 'ana@example.com' })}</div></div><div class="woocommerce-account-fields"><p class="form-row form-row-wide create-account woocommerce-validated"><label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"><input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" id="createaccount" type="checkbox" name="createaccount" value="1"> <span>Create an account?</span></label></p></div>`;
  const shipping = () => `<div class="woocommerce-shipping-fields"><h3 id="ship-to-different-address"><label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"><input id="ship-to-different-address-checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" type="checkbox" name="ship_to_different_address" value="1"> <span>Ship to a different address?</span></label></h3><div class="shipping_address" style="display:none"></div></div><div class="woocommerce-additional-fields"><h3>Additional information</h3><div class="woocommerce-additional-fields__field-wrapper"><p class="form-row notes" id="order_comments_field"><label for="order_comments">Order notes&nbsp;<span class="optional">(optional)</span></label><span class="woocommerce-input-wrapper"><textarea name="order_comments" class="input-text" id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5"></textarea></span></p></div></div>`;
  const review = () => `<div id="order_review" class="woocommerce-checkout-review-order"><table class="shop_table woocommerce-checkout-review-order-table"><thead><tr><th class="product-name">Product</th><th class="product-total">Subtotal</th></tr></thead><tbody><tr class="cart_item"><td class="product-name">Linen Weekender Bag&nbsp; <strong class="product-quantity">×&nbsp;1</strong><dl class="variation"><dt>Colour:</dt><dd><p>Natural</p></dd></dl></td><td class="product-total"><span class="woocommerce-Price-amount amount"><bdi>$96.00</bdi></span></td></tr><tr class="cart_item"><td class="product-name">Stoneware Mug Set&nbsp; <strong class="product-quantity">×&nbsp;2</strong></td><td class="product-total"><span class="woocommerce-Price-amount amount"><bdi>$96.00</bdi></span></td></tr></tbody><tfoot><tr class="cart-subtotal"><th>Subtotal</th><td><span class="woocommerce-Price-amount amount"><bdi>$192.00</bdi></span></td></tr><tr class="woocommerce-shipping-totals shipping"><th>Shipping</th><td data-title="Shipping"><ul id="shipping_method" class="woocommerce-shipping-methods"><li><input type="radio" name="shipping_method[0]" id="sm_flat" value="flat" class="shipping_method" checked><label for="sm_flat">Standard: <span class="woocommerce-Price-amount amount"><bdi>$8.00</bdi></span></label></li><li><input type="radio" name="shipping_method[0]" id="sm_exp" value="exp" class="shipping_method"><label for="sm_exp">Express: <span class="woocommerce-Price-amount amount"><bdi>$18.00</bdi></span></label></li></ul></td></tr><tr class="order-total"><th>Total</th><td><strong><span class="woocommerce-Price-amount amount"><bdi>$200.00</bdi></span></strong></td></tr></tfoot></table></div>`;
  const payment = () => `<div id="payment" class="woocommerce-checkout-payment"><ul class="wc_payment_methods payment_methods methods"><li class="wc_payment_method payment_method_stripe"><input id="payment_method_stripe" type="radio" class="input-radio" name="payment_method" value="stripe" checked><label for="payment_method_stripe">Credit / debit card <img src="data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='96' height='24'><rect width='28' height='18' y='3' rx='3' fill='#1a1f71'/><rect width='28' height='18' x='34' y='3' rx='3' fill='#eb001b'/><rect width='28' height='18' x='68' y='3' rx='3' fill='#2e77bc'/></svg>")}" alt="Cards"></label><div class="payment_box payment_method_stripe"><p>Pay securely with your card. Your details are encrypted and never stored on this site.</p><p class="form-row form-row-wide"><label for="card-number">Card number</label><span class="woocommerce-input-wrapper"><input type="text" class="input-text" id="card-number" placeholder="1234 1234 1234 1234"></span></p></div></li><li class="wc_payment_method payment_method_ppcp-gateway"><input id="payment_method_ppcp" type="radio" class="input-radio" name="payment_method" value="ppcp"><label for="payment_method_ppcp">PayPal <img src="data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='64' height='24'><text x='0' y='18' font-family='Arial' font-weight='700' font-size='17' fill='#003087'>Pay</text><text x='32' y='18' font-family='Arial' font-weight='700' font-size='17' fill='#009cde'>Pal</text></svg>")}" alt="PayPal"></label><div class="payment_box payment_method_ppcp-gateway" style="display:none"><p>Pay via PayPal.</p></div></li><li class="wc_payment_method payment_method_cod"><input id="payment_method_cod" type="radio" class="input-radio" name="payment_method" value="cod"><label for="payment_method_cod">Cash on delivery</label><div class="payment_box payment_method_cod" style="display:none"><p>Pay with cash upon delivery.</p></div></li></ul><div class="form-row place-order"><div class="woocommerce-terms-and-conditions-wrapper"><div class="woocommerce-privacy-policy-text"><p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" class="woocommerce-privacy-policy-link">privacy policy</a>.</p></div><p class="form-row validate-required"><label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"><input type="checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" name="terms" id="terms"> <span class="woocommerce-terms-and-conditions-checkbox-text">I have read and agree to the website <a href="#" class="woocommerce-terms-and-conditions-link">terms and conditions</a></span>&nbsp;<abbr class="required" title="required">*</abbr></label></p></div><button type="submit" class="button alt" name="woocommerce_checkout_place_order" id="place_order" value="Place order">Place order</button></div></div>`;
  const chkLogin = () => `<div class="woocommerce-form-login-toggle"><div class="woocommerce-info">Returning customer? <a href="#" class="showlogin">Click here to login</a></div></div>`;
  // the real form is hidden until the toggle is clicked; the mock leaves it open so the design can be reviewed.
  // data-mock="coupon-error" adds the error WooCommerce injects after an empty submit, the state that breaks
  // any layout built on child order.
  const chkCoupon = (el) => `<div class="woocommerce-form-coupon-toggle"><div class="woocommerce-info">Have a coupon? <a href="#" class="showcoupon">Click here to enter your code</a></div></div><form class="checkout_coupon woocommerce-form-coupon" method="post">${(el && el.getAttribute('data-mock') === 'coupon-error') ? '<ul class="woocommerce-error" role="alert"><li>Please enter a coupon code.</li></ul>' : ''}<p>If you have a coupon code, please apply it below.</p><p class="form-row form-row-first"><label for="coupon_code" class="screen-reader-text">Coupon:</label><input type="text" name="coupon_code" class="input-text" placeholder="Coupon code" id="coupon_code" value=""></p><p class="form-row form-row-last"><button type="submit" class="button" name="apply_coupon" value="Apply coupon">Apply coupon</button></p><div class="clear"></div></form>`;
  const orderDetails = () => `<section class="woocommerce-order-details"><h2 class="woocommerce-order-details__title">Order details</h2><table class="woocommerce-table woocommerce-table--order-details shop_table order_details"><thead><tr><th class="woocommerce-table__product-name product-name">Product</th><th class="woocommerce-table__product-table product-total">Total</th></tr></thead><tbody><tr class="woocommerce-table__line-item order_item"><td class="woocommerce-table__product-name product-name"><a href="#">Linen Weekender Bag</a> <strong class="product-quantity">×&nbsp;1</strong></td><td class="woocommerce-table__product-total product-total"><span class="woocommerce-Price-amount amount"><bdi>$96.00</bdi></span></td></tr><tr class="woocommerce-table__line-item order_item"><td class="woocommerce-table__product-name product-name"><a href="#">Stoneware Mug Set</a> <strong class="product-quantity">×&nbsp;2</strong></td><td class="woocommerce-table__product-total product-total"><span class="woocommerce-Price-amount amount"><bdi>$96.00</bdi></span></td></tr></tbody><tfoot><tr><th scope="row">Subtotal:</th><td><span class="woocommerce-Price-amount amount"><bdi>$192.00</bdi></span></td></tr><tr><th scope="row">Shipping:</th><td>$8.00 <small class="shipped_via">via Standard</small></td></tr><tr><th scope="row">Payment method:</th><td>Credit / debit card</td></tr><tr><th scope="row">Total:</th><td><span class="woocommerce-Price-amount amount"><bdi>$200.00</bdi></span></td></tr></tfoot></table></section><section class="woocommerce-customer-details"><h2 class="woocommerce-column__title">Customer details</h2><section class="woocommerce-columns woocommerce-columns--2 woocommerce-columns--addresses col2-set addresses"><div class="woocommerce-column woocommerce-column--1 woocommerce-column--billing-address col-1"><h2 class="woocommerce-column__title">Billing address</h2><address>Ana Marques<br>Rua das Flores 12<br>1200-195 Lisboa<br>Portugal<p class="woocommerce-customer-details--phone">+351 912 345 678</p><p class="woocommerce-customer-details--email">ana@example.com</p></address></div><div class="woocommerce-column woocommerce-column--2 woocommerce-column--shipping-address col-2"><h2 class="woocommerce-column__title">Shipping address</h2><address>Ana Marques<br>Rua das Flores 12<br>1200-195 Lisboa<br>Portugal</address></div></section></section>`;
  const thankyou = () => `<div class="woocommerce-order"><p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">Thank you. Your order has been received.</p><ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details"><li class="woocommerce-order-overview__order order">Order number: <strong>1287</strong></li><li class="woocommerce-order-overview__date date">Date: <strong>September 16, 2026</strong></li><li class="woocommerce-order-overview__email email">Email: <strong>ana@example.com</strong></li><li class="woocommerce-order-overview__total total">Total: <strong><span class="woocommerce-Price-amount amount"><bdi>$200.00</bdi></span></strong></li><li class="woocommerce-order-overview__payment-method method">Payment method: <strong>Credit / debit card</strong></li></ul>${orderDetails()}</div>`;
  const acctNav = (active) => `<nav class="woocommerce-MyAccount-navigation" aria-label="Account pages"><ul>${[['dashboard','Dashboard'],['orders','Orders'],['downloads','Downloads'],['edit-address','Addresses'],['payment-methods','Payment methods'],['edit-account','Account details'],['customer-logout','Log out']].map(([k, l]) => `<li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--${k}${k === active ? ' is-active' : ''}"><a href="#">${l}</a></li>`).join('')}</ul></nav>`;
  const acctViews = {
    dashboard: () => `<p>Hello <strong>Ana</strong> (not Ana? <a href="#">Log out</a>)</p><p>From your account dashboard you can view your <a href="#">recent orders</a>, manage your <a href="#">shipping and billing addresses</a>, and <a href="#">edit your password and account details</a>.</p>`,
    orders: () => { const rows = [['1287','September 16, 2026','processing','Processing','$200.00',2],['1264','August 30, 2026','completed','Completed','$48.00',1],['1250','August 12, 2026','on-hold','On hold','$120.00',1],['1231','July 2, 2026','cancelled','Cancelled','$96.00',1],['1198','June 18, 2026','completed','Completed','$312.00',3]]; return `<div class="woocommerce-notices-wrapper"></div><table class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table"><thead><tr><th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-number"><span class="nobr">Order</span></th><th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-date"><span class="nobr">Date</span></th><th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-status"><span class="nobr">Status</span></th><th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-total"><span class="nobr">Total</span></th><th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-actions"><span class="nobr">Actions</span></th></tr></thead><tbody>${rows.map(([n, d, st, stl, t, c]) => `<tr class="woocommerce-orders-table__row woocommerce-orders-table__row--status-${st} order"><td class="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-number" data-title="Order"><a href="#">#${n}</a></td><td class="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-date" data-title="Date"><time datetime="2026-09-16">${d}</time></td><td class="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-status" data-title="Status">${stl}</td><td class="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-total" data-title="Total"><span class="woocommerce-Price-amount amount"><bdi>${t}</bdi></span> for ${c} item${c > 1 ? 's' : ''}</td><td class="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-actions" data-title="Actions"><a href="#" class="woocommerce-button button view">View</a></td></tr>`).join('')}</tbody></table>`; },
    'view-order': () => `<p>Order #<mark class="order-number">1287</mark> was placed on <mark class="order-date">September 16, 2026</mark> and is currently <mark class="order-status">Processing</mark>.</p>${orderDetails()}`,
    'orders-empty': () => `<div class="woocommerce-notices-wrapper"></div><div class="woocommerce-message woocommerce-info">No order has been made yet. <a class="woocommerce-Button wc-forward button" href="#">Browse products</a></div>`,
    'edit-address': () => `<p>The following addresses will be used on the checkout page by default.</p><div class="u-columns woocommerce-Addresses col2-set addresses"><div class="u-column1 col-1 woocommerce-Address"><header class="woocommerce-Address-title title"><h2>Billing address</h2><a href="#" class="edit">Edit</a></header><address>Ana Marques<br>Rua das Flores 12<br>1200-195 Lisboa<br>Portugal</address></div><div class="u-column2 col-2 woocommerce-Address"><header class="woocommerce-Address-title title"><h2>Shipping address</h2><a href="#" class="edit">Add</a></header><address>You have not set up this type of address yet.</address></div></div>`
  };
  const account = (view) => `<div class="woocommerce"><div class="woocommerce-notices-wrapper"></div>${acctNav(view)}<div class="woocommerce-MyAccount-content">${(acctViews[view] || acctViews.dashboard)()}</div></div>`;
  const loginForms = () => `<div class="woocommerce"><div class="woocommerce-notices-wrapper"></div><div class="u-columns col2-set" id="customer_login"><div class="u-column1 col-1"><h2>Login</h2><form class="woocommerce-form woocommerce-form-login login" method="post"><p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"><label for="username">Username or email address&nbsp;<span class="required">*</span></label><input type="text" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="username" autocomplete="username"></p><p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"><label for="password">Password&nbsp;<span class="required">*</span></label><input class="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password" id="password" autocomplete="current-password"></p><p class="form-row"><label class="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme"><input class="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever"> <span>Remember me</span></label><button type="submit" class="woocommerce-button button woocommerce-form-login__submit" name="login" value="Log in">Log in</button></p><p class="woocommerce-LostPassword lost_password"><a href="#">Lost your password?</a></p></form></div><div class="u-column2 col-2"><h2>Register</h2><form method="post" class="woocommerce-form woocommerce-form-register register"><p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"><label for="reg_email">Email address&nbsp;<span class="required">*</span></label><input type="email" class="woocommerce-Input woocommerce-Input--text input-text" name="email" id="reg_email" autocomplete="email"></p><p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"><label for="reg_password">Password&nbsp;<span class="required">*</span></label><input type="password" class="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_password" autocomplete="new-password"></p><div class="woocommerce-privacy-policy-text"><p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#">privacy policy</a>.</p></div><p class="woocommerce-form-row form-row"><button type="submit" class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit" name="register" value="Register">Register</button></p></form></div></div></div>`;
  // the Login Form / Register Form elements, as the builder's own templates render them: every field
  // is a .breakdance-form-field (the footer too, which is why the submit button fills the row), the
  // remember-me checkbox is a fieldset, and the lost-password link is appended to the LAST field,
  // so it lands inside the checkbox field rather than under the password input
  const bdeField = (type, id, label, extra) => `<div class="breakdance-form-field breakdance-form-field--${type}"><label class="breakdance-form-field__label" for="${id}">${label}<span class="breakdance-form-field__required">*</span></label><input class="breakdance-form-field__input" type="${type}" id="${id}" name="${id}" required>${extra || ''}</div>`;
  const bdePasswordLink = '<a class="breakdance-form-link breakdance-form-link--password" href="#">Forgot your password?</a>';
  const bdeFooter = (text) => `<div class="breakdance-form-field breakdance-form-footer"><button type="submit" class="breakdance-form-button breakdance-form-button__submit">${text}</button></div>`;
  const bdeForm = (kind) => kind === 'login'
    ? `<form id="login" class="breakdance-form breakdance-form--vertical" method="post">${bdeField('text', 'user_login', 'Email or username')}${bdeField('password', 'user_password', 'Password')}<div class="breakdance-form-field breakdance-form-field--checkbox"><fieldset role="group"><div class="breakdance-form-checkbox"><input type="checkbox" name="remember" value="1" id="remember-1"><label class="breakdance-form-checkbox__text" for="remember-1">Keep me signed in</label></div></fieldset>${bdePasswordLink}</div>${bdeFooter('Sign in')}</form>`
    : `<form id="register" class="breakdance-form breakdance-form--vertical" method="post">${bdeField('text', 'user_login', 'Username')}${bdeField('email', 'user_email', 'Email')}${bdeField('password', 'user_pass', 'Password')}${bdeFooter('Create account')}</form>`;
  const track = () => `<div class="woocommerce"><form action="#" method="post" class="woocommerce-form woocommerce-form-track-order track_order"><p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p><p class="form-row form-row-first"><label for="orderid">Order ID</label> <input class="input-text" type="text" name="orderid" id="orderid" placeholder="Found in your order confirmation email."></p><p class="form-row form-row-last"><label for="order_email">Billing email</label> <input class="input-text" type="text" name="order_email" id="order_email" placeholder="Email you used during checkout."></p><div class="clear"></div><p class="form-row"><button type="submit" class="button" name="track" value="Track">Track</button></p></form></div>`;
  const wrapEl = (cls, inner) => `<div class="${cls} breakdance-woocommerce">${inner}</div>`;
  const slots = {
    'cart-slot': () => wrapEl('bde-woopageshoppingcart', `<div class="woocommerce mock-cart-layout">${cartTable()}<div class="cart-collaterals">${cartTotals()}</div></div>${crossSells()}`),
    'items-slot': () => wrapEl('bde-woocartcontents', `<div class="woocommerce">${cartTable()}</div>`),
    'totals-slot': () => wrapEl('bde-woocarttotals', `<div class="woocommerce">${cartTotals()}</div>`),
    'empty-slot': () => wrapEl('bde-woocartemptymessage', `<div class="woocommerce">${cartEmpty()}</div>`),
    'cross-slot': () => wrapEl('bde-woocartcrosssells', `<div class="woocommerce">${crossSells()}</div>`),
    'chk-login-slot': () => wrapEl('bde-woocheckoutloginform', chkLogin()),
    'chk-coupon-slot': (el) => wrapEl('bde-woocheckoutcouponform', chkCoupon(el)),
    'chk-billing-slot': () => wrapEl('bde-woocheckoutbillingform', billing()),
    'chk-shipping-slot': () => wrapEl('bde-woocheckoutshippingform', shipping()),
    'chk-review-slot': () => wrapEl('bde-woocheckoutorderreview', review()),
    'chk-payment-slot': () => wrapEl('bde-woocheckoutpayment', payment()),
    'chk-classic-slot': () => wrapEl('bde-woopagecheckout', `<form class="checkout woocommerce-checkout"><div class="col2-set" id="customer_details"><div class="col-1">${billing()}</div><div class="col-2">${shipping()}</div></div><h3 id="order_review_heading">Your order</h3>${review()}${payment()}</form>`),
    'chk-mock-thankyou-slot': () => wrapEl('bde-checkout-builder', thankyou()),
    'account-slot': (el) => wrapEl('bde-woopageaccount', account(el.getAttribute('data-mock') || 'dashboard')),
    // data-mock="error" shows the failed-login notice WooCommerce prints into the wrapper
    'login-slot': (el) => wrapEl('bde-woopageaccount', el.getAttribute('data-mock') === 'error' ? loginForms().replace('<div class="woocommerce-notices-wrapper"></div>', '<div class="woocommerce-notices-wrapper"><ul class="woocommerce-error" role="alert"><li><strong>Error:</strong> The password you entered for the username <strong>ana</strong> is incorrect. <a href="#">Lost your password?</a></li></ul></div>') : loginForms()),
    'login-form-slot': () => `<div class="bde-login-form">${bdeForm('login')}</div>`,
    'register-form-slot': () => `<div class="bde-register-form">${bdeForm('register')}</div>`,
    'track-slot': () => wrapEl('bde-woopageordertracking', track())
  };
  function fillSlots() {
    document.querySelectorAll('[class*="-slot"]').forEach(el => {
      const cls = Array.from(el.classList).find(c => c.endsWith('-slot')); if (!cls) return;
      const key = Object.keys(slots).find(k => cls === k || cls.endsWith('-' + k)) || Object.keys(slots).find(k => cls.includes(k.replace('-slot', '')));
      if (key && !el.children.length && el.getAttribute('data-mock') !== 'none') el.innerHTML = slots[key](el);
    });
  }
  function run() { installBuilderCss(); expandLoops(); bind(); fillSlots(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
