const STORAGE_KEY = "amadeo-portfolio-glint-mode";
const TARGET_SELECTOR = [
  ".button:not(.repository-disabled)",
  ".project-card",
  ".timeline-projects a",
  ".cv-links a",
].join(",");

export function setupGlint(root) {
  const savedMode = localStorage.getItem(STORAGE_KEY);
  setMode(savedMode === "rgb" ? "rgb" : "silver");

  root.querySelectorAll(TARGET_SELECTOR).forEach((target) => {
    target.classList.add("glint-target");

    target.addEventListener("pointermove", (event) => updatePosition(target, event));
    target.addEventListener("pointerenter", (event) => updatePosition(target, event));
    target.addEventListener("focus", () => {
      target.style.setProperty("--glint-x", "50%");
      target.style.setProperty("--glint-y", "50%");
    });
    target.addEventListener("click", (event) => {
      if (event.detail === 0) return;
      if (target.matches(".project-card") && event.target.closest("a,button")) return;
      toggleMode();
    });
  });
}

function updatePosition(target, event) {
  const bounds = target.getBoundingClientRect();
  target.style.setProperty("--glint-x", `${event.clientX - bounds.left}px`);
  target.style.setProperty("--glint-y", `${event.clientY - bounds.top}px`);
}

function toggleMode() {
  const nextMode = document.documentElement.dataset.glintMode === "rgb" ? "silver" : "rgb";
  setMode(nextMode);
  localStorage.setItem(STORAGE_KEY, nextMode);
}

function setMode(mode) {
  document.documentElement.dataset.glintMode = mode;
}
