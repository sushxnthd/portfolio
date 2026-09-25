# Sushanth Dasari — HAA application portfolio

A static, dependency-free proof-of-work portfolio built for a fast technical review.

**Live URL target:** https://sushxnthd.github.io/portfolio/

## Design principle

The site is ordered by inspectability rather than by résumé prestige:

1. strongest public quantitative evidence;
2. exact experimental boundaries;
3. preserved failures and negative results;
4. shipped product evidence;
5. current hypotheses labeled as hypotheses;
6. concrete next pursuits.

The current hierarchy is:

- **Kernellum** — AI-native computer architecture research with routed physical-design feedback;
- **Theorica** — autonomous experimental science / structure discovery;
- **Somno** — shipped Android fatigue-awareness product;
- **Lucent** — current five-second human-state sensing research target.

See [EVIDENCE.md](EVIDENCE.md) for claim-to-source provenance.

## Local preview

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Deployment

The repository deploys through `.github/workflows/pages.yml`. GitHub Pages is enabled and the production deployment is live at https://sushxnthd.github.io/portfolio/.

## Editing rule

Do not add a quantitative claim to the homepage unless its source is linked in `EVIDENCE.md`, or the copy clearly labels it as an in-progress hypothesis / personal background statement.
