---
name: article-dealerinspire
description: Draft a long-form, compliance-reviewed dealership article (Editorial v2 design) for a DealerInspire (WordPress) dealer website, such as the Mercedes-Benz stores, and package it for pasting (one-line embed, Yoast and social fields sheet, local preview). Same rigor as /dealer-articles:article-apollo. Use when the user asks for a dealer article, blog post, comparison article, buying guide or service guide for a DealerInspire dealership, or types /dealer-articles:article-dealerinspire "<dealer>" "<title>".
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

# /dealer-articles:article-dealerinspire: dealership article, DealerInspire package

**Same workflow and same rigor as /dealer-articles:article-apollo.** First Read `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`. Then follow ALL of its non-negotiable rules and Phases 0–7 exactly:
- premise test and primary-source ledger (researcher agent)
- draft from the ledger, with the depth gates as ❌
- `dealer-articles:golden-geo` in ARTICLE MODE
- `frontend-design:frontend-design` craft pass on the screenshots
- separate `dealer-articles:article-compliance-reviewer` and `dealer-articles:golden-geo-reviewer` agents
- fix every P0/P1, then deliver

Only the points below differ. Where they conflict with the Apollo skill, this file wins.
`$ARGUMENTS`, the **DA** command and the plugin root are the same as in that skill.

## DealerInspire differences
1. **Dealer and platform.**
   - DealerInspire dealer files have `"platform": "dealerinspire"`. Today these are the Mercedes-Benz stores: `mercedes-benz-laguna-niguel`, `mercedes-benz-foothill-ranch`, `mercedes-benz-vans-laguna-niguel`, `mercedes-benz-midlothian`, `mercedes-benz-richmond`.
   - If `DA new` matches an **Apollo** dealer, stop and use `/dealer-articles:article-apollo` instead (and the reverse).
   - "Mercedes Laguna" is ambiguous: it matches two stores, the cars store and the Vans store. Ask which.
2. **Platform rules.** Read `${CLAUDE_PLUGIN_ROOT}/resources/rules/design-and-dealerinspire.md` at the start of Phase 2. Never hand-edit the paste file.
3. **Phase 1 image list:** use the same 5 slots and the same request format (`image-brief.md` §6). The upload steps differ:
   - The user uploads each photo to the store's **WordPress Media Library** (Media → Add New). They send back the **File URL** from the attachment details, in the form `https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`. It must be the original, not a `-1024x683` resized copy.
   - Reuse the store's catalog first (`<key>.images.json`; the field is `di`).
   - In `module.js`, write `di:` values, never `apollo:`.
4. **Mercedes-Benz wording** (on top of `brand-terms.json`, which the build enforces):
   - "offer/offers", never "coupon" (MB-001).
   - "Mercedes-Benz" in full.
   - Service A / Service B.
   - No "Star-Certified", "certified/factory-trained technicians" or other credential claims.
   - Follow the dealer file's `brandNaming` lines and `bans`. The Vans store writes about Sprinter/eSprinter only.
5. **State rules.**
   - **California stores** (Laguna Niguel, Foothill Ranch, Vans), LAW-CA-01: no `$` figures unless they are model-level OEM MSRP in a labeled table AND dealer counsel has signed off before the first California publish with `$` figures. Prefer relative wording.
   - **Virginia stores:** flag every MSRP comparison for dealer-counsel sign-off in the delivery note.
6. **Phones and hours.**
   - Never write a phone number or clock time in prose. Use `{{PHONE}}` / `{{SERVICEPHONE}}` / `{{SALESPHONE}}`.
   - The build turns them into DealerInspire shortcodes: `[di_option]` for phones (the site's own call-tracked numbers) and `[di_hours]` for the dealership section and closer hours.
   - The JSON-LD keeps the real numbers.
   - The build fails on hard-coded numbers or clock times.
7. **URL.**
   - **California stores:** pages sit under the store's article parent page (`di.parentPath`, e.g. `/service/service-and-parts-tips/<slug>/`).
   - **Virginia stores:** `/<slug>/`.
   - `DA new` sets this. Keep slugs short (3–8 words, keyword + city).
8. **Existing page check (Phase 2).** Search the dealer sitemap for the same intent. A WordPress page can be **refreshed in place at the same URL** (re-paste), which is better for SEO than a new page plus a 301. Recommend refreshing in place when the intent matches.
9. **Phase 7: deliver.** The package (`<job>/package/`) contains:
   - **`<slug>-embed-Wired.html`:** the ONLY paste file. It is **one line on purpose**, with inline CSS, the article, a helper script and trimmed JSON-LD. Paste it into the WordPress page's **Text** tab (Page Composer: a "Use WordPress Content" row). **Never the Visual tab, never a Raw HTML block:** that stops the `[di_*]` shortcodes. Copy it from Notepad (Select All), never from chat.
   - **`<slug>-SEO.md`:** the Yoast + WordPress fields: title, slug, parent page, featured image, SEO title, meta description, focus keyphrase, and the **Facebook + Twitter title, description and image (= hero)**. **Print these lines verbatim in chat.** Social fields are never left empty: they fall back to the theme's 200×200 default.
   - **`README.md`:** paste steps.

   There is no site-wide CSS file and no separate Structured Data file: both are inside the embed. Delivery also covers:
   - review verdicts, open `verify[]` items and legal flags
   - after publishing: DealerInspire **Reload Cache**, then check the URL with `?cb=<anything>` (one visible H1, phone links, one-line hours, images, FAQ toggles; Rich Results Test shows Article + FAQ; the Yoast title and social image are the new ones)
10. **Images later.** `/dealer-articles:article-images` works the same, but with WordPress Media Library File URLs (`DA images` verifies them; `--final` requires this store's uploads host).

## Resume
`DA status "<job>"` shows the phase and outputs. Re-running `/dealer-articles:article-dealerinspire` with the same dealer + title resumes.
