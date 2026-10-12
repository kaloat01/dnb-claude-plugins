# dealer-articles — internal contract (v0.11, 2026-10-11)
Shared spec for the engine (`scripts/build.js`), the dealer data files and the skills. Everything inside the plugin
is referenced from `${CLAUDE_PLUGIN_ROOT}` = `plugins/dealer-articles/`. Pure Node ≥18, **zero npm dependencies**.
Three platforms share one workflow and one engine: **Apollo** (`/dealer-articles:article-apollo`), **DealerInspire** (`/dealer-articles:article-dealerinspire`) and **Dealer.com** (`/dealer-articles:article-dealercom`).
Only the image values, the platform hardening, the package and a few platform gates differ. The router
`/dealer-articles:article` picks the platform from the dealer. The same skills run in Claude Code, Cowork and Chat (section 6).

## 1. Dealer data — `resources/dealers/<key>.json`
Apollo keys: `brickell-honda`, `brickell-mazda`, `honda-libertyville`, `toyota-downtown-chicago`, `bentley-jacksonville`,
`murgado-ford-chicago`, `murgado-lincoln-chicago`, `bentley-edison`.
DealerInspire keys: `mercedes-benz-laguna-niguel`, `mercedes-benz-foothill-ranch`, `mercedes-benz-vans-laguna-niguel`,
`mercedes-benz-midlothian`, `mercedes-benz-richmond`.
Dealer.com keys: `brickell-cdjr`, `ocean-cadillac`, `brickell-buick-gmc` (all Miami, FL).
Each also has `<key>.sitemap.txt` and `<key>.images.json`.
A file with the same name in the user's working folder `./dealers/<key>.json` overrides the shipped one.
```jsonc
{
  "key": "brickell-honda",
  "prefix": "bh",                       // article root class = .bh-art ; sitewide CSS file = bh-articles-sitewide-CSS.html
  "platform": "apollo",                 // "apollo" (default) | "dealerinspire" | "dealercom"
  "name": "Brickell Honda",
  "aliases": ["brickell honda", "honda brickell", "bh"],   // lowercase, used for fuzzy dealer matching
  "brand": "Honda",                     // OEM brand name as written in copy
  "group": "Murgado Automotive Group",  // optional
  "domain": "https://www.brickellhonda.com",
  "address": { "street": "690 SW 8th St", "city": "Miami", "region": "FL", "zip": "33130", "country": "US" },
  "geo": [25.7654883, -80.2053767],
  "mainPhone": "(305) 856-3000",        // optional
  "departments": {
    "service": { "label": "Service", "phone": "786-628-0577",
                 "cta": { "label": "Schedule Service", "href": "/scheduleservice" },
                 "hours": [[["Monday","Tuesday","Wednesday","Thursday","Friday"],"07:00","18:00"],[["Saturday"],"08:00","18:00"]] },
    "sales":   { "label": "Sales", "phone": "786-480-1304",
                 "cta": { "label": "Shop New Inventory", "href": "/new-inventory" },
                 "hours": [ ... ] }
  },
  "routes": { "directions": "/get-directions", "serviceHub": "/service", "specials": "/service-specials",
              "newInventory": "/...", "usedInventory": "/...", "contact": "/contactus" },   // only verified routes
  "areas": ["Miami", "Brickell", "..."],   // allowed local framing (real neighborhoods/cities)
  "excluded": [],                          // towns never to mention (sister-store territory)
  "climate": "Hot, humid South Florida; hurricane season; no snow or road salt.",
  "bans": ["HondaCare", "snow", "road salt", "winter"],      // dealer-level banned words (regex-safe plain strings)
  "allowPhrases": [],                      // optional: official OEM program names that contain a banned word
                                           // (e.g. "Premier Prepaid Maintenance"); removed from the text before the banned-phrase gate
  "brandNaming": ["Say 'Honda Genuine Parts'", "Use 'Maintenance Minder'"],  // brand/program naming rules for writers
  "style": {
    "linkColor": "#0067AD", "linkHover": "#005C9B",
    "linkUnderline": false,                // true = ink links with underline (e.g. Mazda)
    "importantWaiver": false,              // true when design.json says "no !important" but Apollo guards need it (record why)
    "exceptions": [ { "rule": "…", "source": "…" } ],  // forced exceptions only (written brand rule or platform)
    "fonts": { "head": "…", "body": "…" }  // optional brand font stacks (see the DealerInspire example); absent for Apollo
                                           // dealers, so they keep the Editorial v2 Georgia/Roboto stacks
  },
  "apollo": {
    "themeCss": ["https://prod.cdn.secureoffersites.com/dist/p1138/css/websitegemini/vendor/vendor.css",
                 "https://prod.cdn.secureoffersites.com/dist/p1138/css/themes/Honda/styles.css"],
    "themeFont": "Nunito",                 // the theme font we must NOT leak into the article (preview check)
    "shell": "gemini"                      // gemini | other (Mazda_OEM etc.)
  },
  "images": {                              // shared dealer images used in the dealership section
    "STORE": { "apollo": "49187", "alt": "…", "w": 1000, "h": 550 },
    "LOGO":  { "apollo": "108908&Width=0&Height=0&logo=y", "alt": "…", "w": 860, "h": 200 }   // apollo may be null → text band
  },
  "verify": ["Sunday service hours: design.json says 9-3, service copy omits Sunday. Confirm with the dealer."],
  "lastVerified": "2026-10-07",
  "sources": ["live site footer 2026-10-07", "…"]
}
```
DealerInspire dealer files have the same fields, with no `apollo` block and these additions:
```jsonc
{
  "platform": "dealerinspire",
  "brandLine": "Mercedes-Benz Vans",       // optional: the brand line the store uses (e.g. the Vans store)
  "style": {
    "fonts": { "head": "\"corpoademregular\",…,Georgia,\"Times New Roman\",serif",   // Mercedes stores: Corporate A/S stacks with
               "body": "\"corposregular\",\"Roboto\",Arial,sans-serif" }     // Georgia/Roboto fallbacks
  },
  "di": {
    "uploads": "https://di-uploads-podN.dealerinspire.com/<site>/uploads/",  // this store's Media Library base (--final checks it)
    "template": "composer",                // "composer" (Page Composer page) | "post" (Classic post)
    "postLayout": false,
    "category": null,                      // post category (posts only)
    "parentPath": "/service/service-and-parts-tips/",   // article parent page (California stores); null = /<slug>/
    "shortcodes": { "service": "di_phone_service", "sales": "di_phone_sales" },  // dept → [di_option option="…"], verified per store
    "hoursDepartments": { "service": "Service" }       // dept → [di_hours department="…"], verified per store
  },
  "images": {                              // value field is `di` (WordPress Media Library File URL), never `apollo`
    "STORE": { "di": "https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>", "alt": "…", "w": 1600, "h": 900 },
    "LOGO":  { "di": "…", "alt": "…", "w": 600, "h": 120, "onDark": true }
  }
}
```
Phones and hours on DealerInspire are verified on each site's About Us / Contact page from a US location, like Apollo.
Only the shortcodes listed in `di.shortcodes` / `di.hoursDepartments` are used; a department without one falls back to the
dealer-file number or text hours (build warning).

Dealer.com dealer files have the same fields, with no `apollo` or `di` block and these additions:
```jsonc
{
  "platform": "dealercom",
  "brand": "Chrysler Dodge Jeep Ram",      // the full brand string the compliance checks use ("Cadillac", "Buick GMC")
  "brandShort": "Chrysler, Dodge, Jeep or Ram", // copy-friendly brand phrase the build puts in its own lines
  "brandNames": ["Chrysler", "Dodge", "Jeep", "Ram"], // any of these counts as a brand mention; one schema Brand node each
  "style": {
    "fonts": { "head": "…", "body": "…", "import": false }, // the site's theme font faces or a system stack; no @import
    "radius": 0                            // optional button corner radius in px (a recorded brand exception, e.g. square)
  },
  "ddc": {
    "media": "https://pictures.dealer.com/<letter>/<account>/",   // this store's Media Library base (images + --final check it)
    "orgId": null,                         // DDC's site-wide AutoDealer has no @id, so the block defines <domain>/#organization
    "titleSuffix": null,                   // what DDC appends to a FILLED MetaData Title; null = shown unchanged (live 10/12:
                                           // only an empty Title falls back to page name + dealer name)
    "aboutPath": "/dealership/about.htm",  // About Us page: the source of the phones and hours
    "contentPath": "/wbp-<slug>.htm",      // article content page URL pattern (`new` replaces <slug>); default "/<slug>.htm"
    "socialTags": "…",                     // what the DDC shell prints for og:/twitter: tags (reference only)
    "socialImage": false                   // true only if the page settings have a social image field (adds a sheet line)
  },
  "images": {                              // value field is `ddc` (Media Library image URL), never `apollo` or `di`
    "STORE": { "ddc": "https://pictures.dealer.com/<letter>/<account>/…", "alt": "…", "w": 1600, "h": 900 },
    "LOGO":  { "ddc": "…", "alt": "…", "w": 600, "h": 120 }
  }
}
```
`brandShort`, `brandNames` and `style.radius` are optional and absent for Apollo and DealerInspire dealers, so their output is
unchanged.
Phones and hours on Dealer.com are verified on each site's About Us page (`ddc.aboutPath`) from a US location. Dealer.com
has no phone or hours token: the block shows the dealer-file numbers as real `tel:` links and the dealer-file hours as text.

Sitemap snapshot: `resources/dealers/<key>.sitemap.txt` — one root-relative path per line (no inventory/VDP URLs),
first line `# <domain> snapshot YYYY-MM-DD`. It is the default internal-link allow-list.

## 2. Content module — `<job>/module.js` (CommonJS, the single source of truth for an article)
Same shape as the proven Apollo modules (see `resources/examples/`), with:
- `dealer: '<key>'` (dealer file key, not the prefix)
- `images: { KEY: { <value field>: … | null, alt, w, h, desc } }`. The value field depends on the dealer's platform:
  - **Apollo:** `apollo: '<Apollo image id or full GetLibraryImage URL>'`.
  - **DealerInspire:** `di: '<WordPress Media Library File URL>'`, i.e.
    `https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>` (the original, not a `-WxH` copy, from this
    store's library). `new` writes `di: null` for DealerInspire jobs.
  - **Dealer.com:** `ddc: '<Media Library image URL>'`, i.e. `https://pictures.dealer.com/<letter>/<account>/…` on this
    store's `ddc.media` base. `new` writes `ddc: null` for Dealer.com jobs.

  `desc` = the plain-language image request ("2027 Mazda CX-50, front three-quarter, exterior, daylight"); when the
  value is null the preview shows a light placeholder with that text, and the package is DRAFT.
- `path`: root-relative page URL, set by `new` (Apollo `/<slug>`, no trailing slash; DealerInspire `/<slug>/`, or
  `<di.parentPath><slug>/` for stores with an article parent page; Dealer.com: a content page under `ddc.contentPath`).
- `allowedLinks` optional (default = dealer sitemap snapshot + builder-owned routes); `banned[]` regex strings;
  `allowPhrases[]` (added to the dealer file's `allowPhrases`); `allowMsrp` (bool; required for any `$` figure, each needs
  the brand price term, "MSRP" or "TSRP" for Toyota, within 140 chars).
- Fields: dept, slug, path, title, ogTitle, meta, focus, keywords[], datePublished, dateModified, updatedLabel,
  eyebrow, section, crumbs[{n,u}], crumbTitle, h1, dek, hero, heroContained?, images, glance[4], blocks[], faqTitle,
  faqIntro, faqCall?, faq[{q,a}], dealerSection{eyebrow,h,p}, closer{h,p,secondary{label,href}}, related[3]{k,t,d,href},
  fine, about[]. Blocks: h2{id,toc,text} h3 p{html} list{items,check?} steps{items[{h,html}]} callout{label,html}
  table{caption,head,rows,note} stats{items[{n,l}]} cta{text,label,href} fig{img,caption,prose?} pair{items[{img,caption}]}.
- Tokens: `{{PHONE}}` (dept phone), `{{SALESPHONE}}`, `{{SERVICEPHONE}}`. Never write a number (or, on DealerInspire, a
  clock time) in prose. In the package the tokens become Apollo merge tags (`#ServiceNumber` / `#SalesNumber`),
  DealerInspire `[di_option]` shortcodes, or on Dealer.com the dealer-file numbers as real `tel:` links; the JSON-LD
  always keeps the real numbers.

## 3. CLI — `node "<ROOT>/scripts/build.js" <command> …`
| command | does |
|---|---|
| `env [--net]` | first line `dealer-articles v<version> (<date>)` (the version stamp; skills show it to the user), Node version, plugin root, browser found for screenshots (msedge/chrome path or "none"), download folders that exist and are writable (`/mnt/user-data/outputs`, `/mnt/outputs`, `./outputs`), dealers available. `--net` also reports which image hosts, font hosts and a dealer domain are reachable or blocked |
| `dealers` | list keys, prefixes, names, platform, aliases |
| `new --dealer "<name or key>" --title "<title>" [--slug <short-slug>] [--out <dir>]` | fuzzy-match dealer (exit 2 + candidates if ambiguous), slugify title (or `--slug`), create `<out|./articles>/<key>/<slug>/` with `module.js` (from `resources/templates/module.template.js`, dealer/title/slug/path/dates pre-filled; DealerInspire jobs get `di: null` image values and the DealerInspire path; Dealer.com jobs get `ddc: null` and the Dealer.com path), `job.json` {dealer, title, slug, phase:"intake", created}, print the job path |
| `status <job>` | print job.json + which outputs exist (the platform's own package files) |
| `build <job> [--final]` | load module + dealer → write outputs (below) → run gates → print ✅/❌/⚠️ per gate and the handoff; exit 1 on any ❌ (the package README then starts with "NOT READY: gates failed … Do not paste."). `--final` additionally requires every image to have a value and no placeholder: an Apollo id/URL, on DealerInspire a Media Library URL on this store's `di.uploads` host, or on Dealer.com a Media Library URL on this store's `ddc.media` base |
| `shot <job> [--widths 1280,375]` | headless system browser screenshots of the preview → `<job>/qa/preview-<w>.png` (full page). On Windows, very long job paths render from a short temp copy. If no browser: warn, exit 0 |
| `images <job>` | for every module/dealer image with a value: normalize URL, GET with browser headers, require 200 + `image/*`, save to `<job>/images/<KEY>.<ext>`, read real width/height (pure JS PNG/JPEG/WebP/GIF header parse), print table + placement advice (hero ≥1900 full-bleed else contained; fig ≥1100; narrow 880; pair ≤1000). DealerInspire: the `di` value must be a `https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/` URL, else ❌. Dealer.com: the `ddc` value must be a `https://pictures.dealer.com/…` URL (a wrong file name on a real path returns 403) |
| `page <url> [--out <file>]` | system-browser DOM dump (text + links) for pages that block plain fetches |
| `review <job> --mode separate\|single` | records how the two reviews ran: `separate` (reviewer agents: Cowork, Claude Code) or `single` (one conversation: Chat). The handoff shows it |
| `deliver <job> --to <dir>` | copies `HANDOFF.md` and the package files to `<dir>` (`HANDOFF.md` and `README.md` become `<slug>-HANDOFF.md` / `<slug>-README.md`, so many articles can share one flat download folder) (a download folder; with none, any folder the user can open) and writes `<slug>-resume-kit.zip` there: `module.js`, `job.json`, `HANDOFF.md`, `IMAGES-TO-SOURCE.md` and the source ledger under `<dealer>/<slug>/` (no images or previews: rebuild after resuming). Warns when `module.js` changed after the last build |
| `resume <zip> [--out <dir>] [--force]` | unpacks a resume kit into `./articles/<dealer>/<slug>/` (or under `--out`); refuses to overwrite an existing job without `--force` and rejects unsafe zip paths; prints the job path, its phase and the version it was last built with; warns when the dealer is not in this plugin |

## 4. Outputs of `build`
**Apollo:**
```
<job>/<slug>-preview.html          full document: dealer Apollo theme CSS <link>s + Gemini-like shell + sitewide CSS inline +
                                   schema inline; placeholder SVGs (data URIs) for images without Apollo ids; a thin top bar
                                   "LOCAL PREVIEW · DRAFT (placeholders)" or "FINAL"
<job>/package/<slug>-HTML.html     Apollo FRAGMENT: starts with <div class="<p>-art <p>-art-<slug>">, ends </div>; no
                                   doctype/html/head/body/style/script/link/meta
<job>/package/<p>-articles-sitewide-CSS.html   ONE <style>…</style>, every rule scoped to .<p>-art / body:has(.<p>-art) /
                                   #custompageblock:has(.<p>-art); first line Roboto @import; first comment carries
                                   "dealer-articles css <sha1-8>" (deterministic: no dates); one rule per line, ASCII only, no backslashes; last
                                   rule `.<p>-art{--da-css-version:v<sha1-8>}` survives Apollo reformatting so users can compare with live
<job>/package/<slug>-Structured-Data.txt   raw JSON @graph (WebSite, WebPage, BreadcrumbList, AutoDealer+AutoRepair
                                   #organization w/ departments + hours, BlogPosting, FAQPage) — paste with Replace checked
<job>/package/<slug>-SEO.md        hand-entry sheet, ONE line per field: "* Field  →  value" (URL/slug, H1 Tag Text → leave
                                   blank, Page Title, Meta Description, Canonical Url, OG Site Name → #DealerName, OG Title,
                                   OG Description, OG Locale → en_US, Meta Keywords → leave empty, Robots → leave all unchecked,
                                   Focus keyword, Hero image URL)
<job>/package/README.md            paste steps (sitewide CSS once per dealer → new custom page /<slug> → HTML → Structured
                                   Data + Replace → SEO fields → publish → checks); DRAFT banner when not --final
```
**DealerInspire:**
```
<job>/<slug>-preview.html          the paste file after a WordPress wpautop simulation, with [di_option] / [di_hours] rendered
                                   as the site renders them, inside a DealerInspire theme shell (Page Composer page or Classic
                                   post, per di.template); placeholder SVGs for images without a di URL; top bar
                                   "LOCAL PREVIEW · DRAFT (placeholders)" or "FINAL"
<job>/package/<slug>-embed-Wired.html   the ONLY paste file, ONE line on purpose (no trailing newline): <div class="<p>-art
                                   <p>-art-<slug>"> + one inline <style> (Editorial v2 + DealerInspire hardening, px only,
                                   every rule scoped to .<p>-art) + the article + a helper script (links [di_option] phone
                                   numbers, condenses [di_hours] to one line) + trimmed JSON-LD last (AutoDealer+AutoRepair
                                   /#autodealer, BlogPosting, FAQPage; real phone numbers, no fixed hours; Yoast emits
                                   WebPage, WebSite, Organization and Breadcrumb) + </div>
<job>/package/<slug>-SEO.md        WordPress + Yoast hand-entry sheet, ONE line per field "* Field  →  value": Page title
                                   (Post title), Slug, Parent page (Category for posts), Featured image, SEO title, Meta
                                   description, Focus keyphrase, Facebook title / description / image, Twitter title /
                                   description / image (images = hero, never empty), Canonical URL → leave the Yoast field empty
<job>/package/README.md            paste steps (Pages → Add New / Page Composer "Use WordPress Content" row → Text tab, never
                                   Visual or Raw HTML → featured image → Yoast fields incl. Social tab → publish → DealerInspire
                                   Reload Cache → checks with ?cb=); DRAFT banner when not --final
```
No site-wide CSS file and no separate Structured Data file on DealerInspire: both are inside the paste file.

**Dealer.com:**
```
<job>/<slug>-preview.html          the paste block inside a Dealer.com page shell that prints the page name (= mod.h1) as the
                                   page's only H1 above the block, with the font fallbacks; placeholder SVGs for images
                                   without a ddc URL; top bar "LOCAL PREVIEW · DRAFT (placeholders)" or "FINAL"
<job>/package/<slug>-DDC-Custom-HTML.html   the ONLY paste file (the page's Custom HTML component): one <style> (Editorial v2
                                   + Dealer.com hardening: px only, explicit centering and CTA fills with !important,
                                   ellipsis on button labels for wide theme fonts, no @import, no comments, every rule
                                   scoped to .<p>-art) + one wrapper <div class="<p>-art <p>-art-<slug>"> holding
                                   the article (no <h1>: the header starts with the eyebrow and dek; phones are real tel:
                                   links, hours are text) and, as the last node, the JSON-LD (AutoDealer <domain>/#organization
                                   with dealer-file facts, BlogPosting, FAQPage; no other script). It may be multi-line and
                                   ends on </div>, with nothing after it
<job>/package/<slug>-SEO.md        Dealer.com hand-entry sheet, ONE line per field "* Field  →  value": Page name (= the H1),
                                   URL, MetaData Title (typed as given; never empty), MetaData
                                   Description, Focus keyphrase (reference only), a Social image line only when
                                   `ddc.socialImage` is true, and one line saying the MetaData Editor has no canonical, OG
                                   or Twitter fields
<job>/package/README.md            paste steps (new content page named exactly as the H1 → Custom HTML component → paste
                                   from Notepad with Ctrl+A → MetaData Editor Title + Description → Publish → checks with
                                   ?cb=); DRAFT banner when not --final
```
No site-wide CSS file and no separate Structured Data file on Dealer.com either: both are inside the paste file.

**Every platform: the handoff.** Every `build` writes `<job>/HANDOFF.md` and prints the same text between
`=== HANDOFF (show this to the user verbatim) ===` and `=== END HANDOFF ===`.
- Status: **FINAL** (a `--final` build with every gate passing), **DRAFT** (built without `--final`, or images still
  placeholders; do not paste) or **NOT READY** (the failed gates are listed; do not paste).
- Contents: version stamp, dealer, platform, page URL, review mode (from `review`: separate reviewer agents, single
  conversation, or "not recorded"), every SEO / Yoast / social line from `<slug>-SEO.md` (`* Field  →  value`), the files
  to paste, the paste steps, and the open flags (failed gates, placeholder images, dealer facts to confirm, counsel
  sign-off for price comparisons, warnings). No local paths or times.
- Skills end every run with this block, verbatim, as the last thing in the reply; `deliver` copies the file next to the
  paste files and the resume kit.

## 5. Gates (❌ = fail, ⚠️ = warn)
**Shared (every platform)**
❌ JSON-LD parses · exactly 1 `<h1>` in fragment (Dealer.com: 0, below) · balanced `<div>` · no `rem` · no em dash / no en dash outside
digit ranges · global + dealer + module banned phrases (minus module and dealer `allowPhrases`) · excluded towns ·
toll-free numbers not in the dealer file (8xx, phone-shaped regex) · brand terms ledger readable (a missing or malformed
`brand-terms.json` fails every build; `env` shows it too) · `$` figures only with `allowMsrp` and the brand price
term (MSRP; TSRP for Toyota) within 140 chars · brand terms ledger (`resources/rules/brand-terms.json`: OEM wording and
LAW-* legal rules, scoped by brand and state; copy, titles, meta, alt text, slug) · internal links ⊆ allow-list
(+ builder-owned routes) · FAQ visible parity and FAQ schema == visible FAQ · stand-alone bold paragraph (a `<p>`
containing only `<strong>`) · unresolved `{{` tokens · body words 1,700–2,300 (blocks only) · question H2s 8–9 ·
FAQ 9–10 questions × 40–90 words per answer.
⚠️ "01, 02" style numbering · title outside 50–65 · social title (`ogTitle`, else `title`) over 70 · meta outside 130–165 · H1 >80 · fewer than 12 unique internal
links · sentence >25 words (count only) · images still placeholders · brand or city never mentioned · advisory ledger
rows · no STORE/LOGO image · department without phone, CTA or directions route.

**Apollo only**
❌ fragment is Apollo-safe (no style/script/link/meta/doctype; starts with the `.<p>-art` wrapper div) · site-wide CSS
fully scoped · site-wide CSS paste-safe (ASCII, no backslash) · no Apollo merge tags in Structured Data · package phones
use Apollo tags (no hard-coded department number, phone-shaped match; no `tel:` number links) · `--final`: every image
has an Apollo value.

**DealerInspire only**
❌ paste file shape (one line; root div; exactly one `<style>`; helper script; JSON-LD last; no link/meta/doctype) ·
JSON-LD has no `[di_` shortcodes, `%%` tokens, Apollo tags or raw `<` · phones use DealerInspire shortcodes (no
hard-coded department number or `tel:` number link) · hours only via `[di_hours]` (no clock times in the article when the
department has a verified `[di_hours]` label) · no `<br>`, `<pre>` or `<textarea>` · no `<a>` wrapping block elements
(wpautop clones it; use a stretched link) · helper script compiles · inline CSS fully scoped (`.<p>-art`, plus
`#di-page-composer .<p>-art` and the documented theme-wrapper `:has(.<p>-art)` roots) · Yoast sheet complete (no empty
field; `--final`: social images present) · `--final`: every image is a DealerInspire upload of this store (`di.uploads`).
⚠️ shortcode coverage (a department without a verified `[di_option]` shows its dealer-file number) · wpautop simulation
(reports how many `<p>` wpautop adds; check the preview).

All shared gates apply unchanged on DealerInspire, including MB-001 ("offer", never "coupon") and the advisory
LAW-CA-01 for the California stores.

**Dealer.com only**
❌ 0 `<h1>` in the block (the DDC shell prints the page name as the H1) · block shape (starts with the one `<style>`, the
wrapper div follows it, the JSON-LD is the last node and the only script, the file ends on `</div>`, no
doctype/html/head/body/title/meta/link) · every tag paired (div, style, script, section, figure, details, table, lists:
DDC's tag-pair check) · no comments at all, no `@import`, no `url()` with a slash before a digit, no inline `style=`, no
`transition: all` · CTA fill `!important` present · no bare generic class names (row, grid, card, btn, container,
section, hero, media, copy, wrapper) · inline CSS fully scoped · phone numbers in the block (links, text, JSON-LD) equal
the dealer file · no Apollo tags, `[di_` shortcodes or `{{DDC_MEDIA}}` tokens · page fields sheet complete · `--final`:
every image is on this store's `ddc.media` base (pictures.dealer.com) and no placeholder is left.
⚠️ MetaData Title contains the dealer name while `ddc.titleSuffix` is known (the name would show twice) · MetaData
Description over 155. `images` also rejects a URL that is not on this store's `ddc.media` base.

All shared gates apply unchanged on Dealer.com (except the H1 count above), including the LAW-* ledger rows for the
Florida stores.

Global banned list (whole words, plus plural/-ly forms): look no further, premier, seamless, elevate, nestled, unmatched,
best-in-class, state-of-the-art, unlock, peace of mind, top dollar, guarantee, best price, highest price, certified
technician, factory-trained, factory-certified, master technician, price match, whether you are, when it comes to,
in today's market, closer than most, outguns, fast-paced, comprehensive solution, lorem, TODO, UNVERIFIED.

## 6. Surfaces (where the skills run)
Plugins are installed on the claude.ai account (Customize → Plugins) and sync to the Desktop app, the browser and, as a
synced plugin, Claude Code. Same skills, same gates and same rigor everywhere; only the mechanics differ.
Since 09/2026 Chat and Cowork are one experience; on Pro/Max, tasks run in a cloud sandbox (tested 10/11/2026: Node 22,
plugin agents load, `/mnt/user-data/{uploads,outputs,working}`, Chromium under `/opt/pw-browsers`, egress limited to
package registries/GitHub, `${CLAUDE_PLUGIN_ROOT}` NOT substituted → the router finds the plugin with `find`). The table
keeps the docs' Chat column for sessions without helper agents.

| | Cowork (Desktop app, claude.ai) | Chat (Desktop app, claude.ai) | Claude Code |
|---|---|---|---|
| Skills | ✅ | ✅ (type `/` or ask in plain words) | ✅ |
| Agents (researcher, 2 reviewers) | ✅ separate agents | ❌ ignored: the lead follows `agents/article-researcher.md` itself; the reviews run as the single-conversation protocol (`review --mode single`) | ✅ separate agents |
| Engine (`node build.js`) | VM or cloud sandbox | code execution (Settings → Capabilities → Code execution and file creation) | the user's Node.js ≥18 |
| Screenshots (`shot`) | only if `env` finds a browser | usually none → written design checklist | system Edge/Chrome |
| Network (`images`, `page`, research) | per the app's network setting (`env --net`) | per the app's network setting (`env --net`) | the computer's network |
| Files reach the user | `deliver` → download folder | `deliver` → download folder | already on disk in `./articles/` |
| Finish later | attach the resume kit in a new task (`resume`) | attach the resume kit (`resume`) | re-run the command in the same folder |
| Mobile apps | ❌ not supported for building articles | | |

Rules the skills follow on every surface: `env --net` first (version line shown to the user); one plain shell command per
call; questions via AskUserQuestion when available, otherwise plain text with the recommended option first; never write
an article without the engine; the last message is the build's HANDOFF block, verbatim.
