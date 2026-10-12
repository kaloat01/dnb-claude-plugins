# Changelog

## 2026-10-07 — v0.1 (pilot)
- First release of `dealer-articles`: `/article-apollo`, `/article-images`, `/article-setup`, bundled `golden-geo`
  (article mode), research / compliance / golden-geo reviewer agents.
- Apollo packaging (HTML fragment, site-wide CSS with hash marker, Structured Data, SEO `* Field  →  value`, preview).
- Dealers: Brickell Honda, Brickell Mazda, Honda Libertyville, Toyota of Downtown Chicago, Bentley Jacksonville.
- Zero npm dependencies; screenshots via the system Edge/Chrome.
- Dealer phones + hours verified on each About Us page from a US location (call trackers swap numbers by geo); About Us wins.

## 2026-10-07 — v0.2
- Dealership section borrows the service-specials "Brand Anchor" structure in Editorial v2 style: storefront plaque
  (department + address) and factual value lines (days open, online booking, current specials link, group). No icons,
  no credential claims. Still one site-wide CSS file per dealer for all articles.
- White dealer logos render on the black brand band (Honda Libertyville, Bentley Jacksonville).
- Workflow fixes from a fresh-eyes dry run: stop and ask when the dealer already has a page on the same topic; ask on
  PARTIAL premise (model-year choice, hybrid scope); image request says "model year confirmed after research";
  golden-geo BLOCKER = P0/P1; full skill name `frontend-design:frontend-design`; plugin root passed to subagents;
  department fields switched at intake; second figure full-width; researcher gathers exterior dimensions.
- Phones: when a department has no local number, the About Us (US) number is used, even toll-free (Toyota sales 877-413-8672); the toll-free gate accepts only numbers verified in the dealer file.
- Image catalogs per dealer (`<key>.images.json`): images already in each dealer's Apollo library, verified and viewed, tagged by slot; the workflow reuses them before asking for uploads.

## 2026-10-08 — v0.3
- Apollo merge tags: package HTML phones are `#SalesNumber` / `#ServiceNumber` (text + `tel:`), preview shows real numbers, Structured Data keeps real numbers. New gates: no tags in JSON-LD; no hard-coded department numbers in package HTML.
- Harmonized rules: title 50–65, internal links 12–25, pair images ≥800 px; dealer `sources` marked internal provenance.

## 2026-10-08 — v0.4 (from the Toyota mock run)
- New `page <url> [--out file]` command: system-browser DOM dump for OEM pages that block plain fetches; researcher fallback order documented; users can drop OEM PDFs into `<job>/sources/`.
- Depth rules are hard gates (body 1,700–2,300 words, 8–9 H2s, FAQ 9–10 × 40–90 words); verbatim quotes exempt from the 25-word sentence check.
- `shot`: true 375px viewport (iframe) and taller defaults; `new --slug` for short URLs; `env` lists real dealers only.
- Skill: same-topic page → new custom page + 301 (never a blog post); reviewers must be separate agents; Page Title may differ from H1; view library images via `images`.
- Example module: removed a proximity claim. Toyota image 744527 flagged (certified-technician signage). SEO hero line labelled schema-only.

## 2026-10-08 — v0.5: all 8 Apollo dealers
- New dealers: Murgado Ford of Chicago (`mfc`), Murgado Lincoln of Chicago (`mlc`, ink + underline links, red hover), Bentley Edison (`be`). Each: phones/hours verified on About Us (US geo), live routes, theme CSS, sitemap allow-list, viewed Apollo image catalog.
- All dealers' theme CSS updated to the live Apollo build p1168 (Ford/Lincoln also load their custompage CSS).
- Banned-phrase gate matches whole words (+ plural/-ly), so "unlocked" no longer trips "unlock".

## 2026-10-08 — v0.6 (loaded-plugin test + spot check)
- The image list is now the FIRST chat message (printed in the reply, not only saved to `<job>/IMAGES-TO-SOURCE.md`), before rules, sitemap or research. Verified in a headless run with the plugin loaded.
- Skill + researcher: one plain shell command per call (chained `cd &&`, variables, `mkdir`, `curl` caused permission prompts).
- Package HTML: no hard-coded numbers at all. A main line that is not a department number is replaced by the other department's tag; new gate fails on any `tel:+1…` in the package.
- Added docs/QUICKSTART.md (first article, end to end, for colleagues).

## 2026-10-08 — v0.7 (from the Brickell Mazda live fix; local, not yet pushed)
- Paste-safe site-wide CSS: one rule per line, ASCII only, no backslash escapes (FAQ +/− drawn with CSS), end marker `.{p}-art{--da-css-version:v<hash>}`; new gate.
- Dealer facts use div/span (Apollo's editor moves <div> groups out of <dl>); CSS also styles the structure already saved by Apollo.
- Dealership layout = Bentley-style (user choice) for ALL dealers with a storefront photo: photo at natural shape, black Department band below the photo, two columns from 768px; text-only when no photo.
- Logos wider than 1,000px are requested at 700px (Bentley Edison 541 KB -> 13 KB; fixes its logo not loading; Toyota/Ford/Lincoln lighter).

## 2026-10-09 — v0.8: brand compliance terms ledger
- New `resources/rules/brand-terms.json`: OEM wording rules with id, brand, banned term, replacement, severity, source, date. MB-001 Mercedes-Benz never "coupon" (use "Offer"/"Service Offer"); TOY-001 Toyota "TSRP" not "MSRP".
- Build gate "Brand terms ledger" (copy, titles, meta, alt text, slug); dollar gate uses the brand price term (TSRP for Toyota).
- Compliance reviewer reads the ledger (violation = P0) and proposes NEW LEDGER CANDIDATE rows; compliance.md §2b, rigor R6, SKILL rule 4 updated.
- Ledger research (10/09): TSRP corrected to Total Suggested Retail Price; sources added; advisory MB-002 (distress words), MB-003 (pricing-claim words), MB-004 (unsubstantiated superlatives).

## 2026-10-09 — v0.9: verified legal rules + state scope
- 11 LAW-* ledger rows (FTC Pricing Transparency FAQs 09/15/2026, Reg Z/Reg M trigger terms, rebates/savings, free, availability, MSRP "not a dealer price" requirement, NJ no $ figures, CA SB 766 advisory); engine supports `states`, `appliesTo` and `if`/`require` rules. Toyota articles show no competitor prices.

## 2026-10-09 — v0.10: DealerInspire (Mercedes-Benz stores), same workflow
- New skill `/article-dealerinspire "<dealer>" "<title>"` for DealerInspire (WordPress) dealers. It reads `/article-apollo` and follows every phase: premise test, primary-source ledger, researcher agent, golden-geo ARTICLE MODE, frontend-design craft pass, separate compliance and golden-geo reviewer agents, brand/legal ledger gate. Only the image upload, the platform rules and the packaging differ: every article on every platform gets the same rigor.
- 5 new dealers (`platform: "dealerinspire"`): Mercedes-Benz of Laguna Niguel (`mbl`), Mercedes-Benz of Foothill Ranch (`mbf`), Mercedes-Benz Vans of Laguna Niguel (`mblv`, Sprinter), Mercedes-Benz of Midlothian (`mbm`), Mercedes-Benz of Richmond (`mbr`). Phones and hours verified on each site's About Us/Contact page from a US location (10/09). 13 dealers in total (8 Apollo + 5 DealerInspire).
- DealerInspire package (`<job>/package/`): `<slug>-embed-Wired.html` is the ONLY paste file, one line on purpose (inline CSS + article + a small helper script that links `[di_option]` phone numbers and condenses `[di_hours]` to one line + trimmed JSON-LD: AutoDealer+AutoRepair `#autodealer`, BlogPosting, FAQPage; Yoast emits the rest). `<slug>-SEO.md` lists the WordPress + Yoast fields as `* Field  →  value` (title, slug, parent page/category, featured image, SEO title, meta description, focus keyphrase, Facebook and Twitter title/description/image; social image = hero, never empty). `README.md` has the paste steps (Text tab / Page Composer "Use WordPress Content", never Visual or Raw HTML; then Reload Cache; check with `?cb=`). No site-wide CSS file and no separate Structured Data file.
- Local preview = the paste file after a WordPress wpautop simulation, with the shortcodes rendered as the site renders them, inside a DealerInspire theme shell (Page Composer page or Classic post).
- Phones and hours use `[di_option option="di_phone_service|di_phone_sales"]` and `[di_hours department="Service|Sales"]`, only where verified per store (`di.shortcodes`, `di.hoursDepartments`). The JSON-LD keeps the real numbers. Numbers or clock times written in prose fail the build.
- Images: WordPress Media Library File URLs (the original, not a `-WxH` copy) in module `images.<KEY>.di` (Apollo keeps `apollo`). `images` verifies them; `build --final` requires this store's uploads host; `/article-images` accepts them.
- URLs: California stores' articles sit under the store's article parent page (`di.parentPath`, e.g. `/service/service-and-parts-tips/<slug>/`); Virginia stores use `/<slug>/`. `new` sets the path. A DealerInspire page can be refreshed in place at the same URL.
- Dealer file additions: `platform: "dealerinspire"`, `di { uploads, template, postLayout, category, parentPath, shortcodes, hoursDepartments }`, `style.fonts { head, body }` (optional brand font stacks: Corporate A/S with Georgia/Roboto fallbacks for the Mercedes stores; absent for Apollo, so Apollo output is unchanged), dealer-level `allowPhrases[]` (official OEM program names that contain a banned word, e.g. "Premier Prepaid Maintenance"), `images.STORE/LOGO.di`, optional `brandLine`.
- DealerInspire build gates (❌): paste file is one line with the right shape (root div, one `<style>`, helper script, JSON-LD last); JSON-LD has no `[di_` shortcodes, `%%` tokens, Apollo tags or raw `<`; phones use shortcodes (no hard-coded department numbers or `tel:` links); hours only via `[di_hours]`; no `<br>`/`<pre>`/`<textarea>`; no `<a>` wrapping block elements; helper script compiles; inline CSS fully scoped; Yoast sheet complete; `--final`: every image is a DealerInspire upload of this store. ⚠️ shortcode coverage; wpautop simulation (`<p>` count). All shared gates apply unchanged (banned phrases, brand/legal ledger incl. MB-001 and the advisory LAW-CA-01 for California stores, FAQ parity, link allow-list, depth gates, dashes, `rem`, toll-free, `$` figures).
- Engine fixes: the "Package phones use Apollo tags" gate again detects hard-coded department numbers with a phone-shaped match (a regex typo had weakened it); `shot` works with very long Windows paths (renders from a short temp copy); dealer-level `allowPhrases`; the CSS scope check accepts sibling selectors anchored on the article.
- Ledger: MB-001…MB-004 also apply to brand "Mercedes-Benz Vans".
- Maintainers: `node test/snapshot.js compare` (and `--platform dealerinspire`) must print `identical` before every push; baselines `test/baseline-apollo.json` and `test/baseline-dealerinspire.json`. An intended output change = re-record + a CHANGELOG note. The Apollo snapshot (8 dealers × draft/final × sales/service: 192 files + gate lines) stayed identical through the whole DealerInspire change.
- Docs: README and QUICKSTART cover DealerInspire; CONTRACT documents the DealerInspire dealer fields, outputs and gates, and lists the depth gates as ❌ (as the code has done since v0.4); ROADMAP: next is v0.11, the Dealer.com adapter.
- **Easier to find in every Claude app.**
  - New router command `/dealer-articles:article "<dealer>" "<title>"`. It picks the Apollo or DealerInspire workflow from the dealer.
  - All docs and skills now use the full plugin command names (`/dealer-articles:…`). Plugin skills are always namespaced, which is why `/article-apollo` alone was "not found" for some colleagues.
  - README/QUICKSTART: where it works (Desktop **Code** tab with a **Local** session, terminal, IDE; not Chat/Cowork/cloud), Desktop install steps (+ → Plugins → Add plugin), auto-update is off until each user turns it on, `/reload-plugins`, and a fallback prompt for sessions without the plugin.

## 2026-10-11 — v0.11: Claude Desktop app and claude.ai (Cowork and Chat)
- **Fixes from the 10/11 probe in the Desktop app** (Chat and Cowork are one cloud experience on Pro/Max since 09/2026;
  Node 22, plugin agents load, downloads appear as download cards):
  - `${CLAUDE_PLUGIN_ROOT}` is not filled in there: the router finds the plugin with `find` and `env` prints the plugin root.
  - Jobs go to `/mnt/user-data/working/articles` in the cloud workspace (`env` prints the jobs folder); never inside the plugin folder.
  - Delivered files are shared with the app's share-files tool so they show as downloads.
  - Screenshot browser: the cloud workspace's Chromium (`/opt/pw-browsers`, `/opt/google/chrome`) and `--no-sandbox` when running as root; if `shot` fails, the written design checklist is used.
  - Network through the sandbox proxy: with the domain allowlist on **All domains**, the cloud workspace reaches the web only via `HTTPS_PROXY`, which Node ignores. `images` and `env --net` now tunnel through it (CONNECT), and Chrome gets `--proxy-server`. Tested with a local allow/deny proxy: DealerInspire images verified through it; denied hosts show as blocked.
  - Apollo image server: since 10/2026 it answers HTTP 403 to every script request (also v0.10, also curl from a PC). The workflow treats that as the "unverified" image path.
  - Docs: one "new chat/task" path instead of Cowork vs Chat; domain allowlist = All domains (image-size checks), research works either way.
- **Works where the team works.** The plugin is installed on the claude.ai account (Customize → Plugins → Add marketplace
  `kaloat01/dnb-claude-plugins`, private repository) and syncs to the Desktop app (Mac, PC), the browser and Claude Code.
  - **Cowork (recommended):** full workflow with separate researcher and reviewer agents.
  - **Chat:** same steps and checks; Chat ignores plugin agents, so the lead follows the researcher file itself and runs the
    two reviews as a strict "single-conversation review" (two separate passes, findings written before any fix). The
    router asks once whether to continue in Chat or switch to Cowork.
  - Surface rules in `/dealer-articles:article-apollo` (also followed by DealerInspire): AskUserQuestion or plain-text
    questions, `shot` only when a browser exists (otherwise the written design checklist, `design-and-apollo.md` §4 "no
    browser"), images "unverified" path when the app blocks the image hosts, downloads via `deliver`.
  - Requires Settings → Capabilities → Code execution and file creation (and network access, ideally all domains).
    `/dealer-articles:article-setup` now checks the Desktop app / claude.ai setup and keeps the Claude Code checks.
  - Mobile apps are not supported for building articles.
- **HANDOFF:** every build writes `<job>/HANDOFF.md` and prints it between `=== HANDOFF ===` markers: status (FINAL, DRAFT,
  NOT READY), version, dealer, platform, URL, review mode, every SEO/Yoast/social line, files to paste, paste steps and
  open flags. Every run now ends with this block, verbatim, so the SEO/Yoast fields always reach the user.
- **Version stamp:** `env` prints `dealer-articles v0.11.0 (2026-10-11)` first; the skills show it in the first message
  and `job.json` records the version of the last build.
- **New commands:** `env --net` (reachable/blocked image hosts, fonts and a dealer site; download folders), `review <job>
  --mode separate|single` (recorded in the handoff), `deliver <job> --to <dir>` (paste files + `<slug>-HANDOFF.md` +
  `<slug>-resume-kit.zip` as downloads, slug-named so articles never overwrite each other), `resume <kit.zip>` (continue an article in a new task or chat).
- **Routing fix:** `/dealer-articles:article-apollo` now hands DealerInspire dealers to the DealerInspire workflow (the
  reverse already existed), and the router runs `env`, decides the surface and handles resume kits.
- **Gate failures are marked:** a failing build is NOT READY in the handoff and its package README starts with "NOT READY:
  gates failed … Do not paste."
- **Ledger hard-fail:** a missing or malformed `brand-terms.json` fails every build (and shows ❌ in `env`); it can never
  pass silently.
- **Social title warning:** ⚠️ when the OG / Facebook / Twitter title is over 70 characters.
- **Removed the "clone the repository" fallback prompt** from the README, Quick start and skills. It could run without the
  engine (an old copy lacked a dealer, and no Yoast sheet came out). The repository becomes private; use the installed
  plugin only.
- Docs: README and QUICKSTART lead with the Desktop app / claude.ai (install on the account, Capabilities, Cowork vs Chat,
  images, downloads, finishing later with the resume kit) and keep a short Claude Code section; CONTRACT documents the new
  commands, the HANDOFF contract and the surface matrix; ROADMAP: Dealer.com moves to v0.12.

## 2026-10-12 — v0.11.1: current, easy-to-find photos and a shorter chat
- **Image requests** (`image-brief.md` §2, rewritten after a Richmond MBUX run asked for a driver's-seat view through the
  steering wheel and a hand on the wheel controls):
  - **Current:** vehicles are "any <last year>–<next year> <brand or model>" (October 2026: 2025–2027) of a model still
    sold new, never a previous generation of the article's model.
  - **General:** one subject; never camera positions, hands, specific screens or a head-up display, parts, warning
    lights, trims or colours, or "ideal if" extras.
  - **Easy to find online:** only 5 shot types every brand press gallery has (outside, driving, dashboard, seats,
    place/people).
- **Library:** vehicle photos whose design was last sold new before MY2025, or whose model is no longer sold, are marked
  `"outdated": true` (+ `outdatedWhy`) in the store catalogs and are never reused; a photo the user sends that is older
  than last year's model year is rejected with a request for a current one.
- **DealerInspire:** the image list tells the user to resize photos to 1,900px wide and under 1MB (the upload limit).
- **Chat style** (all article commands): action first ("Your turn:" + numbered steps and the exact reply), at most ~8
  lines except the image list and the HANDOFF, one question at a time, no internal terms. The image list follows a fixed
  short shape (§6); the version goes in its header line. Chat's single-conversation review writes its reports to
  `<job>/qa/` instead of the chat.
- Engine: version stamp only (0.11.1); package output unchanged.

## 2026-10-12 — v0.11.2: fixes from the first Richmond test run
- **DealerInspire sales articles build again** on the 4 stores without a verified Sales `[di_hours]` department (Foothill
  Ranch, Laguna Niguel, Richmond, Vans). The text fallback put `<br>` in the dealership box, which the engine's own
  wpautop gate rejects. The fallback now prints the same list markup the shortcode prints (one line on the page).
- **Richmond:** the Sales hours shortcode is on (the site's hours widget lists a Sales department; confirm on the live
  article).
- **Dealership box, sales articles:**
  - Link only a vehicle-offers page as "Current offers". `routes.specials` is the SERVICE specials page on every dealer,
    so 7 stores (5 Mercedes-Benz, 2 Bentley) linked service specials from sales articles.
  - No "Main line" when it is the same number as the department's; the other department's number shows instead.
  - "Start online: <a>Schedule a Test Drive</a> on our website." replaces "… any time." (service keeps "Book online …
    any time.").
- **No false "01, 02 numbering" warning** from upload URLs such as `/2026/09/` (every DealerInspire article had it).
- **Resume kit:** a local dealer override (`./dealers/<key>.*`) travels in the kit and `resume` restores it (never over
  a different local copy without `--force`), so a new conversation rebuilds the same article.
- **`/article-images`:** a job started before v0.11.1 gets the short, current photo list again before photos are asked
  for; any current §2 shot that suits the article is accepted, and a caption that no longer fits its photo is rewritten.
- **Tests:** `test/snapshot.js` refuses any draft case that fails a gate (the `<br>` FAIL had been recorded in the
  DealerInspire baseline since v0.10). Baselines re-recorded; every change was reviewed case by case.
