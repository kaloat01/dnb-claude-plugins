# Image brief (what to ask the user for, and how they get it onto the dealer site)

**Rule: current, general, easy to find.** The photos are editorial visuals; the text carries the specifics. Every request
must be a photo a colleague can find in a few minutes on the brand's press-photo site or in the store's own photos.
Reuse the dealer's library first (`<key>.images.json`). Real photography only: no AI-generated vehicles, people or dashboards.

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
**DealerInspire upload limit: 1,900px wide and 1MB per file.** Sourced photos may be bigger; the user resizes them to
1,900px wide (JPEG under 1MB) before uploading. A 1,900px hero is full-bleed.

## 2. How to write each request (3 rules)

1. **Current.** Vehicle photos show a model year from last year to next year, of a model the brand still sells new.
   Write the years as "<last year>–<next year>" from today's date (October 2026: "2025–2027").
   - Article about one model → that model: "any 2025–2027 Mercedes-Benz GLC, outside". If research (later) shows a new
     generation started inside the window, re-send that line for the new generation ("any 2026–2027 <model>, new
     generation"); a previous generation of the article's model is never OK.
   - Topic that covers the lineup (technology, service, financing, ownership) → the brand alone: "any 2025–2027
     Mercedes-Benz, outside".
2. **General.** One subject per photo. Say "any model, any angle, any colour" unless the article is about one model.
   Never ask for:
   - a camera position or point of view ("through the steering wheel", "from the rear seat")
   - hands, gestures, or a person using a feature
   - a specific screen, screen content or display state (navigation map, camera view, an app), or a head-up display
   - close-ups of parts or components, warning lights, gauges
   - a specific trim, colour, wheel, option or package
   - a time of day, weather, or "ideal if… / a plus" extras
3. **Easy to find online.** Use only shot types every brand's press gallery has for its current models:

| Shot | Request wording (fill in <…>) |
|---|---|
| Outside | any <years> <brand or model>, outside: front three-quarter, side or rear three-quarter |
| Driving | any <years> <brand or model> on the road |
| Dashboard | any <years> <brand or model> interior, whole dashboard visible |
| Seats | any <years> <brand or model> interior, front or rear seats |
| Place / people | any photo of a <brand> showroom · service drive · technician at work · key handover (library first) |

Copy the wording as written: the listed angles are alternatives the user may pick from (Seats: name the row that fits the
topic, or keep "front or rear"). A topic-specific photo is still one of these shots: an infotainment article asks for "Dashboard", not for the navigation
map; a tire article asks for "Outside" or "Place / people", not for a tread close-up. Mix the shots (not 5 interiors).

**Library first.** A library image fills a slot when its `shows` fits that slot's shot and size. Never reuse a library
image marked `"outdated": true` (its vehicle design was last sold new before last year's model year, or the model is no
longer sold; the reason is in `outdatedWhy`), and follow each image's `avoid` note.

**Comparison rule:** photos show only the dealer's own brand. The rival vehicle appears in text and tables only.

## 3. Rights (where images may come from)

1. The dealer's own image library (already licensed for the site). Check this first.
2. The brand's media/press site (newsroom photo galleries) for current-model vehicle shots, used under the brand's media terms.
3. Photos the dealer owns or has licensed (their photographer, photos of new cars on their lot, their stock license).
Never random web images, competitor sites, social media, or stock previews with watermarks.

## 4. When the user sends images

- **Filenames lie.** View every photo before using it (a file named for one model has shown a different model).
- Write alt text from what the photo actually shows (model, angle, setting), not from the filename or the article topic.
  Captions must not describe what the photo does not show.
- Reject photos with baked-in offer text or prices, a vehicle older than last year's model year (or a previous generation
  of the article's model), or visible rival logos. Say which slot and ask for a current one.
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
DealerInspire upload steps: `skills/article-dealerinspire/SKILL.md` (Phase 1 image list).

## 6. The image-list message (first message; fill in every <…>, keep this shape and length)

```
<dealer name> · "<article title>" · dealer-articles v<version>

Your turn: source <n> photos (I'm researching meanwhile)
1. IMG_HERO: <request>. Landscape, ≥1,900px wide.
2. IMG_FIG1: <request>. Landscape, ≥1,100px wide.
3. IMG_FIG2: <request>. Landscape, ≥1,100px wide.
4. IMG_PAIR1: <request>. Landscape, ≥800px wide, same shape as IMG_PAIR2.
5. IMG_PAIR2: <request>. Landscape, ≥800px wide, same shape as IMG_PAIR1.
Already in the library ✅: <slot> (<what it shows, 3–6 words>) · <slot> (…)

Where: <brand> press-photo site, or your store's own photos. Real photos only; no text, logos or watermarks.
Upload: <the platform's upload line, below>
Reply: IMG_HERO = <ID> · IMG_FIG1 = <ID> · …
```
- Fill every slot the library can (§2 "Library first") before asking for new photos.
- List only the slots to source under "Your turn", numbered 1, 2, 3…; library slots go on the "Already in the library" line
  (leave that line out when there are none). "Reply" lists only the slots to source.
- Keep only the dealer's platform upload line:
  - Apollo: `Apollo → Content Management → Manage Images → your store's folder → upload → copy each Image ID.`
  - DealerInspire: `WordPress → Media → Add New (if wider than 1,900px: resize to 1,900px wide, JPEG under 1MB) → copy each File URL.`
    The reply line then says `<File URL>` instead of `<ID>`.
- If one pair image comes from the library, ask for the other in the same shape (e.g. "Landscape 16:9").
- **Nothing to source** (the library fills all 5): replace "Your turn" … "Reply" with one line: `No photos to source: all
  5 are already in your library. Researching now.` and keep the library line.
- **Storefront missing** (the dealer file's `verify` list asks for it): add it as the last numbered item: `STORE: a photo
  of the dealership building (your own photo). Landscape, ≥1,100px wide.` and to the Reply line.
- Nothing else: no reasons per slot, no rights paragraph, no slot explanations.

Example (DealerInspire, lineup topic, October 2026; the library fills 3 slots):
```
Mercedes-Benz of Richmond · "MBUX Explained: Voice Control, Navigation and the Screens in a New Mercedes-Benz" · dealer-articles v0.11.1

Your turn: source 2 photos (I'm researching meanwhile)
1. IMG_HERO: any 2025–2027 Mercedes-Benz interior, whole dashboard visible. Landscape, ≥1,900px wide.
2. IMG_FIG2: any 2025–2027 Mercedes-Benz interior, front seats. Landscape, ≥1,100px wide.
Already in the library ✅: IMG_FIG1 (silver GLS on the road) · IMG_PAIR1 (advisor greets a driver, 16:9) · IMG_PAIR2 (key-fob handover, 16:9)

Where: Mercedes-Benz press-photo site, or your store's own photos. Real photos only; no text, logos or watermarks.
Upload: WordPress → Media → Add New (if wider than 1,900px: resize to 1,900px wide, JPEG under 1MB) → copy each File URL.
Reply: IMG_HERO = <File URL> · IMG_FIG2 = <File URL>
```
