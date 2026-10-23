# Sushanth Dasari — research portfolio

A dependency-free, evidence-first personal website for a fast, skeptical review of real work.

**Production website:** https://sushxnthd.github.io/portfolio/

## Purpose

The site answers three questions:

1. What has Sushanth built?
2. What are the results, and where can I check them?
3. What is the limitation or next validation step?

The design prioritizes evidence and working artifacts over animation, illustrations, or unverified claims.

## Featured work

| Project | Evidence | Important boundary |
| --- | --- | --- |
| **Kernellum** | [Prospective routed deployment report](https://github.com/sushxnthd/kernellum/blob/main/docs/SIMILARITY_PORTFOLIO_CONFIRMATION_REPORT.md) | ECP5 final-route timing and cycle-model estimates; **not** physical-board measurements. |
| **Theorica** | [Frozen cross-family v1.2 report](https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_2_REPORT.md) and [preserved v1.1 failure](https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_1_FAILURE.md) | Algebraic tasks under explicit eligibility promises; **not** general autonomous discovery. |
| **Somno** | [Android v27 release](https://github.com/sushxnthd/somno/releases/tag/v27) and [source](https://github.com/sushxnthd/somno) | Fatigue-awareness estimates; **not** medical diagnosis or sleep-stage classification. |

Exact claim-to-source provenance is maintained in [EVIDENCE.md](EVIDENCE.md).

## Technical design

- Native HTML and CSS with lightweight progressive-enhancement JavaScript.
- Responsive layouts at 1130px, 800px, and 560px.
- Semantic headings, visible keyboard focus, a skip link, and reduced-motion support.
- No client-side framework, analytics scripts, stock art, or dependency-heavy interactions.
- Schema.org Person/ProfilePage metadata, canonical URL, and sitemap.

## Local preview

Run 'python -m http.server 8000' from the repository root and visit http://localhost:8000.

Check at 375px, 768px, and 1440px viewports; test keyboard tab navigation, direct anchor links, and JavaScript-disabled rendering.

## Editing checklist

1. Edit content in index.html, style in styles.css, and enhancement in script.js.
2. Verify every numerical claim against a source report and update EVIDENCE.md when its meaning changes.
3. Check that external links lead to accessible repositories, releases, or reports.
4. Test both mobile and desktop layouts.
5. Merge changes to main to deploy through GitHub Pages.

## Accuracy

The selected numbers are scoped to documented experiments. This site does not imply independent state-of-the-art status, physical-board deployment, clinical efficacy, or certified novelty.
