const STORAGE_KEY = "amadeo-portfolio-corona-mode";
const DEFAULT_MODE = "solar";
const TARGET_SELECTOR = [
  ".project-card-shell",
  ".timeline-card-shell",
].join(",");

export function setupCorona(root) {
  setMode(readMode());

  root.querySelectorAll(TARGET_SELECTOR).forEach((target) => {
    if (target.dataset.coronaReady === "true") return;

    target.dataset.coronaReady = "true";
    target.classList.add("corona-target");
    target.style.setProperty("--corona-delay", `${-performance.now()}ms`);
    target.style.setProperty("--light-x", `${target.clientWidth * 0.72}px`);
    target.style.setProperty("--light-y", `${target.clientHeight * 0.24}px`);
    target.prepend(createAura());
    target.addEventListener("pointerenter", (event) => updateLightPosition(target, event));
    target.addEventListener("pointermove", (event) => updateLightPosition(target, event));
    target.addEventListener("focusin", () => {
      target.style.setProperty("--light-x", `${target.clientWidth * 0.72}px`);
      target.style.setProperty("--light-y", `${target.clientHeight * 0.24}px`);
    });
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
    <span class="corona-light-bloom"></span>
    <span class="corona-light-rays"></span>
    <span class="corona-light-core"></span>
  `;
  return aura;
}

function updateLightPosition(target, event) {
  const bounds = target.getBoundingClientRect();
  const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
  const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
  target.style.setProperty("--light-x", `${x}px`);
  target.style.setProperty("--light-y", `${y}px`);
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
