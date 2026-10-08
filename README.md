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

**First article? Follow [docs/QUICKSTART.md](docs/QUICKSTART.md).**

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
1. It checks the dealer's **`<key>.images.json` catalog first** and reuses suitable images already in that dealer's
   Apollo library. The first image list covers all **5 article slots**: hero, 2 full-width figures and 1 pair. Reused
   slots are marked **"already in your library (ID …)"**; only missing slots need sourcing and uploading. Storefront
   and logo are separate, supplied by the dealer data.
2. For missing slots, the list gives a plain description and minimum size. Upload only those photos to the dealer's
   **Apollo Image Manager** and send back their Image IDs or URLs. While you source them, it researches the topic,
   tests the title's premise (it asks you if the title needs correcting), drafts the article, builds it and runs the
   reviews. Vehicle photos must match the model year confirmed by research; reused photos are viewed before use.
3. If any slots are still missing, it hands you a **draft package** with placeholders only for those slots. Send the
   remaining IDs (or run `/article-images "<dealer>" "<title>"`) to get the **final package**. If all slots are filled
   with suitable Apollo images, it can deliver the final package without asking for new uploads.

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

### Dealers (Apollo, 8)
Brickell Honda · Brickell Mazda · Honda Libertyville · Toyota of Downtown Chicago · Bentley Jacksonville ·
Murgado Ford of Chicago · Murgado Lincoln of Chicago · Bentley Edison. Run `/article-setup` to see the current list.

To add or correct a dealer without waiting for an update, put a `dealers/<key>.json` file in your working folder. Use
the same format as `plugins/dealer-articles/resources/dealers/`; your local file overrides the shipped one.

**Phones and hours:** these are taken from each dealer's **About Us page as seen from the US**. Call-tracking scripts
swap numbers by visitor location, so a check from outside the US can show the wrong numbers. Local numbers are
preferred; when a department has no local number, the number its About Us page shows (header/main line) is used.

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
