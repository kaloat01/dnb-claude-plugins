---
name: article-setup
description: One-time setup and health check for the dealer-articles plugin in the Claude Desktop app or claude.ai (Cowork or Chat; code execution, network access, plugin sync) and in Claude Code (Node.js, screenshot browser, frontend-design skill, auto-update). Use when first installing the plugin, when an article run says setup is needed, or when the user asks to check or update the article tools.
allowed-tools:
  - Bash(node:*)
  - Bash(claude plugin:*)
  - Read
---

# /dealer-articles:article-setup — check and prepare this app

**DA** = `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"` (if `${CLAUDE_PLUGIN_ROOT}` was not replaced by a real path, see
the top of `skills/article/SKILL.md`).

Report a short ✅/❌ table, then **Your turn:** the exact fix for each ❌ as numbered steps, in plain words (Chat style in
`skills/article-apollo/SKILL.md`). Do not change settings files yourself.
First decide where you are running: **Claude Code** (terminal, IDE extension, or the Desktop app's Code tab) or the
**Claude Desktop app / claude.ai in a browser** (Cowork or Chat). Never run `claude plugin …` outside Claude Code.

## A. Claude Desktop app or claude.ai (Cowork or Chat)
1. **Code execution.** If you cannot run commands at all: ❌ "Settings → Capabilities → turn on **Code execution and file
   creation**. If it offers network access (egress or a domain allowlist), choose **All domains**, or at least allow the
   dealer websites, the OEM and government sites used for research, and the image hosts (Apollo
   `service.secureoffersites.com`, DealerInspire `di-uploads-pod*.dealerinspire.com`, Dealer.com `pictures.dealer.com`).
   Then start a new chat or Cowork task."
   Stop here until it is on.
2. **Plugin.** You are running from it, so it is installed. Remind the user once: Customize → Plugins → the `dnb-plugins`
   marketplace (`kaloat01/dnb-claude-plugins`) → **Sync automatically** on (or **Check for updates** before a new article).
   Installs live on the Claude account and appear on every device signed in to it.
3. **Engine.** Run `DA env --net` and explain the result in plain words:
   - version line (e.g. "dealer-articles v0.12.0 (2026-10-12)"): the plugin version in use.
   - Node: needed; missing → ❌ item 1.
   - browser: "none" is normal here. Screenshots are skipped and the written design checklist is used instead.
   - download folder: where finished paste files, HANDOFF.md and the resume kit appear. None listed → ❌ files cannot be
     handed over; recheck item 1.
   - network: blocked dealer site → research falls back to other primary sources; blocked image hosts → image IDs/URLs
     cannot be checked here (they are marked "unverified" and the user checks the live page); blocked fonts → preview only.
4. **Reviews.** If this session can start helper agents (the current Desktop app and claude.ai can; tested 10/11/2026), the
   research and reviewer agents run separately. If not, the same reviews run inside the conversation. Say which one this is.
5. **frontend-design (optional).** If the skill `frontend-design:frontend-design` is not available, the user can add it
   from Customize → Plugins → Discover (if listed). Without it the written design checklist is used.
6. **How to start.** Show the dealer list from `DA dealers`. In Cowork, type
   `/dealer-articles:article "<dealer>" "<article title>"`; in Chat, type `/`, pick **dealer-articles:article**, or just
   ask "Write an article for <dealer> about …". To finish an article later, attach its `<slug>-resume-kit.zip`.

## B. Claude Code (only when running in Claude Code)
1. **Node.js ≥ 18** — run `node --version`.
   - Missing/old → Windows: `winget install OpenJS.NodeJS.LTS` (or the LTS installer from nodejs.org); macOS:
     `brew install node` (or the nodejs.org installer). Then **fully quit and reopen Claude Code** so the PATH updates, and
     run `/dealer-articles:article-setup` again.
2. **Engine** — run `DA env --net`. Expect: the version line, Node version, plugin folder, dealers list, and a browser for
   screenshots (Microsoft Edge or Google Chrome). No browser → screenshots are skipped (the article still builds, but the
   visual check is weaker); suggest installing Chrome or Edge. Explain any blocked hosts as in A.3.
3. **frontend-design skill** (used by the workflow for the visual check) — if the skill `frontend-design:frontend-design` is not
   available in this session, run `claude plugin install frontend-design@claude-plugins-official`. If that fails, ask the user
   to type `/plugin install frontend-design@claude-plugins-official`, then restart Claude Code.
4. **Updates** — a plugin installed on the claude.ai account arrives as a synced plugin (`/reload-plugins` or a new
   session loads it). If it was installed from the command line instead: `/plugin` → **Marketplaces** → `dnb-plugins` →
   **Enable auto-update** (one time); manual update any time: `/plugin marketplace update dnb-plugins`, then restart.
5. **Fewer permission prompts (optional)** — suggest the user allow, via `/permissions`: `WebSearch`, `WebFetch`,
   and `Bash(node:*)`. Research uses many web lookups.
6. **Dealers available** — show the dealer list from `DA dealers` and how to start:
   `/dealer-articles:article "<dealer>" "<article title>"` (it picks the platform), or
   `/dealer-articles:article-apollo …` / `/dealer-articles:article-dealerinspire …` / `/dealer-articles:article-dealercom …`
   (the PLATFORM column of `DA dealers` says which: `apollo`, `dealerinspire` or `dealercom`). Articles are created
   under `./articles/` in the current folder, so start Claude Code in the folder where you want your articles saved.
