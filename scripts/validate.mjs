import { readFile } from "node:fs/promises";
import { projects } from "../src/data/projects.js";
import { translations } from "../src/i18n/translations.js";

const errors = [];
const ids = new Set();

for (const project of projects) {
  if (ids.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
  ids.add(project.id);

  for (const language of ["en", "fr"]) {
    const name = typeof project.name === "string" ? project.name : project.name[language];
    if (!name) errors.push(`${project.id} is missing a ${language} name`);
    if (!project.description[language]) errors.push(`${project.id} is missing a ${language} description`);
  }

  if (project.type === "academic" && project.url) {
    errors.push(`${project.id} exposes an academic source URL`);
  }

  for (const tag of project.tags) {
    for (const language of ["en", "fr"]) {
      if (!translations[language].tags[tag]) errors.push(`Missing ${language} translation for tag: ${tag}`);
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
