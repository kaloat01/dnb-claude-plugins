# Image brief (what to ask the user for, and how they get it into Apollo)

**Rule: general images, specific copy.** The photos are editorial visuals; the text carries the specifics. Do not plan
slots for shots nobody can source (a spark plug macro, a specific warning light). Reuse the dealer's existing Apollo
library images first. Real photography only: no AI-generated vehicles, people or dashboards.

## 1. The 5 slots (plus storefront + logo from the dealer file)

| Slot | Use | Minimum | Shape |
|---|---|---|---|
| IMG_HERO | top of the article | ≥1,900px wide (full-bleed) | landscape 12:5 or 16:9; subject centered so a 12:5 crop keeps it |
| IMG_FIG1 | full-width figure, first third | ≥1,100px wide | landscape |
| IMG_FIG2 | full-width figure, second half | ≥1,100px wide | landscape |
| IMG_PAIR1 | left of a 2-up pair | ≥800px wide | landscape or square |
| IMG_PAIR2 | right of a 2-up pair | ≥800px wide | same shape as PAIR1 |

Smaller images are not upscaled: a ~900px image becomes a narrow figure, ≤1,000px or square goes in the pair, a hero
under ~1,900px is shown contained (16:9). No image is used twice.

## 2. How to write each request

One line per slot: **model + model year + angle + setting + "no text, logos or watermarks"**.
- "2026 Honda CR-V, front three-quarter, exterior, daylight city street, no text or watermarks"
- "Service advisor and customer at a service lane counter, no visible brand signage, no text"
- "Close-up of a tire tread on a clean shop floor, generic, no brand names visible"

**Model-year rule:** a vehicle photo must show the model year (and generation) the article discusses. If the article is
about the 2027 model, a 2023 photo is wrong even if the model name matches. When no current-year photo exists, use a
general (non-vehicle or rear-detail) shot instead.

**Comparison rule:** photos show only the dealer's own brand. The rival vehicle appears in text and tables only.

## 3. Rights (where images may come from)

1. The dealer's own Apollo image library (already licensed for the site). Check this first.
2. The OEM's media/press site (newsroom photo libraries) for current-model vehicle shots, used under the OEM's media terms.
3. Photos the dealer owns or has licensed (their photographer, their stock license).
Never random web images, competitor sites, social media, or stock previews with watermarks.

## 4. When the user sends images

- **Filenames lie.** View every photo before using it (a file named for one model has shown a different model).
- Write alt text from what the photo actually shows (model, angle, setting), not from the filename or the article topic.
  Captions must not describe what the photo does not show.
- Reject photos with baked-in offer text or prices, outdated model generations, or visible rival logos.
- Run `build.js images <job>`: it verifies each URL (200 + `image/*`), reads the real size and suggests placement.

## 5. User steps: upload to Apollo and copy the Image ID

1. Log in to Apollo and open the dealer site's **Image Library** (Content Management › Manage Images; the page address
   contains `contentmanagement/manageimages` and the page is titled IMAGE LIBRARY).
2. In the left folder tree, select the dealer's folder (or the sub-folder they use for web images).
3. Upload each image with a descriptive filename (e.g. `2026-cr-v-front-three-quarter.jpg`). Upload one at a time if you
   can: the grid shows the **Image ID** on each card, but **not the filename**, so note each ID right after its upload.
4. Copy the ID from the card ("Image ID: 123456"). Alternatively right-click the thumbnail → **Copy image address**; the
   address contains `fileNameOrId=123456`.
5. Send the IDs back in chat, slot by slot: `IMG_HERO = 123456`. A full URL works too:
   `https://service.secureoffersites.com/images/GetLibraryImage?fileNameOrId=123456`.
The agent never logs in to Apollo and never uploads, edits or deletes library images.

## 6. Template the agent prints to the user (fill in every <…>)

```
IMAGES FOR: <article title>  (dealer: <dealer name>)
Please source these 5 photos (real photos only; no text, logos or watermarks; you must have the right to use them).
Vehicle photos must show the <model year> <model>.

IMG_HERO  — <model year model, angle, setting>. At least 1,900px wide, landscape (12:5 or 16:9), subject centered.
IMG_FIG1  — <request>. At least 1,100px wide, landscape.
IMG_FIG2  — <request>. At least 1,100px wide, landscape.
IMG_PAIR1 — <request>. At least 800px wide; same shape as PAIR2.
IMG_PAIR2 — <request>. At least 800px wide; same shape as PAIR1.
(Storefront and logo: already on file for <dealer>.)

Where to get them: <dealer>'s Apollo image library first, then the <brand> media/press site, then your own licensed photos.
Then: Apollo → Content Management → Manage Images → <dealer folder> → upload → copy each Image ID → reply:
IMG_HERO = <id> · IMG_FIG1 = <id> · IMG_FIG2 = <id> · IMG_PAIR1 = <id> · IMG_PAIR2 = <id>
I keep working on research and drafting while you source them.
```
