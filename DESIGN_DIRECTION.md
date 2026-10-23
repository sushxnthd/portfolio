# Portfolio art direction / 2026-10-23

## Working concept
**An independent researcher's homepage, with experiments hiding beneath the links.**

Reference balance: roughly 75% [Paco Coursey](https://paco.me/) (restraint, reading speed, precise language) and 25% [Rauno Freiberg](https://rauno.me/) (responsive micro-interactions, tactile states, meaningful novelty). Study their principles, not copy their branding or components.

### Why this pivot

The two earlier versions over-designed a generic portfolio archetype: an oversized slogan, stylized section backgrounds, three metric-heavy case studies, and a large closing pitch. Even the later editorial treatment felt staged. This site should look and behave like a personal working space, not a template optimized to appear impressive.

Paco's own note on simplifying his site: https://paco.me/writing/redesign-2021
Rauno's essay on novelty: https://rauno.me/craft/novelty
Rauno on invisible interaction details: https://rauno.me/craft/interaction-design

## Homepage / first fifteen seconds

No splash screen, preloader, scroll hijacking, giant name art, illustrative decorations, hero image, floating dock, generic bento cards, artificial 3D mockups, pitch-deck copy, or distracting awards carousel.

Suggested reading order:

1. **Sushanth Dasari.** Small, confident name and real personal introduction.
2. **One or two sentences** stating independent AI systems research, experiments, and shipping software. Don't claim general breakthroughs.
3. **Selected work**, immediately visible and presented as compact typographic entries:
   - Kernellum — architectures selected using FPGA physical-design feedback.
   - Theorica — an algebraic reconstruction method revised after counterexamples.
   - Somno — Android fatigue-awareness app, publicly installable.
4. **Research notes** — concise entries linking to actual reports, including failure reports.
5. **Elsewhere** — GitHub, published work, accurately sourced recognition, and contact.

Each work row: title, 8–16 word human-written description, year/status, and a clear link. The **first screen should contain at least the beginning of the work index on an ordinary desktop**.

Proposed layout: 620–740px readable primary column; optional 240–330px interaction/preview rail on wide screens. Compact, readable and flexible on phones. Prefer small deliberate type and breathing room over giant display type.

## Color and type

- Mostly white / near-white canvas. Neutral ink and no visible themed section backgrounds.
- One optional accent used only for focus, selection, or a genuinely meaningful data state, not for decoration.
- Use a thoughtfully tuned sans-serif plus optional serif italic in editorial notes; no generic huge serif headlines.
- Subtle rules, excellent text rendering, real line-wrap decisions and typographic rhythm.
- No faux handwriting, stamp graphics, notebook gimmicks, fake diagrams, random symbols, auroras, gradients, or unnecessary motion.

## Rauno-level detail, not Rauno imitation

The homepage is almost static. Hovering or focusing a project row may reveal a lightweight, real source-based preview in a reserved side area. It should feel almost instantaneous (around 150–200ms), respect reduced motion, behave with keyboard focus, and never be the only way to access essential content.

Each project gets its **own real experiment or tool** instead of a common slideshow template:

- **Kernellum:** inspect per-seed routed comparisons from the public SIMILARITY report, distinguishing estimated workload latency from hardware-board measurements. Use only actual sourced data.
- **Theorica:** a faithful walkthrough of a real v1.1 counterexample and what v1.2 changed, with the frozen reports and reproducible setup linked.
- **Somno:** a swipeable or click-controlled gallery of actual application screens; include real release/install/source links. No simulated medical inference.
  
Keep navigation instant, retain normal links and scroll, ensure back navigation works, focus is visible, and hover features have touch/keyboard alternatives. Skip gimmicky cursor replacements and command palettes.

## Detail-page anatomy

1. One-sentence problem statement (plain language)
2. The thing actually built, with code and direct link
3. One meaningful real demonstration / data interaction
4. Measured results, scoped by benchmark and methodology
5. Failure, caveat, or what's not established
6. Links to source, report, releases, reproduction steps

Each project's visual identity should be a consequence of its artifacts (graphs, traces, screens), not arbitrary gradients or color theming.

## HAA review principles

A reviewer should find a working artifact within two clicks and discover whether the results are genuine without searching GitHub manually. The site is not titled or badged "HAA application." The site must stand alone for researchers, potential collaborators, and other visitors as well.

Claims are limited to the sources in EVIDENCE.md; undocumented accomplishments must be clearly qualified or omitted. No fabricated benchmarks, phantom users, made-up screenshots or reviews.

## Constraints and quality gates

- Keep existing GitHub Pages deployment and identity/SEO metadata.
- Main content readable without JavaScript.
- Fast first load, no large UI framework by default, progressive enhancement for interactive results.
- Test 360, 390, 768, 1280, and 1440px viewports, keyboard-only navigation, reduced-motion, contrast, deep-links, disabled-JS, print, and accessible link text.
- Perform actual visual browser testing before publishing, not only HTML/JS syntax checks.
- Compare the candidate homepage against live Paco and Rauno sites for restraint and detail, while avoiding visual cloning.

**Current status:** design direction agreed in conversation. This document does not redesign or deploy the homepage. Begin with homepage composition and a single high-quality project preview, test them, then extend.
