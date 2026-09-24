# copyisto.com

Marketing site for Copyisto, a tool that reads handwritten music notation and checks four-part harmony exercises for errors.

Three static pages in Polish: the landing page, a form for contributing scanned material, and the legal documents.

Built with [Astro](https://astro.build). No client framework.

## Requirements

Node 22.12 or newer.

## Getting started

```sh
bun install
bun run dev
```

Or with npm:

```sh
npm install
npm run dev
```

The site runs at http://localhost:4321.

`bun.lock` is the committed lockfile, so bun gives a reproducible install.
npm works too, but resolves its own tree.

## Scripts

| Script | Description |
|---|---|
| `dev` | Start the dev server |
| `build` | Lint, type check and build to `dist/` |
| `preview` | Serve the production build locally |
| `lint` | Lint all CSS, including the `<style>` block in every component |

## Structure

```
src/
├─ pages/          one file per route
├─ layouts/        Base.astro: head, metadata, icons
├─ components/     one file per component: markup, styles and script
├─ content/        all copy, typed
├─ lib/            routes and the form submission seam
├─ styles/         global.css: design tokens, reset, shared classes
└─ assets/         illustrations inlined at build
```

Every component is a single `.astro` file.
Its styles live in a scoped `<style>` block and are extracted into a real stylesheet at build.

## Score assets

`src/assets/engraved.svg` is the Dorico PDF converted with `pdftocairo -svg`, which outlines every glyph.
Dorico's own SVG export draws noteheads as text in its Leipzig font, so it only renders on machines that have Leipzig installed.
`src/lib/score-svg.ts` reads that pdftocairo structure to order the step-three animation.

## Styling

Colours, fonts, spacing and the type ramp are custom properties in `src/styles/global.css`.
Components reference them with `var(--…)` and never write literal values.

`bun run lint` fails on a raw hex, an `rgb()` literal in a colour property, or a bare font stack anywhere outside `global.css`.

## Forms

The three forms are wired but not connected.
They route through `src/lib/submissions.ts`, where each function currently resolves `{ ok: true }`.

`@astrojs/vercel` is configured, so a server endpoint can be added at `src/pages/api/` with `export const prerender = false` while the pages stay static.
Uploads accept files up to 20 MB, which exceeds a serverless request body limit, so the real implementation should issue a signed URL and let the browser upload directly to storage.

## Known gaps

- Team bios and two profile photos are placeholders in `src/content/team.ts`.
- The legal documents have unfilled blanks awaiting review, and the numbering skips §5.
- Three illustration placeholders remain, all in the scan rules on the form page.

## Deployment

Deploys to Vercel as static output.
