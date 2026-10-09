# dnb-plugins — Claude Code plugins for dealership content

## dealer-articles
Turns a dealer name + article title into a **publication-ready, compliance-reviewed long-form article** for an
**Apollo (Team Velocity)** or a **DealerInspire (WordPress)** dealer website. Every article on every platform gets the
same workflow and the same checks. Only the image upload, the platform rules and the package differ.

- **Rigor:** a premise test against the manufacturer, then a primary-source claim ledger (OEM, owner's manuals,
  government sources). Every fact traces to the ledger.
- **Depth:** Hrizn-level or better. Answer-first sections, sourced tables, a FAQ mirrored in the structured data,
  and a local section.
- **Independent reviews:** a compliance reviewer (P0/P1/P2 findings with exact fixes) and an SEO/GEO/AEO reviewer
  (golden-geo, article mode) check the draft before you see it. The build also checks the brand and legal wording
  rules (for example, Mercedes-Benz says "offer", never "coupon").
- **Design:** "Editorial v2", the same layout for every dealer. The dealer's brand color is used on links only;
  dealers with brand fonts (the Mercedes-Benz stores) use them.
- **Apollo package:** an HTML fragment, the site-wide CSS, Structured Data, the SEO fields and paste steps, plus a
  local preview.
- **DealerInspire package:** one paste file (CSS, article and structured data in a single line), the WordPress +
  Yoast fields and paste steps, plus a local preview.

**First article? Follow [docs/QUICKSTART.md](docs/QUICKSTART.md).**

### Where it works
This is a **Claude Code plugin**. It runs wherever Claude Code runs on your computer:

| Where | Works? |
|---|---|
| Claude Code in a terminal (Windows, macOS) | ✅ |
| **Claude Desktop app → Code tab**, with a **Local** session (the environment dropdown under the prompt) | ✅ |
| VS Code / JetBrains Claude Code extension | ✅ |
| Claude Desktop **Chat** or **Cowork** tab, claude.ai chat | ❌ Plugins don't load there. Use the Code tab, or the fallback prompt below |
| Claude Code cloud sessions (claude.ai/code, the Desktop "cloud" environment) | ❌ Plugins from marketplaces don't load there. Use a Local session |

The Desktop app's Code tab reads the same settings as the terminal. A plugin installed in one is available in the other.

### Install (one time, about 3 minutes)
1. Install **Node.js 18+**. On Windows: `winget install OpenJS.NodeJS.LTS`. On macOS: `brew install node`, or the LTS installer from nodejs.org.
   - Also install **Git**. On Windows that is Git for Windows; macOS asks to install it the first time it is needed.
   - Fully quit and reopen Claude afterwards.
2. Add the marketplace and install the plugin. Pick one way:
   - **Desktop app:**
     1. Open the **Code** tab and start a **Local** session.
     2. Type `/plugin marketplace add kaloat01/dnb-claude-plugins` and press Enter.
     3. Click **+** (next to the prompt) → **Plugins** → **Add plugin** → find **dealer-articles** → **Install**. Choose the "for you" (user) scope so it works in every folder.
   - **Terminal:**
     ```
     claude plugin marketplace add kaloat01/dnb-claude-plugins
     claude plugin install dealer-articles@dnb-plugins
     ```
3. **Turn on updates (important).** Auto-update is off for our marketplace until you turn it on: `/plugin` → **Marketplaces** → `dnb-plugins` → **Enable auto-update**.
4. Start a new session (or type `/reload-plugins`), then run **`/dealer-articles:article-setup`**. It checks Node and the screenshot browser, and installs the official `frontend-design` skill.

**Check it worked:** type `/article` in the prompt. The menu shows `/dealer-articles:article`, `/dealer-articles:article-apollo` and `/dealer-articles:article-dealerinspire`.

### Use
Start Claude Code in the folder where you want your articles saved. **Plugin commands always start with the plugin name** (`/dealer-articles:…`). Typing `/article` and picking from the menu works too.

Any dealer (it picks the right platform for you):
```
/dealer-articles:article "Brickell Mazda" "Mazda CX-50 or CX-5: Which One Fits a Downtown Miami Garage?"
```
Or name the platform yourself. Apollo dealers:
```
/dealer-articles:article-apollo "Brickell Mazda" "Mazda CX-50 or CX-5: Which One Fits a Downtown Miami Garage?"
```
DealerInspire dealers (the Mercedes-Benz stores):
```
/dealer-articles:article-dealerinspire "Mercedes-Benz of Midlothian" "<title>"
```
Plain words also work in a Code session where the plugin is installed: *"Write a dealer article for Brickell Mazda: <title>"*. Claude picks the article skill by itself.

**Fallback (no plugin, any Claude Code session):** paste this prompt and fill in the last two lines:
```
Clone https://github.com/kaloat01/dnb-claude-plugins (or git pull if you already have it). Treat <clone>/plugins/dealer-articles as ${CLAUDE_PLUGIN_ROOT} everywhere.
Read and follow <clone>/plugins/dealer-articles/skills/article/SKILL.md exactly (it routes to the Apollo or DealerInspire workflow).
For each named agent (dealer-articles:article-researcher, article-compliance-reviewer, golden-geo-reviewer), spawn a general-purpose subagent whose instructions are the matching file in <clone>/plugins/dealer-articles/agents/. Apply <clone>/plugins/dealer-articles/skills/golden-geo/SKILL.md for golden-geo.
Dealer: <dealer name>
Title: <article title>
```
The fallback runs the same steps, but you must remember to update the clone. The installed plugin updates itself, so prefer it.
What happens (the same on both platforms):
1. It asks for **5 images** first: hero, 2 full-width figures and 1 pair. Each comes with a plain description and a
   minimum size. Upload them and send back where they live:
   - **Apollo:** upload to the dealer's **Apollo Image Manager** and send the Image IDs or URLs.
   - **DealerInspire:** upload to the store's **WordPress Media Library** and send each **File URL** from the
     attachment details (the original file, not a resized copy).
2. While you source the images, it researches the topic, tests the title's premise (it asks you if the title needs
   correcting), drafts the article, builds it and runs the reviews.
3. It hands you a **draft package** with a preview that uses placeholders. When the images are uploaded, send the IDs
   or File URLs (or run `/dealer-articles:article-images "<dealer>" "<title>"`) to get the **final package**.

Output goes to `./articles/<dealer>/<slug>/`.

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

### Dealers (13)
- **Apollo (8):** Brickell Honda · Brickell Mazda · Honda Libertyville · Toyota of Downtown Chicago ·
  Bentley Jacksonville · Murgado Ford of Chicago · Murgado Lincoln of Chicago · Bentley Edison.
- **DealerInspire (5):** Mercedes-Benz of Laguna Niguel · Mercedes-Benz of Foothill Ranch ·
  Mercedes-Benz Vans of Laguna Niguel (Sprinter) · Mercedes-Benz of Midlothian · Mercedes-Benz of Richmond.

Run `/dealer-articles:article-setup` to see the current list.

To add or correct a dealer without waiting for an update, put a `dealers/<key>.json` file in your working folder. Use
the same format as `plugins/dealer-articles/resources/dealers/`; your local file overrides the shipped one.

**Phones and hours:** these are taken from each dealer's **About Us or Contact page as seen from the US**.
Call-tracking scripts swap numbers by visitor location, so a check from outside the US can show the wrong numbers.
Local numbers are preferred; when a department has no local number, the number its About Us page shows (header/main
line) is used. On DealerInspire, the article shows the site's own phone numbers and hours through DealerInspire
shortcodes; the verified numbers are used in the structured data.

### Update
With auto-update on, updates arrive by themselves. To update manually, run
`/plugin marketplace update dnb-plugins`, then restart Claude Code.

### Troubleshooting

| Symptom | Fix |
|---|---|
| `/article-apollo` "not found" or missing from the menu | Type the full name, `/dealer-articles:article-apollo` (every plugin command starts with the plugin name), or type `/article` and pick it from the menu. Still missing? Check that you are in the Desktop **Code** tab with a **Local** session (not Chat, Cowork or a cloud session). Then check `/plugin` → **Installed** shows dealer-articles **enabled**. Then type `/reload-plugins` or start a new session. |
| The plugin browser doesn't list dealer-articles | Add the marketplace first: `/plugin marketplace add kaloat01/dnb-claude-plugins` |
| Changes from the team don't arrive | Turn on auto-update (`/plugin` → Marketplaces → dnb-plugins → Enable auto-update), or run `/plugin marketplace update dnb-plugins` and start a new session |
| "node is not recognized" | Install Node (step 1), then fully restart Claude Code |
| No screenshots | Install Microsoft Edge or Google Chrome |
| Image check fails with 406 or 404 | Send the Image ID shown in the Apollo Image Manager, not a thumbnail link |
| DealerInspire image URL rejected | Send the Media Library **File URL** of the original upload (`https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`), not a resized `-1024x683` copy and not another store's URL |
| DealerInspire page shows two titles | Paste the file again in the **Text** tab, not the Visual tab (the Visual tab rewrites the markup) |
| DealerInspire phone number is not a link | A Raw HTML block was used. Paste into the **Text** tab (Page Composer: a "Use WordPress Content" row) instead |
| `frontend-design` missing | `/plugin install frontend-design@claude-plugins-official`, then restart |

### For maintainers
- Plugin source: `plugins/dealer-articles/`. The internal contract is in `docs/CONTRACT.md`.
- Every push to `main` is an update; the pilot has no version pinning. Add a line to `CHANGELOG.md` with each push.
- Before every push, run `node test/snapshot.js compare` and `node test/snapshot.js compare --platform dealerinspire`.
  Both must print `identical` (baselines: `test/baseline-apollo.json`, `test/baseline-dealerinspire.json`). If an
  output change is intended, re-record with `node test/snapshot.js record [--platform dealerinspire]` and say so in
  `CHANGELOG.md`.
- Never commit secrets, API keys, tracking IDs or personal emails.
