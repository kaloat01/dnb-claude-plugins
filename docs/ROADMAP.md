# dealer-articles roadmap (status 2026-10-07)

## Shipped
- **v0.1:** `/article-apollo`, `/article-images` and `/article-setup`.
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

## Next
1. A first full end-to-end article through the installed plugin, on a topic the dealer site does not already cover. Fix whatever it finds.
2. Minor cleanups:
   - Make `shot` detect the full page height automatically (defaults are taller since v0.4).
   - Make the banned-phrase gate match whole words.
   - Test on macOS.
3. Add the remaining Apollo dealers: Murgado Ford Chicago, Murgado Lincoln Chicago and Bentley Edison.
4. Platform adapters:
   - Dealer.com: a block with no H1 where the page name is the H1, px units with a 16px wrapper, `!important` CTA fills, and no Google Fonts where the dealer forbids them.
   - DealerInspire: WordPress posts via the Text tab, shortcodes, Yoast fields.
5. A live post-publish QA command: compare the live page with the build, and check the head tags against the SEO fields.
6. Semver releases from v1.0.
