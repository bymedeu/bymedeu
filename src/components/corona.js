const STORAGE_KEY = "amadeo-portfolio-corona-mode";
const DEFAULT_MODE = "solar";
const ORBIT_DURATION_MS = 160_000;
const TARGET_SELECTOR = [
  ".project-card-shell",
  ".timeline-card-shell",
].join(",");

const activeTargets = new Set();
const sessionPhase = createSessionPhase();
let orbitFrame = 0;

export function setupCorona(root) {
  setMode(readMode());

  root.querySelectorAll(TARGET_SELECTOR).forEach((target) => {
    if (target.dataset.coronaReady === "true") return;

    target.dataset.coronaReady = "true";
    target.classList.add("corona-target");
    target.prepend(createAura());

    const activate = () => {
      activeTargets.add(target);
      updateTarget(target, currentPhase());
      startOrbit();
    };
    const deactivate = () => {
      requestAnimationFrame(() => {
        if (target.matches(":hover") || target.contains(document.activeElement)) return;
        activeTargets.delete(target);
      });
    };

    target.addEventListener("pointerenter", activate);
    target.addEventListener("pointerleave", deactivate);
    target.addEventListener("focusin", activate);
    target.addEventListener("focusout", deactivate);
  });

  root.querySelectorAll("[data-corona-toggle]").forEach((toggle) => {
    if (toggle.dataset.coronaReady === "true") return;

    toggle.dataset.coronaReady = "true";
    toggle.style.setProperty("--corona-delay", `${-performance.now()}ms`);
    toggle.addEventListener("click", () => {
      const nextMode = currentMode() === "solar" ? "white" : "solar";
      setMode(nextMode);
      writeMode(nextMode);
      updateToggleState(toggle, nextMode);
    });
    updateToggleState(toggle, currentMode());
  });
}

function createAura() {
  const aura = document.createElement("span");
  aura.className = "corona-aura";
  aura.setAttribute("aria-hidden", "true");
  aura.innerHTML = `
    <span class="corona-dim-wisps"></span>
    <span class="corona-dim-rim"></span>
    <span class="corona-hotspot">
      <span class="corona-hotspot-bloom"></span>
      <span class="corona-hotspot-rays"></span>
      <span class="corona-hotspot-core"></span>
    </span>
  `;
  return aura;
}

function startOrbit() {
  if (orbitFrame || prefersReducedMotion()) return;

  const tick = () => {
    orbitFrame = 0;
    const phase = currentPhase();

    activeTargets.forEach((target) => {
      if (!target.isConnected) {
        activeTargets.delete(target);
        return;
      }
      updateTarget(target, phase);
    });

    if (activeTargets.size) orbitFrame = requestAnimationFrame(tick);
  };

  orbitFrame = requestAnimationFrame(tick);
}

function updateTarget(target, phase) {
  const width = target.clientWidth;
  const height = target.clientHeight;
  if (!width || !height) return;

  const radius = Math.min(12, width / 2, height / 2);
  const point = pointOnRoundedPerimeter(width, height, radius, phase);
  const pulse = 0.88
    + Math.sin(phase * Math.PI * 10 + 0.6) * 0.07
    + Math.sin(phase * Math.PI * 22 + 2.1) * 0.035;

  target.style.setProperty("--corona-x", `${point.x}px`);
  target.style.setProperty("--corona-y", `${point.y}px`);
  target.style.setProperty("--corona-normal", `${point.normal}deg`);
  target.style.setProperty("--corona-turn", `${phase * 360}deg`);
  target.style.setProperty("--corona-counter-turn", `${phase * -360}deg`);
  target.style.setProperty("--corona-pulse", pulse.toFixed(3));
}

export function pointOnRoundedPerimeter(width, height, radius, phase) {
  const horizontal = Math.max(0, width - radius * 2);
  const vertical = Math.max(0, height - radius * 2);
  const corner = Math.PI * radius * 0.5;
  const segments = [
    { length: horizontal, line: [radius, 0, width - radius, 0], normal: -90 },
    { length: corner, arc: [width - radius, radius, -90, 0] },
    { length: vertical, line: [width, radius, width, height - radius], normal: 0 },
    { length: corner, arc: [width - radius, height - radius, 0, 90] },
    { length: horizontal, line: [width - radius, height, radius, height], normal: 90 },
    { length: corner, arc: [radius, height - radius, 90, 180] },
    { length: vertical, line: [0, height - radius, 0, radius], normal: 180 },
    { length: corner, arc: [radius, radius, 180, 270] },
  ];
  const perimeter = horizontal * 2 + vertical * 2 + corner * 4;
  let distance = modulo(phase, 1) * perimeter;

  for (const segment of segments) {
    if (distance > segment.length) {
      distance -= segment.length;
      continue;
    }

    const progress = segment.length ? distance / segment.length : 0;
    if (segment.line) {
      const [x1, y1, x2, y2] = segment.line;
      return {
        x: x1 + (x2 - x1) * progress,
        y: y1 + (y2 - y1) * progress,
        normal: segment.normal,
      };
    }

    const [centerX, centerY, startAngle, endAngle] = segment.arc;
    const normal = startAngle + (endAngle - startAngle) * progress;
    const radians = normal * Math.PI / 180;
    return {
      x: centerX + Math.cos(radians) * radius,
      y: centerY + Math.sin(radians) * radius,
      normal,
    };
  }

  return { x: radius, y: 0, normal: -90 };
}

function currentPhase() {
  if (prefersReducedMotion()) return sessionPhase;
  return modulo(sessionPhase + performance.now() / ORBIT_DURATION_MS, 1);
}

function createSessionPhase() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const seed = new Uint32Array(1);
    crypto.getRandomValues(seed);
    return seed[0] / 0x1_0000_0000;
  }
  return Math.random();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function modulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function updateToggleState(toggle, mode) {
  const nextMode = mode === "solar" ? "white" : "solar";
  toggle.setAttribute("aria-pressed", String(mode === "white"));
  toggle.setAttribute("aria-label", toggle.dataset[`label${capitalize(nextMode)}`] ?? "");
  toggle.title = toggle.dataset[`label${capitalize(nextMode)}`] ?? "";
}

function readMode() {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    return savedMode === "white" || savedMode === "solar" ? savedMode : DEFAULT_MODE;
  } catch {
    return DEFAULT_MODE;
  }
}

function writeMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // The visual switch still works when storage is unavailable.
  }
}

function currentMode() {
  return document.documentElement.dataset.coronaMode ?? DEFAULT_MODE;
}

function setMode(mode) {
  document.documentElement.dataset.coronaMode = mode;
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
