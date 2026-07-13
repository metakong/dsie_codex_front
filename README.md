> **Transparency Notice:** This documentation was authored by Claude Sonnet 4.6 (Anthropic) under direct human oversight — the same iterative, human-in-the-loop AI partnership methodology used to architect and build every system in this portfolio.

> **Portfolio Context** | **Sean Deardorff** — Strategic Operations & Business Development
>
> This repository is an artifact of high-velocity, AI-partnered process engineering. It demonstrates how the author builds resilient, automated business machinery — translating the same decoupled logic, governance, and defensive optimization used to manage open sales territories and corporate operations into working code.
>
> **Career Connection:** This go-to-market brand execution reflects the same audience-analysis and delivery-engineering instinct that drove Sean to #1 national lead generation ranking at Filter Queen within 90 days and earned him authorship of company-wide master verbiage scripts at Strategic Fundraising. Understanding what your audience needs to hear, then engineering the delivery system — whether that is a consultative sales presentation or a Next.js marketing site — is the same core skill.
>
> [View Full Portfolio →](https://github.com/metakong/sean-deardorff)

---

# The DSIE Codex LLC — Website

Public marketing site for The DSIE Codex LLC, a fractional AI integration
consultancy based in Springfield, Missouri.

**Live at:** [thedsiecodex.com](https://www.thedsiecodex.com) (launching September 2026)

---

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Cloudflare Workers via the [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) (OpenNext) adapter

---

## Local Development

npm install
npm run dev

Open http://localhost:3000

> `npm run dev` (plain Next.js dev server) is the **only** supported local run mode.
> This is a Windows ARM64 machine; Cloudflare's local `workerd` runtime does not ship
> for `win32-arm64`, so `wrangler dev`, `wrangler deploy`, and
> `opennextjs-cloudflare preview` all fail locally. Do not attempt them here.

---

## Deployment

**This working tree exists to update the live production site.** Local changes reach
production through an automated pipeline — there is no manual deploy step.

### Architecture (live since 2026-07-13)

- **Host:** Cloudflare **Workers** (not Cloudflare Pages — a different product).
  Next.js runs through the `@opennextjs/cloudflare` (OpenNext) adapter.
- **Worker name:** `dsie-codex-front`.
- **Domains:** `thedsiecodex.com` (canonical) and
  [www.thedsiecodex.com](https://www.thedsiecodex.com), routed as custom domains on the Worker.
- **Config files:** `wrangler.jsonc` (Worker name, `nodejs_compat`, `.open-next`
  output paths, custom-domain routes) and `open-next.config.ts`. Do not delete or rename either.

### CI/CD pipeline

1. Commit your change.
2. Push to `main` on `github.com/metakong/dsie_codex_front`.
3. **Cloudflare Workers Builds** automatically builds and deploys to production (~2–3 min).

There is **no** GitHub Actions deploy workflow — do not add one. The Cloudflare build
runs `npm run build:cf` (installs `@opennextjs/cloudflare` + `wrangler`, then runs
`opennextjs-cloudflare build`). Plain `npm run build` is local-only and does **not**
produce a deployable artifact.

For risky or structural changes, push to a **feature branch** first: Cloudflare generates
a preview deployment at `<branch>-dsie-codex-front.deardorff-sean.workers.dev`. Verify
there, then merge to `main`.

### Constraints

- **Never** add `output: "standalone"` to `next.config.ts` — it is incompatible with the
  OpenNext adapter and was removed on 2026-07-13.
- Runtime secrets (`JUNGLE_API_URL`, `JUNGLE_SECRET_KEY`) live in the Cloudflare dashboard
  under the Worker's **Variables & Secrets**, never in committed files. `NEXT_PUBLIC_*`
  build-time vars are set in the Cloudflare build configuration.
- The `.open-next/` directory is build output and is gitignored — never commit it.
- Check any new Next.js feature against the OpenNext Cloudflare adapter support matrix
  before adopting it.

---

© 2026 The DSIE Codex LLC. All rights reserved.