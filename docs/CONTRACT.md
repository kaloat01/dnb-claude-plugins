# dealer-articles — internal contract (v0.2 image-catalog contract, 2026-10-07)
Shared spec for the engine (`scripts/build.js`), the dealer data files and the skills. Everything inside the plugin
is referenced from `${CLAUDE_PLUGIN_ROOT}` = `plugins/dealer-articles/`. Pure Node ≥18, **zero npm dependencies**.

## 1. Dealer data — `resources/dealers/<key>.json`
Keys: `brickell-honda`, `brickell-mazda`, `honda-libertyville`, `toyota-downtown-chicago`, `bentley-jacksonville`,
`murgado-ford-chicago`, `murgado-lincoln-chicago`, `bentley-edison`. Each also has `<key>.sitemap.txt` and `<key>.images.json`.
A file with the same name in the user's working folder `./dealers/<key>.json` overrides the shipped one.
```jsonc
{
  "key": "brickell-honda",
  "prefix": "bh",                       // article root class = .bh-art ; sitewide CSS file = bh-articles-sitewide-CSS.html
  "platform": "apollo",
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
  "brandNaming": ["Say 'Honda Genuine Parts'", "Use 'Maintenance Minder'"],  // brand/program naming rules for writers
  "style": {
    "linkColor": "#0067AD", "linkHover": "#005C9B",
    "linkUnderline": false,                // true = ink links with underline (e.g. Mazda)
    "importantWaiver": false,              // true when design.json says "no !important" but Apollo guards need it (record why)
    "exceptions": [ { "rule": "…", "source": "…" } ]   // forced exceptions only (written brand rule or platform)
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
Sitemap snapshot: `resources/dealers/<key>.sitemap.txt` — one root-relative path per line (no inventory/VDP URLs),
first line `# <domain> snapshot YYYY-MM-DD`. It is the default internal-link allow-list.

### Image catalog — `resources/dealers/<key>.images.json` (introduced in v0.2)
Optional catalog of images already in this dealer's Apollo library, verified and viewed when cataloged. It is read
by the article skill; the builder does not automatically select or import catalog entries. The documented local
`./dealers/<key>.json` override applies to dealer data, not an automatic image-catalog override.

```json
{
  "dealer": "brickell-mazda",
  "generated": "2026-10-07",
  "note": "Reuse before asking for new uploads. View before use; match the article's model year.",
  "images": [
    {
      "id": "789270",
      "url": "https://service.secureoffersites.com/images/GetLibraryImage?fileNameOrId=789270&type=webp&quality=85",
      "w": 4128,
      "h": 2752,
      "shows": "Bright, spotless Mazda service workshop with red Mazdas on lifts",
      "vehicle": null,
      "text": false,
      "slots": ["hero", "fig", "pair"],
      "tags": ["service-bay"]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `dealer` | Dealer key matching `<key>` |
| `generated` | Catalog date (`YYYY-MM-DD`) |
| `note` | Catalog-level reuse and verification guidance |
| `images` | Array of catalog entries |
| `id`, `url` | Apollo Image ID (string) and full `GetLibraryImage` URL |
| `w`, `h` | Verified pixel dimensions; check actual size again before final use |
| `shows` | Description of what was visually observed; use it to assess topic fit |
| `vehicle` | Vehicle/model/generation description, or `null`; not proof of the article's model year |
| `text` | Whether visible text was observed; inspect the photo for disallowed offer text, prices or watermarks |
| `slots` | Placement hints: `hero`, `fig`, `pair`, `store`, `logo` |
| `tags` | Descriptive search/filter hints, such as `service-bay`, `technician`, `city`, `road` |
| `avoid` | Optional warning in current catalogs; account for the stated reason before selecting |
| `onDark` | Optional logo presentation hint in current catalogs |

**Reuse-first flow:** read the catalog if present before requesting uploads. Select suitable images by `shows`,
placement hints, dimensions and article context; view every selected photo before writing alt text. Vehicle photos
must match the researched model year/generation; vague catalog labels do not establish that match. Do not reuse one
photo twice in the article. Respect rights and the rejection rules in `resources/rules/image-brief.md`.

The first user-facing list covers `IMG_HERO`, `IMG_FIG1`, `IMG_FIG2`, `IMG_PAIR1`, `IMG_PAIR2`. Mark reused slots
"already in your library (ID …)" and request only missing slots. `hero` maps to `IMG_HERO`, `fig` to either full-width
figure, and `pair` to either pair image; `store` and `logo` are separate dealer-section assets from the dealer JSON.
Write each selected ID/URL into the corresponding `module.js` image's `apollo` field, with its viewed `alt`, dimensions
and slot `desc`. The catalog's `shows` is not copied blindly as alt text.

If the catalog is absent or no entries fit, request all missing article slots (possibly all five). Continue research
and drafting while the user sources them. Unfilled slots keep `apollo: null` and render as placeholders in a DRAFT;
filled slots retain their Apollo images. Run `images <job>` to verify selected URLs and actual dimensions and view the
saved files. With all images filled and gates passing, `build <job> --final` produces the final package; new uploads
are unnecessary when suitable existing images fill every slot.

## 2. Content module — `<job>/module.js` (CommonJS, the single source of truth for an article)
Same shape as the proven Apollo modules (see `resources/examples/`), with:
- `dealer: '<key>'` (dealer file key, not the prefix)
- `images: { KEY: { apollo: '<Apollo image id or full GetLibraryImage URL>' | null, alt, w, h, desc } }`
  `desc` = the plain-language image request ("2027 Mazda CX-50, front three-quarter, exterior, daylight"); when
  `apollo` is null the preview shows a light placeholder with that text, and the package is DRAFT.
- `allowedLinks` optional (default = dealer sitemap snapshot + builder-owned routes); `banned[]` regex strings;
  `allowPhrases[]`; `allowMsrp` (bool; required for any `$` figure, each needs "MSRP" within 140 chars).
- Fields: dept, slug, path, title, ogTitle, meta, focus, keywords[], datePublished, dateModified, updatedLabel,
  eyebrow, section, crumbs[{n,u}], crumbTitle, h1, dek, hero, heroContained?, images, glance[4], blocks[], faqTitle,
  faqIntro, faqCall?, faq[{q,a}], dealerSection{eyebrow,h,p}, closer{h,p,secondary{label,href}}, related[3]{k,t,d,href},
  fine, about[]. Blocks: h2{id,toc,text} h3 p{html} list{items,check?} steps{items[{h,html}]} callout{label,html}
  table{caption,head,rows,note} stats{items[{n,l}]} cta{text,label,href} fig{img,caption,prose?} pair{items[{img,caption}]}.
- Tokens: `{{PHONE}}` (dept phone), `{{SALESPHONE}}`, `{{SERVICEPHONE}}`.

## 3. CLI — `node "<ROOT>/scripts/build.js" <command> …`
| command | does |
|---|---|
| `env` | Node version, plugin root, browser found for screenshots (msedge/chrome path or "none"), dealers available |
| `dealers` | list keys, names, aliases |
| `new --dealer "<name or key>" --title "<title>" [--out <dir>]` | fuzzy-match dealer (exit 2 + candidates if ambiguous), slugify title, create `<out|./articles>/<key>/<slug>/` with `module.js` (from `resources/templates/module.template.js`, dealer/title/slug/dates pre-filled), `job.json` {dealer, title, slug, phase:"intake", created}, print the job path |
| `status <job>` | print job.json + which outputs exist |
| `build <job> [--final]` | load module + dealer → write outputs (below) → run gates → print ✅/❌/⚠️ per gate; exit 1 on any ❌. `--final` additionally requires every image to have an Apollo id/URL and no placeholder |
| `shot <job> [--widths 1280,375]` | headless system browser screenshots of the preview → `<job>/qa/preview-<w>.png` (full page). If no browser: warn, exit 0 |
| `images <job>` | for every module/dealer image with an Apollo value: normalize URL, GET with browser headers, require 200 + `image/*`, save to `<job>/images/<KEY>.<ext>`, read real width/height (pure JS PNG/JPEG/WebP/GIF header parse), print table + placement advice (hero ≥1900 full-bleed else contained; fig ≥1100; narrow 880; pair ≤1000) |

## 4. Outputs of `build`
```
<job>/<slug>-preview.html          full document: dealer Apollo theme CSS <link>s + Gemini-like shell + sitewide CSS inline +
                                   schema inline; placeholder SVGs (data URIs) for images without Apollo ids; a thin top bar
                                   "LOCAL PREVIEW · DRAFT (placeholders)" or "FINAL"
<job>/package/<slug>-HTML.html     Apollo FRAGMENT: starts with <div class="<p>-art <p>-art-<slug>">, ends </div>; no
                                   doctype/html/head/body/style/script/link/meta
<job>/package/<p>-articles-sitewide-CSS.html   ONE <style>…</style>, every rule scoped to .<p>-art / body:has(.<p>-art) /
                                   #custompageblock:has(.<p>-art); first line Roboto @import; first comment carries
                                   "dealer-articles css <sha1-8>" (deterministic: no dates) so users can compare with live
<job>/package/<slug>-Structured-Data.txt   raw JSON @graph (WebSite, WebPage, BreadcrumbList, AutoDealer+AutoRepair
                                   #organization w/ departments + hours, BlogPosting, FAQPage) — paste with Replace checked
<job>/package/<slug>-SEO.md        hand-entry sheet, ONE line per field: "* Field  →  value" (URL/slug, H1 Tag Text → leave
                                   blank, Page Title, Meta Description, Canonical Url, OG Site Name → #DealerName, OG Title,
                                   OG Description, OG Locale → en_US, Meta Keywords → leave empty, Robots → leave all unchecked,
                                   Focus keyword, Hero image URL)
<job>/package/README.md            paste steps (sitewide CSS once per dealer → new custom page /<slug> → HTML → Structured
                                   Data + Replace → SEO fields → publish → checks); DRAFT banner when not --final
```

## 5. Gates (❌ = fail, ⚠️ = warn)
❌ JSON-LD parses · exactly 1 `<h1>` in fragment · balanced `<div>` · no `rem` · no em dash / no en dash outside
digit ranges · global + dealer + module banned phrases (minus allowPhrases) · excluded towns · toll-free numbers
(8xx, phone-shaped regex) · `$` figures only with `allowMsrp` and "MSRP" within 140 chars · internal links ⊆
allow-list (+ builder-owned routes) · FAQ visible parity and FAQ schema == visible FAQ · stand-alone bold paragraph
(a `<p>` containing only `<strong>`) · unresolved `{{` tokens · fragment has no style/script/link/meta/doctype ·
`--final`: every image has an Apollo value.
⚠️ "01, 02" style numbering · title >65 · meta outside 130–165 · H1 >80 · body words outside 1,700–2,300 · H2 count
outside 8–9 · FAQ count outside 9–10 or answers outside 40–90 words · fewer than 12 unique internal links · sentence
>25 words (count only) · images still placeholders.
Global banned list: look no further, premier, seamless, elevate, nestled, unmatched, best-in-class, state-of-the-art,
unlock, peace of mind, top dollar, guaranteed, best price, certified technician, factory-trained, master technician,
price match, whether you are, when it comes to, in today's market, closer than most, outguns, fast-paced,
comprehensive solution, lorem, TODO, UNVERIFIED.
