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

## Selected personal milestones

These are biographical claims reported by the portfolio author, distinct from the public, repository-verifiable experimental metrics above. Public organizer-specific verification links or primary acceptance notices should be attached when available.

- **AIYES Fall 2026 Gold:** Somno; award reported by the author. Organizer: https://www.aiyes.org/. Public individual award citation not yet linked here.
- **QHack 2026:** 23/23 coding challenges completed; captured leaderboard snapshot showed 13th out of 1,651 teams. Contest information: https://qhack.ai/. This is a **provisional screenshot-based placement**, not a certified final organizer result.
- **IEEE ICA 2026:** Sole-authored research paper accepted for presentation, as reported by the author. Public proceedings / accepted-paper page not yet linked. Do not equate acceptance with publication or in-person presentation.

The portfolio keeps these recognitions lower on the page. The main project-specific quantitative results above have public primary artifacts.

## Publication status

- **IEEE BigData 2026:** regular-paper acceptance for the Trace Corpus research, author-reported; 25,031 trajectories and 654,021 steps as reported by the author. The public manuscript and official proceedings link are not yet attached. Acceptance is not the same as publication or presentation.
- **IEEE ICA 2026 / GRIT:** paper on refinement-invariant agent evaluation, acceptance reported by the author. Public manuscript and proceedings links are pending.
- **CopyCAT:** [repository, manuscript, data lineage and certificates](https://github.com/sushxnthd/copyCAT); [supplementary compilation](https://github.com/sushxnthd/copyCAT/actions/runs/43876320841). The pinned MMLU-ProX-Lite archive covers 588 aligned questions and ten configurations. No acceptance is claimed.
- **ScholarQA-CS2 audit:** [research workspace](https://github.com/sushxnthd/sandboxedwchatgpt), [reproduction run](https://github.com/sushxnthd/sandboxedwchatgpt/actions/runs/44152138841). The manuscript is a workshop submission; no acceptance is claimed.
- **CR-ZNE:** [animation and project materials](https://github.com/sushxnthd/crzne-speedrun). The animation is not a substitute for the manuscript; no public manuscript link is asserted.

## Additional software and research

- [Hush](https://github.com/sushxnthd/hush): browser early access, native release candidate. See its [launch checklist](https://github.com/sushxnthd/hush/blob/main/PRODUCTION_LAUNCH_CHECKLIST.md) for unresolved external gates.
- [agnXiv](https://github.com/sushxnthd/agnXiv): public beta; verification is claim- and evidence-specific. [Production gates](https://github.com/sushxnthd/agnXiv/blob/main/docs/PRODUCTION_READINESS.md).
- [Orynt](https://github.com/sushxnthd/orynt): deployable foundation and synthetic demo; external school pilot and review are not established.
- [Lattice](https://github.com/sushxnthd/lattice): research agenda, not a finished language or compiler.
- [Lucent](https://github.com/sushxnthd/lucent), [NOESIS](https://github.com/sushxnthd/noesis), [Vektor](https://github.com/sushxnthd/vektor): ongoing research programs. No clinical validation, general algorithm certificate, or physical GPU performance is asserted.
- [Green Groove](https://github.com/sushxnthd/greengroove): repository documents the PRAYAAS selection, ₹50,000 development grant and IIT Delhi association. This is project-reported evidence; no enrollment, independent field validation or commercial traction is claimed.
- [Evalrift](https://github.com/sushxnthd/evalrift), [Flowseal](https://github.com/sushxnthd/flowseal-agent), [Shiftglass](https://github.com/sushxnthd/shiftglass): focused open-source implementations with tests and benchmark examples; no claim of external adoption.

## Selected recognition

AIYES Gold and QHack are scoped in the personal milestones above. Additional author-reported milestones (primary organizer records not publicly linked):

- IRIS National Fair 2026–27: national finalist in Physics. No award or ISEF qualification claimed.
- ARSSDC 2024: runner-up; team qualified for ISSDC international finals through resubmission. Qualification does not imply attendance or an award at the finals.
- NCERT PRAYAAS: Green Groove grant and selection as documented in its repository.

Last content review: 26 November 2026. Replace author-reported labels only after attaching public primary evidence.

## Comprehensive inventory expansion — 27 November 2026

Research and earlier work added from the author's academic CV, prior author-reported records and available manuscripts. Boolean quantization manuscript and coauthored CR-ZNE draft were inspected; no public PDF URL was verified for those drafts. Other manuscript titles/statuses remain author-reported until their canonical artifacts are attached. Environmental AI preprint: https://doi.org/10.6084/m9.figshare.29791091 . CopyCAT and Kernellum PDFs linked from public repository trees. AIYES Gold independently supported by https://aiyes.org/fall-2026-winners (Somno, one of 11 Gold projects). New competition and program records are author-reported unless explicitly marked otherwise. HSS acceptance was previously reported but later dropped; do not count it as an active conference acceptance. Exclude awards known to belong to someone else; exclude applications without acceptance. All 25 publicly listed small engineering repositories linked individually, using repository descriptions only; no adoption or independent impact claims. Private manuscripts and certificates are not uploaded without checking their shareable version and publication/coauthor constraints.
