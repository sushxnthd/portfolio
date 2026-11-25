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
