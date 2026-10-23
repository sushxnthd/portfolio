# HAA Portfolio — Approved Information Architecture
Updated October 23, 2026

## Concept

**Rauno Freiberg's genuine, full-homepage horizontal-scrolling architecture × Paco Coursey's quiet, minimalist visual style.**

The horizontal movement should express how the creator's work is organized, not turn every individual item into a disconnected slideshow. The principal scenes are **categories of work**. Each scene contains a small, curated list of appropriate artifacts; clicking an item opens a focused case study or working demo.

This supersedes the earlier one-panel-per-Kernellum/Theorica/Somno layout and the earlier static-vertical-homepage idea.

Primary references:
- Rauno: https://rauno.me/ — horizontal structure, fluid input and precise feedback.
- Paco: https://paco.me/ — understated typography, thoughtful whitespace, compact information.
- The principles should be adapted, not the sites cloned.

## One continuous horizontal track

`00 INTRO → 01 RESEARCH → 02 PROJECTS → 03 LABS & VENTURES → 04 RECOGNITION → 05 ELSEWHERE`

Do not implement separate nested sideways carousels for each category; that would create competing scroll gestures. Scene widths may vary naturally. Navigation labels and a slim position indicator remain visible.

## Prototype interaction: category cards unfold from a stack

**New candidate behavior (to prototype before treating as final):** Instead of an always-open scene containing a list, each category occupies one clean, comparatively compact top-level card in the continuous horizontal track. Two or three very subtle edges peeking out behind it communicate that the category holds more.

- Clicking/tapping **Research** causes the category to stay anchored while its child cards emerge **from behind it toward the right**. The section widens and downstream category cards shift to make room; do not float content over unrelated categories.
- The movement reads as a short **deck unfolding**, not a bouncy accordion, popup, page transition, decorative card fan, or secondary nested carousel.
- At rest, the deck uses Paco-like white space, thin rules, readable small type and no loud visual effects. No fake papers, gradients, shadows, 3D tilts, or giant titles.
- Child cards are independent navigable links, with a short human-written explanation, status and one authentic artifact/preview. Clicking a child navigates to the project's own detail page or live artifact.
- Only **one category** needs to be expanded at once. Opening a different category collapses the existing stack, preserving the user's sense of place.
- Suggested child sets: Research → BigData paper, ICA paper, Theorica experiment, Kernellum experiment, selected calibration research. Projects → Somno, Hush, Lattice (only when legitimate public artifacts exist). Labs & Ventures → Kernellum laboratory, agnXiv, verified other venture. Recognition → awards and competitions with qualified evidence. Elsewhere → writing, GitHub, contact.
- Intro is a single static card and does not need nested content.

### Animation and accessibility

- The collapsed category gives a *small physical hint* of two stacked surfaces behind the main face (approximately 6–12px offsets). Expanded children slide out horizontally and settle into readable spacing, maintaining the same horizontal document track.
- Aim for an unobtrusive 220–330ms transform/opacity transition, and avoid easing that feels like a trendy component demo.
- Keep layout stable by managing an animated width/allocated rail space. Preserve the selected parent's position rather than unexpectedly scrolling to a new chapter.
- The category is a semantic **button** with `aria-expanded` and `aria-controls`; children are normal hyperlinks in the DOM, reachable by Tab. Enter/Space opens; Escape closes, returning focus to the parent.
- The expanded state must be visible with `prefers-reduced-motion` (no movement), touch, small screens, and without hover. Prevent focus from entering visually closed children.
- On phones, keep horizontal swipe across categories and let expanded child cards take full or nearly full viewport width in the same track, with a clear Back to category control. No nested swipe rail competing for the gesture.
- Direct hashes (`#research`, `#projects`, etc.) open their parent category. Project hashes or detail links can open/lead directly to the relevant content.
- With JavaScript disabled, show accessible expanded lists or straightforward links; no essential content should disappear.

**Success test:** Category selection feels like drawing a few related works out of a filing stack. It should be interesting for a second and then get out of the way of reading the research. A faster, simpler state change wins over a theatrical one.



### 00 / Introduction

- "Sushanth Dasari" and a short, genuinely personal description of the work.
- Two quiet actions: Work and GitHub.
- Next panel peeks at the right edge to signal horizontal scroll.
- Not a hero slogan, huge billboard type, or achievement pitch.

### 01 / Research

This category is for *original findings, experiments, and papers*, whether or not they become products.

Editorial list, with a small real evidence-based figure or observation area:
- Theorica — algebraic reconstruction and public v1.1 failure → v1.2 correction.
- Kernellum architecture search — route-aware FPGA experiment, with accurate timing boundary.
- IEEE BigData 2026 trace-corpus paper — **accepted**, not inaccurately described as already published.
- IEEE ICA 2026 paper — **accepted**, and linked to a verifiable artifact when available.
- Selected work on calibration, CR-ZNE and related machine-learning/quantum studies, only where readable primary evidence exists.

Subdivide if needed into tiny information labels: `PAPERS`, `EXPERIMENTS`, `NOTES`. Avoid repeating the same item as a separate main-card destination in every category. HAA reviewer should immediately distinguish peer-reviewed acceptance from ongoing research and public preprints.

### 02 / Projects

This category is for *software visitors can use, inspect, or run*, regardless of company affiliation.

- **Somno** — highlight its public Android release; include real UI screenshots, product and source.
- **Hush** — include once a working, publicly viewable demo/source is confirmed; label experimental if incomplete.
- **Lattice** — AI-first programming-language experiment; mark status accurately and demonstrate a real working snippet when possible.
- Other substantial public builds can appear in an understated "More projects" link, not as filler.

A simple index: title, short purpose, `SHIPPED` / `PROTOTYPE` / `EXPERIMENT` (verified), one meaningful image or demo preview in the available whitespace.

### 03 / Labs & Ventures

This is about *the organizations, research labs, and businesses being built*, distinct from individual research papers and applications.

- **Kernellum** — independent research laboratory; show mission and the collections it supports, rather than duplicating its full experiment write-up.
- **agnXiv** — scientific verification product under Kernellum; present a live demo or demonstrable workflow when available.
- A genuinely distinct venture, such as **Green Groove**, belongs here only if status and relationship are clear and it advances the story.

Call this scene **Labs & Ventures**, not "Companies", unless legal entities have actually been established. Do not imply financing, team size, traction, incorporation, customers, or scientific validation without evidence. Cross-link relevant research and projects quietly.

### 04 / Recognition

A compact, credible list — **not** giant badges, logos or a trophy wall:
- AIYES Fall 2026 Gold — Somno.
- QHack 2026 — 23/23; 13th of 1,651 teams on a recorded leaderboard, qualified if official final evidence is unavailable.
- IEEE paper acceptances can be cross-linked here, but the actual paper lives under Research.
- Only add other prizes/awards when precise claims and verification are available.

Keep achievements secondary to artifacts; no generic awards carousel.

### 05 / Elsewhere

Short closing panel with writing, extended project index, GitHub, and contact. No grandiose "let's change the world" closer.

## How each category should LOOK

The entire site uses one Paco-inspired design system:
- white or lightly warm background, near-black ink, precise small sans-serif;
- restrained metadata, elegant vertical rhythm, refined hover/focus states;
- no gradients, decorative diagrams, loud accent colors, fake hand-drawn elements, 3D mockups, oversized slogans, glassmorphism, or generic feature cards;
- real code, experiment plots, and product screenshots supply nearly all visuals.

But panels are not rigid repeated templates:
- Research resembles a compact bibliography plus one genuine interactive figure.
- Projects resembles a small software index with a real preview and plain status.
- Labs & Ventures resembles a concise ecosystem map or text directory.
- Recognition resembles a quiet factual CV footnote.

Every panel has a clear typographic hierarchy and enough blank space to breathe.

## How it MOVES

- Continuous native CSS horizontal overflow, progressive wheel/trackpad enhancement on desktop.
- Trackpad horizontal input, touch swipe, drag interaction, category navigation, and keyboard navigation.
- Visible but unobtrusive position / chapter indicator.
- Deep-links work for each category, e.g. `#research`, `#projects`, `#ventures`.
- No scroll trapping, heavyweight easing, or collision between nested scrollers.
- Respect reduced-motion and keyboard focus; essential material remains accessible if JS is disabled.
- Detail pages and deep interactive demos can scroll **vertically**. The homepage itself is horizontal.

## Review and publication standard

- Every visible entry leads to a legitimate artifact in one or two interactions.
- Statuses and rankings are scoped and linked in EVIDENCE.md.
- Check desktop wheel + trackpad, keyboard-only, drag and phone swipe.
- Check 360, 390, 768, 1280 and 1440px layouts; labels/text must not be clipped.
- Test real browser screenshots, not only syntactic validity.
- Keep canonical metadata, structured Person identity and sitemap intact.
- Build/inspect a complete candidate before replacing the currently live site.

**Status (October 23, 2026):** The horizontal category-deck homepage has been implemented and merged to `main` via PR #4. The live page and versioned CSS/JavaScript were verified after deployment with a cache-busting URL. Static QA passed; screenshot-level cross-browser QA and hands-on trackpad/touch interaction testing remain outstanding.
