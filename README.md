# dnb-plugins — Claude Code plugins for dealership content

## dealer-articles
Turns a dealer name + article title into a **publication-ready, compliance-reviewed long-form article** for an
**Apollo (Team Velocity)** dealer website:

- **Rigor:** a premise test against the manufacturer, then a primary-source claim ledger (OEM, owner's manuals,
  government sources). Every fact traces to the ledger.
- **Depth:** Hrizn-level or better. Answer-first sections, sourced tables, a FAQ mirrored in the structured data,
  and a local section.
- **Independent reviews:** a compliance reviewer (P0/P1/P2 findings with exact fixes) and an SEO/GEO/AEO reviewer
  (golden-geo, article mode) check the draft before you see it.
- **Design:** "Editorial v2", identical for every dealer. The dealer's brand color is used on links only.
- **Apollo package:** an HTML fragment, the site-wide CSS, Structured Data, the SEO fields and paste steps, plus a
  local preview.

### Install (one time, about 2 minutes)
1. Install **Node.js 18+**. On Windows: `winget install OpenJS.NodeJS.LTS`. On macOS: `brew install node`, or the
   LTS installer from nodejs.org.
2. In a terminal, run:
   ```
   claude plugin marketplace add kaloat01/dnb-claude-plugins
   claude plugin install dealer-articles@dnb-plugins
   ```
   You can also run these inside Claude Code: `/plugin marketplace add kaloat01/dnb-claude-plugins`, then
   `/plugin install dealer-articles@dnb-plugins`.

   In the **Desktop app**, once the marketplace has been added, use **+ → Plugins**.
3. Restart Claude Code, then run **`/article-setup`**. It checks Node and the screenshot browser, and installs the
   official `frontend-design` skill.
4. Turn on updates: `/plugin` → **Marketplaces** → `dnb-plugins` → **Enable auto-update**.

### Use
Start Claude Code in the folder where you want your articles saved. Then:
```
/article-apollo "Brickell Mazda" "Mazda CX-50 or CX-5: Which One Fits a Downtown Miami Garage?"
```
What happens:
1. It asks for **5 images** first: hero, 2 full-width figures and 1 pair. Each comes with a plain description and a
   minimum size. Upload them to the dealer's **Apollo Image Manager** and send back the Image IDs or URLs.
2. While you source the images, it researches the topic, tests the title's premise (it asks you if the title needs
   correcting), drafts the article, builds it and runs the reviews.
3. It hands you a **draft package** with a preview that uses placeholders. When the images are uploaded, send the IDs
   (or run `/article-images "<dealer>" "<title>"`) to get the **final package**.

Output goes to `./articles/<dealer>/<slug>/`:

| File | What it is |
|---|---|
| `<slug>-preview.html` | Open it in your browser |
| `package/<slug>-HTML.html` | Paste into the custom page's HTML |
| `package/<prefix>-articles-sitewide-CSS.html` | Paste **once per dealer** into Apollo's site-wide style/script slot (all pages) |
| `package/<slug>-Structured-Data.txt` | Paste into Custom Structured Data, with **Replace** checked |
| `package/<slug>-SEO.md` | Enter into Apollo SEO Settings, one line per field. Leave the H1 field blank |
| `package/README.md` | Paste steps and post-publish checks |

Re-paste the site-wide CSS only if its first comment (`dealer-articles css <hash>`) differs from the live one.

### Dealers (pilot)
Brickell Honda · Brickell Mazda · Honda Libertyville · Toyota of Downtown Chicago · Bentley Jacksonville.

To add or correct a dealer without waiting for an update, put a `dealers/<key>.json` file in your working folder. Use
the same format as `plugins/dealer-articles/resources/dealers/`; your local file overrides the shipped one.

**Phones and hours:** these are taken from each dealer's **About Us page as seen from the US**. Call-tracking scripts
swap numbers by visitor location, so a check from outside the US can show the wrong numbers. Toll-free numbers are
never used as department phones.

### Update
With auto-update on, updates arrive by themselves. To update manually, run
`/plugin marketplace update dnb-plugins`, then restart Claude Code.

### Troubleshooting

| Symptom | Fix |
|---|---|
| "node is not recognized" | Install Node (step 1), then fully restart Claude Code |
| No screenshots | Install Microsoft Edge or Google Chrome |
| Image check fails with 406 or 404 | Send the Image ID shown in the Apollo Image Manager, not a thumbnail link |
| `frontend-design` missing | `/plugin install frontend-design@claude-plugins-official`, then restart |

### For maintainers
- Plugin source: `plugins/dealer-articles/`. The internal contract is in `docs/CONTRACT.md`.
- Every push to `main` is an update; the pilot has no version pinning. Add a line to `CHANGELOG.md` with each push.
- Never commit secrets, API keys, tracking IDs or personal emails.
