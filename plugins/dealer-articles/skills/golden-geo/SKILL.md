---
name: golden-geo
description: SEO/GEO/AEO rules for dealership pages. In this plugin, use ARTICLE MODE for long-form articles (comparisons, buying guides, service guides): title/meta/H1/keyphrase placement, answer-first H2s, FAQ and FAQPage parity, BlogPosting schema, internal links from the sitemap allow-list, entity/NAP consistency and AI-citability. Also covers service/offer pages (PAGE MODE) via the full Golden Rules playbook.
---

# Golden GEO (SEO, GEO and AEO for dealership pages)

Operating principle: we do not "write SEO content". We build the clearest, most useful, most crawlable, most locally
grounded answer to a real buyer's question. Search engines and AI answer engines are downstream consumers of that clarity.
Priority when rules conflict: accuracy → usefulness → crawlability → entity clarity → answer extraction → keywords →
design → schema → performance → conversion.

Pick the mode first:
- **ARTICLE MODE** (default in this plugin): long-form education, comparison, buying-guide and ownership articles.
- **PAGE MODE**: service-special, offer and local landing pages. Read
  `${CLAUDE_PLUGIN_ROOT}/skills/golden-geo/golden-rules-playbook.md` (sections 4–7) and apply it as written.

## 1. ARTICLE MODE

**Waived service-page rules (do not flag these on articles):** price/offer in the first 100 words; Service, Offer and
OfferCatalog schema; 8–12 FAQs; "H1 must contain the service"; the playbook's Apollo section (8.1, see section 4 below).
Articles carry no prices unless they are labeled MSRP in a comparison
(`${CLAUDE_PLUGIN_ROOT}/resources/rules/rigor-and-content.md`, section 8).

**Article rules:**
1. **One intent, one reader decision.** The H1, title, dek and first bold answer all serve the same query. Check the dealer
   sitemap for an existing page with the same intent (cannibalization) and flag it.
2. **Title** 50–65 characters, topic first, city when it fits ("| Miami"). **Meta** 130–165 characters: what the reader
   learns + dealer + city + next step; no promises, no filler, not a copy of the title.
3. **Focus keyphrase** appears in the title, the H1, the dek and the first bold answer. Use it naturally elsewhere; never stuff.
4. **One H1**, in the content (Apollo SEO-form H1 left blank). Approved wording, topic + city where natural.
5. **Answer-first.** "At a glance" = 4 bold takeaways that answer the query alone. Every H2 is a real question or decision,
   opened by a bold answer (≤25 words) that runs inline into the detail.
6. **FAQ:** 9–10 questions, 40–90 words each, first sentence answers, adds new value (not an H2 repeat), visible in the
   HTML via `<details>`, and **identical** in FAQPage (questions and answers, word for word).
7. **Schema (the engine builds it; you verify it):** WebSite, WebPage (`primaryImageOfPage` = hero), BreadcrumbList,
   AutoDealer + AutoRepair `#organization` (address, geo, department nodes with phones and hours), BlogPosting (headline,
   dates, image, author/publisher = the dealer organization), FAQPage. Stable `@id`s. **No AggregateRating, no Review, no
   Offer.** JSON-LD must parse.
8. **Internal links:** 12–25 unique, all from the dealer sitemap allow-list, descriptive anchors, real `<a href>` links.
   Always a hub up-link, money pages (schedule, specials, inventory/finance as relevant), 1–3 area pages and a related guide.
   Never link pages that contradict OEM facts, broken tools, or pages with risky promises.
9. **Entity and NAP consistency:** dealer name, address, department phone and hours are identical in the visible page and
   the schema; the phone matches the article's department (service vs sales). Use the dealer file only.
10. **AI-citability (GEO):** write quotable sentences that stand alone (name the subject, model year and scope in the
    sentence); use tables with a source + date note; show "Updated MM/DD/YYYY"; date time-sensitive facts ("as listed on…");
    name entities exactly as their owners do (OEM model and program names, agency names); list sources reviewed in the fine
    print and link a few primary sources (OEM, NHTSA, EPA, FTC). Avoid citation blockers: self-contradiction, hidden facts,
    vague marketing copy, unsupported claims, expired offers.
11. **Human copy:** advisor voice, average ~13 words per sentence, no banned phrases, no em/en dashes, no "01, 02"
    numbering. Full list: `rigor-and-content.md` section 5.
12. **Images:** descriptive alt text from what the photo shows, width and height set, below-fold images lazy, hero as the
    schema image. Rival vehicles are never pictured.
13. **Canonical** = the exact public URL (Apollo: extensionless, no trailing slash). OG title/description from the SEO sheet;
    on Apollo there is no og:image field, so the hero lives in the schema.

**ARTICLE MODE checklist (blockers ❌ / warnings ⚠️):**
- ❌ 0 or 2+ H1 · JSON-LD does not parse · FAQPage ≠ visible FAQ · NAP/phone/hours mismatch page vs schema ·
  AggregateRating or Offer present · internal link not on the allow-list · unsupported claim, fake credential, invented
  dealer fact · expired offer stated as current · price without the MSRP rules · banned phrase or dash in copy.
- ⚠️ Title outside 50–65 · meta outside 130–165 · keyphrase missing from title/H1/dek/first bold answer · H2 count not 8–9 ·
  FAQ count not 9–10 or answers outside 40–90 words · fewer than 12 links or no hub up-link · bold answer >25 words or
  stand-alone · weak alt text · no "Updated" date · sources line missing · cannibalization with an existing page.

## 2. Golden rules, distilled for articles (playbook rule numbers in brackets)

- [1] One page, one primary intent; secondary keywords support it, never compete with it.
- [2] Title tag = the search-result pitch: topic and location early; no neighborhood stuffing; no generic titles.
- [3] Meta = a useful pitch: what, where, who, next step; specific; no overpromise; not a copy of the title.
- [4] Exactly one H1 that plainly says what the page is; creative lines go below it.
- [5] The direct answer comes first (the dek + At a glance + the first bold answer), in plain English, extractable.
- [6] H2s are jobs-to-be-done: they carry the topic, the place, the problem or the decision ("Which buyer fits the CX-50?"),
  never "Overview" or "Why it matters".
- [8] Quotable passages: a question heading, one direct sentence, one or two supporting sentences.
- [9] FAQs are the long-tail engine: cover cost drivers, timing, eligibility, models, local conditions, warranty, next steps;
  first sentence answers; `<details>`, never hidden from the HTML.
- [10] Schema is an entity graph with stable `@id`s, not disconnected blocks.
- [11] One canonical business identity; department phones explained by department nodes; one address and one geo
  everywhere.
- [13] Local relevance = real context (address, department hours, real roads, climate, local use cases), tied to the topic.
- [14] No fake local stuffing: fewer places, all believable; no "serving all of Florida".
- [15] Strategic internal links with descriptive anchors to hubs, money pages, siblings and guides.
- [16] Crawlable links: real `<a href>`, never JS click handlers.
- [17] Core content (H1, answers, FAQ, NAP, CTAs, alt text, JSON-LD) is in the HTML, not injected by JS.
- [18] Scoped CSS under one prefixed root class; no global selectors or resets. (Apollo heading guards are a documented
  `!important` exception.)
- [19] CSS is for experience, never for hiding content; use `<details>` for accordions.
- [20] Mobile first: readable, tappable phone links, tables scroll inside their wrapper, no horizontal scroll.
- [21] Core Web Vitals sanity: compressed images (webp, width-capped), width/height on images, lazy below the fold, no layout
  shift.
- [22] Descriptive image filenames and alt text; never "image", "car" or keyword strings.
- [25] Copy sounds human: no AI clichés ("look no further", "seamless", "elevate", "nestled", "comprehensive solution"…).
- [26] Expertise without fake authority: process detail, OEM terminology, model caveats, when advice does not apply; never fake
  staff quotes, certifications, review counts or "best in town".
- [27] Tables and lists where they help extraction (comparisons, cost drivers, intervals, steps); they must stack or scroll on
  mobile.
- [29] Competitor pages are a structure tool: study coverage, never copy wording, never cite them as sources.
- [30] Map the keyword cluster before writing: primary, 6–8 secondary, 8–10 questions, local and model modifiers, the hub.
- [31] No doorway pages: never clone an article per neighborhood.
- [32] Self-referencing absolute canonical; never staging or an unrelated hub.
- [33] OG/Twitter values come from the SEO sheet (on Apollo: OG title/description fields; the platform supplies og:image).
- [39] QA like a publisher before paste: one H1, title, meta, canonical, JSON-LD valid, links work, images load, alt text,
  FAQ visible, no CSS leaks, no horizontal scroll, no unsupported claims, no clichés, no dashes.
- [41] Keep design patterns stable: Editorial v2 for every article, every dealer.
- [42] Brief before writing: dealer, URL, keyphrase cluster, intent, department phone/hours, address, allowed areas, models,
  related pages, FAQs, do-not-say list (the source ledger is this brief).
- [43] Source-of-truth files: the dealer file, the sitemap allow-list and the ledger; never retype NAP from memory.
- [44] Schema and visible content stay synchronized: nothing in schema that is not on the page.
- [45] Answer blocks with human labels ("At a glance", "What to know"), never "AI answer".
- [47] Mention models naturally where they help (one sentence or a model FAQ), never a stuffed list.
- [48] Use the OEM's exact terminology (program, warning and feature names); never imply the dealer created OEM requirements.
- [49] Write like a good advisor at the desk, not a copywriter.
- [50] Cite strategically: OEM, NHTSA, EPA, FTC and the dealer's own pages; never random blogs, competitor pages or
  unsourced statistics.

## 3. How to run an ARTICLE MODE pass

1. Read the job's `module.js`, the preview `<slug>-preview.html`, the ledger and the dealer file.
2. Check sections 1 and 2 above. Fix in `module.js` only; never hand-edit generated files. Rebuild with
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js" build "<job>"` and re-check FAQ parity and links.
3. Report:
```
GOLDEN-GEO (ARTICLE MODE) — <slug>
Title (<n> chars): … · Meta (<n>): … · Keyphrase in title/H1/dek/first bold: ✅/❌
H1: 1 · H2: <n> · FAQ: <n> (<min>–<max> words) · Links: <n> unique, hub up-link ✅/❌
Schema: parses ✅ · FAQ parity ✅ · NAP/phone/hours match ✅ · no AggregateRating/Offer ✅
Fixed: … · Open (needs user/dealer): …
```

## 4. Superseded and non-applicable parts of the full playbook

- **Playbook section 8.1 (Apollo: "paste full HTML document", "keep the Font Awesome kit") is superseded** by
  `${CLAUDE_PLUGIN_ROOT}/resources/rules/design-and-apollo.md`: Apollo gets an HTML **fragment**, a site-wide CSS slot with
  no icon kit, raw JSON in Custom Structured Data with Replace checked, and the SEO form with the H1 field blank.
- Playbook sections 5–7 (service-page skeleton, Offer/OfferCatalog JSON-LD) apply to PAGE MODE only.
- Playbook rule 18's "no `!important`" yields to the documented Apollo heading guards.

## 5. Deep reading (optional)

The full Golden Rules playbook ships with this skill:
`${CLAUDE_PLUGIN_ROOT}/skills/golden-geo/golden-rules-playbook.md` (rules 1–50 with examples, AEO/GEO mechanics, local SEO,
technical and performance checklists, measurement). Read it for PAGE MODE work or when a rule here is unclear.
