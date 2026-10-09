---
name: article
description: Start or resume a long-form, compliance-reviewed dealership article for ANY supported dealer website (Apollo or DealerInspire). It picks the right platform workflow from the dealer. Use when the user asks for a dealer article, blog post, comparison, buying guide or service guide and names a dealer, or types /dealer-articles:article "<dealer>" "<title>".
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

# /dealer-articles:article: one entry point for every platform

1. Run `node "${CLAUDE_PLUGIN_ROOT}/scripts/build.js" dealers`. The PLATFORM column says how each dealer's site works.
2. Match the dealer in `$ARGUMENTS` to that list:
   - **Ambiguous** (e.g. "Mercedes Laguna" matches the cars store and the Vans store): ask which, with the candidates.
   - **Unknown dealer:** say so, list the available dealers and stop. Never guess a dealer's data.
3. Read the matching workflow and follow it exactly, with the same `$ARGUMENTS`:
   - `apollo` → `${CLAUDE_PLUGIN_ROOT}/skills/article-apollo/SKILL.md`
   - `dealerinspire` → `${CLAUDE_PLUGIN_ROOT}/skills/article-dealerinspire/SKILL.md`. It reads the Apollo workflow too, because the rigor is identical on every platform.
4. Every rule in those files applies unchanged:
   - image list first
   - premise test + primary-source ledger
   - golden-geo ARTICLE MODE
   - the frontend-design craft pass
   - separate compliance and golden-geo reviewer agents
   - the brand/legal ledger gate
