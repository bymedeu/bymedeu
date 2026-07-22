import { icons } from "../components/icons.js";
import { resume } from "../data/resume.js";
import { getLocalized, getProjectById, getProjectName } from "../data/projects.js";
import { projectDetailUrl } from "../router.js";
import { siteConfig } from "../../site.config.js";

export function renderResumePage(i18n) {
  const { t } = i18n;

  return `
    <article class="resume-page container">
      <header class="resume-hero">
        <div class="reveal">
          <p class="eyebrow">${t("resume.eyebrow")}</p>
          <h1>${t("resume.title")}</h1>
          <p>${t("resume.intro")}</p>
        </div>
        <div class="resume-downloads reveal reveal-delay-1">
          <p class="section-kicker">${t("resume.pdfTitle")}</p>
          <a class="button button-light" href="${siteConfig.cv.en}" target="_blank" rel="noreferrer">${t("contact.cvEn")}${icons.arrowUpRight}</a>
          <a class="button button-secondary" href="${siteConfig.cv.fr}" target="_blank" rel="noreferrer">${t("contact.cvFr")}${icons.arrowUpRight}</a>
        </div>
      </header>

      ${renderTimeline(t("resume.experience"), resume.experience, i18n)}
      ${renderTimeline(t("resume.education"), resume.education, i18n)}

      <section class="resume-interests border-section reveal">
        <p class="section-kicker">${t("resume.beyondCode")}</p>
        <div class="interest-grid">
          ${t("resume.interests").map((interest) => `<div><span>${interest.label}</span><p>${interest.copy}</p></div>`).join("")}
        </div>
      </section>
    </article>
  `;
}

export function setupResumePage() {}

function renderTimeline(title, entries, i18n) {
  const primaryEntries = entries.filter((entry) => !entry.optional);
  const optionalEntries = entries.filter((entry) => entry.optional);

  return `
    <section class="resume-section border-section">
      <p class="section-kicker reveal">${title}</p>
      <div class="resume-timeline">
        ${primaryEntries.map((entry, index) => renderTimelineEntry(entry, i18n, index === 0)).join("")}
        ${optionalEntries.length ? `
          <details class="resume-more reveal">
            <summary><span>+</span>${i18n.t("resume.showMore")}</summary>
            <div class="resume-more-grid">
              ${optionalEntries.map((entry) => renderTimelineEntry(entry, i18n, false)).join("")}
            </div>
          </details>
        ` : ""}
      </div>
    </section>
  `;
}

function renderTimelineEntry(entry, i18n, emphasize) {
  const { language, t } = i18n;
  const location = getLocalized(entry.location, language);
  const linkedProjects = entry.projectIds.map(getProjectById).filter(Boolean);

  return `
    <article class="timeline-entry reveal${emphasize ? " timeline-entry-featured" : ""}${entry.id === "esa" ? " timeline-entry-current" : ""}">
      <p class="timeline-period">${getLocalized(entry.period, language)}</p>
      <div class="timeline-content">
        <div class="timeline-heading">
          <div><h2>${getLocalized(entry.title, language)}</h2><p>${entry.organization}${location ? ` · ${location}` : ""}</p></div>
          ${entry.id === "esa" ? `<span>${t("resume.current")}</span>` : ""}
        </div>
        <p class="timeline-description">${getLocalized(entry.description, language)}</p>
        ${renderProjectLinks(linkedProjects, i18n)}
      </div>
    </article>
  `;
}

function renderProjectLinks(projects, { language, t }) {
  if (!projects.length) return "";
  const featured = projects.slice(0, 3);
  const additional = projects.slice(3);
  const renderLink = (project) => `<a href="${projectDetailUrl(project.id)}">${getProjectName(project, language)}${icons.chevron}</a>`;

  return `
    <div class="timeline-projects" aria-label="${t("resume.relatedProjects")}">
      <span>${t("resume.relatedProjects")}</span>
      ${featured.map(renderLink).join("")}
      ${additional.length ? `
        <details class="project-more">
          <summary aria-label="${t("resume.moreProjects")}">+${additional.length}</summary>
          <div>${additional.map(renderLink).join("")}</div>
        </details>
      ` : ""}
    </div>
  `;
}
