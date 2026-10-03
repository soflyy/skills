# Accordions and FAQ sections

Eight variants built on native `<details>`/`<summary>`: no JavaScript, keyboard-accessible, and the converter keeps the tags. The open state is styled through `details[open]`. Copy the shared CSS once, then a variant's layout.

Shared CSS:

```css
.acc { border-top: 1px solid var(--line); }
.acc-item { border-bottom: 1px solid var(--line); }
.acc-summary { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 0; font: 500 18px/1.3 var(--font-body); color: var(--ink); cursor: pointer; list-style: none; transition: color .15s; }
.acc-summary::-webkit-details-marker { display: none; }
.acc-summary:hover { color: var(--ink-muted); }
.acc-summary:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; border-radius: 4px; }
.acc-icon { flex: none; width: 24px; height: 24px; display: grid; place-items: center; color: var(--ink-muted); transition: transform .25s ease; }
.acc-item[open] .acc-icon { transform: rotate(180deg); }
.acc-body { padding: 0 0 24px; max-width: 70ch; font: 16px/1.7 var(--font-body); color: var(--ink-muted); }
.acc-body p { margin: 0 0 1em; }
.acc-body p:last-child { margin: 0; }
```

Chevron icon used in the summaries:

```html
<svg class="acc-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg>
```

## FAQ 1: divider list, centred heading

Use when: a standard FAQ of 5 to 10 questions on a landing or support page.

```
            Frequently asked questions
      Everything you need to know before ordering.
  ─────────────────────────────────────────────
  Question                                     ⌄
  ─────────────────────────────────────────────
```

```html
<section class="section faq-1">
  <div class="container faq-1-inner">
    <div class="faq-head"><h2 class="section-title">Frequently asked questions</h2><p class="faq-intro">Everything you need to know before ordering.</p></div>
    <div class="acc">
      <details class="acc-item"><summary class="acc-summary">How long does shipping take? <svg class="acc-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg></summary><div class="acc-body"><p>Orders ship within 1 to 2 business days and arrive in 3 to 5.</p></div></details>
      <details class="acc-item"><summary class="acc-summary">Can I return an item? <svg class="acc-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg></summary><div class="acc-body"><p>Yes, within 30 days in original condition.</p></div></details>
    </div>
    <p class="faq-more">Still have questions? <a href="/contact/">Contact us</a></p>
  </div>
</section>
<style>
  .faq-1-inner { max-width: 760px; margin-inline: auto; }
  .faq-head { text-align: center; margin-bottom: 40px; }
  .faq-intro { margin: 12px 0 0; color: var(--ink-muted); font: 17px/1.6 var(--font-body); }
  .faq-more { margin: 32px 0 0; text-align: center; font: 15px/1.5 var(--font-body); color: var(--ink-muted); }
  .faq-more a { color: var(--ink); font-weight: 600; }
</style>
```

## FAQ 2: boxed cards

Use when: the section sits on a plain background and needs visual weight; 4 to 8 questions.

```
┌───────────────────────────────┐
│ Question                    + │
└───────────────────────────────┘
┌───────────────────────────────┐
│ Question                    − │
│ answer…                       │
└───────────────────────────────┘
```

```html
<div class="acc acc--boxed">
  <details class="acc-item acc-card"><summary class="acc-summary">Question <span class="acc-plus"></span></summary><div class="acc-body">…</div></details>
</div>
<style>
  .acc--boxed { border: 0; display: grid; gap: 12px; }
  .acc-card { border: 1px solid var(--line); border-radius: var(--radius); padding: 0 24px; background: var(--surface); transition: border-color .15s, box-shadow .15s; }
  .acc-card:hover { border-color: var(--ink); }
  .acc-card[open] { box-shadow: 0 12px 32px -16px rgba(0,0,0,.15); }
  .acc-plus { position: relative; flex: none; width: 24px; height: 24px; }
  .acc-plus::before, .acc-plus::after { content: ""; position: absolute; left: 50%; top: 50%; background: var(--ink); transition: transform .25s ease; }
  .acc-plus::before { width: 16px; height: 2px; transform: translate(-50%, -50%); }
  .acc-plus::after { width: 2px; height: 16px; transform: translate(-50%, -50%); }
  .acc-card[open] .acc-plus::after { transform: translate(-50%, -50%) rotate(90deg); }
</style>
```

## FAQ 3: two-column, heading and CTA left

Use when: a marketing page where the FAQ shares space with a short pitch and a contact CTA.

```
[ FAQ                      ] [ Question            ⌄ ]
[ Short intro copy.        ] [ Question            ⌄ ]
[ [ Contact support ]      ] [ Question            ⌄ ]
```

```html
<section class="section faq-3"><div class="container faq-3-grid">
  <div class="faq-3-side">
    <span class="eyebrow">FAQ</span>
    <h2 class="section-title">Questions, answered</h2>
    <p class="faq-intro">Can't find what you need? Our team replies within a day.</p>
    <a class="btn btn--secondary" href="/contact/">Contact support</a>
  </div>
  <div class="acc">…items…</div>
</div></section>
<style>
  .faq-3-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
  .faq-3-side { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); display: grid; gap: 16px; justify-items: start; }
  @media (max-width: 1023px) { .faq-3-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; } .faq-3-side { position: static; } }
</style>
```

## FAQ 4: numbered

Use when: a process or "how it works" told as steps that expand.

```
01  Choose your plan                          ⌄
02  Connect your store                        ⌄
03  Launch                                    ⌄
```

```html
<div class="acc acc--numbered">
  <details class="acc-item"><summary class="acc-summary"><span class="acc-num">01</span><span class="acc-q">Choose your plan</span><svg class="acc-icon" …></svg></summary><div class="acc-body acc-body--indent">…</div></details>
</div>
<style>
  .acc--numbered .acc-summary { justify-content: flex-start; }
  .acc-num { flex: none; width: 48px; font: 500 14px/1 var(--font-body); letter-spacing: .08em; color: var(--ink-muted); }
  .acc-q { flex: 1; }
  .acc-body--indent { padding-left: 48px; }
</style>
```

## FAQ 5: category tabs above the list

Use when: 15+ questions in groups (Orders, Shipping, Returns, Account). Tabs are anchor links to grouped lists; no script.

```
[ Orders ] [ Shipping ] [ Returns ] [ Account ]
Orders
  Question ⌄ …
Shipping
  Question ⌄ …
```

```html
<section class="section faq-5"><div class="container faq-5-inner">
  <nav class="faq-tabs" aria-label="FAQ topics"><a class="faq-tab" href="#faq-orders">Orders</a><a class="faq-tab" href="#faq-shipping">Shipping</a><a class="faq-tab" href="#faq-returns">Returns</a><a class="faq-tab" href="#faq-account">Account</a></nav>
  <section class="faq-group" id="faq-orders"><h2 class="faq-group-title">Orders</h2><div class="acc">…</div></section>
  <section class="faq-group" id="faq-shipping"><h2 class="faq-group-title">Shipping</h2><div class="acc">…</div></section>
</div></section>
<style>
  .faq-5-inner { max-width: 820px; margin-inline: auto; }
  .faq-tabs { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 72px); display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 0; background: var(--surface); z-index: 5; }
  .faq-tab { padding: 8px 14px; border: 1px solid var(--line); border-radius: var(--radius-pill); font: 500 14px/1 var(--font-body); color: var(--ink); text-decoration: none; }
  .faq-tab:hover, .faq-tab.is-active { background: var(--ink); color: #fff; border-color: var(--ink); }
  .faq-group { padding-top: 40px; scroll-margin-top: 140px; }
  .faq-group-title { margin: 0 0 12px; font: 600 22px/1.2 var(--font-display); }
</style>
```

## FAQ 6: sidebar contact card

Use when: support pages where reaching a human matters; the card stays beside the list.

```
[ Question ⌄ ]  ┌──────────────────┐
[ Question ⌄ ]  │ Need help?       │
[ Question ⌄ ]  │ chat · email     │
[ Question ⌄ ]  │ Mon-Fri 9-5      │
                └──────────────────┘
```

```html
<div class="container faq-6-grid">
  <div class="acc">…</div>
  <aside class="faq-6-card">
    <h3 class="faq-6-title">Need a hand?</h3>
    <p class="faq-6-text">Real people, Monday to Friday, 9 to 5.</p>
    <a class="btn btn--primary" href="/contact/">Email us</a>
    <a class="faq-6-link" href="tel:+15551234567">+1 555 123 4567</a>
  </aside>
</div>
<style>
  .faq-6-grid { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); gap: 48px; align-items: start; }
  .faq-6-card { position: sticky; top: calc(var(--wp-admin--admin-bar--height, 0px) + 96px); background: var(--surface-alt); border-radius: var(--radius); padding: 28px; display: grid; gap: 12px; justify-items: start; }
  .faq-6-title { margin: 0; font: 600 20px/1.2 var(--font-display); }
  .faq-6-text { margin: 0; color: var(--ink-muted); font: 15px/1.6 var(--font-body); }
  .faq-6-link { font: 500 15px/1 var(--font-body); color: var(--ink); text-decoration: none; }
  @media (max-width: 1023px) { .faq-6-grid { grid-template-columns: minmax(0, 1fr); } .faq-6-card { position: static; } }
</style>
```

## FAQ 7: compact, two columns of questions

Use when: many short answers (a glossary, a sizing FAQ) and the page is wide.

```html
<div class="acc acc--2col">…items…</div>
<style>
  .acc--2col { border: 0; columns: 2; column-gap: 48px; }
  .acc--2col .acc-item { break-inside: avoid; border-top: 1px solid var(--line); border-bottom: 0; }
  .acc--2col .acc-summary { font-size: 16px; padding: 16px 0; }
  .acc--2col .acc-body { font-size: 15px; padding-bottom: 16px; }
  @media (max-width: 767px) { .acc--2col { columns: 1; } }
</style>
```

## FAQ 8: product details accordion (on the product page)

Use when: the shopper wants specs, materials, care and shipping under the buy box without leaving it; items are dynamic where the product has data.

```
Description                                    ⌄
Details & care                                 ⌄
Shipping & returns                             ⌄
```

```html
<div class="acc acc--pdp">
  <details class="acc-item" open><summary class="acc-summary">Description <svg class="acc-icon" …></svg></summary><div class="acc-body" bd-woo="description"></div></details>
  <details class="acc-item"><summary class="acc-summary">Details <svg class="acc-icon" …></svg></summary><div class="acc-body" bd-woo="additional-info"></div></details>
  <details class="acc-item"><summary class="acc-summary">Shipping &amp; returns <svg class="acc-icon" …></svg></summary><div class="acc-body"><p>Ships in 1 to 2 business days. Free returns within 30 days.</p></div></details>
</div>
<style>
  .acc--pdp .acc-summary { font-size: 16px; padding: 16px 0; }
  .acc--pdp .acc-body { font-size: 15px; padding-bottom: 20px; }
</style>
```

A `bd-woo` marker must be an empty element; putting the marker on the `.acc-body` div is fine because the div is empty. The static shipping item is store copy; confirm the policy with the owner. This is the hand-built alternative to the `tabs` marker's accordion when the design wants its own items and styling.

## Notes

- Only one open at a time: add `name="faq"` to every `<details>` in a group (the HTML `name` attribute makes them exclusive in current browsers) and the converter preserves it as a custom attribute.
- Animating the open height needs JavaScript or `interpolate-size`; the patterns animate the icon and rely on the instant expand, which reads fine.
- For FAQ rich results, the answers should be real text in the page (they are), and an FAQPage schema can be added by an SEO plugin.
