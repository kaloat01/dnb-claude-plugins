# dnb-plugins — Claude plugins for dealership content

## dealer-articles
Turns a dealer name + article title into a **publication-ready, compliance-reviewed long-form article** for an
**Apollo (Team Velocity)**, a **DealerInspire (WordPress)** or a **Dealer.com** dealer website. Every article on every
platform gets the same workflow and the same checks. Only the image upload, the platform rules and the package differ.

- **Rigor:** a premise test against the manufacturer, then a primary-source claim ledger (OEM, owner's manuals,
  government sources). Every fact traces to the ledger.
- **Depth:** Hrizn-level or better. Answer-first sections, sourced tables, a FAQ mirrored in the structured data,
  and a local section.
- **Independent reviews:** a compliance reviewer (P0/P1/P2 findings with exact fixes) and an SEO/GEO/AEO reviewer
  (golden-geo, article mode) check the draft before you see it. The build also checks the brand and legal wording
  rules (for example, Mercedes-Benz says "offer", never "coupon").
- **Design:** "Editorial v2", the same layout for every dealer. The dealer's brand color is used on links only;
  dealers with brand fonts (the Mercedes-Benz stores) use them. Dealer.com pages load no outside fonts.
- **Apollo package:** an HTML fragment, the site-wide CSS, Structured Data, the SEO fields and paste steps, plus a
  local preview.
- **DealerInspire package:** one paste file (CSS, article and structured data in a single line), the WordPress +
  Yoast fields and paste steps, plus a local preview.
- **Dealer.com package:** one paste block for the page's Custom HTML component (CSS, article and structured data), the
  page name and MetaData fields and paste steps, plus a local preview.
- **Handoff:** every run ends with a HANDOFF block (status, version, URL, every SEO/Yoast/social field, files to paste,
  paste steps, open flags). It is also saved as `HANDOFF.md` next to the paste files.

**First article? Follow [docs/QUICKSTART.md](docs/QUICKSTART.md).**

### Use it in the Claude Desktop app or claude.ai
This is the normal way to use it. It works on Windows and Mac, in the Desktop app and in the browser. Since 09/2026 Chat and
Cowork are one experience ("Cowork is now Claude"); on Pro/Max, tasks run in Anthropic's cloud (tested 10/11/2026: Node 22,
plugin agents load, downloads work).

| Where | Works? |
|---|---|
| **Desktop app / claude.ai** (new chat or task) | ✅ Full workflow, with separate research and reviewer agents. **Recommended** |
| Older Chat sessions without helper agents | ✅ Same steps and checks; the reviews run inside the conversation and the handoff says so |
| Claude Code (terminal, IDE extension, Desktop **Code** tab) | ✅ Full workflow (see "Claude Code" below) |
| Mobile apps | ❌ Not supported for building articles |

**One-time install on the Claude account** (already done on the team account; it syncs to every device signed in to it):
1. **Customize → Plugins → Add → Add marketplace** → `kaloat01/dnb-claude-plugins`. If the repository is private, the
   dialog asks you to connect GitHub and give the Claude GitHub App access to it (needs a GitHub account with access).
2. Install **dealer-articles**, then turn on **Sync automatically** for the marketplace (or use **Check for updates**).
3. **Settings → Capabilities:** turn on **Code execution and file creation** and set the **domain allowlist** to **All
   domains**. Research works either way (it uses Claude's own web tool, server-side); All domains lets the plugin check
   image sizes on Apollo, DealerInspire and Dealer.com. If image hosts still can't be reached, sizes are marked "unverified" (check
   the live page after publishing).
4. Optional check: in a new task, type `/dealer-articles:article-setup`.

**Start an article:**
- In a new chat/task, type `/dealer-articles:article "<dealer name>" "<article title>"` (or type `/` and pick it), or just
  write *"Write an article for Brickell Mazda about the CX-50 vs CX-5 for downtown Miami garages"*.

**Images:** the first message is a short list of the photos to source (current, easy to find: e.g. "any 2025–2027
Mercedes-Benz on the road") and the ones already in the library. Upload them while Claude researches and drafts:
- **Apollo:** upload to the dealer's **Apollo Image Manager** and send the Image IDs (or the image URLs).
- **DealerInspire:** upload to the store's **WordPress Media Library** and send each **File URL** from the attachment
  details (the original file, not a resized copy). DealerInspire takes at most 1,900px wide and 1MB: resize bigger
  photos first.
- **Dealer.com:** upload to the store's Dealer.com **Media Library** and send each image URL
  (`https://pictures.dealer.com/…`), only from that store's own library.

**What you get:** the paste files, `<slug>-HANDOFF.md` and a `<slug>-resume-kit.zip` appear as downloads. The **last message**
always contains the full handoff, including every SEO/Yoast field: copy from there or from `HANDOFF.md`.

**Finish later** (for example after uploading the images): working files are not kept after a task ends, so keep the
downloads. Start a new task, attach the `<slug>-resume-kit.zip`,
and send the Image IDs, File URLs or image URLs (or say "continue this article"). Claude picks up where the article stopped.

### What happens (the same on every platform)
1. It asks for **5 images** first (hero, 2 full-width figures and 1 pair; some may already be in the library), each a
   current, general shot that is easy to find (brand press-photo site or the store's own photos), with a minimum size.
2. While you source the images, it researches the topic, tests the title's premise (it asks you if the title needs
   correcting), drafts the article, builds it and runs the reviews.
3. It hands you a **draft package** with a preview that uses placeholders. When the images are uploaded, send the IDs,
   File URLs or image URLs (or run `/dealer-articles:article-images "<dealer>" "<title>"`) to get the **final package**.

**Apollo package:**

| File | What it is |
|---|---|
| `<slug>-preview.html` | Open it in your browser |
| `package/<slug>-HTML.html` | Paste into the custom page's HTML |
| `package/<prefix>-articles-sitewide-CSS.html` | Paste **once per dealer** into Apollo's site-wide style/script slot (all pages) |
| `package/<slug>-Structured-Data.txt` | Paste into Custom Structured Data, with **Replace** checked |
| `package/<slug>-SEO.md` | Enter into Apollo SEO Settings, one line per field. Leave the H1 field blank |
| `package/README.md` | Paste steps and post-publish checks |

Re-paste the site-wide CSS only if its version (`--da-css-version:v<hash>`, the last rule in the file) differs from the live one: search the live page source for `da-css-version`. Copy paste files from the file itself (Notepad), never from a chat window.

**DealerInspire package:**

| File | What it is |
|---|---|
| `<slug>-preview.html` | Open it in your browser. It shows the paste file the way WordPress renders it, inside a DealerInspire page shell |
| `package/<slug>-embed-Wired.html` | The **only** paste file. It is one line on purpose: CSS, the article, a small helper script and the structured data. Paste it into the page's **Text** tab |
| `package/<slug>-SEO.md` | WordPress + Yoast fields, one line per field: title, slug, parent page, featured image, SEO title, meta description, focus keyphrase, and the Facebook and Twitter title, description and image |
| `package/README.md` | Paste steps and post-publish checks |

There is no site-wide CSS file and no separate Structured Data file: both are inside the paste file. Paste in the
**Text** tab (Page Composer: a "Use WordPress Content" row), never in the Visual tab and never in a Raw HTML block.
Never leave a Yoast social image empty (use the hero). After publishing, use DealerInspire **Reload Cache** and check
the page with `?cb=<anything>` added to the URL. Copy the paste file from the file itself (Notepad), never from a chat
window.

**Dealer.com package:**

| File | What it is |
|---|---|
| `<slug>-preview.html` | Open it in your browser. It shows the paste block inside a Dealer.com page shell, with the page name as the headline |
| `package/<slug>-DDC-Custom-HTML.html` | The **only** paste file: CSS, the article and the structured data. Paste it into the page's **Custom HTML component** |
| `package/<slug>-SEO.md` | The Dealer.com fields, one line per field: page name (= the article headline), URL, MetaData Title and Description, and the focus keyphrase for reference |
| `package/README.md` | Paste steps and post-publish checks |

There is no site-wide CSS file and no separate Structured Data file: both are inside the paste file. Articles are
**content pages** with a Custom HTML component, never blog posts. Name the page **exactly** as the page name line:
Dealer.com prints the page name as the page's headline, so the paste file has none of its own. In the **MetaData
Editor**, type the Title and Description exactly as given and never leave them empty (an empty Title falls back to the
page name + the dealer name); there are no canonical, OG or Twitter fields. Copy the paste file from Notepad with Ctrl+A, never a line range and never from a chat window. After publishing,
check the page with `?cb=<anything>` added to the URL.

### Dealers (16)
- **Apollo (8):** Brickell Honda · Brickell Mazda · Honda Libertyville · Toyota of Downtown Chicago ·
  Bentley Jacksonville · Murgado Ford of Chicago · Murgado Lincoln of Chicago · Bentley Edison.
- **DealerInspire (5):** Mercedes-Benz of Laguna Niguel · Mercedes-Benz of Foothill Ranch ·
  Mercedes-Benz Vans of Laguna Niguel (Sprinter) · Mercedes-Benz of Midlothian · Mercedes-Benz of Richmond.
- **Dealer.com (3):** Brickell Chrysler Dodge Jeep Ram · Ocean Cadillac · Brickell Buick GMC.

Run `/dealer-articles:article-setup` to see the current list.

In Claude Code, to add or correct a dealer without waiting for an update, put a `dealers/<key>.json` file in your
working folder. Use the same format as `plugins/dealer-articles/resources/dealers/`; your local file overrides the
shipped one.

**Phones and hours:** these are taken from each dealer's **About Us or Contact page as seen from the US**.
Call-tracking scripts swap numbers by visitor location, so a check from outside the US can show the wrong numbers.
Local numbers are preferred; when a department has no local number, the number its About Us page shows (header/main
line) is used. On DealerInspire, the article shows the site's own phone numbers and hours through DealerInspire
shortcodes; the verified numbers are used in the structured data. Dealer.com has no phone token, so the article shows
the verified numbers as phone links and the hours as text.

### Claude Code
The same plugin works in Claude Code (terminal, VS Code / JetBrains extension, the Desktop app's **Code** tab with a
**Local** session).
- **Install:** a plugin installed on the claude.ai account arrives as a synced plugin (type `/reload-plugins` or start a
  new session). Or install it on this computer only:
  ```
  claude plugin marketplace add kaloat01/dnb-claude-plugins
  claude plugin install dealer-articles@dnb-plugins
  ```
  Command-line installs need **Node.js 18+** and Git, and auto-update is off until you turn it on:
  `/plugin` → **Marketplaces** → `dnb-plugins` → **Enable auto-update**.
- Run **`/dealer-articles:article-setup`** once. It checks Node and the screenshot browser (Edge or Chrome) and installs
  the official `frontend-design` skill.
- Start Claude Code in the folder where you want your articles saved, then type
  `/dealer-articles:article "<dealer>" "<title>"` (or `/dealer-articles:article-apollo …` /
  `/dealer-articles:article-dealerinspire …` / `/dealer-articles:article-dealercom …`). Output goes to `./articles/<dealer>/<slug>/`. Every plugin command starts
  with `/dealer-articles:`; typing `/article` and picking from the menu works too.

### Update
- **Desktop app / claude.ai:** Customize → Plugins → the `dnb-plugins` marketplace → **Check for updates**, or turn on
  **Sync automatically**. New tasks and chats use the new version; the first message shows the version line.
- **Claude Code:** synced plugins follow the account. Command-line installs: turn on auto-update, or run
  `/plugin marketplace update dnb-plugins` and restart.

### Troubleshooting

| Symptom | Fix |
|---|---|
| dealer-articles is not in the `/` menu (Desktop app / claude.ai) | Customize → Plugins: check dealer-articles is installed and turned on. Start a new Cowork task or chat (plugins load at the start). Type the full name `/dealer-articles:article`. Still missing: ask the plugin owner. |
| Can't add the marketplace | The repository is private: connect GitHub when the dialog asks and give the Claude GitHub App access to `kaloat01/dnb-claude-plugins` |
| "The article engine is not available here" or Claude cannot run commands | Settings → Capabilities → turn on **Code execution and file creation**, then start a new task. Or use a Cowork task |
| Changes from the team don't arrive | Customize → Plugins → `dnb-plugins` → **Check for updates** (or turn on **Sync automatically**), then start a new task. Claude Code: see Update |
| The last message has no SEO/Yoast fields | Ask "show me the handoff". It is also in `<slug>-HANDOFF.md` with the downloads |
| No screenshots | Normal in Chat and often in Cowork: the written design checklist runs instead, and you get "check in the preview" items. In Claude Code, install Microsoft Edge or Google Chrome |
| Images could not be checked ("unverified") | The app blocks the image hosts. Allow all domains under Settings → Capabilities, or check the images on the live page after publishing |
| Image check fails with 406 or 404 | Send the Image ID shown in the Apollo Image Manager, not a thumbnail link |
| DealerInspire image URL rejected | Send the Media Library **File URL** of the original upload (`https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`), not a resized `-1024x683` copy and not another store's URL |
| DealerInspire page shows two titles | Paste the file again in the **Text** tab, not the Visual tab (the Visual tab rewrites the markup) |
| DealerInspire phone number is not a link | A Raw HTML block was used. Paste into the **Text** tab (Page Composer: a "Use WordPress Content" row) instead |
| Dealer.com image URL rejected | Send the Media Library URL of this store's own upload (`https://pictures.dealer.com/…`), not another store's URL |
| Dealer.com says `Tag must be paired, missing: [ </div> ]` | The copy was cut off. Open the paste file in Notepad, Ctrl+A, Copy, and paste the whole file again (never a line range, never from chat) |
| Dealer.com page shows no headline or the wrong one | The page name is the headline: rename the Dealer.com page to the exact page name line from the handoff |
| Claude Code: `/article-apollo` "not found" | Type the full name, `/dealer-articles:article-apollo` (every plugin command starts with the plugin name). Then check `/plugin` → **Installed** shows dealer-articles enabled, and type `/reload-plugins` |
| Claude Code: "node is not recognized" | Install Node.js 18+, then fully restart Claude Code |
| Claude Code: `frontend-design` missing | `/plugin install frontend-design@claude-plugins-official`, then restart |

### For maintainers
- Plugin source: `plugins/dealer-articles/`. The internal contract is in `docs/CONTRACT.md`.
- Every push to `main` is an update for everyone who syncs. Add a line to `CHANGELOG.md` with each push and bump the
  engine version stamp (`build.js env` prints it; users see it in the first message).
- Before every push, run `node test/snapshot.js compare`, `node test/snapshot.js compare --platform dealerinspire` and
  `node test/snapshot.js compare --platform dealercom`.
  Both must print `identical` (baselines: `test/baseline-apollo.json`, `test/baseline-dealerinspire.json`). If an
  output change is intended, re-record with `node test/snapshot.js record [--platform dealerinspire]` and say so in
  `CHANGELOG.md`. Also run `claude plugin validate .` from the repository root.
- Never commit secrets, API keys, tracking IDs or personal emails.
