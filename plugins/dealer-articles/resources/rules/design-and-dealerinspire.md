# DealerInspire (WordPress) platform rules for articles
Read this at Phase 2 of `/dealer-articles:article-dealerinspire`. The design is the same **Editorial v2** as Apollo (`design-and-apollo.md` §1–3), with three differences:
- the dealer's own fonts, from the dealer file's `style.fonts` (the Mercedes stores use Corporate A/S, falling back to Georgia/Roboto);
- the brand color on links only;
- a different package (below).

## 1. How DealerInspire treats a pasted article (why the build does what it does)
- **Paste target.** WordPress page, **Text** tab: Page Composer "Use WordPress Content", or a Classic post's Text tab.
  - The **Visual** tab rewrites the markup.
  - A **Raw HTML** block stops the `[di_*]` shortcodes and the helper script.
- **wpautop.** WordPress wraps loose inline runs in `<p>` and turns line breaks into `<br>`. The build handles this:
  - The paste file is **one line**.
  - Every flex/grid child is a block element.
  - Cards use a stretched link; an `<a>` wrapping blocks gets cloned.
  - The inline CSS hides empty/stray `<p>`, `<br>` and script paragraphs, and sets `display:contents` on wrapper paragraphs.
- **Theme.**
  - `html{font-size:10px}`, so the CSS is **px only** (a `rem` value would render at 62.5%).
  - The theme colors and underlines every link and sizes headings under `#di-page-composer`. The inline CSS answers with `#di-page-composer`-prefixed sizes and `!important` + `-webkit-text-fill-color` on buttons and links. That is a documented platform exception, scoped to `.<p>-art`.
  - The theme's own page title (`.entry-title`) is hidden while the article is on the page, so exactly **one H1** shows: the article's.
  - On post templates the sidebar column and the date line are hidden.
- **Phones and hours.**
  - `[di_option option="di_phone_service|di_phone_sales"]` prints the site's own number, which may be call-tracked. The helper script makes it a `tel:` link.
  - `[di_hours department="Service|Sales"]` prints a list, which the helper condenses to one line.
  - Only shortcodes verified for that store are used (`di.shortcodes`, `di.hoursDepartments`). Anything else falls back to the dealer-file number or hours text, with a build warning.
  - The JSON-LD keeps the real numbers, because shortcodes do not run inside it reliably.
- **Schema.** Yoast already prints WebPage, WebSite, Organization and Breadcrumb. The embed adds only these, each with its own `@id`:
  - AutoDealer+AutoRepair (`/#autodealer`, never Yoast's `#organization`)
  - BlogPosting
  - FAQPage, mirroring the visible FAQ

  There are no fixed opening hours in the schema; they come live from `[di_hours]`.
- **Images.**
  - The store's WordPress Media Library: `https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`. Each store has its own library, so never borrow another store's URL.
  - Use the original file, not a `-WxH` resized copy.
  - Placement is the same as Apollo:
    - hero ≥1900 px wide is full-bleed, otherwise `heroContained`;
    - figure ≥1100 px;
    - prose figure 880 px;
    - pair ≥800 px.

## 2. Hand-entry fields (Yoast + WordPress), one line each in `<slug>-SEO.md`
**WordPress fields:**
- Title (the H1 text)
- Slug
- Parent page (California article pages) or Category (posts)
- Featured image = the hero

**Yoast fields:**
- SEO title (50–65 characters)
- Meta description (130–165)
- Focus keyphrase

**Social tab:**
- Facebook title, description and image (image = hero)
- Twitter title, description and image (image = hero)

**Never leave a social image empty.** DealerInspire then falls back to a 200×200 theme default, as seen live on 10/07/2026. Delete Yoast's snippet-variable pills before typing. Leave the canonical field empty.

## 3. Live checks after publishing
Use DealerInspire **Reload Cache**, then open the URL with `?cb=<anything>` and check:
- one visible H1
- phone numbers are links
- the hours show on one line
- images load
- buttons are not underlined
- FAQ items open
- the Rich Results Test detects Article + FAQ
- the page `<title>`, meta description and `og:image` are the new Yoast values (not the theme default)

Some DealerInspire sites block automated fetches (Cloudflare). Check in a normal browser.

## 4. Mercedes-Benz specifics (the current DealerInspire stores)
- **The brand terms ledger applies** (`brand-terms.json`, MB-001…004):
  - "offer", never "coupon";
  - no distress words or invoice/rebate wording;
  - no unsubstantiated superlatives.
- **State law.** California stores fall under SB 766 (LAW-CA-01: no `$` figures without model-level OEM MSRP in a labeled table and dealer-counsel sign-off). Virginia stores: dealer-counsel sign-off on MSRP comparisons.
- **Naming:**
  - "Mercedes-Benz" in full;
  - Service A / Service B;
  - official program names exactly as Mercedes-Benz USA writes them (e.g. "Mercedes-Benz Premier Prepaid Maintenance", allowed through the dealer file's `allowPhrases`);
  - never "Star-Certified" or technician credential claims.
- **Vans store** (Mercedes-Benz Vans of Laguna Niguel): Sprinter/eSprinter topics only. Passenger stores write about vans only where the store sells them (Midlothian does).
