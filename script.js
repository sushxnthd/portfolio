const PROJECTS = {
  kernellum: {
    number: "001",
    code: "KERNEL / ROUTE",
    status: "ACTIVE RESEARCH",
    title: "Kernellum",
    type: "AI × Hardware",
    description: "Route-aware architecture search that asks whether predicted accelerator advantages survive synthesis and place-and-route.",
    question: "Can automated architecture search choose accelerator designs whose advantage survives real FPGA physical design rather than only an analytical model?",
    stats: [
      ["36 / 36", "held-out deployment wins"],
      ["23.56%", "mean workload-latency improvement"],
      ["1.44%", "mean regret vs routed oracle"]
    ],
    boundary: "Current evidence is final-route FPGA evidence, not board-measured latency, power, energy, or thermal performance.",
    links: [
      ["Repository", "https://github.com/sushxnthd/kernellum"],
      ["Evidence report", "https://github.com/sushxnthd/kernellum/blob/main/docs/SIMILARITY_PORTFOLIO_CONFIRMATION_REPORT.md"]
    ],
    image: ""
  },
  theorica: {
    number: "002",
    code: "THEORY / ACTION",
    status: "ACTIVE RESEARCH",
    title: "Theorica",
    type: "Autonomous Science",
    description: "A system for discovering hidden mathematical structure through interventions, failures, and representation changes.",
    question: "Can an AI scientist discover the representation of an unknown operation before it tries to learn the law itself?",
    stats: [
      ["345 / 345", "public exact reconstructions"],
      ["0 / 150", "false acceptances"],
      ["1100 / 1100", "external BOC decisions"]
    ],
    boundary: "Broad novelty claims did not survive external falsification. The remaining translation-base claim is intentionally narrower and still needs independent reproduction.",
    links: [
      ["Repository", "https://github.com/sushxnthd/theorica"],
      ["v1.2 report", "https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_2_REPORT.md"],
      ["Preserved failure", "https://github.com/sushxnthd/theorica/blob/main/results/TRANSLATION_ACTION_CHALLENGE_V1_1_FAILURE.md"]
    ],
    image: ""
  },
  somno: {
    number: "003",
    code: "SOMNO / STATE",
    status: "SHIPPED",
    title: "Somno",
    type: "Mobile AI",
    description: "A privacy-first Android system that estimates fatigue relative to a personal baseline using multiple signals.",
    question: "Can useful fatigue awareness come from signals a phone can collect without turning the experience into a laboratory task?",
    stats: [
      ["v27", "public Android release"],
      ["4", "signal families"],
      ["LOCAL", "raw face images stay on device"]
    ],
    boundary: "Somno is a consumer fatigue-awareness system. The open problem is stronger validation of the fusion model across people, devices, and real-world contexts.",
    links: [
      ["Product", "https://sushxnthd.github.io/somno/"],
      ["Repository", "https://github.com/sushxnthd/somno"],
      ["Release", "https://github.com/sushxnthd/somno/releases/tag/v27"]
    ],
    image: "https://raw.githubusercontent.com/sushxnthd/somno/main/listing/play/result.png"
  },
  lucent: {
    number: "004",
    code: "LUCENT / 00:05",
    status: "HYPOTHESIS",
    title: "Lucent",
    type: "Human Sensing",
    description: "A research question disguised as an interface constraint: what can five seconds of face video actually reveal?",
    question: "How much useful information about current functional state survives when the sensing window is compressed to only five seconds of ordinary face video?",
    stats: [
      ["00:05", "target capture"],
      ["FACE", "video-only input"],
      ["OPEN", "validation not complete"]
    ],
    boundary: "Five seconds is a target, not a breakthrough claim. The next gate is a preregistered study against simple ocular, self-report, and longer-video baselines.",
    links: [
      ["GitHub", "https://github.com/sushxnthd"]
    ],
    image: ""
  }
};

const CHARSETS = {
  soft: "  ..··::++**##%%@@",
  hard: "  .:-=+*#%@",
  blocks: "  ░▒▓█",
  math: "  ·:+xX#@"
};

const state = {
  pointerX: window.innerWidth * 0.65,
  pointerY: window.innerHeight * 0.42,
  smoothX: window.innerWidth * 0.65,
  smoothY: window.innerHeight * 0.42,
  scrollVelocity: 0,
  lastScrollY: window.scrollY,
  lastScrollTime: performance.now(),
  activeProject: "kernellum",
  detailProject: "kernellum",
  frame: 0,
  heroPhase: 0,
  projectPhase: 0,
  detailPhase: 0,
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

const heroCanvas = document.getElementById("asciiHero");
const projectCanvas = document.getElementById("projectAscii");
const detailCanvas = document.getElementById("detailAscii");
const transitionCanvas = document.getElementById("transitionAscii");
const projectRows = Array.from(document.querySelectorAll(".project-row"));
const projectView = document.getElementById("projectView");
const indexPanel = document.getElementById("indexPanel");
const cursor = document.getElementById("cursor");
const cursorText = document.getElementById("cursorText");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, amount) {
  return a + (b - a) * amount;
}

function hash(x, y, seed) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function fitCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height, dpr };
}

function charFor(value, charset) {
  const chars = charset || CHARSETS.soft;
  const index = clamp(Math.floor(value * chars.length), 0, chars.length - 1);
  return chars[index];
}

function drawChar(ctx, char, x, y, size, color, alpha) {
  if (!char || char === " ") return;
  ctx.globalAlpha = alpha === undefined ? 1 : alpha;
  ctx.fillStyle = color;
  ctx.font = size + 'px "Courier New", monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, x, y);
  ctx.globalAlpha = 1;
}

function heroField(now) {
  const fitted = fitCanvas(heroCanvas);
  if (!fitted) return;
  const { ctx, width, height } = fitted;
  ctx.clearRect(0, 0, width, height);

  const mobile = width < 760;
  const cell = mobile ? 11 : 13;
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const pointerX = state.smoothX;
  const pointerY = state.smoothY;
  const heroRect = heroCanvas.getBoundingClientRect();
  const localPointerX = pointerX - heroRect.left;
  const localPointerY = pointerY - heroRect.top;
  const velocityBoost = Math.min(Math.abs(state.scrollVelocity) / 700, 0.85);

  const orbX = mobile ? width * 0.68 : width * 0.73;
  const orbY = height * 0.39;
  const orbRX = mobile ? width * 0.52 : width * 0.32;
  const orbRY = height * 0.38;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      let x = col * cell + cell * 0.5;
      let y = row * cell + cell * 0.5;

      const dx = (x - orbX) / orbRX;
      const dy = (y - orbY) / orbRY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const sphere = clamp(1 - distance, 0, 1);

      const wave =
        Math.sin(col * 0.33 + now * 0.0008) * 0.12 +
        Math.cos(row * 0.27 - now * 0.00055) * 0.1;

      const grain = hash(col, row, 3.1) * 0.17;
      let value = sphere * 0.86 + wave + grain - 0.08;

      const pdx = x - localPointerX;
      const pdy = y - localPointerY;
      const pd = Math.sqrt(pdx * pdx + pdy * pdy);
      const radius = mobile ? 115 : 175;
      const interaction = clamp(1 - pd / radius, 0, 1);

      if (interaction > 0) {
        const angle = Math.atan2(pdy, pdx);
        x += Math.cos(angle) * interaction * 19;
        y += Math.sin(angle) * interaction * 19;
        value += interaction * 0.46;
      }

      value += velocityBoost * Math.sin((x + y) * 0.035 + now * 0.01) * 0.18;
      value = clamp(value, 0, 1);

      if (value > 0.075) {
        const char = charFor(value, velocityBoost > 0.25 ? CHARSETS.blocks : CHARSETS.soft);
        drawChar(ctx, char, x, y, cell * 0.8, "#121210", 0.16 + value * 0.73);
      }
    }
  }

  const density = clamp(0.62 + velocityBoost * 0.3, 0, 0.99);
  const densityNode = document.getElementById("densityReadout");
  const velocityNode = document.getElementById("velocityReadout");
  if (densityNode) densityNode.textContent = density.toFixed(2);
  if (velocityNode) velocityNode.textContent = (Math.abs(state.scrollVelocity) / 1000).toFixed(2);
}

function renderKernellum(canvas, now, detail) {
  const fitted = fitCanvas(canvas);
  if (!fitted) return;
  const { ctx, width, height } = fitted;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#11110f";
  ctx.fillRect(0, 0, width, height);

  const cell = detail ? 15 : 13;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const routeY = Math.floor(rows * 0.52);

  for (let row = 2; row < rows - 2; row += 2) {
    for (let col = 2; col < cols - 2; col += 3) {
      const distToRoute = Math.abs(row - (routeY + Math.sin(col * 0.32 + now * 0.001) * 3));
      const pulse = (Math.sin(now * 0.0022 + col * 0.7 + row * 0.4) + 1) * 0.5;
      const route = distToRoute < 1.25;
      const value = route ? 0.9 : 0.18 + pulse * 0.34;
      const char = route ? (pulse > 0.5 ? "█" : "▓") : (pulse > 0.65 ? "·" : "+");
      drawChar(ctx, char, col * cell, row * cell, cell * 0.72, route ? "#f3f1eb" : "#77756e", value);
    }
  }

  ctx.strokeStyle = "rgba(243,241,235,.22)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = height * (0.25 + i * 0.12);
    ctx.beginPath();
    ctx.moveTo(width * 0.12, y);
    for (let x = width * 0.12; x < width * 0.88; x += 22) {
      ctx.lineTo(x, y + Math.sin(x * 0.024 + now * 0.0018 + i) * 14);
    }
    ctx.stroke();
  }
}

function renderTheorica(canvas, now, detail) {
  const fitted = fitCanvas(canvas);
  if (!fitted) return;
  const { ctx, width, height } = fitted;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#11110f";
  ctx.fillRect(0, 0, width, height);

  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const radius = Math.min(width, height) * (detail ? 0.34 : 0.31);
  const nodes = 10;

  for (let i = 0; i < nodes; i += 1) {
    const angle = (i / nodes) * Math.PI * 2 + now * 0.00023;
    const wobble = 1 + Math.sin(now * 0.0014 + i * 1.7) * 0.08;
    const x = centerX + Math.cos(angle) * radius * wobble;
    const y = centerY + Math.sin(angle) * radius * 0.72 * wobble;

    const j = (i * 3 + 2) % nodes;
    const angle2 = (j / nodes) * Math.PI * 2 + now * 0.00023;
    const x2 = centerX + Math.cos(angle2) * radius;
    const y2 = centerY + Math.sin(angle2) * radius * 0.72;

    ctx.strokeStyle = "rgba(243,241,235,.18)";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    drawChar(ctx, i % 2 ? "L" : "x", x, y, detail ? 15 : 13, "#f3f1eb", 0.88);
  }

  drawChar(ctx, "F", centerX, centerY, detail ? 30 : 24, "#f3f1eb", 1);

  const labels = detail ? ["S×S", "→", "S", "BASE", "ACTION"] : ["S×S", "→", "S"];
  labels.forEach((label, i) => {
    drawChar(
      ctx,
      label,
      centerX + (i - (labels.length - 1) / 2) * (detail ? 72 : 62),
      height * 0.18,
      detail ? 11 : 9,
      "#8f8b82",
      0.9
    );
  });
}

function renderSomno(canvas, now, detail) {
  const fitted = fitCanvas(canvas);
  if (!fitted) return;
  const { ctx, width, height } = fitted;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#11110f";
  ctx.fillRect(0, 0, width, height);

  const cell = detail ? 12 : 10;
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const cx = width * 0.5;
  const cy = height * 0.47;
  const rx = Math.min(width * 0.3, height * 0.31);
  const ry = height * 0.34;
  const scanY = ((now * 0.06) % (height * 1.25)) - height * 0.12;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * cell;
      const y = row * cell;
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const face = nx * nx + ny * ny;
      if (face > 0.82 || face < 0.08) continue;

      let feature = 0.2;
      const eyeY = -0.18;
      const eyeL = Math.sqrt(Math.pow(nx + 0.28, 2) + Math.pow(ny - eyeY, 2));
      const eyeR = Math.sqrt(Math.pow(nx - 0.28, 2) + Math.pow(ny - eyeY, 2));
      if (eyeL < 0.13 || eyeR < 0.13) feature = 0.88;
      if (Math.abs(nx) < 0.08 && ny > -0.05 && ny < 0.28) feature = Math.max(feature, 0.5);
      if (ny > 0.33 && ny < 0.43 && Math.abs(nx) < 0.28) feature = 0.62;

      const scan = Math.max(0, 1 - Math.abs(y - scanY) / 32);
      feature += scan * 0.42;
      const char = charFor(clamp(feature + hash(col, row, 8) * 0.18, 0, 1), CHARSETS.soft);
      drawChar(ctx, char, x, y, cell * 0.82, scan > 0.1 ? "#ef5a32" : "#f3f1eb", 0.26 + feature * 0.65);
    }
  }

  ctx.strokeStyle = "rgba(239,90,50,.7)";
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(width, scanY);
  ctx.stroke();
}

function renderLucent(canvas, now, detail) {
  const fitted = fitCanvas(canvas);
  if (!fitted) return;
  const { ctx, width, height } = fitted;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#11110f";
  ctx.fillRect(0, 0, width, height);

  const cell = detail ? 11 : 9;
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const rx = Math.min(width * 0.32, height * 0.33);
  const ry = height * 0.36;
  const resolve = (Math.sin(now * 0.0012) + 1) * 0.5;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * cell;
      const y = row * cell;
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const face = nx * nx + ny * ny;
      if (face > 0.9) continue;

      const edge = clamp(1 - Math.abs(face - 0.78) * 3, 0, 1);
      const symmetry = clamp(1 - Math.abs(nx), 0, 1);
      const detailValue =
        edge * 0.52 +
        symmetry * 0.17 +
        hash(col, row, 11) * (0.42 - resolve * 0.2) +
        resolve * 0.22;

      const eyeL = Math.sqrt(Math.pow(nx + 0.27, 2) + Math.pow(ny + 0.18, 2));
      const eyeR = Math.sqrt(Math.pow(nx - 0.27, 2) + Math.pow(ny + 0.18, 2));
      let value = detailValue;
      if (eyeL < 0.11 || eyeR < 0.11) value = 0.95;
      if (ny > 0.31 && ny < 0.4 && Math.abs(nx) < 0.26) value = Math.max(value, 0.72);

      const char = charFor(clamp(value, 0, 1), resolve > 0.55 ? CHARSETS.hard : CHARSETS.blocks);
      drawChar(ctx, char, x, y, cell * 0.82, "#f3f1eb", 0.18 + value * 0.78);
    }
  }

  drawChar(ctx, "00:05", width * 0.82, height * 0.88, detail ? 13 : 10, "#ef5a32", 1);
}

function renderProjectArt(canvas, projectId, now, detail) {
  if (!canvas) return;
  if (projectId === "kernellum") renderKernellum(canvas, now, detail);
  else if (projectId === "theorica") renderTheorica(canvas, now, detail);
  else if (projectId === "somno") renderSomno(canvas, now, detail);
  else renderLucent(canvas, now, detail);
}

function updateStage(id) {
  const project = PROJECTS[id];
  if (!project) return;
  state.activeProject = id;

  projectRows.forEach((row) => {
    row.classList.toggle("is-active", row.dataset.project === id);
  });

  document.getElementById("stageCode").textContent = project.code;
  document.getElementById("stageStatus").textContent = project.status;
  document.getElementById("stageTitle").textContent = project.title;
  document.getElementById("stageDescription").textContent = project.description;

  const stats = document.getElementById("stageStats");
  stats.innerHTML = "";
  project.stats.forEach(([value, label]) => {
    const span = document.createElement("span");
    span.innerHTML = "<b>" + value + "</b><i>" + label + "</i>";
    stats.appendChild(span);
  });
}

function updateProjectView(id) {
  const project = PROJECTS[id];
  if (!project) return;
  state.detailProject = id;

  document.getElementById("viewCode").textContent = "PROJECT / " + project.number;
  document.getElementById("viewNumber").textContent = project.number;
  document.getElementById("viewTitle").textContent = project.title;
  document.getElementById("viewSubtitle").textContent = project.type;
  document.getElementById("viewQuestion").textContent = project.question;
  document.getElementById("viewBoundary").textContent = project.boundary;

  const stats = document.getElementById("viewStats");
  stats.innerHTML = "";
  project.stats.forEach(([value, label]) => {
    const span = document.createElement("span");
    span.innerHTML = "<b>" + value + "</b><i>" + label + "</i>";
    stats.appendChild(span);
  });

  const links = document.getElementById("viewLinks");
  links.innerHTML = "";
  project.links.forEach(([label, href]) => {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = label + " ↗";
    links.appendChild(anchor);
  });

  const image = document.getElementById("viewImage");
  if (project.image) {
    image.src = project.image;
    image.alt = project.title + " project screenshot";
    image.hidden = false;
    image.style.opacity = "0";
    window.setTimeout(() => {
      image.style.transition = "opacity .7s ease";
      image.style.opacity = ".92";
    }, 850);
  } else {
    image.hidden = true;
    image.removeAttribute("src");
  }
}

function runTransition(callback) {
  const fitted = fitCanvas(transitionCanvas);
  if (!fitted || state.reduced) {
    callback();
    return;
  }

  const { ctx, width, height } = fitted;
  transitionCanvas.classList.add("is-running");
  const start = performance.now();
  const duration = 720;
  let callbackDone = false;

  function frame(now) {
    const progress = clamp((now - start) / duration, 0, 1);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#121210";
    ctx.fillRect(0, 0, width, height);

    const cell = 15;
    const cols = Math.ceil(width / cell);
    const rows = Math.ceil(height / cell);
    const reveal = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const random = hash(col, row, 19);
        if (random < reveal) {
          const ch = CHARSETS.blocks[Math.floor(hash(col, row, 23) * CHARSETS.blocks.length)];
          drawChar(ctx, ch, col * cell, row * cell, cell * 0.78, "#f3f1eb", 0.6 + random * 0.4);
        }
      }
    }

    if (progress >= 0.45 && !callbackDone) {
      callbackDone = true;
      callback();
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, width, height);
      transitionCanvas.classList.remove("is-running");
    }
  }

  requestAnimationFrame(frame);
}

function openProject(id) {
  const project = PROJECTS[id];
  if (!project) return;

  updateProjectView(id);
  runTransition(() => {
    projectView.classList.add("is-open");
    projectView.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    projectView.scrollTop = 0;
  });
}

function closeProject() {
  runTransition(() => {
    projectView.classList.remove("is-open");
    projectView.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  });
}

function stepProject(direction) {
  const ids = Object.keys(PROJECTS);
  const current = ids.indexOf(state.detailProject);
  const next = (current + direction + ids.length) % ids.length;
  updateProjectView(ids[next]);
}

function openIndex() {
  indexPanel.classList.add("is-open");
  indexPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
}

function closeIndex() {
  indexPanel.classList.remove("is-open");
  indexPanel.setAttribute("aria-hidden", "true");
  if (!projectView.classList.contains("is-open")) {
    document.body.classList.remove("is-locked");
  }
}

projectRows.forEach((row) => {
  row.addEventListener("pointerenter", () => updateStage(row.dataset.project));
  row.addEventListener("focus", () => updateStage(row.dataset.project));
  row.addEventListener("click", () => openProject(row.dataset.project));
});

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.openProject;
    closeIndex();
    window.setTimeout(() => openProject(id), state.reduced ? 0 : 180);
  });
});

document.getElementById("openIndex").addEventListener("click", openIndex);
document.getElementById("closeIndex").addEventListener("click", closeIndex);
document.getElementById("closeProject").addEventListener("click", closeProject);
document.getElementById("prevProject").addEventListener("click", () => stepProject(-1));
document.getElementById("nextProject").addEventListener("click", () => stepProject(1));

document.querySelectorAll(".index-links a").forEach((link) => {
  link.addEventListener("click", closeIndex);
});

document.getElementById("copyHandle").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText("@sushxnthd");
    button.textContent = "Copied @sushxnthd";
  } catch (error) {
    button.textContent = "@sushxnthd";
  }
  window.setTimeout(() => {
    button.textContent = "Copy @sushxnthd";
  }, 1400);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (projectView.classList.contains("is-open")) closeProject();
    else if (indexPanel.classList.contains("is-open")) closeIndex();
    return;
  }

  if (projectView.classList.contains("is-open")) {
    if (event.key === "ArrowLeft") stepProject(-1);
    if (event.key === "ArrowRight") stepProject(1);
  }
});

window.addEventListener("pointermove", (event) => {
  state.pointerX = event.clientX;
  state.pointerY = event.clientY;

  const pointerReadout = document.getElementById("pointerReadout");
  if (pointerReadout) {
    pointerReadout.textContent =
      String(Math.round(event.clientX)).padStart(3, "0") + "," +
      String(Math.round(event.clientY)).padStart(3, "0");
  }

  document.documentElement.style.setProperty("--cursor-x", event.clientX + "px");
  document.documentElement.style.setProperty("--cursor-y", event.clientY + "px");
  cursor.classList.add("is-visible");
}, { passive: true });

document.addEventListener("pointerover", (event) => {
  const action = event.target.closest("button,a");
  if (!action) return;
  cursor.classList.add("is-action");

  if (action.classList.contains("project-row")) cursorText.textContent = "OPEN";
  else if (action.id === "openIndex") cursorText.textContent = "INDEX";
  else if (action.closest(".project-view-head")) cursorText.textContent = "CONTROL";
  else cursorText.textContent = "SELECT";
});

document.addEventListener("pointerout", (event) => {
  const next = event.relatedTarget && event.relatedTarget.closest
    ? event.relatedTarget.closest("button,a")
    : null;
  if (!next) cursor.classList.remove("is-action");
});

window.addEventListener("scroll", () => {
  const now = performance.now();
  const dy = window.scrollY - state.lastScrollY;
  const dt = Math.max(16, now - state.lastScrollTime);
  state.scrollVelocity = (dy / dt) * 1000;
  state.lastScrollY = window.scrollY;
  state.lastScrollTime = now;

  document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  ".section-head,.project-list,.project-stage,.research-copy,.research-ascii,.principle-section blockquote,.about-head,.about-grid,.contact-copy"
).forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

function animateResearchAscii(now) {
  const pre = document.getElementById("researchAscii");
  if (!pre || state.reduced) return;
  const phase = Math.floor(now / 650) % 4;
  const chars = ["●", "◆", "■", "×"];
  const lines = [
    "┌──────────────────────────────┐",
    "│ confidence  ≠  ordering      │",
    "│                              │",
    "│  score ────────────────►     │",
    "│         ╲                    │",
    "│          ╲ selective risk    │",
    "│           ╲                  │",
    "│            " + chars[phase] + "──── coverage    │",
    "└──────────────────────────────┘"
  ];
  pre.textContent = lines.join("\n");
}

function animationLoop(now) {
  state.smoothX = lerp(state.smoothX, state.pointerX, 0.11);
  state.smoothY = lerp(state.smoothY, state.pointerY, 0.11);
  state.scrollVelocity *= 0.92;

  heroField(now);
  renderProjectArt(projectCanvas, state.activeProject, now, false);

  if (projectView.classList.contains("is-open")) {
    renderProjectArt(detailCanvas, state.detailProject, now, true);
  }

  animateResearchAscii(now);
  state.frame = requestAnimationFrame(animationLoop);
}

function resizeAll() {
  fitCanvas(heroCanvas);
  fitCanvas(projectCanvas);
  fitCanvas(detailCanvas);
  fitCanvas(transitionCanvas);
}

window.addEventListener("resize", resizeAll);

updateStage("kernellum");
resizeAll();

if (state.reduced) {
  heroField(0);
  renderProjectArt(projectCanvas, "kernellum", 0, false);
} else {
  state.frame = requestAnimationFrame(animationLoop);
}
