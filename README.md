# copyisto.com

Marketing site for Copyisto, a tool that reads handwritten music notation and checks four-part harmony exercises for errors.

Three static pages in Polish: the landing page, a page for contributing notebooks, and the legal documents.

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

| Script    | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `dev`     | Start the dev server                                                                 |
| `build`   | Lint, type check and build to `dist/`                                                |
| `preview` | Serve the production build locally                                                   |
| `lint`    | Lint all CSS, including the `<style>` block in every component, and check formatting |
| `format`  | Format the repo with Prettier                                                        |

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

Notebooks are collected in person in Wrocław for now, so the contribution page offers e-mail and direct messages instead of an upload.
The Instagram and Messenger buttons open a chat with the accounts named by the `INSTAGRAM_USERNAME` and `MESSENGER_USERNAME` build variables (see `.env.example`).
Each button appears only when its variable is set.
The upload form waits on the `feat/upload-form` branch.

Every e-mail button and the address in the legal text use the `EMAIL_ADDRESS` build variable, which defaults to `kontakt@copyisto.com`.

The two remaining forms, newsletter and credits lookup, are wired but not connected.
They route through `src/lib/submissions.ts`, where each function currently resolves `{ ok: true }`.

The footer shows Facebook, Instagram and X icons for the profiles named by the `FACEBOOK_URL`, `INSTAGRAM_URL` and `TWITTER_URL` build variables.
Each icon appears only when its variable is set.

## Analytics

PostHog loads from `src/components/posthog.astro` and autocaptures clicks and pageviews.
On top of that, any element tagged `data-track="event_name"` sends that named event on click, with every other `data-track-*` attribute as a property.
The tagged events are `form_cta_clicked`, `email_clicked`, `dm_clicked` and `social_clicked`, each with a `location`, `channel` or `network`.

The site has no adapter yet.
The upload endpoint will need one, for example `@astrojs/cloudflare`, with the route at `src/pages/api/` opting out of prerendering via `export const prerender = false` while the pages stay static.
Uploads accept files up to 20 MB, which exceeds a serverless request body limit, so the real implementation should issue a signed URL and let the browser upload directly to storage.

## Known gaps

- Team bios and two profile photos are placeholders in `src/content/team.ts`.
- The legal documents have unfilled blanks awaiting review, and the numbering skips §5.

## Deployment

`bun run build` writes a fully static site to `dist/`.
Cloudflare Workers Builds then runs `npx wrangler deploy`, which uploads `dist/` as static assets per `wrangler.jsonc`.
