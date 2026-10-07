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
