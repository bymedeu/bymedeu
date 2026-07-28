import { icons } from "../components/icons.js";
import { resume } from "../data/resume.js";
import { getLocalized, getProjectById, getProjectName } from "../data/projects.js";
import { projectDetailUrl } from "../router.js";
import { siteConfig } from "../../site.config.js";

export function renderResumePage(i18n) {
  const { t } = i18n;
  const timeline = [
    ...resume.experience.map((entry) => ({ ...entry, category: "experience" })),
    ...resume.education.map((entry) => ({ ...entry, category: "education" })),
  ].sort((left, right) => left.displayOrder - right.displayOrder);

  return `
    <article class="resume-page container">
      <header class="resume-hero">
        <div class="reveal">
          <p class="eyebrow">${t("resume.eyebrow")}</p>
          <h1>${t("resume.title")}</h1>
        </div>
        <div class="resume-downloads reveal reveal-delay-1">
          <p class="section-kicker">${t("resume.pdfTitle")}</p>
          <a class="button button-light" href="${siteConfig.cv.en}" target="_blank" rel="noreferrer">${t("contact.cvEn")}${icons.arrowUpRight}</a>
          <a class="button button-secondary" href="${siteConfig.cv.fr}" target="_blank" rel="noreferrer">${t("contact.cvFr")}${icons.arrowUpRight}</a>
        </div>
      </header>

      <section class="resume-chronology border-section">
        <div class="chronology-heading reveal">
          <p class="section-kicker">${t("resume.timelineKicker")}</p>
          <div><h2>${t("resume.timelineTitle")}</h2></div>
        </div>
        <div class="timeline-filters reveal" role="group" aria-label="${t("resume.filterLabel")}">
          <button class="active" type="button" data-timeline-filter="all" aria-pressed="true">${t("resume.filterAll")}<span>${timeline.length}</span></button>
          <button type="button" data-timeline-filter="experience" aria-pressed="false">${t("resume.filterJobs")}<span>${resume.experience.length}</span></button>
          <button type="button" data-timeline-filter="education" aria-pressed="false">${t("resume.filterEducation")}<span>${resume.education.length}</span></button>
        </div>
        <div class="timeline-stage">
          <div class="timeline-rail" aria-hidden="true"></div>
          <div class="resume-timeline">
            ${timeline.map((entry, index) => renderTimelineEntry(entry, i18n, index)).join("")}
          </div>
        </div>
      </section>

      <section class="resume-interests border-section reveal">
        <p class="section-kicker">${t("resume.beyondCode")}</p>
        <div class="interest-grid">
          ${t("resume.interests").map((interest) => `<div><span>${interest.label}</span><p>${interest.copy}</p></div>`).join("")}
        </div>
      </section>
    </article>
  `;
}

export function setupResumePage(root) {
  const refreshTimelineMotion = setupTimelineMotion(root);
  setupTimelineFilters(root, refreshTimelineMotion);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  root.querySelectorAll(".timeline-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      card.style.setProperty("--timeline-tilt-x", `${vertical * -1.4}deg`);
      card.style.setProperty("--timeline-tilt-y", `${horizontal * 2.2}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--timeline-tilt-x", "0deg");
      card.style.setProperty("--timeline-tilt-y", "0deg");
    });
  });
}

function setupTimelineFilters(root, refreshTimelineMotion) {
  const buttons = [...root.querySelectorAll("[data-timeline-filter]")];
  const events = [...root.querySelectorAll("[data-timeline-category]")];
  let activeAnimations = [];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations = [];

      const filter = button.dataset.timelineFilter;
      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });

      const visibleEvents = events.filter((event) => filter === "all" || event.dataset.timelineCategory === filter);
      const visibleSet = new Set(visibleEvents);
      events.forEach((event) => {
        const hidden = !visibleSet.has(event);
        event.hidden = hidden;
        event.classList.toggle("timeline-event-filtered", hidden);
        if (hidden) event.classList.remove("timeline-in-view");
      });
      visibleEvents.forEach((event, index) => {
        event.classList.toggle("timeline-event-left", index % 2 === 0);
        event.classList.toggle("timeline-event-right", index % 2 !== 0);
      });

      requestAnimationFrame(() => {
        refreshTimelineMotion();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        visibleEvents.forEach((event, index) => {
          if (!event.classList.contains("timeline-in-view")) return;
          const horizontalOffset = event.classList.contains("timeline-event-left") ? -24 : 24;
          if (!event.animate) return;
          const targetOpacity = event.classList.contains("timeline-event-secondary") ? 0.55 : 1;
          const animation = event.animate(
            [
              { opacity: 0, transform: `translate3d(${horizontalOffset}px, 12px, 0) scale(.985)` },
              { opacity: targetOpacity, transform: "translate3d(0, 0, 0) scale(1)" },
            ],
            {
              duration: 430,
              delay: index * 45,
              easing: "cubic-bezier(.22,1,.36,1)",
            }
          );
          activeAnimations.push(animation);
        });
      });
    });
  });
}

function setupTimelineMotion(root) {
  const events = [...root.querySelectorAll(".timeline-event")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const refresh = () => {
    events.forEach((event) => {
      if (event.hidden) return;
      const bounds = event.getBoundingClientRect();
      const inViewport = bounds.bottom > window.innerHeight * 0.06
        && bounds.top < window.innerHeight * 0.92;
      event.classList.toggle("timeline-in-view", inViewport);
    });
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    events.forEach((event) => event.classList.add("timeline-in-view"));
    return refresh;
  }

  let previousScrollY = window.scrollY;
  const observer = new IntersectionObserver(
    (entries) => {
      const scrollingDown = window.scrollY >= previousScrollY;
      previousScrollY = window.scrollY;

      entries.forEach((entry) => {
        if (entry.target.hidden) return;
        entry.target.style.setProperty("--timeline-motion-y", scrollingDown ? "24px" : "-24px");
        entry.target.classList.toggle("timeline-in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "-6% 0px -8%" }
  );

  events.forEach((event) => observer.observe(event));
  requestAnimationFrame(refresh);
  return refresh;
}

function renderTimelineEntry(entry, i18n, index) {
  const { language, t } = i18n;
  const location = getLocalized(entry.location, language);
  const linkedProjects = entry.projectIds.map(getProjectById).filter(Boolean);
  const highlights = getLocalized(entry.highlights, language) ?? [];
  const side = index % 2 === 0 ? "left" : "right";

  return `
    <article class="timeline-event timeline-event-${side} timeline-reveal${entry.secondary ? " timeline-event-secondary" : ""}" data-timeline-category="${entry.category}">
      <div class="timeline-node" aria-hidden="true"><span></span></div>
      <details class="timeline-card${entry.current ? " timeline-card-current" : ""}"${entry.id === "epita" ? " open" : ""}>
        <summary class="timeline-card-summary">
          <div class="timeline-meta">
            <span>${t(`resume.${entry.category}`)}${entry.current ? ` · ${t("resume.current")}` : ""}</span>
            <time>${getLocalized(entry.period, language)}</time>
          </div>
          <div class="timeline-heading">
            <div>
              <h3>${getLocalized(entry.title, language)}</h3>
              <p>${entry.organization}${location ? ` · ${location}` : ""}</p>
            </div>
            <i aria-hidden="true">+</i>
          </div>
          <span class="timeline-expand-label">${t("resume.expand")}</span>
        </summary>
        <div class="timeline-expanded">
          ${highlights.length ? `
            <div class="timeline-achievements">
              <p>${t("resume.evidence")}</p>
              <ul>${highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
            </div>
          ` : ""}
          ${entry.skills?.length ? `
            <div class="timeline-skills" aria-label="${t("resume.skills")}">
              ${entry.skills.map((skill) => `<span>${skill}</span>`).join("")}
            </div>
          ` : ""}
          ${renderProjectLinks(linkedProjects, i18n)}
        </div>
      </details>
    </article>
  `;
}

function renderProjectLinks(projects, { language, t }) {
  if (!projects.length) return "";
  const featured = projects.slice(0, 4);
  const additional = projects.slice(4);
  const renderLink = (project) => `<a href="${projectDetailUrl(project.id)}">${getProjectName(project, language)}${icons.chevron}</a>`;

  return `
    <div class="timeline-projects" aria-label="${t("resume.relatedProjects")}">
      <p>${t("resume.relatedProjects")}</p>
      <div class="timeline-project-list">${featured.map(renderLink).join("")}</div>
      ${additional.length ? `
        <details class="project-more">
          <summary><span>+</span>${t("resume.moreProjectsCount")(additional.length)}</summary>
          <div>${additional.map(renderLink).join("")}</div>
        </details>
      ` : ""}
    </div>
  `;
}
