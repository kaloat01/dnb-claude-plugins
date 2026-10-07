# The SEO, GEO, and AEO Golden Rules Playbook

**Version:** 2026-05-08  
**Purpose:** A working standard for drafting, coding, QA-ing, and maintaining client landing pages that need to perform in classic search, local search, AI Overviews, AI answer engines, and citation-based discovery.  
**Primary use case:** Dealership service pages, service-special pages, and local commercial landing pages built as static HTML plus scoped CSS inside CMS environments such as Apollo, Dealer.com, and similar dealership platforms.  
**Operating principle:** We do not “write SEO content.” We build the clearest, most useful, most crawlable, most locally grounded answer page for a real buyer’s question. Search engines and AI systems are downstream consumers of that clarity.

---

## 0. What this playbook is, and what it is not

This is not a magic-ranking checklist. Nobody can guarantee ranking. Google, Bing, ChatGPT, Perplexity, Gemini, and Claude each make their own crawling, indexing, retrieval, ranking, and citation decisions.

This is a practical operating system. It is designed to make every client page:

1. Easy for a human to trust.
2. Easy for Google and Bing to crawl.
3. Easy for AI systems to extract, quote, summarize, and cite.
4. Easy for local algorithms to connect to a real business entity.
5. Easy for a client webmaster to maintain without breaking the page.
6. Hard for competitors to outrank with thin, generic, coupon-only content.

The best pages do not look “SEO’d.” They look useful. They answer the question, prove the business is real, show the offer clearly, provide local context, and reduce the friction between search intent and conversion.

---

## 1. Research basis

This playbook is based on:

- Google Search Central documentation on SEO fundamentals, helpful content, AI features, structured data, image SEO, crawlable links, robots.txt, sitemaps, canonicalization, snippets, Core Web Vitals, FAQ schema, review snippets, LocalBusiness structured data, breadcrumb structured data, spam policies, outbound link qualification, and JavaScript SEO.
- Google Business Profile documentation on local ranking factors: relevance, distance, and prominence.
- Bing Webmaster Guidelines and Microsoft guidance on content inclusion in AI search answers.
- Schema.org official vocabulary for LocalBusiness, AutoDealer, AutoRepair, Service, Offer, OfferCatalog, OpeningHoursSpecification, priceValidUntil, and related types.
- OpenAI crawler documentation for OAI-SearchBot and GPTBot.
- Perplexity robots and crawler documentation.
- The proposed llms.txt standard.
- The academic GEO paper that found citations, quotations, statistics, fluency, and authoritative presentation can materially improve generative-engine visibility.
- Internal dealership work to date, including Brickell Honda, Toyota of Downtown Chicago, Murgado Ford of Chicago, Brickell Mazda, and Brickell CDJR service-special implementations.

---

## 2. The most important mental model

Classic SEO asks:  
**Can this page rank for the query?**

AEO asks:  
**Can this page answer the question directly enough to be extracted?**

GEO asks:  
**Can this page be trusted, cited, and used as evidence inside an AI-generated answer?**

Local SEO asks:  
**Can this page help a search engine connect a service query to a real nearby business?**

Conversion asks:  
**Does the page make the visitor schedule, call, or ask for the offer?**

A winning client page must satisfy all five.

---

## 3. The golden hierarchy of optimization

If these conflict, follow this order:

1. **Accuracy first.** Never invent facts, awards, reviews, prices, technician credentials, services, legal terms, or eligibility rules.
2. **Human usefulness second.** The page must help a real person decide what to do.
3. **Crawlability third.** The content must be visible in initial HTML, not hidden behind fragile JavaScript.
4. **Entity clarity fourth.** The business, address, phone, service, price, hours, and location must be consistent everywhere.
5. **Answer extraction fifth.** The page must contain short, self-contained answer blocks.
6. **Keyword coverage sixth.** Use keywords naturally, not mechanically.
7. **Design seventh.** The page should look premium, but design must never bury the answer.
8. **Schema eighth.** Structured data supports the page. It does not replace visible content.
9. **Technical performance ninth.** The page must load fast, avoid layout shifts, and render well on mobile.
10. **Conversion tenth.** Calls to action must be clear, repeated, and contextually placed.

---

## 4. Ranking the top recommendations

### 1. Build each page around one commercial intent

Every service page needs one primary buyer query. Examples:

- Honda oil change Miami
- Honda four-wheel alignment Miami
- Honda tire rotation Miami
- Honda service coupons Miami
- Toyota brake service Chicago
- Jeep oil change Miami
- Mazda service specials Miami

The page can cover secondary and tertiary keywords, but it must not lose its single intent. A page that tries to rank for “service specials,” “oil change,” “brakes,” “tires,” and “pickup and delivery” equally will usually be weaker than a focused page.

**Rule:** one page, one main job.

### 2. Use a search-result-first title tag

The title tag is not just a label. It is the page’s pitch in search.

Best pattern for service pages:

`[Brand/Service] [Service] [City] | [Offer/Price] | [Dealer]`

Examples:

- `Honda Oil Change Miami | $79.95 Special | Brickell Honda`
- `Honda Four-Wheel Alignment Miami | $99.95 | Brickell Honda`
- `Honda Service Coupons Miami | Spend & Save | Brickell Honda`
- `Toyota Oil Change Chicago | Service Special | Toyota of Downtown Chicago`

Rules:

- 50 to 65 characters is a practical target, not a hard law.
- Put the service and location early.
- Include the price only when it is currently approved and not likely to become stale.
- Do not stuff every nearby neighborhood into the title.
- Do not use generic titles such as “Service Special” or “Auto Repair.”

### 3. Write meta descriptions like a paid-search ad, not a summary

A good meta description should answer:

- What is the service?
- Where is it?
- What is the offer?
- What is included?
- What should the user do next?

Example:

`Schedule a Honda oil and filter change in Miami at Brickell Honda. Includes up to 5 quarts of synthetic oil, battery inspection, car wash, and multi-point inspection. Valid through 05/31/2026.`

Rules:

- Keep it useful and specific.
- Mention the city.
- Mention the dealer.
- Mention the service.
- Mention the price or value when approved.
- Do not overpromise.
- Do not use filler.
- Do not repeat the title word for word.

### 4. Use exactly one H1, and make it boring in the best way

The H1 should tell users and machines exactly what the page is.

Good:

- `Honda Oil Change Special in Miami, FL`
- `Honda Four-Wheel Alignment Special in Miami, FL`
- `Honda Tire Rotation Special in Miami, FL`
- `Honda Service Spend & Save Special in Miami, FL`

Bad:

- `Drive with Confidence`
- `The Right Service for Your Vehicle`
- `Limited Time Savings`
- `Auto Service Specials`

Creative headlines can appear later. The H1 should carry the main query.

### 5. Put the direct answer in the first 100 words

The first visible text after the H1 should answer the query in plain English.

Template:

`[Dealer] offers [service] in [city/neighborhood] for [price/value]. The offer includes [inclusions]. [Primary terms]. You can schedule online or call [service phone].`

Example:

`Brickell Honda offers a Honda oil and filter change special in Miami for $79.95. The offer includes up to 5 quarts of synthetic oil, a complimentary battery inspection, a car wash, and a multi-point inspection. Some models may be higher, tax is additional, and the offer must be presented at the time of service.`

Why this matters:

- Users get the answer immediately.
- AI systems can extract it.
- Search engines see the main topic early.
- The page becomes citable.

### 6. Build H2s around jobs-to-be-done

Weak H2s:

- `What’s Included`
- `Why It Matters`
- `FAQ`

Strong H2s:

- `What the $79.95 Honda Oil Change Special Includes`
- `Why Oil Changes Matter for Miami Honda Drivers`
- `Signs Your Honda May Need a Tire Rotation`
- `Honda Alignment Service Near Brickell and Downtown Miami`
- `How to Redeem This Honda Service Coupon`

Rule: H2s should contain either the service, the city, the customer problem, or the next decision.

### 7. Add visible offer facts in multiple formats

Each offer page should have the same facts in at least three places:

1. Hero price block.
2. Direct answer paragraph.
3. Terms or FAQ section.

If schema says the price is $79.95, the visible page must say $79.95. If the visible page says the offer expires 05/31/2026, schema must use 2026-05-31.

No contradictions.

### 8. Make the page quotable

AI systems and snippets prefer self-contained passages. Add short answer blocks throughout the page.

Format:

**Question-style H2 or H3**  
One direct sentence. Then one or two supporting sentences.

Example:

`How often should Miami drivers check alignment?`  
`Miami drivers should check alignment when the vehicle pulls left or right, the steering wheel sits off-center, or tires start wearing unevenly. Brickell roads, construction zones, curbs, and daily stop-and-go driving can all affect alignment over time.`

### 9. Use FAQs as the long-tail keyword engine

Every service page should have 8 to 12 FAQs.

Categories to cover:

- Price.
- What is included.
- Eligibility.
- Time required.
- Appointment.
- Warning signs.
- Miami or local conditions.
- Model differences.
- Coupon rules.
- Pickup and delivery, if available.
- Internal links to related services.
- Dealer location and phone.

FAQ answer rules:

- Answer directly in the first sentence.
- Keep most answers between 40 and 90 words.
- Use the service keyword naturally.
- Use city and neighborhood terms sparingly.
- Do not answer with legal language only.
- Do not hide FAQ answers from initial HTML.
- Use `<details>` and `<summary>` for no-JS accordions.

### 10. Use schema as an entity graph

Do not throw disconnected JSON-LD blocks onto the page. Build a graph.

Every individual service page should include:

- WebPage
- BreadcrumbList
- AutoDealer and AutoRepair entity
- Service
- Offer
- FAQPage, when visible FAQ exists
- ImageObject, when useful
- PostalAddress
- GeoCoordinates
- OpeningHoursSpecification
- ContactPoint, when phone roles differ

Use stable IDs:

```json
{
  "@id": "https://www.exampledealer.com/#organization"
}
```

```json
{
  "@id": "https://www.exampledealer.com/#service"
}
```

```json
{
  "@id": "https://www.exampledealer.com/specials/oil-change#webpage"
}
```

```json
{
  "@id": "https://www.exampledealer.com/specials/oil-change#offer"
}
```

This lets machines connect the page, business, service department, and offer.

### 11. Consolidate local business data

Conflicting entity data is toxic. A dealership site often has multiple phone numbers and departments. That is fine, but the schema must explain the difference.

Use:

- Main phone.
- Sales phone.
- Service phone.
- Parts phone, if separate.
- Same address everywhere.
- Same geo coordinates everywhere.
- Same business name everywhere.
- Same URL and sameAs links everywhere.

Bad:

- One schema says 305-856-3000.
- Another schema says 877-735-0663.
- One schema has one coordinate.
- Another schema has a coordinate one mile away.
- One schema says priceRange $1200 to $15000.
- Another says Call for quote.

Good:

- Organization has one canonical identity.
- Departments have role-specific phones.
- Service page uses service phone visibly and in schema.

### 12. Do not add risky review schema

Review and AggregateRating schema can be useful, but it is also easy to implement incorrectly. Do not add self-serving star markup unless the business has compliant, visible, first-party review content that matches Google’s requirements.

Safer:

- Link to Google Business Profile, Yelp, DealerRater, Cars.com, Facebook, YouTube, and other verified profiles in sameAs where appropriate.
- Add visible “Read our reviews” CTAs.
- Do not invent ratings.
- Do not copy Google review stars into JSON-LD unless compliance is confirmed.

### 13. Build local relevance with real context

Local SEO is not a list of city names. It is proof that the page belongs to a real place.

Good local signals:

- Address in visible copy.
- Service phone in visible copy.
- Hours in visible copy.
- Neighborhoods served.
- Nearby corridors.
- Local driving conditions.
- Local weather.
- Local traffic patterns.
- Local customer use cases.
- Links to local GBP, map, or schedule page when appropriate.

For Miami auto service pages, useful local context includes:

- Brickell.
- Downtown Miami.
- Little Havana.
- Coral Gables.
- Coconut Grove.
- Key Biscayne.
- Wynwood.
- Edgewater.
- SW 8th Street.
- I-95.
- US-1.
- Miami heat.
- Humidity.
- Stop-and-go driving.
- Short trips.
- Coastal rain.
- Construction zones.

For Chicago pages:

- Downtown Chicago.
- West Loop.
- River North.
- Lincoln Park.
- South Loop.
- Gold Coast.
- Kennedy Expressway.
- Lake Shore Drive.
- Winter road salt.
- Potholes.
- Stop-and-go commuting.
- Seasonal tire and battery strain.

### 14. Avoid fake local stuffing

Bad:

`We proudly serve Brickell, Downtown Miami, Coral Gables, Coconut Grove, Kendall, Hialeah, Doral, Miami Beach, Aventura, Homestead, and all of Florida with the best Honda service.`

Better:

`Brickell Honda is located at 690 SW 8th St in Miami, a convenient service stop for Honda drivers near Brickell, Downtown Miami, Little Havana, Coral Gables, Coconut Grove, Key Biscayne, Wynwood, and Edgewater.`

Use fewer locations, but make them believable.

### 15. Make internal links strategic

Every page should link to:

- Schedule service.
- Main specials hub.
- Two to five related service pages.
- A relevant guide or FAQ page when available.
- Dealer homepage or service department page.

Examples:

Oil page links to:
- Tire rotation.
- Battery test.
- Spend and Save.
- Service specials hub.
- Schedule service.

Alignment page links to:
- Tire rotation.
- Tire price match or tire service.
- Spend and Save.
- Service specials hub.

Battery page links to:
- Pickup and delivery.
- Spend and Save.
- Schedule service.

Spend and Save page links to:
- Oil change.
- Alignment.
- Tire rotation.
- Brake service.
- Battery service.

Anchor text should describe the destination:

Good:
`Honda tire rotation special in Miami`

Bad:
`click here`

### 16. Make links crawlable

Use real `<a href="">` links. Do not use JavaScript-only click handlers for important internal links. Search engines use links to discover pages and understand page relationships.

Good:

```html
<a href="/specials/tire-rotation.html">Honda tire rotation special</a>
```

Bad:

```html
<button onclick="location.href='/specials/tire-rotation.html'">Tire Rotation</button>
```

### 17. Keep content visible in source HTML

Search and AI systems are better at rendering JavaScript than they used to be, but critical content should not depend on JavaScript. For CMS landing pages, use static HTML.

Must be visible in HTML:

- H1.
- Offer price.
- Disclaimer.
- FAQ answers.
- NAP.
- CTA links.
- Page body copy.
- Image alt text.
- JSON-LD.

### 18. Use scoped CSS, not global CSS

For dealership CMS environments, global CSS is dangerous. Apollo and Dealer.com can inject theme rules that fight custom code.

Every custom page should have:

- A root wrapper class.
- A dealer prefix.
- A page modifier.
- No global resets.
- No unscoped `h1`, `p`, `img`, `a`, or `button` selectors.
- No Tailwind CDN.
- No runtime styling dependency.

Example:

```html
<div class="bh-service-page bh-oil-change">
  ...
</div>
```

```css
.bh-service-page.bh-oil-change .bh-hero-title {
  ...
}
```

Not:

```css
h1 {
  ...
}
```

### 19. Use CSS for experience, not for hiding content

Do not hide important text off-screen. Do not use `display:none` for FAQ answers unless you are certain the content remains accessible and indexable. Prefer `<details>`.

Bad:

```html
<div class="faq-answer" style="display:none"></div>
```

Better:

```html
<details>
  <summary>How much is a Honda oil change?</summary>
  <p>Brickell Honda offers a Honda oil and filter change special for $79.95...</p>
</details>
```

### 20. Design for mobile first

Most local service searches are mobile. The page must be readable and clickable on a phone.

Mobile requirements:

- CTA above the fold.
- Price visible without scrolling too far.
- Phone number tappable.
- Sticky mobile CTA only if it does not cover content.
- No tiny disclaimer text below accessibility thresholds.
- No overflow from tables.
- No horizontal scroll.
- FAQ tap targets comfortable.
- Images not taller than the screen.
- CTAs full width on very small screens.

### 21. Optimize Core Web Vitals from the start

Core Web Vitals are real-world user experience metrics for loading performance, interactivity, and visual stability. For static landing pages, the biggest risks are large images, render-blocking assets, layout shifts, and unnecessary scripts.

Targets:

- LCP under 2.5 seconds.
- INP under 200 ms.
- CLS under 0.1.
- Mobile Lighthouse above 90 where the CMS allows it.
- No huge uncompressed hero image.
- Width and height on images.
- Lazy-load below-fold images.
- Eager-load or preload the hero image only when it is the LCP element.

Image example:

```html
<img
  src="Assets/honda-oil-change-miami.jpg"
  alt="Honda oil and filter change service at Brickell Honda in Miami"
  width="800"
  height="600"
  loading="eager"
>
```

Below-fold:

```html
<img
  src="Assets/miami-stop-go-traffic.jpg"
  alt="Stop-and-go Miami traffic that can affect Honda maintenance intervals"
  width="800"
  height="500"
  loading="lazy"
>
```

### 22. Use descriptive image filenames and alt text

Images support search context and accessibility.

Good filenames:

- `honda-oil-change-miami-brickell.jpg`
- `honda-four-wheel-alignment-miami.jpg`
- `brickell-honda-service-drive.jpg`
- `miami-stop-go-traffic-honda-service.jpg`

Good alt text:

- `Honda oil and filter change service at Brickell Honda in Miami`
- `Four-wheel alignment service for a Honda at Brickell Honda`
- `Brickell Honda service department at 690 SW 8th St in Miami`

Bad alt text:

- `image`
- `service`
- `Honda`
- `car`
- keyword-stuffed strings.

### 23. Use real prices and disclaimers without “marketing softening”

Dealer legal terms matter. Do not rewrite disclaimers into vague “restrictions apply” if the dealer supplied specific text.

If the dealer supplied:

`Some models may be higher. Offer must be presented at time of service. Cannot be combined with other offers, coupons or in-store specials. See service advisor for details. Tax will be additional.`

Then use that. We may fix capitalization when approved, but we do not remove substance.

### 24. Keep terms visible, not buried

A strong offer page should have:

- Short hero terms line.
- Full disclaimer near the offer or in an accessible terms area.
- FAQ answer explaining limitations in plain English.
- Schema description that does not contradict the visible terms.

### 25. Make page copy sound human

AI-sounding copy reduces trust. It also creates commodity content that search engines and AI systems have less reason to prefer.

Avoid:

- In today’s fast-paced world
- Look no further
- Comprehensive solution
- Premier destination
- Seamless experience
- Unlock savings
- Elevate your driving experience
- Peace of mind, unless truly natural
- Whether you are...
- Nestled in the heart of...
- Our team is committed to excellence
- Designed to meet all your needs

Use:

- `Miami heat is hard on batteries.`
- `If your steering wheel sits crooked, the alignment deserves a look.`
- `Bring up the offer when you check in.`
- `Some models cost more. Your advisor will confirm the price before work starts.`
- `If your wipers chatter in the rain, they are probably done.`

### 26. Add expertise without fake authority

E-E-A-T does not mean stuffing “expert” everywhere. It means showing the content is grounded in real experience.

Add:

- Service advisor language.
- Process details.
- What technicians inspect.
- What the customer receives.
- When the service is recommended.
- When the offer does not apply.
- Local condition explanations.
- Model-specific caveats.
- Links to official manufacturer maintenance resources when appropriate.

Do not add:

- Fake staff quotes.
- Fake certifications.
- Fake review counts.
- Fake “best in Miami” claims.
- Unsupported “factory-certified” claims if the dealer has not confirmed the wording.

### 27. Use tables and cards where they help extraction

AI systems can parse well-structured lists and tables. Users like them too.

Good use cases:

- Spend and Save tiers.
- Pickup and delivery mileage tiers.
- Service inclusion checklist.
- Warning signs.
- Process steps.
- Offer comparison.
- FAQ.

For mobile, tables must stack or scroll gracefully.

### 28. Support the money page with informational content

Service pages convert. Guides build topical authority.

For each service category, create or link to supporting guides:

Oil:
- Honda Maintenance Minder guide.
- How often to change oil in Miami.
- Honda oil life reset guide.

Tires:
- Tire rotation schedule.
- Tire tread depth guide.
- Alignment vs balancing.

Battery:
- Why batteries fail in Miami heat.
- Battery warning light guide.
- Hybrid battery vs 12V battery.

Brakes:
- Signs brake pads need replacement.
- Brake pads vs rotors.
- Why brakes squeak.

A/C:
- Why car A/C weakens in Miami.
- Refrigerant leak symptoms.

The service page should not become a giant blog post. It should answer enough, then link deeper.

### 29. Use competitor analysis as a structure tool

When competitors rank, study:

- Title tag.
- H1.
- H2s.
- Word count.
- FAQ depth.
- Offer clarity.
- Schema types.
- Internal links.
- Local terms.
- Images and alt text.
- Page speed.
- Mobile experience.
- Backlink and domain authority context.

Do not copy their wording. Reverse engineer the coverage and improve it.

### 30. Map keyword clusters before writing

Each page should have a keyword map:

- Primary keyword.
- Secondary keywords.
- Question keywords.
- Local modifiers.
- Model modifiers.
- Symptom keywords.
- Offer keywords.
- Related service keywords.
- Negative keywords to avoid.

Example: Oil page.

Primary:
- Honda oil change Miami

Secondary:
- Honda oil change Brickell
- Honda oil change near Downtown Miami
- Honda synthetic oil change Miami
- Honda oil change coupon Miami
- Honda service specials Miami

Questions:
- How much is a Honda oil change in Miami?
- Does a Honda oil change include a battery inspection?
- How often should I change my Honda oil in Miami?
- Do I need to print the coupon?

Models:
- Civic
- Accord
- CR-V
- HR-V
- Pilot
- Odyssey
- Ridgeline
- Passport

Symptoms:
- Maintenance Minder
- oil life light
- engine oil warning
- rough idle
- frequent short trips

### 31. Do not create doorway pages

Location-service “zipper” pages can work, but they can also become spam if each page is thin or nearly identical.

Acceptable:
- One strong page for Honda service specials in Miami.
- One strong page for Honda oil change in Miami.
- One strong page for Honda alignment in Miami.

Risky:
- Honda oil change Brickell.
- Honda oil change Downtown Miami.
- Honda oil change Coral Gables.
- Honda oil change Coconut Grove.
- Honda oil change Little Havana.

Do not split locations unless each page has a legitimate unique service angle, unique content, and a real business reason to exist.

### 32. Use canonical tags carefully

Each page needs a self-referencing canonical URL. If a CMS publishes multiple versions, canonicalize to the clean public URL.

Example:

```html
<link rel="canonical" href="https://www.brickellhonda.com/specials/oil-change">
```

Rules:

- No relative canonicals.
- No canonical pointing to a staging URL.
- No canonical pointing to an unrelated hub.
- No canonical mismatch with sitemap URL.
- If the page is retired, redirect or canonicalize intentionally.

### 33. Add Open Graph and Twitter Cards

Every production page should include:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Honda Oil Change Miami | $79.95 Special | Brickell Honda">
<meta property="og:description" content="Schedule a Honda oil and filter change in Miami at Brickell Honda. Includes synthetic oil, battery inspection, car wash, and multi-point inspection.">
<meta property="og:url" content="https://www.brickellhonda.com/specials/oil-change">
<meta property="og:image" content="https://www.brickellhonda.com/path/to/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Honda Oil Change Miami | $79.95 Special | Brickell Honda">
<meta name="twitter:description" content="Schedule a Honda oil and filter change in Miami at Brickell Honda.">
<meta name="twitter:image" content="https://www.brickellhonda.com/path/to/og-image.jpg">
```

Use static, absolute image URLs.

### 34. Add robots and AI crawler strategy

For AI visibility, crawlability matters. OpenAI documents distinct crawlers such as OAI-SearchBot and GPTBot. Perplexity documents PerplexityBot. The proposed llms.txt standard gives AI systems a markdown map of important content.

Best practice:

- Allow standard search crawlers.
- Allow AI search crawlers where the client wants AI visibility.
- Decide separately whether to allow AI training crawlers.
- Publish `robots.txt`.
- Publish XML sitemap.
- Add `llms.txt` where the CMS permits it.
- Add an AI sitemap or markdown content map where feasible.

Example robots intent:

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://www.exampledealer.com/sitemap.xml
```

Caution: crawler names and policies change. Verify before deployment.

### 35. Use llms.txt as an AI-readable entity guide

`llms.txt` is a proposed markdown standard, not a guaranteed ranking factor. But it is a low-friction way to present the site’s most important facts to LLMs.

A dealership `llms.txt` should include:

- Business name.
- Address.
- Phones.
- Departments.
- Hours.
- Core service URLs.
- Service special URLs.
- FAQ.
- Areas served.
- Parent organization.
- SameAs profile links.
- Notes about current offers.
- Last updated date.

Do not put secrets in llms.txt. It is public.

### 36. Add XML sitemap and keep it current

Sitemaps help search engines discover pages and know when content changes. For client landing page packages, include:

- `sitemap.xml` update instructions.
- Clean canonical URLs.
- Lastmod dates.
- Important service pages.
- Hub pages.

If you cannot edit the sitewide sitemap because the CMS controls it, at least provide the URLs for the webmaster and submit updated URLs in Search Console or Bing Webmaster Tools.

### 37. Use IndexNow where supported

IndexNow is useful when pages are updated often, such as monthly specials. It tells participating search engines when URLs are added, updated, or deleted.

Use cases:

- New service special.
- Expiration date update.
- Offer price update.
- Retired special.
- New guide page.

This is more important for Bing and connected retrieval systems than for Google.

### 38. Track AI visibility separately from SEO traffic

Traditional analytics undercount AI visibility because many AI answers are zero-click. Track:

- Google Search Console impressions and clicks.
- Bing Webmaster Tools AI citations, where available.
- ChatGPT referral traffic with UTM source where available.
- Perplexity referrals.
- Rankings for service queries.
- GBP calls and direction requests.
- Form submissions.
- Schedule-service clicks.
- Phone clicks.
- AI answer mentions from manual test prompts.

Manual prompt monitoring:

- “Where can I get a Honda oil change near Brickell?”
- “Which Honda dealer has service coupons in Miami?”
- “Does Brickell Honda have service specials?”
- “Who offers Honda tire rotation near Downtown Miami?”
- “Best Honda service center near Coral Gables?”

### 39. QA before deployment like a publisher

Every page must pass:

- One H1.
- Title tag present.
- Meta description present.
- Canonical correct.
- OG and Twitter tags present.
- JSON-LD valid.
- Visible price matches schema.
- Visible date matches schema.
- No old dates.
- No old prices.
- No retired offer names.
- All links work.
- Schedule link works.
- Phone link works.
- Image paths work.
- Alt text present.
- FAQ answers visible.
- No global CSS leaks.
- Mobile no horizontal scroll.
- Lighthouse sanity check.
- No unsupported claims.
- No AI-cliche phrases.
- No em dashes in final client copy if the client requested that style.

### 40. Retire outdated offers correctly

If an offer is removed:

- Remove it from the hub.
- Remove it from OfferCatalog schema.
- Remove it from FAQ answers.
- Remove it from meta descriptions.
- Remove bento/featured references.
- Remove internal links.
- Unpublish or redirect the individual page.
- If redirected, use the nearest relevant active page.
- Update sitemap.
- Submit updated URL to Search Console and Bing/IndexNow when possible.

### 41. Keep design patterns stable

Once a design system works, reuse it. Do not redesign every page.

Recommended patterns:

- Hub page.
- Individual mechanical service page with 3-image local context.
- Individual simple service page with one editorial image.
- Tiered discount page.
- Convenience service page.
- Offer card grid.
- Dealer anchor block.
- Dark closer.
- FAQ section.
- Local service band.
- Sticky mobile CTA.

This gives the site consistency and lets QA focus on content and schema.

### 42. Build a page brief before writing

Every page should begin with a brief:

```md
# Page Brief

Dealer:
URL:
Primary keyword:
Secondary keywords:
Search intent:
Offer:
Price:
Disclaimer:
Expiration:
Service phone:
Address:
Hours:
Nearby areas:
Model mentions:
Related pages to link:
FAQs to answer:
Schema types:
Images needed:
Do-not-say list:
```

Never let Claude or any writer start without this.

### 43. Use “source of truth” files

Maintain:

- `dealer-facts.json`
- `offer-matrix.csv`
- `keyword-map.csv`
- `schema-standard.md`
- `tone-guide.md`
- `qa-checklist.md`
- `url-map.md`
- `asset-map.md`

This prevents inconsistent phone numbers, addresses, dates, URLs, and disclaimers.

### 44. Keep schema and visible content synchronized

If a fact appears in schema, it should appear visibly or be clearly inferable from visible content.

Do not put in schema:

- Different price.
- Different phone.
- Different hours.
- Different address.
- Hidden offer.
- Fake FAQ.
- Fake ratings.
- Unconfirmed service areas.
- Unpublished URLs.

### 45. Create “answer blocks” for AI extraction

Add a short boxed or paragraph block after the hero:

```html
<div class="answer-block">
  <p><strong>Quick answer:</strong> Brickell Honda offers a Honda oil and filter change special in Miami for $79.95. The service includes up to 5 quarts of synthetic oil, a complimentary battery inspection, a car wash, and a multi-point inspection.</p>
</div>
```

Avoid labeling every block “AI answer.” Use human-friendly labels:

- Quick answer.
- What to know.
- Offer details.
- Before you schedule.
- At a glance.

### 46. Add “when not to use this offer” where needed

This builds trust.

Example:

`This offer cannot be combined with other coupons or in-store specials. Some models may cost more. Your service advisor will confirm the final price before work begins.`

This is better than hiding terms.

### 47. Use models naturally

For dealership pages, mention common models where helpful:

Honda:
- Civic.
- Accord.
- CR-V.
- HR-V.
- Pilot.
- Odyssey.
- Ridgeline.
- Passport.
- Prologue, if relevant.
- Hybrid variants, if relevant.

Toyota:
- Camry.
- Corolla.
- RAV4.
- Highlander.
- Tacoma.
- Tundra.
- Prius.
- Sienna.
- 4Runner.

CDJR:
- Wrangler.
- Grand Cherokee.
- Gladiator.
- Ram 1500.
- Durango.
- Pacifica.
- Compass.
- Charger, if relevant.

Do not stuff every model into every page. Use a model FAQ or one sentence.

### 48. Use official manufacturer language where useful

If writing about Maintenance Minder, ToyotaCare, Mopar, or OEM maintenance, use accurate manufacturer terminology. Link to official or internal guide pages where appropriate.

Do not imply the dealer created manufacturer requirements.

### 49. Write for service advisors, not copywriters

The most trustworthy tone sounds like a good advisor at the service desk.

Example:

`If your Honda pulls to one side or the steering wheel sits off-center, schedule an alignment check. The $99.95 four-wheel alignment special helps correct alignment angles and reduce uneven tire wear. Some models may be higher, and tax is additional.`

This is stronger than polished fluff.

### 50. Use citations and sources strategically

The GEO paper found visibility improvements from adding citations, quotations, and statistics. For dealership pages, use this carefully.

Good source uses:

- Official Google/Map facts only in internal documentation.
- Manufacturer maintenance references.
- NHTSA or official safety references for safety topics.
- Dealer’s own policy pages.
- Verified business profiles.
- Internal guide pages.

Avoid:

- Random blogs.
- Competitor pages as cited authorities.
- Unsourced statistics.
- Overloading a service coupon page with academic citations.

For client-facing pages, cite external sources only when it improves trust and does not distract from conversion.

---

## 5. The ideal service page architecture

### 5.1 Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Honda Oil Change Miami | $79.95 Special | Brickell Honda</title>
  <meta name="description" content="Schedule a Honda oil and filter change in Miami at Brickell Honda. Includes synthetic oil, battery inspection, car wash, and multi-point inspection.">

  <link rel="canonical" href="https://www.brickellhonda.com/specials/oil-change">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Honda Oil Change Miami | $79.95 Special | Brickell Honda">
  <meta property="og:description" content="Schedule a Honda oil and filter change in Miami at Brickell Honda.">
  <meta property="og:url" content="https://www.brickellhonda.com/specials/oil-change">
  <meta property="og:image" content="https://www.brickellhonda.com/assets/brickell-honda-oil-change-og.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Honda Oil Change Miami | $79.95 Special | Brickell Honda">
  <meta name="twitter:description" content="Schedule a Honda oil and filter change in Miami at Brickell Honda.">
  <meta name="twitter:image" content="https://www.brickellhonda.com/assets/brickell-honda-oil-change-og.jpg">

  <script type="application/ld+json">
  ...
  </script>

  <link rel="stylesheet" href="CSS/bh-service-base.css">
  <link rel="stylesheet" href="CSS/bh-oil-change.css">
</head>
<body>
<div class="bh-service-page bh-oil-change">

  <section class="bh-hero" id="special">...</section>

  <div class="bh-floating-banner-wrapper">...</div>

  <section class="bh-section bh-section-white" id="details">...</section>

  <section class="bh-section bh-section-gray" id="why-miami">...</section>

  <section class="bh-section bh-section-white" id="signs">...</section>

  <section class="bh-section bh-section-gray" id="local">...</section>

  <section class="bh-section bh-section-dark" id="why-brickell">...</section>

  <section class="bh-section bh-section-white" id="faq">...</section>

  <section class="bh-bottom-cta">...</section>

</div>
</body>
</html>
```

### 5.2 Section order

Best default sequence:

1. Hero with H1, price, direct answer, CTA.
2. Floating value panel.
3. Trust bar or dealer fact bar.
4. Offer details.
5. Why it matters locally.
6. Signs or decision support.
7. What happens during service.
8. Dealer anchor.
9. Related specials or internal links.
10. FAQ.
11. Local service band.
12. Bottom CTA.
13. Optional sticky mobile CTA.

### 5.3 Hero requirements

Hero must include:

- Eyebrow.
- H1.
- Price or value.
- Direct-answer paragraph.
- CTA.
- Secondary CTA.
- Short terms line.
- Hero image with descriptive alt text.

### 5.4 Offer details section

Use 4 to 6 cards or rows.

Example oil:

- Up to 5 quarts of synthetic oil.
- Oil filter replacement.
- Complimentary battery inspection.
- Complimentary car wash.
- Multi-point inspection.
- Some models may be higher.

### 5.5 Local context section

Do not write generic “why this matters.” Tie to the location.

Oil:
`Why Oil Changes Matter for Miami Honda Drivers`

Battery:
`Why Miami Heat Is Hard on Honda Batteries`

Alignment:
`Why Miami Roads Can Knock Alignment Out of Spec`

Wipers:
`Why Wiper Inserts Matter During Miami Rain`

Brakes:
`Why Stop-and-Go Miami Driving Wears Brake Pads Faster`

### 5.6 Dealer anchor section

Every page should have a dealer anchor:

- Dealer name.
- Address.
- Service phone.
- Hours.
- Schedule link.
- Nearby areas.
- Pick-up and delivery, if available.
- Financing, if available.
- Honda-trained technicians, if approved.
- Genuine Honda parts, where applicable.

### 5.7 FAQ section

Use `<details>` and `<summary>`. Questions should be visible in the source. Answers should be visible in the source.

Example:

```html
<details class="bh-faq-item">
  <summary class="bh-faq-question">
    <span>How much is a Honda oil change at Brickell Honda?</span>
    <span class="bh-accordion-icon"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
  </summary>
  <div class="bh-faq-answer">
    <p>Brickell Honda offers a Honda oil and filter change special in Miami for $79.95. Some models may be higher, tax is additional, and the offer must be presented at the time of service.</p>
  </div>
</details>
```

---

## 6. Ideal JSON-LD pattern for individual service pages

### 6.1 Notes

- Use JSON-LD.
- Keep it inside the page.
- Use one `@graph`.
- Use stable `@id` references.
- Keep schema facts aligned with visible page.
- Use one organization and one service department identity across all pages.

### 6.2 Example graph template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.exampledealer.com/specials/oil-change#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Example Dealer",
          "item": "https://www.exampledealer.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Service Specials",
          "item": "https://www.exampledealer.com/specials/service-specials"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Oil Change Special",
          "item": "https://www.exampledealer.com/specials/oil-change"
        }
      ]
    },
    {
      "@type": ["AutoDealer", "AutoRepair"],
      "@id": "https://www.exampledealer.com/#organization",
      "name": "Example Dealer",
      "url": "https://www.exampledealer.com/",
      "telephone": "+1-000-000-0000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "postalCode": "33130",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.000000,
        "longitude": -80.000000
      },
      "brand": {
        "@type": "Brand",
        "name": "Honda"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Miami" },
        { "@type": "Place", "name": "Brickell" },
        { "@type": "Place", "name": "Downtown Miami" },
        { "@type": "Place", "name": "Coral Gables" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.exampledealer.com/specials/oil-change#webpage",
      "url": "https://www.exampledealer.com/specials/oil-change",
      "name": "Honda Oil Change Miami | $79.95 Special | Example Dealer",
      "description": "Schedule a Honda oil and filter change in Miami at Example Dealer.",
      "isPartOf": {
        "@id": "https://www.exampledealer.com/#website"
      },
      "about": {
        "@id": "https://www.exampledealer.com/specials/oil-change#service"
      },
      "breadcrumb": {
        "@id": "https://www.exampledealer.com/specials/oil-change#breadcrumb"
      },
      "primaryImageOfPage": {
        "@id": "https://www.exampledealer.com/specials/oil-change#primaryimage"
      }
    },
    {
      "@type": "ImageObject",
      "@id": "https://www.exampledealer.com/specials/oil-change#primaryimage",
      "url": "https://www.exampledealer.com/assets/honda-oil-change-miami.jpg",
      "caption": "Honda oil and filter change service in Miami"
    },
    {
      "@type": "Service",
      "@id": "https://www.exampledealer.com/specials/oil-change#service",
      "name": "Honda Oil and Filter Change Service",
      "serviceType": "Automotive oil change service",
      "description": "Honda oil and filter change service in Miami with synthetic oil, oil filter replacement, and inspection items listed on the page.",
      "provider": {
        "@id": "https://www.exampledealer.com/#organization"
      },
      "areaServed": [
        { "@type": "City", "name": "Miami" },
        { "@type": "Place", "name": "Brickell" },
        { "@type": "Place", "name": "Downtown Miami" }
      ],
      "offers": {
        "@id": "https://www.exampledealer.com/specials/oil-change#offer"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.exampledealer.com/specials/oil-change#offer",
      "name": "Honda Oil and Filter Change Special",
      "description": "Oil and filter change special. Some models may be higher. Offer must be presented at time of service. Cannot be combined with other offers, coupons or in-store specials. See service advisor for details. Tax will be additional.",
      "url": "https://www.exampledealer.com/specials/oil-change",
      "price": "79.95",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-05-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": "https://www.exampledealer.com/#organization"
      },
      "itemOffered": {
        "@id": "https://www.exampledealer.com/specials/oil-change#service"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.exampledealer.com/specials/oil-change#faq",
      "mainEntity": []
    }
  ]
}
```

---

## 7. OfferCatalog pattern for hub pages

Hub pages need an `OfferCatalog`.

Use it only when the page visibly lists all offers.

Example properties:

- `name`
- `description`
- `provider`
- `numberOfItems`
- `itemListElement`
- each Offer with name, description, URL, price when applicable, priceCurrency, priceValidUntil, itemOffered

Rules:

- Do not include retired offers.
- Keep count accurate.
- Keep order aligned with visible grid when practical.
- Do not include hidden offers.
- Keep all dates current.
- Keep all URLs live or planned.

---

## 8. Dealer-specific implementation rules

### 8.1 Apollo CMS

- Paste full HTML into content area if the CMS expects full document code.
- Keep CSS references aligned with uploaded CSS path.
- Use Apollo image library URLs when assets are uploaded and masked.
- Do not assume local `./assets` paths will work live.
- Keep Font Awesome kit or local Font Awesome consistent across pages.
- Verify that Apollo does not strip `<script type="application/ld+json">`.
- Preview before publishing.
- Check for theme overrides.

### 8.2 Dealer.com

- Use scoped wrapper classes.
- Avoid global resets.
- Avoid JavaScript dependencies.
- Avoid `position: fixed` unless tested.
- Avoid overly aggressive body or html styling.
- Prepare separate HTML and CSS handoff.
- Confirm where CSS is loaded.
- Confirm schedule-service URL.
- Confirm whether schema is allowed in content blocks.

### 8.3 Static local packages

Every handoff should include:

- HTML files.
- CSS files.
- Asset map.
- URL map.
- Schema notes.
- QA report.
- Update instructions.
- Old page retirement instructions.
- CMS paste notes.

---

## 9. The “human copy” standard

### 9.1 Voice

The copy should sound like an experienced service advisor explaining the offer to a customer.

Not academic.  
Not robotic.  
Not fake friendly.  
Not a brochure.

### 9.2 Sentence rules

- Most sentences under 22 words.
- Paragraphs usually one to three sentences.
- Use active voice.
- Use simple words.
- Explain terms once.
- Avoid em dashes in final client copy where requested.
- Avoid long chains of clauses.
- Use contractions when natural.
- Do not overuse “our team.”

### 9.3 Examples

Weak:
`In today’s fast-paced world, maintaining your vehicle with a comprehensive oil change solution is essential for preserving optimal performance and peace of mind.`

Better:
`Miami heat and short trips are hard on engine oil. A regular oil and filter change helps protect your Honda and gives the service team a chance to catch small issues early.`

Weak:
`Unlock flexible savings with our Spend and Save promotion, designed to meet your unique automotive needs.`

Better:
`Spend and Save gives you a discount based on your qualifying parts and labor total. Taxes, shop supplies, environmental fees, and other fees do not count toward the discount.`

---

## 10. Keyword and topic research workflow

### 10.1 Inputs

Gather:

- Client offer list.
- Current page URLs.
- Competitor URLs.
- Keyword exports.
- Prompt gaps.
- Topic gaps.
- Source domain gaps.
- Search Console data, if available.
- GBP questions and reviews, if available.
- Paid search terms, if available.

### 10.2 Classification

Classify every keyword:

- Money keyword.
- Coupon keyword.
- Service keyword.
- Symptom keyword.
- Model keyword.
- Local keyword.
- Informational keyword.
- Comparison keyword.
- Competitor brand keyword.
- Irrelevant keyword.
- Risky keyword.

### 10.3 Assign page roles

- Money keyword goes to service page.
- Coupon keyword goes to service page or hub.
- Informational keyword goes to guide.
- Symptom keyword can be a FAQ or guide.
- Model keyword can be a model-specific paragraph or FAQ.
- Local keyword goes into local band or service page if natural.

### 10.4 Gap analysis rules

For each competitor ranking page, inspect:

- Is their page more specific?
- Do they answer more questions?
- Do they list more service details?
- Do they have schema?
- Do they have stronger local content?
- Do they have better internal links?
- Do they have clearer terms?
- Do they have a stronger title?
- Do they load faster?
- Do they have better images?
- Do they have older authority/backlinks that we cannot replicate directly?

Then beat what we can control.

---

## 11. AEO and GEO content mechanics

### 11.1 How to be selected for answers

Answer engines prefer content that is:

- Clear.
- Specific.
- Structured.
- Factually consistent.
- Supported by sources or evidence.
- Written in answer-sized chunks.
- Connected to a known entity.
- Easy to parse.
- Not hidden.
- Not overly promotional.

### 11.2 Snippable patterns

Use these formats:

- Quick answer blocks.
- FAQ sections.
- Tables.
- Step lists.
- “What’s included” lists.
- “Signs you need” lists.
- “How it works” lists.
- Comparison blocks.
- Local service bands.
- Offer terms blocks.

### 11.3 Citation magnets

Add facts that an AI can safely cite:

- Price.
- Address.
- Hours.
- Phone.
- Service inclusions.
- Eligibility.
- Valid-through date.
- Neighborhoods served.
- Process steps.
- Model examples.
- Manufacturer-related terminology.
- Legal terms.

### 11.4 Avoid citation blockers

AI systems are less likely to cite pages that:

- Contradict themselves.
- Hide core facts behind scripts.
- Have missing or conflicting schema.
- Are mostly images.
- Use vague marketing copy.
- Lack direct answers.
- Lack business identity.
- Have no local specificity.
- Have expired offers.
- Make unsupported claims.

---

## 12. Technical SEO checklist for HTML and CSS

### 12.1 HTML

Must-have:

- `<!DOCTYPE html>`
- `<html lang="en">`
- UTF-8 charset.
- viewport meta.
- title.
- meta description.
- canonical.
- OG tags.
- Twitter card tags.
- JSON-LD.
- one H1.
- semantic sections.
- crawlable links.
- image width and height.
- alt text.
- FAQ in source.
- CTA links.
- no broken paths.
- no duplicate IDs.
- no invalid nesting.

### 12.2 CSS

Must-have:

- scoped root wrapper.
- responsive breakpoints.
- no global selectors.
- no unnecessary animations.
- no layout shifts.
- no hidden critical content.
- no fixed widths that break mobile.
- accessible contrast.
- reasonable font sizes.
- consistent spacing.
- print styles only if needed.
- no CSS that overrides entire CMS.

### 12.3 JavaScript

Avoid for landing pages unless required.

Allowed:

- None preferred.
- Native `<details>` for accordions.
- Optional small enhancement only if page still works without it.

Avoid:

- JS-rendered content.
- JS-only navigation.
- client-side routing.
- dynamic FAQ injection.
- heavy carousels.
- unused libraries.

---

## 13. Performance checklist

### 13.1 Images

- Compress.
- Use correct dimensions.
- Use WebP or optimized JPG where allowed.
- Add width and height.
- Hero image eager.
- Below-fold lazy.
- Avoid 4 MB hero files.
- Avoid hidden images loaded anyway.
- Do not load six huge bento images above fold on mobile.

### 13.2 CSS

- Minimize unused CSS.
- Split base and page CSS when CMS allows.
- Avoid huge framework CSS.
- Avoid multiple icon libraries.
- Avoid external fonts if platform already loads them.
- If external fonts are necessary, limit weights.

### 13.3 Scripts

- Avoid multiple third-party scripts.
- Font Awesome kit can be acceptable, but local Font Awesome is safer where available.
- Do not add analytics or widgets inside page content unless client requires.

### 13.4 Layout

- Reserve image space.
- Avoid content jumping when fonts load.
- Avoid sticky CTA covering footer content.
- Test on 360px mobile width.

---

## 14. Local SEO and GBP alignment

The website cannot fix a weak GBP alone, but it can reinforce local relevance.

Ensure:

- Website NAP matches GBP.
- Service phone aligns with GBP department data if available.
- Hours match.
- Address formatting is consistent.
- Service categories are reflected on site.
- Service pages link to schedule flow.
- GBP appointment URL points to the correct schedule page when possible.
- GBP services include the same services as the website.
- Photos are current.
- Reviews are monitored.
- Q&A has accurate answers.

Website pages should make it easy for Google to understand the local business and the service.

---

## 15. Off-page SEO rules

### 15.1 What not to do

Avoid:

- Cheap backlinks.
- Private blog networks.
- Expired domain manipulation.
- Mass guest post farms.
- AI-generated third-party spam.
- Link exchanges.
- Paid links that pass ranking credit.
- Irrelevant directory spam.
- Fake review campaigns.
- Parasite SEO.

### 15.2 What to do

Safer authority building:

- Manufacturer profile consistency.
- Dealer group profile.
- GBP optimization.
- Yelp, DealerRater, Cars.com, Facebook, YouTube, LinkedIn profiles.
- Local sponsorship pages if real.
- Local chamber or association listings if real.
- Press releases only for real news.
- Useful guides on the client’s own site.
- Internal linking between service pages.
- Consistent sameAs in schema.

---

## 16. Measurement framework

### 16.1 SEO metrics

Track:

- Impressions.
- Clicks.
- CTR.
- Average position.
- Indexed URLs.
- Rich result eligibility.
- Core Web Vitals.
- Page speed.
- Broken links.
- Schema errors.
- Conversions.

### 16.2 Local metrics

Track:

- GBP calls.
- GBP direction requests.
- GBP website clicks.
- Local pack rankings.
- Map rankings.
- Service-area queries.
- Reviews and Q&A.

### 16.3 AEO and GEO metrics

Track:

- ChatGPT referral traffic.
- Perplexity referral traffic.
- Bing AI citations.
- Manual AI prompt visibility.
- AI answer accuracy.
- Whether the dealer is cited.
- Which page is cited.
- Whether the answer includes correct phone, address, price, or offer.
- Whether competitors are cited instead.
- Missing facts that caused an AI to choose another source.

### 16.4 Conversion metrics

Track:

- Schedule-service clicks.
- Phone clicks.
- Form submits.
- Coupon detail clicks.
- Scroll depth.
- FAQ opens.
- Mobile sticky CTA clicks.
- Offer card clicks.
- Calls by page, if call tracking exists.

---

## 17. QA scripts and search checks

Before deployment, search the code for:

### Dates

- old expiration dates.
- old schema dates.
- old visible dates.

### Prices

- old prices.
- old tier ranges.
- old max discounts.

### Retired offers

- old offer names.
- old URLs.
- old alt text.
- old schema entries.
- old FAQs.

### Technical

- `&amp;` in visible copy where normal ampersand is preferred.
- em dash characters.
- `TODO`
- `placeholder`
- `verify`
- `lorem`
- local asset paths not valid for CMS.
- duplicate H1.
- missing alt.
- broken internal links.

### Schema

- invalid JSON.
- duplicate `@id` misuse.
- FAQ schema without visible FAQ.
- Offer without price.
- price mismatch.
- date mismatch.
- local business mismatch.
- fake AggregateRating.

---

## 18. Production prompts for Claude Code

### 18.1 Page rewrite prompt template

```text
Read first:
- CLAUDE.md
- KNOWLEDGE.md
- SYSTEM_ARCHITECTURE.md
- dealer-facts.json
- offer-matrix.csv
- keyword-map.csv
- schema-standard.md
- tone-guide.md
- current page HTML and CSS

Task:
Rewrite and optimize [PAGE] for SEO, GEO, and AEO without redesigning the visual system.

Rules:
1. Preserve dealer-approved price, inclusions, and disclaimer exactly.
2. Update visible expiration to [MM/DD/YYYY] and schema expiration to [YYYY-MM-DD].
3. Use exactly one H1.
4. Put service plus city in H1.
5. Include direct-answer copy in the first 100 words.
6. Rewrite H2s around service, city, and customer questions.
7. Expand FAQ to 8 to 12 visible questions.
8. Add or repair JSON-LD graph: WebPage, BreadcrumbList, AutoDealer/AutoRepair, Service, Offer, FAQPage.
9. Keep all schema facts aligned with visible content.
10. Add local context naturally.
11. Add internal links to related service pages.
12. Keep all CSS scoped and unchanged unless required.
13. Avoid AI-sounding phrases.
14. Avoid unsupported claims.
15. Do not add fake ratings or reviews.

Deliver:
- Edited files.
- Summary of changes.
- QA results.
```

### 18.2 Hub update prompt template

```text
Update the service-specials hub.

Rules:
- Use current offer matrix as source of truth.
- Remove retired offers from visible cards, bento, FAQ, meta, and OfferCatalog schema.
- Keep active counts accurate.
- Update all dates.
- Keep schema order aligned with visible card order when practical.
- Preserve image mapping.
- Do not redesign.
- Run QA searches for old offers, old dates, old prices, and count mismatches.
```

### 18.3 Schema QA prompt template

```text
Validate the JSON-LD on this page.

Check:
- valid JSON
- stable @id values
- no duplicate local business conflicts
- visible content matches schema
- Offer price and expiration match visible copy
- FAQ schema matches visible FAQ
- no fake AggregateRating
- no retired offer
- correct canonical URL
- BreadcrumbList positions correct
- provider and seller IDs resolve to the same dealer entity

Report only issues and exact fixes.
```

---

## 19. Client handoff standards

Every handoff should include:

1. Overview.
2. Files included.
3. Pages and URLs.
4. CSS loading instructions.
5. Image asset mapping.
6. Schema notes.
7. Offer/legal source of truth.
8. Deployment order.
9. Post-deployment QA checklist.
10. Known risks.
11. Access and maintenance expectations.
12. Retirement/redirect instructions for old offers.

---

## 20. The final golden rules list

1. One page, one primary intent.
2. One H1.
3. Service plus city in the H1.
4. Title tag written as a search snippet.
5. Meta description written as a conversion pitch.
6. Price and offer in the first 100 words.
7. Direct answer near the top.
8. H2s built around service, location, and customer questions.
9. Visible disclaimers.
10. Visible NAP.
11. Consistent phone, address, and hours.
12. Local context tied to the service.
13. No keyword stuffing.
14. No fake reviews.
15. No unsupported claims.
16. No hidden core content.
17. FAQ answers in initial HTML.
18. Details/summary for accordions.
19. Schema graph, not schema fragments.
20. Stable @id values.
21. Offer schema on every offer page.
22. OfferCatalog schema on hub pages.
23. FAQPage only when FAQ is visible.
24. No risky AggregateRating unless compliant.
25. Descriptive alt text.
26. Optimized image size.
27. Width and height on images.
28. Crawlable internal links.
29. Strategic sibling links.
30. Static HTML for money content.
31. Scoped CSS.
32. Mobile-first layout.
33. Core Web Vitals sanity.
34. Canonical URL correct.
35. OG and Twitter tags present.
36. Sitemap updated.
37. Robots and AI crawler policy reviewed.
38. llms.txt where possible.
39. IndexNow where useful.
40. Retired offers removed everywhere.
41. Old dates removed everywhere.
42. Old prices removed everywhere.
43. Competitor structure analyzed, not copied.
44. Keyword clusters mapped before writing.
45. Supporting guide content planned.
46. Copy sounds like a service advisor.
47. Avoid AI-cliche language.
48. QA before paste.
49. QA after publish.
50. Track outcomes and iterate.

---

## 21. Source library

### Google

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Succeeding in AI Search: https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- Generative AI content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Structured data intro: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Local business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- FAQ structured data: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Review snippets: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Meta descriptions and snippets: https://developers.google.com/search/docs/appearance/snippet
- Image SEO: https://developers.google.com/search/docs/appearance/google-images
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Qualify outbound links: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- Google Business Profile local ranking: https://support.google.com/business/answer/7091

### Bing and Microsoft

- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- Microsoft AI search content optimization guidance: https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers
- Bing AI Performance dashboard: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- IndexNow: https://www.indexnow.org/
- IndexNow documentation: https://www.indexnow.org/documentation

### Schema.org

- Schema.org: https://schema.org/
- LocalBusiness: https://schema.org/LocalBusiness
- AutoDealer: https://schema.org/AutoDealer
- Service: https://schema.org/Service
- Offer: https://schema.org/Offer
- OfferCatalog: https://schema.org/OfferCatalog
- OpeningHoursSpecification: https://schema.org/OpeningHoursSpecification
- priceValidUntil: https://schema.org/priceValidUntil

### AI crawler and LLM discovery

- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- OpenAI publisher FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Perplexity robots.txt behavior: https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt
- llms.txt proposal: https://llmstxt.org/
- Answer.AI llms.txt post: https://www.answer.ai/posts/2024-09-03-llmstxt.html

### GEO and AEO research

- GEO: Generative Engine Optimization paper: https://arxiv.org/abs/2311.09735
- GEO paper PDF: https://arxiv.org/pdf/2311.09735
- Measurement Framework for Generative Engine Optimization: https://arxiv.org/html/2604.25707

---

## 22. Last word

The best SEO, GEO, and AEO strategy is not to trick the machine. It is to make the page so clear, useful, locally grounded, technically clean, and factually consistent that the machine has no better source to use.

For dealership service pages, the winning formula is simple:

**Real offer. Real business. Real location. Clear answer. Clean code. Complete schema. Human writing. Fast page. Strong QA. Continuous updates.**

That is the recipe.
