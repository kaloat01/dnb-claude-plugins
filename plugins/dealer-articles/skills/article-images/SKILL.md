---
name: article-images
description: Wire the user's uploaded Apollo images (Image IDs or GetLibraryImage URLs) into an existing dealer article job, verify and view each photo, place it by resolution, and produce the FINAL Apollo package. Use after /article-apollo when the user sends image IDs/URLs, or types /article-images "<dealer>" "<title or slug>".
argument-hint: "\"<dealer name>\" \"<article title or slug>\" [image IDs/URLs…]"
allowed-tools:
  - Bash(node:*)
  - Read
  - Write
  - Edit
  - Glob
---

# /article-images — wire images, build the final package

**DA** = `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"` · rules: `${CLAUDE_PLUGIN_ROOT}/resources/rules/image-brief.md`

1. **Find the job.** From `$ARGUMENTS`, locate `./articles/<dealer-key>/<slug>/` (Glob `./articles/*/*/job.json` and match the
   dealer + title/slug). Run `DA status "<job>"`. If none matches, list the jobs found and ask.
2. **Map images to slots.** Slots: IMG_HERO, IMG_FIG1, IMG_FIG2, IMG_PAIR1, IMG_PAIR2 (see each slot's `desc` in `module.js`).
   Accept Image IDs, full Apollo URLs (`…GetLibraryImage?fileNameOrId=<ID>…`) or a list in slot order. If the mapping is
   unclear, show the slot list and ask once. Write each value into `module.js` → `images.<KEY>.apollo`. Reject thumbnails or
   non-Apollo URLs (images must live in the dealer's Apollo library).
3. **Verify.** Run `DA images "<job>"`: every image must return 200 + `image/*`; it saves copies to `<job>/images/` and prints
   real width × height. A failure → tell the user which slot and why (wrong ID, not public, 406) and stop for that slot.
4. **View every photo** (Read each file in `<job>/images/`). Check: subject matches the slot request, **model year/generation
   matches the article**, no baked-in text/watermarks, own brand only in comparisons. Filenames lie: describe what you SEE.
   Rewrite each `alt` (what the photo shows, ≤125 chars) and set the real `w`/`h`.
5. **Place by resolution:** hero ≥1900w full-bleed, otherwise `heroContained: true`; full-width figure ≥1100w, else narrow
   (`prose: true`) or move it into the pair; pair images ≥800w; never upscale; no repeats. Swap slots if that fits better.
6. **Build final:** `DA build "<job>" --final` → all gates ✅ (fix `module.js` if not). `DA shot "<job>"` → Read the PNGs →
   check crops (subject visible at the hero ratio), no broken images, mobile layout.
7. **Deliver** (same format as /article-apollo Phase 7): package folder path, the 4 files, SEO lines verbatim, paste steps,
   site-wide CSS note (paste once per dealer; re-paste only if `--da-css-version` in the live page source differs from the file), open
   flags. Update `job.json` phase → `done`.
After publishing, suggest a quick live check: open the page, confirm 1 visible H1, images, buttons not underlined, FAQ
toggles, and run Google's Rich Results Test on the URL.
