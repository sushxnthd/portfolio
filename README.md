# Sushanth Dasari / Portfolio

A horizontally scrolling portfolio of research, software projects, labs/ventures, and selected recognition.

**Public site:** https://sushxnthd.github.io/portfolio/

## Design

Rauno-inspired horizontal spatial navigation with Paco Coursey's minimal visual restraint. The category cards behave like filing stacks: selecting a category unfolds its children to the right, displacing later categories in a **single horizontal track**. The result avoids nested carousels and doesn't demand a framework.

Main chapters:

00. Introduction
01. Research (Theorica, Kernellum experiments, Trace Corpus, CR-ZNE)
02. Projects (Somno, Hush, Lattice)
03. Labs & Ventures (Kernellum, agnXiv)
04. Recognition (AIYES, QHack, IEEE ICA)
05. Elsewhere (GitHub, evidence ledger, contact)

Some statuses are author-reported, not independently substantiated by public award or acceptance notices. BigData and ICA manuscripts are not linked until public copies are available. Experimental metrics are explicitly scoped to their benchmarks.

## Accessibility and interaction

- Desktop wheel, native horizontal trackpad scrolling, pointer drag, and touch swipe.
- Expand/collapse buttons with `aria-expanded` and `aria-controls`.
- Only one deck open at a time; closed child links marked inert.
- Category deep links, keyboard Arrow navigation when the horizontal rail has focus, Escape to close open decks, and Tab to reach child links.
- Reduced-motion support. With JavaScript disabled, all child links remain exposed through the native horizontal track.
- Layouts responsive from small phones to desktop monitors.

## Sources

- Numerical research claims: [EVIDENCE.md](EVIDENCE.md)
- Detailed design specification: [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md)
- Project code and source reports are linked directly from their cards.

## Editing and preview

No build system or framework. Serve locally using `python -m http.server 8000` and visit http://localhost:8000.

- Content/category membership: `index.html`.
- Layout and styling: `styles.css`.
- Horizontal navigation and unfolding behavior: `script.js`.

The repository's existing GitHub Pages workflow publishes the main branch. Preserve identity metadata and the canonical URL if modifying the page.
