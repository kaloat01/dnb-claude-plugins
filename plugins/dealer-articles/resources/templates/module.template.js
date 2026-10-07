/* __DEALER_NAME__ article module: "__TITLE__"
 * ONE file = the single source of truth for this article. Build with:  node <plugin>/scripts/build.js build <job folder>
 * Quality bar: resources/examples/example-module.js (depth, voice, structure). Read it before writing.
 *
 * WRITING RULES (the gates enforce most of them; ❌ blocks the build, ⚠️ is a warning):
 *  - Facts only from the claim ledger (primary sources). Attribute dealer statements ("Our team says ...").
 *  - Answer first: every question H2 is followed by a <strong>bold one- or two-sentence answer</strong> paragraph,
 *    then a normal paragraph. The builder runs the bold answer INLINE into that next paragraph. A bold-only
 *    paragraph followed by anything other than a 'p' block fails the gate.
 *  - NO "01, 02" numbering on H2s, TOC or lists (reads as AI-written). Steps blocks number themselves.
 *  - 8 to 9 question H2s, 1,700 to 2,300 body words, sentences of 25 words or fewer, 12+ unique internal links.
 *  - FAQ: 9 to 10 questions, each answer 40 to 90 words, plain text (no HTML), not repeating the body verbatim.
 *  - No em dashes; en dashes only inside number ranges. No toll-free (8xx) numbers. No "$" figures unless
 *    allowMsrp: true and the word "MSRP" sits within 140 characters. No banned phrases (see ${CLAUDE_PLUGIN_ROOT}/resources/rules/rigor-and-content.md,
 *    plus the dealer's "bans"). Local framing only with the dealer's "areas"; never its "excluded" towns.
 *  - Internal links: root-relative paths ("/scheduleservice") from the dealer sitemap snapshot or allowedLinks.
 *  - Tokens you may use in HTML strings: {{PHONE}} (this article's department phone), {{SALESPHONE}}, {{SERVICEPHONE}}.
 *  - Remove every TODO before building; the TODO marker is a banned word on purpose.
 */
module.exports = {
  dealer: '__DEALER__',              // dealer file key (resources/dealers/__DEALER__.json)
  dept: 'service',                   // 'service' or 'sales': picks phone, hours, CTA and schema department
  // cta: { label: 'Schedule Service', href: '/scheduleservice' },   // optional: override the department CTA button
  slug: '__SLUG__',
  path: '__PATH__',                  // Apollo custom page URL (root-relative)
  title: '__TITLE__',                // Page Title (<=65 chars), contains the focus keyword
  ogTitle: 'TODO OG title (may be longer and more inviting than the page title)',
  meta: 'TODO meta description, 130 to 165 characters, answers the query and names __CITY__ or the dealer.',
  focus: 'TODO focus keyword (e.g. "__BRAND__ <topic> __CITY__")',
  keywords: ['TODO focus keyword', 'TODO 5 to 8 close variants and question phrasings'],
  datePublished: '__DATE__',
  dateModified: '__DATE__',
  updatedLabel: '__DATE_LABEL__',    // shown as "Updated MM/DD/YYYY"
  eyebrow: '__BRAND__ Service Guide · __CITY__',   // short kicker above the H1
  section: 'Service and Maintenance', // BlogPosting.articleSection
  crumbs: [{ n: 'Service', u: '/scheduleservice' }],   // middle breadcrumbs (Home and this page are added automatically)
  crumbTitle: 'TODO short breadcrumb name for this page',
  h1: 'TODO H1 as the reader\'s question or promise (<=80 chars)',
  dek: 'TODO two sentences under the H1: the direct answer, then what the article covers.',
  hero: 'IMG_HERO',                  // key in images{}
  // heroContained: true,            // use when the hero image is narrower than 1900 px (see: build.js images <job>)
  banned: [],                        // extra regex strings for this article only, e.g. ['\\$\\s?\\d', 'limited time']
  allowPhrases: [],                  // verbatim source wording that contains a banned word, e.g. ['values are not guaranteed']
  // allowMsrp: true,                // only for comparison articles that cite manufacturer MSRP
  // allowedLinks: ['/scheduleservice'],   // optional: overrides the dealer sitemap snapshot as the link allow-list

  /* Images: apollo = Apollo library id ('717450'), id with params ('108908&Width=0&Height=0&logo=y') or a full URL.
   * Leave apollo: null until the image is uploaded; the preview shows a gray placeholder with `desc`, and the package
   * stays DRAFT (build --final fails). w/h = real pixel size (run: build.js images <job> to read them). */
  images: {
    IMG_HERO: { apollo: null, alt: 'TODO literal description of the hero photo', w: null, h: null, desc: 'TODO hero request: model/scene, angle, setting, daylight; landscape, ideally 1900+ px wide' },
    IMG_FIG1: { apollo: null, alt: 'TODO alt text', w: null, h: null, desc: 'TODO wide figure request, 1100+ px wide' },
    IMG_FIG2: { apollo: null, alt: 'TODO alt text', w: null, h: null, desc: 'TODO second full-width figure request, 1100+ px wide' },
    IMG_PAIR1: { apollo: null, alt: 'TODO alt text', w: null, h: null, desc: 'TODO left image of a side-by-side pair (4:3 crop)' },
    IMG_PAIR2: { apollo: null, alt: 'TODO alt text', w: null, h: null, desc: 'TODO right image of a side-by-side pair (4:3 crop)' },
  },

  // Four "At a glance" bullets: bold lead-in sentence, then one or two plain sentences.
  glance: [
    '<strong>TODO first takeaway.</strong> TODO supporting sentence.',
    '<strong>TODO second takeaway.</strong> TODO supporting sentence.',
    '<strong>TODO third takeaway.</strong> TODO supporting sentence.',
    '<strong>TODO fourth takeaway.</strong> TODO supporting sentence.',
  ],

  /* Body blocks, in reading order. Every block type is shown once below. Pattern per section:
   * h2 (question) → p (bold answer only) → p (support) → optional list/steps/table/callout/stats/fig/pair/cta.
   * Repeat until you have 8 to 9 question H2s. */
  blocks: [
    // h2: id = anchor (lowercase-hyphen), toc = short TOC label, text = the question as people ask it
    { t: 'h2', id: 'first-question', toc: 'TODO short TOC label', text: 'TODO first question people ask?' },
    // p: bold-only answer paragraph; runs inline into the next p
    { t: 'p', html: '<strong>TODO direct answer in one or two sentences.</strong>' },
    { t: 'p', html: 'TODO supporting paragraph with a source and an <a href="/scheduleservice">internal link</a>. Call {{PHONE}}.' },
    // stats: three short figures with a sourced label each
    { t: 'stats', items: [
      { n: 'TODO', l: 'TODO what the figure means and its source' },
      { n: 'TODO', l: 'TODO second figure' },
      { n: 'TODO', l: 'TODO third figure' },
    ] },
    // fig: full-width figure (prose: true = narrow 880 column); closes the text column automatically
    { t: 'fig', img: 'IMG_FIG1', caption: 'TODO caption that adds information, not a restated alt.' },

    { t: 'h2', id: 'second-question', toc: 'TODO short TOC label', text: 'TODO second question?' },
    { t: 'p', html: '<strong>TODO direct answer.</strong>' },
    { t: 'p', html: 'TODO supporting paragraph.' },
    // h3: optional sub-heading inside a section (renders in the body font, bold)
    { t: 'h3', text: 'TODO sub-heading' },
    // list: square bullets; check: true is the checklist style
    { t: 'list', check: true, items: ['<strong>TODO item.</strong> TODO detail.', '<strong>TODO item.</strong> TODO detail.'] },
    // table: caption, column heads, rows (first cell bold), source note
    { t: 'table', caption: 'TODO table caption', head: ['TODO', 'TODO', 'TODO'], rows: [
      ['TODO', 'TODO', 'TODO'],
      ['TODO', 'TODO', 'TODO'],
    ], note: 'TODO source and review date, e.g. "Source: owner\'s manual, reviewed MM/DD/YYYY."' },

    { t: 'h2', id: 'third-question', toc: 'TODO short TOC label', text: 'TODO third question?' },
    { t: 'p', html: '<strong>TODO direct answer.</strong>' },
    { t: 'p', html: 'TODO supporting paragraph.' },
    // steps: auto-numbered steps; h = bold lead, html = detail
    { t: 'steps', items: [
      { h: 'TODO first step.', html: 'TODO detail.' },
      { h: 'TODO second step.', html: 'TODO detail.' },
    ] },
    // pair: two images side by side (4:3 crop)
    { t: 'pair', items: [
      { img: 'IMG_PAIR1', caption: 'TODO caption' },
      { img: 'IMG_PAIR2', caption: 'TODO caption' },
    ] },
    { t: 'p', html: 'TODO paragraph after the pair (a new text column opens automatically).' },
    // cta: one inline call to action per article, mid-way
    { t: 'cta', text: 'TODO short prompt?', label: 'Schedule Service', href: '/scheduleservice' },

    { t: 'h2', id: 'fourth-question', toc: 'TODO short TOC label', text: 'TODO fourth question (local angle for __CITY__)?' },
    { t: 'p', html: '<strong>TODO direct answer.</strong>' },
    { t: 'p', html: 'TODO supporting paragraph.' },
    // callout: gray box with a label; good for a rule, a warning or a local note
    { t: 'callout', label: 'TODO callout label', html: 'TODO callout text with its source.' },
    { t: 'fig', img: 'IMG_FIG2', caption: 'TODO caption' },
    // ... continue with question H2s 5 to 9 using the same pattern
  ],

  faqTitle: 'TODO FAQ heading, e.g. "__BRAND__ service questions, answered"',
  faqIntro: 'TODO one sentence introducing the FAQ.',
  faqCall: 'Questions about your __BRAND__? Call our service team at {{PHONE}}.',
  // 9 to 10 Q&A, 40 to 90 words each, plain text. The FAQPage schema is generated from exactly this list.
  faq: [
    { q: 'TODO question one?', a: 'TODO answer of 40 to 90 words.' },
    { q: 'TODO question two?', a: 'TODO answer of 40 to 90 words.' },
  ],

  dealerSection: {
    eyebrow: 'Visit us in __CITY__',
    h: 'TODO dealership heading tied to the topic',
    p: 'TODO two or three sentences: where the dealer is, which nearby areas drivers come from (dealer areas only), what to do next.',
    // other: { phone: '...' }, otherLabel: 'Parts',   // optional: replace the "Main line" fact
  },
  closer: {
    h: 'TODO closing headline (short, no hype)',
    p: 'TODO one or two sentences with the next step.',
    secondary: { label: 'TODO secondary button label', href: '/scheduleservice' },
  },
  // Exactly three "Keep reading" cards: k = kicker, t = title, d = one-line description, href = internal link
  related: [
    { k: 'TODO', t: 'TODO', d: 'TODO', href: '/scheduleservice' },
    { k: 'TODO', t: 'TODO', d: 'TODO', href: '/scheduleservice' },
    { k: 'TODO', t: 'TODO', d: 'TODO', href: '/scheduleservice' },
  ],
  fine: 'TODO sources reviewed MM/DD/YYYY: list the primary sources. Add required disclaimers.',
  about: [{ '@type': 'Thing', name: 'TODO main topic' }],
};
