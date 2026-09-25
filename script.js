const PROJECTS = {
  kernellum: {
    eyebrow: "AI × HARDWARE · 2026",
    title: "Kernellum",
    text: "Route-aware architecture search for AI accelerators. The loop moves from analytical search to RTL, synthesis, routing, falsification, and back again.",
    stats: [["36 / 36","unseen deployment wins"],["23.56%","mean latency improvement"],["1.44%","regret vs routed oracle"]],
    links: [["Repository","https://github.com/sushxnthd/kernellum"],["Evidence","https://github.com/sushxnthd/kernellum/blob/main/docs/SIMILARITY_PORTFOLIO_CONFIRMATION_REPORT.md"]]
  },
  theorica: {
    eyebrow: "AUTONOMOUS SCIENCE · 2026",
    title: "Theorica",
    text: "An experimental AI-scientist project about discovering representations, choosing interventions, and revising a theory when the current structure fails.",
    stats: [["345 / 345","exact public reconstructions"],["0 / 150","false acceptances"],["1100 / 1100","external BOC decisions"]],
    links: [["Repository","https://github.com/sushxnthd/theorica"],["v1.2 report","https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_2_REPORT.md"]]
  },
  somno: {
    eyebrow: "MOBILE AI · 2025–26",
    title: "Somno",
    text: "A privacy-first Android system for fatigue awareness relative to a personal baseline, using reaction time, on-device facial signals, self-report, and recent sleep.",
    stats: [["v27","public Android release"],["4","signal families"],["LOCAL","raw face images"]],
    links: [["Product","https://sushxnthd.github.io/somno/"],["Repository","https://github.com/sushxnthd/somno"],["Release","https://github.com/sushxnthd/somno/releases/tag/v27"]]
  },
  lucent: {
    eyebrow: "HUMAN SENSING · 2026",
    title: "Lucent",
    text: "A deliberately aggressive sensing question: what useful information about current functional state survives when capture is compressed to five seconds of ordinary face video?",
    stats: [["00:05","target capture"],["VIDEO","single sensor"],["OPEN","validation gate"]],
    links: [["GitHub","https://github.com/sushxnthd"]]
  },
  calibration: {
    eyebrow: "ML RELIABILITY · 2024–26",
    title: "Calibration",
    text: "Research on post-hoc calibration under tied confidence scores: finite-sample behavior, selective risk, AURC envelopes, and what ranking information survives.",
    stats: [["AURC","selective risk"],["FINITE N","analysis"],["TIES","core regime"]],
    links: [["GitHub","https://github.com/sushxnthd"]]
  }
};

const state = {
  booted: false,
  booting: false,
  terminalOpen: false,
  runProgress: 0,
  timelineOpen: false,
  timelineOffset: 2.5,
  timelineZoom: 1,
  timelineDragging: false,
  dragX: 0,
  dragOffset: 0,
  stripX: 0,
  soundUnlocked: false
};

const body = document.body;
const terminalWindow = document.getElementById("terminalWindow");
const terminalOutput = document.getElementById("terminalOutput");
const terminalInput = document.getElementById("terminalInput");
const terminalForm = document.getElementById("terminalForm");
const jumpPalette = document.getElementById("jumpPalette");
const jumpInput = document.getElementById("jumpInput");
const timeline = document.getElementById("timeline");
const timelineWorld = document.getElementById("timelineWorld");
const timelineCards = Array.from(document.querySelectorAll("[data-timeline-index]"));
const timelineDetail = document.getElementById("timelineDetail");
const runBar = document.getElementById("runProgress");
const runLabel = document.getElementById("runLabel");
const runCells = document.getElementById("runCells");
const entry = document.getElementById("showcaseEntry");
const garageStrip = document.querySelector(".garage-strip");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

for (let i = 0; i < 24; i += 1) {
  runCells.appendChild(document.createElement("span"));
}

function lockIfNeeded() {
  body.classList.toggle(
    "locked",
    state.timelineOpen || jumpPalette.classList.contains("is-open")
  );
}

function scrollToSelector(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function appendTerminal(text, className="") {
  const line = document.createElement("div");
  if (className) line.className = className;
  line.textContent = text;
  terminalOutput.appendChild(line);
  const screen = document.getElementById("terminalScreen");
  screen.scrollTop = screen.scrollHeight;
}

function bootTerminal() {
  if (state.booted || state.booting) return;
  state.booting = true;
  terminalInput.disabled = true;
  terminalOutput.innerHTML = "";

  const frames = [
    [0, "SUSHANTH LAB BIOS 26.09"],
    [450, "checking project index ........ ok"],
    [950, "loading research ledger ....... ok"],
    [1450, "mounting /kernellum ........... ok"],
    [1900, "mounting /theorica ............ ok"],
    [2350, "mounting /somno ............... ok"],
    [2850, ""],
    [3150, "   _____ ____"],
    [3350, "  / ___// __ \\"],
    [3550, "  \\__ \\/ / / /"],
    [3750, " ___/ / /_/ /"],
    [3950, "/____/_____/"],
    [4300, ""],
    [4500, "AI LAB / Garage CLI"],
    [4700, "type 'help' to explore."]
  ];

  frames.forEach(([delay, text]) => {
    window.setTimeout(() => appendTerminal(text, delay >= 3150 && delay <= 3950 ? "accent" : ""), delay);
  });

  window.setTimeout(() => {
    state.booting = false;
    state.booted = true;
    terminalInput.disabled = false;
    terminalInput.focus();
  }, reducedMotion ? 40 : 4800);
}

function openTerminal() {
  state.terminalOpen = true;
  terminalWindow.classList.add("is-open");
  terminalWindow.setAttribute("aria-hidden", "false");
  bootTerminal();
  if (state.booted) terminalInput.focus();
}

function closeTerminal() {
  state.terminalOpen = false;
  terminalWindow.classList.remove("is-open");
  terminalWindow.setAttribute("aria-hidden", "true");
}

function runCommand(raw) {
  const command = raw.trim();
  if (!command) return;
  appendTerminal("sushanth@lab ~ % " + command, "dim");

  const [head, ...rest] = command.toLowerCase().split(/\s+/);
  const arg = rest.join(" ");

  if (head === "help") {
    appendTerminal("projects · timeline · research · about · contact");
    appendTerminal("screen mono · screen color · clear · github · whoami");
  } else if (head === "projects" || head === "work") {
    appendTerminal("01 somno      mobile AI / Android");
    appendTerminal("02 theorica   autonomous science");
    appendTerminal("03 kernellum  AI × hardware");
    appendTerminal("04 lucent     human sensing / experiment");
  } else if (head === "timeline" || (head === "showcase" && arg.includes("timeline"))) {
    closeTerminal();
    openTimeline();
  } else if (head === "research") {
    appendTerminal("calibration / BPA vision / AI infrastructure / grid isoperimetry");
    scrollToSelector("#work");
  } else if (head === "about" || head === "whoami") {
    appendTerminal("Sushanth Dasari · Class of 2027 · Gurugram");
    appendTerminal("PCM + AI · building research systems and prototypes");
  } else if (head === "contact") {
    closeTerminal();
    scrollToSelector("#contact");
  } else if (head === "github") {
    appendTerminal("https://github.com/sushxnthd");
    window.open("https://github.com/sushxnthd", "_blank", "noopener");
  } else if (head === "screen") {
    if (arg === "mono" || arg === "mac") {
      body.classList.add("mono");
      appendTerminal("screen mode → 1-bit");
    } else if (arg === "color" || arg === "default") {
      body.classList.remove("mono");
      appendTerminal("screen mode → default");
    } else {
      appendTerminal("usage: screen mono | screen color");
    }
  } else if (head === "coffee") {
    appendTerminal("status: unavailable. substitute: obsessive iteration.");
  } else if (head === "sudo") {
    appendTerminal("permission denied: evidence still required.");
  } else if (head === "clear") {
    terminalOutput.innerHTML = "";
  } else {
    appendTerminal("command not found: " + command);
    appendTerminal("try 'help'", "dim");
  }
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (terminalInput.disabled) return;
  const value = terminalInput.value;
  terminalInput.value = "";
  runCommand(value);
});

document.getElementById("terminalTrigger").addEventListener("click", openTerminal);
document.getElementById("openTerminalInline").addEventListener("click", openTerminal);
document.getElementById("closeTerminal").addEventListener("click", closeTerminal);

function openJump() {
  jumpPalette.classList.add("is-open");
  jumpPalette.setAttribute("aria-hidden", "false");
  lockIfNeeded();
  window.setTimeout(() => jumpInput.focus(), 20);
}
function closeJump() {
  jumpPalette.classList.remove("is-open");
  jumpPalette.setAttribute("aria-hidden", "true");
  jumpInput.value = "";
  filterJump("");
  lockIfNeeded();
}
function filterJump(value) {
  const query = value.toLowerCase();
  document.querySelectorAll("#jumpList button").forEach((button) => {
    button.hidden = !button.textContent.toLowerCase().includes(query);
  });
}
document.getElementById("jumpButton").addEventListener("click", openJump);
document.getElementById("closeJump").addEventListener("click", closeJump);
jumpInput.addEventListener("input", () => filterJump(jumpInput.value));

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const selector = button.dataset.jump;
    closeJump();
    scrollToSelector(selector);
  });
});
document.querySelectorAll("[data-terminal]").forEach((button) => {
  button.addEventListener("click", () => {
    closeJump();
    openTerminal();
  });
});

function softChime(frequency=520) {
  if (!state.soundUnlocked) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  } catch (error) {
    // Sound remains optional.
  }
}
document.addEventListener("pointerdown", () => {
  state.soundUnlocked = true;
}, { once:true });

function setRunProgress(next) {
  state.runProgress = Math.max(0, Math.min(100, next));
  runBar.style.width = state.runProgress + "%";
  runLabel.textContent = state.runProgress >= 100
    ? "executing…"
    : Math.round(state.runProgress) + "% · scroll to run ↓";
}

function entryIsArmed() {
  const rect = entry.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.24;
}

window.addEventListener("wheel", (event) => {
  if (state.timelineOpen || state.terminalOpen || jumpPalette.classList.contains("is-open")) return;
  if (!entryIsArmed()) {
    if (state.runProgress > 0) setRunProgress(state.runProgress - 8);
    return;
  }

  if (event.deltaY > 0) {
    event.preventDefault();
    setRunProgress(state.runProgress + Math.min(14, Math.abs(event.deltaY) * 0.09 + 3));
    if (state.runProgress >= 100) {
      window.setTimeout(openTimeline, 100);
    }
  } else if (state.runProgress > 0) {
    event.preventDefault();
    setRunProgress(state.runProgress - Math.min(18, Math.abs(event.deltaY) * 0.1 + 4));
  }
}, { passive:false });

document.getElementById("fallbackShowcase").addEventListener("click", (event) => {
  event.preventDefault();
  openTimeline();
});

function layoutTimeline() {
  const spacing = 380 * state.timelineZoom;
  const center = window.innerWidth / 2;
  timelineCards.forEach((node) => {
    const index = Number(node.dataset.timelineIndex || 0);
    const delta = index - state.timelineOffset;
    const x = center + delta * spacing - (node.classList.contains("timeline-quote") ? 190 : 155);
    const z = -Math.abs(delta) * 125 * state.timelineZoom;
    const rotate = clamp(delta * -7, -28, 28);
    const opacity = Math.max(.18, 1 - Math.abs(delta) * .16);

    node.style.left = x + "px";
    node.style.transform = "translateZ(" + z + "px) rotateY(" + rotate + "deg)";
    node.style.opacity = opacity;
    node.style.filter = Math.abs(delta) > 2.2 ? "blur(1.2px)" : "none";
    node.style.zIndex = String(10 - Math.round(Math.abs(delta)));
  });

  document.getElementById("timelineZoomLabel").textContent = state.timelineZoom.toFixed(1) + "×";
}

function openTimeline() {
  if (state.timelineOpen) return;
  state.timelineOpen = true;
  setRunProgress(100);
  timeline.classList.add("is-open");
  timeline.setAttribute("aria-hidden", "false");
  lockIfNeeded();

  const transition = document.getElementById("pixelTransition");
  transition.classList.remove("run");
  void transition.offsetWidth;
  transition.classList.add("run");

  layoutTimeline();
  window.setTimeout(() => softChime(430), 520);
}
function closeTimeline() {
  state.timelineOpen = false;
  timeline.classList.remove("is-open");
  timeline.setAttribute("aria-hidden", "true");
  closeTimelineDetail();
  lockIfNeeded();
  setRunProgress(0);
}
document.getElementById("closeTimeline").addEventListener("click", closeTimeline);

function setTimelineZoom(next) {
  state.timelineZoom = clamp(next, .72, 1.35);
  layoutTimeline();
}
document.getElementById("timelineMinus").addEventListener("click", () => setTimelineZoom(state.timelineZoom - .1));
document.getElementById("timelinePlus").addEventListener("click", () => setTimelineZoom(state.timelineZoom + .1));

const timelineStage = document.querySelector(".timeline-stage");
timelineStage.addEventListener("wheel", (event) => {
  event.preventDefault();
  const before = Math.round(state.timelineOffset);
  state.timelineOffset = clamp(state.timelineOffset + event.deltaY * .0028 + event.deltaX * .0028, 0, 5);
  layoutTimeline();
  const after = Math.round(state.timelineOffset);
  if (after !== before) softChime(460 + after * 35);
}, { passive:false });

timelineStage.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  state.timelineDragging = true;
  state.dragX = event.clientX;
  state.dragOffset = state.timelineOffset;
  timelineStage.setPointerCapture?.(event.pointerId);
});
timelineStage.addEventListener("pointermove", (event) => {
  if (!state.timelineDragging) return;
  const dx = event.clientX - state.dragX;
  state.timelineOffset = clamp(state.dragOffset - dx / (380 * state.timelineZoom), 0, 5);
  layoutTimeline();
});
function finishTimelineDrag(event) {
  if (!state.timelineDragging) return;
  state.timelineDragging = false;
  timelineStage.releasePointerCapture?.(event.pointerId);
}
timelineStage.addEventListener("pointerup", finishTimelineDrag);
timelineStage.addEventListener("pointercancel", finishTimelineDrag);

function openTimelineDetail(id) {
  const project = PROJECTS[id];
  if (!project) return;
  document.getElementById("detailEyebrow").textContent = project.eyebrow;
  document.getElementById("detailTitle").textContent = project.title;
  document.getElementById("detailText").textContent = project.text;

  const stats = document.getElementById("detailStats");
  stats.innerHTML = "";
  project.stats.forEach(([value,label]) => {
    const row = document.createElement("div");
    row.innerHTML = "<b>" + value + "</b><span>" + label + "</span>";
    stats.appendChild(row);
  });

  const links = document.getElementById("detailLinks");
  links.innerHTML = "";
  project.links.forEach(([label,href]) => {
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = label + " ↗";
    links.appendChild(a);
  });

  timelineDetail.classList.add("is-open");
  timelineDetail.setAttribute("aria-hidden", "false");
}
function closeTimelineDetail() {
  timelineDetail.classList.remove("is-open");
  timelineDetail.setAttribute("aria-hidden", "true");
}
document.getElementById("closeTimelineDetail").addEventListener("click", closeTimelineDetail);

document.querySelectorAll(".timeline-card").forEach((card) => {
  card.addEventListener("click", () => {
    const idx = Number(card.dataset.timelineIndex);
    state.timelineOffset = idx;
    layoutTimeline();
    softChime(620);
    openTimelineDetail(card.dataset.project);
  });
});

document.querySelectorAll("[data-open-card]").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.dataset.openCard;
    const timelineCard = document.querySelector('.timeline-card[data-project="' + id + '"]');
    if (timelineCard) state.timelineOffset = Number(timelineCard.dataset.timelineIndex);
    openTimeline();
    window.setTimeout(() => openTimelineDetail(id), reducedMotion ? 0 : 650);
  });
});

// Desktop filmstrip follows wheel while pointer is over it.
if (garageStrip) {
  garageStrip.addEventListener("wheel", (event) => {
    if (window.innerWidth < 901) return;
    event.preventDefault();
    state.stripX -= (event.deltaY + event.deltaX) * .55;
    const minX = Math.min(0, window.innerWidth - garageStrip.scrollWidth - 30);
    state.stripX = clamp(state.stripX, minX, 0);
    garageStrip.style.transform = "translateX(" + state.stripX + "px)";
  }, { passive:false });
}

document.addEventListener("keydown", (event) => {
  const metaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (metaK) {
    event.preventDefault();
    if (jumpPalette.classList.contains("is-open")) closeJump();
    else openJump();
    return;
  }

  if (event.key === "Escape") {
    if (timelineDetail.classList.contains("is-open")) closeTimelineDetail();
    else if (state.timelineOpen) closeTimeline();
    else if (jumpPalette.classList.contains("is-open")) closeJump();
    else if (state.terminalOpen) closeTerminal();
  }
});

window.addEventListener("resize", () => {
  if (state.timelineOpen) layoutTimeline();
});

layoutTimeline();
setRunProgress(0);
