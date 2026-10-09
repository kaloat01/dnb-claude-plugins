# Quick start: your first dealer article (about 10 minutes of your time)

## 1. One-time setup
**Where:** the Claude Desktop app's **Code** tab with a **Local** session, or Claude Code in a terminal.
- The **Chat** and **Cowork** tabs and cloud sessions cannot load plugins.
- The Code tab and the terminal share the same plugins.

1. Install **Node.js 18+** (Windows: `winget install OpenJS.NodeJS.LTS`, Mac: `brew install node`) and Git. Fully quit and reopen Claude.
2. Install the plugin. **Desktop app:**
   1. **Code** tab → new **Local** session.
   2. Type `/plugin marketplace add kaloat01/dnb-claude-plugins`.
   3. Then **+** → **Plugins** → **Add plugin** → **dealer-articles** → **Install** (for you / user scope).

   **Terminal instead:**
   ```
   claude plugin marketplace add kaloat01/dnb-claude-plugins
   claude plugin install dealer-articles@dnb-plugins
   claude plugin install frontend-design@claude-plugins-official
   ```
3. **Turn on auto-update** (it is off until you do): `/plugin` → Marketplaces → `dnb-plugins` → Enable auto-update.
4. Start a new session **in the folder where you want your articles saved** (e.g. `Documents/Articles`) and type `/dealer-articles:article-setup`. Fix anything it marks ❌.
5. **Check:** type `/article`. The menu must show `/dealer-articles:article`, `/dealer-articles:article-apollo` and `/dealer-articles:article-dealerinspire`. If it doesn't, see the README troubleshooting.

## 2. Start the article
Sections 2 to 5 are for **Apollo** dealers. For the Mercedes-Benz stores (DealerInspire), go to section 6. The easiest start works for any dealer:
```
/dealer-articles:article "<dealer name>" "<article title>"
```
It picks the platform for you. The platform-specific command is:
```
/dealer-articles:article-apollo "<dealer name>" "<article title>"
```
Every plugin command starts with `/dealer-articles:`. Typing `/article` and choosing from the menu is easiest. If plugins can't load where you are, use the **fallback prompt** in the README (Use → Fallback).
Example: `/dealer-articles:article-apollo "Toyota of Downtown Chicago" "Toyota Hybrid Battery Care in Chicago: Warranty and Winter Tips"`.
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
   Copy it from the file in Notepad (never from a chat). Re-paste only if `da-css-version` in the live page source differs from the file.
2. New **custom page** at `/<slug>` (never a blog post) → paste `<slug>-HTML.html` into the page HTML.
3. **Custom Structured Data** → paste `<slug>-Structured-Data.txt` and **check "Replace Structured Data"**.
4. **SEO Settings** → enter each `* Field  →  value` line from `<slug>-SEO.md` (leave the H1 field blank).
5. Publish, then check: one headline, images load, phone numbers show (Apollo fills `#SalesNumber` / `#ServiceNumber`),
   FAQ opens, and run Google's Rich Results Test on the URL.
If the package says **DRAFT**, images are still placeholders: send the Image IDs (or run `/dealer-articles:article-images "<dealer>" "<title>"`)
to get the final package.

## 6. DealerInspire (Mercedes-Benz stores)
Same workflow and same checks as Apollo. Only the images, the package and the paste steps differ.
1. **Start the article:**
   ```
   /dealer-articles:article-dealerinspire "<dealer name>" "<article title>"
   ```
   Example: `/dealer-articles:article-dealerinspire "Mercedes-Benz of Midlothian" "<article title>"`.
   Dealers: Mercedes-Benz of Laguna Niguel, Mercedes-Benz of Foothill Ranch, Mercedes-Benz Vans of Laguna Niguel (Sprinter),
   Mercedes-Benz of Midlothian, Mercedes-Benz of Richmond. "Mercedes Laguna" matches two stores (cars and Vans); the agent
   asks which one.
2. **Source the images:** the first message is the same image list. Upload each photo to the store's **WordPress Media
   Library** (Media → Add New), open the attachment details and reply with its **File URL**
   (`https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`). Send the original, not a resized
   `-1024x683` copy, and only from that store's own library.
3. **Answer its questions** (only when needed), as in section 4. If the store already has a page on the same topic, the agent may
   recommend refreshing that page in place, at the same URL.
4. **Review and publish.** You get a **preview** (`<slug>-preview.html`) and a **package** folder with ONE paste file:
   1. WordPress admin → **Pages** → Add New (or open the page you are refreshing). Title: the "Page title" line in
      `<slug>-SEO.md`. Set the parent page it lists (California stores) so the URL matches.
   2. **Page Composer:** a full-width row with a **"Use WordPress Content"** element. In the page's **Text** tab, paste
      `<slug>-embed-Wired.html` (open it in Notepad, Select All, Copy). It is one line on purpose. Never the Visual tab, never
      a Raw HTML block.
   3. **Featured image:** the hero (from the Media Library).
   4. **Yoast SEO:** enter each `* Field  →  value` line from `<slug>-SEO.md`: SEO title, meta description, focus keyphrase,
      and on the **Social** tab the Facebook and Twitter title, description and image (image = the hero). Delete Yoast's
      snippet-variable pills before typing. Never leave a social image empty.
   5. **Update** (or Publish), then DealerInspire **Reload Cache** (admin bar).
5. **Check** the page with `?cb=<anything>` added to the URL: one headline, phone numbers are links, hours show on one line,
   images load, buttons are not underlined, FAQ opens, Google's Rich Results Test shows Article + FAQ, and the page title and
   social image are the new Yoast values. Some DealerInspire sites block automated checks; use a normal browser.
If the package says **DRAFT**, images are still placeholders: send the File URLs (or run `/dealer-articles:article-images "<dealer>" "<title>"`)
to get the final package.

## Need help?
Long research can take 30–60 minutes; you can leave it running. If a session ends, run the same `/dealer-articles:article-apollo` or
`/dealer-articles:article-dealerinspire` command again in the same folder to resume. Questions: contact Nasko.
