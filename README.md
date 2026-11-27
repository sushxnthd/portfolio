# Sushanth Dasari

[Portfolio](https://sushxnthd.github.io/portfolio/) · [Evidence ledger](EVIDENCE.md) · [Design direction](DESIGN_DIRECTION.md)

A deliberately quiet personal website. The homepage is a quiet index into three standalone flagship proof pages — Somno, Kernellum / K1 and agnXiv — plus the complete Research, Building, Projects and Recognition archive.

Plain HTML and CSS; locally hosted Inter and Newsreader under their upstream open font licenses. JavaScript is used only for old incoming project hash redirects. No build or external tracking is required.

## Preview

Run `python3 -m http.server 8000` and visit http://localhost:8000.

## Browser regression suite

```sh
npm install --no-save playwright@1.56.1
npx playwright install chromium
node tests/smoke.mjs
```

The suite tests five screen widths, all archive pages, navigation, font load, no-JavaScript fallback and produces desktop and mobile screenshots. GitHub Actions runs the suite and publishes the site.

The second visual pass refines the reading measure, type scale, mobile project list, chronology, and archive hierarchy after inspection of the original browser screenshots.

The site supports light, dark and system color schemes. The small footer control stores the choice locally; the system preference works without JavaScript. Use `?theme=dark` to open the dark theme explicitly.

The homepage includes an ephemeral image trail made of local project artwork. It only responds to a desktop mouse, honors reduced motion, and can be disabled with the Trail control in the footer.


## Flagship proof pages

- `/work/somno/` — shipped Android product, actual product media, release and research evidence.
- `/work/kernellum-k1/` — frozen routed-architecture experiment, machine-readable results and claim boundary.
- `/work/agnxiv/` — public verifier, release engineering, production gates and a preserved release blocker.

The homepage also exposes a compact current-questions section and source-linked shipping / research log. These pages are designed to stand alone when shared directly; they preserve the minimalist visual language and keep the full archive secondary.
