import { renderProjectCard } from "../components/project-card.js";
import { getAllTags, projects } from "../data/projects.js";
import { projectFilterUrl } from "../router.js";

export function renderProjectsPage(i18n, route) {
  const { t } = i18n;
  const tags = getAllTags();
  const activeTag = tags.includes(route.tag) ? route.tag : "all";
  const visibleProjects = activeTag === "all"
    ? projects
    : projects.filter((project) => project.tags.includes(activeTag));

  return `
    <section class="projects-hero container">
      <p class="eyebrow reveal">${t("projects.eyebrow")}</p>
      <h1 class="reveal reveal-delay-1">${t("projects.title")}</h1>
      <p class="projects-intro reveal reveal-delay-2">${t("projects.copy")}</p>
    </section>
    <section class="project-index container">
      <div class="filter-header reveal">
        <div><p class="section-kicker">${t("projects.filter")}</p><p class="result-count" aria-live="polite">${t("projects.count")(visibleProjects.length)}</p></div>
        <a class="clear-filter ${activeTag === "all" ? "disabled" : ""}" href="${projectFilterUrl()}">× ${t("projects.all")}</a>
      </div>
      <div class="filter-list reveal" role="list" aria-label="${t("projects.filter")}">
        <a href="${projectFilterUrl()}" class="filter-chip ${activeTag === "all" ? "active" : ""}" aria-current="${activeTag === "all"}">${t("projects.all")}<span>${projects.length}</span></a>
        ${tags.map((tag) => {
          const count = projects.filter((project) => project.tags.includes(tag)).length;
          return `<a href="${projectFilterUrl(tag)}" class="filter-chip ${activeTag === tag ? "active" : ""}" aria-current="${activeTag === tag}">${t(`tags.${tag}`)}<span>${count}</span></a>`;
        }).join("")}
      </div>
      <div class="all-projects">
        ${visibleProjects.length
          ? visibleProjects.map((project) => renderProjectCard(project, i18n)).join("")
          : `<p class="empty-state">${t("projects.empty")}</p>`}
      </div>
    </section>
  `;
}

export function setupProjectsPage() {}
