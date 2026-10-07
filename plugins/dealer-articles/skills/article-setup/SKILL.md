---
name: article-setup
description: One-time setup and health check for the dealer-articles plugin (Node.js, screenshot browser, frontend-design skill, auto-update). Use when first installing the plugin, when /article-apollo says setup is needed, or when the user asks to check or update the article tools.
allowed-tools:
  - Bash(node:*)
  - Bash(claude plugin:*)
  - Read
---

# /article-setup — check and prepare this computer

**DA** = `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js"`

Run each check, then report a short ✅/❌ table with the exact fix for any ❌. Do not change settings files yourself.

1. **Node.js ≥ 18** — run `node --version`.
   - Missing/old → Windows: `winget install OpenJS.NodeJS.LTS` (or the LTS installer from nodejs.org); macOS:
     `brew install node` (or the nodejs.org installer). Then **fully quit and reopen Claude Code** so the PATH updates, and
     run `/article-setup` again.
2. **Engine** — run `DA env`. Expect: Node version, plugin folder, dealers list, and a browser for screenshots
   (Microsoft Edge or Google Chrome). No browser → screenshots are skipped (the article still builds, but the visual check
   is weaker); suggest installing Chrome or Edge.
3. **frontend-design skill** (required by the workflow for the visual check) — if the skill `frontend-design` is not
   available in this session, run `claude plugin install frontend-design@claude-plugins-official`. If that fails, ask the user
   to type `/plugin install frontend-design@claude-plugins-official`, then restart Claude Code.
4. **Auto-update** — tell the user: `/plugin` → **Marketplaces** → `dnb-plugins` → **Enable auto-update** (one time).
   Manual update any time: `/plugin marketplace update dnb-plugins`, then restart Claude Code.
5. **Fewer permission prompts (optional)** — suggest the user allow, via `/permissions`: `WebSearch`, `WebFetch`,
   and `Bash(node:*)`. Research uses many web lookups.
6. **Dealers available** — show the dealer list from `DA dealers` and how to start:
   `/article-apollo "<dealer>" "<article title>"`. Articles are created under `./articles/` in the current folder, so start
   Claude Code in the folder where you want your articles saved.
