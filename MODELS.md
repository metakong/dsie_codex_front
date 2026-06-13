# Model Strings — Single Source of Truth

- **Agents 0–3:** `claude-haiku-4-5-20251001`
- **Agent 4:** `claude-sonnet-4-6`

Verified against Anthropic model docs as of June 2026. Dateless 4.6 IDs are pinned canonical IDs and do not auto-upgrade.

## Rule
Every API call must contain the literal model string inline. Never import a model string from a shared config or env fallback.
