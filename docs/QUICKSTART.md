# Quick start: your first dealer article (about 10 minutes of your time)

## 1. One-time setup
1. Install **Node.js 18+** (Windows: `winget install OpenJS.NodeJS.LTS`, Mac: `brew install node`), then restart your computer
   or at least Claude Code.
2. In a terminal:
   ```
   claude plugin marketplace add kaloat01/dnb-claude-plugins
   claude plugin install dealer-articles@dnb-plugins
   claude plugin install frontend-design@claude-plugins-official
   ```
3. Open Claude Code **in the folder where you want your articles saved** (e.g. `Documents/Articles`) and type `/article-setup`.
   Fix anything it marks ❌. Turn on auto-update: `/plugin` → Marketplaces → `dnb-plugins` → Enable auto-update.

## 2. Start the article
```
/article-apollo "<dealer name>" "<article title>"
```
Example: `/article-apollo "Toyota of Downtown Chicago" "Toyota Hybrid Battery Care in Chicago: Warranty and Winter Tips"`.
Dealers: Brickell Honda, Brickell Mazda, Honda Libertyville, Toyota of Downtown Chicago, Bentley Jacksonville, Murgado Ford
of Chicago, Murgado Lincoln of Chicago, Bentley Edison.

## 3. Source the images (the first thing the agent gives you)
The agent's first message is an **image list** (up to 5 photos, some may already be in the dealer's Apollo library). While it
researches and drafts, upload the requested photos to the dealer's **Apollo Image Manager** and reply with their Image IDs
(e.g. `IMG_HERO = 123456`). Real photos you have rights to (OEM media/press site), matching the model year, no text or logos.

## 4. Answer its questions (only when needed)
It stops to ask only when the answer changes the article, e.g. the title's claim isn't published by the manufacturer, or the
dealer already has a page on the topic. Pick the recommended option unless you know better.

## 5. Review and publish
You get a **preview** (`<slug>-preview.html`, open it in your browser) and a **package** folder:
1. `<prefix>-articles-sitewide-CSS.html`: paste ONCE per dealer into Apollo's site-wide style slot (all pages).
   Re-paste only if its `dealer-articles css <code>` line differs from the live one.
2. New **custom page** at `/<slug>` (never a blog post) → paste `<slug>-HTML.html` into the page HTML.
3. **Custom Structured Data** → paste `<slug>-Structured-Data.txt` and **check "Replace Structured Data"**.
4. **SEO Settings** → enter each `* Field  →  value` line from `<slug>-SEO.md` (leave the H1 field blank).
5. Publish, then check: one headline, images load, phone numbers show (Apollo fills `#SalesNumber` / `#ServiceNumber`),
   FAQ opens, and run Google's Rich Results Test on the URL.
If the package says **DRAFT**, images are still placeholders: send the Image IDs (or run `/article-images "<dealer>" "<title>"`)
to get the final package.

## Need help?
Long research can take 30–60 minutes; you can leave it running. If a session ends, run the same `/article-apollo` command
again in the same folder to resume. Questions: contact Nasko.
