# Rigor and content standard (dealer long-form articles)

This is the bar every article must clear. Each rule exists because something went wrong or was rejected; the incident is
in *(italics)* next to it. Keep the incidents in mind: they are what stop you from "simplifying" a rule away.
Related files: `${CLAUDE_PLUGIN_ROOT}/resources/rules/compliance.md` (review gate),
`${CLAUDE_PLUGIN_ROOT}/resources/rules/design-and-apollo.md` (design + platform),
`${CLAUDE_PLUGIN_ROOT}/resources/rules/image-brief.md` (images).

## 1. The standard in one table

| Dimension | Bar (measurable) |
|---|---|
| **Truth** | Every factual sentence traces to a row in the primary-source claim ledger (OEM, government, statute, tool owner). Zero HOLD items used. The title premise is tested against the OEM **before** drafting. |
| **Depth** | Body (intro to last H2) 1,700–2,300 words. 8–9 question H2s, each opened by an inline bold answer. 9–10 FAQs of 40–90 words that add new value. 1–3 sourced tables, 1 callout with verbatim OEM/legal wording, 1 steps list, 1 stat strip, 1 inline CTA, a local section using real places and climate only. |
| **Fairness** (comparisons) | Same model year and same source type for both vehicles. The rival's real advantages stated plainly. A "which buyer fits which" verdict. No disparagement. Every comparative claim substantiated. Pitch from documented strengths only. |
| **Compliance** | Independent adversarial review returns no open P0/P1 (see `compliance.md`). |
| **SEO/GEO/AEO** | Title 50–65 chars, meta 130–165. Keyphrase in title, H1, dek and first bold answer. One H1. JSON-LD parses. FAQPage equals the visible FAQ word for word. 12–25 internal links, all from the dealer's sitemap allow-list. golden-geo review with no open blockers. |
| **Design** | Editorial v2, identical for every dealer; brand color on links only. Hero + 2 full-width figures + 1 pair. No "01, 02" numbering. |
| **Platform safety** | Renders correctly in the Apollo shell at 1280 and 375: one visible H1, no theme font leak, no overflow, buttons not underlined, grids intact. |
| **Live truth** | After publishing: one visible H1, head tags equal the SEO form fields, structured data parses, images load. |

**The most important number:** 12 of 12 articles came back from independent review as REVISE, never READY.
Writers do not catch their own errors. The review gate is the product.

## 2. Non-negotiable rules (R1–R15)

**R1. Evidence before prose.** No fact is written until it is in the ledger with a primary URL, a retrieval date, a
confidence level and a restriction. *(Reviewers found unsourced claims in every draft.)*

**R2. Test the title premise against the OEM before drafting.** If the number, model year or claim in the requested title
is not published by the OEM, propose a corrected H1 and get approval before writing.
*(Honda: "spark plugs at 100k" is not a Honda interval, so the H1 became "Near 100,000 Miles". A GLE vs X5 title: the OEM
listed only the next model year. A GLC vs X3 title: no shared model year. A battery-warning title: the message text was not in
the current manuals. 4 of the last 5 titles failed the premise test.)*

**R3. Independent review before the user sees it.** A compliance reviewer plus a golden-geo reviewer, both read-only; fix
every P0/P1. *(12 of 12 drafts were REVISE. One battery article had 2 P0s: a battery-location claim misattributed to the OEM,
and safety conditions missing before jump-start steps.)*

**R4. Pilot, then approval, then scale.** Build one article end to end, get approval on content and design, then write the
rest on the approved model. *(Corrections are cheap on 1 article and expensive on 4.)*

**R5. Never invent dealer facts.** No prices, ratings, awards, credentials ("certified / factory-trained / master
technician"), urgency, guarantees, inventory claims, road-proximity claims or capability promises. Attribute dealer
statements ("Our service page lists…") or phrase them as "can" / "ask".
*(Reviewers caught "close to I-64", "a short drive from VA-288", "Our team uses them…", "we also serve drivers from across
the area", "line up a back-to-back drive".)*

**R6. No dollar figures** unless they are OEM-published MSRP (labeled "MSRP", dated, model-year labeled, exclusions stated)
or dealer-published, current, with verbatim disclaimers. Trade-in and valuation topics never carry dollar figures.
"What it costs" topics are answered with cost drivers (section 9). *(FTC and state dealer-advertising rules; see
`compliance.md`.)*

**R7. General images, specific copy.** Reuse the dealer's existing library first; source new images only for model-specific
slots. Vehicle photos must match the article's model year. View every photo before writing alt text or captions.
*("Filenames lie": a file named for one model showed another model.)*

**R8. Design = Editorial v2, identical for every dealer; brand color on links only** (+ the dealer logo in the dealership
section). Exceptions only when a written brand rule or the platform forces them. Never a per-brand redesign. Never "01, 02"
numbering. *(The first Honda pilot was rejected for heavy brand styling; numbering was called "a giveaway that it was written
by Claude"; a later "light brand layer" proposal was withdrawn by the user the same day.)*

**R9. Know the platform before designing.** On Apollo this is already encoded in the build engine (custom pages, fragment,
scoped guards). For any other shell, inspect a live page and the theme CSS first: what the editor strips, who owns the H1,
sidebars and width caps, `!important` traps. *(Apollo blog posts strip classes; another CMS's post template has a sidebar that
squeezes the article to ~900px; another CMS owns the H1.)*

**R10. Render-test inside the platform shell, not just the preview.** Static QA never proves layout.
*(Apollo `body h1{font-size:20px!important}` shrank the H1; a service page went live unstyled while static QA passed.)*

**R11. Internal links come only from the dealer's current sitemap allow-list.** The build fails any link not on it.
*(Hallucinated and stale URLs.)*

**R12. Verify live after publishing** (cache-busted): text and images vs the build, head tags vs the SEO fields, H1, schema.
*(Two live articles shipped with the hand-entry SEO title and social image never entered. Only a live check caught it.)*

**R13. Comparisons are fair.** Same model year when pricing (or labeled cross-year with user approval). Concede the rival's
leads in plain words. Verdict = "which buyer fits which". No "safer than", no "more reliable than", no "5-star" beyond the
exact NHTSA scope. *("Only the GLC offers a plug-in hybrid in the U.S." had to become "Unlike the U.S. X3 lineup, the GLC
offers a plug-in hybrid.")*

**R14. Safety-critical instructions are copied from the manual with all their conditions** (frozen battery, EV exceptions,
"if the message does not disappear…"). *(Battery article P0: frozen-battery and EV conditions were missing before the
jump-start steps.)*

**R15. Scripted edits are verified.** Edit `module.js` with the Edit tool. For any scripted replacement use a function
replacer or split/join when the text contains `$`; write scripts to a file (not heredoc or `node -e`); every patch reports
applied/missing counts; then `node --check module.js` and rebuild. *(Patches silently failed or broke escaping, e.g. an
apostrophe inside single quotes; `$1,099` was read as a regex capture group.)*

## 3. The method (6 phases, our version)

1. **Evidence pack.** Pin the dealer, market, audience, funnel goal and the one reader decision. Verify NAP, department
   phones and hours, and URLs. Build the claim ledger from primary sources; mark each fact static or time-sensitive, and keep
   OEM facts, dealer statements and our own inferences in separate columns.
2. **Question graph.** Brainstorm the buyer's questions (cost, timing, comparison, ownership, local use, objections). Score
   each for relevance, distinctness, evidence available, buyer value and extractability. Keep 8–9 non-overlapping questions
   for the H2s; drop any question you cannot source.
3. **Framing.** Settle model year, geography and scope before drafting. Never narrow the scope silently (a whole-line title
   must not quietly become one trim). Write the answer-first thesis: the dek plus the 4 "At a glance" takeaways.
4. **Drafting.** One H1, question H2s, bold answer first, then detail. Tables only where they help comparison, each with a
   source and date note. Label estimates and inferences. CTAs only where they serve the intent (no CTA saturation).
5. **Search layer.** Title, meta, slug, canonical, focus keyphrase; quotable sentences; dates and model years in plain view;
   sources in the fine print and a few primary external links; schema that mirrors the visible page.
6. **Adversarial QA.** Independent compliance + golden-geo reviews (`compliance.md`). Never call an article READY while a
   time-sensitive automotive fact lacks a primary source. A human approves publication.

Defects this method beats: no citations, no schema, no body H1, stale claims, silent scope narrowing, CTA saturation,
over-localization.

## 4. Article anatomy (fixed order; module field in brackets)

1. Hero image [`hero`] (full-bleed if ≥1,900px wide, otherwise contained).
2. Eyebrow [`eyebrow`], e.g. "Model Comparison · Miami, FL".
3. **H1** [`h1`]: the approved wording, topic + city where natural.
4. Dek [`dek`]: 2 sentences containing the focus keyphrase.
5. Meta line (built): dealer · Updated MM/DD/YYYY · N min read.
6. **At a glance** [`glance[4]`]: 4 bold takeaways that answer the query on their own.
7. Table of contents (built from `h2.toc`): square bullets, no numbers.
8. **8–9 H2 sections** [`blocks`]. Each H2 is a question; the first paragraph opens with a bold answer (≤25 words; split if
   longer) that runs inline into the detail. Across the article include: 1–3 tables (source + date note), 1 callout
   (verbatim OEM/legal wording), 1 steps list, 1 stat strip (3 sourced numbers), 1 inline CTA, **2 full-width figures + 1
   pair**, and one local section.
9. **FAQ** [`faq`]: 9–10 Q&As, 40–90 words each, first sentence answers, new value (not H2 repeats). Mirrored exactly in
   FAQPage (the build does this).
10. **Dealership section** [`dealerSection`]: storefront + logo band, a short factual paragraph, address, department phone +
    hours, the other department's phone, department CTA + Get Directions.
11. Closer band [`closer`]: department phone + hours, 2 CTAs.
12. Keep reading [`related[3]`]: 3 cards, all from the allow-list.
13. Fine print [`fine`]: sources reviewed + date, "the OEM documents govern", exclusions, trademark and no-endorsement lines.

If a bold answer would be followed directly by a figure, list or callout, add a one-line lead-in paragraph. A paragraph
containing only bold text is a build failure. "Seems shorter" is an image-rhythm problem first, not a word-count problem.

## 5. Voice

- Advisor voice: a good service or sales advisor explaining at the desk. Active verbs. Average sentence ~13 words; rewrite
  anything over 25 words unless it quotes a source verbatim.
- No em dashes or en dashes in copy (numeric ranges like 7–6 excepted). No "01, 02" numbering on H2s, TOC or anywhere
  (*"a giveaway that it was written by Claude"*). Steps use plain 1, 2, 3.
- Avoid repeated "not X, it is Y" constructions, rhetorical questions as filler, and stacked adjectives.

**Banned words and phrases** (the build fails on most of these; dealer files add their own):
look no further · premier · seamless · elevate · nestled · unmatched · best-in-class · state-of-the-art · unlock ·
peace of mind · top dollar · guaranteed / guarantee · best price · price match · certified technician · factory-trained ·
factory-certified · master technician · whether you are · when it comes to · in today's market · fast-paced ·
comprehensive solution · designed to meet all your needs · committed to excellence · puts it simply · puts it plainly ·
avoids surprises · closer than most · outguns · lorem · TODO · UNVERIFIED.
Dealer-level bans come from the dealer file `bans` (for example, warm markets ban snow, road salt and winter framing; a
brand may ban an unsold program name).

**allowPhrases rule:** when verbatim OEM, legal or tool-owner wording contains a banned word, quote it exactly and add that
exact phrase to the module's `allowPhrases`. Never paraphrase a legal line to dodge the gate.
*(Battery manual: "Full vehicle functionality is only guaranteed…"; a valuation tool: "values are not guaranteed".)*

## 6. Claims discipline (what reviewers enforce)

- **Strength matches the source:** "recommends" ≠ "requires"; "may not be covered" ≠ "voids"; "inspect" ≠ "replace" or
  "adjust"; "announced" ≠ "available"; "optional" ≠ "standard"; "notes" ≠ "recommends".
- **Scope is explicit:** model year, trim, drivetrain, engine, market, and which manual. *("Every GLC is AWD" was false: one
  trim is rear-drive. "The manual says 30 min" applied one model's wording to models whose manuals say 30–60.)*
- **Keep the source's conditions:** "whichever comes first", "when purchased at the same time as your vehicle", new-vehicle
  eligibility, transfer/cancel disclaimers, the FTC "if the warranty says the work will be done for free" condition.
- **Attribute inference to yourself:** "We would give the same advice for any AWD SUV", never "the OEM says…" for our view.
- **Absence claims** stay worded as absence of listing ("BMW does not list a third-row option"), medium confidence.
- **Absolute words** ("only", "every", "never", "new") need a source that says exactly that.
- **Third-party reliability rankings, magazine awards, forum wisdom:** HOLD. Do not use.
- **Tables that mix OEM inputs with our illustration** say so in the table note.

## 7. Comparison fairness

- Same model year for both vehicles. Cross-year only with user approval, labeled in the H1 area, the table and the note.
- Same source type for both (OEM spec page vs OEM spec page; EPA vs EPA).
- Concede the rival's real leads in plain sentences (fuel economy, cargo, towing, included maintenance, ratings).
- Give both brands' equivalent facts: if you mention one brand's roadside plan or warranty, state the other's too.
- Verdict = "which buyer fits which", built from documented strengths. No "safer", "more reliable", "better built".
- Rival vehicles appear in text and tables only, never in photos (photos show the dealer's own brand).
- Add a trademark line for the rival's marks and a no-endorsement line (see `compliance.md`).

## 8. Pricing policy

- **Default: no dollar figures at all.** No dealer prices, option prices, payments, rebates, trade values or "save $X".
- **MSRP only in comparisons**, and only when both OEMs publish it for the stated model year. Each figure: the word "MSRP",
  the model year, the trim, the retrieval date ("as listed on MM/DD/YYYY"). Exclusions (destination, taxes, title,
  registration, options; "not dealer selling prices") appear in **the first bold answer that mentions price AND in the table
  note**. State each OEM's destination treatment exactly as published, or say it is not stated.
- Set `allowMsrp: true` in the module only then; the build requires "MSRP" within 140 characters of every `$`.
- Flag MSRP comparisons to the user for dealer-counsel sign-off where the state requires it (`compliance.md`).

## 9. Cost topics: answer with cost drivers

When the reader asks "how much", explain what drives the bill instead of quoting a number: the service visit type, the
model/engine, additional work "invoiced separately", part type (e.g. battery type), workshop-only work (48V, EV, hybrid),
warranty or prepaid-plan position, and local wear factors (as context only). Then point to the dealer's offer page with dated
wording ("As posted on MM/DD/YYYY, the service specials page listed…") and invite a quote from the advisor.

## 10. Local framing

- Use only the dealer file's `areas` and real roads, neighborhoods and climate facts. Never a town in `excluded` (sister-store
  territory). Fewer places, all believable; no lists of ten suburbs.
- Climate is context, never an OEM-listed condition unless the manual says so. *("Road salt on I-64 is hard on batteries" was
  unsourced; local pollen placed next to an OEM condition implied the OEM named it.)*
- Respect the climate bans (no snow/salt/winter framing in warm markets).
- No proximity or travel-time claims ("minutes from", "close to I-95", "a short drive"). State the address instead.
- 1–3 links to the dealer's city/area pages when the allow-list has them.

## 11. Internal links

- 12–25 unique links, every one from the allow-list, with descriptive anchors (never "click here").
- Always: a hub up-link (service hub or the relevant sales hub), money pages (schedule service, specials, inventory, finance),
  1–3 area pages, and a related guide. *(A battery article was missing its `/service/` up-link.)*
- Never link as proof or as a recommendation: pages that contradict OEM facts, broken or "unavailable" tools, trade-in /
  lease / exchange pages with unqualified promises ("top dollar", "lower payment", limited-time claims), pages with
  placeholder text, redirects to the homepage. List them as dealer flags instead.
- External links: a few primary sources (OEM, NHTSA, EPA, FTC) are fine with `rel="noopener"`.

## 12. Before you call a draft done

- Gates clean (`build` shows no ❌), warnings addressed or explained.
- Word count, H2 count (8–9), FAQ count (9–10) and FAQ answer length (40–90) in range.
- Zero stand-alone bold paragraphs, zero numbering, zero banned phrases outside `allowPhrases`.
- Every number, model year, trim and program name traceable to a ledger row.
- Then, and only then, the independent reviews.
