import { readFile } from "node:fs/promises";
import { projects } from "../src/data/projects.js";
import { translations } from "../src/i18n/translations.js";
import { siteConfig } from "../site.config.js";
import { resume } from "../src/data/resume.js";
import { projectStats } from "../src/data/github-stats.js";

const errors = [];
const ids = new Set();

if (!/^\S+@\S+\.\S+$/.test(siteConfig.contact.recruiterAccessEmail)) {
  errors.push("site.config.js has an invalid recruiter access email");
}

if (!siteConfig.social.portfolio.startsWith("https://")) {
  errors.push("site.config.js has an invalid portfolio URL");
}

for (const project of projects) {
  if (ids.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
  ids.add(project.id);

  for (const language of ["en", "fr"]) {
    const name = typeof project.name === "string" ? project.name : project.name[language];
    if (!name) errors.push(`${project.id} is missing a ${language} name`);
    if (!project.description[language]) errors.push(`${project.id} is missing a ${language} description`);
    if (!project.context[language]) errors.push(`${project.id} is missing ${language} context`);
    if (!project.implementation[language]?.length) errors.push(`${project.id} is missing ${language} implementation details`);
    if (project.contribution && !project.contribution[language]) errors.push(`${project.id} is missing a ${language} contribution`);
  }

  if (project.type === "academic" && project.repository.access !== "school-restricted") {
    errors.push(`${project.id} does not enforce school-restricted repository access`);
  }

  if (project.type === "academic" && project.repository.access === "public") {
    errors.push(`${project.id} exposes academic source publicly`);
  }

  for (const tag of project.tags) {
    for (const language of ["en", "fr"]) {
      if (!translations[language].tags[tag]) errors.push(`Missing ${language} translation for tag: ${tag}`);
    }
  }
}

for (const [projectId, stats] of Object.entries(projectStats)) {
  if (!ids.has(projectId)) errors.push(`Statistics configured for unknown project: ${projectId}`);
  if (stats.codebaseLines != null && (!Number.isInteger(stats.codebaseLines) || stats.codebaseLines <= 0)) {
    errors.push(`Invalid source-line count for project: ${projectId}`);
  }
  if (stats.visibility === "private" && stats.stars != null) {
    errors.push(`Private GitHub stars must not be published for project: ${projectId}`);
  }
}

for (const projectId of siteConfig.home.featuredProjectIds) {
  if (!ids.has(projectId)) errors.push(`Unknown featured project in site.config.js: ${projectId}`);
}

for (const section of [resume.experience, resume.education]) {
  for (const entry of section) {
    for (const language of ["en", "fr"]) {
      if (!entry.period[language] || !entry.title[language] || !entry.description[language]) {
        errors.push(`Incomplete ${language} résumé entry: ${entry.id}`);
      }
    }
    for (const projectId of entry.projectIds) {
      if (!ids.has(projectId)) errors.push(`Résumé entry links to unknown project: ${projectId}`);
    }
  }
}

for (const [projectId, resources] of Object.entries(siteConfig.projectResources)) {
  if (!ids.has(projectId)) errors.push(`Resource configured for unknown project: ${projectId}`);
  for (const resource of resources) {
    if (!resource.url || !resource.label?.en || !resource.label?.fr) {
      errors.push(`Invalid resource configured for project: ${projectId}`);
    }
  }
}

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const forbiddenPortfolioTerms = ["libbistro", "scrooge", "epita-ing1/tree"];

for (const term of forbiddenPortfolioTerms) {
  if (index.toLowerCase().includes(term)) errors.push(`Forbidden term in index.html: ${term}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${projects.length} projects, bilingual metadata, tags, and academic privacy.`);
}
