# Portfolio design direction — revised October 23, 2026

## The actual brief

**Rauno Freiberg's immersive horizontal navigation, with Paco Coursey's minimal aesthetic.**

This supersedes the earlier "mostly static vertical homepage with a project preview on hover" brief. That brief misunderstood the desired interface.

- **Take from Rauno:** the horizontal *architecture* of the experience. Multiple distinct, near-viewport-width scenes sit alongside one another in a continuous side-scrolling sequence. Wheel/trackpad movement advances sideways on desktop. Visitors can drag or swipe; there is quiet positional feedback and an easy path to every project.
- **Take from Paco:** the visual *expression*. White or lightly warm white canvas, natural dark text, beautifully tuned small typography, sparse headings, thoughtful spaces, almost no ornament, plain links, and genuinely concise text.
- **Do not take:** Rauno's yellow or OS dock, oversized billboard slogans, a neon accent, glowing 3D effects, decorative cards; or Paco's static vertical information architecture. This must be a blend of *different* ingredients, not an imitation of either site.

Primary references:
- Rauno: https://rauno.me/ — horizontally framed work (capture and reference also documented at https://step1.dev/gallery/dUU9wqguUj1yI8rkNLf07)
- Paco: https://paco.me/ — concise introduction, compact type, restrained link-first presentation.

## Core experience: a horizontal canvas

Imagine a very clean Paco-style personal website stretched sideways into five sections.

Desktop scene order:

**01 / INTRO**
- Left-aligned small name "Sushanth Dasari", a one- or two-sentence introduction and two simple links.
- Lots of empty white space.
- An understated "Scroll to explore →" cue and an unobtrusive thin progress indicator.
- Let part of the next scene peek in on wide screens so horizontal navigation is immediately discoverable.

**02 / KERNELLUM**
- Compact title and one-sentence explanation.
- Real routed-timing comparison figure, inspectable and sourced.
- Quick actions "Case study" and "Source".
- Avoid sales metrics disconnected from methodology.

**03 / THEORICA**
- Compact project introduction plus one inspectable real reconstruction/failure comparison (v1.1 against v1.2).
- Links to both reports and code.
- Representation matters more than a giant statistic.

**04 / SOMNO**
- Actual phone interface screenshot(s), horizontally browsable within the scene or with a focused gallery interaction.
- Clear link to APK/release and repository.

**05 / ELSEWHERE**
- Small list of research writing, verified publication/recognition references and GitHub/contact.
- No closing slogan or invented persona.

A section can occupy 70–110% of the viewport width based on content, not uniform slide-template boxes. The track should feel like a continuous, editorial space, not a PowerPoint deck.

## Visual system

- Background: #fff or a barely warm off-white, not tan paper textures.
- Ink: near-black for text, gentle grey for metadata. No multicolored sections.
- Typography: Paco-inspired confident small sans-serif (e.g. Inter/system sans), readable at 14–17px; compact headings with disciplined sizes rather than ultra-bold 100px display fonts.
- Links are obvious but quiet: restrained underlines / text hover states.
- Thin rules and project numerals are acceptable as information, not as decorative stamps.
- **Images only when they ARE the work**: real app screenshots, plots generated from actual reported data, code/code output. No stock, AI-rendered mockups, abstract tech art, decorative SVG doodles.
- A touch of interaction delight (150–250ms ease, subtle transitions) should be nearly invisible at rest.

## Interaction contract

1. Desktop wheel/trackpad movement moves through the horizontal scene track, smoothly and predictably.
2. Trackpad horizontal scrolling also works normally.
3. Drag-to-scroll works for pointer users and swipe is native on touch.
4. A tiny progress / position indicator and scene links provide a clear sense of location. Scene labels can be clicked to jump.
5. No forced easing that makes the controls feel delayed, no endlessly repeated scroll animation, and no transition that traps a user.
6. Keyboard navigation: Tab reaches all links, ArrowLeft/ArrowRight navigate the track when appropriate, and focus causes the targeted scene to scroll into view.
7. Respect prefers-reduced-motion. Deep links (#kernellum, #theorica, #somno) must open the correct position.
8. Mobile: preserve swipe-driven horizontal exploration with readable layouts and an obvious 'swipe →' hint. If viewport constraints make details hard to read, let the detail page scroll vertically while the top-level collection stays horizontal.
9. Disable horizontal wheel interception on a nested scrollable area, dialogs, or detailed tool, if any. Avoid hijacking keyboard shortcuts.
10. All essential copy and links must remain in the document and usable without JavaScript. Use native CSS overflow scrolling as a graceful fallback if motion enhancement fails.

## Detail pages

Not every long project explanation belongs inside a horizontal slide. Each project has an uncluttered dedicated case-study page linked from its scene.

- One meaningful interactive demo per project only if built from real data.
- Kernellum: plotted routed comparison from the documented experiments.
- Theorica: authentic v1.1 failure and v1.2 correction.
- Somno: accessible actual screenshot gallery, release APK, repo.
- Every result accompanied by method, limitations, source links, and no exaggerated novelty claims.

## Constraints / anti-patterns

- Never make the site a usual vertically stacked homepage with a horizontal carousel dropped into the middle.
- Never use visual flourishes to compensate for generic copy or weak actual project evidence.
- No faux handwritten notes, paper stamps, editorial magazine gimmicks, big hero typography, artificial 3D objects, neon/glowing gradients, dock replicas, or fabricated scientific diagrams.
- No client-side framework is necessary just to support horizontal scroll; prefer semantic HTML/CSS and lightweight enhancement.
- HAA reviewer should reach a real project/source in one or two interactions.

## Definition of done

- Build a true horizontally progressing homepage with an intro and three real-work scenes.
- Test actual desktop input (wheel + trackpad) and touch swipe, keyboard, resize, reduced motion and deep links.
- Check common viewports 360, 390, 768, 1280, 1440px for clipped text, overlapping panels and hidden content.
- Visually inspect **actual screenshots**, not just valid HTML / CSS.
- Preserve Google indexing schema, sitemap and canonical URL.
- Only publish a reviewed, working version; structural note alone is not implementation.

**Status:** User clarified intended art direction. Specification corrected. The deployed homepage remains unchanged pending implementation and visual testing.
