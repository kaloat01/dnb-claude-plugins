---
name: article
description: Start or resume a long-form, compliance-reviewed dealership article for ANY supported dealer website (Apollo or DealerInspire), in the Claude Desktop app or claude.ai (Cowork or Chat) or in Claude Code. It picks the right platform workflow from the dealer. Use when the user asks for a dealer article, blog post, comparison, buying guide or service guide and names a dealer, types /dealer-articles:article "<dealer>" "<title>", or attaches a *-resume-kit.zip to continue an article.
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
If `${CLAUDE_PLUGIN_ROOT}` above was not replaced by a real path, the plugin root is the folder two levels above this
skill's folder (`${CLAUDE_SKILL_DIR}/../..`): use that absolute path wherever these files say `${CLAUDE_PLUGIN_ROOT}`,
including subagent briefs. If `scripts/build.js` is not there either, stop and tell the user: "The article engine is not
available here. Please start a Cowork task and run the same request." **Never write an article without the engine:** it
builds the package, the SEO/Yoast sheet and the checks.

## Start
1. **Surface** (decide once, from the tools you have):
   - You can start subagents (an Agent/Task tool) → **separate reviews** (Cowork or Claude Code). Continue.
   - You cannot → **Chat**. Tell the user once: "Cowork gives separate reviewer checks; Chat works but the reviews happen in
     this conversation. Switch to Cowork (recommended: open a Cowork task and send the same request) or continue here?"
     If they want to continue here, go on; every rule still applies.
   - You cannot run commands at all → stop. Tell the user: "Please turn on **Settings → Capabilities → Code execution and
     file creation** (and allow network access if it is offered), then start a new chat, or use a Cowork task."
2. Run `DA env --net`. Show its version line to the user in one line (e.g. "dealer-articles v0.11.0 (2026-10-11)").
   Keep its results for later: browser found or not (screenshots), download folder, blocked hosts.
   Node missing or older than 18: in Claude Code, stop and point to `/dealer-articles:article-setup`; in Chat or Cowork,
   stop and ask the user to turn on Code execution and file creation (step 1).
3. **Resume kit:** if the user attached a `*-resume-kit.zip` (Chat and Cowork attachments are usually under
   `/mnt/user-data/uploads/`), run `DA resume "<zip path>"`, then `DA status "<job>"`. Skip step 4. In step 5, open the
   job's platform workflow and continue at the job's phase. Phase `images` (the usual case) → follow
   `${CLAUDE_PLUGIN_ROOT}/skills/article-images/SKILL.md` with any image IDs or File URLs the user sent.
4. Run `DA dealers`. The PLATFORM column says how each dealer's site works. Match the dealer in `$ARGUMENTS` (or in the
   user's words) to that list:
   - **Ambiguous** (e.g. "Mercedes Laguna" matches the cars store and the Vans store): ask which, with the candidates.
   - **Unknown dealer:** say so, list the available dealers and stop. Never guess a dealer's data.
5. Read the matching workflow and follow it exactly, with the same `$ARGUMENTS`:
   - `apollo` → `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`
   - `dealerinspire` → `${CLAUDE_PLUGIN_ROOT}/skills/article-dealerinspire/SKILL.md`. It reads the Apollo workflow too,
     because the rigor is identical on every platform.
   You already ran `DA env --net` and know the surface: the workflow's Phase 0 step 1 is done.

## Every rule applies unchanged, on every surface
- image list first
- premise test + primary-source ledger
- golden-geo ARTICLE MODE
- the design pass (frontend-design craft pass, or the written design checklist when there is no browser)
- two reviews: separate compliance and golden-geo reviewer agents (Cowork, Claude Code), or the single-conversation
  review protocol (Chat)
- the brand/legal ledger gate
- the last message is the build's HANDOFF block, verbatim

Only HOW the steps run differs by surface: see "Surface rules" in `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`.
