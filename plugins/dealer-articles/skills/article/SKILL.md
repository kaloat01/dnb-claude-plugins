---
name: article
description: Start or resume a long-form, compliance-reviewed dealership article for ANY supported dealer website (Apollo, DealerInspire or Dealer.com), in the Claude Desktop app or claude.ai (Cowork or Chat) or in Claude Code. It picks the right platform workflow from the dealer. Use when the user asks for a dealer article, blog post, comparison, buying guide or service guide and names a dealer, types /dealer-articles:article "<dealer>" "<title>", or attaches a *-resume-kit.zip to continue an article.
argument-hint: "\"<dealer name>\" \"<article title>\""
allowed-tools:
  - Bash(node:*)
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - Agent
  - Skill
  - AskUserQuestion
---

# /dealer-articles:article: one entry point for every platform and every Claude app

**DA** = `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"` (always quoted, one plain command per call).
**Find the plugin folder first.** If `${CLAUDE_PLUGIN_ROOT}` above still shows literally (the Desktop app and claude.ai
do not fill it in; tested 10/11/2026), run this once:
`find / -path "*/dealer-articles/scripts/build.js" -not -path "/proc/*" 2>/dev/null`
(installed plugins usually sit under `/root/.claude/plugins/synced/<id>/dealer-articles/`). If several paths come back,
run `node "<path>" env` for each and keep the newest version. The plugin root is the folder two levels above
`scripts/build.js`; `DA env` prints it as "Plugin root". From then on read every `${CLAUDE_PLUGIN_ROOT}` in these files
as that absolute path, including in subagent briefs. If no `build.js` is found, stop and tell the user: "The article
engine (dealer-articles plugin) is not installed on this account: add it under Customize → Plugins." **Never write an
article without the engine:** it builds the package, the SEO/Yoast sheet and the checks.

## Start
1. **Surface** (decide once, from the tools you have):
   - You can start subagents (an Agent/Task tool) → **separate reviews** (Cowork or Claude Code). Continue.
   - You cannot → tell the user once, then continue: "Helper agents aren't available in this session, so the two reviews
     run in this conversation; the handoff will say 'single conversation'. (A new task in the current Claude app usually
     has them.)" Every rule still applies.
   - You cannot run commands at all → stop. Tell the user: "Please turn on **Settings → Capabilities → Code execution and
     file creation** (domain allowlist: All domains), then start a new chat."
2. Run `DA env --net`. Don't send its version as a separate message: it goes in the header line of your first message
   (the image list), e.g. "dealer-articles v0.12.0".
   Keep its results for later: browser found or not (screenshots), download folder, blocked hosts.
   Node missing or older than 18: in Claude Code, stop and point to `/dealer-articles:article-setup`; in Chat or Cowork,
   stop and ask the user to turn on Code execution and file creation (step 1).
3. **Resume kit:** if the user attached a `*-resume-kit.zip` (Chat and Cowork attachments are usually under
   `/mnt/user-data/uploads/`), run `DA resume "<zip path>"`, then `DA status "<job>"`. Skip step 4. In step 5, open the
   job's platform workflow and continue at the job's phase. Phase `images` (the usual case) → follow
   `${CLAUDE_PLUGIN_ROOT}/skills/article-images/SKILL.md` with any image IDs, File URLs or Dealer.com image URLs the user sent.
4. Run `DA dealers`. The PLATFORM column says how each dealer's site works. Match the dealer in `$ARGUMENTS` (or in the
   user's words) to that list:
   - **Ambiguous** (e.g. "Mercedes Laguna" matches the cars store and the Vans store): ask which, with the candidates.
   - **Unknown dealer:** say so, list the available dealers and stop. Never guess a dealer's data.
5. Read the matching workflow and follow it exactly, with the same `$ARGUMENTS`:
   - `apollo` → `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`
   - `dealerinspire` → `${CLAUDE_PLUGIN_ROOT}/skills/article-dealerinspire/SKILL.md`
   - `dealercom` → `${CLAUDE_PLUGIN_ROOT}/skills/article-dealercom/SKILL.md`

   The DealerInspire and Dealer.com workflows read the Apollo workflow too, because the rigor is identical on every platform.
   You already ran `DA env --net` and know the surface: the workflow's Phase 0 step 1 is done.

## Every rule applies unchanged, on every surface
- the chat style: action first, short, plain words (`skills/article-apollo/SKILL.md` → Chat style)
- image list first (current, general, easy-to-find photos: `resources/rules/image-brief.md`)
- premise test + primary-source ledger
- golden-geo ARTICLE MODE
- the design pass (frontend-design craft pass, or the written design checklist when there is no browser)
- two reviews: separate compliance and golden-geo reviewer agents (Cowork, Claude Code), or the single-conversation
  review protocol (Chat)
- the brand/legal ledger gate
- the last message is the build's HANDOFF block, verbatim

Only HOW the steps run differs by surface: see "Surface rules" in `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`.
