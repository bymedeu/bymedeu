import { renderProjectCard } from "../components/project-card.js";
import { featuredProjectIds, projects } from "../data/projects.js";
import { icons } from "../components/icons.js";

const toolkit = ["Python", "C++", "C", "PyTorch", "Linux", "Git", "Mathematics", "Scientific computing"];

export function renderHomePage(i18n) {
  const { t } = i18n;
  const featured = featuredProjectIds.map((id) => projects.find((project) => project.id === id));

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
          <div class="skills-list">${toolkit.map((item) => `<span>${item}</span>`).join("")}</div>
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
          <a class="button button-light" href="https://www.linkedin.com/in/amadeoheaulme/" target="_blank" rel="noreferrer">${t("contact.linkedin")}${icons.arrowUpRight}</a>
          <a class="text-link" href="https://github.com/bymedeu" target="_blank" rel="noreferrer">github.com/bymedeu</a>
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
      <div class="visual-label label-one"><span></span>${t("hero.research")}</div>
      <div class="visual-label label-two"><span></span>${t("hero.systems")}</div>
      <div class="visual-label label-three"><span></span>${t("hero.intelligence")}</div>
      <p class="visual-caption">${t("hero.visualLabel")}</p>
    </div>
  `;
}
