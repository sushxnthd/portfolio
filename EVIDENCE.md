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
- **ScholarQA-CS2 audit:** submission workspace is currently private. The manuscript is a workshop submission; no acceptance is claimed.
- **CR-ZNE:** coauthored project workspace is currently private. No public manuscript link is asserted; the portfolio does not substitute an animation or inaccessible repository for the paper.

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

## Canonical author PDF audit — 27 November 2026

Checked public-access permissions (anyone with link, reader) and manuscript text/author on nine existing Google Drive PDFs. These are author-distributed versions, not asserted versions of record. No Drive permissions modified.

- **Identifying Estimability and Structural Degeneracy in Forensic Kinematic Inversion via Stochastic Physics Simulation and Calibrated Uncertainty Quantification** — [Author manuscript PDF](https://drive.google.com/file/d/1RhVkRzfDlCAXyq7Z2ctrbQgYVyDNVE_f/view?usp=drivesdk).
- **Designing an Orbital Compute Fabric for Planetary-Scale Artificial Intelligence Systems** — [Author manuscript PDF](https://drive.google.com/file/d/1yoIXUL6lQo1_kR0fU3iF0eYVXHN-InqN/view?usp=drivesdk).
- **Post-Hoc Calibration Can Degrade Selective Prediction Performance** — [Author manuscript PDF](https://drive.google.com/file/d/1y1iaar3rJ8d66wlDSgEEq6jnEptdimk7/view?usp=drivesdk).
- **Minimising the Largest Surviving Component of a Grid: A Vertex-Isoperimetric Characterisation** — [Author manuscript PDF](https://drive.google.com/file/d/1G4Ml6kkFOiGbdDE6v021o-H0wXf18a88/view?usp=drivesdk).
- **Integrating Physiological Markers and Machine Learning to Assess and Reduce Examination Anxiety: An Experimental Study** — [Author manuscript PDF](https://drive.google.com/file/d/1g7EV2zNsoS3dmSg1jBU8tI8F8-tIr6k6/view?usp=drivesdk).
- **Baseline-Referenced Group-Conformal Fusion for Intermittent Multimodal Alertness Estimation on Smartphones** — [Author manuscript PDF](https://drive.google.com/file/d/1ZcSBoOxUPRB4b9RPSTw5qUkUxlZc4qBK/view?usp=drivesdk).
- **Certified Baseline-Safe Intervention Control Under Uncertain Alertness: Adaptive Snoozing as a Mobile AI Case Study** — [Author manuscript PDF](https://drive.google.com/file/d/1nn_c1NoKouD6_kq7XFiwJAHeQfPC2_8E/view?usp=drivesdk).
- **PRISM: Personal-Reference Inference with Sparse Modalities for Privacy-Preserving Mobile Sleep-Loss Assessment** — [Author manuscript PDF](https://drive.google.com/file/d/1DGqn8cH5UKk2glHPwP4cMLHPAY2ZXyYK/view?usp=drivesdk).
- **From Personal Baselines to Safe Decisions: The Somno Framework for Multimodal Functional-Readiness Inference Under Sleep Loss** — [Research report PDF](https://drive.google.com/file/d/1Q2QzIMGMDH2F7DIEHYALRLZjWTAsQvCV/view?usp=drivesdk).

The official CopyCAT and Kernellum repository PDFs remain linked, and the Environmental AI DOI remains distinguished from a direct PDF. GRIT camera-ready variants and the mechanistic-identification and Boolean quantization PDFs were located in the private file library. SplitProof's October 25 INSEF manuscript was located and its title/author verified, but is private. CR-ZNE is coauthored and its shareable final version is not established. Trace Corpus's final camera-ready PDF and the ScholarQA canonical PDF were not verified. No private file links or new public copies were published in this pass. Conference titles cross-checked with the author's public profile, not proceedings verification.

## Project website audit — 27 November 2026

Live HTTP checks returned 200 and matching titles for Somno, Hush (landing and workspace), AgnXiv (landing and verifier), Green Groove, Orynt, Lucent E002 instrument, Kernellum landing and research pages, Green Groove Behance, and all 25 engineering tool demos. Kernellum GitHub Pages redirects to http://kernellum.qd.je/; HTTPS on the custom domain returned a certificate error, so links explicitly label HTTP pending certificate repair. CR-ZNE Pages returned 404 for the root, presentation URL and motion-film page; retain the source repository but remove the unavailable animation URL. Theorica, NOESIS, Vektor, Lattice, CopyCAT and ScholarQA-CS2 conventional Pages addresses returned 404; retain source/paper links rather than infer a website. No separate public site verified for earlier projects without a repository. Demo availability is not evidence of adoption or production readiness.

- [evalrift live demo](https://sushxnthd.github.io/evalrift/)
- [flowseal-agent live demo](https://sushxnthd.github.io/flowseal-agent/)
- [shiftglass live demo](https://sushxnthd.github.io/shiftglass/)
- [trajscope-ai live demo](https://sushxnthd.github.io/trajscope-ai/)
- [faultmesh-ai live demo](https://sushxnthd.github.io/faultmesh-ai/)
- [memsieve-agent live demo](https://sushxnthd.github.io/memsieve-agent/)
- [judgeprobe-ai live demo](https://sushxnthd.github.io/judgeprobe-ai/)
- [spuriograph live demo](https://sushxnthd.github.io/spuriograph/)
- [pointworth-ml live demo](https://sushxnthd.github.io/pointworth-ml/)
- [trainpulse-ml live demo](https://sushxnthd.github.io/trainpulse-ml/)
- [slicehound live demo](https://sushxnthd.github.io/slicehound/)
- [residualforge live demo](https://sushxnthd.github.io/residualforge/)
- [odeweaver live demo](https://sushxnthd.github.io/odeweaver/)
- [invariantlens live demo](https://sushxnthd.github.io/invariantlens/)
- [meshstress live demo](https://sushxnthd.github.io/meshstress/)
- [surrogatescope live demo](https://sushxnthd.github.io/surrogatescope/)
- [prefixmint live demo](https://sushxnthd.github.io/prefixmint/)
- [routecraft-llm live demo](https://sushxnthd.github.io/routecraft-llm/)
- [batchwise-llm live demo](https://sushxnthd.github.io/batchwise-llm/)
- [quantfrontier live demo](https://sushxnthd.github.io/quantfrontier/)
- [specdraft-lab live demo](https://sushxnthd.github.io/specdraft-lab/)
- [protocolloom live demo](https://sushxnthd.github.io/protocolloom/)
- [contractshrink live demo](https://sushxnthd.github.io/contractshrink/)
- [morphcheck-ml live demo](https://sushxnthd.github.io/morphcheck-ml/)
- [orderguard-ml live demo](https://sushxnthd.github.io/orderguard-ml/)
