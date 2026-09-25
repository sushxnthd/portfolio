
const PROJECTS = {
  kernellum: {
    title: "Kernellum",
    titleParts: ["KERNEL", "LUM"],
    year: "2026",
    type: "AI × Hardware",
    code: "PROJECT_001",
    status: "STATUS: ACTIVE",
    resultA: ["HELD-OUT DEPLOYMENT", "36 / 36 route-aware wins"],
    resultB: ["MEAN LATENCY", "23.56% improvement"],
    description: "Kernellum asks whether automated architecture search can choose accelerator designs whose predicted advantages survive synthesis and place-and-route. The current system closes the loop between analytical search, RTL, routing, and physical-design feedback.",
    boundary: "The current evidence is final-route FPGA evidence, not board-measured latency, power, energy, or thermal performance. K2 is the next physical validation gate.",
    theme: "kernellum",
    windowTitle: "KERNELLUM://ROUTED_RESULTS",
    windowHtml: [
      '<div class="terminal-line"><span>QUERY</span><b>route-aware portfolio / held-out deployment</b></div>',
      '<div class="terminal-line"><span>ROUTES</span><b>72 / 72 completed</b></div>',
      '<div class="terminal-big">36 / 36 unseen deployment wins</div>',
      '<div class="terminal-line"><span>DELTA</span><b>23.56% mean workload-latency improvement</b></div>',
      '<div class="terminal-grid">',
      '<div><small>ORACLE REGRET</small><strong>1.44%</strong></div>',
      '<div><small>ACTIVE SEARCH</small><strong>12 / 12</strong></div>',
      '<div><small>RANDOM</small><strong>0 / 12</strong></div>',
      '</div>'
    ].join(""),
    links: [
      ["Repository", "https://github.com/sushxnthd/kernellum"],
      ["Portfolio confirmation", "https://github.com/sushxnthd/kernellum/blob/main/docs/SIMILARITY_PORTFOLIO_CONFIRMATION_REPORT.md"],
      ["K1 closed-loop report", "https://github.com/sushxnthd/kernellum/blob/main/docs/K1_CLOSED_LOOP_REPORT.md"]
    ]
  },
  theorica: {
    title: "Theorica",
    titleParts: ["THEO", "RICA"],
    year: "2026",
    type: "Autonomous Science",
    code: "PROJECT_002",
    status: "STATUS: ACTIVE",
    resultA: ["PUBLIC HOLDOUT", "345 / 345 exact reconstructions"],
    resultB: ["OUT-OF-PROMISE", "0 / 150 false acceptances"],
    description: "Theorica studies whether an AI scientist can infer hidden structure, choose informative interventions, and revise its representation when the current one breaks. A translation-base branch reconstructs finite black-box operations without starting from named algebraic families.",
    boundary: "Several broad novelty and query-efficiency claims were killed by an external falsification audit. The surviving translation-base claim is deliberately narrower and still needs independent priority and reproduction scrutiny.",
    theme: "theorica",
    windowTitle: "THEORICA://TRANSLATION_BASE",
    windowHtml: [
      '<div class="math-screen">',
      'F : S × S → S<br><br>',
      'L<sub>x</sub>(y) = F(x,y)<br><br>',
      'translations → permutation action<br>',
      'action → base signature<br>',
      'base signature → table reconstruction<br><br>',
      'conditional query bound: n(r+b)',
      '</div>',
      '<div class="terminal-grid">',
      '<div><small>V1.1</small><strong>297/345</strong></div>',
      '<div><small>V1.2</small><strong>345/345</strong></div>',
      '<div><small>FALSE ACCEPT</small><strong>0/150</strong></div>',
      '</div>'
    ].join(""),
    links: [
      ["Repository", "https://github.com/sushxnthd/theorica"],
      ["v1.2 report", "https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_2_REPORT.md"],
      ["Preserved v1.1 failure", "https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_1_FAILURE.md"],
      ["External falsification", "https://github.com/sushxnthd/theorica/blob/main/results/EXTERNAL_FALSIFICATION_REPORT.md"]
    ]
  },
  somno: {
    title: "Somno",
    titleParts: ["SOM", "NO"],
    year: "2026",
    type: "Mobile AI",
    code: "PROJECT_003",
    status: "STATUS: SHIPPED",
    resultA: ["ANDROID", "Public v27 release"],
    resultB: ["PRIVACY", "Raw face images not retained"],
    description: "Somno is a privacy-first Android system for understanding fatigue relative to a personal alert baseline. It combines reaction-time performance, on-device facial and ocular features, subjective sleepiness, and recent sleep history into a transparent state estimate.",
    boundary: "Somno is a consumer fatigue-awareness system, not a substitute for a clinical sleep study. The interesting engineering work is the personal baseline, multimodal fusion, privacy, alarms, and device-level reliability.",
    theme: "somno",
    windowTitle: "SOMNO://ANDROID_BUILD_V27",
    windowHtml: [
      '<img class="somno-shot" src="https://raw.githubusercontent.com/sushxnthd/somno/main/listing/play/result.png" alt="Somno fatigue result screen">',
      '<div class="terminal-grid">',
      '<div><small>BUILD</small><strong>v27</strong></div>',
      '<div><small>SIGNALS</small><strong>4</strong></div>',
      '<div><small>PLATFORM</small><strong>ANDROID</strong></div>',
      '</div>'
    ].join(""),
    links: [
      ["Product site", "https://sushxnthd.github.io/somno/"],
      ["v27 release", "https://github.com/sushxnthd/somno/releases/tag/v27"],
      ["APK", "https://github.com/sushxnthd/somno/releases/download/v27/somno-v27-release.apk"],
      ["Repository", "https://github.com/sushxnthd/somno"]
    ]
  },
  lucent: {
    title: "Lucent",
    titleParts: ["LUC", "ENT"],
    year: "2026",
    type: "Human Sensing",
    code: "PROJECT_004",
    status: "STATUS: EXPERIMENT",
    resultA: ["TARGET", "5 seconds of face video"],
    resultB: ["QUESTION", "What signal actually survives?"],
    description: "Lucent starts from an aggressive interface constraint: can five seconds of face video reveal useful information about a person's current functional state without a wearable or a long task?",
    boundary: "Five seconds is a research target, not a validated breakthrough. The next useful result is a preregistered study that tests which outcomes can actually be predicted and how performance degrades as the clip gets shorter.",
    theme: "lucent",
    windowTitle: "LUCENT://CAPTURE_00:05",
    windowHtml: [
      '<div class="scan-face"></div>',
      '<div class="terminal-line"><span>CAPTURE</span><b>5.00 seconds</b></div>',
      '<div class="terminal-line"><span>STATE</span><b>hypothesis under test</b></div>',
      '<div class="terminal-line"><span>NEXT</span><b>preregister → collect → baseline → falsify</b></div>'
    ].join(""),
    links: [["GitHub profile", "https://github.com/sushxnthd"]]
  },
  calibration: {
    title: "Calibration",
    titleParts: ["CALI", "BRATION"],
    year: "2026",
    type: "ML Reliability",
    code: "RESEARCH_005",
    status: "STATUS: RESEARCH",
    resultA: ["FOCUS", "Post-hoc calibration under ties"],
    resultB: ["TOOLS", "Selective risk + AURC"],
    description: "A line of work on what post-hoc calibration actually preserves when confidence scores have ties, including finite-sample characterization, selective-risk behavior, AURC envelopes, and diagnostics.",
    boundary: "This archive entry describes an active research direction rather than a publication-status claim. Canonical public artifacts will be linked when the work is finalized.",
    theme: "calibration",
    windowTitle: "CALIBRATION://TIE_DIAGNOSTICS",
    windowHtml: [
      '<div class="terminal-line"><span>INPUT</span><b>confidence scores with ties</b></div>',
      '<div class="terminal-line"><span>CHECK</span><b>selective risk / coverage ordering</b></div>',
      '<div class="terminal-big">calibration ≠ ranking preservation</div>',
      '<div class="terminal-grid">',
      '<div><small>OBJECT</small><strong>AURC</strong></div>',
      '<div><small>REGIME</small><strong>FINITE N</strong></div>',
      '<div><small>MODE</small><strong>POST-HOC</strong></div>',
      '</div>'
    ].join(""),
    links: [["GitHub profile", "https://github.com/sushxnthd"]]
  },
  vision: {
    title: "Vision Research",
    titleParts: ["VIS", "ION"],
    year: "2026",
    type: "Computer Vision",
    code: "RESEARCH_006",
    status: "STATUS: RESEARCH",
    resultA: ["PIPELINE", "Segmentation + morphometrics"],
    resultB: ["DOMAIN", "Blood-pattern measurement"],
    description: "Computer-vision work using segmentation and morphometrics to make blood-pattern analysis more quantitative: isolate stains, measure geometry, and turn image structure into reproducible features.",
    boundary: "The focus is measurement methodology and reproducibility. This entry does not present computer vision as a replacement for expert forensic interpretation.",
    theme: "vision",
    windowTitle: "VISION://MORPHOMETRICS",
    windowHtml: [
      '<div class="terminal-line"><span>STAGE_01</span><b>segment candidate stain</b></div>',
      '<div class="terminal-line"><span>STAGE_02</span><b>extract contour / ellipse / orientation</b></div>',
      '<div class="terminal-line"><span>STAGE_03</span><b>aggregate morphometrics</b></div>',
      '<div class="terminal-big">pixels → measurements</div>',
      '<div class="terminal-grid">',
      '<div><small>MODE</small><strong>VISION</strong></div>',
      '<div><small>OUTPUT</small><strong>FEATURES</strong></div>',
      '<div><small>GOAL</small><strong>REPRODUCE</strong></div>',
      '</div>'
    ].join(""),
    links: [["GitHub profile", "https://github.com/sushxnthd"]]
  }
};

const rail = document.getElementById("mediaRail");
const items = Array.from(document.querySelectorAll(".media-item"));
const takeover = document.getElementById("takeover");
const indexPanel = document.getElementById("indexPanel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let mode = "work";
let activeId = "kernellum";
let scrollFrame = 0;
let dragging = false;
let dragStartX = 0;
let dragStartScroll = 0;
let dragMoved = false;

function visibleItems() {
  return items.filter(function (item) {
    return !item.hidden;
  });
}

function activeItem() {
  return items.find(function (item) {
    return item.dataset.project === activeId;
  }) || visibleItems()[0];
}

function projectOf(id) {
  return PROJECTS[id || activeId];
}

function centerItem(item, smooth) {
  if (!item) return;
  const target = item.offsetLeft + item.offsetWidth / 2 - rail.clientWidth / 2;
  rail.scrollTo({
    left: target,
    behavior: smooth && !reducedMotion ? "smooth" : "auto"
  });
}

function updateActive(item, center) {
  if (!item || item.hidden) return;

  items.forEach(function (candidate) {
    candidate.classList.toggle("is-active", candidate === item);
  });

  activeId = item.dataset.project;
  const project = projectOf();

  document.getElementById("readoutTitle").textContent = project.title;
  document.getElementById("readoutYear").textContent = project.year;
  document.getElementById("readoutType").textContent = project.type;
  document.getElementById("resultSourceA").textContent = project.resultA[0];
  document.getElementById("resultQuoteA").textContent = project.resultA[1];
  document.getElementById("resultSourceB").textContent = project.resultB[0];
  document.getElementById("resultQuoteB").textContent = project.resultB[1];

  const visible = visibleItems();
  const index = visible.indexOf(item);
  document.getElementById("itemReadout").textContent =
    String(index + 1).padStart(2, "0") + " / " + String(visible.length).padStart(2, "0");

  if (center) centerItem(item, true);
}

function setMode(nextMode, targetId) {
  mode = nextMode;

  document.querySelectorAll(".nav-tab[data-mode]").forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });

  items.forEach(function (item) {
    item.hidden = item.dataset.kind !== mode;
  });

  const candidates = visibleItems();
  const desired = candidates.find(function (item) {
    return item.dataset.project === targetId;
  }) || candidates[0];

  if (desired) {
    updateActive(desired, false);
    requestAnimationFrame(function () {
      centerItem(desired, false);
    });
  }

  document.getElementById("modeReadout").textContent = mode.toUpperCase();
}

function detectNearest() {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(function () {
    const railRect = rail.getBoundingClientRect();
    const center = railRect.left + railRect.width / 2;
    let nearest = null;
    let distance = Infinity;

    visibleItems().forEach(function (item) {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const delta = Math.abs(itemCenter - center);
      if (delta < distance) {
        distance = delta;
        nearest = item;
      }
    });

    if (nearest && nearest.dataset.project !== activeId) {
      updateActive(nearest, false);
    }
  });
}

function moveActive(direction) {
  const visible = visibleItems();
  const current = visible.indexOf(activeItem());
  const next = Math.max(0, Math.min(visible.length - 1, current + direction));
  if (visible[next]) updateActive(visible[next], true);
}

function openProject(id) {
  const project = PROJECTS[id || activeId];
  if (!project) return;

  activeId = id || activeId;
  takeover.className = "takeover theme-" + project.theme + " is-open";
  takeover.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  document.getElementById("takeoverCode").textContent = project.code;
  document.getElementById("takeoverStatus").textContent = project.status;
  document.getElementById("takeoverTitle").innerHTML =
    "<span>" + project.titleParts[0] + "</span><span>" + project.titleParts[1] + "</span>";
  document.getElementById("takeoverTitle").setAttribute("aria-label", project.title);
  document.getElementById("windowTitle").textContent = project.windowTitle;
  document.getElementById("windowContent").innerHTML = project.windowHtml;
  document.getElementById("takeoverDescription").textContent = project.description;
  document.getElementById("takeoverBoundary").textContent = project.boundary;
  document.getElementById("takeoverFooter").textContent =
    "SUSHANTH.DASARI / " + project.code;

  const links = document.getElementById("takeoverLinks");
  links.innerHTML = "";

  project.links.forEach(function (entry) {
    const anchor = document.createElement("a");
    anchor.href = entry[1];
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = entry[0] + " ↗";
    links.appendChild(anchor);
  });
}

function closeProject() {
  takeover.classList.remove("is-open");
  takeover.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function stepProject(direction) {
  const all = visibleItems();
  let index = all.findIndex(function (item) {
    return item.dataset.project === activeId;
  });

  if (index < 0) index = 0;
  index = (index + direction + all.length) % all.length;

  const item = all[index];
  updateActive(item, true);
  openProject(item.dataset.project);
}

function openIndex() {
  indexPanel.classList.add("is-open");
  indexPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeIndex() {
  indexPanel.classList.remove("is-open");
  indexPanel.setAttribute("aria-hidden", "true");
  if (!takeover.classList.contains("is-open")) {
    document.body.style.overflow = "";
  }
}

function jumpTo(id) {
  const item = items.find(function (candidate) {
    return candidate.dataset.project === id;
  });

  if (!item) return;

  if (item.dataset.kind !== mode) {
    setMode(item.dataset.kind, id);
  } else {
    updateActive(item, false);
    requestAnimationFrame(function () {
      centerItem(item, true);
    });
  }

  closeIndex();
}

function updateClock() {
  const now = new Date();
  const pad = function (value) {
    return String(value).padStart(2, "0");
  };

  document.getElementById("systemClock").textContent =
    pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
}

rail.addEventListener("scroll", detectNearest, { passive: true });

rail.addEventListener("wheel", function (event) {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    rail.scrollLeft += event.deltaY;
  }
}, { passive: false });

rail.addEventListener("pointerdown", function (event) {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  dragging = true;
  dragMoved = false;
  dragStartX = event.clientX;
  dragStartScroll = rail.scrollLeft;
  rail.classList.add("is-dragging");

  if (rail.setPointerCapture) {
    rail.setPointerCapture(event.pointerId);
  }
});

rail.addEventListener("pointermove", function (event) {
  if (!dragging) return;

  const delta = event.clientX - dragStartX;
  if (Math.abs(delta) > 7) dragMoved = true;
  rail.scrollLeft = dragStartScroll - delta * 1.15;
});

function finishDrag(event) {
  if (!dragging) return;

  dragging = false;
  rail.classList.remove("is-dragging");

  if (rail.releasePointerCapture) {
    try {
      rail.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Pointer capture may already be released by the browser.
    }
  }

  window.setTimeout(function () {
    centerItem(activeItem(), true);
  }, 20);
}

rail.addEventListener("pointerup", finishDrag);
rail.addEventListener("pointercancel", finishDrag);

items.forEach(function (item) {
  const button = item.querySelector(".disc-button");

  button.addEventListener("click", function (event) {
    if (dragMoved) {
      event.preventDefault();
      dragMoved = false;
      return;
    }

    updateActive(item, true);

    window.setTimeout(function () {
      openProject(item.dataset.project);
    }, reducedMotion ? 0 : 180);
  });

  item.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      updateActive(item, true);
      openProject(item.dataset.project);
    }
  });
});

document.querySelectorAll(".nav-tab[data-mode]").forEach(function (button) {
  button.addEventListener("click", function () {
    setMode(button.dataset.mode);
  });
});

document.getElementById("openIndex").addEventListener("click", openIndex);
document.getElementById("closeIndex").addEventListener("click", closeIndex);
document.getElementById("closeTakeover").addEventListener("click", closeProject);
document.getElementById("prevProject").addEventListener("click", function () {
  stepProject(-1);
});
document.getElementById("nextProject").addEventListener("click", function () {
  stepProject(1);
});

document.querySelectorAll("[data-jump]").forEach(function (button) {
  button.addEventListener("click", function () {
    jumpTo(button.dataset.jump);
  });
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (takeover.classList.contains("is-open")) {
      closeProject();
    } else if (indexPanel.classList.contains("is-open")) {
      closeIndex();
    }
    return;
  }

  if (indexPanel.classList.contains("is-open")) return;

  if (takeover.classList.contains("is-open")) {
    if (event.key === "ArrowLeft") stepProject(-1);
    if (event.key === "ArrowRight") stepProject(1);
    return;
  }

  if (event.key === "ArrowLeft") moveActive(-1);
  if (event.key === "ArrowRight") moveActive(1);
  if (event.key === "Enter") openProject();
});

window.setInterval(updateClock, 1000);
updateClock();

function initializeArchive() {
  setMode("work", "kernellum");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeArchive, { once: true });
} else {
  initializeArchive();
}

window.addEventListener("resize", function () {
  centerItem(activeItem(), false);
});
