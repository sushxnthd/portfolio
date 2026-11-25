# Sushanth Dasari

[Portfolio](https://sushxnthd.github.io/portfolio/) · [Evidence ledger](EVIDENCE.md) · [Design direction](DESIGN_DIRECTION.md)

A deliberately quiet personal website. The homepage introduces the researcher and links to selected work. The complete record is organized in Research, Building, Projects and Recognition.

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
