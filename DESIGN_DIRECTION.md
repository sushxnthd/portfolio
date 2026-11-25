# Design direction — Personal Research Archive

Supersedes the horizontal card-deck concept. November 26, 2026.

## Research

- Andrej Karpathy (https://karpathy.ai/): clearly identifies the person and foregrounds work rather than ornamental interaction.
- Distill (https://distill.pub/): article-oriented scientific communication and diagrams tied to concepts.
- Maggie Appleton (https://maggieappleton.com/): distinguishes exploratory notes from developed essays; a personal archive can evolve without pretending everything is final.
- Chris Olah (https://colah.github.io/): organizes work by substantive topics and labels rough notes.
- Anthropic Research (https://www.anthropic.com/research): separates research themes and concrete findings in an editorial index.
- Steph Ango (https://stephango.com/): restrained typography, dated work, and uncluttered structure.
- Nielsen Norman Group (https://www.nngroup.com/articles/how-users-read-on-the-web/ and https://www.nngroup.com/articles/progressive-disclosure/): scan-friendly hierarchy, descriptive links, and progressive detail.
- WCAG 2.2 reference (https://www.w3.org/WAI/WCAG22/quickref/): design target, not a certification.

These sources motivate design decisions; the site is not a replica or a claim that any layout guarantees admissions outcomes.

## Visual system

Warm paper #f8f7f1, near-black #20251f, pine #355841, quiet hairlines. Georgia for editorial hierarchy, system sans for body, monospace for technical annotation. No external font dependency. One normal vertical document; direct navigation, stable anchors, no hidden project cards. Desktop editorial columns become a single readable mobile column. Explicit captions distinguish conceptual figures from results, and the Somno artwork is sourced from its actual repository.

## Information architecture

An introduction identifies the student researcher and three questions of interest. Selected research features CopyCAT and CR-ZNE, followed by the eight remaining research records; software features Somno, and labs/ventures features agnXiv. Recognition is an index rather than a trophy wall. The homepage preserves all 26 earlier entries, direct artifacts, and the evidence ledger, including existing project hashes.

The core presentation is HTML and CSS, available without JavaScript. JavaScript only enhances current navigation indication. No tracking, external scripts, or scroll hijacking.

## QA

Browser regression tests check 360/390/768/1280/1440px, no-JS, direct hashes, no horizontal overflow, unique IDs and all 26 visible records. The design should also receive independent screenshot-level and assistive-technology review before claiming fully verified accessibility. The live product screenshot is a public cross-repository image and depends on that repository's availability.
