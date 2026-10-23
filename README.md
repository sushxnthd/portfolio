# Sushanth Dasari / Working Notes

A personal research archive, built as a small editorial publication rather than a SaaS landing page.

**Site:** https://sushxnthd.github.io/portfolio/

## Art direction

Big condensed type, cream stock, black rules, orange pencil marks, and intentionally different layouts for each experiment. Technical drawings are written as SVG directly in the HTML. The only photographs are actual screenshots from Somno.

The homepage is a sequence of pages:

- **Cover:** A proper personal introduction, not a product value proposition.
- **Index:** Three pieces of work, immediately navigable.
- **Case 001 / Kernellum:** The architecture search → route → timing → update loop, with prospective FPGA test evidence.
- **Case 002 / Theorica:** A preserved failed experiment alongside the corrected run; both source reports linked.
- **Case 003 / Somno:** Real installable Android software and actual application screens.
- **Margin notes:** Unfinished research questions and selected author-reported milestones.
- **Last page:** Direct route to source code and the evidence ledger.

## Trust and provenance

Numerical results are drawn from their specific public primary reports in the linked repositories. The limitations are visible inline. See [EVIDENCE.md](EVIDENCE.md). The QHack placement is labeled as a leaderboard snapshot, not a certified final rank.

## Technology

Plain HTML, CSS, two hosted web font families plus mono, inline SVG illustrations, and a tiny optional IntersectionObserver navigation enhancer. No React, build step, paid APIs, tracking scripts, stock assets, or generated imagery.

Everything should remain navigable with JavaScript disabled.

## Editing and local preview

Run `python -m http.server 8000` from the repository root, then visit http://localhost:8000.

- **Content / project links:** `index.html`
- **Typography / layouts:** `styles.css`
- **Active section highlighting:** `script.js`
- **Verifiable claims:** `EVIDENCE.md`

Test at approximately 360, 768, 1024, and 1440 pixels, including keyboard navigation and reduced-motion mode.

Github Pages publishes from `main` via the existing deployment workflow.
