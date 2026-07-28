const STORAGE_KEY = "amadeo-portfolio-corona-mode";
const DEFAULT_MODE = "solar";
const TARGET_SELECTOR = [
  ".button:not(.repository-disabled)",
  ".project-card",
  ".timeline-card-summary",
  ".timeline-projects a",
  ".project-more > summary",
  ".cv-links a",
].join(",");

export function setupCorona(root) {
  setMode(readMode());

  root.querySelectorAll(TARGET_SELECTOR).forEach((target, index) => {
    if (target.dataset.coronaReady === "true") return;

    target.dataset.coronaReady = "true";
    target.classList.add("corona-target");
    target.style.setProperty("--corona-delay", `${index * -0.41}s`);
    target.prepend(createAura());
  });

  root.querySelectorAll("[data-corona-toggle]").forEach((toggle) => {
    if (toggle.dataset.coronaReady === "true") return;

    toggle.dataset.coronaReady = "true";
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
    <span class="corona-aura-haze"></span>
    <span class="corona-aura-plasma"></span>
    <span class="corona-aura-rim"></span>
  `;
  return aura;
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
