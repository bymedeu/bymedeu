# Amadéo — Portfolio

A responsive, dependency-free personal portfolio focused on AI, systems engineering, and research. It includes instant French/English switching, client-side navigation, and a filterable project index.

## Architecture

```text
src/
├── components/   Reusable interface components
├── data/         Structured project metadata
├── i18n/         French and English translations
├── pages/        Home and project-index pages
├── app.js        Rendering and application lifecycle
└── router.js     Client-side hash routing

styles/          Layered CSS by responsibility
scripts/         Project and privacy validation
```

## Preview locally

Open `index.html` directly, or run a simple local server:

```bash
npm run serve
```

Then visit `http://localhost:4173`.

## Validate

```bash
npm run check
```
