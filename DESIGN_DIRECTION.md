# Quiet personal site — design direction

Approved direction: Paco Coursey's minimal personal-site approach (https://paco.me/), interpreted rather than copied. Replaces the earlier horizontal deck and research-journal designs.

## Principles

- The site is a quiet personal introduction, not a sales landing page.
- Plain white, near-black text, muted secondary text, small typographic hierarchy, modest underline interactions.
- 664px centered reading width, 128px desktop top spacing, 64px between sections; three compact columns on desktop, single-column mobile.
- Inter variable and Newsreader italic are hosted locally with their upstream SIL Open Font Licenses. No third-party runtime font service.
- No decorative hero, graphical cards, dashboard, navigation bar, scroll hijacking, or animation beyond restrained link feedback.
- Full details are on four dedicated archive pages. The homepage links to nine selected records, all archive pages, evidence and source. Building also links to related research experiments.
- All 26 original records are preserved across archives and homepage source/contact entries; the research archive retains the original optional figures.
- Legacy project hashes redirect to the relevant archive when JavaScript is available. Ordinary navigation is entirely native HTML and works without JavaScript.
- Evidence and status qualifiers are retained. No new achievement claims are made.

## References

Primary: https://paco.me/ . Complementary references from the earlier design investigation: https://frankchimero.com/ , https://manuelmoreale.com/ , https://cmhb.de/ . Typeface sources: https://github.com/rsms/inter and https://github.com/google/fonts/tree/main/ofl/newsreader .

## Review

Chromium regression tests cover five viewport sizes, archive counts, local navigation, legacy hashes, font load, overflow, keyboard skip link and JS-disabled navigation. Screenshot artifacts are collected for desktop and mobile home and research pages. A passing browser suite is not a substitute for human visual review or complete WCAG conformance.

## Second craft pass — November 26, 2026

Reviewed actual Chromium screenshots of the first implementation at 390 and 1440px and compared against Paco's homepage, his 2021 redesign notes, and the independently captured visual reference at https://mnmm.xyz/websites/2025-04-05-paco-me/ . The initial design was too catalog-like: smaller type than the reference, uneven rows, duplicate archive descriptions, and generic copy. This pass uses a 640px measure, 16px/1.75 body, consistent 14px secondary descriptions, aligned three-column rows and succinct archive links. Mobile entries use a compact title/description pair rather than excessive stacking. The introduction and Now section use concrete research questions; Recent is a small dated text list, not a trophy display. Research separates papers/manuscripts from ongoing experiments; archive navigation is inline text and records have quiet separators. All original records and qualifiers remain. No new visual gimmicks, external fonts, framework or theme control.

## Dark theme

A neutral graphite background (#151515), off-white headings (#e7e7e7), soft gray body text (#bdbdbd), and muted labels (#a0a0a0). The layout and hierarchy are unchanged. A small unlabelled-visually but accessible sun/moon/system switch sits in the footer. The system scheme is the initial default; manual choice persists across pages. Scientific diagrams retain their original colors on a light substrate. No forced inversion, gradients, or theme animation. Print remains light. Browser tests cover system preferences, explicit overrides, persistence, dark mobile and no-JS fallback.

## Ephemeral image trail

Requested reference: https://vshslv.com/ (also described as an image trail by Mindsparkle Mag and CSS Winner). Homepage-only, native Web Animations implementation: images appear along the pointer's path at roughly 66px movement intervals, drift slightly and disappear within 1.05 seconds. Up to six images coexist. No custom cursor or click interception. Real assets are locally copied from the owner's Somno, Hush, Kernellum and Green Groove repositories; no imagery from the reference site is reused. Desktop fine pointer only, with reduced-motion support and a persistent opt-out in the footer; Escape, click, scroll, blur and tab visibility clear impressions. This is an original adaptation, not a frame-accurate reproduction of the reference animation.

## Approved refinement baseline

The original project-asset trail is preferred over the rejected Field Studies artwork. Trail images have sharp, square corners and no rotation at any animation stage. Keep the small image size, disappearance, and native pointer response unless an evidence-backed improvement is demonstrated. Keep the Paco-inspired typography-led layout and both color schemes. Treat the current production site as the baseline for incremental experiments; radical redesigns should be previewed separately rather than silently replacing the working design.

## Experiment: reading-safe trail (2026-11-26)

Baseline d646cad: CI and Pages both passed ([browser suite](https://github.com/sushxnthd/portfolio/actions/runs/45693022489)). Source inspection found that entering a link only reset the sampling point, leaving previous opaque impressions over text for up to 1050 ms; Tab did not clear them. Candidate: clear existing impressions immediately on interactive hover, keyboard Tab, focus changes, and noncollapsed selection. Keep the approved art, spacing, dimensions, square edges, fade and drift. Reference: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html (focus visibility principle, not a conformance claim). Tradeoff: impressions disappear abruptly when entering controls, intentionally prioritizing reading and navigation. Browser assertions added for link hover and Tab, alongside the existing rotation, corner and cleanup tests. Candidate branch only until CI passes; no rendered comparison yet.

Promotion (2026-11-26): candidate browser suite passed at 220b8a7 ([CI](https://github.com/sushxnthd/portfolio/actions/runs/45711911356)), including hover/Tab cleanup and original square/unrotated assertions. Promote unchanged runtime and tests to main; no claim of screenshot inspection. Next: evaluate cumulative pointer path spacing against straight-line displacement in a separate candidate.

## Experiment: touch image trail

Feedback: trail unavailable on phones because both JS and CSS excluded coarse pointers. Candidate adds short taps on noninteractive areas and horizontal single-finger swipes, with smaller unrotated project images (maximum three). Vertical scrolling and pinch zoom remain native; interactive targets, selection, pointer cancellation and reduced motion suppress or clear the trail. Touch-action changes only when the effect is enabled. Desktop behavior remains unchanged. Added Chromium mobile-emulation tests for tap, swipe, disappearance, scrolling and reduced motion; actual phone review and CI verification pending. Preview only, not promoted.

Promotion (2026-11-26): exact candidate 00c553a passed Chromium browser smoke ([CI](https://github.com/sushxnthd/portfolio/actions/runs/45738558722)); preview deployment retry succeeded and its mobile homepage returned HTTP 200. Merged via [PR #8](https://github.com/sushxnthd/portfolio/pull/8), commit eae2857. Production deployment verification, physical iOS Safari and actual motion review remain outstanding. No layout or desktop trail changes.

## Background image trail (2026-11-26)

User feedback: the moving images must be in the background, not over the text. Replace overlay z-index 10 with an independent fixed layer at z-index 0, foreground home at 1 and skip link at 2. Feather opacity to 8% across the reading column (full-strength in desktop margins); unsupported mask implementations use a uniform 8% fallback. This intentionally makes impressions much subtler on narrow phones, but keeps text readable. Existing assets, motion, pointer transparency, touch behavior, and reduced-motion rules remain. Isolated Chromium pixel checks at widths 360, 390 and 1440 in both themes verified unaltered foreground pixels and attenuated central background pixels; full-site smoke checks added, CI and actual motion review not yet verified.
