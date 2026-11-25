# Sushanth Dasari / Portfolio

[Public portfolio](https://sushxnthd.github.io/portfolio/) · [Evidence ledger](EVIDENCE.md) · [Design direction](DESIGN_DIRECTION.md)

A curated, single-track portfolio of independent research, software, labs and selected recognition. The existing horizontal filing-stack design is preserved: a category opens its child cards into the same rail, and only one deck stays open.

## Structure

- Research: 10 papers and experiments, including CopyCAT, the ScholarQA-CS2 audit, accepted-paper records, and ongoing research.
- Projects: 5 cards covering Somno, Hush, Orynt, Lattice and focused open-source tools.
- Labs & ventures: 3 cards.
- Recognition: 5 cards, with author-reported distinctions and limitations.
- Elsewhere: 3 cards for source, provenance and public contact.

## Interaction

Native horizontal overflow supports trackpads and touch; vertical desktop wheel input is translated into horizontal movement when appropriate. Mouse drag is available on non-interactive surfaces. Category and individual-card hashes are shareable. The rail supports keyboard arrow navigation, Escape closes a deck, and closed drawers are inert. Reduced motion, a short-viewport vertical layout and a no-JavaScript vertical content fallback are included.

## Run locally

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. For the browser suite:

```sh
npm install --no-save playwright@1.56.1
npx playwright install chromium
node tests/smoke.mjs
```

The browser suite checks actual chapter and card counts, keyboard focus, inert drawers, hash navigation, scrolling, mobile sizes, reduced motion and no-JavaScript fallback. GitHub Actions runs it on main. Deployment status and test status are independent until the workflows report success.

Content is in `index.html`, styling in `styles.css`, interaction in `script.js`. The evidence ledger records the boundaries of research and recognition claims; do not substitute acceptance for publication or prototype status for validation.
