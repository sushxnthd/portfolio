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

## Continuous background trail (2026-11-26)

User reported the central block from the previous reading-column mask. Remove all spatial masking and use a uniform 48% layer across the viewport; retain foreground stacking and transparent content. A small theme-colored text shadow is limited to glyphs rather than a panel. Existing image motion and touch gestures are untouched. Tradeoff: margins are less intense than before, but the full image remains visible as it crosses the center. Updated browser assertions require no mask, uniform opacity and transparent foreground. Visual contrast and physical-device review still pending. Production release also adds a Pages artifact visibility check to mitigate the previously observed upload-to-deploy race.

## Restore full-strength background imagery (2026-11-26)

User reported that the 48% global opacity whitened the trail. Restore the layer to opacity 1; individual images retain their original animated opacity and fade. Keep the foreground stacking, transparent content, no mask, glyph-level text halo, and touch behavior. Updated browser assertion requires full layer opacity; visual contrast over high-contrast images requires review. Cache key bumped. No other visual changes.

## Original-layout inline expansion

User preferred the original three-column composition to the accordion redesign. Preserve the original homepage markup, typography, selected projects, descriptions and responsive grid; insert hidden full-width panels below the grid and Recently section. Existing project links progressively enhance to open a single record, and All links expand the whole category. Hashes are shareable; close restores the initiating link focus; old archive URLs remain functional and no-JS navigation unchanged. All 23 records copied unchanged from source archives, including evidence and diagrams. No image trail changes. Static ID and record checks performed; browser CI and live visual review pending.

## Kinetic background trail experiment

User requested more impressions and special effects. Compare desktop spacing 66→38px, minimum interval 62→34ms, cap 6→10; mobile spacing 44→28px, interval 80→42ms, cap 3→5. Use cumulative desktop path distance; directional rectangular reveal, speed-dependent scale (≤1.16×) and bounded directional momentum followed by the existing fade. Preserve full color, square edges, no rotation, unmasked background layer and all reading, touch and reduced-motion safeguards. No new graphic assets: existing repository contains eight authentic project images; avoid filler or unsupported provenance. Added density, clipping and curved path regression assertions. Visual review and candidate CI pending; increased activity may distract, so this is a separate experiment.

## Single production website consolidation

User requested all changes be published only to the main website; remove separate preview deployment from Pages, retain historical Git branches solely for internal reference. Original-layout inline candidate 9aabf5f passed CI (45777325373); kinetic candidate 345448b passed CI (45768997712). Combine their runtime changes and smoke assertions atomically on main. Combined CI and Pages verification pending. Retain old archive URLs as backwards-compatible content, not separate design versions.

## Revert inline expansion (2026-11-26)

User requested reversal of expanding section aesthetic. Restore original three-column homepage and direct archive navigation. Preserve kinetic trail, full-opacity background layer, themes, 23 archive records, and production-only Pages workflow. Retain redirects for project hashes and newly introduced all-category hashes. Reuse previously passing kinetic regression suite; new release CI and deployment pending.

## Restore preferred inline expansion (2026-11-26)

User clarified that the original three-column layout with clickable inline-expanding project and category details was the preferred version. The preceding reversal was a misunderstanding. Restore the exact previously consolidated inline implementation and combined kinetic regression suite, bump cache keys, retain production-only deployment, and keep the existing archive URLs for compatibility. No changes to image trail, typography, or collapsed composition. New release CI and deployment pending.

## Restore native one-page disclosures (2026-11-26)

User explicitly identified the original one-page format at 42789cf, not the three-column inline hybrid. Restore its four native expandable sections, full-width content, all 23 entries, direct hashes, no-JS disclosure, and reduced-motion entrance behavior. Preserve the current kinetic trail (v6), dark/light themes, production-only deployment, and legacy archive URLs. Support previously introduced all-category hashes. Original one-page candidate CI passed (45770003935); combined release regression and deployment pending.

## Spatial bursts and authentic image variety

Restore quality focus on trail only. Increase authentic imagery from eight to twelve using existing project SVG assets: kernellum/docs/kernellum-assets/measurement-array.svg (blob 158b9be0638fcbf156c0aae77dc1a5fddbe77c5e); kernellum/docs/kernellum-assets/timing-field.svg (blob cfca1724e0285d80aecd6354ee0e6b25959251dd); hush/assets/source/brand/deploy/laptop.svg (blob 9cfb363af4dc5f15268a53fe07a4bcef4ed5b277); greengroove/assets/visuals/a07-full-six-layer-architecture.svg (blob 470e844dc8f5f0435772d1f4f8e0fa1d4eba28e0). Preserve original artwork; no new generated placeholders. Use a shuffled nonrepeating image cycle, bounded three-stamp interpolation for fast desktop pointer jumps, and 12 ms stagger per stamp. Keep the one-page layout, image opacity, square edges, no rotation, desktop cap 10/mobile cap 5, touch and reduced-motion behavior unchanged. Add browser checks for intermediate stamps and distinct burst sources. Baseline combined CI and deployment passed (45792695430 and 45792695372). New candidate tests and visual review pending.

## Admissions-grade evidence index (2026-11-26)

HAA's official admissions page (https://theacademysf.com/admissions) prioritizes actual work and individual contribution. Preserve the approved four native disclosures and all 23 records; add a compact selected-work index ahead of them with three independent, accessible artifact links: Somno Android release, agnXiv public beta, and CopyCAT manuscript/code. Selection is an editorial choice, not a claim that HAA prefers these specific projects. Existing quantitative qualifiers and full descriptions remain; no new achievements, personal motivation or individual contribution claims invented. Verified product and release URLs returned HTTP 200, and CopyCAT reproducibility workflow returned HTTP 200. Added responsive overflow and direct-link checks. Existing v7 spatial trail preserved. Visual/device review and new regression suite pending.

## Foreground trail, clean typography

User explicitly prefers image impressions over the text and dislikes the prior glyph shadows. Restore the foreground trail (z-index 10), remove the text-shadow rule entirely, and keep the skip link above the trail (z-index 12). Preserve full colors, no mask, pointer transparency, keyboard/selection/link clearing, touch behavior, reduced motion, twelve authentic assets, kinetic bursts and the approved one-page layout. Updated browser assertions check layering and shadow-free typography. Tradeoff: transient overlap can cover text until impressions fade; existing interaction clearing and opt-out remain. New CI and production verification pending.

## HAA proof-of-work: show the process, not only outcomes

Official admissions and FAQ (https://theacademysf.com/admissions and https://theacademysf.com/faq) emphasize proof of work, actual individual contributions and authentic applicant voice. Add three compact technical process notes within existing records, without new homepage clutter: Theorica frozen failure and correction (source blobs 58c21f3 and 4eacf29), K1 active-vs-random routed search (d921805), CopyCAT executable reproduction and provenance (c2e1831). Keep all original scope limitations and avoid attributing unverified personal work. Source reports were inspected. Baseline foreground-trail CI passed 45808924958; Pages artifact race failed 45808924923 and was rerun. New browser regression and live visual review pending. Personal roles, motivation, user traction and collaboration details require author verification before publishing.

## Promotion verification (2026-11-26)

Foreground trail and attempt-specific Pages artifact fix verified: main CI 45816642228 and deployment 45816642206 succeeded; live homepage returned HTTP 200 with one-page-4 stylesheet. Technical process candidate 37b2e3b passed browser CI 45816564416. Promote its four changed files onto 9b8c9ae, retaining the deployment workflow fix. HAA admissions and FAQ rechecked: proof of work and accurate collaborative contributions remain the priority. Combined main CI and deployment pending; no visual inspection claimed.

## User-approved trail collection (2026-11-26)

User supplied ten final images and explicitly requested replacing the active trail with these only. Preserve each image composition, aspect ratio, and colors; resize to max 640px, WebP quality 83, total ~309 KiB. No generated additions, no earlier rejected artwork. Keep the existing kinetic foreground animation, square corners, dark/light themes, layout, accessibility and opt-out. The supplied imagery is decorative, not evidence of physical hardware fabrication or measured performance. Retain earlier project archive assets separately. Add decode and approved-source checks. Direct main release; CI and deployment pending.

## Reading rhythm and stable record anchors (2026-11-26)

The ten user-approved trail images release (242d134) passed CI 45871587786 and Pages 45871587903. Do not alter trail assets or animation in this pass. Refine homepage-only typography and spacing: 680px reading measure, 23px name heading, stable selected-work columns, consistent section labels, slightly roomier disclosure rows, full-width expanded figures and footer baseline. Normalize all record headings to h3 and make each title a native self-link to its existing record hash; retain all 23 entries and evidence language. Preserve original one-page layout, no-JS disclosures, both themes, accessibility and mobile wrapping. New regression checks cover 23 valid permalinks and headline scale. Static checks completed; browser visual/CI/deployment pending. Editorial choice: no new marketing copy, cards or fabricated contributions.

## Native mobile trail repair

User reports mobile trail not working. Earlier implementation intentionally cleared vertical gestures and all scroll events, and relied on coarse-pointer media queries and pointer events. Replace mobile handling with passive native Touch Events, detect touch capability via maxTouchPoints and media queries, immediately stamp noninteractive taps, emit along vertical and horizontal motion, and allow existing stamps to fade during native scrolling. Ignore touch-generated mouse compatibility events, cancel on multi-touch or selection, preserve keyboard/opt-out/reduced-motion clearing. Increase phone cap to six and modestly increase thumb-sized images. Remove restrictive touch-action rule. Keep desktop animation and exact ten approved assets unchanged. Regression tests exercise tap, swipe, vertical scroll with visible trail, native touch-action and reduced motion. Physical iOS/Android device verification remains outstanding; CI and Pages pending.

## Full portfolio inventory expansion

User requests every known achievement, project and paper PDF where possible. Cross-check academic CV, current author-reported history, public GitHub repositories and actual available manuscript first pages. Expand to 51 named records with 19 research, 3 building, 11 software and 18 recognition/activity records; nest all 25 public small engineering libraries. Add CopyCAT and Kernellum PDF links and environmental AI preprint, official AIYES award URL. Preserve one-page design, artwork, mobile behavior, existing IDs and matching legacy archives. Paper PDF availability and exact statuses remain incomplete; do not upload private drafts or invent URLs. Regression and Pages pending.

## Canonical author manuscript PDF links

Inspected manuscript title/author and confirmed anyone-reader access on nine existing author PDFs in Google Drive. Add links to forensic inversion and APEX; add seven previously absent research manuscript records (post-hoc calibration, grid isoperimetry, examination anxiety, BR-GCF, Certified RASC, PRISM, Somno framework). Exact titles used for Trace Corpus, GRIT and Boolean quantization. Link Somno to its paper group. Main and legacy archives remain synchronized; 58 records total, 26 research. No private Drive sharing change; no unpublished/coauthored drafts copied to production. Prior inventory CI and deployment both passed. New static and CI checks added; new deployment pending.

## Direct project websites and live demos

Audited project README links and live Pages destinations. Added verified landing pages and workspaces for Hush, Lucent, Kernellum, AgnXiv verifier and Green Groove design portfolio; all 25 small engineering libraries now have individual live demo links alongside source. Kernellum custom-domain HTTPS failed certificate validation; its verified HTTP pages are clearly marked. CR-ZNE hosted animation returned 404; retained repository source only. No invented site URLs, no changes to 58 records or approved artwork/layout. Homepage and legacy archives synchronized. CI and Pages pending.

## HAA proof-of-work layer — 27 November 2026

Research synthesis indicates the homepage should remain visually quiet while 1–3 standalone links carry deep proof. Implement three permanent case-study routes: Somno, Kernellum/K1 and agnXiv. Each page uses actual public artifacts, exact claim boundaries, current state, external proof links, and explicit unresolved gates rather than decorative portfolio copy. Somno uses public product screenshots; K1 renders the frozen per-workload route result directly from committed validation values; agnXiv surfaces release assets, production-gate metrics and a documented v0.2 blocker that prevented premature publication. Homepage selection now points to these case studies, while the 58-entry archive remains intact. Add a three-question Now section, five-entry source-linked shipping/research log, sitemap entries and a minimal custom 404. No user-authored personal motive or application essay text was invented. New regression coverage renders all three pages at 390px/1440px, validates evidence/media and the 404 route. Trail remains homepage-only and the ten approved assets are untouched. CI and Pages pending.

### Release-hygiene correction

Corrected three inconsistencies found during the flagship rollout: robots.txt now contains actual line breaks; custom 404 assets/home link use absolute /portfolio/ paths so deep missing URLs render correctly on GitHub Pages; README now documents the shipped passive touch trail instead of the obsolete desktop-only behavior. Local smoke checks 404.html directly because Python http.server does not emulate GitHub Pages custom-404 fallback; production missing-route behavior must be verified after deployment.
