---
name: article-dealercom
description: Draft a long-form, compliance-reviewed dealership article (Editorial v2 design) for a Dealer.com (DDC) dealer website, such as Brickell Chrysler Dodge Jeep Ram, Ocean Cadillac and Brickell Buick GMC, and package it for pasting (one Custom HTML block, page name and MetaData fields sheet, local preview). Same rigor as /dealer-articles:article-apollo. Works in the Claude Desktop app or claude.ai (Cowork or Chat) and in Claude Code. Use when the user asks for a dealer article, blog post, comparison article, buying guide or service guide for a Dealer.com dealership, or types /dealer-articles:article-dealercom "<dealer>" "<title>".
argument-hint: "\"<dealer name>\" \"<article title>\""
allowed-tools:
  - Bash(node:*)
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - Agent
  - Skill
  - AskUserQuestion
---

# /dealer-articles:article-dealercom: dealership article, Dealer.com package

**Same workflow and same rigor as /dealer-articles:article-apollo.** First Read `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`. Then follow ALL of its non-negotiable rules, its Surface rules (Cowork, Chat, Claude Code) and Phases 0–7 exactly:
- premise test and primary-source ledger (researcher agent, or the researcher file followed in Chat)
- draft from the ledger, with the depth gates as ❌
- `dealer-articles:golden-geo` in ARTICLE MODE
- `frontend-design:frontend-design` craft pass on the screenshots (no browser: the written design checklist)
- separate `dealer-articles:article-compliance-reviewer` and `dealer-articles:golden-geo-reviewer` agents (Chat: the single-conversation review protocol), then `DA review`
- fix every P0/P1, then deliver: `DA deliver` outside Claude Code, and the build's HANDOFF block verbatim as the last thing in your reply

Only the points below differ. Where they conflict with the Apollo skill, this file wins.
`$ARGUMENTS`, the **DA** command and the plugin root are the same as in that skill.

## Dealer.com differences
1. **Dealer and platform.**
   - Dealer.com dealer files have `"platform": "dealercom"`. Today these are three Miami, FL stores: `brickell-cdjr` (Brickell Chrysler Dodge Jeep Ram), `ocean-cadillac` (Ocean Cadillac) and `brickell-buick-gmc` (Brickell Buick GMC).
   - If `DA new` matches an **Apollo** dealer, stop following this file and follow `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md` alone. A **DealerInspire** dealer → follow `${CLAUDE_PLUGIN_ROOT}/skills/article-dealerinspire/SKILL.md` instead (the job just created stays valid).
   - "Brickell" alone is ambiguous: it matches four stores on two platforms (Honda, Mazda, CDJR, Buick GMC). Ask which.
   - **Who does what:** the team (the user and colleagues with Dealer.com access) creates the page, uploads the photos to the Media Library and pastes the article. Never log in to Dealer.com, and never upload, edit or delete Media Library files yourself.
2. **Platform rules.** Read `${CLAUDE_PLUGIN_ROOT}/resources/rules/design-and-dealercom.md` at the start of Phase 2. Never hand-edit the paste file.
3. **The page name is the H1.**
   - The Dealer.com page shell prints the **page name** as the page's only H1. The paste block has **no `<h1>`**: its header starts with the eyebrow and the dek. A build gate checks for 0.
   - Write `h1` in `module.js` as usual (≤80 characters, keyword + city where it fits). It becomes the **Page name** line of `<slug>-SEO.md`; the team names the Dealer.com page exactly that.
   - Never hide or restyle the shell's title.
4. **Phase 1 image list:** the same 5 slots, request rules and message shape (`image-brief.md` §2 and §6). The upload steps differ:
   - The user uploads each photo to the store's Dealer.com **Media Library** and sends back each image URL, in the form `https://pictures.dealer.com/<letter>/<account>/…`.
   - It must be on this store's Media Library base (dealer file `ddc.media`). Each store has its own, so never borrow another store's URL.
   - Reuse the store's catalog first (`<key>.images.json`; the field is `ddc`).
   - In `module.js`, write `ddc:` values, never `apollo:` or `di:`.
5. **Wording** (on top of `brand-terms.json`, which the build enforces):
   - The dealer file's `brand` is the full brand string the compliance checks use (e.g. "Chrysler Dodge Jeep Ram"). `brandShort` is the copy-friendly phrase the build puts in its own lines. In your copy, name the brand or model the sentence is about.
   - Model and program names exactly as the OEM's own site writes them. Follow the dealer file's `brandNaming` lines and `bans`.
   - No credential, price-match or guarantee claims ("factory-trained", "certified technicians", "price match", "guarantee"), even where the store's own service pages use them. An offer's official name may appear only as the label of a link to that offer, and only when the dealer file's `allowPhrases` lists it.
   - The ledger has no OEM wording rows for Stellantis (Chrysler, Dodge, Jeep, Ram), Cadillac or Buick/GMC yet. The compliance reviewer reports wording an OEM review would fail as a NEW LEDGER CANDIDATE.
6. **Florida rules.** All three stores are in Miami, FL.
   - The LAW-* ledger rows apply (they cover every state): no dealer-price, payment, APR, down-payment, due-at-signing or savings claims.
   - Every MSRP figure says it is not a dealer selling price and states destination (LAW-MSRP-01/02; Florida pointers in `compliance.md` §4: Fla. Stat. §501.976 and FDUTPA).
   - Florida has no extra `$` ban (unlike New Jersey and California). Keep the handoff's dealer-counsel sign-off flag on price comparisons.
   - Local framing: the dealer file's `areas` and `climate` only (hot, humid South Florida: no snow, road salt or winter).
7. **Phones and hours.**
   - Never write a phone number or clock time in prose. Use `{{PHONE}}` / `{{SERVICEPHONE}}` / `{{SALESPHONE}}`.
   - Dealer.com has no phone or hours token. The build writes the dealer-file numbers (About Us, seen from a US location) as real `tel:` links, and the dealer-file hours as text.
   - The site header may show call-tracking numbers, and the site's own schema may list another number: the dealer file wins.
   - The JSON-LD uses the same numbers. The build fails when a phone number in the block differs from the dealer file.
8. **URL and existing page check (Phase 2).**
   - Articles are **content pages with a Custom HTML component**, never blog posts (`/blog/…` or `wbp-` blog-roll posts). `DA new` sets the URL from the dealer file (`ddc.contentPath`). Keep slugs short (3–8 words, keyword + city).
   - Search the dealer sitemap for the same intent. A content page with a Custom HTML component can be **refreshed in place at the same URL** (re-paste); a redirect needs a Dealer.com support ticket. Recommend refreshing in place when the intent matches.
   - If the matching page is a blog post, ⛔ ask: a new content page (recommended; ask Dealer.com support for a 301 from the old URL) · a new angle (state it) · stop.
9. **MetaData fields.** The Dealer.com **MetaData Editor** has only **Title** and **Description**.
   - `title` = the MetaData Title (50–65 characters), written **without the dealer name**: Dealer.com appends the site name to page titles. The title is checked on the live page.
   - `meta` = the MetaData Description (130–165).
   - There are no canonical, robots, OG or Twitter fields. Never add head tags to the block; the hero lives in the schema.
10. **Phase 7: deliver.** `DA build "<job>" --final` when every article image has this store's Media Library URL. The package (`<job>/package/`) contains:
    - **`<slug>-DDC-Custom-HTML.html`:** the ONLY paste file: one scoped `<style>`, the article in one wrapper `<div>`, and the JSON-LD last (our own `#organization`, BlogPosting, FAQPage); it ends on `</div>`. Paste it into the page's **Custom HTML component**. Copy it from Notepad with **Ctrl+A** (Select All), never a line range and never from chat: `Tag must be paired, missing: [ </div> ]` almost always means a cut-off copy.
    - **`<slug>-SEO.md`:** the Dealer.com fields: Page name (= the H1), URL, MetaData Title, MetaData Description, and the focus keyphrase (reference only). The build's HANDOFF block carries these lines; **end your reply with that block verbatim** (Apollo Phase 7), so the user always sees them.
    - **`README.md`:** paste steps.

    The local preview `<slug>-preview.html` shows the block inside a Dealer.com page shell, with the page name as the H1. There is no site-wide CSS file and no separate Structured Data file: both are inside the paste file. Delivery also covers:
    - one **Your turn** line: name the Dealer.com page exactly as the Page name line
    - review verdicts, open `verify[]` items and legal flags
    - after publishing: open the URL with `?cb=<anything>` in a normal browser and check (`design-and-dealercom.md` §4): one H1 (the page name); buttons keep their fill and their labels fit; centered sections stay centered; phone links; images; FAQ toggles; the Rich Results Test shows Article + FAQ; the page title shows the dealer name once and the description is the new one
11. **Images later.** `/dealer-articles:article-images` works the same, but with Dealer.com Media Library image URLs (`DA images` verifies them; `--final` requires this store's `ddc.media` base).

## Resume
`DA status "<job>"` shows the phase and outputs. Re-running `/dealer-articles:article-dealercom` with the same dealer + title in the same folder resumes (Claude Code, or the same Cowork task). In a new Cowork task or chat: attach the job's `<slug>-resume-kit.zip` and run `DA resume "<zip path>"` first.
