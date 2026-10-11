---
name: article-images
description: Wire the user's uploaded images (Apollo Image IDs or GetLibraryImage URLs, or DealerInspire WordPress Media Library File URLs) into an existing dealer article job, or one restored from a *-resume-kit.zip, verify and view each photo, place it by resolution, and produce the FINAL package. Works in the Claude Desktop app or claude.ai (Cowork or Chat) and in Claude Code. Use when the user sends image IDs/URLs for an article, attaches an article resume kit, or types /dealer-articles:article-images "<dealer>" "<title or slug>".
argument-hint: "\"<dealer name>\" \"<article title or slug>\" [image IDs/URLs…]"
allowed-tools:
  - Bash(node:*)
  - Read
  - Write
  - Edit
  - Glob
---

# /dealer-articles:article-images — wire images, build the final package

**DA** = `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"` · rules: `${CLAUDE_PLUGIN_ROOT}/resources/rules/image-brief.md`
(If `${CLAUDE_PLUGIN_ROOT}` was not replaced by a real path, see the top of `skills/article/SKILL.md`.)
If this run did not start with `DA env --net`, run it first and show its version line in one line.

1. **Find the job.**
   - **Resume kit:** if the user attached a `*-resume-kit.zip` (Chat and Cowork attachments are usually under
     `/mnt/user-data/uploads/`) and the job is not in the jobs folder yet, run `DA resume "<zip path>"`. It unpacks the job
     into `<jobs folder>/<dealer>/<slug>/` (the jobs folder is printed by `DA env`).
   - Otherwise, from `$ARGUMENTS`, locate `<jobs folder>/<dealer-key>/<slug>/` (Glob `<jobs folder>/*/*/job.json` and match the
     dealer + title/slug). If none matches, list the jobs found and ask (in a new Cowork task or chat, ask for the resume kit).
   - Run `DA status "<job>"`.
2. **Map images to slots.** Slots: IMG_HERO, IMG_FIG1, IMG_FIG2, IMG_PAIR1, IMG_PAIR2 (see each slot's `desc` in `module.js`).
   Accept Image IDs, full Apollo URLs (`…GetLibraryImage?fileNameOrId=<ID>…`) or a list in slot order. If the mapping is
   unclear, show the slot list and ask once. Write each value into `module.js` → `images.<KEY>.apollo`. Reject thumbnails or
   non-Apollo URLs (images must live in the dealer's Apollo library).
   **DealerInspire dealers** (dealer file `platform: "dealerinspire"`): accept the WordPress Media Library **File URL**
   (`https://di-uploads-podN.dealerinspire.com/<site>/uploads/YYYY/MM/<file>`, the original, not a `-1024x683` copy) and
   write it into `images.<KEY>.di`. It must be this store's uploads base (dealer file `di.uploads`). The final package is
   `<slug>-embed-Wired.html` + `<slug>-SEO.md`; deliver as in `/dealer-articles:article-dealerinspire` step 9.
3. **Verify.** Run `DA images "<job>"`: every image must return 200 + `image/*`; it saves copies to `<job>/images/` and prints
   real width × height. A failure → tell the user which slot and why (wrong ID, not public, 406) and stop for that slot.
   **Image hosts blocked here** (`DA env --net` lists them as blocked or refused, or every image fails the same way, e.g.
   all `HTTP 403`: since 10/2026 Apollo's image server refuses script requests even from a normal PC): the IDs
   or URLs cannot be checked from this app, so use the **unverified path**:
   - Keep the values the user sent (still Apollo IDs or this store's Media Library URLs only).
   - Ask the user to attach the same photos to the conversation so you can view them (step 4), and for each photo's width ×
     height (Apollo Image Manager or the WordPress attachment details show it). Use those numbers for `w`/`h`.
   - Sizes not given: keep the slot minimums from `image-brief.md` as `w`/`h`, choose the safe placement (hero
     `heroContained: true`), and write "image sizes unverified (image hosts blocked)" in `job.json` notes.
   - Tell the user in your summary that the images were not fetched here and to eyeball the live page after publishing.
4. **View every photo** (Read each file in `<job>/images/`, or the photos the user attached). Check: subject matches the slot request, **model year/generation
   matches the article**, no baked-in text/watermarks, own brand only in comparisons. Filenames lie: describe what you SEE.
   Rewrite each `alt` (what the photo shows, ≤125 chars) and set the real `w`/`h`. A photo you could not view at all: alt
   text from the slot request, flagged "alt text not checked against the photo" in your summary.
5. **Place by resolution:** hero ≥1900w full-bleed, otherwise `heroContained: true`; full-width figure ≥1100w, else narrow
   (`prose: true`) or move it into the pair; pair images ≥800w; never upscale; no repeats. Swap slots if that fits better.
6. **Build final:** `DA build "<job>" --final` → all gates ✅ (fix `module.js` if not; never hand off NOT READY without telling
   the user why). If `DA env` found a browser: `DA shot "<job>"` → Read the PNGs → check crops (subject visible at the hero
   ratio), no broken images, mobile layout. No browser: apply the `design-and-apollo.md` §4 checklist ("no browser") and list
   the visual checks for the user.
7. **Deliver** (same as /dealer-articles:article-apollo Phase 7): update `job.json` phase → `done`; then, outside Claude Code,
   `DA deliver "<job>" --to "<download folder>"` when `DA env` listed one. Reply with at most 5 short lines first: what changed,
   unverified items, the site-wide CSS note for Apollo (paste once per dealer, re-paste only if `--da-css-version` in the
   live page source differs from the file), and the live check after publishing (1 visible H1, images, buttons not
   underlined, FAQ toggles, Google's Rich Results Test on the URL). Then **the HANDOFF block from the final build,
   verbatim, as the last thing in your reply**, plus one line on where the files are.
