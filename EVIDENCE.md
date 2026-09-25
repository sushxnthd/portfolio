# Evidence ledger

This file maps quantitative claims on the portfolio to public artifacts in the source repositories. It is intentionally conservative: routed FPGA timing is not described as physical-board measurement, and novelty claims are kept within the boundaries stated in the project repositories.

## Kernellum

**Portfolio claim:** 36/36 unseen routed deployment cases beat the best broadcast-only implementation; mean workload-latency improvement 23.56%; mean regret versus the full routed oracle 1.44%.

- Source: https://github.com/sushxnthd/kernellum/blob/main/docs/SIMILARITY_PORTFOLIO_CONFIRMATION_REPORT.md
- Project README: https://github.com/sushxnthd/kernellum

**Portfolio claim:** active search improved the routed optimum on 12/12 Transformer GEMMs while equal-budget random improved 0/12.

- Source: https://github.com/sushxnthd/kernellum/blob/main/docs/K1_CLOSED_LOOP_REPORT.md
- Boundary: latency values use the K1 kernel cycle model and final-routed Fmax; they are not measurements from a physical FPGA board.

**Next gate:** K2 physical execution.

- Source: https://github.com/sushxnthd/kernellum/blob/main/docs/K2_PLAN.md

## Theorica

**Portfolio claim:** public cross-family v1.2 challenge reconstructed 345/345 eligible task/repeat cases and made 0/150 false acceptances; adaptive median table fraction queried was 13.021%.

- Source: https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_2_REPORT.md
- Clean workflow: https://github.com/sushxnthd/theorica/actions/runs/36138175775

**Portfolio claim:** v1.1 failed at 297/345 eligible cases before the scientific behavior was changed and rerun.

- Source: https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_1_FAILURE.md

**Portfolio claim:** external BOC holdout produced 1,100/1,100 correct accept/reject decisions and 500/500 exact reconstructions among accepted cases.

- Source: https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_BREAKTHROUGH_REPORT.md

**Novelty boundary:** broader novelty and query-efficiency claims were invalidated by a hostile external audit. The surviving translation-base result is described as a plausible first-priority methodological contribution, not certified first-publication priority.

- Audit: https://github.com/sushxnthd/theorica/blob/main/results/EXTERNAL_FALSIFICATION_REPORT.md
- Method note: https://github.com/sushxnthd/theorica/blob/main/docs/TRANSLATION_BASE_RECONSTRUCTION.md

## Somno

**Portfolio claim:** public Android v27 release and APK exist.

- Repository: https://github.com/sushxnthd/somno
- Release: https://github.com/sushxnthd/somno/releases/tag/v27
- APK: https://github.com/sushxnthd/somno/releases/download/v27/somno-v27-release.apk
- Product site: https://sushxnthd.github.io/somno/

**Portfolio claim:** Somno combines reaction-time performance, on-device facial/ocular features, subjective sleepiness, and recent sleep history; raw face images are not retained for cloud sync.

- Source: https://github.com/sushxnthd/somno/blob/main/README.md

## Lucent

Lucent is presented as an in-progress research hypothesis. The portfolio explicitly does **not** claim that five-second functional-state inference has been validated.

## Additional research

The calibration, computer-vision, and AI-infrastructure items are presented as research directions rather than publication-status claims. Public links should be added here when canonical paper or code artifacts are available.
