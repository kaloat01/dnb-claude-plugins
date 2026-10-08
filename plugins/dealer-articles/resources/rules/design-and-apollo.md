# Design (Editorial v2) and the Apollo platform

The build engine (`node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"`) owns all markup and CSS. You change the article only
through `module.js`; never hand-edit generated files and never write ad-hoc CSS. This file tells you what the design is,
why it is locked, and what to check in the screenshots and on the live page.

## 1. Editorial v2 (LOCKED, identical for every dealer and platform)

**Tokens:** ink #111111 · text #333333 · muted #666666 / soft #777777 · marker #8A9099 · line #E0E0E0 · panel #F5F5F5 ·
closer #0A0A0A · radius 2px · link = the dealer's link color (the only brand token).

**Typography:**
- Headings: Georgia (serif), weight 400. Body: Roboto 18–19px, line-height 1.7–1.75 (loaded by an `@import` on the first
  line of the site-wide CSS).
- H1: 32 → 40 → 48px (mobile → tablet → desktop); long approved H1s (100+ characters) step down.
- H2: 26 → 30 → 32px, with a 44px ink rule above (no counter, no number).
- H3: body sans, 20px, 700.
- Breakpoints used by the engine: 640, 768, 1100px. px units only (no `rem`).

**Width tiers:** prose 760–800px · data blocks 920px (glance, TOC, tables, stats, inline CTA) · figures and pairs
1,120–1,160px · hero full-bleed to 1,440px at 12:5 (contained 16:9 when the source is under ~1,900px) · narrow figure 880px.

**Modules:**
- At a glance: gray panel, 3px ink top rule, 2-column square bullets.
- TOC: 3 columns on desktop, small gray square bullets, **no numbers**.
- Tables: hairlines, gray header with 1px ink rule, bold first column, horizontal scroll on mobile, source note below.
- Callout: gray panel, 2px ink left rule (verbatim OEM/legal quotes).
- Steps: plain serif 1, 2, 3 in gray. Checklist: check bullets. Stat strip: 3 columns, serif numerals.
- Inline CTA: ink rules top and bottom. Buttons: ink, uppercase, letter-spacing 0.08em, 2px radius; white + ghost on dark.
- FAQ: 2 columns, a 300px sticky intro with the phone line, `<details>` accordions with +/− markers.
- Dealership section: gray panel, 3px ink top rule; storefront photo left; black brand band with the white logo; eyebrow,
  H2, paragraph, facts list (address, department phone, department hours, other department phone), ink + outline buttons.
- Closer: black full-bleed band, centered, "<Department> Hours:" line, 2 CTAs.
- Keep reading: 3 cards with a 2px ink top rule. Fine print last.
- Everything is scoped to one root class with the dealer prefix (`.<p>-art`); chrome outside the root is reached only via
  `body:has(.<p>-art)` / `#custompageblock:has(.<p>-art)`.

## 2. Brand color on LINKS ONLY

The only per-dealer changes are:
1. the **link color** (+ hover), from the dealer's brand interactive color, at ≥4.5:1 contrast on white;
2. the **dealer logo/name** in the dealership section's brand band.

*Incident:* the first Honda pilot (Honda blue on rules, markers and buttons, the theme's heavy 800-weight heading font, 8px
corners, tinted gray) was rejected as "not like the Mercedes reference: far too much brand styling". Later a "light brand
layer" (accent rules, button fills, radius) was proposed and withdrawn by the user the same day. **Do not reintroduce
brand-colored rules, buttons, panels, closers or OEM heading fonts.**

**Forced exceptions only** (never taste). Each is recorded in the dealer file `style.exceptions` with its source:
- A written brand rule forbids a v2 token (e.g. a luxury brand that forbids rounding → radius 0; a brand with no permitted
  chromatic link color → ink links with underline).
- The platform or dealer forbids font imports → Georgia headings + a system sans body instead of the Roboto import.
- The platform forces specificity → Apollo heading guards use `!important` even when a dealer guide says "no !important"
  (`style.importantWaiver: true`, with the reason).
If a user asks for "more brand", explain this rule and offer a side-by-side preview; do not restyle on request without an
explicit decision recorded in the dealer file.

## 3. Image rhythm and placement

- Every article: **hero + 2 full-width figures + 1 pair** (+ an optional narrow figure), plus storefront + logo in the
  dealership section. *("It seems shorter" turned out to be one figure instead of two, not a word-count problem.)*
- Place by real resolution (the `images` command reads it): hero ≥1,900px → full-bleed 12:5, else contained 16:9 ·
  full figure ≥1,100px · narrow figure (880px) for ~900px images · pair for ≤1,000px or square images · never upscale ·
  no image used twice.
- The 12:5 hero crop must still show the subject (the vehicle, not sky or asphalt). Check it at 1280 and 375.
- Rival vehicles never appear in photos. Details: `${CLAUDE_PLUGIN_ROOT}/resources/rules/image-brief.md`.

## 4. Design QA (read the screenshots, every build that changes layout)

Run `build.js shot <job>` and Read `qa/preview-1280.png` and `qa/preview-375.png`. Check:
- [ ] Exactly **one visible H1**, at full size (not 20px), in Georgia.
- [ ] H2/H3 headings in Georgia/sans as specified; **no theme font leak** (the dealer file's `apollo.themeFont`, e.g. Nunito,
      must not appear in headings or body).
- [ ] Buttons and cards **not underlined**; button text readable (white on ink, ink on white).
- [ ] Links in the dealer link color; nothing else brand-colored.
- [ ] Grids intact: glance 2 columns, TOC 3, stat strip 3, pair 2, FAQ 2, dealership 2, keep-reading 3 (desktop); all stack
      cleanly at 375.
- [ ] **No horizontal overflow at 375** (tables scroll inside their wrapper, nothing pokes past the gutter).
- [ ] Images load (lazy images: the engine scrolls first); crops show the subject; no placeholder left in a FINAL build.
- [ ] No "01, 02" numbering; no stand-alone bold line; bold answers run inline.
- [ ] Rhythm: hero, then text, tables and figures alternating; no two figures back to back; no wall of text longer than
      ~2 screens without a table, figure or callout.
- [ ] Dealership section, closer and keep-reading cards present; phone and hours lines read correctly.
Compare structure with the shipped example in `${CLAUDE_PLUGIN_ROOT}/resources/examples/` when unsure (words, H2s, figures,
pairs, tables, callouts, steps, stats, FAQ count, links, block order). Differences must be intentional.

**Using `/frontend-design` here:** only as a craft and QA lens inside the locked Editorial v2: rhythm, hierarchy,
alignment, spacing consistency, crop quality, mobile readability. It must NOT change fonts, colors, layout, modules,
radius or add brand styling, and it never edits generated files. Turn its findings into module-level changes (block order,
image choice/placement, shorter captions, split long paragraphs) and rebuild.

## 5. Apollo platform (Team Velocity, Gemini theme)

**Page type:** a **custom page** (content lives in `#custompageblock > .editor`). **Never a blog post:** the Apollo blog
editor strips classes, divs, styles and `<details>`, caps width at 70% with a sidebar, and prints no H1.
**URL:** extensionless root slug, no trailing slash (`/honda-trade-in-value-miami-guide`). `.html` root slugs are hijacked
by inventory routing. The canonical equals that exact URL.

**The 4 paste slots (in this order):**
1. **Site-wide CSS slot** (applies to every page): `<p>-articles-sitewide-CSS.html`. Paste **once per dealer**. One
   `<style>` block, Roboto `@import` first, every rule scoped to `.<p>-art`, no icon kit, no scripts. Re-paste only when the
   `dealer-articles css <hash>` comment differs from what is live.
2. **Page HTML:** `<slug>-HTML.html`. It must be a **fragment**: it starts with `<div class="<p>-art <p>-art-<slug>">` and
   ends with `</div>`; no doctype, html, head, body, title, meta, link, style or script. *(A service page whose root class sat
   on `<body>` went live unstyled: the browser drops a nested body's class.)*
   **Phone numbers = Apollo merge tags** (live-tested 10/07/2026): in the page HTML every sales number is `#SalesNumber` and every service number `#ServiceNumber` (text and `tel:` links); Apollo swaps in the dealer's number. The builder does this automatically; the preview shows real numbers. **Never** put a tag in Structured Data: Apollo does not replace it there, and an unquoted tag breaks the JSON-LD (the builder fails the build if it finds one).
3. **Custom Structured Data:** `<slug>-Structured-Data.txt`, raw JSON (not wrapped in `<script>`), with **"Replace Structured
   Data" checked** (unchecked = appended to the theme's own schema). Graph: WebSite, WebPage (`primaryImageOfPage` = hero),
   BreadcrumbList, AutoDealer + AutoRepair `#organization` with department nodes and hours, BlogPosting, FAQPage.
4. **SEO Settings form:** from `<slug>-SEO.md`, one line per field (`* Field  →  value`). **H1 Tag Text: leave blank** (the
   H1 is in the content). Page Title 50–65 chars; Meta Description 130–165; Canonical Url = the page URL; OG Site Name
   `#DealerName`; OG Title/Description; OG Locale `en_US`; Meta Keywords empty; robots checkboxes all unchecked. Type
   plain text (decode `&amp;` etc.). **There is no og:image field:** Apollo emits its own (the logo), so the hero image lives
   in the schema (WebPage `primaryImageOfPage`, BlogPosting `image`).

**Theme traps (why the engine adds guards; verify they hold in screenshots):**
- `body h1{font-size:20px!important}` → guarded by `body .<p>-art h1.<p>-title{font-size:…!important}`.
- `h1,h2,h3{font-family:var(--fontBold)!important;font-weight:800}` and `body{font-family:…!important}` → guarded by a
  scoped Georgia `!important` family on headings (weight 400) and an explicit body family on the root.
- `.editor a:not(.no-hover){color:#212529;text-decoration:underline}` + `:hover{color:inherit}` and Bootstrap
  `a:hover{text-decoration:underline}` → scoped link/button guards (specificity 0,2,2+, no `!important`).
- `.custom-bgcolor{background:#f5f5f5}` on some wrappers → `#custompageblock:has(.<p>-art){background:#fff;padding:0}`.
- Bootstrap reboot `h2{font-size:2rem}`, `p{margin-bottom:1rem}` → explicit px sizes and margins inside the root.
The local preview links the dealer's real CDN theme CSS and wraps the content in the Gemini shell
(`#_website_gemini … #custompageblock > .editor`), so the preview shows true theme interference.

**Images:**
- URL: `https://service.secureoffersites.com/images/GetLibraryImage?fileNameOrId=<ID>`.
- The engine appends `&type=webp&quality=85` to every image and `&Width=1920&Height=0` when the source is wider than
  2,400px (one article dropped from ~16 MB to ~2 MB). Logos need `&Width=0&Height=0&logo=y` (HTTP 406 without it).
  IDs that already carry parameters are left alone. In HTML `src`, `&` is written as `&amp;`.
- Some IDs return **HTTP 406** to plain scripts; request with browser headers (a browser User-Agent and
  `Accept: image/avif,image/webp,image/*`). Browsers are fine. `build.js images <job>` verifies 200 + `image/*`, saves each
  file and reads its real size.
- How the user finds an Image ID: `${CLAUDE_PLUGIN_ROOT}/resources/rules/image-brief.md`. Never edit, upload or delete in
  the dealer's Apollo library yourself.

**Post-publish checks (give these to the user, or run them if you can fetch the live page):**
1. Fetch the live URL cache-busted (`?cb=<timestamp>`). Exactly **one visible H1** (the article's).
2. Headings render in Georgia, body in Roboto; buttons not underlined; FAQ accordions open and close; all images load.
3. `<title>`, meta description and canonical equal the SEO sheet; no `noindex`.
4. Structured data: run the URL through Google's Rich Results Test; BlogPosting and FAQPage detected; FAQ count equals the
   visible FAQ.
5. Text fidelity: the live article text matches the build (spot-check the first bold answer, a table and the last FAQ).
6. Spot-check two other pages on the site (the CSS is site-wide; it must not change them).
7. Report every gap as a plain user action ("Page Title field → paste `…`").
