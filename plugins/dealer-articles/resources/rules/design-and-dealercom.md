# Dealer.com (DDC) platform rules for articles
Read this at Phase 2 of `/dealer-articles:article-dealercom`. The design is the same **Editorial v2** as Apollo (`design-and-apollo.md` §1–3), with four differences:
- the fonts come from the dealer file's `style.fonts` (the site's theme font faces or a system stack, with Georgia / Helvetica / Arial fallbacks). There is no `@import`, so no Google Fonts and no Roboto import;
- the brand color on links only, plus an optional corner radius from the dealer file's `style.radius` (a recorded brand exception, e.g. square corners);
- no H1 in the block: the Dealer.com page shell prints the page name as the H1;
- a different package (below).

## 1. How Dealer.com treats a pasted article (why the build does what it does)
- **Paste target.** A **content page** with a **Custom HTML component**. Dealer.com supplies the page shell: head, header, navigation, footer, site CSS and scripts.
  - Never a blog post (`/blog/…` or a `wbp-` blog-roll post): the blog editor may strip the `<style>` block.
  - The team creates the page, uploads the photos and pastes. The agent never logs in to Dealer.com.
- **Block shape.** One scoped `<style>`, one wrapper `<div class="<p>-art <p>-art-<slug>">` with the article, and the JSON-LD `<script>` as the last node. The file ends on `</div>`, with nothing after it.
  - It may be multi-line: Dealer.com has no wpautop (a multi-line 87 KB page went live fine).
  - No doctype, html, head, body, title, meta or link tags.
  - No script other than the JSON-LD (only JSON-LD is proven to survive). So there is no helper script: phones are written-out `tel:` links and the hours are text.
- **Tag-pair validator.** On save, Dealer.com counts tag text inside comments as real tags and rejects the block ("Tag must be paired"). So the block has no `<` inside any CSS or HTML comment.
  - "Missing `</div>`" on a valid file almost always means a cut-off copy: copy the whole file again (Notepad, Ctrl+A).
- **CSS reformatter.** On publish, Dealer.com reformats the `<style>` block (re-spaces commas, moves comments). It also inserts spaces around a `/` followed by a digit, which breaks `@import` and `url()` paths that carry a version number. So:
  - no `@import` at all;
  - no icon fonts; icons are inline SVG.
- **Theme.**
  - The theme sets a root font size below 16px, so the CSS is **px only** and the wrapper sets its own px font size (a `rem` value would render small).
  - The content area can left-align: centered blocks set `text-align:center`, `margin:0 auto` and `justify-content:center` with `!important`.
  - The theme's link and button rules strip fills: CTA `background`, `color` and `border` carry `!important`.
  - Generic class names (`row`, `grid`, `card`, `btn`, `container`, `section`, `hero`, `media`, `copy`, `wrapper`) collide with the theme. Every class carries the dealer prefix (`<p>-art…`).
  - No inline `style=` and no `transition: all`.
  - Wide brand fonts (e.g. Cadillac Gothic Wide) render 25–40% wider live than in the preview. Keep button and CTA labels short (2–3 words).
- **H1.** The shell prints the **page name** as the page's only H1.
  - The block has 0 `<h1>`: its header starts with the eyebrow and the dek.
  - The Dealer.com page name must be the exact article H1 (the Page name line of `<slug>-SEO.md`).
  - Never hide the shell's title with CSS or JS.
- **Phones and hours.** No Dealer.com phone or hours token is known.
  - The block uses the dealer-file numbers, verified on the About Us page (`ddc.aboutPath`) from a US location, as real `tel:` links. A build gate checks that they equal the dealer file.
  - The site header may rotate call-tracking numbers, and the site's own schema may list another number: About Us wins.
  - Hours are text from the dealer file. Never mix service hours with the site-wide sales hours.
- **Schema.** Dealer.com keeps body JSON-LD (verified 07/05/2026). Its own site-wide AutoDealer node has no `@id`, so a reference to it would point at nothing. The block defines its own nodes, each with its own `@id`:
  - AutoDealer `<domain>/#organization`, with facts equal to the dealer file (name, address, geo, phones)
  - BlogPosting
  - FAQPage, mirroring the visible FAQ

  Never copy the site schema's `areaServed` (it can list towns the store must not claim). Local framing comes from the dealer file's `areas` only.
- **Images.**
  - The store's Dealer.com **Media Library**: `https://pictures.dealer.com/<letter>/<account>/…`. Each store has its own base (`ddc.media`), so never borrow another store's URL.
  - A real file returns the image; a wrong file name on the same path returns HTTP 403.
  - Placement is the same as Apollo:
    - hero ≥1900 px wide is full-bleed, otherwise `heroContained`;
    - figure ≥1100 px;
    - prose figure 880 px;
    - pair ≥800 px.
- **Dates.** Visible dates are MM/DD/YYYY ("Updated 10/12/2026").

## 2. Hand-entry fields (Dealer.com), one line each in `<slug>-SEO.md`
**Page:**
- Page name = the article H1, exactly (the shell prints it as the page's H1)
- URL

**MetaData Editor** (it has only these two fields):
- Title (50–65 characters), typed exactly as given, without the dealer name. Dealer.com shows a filled Title unchanged; an empty Title falls back to the page name + " | <dealer name>" (seen live 10/12/2026: pages with no Title showed the dealer name twice). Never leave it empty.
- Description (130–165; never empty: pasted pages without one had no meta description live)

**Reference only:** focus keyphrase (there is no field for it).

**Not available:** canonical, robots, OG and Twitter fields. Dealer.com owns the head, so never add these tags to the block. The hero lives in the schema (BlogPosting `image`).

## 3. Design QA differences (`design-and-apollo.md` §4)
- The preview `<slug>-preview.html` wraps the block in a Dealer.com page shell that prints the page name as the H1. "Exactly one visible H1" holds there; the block itself has none.
- The preview shows the font fallbacks, not the live theme fonts. Labels that only just fit in the preview overflow live with a wide brand font: list them as "check on the live page".
- Check that the buttons keep their ink fill and that centered sections are centered.

## 4. Live checks after publishing
Open the URL with `?cb=<anything>` in a normal browser and check:
- the save gave no "Tag must be paired" error, and the whole article is there (FAQ and fine print at the end)
- exactly one H1: the page name, equal to the article H1
- buttons keep their fill and their labels fit on one line; centered sections are centered
- phone numbers are links and match the handoff; the hours show
- images load
- FAQ items open
- the Rich Results Test detects Article + FAQ, with no errors
- in the page source: `<title>` is the MetaData Title, and `<meta name="description">` is the new MetaData Description
- the page URL is the URL line of the sheet; if Dealer.com assigned another one, rebuild with the real URL (the JSON-LD `url` and `@id`s use it)

Some dealer sites block automated fetches. Check in a normal browser.

## 5. The current Dealer.com stores (Brickell CDJR, Ocean Cadillac, Brickell Buick GMC)
- **The brand terms ledger applies** (`brand-terms.json`): the LAW-* rows. No OEM wording rows exist yet for Stellantis (Chrysler, Dodge, Jeep, Ram), Cadillac or Buick/GMC; add one when an OEM review fails some wording.
- **State law: Florida** (all three stores are in Miami). Pointers: Fla. Stat. §501.976 and FDUTPA (`compliance.md` §4). Every MSRP figure says it is not a dealer selling price and states destination (LAW-MSRP-01/02).
- **Naming:**
  - `brand` is the full string the compliance checks use ("Chrysler Dodge Jeep Ram", "Cadillac", "Buick GMC"); `brandShort` is the copy-friendly phrase the build uses in its own lines;
  - model and program names exactly as the OEM writes them; the dealer file's `brandNaming` lines win.
- **Claims:** no "factory-trained", "certified technician", "price match" or "guarantee" wording in articles, even where a store's service pages use it (global banned list). An offer's official name appears only as the label of a link to that offer, through the dealer file's `allowPhrases`.
- **Climate:** hot, humid South Florida; no snow, road salt or winter (dealer `bans`).
