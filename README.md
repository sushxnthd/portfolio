# Sushanth Dasari — Research & Engineering

[Personal research archive](https://sushxnthd.github.io/portfolio/) · [Evidence ledger](EVIDENCE.md) · [Design research](DESIGN_DIRECTION.md)

The site is an editorial, vertical archive of 26 research, software, lab and recognition records. The old horizontal card-deck layout has been retired. Selected work is visible immediately; every entry has a stable deep link and direct source links where available.

The site is plain HTML and CSS with a small optional navigation enhancement. No build, frameworks, external font or tracking scripts are required. Concept diagrams are explicitly illustrative; Somno product artwork comes from its own repository.

## Preview and verification

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. To run the browser suite:

```sh
npm install --no-save playwright@1.56.1
npx playwright install chromium
node tests/smoke.mjs
```

GitHub Actions uses Ubuntu 24.04 and runs JavaScript syntax checks followed by the browser suite. Deployment and verification statuses are independent. See the evidence ledger for qualification of author-reported milestones and research claims.
