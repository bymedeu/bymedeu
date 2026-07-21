import { renderHeader, setupHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { createI18n } from "./i18n/index.js";
import { renderHomePage, setupHomePage } from "./pages/home.js";
import { renderProjectsPage, setupProjectsPage } from "./pages/projects.js";
import { getRoute, startRouter } from "./router.js";
import { setupRevealAnimations } from "./reveal.js";

export function createApp(root) {
  const i18n = createI18n();
  let stopRouter = () => {};

  function render(options = {}) {
    const previousScroll = options.preserveScroll ? window.scrollY : null;
    const route = getRoute();
    const page = route.page === "projects"
      ? renderProjectsPage(i18n, route)
      : renderHomePage(i18n);

    root.innerHTML = `
      <div class="site-shell">
        ${renderHeader(i18n, route)}
        <main id="main-content">${page}</main>
        ${renderFooter(i18n)}
      </div>
    `;

    setupHeader(root, i18n, () => render({ preserveScroll: true }));

    if (route.page === "projects") {
      setupProjectsPage(root);
    } else {
      setupHomePage(root);
    }

    setupRevealAnimations(root);
    restoreScroll(route, previousScroll);
  }

  return {
    start() {
      stopRouter = startRouter(render);
      render();
    },
    stop() {
      stopRouter();
    },
  };
}

function restoreScroll(route, previousScroll) {
  requestAnimationFrame(() => {
    if (previousScroll !== null) {
      window.scrollTo({ top: previousScroll, behavior: "instant" });
      return;
    }

    if (route.section) {
      document.querySelector(`#${route.section}`)?.scrollIntoView();
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  });
}
