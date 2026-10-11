# dealer-articles roadmap (status 2026-10-11)

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

## Next
1. **v0.12: Dealer.com adapter** for Brickell CDJR, Ocean Cadillac and Brickell Buick GMC. Same shared workflow and checks as Apollo and DealerInspire. Platform points: a block with no H1 where the page name is the H1, px units with a 16px wrapper, `!important` CTA fills, and no Google Fonts where the dealer forbids them.
2. A first full end-to-end article in a **Cowork** task and in **Chat** on the team account (Desktop app on Mac and PC, and the browser), on a topic the dealer site does not already cover. Confirm the engine, downloads, resume kit and handoff on each, and fix whatever it finds.
3. Minor cleanups:
   - Make `shot` detect the full page height automatically (defaults are taller since v0.4).
   - Test Claude Code on macOS.
4. ~~Add the remaining Apollo dealers~~: done in v0.5 (all 8 Apollo dealers).
5. Platform adapters:
   - Dealer.com: see item 1 (v0.12).
   - ~~DealerInspire: WordPress posts via the Text tab, shortcodes, Yoast fields~~: done in v0.10.
6. A live post-publish QA command: compare the live page with the build, and check the head tags against the SEO fields.
7. Semver releases from v1.0.
