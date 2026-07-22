import { renderProjectCard } from "../components/project-card.js";
import { projects } from "../data/projects.js";
import { icons } from "../components/icons.js";
import { siteConfig } from "../../site.config.js";
import { projectFilterUrl } from "../router.js";

const toolkit = [
  { label: "Python", tag: "python" },
  { label: "C++", tag: "cpp" },
  { label: "C", tag: "c" },
  { label: "PyTorch", tag: "ml" },
  { label: "Linux", tag: "unix" },
  { label: "Git", tag: "systems" },
  { label: "Mathematics", tag: "mathematics" },
  { label: "Scientific computing", tag: "research" },
];

export function renderHomePage(i18n) {
  const { t } = i18n;
  const featured = siteConfig.home.featuredProjectIds.map((id) => projects.find((project) => project.id === id));

  return `
    <section class="hero container section-pad" id="top">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="eyebrow reveal"><span class="status-dot"></span>${t("hero.eyebrow")}</div>
      <h1 class="reveal reveal-delay-1">${t("hero.title")}<br><span>${t("hero.titleMuted")}</span></h1>
      <p class="hero-copy reveal reveal-delay-2">${t("hero.copy")}</p>
      <div class="hero-actions reveal reveal-delay-3">
        <a class="button button-primary" href="#/projects">${t("hero.primary")}${icons.chevron}</a>
        <a class="button button-secondary" href="#/contact">${t("hero.secondary")}</a>
      </div>
      ${renderHeroVisual(t)}
    </section>

    <section class="principles border-section">
      <div class="container principle-grid">
        <p class="section-kicker reveal">${t("approach.kicker")}</p>
        <blockquote class="reveal reveal-delay-1">“${t("approach.quote")}”</blockquote>
        <div class="principle-notes reveal reveal-delay-2">
          ${t("approach.notes").map((note) => `<p>${note}</p>`).join("")}
        </div>
      </div>
    </section>

    <section class="work container section-pad" id="work">
      <div class="section-heading reveal">
        <div><p class="section-kicker">${t("work.kicker")}</p><h2>${t("work.title")}</h2></div>
        <div class="section-heading-copy">
          <p>${t("work.copy")}</p>
          <a class="text-arrow-link" href="#/projects">${t("work.all")}${icons.chevron}</a>
        </div>
      </div>
      <div class="featured-projects">
        ${featured.map((project, index) => renderProjectCard(project, i18n, { featured: index === 0 })).join("")}
      </div>
    </section>

    <section class="about border-section" id="about">
      <div class="container about-grid section-pad">
        <p class="section-kicker reveal">${t("about.kicker")}</p>
        <div class="about-main">
          <h2 class="reveal">${t("about.title")}</h2>
          <p class="about-lead reveal reveal-delay-1">${t("about.lead")}</p>
          <p class="about-body reveal reveal-delay-2">${t("about.body")}</p>
        </div>
        <div class="skills reveal reveal-delay-2">
          <p class="skills-label">${t("about.toolkit")}</p>
          <div class="skills-list">${toolkit.map((item) => `<a href="${projectFilterUrl(item.tag)}">${item.label}</a>`).join("")}</div>
        </div>
      </div>
    </section>

    <section class="contact container section-pad" id="contact">
      <div class="contact-card reveal">
        <div class="contact-glow" aria-hidden="true"></div>
        <p class="section-kicker">${t("contact.kicker")}</p>
        <h2>${t("contact.title")}<br><span>${t("contact.titleMuted")}</span></h2>
        <p>${t("contact.copy")}</p>
        <div class="contact-links">
          <a class="button button-light" href="${siteConfig.social.linkedin}" target="_blank" rel="noreferrer">${t("contact.linkedin")}${icons.arrowUpRight}</a>
          <a class="button button-secondary" href="#/resume">${t("contact.resume")}${icons.chevron}</a>
          <a class="text-link" href="${siteConfig.social.github}" target="_blank" rel="noreferrer">${siteConfig.social.github.replace("https://", "")}</a>
        </div>
        <div class="cv-links" aria-label="${t("contact.cv")}">
          <a href="${siteConfig.cv.fr}" target="_blank">${t("contact.cvFr")} ${icons.arrowUpRight}</a>
          <a href="${siteConfig.cv.en}" target="_blank">${t("contact.cvEn")} ${icons.arrowUpRight}</a>
        </div>
      </div>
    </section>
  `;
}

export function setupHomePage() {}

function renderHeroVisual(t) {
  return `
    <div class="hero-visual reveal reveal-delay-3" aria-hidden="true">
      <div class="visual-grid"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
      <div class="core"><span class="core-ring"></span><span class="core-dot"></span></div>
      <div class="signal signal-one"></div><div class="signal signal-two"></div>
      ${renderSatelliteLabel("one", t("hero.research"))}
      ${renderSatelliteLabel("two", t("hero.systems"))}
      ${renderSatelliteLabel("three", t("hero.intelligence"))}
      <p class="visual-caption">${t("hero.visualLabel")}</p>
    </div>
  `;
}

function renderSatelliteLabel(orbit, label) {
  return `<div class="satellite-orbit satellite-${orbit}"><div class="satellite-track"><div class="visual-label"><span></span>${label}</div></div></div>`;
}
