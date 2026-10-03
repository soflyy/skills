# Navbars and mega menus

Eight navbar shells. Navbar 1 to 5 are plain navigation; Navbar 6 to 8 open panels and hand their internals to the **mega-menus** skill (`examples/vanilla-menus.md` for hand-built panels, `examples/recipes.md` for Menu Builder panels). All are header templates (`template_type: "everywhere"`). Shared: `.nav-link.is-active` is added automatically to the link matching the current page; mobile is a drawer (mega-menus example E) unless the variant says otherwise.

Shared CSS for the bars (include once):

```css
.nb-link { position: relative; display: inline-flex; align-items: center; height: 100%; padding: 0 14px; font: 500 15px/1 var(--font-body); color: var(--ink); text-decoration: none; transition: color .15s; }
.nb-link:hover { color: var(--ink-muted); }
.nb-link.is-active::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 18px; height: 2px; background: currentColor; }
.nb-link:focus-visible { outline: 2px solid var(--ink); outline-offset: -6px; }
.nb-burger { display: none; width: 44px; height: 44px; border: 0; background: transparent; cursor: pointer; position: relative; color: var(--ink); }
.nb-burger span, .nb-burger span::before, .nb-burger span::after { content: ""; position: absolute; left: 11px; width: 22px; height: 2px; background: currentColor; border-radius: 2px; }
.nb-burger span { top: 21px; } .nb-burger span::before { top: -7px; left: 0; } .nb-burger span::after { top: 7px; left: 0; }
```

## Navbar 1: logo left, links right

Use when: a small site or brand with 4 to 6 pages and no store. The optional search is the `bd-woo="search"` marker (site-wide search off a store; see **building-sites**); set it to modal mode with `edit-post`.

```
[ logo ]                                   [ link  link  link  link ]
```

```html
<header class="nb nb-1">
  <div class="container nb-1-inner">
    <a class="nb-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Brand" width="120" height="28"></a>
    <nav class="nb-1-nav" aria-label="Primary">
      <a class="nb-link" href="/about/">About</a><a class="nb-link" href="/work/">Work</a><a class="nb-link" href="/journal/">Journal</a><a class="nb-link" href="/contact/">Contact</a>
    </nav>
    <div bd-woo="search" class="nb-search"></div>
    <button class="nb-burger" aria-label="Menu"><span></span></button>
  </div>
</header>
<style>
  .nb { position: sticky; top: var(--wp-admin--admin-bar--height, 0px); z-index: 80; background: var(--surface); border-bottom: 1px solid var(--line); }
  .nb-logo img { display: block; height: 28px; width: auto; }
  .nb-1-inner { display: flex; align-items: center; justify-content: space-between; min-height: 72px; }
  .nb-1-nav { display: flex; align-self: stretch; }
  @media (max-width: 1023px) { .nb-1-nav { display: none; } .nb-burger { display: block; } }
</style>
```

## Navbar 2: links centred, CTA right

Use when: a SaaS or service site with one conversion action ("Book a demo", "Get started").

```
[ logo ]            [ link  link  link  link ]            [ Sign in ] [ CTA ]
```

```html
<header class="nb nb-2">
  <div class="container nb-2-inner">
    <a class="nb-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Brand" width="120" height="28"></a>
    <nav class="nb-2-nav" aria-label="Primary">
      <a class="nb-link" href="/product/">Product</a><a class="nb-link" href="/pricing/">Pricing</a><a class="nb-link" href="/customers/">Customers</a><a class="nb-link" href="/resources/">Resources</a>
    </nav>
    <div class="nb-2-actions">
      <a class="nb-link" href="/my-account/">Sign in</a>
      <a class="btn btn--primary nb-2-cta" href="/demo/">Book a demo</a>
      <button class="nb-burger" aria-label="Menu"><span></span></button>
    </div>
  </div>
</header>
<style>
  .nb-2-inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 72px; }
  .nb-2-nav { display: flex; justify-self: center; align-self: stretch; }
  .nb-2-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
  .nb-2-cta { min-height: 42px; padding: 0 18px; }
  @media (max-width: 1023px) { .nb-2-inner { grid-template-columns: auto 1fr; } .nb-2-nav, .nb-2-actions .nb-link { display: none; } .nb-burger { display: block; } }
</style>
```

## Navbar 3: centred logo, links split either side

Use when: fashion, beauty, hospitality; the logo is the hero.

```
[ link  link ]                [ LOGO ]                [ link  link ]  [ icons ]
```

```html
<header class="nb nb-3">
  <div class="container nb-3-inner">
    <nav class="nb-3-left" aria-label="Primary"><a class="nb-link" href="/shop/">Shop</a><a class="nb-link" href="/collections/">Collections</a></nav>
    <a class="nb-logo nb-3-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Brand" width="160" height="36"></a>
    <div class="nb-3-right">
      <nav class="nb-3-right-nav" aria-label="Secondary"><a class="nb-link" href="/about/">About</a><a class="nb-link" href="/journal/">Journal</a></nav>
      <div class="nb-3-tools"><div bd-woo="search" class="nb-search"></div><div bd-woo="mini-cart" class="nb-cart"></div><button class="nb-burger" aria-label="Menu"><span></span></button></div>
    </div>
  </div>
</header>
<style>
  .nb-3-inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 84px; }
  .nb-3-left, .nb-3-right { display: flex; align-self: stretch; align-items: center; }
  .nb-3-right { justify-content: flex-end; gap: 24px; }
  .nb-3-right-nav { display: flex; align-self: stretch; }
  .nb-3-logo img { height: 36px; }
  .nb-3-tools { display: flex; align-items: center; gap: 12px; }
  .nb-3 .nb-link { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; }
  @media (max-width: 1023px) { .nb-3-inner { grid-template-columns: auto 1fr; min-height: 68px; } .nb-3-left, .nb-3-right-nav { display: none; } .nb-burger { display: block; } }
</style>
```

## Navbar 4: utility bar plus main bar

Use when: a store or organisation that needs a thin top strip (shipping promise, phone, language, account) above the main navigation.

```
[ Free shipping over $75 ]                   [ Help ] [ Track order ] [ Account ]
[ logo ]  [ search........................ ]           [ links ]  [ cart ]
```

```html
<header class="nb nb-4">
  <div class="nb-4-util"><div class="container nb-4-util-inner">
    <p class="nb-4-promo">Free shipping over $75 · 30-day returns</p>
    <nav class="nb-4-util-links" aria-label="Utility"><a href="/faq/">Help</a><a href="/track-order/">Track order</a><a href="/my-account/">Account</a></nav>
  </div></div>
  <div class="container nb-4-main">
    <a class="nb-logo" href="/"><img src="/wp-content/uploads/logo.svg" alt="Brand" width="130" height="32"></a>
    <div bd-woo="search" class="nb-4-search"></div>
    <nav class="nb-4-nav" aria-label="Primary"><a class="nb-link" href="/shop/">Shop</a><a class="nb-link" href="/product-category/deals/">Deals</a><a class="nb-link" href="/shop/?orderby=date">New</a></nav>
    <div bd-woo="mini-cart" class="nb-cart"></div>
    <button class="nb-burger" aria-label="Menu"><span></span></button>
  </div>
</header>
<style>
  .nb-4-util { background: var(--ink); color: #fff; font: 500 13px/1 var(--font-body); }
  .nb-4-util-inner { display: flex; justify-content: space-between; align-items: center; min-height: 36px; }
  .nb-4-promo { margin: 0; }
  .nb-4-util-links { display: flex; gap: 20px; }
  .nb-4-util-links a { color: inherit; text-decoration: none; opacity: .85; }
  .nb-4-util-links a:hover { opacity: 1; }
  .nb-4-main { display: grid; grid-template-columns: auto minmax(0, 1fr) auto auto; gap: 28px; align-items: center; min-height: 76px; }
  .nb-4-nav { display: flex; align-self: stretch; }
  @media (max-width: 1023px) { .nb-4-util-links { display: none; } .nb-4-main { grid-template-columns: auto minmax(0,1fr) auto auto; gap: 12px; } .nb-4-nav { display: none; } .nb-burger { display: block; } }
  @media (max-width: 767px) { .nb-4-main { grid-template-columns: auto 1fr auto; } .nb-4-search { grid-column: 1 / -1; grid-row: 2; padding-bottom: 12px; } }
</style>
```

## Navbar 5: transparent over the hero, solid on scroll

Use when: a landing page or lookbook with a full-bleed hero image; the bar sits on the image and turns solid once the page scrolls.

```html
<header class="nb-5">
  <div class="container nb-5-inner">
    <a class="nb-logo" href="/"><img src="/wp-content/uploads/logo-white.svg" alt="Brand" width="120" height="28"></a>
    <nav class="nb-5-nav" aria-label="Primary"><a class="nb-link nb-5-link" href="/shop/">Shop</a><a class="nb-link nb-5-link" href="/story/">Story</a><a class="nb-link nb-5-link" href="/journal/">Journal</a></nav>
    <a class="btn btn--secondary nb-5-cta" href="/shop/">Shop now</a>
  </div>
</header>
<style>
  .nb-5 { position: fixed; top: var(--wp-admin--admin-bar--height, 0px); left: 0; right: 0; z-index: 80; color: #fff; transition: background .25s, color .25s, box-shadow .25s; }
  .nb-5-inner { display: flex; align-items: center; justify-content: space-between; min-height: 80px; }
  .nb-5-link { color: inherit; }
  .nb-5-link:hover { color: inherit; opacity: .75; }
  .nb-5-cta { color: inherit; border-color: currentColor; }
  .nb-5.is-scrolled { background: var(--surface); color: var(--ink); box-shadow: 0 1px 0 var(--line); }
  .nb-5.is-scrolled .nb-logo img { filter: invert(1); }   /* or swap to the dark logo with a second <img> */
</style>
```

Add the scrolled state with `set-element-interactions` on the header: trigger `page_scrolled` → `add_class` `is-scrolled` (and a matching remove on scroll back up if the trigger exposes a distance option; read the schema). The hero underneath needs top padding equal to the bar height. The Header Builder element offers this natively through `design.sticky.scroll_behavior` and `design.overlay` if you prefer controls.

## Navbar 6: full-width mega panel

Use when: a store with 4 to 8 categories each holding 6 to 20 subcategories.

```
[ logo ]   [ Women ▾  Men ▾  Kids ▾  Home ▾  Sale ]          [ search ] [ account ] [ cart ]
           ┌──────────────────────────────────────────────────────────────┐
           │ Group      Group      Group      Group      │ [tile] [tile] │
           │ link       link       link       link       │               │
           └──────────────────────────────────────────────────────────────┘
```

Shell and panel: **mega-menus** `examples/vanilla-menus.md` example A (hover, `:focus-within`, `:has()` overlay) or `examples/recipes.md` recipe 1 (Menu Builder). Both take their categories from nested term loops.

## Navbar 7: mega panel with a featured tile and promo

Use when: merchandising matters as much as navigation (beauty, home, gifts); each panel carries one large image tile and a short promo line beside three link columns.

```
┌──────────────────────────────────────────────────────────────────┐
│ Group   Group   Group   │ ┌──────────────┐  Spring edit           │
│ link    link    link    │ │  image tile  │  New arrivals in       │
│ link    link    link    │ │              │  linen and stone.      │
│ View all →              │ └──────────────┘  [ Shop the edit ]     │
└──────────────────────────────────────────────────────────────────┘
```

Take Navbar 6's shell and replace the panel inner with:

```html
<div class="container mp-inner">
  <div class="mp-cols"><div class="mp-col-slot"></div></div>
  <aside class="mp-feature">
    <a class="mp-feature-img" bd-href="term_permalink"><img bd-src="woocommerce_category_image" bd-alt="term_name"></a>
    <div class="mp-feature-copy">
      <span class="eyebrow">Spring edit</span>
      <p class="mp-feature-text">New arrivals in linen and stone.</p>
      <a class="btn btn--secondary" bd-href="term_permalink">Shop the edit</a>
    </div>
  </aside>
</div>
<style>
  .mp-inner { display: grid; grid-template-columns: minmax(0, 1fr) 520px; gap: 48px; padding: 36px 0 44px; }
  .mp-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
  .mp-feature { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 24px; align-items: center; padding-left: 48px; border-left: 1px solid var(--line); }
  .mp-feature-img img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: var(--radius); }
  .mp-feature-copy { display: grid; gap: 12px; justify-items: start; }
  .mp-feature-text { margin: 0; font: 500 20px/1.3 var(--font-display); }
</style>
```

The static promo copy is curated per panel; put it in the item component and override per instance with editable properties (Oxygen 6) or accept one promo line for all panels.

## Navbar 8: "All departments" flyout beside the search

Use when: a marketplace or grocery store with more than 8 departments; the bar shows search, account and cart, and a single "All" button opens a full-height department list with a second pane.

```
[ ≡ All ] [ logo ]  [ search........................................ ]  [ account ] [ cart ]
[ Deals ] [ New ] [ Gift cards ] [ Help ]
```

Shell: Navbar 4's main row with the button first. Panel: **mega-menus** `examples/vanilla-menus.md` example C. The second row of quick links is plain `.nb-link`s.
