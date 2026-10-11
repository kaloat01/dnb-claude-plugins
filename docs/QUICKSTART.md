# Quick start: your first dealer article (about 10 minutes of your time)

> **Note for colleagues**
> - Stop using the old "clone the repo" prompt. It is gone: it could run without the article engine, so no Yoast/SEO sheet came out.
> - The plugin is now installed on our team's Claude account. There is nothing to install on your computer.
> - Use a **Cowork** task (Desktop app or claude.ai). Chat works too, but its reviews happen in the same conversation.
> - The **last message** of every run is the handoff: it always contains the Yoast/SEO fields and the paste steps.
> - Don't see **dealer-articles** under Customize → Plugins or in the `/` menu? Ask Nasko.

## 1. One-time setup (Desktop app or claude.ai)
1. **Settings → Capabilities:** turn on **Code execution and file creation**. If it offers network access, choose
   **All domains**.
2. **Customize → Plugins:** check that **dealer-articles** is listed and turned on. (First install on an account:
   **Add → Add marketplace** → `kaloat01/dnb-claude-plugins`, connect GitHub when asked, install **dealer-articles**,
   turn on **Sync automatically**.)
3. Optional check: open a **Cowork** task and type `/dealer-articles:article-setup`. It explains anything marked ❌.

## 2. Start the article
Open a **Cowork** task (recommended) and type:
```
/dealer-articles:article "<dealer name>" "<article title>"
```
Example: `/dealer-articles:article "Toyota of Downtown Chicago" "Toyota Hybrid Battery Care in Chicago: Warranty and Winter Tips"`.
Plain words work too: *"Write an article for Toyota of Downtown Chicago about hybrid battery care in winter."*
It picks the platform (Apollo or DealerInspire) from the dealer.

The first line shows the plugin version (e.g. `dealer-articles v0.11.0`). In **Chat** (type `/` and pick
**dealer-articles:article**, or just ask), Claude asks once whether to continue there or switch to Cowork: the steps and
checks are the same, but Chat runs the two reviews inside the conversation instead of as separate reviewers.

Dealers:
- **Apollo:** Brickell Honda, Brickell Mazda, Honda Libertyville, Toyota of Downtown Chicago, Bentley Jacksonville,
  Murgado Ford of Chicago, Murgado Lincoln of Chicago, Bentley Edison.
- **DealerInspire:** Mercedes-Benz of Laguna Niguel, Mercedes-Benz of Foothill Ranch, Mercedes-Benz Vans of Laguna Niguel
  (Sprinter), Mercedes-Benz of Midlothian, Mercedes-Benz of Richmond. "Mercedes Laguna" matches two stores (cars and Vans);
  Claude asks which one.

## 3. Source the images (the first thing Claude gives you)
The first message is an **image list** (up to 5 photos; some may already be in the dealer's library). While Claude
researches and drafts, upload the photos and reply with where they live:
- **Apollo:** upload to the dealer's **Apollo Image Manager** and reply with the Image IDs (e.g. `IMG_HERO = 123456`).
- **DealerInspire:** upload to the store's **WordPress Media Library** (Media → Add New), open the attachment details and
  reply with each **File URL** (`https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`): the original,
  not a resized `-1024x683` copy, and only from that store's own library.

Real photos you have rights to (dealer library, OEM media/press site), matching the model year, no text or logos.
If Claude says the images could not be checked from the app ("unverified"), it may ask you to attach the photos so it can
see them; check the images on the live page after publishing.

## 4. Answer its questions (only when needed)
It stops to ask only when the answer changes the article, e.g. the title's claim isn't published by the manufacturer, or the
dealer already has a page on the topic. Pick the recommended option unless you know better.

## 5. Get the files
The run ends with the **handoff** (the last message, also saved as `HANDOFF.md`): status (FINAL, DRAFT or NOT READY),
version, page URL, every SEO/Yoast/social field, the files to paste and the paste steps. The paste files, `HANDOFF.md`
and `<slug>-resume-kit.zip` appear as **downloads**.
- **DRAFT** = images are still placeholders. Send the Image IDs or File URLs in the same task to get the final package.
- **Finishing later** (new day, new task): open a new Cowork task, attach `<slug>-resume-kit.zip`, and send the Image IDs
  or File URLs (or say "continue this article").
- **NOT READY** = a check failed. Claude fixes it before handing off; if it can't, the handoff says why.

## 6. Publish: Apollo dealers
1. `<prefix>-articles-sitewide-CSS.html`: paste ONCE per dealer into Apollo's site-wide style slot (all pages).
   Copy it from the file in Notepad (never from a chat). Re-paste only if `da-css-version` in the live page source differs from the file.
2. New **custom page** at `/<slug>` (never a blog post) → paste `<slug>-HTML.html` into the page HTML.
3. **Custom Structured Data** → paste `<slug>-Structured-Data.txt` and **check "Replace Structured Data"**.
4. **SEO Settings** → enter each `* Field  →  value` line from the handoff (or `<slug>-SEO.md`); leave the H1 field blank.
5. Publish, then check: one headline, images load, phone numbers show (Apollo fills `#SalesNumber` / `#ServiceNumber`),
   FAQ opens, and run Google's Rich Results Test on the URL.

## 7. Publish: DealerInspire (Mercedes-Benz stores)
1. WordPress admin → **Pages** → Add New (or open the page you are refreshing; Claude may recommend refreshing an
   existing page in place, at the same URL). Title: the "Page title" line. Set the parent page it lists (California
   stores) so the URL matches.
2. **Page Composer:** a full-width row with a **"Use WordPress Content"** element. In the page's **Text** tab, paste
   `<slug>-embed-Wired.html` (open it in Notepad, Select All, Copy). It is one line on purpose. Never the Visual tab, never
   a Raw HTML block.
3. **Featured image:** the hero (from the Media Library).
4. **Yoast SEO:** enter each `* Field  →  value` line from the handoff (or `<slug>-SEO.md`): SEO title, meta description,
   focus keyphrase, and on the **Social** tab the Facebook and Twitter title, description and image (image = the hero).
   Delete Yoast's snippet-variable pills before typing. Never leave a social image empty.
5. **Update** (or Publish), then DealerInspire **Reload Cache** (admin bar).
6. **Check** the page with `?cb=<anything>` added to the URL: one headline, phone numbers are links, hours show on one line,
   images load, buttons are not underlined, FAQ opens, Google's Rich Results Test shows Article + FAQ, and the page title and
   social image are the new Yoast values. Some DealerInspire sites block automated checks; use a normal browser.

## Claude Code users
Same commands in Claude Code (terminal, IDE, Desktop **Code** tab). Run `/dealer-articles:article-setup` once (Node.js 18+,
screenshot browser, frontend-design). Start it in the folder where you want your articles saved: output goes to
`./articles/<dealer>/<slug>/`, and re-running the same command in that folder resumes. Details: README → Claude Code.

## Need help?
Long research can take 30–60 minutes; you can leave it running. Questions: contact Nasko.
