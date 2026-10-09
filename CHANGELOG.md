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
