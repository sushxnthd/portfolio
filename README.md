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

The site supports light, dark and system color schemes. The small footer control stores the choice locally; the system preference works without JavaScript. Use `?theme=dark` to open the dark theme explicitly.

The homepage includes an ephemeral image trail made of local project artwork. It only responds to a desktop mouse, honors reduced motion, and can be disabled with the Trail control in the footer.

[Field studies](https://sushxnthd.github.io/portfolio/art/) contains 14 original vector compositions. The artwork is abstract and does not represent experimental data. The homepage trail uses those assets and a directional disappearing animation; the previous screenshots are no longer used by the site.
