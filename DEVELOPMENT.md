# Portfolio development

The portfolio is a dependency-free client-side application with instant French/English switching, hash-based navigation, and a filterable project index.

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

## Preview

```bash
npm run serve
```

Then visit `http://localhost:4173`.

## Validate

```bash
npm run check
```
