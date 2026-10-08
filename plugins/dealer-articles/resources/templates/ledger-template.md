# Source Ledger: <Article title as requested>

<!-- Template for <job>/<slug>-source-ledger.md. Keep every section. Replace <…>. Delete these comments.
     Primary sources only: OEM model/spec/price pages, OEM newsroom, owner's manuals, warranty booklets, OEM owner sites,
     rival OEM pages (comparisons), fueleconomy.gov, nhtsa.gov, iihs.org, FTC/CFPB, state statutes/agencies, and a tool
     owner describing its own tool. Blogs, magazines, forums, aftermarket sellers, competitors = finding aids only → HOLD. -->

- **Article (working title):** <title>
- **Recommended H1 (after premise test):** <H1, or "as requested">
- **Slug / URL:** /<slug> (Apollo custom page, extensionless) · **Department:** <service | sales>
- **Article type:** <comparison | buying guide | service guide | ownership/cost>
- **Dealer NAP:** <Dealer>, <street>, <city>, <ST> <zip>. <Dept> phone <phone> · hours <hours> (source: dealer file, verified <date>)
- **Retrieval date:** <YYYY-MM-DD> (all sources below unless noted)
- **Local framing (allowed):** <areas, real roads, climate as context> · **Never:** <excluded towns, banned framing>
- **Pricing policy:** <none | MSRP only, both OEMs, same model year, labeled | cost drivers only>
- **Source policy:** primary only; anything else is on HOLD.

### Source index
| Key | Source (model year, document) | URL |
|---|---|---|
| S1 | <2026 Honda CR-V owner's manual, "Maintenance Minder" page> | <url> |
| S2 | <2026 Honda Warranty Booklet> | <url> |
| S3 | <FTC: Auto Warranties and Auto Service Contracts> | https://consumer.ftc.gov/articles/auto-warranties-and-auto-service-contracts |

---

## Premise test
- **Requested premise:** <the number / model year / claim in the title>
- **Result:** <PASS | FAIL | PARTIAL> — <one sentence of evidence with source key>
- **Current model year per vehicle:** <Model A: 2027 (S4) · Model B: 2026 (S9)>
- **If FAIL, recommended H1:** <corrected wording> · **Why:** <what the OEM actually publishes>

*Format example:* Requested "Honda spark plugs at 100,000 miles" → FAIL. No 2026 U.S. Honda manual lists a fixed plug
mileage; the Maintenance Minder shows sub-item 4. Recommended H1: soften "at 100,000 Miles" to "Near 100,000 Miles" and explain Minder code 4.

---

## Claims
| # | Claim | Permitted wording | Primary source URL | Retrieved | Confidence | Restriction |
|---|---|---|---|---|---|---|
| 1 | The Minder calculates oil life from operating conditions | "Based on the engine operating conditions, the remaining engine oil life is calculated and displayed as a percentage." (verbatim, Honda) | S1 | 2026-09-28 | High | Same sentence in every 2026 manual checked |
| 2 | What the Minder monitors | Honda says the Maintenance Minder "continuously checks operating conditions such as speed, operating temperature, ambient temperature, time, and vehicle use…" | S5 | 2026-09-28 | High | Owner-site wording, not model-specific. Do not add factors Honda does not list |
| 3 | <claim> | <exact sentence the writer may use; quote verbatim where legal/safety> | <url or key> | <date> | <High / Med / Low> | <model year, trim, market, conditions to keep, "whichever comes first"…> |

<!-- Confidence: High = the source states it directly for this scope. Med = absence of listing, or one source for a
     multi-model claim. Low = do not use without user approval. Time-sensitive rows (prices, model years, ratings,
     availability, offers) say so in Restriction. -->

## Spec / cost-driver tables
<!-- Comparisons: one row per spec, both vehicles, same model year, same source type, with keys. Cost topics: what drives
     the bill (visit type, model/engine, additional work, part type, workshop-only work, warranty position), with keys. -->
| Item | <Vehicle A, MY> | <Vehicle B, MY> | Sources | Note |
|---|---|---|---|---|
| Starting MSRP (excl. destination, taxes, title, registration) | <$…> | <$…> | S4, S9 | Label "MSRP", date, model year |
| <spec> | <value> | <value> | <keys> | <scope> |

---

## Do-not-claim / HOLDs
1. **"<tempting claim>"**: HOLD. <why: not in any primary source / third-party only / wrong scope>.
2. **<Ratings, reliability rankings, magazine awards>**: HOLD unless the agency's own page states the exact award and scope.
3. **Any dealer price, payment, trade value, or "save $X"**: HOLD.
4. **<Local condition presented as an OEM condition>**: HOLD (context only).
5. **UNVERIFIED:** <facts that could not be fetched (empty page, blocked PDF)>; never written as fact.

## Contradictions on the dealer site
<!-- Dealer pages that conflict with the OEM or government facts above. They are dealer flags: never cite or link them as
     proof. -->
- **/<path>** (scraped <date>) — C1 (<High/Med/Low>): the page says "<verbatim>". <Source> says <fact> (Claim #).

## Dealer site facts (verbatim) + RISKS
- **/<path>:** usable with attribution: "<verbatim dealer statement>"
- **RISKS (do not echo):** "<top dollar / guaranteed / limited-time / unqualified payment claim>", <conflicting phone>,
  <competitor disparagement>, <tool shows "currently unavailable">.

## Internal links (only from the dealer sitemap allow-list)
| Anchor idea | URL | Note |
|---|---|---|
| schedule service | /scheduleservice | money page |
| <hub up-link, e.g. our service center> | /<path> | required |
| <model inventory, e.g. new CR-V> | /<path> | |
| <area page> | /<path> | 1–3 area pages |
| <related guide> | /<path> | link only if not contradicting (see Contradictions) |
<!-- Recommend 12–25 links, each path written exactly as in the sitemap file. List "not linked" pages with the reason. -->

## Keyword cluster
- **Primary:** <focus keyphrase> (must appear in title, H1, dek, first bold answer)
- **Secondary (6–8):** <…>
- **PAA-style questions (8–10):** <…> (mark the source: SERP, Autocomplete, or inferred)
- **Cluster hub:** /<path> · **Spokes:** <related pages>
