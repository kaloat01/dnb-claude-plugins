# dealer-articles roadmap (status 2026-10-12)

## Shipped
- **v0.1:** `/dealer-articles:article-apollo`, `/dealer-articles:article-images` and `/dealer-articles:article-setup`.
  - Bundled golden-geo (article mode).
  - Research, compliance and golden-geo reviewer agents.
  - Apollo package plus local preview.
  - 5 pilot dealers.
- **v0.2:**
  - The dealership section borrows the service-specials structure: a storefront plaque plus factual value lines.
  - White logos sit on the black brand band.
  - Dry-run workflow fixes.
  - Phones and hours come from each dealer's About Us page seen from the US, using About Us numbers when there is no local number.
  - Verified Apollo image catalogs per dealer.

## Shipped 10/08
- **v0.3:** Apollo merge tags for phones. **v0.4:** fixes from a fresh mock run (page fetch fallback, hard depth gates, true 375 screenshots, short slugs).
- **v0.5:** all 8 Apollo dealers. **v0.6:** image list first, plain shell commands, Quick start guide. **v0.7:** paste-safe site-wide CSS, Bentley-style dealership section for all dealers.

## Shipped 10/09
- **v0.8:** brand compliance terms ledger (Mercedes-Benz "offer", never "coupon"; Toyota "TSRP"). **v0.9:** verified legal rules and state scope in the ledger.
- **v0.10:** DealerInspire adapter: `/dealer-articles:article-dealerinspire` for the 5 Mercedes-Benz stores (WordPress Text tab, `[di_option]` / `[di_hours]` shortcodes, Yoast fields). It runs the same workflow and checks as `/dealer-articles:article-apollo`.

## Shipped 10/11
- **v0.11:** the Claude Desktop app and claude.ai, Cowork and Chat (same rigor; Chat runs the reviews in one conversation).
  - HANDOFF block at the end of every run (status, version, URL, review mode, every SEO/Yoast/social field, paste steps, flags).
  - Version stamp in `env`, the first message and `job.json`.
  - `env --net`, `review`, `deliver` (downloads + resume kit) and `resume` (finish in a new task).
  - Routing fix (Apollo skill hands DealerInspire dealers over), NOT READY marking on failed gates, ledger hard-fail,
    social-title warning.
  - Removed the "clone the repository" fallback prompt; the repository becomes private.

## Shipped 10/12
- **v0.11.1:** image requests are current ("any 2025–2027 <brand or model>": last year to next year), general (no camera positions, hands,
  screens, parts or trims) and easy to find online (5 press-gallery shot types); older-design library photos are marked
  `outdated` and never reused; DealerInspire 1,900px / 1MB upload note; action-first, short chat style.
- **v0.11.2:** fixes from the first Richmond test run: DealerInspire sales articles build again (hours fallback without
  `<br>`), sales articles no longer link service specials or repeat the sales number as "Main line", the resume kit carries
  local dealer overrides, and older jobs get the short photo list again.
- **v0.12:** Dealer.com adapter, `/dealer-articles:article-dealercom`, for Brickell Chrysler Dodge Jeep Ram, Ocean Cadillac
  and Brickell Buick GMC: one Custom HTML paste block (no H1: the page name is the H1), page-name + MetaData sheet,
  Dealer.com hardening and gates, real phone numbers, its own store files and photo catalogs. All 16 stores are covered.

## Next
1. **First Dealer.com article, live:** paste it on a hidden page first, then check with a cache-busted capture: the block
   survives, JSON-LD parses, one H1 (the page name), CTA fills and fonts render, the MetaData Title/Description show in the
   head, the compliance check on the live HTML has 0 FAIL. Fix whatever it finds.
2. A first full end-to-end article in a **Cowork** task and in **Chat** on the team account (Desktop app on Mac and PC, and the browser), on a topic the dealer site does not already cover. Confirm the engine, downloads, resume kit and handoff on each, and fix whatever it finds.
3. Minor cleanups:
   - Make `shot` detect the full page height automatically (defaults are taller since v0.4).
   - Test Claude Code on macOS.
4. ~~Add the remaining Apollo dealers~~: done in v0.5 (all 8 Apollo dealers).
5. Platform adapters:
   - ~~Dealer.com~~: done in v0.12.
   - ~~DealerInspire: WordPress posts via the Text tab, shortcodes, Yoast fields~~: done in v0.10.
6. **Photo finder (investigate, future release; requested 10/12):** the agent searches for suitable photos online within set
   parameters and predefined settings (brand press galleries, rights, size, current model year) and suggests them, instead
   of the user searching.
7. A live post-publish QA command: compare the live page with the build, and check the head tags against the SEO fields.
8. Semver releases from v1.0.
