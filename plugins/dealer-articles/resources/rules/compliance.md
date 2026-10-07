# Compliance review (the most important gate)

Every draft that looked finished to its writer still contained claims a regulator, the OEM or the dealer's counsel would
object to. The compliance reviewer is **adversarial, read-only and independent**. It checks every sentence against the
ledger only. It is not a proofreader. This file is a working checklist, not legal advice: state-law items are pointers for
the dealer's counsel to confirm.

## 1. Reviewer contract

**Inputs:** the job's `module.js` (source of the text), the rendered preview `<slug>-preview.html` (read the JSON-LD there),
the source ledger, `${CLAUDE_PLUGIN_ROOT}/resources/rules/rigor-and-content.md` and this file. Context lines from the
caller: dealer, state, department, article type, pricing policy, and any **user-approved deviations** (e.g. "cross-year
MSRP, labeled") that override a ledger HOLD.

**Label every finding:**
- **DIRECT**: the text contradicts the source.
- **STRONG INFERENCE**: the text implies more than the source says (strength, scope, absolute words).
- **UNKNOWN**: no ledger row supports the text.

**Rank every finding:**
- **P0**: legal exposure, safety omission, or misattribution (saying the OEM said something it did not). Never ships.
- **P1**: must be fixed before the user sees the article.
- **P2**: fix if sensible (style, small precision gains, optional citations).

**Verdict:**
- **READY**: 0 P0, 0 P1, and every time-sensitive automotive fact has a primary source.
- **REVISE**: any P1 (or a P0 that a sentence-level fix resolves).
- **REJECT**: the premise fails, the article's core depends on HOLD/unsourced claims, or the scope is wrong; it needs a new
  plan, not edits.
Never return READY when a time-sensitive fact (price, model year, spec, warranty, rating, availability) lacks a primary
source.

**Output (≤70 lines):**
```
VERDICT: REVISE   (P0: 1 · P1: 6 · P2: 9)
1. [P0][UNKNOWN] block h2#battery-location, p — "exact quote from the draft"
   → "exact ledger-safe replacement" (ledger #14)
2. [P1][STRONG INFERENCE] faq[3].a — "exact quote" → "exact replacement" (ledger #7)
...
Watch items not fixable by text (dealer flags, legal sign-off): …
```
Quote the minimum text needed to locate the problem. Give a replacement the writer can paste, built only from ledger
wording. If the right fix is deletion, say "remove".

**Lead's duty after the review:** apply every P0 and P1 and most P2s, rebuild, re-run the gates, re-check FAQ/schema parity,
and log any skipped P2 with a reason. Apply a pattern fix everywhere it occurs (including articles already approved).

## 2. The 13-point checklist (every article)

1. **Claim vs ledger strength**, sentence by sentence, including the FAQ, captions, table notes, alt text and fine print.
   A HOLD item used anywhere = P0.
2. **Misattribution** = P0. Ask "who said this?", not just "is this true?". The OEM, NHTSA or the dealer must have said it
   in the cited source; our inference is attributed to us. *(A battery article said the OEM "notes the battery itself may not
   be where the connection point is"; the OEM never said that.)*
3. **Safety-critical omissions** = P0. Jump-starting, charging, towing, tire pressure, warning lights, child seats, EV high
   voltage: the manual's conditions and warnings appear before or with the steps.
4. **Pricing and advertising law.**
   - FTC: no deceptive pricing; comparative claims substantiated; no unsupported superlatives ("best", "lowest", "#1").
     Pointers: FTC Act §5; FTC Guides Against Deceptive Pricing (16 CFR Part 233); FTC policy statement on comparative
     advertising; FTC Endorsement Guides (16 CFR Part 255).
   - State dealer-advertising rules (check with counsel; pointers only):
     - **Florida:** Fla. Stat. §501.976 (unfair or deceptive acts by motor vehicle dealers), plus the general FDUTPA.
     - **Illinois:** 14 Ill. Adm. Code Part 475 (motor vehicle advertising rules under the Consumer Fraud and Deceptive
       Business Practices Act, 815 ILCS 505).
     - **Virginia:** 24VAC22-30 (Motor Vehicle Dealer Board advertising rules). MSRP-only comparisons were sent for counsel
       sign-off and carried the dealer's "MSRP … not the dealership's selling price" line.
     - **California:** check Vehicle Code §11713 and related advertising rules.
     - Any other state: find the dealer-advertising regulation before allowing any dollar figure.
   - MSRP: each figure labeled "MSRP", dated, model-year labeled; exclusions in the first bold answer that mentions price
     **and** the table note; destination treatment stated per OEM ("BMW lists $1,450 destination"; "Mercedes-Benz does not
     state its destination amount").
   - No dealer, option or payment prices; no "top dollar", guarantees, urgency or scarcity ("limited time", "won't last").
   - Offer terms are dated ("As posted on MM/DD/YYYY…") and never stated as current after their expiry.
5. **Warranty wording.** Quote terms exactly, with "whichever comes first/occurs first". Never "voids"; use the source's
   "may not be covered". Genuine parts are "recommended", not "required". FTC repair guidance keeps its condition: "if the
   warranty says the work will be done for free, the dealer or manufacturer can make you use repair facilities it chooses."
   Keep separate warranties separate (new-vehicle limited warranty vs battery or powertrain coverage). Prepaid maintenance
   plans are not a warranty as defined by federal law; keep the plan's own transfer/cancel disclaimer.
6. **Dealer promises and capabilities.** Attribute ("Our service page lists…") or turn into an ask ("Ask our advisors…").
   Remove: proximity or travel-time claims, "we will", "our team uses…", inventory or availability claims, unit counts,
   staff counts, languages or amenities not on the dealer file or a verbatim dealer page, and expired offer terms.
7. **Brand and program naming.** Write OEM brand, model and program names exactly as the OEM writes them, and only with a
   ledger row. The dealer file's `brandNaming` and `bans` win. Examples of the pattern:
   - Honda: "Maintenance Minder", "Honda Genuine Parts"; quote Honda's line that service at an authorized Honda dealer is
     not mandatory for continued warranty coverage; no "HondaCare" unless the dealer file allows it; no "Honda Certified
     Service" claims.
   - Toyota: name "ToyotaCare" only with a ledger row for its current OEM terms and eligibility; never imply the dealer
     created or extends it.
   - Mazda: model names as Mazda writes them (CX-50, CX-90, MX-5 Miata); parts and plan names only as on Mazda's own pages.
   - Bentley: "Bentley Motors" for the manufacturer; model names exactly (Bentayga, Continental GT, Flying Spur); no
     "Bentley-certified" staff claims unless the dealer confirmed the wording in writing.
   - Mercedes-Benz (example from shipped work): brand in full, no "Star-Certified", a "Digital Extras" disclaimer on
     connected/driver-assist features.
   - Any brand: no "certified / factory-trained / master technician" unless the dealer file lists it as an approved claim.
8. **Trademarks and endorsement.** A trademark line for every rival or third-party mark used ("BMW and X5 are trademarks of
   BMW AG"); "TOP SAFETY PICK+ is an IIHS award"; "No endorsement by [rival OEM], IIHS, NHTSA or the EPA is implied". No
   implied OEM, valuation-tool or government endorsement of the dealer.
9. **Ratings.** Exact agency, award year vs model year, and scope: "2025 TOP SAFETY PICK+ (2026 model), with optional
   pedestrian front crash prevention"; NHTSA overall vs side, AWD vs FWD. Never "5-star" without scope; never "safer than";
   "more reliable than" only with a primary source (normally HOLD).
10. **Local framing.** Real roads and neighborhoods from the dealer file's `areas` only; never an `excluded` town; climate as
    context, not as an OEM-listed condition; no unsourced local geography claims.
11. **Schema.** FAQPage questions and answers equal the visible FAQ exactly; stable `@id`s; NAP and the department phone in
    schema equal the visible page; BlogPosting dates equal the visible "Updated" date; no AggregateRating; no offers.
12. **SEO/AEO.** Title ≤65 chars, meta 130–165; keyphrase in title, H1, dek and first bold answer; every H2 answers first;
    FAQ 9–10 × 40–90 words with new value; every internal link from the allow-list; hub up-link present; no cannibalization
    of an existing dealer page with the same intent (flag it).
13. **Readability.** Sentences over 25 words (list them), clichés and banned phrases, em/en dashes, any "01, 02" numbering,
    stand-alone bold paragraphs, repeated sentence patterns.

## 3. Findings catalogue (few-shot examples)

These are real findings from shipped Mercedes-Benz vs BMW and Mercedes-Benz service articles. They are **examples of the
pattern**; apply the same reasoning to any brand.

| Article | Pri | Label | Draft text | Fixed text (ledger-safe) |
|---|---|---|---|---|
| Battery guide | **P0** | UNKNOWN | "Mercedes-Benz notes the battery itself may not be where the connection point is, which is why the manual routes jump-starting…" | "Mercedes-Benz routes jump-starting and charging through a connection point under the hood, and the battery itself can sit elsewhere depending on the model." |
| Battery guide | **P0** | DIRECT | Jump-start steps with no preconditions | "Before you start, check that the battery is not frozen: if the indicator lamps do not light up in the cold, Mercedes-Benz says not to jump-start or charge it. On electric models, the manuals say to leave jump-starting to a qualified specialist workshop." |
| GLE vs X5 | P1 | STRONG INF. | "…favors the GLE: it starts lower…, offers a third row, tows up to 7,700 lbs…" (implies a towing win; rival towing unpublished) | "…favors the GLE. It starts at a lower MSRP with standard all-wheel drive, and the GLE 450 offers an optional third row…" |
| GLE vs X5 | P1 | DIRECT | "both earned an IIHS TOP SAFETY PICK+" | "the GLE earned a 2025 TOP SAFETY PICK+ (with optional pedestrian front crash prevention) and the X5 earned a 2026 TOP SAFETY PICK+" |
| GLE vs X5 | P1 | DIRECT | "lists them for purchase upfront or rolled into your monthly payment" | "…or, when you buy it at the same time as your vehicle, build it into your monthly payment." |
| GLE vs X5 | P1 | UNKNOWN | "including many who come from [nearby city]" | remove |
| GLE vs X5 | P1 | — | First price bold answer without exclusions | add: "Both are starting MSRPs that exclude destination, taxes, title and registration, and they are not dealer selling prices." |
| GLC vs X3 | P1 | DIRECT | "Only the GLC offers a plug-in hybrid in the U.S." | "Unlike the U.S. X3 lineup, the GLC offers a plug-in hybrid." |
| GLC vs X3 | P1 | STRONG INF. | "The GLC packs more standard equipment" | "The GLC 300 4MATIC lists a long set of standard equipment" (items named) |
| GLC vs X3 | P1 | DIRECT | "We label every figure by model year" (false) | "We label every price and every table by model year, and some X3 specs come from BMW's 2025 X3 launch materials for the same generation." |
| GLC vs X3 | P1 | UNKNOWN | "…closer than most comparisons" | "…comes down to your priorities" |
| GLC vs X3 | P1 | fairness | One brand's roadside plan mentioned, the other's omitted | "…and BMW includes Roadside Assistance for 4 years with unlimited miles." |
| GLC vs X3 | P1 | DIRECT | EV towing figure inside the gas-model comparison | remove (EV sidebar only) |
| Maintenance costs | P1 | DIRECT | FTC "you don't have to use the dealer" without its condition | add: "if the warranty says the work will be done for free, 'the dealer or manufacturer can make you use repair facilities it chooses.'" |
| Maintenance costs | P1 | DIRECT | Plan transferability without the agreement disclaimer | add: "refers owners to the agreement for 'limitations, exclusions, transferability and cancelability.'" |
| Maintenance costs | P1 | DIRECT | Offer terms stated as current after they expired | "As posted on 09/30/2026, they applied to…" |
| Maintenance costs | P1 | STRONG INF. | Local pollen placed next to an OEM-listed condition | "Separately, the 2026 GLS owner's manual says…" |
| Battery guide | P1 | DIRECT | "pair a conventional 12V battery with a 48-volt…" (some 12V units are lithium-ion) | "pair a 12V battery with a 48-volt lithium-ion battery" |
| Battery guide | P1 | DIRECT | One model's warning-message meaning generalized to all | "…on some models the same text also signals a 48V fault" |
| All four | P1 | UNKNOWN | Road-proximity claims in the dealership sections | removed from all four, including the already-approved pilot |

Other recurring patterns: absolute words on medium-confidence claims ("only", "every", "never"); "new" without a source;
"recommends" where the source says "notes"; missing scope labels (AWD, model year, trim); ambiguous feature names (write
"power liftgate with HANDS-FREE ACCESS", not "hands-free liftgate"); third-party reliability claims (HOLD).

## 4. The parallel golden-geo review

Runs at the same time as compliance, also read-only. Brief it with the preview, module, ledger, the page-type caveat
("education/comparison article, not an offer page: price in the first 100 words and Offer schema do not apply"), the
platform context (schema in the Custom Structured Data field, SEO fields in the Apollo form, H1 in the content), pending
items ("images are placeholders: not a blocker"), and the NAP. In past runs it independently confirmed a misattribution,
caught a missing city in titles, a schema image that did not match the hero, an EPA model-name mismatch ("X3 xDrive30" vs the
OEM's "X3 30 xDrive"), and links to offer pages about to expire.

## 5. Flags that text cannot fix (report to the user)

- Legal sign-off needed (MSRP comparisons in states that require it; any cross-year pricing).
- Dealer data to confirm: department phones or hours marked `verify` in the dealer file, routes not in the sitemap.
- Dealer pages that contradict OEM facts or carry risky promises (listed for the dealer; never linked as proof).
